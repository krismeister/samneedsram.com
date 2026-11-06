#!/usr/bin/env node
// Append one theme entry to public/pledges/themes.json, idempotently.
// Safe under concurrent pool landings: re-running after a merge that took
// the other side ("theirs") restores this entry without duplicating it.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultFile = path.join(repoRoot, "public", "pledges", "themes.json");

export function registerTheme(file, slug, displayName, category) {
  const entry = `{"category": "${category}", "display_name": "${displayName}", "slug": "${slug}"}`;
  let s = readFileSync(file, "utf8");
  if (s.includes(`"slug": "${slug}"`)) return "already present";
  s = s.replace(/\s*$/, "");
  if (!s.endsWith("]}")) throw new Error(`${file} has unexpected shape`);
  s = s.slice(0, -2) + ", " + entry + "]}";
  JSON.parse(s); // validate before writing
  writeFileSync(file, s);
  return "registered " + slug;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [slug, displayName, category] = process.argv.slice(2);
  if (!slug || !displayName || !category) {
    console.error("usage: register-theme.mjs <slug> <display-name> <category>");
    process.exit(2);
  }
  console.log(registerTheme(defaultFile, slug, displayName, category));
}
