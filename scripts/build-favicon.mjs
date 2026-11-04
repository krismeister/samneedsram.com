#!/usr/bin/env node
// build-favicon.mjs — render scripts/pledge-art/favicon.svg to the multi-res
// favicon set + web manifest. Outputs are committed; no ICO (SVG+PNG covers
// modern browsers, and ICO needs a writer dependency we don't ship).
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = path.join(ROOT, "scripts/pledge-art/favicon.svg");
const PUB = path.join(ROOT, "public");
const svg = readFileSync(SRC);
const DENSITY = 384; // rasterize big, then downscale for crisp edges

// SVG passthrough + transparent sizes (tabs, shortcuts).
copyFileSync(SRC, path.join(PUB, "favicon.svg"));
console.log("favicon.svg: copied");
for (const size of [16, 32, 48]) {
  const info = await sharp(svg, { density: DENSITY })
    .resize(size, size)
    .png()
    .toFile(path.join(PUB, `favicon-${size}x${size}.png`));
  console.log(`favicon-${size}x${size}.png: ${info.width}x${info.height}`);
}

// Opaque sizes on ink (iOS + manifest icons must be full-bleed).
async function onInk(size, name) {
  const markSize = Math.round(size * 0.72);
  const mark = await sharp(svg, { density: DENSITY })
    .resize(markSize, markSize)
    .png()
    .toBuffer();
  const info = await sharp({
    create: { width: size, height: size, channels: 4, background: "#16130e" },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(path.join(PUB, name));
  console.log(`${name}: ${info.width}x${info.height}`);
}
await onInk(180, "apple-touch-icon.png");
await onInk(192, "android-chrome-192x192.png");
await onInk(512, "android-chrome-512x512.png");

const manifest = {
  name: "samneedsram.com",
  short_name: "samneedsram",
  icons: [
    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  theme_color: "#16130e",
  background_color: "#16130e",
  display: "standalone",
};
writeFileSync(path.join(PUB, "site.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");
console.log("site.webmanifest: written");
