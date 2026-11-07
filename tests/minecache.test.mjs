import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";
import { validatePledge, DEFAULT_EULOGY } from "../lib/pledges.js";

// MineCache theme: blocky first-night survival starter kit for Sam.
// Art bytes pinned after visual review (Sam likeness + cast solo, readable
// RAM hardware, no baked-in text, motifs survive crops, og logo badge clear
// of the diamond). The og pin includes the composited site logo (see
// process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "minecache",
  displayName: "MineCache",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "minecache.html"),
    "utf8",
  );
}

describe("minecache theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "minecache");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "c9d48bd938b7a3a1c677e2aea3469cc0ba6808c195195b00a32f42137b46555f",
    );
    assert.equal(
      sha256(og),
      "4b4612ac0e2b65bdeb1aa1ee9c048f53f8c668d83ba18e4303bd6b3d9b756d65",
    );
    assert.equal(
      sha256(picker),
      "4a9dd0468467ac0474131d97b0326ce34fc3d7f004416ff977f1877283a413e6",
    );
    assert.equal(
      sha256(seal),
      "6ce1096677b6dfab9f53894bdac22318c8f14a1f6aef7bfce4d01629d00fdf31",
    );
  });
});

describe("minecache template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "minecache",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("DIAMONDS"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const checked = validatePledge({
      who: "Dan",
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
      theme: "minecache",
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
