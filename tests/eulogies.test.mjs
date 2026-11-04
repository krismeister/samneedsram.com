import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Eulogy suggestions: public/eulogies.json holds exactly 50 short,
// submittable eulogies; the homepage loads one into the field placeholder
// on page load and submits the placeholder when the field is left empty.

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

async function eulogies() {
  return JSON.parse(
    await fs.readFile(path.join(root, "public", "eulogies.json"), "utf8"),
  );
}

async function homepage() {
  return fs.readFile(path.join(root, "html", "homepage.html"), "utf8");
}

describe("eulogies.json", () => {
  it("holds exactly 50 short, unique, submittable eulogies", async () => {
    const list = await eulogies();
    assert.ok(Array.isArray(list), "must be an array");
    assert.equal(list.length, 50, "must hold exactly 50 eulogies");
    const seen = new Set();
    for (const e of list) {
      assert.equal(typeof e, "string", "every entry must be a string");
      assert.ok(e.length > 0, "no empty entries");
      assert.ok(
        e.length <= 140,
        `over the 140-char field limit: ${e.slice(0, 40)}...`,
      );
      assert.ok(!seen.has(e), `duplicate entry: ${e.slice(0, 40)}...`);
      seen.add(e);
    }
  });
});

describe("homepage eulogy placeholder", () => {
  it("loads a suggestion into the placeholder on page load", async () => {
    const html = await homepage();
    assert.ok(
      html.includes('fetch("/eulogies.json")'),
      "must fetch the eulogy list",
    );
    assert.ok(
      html.includes("fEulogy.placeholder = "),
      "must drop a suggestion into the placeholder",
    );
  });

  it("submits the placeholder when the field is left empty", async () => {
    const html = await homepage();
    assert.ok(
      html.includes('if (eulogy.trim() === "") eulogy = fEulogy.placeholder || "";'),
      "empty submit must fall back to the placeholder",
    );
  });
});
