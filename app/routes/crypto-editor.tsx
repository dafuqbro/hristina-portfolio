import { Link } from "react-router";
import { pageMeta, getBreadcrumbSchema, SITE } from "~/lib/seo";

export function meta() {
  return [
    ...pageMeta({
      title: "Crypto Editor | Hristina Yordanova — Senior Crypto Editor for Hire",
      description:
        "Experienced crypto editor with 7+ years at Cointelegraph, CoinMarketCap & Cryptonews. Hire a crypto editor who understands on-chain data, SEO, and AI-assisted editorial workflows.",
      path: "/crypto-editor",
    }),
    {
      "script:ld+json": getBreadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Crypto Editor", url: `${SITE.url}/crypto-editor` },
      ]),
    },
  ];
}

export function headers() {
  return {
    "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
  };
}

export default function CryptoEditor() {
  return (
    <article className="container-narrow py-20 md:py-28">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">
        Crypto Editor
      </p>
      <h1 className="mt-4">
        A crypto editor who delivers
        <br />
        <span className="gradient-text">accuracy, speed &amp; rankings</span>
      </h1>

      <div className="mt-10 space-y-6 text-dark-text-muted">
        <p className="text-lg leading-relaxed">
          Looking for a crypto editor who can transform raw copy into polished,
          SEO-optimized content that ranks? With over seven years of hands-on
          editorial experience at publications like Cointelegraph, CoinMarketCap,
          DappRadar, and Cryptonews, I bring a rare combination of deep crypto
          knowledge and editorial precision.
        </p>

        <h2>What Sets Me Apart as a Crypto Editor</h2>
        <p>
          Most editors can fix grammar. A great crypto editor understands the
          difference between a Layer 2 rollup and a sidechain, can verify
          on-chain data claims using Dune Analytics, and knows how to structure
          content for both Google Discover and expert readers.
        </p>
        <p>
          I&apos;ve managed editorial teams of 15+ writers, implemented
          AI-assisted quality workflows using n8n automation, and maintained
          editorial standards across hundreds of articles per month — all while
          keeping content accessible, accurate, and optimized.
        </p>

        <h2>Crypto Editing Services</h2>
        <p>
          Whether you need a Managing Editor for your crypto publication, a
          freelance crypto editor for a specific project, or editorial consulting
          to improve your content operations, I can help with:
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>Editorial review and fact-checking of crypto content</li>
          <li>SEO optimization and E-E-A-T compliance</li>
          <li>Content strategy and editorial calendar development</li>
          <li>Team management and editorial workflow design</li>
          <li>AI-powered editorial workflow implementation</li>
          <li>On-chain data verification and analysis</li>
        </ul>

        <h2>Publications I&apos;ve Edited For</h2>
        <p>
          My editorial work has appeared across the crypto industry&apos;s
          most-read publications: Cointelegraph (800M+ annual pageviews),
          CoinMarketCap (the world&apos;s #1 crypto data platform),
          DappRadar (leading dApp analytics), and Cryptonews (top crypto
          news outlet).
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-teal"
        >
          See My Editorial Work
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-dark-border px-6 py-3 text-sm font-semibold transition-all hover:border-teal hover:text-teal"
        >
          Hire Me as Your Crypto Editor
        </Link>
      </div>
    </article>
  );
}
