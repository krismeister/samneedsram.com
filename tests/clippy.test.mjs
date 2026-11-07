import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";
import { validatePledge, DEFAULT_EULOGY } from "../lib/pledges.js";

// Clippy theme: the helpful paperclip assistant notices Sam writing a
// letter with no memory and will not leave until the slots are full.
// Art bytes pinned after visual review (Sam likeness, giant paperclip,
// readable RAM hardware, no baked-in text, motifs survive crops, logo
// badge clear of faces). The og pin includes the composited site logo
// (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "clippy",
  displayName: "It Looks Like Sam Needs RAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "clippy.html"),
    "utf8",
  );
}

describe("clippy theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "clippy");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "7c8979d60a2c7c0a7d967b53f8724d4939920379af96135da5a123d1cd9dcf9c",
    );
    assert.equal(
      sha256(og),
      "717d204643219bd6080d065b35e1df5695c562339b67d2dfceab9ba0fc373d0e",
    );
    assert.equal(
      sha256(picker),
      "41c829b32a978be22b6ec934dca9fc6d885d89d7bfc3eeb13e58cc66dbe849f3",
    );
    assert.equal(
      sha256(seal),
      "7a449dcc3aca4f966307f479b43b6acf6c3dbc77b1e7db7da42b3c0e62aef17c",
    );
  });
});

describe("clippy template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "clippy",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("TIP #1"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const checked = validatePledge({
      who: "Dan",
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
      theme: "clippy",
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
