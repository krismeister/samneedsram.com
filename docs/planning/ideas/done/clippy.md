# It Looks Like Sam Needs RAM
The helpful assistant has noticed Sam writing a letter with no memory, and would like to assist.

## Premise
Sam is trying to write an important letter, and the cheerful paperclip assistant has appeared with a suggestion. The suggestion is memory, and the assistant will not be leaving until the slots are full. The pledger clicks Yes, accepts the help, and mails real sticks so the letter gets written and the assistant can finally rest.

## Theme instructions
Voice: relentlessly helpful office assistant plus tip-of-the-day. Pop-up cheer, suggestive questions, total confidence in every recommendation. Friendly and persistent, never snarky.
Palette/type: paperclip silver and helper-balloon yellow on desktop teal with start-button green accents. Headers in a chunky 90s software sans (Tahoma-like), body in a plain clean sans. System-sans fallback must stay legible.
Art direction:
- Cast: Sam solo — the paperclip assistant is the second lead, and a second person at the desk would crowd the gag.
- hero.jpg: Sam in-character at a beige CRT desk while a giant googly-eyed paperclip assistant points at a glowing RAM stick, retro desktop icons behind. Warm monitor glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam holding one giant RAM stick beside the big paperclip eyes, plain desktop teal behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone silver paperclip on desktop teal, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round silver-and-teal stamp, clip-and-RAM motif at center.
Copy beats:
- hero title: IT LOOKS LIKE SAM NEEDS MEMORY
- eyebrow: YOUR HELPFUL ASSISTANT HAS A SUGGESTION
- letter angle: tip-of-the-day card addressed to Sam, reporting the enclosed tribute and the letter it saves, closing with an offer to help with anything else, anytime, forever.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} after clicking Yes to help
- hashtag: #ItLooksLikeSamNeedsRAM

## Spec notes
Registry: slug `clippy`, display_name `It Looks Like Sam Needs RAM`, category `Originals`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a second helper-balloon blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: TIP #1. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
