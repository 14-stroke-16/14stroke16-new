import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Link from "next/link";
import { getFeatureBySlug, getFeatureSlugs } from "@/lib/contentful/pillars";
import ArticleContent from "@/components/ArticleContent";
import PreviewBanner from "@/components/PreviewBanner";

export const revalidate = 10;

export async function generateStaticParams() {
  const slugs = await getFeatureSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getFeatureBySlug(slug);
  if (!item) return {};
  return { title: item.fields.title, description: item.fields.excerpt };
}

// Feature page. Features share the Article shape, so they use the same full
// article renderer as Covers.
export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const item = await getFeatureBySlug(slug, isEnabled);
  if (!item) notFound();

  return (
    <div>
      {isEnabled && <PreviewBanner />}
      <div className="mx-auto max-w-[1200px] px-5 pt-8 md:px-0">
        <Link
          href="/"
          className="text-xs uppercase tracking-wide opacity-60 hover:opacity-100"
        >
          ← Home
        </Link>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
          Feature
        </p>
      </div>
      <ArticleContent article={item} />
    </div>
  );
}
