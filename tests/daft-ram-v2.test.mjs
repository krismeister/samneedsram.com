import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";
import { validatePledge, DEFAULT_EULOGY } from "../lib/pledges.js";

// Daft RAM v2 theme: robot reunion tour, Zuck (gold helmet) + Sam (chrome
// helmet) with transparent visors at a RAM-fader mixer deck.
// Art bytes pinned after visual review (no baked-in text, Sam reads, Zuck
// reads, RAM stick reads, hero safe area along top edge, logo badge clear
// of faces and key shapes). The og pin includes the composited site logo
// (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "daft-ram-v2",
  displayName: "Daft RAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "daft-ram-v2.html"),
    "utf8",
  );
}

describe("daft-ram-v2 theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "daft-ram-v2");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "61ac8108a077d67dc3f3db16fbb217417b7b0f22b565a770de5baaf3779cab86",
    );
    assert.equal(
      sha256(og),
      "7c2914a7d0e8d272cd26ceac51dc498aeee9b4f056c656f06cf2c42f2833bc99",
    );
    assert.equal(
      sha256(picker),
      "10cc98f2176e1316a0b9fee518f7ab2a029f042ee05cf8384091838eea24292f",
    );
    assert.equal(
      sha256(seal),
      "1fb096b968599d5f822c7d0cbc57bdd05e9843f96ae5cd230dbc93f97b7354f0",
    );
  });
});

describe("daft-ram-v2 template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "daft-ram-v2",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("REUNION"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const checked = validatePledge({
      who: "Dan",
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
      theme: "daft-ram-v2",
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
