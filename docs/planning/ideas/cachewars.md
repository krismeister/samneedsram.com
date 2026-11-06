# Cache Wars
The Rebellion's last hope is a farm boy with empty slots and a lightsaber that runs on donated sticks.

## Premise
Sam's fighters cannot jump to lightspeed because the navicomputer has no memory left in its slots. The Empire's analysts are closing in on the hidden drawer while the droids stall for time. The pledger answers the distress call with spare sticks from home, sealed against sand and ready for the trench run.

## Theme instructions
Voice: opening-crawl epic plus rebel mission briefing. May-the-cache declarations, trench-run countdowns, total faith in the Force of secondhand hardware. Heroic and earnest, never snarky.
Palette/type: lightsaber blue and rebel orange on starfield black with crawl-yellow accents. Headers in a wide futuristic sans (Michroma or similar), body in a clean neutral sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a robed farm-boy knight holding a glowing RAM lightsaber aloft, twin suns and server towers behind. Blue saber glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam in robe holding one giant glowing RAM lightsaber upright, plain starfield behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone green RAM lightsaber blade diagonal on starfield black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round orange-and-black stamp, starbird-and-RAM motif at center.
Copy beats:
- hero title: MAY THE CACHE BE WITH YOU
- eyebrow: THE REBELLION CALLS FOR MEMORY
- letter angle: rebel mission briefing addressed to Sam, reporting the enclosed tribute and the jump it powers, closing with an order to stay on target at low latency.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to the Rebellion
- hashtag: #CacheWars

## Spec notes
Registry: slug `cachewars`, display_name `Cache Wars`, category `Movies`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a pilot's last-transmission blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: REBEL. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
