import { useState } from "react";

const CONTENT_PILLARS = [
  {
    name: "Breaking News",
    icon: "⚡",
    color: "bg-red-500",
    percentage: 30,
    description: "Time-sensitive market events, regulatory announcements, and protocol developments. Published within 15-30 minutes of the event.",
    requirements: "Speed-first workflow, verified sources, pre-written templates for common event types",
    seoRole: "Drives Google Discover eligibility and freshness signals",
    example: "Bitcoin hits new ATH — live blog with rolling updates every 10-15 minutes",
  },
  {
    name: "Market Analysis",
    icon: "📊",
    color: "bg-teal",
    percentage: 20,
    description: "Data-driven market commentary backed by on-chain metrics, technical analysis, and macro context. Published daily or weekly.",
    requirements: "Dune Analytics dashboards, CoinGecko API data, editorial voice that balances insight with caution",
    seoRole: "Builds topical authority, targets 'analysis' and 'prediction' long-tail keywords",
    example: "Weekly DeFi recap: TVL flows, top performers, smart money movements",
  },
  {
    name: "Educational Guides",
    icon: "📚",
    color: "bg-indigo",
    percentage: 20,
    description: "Evergreen explainers, how-to guides, and glossary content. Updated quarterly to maintain accuracy.",
    requirements: "Clear structure, beginner-friendly language, step-by-step format, rich schema markup",
    seoRole: "Pillar pages for topic clusters, targets high-volume head terms",
    example: "What is DeFi? A Complete Beginner's Guide (3,000+ words, regularly updated)",
  },
  {
    name: "Research Reports",
    icon: "🔬",
    color: "bg-violet-500",
    percentage: 10,
    description: "Original data-driven reports using on-chain analytics, surveys, and proprietary data. Published monthly or quarterly.",
    requirements: "Dune queries, data visualization, methodology transparency, peer review",
    seoRole: "Link magnets — other publications cite original research",
    example: "Bitcoin vs Gold vs Stocks: Which rebounds best in market crashes?",
  },
  {
    name: "Interviews & Features",
    icon: "🎙️",
    color: "bg-amber-500",
    percentage: 10,
    description: "In-depth conversations with founders, developers, analysts, and industry figures. Published weekly.",
    requirements: "Pre-research, prepared questions, editorial framing, cross-promotion",
    seoRole: "E-E-A-T boost through association with recognized industry figures",
    example: "Idris Elba on his Stellar journey to unlocking human potential",
  },
  {
    name: "Branded Content",
    icon: "💼",
    color: "bg-emerald-500",
    percentage: 10,
    description: "Sponsored articles, product reviews, and advertorial content — clearly labeled and editorially honest.",
    requirements: "Clear sponsorship disclosure, editorial independence, quality matching organic content",
    seoRole: "Revenue generation; must not compromise E-E-A-T of organic content",
    example: "This Web3 security tool protects users against phishing in real-time [Sponsored]",
  },
];

const SCALING_LEVELS = [
  { level: "Solo / Small Team", articles: "10-20/week", team: "1-3 people", tools: "CMS + basic SEO tools", automation: "None", bottleneck: "Writer capacity" },
  { level: "Growing Team", articles: "30-50/week", team: "5-8 people", tools: "CMS + SEO + analytics", automation: "Basic (templates, checklists)", bottleneck: "Editorial review speed" },
  { level: "Scaled Operation", articles: "80-120/week", team: "12-18 people", tools: "Full stack + Dune + APIs", automation: "AI-assisted (n8n + prompts)", bottleneck: "Content quality consistency" },
  { level: "Enterprise", articles: "150+/week", team: "20+ people", tools: "Custom tooling + dashboards", automation: "Full pipeline automation", bottleneck: "Strategic differentiation" },
];

