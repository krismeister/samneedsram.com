---
name: generate-theme-idea
description: Create a themed pledge-page idea file in docs/planning/ideas/ with title and theme instructions.
---

# Generate Theme Idea

When Kris asks for a pledge theme idea (one or a batch), write a concise,
buildable idea file. No template code yet — a later skill turns an idea
into the `html/pledges/` template, CSS, and art.

## Style references (read before writing)

- `html/pledges/warhammer40kb.html` — grimdark parody voice, tribute copy.
- `html/pledges/gondor.html` — epic fantasy voice, memory-first wording.
- `docs/pledge-pages-spec.md` — the contract every idea must fit (markers,
  art set, seals, deadpan rule). Ideas must be realizable inside it.

## Steps

1. Settle the idea: a theme slug (lowercase, e.g. `severance`), catchy
   display title, and category (matches `public/pledges/themes.json`
   values like Movies, Games, TV, Music, Originals). The display title
   shows in the homepage picker dropdown alongside every other theme,
   so it must be catchy and distinct at a glance — a pun or twist on
   the premise (e.g. `Warhammer 40KB`, `Ramageddon`), never the bare
   franchise name alone. If Kris names a franchise or
   premise, use it. Otherwise pick one yourself from geek/computer
   culture, movies, or shows — do not ask for guidance, just choose.
   Check BOTH `docs/planning/ideas/` and `docs/planning/ideas/done/`
   first and never repeat an idea in either place (done/ holds ideas
   already being built); vary the source (movie, show, game, meme,
   retro tech) from recent ones.
2. Create `docs/planning/ideas/` if missing.
3. Write `docs/planning/ideas/<slug>.md` with exactly these sections:
   - `# <Title>` plus one-line logline.
   - `## Premise` — the joke in 2–3 sentences, played dead straight.
   - `## Theme instructions` — voice notes, palette/type direction, art
     direction for hero/og/picker/seal (subjects, mood, what must read
     at small size), and the key copy beats: hero title, eyebrow, letter
     angle, share-card line, hashtag. Cast between one and all four:
     Sam in-character, plus any of Zuckerberg, Elon, or Jensen Huang
     the premise earns — never forced. Name the cast explicitly with
     left-to-right blocking and vary the lineup from recent ideas.
     The hero carries the full cast; the og may reduce to Sam plus at
     most one companion so it still reads at thumbnail size. No other
     real people without Kris's OK.
   - `## Spec notes` — anything the template skill must know (marker
     phrasing that works for ram/floppy/usb, conditional use, seal text).
4. House rules: funny but harmless spoof; public corporate mailing
   address only (OpenAI, 3180 18th St, San Francisco, CA 94110) — never
   invent or use a personal address; play the fiction dead straight with
   no joke/parody disclaimers or winking meta-labels.
5. Report the path written. Do not build the template, CSS, or art, and
   do not commit or push unless Kris explicitly asks.
