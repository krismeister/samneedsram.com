# Much RAM
Such empty slots. Very forget. Wow.

## Premise
Sam is a very good boy whose treat drawer of memory has run completely empty. The sticks are gone, the slots are bare, and the wow is fading from the house. The pledger sends fresh sticks from home, because Sam deserves every memory in the world and a long walk after.

## Theme instructions
Voice: two-word wonder plus broken-English praise. Much, such, very, wow, total adoration for the good boy and his hardware. Adoring and sincere, never snarky.
Palette/type: shiba gold and impact-caption white on meme-sky blue with caption-bar black. Headers in a rounded comic display sans, body in a friendly clean sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a golden shiba chief sitting proud among floating RAM sticks, rainbow comic sky and green yard behind. Warm golden light center, dark-safe area middle for overlaid title.
- og.jpg: Sam's shiba face beside one giant RAM stick, plain meme-sky behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone gold RAM stick on caption-bar black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round gold-and-white stamp, paw-and-RAM motif at center.
Copy beats:
- hero title: SUCH MEMORY. VERY CACHE. WOW.
- eyebrow: SAM IS A VERY GOOD BOY
- letter angle: good-boy certificate addressed to Sam, reporting the enclosed tribute and the treats it earns, closing with a promise of walks and belly rubs at low latency.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to the very good boy
- hashtag: #MuchRAM

## Spec notes
Registry: slug `muchram`, display_name `Much RAM`, category `Originals`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a caption-bar blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: WOW. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
