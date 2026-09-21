import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/contentful/types";

export default function ArticleCard({ article }: { article: Article }) {
  const {
    title,
    readTime,
    slug,
    articlePublishedDate,
    thumbnail,
    thumbnailAltTag,
  } = article.fields;

  return (
    <div className="py-3">
      <Link href={`/articles/${slug}`}>
        {thumbnail && (
          <Image
            src={`https:${thumbnail.fields.file.url}`}
            width={500}
            height={600}
            alt={thumbnailAltTag ?? title}
            className="h-auto w-full"
          />
        )}
        <h3 className="md:text-md mt-4 text-sm font-bold uppercase">{title}</h3>
      </Link>
      <div className="flex justify-between py-2">
        <p className="text-xs text-black">{articlePublishedDate}</p>
        {readTime != null && (
          <p className="text-xs text-black">{readTime} mins</p>
        )}
      </div>
    </div>
  );
}
