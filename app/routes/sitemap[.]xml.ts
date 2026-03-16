import type { Route } from "./+types/sitemap[.]xml";

const SITE_URL = "https://hristinayordanova.com";

const STATIC_ROUTES = [
  { path: "", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/crypto-editor", changefreq: "monthly", priority: "0.9" },
  { path: "/crypto-writer", changefreq: "monthly", priority: "0.9" },
  { path: "/blog", changefreq: "daily", priority: "0.9" },
  { path: "/work", changefreq: "monthly", priority: "0.7" },
  { path: "/work/cryptonews-ai-editorial-workflows", changefreq: "monthly", priority: "0.6" },
  { path: "/work/google-discover-optimization", changefreq: "monthly", priority: "0.6" },
  { path: "/work/dappradar-data-content-strategy", changefreq: "monthly", priority: "0.6" },
  { path: "/work/crypto-web-projects", changefreq: "monthly", priority: "0.6" },
  { path: "/clips", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
];

function toDateString(dateStr: string | null): string {
  if (!dateStr) return new Date().toISOString().split("T")[0];
  // Handle both "2026-03-16T14:30:00" and "2026-03-16 14:30:00" formats
  return dateStr.replace(" ", "T").split("T")[0];
}

export async function loader({ context }: Route.LoaderArgs) {
  const env = (context as any).cloudflare.env;

  let blogPosts: Array<{ slug: string; updated_at: string; published_at: string | null }> = [];
  try {
    const { results } = await env.DB.prepare(
      "SELECT slug, updated_at, published_at FROM posts WHERE status = 'published' ORDER BY published_at DESC"
    ).all();
    blogPosts = results as any[];
  } catch {
    // D1 not ready — static-only sitemap
  }

  const today = new Date().toISOString().split("T")[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_ROUTES.map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  ).join("\n")}
${blogPosts.map(
    (post) => `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${toDateString(post.updated_at || post.published_at)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join("\n")}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
