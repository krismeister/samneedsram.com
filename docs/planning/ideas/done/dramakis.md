# DRAMakis
The spice must flow, but Sam's memory has run dry on Arrakis.

## Premise
On Arrakis, memory is the scarcest resource in the known universe, and Sam's reserves have reached zero. He must cross the deep desert carrying the tribe's entire past with nowhere to store it. The pledger answers the desert call by sending spare sticks from the desk drawer, sealed against sand and ready to ride.

## Theme instructions
Voice: prophetic desert epic with Fremen solemnity. Litany-like cadence, sworn-oath declarations, total reverence for old hardware. Grave and ceremonial, never snarky.
Palette/type: burnt orange sand and deep brown-black with pale sun-gold accents. Headers in a monumental inscriptional serif (Cinzel or similar), body in a readable old-style serif (Alegreya or similar). System-serif fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a desert prophet in a stillsuit on a great dune, holding a glowing RAM stick skyward, sandworm ridge and twin moons behind. Warm gold light center, dark-safe area middle for overlaid title.
- og.jpg: Sam in stillsuit holding one giant glowing RAM stick aloft, plain desert dusk behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone glowing RAM stick planted upright in sand on burnt orange, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round sand-and-black stamp, worm-and-RAM motif at center.
Copy beats:
- hero title: FEAR IS THE MEMORY-KILLER
- eyebrow: ARRAKIS CALLS FOR MEMORY
- letter angle: sworn oath to the prophet addressed to Sam, reporting the enclosed tribute and its faithful service, closing with a litany blessing for low latency.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to Sam of Arrakis
- hashtag: #DRAMakis

## Spec notes
Registry: slug `dramakis`, display_name `DRAMakis`, category `Movies`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a prophecy-verse blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: ARRAKIS. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
