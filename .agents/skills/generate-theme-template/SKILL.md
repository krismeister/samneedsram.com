---
name: generate-theme-template
description: Build a spec-compliant pledge theme (template, CSS, art) from an idea file in docs/planning/ideas/.
---

# Generate Theme Template

Turn one idea file into finished, committable theme artifacts. Follow the
steps in order; each one builds on the last.

## References (read before building)

- The idea file (moved to `done/` in step 1).
- `docs/pledge-pages-spec.md` — the whole contract: markers, art table,
  template rules.
- `html/pledges/ramageddon.html` + `public/pledges/css/ramageddon.css` —
  structural reference: marker use, byte-exact eulogy conditional, CTA
  layout, compact celebration script.
- A seal SVG in `scripts/pledge-art/seals/` for the seal pattern.

## Steps

1. Claim the idea: never ask which idea to build. Unless the
   invoking request names a slug explicitly, pick the oldest pending
   file in `docs/planning/ideas/*.md` (excluding `done/`) by
   filesystem mtime, oldest first. Move it to
   `docs/planning/ideas/done/<slug>.md` (create `done/` if missing).
   The move signals the idea is being worked on. Work from the moved
   file. If no pending idea file exists, stop and report that.
2. Generate art sources with image generation, one per asset:
   - hero source: per the idea's art direction; must leave room for the
     overlaid title. RAM hardware must be unmistakable in the frame:
     at least one clearly recognizable RAM stick (green PCB, gold
     contact pins, black memory chips) held, worn, or featured by the
     subject, plus supporting RAM set dressing where the scene allows
     (scattered sticks, RAM-shaped props, DIMM-slot architecture). A
     generic glow or tech backdrop with no readable hardware fails
     this step — regenerate the source.
   - og source: huge simple shapes, high contrast, reads at thumbnail size.
   - picker source: single bold centered motif.
   - Rules: original or AI-generated; no baked-in text anywhere (the
     template and the shared logo supply all text); follow §4 as written
     for everything else. Sources land in `generated_images/` by default.
   - Face likeness: when the idea puts Sam, Elon, Zuck, or Jensen in
     the art, pass the matching portrait from `mailer-assets/photos/`
     as a generation reference so the model matches the face. Sam:
     `sam-villageglobal-2022.jpg`; Elon:
     `elon-royalsociety-2018.jpg`; Zuck: `zuck-2025.jpg`; Jensen:
     `jensen-stanford-2026.jpg`.
3. Draw the seal: write `scripts/pledge-art/seals/<slug>.svg` — 512
   viewBox, transparent background, motif only, NO text (the template
   overlays the seal word in HTML). Keep the center empty for the word.
4. Process and check mechanically with the repo script (it enforces the
   §4 size table and composites the shared logo onto og):
   `npm run --silent pledge-art -- <slug> --hero <src> --og <src>
   --picker <src> --seal-svg scripts/pledge-art/seals/<slug>.svg
   [--picker-top <px>]`
   Add `--picker-top` when the tiny-strip motif sits above/below center
   (e.g. faces). Every line must report OK; fix inputs and re-run until
   they do.
5. Visually check every output (hero, og, picker, seal): no baked-in
   text, the hero shows a clearly recognizable RAM stick (reject and
   regenerate if the hardware doesn't read), the motif survives its
   crop, the logo badge doesn't cover faces or key shapes, seal rings
   render. Regenerate or adjust and re-run step 4 as needed.
6. Write `public/pledges/css/<slug>.css`: the theme look per the idea
   (Google Fonts allowed, must degrade to system fonts), mobile-first
   with a 640px breakpoint, print stylesheet hiding canvas/noprint/hero,
   eulogy quotes via `blockquote.eulogy::before/::after` (the
   conditional's inner HTML stays byte-exact), seal overlay styles.
7. Write `html/pledges/<slug>.html`: valid HTML5; required `<head>`
   block verbatim from §3; absolute asset paths only (`/pledges/...`);
   only allowlisted `{{markers}}`; the eulogy conditional byte-exact;
   kind-agnostic phrasing (`{who} pledged {qty} {qty_unit} {type}...`)
   so ram/floppy/usb all read right; no pledge numbers; corporate
   mail-to address only (OpenAI, 3180 18th St, San Francisco, CA 94110);
   share actions as static anchors (`target="_blank"`, escape `&` as
   `&amp;`); deadpan copy, no joke/parody disclaimers. Optional inline
   JS: under 50 lines, no dependencies, page fully works with JS
   disabled.
8. Prove it: add a maintained test following
   `tests/classic-floppy.test.mjs` (pin the reviewed art bytes; fill ram
   and floppy payloads through `lib/pledge-pages.js` `fillTemplate`
   with and without eulogy; assert no leftover markers). Run the focused
   test, screenshot the filled renders (desktop plus 390px mobile;
   confirm hero, seal, letter, share card, no overflow, zero page
   errors), then run the full `npm test` once.
9. Register last: only after art, template, CSS, test, and
   screenshots are all done and passing, append one entry to
   `public/pledges/themes.json` (`slug` + `display_name` +
   `category` from the idea's Spec notes Registry line). Keep the
   file valid JSON; change nothing else in it. Re-run `npm test`
   to confirm the registry edit broke nothing.
10. Land and continue: report every path created. The full
   `npm test` must be green; never commit on red. Commit the theme
   artifacts to `main` with a Conventional Commits message, push to
   `main`, then immediately start the next oldest pending idea
   (back to step 1). Stop only when no pending idea file exists.
