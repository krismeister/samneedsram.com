# MineCache
Sam spawned in a fresh world with empty hands, and night is falling fast.

## Premise
Sam woke up on a blocky shore with nothing in his inventory and monsters due at sundown. The first night is coming and there is no shelter, no torch, and no memory in any slot. The pledger mails the starter kit of sticks from the desk drawer so Sam can punch trees, raise walls, and survive till dawn.

## Theme instructions
Voice: starter-guide earnestness plus achievement toast. Crafting recipes, day-count warnings, blocky wonder at every new stick. Helpful and square, never snarky.
Palette/type: grass-block green and dirt brown on cave black with diamond cyan accents. Headers in a chunky pixel-adjacent sans, body in a clean neutral sans. System-sans fallback must stay legible.
Art direction:
- Cast: Sam solo — the fresh-spawn first-night survival joke is inherently solitary.
- hero.jpg: Sam in-character as a blocky adventurer raising a glowing RAM pickaxe before a half-built dirt shelter at sunset, square sun on the horizon. Warm sunset glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam holding one giant cyan RAM diamond overhead, plain grass-block green behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone cyan diamond-RAM on cave black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round green-and-brown stamp, pickaxe-and-RAM motif at center.
Copy beats:
- hero title: PUNCH TREES, MAIL STICKS
- eyebrow: NIGHT 1 IS COMING
- letter angle: crafting-guide page addressed to Sam, reporting the enclosed tribute and the shelter it builds, closing with the first rule: never dig straight down.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to Sam's starter base
- hashtag: #MineCache

## Spec notes
Registry: slug `minecache`, display_name `MineCache`, category `Games`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a carved-sign blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: DIAMONDS. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
