import { promises as fs } from "node:fs";
import path from "node:path";

// Server-only helper: reads the committed content index.
// Returns [] when the background generator hasn't written letters.json yet.
export async function readLetters() {
  const file = path.join(
    process.cwd(),
    "public",
    "static-mailers",
    "letters.json",
  );
  try {
    const raw = await fs.readFile(file, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    if (err?.code === "ENOENT") return [];
    throw err;
  }
}

export async function getLetterBySlug(slug) {
  const letters = await readLetters();
  return letters.find((entry) => entry.slug === slug) ?? null;
}
