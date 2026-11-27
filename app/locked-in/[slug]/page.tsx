import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { getLockedInBySlug, getLockedInSlugs } from "@/lib/contentful/pillars";
import PreviewBanner from "@/components/PreviewBanner";

export const revalidate = 10;

export async function generateStaticParams() {
  const slugs = await getLockedInSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getLockedInBySlug(slug);
  if (!item) return {};
  return { title: item.fields.title, description: item.fields.excerpt };
}

// Minimal Locked In page. Shares the Article shape; the full layout can reuse
// the article renderer once its design is confirmed.
export default async function LockedInPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const item = await getLockedInBySlug(slug, isEnabled);
  if (!item) notFound();

  const { title, featuredImage, featuredImageAltTag, excerpt, introductionText } =
    item.fields;
  const url = featuredImage?.fields?.file?.url;

  return (
    <div>
      {isEnabled && <PreviewBanner />}
      <main className="mx-auto my-12 max-w-[900px] px-5 md:px-0">
        <Link
          href="/"
          className="text-xs uppercase tracking-wide opacity-60 hover:opacity-100"
        >
          ← Home
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
          Locked In
        </p>
        <h1 className="mt-2 text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        {url && (
          <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden bg-black/10">
            <Image
              src={`https:${url}`}
              alt={featuredImageAltTag || title}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        )}
        {(introductionText || excerpt) && (
          <p className="mt-8 whitespace-pre-wrap text-base leading-relaxed xl:text-lg">
            {introductionText || excerpt}
          </p>
        )}
      </main>
    </div>
  );
}
