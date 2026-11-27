"use client";

import { useEffect, useRef } from "react";

// Autoplaying, muted, looping background video (hero/featured/editorial).
// React doesn't emit the `muted` attribute in the server-rendered HTML, so
// mobile browsers block autoplay on first paint. We force muted and call play()
// from the client on mount — muted playback is allowed without a user gesture.
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
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.setAttribute("muted", "");
    const played = video.play();
    if (played && typeof played.catch === "function") {
      played.catch(() => {
        /* autoplay may be blocked (e.g. iOS Low Power Mode); poster shows. */
      });
    }
  }, []);

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
    >
      <source src={src} type={type} />
    </video>
  );
}
