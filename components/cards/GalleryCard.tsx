import Image from "next/image";
import Link from "next/link";
import type { GalleryItem } from "@/lib/contentful/types";

export default function GalleryCard({ item }: { item: GalleryItem }) {
  const {
    galleryImageTitle,
    galleryThumbnail,
    galleryThumbnailAltTag,
    googleDriveLink,
  } = item.fields;

  const content = (
    <>
      <h3 className="md:text-md pb-3 text-sm font-bold uppercase">
        {galleryImageTitle}
      </h3>
      {galleryThumbnail && (
        <Image
          src={`https:${galleryThumbnail.fields.file.url}`}
          width={500}
          height={600}
          alt={galleryThumbnailAltTag ?? galleryImageTitle}
          className="h-auto w-full"
        />
      )}
    </>
  );

  return (
    <div className="py-3">
      {googleDriveLink ? (
        <Link href={googleDriveLink} target="_blank">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
