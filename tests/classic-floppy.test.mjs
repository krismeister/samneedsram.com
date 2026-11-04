import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// Regression: classic art was RAM-only, wrong for floppy/USB pledges.
// The fixed set shows a chaotic mix of all media (reviewed bytes pinned).
// Note: the og pin includes the composited site logo (see
// process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

describe("classic theme art", () => {
  it("ships the mixed-media hero + og (not the RAM-only set)", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "classic");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    assert.equal(
      sha256(hero),
      "3c728b769fab014f1992d71f12bb5b65a0a2a8f0fe06da16a54d52064425fa43",
    );
    assert.equal(
      sha256(og),
      "c592b8e0b657961585dfb4bf4bf284bb24efee9700c994869ef6ca280f68da55",
    );
  });
});

describe("classic template floppy fill", () => {
  it("renders a floppy pledge with no leftover markers", async () => {
    const tpl = await fs.readFile(
      path.join(repoRoot, "html", "pledges", "classic.html"),
      "utf8",
    );
    const out = fillTemplate(
      tpl,
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        eulogy: "click whirr",
        theme: "classic",
      },
      {
        siteUrl: "https://samneedsram.com",
        jwt: "FAKE.JWT.TOKEN",
        theme: "classic",
        displayName: "Classic",
      },
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("12 disks"), "floppy unit");
    assert.ok(out.includes("3.5&quot; HD"), "escaped type");
  });
});
