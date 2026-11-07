import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";
import { validatePledge, DEFAULT_EULOGY } from "../lib/pledges.js";

// Pickle RAM v2 theme: the Council of RAMs puts the pickle on trial —
// Elon robed at the bench, Sam as a pickle in a tiny suit inside a glass
// evidence jar, Jensen presenting the RAM stick as Exhibit A.
// Art bytes pinned after visual review (no baked-in text, Elon and Jensen
// read, pickle reads, RAM stick reads, hero safe area along top edge, logo
// badge clear of faces and key shapes). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "pickle-ram-v2",
  displayName: "Pickle RAM",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "pickle-ram-v2.html"),
    "utf8",
  );
}

describe("pickle-ram-v2 theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "pickle-ram-v2");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "222386d47df44e7dc14a5ad090203f797875665666a9e39b4821fe4905ecfb2d",
    );
    assert.equal(
      sha256(og),
      "bd181791748965678c25008c34857885db878b84b5cd16d2f52c694a11e59e78",
    );
    assert.equal(
      sha256(picker),
      "48dbe9571ed1055dac789072333634955fe84c487d361b6133a4fd21b5b7a9c2",
    );
    assert.equal(
      sha256(seal),
      "a34dc6bb7d3872981756237d144a5bc65dc910276ffb5c29c84bb0a506cafa06",
    );
  });
});

describe("pickle-ram-v2 template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "pickle-ram-v2",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("BAIL"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const checked = validatePledge({
      who: "Dan",
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
      theme: "pickle-ram-v2",
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
