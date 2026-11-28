import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getArticleBySlug, getArticleSlugs } from "@/lib/contentful/articles";
import ArticleContent from "@/components/ArticleContent";
import ArticleAnalytics from "@/components/ArticleAnalytics";
import PreviewBanner from "@/components/PreviewBanner";

export const revalidate = 10;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.fields.title,
    description: `Read about ${article.fields.title}`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const article = await getArticleBySlug(slug, isEnabled);
  if (!article) notFound();

  const { title, readTime, author, articlePublishedDate } = article.fields;

  return (
    <div>
      {isEnabled && <PreviewBanner />}
      <ArticleAnalytics
        title={title}
        author={author}
        slug={slug}
        articlePublishedDate={articlePublishedDate}
        readTime={readTime}
      />
      <ArticleContent article={article} />
    </div>
  );
}
