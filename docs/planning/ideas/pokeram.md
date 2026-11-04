# PokeRAM
Sam set out to cache every stick, but his boxes are empty and the tall grass keeps rustling.

## Premise
Sam is a young trainer whose party has fainted for lack of memory three routes from the nearest town. The professor's research cannot continue until somebody restocks the boxes. The pledger, a fellow trainer, sends spare sticks in a parcel from home, fully healed and ready for battle.

## Theme instructions
Voice: cheerful game tutorial plus creature-entry wonder. Exclamation marks, route-and-badge flavor, warm encouragement for the new trainer. Bright and earnest, never snarky.
Palette/type: trainer red and volt yellow on cream white with tall-grass green accents. Headers in a chunky rounded game sans (Bungee or similar), body in a friendly clean sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a young trainer with cap and backpack on a grassy route at dawn, holding a glowing RAM stick high, small round wild RAM-creatures rustling in the grass. Warm morning light center, dark-safe area middle for overlaid title.
- og.jpg: Sam in cap holding one giant red-and-white sphere with a RAM stick inside, plain grass-green behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone red-and-white sphere on tall-grass green, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round red-and-white stamp, sphere-and-RAM motif at center.
Copy beats:
- hero title: GOTTA CACHE 'EM ALL
- eyebrow: A WILD MEMORY SHORTAGE APPEARED
- letter angle: cheerful trade offer addressed to Sam, reporting the enclosed tribute and its battle record, closing with a badge blessing for low latency.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to Trainer Sam
- hashtag: #PokeRAM

## Spec notes
Registry: slug `pokeram`, display_name `PokeRAM`, category `Games`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a trainer-note blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: TRAINER. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
