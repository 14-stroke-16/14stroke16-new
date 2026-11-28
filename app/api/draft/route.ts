import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { previewClient } from "@/lib/contentful/client";

// Maps a Contentful content type to its route segment. Every previewable
// (sluggable) content type must be listed here, or the draft route returns
// "Invalid content type" for it.
const CONTENT_TYPE_ROUTES: Record<string, string> = {
  article: "articles",
  feature: "features",
  lockedIn: "locked-in",
  community: "community",
  events: "events",
  galleryImage: "gallery",
  fitPic: "fitpics",
};

// Enables Next.js draft mode and redirects to the entry's page so editors can
// preview unpublished content. Replaces the old pages/api/preview.js.
// Contentful "Open preview" URL:
//   /api/draft?secret=<CONTENTFUL_PREVIEW_SECRET>&entryId={entry.sys.id}&slug={entry.fields.slug}
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const entryId = searchParams.get("entryId");
  const slug = searchParams.get("slug");

  // slug is required for every content type EXCEPT the homepage singleton,
  // which has no slug and previews at the site root.
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !entryId) {
    return new Response("Invalid token or missing parameters", { status: 401 });
  }

  let contentTypeId: string | undefined;
  try {
    const entry = await previewClient.getEntry(entryId);
    contentTypeId = entry.sys.contentType.sys.id;
  } catch {
    return new Response("Error fetching entry", { status: 400 });
  }

  // Homepage singleton → preview at "/".
  if (contentTypeId === "homepage") {
    (await draftMode()).enable();
    redirect("/");
  }

  const segment = contentTypeId
    ? CONTENT_TYPE_ROUTES[contentTypeId]
    : undefined;
  if (!segment || !slug) {
    return new Response("Invalid content type", { status: 400 });
  }

  (await draftMode()).enable();
  redirect(`/${segment}/${slug}`);
}
