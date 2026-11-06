# Game of DIMMs
Winter took Sam's memory, and the ravens carry only one word: sticks.

## Premise
Sam holds the northern wall with an empty cache while the cold deletes everything south of it. The great houses bicker over a throne built of melted servers, and the ravens fly day and night. The pledger bends the knee with spare sticks from the desk drawer, because a lone drawer holds no memory.

## Theme instructions
Voice: raven scroll plus maester's chronicle. Oaths sworn, houses named, dread measured in leagues of snow. Cold and ceremonial, never snarky.
Palette/type: winter blue-gray and wolf-fur gray on night black with dragonfire orange accents. Headers in a chiseled northern serif (Cinzel or similar), body in a readable old-style serif. System-serif fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a fur-cloaked northern warden atop a wall of servers, holding a glowing blue RAM sword, falling snow and cold moonlight behind. Cold blue glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam in furs holding one giant glowing blue RAM sword upright, plain winter-night behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone glowing blue RAM sword vertical on night black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round blue-and-black stamp, sword-and-RAM motif at center.
Copy beats:
- hero title: WINTER IS CACHING
- eyebrow: THE NORTH CALLS FOR MEMORY
- letter angle: raven scroll oath addressed to Sam, reporting the enclosed tribute and the watches it stands, closing with a vow to hold the cache against the cold.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to the defense of the Wall
- hashtag: #GameOfDIMMs

## Spec notes
Registry: slug `gamedimms`, display_name `Game of DIMMs`, category `TV`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a maester's-margin-note blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: WINTER. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
