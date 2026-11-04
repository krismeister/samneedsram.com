# 1.21 Gigabytes
Sam is stuck in the past with 64KB of memory, and the car only runs on donated sticks.

## Premise
Sam's time machine needs 1.21 gigabytes to get back to the future, and 1955 has no computer store. The clock tower lightning strike is on the schedule, and the capacitor is sitting empty. The pledger sends period-defying sticks from the desk drawer so the trip home stays on the timetable.

## Theme instructions
Voice: wild-eyed inventor rant plus 1950s ad optimism. Exclamations, precise timestamps, total reverence for velocity. Frantic and delighted, never snarky.
Palette/type: flux-capacitor teal and clock-tower amber on midnight blue with stainless-steel silver. Headers in a retro-futuristic chrome sans, body in a mid-century ad sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a time-traveling inventor in a puffy vest beside a gull-wing car with a glowing RAM flux core, clock tower at night behind. Electric teal light center, dark-safe area middle for overlaid title.
- og.jpg: Sam in vest holding one giant glowing RAM capacitor, plain midnight blue behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone glowing RAM lightning bolt on midnight blue, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round amber-and-blue stamp, clock-and-RAM motif at center.
Copy beats:
- hero title: WHERE WE'RE GOING WE NEED MEMORY
- eyebrow: 1.21 GIGABYTES REQUIRED
- letter angle: urgent telegram from the past addressed to Sam, reporting the enclosed tribute and the lightning schedule, closing with a reminder to mind the clock tower.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to get Sam back to the future
- hashtag: #121Gigabytes

## Spec notes
Registry: slug `backtothefuture`, display_name `1.21 Gigabytes`, category `Movies`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a timetable-annotation blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: OUTATIME. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
