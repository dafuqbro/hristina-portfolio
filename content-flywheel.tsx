import { useState } from "react";

const STAGES = [
  {
    name: "Catch the Signal",
    icon: "📡",
    color: "bg-cyan-500",
    short: "A market move, on-chain event, or protocol announcement breaks.",
    detail:
      "The newsroom is always listening. A price move, a governance vote, a hack, a product launch — the moment it's verifiable, it becomes a publishing decision. The judgment call here is reading what kind of moment it is: a genuine news event, or a cultural one to ride for tone without overclaiming.",
    craft: "Source verification, social listening, knowing which moments are worth the team's speed.",
  },
  {
    name: "Ship Reactive",
    icon: "⚡",
    color: "bg-teal",
    short: "A social-first post goes live on X / TikTok within minutes.",
    detail:
      "Speed is the whole point. A tight, platform-native post — a thread, a quote-tweet with context, a 30-second explainer — captures the conversation while it's live. Pre-built templates and a clear voice make minutes-to-publish realistic without sacrificing accuracy.",
    craft: "Platform-native copywriting, short-form video, a recognizable voice, pre-cleared templates.",
  },
  {
    name: "Go Deep",
    icon: "📚",
    color: "bg-indigo",
    short: "The reaction and questions shape the long-form that ranks.",
    detail:
      "The replies, the questions, the angles people argue about — that's a live brief for the long-form piece. The article answers what the audience actually asked, structured for search, E-E-A-T-sound, and built to stay useful long after the moment passes.",
    craft: "Editorial depth, SEO & Google Discover, E-E-A-T for YMYL, on-chain data to back claims.",
  },
  {
    name: "Redistribute",
    icon: "🔁",
    color: "bg-violet-500",
    short: "The long-form is re-cut into threads, carousels, and video.",
    detail:
      "One deep piece becomes six assets: a recap thread, a carousel of the key chart, a short video walkthrough, a LinkedIn angle, a newsletter blurb. Each is native to its platform — and each one feeds discovery that catches the next signal. The loop closes.",
    craft: "Repurposing, multi-format production, distribution cadence, community engagement.",
  },
];

export function ContentFlywheelCaseStudy() {
  const [active, setActive] = useState(0);

  return (
    <div className="py-16">
      {/* Hero */}
      <section className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-5xl">🔁</span>
          <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">
            The Content Flywheel
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              reactive social to long-form authority
            </span>
          </h1>
          <p className="mt-6 text-lg text-dark-text-muted">
            In a fast newsroom, social isn&apos;t a distribution afterthought —
            it&apos;s the front line. This is the loop I run: a breaking moment
            becomes a social-first post in minutes, the response shapes the
            long-form that ranks, and that piece is re-cut into the threads and
            video that feed the next moment.
          </p>
        </div>
      </section>

      {/* Interactive flywheel */}
      <section className="container-editorial mt-20">
        <h2 className="text-center font-heading text-2xl font-bold">How the loop turns</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-dark-text-muted">
          Click any stage to see what it takes — and how speed feeds depth, and depth feeds reach.
        </p>

        {/* Stage selector */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-4">
          {STAGES.map((stage, i) => (
            <button
              key={stage.name}
              onClick={() => setActive(i)}
              className={`card-lift rounded-xl border p-5 text-left transition-all ${
                active === i
                  ? "border-teal bg-dark-surface-alt"
                  : "border-dark-border bg-dark-surface hover:border-teal/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold text-white ${stage.color}`}>
                  {i + 1}
                </span>
                <span className="text-xl">{stage.icon}</span>
              </div>
              <h3 className="mt-3 font-heading text-base font-semibold">{stage.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-dark-text-muted">{stage.short}</p>
            </button>
          ))}
        </div>

        {/* Active stage detail */}
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-dark-border bg-dark-surface p-8">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg text-white ${STAGES[active].color}`}>
              {STAGES[active].icon}
            </span>
            <h3 className="font-heading text-xl font-bold">{STAGES[active].name}</h3>
          </div>
          <p className="mt-4 leading-relaxed text-dark-text-muted">{STAGES[active].detail}</p>
          <div className="mt-5 rounded-lg bg-dark-surface-alt p-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-light">What it takes</span>
            <p className="mt-1 text-sm text-dark-text-muted">{STAGES[active].craft}</p>
          </div>
        </div>
      </section>

      {/* Two-way explanation */}
      <section className="container-editorial mt-20">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-dark-border bg-dark-surface p-6">
            <span className="text-2xl">⏱️</span>
            <h3 className="mt-3 font-heading text-lg font-semibold">Speed builds depth</h3>
            <p className="mt-2 text-[0.935rem] leading-relaxed text-dark-text-muted">
              The reactive post isn&apos;t just for reach — it&apos;s research. What the audience replies, asks, and argues about becomes the brief for a long-form piece that actually answers the moment.
            </p>
          </div>
          <div className="rounded-2xl border border-dark-border bg-dark-surface p-6">
            <span className="text-2xl">📡</span>
            <h3 className="mt-3 font-heading text-lg font-semibold">Depth builds reach</h3>
            <p className="mt-2 text-[0.935rem] leading-relaxed text-dark-text-muted">
              One deep piece becomes six platform-native assets. Each re-cut earns its own discovery — and surfaces the next signal worth moving on. The flywheel compounds.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance callout */}
      <section className="container-editorial mt-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-teal/30 bg-dark-surface-alt p-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-light">Compliant by default</span>
          <p className="mt-2 text-[0.935rem] leading-relaxed text-dark-text-muted">
            In regulated categories like crypto, every post is a financial promotion. The flywheel only works when speed never outruns the rules — risk warnings on the face of the post, no incentive framing, no implied endorsements, no claims the data can&apos;t back. Reactive doesn&apos;t mean reckless.
          </p>
        </div>
      </section>
    </div>
  );
}
