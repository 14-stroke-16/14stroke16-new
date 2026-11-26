import type { Metadata } from "next";
import { getArticles } from "@/lib/contentful/articles";
import { getHomepage } from "@/lib/contentful/homepage";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedArticleBlock from "@/components/FeaturedArticleBlock";
import HomepageArticle from "@/components/HomepageArticle";

export const revalidate = 10;

export const metadata: Metadata = {
  title: { absolute: "14STROKE16" },
  description: "COMMUNITY DIARY. FASHION, ART, CULTURE",
};

export default async function Home() {
  const [homepage, articles] = await Promise.all([getHomepage(), getArticles()]);

  const hp = homepage?.fields;
  const heroArticle = hp?.heroArticle;
  // Headline source toggle: article title vs the fixed brand tagline (default).
  const heroHeadline =
    hp?.heroHeadlineSource === "Article title" && heroArticle?.fields?.title
      ? heroArticle.fields.title
      : hp?.heroHeadline;
  // READ MORE points at the referenced lead article; falls back to the manual link.
  const heroCtaHref = heroArticle?.fields?.slug
    ? `/articles/${heroArticle.fields.slug}`
    : hp?.heroCtaLink;

  // Top banner: custom message, else auto "© <year> 14STROKE16 MAGAZINE".
  const bannerOn = hp ? hp.bannerEnabled !== false : false;
  const bannerText =
    hp?.bannerCustomMessage?.trim() ||
    `© ${new Date().getFullYear()} 14STROKE16 MAGAZINE`;

  return (
    <>
      {bannerOn && <Marquee text={bannerText} />}

      {hp && heroHeadline && (
        <Hero
          image={
            hp.heroBackground
              ? {
                  url: hp.heroBackground.fields.file.url,
                  alt: hp.heroBackground.fields.description,
                }
              : null
          }
          headline={heroHeadline}
          intro={hp.heroIntro}
          ctaLabel={hp.heroCtaLabel}
          ctaHref={heroCtaHref}
        />
      )}

      {hp?.featuredArticles?.map((item, i) => (
        <FeaturedArticleBlock key={item.sys.id} item={item} index={i} />
      ))}

      {/* TODO: replace with the designed Editorial / FITPIC / Team sections.
          Temporary article grid kept below during the rebuild. */}
      <div className="mx-auto my-10 px-1 md:max-w-[1200px] md:px-0">
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {articles.slice(0, 9).map((article) => (
            <div key={article.sys.id} className="mb-4 break-inside-avoid">
              <HomepageArticle article={article} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
