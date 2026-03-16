import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  // Public pages
  layout("./layouts/main-layout.tsx", [
    index("./routes/home.tsx"),
    route("about", "./routes/about.tsx"),
    route("crypto-editor", "./routes/crypto-editor.tsx"),
    route("crypto-writer", "./routes/crypto-writer.tsx"),
    route("blog", "./routes/blog.tsx"),
    route("blog/:slug", "./routes/blog-post.tsx"),
    route("work", "./routes/work.tsx"),
    route("work/:slug", "./routes/work-post.tsx"),
    route("clips", "./routes/clips.tsx"),
    route("contact", "./routes/contact.tsx"),
  ]),

  // Admin panel (no main layout)
  route("admin/login", "./routes/admin/login.tsx"),
  route("admin", "./routes/admin/index.tsx"),
  route("admin/posts/:id", "./routes/admin/post-editor.tsx"),
  route("admin/categories", "./routes/admin/categories.tsx"),

  // API & utility routes
  route("api/upload", "./routes/api.upload.ts"),
  route("images/*", "./routes/images.ts"),
  route("sitemap.xml", "./routes/sitemap[.]xml.ts"),
  route("robots.txt", "./routes/robots[.]txt.ts"),
] satisfies RouteConfig;
