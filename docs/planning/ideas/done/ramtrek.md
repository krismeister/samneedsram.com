# RAM Trek
Sam's starship computer is running on impulse power with a galaxy of data left to chart.

## Premise
Sam commands a starship whose core memory is nearly empty, and the next star system will not chart itself. Starfleet has issued a standing directive: all available sticks are to be beamed aboard at once. The pledger answers from the homeworld with spare memory from the desk drawer, cleaned and ready for the core.

## Theme instructions
Voice: captain's log plus Starfleet regulation. Stardates, numbered directives, calm-under-pressure declarations. Dutiful and optimistic, never snarky.
Palette/type: command gold and science blue on deep space black with viewscreen-star white. Headers in a sleek wide futuristic sans (Michroma or similar), body in a clean neutral sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a starship captain on the bridge, holding a glowing RAM core before the viewscreen, starfield and planet curve behind. Cool blue light center, dark empty starfield across the top edge for the overlaid title.
- og.jpg: Sam in uniform holding one giant glowing RAM core, plain starfield behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone gold delta badge on deep space black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round gold-and-black stamp, delta-and-RAM motif at center.
Copy beats:
- hero title: TO BOLDLY CACHE WHAT NO ONE HAS CACHED BEFORE
- eyebrow: STARFLEET CALLS FOR MEMORY
- letter angle: captain's log entry addressed to Sam, reporting the enclosed tribute and its faithful prior service, closing with an order to engage at low latency.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to Captain Sam
- hashtag: #RAMTrek

## Spec notes
Registry: slug `ramtrek`, display_name `RAM Trek`, category `TV`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a supplemental log-entry blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: STARFLEET. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
