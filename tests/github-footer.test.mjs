import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Every footer links the repo so visitors can star and read the source.
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const URL = "https://github.com/krismeister/samneedsram.com";

function footerOf(html, name) {
  const m = /<footer[\s\S]*?<\/footer>/.exec(html);
  assert.ok(m, `${name}: no footer block`);
  return m[0];
}

describe("github footer link", () => {
  it("homepage footer links the repo", async () => {
    const html = await fs.readFile(
      path.join(root, "html", "homepage.html"),
      "utf8",
    );
    const footer = footerOf(html, "homepage.html");
    assert.ok(
      footer.includes(`href="${URL}"`),
      "homepage footer: missing repo link",
    );
    assert.ok(
      footer.includes('target="_blank"'),
      "homepage footer: repo link must open a new tab",
    );
  });

  it("every pledge template footer links the repo", async () => {
    const dir = path.join(root, "html", "pledges");
    const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".html"));
    assert.ok(files.length > 0, "no templates found");
    for (const f of files) {
      const html = await fs.readFile(path.join(dir, f), "utf8");
      const footer = footerOf(html, f);
      assert.ok(footer.includes(`href="${URL}"`), `${f}: missing repo link`);
      assert.ok(
        footer.includes('target="_blank"'),
        `${f}: repo link must open a new tab`,
      );
    }
  });
});
