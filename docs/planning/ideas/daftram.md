# Daft RAM
Sam's robots have been running the same loop all night, and the memory is about to run out.

## Premise
Two helmeted robots keep Sam's music playing around the world, but their memory banks are nearly full and the loop cannot stop. The pyramid stage is lit and the crowd is waiting for one more song. The pledger sends spare sticks from the desk drawer so the robots play on after the human fades out.

## Theme instructions
Voice: robot-voice repetition plus liner-note cool. Short looped phrases, vocoder-flat declarations, harder-better-faster devotion. Sleek and hypnotic, never snarky.
Palette/type: chrome silver and robot gold on midnight black with LED-red display accents. Headers in a sleek chrome electro sans, body in a minimal clean sans. System-sans fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character wearing a chrome robot helmet at a glowing mixer deck with RAM faders lit, pyramid stage and crowd lights behind. Gold visor glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam in chrome helmet holding one giant glowing RAM fader, plain midnight black behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone gold robot visor bar on midnight black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round chrome-on-black stamp, helmet-and-RAM motif at center.
Copy beats:
- hero title: ONE MORE STICK
- eyebrow: THE ROBOTS NEED MEMORY
- letter angle: liner-note thank-you addressed to Sam, reporting the enclosed tribute and the loops it sustains, closing with a vocoder-flat promise to play it one more time.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to keep the robots playing
- hashtag: #DaftRAM

## Spec notes
Registry: slug `daftram`, display_name `Daft RAM`, category `Music`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a hidden-track blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: ROBOT. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
