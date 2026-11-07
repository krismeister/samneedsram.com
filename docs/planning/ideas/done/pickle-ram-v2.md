# Pickle RAM
The tribute landed and the seventeen dimensions survived dinner — now the Council of RAMs has put the pickle himself on trial for the missing memory.

## Premise
The garage solder job held, but the Council of RAMs audited the reserves and found Sam's ledger several terabytes short. Sam is still a pickle and cannot reach the witness stand without assistance, so he stands accused in a glass evidence jar wearing a tiny suit. The pledger's sticks are entered into evidence as Exhibit A — bail posted in hardware — so the verdict comes back before the portal fluid dries.

## Theme instructions
Voice: pompous interdimensional courtroom procedure colliding with garage-inventor contempt-of-court rants. Gavel-flat legal declarations, exhibit-stamping formality, sudden sincere testimony about old hardware. Solemn and unhinged, never snarky.
Palette/type: portal green and lab-coat white on tribunal charcoal with gavel-gold accents. Headers in a stern condensed tribunal display sans with gavel-heavy weights, body in a plain clerk-typed sans. System-sans fallback must stay legible.
Art direction:
- Cast: tribunal trio, left to right: Elon Musk (robed Council Chairman, gavel raised), Sam (pickle defendant in a tiny suit, center, inside a glass evidence jar), Jensen Huang (leather-jacketed bailiff presenting Exhibit A).
- hero.jpg: the full trio in a portal-lit tribunal chamber, Sam in-character as a pickle in a tiny suit inside the evidence jar on the witness stand, Elon robed at the bench with gavel raised, Jensen beside the stand holding a glowing RAM stick tagged as evidence, green portal glow behind the bench. Gold gavel glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam the pickle in the tiny suit in the evidence jar beside Jensen holding one giant glowing RAM stick, plain tribunal charcoal behind. Must read at small size: big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone gold gavel crossed with a green RAM stick on tribunal black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round green-and-gold stamp, gavel-and-RAM motif at center.
Copy beats:
- hero title: OBJECTION: PICKLE
- eyebrow: THE COUNCIL OF RAMS IS NOW IN SESSION
- letter angle: court filing and bail receipt addressed to Sam, entering the enclosed tribute as Exhibit A and posting bail in hardware, closing with a gavel-flat promise that the pickle will appear for sentencing.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to spring the pickle on bail
- hashtag: #PickleRAM (reused from v1 — the share already carries it, no new tag)

## Spec notes
Registry: slug `pickle-ram-v2`, display_name `Pickle RAM`, category `TV`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a sworn-testimony blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: BAIL. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
