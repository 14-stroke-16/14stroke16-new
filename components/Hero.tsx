import Link from "next/link";
import Button from "@/components/ui/Button";
import Media from "@/components/Media";

interface HeroProps {
  /** Full-bleed background image or video. If absent, falls back to a solid dark bg. */
  image?: { url: string; alt?: string; type?: string } | null;
  /** Optional — the hero still renders (background + click target) without it. */
  headline?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

// Homepage hero: full-bleed image, large overlaid headline (bottom-left),
// intro paragraph and an outlined CTA. Text is ivory on the darkened image,
// so the outline Button inherits a light border via border-current.
export default function Hero({
  image,
  headline,
  intro,
  ctaLabel,
  ctaHref,
}: HeroProps) {
  const src = image?.url
    ? image.url.startsWith("http")
      ? image.url
      : `https:${image.url}`
    : null;

  return (
    <section className="hero-min-h relative flex w-full items-end overflow-hidden bg-black">
      <Media
        src={src}
        type={image?.type}
        alt={image?.alt ?? ""}
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      {/* Whole-hero click target → the lead article (or fallback link). Rendered
          as a full-bleed overlay link so clicking anywhere on the hero navigates,
          even when there's no visible CTA button. When a CTA button IS shown it
          points to the same place, so this overlay is hidden from keyboard/AT
          (tabIndex -1 + aria-hidden) to avoid a duplicate tab stop; mouse users
          still get the full-area click. */}
      {ctaHref && (
        <Link
          href={ctaHref}
          aria-label={ctaLabel ? undefined : headline || "Read more"}
          aria-hidden={ctaLabel ? true : undefined}
          tabIndex={ctaLabel ? -1 : undefined}
          className="absolute inset-0 z-20"
        />
      )}

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-[13vh] pt-24 text-ivoryWhite md:px-8">
        {headline && (
          <h1 className="whitespace-pre-line text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl md:leading-[0.7] lg:text-8xl">
            {headline}
          </h1>
        )}
        {intro && (
          <p className="mt-4 max-w-md text-xs leading-snug md:text-sm">
            {intro}
          </p>
        )}
        {ctaLabel && ctaHref && (
          <div className="pointer-events-auto relative z-30 mt-6">
            <Button href={ctaHref} variant="outline">
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
