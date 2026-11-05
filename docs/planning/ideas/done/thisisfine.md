# This RAM Is Fine
Sam's server room is on fire, and he has decided this is fine.

## Premise
Sam sits at his desk in a burning server room, calmly watching the memory melt one stick at a time. The sprinklers are decorative and the backup plan is optimism. The pledger sends fresh sticks from the desk drawer anyway, because everything is fine and Sam will remember.

## Theme instructions
Voice: aggressively calm office optimism plus incident report. Soothing reassurances, escalating fire, total denial. Serene and sincere, never snarky.
Palette/type: fire orange and smoke gray on office beige with extinguisher-red accents. Headers in a friendly cartoon-round sans, body in a plain office sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character sitting calmly at a desk in a burning server room, sipping coffee and holding a RAM stick, flames and melting racks all around. Warm fire glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam's calm face with a coffee mug and one RAM stick, plain fire-orange behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone coffee mug on fire-orange, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round orange-and-cream stamp, flame-and-RAM motif at center.
Copy beats:
- hero title: THIS IS FINE
- eyebrow: ROUTINE THERMAL EVENT IN PROGRESS
- letter angle: calm incident report addressed to Sam, reporting the enclosed tribute and the normal temperatures, closing with a reassurance that everything is fine.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to Sam's totally fine server room
- hashtag: #ThisRAMIsFine

## Spec notes
Registry: slug `thisisfine`, display_name `This RAM Is Fine`, category `Originals`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as an eyewitness-calm-statement blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: FINE. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
