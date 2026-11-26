import Image from "next/image";
import Button from "@/components/ui/Button";
import type { FeaturedArticle } from "@/lib/contentful/types";

// A homepage featured block. Two treatments:
//  - "Full bleed" (default): image fills its half (object-cover), paired with a
//    solid colour text panel. Image side + panel colour alternate by index.
//  - "Contained": a smaller image with padding on a light background — used to
//    deliberately break up the rhythm (e.g. the Jinil Park illustration).
// Stacks image-over-text on mobile.
export default function FeaturedArticleBlock({
  item,
  index,
}: {
  item: FeaturedArticle;
  index: number;
}) {
  const art = item.fields.article;
  if (!art) return null;

  const heading = item.fields.headingOverride || art.fields.title;
  const blurb = item.fields.blurbOverride || art.fields.excerpt;
  const imgAsset = item.fields.imageOverride || art.fields.featuredImage;
  const imgUrl = imgAsset?.fields?.file?.url;
  const src = imgUrl
    ? imgUrl.startsWith("http")
      ? imgUrl
      : `https:${imgUrl}`
    : null;
  const alt = art.fields.featuredImageAltTag || heading;
  const href = `/articles/${art.fields.slug}`;

  // "Contained" = slimmer image column + wider, more-indented text side; the
  // image itself still fills its container full-bleed (object-cover).
  const slim = item.fields.imageStyle === "Contained";
  const imageOnLeft = index % 2 === 0;
  const dark = index % 2 === 0;

  const image = (
    <div
      className={`relative min-h-[420px] w-full md:min-h-[680px] ${
        slim ? "md:w-2/5" : "md:w-1/2"
      }`}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover"
        />
      )}
    </div>
  );

  const text = (
    <div
      className={`flex w-full flex-col justify-center gap-6 px-6 py-14 ${
        slim ? "md:w-3/5 md:px-24" : "md:w-1/2 md:px-14"
      } ${imageOnLeft ? "items-end text-right" : "items-start text-left"} ${
        dark ? "bg-black text-ivoryWhite" : "bg-ivoryWhite text-black"
      }`}
    >
      <h2 className="text-3xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl">
        {heading}
      </h2>
      {blurb && (
        <p className="line-clamp-6 max-w-xl text-sm leading-relaxed md:text-base">
          {blurb}
        </p>
      )}
      <div>
        <Button href={href} variant="outline">
          READ MORE
        </Button>
      </div>
    </div>
  );

  return (
    <section
      className={`flex flex-col md:flex-row ${imageOnLeft ? "" : "md:flex-row-reverse"}`}
    >
      {image}
      {text}
    </section>
  );
}
