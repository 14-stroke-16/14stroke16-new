import { createClient } from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";
const accessToken = process.env.CONTENTFUL_ACCESS_KEY;
const previewAccessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_KEY;

if (!space || !accessToken) {
  throw new Error(
    "Missing Contentful env vars: CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_KEY are required.",
  );
}

/** Delivery API — published content. */
export const client = createClient({
  space,
  environment,
  accessToken,
});

/** Preview API — draft/unpublished content (used in draft mode). */
export const previewClient = previewAccessToken
  ? createClient({
      space,
      environment,
      accessToken: previewAccessToken,
      host: "preview.contentful.com",
    })
  : client;

/** Returns the preview client when draft mode is enabled, else the delivery client. */
export function getClient(preview: boolean) {
  return preview ? previewClient : client;
}
