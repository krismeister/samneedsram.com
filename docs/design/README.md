# Concept comps — homepage + pledge page

Four directions exploring the same core ideas: bottom-of-screen flare-ups on
every pledge, share-first buttons (no more download-button boxes), and loud
display type instead of the current default serif.

## The comps

- `homepage-a-telethon.jpg` — Vintage TV pledge-drive. Marquee headline,
  mechanical odometer counter, ticker-tape pledge feed, golden confetti
  erupting from the bottom edge.
- `homepage-b-zine.jpg` — Punk wheat-paste poster wall. Giant condensed
  headline, taped-up polaroids of RAM sticks and envelopes, sticker-style
  PLEDGE / SHARE buttons, flame flares along the bottom.
- `homepage-c-mailroom.jpg` — Midnight mailroom. Dot-matrix amber headline
  on dark green, seven-segment GB counter, terminal-style live feed,
  envelope conveyor belt, fire flares across the bottom.
- `pledge-airmail.jpg` — Pledge page as an airmail shipping manifest. Big
  form (handle, RAM-type chips, giant GB slider, eulogy box), live share-card
  preview, and share-first buttons: POST TO X and COPY LINK big, mail-kit
  PDF download demoted to a small link.
- `homepage-b-zine.html` — Working sample page for the zine direction
  (open in a browser). Single file, no build step. Accepts RAM, floppies,
  and USB sticks. Includes the bottom flare-up canvas, a faked live feed
  that adds a pledge every few seconds, and share-first buttons, plus a
  pledge form with a mail-kit theme dropdown (Classic Zine, Ramageddon,
  Warhammer 40KB, Beacons Are Lit) that routes the submit to the chosen
  themed page. Fonts are
  Google Fonts (Anton, Special Elite, Permanent Marker) with system
  fallbacks; self-host before production.
- `homepage-b-zine-v2.html` + `sam-polaroid.jpg` — Same page with a v2
  header: taped-up Sam polaroid ("this is sam. he is out of memory.")
  beside the headline, starburst moved onto the photo corner. Photo is
  the CC BY 2.0 Village Global portrait, credited in the page footer.
  Mail-kit theme is a grouped dropdown (House / Movies / Games) with
  "Surprise me" first and preselected; submit routes to the picked theme,
  or a random one when surprise is on.
- `mailkit-b-zine.html` — Working mail kit / pledge-success sample in the
  same zine style. Mail-to label (public corporate address only), return
  label, cover letter with eulogy, share-card preview, share-first buttons
  (Post to X / Copy link), and a print stylesheet so the kit prints cleanly.
  Personalize with `?who=Bea&kind=usb&qty=64&type=USB-C&n=205&eulogy=...`
  (kinds: ram, floppy, usb; legacy `gb` still works for RAM).

## Themed pledge pages

Heavily themed pledge-success variants. Each is a single file with its own
key art, fonts, and copy, but all honor the same mail-kit contract
(mail-to label with the public corporate address only, return label,
cover letter, share card, two CTAs up top (Make your own pledge,
Print mail kit) and two below (Post to X, Post to Facebook)) and the
same query-param
contract as `mailkit-b-zine.html`, so any of them can receive the homepage
form.

- `theme-ramageddon.html` + `art-ramageddon.jpg` — A swarm of small cute
  androids crowds Sam and Zuck in a server room, dressed as a movie: presents card,
  tagline ("In a world... out of memory."), A SAM ALTMAN PRODUCTION card,
  starring billing, rating box, credit billing block, and a trailer button
  that plays the explosions. Stencil display type (Black Ops One),
  terminal mono body, chamfered alert buttons. #RAMAGEDDON
- `theme-warhammer40kb.html` + `art-warhammer40kb.jpg` — Sam as a space
  marine over a pile of dead CRTs. Cinzel + IM Fell English, gold on
  black, parchment tribute manifest. #Warhammer40KB
- `theme-gondor.html` + `art-gondor.jpg` — Elon the scruffy wizard
  lights the beacons with burning RAM sticks while Sam the hobbit sits
  beside him, barefoot with an ale.
  Cinzel Decorative + Alegreya, ember orange on night blue. #LightTheBeacons

Key art was generated with likeness references (CC portraits of Sam
Altman, Mark Zuckerberg, and Elon Musk from Wikimedia Commons). The
reference photos themselves are not shipped — only the generated art in
`art-*.jpg`.

- `theme-picker-gallery.html` — Comparison gallery for the theme picker
  at ~20 themes. Three working treatments on one page, all running on the
  same 20-theme list (4 real pages tagged LIVE, 16 stand-ins): A. search +
  poster grid with genre chips, B. grouped dropdown, C. filmstrip with
  arrows and a Surprise-me button. Open in a browser and try each.

## Ideas carried across all four

1. **Flare-ups from the bottom** — every pledge (live or faked seed data)
   fires a burst of flames/confetti/light up from the bottom edge. Cheap to
   build (canvas or CSS particles), huge payoff in energy.
2. **Share-first, download-second** — the pledge success state leads with
   POST TO X / COPY LINK as the biggest elements. The PDF mail kit becomes
   a quiet secondary link.
3. **Fun display type** — chunky retro/marquee/condensed headlines. Font
   candidates to try: Shrikhand, Bricolage Grotesque, or a condensed like
   Anton/Oswald for the zine direction; a dot-matrix/segment face for the
   mailroom counter.
4. **Live feed + odometer** — ticker or terminal feed plus a big mechanical
   GB counter on every homepage variant.

## Notes

- Text inside the images is model-generated placeholder. Real site copy
  plays the premise dead straight (per AGENTS.md) — ignore any "just a
  joke" / affiliation filler the image model added.
- The zine comp invents a "PO BOX 1337" address. The real site uses the
  public corporate address only (per da_plan.md).
