import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";
import { validatePledge, DEFAULT_EULOGY } from "../lib/pledges.js";

// TetRAM theme: arcade-cabinet tribute dropping a perfect long bar into
// Sam's memory well.
// Art bytes pinned after visual review (no baked-in text, RAM stick reads,
// logo badge clear of champion and hardware). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "tetram",
  displayName: "TetRAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "tetram.html"),
    "utf8",
  );
}

describe("tetram theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "tetram");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "ae85d4bdf3bcc985778afa4247505afb7c9201fe07f80339c0233d31fa13f06c",
    );
    assert.equal(
      sha256(og),
      "91a26acb4e8786a64d911939237549691589387d4f459e99b0cd07a5d90c66c3",
    );
    assert.equal(
      sha256(picker),
      "1e2f8bba005048fb2cb475b8ad1857252d69ca56a097bc4e14f232a17e43e35b",
    );
    assert.equal(
      sha256(seal),
      "75d71c881ba0087f87336357396417491c151021351befcb2e36a9b8246db68f",
    );
  });
});

describe("tetram template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "tetram",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("TETRIS"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const checked = validatePledge({
      who: "Dan",
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
      theme: "tetram",
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
