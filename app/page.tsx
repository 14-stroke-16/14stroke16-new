import type { Metadata } from "next";
import { getArticles } from "@/lib/contentful/articles";
import HomepageArticle from "@/components/HomepageArticle";

export const revalidate = 10;

export const metadata: Metadata = {
  title: { absolute: "14STROKE16" },
  description: "COMMUNITY DIARY. FASHION, ART, CULTURE",
};

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="mx-auto my-10 px-1 md:max-w-[1200px] md:px-0">
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {articles.slice(0, 9).map((article) => (
          <div key={article.sys.id} className="mb-4 break-inside-avoid">
            <HomepageArticle article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
