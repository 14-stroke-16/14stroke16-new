"use client";

import { useCallback } from "react";

// Autoplaying, muted, looping background video (hero/featured/editorial).
//
// iOS Safari only autoplays a video when it is muted AND the `muted` attribute
// is present on the element — but React does NOT emit `muted` into the markup
// (it manages it as a property), so on a real iPhone the video stays paused and
// shows a play button. The callback ref below sets `defaultMuted` (which makes
// the `muted` content attribute reflect) as early as possible and nudges
// play(), matching the plain `autoplay loop muted playsinline` setup that sites
// like 032c use. A single element is deliberate: iOS is unreliable about
// autoplaying more than one video at once.
//
// NOTE: a truly seamless loop also depends on the clip itself — the source
// should be encoded so its first and last frames match (a "loop-ready" export).
// If autoplay still doesn't start on a device, check iOS Low Power Mode, which
// blocks muted autoplay entirely; the poster image shows in that case.
export default function BackgroundVideo({
  src,
  type,
  poster,
  className = "",
}: {
  src: string;
  type?: string;
  poster?: string;
  className?: string;
}) {
  const setup = useCallback((v: HTMLVideoElement | null) => {
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    const played = v.play();
    if (played && typeof played.catch === "function") {
      played.catch(() => {
        /* autoplay may be blocked (e.g. iOS Low Power Mode); poster shows. */
      });
    }
  }, []);

  return (
    <video
      ref={setup}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
    >
      <source src={src} type={type} />
    </video>
  );
}
