import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getArticleBySlug, getArticleSlugs } from "@/lib/contentful/articles";
import {
  isTextBlock,
  isImageBlock,
  isQuoteBlock,
} from "@/lib/contentful/types";
import ArticleAnalytics from "@/components/ArticleAnalytics";
import PreviewBanner from "@/components/PreviewBanner";

export const revalidate = 10;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.fields.title,
    description: `Read about ${article.fields.title}`,
  };
}

function AuthorTag({
  author,
  plugSocket,
}: {
  author?: string;
  plugSocket?: string;
}) {
  if (!author) return null;
  return plugSocket ? (
    <p className="cursor-pointer text-xs text-black">
      <Link href={plugSocket} target="_blank">
        {author}
      </Link>
    </p>
  ) : (
    <p className="text-xs text-black">{author}</p>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const article = await getArticleBySlug(slug, isEnabled);
  if (!article) notFound();

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
      {isEnabled && <PreviewBanner />}
      <ArticleAnalytics
        title={title}
        author={author}
        slug={slug}
        articlePublishedDate={articlePublishedDate}
        readTime={readTime}
      />
      <div className="mx-auto my-10 px-5 md:max-w-[1200px] md:px-0">
        <div className="grid-layout">
          <h3 className="mb-4 text-left text-4xl font-bold uppercase md:mt-0 xl:hidden xl:text-6xl">
            {title}
          </h3>
          <div className="flex justify-between align-bottom xl:hidden">
            <AuthorTag author={author} plugSocket={plugSocket} />
            {readTime != null && (
              <p className="text-xs text-black">{readTime} mins</p>
            )}
          </div>
          {featuredImage && (
            <Image
              src={`https:${featuredImage.fields.file.url}`}
              width={600}
              height={600}
              alt={featuredImageAltTag ?? title}
            />
          )}
          <div>
            <h3 className="mb-4 hidden text-center text-4xl font-bold uppercase md:mt-0 xl:block xl:text-6xl">
              {title}
            </h3>
            <div className="text-body mt-10 whitespace-pre-wrap text-base leading-relaxed xl:text-xl">
              {introductionText}
            </div>
            <div className="mt-10 hidden justify-between align-bottom xl:flex">
              <AuthorTag author={author} plugSocket={plugSocket} />
              {readTime != null && (
                <p className="text-xs text-black">{readTime} mins</p>
              )}
            </div>
          </div>
        </div>

        <div className="rich-text mt-10 grid grid-cols-1 overflow-x-hidden text-justify md:gap-5 md:px-6 lg:gap-10">
          {blogSections?.map((section, index) => {
            if (isTextBlock(section)) {
              return (
                <div
                  key={index}
                  className="text-body mt-5 whitespace-pre-wrap text-base leading-relaxed xl:text-xl"
                >
                  {section.fields.textBlockText}
                </div>
              );
            }
            if (isImageBlock(section) && section.fields.image.fields.file) {
              const dimensions =
                section.fields.image.fields.file.details?.image;
              return (
                <div key={index} className="py-5">
                  <Image
                    src={`https:${section.fields.image.fields.file.url}`}
                    alt={section.fields.altText}
                    width={dimensions?.width ?? 1000}
                    height={dimensions?.height ?? 700}
                    className="mx-auto"
                  />
                </div>
              );
            }
            if (isQuoteBlock(section)) {
              return (
                <div
                  key={index}
                  className="my-5 px-3 py-5 text-center text-3xl font-bold md:py-5"
                >
                  {section.fields.quoteBlockText}
                </div>
              );
            }
            return null;
          })}
        </div>

        {credits && (
          <div className="mt-10 pt-5 text-center text-sm text-gray-300">
            {documentToReactComponents(credits)}
          </div>
        )}
      </div>
    </div>
  );
}
