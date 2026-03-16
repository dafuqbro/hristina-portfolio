import { Link } from "react-router";
import { pageMeta, getPersonSchema, getWebSiteSchema, getBreadcrumbSchema, SITE, PUBLICATIONS, SKILLS } from "~/lib/seo";

export function meta() {
  return [
    ...pageMeta({
      title: "Hristina Yordanova | Crypto Expert, Editor & Writer",
      description:
        "Senior crypto editor and content strategist with 7+ years at Cointelegraph, CoinMarketCap, DappRadar & Cryptonews. AI-powered editorial workflows, on-chain analysis, and SEO-driven content strategy.",
    }),
    { "script:ld+json": getPersonSchema() },
    { "script:ld+json": getWebSiteSchema() },
    { "script:ld+json": getBreadcrumbSchema([{ name: "Home", url: SITE.url }]) },
  ];
}

export function headers() {
  return { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" };
}

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-grid">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo/8 blur-3xl" />

        <div className="container-editorial relative py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="opacity-0 animate-fade-up">
              <p className="font-body text-sm font-semibold uppercase tracking-widest text-teal-light">
                Crypto Expert &amp; Senior Editor
              </p>
              <h1 className="mt-4">
                Shaping crypto media
                <br />
                <span className="gradient-text">with clarity &amp; depth</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-dark-text-muted">
                7+ years of editorial leadership at the world&apos;s top crypto
                publications. I combine AI-assisted workflows, on-chain data
                analysis, and SEO expertise to produce content that informs,
                engages, and ranks.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/work" className="inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-dark">
                  View My Work
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border-2 border-dark-border px-6 py-3 text-sm font-semibold transition-all hover:border-teal hover:text-teal">
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="flex justify-center opacity-0 animate-fade-up animation-delay-200">
              <div className="relative">
                <div className="h-80 w-80 overflow-hidden rounded-2xl shadow-lg lg:h-96 lg:w-96">
                  <img
                    src="/headshot.jpg"
                    alt="Hristina Yordanova — crypto editor and content strategist"
                    className="h-full w-full object-cover"
                    width="800"
                    height="800"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 -z-10 h-80 w-80 rounded-2xl border-2 border-teal/20 lg:h-96 lg:w-96" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Publication Logos ─── */}
      <section className="border-y border-dark-border bg-dark-surface">
        <div className="container-editorial py-8">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-dark-text-muted">
            Published &amp; edited at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {[
              { name: "Cointelegraph", url: "https://cointelegraph.com", logo: "/logos/cointelegraph.svg" },
              { name: "CoinMarketCap", url: "https://coinmarketcap.com", logo: "/logos/coinmarketcap.svg" },
              { name: "DappRadar", url: "https://dappradar.com", logo: "/logos/dappradar.svg" },
              { name: "Cryptonews", url: "https://cryptonews.com", logo: "/logos/cryptonews.svg" },
            ].map((pub) => (
              <a
                key={pub.name}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-text-muted opacity-60 transition-all hover:opacity-100"
                aria-label={pub.name}
              >
                <img
                  src={pub.logo}
                  alt={pub.name}
                  className="h-7 w-auto md:h-8"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What I Do ─── */}
      <section className="container-editorial py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2>
            A crypto editor who
            <br />
            <span className="gradient-text">understands the tech</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-dark-text-muted">
            I don&apos;t just write about crypto — I analyze on-chain data, build
            AI-powered editorial workflows, and lead distributed teams producing
            hundreds of articles per month.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "✍️", title: "Editorial Leadership", desc: "Managing Editor at Cryptonews overseeing a distributed team of 15+ writers and editors across news, analysis, and educational content." },
            { icon: "🤖", title: "AI-Assisted Workflows", desc: "Building n8n automations and prompt engineering pipelines that scaled editorial output 2.5× without additional headcount." },
            { icon: "📊", title: "On-Chain Data Analysis", desc: "Leveraging Dune Analytics, Nansen, and CoinGecko APIs to create data-driven content and custom research dashboards." },
            { icon: "🔍", title: "SEO Content Strategy", desc: "Google Discover optimization, E-E-A-T compliance for YMYL crypto content, and keyword-driven calendars that drive organic growth." },
            { icon: "🌐", title: "Web3 Native", desc: "Deep hands-on understanding of DeFi protocols, NFTs, DAOs, Layer 2s, and blockchain architecture — not just covering the space, living in it." },
            { icon: "📈", title: "Content That Ranks", desc: "Proven track record of SEO-optimized articles reaching Google Discover and ranking for highly competitive crypto keywords." },
          ].map((item) => (
            <div key={item.title} className="card-lift rounded-xl border border-dark-border bg-dark-surface p-6">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-4 font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-[0.935rem] leading-relaxed text-dark-text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Skills Marquee ─── */}
      <section className="overflow-hidden border-y border-dark-border bg-dark-surface-alt py-4">
        <div className="flex animate-[scroll_25s_linear_infinite] gap-8 whitespace-nowrap">
          {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
            <span key={`${skill}-${i}`} className="text-sm font-medium text-dark-text-muted">
              {skill}
              <span className="ml-8 text-teal/40">◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="container-editorial py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2>Let&apos;s work together</h2>
          <p className="mt-4 text-lg text-dark-text-muted">
            Looking for a crypto editor, content strategist, or writer who combines editorial expertise with technical depth?
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-teal-dark">
            Get in Touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
