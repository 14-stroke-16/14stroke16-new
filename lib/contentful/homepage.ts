import { fetchEntry } from "./fetch";
import type { Homepage } from "./types";

/**
 * The homepage singleton. `include: 3` resolves nested references
 * (homepage → featuredArticle → article) once those fields are added.
 * Returns null if the `homepage` type/entry isn't present in the active
 * environment yet, so the page degrades gracefully during the rebuild.
 */
export async function getHomepage(preview = false): Promise<Homepage | null> {
  try {
    return await fetchEntry<Homepage>(
      { content_type: "homepage", include: 3 },
      preview,
    );
  } catch {
    return null;
  }
}
