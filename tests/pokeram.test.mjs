import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// PokeRAM theme: cheerful trainer trade to restock Sam's boxes.
// Art bytes pinned after visual review (no baked-in text, motifs survive
// crops, logo badge clear of the face). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "pokeram",
  displayName: "PokeRAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "pokeram.html"),
    "utf8",
  );
}

describe("pokeram theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "pokeram");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "2ec28477d1a0c3ff639418b09db388a67f59c077856f687860b556b14febc054",
    );
    assert.equal(
      sha256(og),
      "c3afe17a920a12c29dfcacae3f75092de458454ec11b1881c4c2fb115c6b79bc",
    );
    assert.equal(
      sha256(picker),
      "11c610a7f8152294c6e3bfe567a202580a25290064e7cb02dab06ffab204d5fc",
    );
    assert.equal(
      sha256(seal),
      "6800ca6ae6cdc3336fd8c24790f80437e2a34647e1526f0103aee9b470d7812a",
    );
  });
});

describe("pokeram template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "pokeram",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("TRAINER"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "pokeram",
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
