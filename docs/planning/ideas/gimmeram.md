# Gimme Gimme RAM
It's half past twelve and Sam still has no memory — gimme gimme gimme a stick after midnight.

## Premise
Sam is dancing alone at the disco with an empty cache while the mirror ball turns overhead. The band plays on, the platform boots are polished, and the night is young, but the memory is gone. The pledger answers the midnight call with sticks from home so the music never stops and the dancing king keeps dancing.

## Theme instructions
Voice: disco showbill plus liner-note euphoria. Sequins, spotlights, Waterloo-scale declarations of devotion to the groove. Dazzling and heartfelt, never snarky.
Palette/type: mirror-ball silver and sequin gold on disco-midnight purple with platform-boot white. Headers in a glittering 70s display serif, body in a clean showbill sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a white-jumpsuited disco king under a giant mirror ball, holding a glowing RAM microphone, packed dance floor behind. Silver ball-light center, dark-safe area middle for overlaid title.
- og.jpg: Sam in white jumpsuit holding one giant glowing RAM microphone skyward, plain disco purple behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone silver mirror ball on disco purple, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round silver-and-purple stamp, ball-and-RAM motif at center.
Copy beats:
- hero title: GIMME GIMME GIMME A STICK AFTER MIDNIGHT
- eyebrow: THE DISCO CALLS FOR MEMORY
- letter angle: backstage fan note addressed to Sam, reporting the enclosed tribute and the dances it powers, closing with a toast to knowing the song and the steps at low latency.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to keep the disco dancing
- hashtag: #GimmeGimmeRAM

## Spec notes
Registry: slug `gimmeram`, display_name `Gimme Gimme RAM`, category `Music`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a fan-mail blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: DANCING. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
