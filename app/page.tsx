import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getHomepage } from "@/lib/contentful/homepage";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedArticleBlock from "@/components/FeaturedArticleBlock";
import EditorialBanner from "@/components/EditorialBanner";
import FitpicCarousel from "@/components/FitpicCarousel";
import PreviewBanner from "@/components/PreviewBanner";
import { getBannerItems, bannerSegments } from "@/lib/contentful/banner";
import { pillarPath } from "@/lib/contentful/pillars";

export const revalidate = 10;

export const metadata: Metadata = {
  title: { absolute: "14STROKE16" },
  description: "COMMUNITY DIARY. FASHION, ART, CULTURE",
};

export default async function Home() {
  // Draft mode (Contentful "Open preview" → /api/draft) lets editors preview the
  // unpublished homepage. Reading draftMode() opts this route into dynamic
  // rendering; outside preview it still revalidates on the interval above.
  const { isEnabled } = await draftMode();
  const homepage = await getHomepage(isEnabled);

  const hp = homepage?.fields;
  const heroArticle = hp?.heroArticle;
  // Headline source toggle: article title vs the fixed brand tagline (default).
  // Either source can be empty (no tagline typed, or an article with no title),
  // so this may be undefined — the hero then renders without a headline.
  const heroHeadline =
    hp?.heroHeadlineSource === "Article title" && heroArticle?.fields?.title
      ? heroArticle.fields.title
      : hp?.heroHeadline;
  // READ MORE points at the referenced lead item (Cover / Feature / Locked In);
  // falls back to the manual link.
  const heroCtaHref = heroArticle?.fields?.slug
    ? `${pillarPath(heroArticle.sys?.contentType?.sys?.id)}/${heroArticle.fields.slug}`
    : hp?.heroCtaLink;

  // Top banner. Priority: a custom message (if set) wins; otherwise show the
  // latest pillar items (Covers / Features / Locked In / Fit Pic) by talent —
  // up to 3 on desktop, 1 on mobile; falling back to the © line when there are
  // none. bannerEnabled is the master on/off.
  const bannerOn = hp ? hp.bannerEnabled !== false : false;
  const bannerCustom = hp?.bannerCustomMessage?.trim();
  const bannerFallback = `© ${new Date().getFullYear()} 14STROKE16 MAGAZINE`;

  const bannerItems =
    bannerOn && !bannerCustom ? await getBannerItems(3, isEnabled) : [];
  // Each pillar is its own banner section. Desktop shows up to 3, mobile 1;
  // custom message / © fallback are a single section.
  const bannerDesktopItems = bannerCustom
    ? [{ text: bannerCustom }]
    : bannerItems.length
      ? bannerSegments(bannerItems)
      : [{ text: bannerFallback }];
  const bannerMobileItems = bannerCustom
    ? [{ text: bannerCustom }]
    : bannerItems.length
      ? bannerSegments(bannerItems.slice(0, 1))
      : [{ text: bannerFallback }];

  return (
    <>
      {isEnabled && <PreviewBanner />}
      {bannerOn && (
        <>
          {/* Desktop: up to 3 pillar sections. Mobile: 1. */}
          <div className="hidden md:block">
            <Marquee items={bannerDesktopItems} />
          </div>
          <div className="md:hidden">
            <Marquee items={bannerMobileItems} />
          </div>
        </>
      )}

      {hp && (heroHeadline || hp.heroBackground || heroCtaHref) && (
        <Hero
          image={
            hp.heroBackground
              ? {
                  url: hp.heroBackground.fields.file.url,
                  alt: hp.heroBackground.fields.description,
                  type: hp.heroBackground.fields.file.contentType,
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
                  type: hp.editorialImage.fields.file.contentType,
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

      {/* THE TEAM section removed from the homepage (2026-11-27). The
          TeamSection component and the Contentful teamMembers data are kept for
          the About page. */}
    </>
  );
}
