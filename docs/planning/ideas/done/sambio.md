# Super Sambio Bros
Princess Cache is in another slot, and Sam must stomp there one stick at a time.

## Premise
Sam is a cheerful plumber of memory whose kingdom runs on coins and question blocks, and every slot in the castle is empty. The princess has been taken to another castle, again, and the quest cannot continue past World 1-1. The pledger mails spare sticks from the desk drawer so the music plays and the flagpole rises.

## Theme instructions
Voice: game manual cheer plus princess-note mystery. Wahoo energy, coin-count declarations, castle warnings, total faith in the power of jumping. Bright and bouncy, never snarky.
Palette/type: plumber red and coin gold on sky blue with warp-pipe green accents. Headers in a chunky rounded game sans (Bungee or similar), body in a friendly clean sans. System-sans fallback must stay legible.
Art direction:
- Cast: plumber-brother duo, left to right: Sam (red cap), Mark Zuckerberg (green cap).
- hero.jpg: Sam in-character as a red-capped plumber mid-jump bumping a glowing RAM question block, Zuckerberg in-character as his green-capped brother jumping just behind, green pipes and a distant castle behind. Bright sky-blue light center, dark-safe area middle for overlaid title.
- og.jpg: Sam in red cap and Zuckerberg in green cap holding one giant glowing RAM question block overhead together, plain sky blue behind. Must read at small size: big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone gold RAM coin on sky blue, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round red-and-gold stamp, block-and-RAM motif at center.
Copy beats:
- hero title: IT'S-A ME, MEMORY
- eyebrow: PRINCESS CACHE IS IN ANOTHER SLOT
- letter angle: manual page and princess-note addressed to Sam, reporting the enclosed tribute and the worlds it unlocks, closing with a reminder that the flagpole is waiting.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to get Sam past World 1-1
- hashtag: #SuperSambio

## Spec notes
Registry: slug `sambio`, display_name `Super Sambio Bros`, category `Games`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a toad-house-tip blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: WAHOO. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
