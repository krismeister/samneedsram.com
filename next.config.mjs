/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal standalone server for container deploys (Cloud Run).
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.samneedsram.com" }],
        destination: "https://samneedsram.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Site is set-and-forget: cache everything hard except the homepage
    // (Kris still edits it); never cache themes.json or the mint/health APIs.
    // Nothing caches longer than 10 days.
    const TEN_DAYS = "public, max-age=864000";
    const cc = (value) => [{ key: "Cache-Control", value }];
    return [
      // Pledge pages: each URL carries its JWT, so bytes are frozen per URL.
      // (The dice button re-deals client-side on every view — see site-head.)
      { source: "/pledges/:path*", headers: cc(TEN_DAYS) },
      // Picker data is never cached: a stale copy would offer retired
      // themes that mint rejects.
      {
        source: "/pledges/themes.json",
        headers: cc("no-store"),
      },
      // Homepage: still edited, so keep it short.
      {
        source: "/",
        headers: cc("public, max-age=300, stale-while-revalidate=3600"),
      },
      // Letters: disk-backed, change on deploy only.
      {
        source: "/letters",
        headers: cc("public, max-age=3600, stale-while-revalidate=86400"),
      },
      {
        source: "/letters/:path*",
        headers: cc("public, max-age=3600, stale-while-revalidate=86400"),
      },
      {
        source: "/api/letters/:path*",
        headers: cc("public, max-age=3600, stale-while-revalidate=86400"),
      },
      // Never cache minting or health.
      { source: "/api/pledges/mint", headers: cc("no-store") },
      { source: "/api/health", headers: cc("no-store") },
      // Static brand art: set-and-forget.
      { source: "/homepage/:path*", headers: cc(TEN_DAYS) },
      { source: "/favicon.svg", headers: cc(TEN_DAYS) },
      { source: "/favicon-16x16.png", headers: cc(TEN_DAYS) },
      { source: "/favicon-32x32.png", headers: cc(TEN_DAYS) },
      { source: "/apple-touch-icon.png", headers: cc(TEN_DAYS) },
      { source: "/site.webmanifest", headers: cc(TEN_DAYS) },
    ];
  },
};

export default nextConfig;
