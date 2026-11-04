---
name: generate-mailer
description: Generate a samneedsram.com mailer image and letters.json entry from pledge details.
---

# Generate Mailer

When Kris asks to generate a mailer (one or a batch), produce the finished,
committable artifacts. No app code and no model runtime are involved — the
session itself does the work.

## Inputs per mailer

Name/handle, RAM type (DDR2/3/4/5, SODIMM, etc.), size in GB, short
message/eulogy, donation claim (the silly "what they sent" line for the
mailer + thumbnail), template choice (default: the template under
`mailer-assets/`; ask only if several exist and it matters).

## Steps

1. Draft the cover letter and eulogy text in the house voice: funny but
   harmless spoof. Public corporate mailing address only — never invent or
   use a personal address. Canonical (already in all templates): OpenAI HQ,
   1455 Third Street, San Francisco, CA 94158.
2. Build the mailer HTML from the template and graphics in
   `mailer-assets/`. Work in a scratch copy (e.g. copy the template dir to
   `/tmp/<slug>/`) so relative refs resolve; template art travels with the copy,
   and any polaroids used get copied next to the HTML. Credits and Powered-by-Muse
   live in the site UI footer, not the image — templates carry only the disclaimer line.
3. Render the letter image with the repo-local Puppeteer install (never global):
   `node scripts/make-letter-image.mjs --html <built-html> --out public/static-mailers/<slug>.jpg`
   (`slug`: `<short-description>_<NNN>_<UUID>`, e.g.
   `beggar-cardboard-plea_007_f47ac10b-58cc-4372-a567-0e02b2c3d479`. Description in
   kebab-case, parts joined with underscores; NNN is the zero-padded count (highest
   existing + 1 from `letters.json`, else 001); UUID from `node -e "console.log(crypto.randomUUID())"`.)
   If `node_modules` is missing, run `npm install` first (local only).
   Heed the size-budget warning (default 600KB): prefer SVG/CSS and small (~1200px max) JPEGs for raster art.
4. Generate a square joke thumbnail with the session's image generation (brutalist poster
   matching the mailer: headline with name + GB, the donation claim, a "100% REAL*" stamp).
   Save the full-size original to `mailer-assets/thumbnail-originals/<slug>.jpg` (never in
   `public/`), then build the 1000x1000 feed file with the repo-local script (never global):
   `scripts/compress-image.sh --in mailer-assets/thumbnail-originals/<slug>.jpg --slug <slug>`
   (runs local `make-thumbnail.mjs` via plain `node` — never npx. Use `--fit contain`
   for text-heavy posters so nothing clips (`cover` suits full-bleed art); always check
   the result visually and regenerate if the joke doesn't survive).
5. Upsert the entry in `public/static-mailers/letters.json` (top-level array,
   newest first) following the schema in `docs/phase-1.md`: `slug`, `name`,
   `ram_type`, `gb`, `date` (YYYY-MM-DD), `excerpt`, `cover_letter`
   (markdown), `eulogy` (markdown), `template`, `image` (public URL path,
   `/static-mailers/<slug>.jpg`), `thumbnail` (public URL path,
   `/static-mailers/<slug>.thumb.jpg`). All fields required.
6. Report the paths created or updated. Do not commit or push unless Kris
   explicitly asks.
