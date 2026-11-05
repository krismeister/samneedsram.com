import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// You've Got RAM theme: 1997 welcome-disc tribute rescuing Sam's 56K line.
// Art bytes pinned after visual review (no baked-in text, RAM stick reads,
// logo badge clear of face and hardware). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "dialup",
  displayName: "You've Got RAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "dialup.html"),
    "utf8",
  );
}

describe("dialup theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "dialup");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "f263bda47f0a69c2ec95088c1a522d06436432ec28e8748152aa7db6c42e1b98",
    );
    assert.equal(
      sha256(og),
      "b2d14d4987e201ab977281388b87781fcb11e642457795bf2fa3b10cd0ece5d9",
    );
    assert.equal(
      sha256(picker),
      "12fa48f6f2de2ffda49a9e678ce711c4a082a24c0dcefebfe4510a9546816ce9",
    );
    assert.equal(
      sha256(seal),
      "eff1a892e49129ecb07882876c81b28a17f2aedf8c646fb96a99dc3546b4a8c5",
    );
  });
});

describe("dialup template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "dialup",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("56K"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "dialup",
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
