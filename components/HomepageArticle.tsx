import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/contentful/types";

export default function HomepageArticle({ article }: { article: Article }) {
  const { title, featuredImage, featuredImageAltTag, slug } = article.fields;
  if (!featuredImage) return null;

  return (
    <div className="relative px-1">
      <Link href={`/articles/${slug}`}>
        <div className="relative">
          <Image
            src={`https:${featuredImage.fields.file.url}`}
            width={600}
            height={600}
            alt={featuredImageAltTag ?? title}
            className="h-auto w-full"
          />
          <div className="absolute bottom-0 bg-black bg-opacity-15 p-2">
            <h3 className="text-3xl font-bold uppercase text-white">{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
