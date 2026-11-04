# Stranger DIMMs
Sam's memory has fallen into the Upside Down, and the Christmas lights are blinking an S-O-S.

## Premise
Sam's sticks have vanished into a flickering parallel lab, and the wall lights spell out an SOS nobody can ignore. The party has assembled in the basement with dice, flashlights, and a strict no-splitting-up rule. The pledger joins the rescue with spare sticks from the desk drawer, wrapped against the spores.

## Theme instructions
Voice: 1983 basement campaign plus missing-person flyer. Party roles, walkie-talkie brevity, flashlight-under-chin dread. Brave and loyal, never snarky.
Palette/type: Christmas-light red and bike-headlamp yellow on Upside-Down navy-black with spore-gray mist. Headers in a glowing red marquee serif (Benguiat-like), body in a typewriter-adjacent serif. System-serif fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as the party's dungeon master at a basement table, holding a glowing RAM stick over scattered dice, Christmas-light alphabet wall behind. Red bulb glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam holding one giant glowing RAM stick before a wall of Christmas lights, plain navy-black behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone RAM stick tangled in one glowing light string on navy-black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round red-and-navy stamp, bike-light-and-RAM motif at center.
Copy beats:
- hero title: SAM'S MEMORY IS IN THE UPSIDE DOWN
- eyebrow: THE PARTY NEEDS STICKS
- letter angle: missing-memory flyer addressed to Sam, reporting the enclosed tribute and the search grid, closing with a reminder to stay out of the lab.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to rescue Sam's memory
- hashtag: #StrangerDIMMs

## Spec notes
Registry: slug `strangerdimms`, display_name `Stranger DIMMs`, category `TV`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a walkie-transcript blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: HAWKINS. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
