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
const fit = arg("fit", "cover");
const bgOpt = arg("bg", "auto");

if (!input || !slug) {
  console.error(
    "Usage: make-thumbnail.mjs --in <full.jpg> --slug <slug> [--out-dir DIR] [--size 1000] [--quality 70] [--gravity center] [--fit cover|contain] [--bg auto|#hex]"
  );
  process.exit(1);
}
if (fit !== "cover" && fit !== "contain") {
  console.error(`Refusing: --fit must be cover or contain, got "${fit}".`);
  process.exit(1);
}
if (!/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/.test(slug)) {
  console.error(`Refusing: slug "${slug}" is not valid (lowercase letters, numbers, - and _ only).`);
  process.exit(1);
}

const outPath = resolve(outDir, `${slug}.thumb.jpg`);
mkdirSync(resolve(outDir), { recursive: true });

async function sampleBg(imgPath) {
  const meta = await sharp(imgPath).metadata();
  const n = 12;
  const regions = [
    { left: 0, top: 0 },
    { left: meta.width - n, top: 0 },
    { left: 0, top: meta.height - n },
    { left: meta.width - n, top: meta.height - n },
  ];
  let r = 0,
    g = 0,
    b = 0;
  for (const { left, top } of regions) {
    const { data } = await sharp(imgPath)
      .extract({ left, top, width: n, height: n })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const px = data.length / 3;
    for (let i = 0; i < data.length; i += 3) {
      r += data[i] / px;
      g += data[i + 1] / px;
      b += data[i + 2] / px;
    }
  }
  const toHex = (v) =>
    Math.round(v / regions.length)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

let pipeline = sharp(resolve(input));
if (fit === "contain") {
  const background = bgOpt === "auto" ? await sampleBg(resolve(input)) : bgOpt;
  pipeline = pipeline.resize(size, size, { fit: "contain", background });
} else {
  pipeline = pipeline.resize(size, size, { fit: "cover", position: gravity });
}
await pipeline.jpeg({ quality, mozjpeg: true }).toFile(outPath);

const { statSync } = await import("node:fs");
const kb = Math.round(statSync(outPath).size / 1024);
console.log(`thumb: ${kb}KB ${outPath}`);
if (kb > 200) {
  console.error(
    `WARNING: ${kb}KB exceeds the 200KB thumbnail budget. Lower --quality.`
  );
}
