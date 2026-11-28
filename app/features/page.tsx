import type { Metadata } from "next";
import { getFeatures } from "@/lib/contentful/pillars";
import ArticleCard from "@/components/cards/ArticleCard";
import BackToHome from "@/components/BackToHome";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Features",
  description: "14STROKE16 Features",
};

export default async function FeaturesPage() {
  const features = await getFeatures();

  return (
    <div className="container mx-auto mt-10 px-3">
      <BackToHome />
      <h1 className="py-6 text-2xl font-bold">FEATURES</h1>
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {features.map((feature) => (
          <div key={feature.sys.id} className="mb-4 break-inside-avoid">
            <ArticleCard article={feature} />
          </div>
        ))}
      </div>
    </div>
  );
}
