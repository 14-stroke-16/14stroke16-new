import * as contentful from "@/utils/contentful";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Skeleton from "@/components/Skeleton";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PreviewBanner from "@/components/PreviewBanner";

export const getStaticPaths = async () => {
  const res = await contentful.client.getEntries({
    content_type: "article",
  });

  const paths = res.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: true, 
  };
};

export async function getStaticProps(context) {
  const client = context.preview ? contentful.previewClient : contentful.client;

  const { items } = await client.getEntries({
    content_type: "article",
    "fields.slug": context.params.slug,
  });

  if (!items.length) {
    return {
      notFound: true, 
    };
  }

  return {
    props: {
      preview: context.preview || false,
      article: items[0] || null,
    },
    revalidate: 10, 
  };
}

export default function Slug({ article, preview }) {
  // Send Contentful content metadata (author, etc.) to GA4 as an
  // "article_view" event so article performance can be sliced by author.
  useEffect(() => {
    if (!article?.fields || typeof window === "undefined" || !window.gtag) return;
    const { title, author, slug, articlePublishedDate, readTime } = article.fields;
    window.gtag("event", "article_view", {
      article_author: author || "Unknown",
      article_title: title,
      article_slug: slug,
      article_published_date: articlePublishedDate || null,
      article_read_time: readTime ?? null,
    });
  }, [article]);

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
  } = article.fields;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Read about ${title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {preview && <PreviewBanner />}
      <div className="px-5 md:px-0 md:max-w-[1200px] mx-auto my-10">
        <div className="grid-layout">
          <h3 className="text-4xl xl:text-6xl font-bold text-left xl:hidden mb-4 md:mt-0 uppercase">
            {title}
          </h3>
          <div className="flex justify-between align-bottom mt- xl:hidden">
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
          </div>
          {featuredImage && (
            <Image
              src={`https:${featuredImage.fields.file.url}`}
              width={600}
              height={600}
              alt={featuredImageAltTag}
            />
          )}

          <div>
            <h3 className=" hidden xl:block text-4xl xl:text-6xl font-bold text-center mb-4 md:mt-0 uppercase">
              {title}
            </h3>
            <div className="leading-relaxed whitespace-pre-wrap text-base xl:text-xl text-body mt-10">
              {introductionText}
            </div>
            <div className="hidden xl:flex justify-between align-bottom mt-10">
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
            </div>
          </div>
        </div>

        <div className="rich-text text-justify grid grid-cols-1 md:px-6 md:gap-5 lg:gap-10 mt-10 overflow-x-hidden">
          {blogSections.map((section, index) => (
            <div key={index}>
              {section.sys.contentType.sys.id === "textBlock" && (
                <div className="leading-relaxed whitespace-pre-wrap text-base xl:text-xl text-body mt-5">
                  {section.fields.textBlockText}
                </div>
              )}
              {section.sys.contentType.sys.id === "image" &&
                section.fields.image.fields.file && (
                  <div className="py-5">
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
                <div className="text-center text-3xl font-bold my-5 py-5 px-3 md:py-5">
                  {section.fields.quoteBlockText}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10 pt-5 text-sm text-gray-300">
          {documentToReactComponents(credits)}
        </div>
      </div>
    </div>
  );
}
