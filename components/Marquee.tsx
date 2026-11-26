interface MarqueeProps {
  text: string;
}

// Top moving banner — the only marquee on the homepage. Two identical tracks
// sit side by side and the pair is translated -50% for a seamless infinite
// loop (CSS only, no JS). Respects prefers-reduced-motion.
export default function Marquee({ text }: MarqueeProps) {
  const items = Array.from({ length: 8 });

  return (
    <div className="w-full overflow-hidden border-y border-black/70 bg-ivoryWhite text-black">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <div className="flex shrink-0">
          {items.map((_, i) => (
            <span
              key={`a-${i}`}
              className="px-8 py-2 text-xs font-semibold uppercase tracking-wide"
            >
              {text}
            </span>
          ))}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {items.map((_, i) => (
            <span
              key={`b-${i}`}
              className="px-8 py-2 text-xs font-semibold uppercase tracking-wide"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
