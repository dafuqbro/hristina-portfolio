import { Fragment, useEffect } from "react";
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
      kicker: "Cryptonews · Report · On-chain data",
      title: "Germany Missed Out on $3.17B From Selling BTC Before the Rally",
      url: "cryptonews.com/reports/germany-missed-out-on-3-17b-from-selling-btc-before-the-rally",
      facts: [
        "Seized ~50,000 BTC from the Movie2K piracy network; sold 49,858 BTC by July 2024.",
        "Netted ~$2.89B at an average of about $57,900 per BTC.",
        "The sale was legally mandated \u2014 German law requires offloading volatile seized assets.",
        "By August 2025, with BTC above $122K, the stash would be worth ~$6B \u2014 a ~$3.17B miss.",
      ],
    },
    origin: {
      label: "Where it started",
      text: "A morning editorial call. Someone floated the \u201Cwhat if\u201D \u2014 imagine if Germany had simply held. With Bitcoin tagging new highs that day, the desk turned an offhand remark into a data assignment: calculate the miss, source every figure, ship it.",
    },
    // REAL tweet \u2014 @cryptonews, 12 Aug 2025
    tweet: {
      handle: "@cryptonews \u00B7 12 Aug 2025",
      body: "😕 Germany sold nearly 50,000 BTC in 2024 for $2.89B. Today, it would be worth around $6B \u2014 a $3B miss!\n\nWe dug into the data to see what happened and why.\n#Bitcoin #Germany",
      url: "https://x.com/cryptonews/status/1955243153654759800",
    },
    takeaway: "One sentence in a morning call \u2192 a sourced, on-chain data report \u2192 a post that travels. The desk doesn\u2019t just react to the timeline; it feeds it.",
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

/* ────────────────────────────────────────────────────────────────────────
   FLOW DIAGRAMS  ·  the hover/tap stages + shared panel
   ✏️ Per stage: set `shot` to an image path once you upload screenshots
      (e.g. "/work-assets/cs1-tweet.png" in /public/work-assets/), and refine
      `explanation` from your direction. `caption` is the short line on the card.
   ──────────────────────────────────────────────────────────────────────── */
const FLOWS: Record<"cs1" | "cs2", FlowDef> = {
  cs1: {
    eyebrow: "Hover or tap each stage",
    accent: "indigo",
    stages: [
      {
        key: "cs1-spark",
        icon: "☕",
        label: "The morning call",
        caption: "An offhand \u201Cwhat if\u201D",
        nextLabel: "becomes a brief",
        explanation:
          "It started as a throwaway line in the morning editorial call \u2014 imagine if Germany hadn\u2019t sold its seized Bitcoin. With BTC pushing new all-time highs that week, the \u201Cwhat if\u201D was suddenly a number worth calculating.",
      },
      {
        key: "cs1-dig",
        icon: "📊",
        label: "The data dig",
        caption: "We ran the on-chain numbers",
        nextLabel: "becomes a report",
        explanation:
          "We pulled the on-chain sale data \u2014 49,858 BTC offloaded in July 2024 at an average of about $57,900 \u2014 and worked out what it would be worth at the current price. The gap came to roughly $3 billion left on the table.",
      },
      {
        key: "cs1-report",
        icon: "📄",
        label: "The report",
        caption: "Sourced, data-driven story",
        nextLabel: "ships to the timeline",
        explanation:
          "The calculation became a published report: what Germany sold, why (a legal mandate to offload volatile seized assets fast), and the size of the miss \u2014 every figure sourced and dated.",
      },
      {
        key: "cs1-tweet",
        icon: "𝕏",
        label: "The tweet",
        caption: "Distributed on @cryptonews",
        // shot: "/work-assets/cs1-germany-tweet.png",
        explanation:
          "The report shipped to the timeline with one sharp stat \u2014 \u201Ca $3B miss\u201D \u2014 and a link. The morning-call aside had become a story thousands of people read.",
      },
    ],
  },
  cs2: {
    eyebrow: "Hover or tap each stage",
    accent: "teal",
    stages: [
      {
        key: "cs2-tweet",
        icon: "𝕏",
        label: "Launch thread",
        caption: "Report lands as a thread",
        nextLabel: "expands the depth in",
        explanation:
          "The report went out as a thread built to carry the whole argument — one tweet per crisis, the standout stat up front, the link to the full piece in the last post.",
      },
      {
        key: "cs2-long",
        icon: "📄",
        label: "Long-form report",
        caption: "The evergreen anchor",
        nextLabel: "re-cut vertical for",
        explanation:
          "The anchor: a data-rich report comparing gold, Bitcoin and the S&P across four crises. Evergreen, sourced and built to rank — the kind of piece you can amplify for weeks, not hours.",
      },
      {
        key: "cs2-tiktok",
        icon: "🎬",
        label: "TikTok",
        caption: "60-second verdict",
        explanation:
          "The findings became a 60-second vertical — three charts to a verdict — captioned for silent viewing and watermarked back to the report.",
      },
    ],
    branch: {
      key: "cs2-more",
      icon: "🧵",
      label: "More tweets",
      caption: "Loops back out as fresh social",
      fromLabel: "loops back out as",
      explanation:
        "The replies and questions the thread and video pulled in became the next round of posts — a poll, a stat card, a follow-up angle — feeding the cycle back to the top.",
    },
  },
};

