# Pledge pages spec (handoff for template creator agents)

Dynamic-looking pledge pages built from **static HTML templates with markers**.
A Next.js route fills the markers per request (including `<head>` meta tags,
server-side, so X/Twitter cards work). This doc is the whole contract:
where every file lives, what art to make, and what markers templates get.

Source of truth for the submitted data: the `PledgeSubmission` JSON schema
(`who`, `kind`, `type`, `qty`, `eulogy?`, `theme`). Query/field names below
match it exactly.

## 1. How a pledge becomes a page

1. Homepage form POSTs the pledge to `POST /api/pledges/mint`.
2. Mint route validates the body against the schema (coercing `qty`), signs
   it as a JWT (HMAC-SHA256 via `node:crypto` (zero dependencies, see `lib/pledges.js`), secret `PLEDGE_JWT_SECRET`, **no `exp`**
   — share links must work forever), and responds
   `{ "url": "/pledges/<theme>?content=<jwt>" }`. Client redirects there.
3. `GET /pledges/<theme>?content=<jwt>` route: verifies the signature,
   re-validates the payload (unknown fields rejected), reads
   `html/pledges/<theme>.html`, HTML-escapes all string fields, substitutes
   markers, and returns `text/html`. Invalid JWT or unknown theme → 400/404.
4. JWTs are **signed, not encrypted**: readable by anyone holding the link.
   That's fine — pledge data is public by design (it's in the page + meta).

Note: the old page filenames (`mailkit-b-zine.html`, `theme-*.html`) are dead.
Themes are URL slugs now: `classic`, `ramageddon`, `warhammer40kb`, `gondor`.

## 2. File layout (exact)

```
html/pledges/<theme>.html            # source templates (NOT public — raw markers must not be served)
public/pledges/css/<theme>.css       # one stylesheet per theme
public/pledges/art/<theme>/hero.jpg  # page header/backdrop art
public/pledges/art/<theme>/og.jpg    # static share image (1200x630, see §4)
public/pledges/art/<theme>/seal.png  # theme stamp/badge overlay (transparent)
public/pledges/art/<theme>/picker.jpg  # homepage picker strip (300x74, see §4)
public/pledges/art/shared/noise.png  # subtle tileable grain (optional overlay)
public/pledges/themes.json           # theme registry: slug + display_name + category (§2.1)
app/pledges/[theme]/route.js         # fill + serve (app agent builds this, not template agents)
app/api/pledges/mint/route.js        # validate + sign (app agent)
```

Rules for templates:

- Valid HTML5, one file per theme, filename = theme slug + `.html`.
- Reference assets by **absolute** public path (`/pledges/css/ramageddon.css`,
  `/pledges/art/ramageddon/hero.jpg`). Never relative paths.
- Markers are verbatim `{{name}}` tokens (§3). The filler does dumb string
  replacement plus one conditional — no logic in templates.
