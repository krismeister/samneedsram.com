import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";
import { validatePledge, DEFAULT_EULOGY } from "../lib/pledges.js";

// Zelda theme: earnest Hyrule quest tribute for Sam's memory.
// Art bytes pinned after visual review (no baked-in text, motifs survive
// crops, logo badge clear of the face). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "zelda",
  displayName: "The Legend of RAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "zelda.html"),
    "utf8",
  );
}

describe("zelda theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "zelda");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "062e78b91385136a54fd824c6ad761eaa2a72a0e2bb08fadf1757b007c45d366",
    );
    assert.equal(
      sha256(og),
      "64c68fe250669749d2860e41582b2e1499a9ad9d9856aad57e09966587386061",
    );
    assert.equal(
      sha256(picker),
      "858536e086907a1e35fbabaea923e58619616fc5dba46cc3943fff03cf5dbd5a",
    );
    assert.equal(
      sha256(seal),
      "98310e606e3b2689602771de3aa8e95a5cd1552fea6f228ec5606a54226308cc",
    );
  });
});

describe("zelda template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "zelda",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("HYRULE"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const checked = validatePledge({
      who: "Dan",
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
      theme: "zelda",
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
