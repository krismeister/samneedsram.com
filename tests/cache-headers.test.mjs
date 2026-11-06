import { describe, it } from "node:test";
import assert from "node:assert/strict";
import nextConfig from "../next.config.mjs";

// Cache policy: the site is set-and-forget, so TTLs are maxed everywhere
// except the homepage (still edited). themes.json and the mint/health APIs
// are never cached, so the picker never offers retired themes.
describe("cache headers", () => {
  it("maps every route to its intended Cache-Control", async () => {
    const rules = await nextConfig.headers();
    const get = (source) =>
      rules.find((r) => r.source === source)?.headers.find(
        (h) => h.key === "Cache-Control",
      )?.value;
    const YEAR = "public, max-age=31536000, immutable";
    const HOUR = "public, max-age=3600, stale-while-revalidate=86400";
    assert.equal(get("/pledges/:path*"), YEAR);
    assert.equal(get("/pledges/themes.json"), "no-store");
    assert.equal(get("/"), "public, max-age=300, stale-while-revalidate=3600");
    assert.equal(get("/letters"), HOUR);
    assert.equal(get("/letters/:path*"), HOUR);
    assert.equal(get("/api/letters/:path*"), HOUR);
    assert.equal(get("/api/pledges/mint"), "no-store");
    assert.equal(get("/api/health"), "no-store");
    assert.equal(get("/homepage/:path*"), YEAR);
    assert.equal(get("/favicon.svg"), YEAR);
    assert.equal(get("/favicon-16x16.png"), YEAR);
    assert.equal(get("/favicon-32x32.png"), YEAR);
    assert.equal(get("/apple-touch-icon.png"), YEAR);
    assert.equal(get("/site.webmanifest"), YEAR);
  });
});
