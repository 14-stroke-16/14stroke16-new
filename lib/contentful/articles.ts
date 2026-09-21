import { fetchEntries, fetchEntry, fetchSlugs } from "./fetch";
import type { Article } from "./types";

const CONTENT_TYPE = "article";

/** All articles, newest first. */
export function getArticles(preview = false): Promise<Article[]> {
  return fetchEntries<Article>(
    { content_type: CONTENT_TYPE, order: ["-sys.createdAt"] },
    preview,
  );
}

/** Slugs only — for generateStaticParams. */
export function getArticleSlugs(): Promise<string[]> {
  return fetchSlugs(CONTENT_TYPE);
}

/** A single article by slug, or null if not found. */
export function getArticleBySlug(
  slug: string,
  preview = false,
): Promise<Article | null> {
  return fetchEntry<Article>(
    { content_type: CONTENT_TYPE, "fields.slug": slug },
    preview,
  );
}
