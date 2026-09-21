import * as contentful from "@/utils/contentful";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Skeleton from "@/components/Skeleton";
import PreviewBanner from "@/components/PreviewBanner";

export const getStaticPaths = async () => {
  const res = await contentful.client.getEntries({
    content_type: "events",
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
    content_type: "events",
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
      newEvent: items[0] || null,
    },
    revalidate: 10,
  };
}

export default function events({ newEvent, preview }) {
  if (!newEvent) return <Skeleton />;
  const {
    eventsTitle,
    eventsThumbnail,
    eventDate,
    eventLink,
    eventDescription
  } = newEvent.fields;

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{eventsTitle} </title>
        <meta name="description" content={`14STROKE16 EVENTS`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {preview && <PreviewBanner />}

      <div className="flex-grow">
        <div className="masonry-item py-3 px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:px-10">
            <div>
              <Link href={eventLink} target="_blank">
                <h3 className="text-lg md:text-md font-bold mt-4 mb-4 uppercase">
                  {eventsTitle}
                </h3>
              </Link>
              <Link href={eventLink} target="_blank">
                <Image
                  src={`https:${eventsThumbnail.fields.file.url}`}
                  width={500}
                  height={600}
                  alt={"Event Flyer"}
                />
              </Link>
            </div>
            <div className="py-5">
              <p className="text-xs text-black pb-2">{eventDate}</p>
              <Link href={eventLink} target="_blank">
                <p className="text-base pb-4 font-bold">TICKETS</p>
              </Link>
              <p className="text-base md:text-md">{eventDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

