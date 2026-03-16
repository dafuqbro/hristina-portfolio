/** Types */
export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category_id: number | null;
  category_name?: string;
  category_slug?: string;
  status: "draft" | "published";
  author_name: string;
  author_title: string;
  read_time: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  post_count?: number;
}

type D1Database = {
  prepare: (query: string) => D1PreparedStatement;
  exec: (query: string) => Promise<unknown>;
};

type D1PreparedStatement = {
  bind: (...values: unknown[]) => D1PreparedStatement;
  all: <T = unknown>() => Promise<{ results: T[] }>;
  first: <T = unknown>() => Promise<T | null>;
  run: () => Promise<{ meta: { last_row_id: number; changes: number } }>;
};

/** Helper to estimate read time */
function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 230));
  return `${minutes} min`;
}

/** Slugify a title */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ─── Posts ───

export async function getPublishedPosts(db: D1Database, limit = 50, offset = 0): Promise<Post[]> {
  const { results } = await db
    .prepare(
      `SELECT p.*, c.name as category_name, c.slug as category_slug 
       FROM posts p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.status = 'published' 
       ORDER BY p.published_at DESC 
       LIMIT ? OFFSET ?`
    )
    .bind(limit, offset)
    .all<Post>();
  return results;
}

export async function getPublishedPostsByCategory(db: D1Database, categorySlug: string): Promise<Post[]> {
  const { results } = await db
    .prepare(
      `SELECT p.*, c.name as category_name, c.slug as category_slug 
       FROM posts p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.status = 'published' AND c.slug = ?
       ORDER BY p.published_at DESC`
    )
    .bind(categorySlug)
    .all<Post>();
  return results;
}

export async function getPostBySlug(db: D1Database, slug: string): Promise<Post | null> {
  return db
    .prepare(
      `SELECT p.*, c.name as category_name, c.slug as category_slug 
       FROM posts p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.slug = ?`
    )
    .bind(slug)
    .first<Post>();
}

export async function getAllPosts(db: D1Database): Promise<Post[]> {
  const { results } = await db
    .prepare(
      `SELECT p.*, c.name as category_name, c.slug as category_slug 
       FROM posts p 
       LEFT JOIN categories c ON p.category_id = c.id 
       ORDER BY p.created_at DESC`
    )
    .all<Post>();
  return results;
}

export async function createPost(
  db: D1Database,
  data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image?: string;
    category_id?: number;
    status?: "draft" | "published";
  }
): Promise<number> {
  const readTime = estimateReadTime(data.content);
  const publishedAt = data.status === "published" ? new Date().toISOString() : null;

  const result = await db
    .prepare(
      `INSERT INTO posts (title, slug, excerpt, content, featured_image, category_id, status, read_time, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.featured_image || "",
      data.category_id || null,
      data.status || "draft",
      readTime,
      publishedAt
    )
    .run();

  return result.meta.last_row_id;
}

export async function updatePost(
  db: D1Database,
  id: number,
  data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    featured_image?: string;
    category_id?: number | null;
    status?: "draft" | "published";
  }
): Promise<void> {
  const post = await db.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first<Post>();
  if (!post) throw new Error("Post not found");

  const content = data.content ?? post.content;
  const readTime = estimateReadTime(content);
  const status = data.status ?? post.status;

  // Set published_at if publishing for the first time
  let publishedAt = post.published_at;
  if (status === "published" && !post.published_at) {
    publishedAt = new Date().toISOString();
  }

  await db
    .prepare(
      `UPDATE posts SET 
        title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?,
        category_id = ?, status = ?, read_time = ?, published_at = ?,
        updated_at = datetime('now')
       WHERE id = ?`
    )
    .bind(
      data.title ?? post.title,
      data.slug ?? post.slug,
      data.excerpt ?? post.excerpt,
      content,
      data.featured_image ?? post.featured_image,
      data.category_id !== undefined ? data.category_id : post.category_id,
      status,
      readTime,
      publishedAt,
      id
    )
    .run();
}

export async function deletePost(db: D1Database, id: number): Promise<void> {
  await db.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
}

// ─── Categories ───

export async function getCategories(db: D1Database): Promise<Category[]> {
  const { results } = await db
    .prepare(
      `SELECT c.*, COUNT(p.id) as post_count 
       FROM categories c 
       LEFT JOIN posts p ON p.category_id = c.id AND p.status = 'published'
       GROUP BY c.id 
       ORDER BY c.name`
    )
    .all<Category>();
  return results;
}

export async function createCategory(db: D1Database, name: string, slug: string, description = ""): Promise<number> {
  const result = await db
    .prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)")
    .bind(name, slug, description)
    .run();
  return result.meta.last_row_id;
}

export async function deleteCategory(db: D1Database, id: number): Promise<void> {
  // Unlink posts first
  await db.prepare("UPDATE posts SET category_id = NULL WHERE category_id = ?").bind(id).run();
  await db.prepare("DELETE FROM categories WHERE id = ?").bind(id).run();
}
