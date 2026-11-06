import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { injectGlobalHead } from "../lib/site-head.js";

// The cached pledge page carries a stale server-dealt dice link, so a
// global inline snippet re-deals it client-side on every view: fetch the
// active theme list, pick one that isn't the current page, keep the same
// pledge JWT. No-JS and crawlers keep working — the server href stays in
// the HTML as the fallback.
describe("random-theme client reshuffle", () => {
  it("injects the reshuffle snippet before </head>", () => {
    const out = injectGlobalHead(
      "<html><head><title>x</title></head><body></body></html>",
    );
    for (const part of [
      'querySelector("a.random-theme")',
      'fetch("/pledges/themes.json")',
      'location.pathname.split("/")',
      'get("content")',
      "Math.random()",
      '"/pledges/"',
      "encodeURIComponent(q)",
    ]) {
      assert.ok(out.includes(part), `snippet must contain ${part}`);
    }
    assert.ok(
      out.indexOf("a.random-theme") < out.toLowerCase().indexOf("</head>"),
      "snippet lands inside head",
    );
  });
});
