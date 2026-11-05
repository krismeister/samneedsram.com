import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Back-navigation contract: browsers restore form-control state after the
// inline script has already built the kind-dependent dropdown, which used
// to leave kind/type disagreeing and fail validation on resubmit. The
// pageshow handler (which runs after restoration) must re-sync, and the
// re-sync must keep a still-valid type selection instead of wiping it.

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

async function homepage() {
  return fs.readFile(path.join(root, "html", "homepage.html"), "utf8");
}

describe("homepage form restore", () => {
  it("pageshow handler re-syncs the kind controls", async () => {
    const html = await homepage();
    const m = html.match(
      /window\.addEventListener\("pageshow"[\s\S]*?\n  \}\);/,
    );
    assert.ok(m, "pageshow handler must exist");
    assert.ok(
      m[0].includes("syncKind();"),
      "pageshow must re-sync kind controls after restore",
    );
  });

  it("re-sync preserves a still-valid type selection", async () => {
    const html = await homepage();
    assert.ok(
      html.includes("if (d.opts.indexOf(prevType) !== -1) fType.value = prevType;"),
      "syncKind must keep a type that is still valid for the kind",
    );
  });
});
