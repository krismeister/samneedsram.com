import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// Super Sambio Bros theme: cheerful plumber-of-memory platformer, Sam in a
// red cap mid-jump beside his green-capped brother Zuck.
// Art bytes pinned after visual review (no baked-in text, Sam + Zuck both
// read, RAM stick reads, hero safe area along bottom edge, logo badge clear
// of faces and key shapes). The og pin includes the composited site logo
// (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "sambio",
  displayName: "Super Sambio Bros",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "sambio.html"),
    "utf8",
  );
}

describe("sambio theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "sambio");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "92adc7ca4ee736adcea46edcb6c10f030a7e8c98ed5fe768c4fc813f5262c2f3",
    );
    assert.equal(
      sha256(og),
      "0dec88a694d71c785682c156c9ebe10877f48ad8d9d2b5e1c10d40ad205d735c",
    );
    assert.equal(
      sha256(picker),
      "665e88214e914bf2252eb841312656ebfa64a594222acd3593c91acb19cddd16",
    );
    assert.equal(
      sha256(seal),
      "e3a397323f05e704fbcd36232ae87da920697eacebe966e47a762fe062aa4d83",
    );
  });
});

describe("sambio template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "sambio",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("WAHOO"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "sambio",
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
