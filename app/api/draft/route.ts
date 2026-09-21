import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { previewClient } from "@/lib/contentful/client";

// Maps a Contentful content type to its route segment.
const CONTENT_TYPE_ROUTES: Record<string, string> = {
  article: "articles",
  community: "community",
  events: "events",
  galleryImage: "gallery",
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

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !entryId || !slug) {
    return new Response("Invalid token or missing parameters", { status: 401 });
  }

  let contentTypeId: string | undefined;
  try {
    const entry = await previewClient.getEntry(entryId);
    contentTypeId = entry.sys.contentType.sys.id;
  } catch {
    return new Response("Error fetching entry", { status: 400 });
  }

  const segment = contentTypeId
    ? CONTENT_TYPE_ROUTES[contentTypeId]
    : undefined;
  if (!segment) {
    return new Response("Invalid content type", { status: 400 });
  }

  (await draftMode()).enable();
  redirect(`/${segment}/${slug}`);
}
