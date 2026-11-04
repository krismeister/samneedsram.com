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
};

export default nextConfig;
