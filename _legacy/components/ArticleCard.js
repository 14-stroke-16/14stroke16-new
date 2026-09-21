import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }) {
  const {
    title,
    readTime,
    slug,
    author,
    articlePublishedDate,
    thumbnail,
    thumbnailAltTag,
    excerpt,
  } = article.fields;
    return (
      <div className="masonry-item py-3">
        <div>
          <Link href={`articles/${slug}`}>
            <Image
              src={`https:${thumbnail.fields.file.url}`}
              width={500}
              height={600}
              alt={thumbnailAltTag}
            />

            <h3 className="text-sm md:text-md font-bold mt-4 uppercase">
              {title}
            </h3>
          </Link>
          <div className="flex justify-between py-2">
            <div>
             
                <p className="text-xs text-black">{articlePublishedDate}</p>
            
            </div>
            <div>
              <p className="text-xs text-black">{readTime} mins</p>
            </div>


          </div>
          {/* <p className="text-sm md:text-md ">{excerpt}</p>
          <Link href={`articles/${slug}`}>
            <p className="text-sm pb-4 mt-4 font-bold">READ MORE</p>
          </Link> */}
        </div>
      </div>
    );
}
