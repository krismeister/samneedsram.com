// Embeds html/*.html into a JS module so routes can serve them without
// runtime file reads (the standalone container has no html/ dir).
// Runs on predev/prebuild; output is committed. Only rewrites on change.
import { promises as fs } from "node:fs";
import path from "node:path";

const root = new URL("..", import.meta.url).pathname;
const outFile = path.join(root, "lib", "pages.generated.js");

const homepage = await fs.readFile(
  path.join(root, "html", "homepage.html"),
  "utf8",
);
const dir = await fs.readdir(path.join(root, "html", "pledges"));
const templates = {};
for (const file of dir.filter((f) => f.endsWith(".html")).sort()) {
  const slug = path.basename(file, ".html");
  templates[slug] = await fs.readFile(
    path.join(root, "html", "pledges", file),
    "utf8",
  );
}

const out = `// GENERATED — do not hand-edit. Regen: npm run embed-html.
export const HOMEPAGE_HTML = ${JSON.stringify(homepage)};
export const PLEDGE_TEMPLATES = ${JSON.stringify(templates)};
`;

let current = null;
try {
  current = await fs.readFile(outFile, "utf8");
} catch {
  // first run
}
if (current !== out) {
  await fs.writeFile(outFile, out);
  console.log(`embed-html: wrote lib/pages.generated.js (${dir.length} themes)`);
} else {
  console.log("embed-html: up to date");
}
