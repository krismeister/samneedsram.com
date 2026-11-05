import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// Daft RAM theme: robot-helmet tribute keeping the pyramid loop loaded.
// Art bytes pinned after visual review (no baked-in text, RAM stick reads,
// logo badge clear of helmet and hardware). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "daftram",
  displayName: "Daft RAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "daftram.html"),
    "utf8",
  );
}

describe("daftram theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "daftram");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "5e77c8974c8d0d5237b0b3331a5cfaf2d28c0254f60a7f7d5bfdbb1be12cda0d",
    );
    assert.equal(
      sha256(og),
      "a1575f2bbe73fc23551ff6cb0486f139ea29c26648dda7dc9ab705b7729b146b",
    );
    assert.equal(
      sha256(picker),
      "b75656132eea9364970635baffa45bdbb91482c5a6bba120781e94ba581cf659",
    );
    assert.equal(
      sha256(seal),
      "cb0b329bb66eaf4c49333ee07ca5c2349165256d68d41bd8fca1711d74b9ac21",
    );
  });
});

describe("daftram template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "daftram",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("ROBOT"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "daftram",
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
