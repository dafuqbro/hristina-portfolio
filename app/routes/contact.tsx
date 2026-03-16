import { pageMeta, getBreadcrumbSchema, SITE } from "~/lib/seo";

export function meta() {
  return [
    ...pageMeta({
      title: "Contact | Hristina Yordanova — Hire a Crypto Editor & Writer",
      description: "Get in touch to discuss crypto editorial projects, content strategy consulting, or full-time editorial leadership opportunities.",
      path: "/contact",
    }),
    { "script:ld+json": getBreadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "Contact", url: `${SITE.url}/contact` }]) },
  ];
}

export default function Contact() {
  return (
    <section className="container-editorial py-20 md:py-28">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">Contact</p>
        <h1 className="mt-4">Let&apos;s Talk</h1>
        <p className="mt-4 text-lg text-dark-text-muted">
          Whether you need a crypto editor, content strategist, or writer — or you&apos;re hiring for a senior editorial role — I&apos;d love to hear from you.
        </p>

        <div className="mt-12 space-y-8">
          {/* Email — primary CTA */}
          <a
            href="mailto:contact@hristinayordanova.com"
            className="group block rounded-xl border border-dark-border bg-dark-surface p-6 transition-all hover:border-teal hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold transition-colors group-hover:text-teal-light">Email</h3>
                <p className="mt-0.5 font-medium text-teal-light">contact@hristinayordanova.com</p>
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/hristinayordanova/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-dark-border bg-dark-surface p-6 transition-all hover:border-teal hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold transition-colors group-hover:text-teal-light">LinkedIn</h3>
                <p className="mt-0.5 font-medium text-teal-light">linkedin.com/in/hristinayordanova &rarr;</p>
              </div>
            </div>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com/HYordanova_"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-dark-border bg-dark-surface p-6 transition-all hover:border-teal hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold transition-colors group-hover:text-teal-light">X (Twitter)</h3>
                <p className="mt-0.5 font-medium text-teal-light">@HYordanova_ &rarr;</p>
              </div>
            </div>
          </a>

          {/* Available for */}
          <div className="rounded-xl border border-dark-border bg-dark-surface-alt p-6">
            <h3 className="font-heading text-lg font-semibold">Available For</h3>
            <ul className="mt-4 space-y-3 text-[0.935rem] text-dark-text-muted">
              <li className="flex items-start gap-2.5"><span className="mt-0.5 text-teal-light">•</span> Full-time editorial leadership roles</li>
              <li className="flex items-start gap-2.5"><span className="mt-0.5 text-teal-light">•</span> Freelance crypto writing &amp; editing</li>
              <li className="flex items-start gap-2.5"><span className="mt-0.5 text-teal-light">•</span> Content strategy consulting</li>
              <li className="flex items-start gap-2.5"><span className="mt-0.5 text-teal-light">•</span> AI editorial workflow implementation</li>
              <li className="flex items-start gap-2.5"><span className="mt-0.5 text-teal-light">•</span> Speaking &amp; panel appearances</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
