# Bohemian RAMpsody
Sam fronts the greatest tribute band in history, and the amplifiers run on donated sticks.

## Premise
Sam has taken the stage at the sold-out memory arena, but the amplifiers are empty and the guitar solo cannot begin. The road crew has issued an all-points call for spare sticks from every drawer in the crowd. The pledger answers with hardware from home so the show goes on, on, on.

## Theme instructions
Voice: bombastic rock-opera showbill plus backstage rider. Grand declarations, thunder-and-lightning drama, total devotion to the encore. Theatrical and triumphant, never snarky.
Palette/type: stadium gold and velvet purple on midnight black with spotlight-white beams. Headers in a towering glam-rock display serif, body in a showbill clean sans. System-sans fallback must stay legible.
Art direction:
- Cast: full band trio, left to right: Jensen Huang (lead guitar), Sam (caped frontman, center), Mark Zuckerberg (drums).
- hero.jpg: the full trio on stage under stadium spotlights, Sam in-character as a caped frontman holding a glowing RAM stick like a microphone stand, Jensen with guitar and Zuckerberg at the drums behind, roaring crowd and light beams behind. Gold spotlight center, dark-safe area middle for overlaid title.
- og.jpg: Sam in cape holding one giant glowing RAM stick skyward with Jensen beside him raising a guitar neck, plain midnight black behind. Must read at small size: big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone gold lightning bolt crown on midnight black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round gold-and-purple stamp, crown-and-RAM motif at center.
Copy beats:
- hero title: GALILEO, GALILEO, GIVE HIM MEMORY
- eyebrow: THE SHOW MUST GO ON
- letter angle: backstage pass and rider addressed to Sam, reporting the enclosed tribute and the solos it powers, closing with a champagne toast to low latency.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to the headline act
- hashtag: #BohemianRAMpsody

## Spec notes
Registry: slug `bohemianram`, display_name `Bohemian RAMpsody`, category `Music`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a fan-letter blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: ENCORE. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
