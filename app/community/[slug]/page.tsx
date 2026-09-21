import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getCommunityBySlug,
  getCommunitySlugs,
} from "@/lib/contentful/community";
import { isTextBlock, isImageBlock, isQuoteBlock } from "@/lib/contentful/types";

export const revalidate = 10;

export async function generateStaticParams() {
  const slugs = await getCommunitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCommunityBySlug(slug);
  if (!item) return {};
  return {
    title: item.fields.communityTitle,
    description: "14STROKE16 Community",
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

export default async function CommunityArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getCommunityBySlug(slug);
  if (!item) notFound();

  const {
    communityTitle,
    communityThumbnail,
    CommunityThumbnailAltTag,
    communitySection,
    communityReadTime,
    communityAuthor,
    communityPlugSocket,
    communityIntroductionText,
  } = item.fields;

  return (
    <div>
      <div className="mx-auto my-10 px-5 md:max-w-[1200px] md:px-0">
        <div className="grid-layout">
          <h3 className="mb-4 text-left text-4xl font-bold uppercase md:mt-0 xl:hidden xl:text-6xl">
            {communityTitle}
          </h3>
          <div className="flex justify-between align-bottom xl:hidden">
            <AuthorTag author={communityAuthor} plugSocket={communityPlugSocket} />
            {communityReadTime != null && (
              <p className="text-xs text-black">{communityReadTime} mins</p>
            )}
          </div>
          {communityThumbnail && (
            <Image
              src={`https:${communityThumbnail.fields.file.url}`}
              width={600}
              height={600}
              alt={CommunityThumbnailAltTag ?? communityTitle}
            />
          )}
          <div>
            <h3 className="mb-4 hidden text-center text-4xl font-bold uppercase md:mt-0 xl:block xl:text-6xl">
              {communityTitle}
            </h3>
            <div className="text-body mt-10 whitespace-pre-wrap text-base leading-relaxed">
              {communityIntroductionText}
            </div>
            <div className="mt-10 hidden justify-between align-bottom xl:flex">
              <AuthorTag
                author={communityAuthor}
                plugSocket={communityPlugSocket}
              />
              {communityReadTime != null && (
                <p className="text-xs text-black">{communityReadTime} mins</p>
              )}
            </div>
          </div>
        </div>

        <div className="rich-text mt-10 grid grid-cols-1 overflow-x-hidden text-justify md:gap-5 md:px-6 lg:gap-10">
          {communitySection?.map((section, index) => {
            if (isTextBlock(section)) {
              return (
                <div
                  key={index}
                  className="text-body mt-5 whitespace-pre-wrap text-base leading-relaxed"
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
      </div>
    </div>
  );
}
