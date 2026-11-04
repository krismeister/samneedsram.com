#!/usr/bin/env node
// Render a mailer HTML file to PDF with local Puppeteer (headless Chromium).
// Usage:
//   node scripts/render-mailer-pdf.mjs --html <in.html> --pdf <out.pdf> [--format Letter]
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
const pdf = arg("pdf");
const format = arg("format", "Letter");
const maxKb = Number(arg("max-kb", "500"));

if (!html || !pdf) {
  console.error(
    "Usage: render-mailer-pdf.mjs --html <input.html> --pdf <output.pdf> [--format Letter] [--max-kb 500]"
  );
  process.exit(1);
}

const htmlPath = resolve(html);
const pdfPath = resolve(pdf);
mkdirSync(dirname(pdfPath), { recursive: true });

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
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0" });
  await page.pdf({
    path: pdfPath,
    format,
    printBackground: true,
    preferCSSPageSize: true,
  });

  const { statSync } = await import("node:fs");
  const pdfKb = Math.round(statSync(pdfPath).size / 1024);
  console.log(`pdf: ${pdfKb}KB ${pdfPath}`);
  // Hosting-cost guardrail: warn (don't fail) when a mailer gets heavy,
  // almost always from an oversized raster image in the template.
  if (pdfKb > maxKb) {
    console.error(
      `WARNING: ${pdfKb}KB exceeds the ${maxKb}KB budget. Shrink raster assets (max ~1200px wide JPEG) and prefer SVG/CSS.`
    );
  }
} finally {
  await browser.close();
}
