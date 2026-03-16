import { Link } from "react-router";
import type { Route } from "./+types/blog-post";
import { pageMeta, getArticleSchema, getBreadcrumbSchema, SITE } from "~/lib/seo";
import { getPostBySlug } from "~/lib/db";

export async function loader({ params, context }: Route.LoaderArgs) {
  const env = (context as any).cloudflare.env;
  const post = await getPostBySlug(env.DB, params.slug);

  if (!post || post.status !== "published") {
    throw new Response("Not Found", { status: 404 });
  }

  // Calculate word count for schema
  const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;

  return { post, wordCount };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) return [{ title: "Post Not Found" }];
  const { post, wordCount } = data;
  const postUrl = `${SITE.url}/blog/${post.slug}`;
  const postImage = post.featured_image || undefined;

  return [
    ...pageMeta({
      title: `${post.title} | Hristina Yordanova`,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      image: postImage,
      type: "article",
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
    }),
    {
      "script:ld+json": getArticleSchema({
        title: post.title,
        description: post.excerpt,
        url: postUrl,
        datePublished: post.published_at || post.created_at,
        dateModified: post.updated_at,
        image: postImage,
        category: post.category_name || undefined,
        wordCount,
      }),
    },
    {
      "script:ld+json": getBreadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Blog", url: `${SITE.url}/blog` },
        ...(post.category_name ? [{ name: post.category_name, url: `${SITE.url}/blog?category=${post.category_slug}` }] : []),
        { name: post.title, url: postUrl },
      ]),
    },
  ];
}

export function headers() {
  return { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" };
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  return (
    <article className="container-narrow py-20 md:py-28">
      {/* Breadcrumb — visible to users and matches schema */}
      <nav className="mb-8 text-sm text-dark-text-muted" aria-label="Breadcrumb">
        <Link to="/" className="link-underline hover:text-teal-light">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="link-underline hover:text-teal-light">Blog</Link>
        {post.category_name && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/blog?category=${post.category_slug}`} className="link-underline hover:text-teal-light">{post.category_name}</Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-dark-text">{post.title}</span>
      </nav>

      {/* Header */}
      <header>
        <div className="flex flex-wrap items-center gap-3 text-sm text-dark-text-muted">
          {post.category_name && (
            <Link
              to={`/blog?category=${post.category_slug}`}
              className="rounded-full bg-teal/10 px-3 py-1 font-semibold text-teal-light hover:bg-teal-light/20 bg-teal-light/10"
            >
              {post.category_name}
            </Link>
          )}
          <span>{post.read_time} read</span>
          {post.published_at && (
            <>
              <span>·</span>
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
            </>
          )}
        </div>
        <h1 className="mt-6">{post.title}</h1>
        {post.excerpt && (
          <p className="mt-4 text-lg text-dark-text-muted">{post.excerpt}</p>
        )}

        {/* Author byline below title */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
            <img src="/headshot.jpg" alt={post.author_name} className="h-full w-full object-cover" loading="eager" width="40" height="40" />
          </div>
          <div>
            <Link to="/about" className="text-sm font-semibold hover:text-teal-light">{post.author_name}</Link>
            <p className="text-xs text-dark-text-muted">{post.author_title}</p>
          </div>
        </div>
      </header>

      {/* Featured image */}
      {post.featured_image && (
        <figure className="mt-8 overflow-hidden rounded-xl">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full object-cover"
            loading="eager"
          />
        </figure>
      )}

      {/* Content */}
      <div
        className="prose-editorial mt-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Full author box */}
      <aside className="mt-16 rounded-xl border border-dark-border bg-dark-surface-alt p-6" aria-label="About the author">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
            <img src="/headshot.jpg" alt={post.author_name} className="h-full w-full object-cover" loading="lazy" width="64" height="64" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-dark-text-muted">Written by</p>
            <Link to="/about" className="font-heading text-lg font-semibold hover:text-teal-light">
              {post.author_name}
            </Link>
            <p className="text-sm text-dark-text-muted">{post.author_title}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-dark-text-muted">
          Senior crypto editor with 7+ years of editorial leadership at Cointelegraph, CoinMarketCap, DappRadar &amp; Cryptonews.
          Specializing in AI-assisted editorial workflows, on-chain data analysis, and SEO-driven content strategy.
          Holds an MA in Journalism from Edinburgh Napier University.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a href="https://www.linkedin.com/in/hristinayordanova/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-teal-dark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://x.com/HYordanova_" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-teal-dark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            X / Twitter
          </a>
          <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-teal-dark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Contact
          </Link>
        </div>
      </aside>
    </article>
  );
}
