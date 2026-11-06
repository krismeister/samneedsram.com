import { HOMEPAGE_HTML } from "@/lib/pages.generated";
import { injectGlobalHead } from "@/lib/site-head";

// Backend-rendered homepage: serves the adapted comp as static HTML.
// The pledge form hydrates client-side (themes dropdown, mint submit).
export async function GET() {
  return new Response(injectGlobalHead(HOMEPAGE_HTML), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
