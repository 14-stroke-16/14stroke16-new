import type { Metadata } from "next";
import { getArticles } from "@/lib/contentful/articles";
import ArticleCard from "@/components/cards/ArticleCard";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Features",
  description: "14STROKE16 Features",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto mt-10 px-3">
      <h1 className="py-6 text-2xl font-bold">FEATURES</h1>
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {articles.map((article) => (
          <div key={article.sys.id} className="mb-4 break-inside-avoid">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
