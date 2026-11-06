import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// Dunder DIMMflin theme: branch-memo office comedy, Sam as beaming branch
// manager flanked by Zuck (stapler) and Elon (clipboard).
// Art bytes pinned after visual review (no baked-in text, Sam + Zuck + Elon
// all read, RAM stick reads, hero safe area along bottom edge, logo badge
// clear of faces). The og pin includes the composited site logo (see
// process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "dunderdimm",
  displayName: "Dunder DIMMflin",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "dunderdimm.html"),
    "utf8",
  );
}

describe("dunderdimm theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "dunderdimm");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "2e0fe8d682b84a8b71d63e1237d9388956ca8172884d3f99c68ae40ed2affa2e",
    );
    assert.equal(
      sha256(og),
      "de921aedb396669c26ea53b7791573f36928dfb2ed916da11a35acef198ff86b",
    );
    assert.equal(
      sha256(picker),
      "f5954a379baa49a31209574f82988ac948810e3ef0cdd06294246ed5f475106c",
    );
    assert.equal(
      sha256(seal),
      "254bf56ca370806465c2838a07812f46712d462fe6cebf76732bedf33a58637f",
    );
  });
});

describe("dunderdimm template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "dunderdimm",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("DUNDIE"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "dunderdimm",
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
