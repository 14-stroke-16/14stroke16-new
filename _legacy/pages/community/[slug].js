import * as contentful from "@/utils/contentful";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Skeleton from "@/components/Skeleton";
import PreviewBanner from "@/components/PreviewBanner";

export const getStaticPaths = async () => {
  const res = await contentful.client.getEntries({
    content_type: "community",
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
    content_type: "community",
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
      communityArticle: items[0] || null,
    },
    revalidate: 10,
  };
}

export default function communitySlug({ communityArticle, preview }) {
     if (!communityArticle) return <Skeleton />;
     const {
       communityTitle,
       slug,
       communityThumbnail,
       CommunityThumbnailAltTag,
       communitySection,
       communityArticlePublishedDate,
       communityReadTime,
       communityAuthor,
       communityPlugSocket,
       communityIntroductionText
     } = communityArticle.fields;
    
    
    return (
      <div>
        <Head>
          <title>{communityTitle} </title>
          <meta name="description" content={`14STROKE16 COMMUNITY`} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {preview && <PreviewBanner />}
        <div className="px-5 md:px-0 md:max-w-[1200px] mx-auto my-10">
          <div className="grid-layout">
            <h3 className="text-4xl xl:text-6xl font-bold text-left xl:hidden mb-4 md:mt-0 uppercase">
              {communityTitle}
            </h3>

            <div className="flex justify-between align-bottom mt- xl:hidden">
              <div>
                {communityPlugSocket ? (
                  <p className="text-xs text-black cursor-pointer">
                    <Link href={`${communityPlugSocket}`} target="_blank">
                      {author}
                    </Link>
                  </p>
                ) : (
                  <p className="text-xs text-black">{communityAuthor}</p>
                )}
              </div>
              <div>
                <p className="text-xs text-black">{communityReadTime} mins</p>
              </div>
            </div>
            {communityThumbnail && (
              <Image
                src={`https:${communityThumbnail.fields.file.url}`}
                width={600}
                height={600}
                alt={CommunityThumbnailAltTag}
              />
            )}

            <div>
              <h3 className=" hidden xl:block text-4xl xl:text-6xl font-bold text-center mb-4 md:mt-0 uppercase">
                {communityTitle}
              </h3>
              <div className="leading-relaxed whitespace-pre-wrap text-base xl:text-base text-body mt-10">
                {communityIntroductionText}
              </div>
              <div className="hidden xl:flex justify-between align-bottom mt-10">
                <div>
                  {communityPlugSocket ? (
                    <p className="text-xs text-black cursor-pointer">
                      <Link href={`${communityPlugSocket}`} target="_blank">
                        {author}
                      </Link>
                    </p>
                  ) : (
                    <p className="text-xs text-black">{communityAuthor}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-black">{communityReadTime} mins</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rich-text text-justify grid grid-cols-1 md:px-6 md:gap-5 lg:gap-10 mt-10 overflow-x-hidden">
            {communitySection.map((section, index) => (
              <div key={index}>
                {section.sys.contentType.sys.id === "textBlock" && (
                  <div className="leading-relaxed whitespace-pre-wrap text-base xl:text-base text-body mt-5">
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
        </div>
      </div>
    );
}
