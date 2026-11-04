#!/usr/bin/env node
// build-logo.mjs — render scripts/pledge-art/logo.svg to the shared PNG
// that process-pledge-art.mjs composites onto every og image.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const svg = readFileSync(path.join(ROOT, "scripts/pledge-art/logo.svg"));
const out = path.join(ROOT, "public/pledges/art/shared/logo.png");
const info = await sharp(svg).png().toFile(out);
console.log(`logo.png: ${info.width}x${info.height} bytes=${info.size}`);
