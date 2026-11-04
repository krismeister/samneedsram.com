# RAMbusters
Something strange is eating Sam's memory, and the crew just got the call.

## Premise
Sam's office is haunted by a memory-eating apparition, and the sticks keep vanishing from their slots overnight. The crew has suited up, warmed the traps, and declared the building a containment zone. The pledger joins the team by mailing fresh sticks rated for haunted hardware, sealed against slime.

## Theme instructions
Voice: deadpan paranormal-exterminator ad plus equipment manual. Service slogans, containment warnings, ready-to-believe confidence. Businesslike and fearless, never snarky.
Palette/type: containment-unit beige and hazard red on midnight black with ectoplasm-green slime accents. Headers in a bold condensed industrial sans (Oswald or similar), body in a sturdy clean sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a jumpsuited exterminator with an unlicensed memory-accelerator pack, holding a glowing RAM trap, haunted server room with a green apparition behind. Eerie green light center, dark-safe area middle for overlaid title.
- og.jpg: Sam in jumpsuit holding one giant glowing ghost trap with a RAM stick inside, plain midnight black behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone green apparition clutching a RAM stick on midnight black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round red-and-cream stamp, ghost-and-RAM motif at center.
Copy beats:
- hero title: WHO YOU GONNA MAIL?
- eyebrow: PARANORMAL MEMORY EVENTS DIVISION
- letter angle: completed service work order addressed to Sam, reporting the enclosed tribute and the haunting it replaces, closing with a warning never to cross the streams.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to bust the memory ghost
- hashtag: #RAMbusters

## Spec notes
Registry: slug `rambusters`, display_name `RAMbusters`, category `Movies`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a witness-statement blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: CONTAINED. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
