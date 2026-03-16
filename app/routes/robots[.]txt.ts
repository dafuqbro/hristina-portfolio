export function loader() {
  const robotsTxt = `# hristinayordanova.com
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/
Disallow: /images/blog/

# Sitemaps
Sitemap: https://hristinayordanova.com/sitemap.xml

# Crawl-delay (optional, respected by some bots)
Crawl-delay: 1
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}
