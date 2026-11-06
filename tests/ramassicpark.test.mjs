import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";

// RAMassic Park theme: dinosaur-park brochure + control-room safety manual,
// Sam as safari-hatted founder with Elon as chaos theorist.
// Art bytes pinned after visual review (no baked-in text, Sam + Elon both
// read, RAM stick reads, hero safe area along top edge, logo badge clear
// of faces). The og pin includes the composited site logo (see
// process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "ramassicpark",
  displayName: "RAMassic Park",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "ramassicpark.html"),
    "utf8",
  );
}

describe("ramassicpark theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "ramassicpark");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "b56d7c6b5196ba6d8a480b7f55e86bef11e5b421f29f9f39e1afd917482bba02",
    );
    assert.equal(
      sha256(og),
      "629c2dd944da8ccf9c13ba6aa16d58238eaf19b4515b1c4394aa37adc2d7660d",
    );
    assert.equal(
      sha256(picker),
      "7c183e0064510d69b024d7806c6a4ffa6eae72c3801b997c525c3a3eb893df3b",
    );
    assert.equal(
      sha256(seal),
      "d330a9ef91c334ce87450c5392b30225c5af031eee3303fd53199278be1e162f",
    );
  });
});

describe("ramassicpark template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "ramassicpark",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("FENCES ON"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Dan",
        kind: "floppy",
        type: '3.5" HD',
        qty: 12,
        theme: "ramassicpark",
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
