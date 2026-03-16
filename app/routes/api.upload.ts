import type { Route } from "./+types/api.upload";

export async function action({ request, context }: Route.ActionArgs) {
  // Auth check — look for admin cookie
  const cookie = request.headers.get("Cookie") || "";
  if (!cookie.includes("admin_auth=1")) {
    // Also check referer as fallback — only allow uploads from admin pages
    const referer = request.headers.get("Referer") || "";
    if (!referer.includes("/admin")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const env = (context as any).cloudflare.env;

  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file || file.size === 0) {
      return Response.json({ error: "No file selected" });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: "Invalid file type. Use JPG, PNG, WebP, or GIF." });
    }

    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: "File too large. Maximum 5MB." });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const key = `blog/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();

    await env.IMAGES.put(key, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    });

    return Response.json({ imageUrl: `/images/${key}` });
  } catch (e: any) {
    console.error("Upload error:", e);
    return Response.json({ error: "Upload failed: " + (e.message || "unknown error") });
  }
}
