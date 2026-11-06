import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Homepage shows the build-video card ("How'd I build it?").
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("homepage watch card", () => {
  it("links the build video with a thumbnail", async () => {
    const html = await fs.readFile(
      path.join(root, "html", "homepage.html"),
      "utf8",
    );
    assert.ok(html.includes("How&rsquo;d I build it?"), "missing heading");
    assert.ok(
      html.includes(
        'href="https://youtu.be/5qPAYRzlRsA?si=0KGTrn3kHdwx_V2d"',
      ),
      "missing video link",
    );
    assert.ok(
      html.includes("https://i.ytimg.com/vi/5qPAYRzlRsA/maxresdefault.jpg"),
      "missing thumbnail",
    );
    assert.ok(html.includes(".watch-card"), "missing card styles");
  });
});