// ✏️ Standalone tweet examples. Add `shot: "/work-assets/tweet-1.png"` per item.
// Real @cryptonews tweet embeds (X widgets.js renders these on the client).
// data-theme="dark" keeps them on-brand against the dark page.
const TWEET_EMBEDS = {
  germany: `<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">😕 Germany sold nearly 50,000 BTC in 2024 for $2.89B. Today, it would be worth around $6B — a $3B miss!<br>We dug into the data to see what happened and why.<a href="https://x.com/hashtag/Bitcoin?src=hash&amp;ref_src=twsrc%5Etfw">#Bitcoin</a> <a href="https://x.com/hashtag/Germany?src=hash&amp;ref_src=twsrc%5Etfw">#Germany</a><a href="https://t.co/WE3DwNUqcu">https://t.co/WE3DwNUqcu</a></p>&mdash; Cryptonews.com (@cryptonews) <a href="https://x.com/cryptonews/status/1955243153654759800?ref_src=twsrc%5Etfw">August 12, 2025</a></blockquote>`,
  others: [
    {
      key: "quantum",
      html: `<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">🚨 New podcast with Andrew Cheung, CEO of 01 <a href="https://x.com/01quantuminc?ref_src=twsrc%5Etfw">@01quantuminc</a><br><br>In this conversation, <a href="https://x.com/mattzahab?ref_src=twsrc%5Etfw">@mattzahab</a> and <a href="https://x.com/acheungquantum?ref_src=twsrc%5Etfw">@acheungquantum</a> discuss:<br><br>- The history of quantum computing<br>- Quantum's threat to crypto<br>- Building a quantum-safe crypto token<br><br>🔊 <a href="https://t.co/az78o1dNlX">https://t.co/az78o1dNlX</a> <a href="https://t.co/AaHBnbzCgh">pic.twitter.com/AaHBnbzCgh</a></p>&mdash; Cryptonews.com (@cryptonews) <a href="https://x.com/cryptonews/status/1954937872827461727?ref_src=twsrc%5Etfw">August 11, 2025</a></blockquote>`,
      note: "Podcast promo — a long interview packaged into a tight, scannable hook with the three reasons to listen up front.",
    },
    {
      key: "xrp-ai",
      html: `<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">🤖 ChatGPT's <a href="https://x.com/search?q=%24XRP&amp;src=ctag&amp;ref_src=twsrc%5Etfw">$XRP</a> analysis reveals perfect flag consolidation at $3.20 as SEC grants key Regulation D waiver, removing fundraising roadblocks, while Blue Origin accepts XRP payments.<a href="https://x.com/hashtag/XRP?src=hash&amp;ref_src=twsrc%5Etfw">#XRP</a> <a href="https://x.com/hashtag/ChatGPT?src=hash&amp;ref_src=twsrc%5Etfw">#ChatGPT</a><a href="https://t.co/aHJVWtHZsr">https://t.co/aHJVWtHZsr</a></p>&mdash; Cryptonews.com (@cryptonews) <a href="https://x.com/cryptonews/status/1955005650322497922?ref_src=twsrc%5Etfw">August 11, 2025</a></blockquote>`,
      note: "Riding a high-interest format — AI-driven price analysis — with a clear, sourced hook tying three real developments together.",
    },
  ],
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

function TweetEmbed({ html, note }: { html: string; note?: string }) {
  return (
    <div>
      <div className="[&_.twitter-tweet]:!my-0 [&_blockquote]:!mx-0" dangerouslySetInnerHTML={{ __html: html }} />
      {note && <p className="mt-3 text-xs leading-relaxed text-dark-text-muted">{note}</p>}
    </div>
  );
}

/* ── interactive flow (hover on desktop, tap on mobile; shared panel below) ── */

type Stage = {
  key: string;
  icon: string;
  label: string;
  caption: string;
  explanation: string;
  nextLabel?: string;
  fromLabel?: string;
  shot?: string;
};
type FlowDef = { eyebrow: string; accent: "teal" | "indigo"; stages: Stage[]; branch?: Stage };

function StageCard({ stage, accent }: { stage: Stage; accent: "teal" | "indigo" }) {
  const badge = accent === "indigo" ? "bg-indigo text-white" : "bg-teal text-white";
  return (
    <div className="flex-1 rounded-2xl border border-dark-border bg-dark-surface p-5">
      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-base font-bold ${badge}`}>{stage.icon}</span>
      <p className="mt-3 font-heading text-sm font-bold text-dark-text">{stage.label}</p>
      <p className="mt-1 text-xs leading-relaxed text-dark-text-muted">{stage.caption}</p>
    </div>
  );
}

function Connector({ label, accent }: { label?: string; accent: "teal" | "indigo" }) {
  const c = accent === "indigo" ? "text-indigo-light" : "text-teal-light";
  return (
    <div className="flex shrink-0 items-center justify-center py-1 md:w-28 md:flex-col md:py-0">
      {label && <span className={`mr-2 text-[0.7rem] font-semibold uppercase tracking-wide md:mr-0 md:mb-1 md:text-center ${c}`}>{label}</span>}
      <span className={`text-xl ${c}`}>
        <span className="md:hidden">↓</span>
        <span className="hidden md:inline">→</span>
      </span>
    </div>
  );
}

function Flow({ flow }: { flow: FlowDef }) {
  const branchAccent = flow.accent === "indigo" ? "text-indigo-light" : "text-teal-light";
  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row md:items-stretch">
        {flow.stages.map((s, i) => (
          <Fragment key={s.key}>
            <StageCard stage={s} accent={flow.accent} />
            {i < flow.stages.length - 1 && <Connector label={s.nextLabel} accent={flow.accent} />}
          </Fragment>
        ))}
      </div>

      {flow.branch && (
        <div className="md:flex md:justify-end">
          <div className="md:w-[62%]">
            <div className={`flex items-center gap-2 py-2 text-[0.7rem] font-semibold uppercase tracking-wide ${branchAccent}`}>
              <span className="text-xl">↘</span>
              <span>{flow.branch.fromLabel}</span>
            </div>
            <StageCard stage={flow.branch} accent={flow.accent} />
          </div>
        </div>
      )}
    </div>
  );
}

function TweetsGrid() {
  return (
    <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
      {TWEET_EMBEDS.others.map((t) => (
        <TweetEmbed key={t.key} html={t.html} note={t.note} />
      ))}
    </div>
  );
}

export default function FlywheelCaseStudy() {
  const { reactive: R, amplify: A } = DATA;

  useEffect(() => {
    const run = () => (window as unknown as { twttr?: { widgets?: { load?: () => void } } }).twttr?.widgets?.load?.();
    const existing = document.getElementById("x-widgets-js");
    if (existing) {
      run();
      return;
    }
    const s = document.createElement("script");
    s.id = "x-widgets-js";
    s.src = "https://platform.x.com/widgets.js";
    s.async = true;
    s.charset = "utf-8";
    s.onload = run;
    document.body.appendChild(s);
  }, []);

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
          <Pill tone="indigo">Case study 1 · Reactive → long-form</Pill>
          <h2 className="mt-4">From a morning call to a data story</h2>
          <p className="mt-3 max-w-2xl text-dark-text-muted">
            Sometimes the story starts at the desk, not in the feed. This one began as an offhand &ldquo;what if&rdquo;
            in the morning editorial call, became a sourced, on-chain data report, and shipped to the timeline.
          </p>

          <Flow flow={FLOWS.cs1} />

          {/* Report anchor + origin + real tweet */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-2xl border border-indigo/30 bg-dark-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-light">{R.article.kicker}</p>
              <h3 className="mt-2 font-heading text-2xl font-bold leading-snug">{R.article.title}</h3>
              <ul className="mt-5 space-y-2">
                {R.article.facts.map((f, i) => (
                  <li key={i} className="flex gap-2 text-[0.95rem] leading-relaxed text-dark-text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-light" />{f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 break-all text-xs text-teal-light">{R.article.url}</p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-dark-border bg-dark-surface-alt p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-light">{R.origin.label}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-dark-text-muted">{R.origin.text}</p>
              </div>
              <TweetEmbed html={TWEET_EMBEDS.germany} />
            </div>
          </div>

          {/* Takeaway */}
          <div className="mt-8 rounded-2xl bg-dark-surface-alt p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-light">↺ What it shows</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-dark-text-muted">{R.takeaway}</p>
          </div>
        </div>
      </section>

      {/* ===================== DIRECTION 1 — AMPLIFY ===================== */}
      <section className="border-b border-dark-border">
        <div className="container-editorial py-14 md:py-20">
          <Pill tone="teal">Case study 2 · Long-form → social</Pill>
          <h2 className="mt-4">Long-form → social</h2>
          <p className="mt-3 max-w-2xl text-dark-text-muted">
            One data-rich report becomes a week of platform-native posts — each native to its feed, each linking back,
            each compounding reach and SEO.
          </p>

          <Flow flow={FLOWS.cs2} />

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

      {/* Tweets in the wild */}
      <section className="border-b border-dark-border">
        <div className="container-editorial py-14 md:py-20">
          <h2 className="text-2xl">Tweets in the wild</h2>
          <p className="mt-3 max-w-2xl text-dark-text-muted">
            A few more from the @cryptonews timeline — showing range across formats, from podcast promos to AI-angle market news.
          </p>
          <TweetsGrid />
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
