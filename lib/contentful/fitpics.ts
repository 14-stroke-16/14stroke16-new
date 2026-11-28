import { fetchEntries, fetchEntry, fetchSlugs } from "./fetch";
import type { FitPic } from "./types";

const CONTENT_TYPE = "fitPic";

/** All fit pics, newest first. */
export function getFitPics(preview = false): Promise<FitPic[]> {
  return fetchEntries<FitPic>(
    { content_type: CONTENT_TYPE, order: ["-sys.createdAt"] },
    preview,
  );
}

/** Slugs only — for generateStaticParams. */
export function getFitPicSlugs(): Promise<string[]> {
  return fetchSlugs(CONTENT_TYPE);
}

/** A single fit pic by slug, or null if not found. */
export function getFitPicBySlug(
  slug: string,
  preview = false,
): Promise<FitPic | null> {
  return fetchEntry<FitPic>(
    { content_type: CONTENT_TYPE, "fields.slug": slug },
    preview,
  );
}
