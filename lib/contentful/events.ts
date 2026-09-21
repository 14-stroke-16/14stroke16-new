import { fetchEntries, fetchEntry, fetchSlugs } from "./fetch";
import type { EventItem } from "./types";

const CONTENT_TYPE = "events";

/** All events, oldest first (matches the original ordering). */
export function getEvents(preview = false): Promise<EventItem[]> {
  return fetchEntries<EventItem>(
    { content_type: CONTENT_TYPE, order: ["sys.createdAt"] },
    preview,
  );
}

export function getEventSlugs(): Promise<string[]> {
  return fetchSlugs(CONTENT_TYPE);
}

export function getEventBySlug(
  slug: string,
  preview = false,
): Promise<EventItem | null> {
  return fetchEntry<EventItem>(
    { content_type: CONTENT_TYPE, "fields.slug": slug },
    preview,
  );
}
