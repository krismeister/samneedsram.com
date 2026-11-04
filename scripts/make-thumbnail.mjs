#!/usr/bin/env node
// Copy a full-size thumbnail original to the public feed thumbnail:
// 1000x1000 cover-crop mozjpeg. Local sharp only (never global).
// Usage:
//   node scripts/make-thumbnail.mjs --in <full.jpg> --slug <slug> [--out-dir public/static-mailers] [--size 1000] [--quality 70] [--gravity center]
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

function arg(name, def = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  return process.argv[i + 1] ?? def;
}

const input = arg("in");
const slug = arg("slug");
const outDir = arg("out-dir", "public/static-mailers");
const size = Number(arg("size", "1000"));
const quality = Number(arg("quality", "70"));
const gravity = arg("gravity", "center");

if (!input || !slug) {
  console.error(
    "Usage: make-thumbnail.mjs --in <full.jpg> --slug <slug> [--out-dir DIR] [--size 1000] [--quality 70] [--gravity center]"
  );
  process.exit(1);
}
if (!/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/.test(slug)) {
  console.error(`Refusing: slug "${slug}" is not valid (lowercase letters, numbers, - and _ only).`);
  process.exit(1);
}

const outPath = resolve(outDir, `${slug}.thumb.jpg`);
mkdirSync(resolve(outDir), { recursive: true });

await sharp(resolve(input))
  .resize(size, size, { fit: "cover", position: gravity })
  .jpeg({ quality, mozjpeg: true })
  .toFile(outPath);

const { statSync } = await import("node:fs");
const kb = Math.round(statSync(outPath).size / 1024);
console.log(`thumb: ${kb}KB ${outPath}`);
if (kb > 200) {
  console.error(
    `WARNING: ${kb}KB exceeds the 200KB thumbnail budget. Lower --quality.`
  );
}
