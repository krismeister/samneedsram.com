import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// Much RAM theme: doge-meme tribute, Sam solo as a golden shiba chief
// under a rainbow, good-boy certificate letter, WOW seal.
// Art bytes pinned after visual review (no baked-in text, Sam reads,
// RAM hardware reads, hero safe area along top edge, og motifs survive
// the crop with the logo badge clear). The og pin includes the
// composited site logo (see process-pledge-art.mjs), so it changes if
// the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "muchram",
  displayName: "Much RAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "muchram.html"),
    "utf8",
  );
}

describe("muchram theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "muchram");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "237c3dbc6f807a204576b1694702a29242ef6562dcd935c9c6a24bbfcd3959d9",
    );
    assert.equal(
      sha256(og),
      "a408ccc442ad270c4af3680e64c4ea4c888a08d63690c5e48ad74d31161b2564",
    );
    assert.equal(
      sha256(picker),
      "01f8728d9892a663aee97864b97f754737102dd76236d9f1daccc96c38b1c051",
    );
    assert.equal(
      sha256(seal),
      "e3de12f35ea5c50124689ea28f0ec387f6b8b328401428741355178e6e671eba",
    );
  });
});

describe("muchram template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "muchram",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("WOW"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "muchram",
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
