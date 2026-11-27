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
