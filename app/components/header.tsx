import { Link, useLocation } from "react-router";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Work", path: "/work" },
  { label: "Clips", path: "/clips" },
  { label: "Contact", path: "/contact" },
] as const;

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-dark-border bg-dark-bg/90 backdrop-blur-lg">
      <div className="container-editorial flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal font-heading text-sm font-bold text-white transition-colors group-hover:bg-teal-dark">
            HY
          </span>
          <span className="hidden font-heading text-lg font-semibold sm:block">
            Hristina Yordanova
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_ITEMS.map(({ label, path }) => {
            const isActive = location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-dark-surface-alt text-teal-light"
                    : "text-dark-text-muted hover:text-dark-text"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg md:hidden" aria-label="Toggle menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-dark-border bg-dark-bg p-4 md:hidden">
          {NAV_ITEMS.map(({ label, path }) => (
            <Link key={path} to={path} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-3 text-sm font-medium text-dark-text-muted hover:bg-dark-surface-alt">
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
