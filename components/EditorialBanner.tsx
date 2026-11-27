import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import Media from "@/components/Media";

interface EditorialBannerProps {
  image?: { url: string; alt?: string; type?: string } | null;
  label?: string;
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
}

// Full-bleed editorial statement: a chip label, a large left-aligned quote over
// a darkened full-bleed image, and an optional CTA (e.g. ALL ARTICLES →).
export default function EditorialBanner({
  image,
  label,
  text,
  ctaLabel,
  ctaHref,
}: EditorialBannerProps) {
  const src = image?.url
    ? image.url.startsWith("http")
      ? image.url
      : `https:${image.url}`
    : null;

  return (
    <section className="relative flex min-h-[80vh] w-full items-center overflow-hidden bg-black">
      <Media
        src={src}
        type={image?.type}
        alt={image?.alt ?? ""}
        fill
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 py-16 text-ivoryWhite md:px-8">
        {label && (
          <div className="mb-6">
            <SectionLabel>{label}</SectionLabel>
          </div>
        )}
        <p className="max-w-4xl whitespace-pre-line text-2xl font-bold uppercase leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
          {text}
        </p>
        {ctaLabel && ctaHref && (
          <div className="mt-8">
            <Button href={ctaHref} variant="outline" withArrow>
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
