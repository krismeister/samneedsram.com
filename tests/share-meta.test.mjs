import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fillTemplate } from "../lib/pledge-pages.js";

// Share-meta contract: pledge pages and the homepage must emit a complete,
// validator-green <head> (og + twitter tags, absolute https URLs).

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://samneedsram.com";
const HANDLE = "@maxquesar";

const PLEDGE = {
  who: "Mabel",
  kind: "ram",
  type: "DDR3",
  qty: 8,
  eulogy: "she served 11 years",
  theme: "ramageddon",
};

// Content of <meta name|property="key" content="...">, or null when absent.
function meta(html, key) {
  const re = new RegExp(
    `<meta\\s+(?:name|property)="${key}"\\s+content="([^"]*)"`,
  );
  return re.exec(html)?.[1] ?? null;
}

const REQUIRED = [
  "description",
  "og:title",
  "og:description",
  "og:image",
  "og:url",
  "og:type",
  "og:site_name",
  "twitter:card",
  "twitter:site",
  "twitter:title",
  "twitter:description",
  "twitter:image",
];

describe("pledge share meta", () => {
  it("every pledge template fills a complete validator-green head", async () => {
    const dir = await fs.readdir(path.join(root, "html", "pledges"));
    const files = dir.filter((f) => f.endsWith(".html"));
    assert.ok(files.length > 0, "no pledge templates found");
    for (const file of files) {
      const theme = path.basename(file, ".html");
      const src = await fs.readFile(
        path.join(root, "html", "pledges", file),
        "utf8",
      );
      const out = fillTemplate(
        src,
        { ...PLEDGE, theme },
        { siteUrl: SITE, jwt: "JWT", theme, displayName: theme },
      );
      assert.ok(!out.includes("{{"), `${theme}: unfilled marker remains`);
      assert.match(out, /<title>[^<]+<\/title>/, `${theme}: title`);
      for (const key of REQUIRED) {
        const v = meta(out, key);
        assert.ok(v && v.length > 0, `${theme}: meta ${key} must be set`);
      }
      assert.equal(
        meta(out, "twitter:card"),
        "summary_large_image",
        `${theme}: card`,
      );
      assert.equal(meta(out, "twitter:site"), HANDLE, `${theme}: handle`);
      assert.ok(
        meta(out, "og:url").startsWith(`${SITE}/pledges/${theme}?content=`),
        `${theme}: og:url points at the pledge page`,
      );
      for (const key of ["og:image", "twitter:image"]) {
        assert.ok(
          meta(out, key).startsWith("https://"),
          `${theme}: ${key} must be absolute`,
        );
      }
      // Referenced share art ships with the site.
      const ogPath = path.join(root, "public", "pledges", "art", theme, "og.jpg");
      await assert.doesNotReject(fs.stat(ogPath), `${theme}: og.jpg exists`);
    }
  });
});

describe("homepage share meta", () => {
  it("homepage head carries absolute share tags", async () => {
    const html = await fs.readFile(
      path.join(root, "html", "homepage.html"),
      "utf8",
    );
    for (const key of REQUIRED) {
      const v = meta(html, key);
      assert.ok(v && v.length > 0, `homepage: meta ${key} must be set`);
    }
    assert.equal(meta(html, "og:url"), `${SITE}/`);
    assert.equal(meta(html, "og:image"), `${SITE}/homepage/og.jpg`);
    assert.equal(meta(html, "twitter:site"), HANDLE);
    assert.equal(meta(html, "og:locale"), "en_US");
    assert.equal(meta(html, "og:image:width"), "1200");
    assert.equal(meta(html, "og:image:height"), "630");
    assert.ok(
      meta(html, "og:image:alt")?.length > 0,
      "homepage: og:image:alt must be set",
    );
    assert.ok(
      meta(html, "twitter:image:alt")?.length > 0,
      "homepage: twitter:image:alt must be set",
    );
    await assert.doesNotReject(
      fs.stat(path.join(root, "public", "homepage", "og.jpg")),
      "homepage og.jpg exists",
    );
  });
});
