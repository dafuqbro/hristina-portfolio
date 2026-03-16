import { pageMeta, getPersonSchema, getBreadcrumbSchema, SITE } from "~/lib/seo";

export function meta() {
  return [
    ...pageMeta({
      title: "About Hristina Yordanova | Senior Crypto Editor & Content Strategist",
      description: "7+ years of editorial leadership in crypto media. Managing Editor at Cryptonews, former Cointelegraph, CoinMarketCap & DappRadar. MA Journalism, Edinburgh Napier University.",
      path: "/about",
    }),
    { "script:ld+json": getPersonSchema() },
    { "script:ld+json": getBreadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "About", url: `${SITE.url}/about` }]) },
  ];
}

export function headers() {
  return { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" };
}

const TIMELINE = [
  {
    period: "2023 – Present",
    role: "Managing Editor",
    company: "Cryptonews",
    desc: "Leading a distributed editorial team of 15+ writers and editors. Implemented AI-assisted editorial workflows using n8n automation and prompt engineering, achieving a 2.5× increase in content output. Driving Google Discover performance, managing daily content operations across breaking news, market analysis, educational guides, and branded content.",
  },
  {
    period: "2021 – 2023",
    role: "Senior Editor",
    company: "Cointelegraph",
    desc: "Edited long-form market analysis, breaking news, and feature content for one of the world's largest crypto publications. Ensured E-E-A-T compliance and editorial quality across a high-volume newsroom. Worked closely with data teams on on-chain analytics-driven stories.",
  },
  {
    period: "2020 – 2021",
    role: "Content Lead",
    company: "DappRadar",
    desc: "Built the editorial content strategy from scratch. Produced data-driven ecosystem reports, dApp rankings, and on-chain analytics deep-dives using Dune Analytics. Established DappRadar's voice as a trusted research and data authority in the dApp space.",
  },
  {
    period: "2019 – 2020",
    role: "Editor",
    company: "CoinMarketCap",
    desc: "Created educational and editorial content for the world's most-visited crypto data platform. Focused on making complex blockchain and tokenomics concepts accessible to a global mainstream audience while maintaining technical accuracy.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero — image + intro side by side */}
      <section className="container-editorial py-16 md:py-24">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14">
          {/* Image — constrained size */}
          <div className="w-48 flex-shrink-0 opacity-0 animate-fade-up md:w-56">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/headshot.jpg"
                alt="Hristina Yordanova — crypto editor and content strategist"
                className="h-auto w-full"
                width="800"
                height="800"
                loading="eager"
              />
            </div>
          </div>

          {/* Text */}
          <div className="opacity-0 animate-fade-up animation-delay-100">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">About Me</p>
            <h1 className="mt-4">
              Crypto editor,<br />content strategist,<br />
              <span className="gradient-text">data-driven storyteller</span>
            </h1>
            <div className="mt-6 max-w-xl space-y-4 text-dark-text-muted">
              <p>
                I&apos;m Hristina Yordanova — a senior crypto editor and content strategist with over seven years of experience shaping editorial operations at publications like Cointelegraph, CoinMarketCap, DappRadar, and Cryptonews.
              </p>
              <p>
                My work sits at the intersection of editorial excellence and technical innovation. I build AI-assisted workflows using n8n and prompt engineering that multiply team output without sacrificing quality. I use on-chain data from Dune Analytics and Nansen to inform content decisions, and I create SEO strategies that consistently reach Google Discover and rank for competitive crypto keywords.
              </p>
              <p>
                Before moving into crypto media full-time, I earned an MA in Journalism from Edinburgh Napier University. I&apos;m fluent in English and Bulgarian and have managed editorial teams distributed across multiple time zones.
              </p>
              <p>
                Beyond my editorial career, I run several crypto web projects including CryptoStories.xyz and BlokChainFeed, where I experiment with AI-powered content tools, WordPress automation, and creative editorial formats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="border-y border-dark-border bg-dark-surface-alt">
        <div className="container-editorial py-20 md:py-28">
          <h2 className="text-center">Career Timeline</h2>
          <div className="mt-16 space-y-0">
            {TIMELINE.map((item) => (
              <div key={item.company} className="relative grid gap-4 border-l-2 border-dark-border py-8 pl-8 md:grid-cols-[200px,1fr]">
                <div className="absolute -left-[9px] top-8 h-4 w-4 rounded-full border-2 border-teal bg-dark-bg" />
                <div>
                  <span className="text-sm font-semibold text-teal-light">{item.period}</span>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold">{item.role}</h3>
                  <p className="mt-1 font-semibold text-dark-text-muted">{item.company}</p>
                  <p className="mt-3 text-[0.935rem] leading-relaxed text-dark-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Expertise */}
      <section className="container-editorial py-20 md:py-28">
        <h2 className="text-center">Core Expertise</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Editorial Leadership", "Managing distributed teams of 15+ across news, analysis, branded content, and educational material at scale"],
            ["AI-Assisted Workflows", "n8n automation pipelines, prompt engineering for editorial QA, LLM-powered content tools and research assistants"],
            ["On-Chain Data Analysis", "Dune Analytics, Nansen, CoinGecko Pro API — building dashboards and using on-chain data to inform editorial decisions"],
            ["SEO Content Strategy", "Google Discover optimization, E-E-A-T for YMYL crypto content, keyword clustering, and data-driven editorial calendars"],
            ["Crypto & Blockchain", "DeFi, NFTs, DAOs, tokenomics, Layer 2 scaling, market analysis, regulation tracking, and Web3 ecosystem coverage"],
            ["Multilingual", "Fluent in English and Bulgarian. MA in Journalism from Edinburgh Napier University. International editorial experience"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-xl border border-dark-border p-5">
              <h3 className="font-heading text-base font-semibold">{title}</h3>
              <p className="mt-2 text-[0.935rem] leading-relaxed text-dark-text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
