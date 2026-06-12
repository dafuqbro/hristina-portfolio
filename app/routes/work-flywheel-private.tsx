import { Fragment, useEffect } from "react";
import { pageMeta } from "~/lib/seo";

/* Unlisted case study · /work/dasdhjsfdhnasbj
   noindex, not in nav / work grid / sitemap. Anyone with the link can view — treat the URL like a password. */

const DATA = {
  preparedFor: "Private preview", // e.g. "Prepared for the Revolut hiring team"

  // ===== CASE STUDY 1 — REACTIVE → LONG-FORM (the Germany report) =====
  reactive: {
    article: {

      kicker: "Cryptonews · Report · On-chain data",
      title: "Germany Missed Out on $3.17B From Selling BTC Before the Rally",
      url: "https://cryptonews.com/reports/germany-missed-out-on-3-17b-from-selling-btc-before-the-rally/",
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
   
    tweet: {
      handle: "@cryptonews \u00B7 12 Aug 2025",
      body: "😕 Germany sold nearly 50,000 BTC in 2024 for $2.89B. Today, it would be worth around $6B \u2014 a $3B miss!\n\nWe dug into the data to see what happened and why.\n#Bitcoin #Germany",
      url: "https://x.com/cryptonews/status/1955243153654759800",
    },
    takeaway: "One sentence in a morning call \u2192 a sourced, on-chain data report \u2192 a post that travels. The desk doesn\u2019t just react to the timeline; it feeds it.",
  },

  // ===== CASE STUDY 2 — LONG-FORM → SOCIAL (the weekly podcast) =====
  amplify: {
    article: {
      kicker: "Cryptonews Weekly · podcast \u2192 thread",
      title: "The week, in one listen \u2014 then one thread",
      intro:
        "Cryptonews Weekly turns the week\u2019s crypto news into a podcast: gather what moved, write the script, record the episode with the hosts. When it\u2019s live, the same edit becomes a thread \u2014 each story a tight summary that links back to the full article.",
      covered: [
        "Trump pledges a US \u201CStrategic Bitcoin Reserve\u201D",
        "The Fed holds rates \u2014 its eighth straight pause",
        "California puts vehicle titles on Avalanche",
        "Mt. Gox moves another $2.5B in Bitcoin",
        "Solana surges 23.5% in July on ETF speculation",
        "Tether reports a record $5.2B H1 profit",
        "Web3 projects ride the Paris Olympics",
        "Senator Lummis revives her Bitcoin-reserve plan",
      ],
      threadUrl: "https://x.com/cryptonews/status/1820480319146938777",
    },
    takeaway:
      "A week of scattered headlines \u2192 a scripted episode \u2192 one scannable thread that feeds the site. Synthesis, not just amplification: many inputs distilled into one piece people actually finish \u2014 in audio and on the timeline.",
  },
};

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
        explanation: "A throwaway \u201Cwhat if\u201D in the editorial call: imagine Germany hadn\u2019t sold its seized Bitcoin.",
      },
      {
        key: "cs1-dig",
        icon: "📊",
        label: "The data dig",
        caption: "We ran the on-chain numbers",
        nextLabel: "becomes a report",
        explanation: "Pull the on-chain sale data and calculate the gap at today\u2019s price \u2014 roughly $3B left on the table.",
      },
      {
        key: "cs1-report",
        icon: "📄",
        label: "The report",
        caption: "Sourced, data-driven story",
        nextLabel: "ships to the timeline",
        explanation: "Write it up as a sourced, dated report: what was sold, why, and the size of the miss.",
      },
      {
        key: "cs1-tweet",
        icon: "𝕏",
        label: "The tweet",
        caption: "Distributed on @cryptonews",
        explanation: "Ship it to the timeline with one sharp stat and a link back to the full piece.",
      },
    ],
  },
  cs2: {
    eyebrow: "Hover or tap each stage",
    accent: "teal",
    stages: [
      {
        key: "cs2-news",
        icon: "🗞️",
        label: "The week's news",
        caption: "Track what moved",
        nextLabel: "shaped into a",
        explanation: "Track everything that moved across the week and decide what actually matters.",
      },
      {
        key: "cs2-script",
        icon: "✍️",
        label: "The script",
        caption: "Written for the ear",
        nextLabel: "recorded as",
        explanation: "Shape the standout stories into a tight spoken-word script \u2014 not an article, a conversation.",
      },
      {
        key: "cs2-episode",
        icon: "🎙️",
        label: "The episode",
        caption: "Cryptonews Weekly",
        nextLabel: "reshared as",
        explanation: "Record it as Cryptonews Weekly with the hosts \u2014 the week, digested in one listen.",
      },
      {
        key: "cs2-thread",
        icon: "🧵",
        label: "The thread",
        caption: "Each story links out",
        explanation: "Once it\u2019s live, reshare as a thread \u2014 each story a summary that links back to the full coverage.",
      },
    ],
  },
};

