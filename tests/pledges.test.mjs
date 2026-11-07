import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { validatePledge, signPledge, verifyPledge } from "../lib/pledges.js";
import {
  escapeHtml,
  fillTemplate,
  getPledgeSecret,
  getSiteUrl,
  readThemes,
  themeStatus,
} from "../lib/pledge-pages.js";

const SECRET = "test-secret-with-32-plus-characters!!";

const VALID = {
  who: "Mabel",
  kind: "ram",
  type: "DDR3",
  qty: 8,
  eulogy: "she served 11 years",
  theme: "ramageddon",
};

describe("validatePledge", () => {
  it("accepts a valid pledge", () => {
    const r = validatePledge(VALID);
    assert.equal(r.ok, true);
    assert.deepEqual(r.value, VALID);
  });

  it("fills the default eulogy when missing or blank", () => {
    const { eulogy, ...rest } = VALID;
    assert.equal(
      validatePledge(rest).value.eulogy,
      "she served 11 years in my ThinkPad",
    );
    assert.equal(
      validatePledge({ ...VALID, eulogy: "" }).value.eulogy,
      "she served 11 years in my ThinkPad",
    );
    assert.equal(
      validatePledge({ ...VALID, eulogy: "   " }).value.eulogy,
      "she served 11 years in my ThinkPad",
    );
  });

  it("rejects unknown fields", () => {
    const r = validatePledge({ ...VALID, n: 205 });
    assert.equal(r.ok, false);
    assert.ok(r.errors.some((e) => e.includes("unknown field: n")));
  });

  it("trims who and rejects empty", () => {
    assert.equal(validatePledge({ ...VALID, who: "  Mabel  " }).value.who, "Mabel");
    assert.equal(validatePledge({ ...VALID, who: "   " }).ok, false);
    assert.equal(validatePledge({ ...VALID, who: "x".repeat(25) }).ok, false);
  });

  it("enforces kind/type/qty rules", () => {
    assert.equal(validatePledge({ ...VALID, kind: "tape" }).ok, false);
    assert.equal(validatePledge({ ...VALID, type: "USB-C" }).ok, false);
    assert.equal(validatePledge({ ...VALID, qty: 0 }).ok, false);
    assert.equal(validatePledge({ ...VALID, qty: 513 }).ok, false);
    // qty arrives as a string in GET-style payloads
    assert.equal(validatePledge({ ...VALID, qty: "8" }).value.qty, 8);
    // floppy qty must be an integer within 1-500
    const floppy = { ...VALID, kind: "floppy", type: '3.5" HD', qty: 12 };
    assert.equal(validatePledge(floppy).ok, true);
    assert.equal(validatePledge({ ...floppy, qty: 12.5 }).ok, false);
  });

  it("allows sub-1GB quantities for ram and usb, not floppy", () => {
    assert.equal(validatePledge({ ...VALID, qty: 0.5 }).value.qty, 0.5);
    assert.equal(
      validatePledge({ ...VALID, kind: "usb", type: "USB-A", qty: 0.1 }).value.qty,
      0.1,
    );
    assert.equal(validatePledge({ ...VALID, qty: 0 }).ok, false);
    const floppy = { ...VALID, kind: "floppy", type: '3.5" HD', qty: 12 };
    assert.equal(validatePledge({ ...floppy, qty: 0.5 }).ok, false);
    assert.equal(validatePledge({ ...VALID, qty: 600 }).ok, false);
  });

  it("enforces eulogy and theme shape rules", () => {
    assert.equal(validatePledge({ ...VALID, eulogy: "x".repeat(141) }).ok, false);
    // Membership comes from the JSON registries (see themeStatus) — the
    // validator only checks slug shape, so well-formed unknown slugs pass.
    assert.equal(validatePledge({ ...VALID, theme: "nope" }).ok, true);
    for (const bad of ["", "Nope!", "has space", "a".repeat(65), 123]) {
      assert.equal(validatePledge({ ...VALID, theme: bad }).ok, false);
    }
  });

  it("rejects HTML, JavaScript, and links in who and eulogy", () => {
    assert.equal(validatePledge({ ...VALID, who: "<b>Mabel</b>" }).ok, false);
    assert.equal(validatePledge({ ...VALID, who: "x <img src=x>" }).ok, false);
    assert.equal(
      validatePledge({ ...VALID, eulogy: "<script>alert(1)</script>" }).ok,
      false,
    );
    assert.equal(
      validatePledge({ ...VALID, eulogy: "see javascript:alert(1)" }).ok,
      false,
    );
    assert.equal(
      validatePledge({ ...VALID, eulogy: "see JaVaScRiPt:alert(1)" }).ok,
      false,
    );
    assert.equal(
      validatePledge({ ...VALID, who: "see http://evil.test" }).ok,
      false,
    );
    assert.equal(
      validatePledge({ ...VALID, eulogy: "visit https://evil.test/x" }).ok,
      false,
    );
    assert.equal(
      validatePledge({ ...VALID, who: "Mabel", eulogy: "plain words, 100% & symbols!" }).ok,
      true,
    );
  });

  it("leaves retirement to the mint route; old links still verify", async () => {
    // thisisfine and daftram are deprecated: well-formed, so validation
    // passes — the mint route rejects them via themeStatus while old
    // links keep working.
    assert.equal(validatePledge({ ...VALID, theme: "thisisfine" }).ok, true);
    assert.equal(await themeStatus("thisisfine"), "deprecated");
    assert.equal(validatePledge({ ...VALID, theme: "daftram" }).ok, true);
    assert.equal(await themeStatus("daftram"), "deprecated");
  });
});

