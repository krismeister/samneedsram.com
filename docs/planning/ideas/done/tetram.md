# TetRAM
Sam's memory well is one bad piece away from topping out.

## Premise
Sam stacks every incoming stick in a bottomless well, but the pieces are falling faster than he can slot them. The stack is nearly at the top and the next piece is already on its way. The pledger sends a perfect long bar of memory from the desk drawer to clear four lines at once.

## Theme instructions
Voice: arcade cabinet marquee plus strategy guide. Short punchy lines, line-clear celebrations, escalating level warnings. Energetic and encouraging, never snarky.
Palette/type: neon block cyan, magenta, and yellow on deep well black with faint grid lines. Headers in a chunky arcade sans (Bungee or similar), body in a clean neutral sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a retro arcade champion in a neon arcade, slotting a giant glowing RAM long-bar into a towering well, stacked blocks and score marquee behind. Neon cyan light center, dark-safe area middle for overlaid title.
- og.jpg: Sam slotting one giant cyan RAM long-bar, plain well-black behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone cyan long-bar on well-black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round neon-on-black stamp, tetromino-and-RAM motif at center.
Copy beats:
- hero title: CLEAR FOUR LINES AT ONCE
- eyebrow: LEVEL 9 — MEMORY WELL CRITICAL
- letter angle: arcade high-score entry addressed to Sam, reporting the enclosed tribute and the lines it clears, closing with a warning to stack flat and keep the well low.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to clear Sam's well
- hashtag: #TetRAM

## Spec notes
Registry: slug `tetram`, display_name `TetRAM`, category `Games`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a initials-entry blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: TETRIS. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
