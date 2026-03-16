/** Check admin authentication via cookie */
export function isAuthenticated(request: Request): boolean {
  const cookie = request.headers.get("Cookie") || "";
  return cookie.includes("admin_auth=1");
}

/** Create auth cookie */
export function createAuthCookie(): string {
  return "admin_auth=1; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800";
}

/** Clear auth cookie */
export function clearAuthCookie(): string {
  return "admin_auth=1; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0";
}

/** Redirect to login if not authenticated */
export function requireAuth(request: Request): Response | null {
  if (!isAuthenticated(request)) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }
  return null;
}
