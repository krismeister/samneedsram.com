# The Cake Is a DIMM
Aperture Science has approved Sam for testing, and the cake is contingent on donated memory.

## Premise
Sam has volunteered for the enrichment program, but the test chambers cannot run without memory in their slots. The facility kindly requests spare sticks from the desk drawer so testing can continue indefinitely. Print the kit, post the sticks, and the cake will be forthcoming at the conclusion of the test.

## Theme instructions
Voice: passive-aggressive AI test administrator plus clipboard safety protocol. Cheerful threats, generous promises of cake, total sincerity about the science. Polite and ominous in equal measure, never snarky.
Palette/type: test-chamber white and observation-gray on enrichment-blue with companion-cube pink accents. Headers in a clean clinical sans with rounded test-subject friendliness, body in a neutral lab sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as an orange-jumpsuited test subject holding a glowing RAM portal device, white test chamber with round and square portals behind. Cool chamber light center, dark-safe area middle for overlaid title.
- og.jpg: Sam in jumpsuit holding one giant RAM stick between two glowing portals, plain chamber-white behind. Must read at small size: big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone orange-and-blue portal pair on chamber-white, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round white-and-blue stamp, portal-and-RAM motif at center.
Copy beats:
- hero title: THE CAKE IS A DIMM
- eyebrow: APERTURE CALLS FOR TEST SUBJECTS
- letter angle: test consent form addressed to Sam, reporting the enclosed tribute and the chambers it powers, closing with a reminder that the cake is not a lie.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to the enrichment program
- hashtag: #CakeIsADIMM

## Spec notes
Registry: slug `portal`, display_name `The Cake Is a DIMM`, category `Games`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a test-subject-observation blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: APERTURE. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
