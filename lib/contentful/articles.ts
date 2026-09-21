import { getClient } from "./client";
import type { Article } from "./types";

const CONTENT_TYPE = "article";

// The Contentful JS SDK's generic query typing is heavy; we keep the SDK
// boundary loose in this one place and expose clean, typed domain objects
// (Article) to the rest of the app.
type Query = Record<string, unknown>;

async function fetchArticles(query: Query, preview: boolean): Promise<Article[]> {
  const res = await getClient(preview).getEntries(query as never);
  return res.items as unknown as Article[];
}

/** All articles, newest first. */
export function getArticles(preview = false): Promise<Article[]> {
  return fetchArticles(
    { content_type: CONTENT_TYPE, order: ["-sys.createdAt"] },
    preview,
  );
}

/** Slugs only — for generateStaticParams. */
export async function getArticleSlugs(): Promise<string[]> {
  const items = await fetchArticles(
    { content_type: CONTENT_TYPE, select: ["fields.slug"] },
    false,
  );
  return items.map((a) => a.fields.slug).filter(Boolean);
}

/** A single article by slug, or null if not found. */
export async function getArticleBySlug(
  slug: string,
  preview = false,
): Promise<Article | null> {
  const items = await fetchArticles(
    { content_type: CONTENT_TYPE, "fields.slug": slug, limit: 1 },
    preview,
  );
  return items[0] ?? null;
}
