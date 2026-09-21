import * as contentful from "@/utils/contentful";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Skeleton from "@/components/Skeleton";
import PreviewBanner from "@/components/PreviewBanner";

export const getStaticPaths = async () => {
  const res = await contentful.client.getEntries({
    content_type: "galleryImage",
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
    content_type: "galleryImage",
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
      galleryItem: items[0] || null,
    },
    revalidate: 10,
  };
}

export default function GallerySlug({ galleryItem, preview }) {
  if (!galleryItem) return <Skeleton />;
  const {
    galleryImageTitle,
    slug,
    galleryThumbnail,
    galleryThumbnailAltTag,
    galleryImages,
    galleryCredits,
  } = galleryItem.fields;

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{galleryImageTitle }</title>
        <meta name="description" content={`14STROKE16 GALLERY`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {preview && <PreviewBanner />}

      <div className="flex-grow">
        <div className="masonry-item py-3 px-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:px-5">
              {galleryImages.map((section, index) => (
                <div key={index}>
                  {section.sys.contentType.sys.id === "image" &&
                    section.fields.image.fields.file && (
                      <div className="py-1">
                        <Image
                          src={`https:${section.fields.image.fields.file.url}`}
                          alt={section.fields.altText}
                          width={
                            section.fields.image.fields.file.details.image.width
                          }
                          height={
                            section.fields.image.fields.file.details.image
                              .height
                          }
                          className="mx-auto"
                      />
                      </div>
                    )}
                </div>
              ))}
            </div>
          
        </div>
        <p className="text-center text-xs text-gray-400 py-5">{galleryCredits }</p>
      </div>
    </div>
  );
}
