import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fillTemplate, pickRandomThemeSlug } from "../lib/pledge-pages.js";

// Random-theme button: every pledge page links to a different active theme
// with the same JWT ("Deal me another theme", dice icon, top right).

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://samneedsram.com";
const JWT = "FAKE.JWT.TOKEN";

const PLEDGE = {
  who: "Mabel",
  kind: "ram",
  type: "DDR3",
  qty: 8,
  eulogy: "she served 11 years",
  theme: "classic",
};

describe("pickRandomThemeSlug", () => {
  it("never returns the current theme", () => {
    for (const r of [0, 0.25, 0.5, 0.75, 0.9999]) {
      const slug = pickRandomThemeSlug(["a", "b", "c"], "b", () => r);
      assert.notEqual(slug, "b");
      assert.ok(["a", "c"].includes(slug));
    }
  });

  it("is deterministic with an injected random", () => {
    assert.equal(pickRandomThemeSlug(["a", "b", "c"], "z", () => 0), "a");
    assert.equal(pickRandomThemeSlug(["a", "b", "c"], "z", () => 0.9999), "c");
  });

  it("falls back to the current theme when alone", () => {
    assert.equal(pickRandomThemeSlug(["only"], "only"), "only");
    assert.equal(pickRandomThemeSlug([], "only"), "only");
  });
});

describe("random-theme markers", () => {
  it("fills a same-JWT link to the random theme", () => {
    const out = fillTemplate("{{random_theme}} {{random_theme_url}}", PLEDGE, {
      siteUrl: SITE,
      jwt: JWT,
      theme: "classic",
      displayName: "Classic",
      randomTheme: "gondor",
    });
    assert.equal(out, `gondor ${SITE}/pledges/gondor?content=${JWT}`);
  });

  it("falls back to the current page when randomTheme is omitted", () => {
    const out = fillTemplate("{{page_url}} {{random_theme_url}}", PLEDGE, {
      siteUrl: SITE,
      jwt: JWT,
      theme: "classic",
      displayName: "Classic",
    });
    assert.equal(
      out,
      `${SITE}/pledges/classic?content=${JWT} ${SITE}/pledges/classic?content=${JWT}`,
    );
  });
});

describe("random-theme button presence", () => {
  it("every pledge template has the button with dice and phrase", async () => {
    const dir = path.join(root, "html", "pledges");
    const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".html"));
    assert.ok(files.length > 0, "no templates found");
    for (const f of files) {
      const tpl = await fs.readFile(path.join(dir, f), "utf8");
      assert.ok(
        tpl.includes('class="random-theme noprint"'),
        `${f}: missing .random-theme anchor`,
      );
      assert.ok(
        tpl.includes('href="{{random_theme_url}}"'),
        `${f}: missing random_theme_url href`,
      );
      assert.ok(tpl.includes("Deal me another theme"), `${f}: missing phrase`);
      assert.ok(
        tpl.includes("<svg") && tpl.includes('aria-hidden="true"'),
        `${f}: missing dice icon`,
      );
    }
  });

  it("every pledged theme stylesheet pins the button top-right", async () => {
    const htmlDir = path.join(root, "html", "pledges");
    const cssDir = path.join(root, "public", "pledges", "css");
    const slugs = (await fs.readdir(htmlDir))
      .filter((f) => f.endsWith(".html"))
      .map((f) => f.replace(/\.html$/, ""));
    assert.ok(slugs.length > 0, "no templates found");
    for (const slug of slugs) {
      const css = await fs.readFile(path.join(cssDir, `${slug}.css`), "utf8");
      assert.ok(css.includes(".random-theme"), `${slug}.css: missing rule`);
      assert.ok(
        /\.random-theme\s*\{[^}]*position\s*:\s*fixed[^}]*\}/s.test(css),
        `${slug}.css: .random-theme must be position:fixed`,
      );
    }
  });
});
