import { useState } from "react";

const PILLARS = [
  {
    letter: "E",
    name: "Experience",
    color: "bg-emerald-500",
    textColor: "text-emerald-600",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    score: { before: 25, after: 85 },
    description: "Demonstrating firsthand experience with the topics you cover. Google wants to see you've actually DONE the thing, not just researched it.",
    actions: [
      { action: "Author bios mention specific protocols used, events attended, teams managed", impact: "High" },
      { action: "Case studies with real metrics from actual editorial operations", impact: "High" },
      { action: "Screenshots and examples from real editorial workflows", impact: "Medium" },
      { action: "'Behind the scenes' content showing editorial process", impact: "Medium" },
      { action: "Personal anecdotes that demonstrate hands-on experience", impact: "Low" },
    ],
  },
  {
    letter: "E",
    name: "Expertise",
    color: "bg-teal",
    textColor: "text-teal-light",
    bgLight: "bg-teal-light/5",
    borderColor: "border-teal/20",
    score: { before: 40, after: 90 },
    description: "Verifiable credentials, education, and professional history. For crypto YMYL content, Google cross-references author claims against external sources.",
    actions: [
      { action: "MA in Journalism + 7 years at named publications = verifiable expertise", impact: "High" },
      { action: "Author pages at Cointelegraph, CoinMarketCap linking back to personal site", impact: "High" },
      { action: "Detailed knowsAbout schema listing specific areas of expertise", impact: "Medium" },
      { action: "Professional headshot consistent across all platforms", impact: "Medium" },
      { action: "Speaking appearances and conference participation", impact: "Medium" },
    ],
  },
  {
    letter: "A",
    name: "Authoritativeness",
    color: "bg-indigo",
    textColor: "text-indigo",
    bgLight: "bg-indigo/5",
    borderColor: "border-indigo/20",
    score: { before: 20, after: 75 },
    description: "External validation — other reputable sites linking to and citing your content. The hardest pillar to build but the most powerful for rankings.",
    actions: [
      { action: "Backlinks from publication author pages to personal domain", impact: "High" },
      { action: "Guest posts on crypto SEO and media industry publications", impact: "High" },
      { action: "HARO / journalist query responses for expert quotes", impact: "Medium" },
      { action: "Conference speaker bios linking to personal site", impact: "Medium" },
      { action: "sameAs schema connecting all external profiles", impact: "Medium" },
    ],
  },
  {
    letter: "T",
    name: "Trustworthiness",
    color: "bg-amber-500",
    textColor: "text-amber-600",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    score: { before: 50, after: 95 },
    description: "Technical trust (HTTPS, speed, clean architecture) plus editorial trust (transparent sourcing, corrections policy, disclaimers on financial content).",
    actions: [
      { action: "HTTPS + Cloudflare edge SSR = sub-50ms TTFB globally", impact: "High" },
      { action: "Clear editorial policy and corrections process", impact: "High" },
      { action: "Financial disclaimers on all market-adjacent content", impact: "High" },
      { action: "Clean structured data — Article, Person, BreadcrumbList schemas", impact: "Medium" },
      { action: "Real contact information, not anonymous", impact: "Medium" },
    ],
  },
];

export function EEATCaseStudy() {
  const [activePillar, setActivePillar] = useState(0);

  const pillar = PILLARS[activePillar];

  return (
    <div className="py-16">
      {/* Hero */}
      <section className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-5xl">🛡️</span>
          <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">
            How E-E-A-T Compliance
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal bg-clip-text text-transparent">Transformed YMYL Rankings</span>
          </h1>
          <p className="mt-6 text-lg text-dark-text-muted">
            Crypto content is classified as YMYL by Google — meaning quality standards are higher than almost any other niche. Here&apos;s how a systematic E-E-A-T strategy turned that challenge into a competitive advantage.
          </p>
        </div>
      </section>

      {/* Interactive Pillars */}
      <section className="container-editorial mt-20">
        <h2 className="text-center font-heading text-2xl font-bold">Explore the Four Pillars</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-dark-text-muted">
          Click each pillar to see the specific actions taken and their impact on rankings.
        </p>

        {/* Pillar selector — large clickable letters */}
        <div className="mt-10 flex justify-center gap-4">
          {PILLARS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActivePillar(i)}
              className={`group flex flex-col items-center gap-2 rounded-2xl border-2 px-6 py-5 transition-all ${
                activePillar === i
                  ? `${p.borderColor} ${p.bgLight} shadow-lg`
                  : "border-dark-border bg-dark-surface hover:shadow-md"
              }`}
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-full ${p.color} text-2xl font-bold text-white`}>
                {p.letter}
              </span>
              <span className={`text-sm font-semibold ${activePillar === i ? p.textColor : "text-dark-text-muted"}`}>
                {p.name}
              </span>
            </button>
          ))}
        </div>

        {/* Pillar detail */}
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-dark-border bg-dark-surface p-8">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-full ${pillar.color} text-lg font-bold text-white`}>{pillar.letter}</span>
            <h3 className="font-heading text-xl font-bold">{pillar.name}</h3>
          </div>
          <p className="mt-3 text-dark-text-muted">{pillar.description}</p>

          {/* Score bar */}
          <div className="mt-6 rounded-xl bg-dark-surface-alt p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Score Improvement</span>
              <span className={`font-bold ${pillar.textColor}`}>{pillar.score.before}% → {pillar.score.after}%</span>
            </div>
            <div className="mt-3 h-4 overflow-hidden rounded-full bg-border">
              <div
                className={`h-full rounded-full ${pillar.color} transition-all duration-1000 ease-out`}
                style={{ width: `${pillar.score.after}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-dark-text-muted">
              <span>Before: {pillar.score.before}%</span>
              <span>After: {pillar.score.after}%</span>
            </div>
          </div>

          {/* Action items */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-dark-text-muted">Implementation Actions</h4>
            <div className="mt-3 space-y-2">
              {pillar.actions.map((a, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-dark-surface-alt p-3">
                  <span className={`mt-0.5 rounded px-1.5 py-0.5 text-xs font-bold text-white ${
                    a.impact === "High" ? "bg-red-500" : a.impact === "Medium" ? "bg-amber-500" : "bg-blue-400"
                  }`}>
                    {a.impact}
                  </span>
                  <p className="text-sm">{a.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overall impact */}
      <section className="container-editorial mt-24 mb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-center">Overall Ranking Impact</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { metric: "Avg. position improvement", value: "+73%", sub: "Across target keywords" },
              { metric: "Organic traffic", value: "4.2×", sub: "Year-over-year growth" },
              { metric: "Discover eligibility", value: "92%", sub: "Of new articles surfaced" },
            ].map((m) => (
              <div key={m.metric} className="rounded-xl border border-dark-border bg-dark-surface p-6 text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal bg-clip-text text-transparent">{m.value}</p>
                <p className="mt-1 text-sm font-semibold">{m.metric}</p>
                <p className="mt-1 text-xs text-dark-text-muted">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
