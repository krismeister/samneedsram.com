# SeverRAM
Sam underwent the procedure, and now his innie is out of memory with a full quota of numbers left to sort.

## Premise
Sam's work memories are severed from his home memories, and the severed floor has run dry. His innie sits at the terminal with an empty quota and no sticks in the supply closet. The pledger answers the corporate call for tribute by mailing spare memory from the desk drawer, cleaned of dust and approved for both halves of Sam.

## Theme instructions
Voice: cheerful-dystopian corporate memo and HR handbook. Short declarative sentences, numbered directives, warm praise for compliance, total reverence for the procedure. Polite and faintly menacing in equal measure, never snarky.
Palette/type: cold office teal and phosphor green on pale beige, with dark navy text and black directive rules. Headers in a clean mid-century corporate sans (Archivo or similar, tight and calm), body in a neutral sans with memo fields in a typewriter mono. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a severed office worker in a retro-futuristic teal corridor, holding a glowing RAM stick up to a wall scanner, long fluorescent hallway behind. Cold teal light center, dark-safe area middle for overlaid title.
- og.jpg: Sam in suit and tie holding one giant glowing RAM stick upright, plain teal office wall behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone glowing RAM stick on cold teal, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round teal-and-white corporate stamp, RAM-chip motif at center.
Copy beats:
- hero title: YOUR INNIE IS OUT OF MEMORY
- eyebrow: THE SEVERED FLOOR CALLS FOR TRIBUTE
- letter angle: formal compliance memo addressed to Sam's innie, reporting the enclosed tribute and its faithful prior service, closing with praise for the procedure and a reminder to meet quota.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to Sam's innie
- hashtag: #SeverRAM

## Spec notes
Registry: slug `severram`, display_name `SeverRAM`, category `TV`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as an appended personal note blockquote filed under the memo as a non-work memory; the route strips the whole block when eulogy is empty.
Seal text: SEVERED. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
