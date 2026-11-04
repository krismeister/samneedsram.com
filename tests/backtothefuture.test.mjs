import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// Back-to-the-future theme: urgent 1955 telegram to get Sam home.
// Art bytes pinned after visual review (no baked-in text, motifs survive
// crops, logo badge clear of the face). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "backtothefuture",
  displayName: "1.21 Gigabytes",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "backtothefuture.html"),
    "utf8",
  );
}

describe("backtothefuture theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "backtothefuture");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "16dc7c468c5643493cc2eace37e9abb4b727a50cdc7ab595bea9d540b6c1b26e",
    );
    assert.equal(
      sha256(og),
      "c53b6bbe7dc9185b7e47f90fe1f20fece82bfd0f1a21cc4de28ad2fff92e66a8",
    );
    assert.equal(
      sha256(picker),
      "f581b39e364e90e5493323d458abf31b146adbbc54aa475cd4d9d1a04044df5f",
    );
    assert.equal(
      sha256(seal),
      "8ac5a66eb8d8900abc571d9f9f53e10bb8f3945a440377cfc39ca88f0c2ad86a",
    );
  });
});

describe("backtothefuture template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "backtothefuture",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("OUTATIME"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "backtothefuture",
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
