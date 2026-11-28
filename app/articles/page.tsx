import type { Metadata } from "next";
import { getArticles } from "@/lib/contentful/articles";
import ArticleCard from "@/components/cards/ArticleCard";
import BackToHome from "@/components/BackToHome";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Covers",
  description: "14STROKE16 Covers",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto mt-10 px-3">
      <BackToHome />
      <h1 className="py-6 text-2xl font-bold">COVERS</h1>
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
