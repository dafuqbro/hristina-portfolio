import { Link } from "react-router";
import { pageMeta, getBreadcrumbSchema, SITE } from "~/lib/seo";

export function meta() {
  return [
    ...pageMeta({
      title: "Crypto Writer | Hristina Yordanova — Expert Crypto Writer for Hire",
      description:
        "Expert crypto writer with 7+ years covering DeFi, NFTs, market analysis & blockchain technology. Published at Cointelegraph, CoinMarketCap, DappRadar & Cryptonews.",
      path: "/crypto-writer",
    }),
    {
      "script:ld+json": getBreadcrumbSchema([
        { name: "Home", url: SITE.url },
        { name: "Crypto Writer", url: `${SITE.url}/crypto-writer` },
      ]),
    },
  ];
}

export function headers() {
  return {
    "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
  };
}

export default function CryptoWriter() {
  return (
    <article className="container-narrow py-20 md:py-28">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">
        Crypto Writer
      </p>
      <h1 className="mt-4">
        Crypto writing that&apos;s
        <br />
        <span className="gradient-text">accurate, engaging &amp; optimized</span>
      </h1>

      <div className="mt-10 space-y-6 text-dark-text-muted">
        <p className="text-lg leading-relaxed">
          Need a crypto writer who can explain complex blockchain concepts
          without dumbing them down? I&apos;ve spent over seven years writing
          and editing crypto content for the industry&apos;s most trusted
          publications — from breaking news and market analysis to long-form
          guides and data-driven research.
        </p>

        <h2>Why Hire Me as Your Crypto Writer</h2>
        <p>
          The crypto space moves fast, and readers are savvy. Generic content
          doesn&apos;t cut it. As a crypto writer, I bring firsthand experience
          with on-chain data tools like Dune Analytics and Nansen, deep
          understanding of DeFi protocols, tokenomics, and Layer 2 ecosystems,
          and a proven ability to turn complex technical topics into content that
          both experts and newcomers appreciate.
        </p>
        <p>
          My writing is grounded in data, verified on-chain, and structured
          for SEO performance — because great crypto content should be
          discoverable, not just well-written.
        </p>

        <h2>What I Write About</h2>
        <ul className="ml-6 list-disc space-y-2">
          <li>Market analysis and price commentary backed by on-chain data</li>
          <li>DeFi protocol deep-dives and ecosystem reports</li>
          <li>Blockchain technology explainers and educational guides</li>
          <li>NFT and Web3 culture coverage</li>
          <li>Crypto regulation and policy analysis</li>
          <li>AI and crypto intersection — editorial automation, LLMs in trading</li>
          <li>SEO-optimized evergreen guides and glossary content</li>
        </ul>

        <h2>Content Formats</h2>
        <p>
          I adapt to whatever format your audience needs: breaking news articles,
          long-form investigative pieces, weekly market newsletters, social media
          threads, whitepapers, landing page copy, and educational course
          material. Every piece is fact-checked, SEO-optimized, and delivered
          on deadline.
        </p>

        <h2>Where My Writing Has Appeared</h2>
        <p>
          My bylines and editorial work span Cointelegraph, CoinMarketCap,
          DappRadar, and Cryptonews — publications that collectively reach
          hundreds of millions of crypto-curious readers annually. I&apos;ve
          also built content strategies for CryptoStories.xyz, my own crypto
          news publication.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          to="/clips"
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-teal"
        >
          Read My Published Work
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-dark-border px-6 py-3 text-sm font-semibold transition-all hover:border-teal hover:text-teal"
        >
          Commission a Crypto Article
        </Link>
      </div>
    </article>
  );
}
