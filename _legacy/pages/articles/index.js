import { createClient } from "contentful";
import ArticleCard from "@/components/ArticleCard";
import MasonryGrid from "@/components/MasonryGrid";
import Head from "next/head";



export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "article",
    order: "-sys.createdAt",
  });

  return {
    props: {
      articles: res.items,
    },
    revalidate: 10
  };
}

export default function viewAll({articles}) {
  return (
    <div>
      <Head>
        <title>14STROKE16 | FEATURES </title>
        <meta name="description" content={`14STROKE16 FEATURES`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto mt-10 px-3">
        <h1 className="text-2xl font-bold py-6">FEATURES</h1>
        <MasonryGrid>
          {articles.map((article) => (
            <div key={article.sys.id} className="masonry-item">
              <ArticleCard article={article} />
            </div>
          ))}
        </MasonryGrid>
      </div>
    </div>
  );
  
}
