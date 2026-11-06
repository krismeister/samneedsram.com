# Dunder DIMMflin
The Scranton branch is out of memory, and the boss has declared it DIMM Appreciation Day.

## Premise
Sam manages the world's best branch, and every computer in the office has slowed to a crawl. Corporate has approved zero budget for upgrades, as usual, and the copier is making a new noise. The pledger answers the branch-wide memo with spare sticks from home, which is absolutely getting mentioned at the Dundies.

## Theme instructions
Voice: branch memo plus talking-head aside. Mandatory fun, direct-address sincerity, world's-best-boss energy, total devotion to the branch family. Earnest and proud, never snarky.
Palette/type: office beige and copier gray on paper white with Dundie-gold accents. Headers in a cheery bold corporate-comedy sans, body in a plain office sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a beaming branch manager at a cluttered desk, hoisting a RAM stick like a trophy, office bullpen and conference room behind. Warm fluorescent glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam in shirtsleeves holding one giant gold RAM trophy, plain office-beige behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone gold trophy silhouette on office beige, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round beige-and-gold stamp, trophy-and-RAM motif at center.
Copy beats:
- hero title: WORLD'S BEST MEMORY BRANCH
- eyebrow: MANDATORY FUN — DIMM APPRECIATION DAY
- letter angle: branch-wide memo addressed to Sam, reporting the enclosed tribute and the workstations it rescues, closing with a Dundie nomination for low latency.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to the Scranton branch
- hashtag: #DunderDIMMflin

## Spec notes
Registry: slug `dunderdimm`, display_name `Dunder DIMMflin`, category `TV`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a talking-head pull-quote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: DUNDIE. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
