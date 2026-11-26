import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { getFitPicBySlug, getFitPicSlugs } from "@/lib/contentful/fitpics";
import PreviewBanner from "@/components/PreviewBanner";

export const revalidate = 10;

export async function generateStaticParams() {
  const slugs = await getFitPicSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getFitPicBySlug(slug);
  if (!item) return {};
  return { title: item.fields.title, description: item.fields.excerpt };
}

// Minimal individual fit pic page — image, title, excerpt. The full layout
// will be fleshed out once its design is delivered (more fields can be added
// to the `fitPic` content type then).
export default async function FitPicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const item = await getFitPicBySlug(slug, isEnabled);
  if (!item) notFound();

  const { title, image, imageAltTag, excerpt } = item.fields;
  const url = image?.fields?.file?.url;

  return (
    <div>
      {isEnabled && <PreviewBanner />}
      <main className="mx-auto my-12 max-w-[900px] px-5 md:px-0">
        <Link
          href="/fitpics"
          className="text-xs uppercase tracking-wide opacity-60 hover:opacity-100"
        >
          ← All fit pics
        </Link>
        <h1 className="mt-6 text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        {url && (
          <div className="relative mt-8 aspect-[3/4] w-full overflow-hidden bg-black/10">
            <Image
              src={`https:${url}`}
              alt={imageAltTag || title}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        )}
        {excerpt && (
          <p className="mt-8 whitespace-pre-wrap text-base leading-relaxed xl:text-lg">
            {excerpt}
          </p>
        )}
      </main>
    </div>
  );
}
