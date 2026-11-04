# da_plan.md — samneedsram.com

Source of truth for the project. Agents: read this before doing anything.

## 1. What it is

samneedsram.com is a joke site, really built, for the Musse Meta Global AI Hackathon (Indie + Viral categories).

Visitors pledge old RAM sticks and generate a snail-mail kit so they can mail the RAM to OpenAI CEO Sam Altman. Tagline: "Sam's out of memory. Help him remember."

## 2. Core loop

1. User fills pledge form: name/handle, RAM type (DDR2/3/4/5, SODIMM, etc.), size in GB, short eulogy/message.
2. Site generates a printable mail kit (PDF):
   - Mail-to label (OpenAI public corporate address only)
   - Return label (user's address)
   - Funny AI-written cover letter
3. Pledge instantly appears in the last-50 donations feed + live GB counter. No proof needed — honor system, we just add up whatever reasonable total they claimed.
4. User shares pledge card on social.
5. Mailing IRL is optional, just for the joke.

v1 does NOT physically mail anything. PDF generation only.

## 3. Hackathon angles

- Indie: single-purpose, weird, strong voice. Scrappy brutalist design beats polished SaaS.
- Viral: live GB counter, share cards ("I donated 8GB DDR3 to Sam"), last-50 donations feed.
- Meta AI tie-in (pick at least one):
  - Llama-written cover letters / roasts of old RAM
  - "Sam begs you" thank-you note generator
  - AI eulogy writer for dead sticks

## 4. MVP scope

- [ ] Landing page with counter + how-it-works
- [ ] Pledge form (validates RAM type, reasonable GB cap, message length — no proof required)
- [ ] PDF kit generator (mail-to label, return label, cover letter)
- [ ] Last-50 donations feed (honor-system, newest first) + total GB counter
- [ ] Share card image per pledge (OG image)
- [ ] README + docs (this scaffold)

Stretch (only after MVP):

- [ ] Donation map
- [ ] AI chat with "Sam begging for RAM"
- [ ] QR code on envelope linking back to pledge

## 5. Stack (undecided — pick one before building)

- Option A: static HTML + vanilla JS + serverless function for PDF/OG. Cheapest, fastest.
- Option B: Next.js or similar full-stack. Easier for pledges DB + AI calls.
- Storage: SQLite/Postgres for pledges, or JSON file for v0.
- PDF: generate client-side (e.g. jsPDF) or server-side.
- AI: Meta Llama API for letters/eulogies.

Decision needed from Kris before scaffolding code.

## 6. Conventions

- Keep it funny but harmless. Spoof, no harassment.
- Public corporate address only. Never personal addresses.
- Mobile-first, fast load, one page can carry the joke.

## 7. Open questions

1. Static or full-stack? (see section 5)
2. Do we need persistence for the last-50 feed, or fake it for demo?
3. Which Llama integration for the AI letter?
