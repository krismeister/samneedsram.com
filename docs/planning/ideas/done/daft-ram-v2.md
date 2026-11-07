# Daft RAM
The helmets went quiet years ago — Sam rebooted the duo for one last reunion tour, and the memory banks only hold half the setlist.

## Premise
The legendary robot duo split and the pyramid stage went dark, but Sam found the helmets in a desk drawer and booked one more show. The stage is lit and the crowd stretches around the world, yet the reloaded memory banks cut out halfway through the encore. The pledger sends spare sticks from home so the robots stay up all night to get lucky and play the full discography.

## Theme instructions
Voice: vocoder-flat reunion-tour declarations plus liner-note cool. Looped phrases, around-the-world tour romance, harder-better-faster devotion to the encore. Sleek and hypnotic, never snarky.
Palette/type: robot chrome and helmet gold on midnight black with neon-magenta and electric-cyan tour-grid accents. Headers in a sleek chrome electro sans, body in a minimal clean sans. System-sans fallback must stay legible.
Art direction:
- Cast: robot reunion duo, left to right: Mark Zuckerberg (gold helmet), Sam (chrome helmet).
- hero.jpg: the full duo on a neon reunion-tour stage, Sam in-character in a chrome robot helmet at a glowing mixer deck with RAM faders lit, Zuckerberg in a gold robot helmet beside him, neon grid and crowd lights behind. Gold visor glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam in chrome helmet and Zuckerberg in gold helmet side by side holding one giant glowing RAM stick, plain midnight black behind. Must read at small size: big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone neon-magenta robot visor bar on midnight black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round chrome-on-black stamp, twin-helmet-and-RAM motif at center.
Copy beats:
- hero title: GET LUCKY
- eyebrow: THE ROBOTS ARE BACK
- letter angle: reunion-tour rider addressed to Sam, reporting the enclosed tribute and the memories it reloads, closing with a vocoder-flat promise to play the encore one more time.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to get the robots back together
- hashtag: #DaftRAM (reused from v1 — the share already carries it, no new tag)

## Spec notes
Registry: slug `daft-ram-v2`, display_name `Daft RAM`, category `Music`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a hidden-track blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: REUNION. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
