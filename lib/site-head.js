// Global <head> tags, injected by routes at serve time so static HTML files
// stay clean. Add site-wide tags here (analytics, verification, fonts).
export const UMAMI_SCRIPT_SRC = "https://cloud.umami.is/script.js";
export const UMAMI_WEBSITE_ID = "f7140703-9fd6-4ab9-a38e-e18fc3576369";

export const GLOBAL_HEAD_TAGS = [
  `<script defer src="${UMAMI_SCRIPT_SRC}" data-website-id="${UMAMI_WEBSITE_ID}"></script>`,
  `<script>(function(){function deal(){var a=document.querySelector("a.random-theme");if(!a)return;fetch("/pledges/themes.json").then(function(r){return r.json();}).then(function(d){var here=location.pathname.split("/")[2];var slugs=(d.themes||[]).map(function(t){return t.slug;}).filter(function(s){return s&&s!==here;});var q=new URLSearchParams(location.search).get("content");if(!slugs.length||!q)return;var pick=slugs[(Math.random()*slugs.length)|0];a.href="/pledges/"+pick+"?content="+encodeURIComponent(q);}).catch(function(){});}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",deal);}else{deal();}})();</script>`,
].join("\n");

// Insert global tags just before </head>. Case-insensitive; if no head
// close tag exists, returns the HTML unchanged.
export function injectGlobalHead(html) {
  if (!GLOBAL_HEAD_TAGS) return html;
  return html.replace(/<\/head>/i, (m) => `${GLOBAL_HEAD_TAGS}\n${m}`);
}
