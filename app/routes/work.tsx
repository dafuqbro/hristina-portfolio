import { Link } from "react-router";
import { pageMeta, getBreadcrumbSchema, SITE } from "~/lib/seo";
const CASE_STUDIES = [
  {
    slug: "scaling-editorial-with-ai",
    title: "Scaling Editorial Output 2.5× with AI Workflows",
    subtitle: "How automation and prompt engineering transformed a crypto newsroom",
    gradient: "from-teal to-cyan-400",
    icon: "🤖",
    metrics: [
      { value: "2.5×", label: "Output increase" },
      { value: "40%", label: "Faster publishing" },
      { value: "15+", label: "Writers managed" },
    ],
    tags: ["n8n Automation", "Prompt Engineering", "Editorial QA"],
  },
  {
    slug: "seo-to-google-discover",
    title: "From Zero to Google Discover in 90 Days",
    subtitle: "A systematic SEO strategy for crypto publications",
    gradient: "from-indigo to-violet-400",
    icon: "🚀",
    metrics: [
      { value: "3-5×", label: "Discover traffic" },
      { value: "90", label: "Days to results" },
      { value: "Top 10", label: "Discover publisher" },
    ],
    tags: ["Google Discover", "Technical SEO", "Content Cadence"],
  },
  {
    slug: "eeat-ymyl-compliance",
    title: "How E-E-A-T Compliance Transformed YMYL Rankings",
    subtitle: "Building trust signals that Google rewards in the crypto space",
    gradient: "from-rose-500 to-red-400",
    icon: "🛡️",
    metrics: [
      { value: "73%", label: "Ranking improvement" },
      { value: "4", label: "E-E-A-T pillars" },
      { value: "YMYL", label: "Compliant" },
    ],
    tags: ["E-E-A-T", "Schema Markup", "Author Authority"],
  },
  {
    slug: "content-strategy-framework",
    title: "Content Strategy Framework for Crypto Publications",
    subtitle: "The system behind producing 100+ articles per week that rank",
    gradient: "from-amber-500 to-orange-400",
    icon: "📐",
    metrics: [
      { value: "100+", label: "Articles per week" },
      { value: "6", label: "Content pillars" },
      { value: "∞", label: "Scalable" },
    ],
    tags: ["Topic Clusters", "Editorial Calendar", "Content Ops"],
  },
];
export function meta() {
  return [
    ...pageMeta({
      title: "Work & Case Studies | Hristina Yordanova — Crypto Editorial Strategies",
      description: "Interactive case studies: AI editorial workflows, Google Discover SEO strategy, E-E-A-T compliance for crypto, and content strategy frameworks. Real strategies, real results.",
      path: "/work",
    }),
    { "script:ld+json": getBreadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "Work", url: `${SITE.url}/work` }]) },
  ];
}
export default function Work() {
  return (
    <section className="container-editorial py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">Work</p>
        <h1 className="mt-4">Case Studies</h1>
        <p className="mt-4 text-dark-text-muted">
          Interactive deep-dives into the strategies and systems I&apos;ve built across 7+ years in crypto media. Click through to explore flowcharts, data visualizations, and step-by-step walkthroughs.
        </p>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {CASE_STUDIES.map((study, i) => (
          <Link
            key={study.slug}
            to={`/work/${study.slug}`}
            className="card-lift group relative overflow-hidden rounded-2xl border border-dark-border bg-dark-surface"
          >
            {/* Gradient header with title */}
            <div className={`relative flex items-end bg-gradient-to-br ${study.gradient} p-6 pb-8`} style={{ minHeight: "160px" }}>
              <div>
                <span className="text-3xl">{study.icon}</span>
                <h2 className="mt-2 font-heading text-xl font-bold leading-snug text-white drop-shadow-sm">
                  {study.title}
                </h2>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-dark-surface" />
            </div>
            {/* Content */}
            <div className="p-6 pt-4">
              <p className="text-[0.935rem] text-dark-text-muted">
                {study.subtitle}
              </p>
              {/* Metrics bar */}
              <div className="mt-5 flex gap-6">
                {study.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className={`text-lg font-bold bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                      {m.value}
                    </div>
                    <div className="text-xs text-dark-text-muted">{m.label}</div>
                  </div>
                ))}
              </div>
              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-dark-surface-alt px-2.5 py-1 text-xs font-medium text-dark-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-colors group-hover:text-teal-dark">
                Explore Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
