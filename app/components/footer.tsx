import { Link } from "react-router";
import { SITE, PUBLICATIONS } from "~/lib/seo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-border bg-dark-surface-alt">
      <div className="container-editorial py-10">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <Link to="/" className="font-heading text-xl font-bold">
              Hristina Yordanova
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-dark-text-muted">
              Senior crypto editor &amp; content strategist. Shaping crypto
              media with AI-powered editorial workflows and on-chain data
              insights.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-dark-text-muted">
              Navigation
            </h4>
            <nav className="mt-4 flex flex-col gap-2" aria-label="Footer">
              {[
                ["About", "/about"],
                ["Blog", "/blog"],
                ["Work", "/work"],
                ["Clips", "/clips"],
                ["Contact", "/contact"],
              ].map(([label, path]) => (
                <Link
                  key={path}
                  to={path}
                  className="text-sm text-dark-text-muted transition-colors hover:text-teal"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Published at column */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-dark-text-muted">
              Published At
            </h4>
            <div className="mt-4 flex flex-col gap-2">
              {PUBLICATIONS.map((pub) => (
                <a
                  key={pub.name}
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-dark-text-muted transition-colors hover:text-teal"
                >
                  {pub.name} &rarr;
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-dark-border pt-6 text-center text-xs text-dark-text-muted">
          <p>&copy; {year} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
