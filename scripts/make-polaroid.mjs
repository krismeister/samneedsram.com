#!/usr/bin/env node
// Fake-polaroid treatment for mailer photos: square crop, white frame with
// a tall bottom edge, optional handwritten-ish caption. Local sharp only.
// Usage:
//   node scripts/make-polaroid.mjs --in <photo.jpg> --out <name.polaroid.jpg> [--caption "Sam, probably"] [--size 900]
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

function arg(name, def = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  return process.argv[i + 1] ?? def;
}

const input = arg("in");
const out = arg("out");
const caption = arg("caption", "");
const size = Number(arg("size", "900"));

if (!input || !out) {
  console.error(
    'Usage: make-polaroid.mjs --in <photo.jpg> --out <name.polaroid.jpg> [--caption "text"] [--size 900]'
  );
  process.exit(1);
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const border = Math.round(size * 0.09);
const bottom = Math.round(size * 0.3);
const W = size + border * 2;
const H = size + border + bottom;

let pipeline = sharp(resolve(input))
  .resize(size, size, { fit: "cover", position: "attention" })
  .extend({
    top: border,
    bottom,
    left: border,
    right: border,
    background: "#fdfdf8",
  });

if (caption) {
  const svg = `<svg width="${W}" height="${H}"><text x="${W / 2}" y="${
    size + border + bottom * 0.62
  }" text-anchor="middle" font-family="'DejaVu Serif', Georgia, serif" font-size="${Math.round(
    size * 0.062
  )}" font-style="italic" fill="#333">${esc(caption)}</text></svg>`;
  pipeline = pipeline.composite([{ input: Buffer.from(svg), top: 0, left: 0 }]);
}

const outPath = resolve(out);
mkdirSync(dirname(outPath), { recursive: true });
await pipeline.jpeg({ quality: 85, mozjpeg: true }).toFile(outPath);

const { statSync } = await import("node:fs");
console.log(`polaroid: ${Math.round(statSync(outPath).size / 1024)}KB ${outPath}`);
