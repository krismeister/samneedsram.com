#!/usr/bin/env node
// Render a mailer HTML file to a large letter-shaped JPEG image
// (full page at 2x). Local Puppeteer only (never global).
// Usage:
//   node scripts/make-letter-image.mjs --html <in.html> --out <letter.jpg> [--width 816] [--quality 80] [--max-kb 600]
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

// Keep the browser cache repo-local by default (no ~/.cache writes).
if (!process.env.PUPPETEER_CACHE_DIR) {
  const root = dirname(dirname(fileURLToPath(import.meta.url)));
  process.env.PUPPETEER_CACHE_DIR = resolve(root, ".cache/puppeteer");
}

function arg(name, def = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  return process.argv[i + 1] ?? def;
}

const html = arg("html");
const out = arg("out");
const width = Number(arg("width", "816"));
const quality = Number(arg("quality", "80"));
const maxKb = Number(arg("max-kb", "600"));

if (!html || !out) {
  console.error(
    "Usage: make-letter-image.mjs --html <input.html> --out <letter.jpg> [--width 816] [--quality 80] [--max-kb 600]"
  );
  process.exit(1);
}

const htmlPath = resolve(html);
const outPath = resolve(out);
mkdirSync(dirname(outPath), { recursive: true });

const { existsSync } = await import("node:fs");
const launchArgs = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--no-crashpad",
  "--disable-crash-reporter",
];

async function launch() {
  try {
    return await puppeteer.launch({ headless: true, args: launchArgs });
  } catch (err) {
    // Sandboxed/limited machines can reject the bundled Chrome build;
    // fall back to a system Chromium when one exists.
    const fallback =
      process.env.CHROME_PATH ||
      (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : null);
    if (!fallback) throw err;
    console.error(`Bundled Chrome failed, retrying with ${fallback}`);
    return await puppeteer.launch({
      headless: true,
      args: launchArgs,
      executablePath: fallback,
    });
  }
}

const browser = await launch();
try {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 1056, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0" });
  await page.screenshot({ path: outPath, type: "jpeg", quality, fullPage: true });

  const { statSync } = await import("node:fs");
  const kb = Math.round(statSync(outPath).size / 1024);
  console.log(`letter: ${kb}KB ${outPath}`);
  if (kb > maxKb) {
    console.error(
      `WARNING: ${kb}KB exceeds the ${maxKb}KB budget. Shrink raster assets (max ~1200px wide JPEG) and prefer SVG/CSS.`
    );
  }
} finally {
  await browser.close();
}
