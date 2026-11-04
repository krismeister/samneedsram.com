---
name: generate-mailer
description: Generate a samneedsram.com mailer PDF and letters.json entry from pledge details.
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
   harmless parody. Public corporate mailing address only — never invent or
   use a personal address. Include the line "Parody project. Not affiliated
   with OpenAI or Sam Altman." in the mailer.
2. Build the mailer HTML from the template and graphics in
   `mailer-assets/`. Work in a scratch copy (e.g. copy the template dir to
   `/tmp/<slug>/`) so relative refs resolve; copy `mailer-assets/graphics/muse-logo.svg`
   and any polaroids used next to the HTML and reference them relatively.
   Fill `{{PHOTO_CREDITS_HTML}}` with
   one `<li>` per photo used, credit lines from `mailer-assets/photos/SOURCES.md`
   (leave empty when no photos are used).
3. Render it to PDF with the repo-local Puppeteer install (never global):
   `node scripts/render-mailer-pdf.mjs --html <built-html> --pdf public/static-mailers/<slug>.pdf`
   (`slug`: `<short-description>_<NNN>_<UUID>`, e.g.
   `beggar-cardboard-plea_007_f47ac10b-58cc-4372-a567-0e02b2c3d479`. Description in
   kebab-case, parts joined with underscores; NNN is the zero-padded count (highest
   existing + 1 from `letters.json`, else 001); UUID from `node -e "console.log(crypto.randomUUID())"`.)
   If `node_modules` is missing, run `npm install` first (local only).
   Heed the size-budget warning (default 500KB): prefer SVG/CSS and small (~1200px max) JPEGs for raster art.
4. Generate a square joke thumbnail with the session's image generation (brutalist poster
   matching the mailer: headline with name + GB, the donation claim, a "100% REAL*" stamp).
   Save the full-size original to `mailer-assets/thumbnail-originals/<slug>.jpg` (never in
   `public/`), then build the 1000x1000 feed file with the repo-local script (never global):
   `scripts/compress-image.sh --in mailer-assets/thumbnail-originals/<slug>.jpg --slug <slug>`
   (runs local `make-thumbnail.mjs` via plain `node` — never npx; check the crop visually,
   center-crop can clip edge text, so regenerate or adjust gravity if the joke doesn't survive).
5. Upsert the entry in `public/static-mailers/letters.json` (top-level array,
   newest first) following the schema in `docs/phase-1.md`: `slug`, `name`,
   `ram_type`, `gb`, `date` (YYYY-MM-DD), `excerpt`, `cover_letter`
   (markdown), `eulogy` (markdown), `template`, `pdf` (public URL path,
   `/static-mailers/<slug>.pdf`), `thumbnail` (public URL path,
   `/static-mailers/<slug>.thumb.jpg`). All fields required.
6. Report the paths created or updated. Do not commit or push unless Kris
   explicitly asks.
