"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import FitpicCard from "@/components/FitpicCard";
import type { FitPic } from "@/lib/contentful/types";

// Short, fixed-length thumb that travels the track (like the design) rather
// than a proportional scrollbar thumb.
const THUMB_W = 64;

// FITPIC section: a dark band. The chip, card row and CTA share one max-w
// container so the chip lines up with the first card and the cards stay
// contained (not full-bleed). A custom, permanently visible progress bar
// (thicker outlined track + short draggable thumb) shows and controls scroll.
export default function FitpicCarousel({ items }: { items: FitPic[] }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const [thumbLeft, setThumbLeft] = useState(0);

  const update = useCallback(() => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 0;
    setThumbLeft(progress * Math.max(0, track.clientWidth - THUMB_W));
  }, []);

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollToClientX = (clientX: number) => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (clientX - rect.left - THUMB_W / 2) / (rect.width - THUMB_W)),
    );
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    scrollToClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) scrollToClientX(e.clientX);
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  if (!items?.length) return null;
  const list = items.slice(0, 6);

  return (
    <section className="border-t border-ivoryWhite/20 bg-black py-16 text-ivoryWhite md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionLabel className="text-2xl md:text-3xl">FITPIC.</SectionLabel>

        <div
          ref={scrollRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {list.map((item) => (
            <div
              key={item.sys.id}
              className="w-[72vw] shrink-0 snap-start sm:w-[300px]"
            >
              <FitpicCard item={item} />
            </div>
          ))}
        </div>

        {list.length > 1 && (
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="relative mt-6 h-3 w-full cursor-pointer touch-none rounded-full border border-ivoryWhite/40"
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-ivoryWhite"
              style={{ width: THUMB_W, transform: `translateX(${thumbLeft}px)` }}
            />
          </div>
        )}

        <div className="mt-8">
          <Button href="/fitpics" variant="outline" withArrow>
            All fitpics
          </Button>
        </div>
      </div>
    </section>
  );
}
