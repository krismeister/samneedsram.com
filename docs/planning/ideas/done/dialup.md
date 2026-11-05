# You've Got RAM
Sam's modem has been handshaking for six hours, and the memory never arrived.

## Premise
Sam is still on dial-up, and every stick must squeeze through a 56K line one screech at a time. The trial disc promises one thousand free hours, but the download bar has not moved since Tuesday. The pledger skips the phone line entirely and mails real hardware from the desk drawer, no busy signal required.

## Theme instructions
Voice: 1997 ISP welcome disc plus modem manual. Cheerful trial-offer promises, connection-status narration, busy-signal dread. Earnest and nostalgic, never snarky.
Palette/type: CD-ROM silver and welcome-screen blue on warm beige plastic with hyperlink-purple accents. Headers in a chunky 90s software sans (Tahoma-like), body in a plain clean sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character at a beige CRT desk buried in free-trial discs, holding a RAM stick to the phone line, modem lights blinking. Warm desk-lamp glow center, dark open desk front along the bottom edge for the overlaid title.
- og.jpg: Sam holding one giant free-trial disc with a RAM stick across it, plain welcome-screen blue behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone gold RAM stick on welcome-screen blue, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round blue-and-silver stamp, modem-and-RAM motif at center.
Copy beats:
- hero title: YOU'VE GOT RAM
- eyebrow: 1,000 FREE HOURS OF MEMORY
- letter angle: printed welcome email addressed to Sam, reporting the enclosed tribute and the connection it rescues, closing with a reminder that nobody should pick up the phone.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to get Sam online
- hashtag: #YouveGotRAM

## Spec notes
Registry: slug `dialup`, display_name `You've Got RAM`, category `Originals`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a forwarded-message blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: 56K. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
