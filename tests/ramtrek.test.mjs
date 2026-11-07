import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";
import { validatePledge, DEFAULT_EULOGY } from "../lib/pledges.js";

// RAM Trek theme: dutiful Starfleet tribute beaming memory to Captain Sam.
// Art bytes pinned after visual review (no baked-in text, RAM stick reads,
// logo badge clear of face and hardware). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "ramtrek",
  displayName: "RAM Trek",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "ramtrek.html"),
    "utf8",
  );
}

describe("ramtrek theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "ramtrek");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "098f1393e8c5ff42a855d1ba4db759908b36127d34a3b2d683db9d7c456d6b15",
    );
    assert.equal(
      sha256(og),
      "088b551cf1423a4055f4be32ff589e761decdcb04572cfd864ef1369b1f4c0c6",
    );
    assert.equal(
      sha256(picker),
      "df3c43e2d4690aa63e6c81112239f3570a8474f1f3e4a71e68299b4fc810dae9",
    );
    assert.equal(
      sha256(seal),
      "e03674c6934964fc849ec6088bb4f4762eebe1e1dbfa971f4940f9eb3a21e282",
    );
  });
});

describe("ramtrek template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "ramtrek",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("STARFLEET"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const checked = validatePledge({
      who: "Dan",
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
      theme: "ramtrek",
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
