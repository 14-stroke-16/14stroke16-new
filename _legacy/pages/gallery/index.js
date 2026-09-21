import { createClient } from "contentful";
import MasonryGrid from "@/components/MasonryGrid";
import GalleryCard from "@/components/GalleryCard";
import Head from "next/head";


export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "galleryImage",
    order: "-sys.createdAt",
  });

  return {
    props: {
      galleryItems: res.items,
    },
    revalidate: 10,
  };
}


export default function GalleryHome({galleryItems}) {
  return (
    <div>
      <Head>
        <title>14STROKE16 | GALLERY </title>
        <meta name="description" content={`14STROKE16 GALLERY`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto mt-10 px-3">
        <h1 className="text-2xl font-bold py-6">GALLERY</h1>
        <MasonryGrid>
          {galleryItems.map((galleryItem) => (
            <div key={galleryItem.sys.id} className="masonry-item">
              <GalleryCard galleryItem={galleryItem} />
            </div>
          ))}
        </MasonryGrid>
      </div>
    </div>
  );
}
