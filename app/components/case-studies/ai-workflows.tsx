import { useState } from "react";

const PIPELINE_STEPS = [
  {
    id: "submit",
    label: "Writer Submits Draft",
    icon: "📝",
    detail: "Writer completes draft in CMS and hits submit. This triggers an n8n webhook that starts the automated pipeline.",
    time: "0s",
    type: "human" as const,
  },
  {
    id: "seo",
    label: "SEO Metadata Check",
    icon: "🔍",
    detail: "AI evaluates title tag, meta description, heading structure, and keyword density against the assigned target keyword. Flags missing or weak elements.",
    time: "~8s",
    type: "ai" as const,
  },
  {
    id: "facts",
    label: "Fact Verification",
    icon: "✅",
    detail: "Cross-references token prices, TVL figures, and protocol claims against CoinGecko API and Dune Analytics dashboards. Flags unverifiable claims.",
    time: "~12s",
    type: "ai" as const,
  },
  {
    id: "style",
    label: "Style Guide Compliance",
    icon: "📖",
    detail: "Checks capitalization (Bitcoin vs bitcoin), ticker format (ETH in parentheses), date formats, disclaimer presence, and 200+ other style rules.",
    time: "~6s",
    type: "ai" as const,
  },
  {
    id: "readability",
    label: "Readability Scoring",
    icon: "📊",
    detail: "Calculates Flesch reading ease, average sentence length, and paragraph density. Flags sections that are too complex for the target audience.",
    time: "~3s",
    type: "ai" as const,
  },
  {
    id: "report",
    label: "Report Generated",
    icon: "📋",
    detail: "All checks compiled into a structured feedback report with severity ratings (critical, warning, suggestion) and sent to the editor's Slack channel.",
    time: "~2s",
    type: "ai" as const,
  },
  {
    id: "editor",
    label: "Editor Reviews",
    icon: "👩‍💼",
    detail: "Editor receives the automated report alongside the draft. Focuses on narrative quality, analysis depth, and editorial voice — not mechanical checks.",
    time: "~20min",
    type: "human" as const,
  },
  {
    id: "publish",
    label: "Published",
    icon: "🚀",
    detail: "Article goes live with optimized metadata, verified facts, and editorial polish. Average time from draft to publish: reduced from 4+ hours to under 2.5 hours.",
    time: "✓",
    type: "human" as const,
  },
];

const BEFORE_AFTER = [
  { metric: "Weekly articles", before: "~40", after: "100+", improvement: "+150%" },
  { metric: "Time to publish", before: "4+ hours", after: "2.5 hours", improvement: "-40%" },
  { metric: "Correction rate", before: "Higher", after: "Lower", improvement: "Improved" },
  { metric: "Editorial headcount", before: "15", after: "15", improvement: "No change" },
  { metric: "Writer satisfaction", before: "Mixed", after: "High", improvement: "↑" },
  { metric: "Discover impressions", before: "Baseline", after: "3-5× higher", improvement: "+300%" },
];

