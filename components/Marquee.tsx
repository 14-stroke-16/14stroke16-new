interface MarqueeProps {
  /** Each string is its own repeating section (pillar item), e.g.
   *  ["FEATURES: A1NANA", "LOCKED IN: FILMABDI", "FITPIC: JAY TAGLE"]. */
  items: string[];
}

// Top moving banner — the only marquee on the homepage. Each item is its own
// section, divided by a "|" so the pillars read as distinct things, and the
// sequence repeats so you cycle 1, 2, 3, 1, 2, 3… Two identical tracks sit side
// by side and the pair is translated -50% for a seamless loop (CSS only).
// Respects prefers-reduced-motion.
export default function Marquee({ items }: MarqueeProps) {
  if (!items.length) return null;

  // Repeat the items enough times to comfortably fill (and overflow) the track.
  const REPEAT = 6;
  const sequence = Array.from({ length: REPEAT }).flatMap(() => items);

  const track = (prefix: string, hidden = false) => (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {sequence.map((item, i) => (
        <span key={`${prefix}-${i}`} className="flex items-center">
          <span className="px-8 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
            {item}
          </span>
          <span className="py-2 text-xs opacity-40" aria-hidden="true">
            |
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden border-y border-black/70 bg-ivoryWhite text-black">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {track("a")}
        {track("b", true)}
      </div>
    </div>
  );
}
