import { Link } from "react-router";
import type { Route } from "./+types/index";
import { isAuthenticated } from "~/lib/auth";
import { getAllPosts } from "~/lib/db";

export function meta() {
  return [{ title: "Admin Dashboard | Hristina Yordanova" }, { name: "robots", content: "noindex" }];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  if (!isAuthenticated(request)) {
    return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  }
  const env = (context as any).cloudflare.env;
  const posts = await getAllPosts(env.DB);
  return { posts };
}

export default function AdminDashboard({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">&larr; View Site</Link>
            <h1 className="text-lg font-bold">Blog Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/categories" className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
              Categories
            </Link>
            <Link to="/admin/posts/new" className="rounded-lg bg-teal px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-teal-dark">
              New Post
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-xl font-semibold">All Posts ({posts.length})</h2>

        {posts.length === 0 ? (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
            <Link to="/admin/posts/new" className="mt-4 inline-block rounded-lg bg-teal px-6 py-2 text-sm font-semibold text-white hover:bg-teal-dark">
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                to={`/admin/posts/${post.id}`}
                className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-teal hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-teal-light"
              >
                <div className="flex items-center gap-4">
                  {post.featured_image ? (
                    <img src={post.featured_image} alt="" className="h-12 w-16 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400 dark:bg-gray-800 dark:text-gray-500">No img</div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-teal dark:text-gray-100 dark:group-hover:text-teal-light">{post.title}</h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      {post.category_name && <span>{post.category_name}</span>}
                      {post.category_name && <span>·</span>}
                      <span>{post.read_time} read</span>
                      <span>·</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  post.status === "published"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                }`}>
                  {post.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
