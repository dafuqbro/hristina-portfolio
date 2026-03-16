import { Link } from "react-router";
import type { Route } from "./+types/work-post";
import { pageMeta, getBreadcrumbSchema, SITE } from "~/lib/seo";
import { AIWorkflowsCaseStudy } from "~/components/case-studies/ai-workflows";
import { SEODiscoverCaseStudy } from "~/components/case-studies/seo-discover";
import { EEATCaseStudy } from "~/components/case-studies/eeat-compliance";
import { ContentStrategyCaseStudy } from "~/components/case-studies/content-strategy";

const STUDIES: Record<string, { title: string; description: string; Component: React.ComponentType }> = {
  "scaling-editorial-with-ai": {
    title: "Scaling Editorial Output 2.5× with AI Workflows",
    description: "How automation and prompt engineering transformed a crypto newsroom — an interactive walkthrough of the systems, tools, and results.",
    Component: AIWorkflowsCaseStudy,
  },
  "seo-to-google-discover": {
    title: "From Zero to Google Discover in 90 Days",
    description: "A systematic SEO strategy for crypto publications — interactive timeline, before/after metrics, and the exact playbook.",
    Component: SEODiscoverCaseStudy,
  },
  "eeat-ymyl-compliance": {
    title: "How E-E-A-T Compliance Transformed YMYL Rankings",
    description: "Building trust signals that Google rewards in the crypto space — explore each pillar with interactive examples.",
    Component: EEATCaseStudy,
  },
  "content-strategy-framework": {
    title: "Content Strategy Framework for Crypto Publications",
    description: "The system behind producing 100+ articles per week that rank — interactive content pillars, workflow diagrams, and scaling playbook.",
    Component: ContentStrategyCaseStudy,
  },
};

export function loader({ params }: Route.LoaderArgs) {
  const study = STUDIES[params.slug];
  if (!study) throw new Response("Not Found", { status: 404 });
  return { slug: params.slug, title: study.title, description: study.description };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Case Study Not Found" }];
  return [
    ...pageMeta({ title: `${data.title} | Hristina Yordanova`, description: data.description, path: `/work/${data.slug}` }),
    { "script:ld+json": getBreadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "Work", url: `${SITE.url}/work` }, { name: data.title, url: `${SITE.url}/work/${data.slug}` }]) },
  ];
}

export default function WorkPost({ loaderData }: Route.ComponentProps) {
  const study = STUDIES[loaderData.slug];
  if (!study) return null;
  const { Component } = study;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-editorial pt-8">
        <nav className="text-sm text-dark-text-muted" aria-label="Breadcrumb">
          <Link to="/" className="link-underline hover:text-teal-light">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/work" className="link-underline hover:text-teal-light">Work</Link>
          <span className="mx-2">/</span>
          <span className="text-dark-text">{study.title}</span>
        </nav>
      </div>

      {/* Case study component */}
      <Component />

      {/* CTA */}
      <section className="container-editorial pb-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-dark-border bg-dark-surface-alt p-8 text-center">
          <h3 className="font-heading text-xl font-bold">Want to implement these strategies?</h3>
          <p className="mt-2 text-dark-text-muted">I help crypto publications build editorial systems that scale.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-dark">Get in Touch</Link>
            <Link to="/work" className="rounded-lg border border-dark-border px-6 py-3 text-sm font-semibold hover:border-teal hover:text-teal">View All Case Studies</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
