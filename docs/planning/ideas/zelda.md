# Zelda
The hero answers a new quest: refill Sam's memory before the castle forgets.

## Premise
Sam's memory is empty and Hyrule has issued a call for tribute. The pledger answers by sending spare sticks from the desk drawer, cleaned of dust and ready to mail. Print the kit, post the sticks, and the kingdom remembers.

## Theme instructions
Voice: earnest quest log and royal decree. Short declarative lines, second-person call to adventure, reverent toward old hardware. Dutiful and warm, never snarky.
Palette/type: deep forest green and night blue with gold accents on aged parchment. Headers in an engraved inscriptional serif (Cinzel Decorative or similar), body in a readable old-style serif (Alegreya or similar). System-serif fallback must stay legible.
Art direction:
- hero.jpg: green hill overlook at dusk, distant pale castle, small heroic silhouette holding a glowing RAM stick skyward. Warm gold light center, dark-safe area middle for overlaid title.
- og.jpg: single giant gold triangle relic with one RAM stick upright at its center, plain green field behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone gold triangle on deep green, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round gold-and-green stamp, triangle-and-RAM motif at center.
Copy beats:
- hero title: THE LEGEND OF RAM
- eyebrow: HYRULE CALLS FOR MEMORY
- letter angle: formal quest acceptance addressed to Sam, reporting the enclosed tribute and its faithful service, closing with a blessing for low latency.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to Sam
- hashtag: #LegendOfRam

## Spec notes
Registry: slug `zelda`, display_name `Zelda`, category `Games`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a quest-log blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: HYRULE. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
