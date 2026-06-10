import { pageMeta } from "~/lib/seo";

/* ────────────────────────────────────────────────────────────────────────
   UNLISTED CASE STUDY  ·  /work/dasdhjsfdhnasbj
   - noindex (see meta below), not in nav, not in /work grid, not in sitemap.
   - Anyone with the link can view; treat the URL like a password.

   ✏️  EDIT HERE: everything specific lives in the DATA object below.
   Items marked  // REAL  are verified from the published articles.
   Items marked  // RECONSTRUCTED  are realistic placeholders — replace the
   text / times / numbers with the actual tweets and live-blog entries.
   ──────────────────────────────────────────────────────────────────────── */

const DATA = {
  preparedFor: "Private preview", // e.g. "Prepared for the Revolut hiring team"

  // ===== DIRECTION 2 — REACTIVE SOCIAL → LONG-FORM (the live blog) =====
  reactive: {
    article: {
      // REAL
      kicker: "Cryptonews · Bitcoin News · LIVE",
      title: "[LIVE] Bitcoin Inches Closer to a New ATH — Can BTC Hit $125K Today?",
      author: "Hristina Yordanova, Managing Editor (verified)",
      published: "11 Aug 2025 · 09:56 UTC",
      updated: "11 Aug 2025 · 15:35 UTC",
      url: "cryptonews.com/news/live-bitcoin-price-to-hit-125k-today-news-updates-11-august-2025",
      tags: ["Bitcoin", "Cryptocurrency", "Market"],
      dek: "As prices surge toward a fresh all-time high, traders worldwide are asking the same question — can the Bitcoin price hit $125,000 today?", // REAL (meta description)
    },
    signal: {
      time: "~09:50 UTC",
      text: "Bitcoin pushing within ~2% of its all-time high on the US pre-open. Spot volume climbing, $125K chatter spiking across crypto X. Desk call: this is a live-coverage moment, not a single post.",
    },
    // RECONSTRUCTED — replace with the real launch tweet text + time + metrics
    breakingTweet: {
      time: "11 Aug · 09:58 UTC",
      body: "🚨 Bitcoin is knocking on the door of a new all-time high.\n\nTraders everywhere are asking the same thing: can $BTC hit $125K today?\n\nWe're covering it LIVE — price, charts and expert reactions, updated through the day 👇\n#Bitcoin #BTC",
      link: "cryptonews.com/news/live-bitcoin-price...",
      metrics: "— impressions · — reposts · — link clicks", // ✏️ add real numbers
    },
    // RECONSTRUCTED cadence between the REAL 09:56 → 15:35 window.
    // ✏️ Replace each entry with the actual live-blog update + the social action that went with it.
    timeline: [
      { time: "09:56", kind: "publish", label: "Live blog goes live", text: "Coverage opens. BTC trading near its all-time high as US desks come online; $125K framed as the level of the day. Live schema + Google News submission fire on publish." },
      { time: "10:40", kind: "update", label: "New intraday high", text: "BTC tags a fresh intraday high. Chart embed updated; $125K now within striking distance." },
      { time: "11:25", kind: "social", label: "Quote-tweet the candle", text: "Screenshot of the breakout candle pushed as a quote-tweet on @cryptonews: “$BTC just printed a fresh intraday high — $125K watch is ON.” Drives readers back into the live blog." },
      { time: "12:30", kind: "update", label: "Expert reaction added", text: "Analyst reaction added to the blog: $125K is “more psychological than technical,” with real resistance sitting higher. Attributed and timestamped." },
      { time: "13:50", kind: "update", label: "Momentum cools", text: "Pullback noted: BTC eases off the high as spot momentum fades; funding still elevated. Honest, real-time — we cover the fade as well as the pump." },
      { time: "15:35", kind: "wrap", label: "Session wrap", text: "Closing update: BTC holds near the highs but shy of $125K. Coverage paused with a recap and “what to watch tomorrow.” Live blog now an evergreen, ranking asset." },
    ],
    loopBack: "The recurring reply — “why is $125K the line everyone's watching?” — became the next day's explainer, which then fed straight into Direction 1's amplification engine. The loop closes.",
    results: "— peak concurrent readers · — session pageviews · — avg. time on page · — Google News / Discover impressions  (✏️ add real figures)",
  },

  // ===== DIRECTION 1 — LONG-FORM → SOCIAL (the crashes report) =====
  amplify: {
    article: {
      // REAL
      kicker: "Cryptonews · Market Research / Report",
      title: "Bitcoin, Gold or Stocks: Which Holds Up Best in Market Crashes?",
      trigger: "Published into a live moment: crypto had just dropped ~10% in a day on fresh US tariff threats. The report answered the question everyone was already asking.",
      findings: [
        "Gold was steadiest in the panic — best safe haven in 3 of the 4 crises.",
        "Bitcoin fell hardest but paid the most later: +220% in the 6 months after the COVID crash.",
        "2022 rate shock: BTC −53.4% (Terra, Voyager, FTX); Gold ended +4.7% above its start.",
        "2023 bank run: Gold worked instantly; BTC moved on its own clock, +49% the next month.",
      ],
      disclaimer: "Carries the standard line: informational only, not investment advice.", // REAL
    },
    // Each post uses REAL data from the report → accurate, not invented.
    // ✏️ Adjust copy/timing to match what actually shipped; add metrics.
    rollout: [
      {
        day: "Day 1 — launch",
        format: "X thread (5 tweets)",
        accent: "teal",
        purpose: "Carry the full argument; link the report in the last tweet.",
        body: "1/ Gold or Bitcoin in a crash? We ran the numbers on 4 meltdowns since 2020 — COVID, the 2022 rate shock, the 2023 bank run, and April's tariff shock. The pattern surprises both camps. 🧵\n\n2/ COVID, Mar 2020: the S&P fell 9.5% in a single session, VIX above 75. Gold barely flinched. Bitcoin crashed hardest — then ran +220% by September.\n\n3/ 2022 rate shock: BTC −53%, dragged down by Terra, Voyager and FTX. Gold ended +4.7% above where it started.\n\n4/ 2023 bank run (SVB): Gold did its job immediately. Bitcoin moved on its own clock — +49% the following month.\n\n5/ Verdict: Gold protects, Bitcoin pays — later. Full breakdown, all four crises 👇 [link]",
      },
      {
        day: "Day 2",
        format: "Stat card (X + Instagram)",
        accent: "teal",
        purpose: "One number, one image, infinitely shareable.",
        body: "“+220% — Bitcoin's run in the 6 months after the COVID crash. Gold's job is to not lose. Bitcoin's is to win late.”  → branded graphic, no caption needed.",
      },
      {
        day: "Day 3",
        format: "Poll (X)",
        accent: "teal",
        purpose: "Bait the debate; harvest the replies for a follow-up.",
        body: "“Market panic hits tomorrow. Where do you want your money?”  →  Gold / Bitcoin / S&P 500 / Cash",
      },
      {
        day: "Day 4",
        format: "Short video, 60s (TikTok / Reels / Shorts)",
        accent: "teal",
        purpose: "Highest-ROI format; three charts to a verdict.",
        body: "“Which actually survives a crash?” Voiceover over three charts (COVID, 2022, 2023), hard cut to the verdict. Vertical, captioned, watermark to the report.",
      },
      {
        day: "Day 5",
        format: "LinkedIn angle",
        accent: "teal",
        purpose: "Sober, professional framing for a different audience.",
        body: "“We compared gold, Bitcoin and the S&P across four crises since 2020. The takeaway for allocators isn't ‘which is better' — it's that they do different jobs, on different timelines.”  → carousel of the four crises.",
      },
    ],
    results: "— thread impressions · — report sessions from social · — video views · — saves/shares  (✏️ add real figures)",
  },
};

