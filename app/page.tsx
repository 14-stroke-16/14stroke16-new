import type { Metadata } from "next";
import { getHomepage } from "@/lib/contentful/homepage";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedArticleBlock from "@/components/FeaturedArticleBlock";
import EditorialBanner from "@/components/EditorialBanner";
import FitpicCarousel from "@/components/FitpicCarousel";

export const revalidate = 10;

export const metadata: Metadata = {
  title: { absolute: "14STROKE16" },
  description: "COMMUNITY DIARY. FASHION, ART, CULTURE",
};

export default async function Home() {
  const homepage = await getHomepage();

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

      {hp?.editorialText && (
        <EditorialBanner
          image={
            hp.editorialImage
              ? {
                  url: hp.editorialImage.fields.file.url,
                  alt: hp.editorialImage.fields.description,
                }
              : null
          }
          label={hp.editorialLabel}
          text={hp.editorialText}
          ctaLabel={hp.editorialCtaLabel}
          ctaHref={hp.editorialCtaLink}
        />
      )}

      {hp?.fitPics && hp.fitPics.length > 0 && (
        <FitpicCarousel items={hp.fitPics} />
      )}

      {/* THE TEAM section + real footer to follow. */}
    </>
  );
}
