# The RAMfather
Sam made the family an offer of memory, and the drawer came up empty on the wedding day.

## Premise
Sam heads the most respected memory family in the business, and the wedding week has emptied every slot in the compound. The five families are watching to see who provides in the hour of need. The pledger pays respects with an envelope of sticks from the desk drawer, an offer that cannot be refused.

## Theme instructions
Voice: solemn family counsel plus wedding-toast warmth. Offers, respects, favors owed and repaid, total loyalty to the hardware. Grave and honorable, never snarky.
Palette/type: wedding white and rose red on office-mahogany black with cigar-smoke gray. Headers in an engraved inscriptional serif (Cinzel or similar), body in a readable old-style serif. System-serif fallback must stay legible.
Art direction:
- hero.jpg: Sam in-character as a tuxedoed don at a wedding-day desk, holding a RAM stick like a honored offering, rose boutonniere and dark office behind. Warm desk-lamp glow center, dark-safe area middle for overlaid title.
- og.jpg: Sam in tuxedo holding one giant RAM stick forward, plain mahogany-black behind. Must read at small size: two big shapes, high contrast, no text, no fine detail.
- picker.jpg: lone red rose crossed with a gold RAM stick on mahogany black, centered. Must read at tiny size: one bold motif, no text.
- seal.png: round black-and-red stamp, rose-and-RAM motif at center.
Copy beats:
- hero title: AN OFFER OF MEMORY YOU CAN'T REFUSE
- eyebrow: THE FAMILY CALLS FOR RESPECT
- letter angle: wedding-day favor note addressed to Sam, reporting the enclosed tribute and the debt it settles, closing with a blessing on the happy couple and low latency.
- share-card line: {{who}} pledged {{qty}} {{qty_unit}} {{type}} to the Family
- hashtag: #TheRAMfather

## Spec notes
Registry: slug `ramfather`, display_name `The RAMfather`, category `Movies`.
Marker phrasing must fit all kinds: use `{{qty}} {{qty_unit}} {{type}}` in the H1 and share card, and `{{qty}} {{qty_unit}} ({{type}})` in the letter body. Never write GB of, which breaks for floppy disks.
Conditional: render `{{#if_eulogy}}` as a sworn-testimony blockquote under the letter body; the route strips the whole block when eulogy is empty.
Seal text: RESPECT. Mail-to is fixed: Sam Altman, OpenAI, 3180 18th St, San Francisco, CA 94110.