export function meta() {
  return pageMeta({
    title: "Content Flywheel — Cryptonews Case Study",
    description: "An unlisted case study.",
    path: "/work/dasdhjsfdhnasbj",
    noIndex: true, // robots: noindex, nofollow
  });
}

export function headers() {
  return { "Cache-Control": "private, no-store" };
}

/* ── small presentational helpers ───────────────────────────────────────── */

function Pill({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "indigo" }) {
  const c = tone === "indigo" ? "border-indigo/40 text-indigo-light" : "border-teal/40 text-teal-light";
  return (
    <span className={`inline-flex items-center rounded-full border ${c} px-3 py-1 text-xs font-semibold uppercase tracking-widest`}>
      {children}
    </span>
  );
}

function Tweet({ time, body, link, metrics, tone = "indigo" }: { time: string; body: string; link?: string; metrics?: string; tone?: "teal" | "indigo" }) {
  const ring = tone === "indigo" ? "bg-indigo" : "bg-teal";
  return (
    <div className="rounded-2xl border border-dark-border bg-dark-surface p-5">
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${ring} text-sm font-bold text-white`}>cn</span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-dark-text">Cryptonews.com</p>
          <p className="text-xs text-dark-text-muted">@cryptonews · {time}</p>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-line text-[0.95rem] leading-relaxed text-dark-text">{body}</p>
      {link && <p className="mt-2 text-sm text-teal-light">{link}</p>}
      {metrics && <p className="mt-3 border-t border-dark-border pt-3 text-xs text-dark-text-muted">{metrics}</p>}
    </div>
  );
}

const KIND_DOT: Record<string, string> = {
  publish: "bg-indigo",
  update: "bg-indigo-light",
  social: "bg-teal-light",
  wrap: "bg-indigo",
};

export default function FlywheelCaseStudy() {
  const { reactive: R, amplify: A } = DATA;

  return (
    <article className="bg-dark-bg">
      {/* Hero */}
      <header className="border-b border-dark-border">
        <div className="container-editorial py-14 md:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="teal">Long-form → Social</Pill>
            <span className="text-dark-text-muted">+</span>
            <Pill tone="indigo">Reactive Social → Long-form</Pill>
            <span className="ml-auto text-xs uppercase tracking-widest text-dark-text-muted">{DATA.preparedFor}</span>
          </div>
          <h1 className="mt-6 max-w-4xl">
            The content flywheel, <span className="gradient-text">both directions</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dark-text-muted">
            At a crypto desk, social isn&apos;t where a story ends — it&apos;s where half of them start. Two worked
            examples from the <strong className="text-dark-text">@cryptonews</strong> account, using real published pieces:
            one report amplified into a week of posts, and one breaking moment captured into a live blog that ranks.
          </p>
          <p className="mt-4 text-sm text-dark-text-muted">
            Hristina Yordanova · Managing Editor, Cryptonews · <a className="text-teal-light hover:underline" href="https://hristinayordanova.com">hristinayordanova.com</a>
          </p>
        </div>
      </header>

      {/* ===================== DIRECTION 2 — REACTIVE ===================== */}
      <section className="border-b border-dark-border">
        <div className="container-editorial py-14 md:py-20">
          <Pill tone="indigo">Direction 2 · Capture</Pill>
          <h2 className="mt-4">Reactive social → long-form</h2>
          <p className="mt-3 max-w-2xl text-dark-text-muted">
            A price move breaks, a post is live within minutes, and the engagement steers a rolling, sourced live article
            that owns the day&apos;s search demand. Here&apos;s the real one, minute by minute.
          </p>

          {/* The article anchor */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-2xl border border-indigo/30 bg-dark-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-light">{R.article.kicker}</p>
              <h3 className="mt-2 font-heading text-2xl font-bold leading-snug">{R.article.title}</h3>
              <p className="mt-3 text-dark-text-muted">{R.article.dek}</p>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div><dt className="text-dark-text-muted">Author</dt><dd className="font-medium">{R.article.author}</dd></div>
                <div><dt className="text-dark-text-muted">Tags</dt><dd className="font-medium">{R.article.tags.join(", ")}</dd></div>
                <div><dt className="text-dark-text-muted">Published</dt><dd className="font-medium">{R.article.published}</dd></div>
                <div><dt className="text-dark-text-muted">Last updated</dt><dd className="font-medium">{R.article.updated}</dd></div>
              </dl>
              <p className="mt-4 break-all text-xs text-teal-light">{R.article.url}</p>
            </div>

            {/* Signal + breaking tweet */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-dark-border bg-dark-surface-alt p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-light">The signal · {R.signal.time}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-dark-text-muted">{R.signal.text}</p>
              </div>
              <Tweet time={R.breakingTweet.time} body={R.breakingTweet.body} link={R.breakingTweet.link} metrics={R.breakingTweet.metrics} tone="indigo" />
            </div>
          </div>

          {/* Timeline */}
          <h3 className="mt-12 font-heading text-xl font-semibold">The live window — 09:56 → 15:35 UTC</h3>
          <ol className="mt-6 space-y-0 border-l-2 border-dark-border pl-8">
            {R.timeline.map((t, i) => (
              <li key={i} className="relative pb-8 last:pb-0">
                <span className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-dark-bg ${KIND_DOT[t.kind] || "bg-indigo"}`} />
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-mono text-sm font-semibold text-indigo-light">{t.time} UTC</span>
                  <span className="text-sm font-semibold text-dark-text">{t.label}</span>
                  {t.kind === "social" && <span className="rounded bg-teal/15 px-1.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-light">social</span>}
                </div>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-dark-text-muted">{t.text}</p>
              </li>
            ))}
          </ol>

          {/* Loop + results */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-dark-surface-alt p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-light">↺ Closes the loop</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-dark-text-muted">{R.loopBack}</p>
            </div>
            <div className="rounded-2xl bg-dark-surface-alt p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-dark-text-muted">Results</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-dark-text-muted">{R.results}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DIRECTION 1 — AMPLIFY ===================== */}
      <section className="border-b border-dark-border">
        <div className="container-editorial py-14 md:py-20">
          <Pill tone="teal">Direction 1 · Amplify</Pill>
          <h2 className="mt-4">Long-form → social</h2>
          <p className="mt-3 max-w-2xl text-dark-text-muted">
            One data-rich report becomes a week of platform-native posts — each native to its feed, each linking back,
            each compounding reach and SEO.
          </p>

          {/* Report anchor */}
          <div className="mt-8 rounded-2xl border border-teal/30 bg-dark-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-light">{A.article.kicker}</p>
            <h3 className="mt-2 font-heading text-2xl font-bold leading-snug">{A.article.title}</h3>
            <p className="mt-3 text-dark-text-muted"><span className="font-semibold text-dark-text">Why it landed: </span>{A.article.trigger}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {A.article.findings.map((f, i) => (
                <li key={i} className="flex gap-2 text-[0.95rem] leading-relaxed text-dark-text-muted">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-light" />{f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs italic text-dark-text-muted">{A.article.disclaimer}</p>
          </div>

          {/* Weekly rollout */}
          <h3 className="mt-12 font-heading text-xl font-semibold">The rollout — one report, five assets</h3>
          <div className="mt-6 space-y-4">
            {A.rollout.map((post, i) => (
              <div key={i} className="grid gap-4 rounded-2xl border border-dark-border bg-dark-surface p-5 md:grid-cols-[200px,1fr]">
                <div>
                  <p className="font-heading text-sm font-bold text-teal-light">{post.day}</p>
                  <p className="mt-1 text-sm font-medium text-dark-text">{post.format}</p>
                  <p className="mt-2 text-xs leading-relaxed text-dark-text-muted">{post.purpose}</p>
                </div>
                <p className="whitespace-pre-line border-t border-dark-border pt-4 text-[0.95rem] leading-relaxed text-dark-text md:border-l md:border-t-0 md:pl-5 md:pt-0">{post.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-dark-surface-alt p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-dark-text-muted">Results</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-dark-text-muted">{A.results}</p>
          </div>
        </div>
      </section>

      {/* Editorial standards */}
      <section>
        <div className="container-editorial py-14 md:py-20">
          <h2 className="text-2xl">Publisher standards, not promotion</h2>
          <p className="mt-3 max-w-3xl text-dark-text-muted">
            Cryptonews is a newsroom, not an exchange — so the bar is editorial, not promotional. Every post is reported,
            sourced and attributed; the live blog is timestamped and corrected in the open; sponsored content is clearly
            labelled; and coverage carries the standard &ldquo;informational only, not financial advice&rdquo; line.
            Crypto promotions on the site are not directed at UK consumers under the Financial Promotions Regime.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Verified sourcing & attribution", "Speed without sacrificing accuracy", "Timestamped updates & corrections", "Labelled sponsored content", "Not financial advice"].map((s) => (
              <span key={s} className="rounded-full border border-dark-border px-4 py-2 text-sm text-dark-text-muted">{s}</span>
            ))}
          </div>

          <p className="mt-12 border-t border-dark-border pt-6 text-xs leading-relaxed text-dark-text-muted">
            Built on real Cryptonews coverage. The report findings, article titles, bylines and publish/update times are accurate as published.
            Individual tweets and live-blog entries shown here are reconstructions of the workflow; exact wording, timestamps and engagement
            figures should be confirmed against the live posts. · <a className="text-teal-light hover:underline" href="https://hristinayordanova.com">hristinayordanova.com</a> · @HYordanova_
          </p>
        </div>
      </section>
    </article>
  );
}
