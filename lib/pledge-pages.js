import { promises as fs } from "node:fs";
import path from "node:path";

// Server helpers for the pledge flow (docs/pledge-pages-spec.md).
// No Next imports — safe for plain node --test.

const SECRET_PLACEHOLDER = "change-me-to-32-plus-random-bytes";

export function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}

// PLEDGE_JWT_SECRET, or null when missing/placeholder/too short.
export function getPledgeSecret() {
  const secret = process.env.PLEDGE_JWT_SECRET;
  if (!secret || secret === SECRET_PLACEHOLDER || secret.length < 32) {
    return null;
  }
  return secret;
}

// Canonical site origin (no trailing slash), or null when unset.
export function getSiteUrl() {
  const raw = process.env.SITE_URL;
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

// Registry slug -> { display_name, category }. Empty map when unreadable.
// Merges deprecated-themes.json so old links for retired themes still
// resolve display names (the picker reads themes.json directly, unaffected).
export async function readThemes() {
  const map = {};
  for (const file of ["themes.json", "deprecated-themes.json"]) {
    try {
      const raw = await fs.readFile(
        path.join(process.cwd(), "public", "pledges", file),
        "utf8",
      );
      const data = JSON.parse(raw);
      for (const t of data.themes ?? []) {
        if (t.slug && !map[t.slug]) map[t.slug] = t;
      }
    } catch {
      // Missing/unreadable list: keep whatever merged so far.
    }
  }
  return map;
}

async function readRegistrySlugs(file) {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "public", "pledges", file),
      "utf8",
    );
    const data = JSON.parse(raw);
    return new Set((data.themes ?? []).map((t) => t.slug).filter(Boolean));
  } catch {
    return new Set();
  }
}

// Membership of a theme slug against the JSON registries: "active"
// (mintable), "deprecated" (old links render, no new mints), or
// "unknown". The mint route enforces this; validatePledge only checks
// slug shape, so new registry themes never need a code change.
export async function themeStatus(slug) {
  const [active, deprecated] = await Promise.all([
    readRegistrySlugs("themes.json"),
    readRegistrySlugs("deprecated-themes.json"),
  ]);
  if (active.has(slug)) return "active";
  if (deprecated.has(slug)) return "deprecated";
  return "unknown";
}

// Fill a pledge template: conditional block, then {{marker}} substitution.
// payload is a validated pledge { who, kind, type, qty, eulogy?, theme }.
export function fillTemplate(template, payload, { siteUrl, jwt, theme, displayName }) {
  const eulogy = payload.eulogy ?? "";
  const unit = payload.kind === "floppy" ? "disks" : "GB";
  const who = escapeHtml(payload.who);
  const type = escapeHtml(payload.type);
  const qty = payload.qty;

  const markers = {
    who,
    kind: payload.kind,
    type,
    qty: String(qty),
    qty_unit: unit,
    eulogy: escapeHtml(eulogy),
    theme,
    theme_display_name: escapeHtml(displayName),
    page_url: `${siteUrl}/pledges/${theme}?content=${jwt}`,
    meta_title: `${who} pledged ${qty}${unit} ${type} to Sam`,
    meta_description: eulogy
      ? escapeHtml(eulogy)
      : `${who} donated ${qty} ${unit} of ${type}. Sam's out of memory. Help him remember.`,
    meta_image: `${siteUrl}/pledges/art/${theme}/og.jpg`,
  };

  let out = template;
  if (eulogy) {
    out = out.replace(/{{#if_eulogy}}([\s\S]*?){{\/if_eulogy}}/g, "$1");
  } else {
    out = out.replace(/{{#if_eulogy}}[\s\S]*?{{\/if_eulogy}}/g, "");
  }
  for (const [key, value] of Object.entries(markers)) {
    out = out.split(`{{${key}}}`).join(value);
  }
  return out;
}