- Mobile-first. Must look right with an empty eulogy (use the conditional).
- No JS required. If any: inline, <50 lines, no dependencies, page works with
  JS disabled (crawlers don't run it).
- Google Fonts `<link>` allowed, but the page must look fine on system fonts.
- Deadpan house rule (from AGENTS.md): play the fiction straight. No "joke",
  "parody", "not real", "unverified", "alleged", wink labels, or affiliation
  disclaimers anywhere in template copy.

## 2.1. Theme registry

`public/pledges/themes.json` is the list of active themes. Top-level
`themes` array; each entry is `slug` + `display_name` + `category`
(e.g. Movies, Games, TV, Music, Originals). Everything else
is derived by §2 convention (`html/pledges/<slug>.html`,
`/pledges/css/<slug>.css`, `/pledges/art/<slug>/…`), never listed.

Consumers: the `pledges/[theme]` route allowlists `theme` and resolves
`{{theme_display_name}}` from it; the homepage form fetches it to build
the theme picker **grouped by `category`** (submit the `slug`, never a
filename). Template agents adding a theme add one entry here plus the
§2 files.

## 2.2. Deprecating a theme

Retired themes stay renderable (old signed links must keep working)
but disappear from the picker and from new mints:

1. Move the entry from `public/pledges/themes.json` to
   `public/pledges/deprecated-themes.json` (same `slug` +
   `display_name` + `category` shape). The picker reads only
   `themes.json`, so the theme vanishes from the form.
2. Move the slug from `THEMES` to `DEPRECATED_THEMES` in
   `lib/pledges.js`, and drop it from the `validatePledge` error
   message. Mint calls `validatePledge` (active only); page serving
   calls `verifyPledge` (active + deprecated).
3. Update the deprecation tests in `tests/pledges.test.mjs` (mint
   rejects the slug, verify still accepts it, `readThemes` resolves
   its display name).
4. Keep the theme's template, CSS, art, and per-theme test files in
   place — the route still needs them to render old links.
5. Run `npm test` — it must be green.

## 3. Marker reference

String fields arrive HTML-escaped. Numbers/enums arrive validated.

| Marker | Source | Example |
|---|---|---|
| `{{who}}` | `who` (1–24 chars) | `Mabel` |
| `{{kind}}` | `kind` | `ram` / `floppy` / `usb` |
| `{{type}}` | `type` | `DDR3` |
| `{{qty}}` | `qty` (number) | `8` |
| `{{qty_unit}}` | derived: `GB` for ram/usb, `disks` for floppy | `GB` |
| `{{eulogy}}` | `eulogy` (mint fills `she served 11 years in my ThinkPad` when the form sends none) | `she served 11 years…` |
| `{{theme}}` | `theme` slug | `ramageddon` |
| `{{theme_display_name}}` | from registry `display_name` | `Ramageddon` |
| `{{page_url}}` | derived absolute canonical URL (incl. JWT) | `https://samneedsram.com/pledges/…` |
| `{{meta_title}}` | derived: `{who} pledged {qty}{unit} {type} to Sam` | `Mabel pledged 8GB DDR3 to Sam` |
| `{{meta_description}}` | derived: eulogy (mint always supplies one; the `{who} donated…` fallback only fires for hand-built payloads) | — |
| `{{meta_image}}` | derived absolute URL of the theme og art | `https://…/pledges/art/ramageddon/og.jpg` |

Conditional (only one supported):

```html
{{#if_eulogy}}<blockquote class="eulogy">{{eulogy}}</blockquote>{{/if_eulogy}}
```

The route strips the whole block when `eulogy` is empty/missing (only reachable with hand-built payloads — mint fills the default).

Required `<head>` (templates include verbatim, route fills values):

```html
<title>{{meta_title}}</title>
<meta name="description" content="{{meta_description}}">
<meta property="og:title" content="{{meta_title}}">
<meta property="og:description" content="{{meta_description}}">
<meta property="og:image" content="{{meta_image}}">
<meta property="og:url" content="{{page_url}}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="samneedsram.com">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@maxquesar">
<meta name="twitter:title" content="{{meta_title}}">
<meta name="twitter:description" content="{{meta_description}}">
<meta name="twitter:image" content="{{meta_image}}">
```

(`twitter:site` is the site X handle — update it here and in every
template if the handle ever changes.)

## 4. Artwork brief (design agent)

One set per theme (`classic`, `ramageddon`, `warhammer40kb`, `gondor`).
All art: original or AI-generated, no text baked
in except where noted (route/template supply all text).

| File | Spec | Notes per theme |
|---|---|---|
| `public/pledges/art/<theme>/hero.jpg` | 1600px wide max, ≤250KB, JPEG q80 | Full-bleed header/backdrop. Dark-safe area center for overlaid title. |
| `public/pledges/art/<theme>/og.jpg` | **exactly 1200×630**, ≤300KB | Share card. Must read at small size: big shapes, high contrast, minimal detail. No text (crawler crops unpredictably; title comes from meta). |
| `public/pledges/art/<theme>/seal.png` | ≤512px, transparent PNG | Round stamp/badge motif reused on page + stub. |
| `public/pledges/art/<theme>/picker.jpg` | **exactly 300×74**, ≤30KB, JPEG | Homepage picker strip. Must read at tiny size: single bold motif, no text (picker UI renders the display name beside it). |
| extras (max 2 per theme) | same weight rules | Only if the design needs them. Name `extra-<what>.jpg/png`. |

Theme direction:

- **classic** (zine): messy photocopied flyer energy — paper tears, rubber
  stamps, ransom-note texture. Seal: round "CERTIFIED DONOR" stamp.
- **ramageddon**: apocalyptic blockbuster — burning data center (starter art
  exists in the old mailer assets and may be reused/remixed), ember glow.
  Seal: "SURVIVOR" badge. Art direction already proven; match it.
- **warhammer40kb**: grimdark parody — candlelit gothic server cathedral,
  comically oversized floppy disk held like a holy relic. Seal: wax seal
  with skull-and-RAM motif.
- **gondor**: high-fantasy epic — white tower city at dusk, a beacon lit
  with an suspiciously RAM-shaped flame. Seal: tree motif with circuit roots.

Shared: `public/pledges/art/shared/noise.png` — neutral 512px tileable grain,
≤50KB, for overlays. Nothing else shared; keep themes self-contained.

## 5. Route contract (app agent summary)

- `GET /pledges/[theme]`: allowlist theme → 404 otherwise; require `content`
  JWT → verify HMAC → validate payload vs schema → 400 on any failure.
- Escape `who`/`type`/`eulogy` for HTML; `qty` numeric-only; build derived
  markers (§3); substitute; return `text/html`.
- Absolute URLs need the site origin: required env `SITE_URL`
  (production: `https://samneedsram.com`). No host-header trust.
- X notes: `summary_large_image` card; crawler reads first-byte HTML only
  (no JS); cards cache ~7 days per exact URL ( Card Validator to refresh).
  Forgery note: only server-minted (signed) JWTs render, so nobody can mint
  arbitrary cards — but anyone can *share* any minted URL.

## 5.1. Homepage form contract

Field names match schema properties exactly. Client mirrors server validation;
server re-validates everything (never trust the form).

| Field | Control | Rules |
|---|---|---|
| `who` | text input, `maxlength=24`, required | Trim whitespace before + after; reject empty |
| `kind` | radio/segmented, required, default `ram` | Exactly `ram` / `floppy` / `usb` |
| `type` | select, required | Options swap by `kind`: ram → DDR2/3/4/5/SODIMM; floppy → 3.5" HD, 3.5" DD, 5.25" HD; usb → USB-A, USB-C, Mini, Mystery. Switching `kind` resets to that kind's first option |
| `qty` | number input, required | Form floor min 1 (feed accepts fractional <1, form clamps to ≥1). Max by kind: ram 512, floppy 500 (integer, step 1), usb 1024. Switching `kind` clamps into range |
| `eulogy` | textarea, `maxlength=140`, optional | Empty string = omit from payload; backend fills the default eulogy |
| `theme` | picker grouped by `category`, required | Fetch `/pledges/themes.json`; each option shows `/pledges/art/<slug>/picker.jpg` + `display_name`; submit the `slug` (control must have a real `name="theme"` attribute) |

Never submit `n` (server-assigned; comps may fake it client-side for display).

Submit sequence:

1. Validate inline; block submit on any error.
2. `POST /api/pledges/mint` with JSON body of exactly the schema fields above.
3. Mint route validates/coerces → `200 {"url": "/pledges/<theme>?content=<jwt>"}` or `400 {"errors": [...]}`.
4. On 200: `window.location.assign(url)`. On 400: render `errors` inline. On network failure: generic "couldn't reach the quartermaster, retry" message.
5. The JWT is opaque to the form: never decode, store, or log it.

## 6. Non-goals

- Feed/counter persistence, pledge numbering (`n` stays client-faked).
- Per-pledge dynamic og images (static per-theme art for now).
- The old mailer PDF/image pipeline is untouched by this spec.
