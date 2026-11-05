import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// This RAM Is Fine theme: aggressively calm incident-report tribute from a
// server room of completely normal temperature.
// Art bytes pinned after visual review (no baked-in text, RAM stick reads,
// logo badge clear of face and hardware). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "thisisfine",
  displayName: "This RAM Is Fine",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "thisisfine.html"),
    "utf8",
  );
}

describe("thisisfine theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "thisisfine");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "68664adfae8060dd3f2edf01f86d79ca8fc4826d1a52ed0797dcc0ab7a663e15",
    );
    assert.equal(
      sha256(og),
      "80711d0805c8e8273bea8c9a94b383f826e801a79aa1bf603adc05e1e21e77af",
    );
    assert.equal(
      sha256(picker),
      "9cb2983aaf05bb3ed87f6b88324ff33bf4516719566d12615d7e1ec9c72e6f1d",
    );
    assert.equal(
      sha256(seal),
      "19102bf539a835cbe08ed96b593304b99e94857310a3d65416337057d6ec20a0",
    );
  });
});

describe("thisisfine template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "thisisfine",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("FINE"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "thisisfine",
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
