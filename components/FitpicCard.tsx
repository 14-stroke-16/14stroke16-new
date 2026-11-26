import Image from "next/image";
import Link from "next/link";
import type { FitPic } from "@/lib/contentful/types";

// A fit pic card (used in the homepage carousel and the /fitpics listing).
// Text colour is inherited, so it reads on both dark and light backgrounds.
export default function FitpicCard({ item }: { item: FitPic }) {
  const { title, slug, image, imageAltTag, excerpt } = item.fields;
  const url = image?.fields?.file?.url;

  return (
    <Link href={`/fitpics/${slug}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/20">
        {url && (
          <Image
            src={`https:${url}`}
            alt={imageAltTag || title}
            fill
            sizes="(max-width: 768px) 80vw, 340px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold uppercase leading-tight tracking-tight">
        {title}
      </h3>
      {excerpt && (
        <p className="mt-2 line-clamp-2 text-sm opacity-60">{excerpt}</p>
      )}
    </Link>
  );
}
