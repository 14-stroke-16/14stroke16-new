import { createClient } from "contentful";
import HomepageArticle from "@/components/HomepageArticle";
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
     revalidate: 10,
   };
  
}
  
export default function Home({articles}) {

  return (
    <div>
      <Head>
        <title>14STROKE16 | HOME </title>
        <meta
          name="description"
          content={`COMMUNITY DIARY. FASHION, ART, CULTURE`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MasonryGrid>
          {articles.slice(0, 9).map((article) => (
            <HomepageArticle key={article.sys.id} article={article} />
          ))}
        </MasonryGrid>
      </div>
    </div>
  );
}
