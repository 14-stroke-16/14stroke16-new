import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Image from "next/image";
import { getGalleryBySlug, getGallerySlugs } from "@/lib/contentful/gallery";
import { isImageBlock } from "@/lib/contentful/types";
import PreviewBanner from "@/components/PreviewBanner";

export const revalidate = 10;

export async function generateStaticParams() {
  const slugs = await getGallerySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getGalleryBySlug(slug);
  if (!item) return {};
  return {
    title: item.fields.galleryImageTitle,
    description: "14STROKE16 Gallery",
  };
}

export default async function GalleryItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const item = await getGalleryBySlug(slug, isEnabled);
  if (!item) notFound();

  const { galleryImages, galleryCredits } = item.fields;

  return (
    <div className="flex min-h-screen flex-col">
      {isEnabled && <PreviewBanner />}
      <div className="flex-grow">
        <div className="px-2 py-3">
          <div className="grid grid-cols-2 gap-x-2 md:grid-cols-4 md:px-5">
            {galleryImages?.map((section, index) => {
              if (!isImageBlock(section) || !section.fields.image.fields.file) {
                return null;
              }
              const dimensions = section.fields.image.fields.file.details?.image;
              return (
                <div key={index} className="py-1">
                  <Image
                    src={`https:${section.fields.image.fields.file.url}`}
                    alt={section.fields.altText}
                    width={dimensions?.width ?? 800}
                    height={dimensions?.height ?? 800}
                    className="mx-auto"
                  />
                </div>
              );
            })}
          </div>
        </div>
        {galleryCredits && (
          <p className="py-5 text-center text-xs text-gray-400">
            {galleryCredits}
          </p>
        )}
      </div>
    </div>
  );
}
