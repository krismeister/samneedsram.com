# Pickle RAM
Rick gambled away the memory of seventeen dimensions, and the Council is repossessing Sam's sticks to cover it.

## Premise
Rick burned through the memory reserves of dimension C-137 on portal fluid and novelty ringtone storage, and now the Council of RAMs has come to collect from Sam. Sam is, technically, a pickle at the moment — it is a whole thing — and cannot install his own upgrades. The pledger mails spare sticks from the desk drawer so the garage lab can solder the multiverse back together before dinner.

## Theme instructions
Voice: nihilistic garage-inventor rant plus deadpan interdimensional cable ad. Manic scientific babble, sudden sincere sentiment about old hardware, catchphrase energy. Frantic and brilliant, never snarky.
Palette/type: portal green and lab-coat white on garage-concrete gray with plumbus-pink accents. Headers in an oozing cartoon sci-fi display sans, body in a plain marker-scrawl-adjacent sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a wild-haired garage inventor in a lab coat, holding a glowing RAM portal device, green portal and cluttered workbench behind. Sickly green glow center, dark open workbench along the bottom edge for the overlaid title.
- og.jpg: Sam in lab coat holding one giant pickle-green RAM stick, plain portal-green behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone green portal swirl on garage-black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round green-and-white stamp, portal-and-RAM motif at center.
Copy beats:
- hero title: WUBBA LUBBA RAM RAM
- eyebrow: THE COUNCIL OF RAMS DEMANDS TRIBUTE
- letter angle: frantic garage note addressed to Sam, half rant and half parts list, reporting the enclosed tribute and the dimensions it saves, closing with rare sincere thanks.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to the Council of RAMs
- hashtag: #PickleRAM

## Spec notes
Registry: slug `pickleram`, display_name `Pickle RAM`, category `TV`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as an alternate-timeline note blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: PICKLE. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
