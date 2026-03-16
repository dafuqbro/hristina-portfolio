import type { Route } from "./+types/images";

export async function loader({ params, context }: Route.LoaderArgs) {
  const env = (context as any).cloudflare.env;
  const key = params["*"];

  if (!key) {
    throw new Response("Not found", { status: 404 });
  }

  const object = await env.IMAGES.get(key);
  if (!object) {
    throw new Response("Image not found", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", object.httpMetadata?.contentType || "image/jpeg");
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
