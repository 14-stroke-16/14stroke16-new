// Custom next/image loader. Contentful images are served straight from
// Contentful's global image CDN — resized to the requested width and converted
// to WebP on the fly — which is fast, cached worldwide, and offloads the work
// from the Next.js image optimizer. Non-Contentful (local/static) images are
// returned unchanged so they serve as-is.
interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function contentfulImageLoader({
  src,
  width,
  quality,
}: LoaderArgs): string {
  if (!/ctfassets\.net/.test(src)) return src;

  const [base, existingQuery = ""] = src.split("?");
  const params = new URLSearchParams(existingQuery);
  params.set("w", String(width));
  params.set("q", String(quality ?? 80));
  params.set("fm", "webp");
  return `${base}?${params.toString()}`;
}
