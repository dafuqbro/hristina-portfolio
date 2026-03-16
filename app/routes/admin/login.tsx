import type { Route } from "./+types/login";

export function meta() {
  return [{ title: "Admin Login | Hristina Yordanova" }, { name: "robots", content: "noindex" }];
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const password = formData.get("password")?.toString();
  const env = (context as any).cloudflare.env;

  if (password === env.ADMIN_PASSWORD) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/admin",
        "Set-Cookie": "admin_auth=1; Path=/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=604800",
      },
    });
  }

  return { error: "Invalid password" };
}

export default function AdminLogin({ actionData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Admin Login</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Enter your admin password to continue.</p>

        <form method="post" className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900 dark:text-gray-100">Password</label>
            <input
              type="password" id="password" name="password" required autoFocus
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-teal focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-teal-light"
            />
          </div>

          {actionData?.error && (
            <p className="rounded-lg bg-red-100 px-4 py-2 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-300">{actionData.error}</p>
          )}

          <button type="submit" className="w-full rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
