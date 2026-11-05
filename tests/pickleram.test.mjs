import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// Pickle RAM theme: frantic garage-inventor tribute paying the Council of
// RAMs before dinner.
// Art bytes pinned after visual review (no baked-in text, RAM stick reads,
// logo badge clear of inventor and hardware). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "pickleram",
  displayName: "Pickle RAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "pickleram.html"),
    "utf8",
  );
}

describe("pickleram theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "pickleram");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "3740a01220d8afc3d0f8d3e3a4211a798aec76d0d45b5778d403a2f71c463b4e",
    );
    assert.equal(
      sha256(og),
      "75c444cc696bc5c2b3f0e80de3dd1753bdc0b0c870487a7a7ecfa2e096b1b8cb",
    );
    assert.equal(
      sha256(picker),
      "33a2476edf5c4feb5c4d42c1aaa9eeb103cce7b6df049077a0ee9edb5e19084c",
    );
    assert.equal(
      sha256(seal),
      "f65f74951796ea556243f1e3ee8f1477a8fabc435023c5081afdfba6194e8f9c",
    );
  });
});

describe("pickleram template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "pickleram",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("PICKLE"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "pickleram",
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
