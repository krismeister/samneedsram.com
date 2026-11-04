#!/usr/bin/env node
// process-pledge-art.mjs — enforce the docs/pledge-pages-spec.md §4 artwork
// table for one theme. Source art must already comply creatively (original
// or AI-generated, no real-person likenesses, no baked-in text); this script
// enforces the mechanical side: dimensions, formats, weight caps.
//
// Usage:
//   node scripts/process-pledge-art.mjs <theme> \
//     --hero <src> --og <src> --picker <src> [--seal-svg <src>] \
//     [--picker-top <px>]
//
// --picker-top shifts the 300x74 crop band down from the source top edge
// (source pixels; default centers). Use it when the motif that must read
// at tiny size sits above/below center (e.g. faces).
//
// Writes to public/pledges/art/<theme>/{hero.jpg,og.jpg,picker.jpg,seal.png}.
// Exits non-zero if any weight cap still fails after quality stepdown.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

// Exact §4 table. hero: width cap (never upscale). og/picker: exact dims.
const SPECS = {
  hero: { w: 1600, h: null, q: 80, maxKB: 250 },
  og: { w: 1200, h: 630, q: 80, maxKB: 300 },
  picker: { w: 300, h: 74, q: 75, maxKB: 30 },
};
const SEAL_SIZE = 512;

function usageAndExit() {
  console.error(
    "usage: node scripts/process-pledge-art.mjs <theme> --hero <src> --og <src> --picker <src> [--seal-svg <src>] [--picker-top <px>]"
  );
  process.exit(2);
}

const argv = process.argv.slice(2);
const theme = argv[0];
if (!theme || !/^[a-z0-9-]+$/.test(theme)) usageAndExit();
const flag = (name) => {
  const i = argv.indexOf(name);
  return i === -1 ? null : argv[i + 1];
};
const srcs = { hero: flag("--hero"), og: flag("--og"), picker: flag("--picker") };
const sealSvg = flag("--seal-svg");
if (!srcs.hero || !srcs.og || !srcs.picker) usageAndExit();
for (const [k, v] of Object.entries(srcs)) {
  if (!existsSync(v)) {
    console.error(`missing ${k} source: ${v}`);
    process.exit(2);
  }
}
if (sealSvg && !existsSync(sealSvg)) {
  console.error(`missing seal svg: ${sealSvg}`);
  process.exit(2);
}

const OUT = path.join(ROOT, "public/pledges/art", theme);
mkdirSync(OUT, { recursive: true });

let failed = false;
const pickerTopRaw = flag("--picker-top");
for (const [kind, spec] of Object.entries(SPECS)) {
  const meta0 = await sharp(srcs[kind]).metadata();
  let q = spec.q;
  let buf = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    let pipe = sharp(srcs[kind]);
    if (kind === "picker" && pickerTopRaw !== null) {
      const bandH = Math.round(meta0.width * spec.h / spec.w);
      const top = Math.max(0, Math.min(meta0.height - bandH, parseInt(pickerTopRaw, 10) || 0));
      pipe = pipe.extract({ left: 0, top, width: meta0.width, height: bandH }).resize(spec.w, spec.h);
    }
    else if (spec.h) pipe = pipe.resize(spec.w, spec.h, { fit: "cover", position: "centre" });
    else pipe = pipe.resize({ width: Math.min(spec.w, meta0.width), withoutEnlargement: true });
    buf = await pipe.jpeg({ quality: q }).toBuffer();
    if (buf.length <= spec.maxKB * 1024 || q <= 50) break;
    q -= 10;
  }
  writeFileSync(path.join(OUT, `${kind}.jpg`), buf);
  const m = await sharp(buf).metadata();
  const okDims = spec.h ? m.width === spec.w && m.height === spec.h : m.width <= spec.w;
  const okBytes = buf.length <= spec.maxKB * 1024;
  if (!okDims || !okBytes) failed = true;
  console.log(
    `${kind}.jpg: src=${meta0.width}x${meta0.height} out=${m.width}x${m.height} q=${q} bytes=${buf.length} (max ${spec.maxKB * 1024}) ${okDims && okBytes ? "OK" : "FAIL"}`
  );
}

if (sealSvg) {
  const svg = readFileSync(sealSvg);
  const seal = await sharp(svg).resize(SEAL_SIZE, SEAL_SIZE, { fit: "contain" }).png().toBuffer();
  writeFileSync(path.join(OUT, "seal.png"), seal);
  const sm = await sharp(seal).metadata();
  const okSeal = sm.width <= SEAL_SIZE && sm.height <= SEAL_SIZE && sm.hasAlpha;
  if (!okSeal) failed = true;
  console.log(
    `seal.png: out=${sm.width}x${sm.height} hasAlpha=${sm.hasAlpha} bytes=${seal.length} ${okSeal ? "OK" : "FAIL"}`
  );
}

process.exit(failed ? 1 : 0);
