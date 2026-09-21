import type { Metadata } from "next";
import { getGallery } from "@/lib/contentful/gallery";
import GalleryCard from "@/components/cards/GalleryCard";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Gallery",
  description: "14STROKE16 Gallery",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <div className="container mx-auto mt-10 px-3">
      <h1 className="py-6 text-2xl font-bold">GALLERY</h1>
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {items.map((item) => (
          <div key={item.sys.id} className="mb-4 break-inside-avoid">
            <GalleryCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
