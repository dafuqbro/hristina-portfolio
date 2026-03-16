import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/blog";
import { pageMeta, getBreadcrumbSchema, SITE } from "~/lib/seo";
import { getPublishedPosts, getPublishedPostsByCategory, getCategories } from "~/lib/db";

export function meta() {
  return [
    ...pageMeta({
      title: "Blog | Hristina Yordanova — Crypto Editorial & SEO Insights",
      description: "Insights on crypto editorial strategy, AI-assisted workflows, on-chain data analysis, and SEO for blockchain content from a senior crypto editor.",
      path: "/blog",
    }),
    { "script:ld+json": getBreadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "Blog", url: `${SITE.url}/blog` }]) },
  ];
}

export function headers() {
  return { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" };
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = (context as any).cloudflare.env;
  const url = new URL(request.url);
  const categorySlug = url.searchParams.get("category");

  const [posts, categories] = await Promise.all([
    categorySlug ? getPublishedPostsByCategory(env.DB, categorySlug) : getPublishedPosts(env.DB),
    getCategories(env.DB),
  ]);

  return { posts, categories, activeCategory: categorySlug };
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts, categories, activeCategory } = loaderData;

  return (
    <section className="container-editorial py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">Blog</p>
        <h1 className="mt-4">Editorial Insights</h1>
        <p className="mt-4 text-dark-text-muted">
          Practical advice on crypto journalism, AI-powered editorial workflows, on-chain data tools, and SEO strategy.
        </p>
      </div>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <Link
            to="/blog"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !activeCategory
                ? "bg-teal text-white"
                : "bg-dark-surface-alt text-dark-text-muted hover:text-dark-text"
            }`}
          >
            All
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.slug}
              to={`/blog?category=${cat.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.slug
                  ? "bg-teal text-white"
                  : "bg-dark-surface-alt text-dark-text-muted hover:text-dark-text"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Posts grid */}
      {posts.length > 0 ? (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {posts.map((post: any) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="card-lift group overflow-hidden rounded-xl border border-dark-border bg-dark-surface"
            >
              {post.featured_image && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-dark-text-muted">
                  {post.category_name && (
                    <span className="rounded-full bg-teal/10 px-2.5 py-1 font-semibold text-teal">
                      {post.category_name}
                    </span>
                  )}
                  <span>{post.read_time} read</span>
                </div>
                <h2 className="mt-3 font-heading text-xl font-semibold leading-snug transition-colors group-hover:text-teal-light">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-[0.935rem] leading-relaxed text-dark-text-muted">
                    {post.excerpt}
                  </p>
                )}
                {post.published_at && (
                  <time dateTime={post.published_at} className="mt-3 block text-xs text-dark-text-muted">
                    {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-dark-text-muted">
            {activeCategory ? "No posts in this category yet." : "No posts published yet. Check back soon!"}
          </p>
        </div>
      )}
    </section>
  );
}
