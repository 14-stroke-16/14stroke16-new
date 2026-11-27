import { fetchEntry } from "./fetch";
import type { SiteChrome } from "./types";

/**
 * The editable header + footer config (singleton). `include: 2` resolves the
 * nav/footer navLink references. Fail-safe: returns null if the type/entry
 * isn't present, so the header/footer fall back to their hardcoded defaults.
 */
export async function getSiteChrome(
  preview = false,
): Promise<SiteChrome | null> {
  try {
    return await fetchEntry<SiteChrome>(
      { content_type: "siteChrome", include: 2 },
      preview,
    );
  } catch {
    return null;
  }
}
