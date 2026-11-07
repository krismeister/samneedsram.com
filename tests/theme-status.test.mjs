import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { themeStatus } from "../lib/pledge-pages.js";

// Theme membership comes from the JSON registries. The mint route
// enforces this, so adding a theme to themes.json is enough — no
// code change needed.
describe("themeStatus", () => {
  it("reports active registry themes", async () => {
    assert.equal(await themeStatus("ramageddon"), "active");
    assert.equal(await themeStatus("dunderdimm"), "active");
  });

  it("reports retired and unknown slugs", async () => {
    assert.equal(await themeStatus("thisisfine"), "deprecated");
    assert.equal(await themeStatus("daftram"), "deprecated");
    assert.equal(await themeStatus("pickleram"), "deprecated");
    assert.equal(await themeStatus("nope"), "unknown");
  });
});
