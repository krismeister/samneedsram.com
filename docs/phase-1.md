# Phase 1 — Local generator + barebones frontend

Goal: Kris generates the first set of mailers — intricate, fancy PDFs with
joke backgrounds, graphics, and text — through local Muse CLI sessions, saving
them as files into this repo, plus a barebones public frontend that lists them.
The full public site comes later. Fallback: if time runs out, publish only the
public portion and keep generating locally.

Product scope still lives in [da_plan.md](da_plan.md). This doc covers Phase 1
sequencing and stack only.

## Decisions (confirmed by Kris)

- **Generation runs through Muse CLI sessions** (`muse exec` + prompt,
  governed by `AGENTS.md` and the `generate-mailer` project skill), operated
  by Kris locally. No generator UI or model runtime in the app for Phase 1.
- **Stack: Next.js (App Router) for the public frontend only.** No CopilotKit
  runtime, no AG-UI, no MCP tools in Phase 1 (deferred to the online-generation
  phase, where AG-UI remains the planned backend-frontend bridge).
- **Letter images rendered by headless Chromium** (full-page screenshot) from
  HTML/CSS templates during CLI generation sessions. Most flexible for intricate
  layouts with backgrounds and graphics; runs locally.
- **Next.js app lives at repo root** (quickstart-standard layout), generated
  content under `public/static-mailers/` (Next.js static convention — files
  are committed and directly URL-addressable, which also keeps a future
  static-export fallback working without API routes).
- **The `/admin` path is reserved** for a fuller admin section (user accounts,
  more options) in a later phase. No local-only routes exist in the Phase 1
  app, so no production gating is needed yet.
- **Barebones public frontend in Phase 1.** Homepage lists the local items,
  one details page per item, fed by a JSON index the public API reads.
- **Mailers are designed images**, not plain text. Each mailer combines
  generated text with joke backgrounds and graphics.

## What gets built

- Generator convention (no app code): Kris runs Muse CLI sessions from the
  repo root (or a designated sandbox dir) with a run prompt; the session
  follows the `generate-mailer` skill and writes/updates the content store.
- Mailer templates and graphics: committed files under
  `mailer-assets/` (backgrounds, graphics, HTML/CSS templates). Not
  under `public/` — templates are local build inputs, not served.
  Template art is AI-generated during design sessions and committed under
  `mailer-assets/`; per-mailer thumbnails are AI-generated per mailer (see skill step 4).
  Reference photos of real people stay provided files with credits in SOURCES.md.
- Content store (all committed to the repo):
  - `public/static-mailers/<slug>.jpg` — the finished letter image.
  - `public/static-mailers/<slug>.thumb.jpg` — 1000x1000 feed thumbnail.
  - `public/static-mailers/letters.json` — index array, newest first.
    Entry shape, see "letters.json schema" below.
  - `mailer-assets/thumbnail-originals/<slug>.jpg` — full-size thumbnail
    source. Never in `public/` (hosting cost + no need to serve it).
- Public API: `GET /api/letters` returns the JSON index;
  `GET /api/letters/[slug]` returns one entry (text plus PDF path).
- Public pages (barebones, no styling beyond readable):
  - `/` homepage lists all items from the API (name, RAM type, GB, excerpt).
  - `/letters/[slug]` details page shows the letter image in full with the text,
    plus a footer with photo credits and Powered by Muse.
- No app secrets in Phase 1 (model auth lives in Kris's local CLI login).

### letters.json schema

Top-level JSON array, newest entry first. All fields required.

| Field | Type | Meaning |
|---|---|---|
| `slug` | string | `<description>_<NNN>_<UUID>`; unique; matches the PDF filename stem |
| `name` | string | pledger name/handle |
| `ram_type` | string | e.g. "DDR3", "DDR4 SODIMM" |
| `gb` | number | size in GB |
| `date` | string | YYYY-MM-DD |
| `excerpt` | string | 1-2 lines, shown in list view |
| `cover_letter` | string | full cover letter text (markdown) |
| `eulogy` | string | full eulogy/roast text (markdown) |
| `template` | string | template id from `mailer-assets/` |
| `image` | string | public URL path, `/static-mailers/<slug>.jpg` |
| `thumbnail` | string | public URL path, `/static-mailers/<slug>.thumb.jpg` |

Example:

```json
[
  {
    "slug": "sample-ddr3-donation_001_f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "name": "SampleDonor",
    "ram_type": "DDR3",
    "gb": 8,
    "date": "2026-11-04",
    "excerpt": "8GB of trusty DDR3, retired with honors.",
    "cover_letter": "Dear Sam, ...",
    "eulogy": "Here lies a stick that never blue-screened, ...",
    "template": "brutalist-flyer",
    "image": "/static-mailers/sample-ddr3-donation_001_f47ac10b-58cc-4372-a567-0e02b2c3d479.jpg",
    "thumbnail": "/static-mailers/sample-ddr3-donation_001_f47ac10b-58cc-4372-a567-0e02b2c3d479.thumb.jpg"
  }
]
```

## Out of scope (Phase 2+)

Generator UI (`/local`), CopilotKit/AG-UI runtime, MCP tools, online text/PDF
generation, model-provider choice (Llama is the leading candidate for the
final public tool), counter, how-it-works, public pledge form, PDF mail-kit
generator, leaderboard, share cards, user accounts, proof-photo uploads,
and the full `/admin` section. None of these are built
in Phase 1.

## Acceptance criteria

- A CLI generation session produces a finished mailer: the letter image and thumbnail
  appear under `public/static-mailers/` and `letters.json` gains an entry matching the
  schema above.
- `npm install && npm run dev`: `/` lists all indexed items;
  `/letters/[slug]` renders the text in full with the PDF viewable and
  downloadable; both read through the public API.
- No secrets in the repo.
- `npm run build` passes.

## Open questions

None.