// Real @cryptonews tweet embeds (X widgets.js renders these on the client).
// data-theme="dark" keeps them on-brand against the dark page.
const TWEET_EMBEDS = {
  germany: `<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">😕 Germany sold nearly 50,000 BTC in 2024 for $2.89B. Today, it would be worth around $6B — a $3B miss!<br>We dug into the data to see what happened and why.<a href="https://x.com/hashtag/Bitcoin?src=hash&amp;ref_src=twsrc%5Etfw">#Bitcoin</a> <a href="https://x.com/hashtag/Germany?src=hash&amp;ref_src=twsrc%5Etfw">#Germany</a><a href="https://t.co/WE3DwNUqcu">https://t.co/WE3DwNUqcu</a></p>&mdash; Cryptonews.com (@cryptonews) <a href="https://x.com/cryptonews/status/1955243153654759800?ref_src=twsrc%5Etfw">August 12, 2025</a></blockquote>`,
  dailyBrief: `<blockquote class="twitter-tweet" data-theme="dark"><a href="https://x.com/cryptonews/status/1820480319146938777"></a></blockquote>`,
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
      <p className="mt-1.5 text-xs leading-relaxed text-dark-text-muted">{stage.explanation}</p>
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
            examples from the <strong className="text-dark-text">@cryptonews</strong> account, both real: one where a
            newsroom spark became a sourced data report, and one where a week of news became a podcast — and then a
            single thread.
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
          <p className="mt-4 max-w-2xl border-l-2 border-indigo pl-4 text-sm font-medium text-dark-text">
            The skill on show: reactive editorial judgment &mdash; turning a passing market moment into sourced, original depth.
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
              <a href={R.article.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-teal-light hover:underline">Read the full report &rarr;</a>
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
          <h2 className="mt-4">From a week of news to a podcast</h2>
          <p className="mt-3 max-w-2xl text-dark-text-muted">
            {A.article.intro}
          </p>
          <p className="mt-4 max-w-2xl border-l-2 border-teal pl-4 text-sm font-medium text-dark-text">
            The skill on show: editorial synthesis &mdash; turning a week of fragmented news into one piece people actually finish, in two formats.
          </p>

          <Flow flow={FLOWS.cs2} />

          {/* Brief anchor + thread embed */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
            <div className="rounded-2xl border border-teal/30 bg-dark-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-light">{A.article.kicker}</p>
              <h3 className="mt-2 font-heading text-2xl font-bold leading-snug">{A.article.title}</h3>
              <p className="mt-4 text-sm font-semibold text-dark-text">What that week's episode covered</p>
              <ul className="mt-3 space-y-2">
                {A.article.covered.map((c, i) => (
                  <li key={i} className="flex gap-2 text-[0.95rem] leading-relaxed text-dark-text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-light" />{c}
                  </li>
                ))}
              </ul>
              <a href={A.article.threadUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-teal-light hover:underline">View the thread on X &rarr;</a>
            </div>

            <div>
              <TweetEmbed html={TWEET_EMBEDS.dailyBrief} />
            </div>
          </div>

          {/* Takeaway */}
          <div className="mt-8 rounded-2xl bg-dark-surface-alt p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-light">↺ What it shows</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-dark-text-muted">{A.takeaway}</p>
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
            sourced and attributed; rolling coverage is timestamped and corrected in the open; sponsored content is clearly
            labelled; and coverage carries the standard &ldquo;informational only, not financial advice&rdquo; line.
            Crypto promotions on the site are not directed at UK consumers under the Financial Promotions Regime.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Verified sourcing & attribution", "Speed without sacrificing accuracy", "Timestamped updates & corrections", "Labelled sponsored content", "Not financial advice"].map((s) => (
              <span key={s} className="rounded-full border border-dark-border px-4 py-2 text-sm text-dark-text-muted">{s}</span>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
