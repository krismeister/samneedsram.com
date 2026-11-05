import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// DRAMakis theme: prophetic desert oath to restock Sam's memory on Arrakis.
// Art bytes pinned after visual review (readable RAM hardware, no baked-in
// text, motifs survive crops, logo badge clear of the face). The og pin
// includes the composited site logo (see process-pledge-art.mjs), so it
// changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "dramakis",
  displayName: "DRAMakis",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "dramakis.html"),
    "utf8",
  );
}

describe("dramakis theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "dramakis");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "13956d760625894a06535cc2e90ddf6cdd39cb8a5081ee52d04d5250f0459777",
    );
    assert.equal(
      sha256(og),
      "f2ef4ae88d50a21875ca0edb937f94c1811dcd7a147f0ba97c887b8423ea6305",
    );
    assert.equal(
      sha256(picker),
      "bc37a1f9f7bae6f811e1db5650b1ee0cb125f699c78e5522976c3baf1f0d4f75",
    );
    assert.equal(
      sha256(seal),
      "5ca3a3f004dc775b1561a832ca9dc969ec8d50146e1711663fbd8a2db1840801",
    );
  });
});

describe("dramakis template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "dramakis",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("ARRAKIS"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "dramakis",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("12 disks"), "floppy unit");
    assert.ok(out.includes("3.5&quot; HD"), "escaped type");
    assert.ok(
      !out.includes('<blockquote class="eulogy">'),
      "eulogy block stripped",
    );
    assert.ok(!out.includes("GB of"), "kind-agnostic phrasing");
  });
});
