import { fetchEntries, fetchEntry, fetchSlugs } from "./fetch";
import type { CommunityItem } from "./types";

const CONTENT_TYPE = "community";

/** All community posts, newest first. */
export function getCommunity(preview = false): Promise<CommunityItem[]> {
  return fetchEntries<CommunityItem>(
    { content_type: CONTENT_TYPE, order: ["-sys.createdAt"] },
    preview,
  );
}

export function getCommunitySlugs(): Promise<string[]> {
  return fetchSlugs(CONTENT_TYPE);
}

export function getCommunityBySlug(
  slug: string,
  preview = false,
): Promise<CommunityItem | null> {
  return fetchEntry<CommunityItem>(
    { content_type: CONTENT_TYPE, "fields.slug": slug },
    preview,
  );
}
