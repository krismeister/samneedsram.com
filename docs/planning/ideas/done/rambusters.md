# RAMbusters
Something strange is eating Sam's memory, so he called in the full crew.

## Premise
Sam's office is haunted by a memory-eating apparition, and the sticks keep vanishing from their slots overnight. One exterminator wasn't enough, so the whole crew suited up: four jumpsuits, four accelerator packs, one containment zone. The pledger joins the team by mailing fresh sticks rated for haunted hardware, sealed against slime.

## Theme instructions
Voice: deadpan paranormal-exterminator ad plus equipment manual. Service slogans, containment warnings, ready-to-believe confidence. Businesslike and fearless, never snarky.
Palette/type: containment-unit beige and hazard red on midnight black with ectoplasm-green slime accents. Headers in a bold condensed industrial sans (Oswald or similar), body in a sturdy clean sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: full four-CEO crew in tan exterminator jumpsuits with accelerator packs, standing shoulder to shoulder in a haunted server aisle, green apparition looming behind. Sam holds one clearly recognizable RAM stick (green PCB, gold pins, black chips) up where it catches the light. Dark, simple open background along the BOTTOM edge for the overlaid title; all four faces fully in the upper half, clear of it.
- Cast: full crew of four, left to right: Elon Musk (unlicensed accelerator pack), Sam Altman (center, holding the RAM stick), Jensen Huang (ectoplasm meter), Mark Zuckerberg (ghost trap). The hero carries the full cast.
- og.jpg: unchanged — Sam in jumpsuit holding one giant glowing ghost trap with a RAM stick inside, plain midnight black behind.
- picker.jpg: unchanged — lone green apparition clutching a RAM stick on midnight black, centered.
- seal.png: unchanged — round red-and-cream stamp, ghost-and-RAM motif at center.
Copy beats:
- hero title: WHO YOU GONNA MAIL?
- eyebrow: PARANORMAL MEMORY EVENTS DIVISION
- letter angle: completed service work order addressed to Sam, reporting the enclosed tribute and the haunting it replaces, closing with a warning never to cross the streams.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to bust the memory ghost
- hashtag: #RAMbusters

## Spec notes
Registry: slug `rambusters`, display_name `RAMbusters`, category `Movies`, share_suffix `to bust the memory ghost`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a witness-statement blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: CONTAINED. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
