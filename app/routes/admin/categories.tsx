import { Link } from "react-router";
import type { Route } from "./+types/categories";
import { isAuthenticated } from "~/lib/auth";
import { getCategories, createCategory, deleteCategory, slugify } from "~/lib/db";

export function meta() {
  return [{ title: "Categories | Admin" }, { name: "robots", content: "noindex" }];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  if (!isAuthenticated(request)) {
    return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  }
  const env = (context as any).cloudflare.env;
  const categories = await getCategories(env.DB);
  return { categories };
}

export async function action({ request, context }: Route.ActionArgs) {
  if (!isAuthenticated(request)) {
    return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  }

  const env = (context as any).cloudflare.env;
  const formData = await request.formData();
  const intent = formData.get("intent")?.toString();

  if (intent === "create") {
    const name = formData.get("name")?.toString() || "";
    if (!name) return { error: "Category name is required" };
    try {
      await createCategory(env.DB, name, slugify(name));
    } catch (e: any) {
      return { error: e.message || "Failed to create category" };
    }
  }

  if (intent === "delete") {
    const id = parseInt(formData.get("id")?.toString() || "");
    if (!isNaN(id)) await deleteCategory(env.DB, id);
  }

  return { ok: true };
}

export default function AdminCategories({ loaderData, actionData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">&larr; Dashboard</Link>
            <h1 className="text-lg font-bold">Categories</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <form method="post" className="flex gap-3">
          <input type="hidden" name="intent" value="create" />
          <input
            type="text" name="name" required placeholder="New category name..."
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-teal focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-teal-light"
          />
          <button type="submit" className="rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark">
            Add
          </button>
        </form>

        {actionData?.error && (
          <p className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-300">{actionData.error}</p>
        )}

        <div className="mt-8 space-y-2">
          {categories.map((cat: any) => (
            <div key={cat.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{cat.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  /{cat.slug} · {cat.post_count || 0} posts
                </p>
              </div>
              <form method="post">
                <input type="hidden" name="intent" value="delete" />
                <input type="hidden" name="id" value={cat.id} />
                <button
                  type="submit"
                  onClick={(e) => { if (!confirm(`Delete "${cat.name}"?`)) e.preventDefault(); }}
                  className="text-xs text-red-500 hover:text-red-700 dark:text-red-400"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
