import { fetchEntries } from "./fetch";

// The top-banner "latest pillars" feed. Each of the four magazine pillars is
// its own content type; the banner shows the most recent across all of them,
// labelled by pillar and talent, e.g. "FITPIC: JAY TAGLE | COVER: NEMZZZ".
//
// Ordering (newest first) is by a date the EDITOR controls, so the banner
// reflects publishing intent, not every edit:
//   1. Banner Order Override (manual) — wins when set, to force a position.
//   2. the item's Published Date (articlePublishedDate) — the normal driver;
//      a required field on ALL four pillar types.
//   3. sys.createdAt — last-resort fallback if a Published Date is ever missing
//      (stable: editing and re-publishing never changes it).
// This gives the team both behaviours they asked for:
//   • Publish later, show first — set the Published Date to the go-live day and
//     the item leads the banner the day it goes live.
//   • Fix a typo without resurfacing — editing the body never changes the
//     Published Date (or createdAt), so the item keeps its place.
// Each pillar is queried by its own date so the freshest candidates are fetched,
// then all are re-ranked together by the effective date above.

export type Pillar = "Covers" | "Locked In" | "Features" | "Fit Pic";

export interface BannerItem {
  pillar: Pillar;
  /** Uppercase display label shown in the banner. */
  label: string;
  talentName: string;
  /** Link to the item's page, when it has one. */
  href?: string;
  /** ms timestamp used for ordering. */
  date: number;
}

const PILLARS: {
  contentType: string;
  pillar: Pillar;
  label: string;
  /** Route prefix for the item's page (slug is appended). */
  hrefBase: string;
  /** Delivery-API order used to fetch this type's freshest candidates. */
  order: string;
}[] = [
  { contentType: "article", pillar: "Covers", label: "COVER", hrefBase: "/articles", order: "-fields.articlePublishedDate" },
  { contentType: "feature", pillar: "Features", label: "FEATURES", hrefBase: "/features", order: "-fields.articlePublishedDate" },
  { contentType: "lockedIn", pillar: "Locked In", label: "LOCKED IN", hrefBase: "/locked-in", order: "-fields.articlePublishedDate" },
  { contentType: "fitPic", pillar: "Fit Pic", label: "FITPIC", hrefBase: "/fitpics", order: "-fields.articlePublishedDate" },
];

interface PillarEntry {
  sys: { id: string; createdAt: string };
  fields: {
    talentName?: string;
    slug?: string;
    bannerOverride?: string;
    articlePublishedDate?: string;
  };
}

/**
 * The latest pillar items for the banner, newest first, capped at `limit`.
 * Fetches each pillar type in parallel and is fail-safe: a type that errors
 * (e.g. not yet present) is skipped rather than breaking the banner.
 */
export async function getBannerItems(
  limit = 3,
  preview = false,
): Promise<BannerItem[]> {
  const perType = await Promise.all(
    PILLARS.map(async (p) => {
      let entries: PillarEntry[] = [];
      try {
        entries = await fetchEntries<PillarEntry>(
          { content_type: p.contentType, order: [p.order], limit: 12 },
          preview,
        );
      } catch {
        return [] as BannerItem[];
      }
      return entries
        .filter((e) => e.fields?.talentName)
        .map<BannerItem>((e) => ({
          pillar: p.pillar,
          label: p.label,
          talentName: e.fields.talentName as string,
          href: e.fields.slug ? `${p.hrefBase}/${e.fields.slug}` : undefined,
          date: new Date(
            e.fields.bannerOverride ??
              e.fields.articlePublishedDate ??
              e.sys.createdAt,
          ).getTime(),
        }));
    }),
  );

  // Newest first, then keep only the first (newest) item per talent so the
  // banner shows distinct people rather than repeating the same name (e.g. when
  // several of the latest Fit Pics are the same talent).
  const sorted = perType.flat().sort((a, b) => b.date - a.date);
  const out: BannerItem[] = [];
  const seen = new Set<string>();
  for (const item of sorted) {
    const key = item.talentName.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length >= limit) break;
  }
  return out;
}

export interface BannerSegment {
  text: string;
  href?: string;
}

/** Each item as a banner segment (text + optional link), e.g. "FITPIC: JAY TAGLE". */
export function bannerSegments(items: BannerItem[]): BannerSegment[] {
  return items.map((i) => ({
    text: `${i.label}: ${i.talentName}`,
    href: i.href,
  }));
}
