import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";
import { validatePledge, DEFAULT_EULOGY } from "../lib/pledges.js";

// Cache Wars theme: rebel mission briefing beaming memory to Sam.
// Art bytes pinned after visual review (Sam + Elon likeness, RAM-saber
// hilts read, logo badge clear of faces, no baked-in text). The og pin
// includes the composited site logo (see process-pledge-art.mjs), so it
// changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "cachewars",
  displayName: "Cache Wars",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "cachewars.html"),
    "utf8",
  );
}

describe("cachewars theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "cachewars");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "aad7491d651442080ca64a0a95c0bf2b54c6285f1ecc089a4a03753f0b807428",
    );
    assert.equal(
      sha256(og),
      "659725fe94244d42b9edbc99b8340416d4d51edada48235446303e687d9e51ab",
    );
    assert.equal(
      sha256(picker),
      "4fe4176c929c2e4e9e0bdcd22ed55cf02b084dd4fd3b3a914f1ae8227455700c",
    );
    assert.equal(
      sha256(seal),
      "62feef295794588d97a1cc5f45e9c0fa09dee2d401adad6eba4fc8829af00d21",
    );
  });
});

describe("cachewars template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "cachewars",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("REBEL"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const checked = validatePledge({
      who: "Dan",
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
      theme: "cachewars",
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
