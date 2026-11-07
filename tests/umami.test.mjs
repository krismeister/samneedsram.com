import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  UMAMI_SCRIPT_SRC,
  UMAMI_WEBSITE_ID,
  injectGlobalHead,
} from "../lib/site-head.js";

// Umami coverage: Next.js injects global head tags at serve time (static
// HTML files stay clean), and the homepage reports pledge/share conversions.

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("global head injection", () => {
  it("injects the umami tag before </head>", () => {
    const out = injectGlobalHead(
      "<html><head><title>x</title></head><body></body></html>",
    );
    assert.ok(out.includes(UMAMI_SCRIPT_SRC), "script src present");
    assert.ok(out.includes(UMAMI_WEBSITE_ID), "website id present");
    assert.ok(
      out.indexOf(UMAMI_SCRIPT_SRC) < out.toLowerCase().indexOf("</head>"),
      "tag lands inside head",
    );
  });

  it("leaves headless HTML unchanged", () => {
    assert.equal(injectGlobalHead("<p>no head here</p>"), "<p>no head here</p>");
  });

  it("serving routes inject global head tags", async () => {
    for (const route of ["app/route.js", "app/pledges/[theme]/route.js"]) {
      const src = await fs.readFile(path.join(root, route), "utf8");
      assert.ok(
        src.includes("injectGlobalHead"),
        `${route} must inject global head tags`,
      );
    }
  });

});

describe("homepage conversions", () => {
  it("reports pledge and share conversions", async () => {
    const html = await fs.readFile(
      path.join(root, "html", "homepage.html"),
      "utf8",
    );
    assert.ok(
      html.includes('umami.track("pledge_minted"'),
      "must track pledge_minted on mint",
    );
    assert.ok(
      html.includes('umami.track("share_clicked"'),
      "must track share_clicked",
    );
  });
});
