import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";
import { validatePledge, DEFAULT_EULOGY } from "../lib/pledges.js";

// The Cake Is a DIMM theme: Aperture-style enrichment testing, Sam solo in
// an orange jumpsuit holding a RAM stick between orange and blue portals.
// Art bytes pinned after visual review (no baked-in text, Sam reads, RAM
// stick reads, hero safe area along top edge, logo badge clear of faces and
// key shapes). The og pin includes the composited site logo (see
// process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "portal",
  displayName: "The Cake Is a DIMM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "portal.html"),
    "utf8",
  );
}

describe("portal theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "portal");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "51d60f649c9f8c375bae69cd832644a3de992280ee928b7edecbd77219a9c234",
    );
    assert.equal(
      sha256(og),
      "3ca15f268518c4db31f22484ad720a77d69c299631a2d8e0c992708e77b3f68d",
    );
    assert.equal(
      sha256(picker),
      "793298a279e4dbc4830c994f8de82a7f3447b76db360a5c2ec7874696ae5f32f",
    );
    assert.equal(
      sha256(seal),
      "98417677fc80ff4c19d2a3f826354c389e6f71f54fa5e8b46acb920380c2ba6c",
    );
  });
});

describe("portal template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "portal",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("APERTURE"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const checked = validatePledge({
      who: "Dan",
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
      theme: "portal",
    });
    assert.equal(checked.ok, true);
    const out = fillTemplate(await template(), checked.value, FILL);
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("12 disks"), "floppy unit");
    assert.ok(out.includes("3.5&quot; HD"), "escaped type");
    assert.ok(
      out.includes("<blockquote") && out.includes(DEFAULT_EULOGY),
      "default eulogy block kept",
    );
    assert.ok(!out.includes("undefined"), "no missing-field leak");
    assert.ok(!out.includes("GB of"), "kind-agnostic phrasing");
  });
});
