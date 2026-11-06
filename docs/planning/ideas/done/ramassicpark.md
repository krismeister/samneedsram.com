# RAMassic Park
Sam cloned the dinosaurs but forgot to budget memory for the fences.

## Premise
Sam's island park holds living dinosaurs and a control room running on fumes. The fences, the tour jeeps, and the raptor paddock locks all share one dying stick of memory. The pledger mails fresh sticks so the tour stays boring, the fences stay on, and the weekend stays uneventful.

## Theme instructions
Voice: park brochure wonder plus control-room safety manual. Spared-no-expense declarations, chaos-theory warnings, raptor-fence reverence. Awestruck and procedural, never snarky.
Palette/type: jungle green and mosquito-amber on night black with tour-jeep red accents. Headers in a tall condensed adventure sans (Oswald or similar), body in a sturdy clean sans. System-sans fallback must stay legible.
Art direction:
- Cast: park duo, left to right: Sam (safari-hatted founder), Elon Musk (chaos theorist).
- hero.jpg: Sam in-character as a safari-hatted park founder holding a RAM stick up before towering park gates, Elon in-character as a leather-jacketed chaos theorist gesturing at a raptor-paddock readout beside him, dinosaur silhouette and jungle mist behind. Amber gate-light center, dark-safe area middle for overlaid title.
- og.jpg: Sam in safari hat and Elon beside him holding one giant amber RAM stick between them, plain jungle-night behind. Must read at small size: big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone amber RAM stick in an amber circle on night black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round amber-and-black stamp, claw-and-RAM motif at center.
Copy beats:
- hero title: LIFE FINDS A WAY TO CACHE
- eyebrow: THE PARK NEEDS MEMORY
- letter angle: park intake memo and safety waiver addressed to Sam, reporting the enclosed tribute and the fences it powers, closing with a reminder that the raptors are testing the locks.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to keep the fences on
- hashtag: #RAMassicPark

## Spec notes
Registry: slug `ramassicpark`, display_name `RAMassic Park`, category `Movies`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a visitor-log blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: FENCES ON. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
