import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";

// Contract test: the committed content store must match the schema the
// public frontend consumes (docs/phase-1.md "letters.json schema").
// Image-based layout: entries carry `image`, never `pdf`.
const REQUIRED_FIELDS = [
  "slug",
  "name",
  "ram_type",
  "gb",
  "date",
  "excerpt",
  "cover_letter",
  "eulogy",
  "template",
  "image",
  "thumbnail",
];

const testsDir = path.dirname(new URL(import.meta.url).pathname);
const repoRoot = path.join(testsDir, "..");

describe("letters.json schema", () => {
  it("exists and is newest-first array", async () => {
    const raw = await fs.readFile(
      path.join(repoRoot, "public", "static-mailers", "letters.json"),
      "utf8",
    );
    const letters = JSON.parse(raw);
    assert.ok(Array.isArray(letters), "top level must be an array");
    assert.ok(letters.length > 0, "expected at least one mailer entry");
  });

  it("every entry has all required fields and no legacy pdf field", async () => {
    const raw = await fs.readFile(
      path.join(repoRoot, "public", "static-mailers", "letters.json"),
      "utf8",
    );
    for (const entry of JSON.parse(raw)) {
      for (const field of REQUIRED_FIELDS) {
        assert.ok(
          entry[field] !== undefined && entry[field] !== null,
          `${entry.slug ?? "?"}: missing required field ${field}`,
        );
      }
      assert.ok(
        !("pdf" in entry),
        `${entry.slug}: legacy pdf field must not be present`,
      );
      assert.match(entry.image, /^\/static-mailers\/.+\.jpg$/);
      assert.match(entry.thumbnail, /^\/static-mailers\/.+\.thumb\.jpg$/);
    }
  });

  it("every referenced image and thumbnail file exists", async () => {
    const raw = await fs.readFile(
      path.join(repoRoot, "public", "static-mailers", "letters.json"),
      "utf8",
    );
    for (const entry of JSON.parse(raw)) {
      for (const field of ["image", "thumbnail"]) {
        const file = path.join(repoRoot, "public", entry[field]);
        await assert.doesNotReject(
          fs.access(file),
          `${entry.slug}: missing file for ${field}: ${entry[field]}`,
        );
      }
    }
  });
});