export function ContentStrategyCaseStudy() {
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const [activeScale, setActiveScale] = useState(2);

  return (
    <div className="py-16">
      {/* Hero */}
      <section className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-5xl">📐</span>
          <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">
            Content Strategy Framework
            <br />
            <span className="bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">for Crypto Publications</span>
          </h1>
          <p className="mt-6 text-lg text-dark-text-muted">
            The system behind producing 100+ articles per week that rank — built on six content pillars, data-driven topic selection, and a workflow that scales from solo operation to 20-person team.
          </p>
        </div>
      </section>

      {/* Content Mix — Interactive Pillars */}
      <section className="container-editorial mt-20">
        <h2 className="text-center font-heading text-2xl font-bold">The Content Mix</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-dark-text-muted">
          Click any pillar to see requirements, SEO role, and real examples.
        </p>

        {/* Visual bar chart */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="flex items-end gap-2" style={{ height: "200px" }}>
            {CONTENT_PILLARS.map((pillar, i) => (
              <button
                key={pillar.name}
                onClick={() => setActivePillar(activePillar === i ? null : i)}
                className={`group relative flex-1 rounded-t-lg transition-all hover:opacity-90 ${pillar.color} ${
                  activePillar === i ? "ring-2 ring-ink ring-offset-2" : ""
                }`}
                style={{ height: `${pillar.percentage * 5.5}px` }}
                title={`${pillar.name}: ${pillar.percentage}%`}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-dark-text">
                  {pillar.percentage}%
                </span>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-dark-text-muted">
                  {pillar.icon}
                </span>
              </button>
            ))}
          </div>

          {/* Labels */}
          <div className="mt-10 flex gap-2">
            {CONTENT_PILLARS.map((pillar, i) => (
              <button
                key={pillar.name}
                onClick={() => setActivePillar(activePillar === i ? null : i)}
                className={`flex-1 rounded-lg p-2 text-center text-xs font-medium transition-all ${
                  activePillar === i
                    ? "bg-dark-surface-alt font-semibold text-dark-text"
                    : "text-dark-text-muted hover:text-dark-text-muted"
                }`}
              >
                {pillar.name}
              </button>
            ))}
          </div>
        </div>

        {/* Pillar detail */}
        {activePillar !== null && (
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-dark-border bg-dark-surface p-8">
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${CONTENT_PILLARS[activePillar].color} text-lg text-white`}>
                {CONTENT_PILLARS[activePillar].icon}
              </span>
              <div>
                <h3 className="font-heading text-xl font-bold">{CONTENT_PILLARS[activePillar].name}</h3>
                <p className="text-sm text-dark-text-muted">{CONTENT_PILLARS[activePillar].percentage}% of content mix</p>
              </div>
            </div>

            <p className="mt-4 text-dark-text-muted">{CONTENT_PILLARS[activePillar].description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-dark-surface-alt p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-dark-text-muted">Requirements</p>
                <p className="mt-2 text-sm">{CONTENT_PILLARS[activePillar].requirements}</p>
              </div>
              <div className="rounded-xl bg-dark-surface-alt p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-dark-text-muted">SEO Role</p>
                <p className="mt-2 text-sm">{CONTENT_PILLARS[activePillar].seoRole}</p>
              </div>
              <div className="rounded-xl bg-dark-surface-alt p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-dark-text-muted">Example</p>
                <p className="mt-2 text-sm italic">{CONTENT_PILLARS[activePillar].example}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Scaling Model */}
      <section className="container-editorial mt-24">
        <h2 className="text-center font-heading text-2xl font-bold">The Scaling Model</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-dark-text-muted">
          This framework scales from a solo creator to a 20+ person operation. Drag the slider to see how the system evolves at each level.
        </p>

        {/* Scale slider */}
        <div className="mx-auto mt-10 max-w-3xl">
          <input
            type="range"
            min={0}
            max={3}
            value={activeScale}
            onChange={(e) => setActiveScale(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="flex justify-between text-xs text-dark-text-muted">
            {SCALING_LEVELS.map((l) => (
              <span key={l.level}>{l.level}</span>
            ))}
          </div>

          {/* Scale detail */}
          <div className="mt-8 rounded-2xl border border-dark-border bg-dark-surface p-8">
            <h3 className="font-heading text-xl font-bold">{SCALING_LEVELS[activeScale].level}</h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { label: "Output", value: SCALING_LEVELS[activeScale].articles },
                { label: "Team size", value: SCALING_LEVELS[activeScale].team },
                { label: "Tools", value: SCALING_LEVELS[activeScale].tools },
                { label: "Automation", value: SCALING_LEVELS[activeScale].automation },
                { label: "Bottleneck", value: SCALING_LEVELS[activeScale].bottleneck },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-dark-surface-alt p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-dark-text-muted">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16" />
    </div>
  );
}
