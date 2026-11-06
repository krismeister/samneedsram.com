// Global <head> tags, injected by routes at serve time so static HTML files
// stay clean. Add site-wide tags here (analytics, verification, fonts).
export const UMAMI_SCRIPT_SRC = "https://cloud.umami.is/script.js";
export const UMAMI_WEBSITE_ID = "f7140703-9fd6-4ab9-a38e-e18fc3576369";

export const GLOBAL_HEAD_TAGS = [
  `<script defer src="${UMAMI_SCRIPT_SRC}" data-website-id="${UMAMI_WEBSITE_ID}"></script>`,
].join("\n");

// Insert global tags just before </head>. Case-insensitive; if no head
// close tag exists, returns the HTML unchanged.
export function injectGlobalHead(html) {
  if (!GLOBAL_HEAD_TAGS) return html;
  return html.replace(/<\/head>/i, (m) => `${GLOBAL_HEAD_TAGS}\n${m}`);
}
