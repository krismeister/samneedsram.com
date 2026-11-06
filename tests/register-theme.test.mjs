import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { registerTheme } from "../scripts/register-theme.mjs";

const seed = () =>
  '{"themes": [{"category": "Games", "display_name": "A", "slug": "a"}, {"category": "TV", "display_name": "B", "slug": "b"}]}';

describe("register-theme", () => {
  it("appends an entry preserving shape, and is idempotent", () => {
    const file = path.join(mkdtempSync(path.join(tmpdir(), "reg-")), "themes.json");
    writeFileSync(file, seed());
    assert.equal(registerTheme(file, "c", "C", "Movies"), "registered c");
    const j = JSON.parse(readFileSync(file, "utf8"));
    assert.equal(j.themes.length, 3);
    assert.deepEqual(j.themes[2], { category: "Movies", display_name: "C", slug: "c" });
    assert.equal(registerTheme(file, "c", "C", "Movies"), "already present");
    assert.equal(JSON.parse(readFileSync(file, "utf8")).themes.length, 3);
  });

  it("merges onto the other side: theirs plus re-run keeps both entries", () => {
    const file = path.join(mkdtempSync(path.join(tmpdir(), "reg-")), "themes.json");
    writeFileSync(file, seed());
    registerTheme(file, "c", "C", "Movies"); // my entry, unpushed
    writeFileSync(file, seed().replace("]}", "") + ', {"category": "TV", "display_name": "D", "slug": "d"}]}'); // theirs won
    assert.equal(registerTheme(file, "c", "C", "Movies"), "registered c");
    const slugs = JSON.parse(readFileSync(file, "utf8")).themes.map((t) => t.slug);
    assert.deepEqual(slugs, ["a", "b", "d", "c"]);
  });

  it("refuses an unexpected file shape", () => {
    const file = path.join(mkdtempSync(path.join(tmpdir(), "reg-")), "themes.json");
    writeFileSync(file, "{}\n");
    assert.throws(() => registerTheme(file, "c", "C", "Movies"), /unexpected shape/);
  });
});
