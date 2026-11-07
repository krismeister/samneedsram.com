---
name: generate-hero-image
description: Generate a likeness-accurate pledge-theme hero source with Sam Altman and any named tech CEOs.
---

# Generate Hero Image

Generate the hero source for one pledge theme: Sam Altman must look like
Sam Altman, and every CEO the idea names must actually appear in the frame.
Use this skill for the hero step of `generate-theme-template`, or standalone
when Kris asks for a theme hero.

## References (read before generating)

- The idea file's art direction (hero line, cast, mood, copy beats).
- `scripts/pledge-art/photos/` portraits (pass as generation references, never
  publish directly). Cast allowlist: Sam Altman, Elon Musk, Mark Zuckerberg,
  Jensen Huang. No other real people without Kris's OK.
  - Sam: `sam-villageglobal-2022.jpg` (primary; clean front face). Alternates:
    `sam-techcrunch-2017.jpg`, `sam-ted-jurvetson.jpg`.
  - Elon: `elon-royalsociety-2018.jpg`.
  - Zuck: `zuck-2025.jpg`.
  - Jensen: `jensen-stanford-2026.jpg`.

## Steps

1. Settle the cast from the idea: Sam is in every hero unless the idea says
   otherwise. List every other named CEO (Elon, Zuck, Jensen). If the idea
   names a real person with no portrait above, stop and ask Kris before
   generating. Fix a left-to-right blocking order and keep it in the prompt
   (e.g. "left to right: Elon, Sam center holding the RAM, Zuck right").
2. Generate the hero source with image generation, passing one portrait per
   cast member as a likeness reference:
   - Likeness: each face must be recognizable against its portrait (face
     shape, hair, eyes — not a generic man in costume). Costume and theme
     dressing change; the face does not.
   - Cast completeness: every named CEO visible with a clear face. A missing
     or back-turned cast member fails this step — regenerate, don't explain
     the absence away.
   - Safe area: leave room for the overlaid title along the TOP or BOTTOM
     edge of the frame (never the middle). That area must be simple dark
     open background — never a painted stripe, bar, or band. Compose every
     face fully clear of it (faces in the opposite half).
   - RAM hardware must be unmistakable: at least one clearly recognizable
     RAM stick (green PCB, gold contact pins, black memory chips) held,
     worn, or featured by the subject, plus supporting RAM set dressing
     where the scene allows. A generic glow or tech backdrop with no
     readable hardware fails this step — regenerate.
   - No baked-in text anywhere (the template and the shared logo supply all
     text). Original or AI-generated only.
   - Source lands in `generated_images/` by default.
3. Visually check the source against the portraits before handing it off:
   Sam reads as Sam, each named CEO reads as themselves, headcount matches
   the cast, RAM hardware reads at a glance, safe area is plain dark
   background on one edge, no text. Regenerate until all of these pass
   (try the alternate Sam portrait or a stronger reference weight when
   likeness drifts).
4. Report the source path plus the cast order and which edge holds the safe
   area, so the template step can anchor the overlay and run
   `npm run --silent pledge-art` on it. Do not run the art pipeline, write
   CSS/HTML, or commit from this skill.