export function AIWorkflowsCaseStudy() {
  const [activeStep, setActiveStep] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="py-16">
      {/* Hero */}
      <section className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-5xl">🤖</span>
          <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">
            Scaling Editorial Output
            <br />
            <span className="bg-gradient-to-r from-teal to-cyan-400 bg-clip-text text-transparent">2.5× with AI Workflows</span>
          </h1>
          <p className="mt-6 text-lg text-dark-text-muted">
            How I built an n8n-powered editorial pipeline that automated quality checks, fact verification, and SEO compliance — taking a crypto newsroom from 40 to 100+ articles per week without adding headcount.
          </p>
        </div>
      </section>

      {/* Interactive Pipeline Flowchart */}
      <section className="container-editorial mt-20">
        <h2 className="text-center font-heading text-2xl font-bold">The Automated Editorial Pipeline</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-dark-text-muted">
          Click each step to explore what happens at every stage of the pipeline.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          {/* Pipeline steps */}
          <div className="space-y-3">
            {PIPELINE_STEPS.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={`group flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                  activeStep === i
                    ? "border-teal bg-teal/5 shadow-md"
                    : "border-dark-border bg-dark-surface hover:border-teal/50"
                }`}
              >
                {/* Step number / connector */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                    step.type === "ai"
                      ? "bg-teal-light/10"
                      : "bg-indigo-light/10"
                  }`}>
                    {step.icon}
                  </div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div className={`mt-1 h-3 w-0.5 ${activeStep === i ? "bg-teal" : "bg-border"}`} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-semibold ${activeStep === i ? "text-teal-light" : ""}`}>
                      {step.label}
                    </h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      step.type === "ai"
                        ? "bg-teal/10 text-teal"
                        : "bg-indigo/10 text-indigo"
                    }`}>
                      {step.type === "ai" ? "Automated" : "Human"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-dark-text-muted">{step.time}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="sticky top-20 h-fit rounded-2xl border border-dark-border bg-dark-surface p-8 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{PIPELINE_STEPS[activeStep].icon}</span>
              <div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  PIPELINE_STEPS[activeStep].type === "ai"
                    ? "bg-teal/10 text-teal"
                    : "bg-indigo/10 text-indigo"
                }`}>
                  Step {activeStep + 1} of {PIPELINE_STEPS.length}
                </span>
                <h3 className="mt-1 font-heading text-xl font-bold">{PIPELINE_STEPS[activeStep].label}</h3>
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-dark-text-muted">
              {PIPELINE_STEPS[activeStep].detail}
            </p>

            {/* Navigation */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="rounded-lg border border-dark-border px-4 py-2 text-sm font-medium disabled:opacity-30 hover:border-teal"
              >
                ← Previous
              </button>
              <button
                onClick={() => setActiveStep(Math.min(PIPELINE_STEPS.length - 1, activeStep + 1))}
                disabled={activeStep === PIPELINE_STEPS.length - 1}
                className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white disabled:opacity-30 hover:bg-teal-dark"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Toggle */}
      <section className="container-editorial mt-24">
        <h2 className="text-center font-heading text-2xl font-bold">The Results</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-dark-text-muted">
          Toggle between before and after to see the impact across key metrics.
        </p>

        {/* Toggle switch */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className={`text-sm font-semibold ${!showAfter ? "text-teal-light" : "text-dark-text-muted"}`}>Before AI</span>
          <button
            onClick={() => setShowAfter(!showAfter)}
            className={`relative h-8 w-14 rounded-full transition-colors ${showAfter ? "bg-teal" : "bg-border"}`}
          >
            <div className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${showAfter ? "left-7" : "left-1"}`} />
          </button>
          <span className={`text-sm font-semibold ${showAfter ? "text-teal-light" : "text-dark-text-muted"}`}>After AI</span>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BEFORE_AFTER.map((item) => (
            <div
              key={item.metric}
              className="rounded-xl border border-dark-border bg-dark-surface p-5 text-center transition-all"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-dark-text-muted">{item.metric}</p>
              <p className={`mt-2 font-heading text-2xl font-bold transition-all ${
                showAfter ? "text-teal-light" : "text-dark-text"
              }`}>
                {showAfter ? item.after : item.before}
              </p>
              {showAfter && (
                <p className="mt-1 text-xs font-semibold text-teal-light">{item.improvement}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="container-editorial mt-24 mb-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-2xl font-bold">Key Takeaways</h2>
          <div className="mt-8 space-y-6">
            {[
              { title: "Automate the mechanical, not the creative", text: "AI handles SEO checks, fact verification, and style compliance. Humans handle narrative, analysis, and editorial judgment." },
              { title: "Invest in prompt specificity", text: "A 500-word prompt with your exact style rules outperforms a 50-word generic one every time. Detailed context is everything." },
              { title: "Start with your biggest bottleneck", text: "Don't automate everything at once. Identify the single most time-consuming mechanical task and build from there." },
              { title: "Measure beyond output volume", text: "Track correction rates, time-to-publish, editor satisfaction, and Discover performance — not just article count." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs font-bold text-teal">✓</div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-[0.935rem] text-dark-text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
