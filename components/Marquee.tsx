import Link from "next/link";

interface MarqueeItem {
  text: string;
  /** When set, the segment links to this page. */
  href?: string;
}

interface MarqueeProps {
  items: MarqueeItem[];
}

// Top moving banner — the only marquee on the homepage. Each item is its own
// section, divided by a "|", and links to its page when it has one. The
// sequence repeats so you cycle 1, 2, 3, 1, 2, 3… Two identical tracks sit side
// by side and the pair is translated -50% for a seamless loop (CSS only). It
// runs slower on desktop (90s) than mobile (60s) since there's more to scroll
// and the links are clickable targets. Respects prefers-reduced-motion.
export default function Marquee({ items }: MarqueeProps) {
  if (!items.length) return null;

  // Repeat the items enough times to comfortably fill (and overflow) the track.
  const REPEAT = 6;
  const sequence = Array.from({ length: REPEAT }).flatMap(() => items);

  const segmentClass =
    "px-8 py-2 text-xs font-semibold uppercase tracking-[0.2em] no-underline";

  const track = (prefix: string, hidden = false) => (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {sequence.map((item, i) => (
        <span key={`${prefix}-${i}`} className="flex items-center">
          {item.href ? (
            <Link
              href={item.href}
              className={`${segmentClass} transition-opacity hover:opacity-60`}
              tabIndex={hidden ? -1 : undefined}
            >
              {item.text}
            </Link>
          ) : (
            <span className={segmentClass}>{item.text}</span>
          )}
          <span className="py-2 text-xs opacity-40" aria-hidden="true">
            |
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden border-y border-black/70 bg-ivoryWhite text-black">
      <div className="flex w-max animate-[marquee_60s_linear_infinite] motion-reduce:animate-none md:animate-[marquee_90s_linear_infinite]">
        {track("a")}
        {track("b", true)}
      </div>
    </div>
  );
}
