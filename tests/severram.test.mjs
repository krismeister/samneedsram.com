import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// SeverRAM theme: cheerful-dystopian corporate memo for Sam's innie.
// Art bytes pinned after visual review (no baked-in text, motif survives
// crops, logo badge clear of the face). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "severram",
  displayName: "SeverRAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "severram.html"),
    "utf8",
  );
}

describe("severram theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "severram");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "7bd8076b98896555dcf8f953d6482eef2f18093c94ee436f4cf01e18d6fe62e8",
    );
    assert.equal(
      sha256(og),
      "14a816c97a1195b604ac143164bd3f11670c06f93c75816138c743119ffea04c",
    );
    assert.equal(
      sha256(picker),
      "0893d122aa8f2bbbae0ef3d36bb7b96e3209c2a290c07f9bf909952e11eb0d33",
    );
    assert.equal(
      sha256(seal),
      "7fa9f48feedfe52ef1d39a910d13d8dcc4112b2ea8424b734ac0e8419f908542",
    );
  });
});

describe("severram template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "severram",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("Sam&rsquo;s innie"), "innie phrasing");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "severram",
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
