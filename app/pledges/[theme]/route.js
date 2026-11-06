import { PLEDGE_TEMPLATES } from "@/lib/pages.generated";
import { verifyPledge } from "@/lib/pledges";
import {
  fillTemplate,
  getPledgeSecret,
  getSiteUrl,
  pickRandomThemeSlug,
  readActiveThemeSlugs,
  readThemes,
} from "@/lib/pledge-pages";

// GET /pledges/<theme>?content=<jwt> — verify, fill markers, serve HTML.
export async function GET(request, { params }) {
  const { theme } = await params;
  const template = PLEDGE_TEMPLATES[theme];
  if (!template) {
    return new Response("Unknown theme", { status: 404 });
  }

  const secret = getPledgeSecret();
  if (!secret) {
    return new Response("Server misconfigured: set PLEDGE_JWT_SECRET", {
      status: 500,
    });
  }
  const siteUrl = getSiteUrl();
  if (!siteUrl) {
    return new Response("Server misconfigured: set SITE_URL", { status: 500 });
  }

  const jwt = new URL(request.url).searchParams.get("content");
  if (!jwt) {
    return new Response("Missing pledge link", { status: 400 });
  }
  const payload = verifyPledge(jwt, secret);
  if (!payload) {
    return new Response("Invalid pledge link", { status: 400 });
  }

  const themes = await readThemes();
  const activeSlugs = await readActiveThemeSlugs();
  const displayName = themes[theme]?.display_name ?? theme;
  const html = fillTemplate(template, payload, {
    siteUrl,
    jwt,
    theme,
    displayName,
    randomTheme: pickRandomThemeSlug(activeSlugs, theme),
  });
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
