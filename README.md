# hristinayordanova.com

Personal portfolio website built with **React Router 7** and deployed on **Cloudflare Workers**..

## Tech Stack

- **Framework**: React Router 7 (framework mode with SSR)
- **Styling**: Tailwind CSS v4
- **Runtime**: Cloudflare Workers (edge SSR at 300+ locations)
- **Fonts**: Playfair Display + DM Sans
- **CI/CD**: GitHub Actions → Cloudflare Workers

## Local Development

```bash
npm install
npm run dev
```

## Deployment

Pushes to `main` auto-deploy via GitHub Actions. You need two GitHub Secrets configured:

- `CLOUDFLARE_API_TOKEN` — Create at Cloudflare Dashboard → My Profile → API Tokens → "Edit Cloudflare Workers" template
- `CLOUDFLARE_ACCOUNT_ID` — Found in Cloudflare Dashboard sidebar

## Project Structure

```
app/
├── root.tsx                 # HTML shell, fonts, theme
├── routes.ts                # Route configuration
├── app.css                  # Tailwind + design tokens
├── components/
│   ├── header.tsx           # Navigation + dark mode toggle
│   └── footer.tsx           # Footer with links
├── layouts/
│   └── main-layout.tsx      # Header + Main + Footer wrapper
├── lib/
│   ├── seo.ts               # Meta tags, JSON-LD schemas
│   └── use-theme.ts         # Dark mode hook
├── routes/
│   ├── home.tsx             # Homepage (targets "crypto expert")
│   ├── about.tsx            # Bio + timeline (E-E-A-T hub)
│   ├── crypto-editor.tsx    # SEO landing page
│   ├── crypto-writer.tsx    # SEO landing page
│   ├── blog.tsx             # Blog listing
│   ├── blog-post.tsx        # Individual blog post
│   ├── work.tsx             # Case studies listing
│   ├── work-post.tsx        # Individual case study
│   ├── clips.tsx            # Published work (filterable)
│   ├── contact.tsx          # Contact form
│   ├── sitemap[.]xml.ts     # Dynamic sitemap
│   └── robots[.]txt.ts      # Robots.txt
└── content/
    ├── blog/                # Markdown blog posts (future)
    └── work/                # Markdown case studies (future)
workers/
└── app.ts                   # Cloudflare Worker entry point
```
