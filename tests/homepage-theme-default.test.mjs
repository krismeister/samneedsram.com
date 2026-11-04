import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validatePledge } from "../lib/pledges.js";

// Homepage contract: the pledge form always submits a theme. When none is
// given in the form (or the theme registry fails to load), it falls back to
// the default instead of blocking submission.

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_THEME = "classic";

async function homepage() {
  return fs.readFile(path.join(root, "html", "homepage.html"), "utf8");
}

describe("homepage theme default", () => {
  it("submit handler falls back to the default theme when none is given", async () => {
    const html = await homepage();
    assert.ok(
      html.includes('if (!theme) theme = themeSlugs[0] || "classic";'),
      "submit must default an empty theme",
    );
    assert.ok(
      !html.includes("Pick a mail-kit theme."),
      "no blocking theme error may remain",
    );
  });

  it("theme-load failure preselects the default instead of blocking", async () => {
    const html = await homepage();
    assert.ok(
      html.includes('themeSlugs = ["classic"];'),
      "catch must seed the default slug",
    );
    assert.ok(
      !html.includes("Couldn't load themes"),
      "load-failure blocking option must be gone",
    );
    const disables = html.match(/pledgeSubmit\.disabled = true/g) || [];
    assert.equal(
      disables.length,
      1,
      "only the submit-in-flight disable may remain",
    );
  });

  it("default theme exists in the registry, templates, and validator", async () => {
    const reg = JSON.parse(
      await fs.readFile(
        path.join(root, "public", "pledges", "themes.json"),
        "utf8",
      ),
    );
    assert.ok(
      reg.themes.some((t) => t.slug === DEFAULT_THEME),
      "registry must list the default theme",
    );
    await assert.doesNotReject(
      fs.stat(path.join(root, "html", "pledges", `${DEFAULT_THEME}.html`)),
      "default theme template must exist",
    );
    const r = validatePledge({
      who: "Mabel",
      kind: "ram",
      type: "DDR3",
      qty: 8,
      theme: DEFAULT_THEME,
    });
    assert.equal(r.ok, true, "validator must accept the default theme");
  });
});