describe("pledge JWT", () => {
  it("round-trips through sign and verify", () => {
    const jwt = signPledge(VALID, SECRET);
    assert.deepEqual(verifyPledge(jwt, SECRET), VALID);
  });

  it("rejects tampered and foreign tokens", () => {
    const jwt = signPledge(VALID, SECRET);
    const [h, p, sig] = jwt.split(".");
    assert.equal(verifyPledge(`${h}.${p}.${sig.slice(0, -2)}xx`, SECRET), null);
    assert.equal(verifyPledge(jwt, "a-different-32-plus-char-secret!"), null);
    assert.equal(verifyPledge("not-a-jwt", SECRET), null);
  });

  it("still verifies old links for deprecated themes", () => {
    for (const theme of ["thisisfine", "daftram"]) {
      const old = { ...VALID, theme };
      const jwt = signPledge(old, SECRET);
      assert.deepEqual(verifyPledge(jwt, SECRET), old);
    }
  });
});

describe("fillTemplate", () => {
  const TPL =
    "<title>{{meta_title}}</title><h1>{{who}} pledged {{qty}}{{qty_unit}} {{type}}</h1>" +
    "{{#if_eulogy}}<blockquote>{{eulogy}}</blockquote>{{/if_eulogy}}" +
    "<img src=\"{{meta_image}}\"><link href=\"{{page_url}}\">";

  it("substitutes markers and derived values", () => {
    const out = fillTemplate(TPL, VALID, {
      siteUrl: "https://samneedsram.com",
      jwt: "JWT",
      theme: "ramageddon",
      displayName: "Ramageddon",
    });
    assert.ok(out.includes("<title>Mabel pledged 8GB DDR3 to Sam</title>"));
    assert.ok(out.includes("<blockquote>she served 11 years</blockquote>"));
    assert.ok(
      out.includes(
        "https://samneedsram.com/pledges/art/ramageddon/og.jpg",
      ),
    );
    assert.ok(
      out.includes(
        "https://samneedsram.com/pledges/ramageddon?content=JWT",
      ),
    );
    assert.ok(!out.includes("{{"));
  });

  it("strips the eulogy block when empty and escapes HTML", () => {
    const evil = { ...VALID, who: "<script>alert(1)</script>" };
    delete evil.eulogy;
    const out = fillTemplate(TPL, evil, {
      siteUrl: "https://samneedsram.com",
      jwt: "JWT",
      theme: "ramageddon",
      displayName: "Ramageddon",
    });
    assert.ok(!out.includes("<blockquote>"));
    assert.ok(!out.includes("<script>"));
    assert.ok(out.includes("&lt;script&gt;"));
  });

  it("uses the theme share suffix in meta_title", () => {
    const out = fillTemplate("<title>{{meta_title}}</title>", VALID, {
      siteUrl: "https://samneedsram.com",
      jwt: "JWT",
      theme: "ramfather",
      displayName: "The RAMfather",
      shareSuffix: "to the Family",
    });
    assert.ok(out.includes("<title>Mabel pledged 8GB DDR3 to the Family</title>"));
  });

  it("uses disks as the floppy unit", () => {
    const out = fillTemplate("{{qty}} {{qty_unit}}", {
      ...VALID,
      kind: "floppy",
      type: '3.5" HD',
      qty: 12,
    }, { siteUrl: "https://x.test", jwt: "J", theme: "t", displayName: "T" });
    assert.equal(out, "12 disks");
  });
});

describe("env helpers", () => {
  const saved = { ...process.env };
  beforeEach(() => {
    delete process.env.PLEDGE_JWT_SECRET;
    delete process.env.SITE_URL;
  });
  afterEach(() => {
    process.env = { ...saved };
  });

  it("getPledgeSecret rejects missing/placeholder/short secrets", () => {
    assert.equal(getPledgeSecret(), null);
    process.env.PLEDGE_JWT_SECRET = "change-me-to-32-plus-random-bytes";
    assert.equal(getPledgeSecret(), null);
    process.env.PLEDGE_JWT_SECRET = "short";
    assert.equal(getPledgeSecret(), null);
    process.env.PLEDGE_JWT_SECRET = SECRET;
    assert.equal(getPledgeSecret(), SECRET);
  });

  it("getSiteUrl trims trailing slashes", () => {
    assert.equal(getSiteUrl(), null);
    process.env.SITE_URL = "https://samneedsram.com//";
    assert.equal(getSiteUrl(), "https://samneedsram.com");
  });
});

describe("readThemes", () => {
  it("loads the registry slugs", async () => {
    const map = await readThemes();
    for (const slug of ["classic", "ramageddon", "warhammer40kb", "gondor"]) {
      assert.ok(map[slug]?.display_name, `missing ${slug}`);
    }
  });

  it("resolves display names for deprecated themes", async () => {
    const map = await readThemes();
    assert.equal(map["thisisfine"]?.display_name, "This RAM Is Fine");
    assert.equal(map["daftram"]?.display_name, "Daft RAM");
  });
});
