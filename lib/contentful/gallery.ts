import { fetchEntries, fetchEntry, fetchSlugs } from "./fetch";
import type { GalleryItem } from "./types";

const CONTENT_TYPE = "galleryImage";

/** All gallery items, newest first. */
export function getGallery(preview = false): Promise<GalleryItem[]> {
  return fetchEntries<GalleryItem>(
    { content_type: CONTENT_TYPE, order: ["-sys.createdAt"] },
    preview,
  );
}

export function getGallerySlugs(): Promise<string[]> {
  return fetchSlugs(CONTENT_TYPE);
}

export function getGalleryBySlug(
  slug: string,
  preview = false,
): Promise<GalleryItem | null> {
  return fetchEntry<GalleryItem>(
    { content_type: CONTENT_TYPE, "fields.slug": slug },
    preview,
  );
}
