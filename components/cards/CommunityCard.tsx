import Image from "next/image";
import Link from "next/link";
import type { CommunityItem } from "@/lib/contentful/types";

export default function CommunityCard({ item }: { item: CommunityItem }) {
  const {
    communityTitle,
    slug,
    communityThumbnail,
    CommunityThumbnailAltTag,
    communityArticlePublishedDate,
    communityReadTime,
  } = item.fields;

  return (
    <div className="py-3">
      <Link href={`/community/${slug}`}>
        {communityThumbnail && (
          <Image
            src={`https:${communityThumbnail.fields.file.url}`}
            width={500}
            height={600}
            alt={CommunityThumbnailAltTag ?? communityTitle}
            className="h-auto w-full"
          />
        )}
        <h3 className="md:text-md mt-4 text-sm font-bold uppercase">
          {communityTitle}
        </h3>
      </Link>
      <div className="flex justify-between py-2">
        <p className="text-xs text-black">{communityArticlePublishedDate}</p>
        {communityReadTime != null && (
          <p className="text-xs text-black">{communityReadTime} mins</p>
        )}
      </div>
    </div>
  );
}
