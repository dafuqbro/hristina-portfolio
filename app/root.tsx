import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";

import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Fonts: Sora for headings, DM Sans for body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-teal-light">{error.status}</h1>
          <p className="mt-4 text-xl text-dark-text-muted">
            {error.status === 404 ? "Page not found" : error.statusText}
          </p>
          <a
            href="/"
            className="mt-8 inline-block rounded-lg bg-teal px-6 py-3 text-white transition-colors hover:bg-teal-dark"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p className="mt-4 text-dark-text-muted">Please try refreshing the page.</p>
      </div>
    </div>
  );
}
