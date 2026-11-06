import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// Game of DIMMs theme: Night's Watch tribute holding the Wall with a
// glowing RAM sword while the ravens carry word south.
// Art bytes pinned after visual review (no baked-in text, Sam + Jensen
// read, RAM sword reads, logo badge clear of faces, top safe area holds
// the title). The og pin includes the composited site logo (see
// process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "gamedimms",
  displayName: "Game of DIMMs",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "gamedimms.html"),
    "utf8",
  );
}

describe("gamedimms theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "gamedimms");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "73d4f0a4de1b15d18ff16ec886b065d65625c9675f4e3e66c029e1e27728012b",
    );
    assert.equal(
      sha256(og),
      "5a8f58e7333ee5a05f7819d6709cf6a5b8f68be4e63b4111b0b991b81469c815",
    );
    assert.equal(
      sha256(picker),
      "2d9ce7931a43fa14806c7effaaba8c8e715bc012d5d5ec097011775dd81d48d8",
    );
    assert.equal(
      sha256(seal),
      "81039bb4022af3c85acb1f1e2198b4c3cc2a7229893062698aa571af07464745",
    );
  });
});

describe("gamedimms template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "gamedimms",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("WINTER"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "gamedimms",
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
