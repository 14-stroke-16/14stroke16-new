import { getClient } from "./client";

// The Contentful JS SDK's generic query typing is heavy; we keep the SDK
// boundary loose in this one place and expose clean, typed domain objects
// to the rest of the app.
export type Query = Record<string, unknown>;

/** Fetch entries and cast to the caller's domain type. */
export async function fetchEntries<T>(
  query: Query,
  preview = false,
): Promise<T[]> {
  const res = await getClient(preview).getEntries(query as never);
  return res.items as unknown as T[];
}

/** Fetch a single entry (first match) or null. */
export async function fetchEntry<T>(
  query: Query,
  preview = false,
): Promise<T | null> {
  const items = await fetchEntries<T>({ ...query, limit: 1 }, preview);
  return items[0] ?? null;
}

/** Fetch just the slugs of a content type — for generateStaticParams. */
export async function fetchSlugs(contentType: string): Promise<string[]> {
  const items = await fetchEntries<{ fields: { slug?: string } }>({
    content_type: contentType,
    select: ["fields.slug"],
  });
  return items
    .map((i) => i.fields.slug)
    .filter((slug): slug is string => Boolean(slug));
}
