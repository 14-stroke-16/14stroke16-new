import Image from "next/image";
import Link from "next/link";



export default function CommunityCard({ communityArticle }) {
  const {
    communityTitle,
    slug,
    communityThumbnail,
    CommunityThumbnailAltTag,
    communityArticlePublishedDate,
    communityReadTime,
  } = communityArticle.fields;


  return (
    <div className="masonry-item py-3">
      <div>
        <Link href={`community/${slug}`}>
          <Image
            src={`https:${communityThumbnail.fields.file.url}`}
            width={500}
            height={600}
            alt={CommunityThumbnailAltTag}
          />

          <h3 className="text-sm md:text-md font-bold mt-4 uppercase">
            {communityTitle}
          </h3>
        </Link>
        <div className="flex justify-between py-2">
          <div>
            <p className="text-xs text-black">{communityArticlePublishedDate}</p>
          </div>
          <div>
            <p className="text-xs text-black">{communityReadTime} mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}
