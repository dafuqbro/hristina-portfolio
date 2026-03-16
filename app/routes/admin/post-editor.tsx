import { Link } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/post-editor";
import { isAuthenticated } from "~/lib/auth";
import { createPost, updatePost, deletePost, getCategories, slugify } from "~/lib/db";

export function meta() {
  return [{ title: "Edit Post | Admin" }, { name: "robots", content: "noindex" }];
}

export async function loader({ request, params, context }: Route.LoaderArgs) {
  if (!isAuthenticated(request)) {
    return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  }

  const env = (context as any).cloudflare.env;
  const categories = await getCategories(env.DB);

  if (params.id === "new") {
    return { post: null, categories };
  }

  const postId = parseInt(params.id);
  if (isNaN(postId)) throw new Response("Invalid post ID", { status: 400 });

  const post = await env.DB.prepare(
    `SELECT p.*, c.name as category_name FROM posts p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?`
  ).bind(postId).first();

  if (!post) throw new Response("Post not found", { status: 404 });
  return { post, categories };
}

export async function action({ request, params, context }: Route.ActionArgs) {
  if (!isAuthenticated(request)) {
    return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  }

  const env = (context as any).cloudflare.env;
  const formData = await request.formData();
  const intent = formData.get("intent")?.toString();

  // Handle delete
  if (intent === "delete" && params.id !== "new") {
    await deletePost(env.DB, parseInt(params.id));
    return new Response(null, { status: 302, headers: { Location: "/admin" } });
  }

  // Handle save
  const title = formData.get("title")?.toString() || "";
  const slug = formData.get("slug")?.toString() || slugify(title);
  const excerpt = formData.get("excerpt")?.toString() || "";
  const content = formData.get("content")?.toString() || "";
  const featured_image = formData.get("featured_image")?.toString() || "";
  const category_id = formData.get("category_id")?.toString();
  const status = formData.get("status")?.toString() as "draft" | "published" || "draft";

  const postData = {
    title, slug, excerpt, content, featured_image,
    category_id: category_id ? parseInt(category_id) : undefined,
    status,
  };

  try {
    if (params.id === "new") {
      const newId = await createPost(env.DB, postData);
      return new Response(null, { status: 302, headers: { Location: `/admin/posts/${newId}` } });
    } else {
      await updatePost(env.DB, parseInt(params.id), postData);
      return { saved: true };
    }
  } catch (e: any) {
    return { error: e.message || "Failed to save post" };
  }
}

// Shared input class for consistent styling
const inputClass = "mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-teal focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-teal-light";
const selectClass = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100";
const labelClass = "block text-sm font-semibold text-gray-900 dark:text-gray-100";

export default function PostEditor({ loaderData, actionData }: Route.ComponentProps) {
  const { post, categories } = loaderData;
  const isNew = !post;

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "");
  const [categoryId, setCategoryId] = useState(post?.category_id?.toString() || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  function handleTitleChange(val: string) {
    setTitle(val);
    if (isNew || slug === slugify(post?.title || "")) {
      setSlug(slugify(val));
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.imageUrl) {
        setFeaturedImage(data.imageUrl);
      } else {
        setUploadError(data.error || "Upload failed");
      }
    } catch (e) {
      setUploadError("Network error during upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">&larr; All Posts</Link>
            <h1 className="text-lg font-bold">{isNew ? "New Post" : "Edit Post"}</h1>
          </div>
          {!isNew && post?.status === "published" && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm text-teal hover:underline dark:text-teal-light">
              View Live &rarr;
            </a>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {actionData?.saved && (
          <div className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Post saved successfully!
          </div>
        )}
        {actionData?.error && (
          <div className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-300">
            {actionData.error}
          </div>
        )}

        <form method="post" className="grid gap-8 lg:grid-cols-[1fr,300px]">
          {/* Main column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className={labelClass}>Title</label>
              <input
                type="text" id="title" name="title" value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required placeholder="Post title..."
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-xl font-semibold text-gray-900 transition-colors focus:border-teal focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-teal-light"
              />
            </div>

            <div>
              <label htmlFor="slug" className={labelClass}>Slug</label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">/blog/</span>
                <input
                  type="text" id="slug" name="slug" value={slug}
                  onChange={(e) => setSlug(e.target.value)} required
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-teal focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-teal-light"
                />
              </div>
            </div>

            <div>
              <label htmlFor="excerpt" className={labelClass}>Excerpt</label>
              <textarea
                id="excerpt" name="excerpt" value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)} rows={2}
                placeholder="Brief description for listings and SEO..."
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="content" className={labelClass}>
                Content <span className="font-normal text-gray-500 dark:text-gray-400">(HTML supported)</span>
              </label>
              <textarea
                id="content" name="content" value={content}
                onChange={(e) => setContent(e.target.value)} rows={20}
                placeholder="Write your post content here. HTML tags supported: <h2>, <p>, <ul>, <li>, <blockquote>, <a>, <strong>, <em>..."
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-mono text-sm leading-relaxed text-gray-900 transition-colors focus:border-teal focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-teal-light"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Publish</h3>
              <div className="mt-3 space-y-3">
                <select name="status" defaultValue={post?.status || "draft"} className={selectClass}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <button type="submit" name="intent" value="save" className="w-full rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-dark">
                  {isNew ? "Create Post" : "Save Changes"}
                </button>
                {!isNew && (
                  <button
                    type="submit" name="intent" value="delete"
                    onClick={(e) => { if (!confirm("Delete this post?")) e.preventDefault(); }}
                    className="w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    Delete Post
                  </button>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Category</h3>
              <select
                name="category_id" value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={"mt-2 " + selectClass}
              >
                <option value="">No category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Featured Image */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Featured Image</h3>
              <input type="hidden" name="featured_image" value={featuredImage} />

              {featuredImage ? (
                <div className="mt-3">
                  <img src={featuredImage} alt="Featured" className="w-full rounded-lg object-cover" />
                  <button type="button" onClick={() => setFeaturedImage("")} className="mt-2 text-xs text-red-600 hover:text-red-800 dark:text-red-400">
                    Remove image
                  </button>
                </div>
              ) : (
                <div className="mt-3">
                  <label className="flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-teal dark:border-gray-600 dark:hover:border-teal-light">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {uploading ? "Uploading..." : "Click to upload"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  </label>

                  {uploadError && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">{uploadError}</p>
                  )}

                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Or paste an image URL:</p>
                  <input
                    type="text" value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="https://..."
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              )}
            </div>

            {/* Post info */}
            {!isNew && post && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <p>Created: {new Date(post.created_at).toLocaleString()}</p>
                <p>Updated: {new Date(post.updated_at).toLocaleString()}</p>
                {post.published_at && <p>Published: {new Date(post.published_at).toLocaleString()}</p>}
                <p>Read time: {post.read_time || "—"}</p>
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
