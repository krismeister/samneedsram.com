import { createHmac, timingSafeEqual } from "node:crypto";

// Pledge validation + JWT (HMAC-SHA256) for the homepage form flow.
// Mirrors the PledgeSubmission JSON schema. No dependencies.

// NOTE: keep in sync with public/pledges/themes.json.
const THEMES = ["classic", "ramageddon", "warhammer40kb", "gondor", "severram", "zelda", "backtothefuture", "pokeram", "rambusters", "dramakis", "ramtrek", "daftram", "thisisfine", "tetram"];

const KINDS = {
  ram: {
    types: ["DDR2", "DDR3", "DDR4", "DDR5", "SODIMM"],
    min: 0,
    max: 512,
    integer: false,
  },
  floppy: {
    types: ['3.5" HD', '3.5" DD', '5.25" HD'],
    min: 1,
    max: 500,
    integer: true,
  },
  usb: {
    types: ["USB-A", "USB-C", "Mini", "Mystery"],
    min: 0,
    max: 1024,
    integer: false,
  },
};

const ALLOWED = ["who", "kind", "type", "qty", "eulogy", "theme"];

// Mint fills this in when the form sends no eulogy, so every pledge
// link carries one.
export const DEFAULT_EULOGY = "she served 11 years in my ThinkPad";

export function validatePledge(input) {
  const errors = [];
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, errors: ["body must be an object"] };
  }
  for (const k of Object.keys(input)) {
    if (!ALLOWED.includes(k)) errors.push(`unknown field: ${k}`);
  }
  const v = {};

  const who = typeof input.who === "string" ? input.who.trim() : "";
  if (!who) errors.push("who is required");
  else if (who.length > 24) errors.push("who must be ≤ 24 chars");
  else v.who = who;

  if (!KINDS[input.kind]) {
    errors.push("kind must be ram, floppy, or usb");
  } else {
    v.kind = input.kind;
  }

  const t = typeof input.type === "string" ? input.type : "";
  if (v.kind) {
    if (!KINDS[v.kind].types.includes(t)) {
      errors.push(
        `type must be one of ${KINDS[v.kind].types.join(", ")} for ${v.kind}`,
      );
    } else {
      v.type = t;
    }
  } else if (!t || t.length > 12) {
    errors.push("type is required (≤12 chars)");
  } else {
    v.type = t;
  }

  let qty = input.qty;
  if (typeof qty === "string" && qty.trim() !== "") qty = Number(qty);
  if (typeof qty !== "number" || !Number.isFinite(qty)) {
    errors.push("qty must be a number");
  } else if (qty <= 0) {
    errors.push("qty must be > 0");
  } else if (v.kind) {
    const k = KINDS[v.kind];
    if (qty < k.min || qty > k.max) {
      errors.push(
        k.min === 0
          ? `qty must be over 0 and at most ${k.max} for ${v.kind}`
          : `qty must be ${k.min}–${k.max} for ${v.kind}`,
      );
    } else if (k.integer && !Number.isInteger(qty)) {
      errors.push("qty must be a whole number for floppy");
    } else {
      v.qty = qty;
    }
  } else {
    v.qty = qty;
  }

  if (input.eulogy === undefined || input.eulogy === "") {
    v.eulogy = DEFAULT_EULOGY;
  } else if (typeof input.eulogy !== "string") {
    errors.push("eulogy must be a string");
  } else if (input.eulogy.length > 140) {
    errors.push("eulogy must be ≤ 140 chars");
  } else if (input.eulogy.trim() === "") {
    v.eulogy = DEFAULT_EULOGY;
  } else {
    v.eulogy = input.eulogy;
  }

  if (!THEMES.includes(input.theme)) {
    errors.push(
      "theme must be classic, ramageddon, warhammer40kb, gondor, severram, zelda, backtothefuture, pokeram, rambusters, dramakis, ramtrek, daftram, thisisfine, or tetram",
    );
  } else {
    v.theme = input.theme;
  }

  return errors.length ? { ok: false, errors } : { ok: true, value: v };
}

export function signPledge(value, secret) {
  const h = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
  ).toString("base64url");
  const p = Buffer.from(
    JSON.stringify({ ...value, iat: Math.floor(Date.now() / 1000) }),
  ).toString("base64url");
  const sig = createHmac("sha256", secret)
    .update(`${h}.${p}`)
    .digest("base64url");
  return `${h}.${p}.${sig}`;
}

export function verifyPledge(token, secret) {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, p, sig] = parts;
  let header;
  try {
    header = JSON.parse(Buffer.from(h, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (header.alg !== "HS256") return null;
  let got;
  try {
    got = Buffer.from(sig, "base64url");
  } catch {
    return null;
  }
  const expect = createHmac("sha256", secret).update(`${h}.${p}`).digest();
  if (got.length !== expect.length || !timingSafeEqual(got, expect)) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
    delete payload.iat;
    const v = validatePledge(payload);
    return v.ok ? v.value : null;
  } catch {
    return null;
  }
}
