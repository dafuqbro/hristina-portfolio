import { pageMeta, getBreadcrumbSchema, SITE } from "~/lib/seo";
import { useState } from "react";

const CLIPS = [
  // Cryptonews
  {
    title: "[LIVE] Bitcoin Price Inches Closer to New ATH, Can BTC Hit $125K Today? Live News and Updates",
    outlet: "Cryptonews",
    url: "https://cryptonews.com/news/live-bitcoin-price-to-hit-125k-today-news-updates-11-august-2025/",
    category: "Live Blog",
    date: "2025-08",
    role: "Author",
  },
  {
    title: "Bitcoin, Gold, or Stocks: Which Holds Up and Rebounds Best in Market Crashes?",
    outlet: "Cryptonews",
    url: "https://cryptonews.com/reports/bitcoin-gold-or-stocks-which-holds-up-best-in-market-crashes/",
    category: "Research",
    date: "2025-10",
    role: "Editor",
  },
  {
    title: "Tangem Black Friday Promo — Mega Black Friday Offer",
    outlet: "Cryptonews",
    url: "https://advertorial.cryptonews.com/press-releases/mega-black-friday-offer-tangem-offers-30-cold-wallet-discount/",
    category: "PR",
    date: "2025-09",
    role: "Editor",
  },

  // Cointelegraph
  {
    title: "Idris Elba on His Stellar Journey to Unlocking Human Potential — Interview",
    outlet: "Cointelegraph",
    url: "https://cointelegraph.com/news/idris-elba-on-his-stellar-journey-to-unlocking-human-potential-interview",
    category: "Interview",
    date: "2023-11",
    role: "Author",
  },
  {
    title: "This Web3 Security Tool Protects Users Against Phishing and Drainers in Real-Time",
    outlet: "Cointelegraph",
    url: "https://cointelegraph.com/sponsored/this-web3-security-tool-protects-users-against-phishing-and-drainers-in-real-time",
    category: "Product Review",
    date: "2024-01",
    role: "Author",
  },

  // DappRadar
  {
    title: "Axie Infinity Land NFTs Attract New Investments",
    outlet: "DappRadar",
    url: "https://dappradar.com/blog/axie-infinity-land-nfts-attract-new-investments",
    category: "Analysis",
    date: "2022-06",
    role: "Author",
  },
  {
    title: "The Ultimate Guide to Loot NFTs",
    outlet: "DappRadar",
    url: "https://dappradar.com/blog/the-ultimate-guide-to-loot-nfts",
    category: "Guide",
    date: "2022-09",
    role: "Author",
  },
];

const OUTLETS = ["All", ...Array.from(new Set(CLIPS.map((c) => c.outlet)))];
const CATEGORIES = ["All", ...Array.from(new Set(CLIPS.map((c) => c.category)))];

export function meta() {
  return [
    ...pageMeta({
      title: "Published Clips | Hristina Yordanova — Crypto Writing Portfolio",
      description: "Published work at Cointelegraph, CoinMarketCap, DappRadar & Cryptonews. Interviews, live blogs, research reports, guides, and product reviews.",
      path: "/clips",
    }),
    { "script:ld+json": getBreadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "Clips", url: `${SITE.url}/clips` }]) },
  ];
}

export default function Clips() {
  const [outlet, setOutlet] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = CLIPS.filter(
    (c) => (outlet === "All" || c.outlet === outlet) && (category === "All" || c.category === category)
  );

  return (
    <section className="container-editorial py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">Published Work</p>
        <h1 className="mt-4">Clips &amp; Bylines</h1>
        <p className="mt-4 text-dark-text-muted">
          A selection of articles I&apos;ve written and edited across leading crypto publications — from live market blogs and original research to celebrity interviews and product reviews.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <div className="flex flex-wrap gap-2">
          {OUTLETS.map((o) => (
            <button key={o} onClick={() => setOutlet(o)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${outlet === o ? "bg-teal text-white" : "bg-dark-surface-alt text-dark-text-muted hover:text-dark-text"}`}>
              {o}
            </button>
          ))}
        </div>
        <span className="hidden text-dark-text-muted sm:inline">·</span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${category === c ? "bg-indigo text-white" : "bg-dark-surface-alt text-dark-text-muted hover:text-dark-text"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Clips list */}
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {filtered.map((clip, i) => (
          <a key={i} href={clip.url} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); window.open(clip.url, '_blank'); }} className="card-lift group flex items-start justify-between rounded-xl border border-dark-border bg-dark-surface p-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-dark-text-muted">
                <span className="font-semibold text-teal-light">{clip.outlet}</span>
                <span>·</span>
                <span>{clip.category}</span>
                <span>·</span>
                <span>{clip.role}</span>
              </div>
              <h3 className="mt-2 font-heading text-lg font-semibold leading-snug transition-colors group-hover:text-teal-light">{clip.title}</h3>
              <time className="mt-2 block text-xs text-dark-text-muted">
                {new Date(clip.date + "-01").toLocaleDateString("en-US", { year: "numeric", month: "long" })}
              </time>
            </div>
            <svg className="ml-4 mt-1 flex-shrink-0 text-dark-text-muted transition-colors group-hover:text-teal" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-dark-text-muted">No clips match the current filters.</p>
      )}

      {/* Note about more work */}
      <div className="mt-16 mx-auto max-w-xl text-center">
        <p className="text-sm text-dark-text-muted">
          This is a curated selection. My editorial work spans hundreds of articles across these publications in roles ranging from author to managing editor. For a full overview of my editorial career, visit the <a href="/about" className="font-medium text-teal hover:text-teal-dark">About page</a>.
        </p>
      </div>
    </section>
  );
}
