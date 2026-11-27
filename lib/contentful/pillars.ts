import { fetchEntry, fetchSlugs } from "./fetch";
import type { Article } from "./types";

// Features and Locked In are pillar content types cloned from Article, so they
// share the Article field shape. Minimal fetchers for their detail pages.

export const getFeatureSlugs = () => fetchSlugs("feature");
export const getFeatureBySlug = (slug: string, preview = false) =>
  fetchEntry<Article>(
    { content_type: "feature", "fields.slug": slug },
    preview,
  );

export const getLockedInSlugs = () => fetchSlugs("lockedIn");
export const getLockedInBySlug = (slug: string, preview = false) =>
  fetchEntry<Article>(
    { content_type: "lockedIn", "fields.slug": slug },
    preview,
  );

/** Route base for a pillar entry, by its content type id. */
export function pillarPath(contentTypeId?: string): string {
  switch (contentTypeId) {
    case "feature":
      return "/features";
    case "lockedIn":
      return "/locked-in";
    case "fitPic":
      return "/fitpics";
    default:
      return "/articles";
  }
}
