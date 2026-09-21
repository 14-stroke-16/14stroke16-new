import Link from "next/link";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";
import Head from "next/head";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function HomepageArticle({ article }) {
  if (!article) return <Skeleton />;

  const {
    title,
    readTime,
    author,
    plugSocket,
    articlePublishedDate,
    featuredImage,
    featuredImageAltTag,
    credits,
    introductionText,
    blogSections,
    excerpt,
    slug
  } = article.fields;

  return (
    <div>
      <Head>
        <title>14STROKE16 | HOME </title>
        <meta name="description" content={`COMMUNITY DIARY. FASHION, ART, CULTURE`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-1 md:px-0 md:max-w-[1200px] mx-auto my-10">
        <div className="px-1 relative">
          {/* <div className="flex justify-between align-bottom py-3">
            <div>
              {plugSocket ? (
                <p className="text-xs text-black cursor-pointer">
                  <Link href={`${plugSocket}`} target="_blank">
                    {author}
                  </Link>
                </p>
              ) : (
                <p className="text-xs text-black">{author}</p>
              )}
            </div>
            <div>
              <p className="text-xs text-black">{readTime} mins</p>
            </div>
          </div> */}
          <Link href={`articles/${slug}`}>
          {featuredImage && (
            <div className="relative">
              <Image
                src={`https:${featuredImage.fields.file.url}`}
                width={600}
                height={600}
                alt={featuredImageAltTag}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-15 p-2">
                <h3 className="text-white text-3xl font-bold uppercase">
                  {title}
                </h3>
              </div>
            </div>
          )}
          </Link>
          
        </div>

        <div className="px-4">
          {/* <div className="leading-relaxed whitespace-pre-wrap text-sm xl:text-base text-body mt-10">
            {introductionText}
          </div> */}
          {/* <div className="hidden xl:flex justify-between align-bottom mt-10">
            <div>
              {plugSocket ? (
                <p className="font-bold text-xs text-gray-300 cursor-pointer">
                  {plugSocket && (
                    <Link href={`${plugSocket}`} target="blank">
                      {author}
                    </Link>
                  )}
                </p>
              ) : (
                <p className="font-bold text-xs text-gray-300">{author}</p>
              )}
            </div>
            <div>
              <p className="font-bold text-xs text-gray-300">
                {articlePublishedDate}
              </p>
            </div>
          </div> */}
        </div>

        {/* <p className="text-sm md:text-md px-3 ">{excerpt}</p> */}
        {/* <div className="rich-text text-justify md:px-6 md:gap-5 lg:gap-10 mt-10 overflow-x-hidden">
          {blogSections.map((section, index) => (
            <div key={index}>
              {section.sys.contentType.sys.id === "textBlock" && (
                <div className="leading-relaxed whitespace-pre-wrap text-sm xl:text-lg px-2 ">
                  {section.fields.textBlockText}
                </div>
              )}
              {section.sys.contentType.sys.id === "image" &&
                section.fields.image.fields.file && (
                  <div className="py-8 px-1">
                    <Image
                      src={`https:${section.fields.image.fields.file.url}`}
                      alt={section.fields.altText}
                      width={
                        section.fields.image.fields.file.details.image.width
                      }
                      height={
                        section.fields.image.fields.file.details.image.height
                      }
                      className="mx-auto"
                    />
                  </div>
                )}
              {section.sys.contentType.sys.id === "quoteBlock" && (
                <div className="text-center text-3xl font-bold  my-5 py-6 px-3 md:py-10">
                  {section.fields.quoteBlockText}
                </div>
              )}
            </div>
          ))}
        </div> */}
        {/* <div className="text-center mt-10 pt-5 text-sm text-gray-300">
          {documentToReactComponents(credits)}
        </div> */}
      </div>
    </div>
  );
}
