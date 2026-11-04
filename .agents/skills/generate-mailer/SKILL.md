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
message/eulogy, template choice (default: the template under
`public/mailer-assets/`; ask only if several exist and it matters).

## Steps

1. Draft the cover letter and eulogy text in the house voice: funny but
   harmless parody. Public corporate mailing address only — never invent or
   use a personal address. Include the line "Parody project. Not affiliated
   with OpenAI or Sam Altman." in the mailer.
2. Build the mailer HTML from the template and graphics in
   `public/mailer-assets/`.
3. Render it to PDF with headless Chromium and save to
   `public/static-mailers/<slug>.pdf` (`slug`: kebab-case, unique per mailer).
4. Upsert the entry in `public/static-mailers/letters.json` (top-level array,
   newest first) following the schema in `docs/phase-1.md`: `slug`, `name`,
   `ram_type`, `gb`, `date` (YYYY-MM-DD), `excerpt`, `cover_letter`
   (markdown), `eulogy` (markdown), `template`, `pdf` (public URL path,
   `/static-mailers/<slug>.pdf`). All fields required.
5. Report the paths created or updated. Do not commit or push unless Kris
   explicitly asks.
