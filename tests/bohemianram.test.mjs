import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fillTemplate } from "../lib/pledge-pages.js";
import { validatePledge, DEFAULT_EULOGY } from "../lib/pledges.js";

// Bohemian RAMpsody theme: stadium rock-opera showbill, Sam as caped
// frontman flanked by Jensen (lead guitar) and Zuck (drums).
// Art bytes pinned after visual review (no baked-in text, Sam + Jensen +
// Zuck all read, RAM stick reads, hero safe area along bottom edge, logo
// badge clear of faces and key shapes). The og pin includes the composited
// site logo (see process-pledge-art.mjs), so it changes if the logo does.
const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

const FILL = {
  siteUrl: "https://samneedsram.com",
  jwt: "FAKE.JWT.TOKEN",
  theme: "bohemianram",
  displayName: "Bohemian RAMpsody",
};

async function template() {
  return fs.readFile(
    path.join(repoRoot, "html", "pledges", "bohemianram.html"),
    "utf8",
  );
}

describe("bohemianram theme art", () => {
  it("ships the reviewed hero + og + picker + seal bytes", async () => {
    const art = path.join(repoRoot, "public", "pledges", "art", "bohemianram");
    const hero = await fs.readFile(path.join(art, "hero.jpg"));
    const og = await fs.readFile(path.join(art, "og.jpg"));
    const picker = await fs.readFile(path.join(art, "picker.jpg"));
    const seal = await fs.readFile(path.join(art, "seal.png"));
    assert.equal(
      sha256(hero),
      "95a72be69120f3c44e55f1d87cb050638dbfa2648272c644a5d95896ebc29a60",
    );
    assert.equal(
      sha256(og),
      "b7a3c29001ddd6948ed0d8a93496e5452568a48d21bb93c3fa8ff9644a20a848",
    );
    assert.equal(
      sha256(picker),
      "5ede0f8213a1836f3b7b387cc48b663daa23d7d43927394fe2d0dc8c0e738d08",
    );
    assert.equal(
      sha256(seal),
      "d071856a1de8dbadf0141e989471dcbf260082fb64281e1117f9e2abf9678031",
    );
  });
});

describe("bohemianram template fill", () => {
  it("renders a ram pledge with eulogy and no leftover markers", async () => {
    const out = fillTemplate(
      await template(),
      {
        who: "Mabel",
        kind: "ram",
        type: "DDR3",
        qty: 8,
        eulogy: "she served 11 years",
        theme: "bohemianram",
      },
      FILL,
    );
    assert.ok(!out.includes("{{"), "leftover markers");
    assert.ok(out.includes("8 GB DDR3"), "ram unit");
    assert.ok(
      out.includes('<blockquote class="eulogy">she served 11 years</blockquote>'),
      "eulogy block kept",
    );
    assert.ok(out.includes("ENCORE"), "seal word");
  });

  it("renders a floppy pledge without eulogy and no leftover markers", async () => {
    const checked = validatePledge({
      who: "Dan",
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
      theme: "bohemianram",
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
