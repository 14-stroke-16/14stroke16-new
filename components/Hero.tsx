import Button from "@/components/ui/Button";
import Media from "@/components/Media";

interface HeroProps {
  /** Full-bleed background image or video. If absent, falls back to a solid dark bg. */
  image?: { url: string; alt?: string; type?: string } | null;
  headline: string;
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
    <section className="relative flex min-h-[100dvh] w-full items-end overflow-hidden bg-black md:min-h-[calc(100dvh-102px)]">
      <Media
        src={src}
        type={image?.type}
        alt={image?.alt ?? ""}
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-[13vh] pt-24 text-ivoryWhite md:px-8">
        <h1 className="whitespace-pre-line text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl md:leading-[0.7] lg:text-8xl">
          {headline}
        </h1>
        {intro && (
          <p className="mt-4 max-w-md text-xs leading-snug md:text-sm">
            {intro}
          </p>
        )}
        {ctaLabel && ctaHref && (
          <div className="mt-6">
            <Button href={ctaHref} variant="outline">
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
