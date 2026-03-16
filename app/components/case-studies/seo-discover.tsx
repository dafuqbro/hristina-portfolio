import { useState } from "react";

const PHASES = [
  {
    phase: "Phase 1",
    title: "Foundation",
    days: "Days 1–30",
    color: "bg-indigo",
    items: [
      { task: "Technical SEO audit — Core Web Vitals, crawlability, structured data", status: "critical" },
      { task: "Implement Article + Person + BreadcrumbList JSON-LD on all pages", status: "critical" },
      { task: "Create comprehensive author bios with verifiable credentials", status: "critical" },
      { task: "Set up Google Search Console and submit XML sitemap", status: "critical" },
      { task: "Establish image standards: 1200px+ width, 16:9, custom graphics", status: "important" },
      { task: "Write Editorial Policy and About pages (E-E-A-T signals)", status: "important" },
      { task: "Configure Cloudflare caching for sub-50ms TTFB globally", status: "important" },
    ],
  },
  {
    phase: "Phase 2",
    title: "Content Engine",
    days: "Days 31–60",
    color: "bg-violet-500",
    items: [
      { task: "Launch with 3-5 articles/day on consistent daily schedule", status: "critical" },
      { task: "Build 3 topic clusters around primary keyword targets", status: "critical" },
      { task: "Headline A/B testing framework — track Discover CTR by formula", status: "important" },
      { task: "Internal linking architecture — every post links to pillar + 2-3 siblings", status: "important" },
      { task: "Featured image optimization — custom graphics outperform stock 3:1", status: "important" },
      { task: "Monitor Search Console for indexing coverage and errors", status: "moderate" },
    ],
  },
  {
    phase: "Phase 3",
    title: "Discover Breakthrough",
    days: "Days 61–90",
    color: "bg-fuchsia-500",
    items: [
      { task: "Discover surfaces first articles — monitor impressions and CTR", status: "critical" },
      { task: "Double down on topics Discover favors (data from impressions)", status: "critical" },
      { task: "Refine headline formulas based on CTR data", status: "important" },
      { task: "Expand topic clusters with long-tail supporting content", status: "important" },
      { task: "Begin outreach for backlinks — guest posts, HARO, conference bios", status: "moderate" },
      { task: "Evaluate and iterate — what's working, what's not, adjust cadence", status: "moderate" },
    ],
  },
];

const DISCOVER_RULES = [
  { rule: "Image width ≥ 1200px", why: "Google strongly prefers large images in the Discover feed. Thumbnails get suppressed.", good: "Custom 1200×675 graphic", bad: "400px stock photo" },
  { rule: "Headlines: specific > sensational", why: "Discover penalizes clickbait. Specific, informative headlines earn sustained Discover eligibility.", good: "Ethereum L2 Fees Drop 90% After Dencun Upgrade", bad: "You Won't Believe What Happened to ETH!" },
  { rule: "Consistent publication cadence", why: "Discover learns your schedule. Inconsistency reduces crawl frequency.", good: "5 articles/day, every day", bad: "20 articles Monday, 0 articles Tuesday–Friday" },
  { rule: "Topical authority over time", why: "Discover surfaces content from sources it trusts on specific topics. Authority compounds.", good: "50+ articles on DeFi across 3 months", bad: "1 DeFi article between gaming and cooking content" },
];

export function SEODiscoverCaseStudy() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeRule, setActiveRule] = useState(0);

  return (
    <div className="py-16">
      {/* Hero */}
      <section className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-5xl">🚀</span>
          <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">
            From Zero to
            <br />
            <span className="bg-gradient-to-r from-indigo to-violet-400 bg-clip-text text-transparent">Google Discover in 90 Days</span>
          </h1>
          <p className="mt-6 text-lg text-dark-text-muted">
            A systematic, phase-by-phase SEO strategy that took a crypto publication from no Discover presence to consistent daily impressions — with a 3-5× traffic increase.
          </p>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="container-editorial mt-20">
        <h2 className="text-center font-heading text-2xl font-bold">The 90-Day Playbook</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-dark-text-muted">
          Click each phase to see the exact tasks, priorities, and sequence.
        </p>

        {/* Phase tabs */}
        <div className="mt-10 flex justify-center gap-3">
          {PHASES.map((p, i) => (
            <button
              key={p.phase}
              onClick={() => setActivePhase(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                activePhase === i
                  ? `${p.color} text-white shadow-lg`
                  : "bg-dark-surface-alt text-dark-text-muted hover:text-dark-text"
              }`}
            >
              {p.phase}: {p.title}
            </button>
          ))}
        </div>

        {/* Phase content */}
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-2xl border border-dark-border bg-dark-surface p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl font-bold">{PHASES[activePhase].title}</h3>
              <span className="rounded-full bg-dark-surface-alt px-3 py-1 text-sm font-medium text-dark-text-muted">
                {PHASES[activePhase].days}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {PHASES[activePhase].items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-dark-surface-alt p-4">
                  <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs text-white ${
                    item.status === "critical" ? "bg-red-500" : item.status === "important" ? "bg-amber-500" : "bg-blue-400"
                  }`}>
                    {item.status === "critical" ? "!" : item.status === "important" ? "•" : "○"}
                  </span>
                  <div>
                    <p className="text-[0.935rem] font-medium">{item.task}</p>
                    <p className="mt-1 text-xs text-dark-text-muted">
                      Priority: {item.status === "critical" ? "Critical" : item.status === "important" ? "Important" : "Moderate"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 flex gap-2">
            {PHASES.map((p, i) => (
              <div key={p.phase} className={`h-2 flex-1 rounded-full transition-all ${
                i <= activePhase ? p.color : "bg-border"
              }`} />
            ))}
          </div>
        </div>
      </section>

      {/* Discover Rules — Good vs Bad */}
      <section className="container-editorial mt-24">
        <h2 className="text-center font-heading text-2xl font-bold">The Discover Optimization Rules</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-dark-text-muted">
          Click each rule to see what works vs. what doesn&apos;t — with real examples.
        </p>

        <div className="mx-auto mt-10 max-w-3xl">
          {/* Rule tabs */}
          <div className="flex flex-wrap gap-2">
            {DISCOVER_RULES.map((r, i) => (
              <button
                key={i}
                onClick={() => setActiveRule(i)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeRule === i
                    ? "bg-indigo text-white"
                    : "bg-dark-surface-alt text-dark-text-muted hover:text-dark-text"
                }`}
              >
                {r.rule}
              </button>
            ))}
          </div>

          {/* Rule detail */}
          <div className="mt-6 rounded-2xl border border-dark-border bg-dark-surface p-8">
            <h3 className="font-heading text-lg font-bold">{DISCOVER_RULES[activeRule].rule}</h3>
            <p className="mt-2 text-dark-text-muted">{DISCOVER_RULES[activeRule].why}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">✓ Do this</p>
                <p className="mt-2 text-sm font-medium text-green-900">{DISCOVER_RULES[activeRule].good}</p>
              </div>
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-700">✗ Not this</p>
                <p className="mt-2 text-sm font-medium text-red-900">{DISCOVER_RULES[activeRule].bad}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16" />
    </div>
  );
}
