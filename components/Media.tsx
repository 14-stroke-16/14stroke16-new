import Image from "next/image";

interface MediaProps {
  /** Resolved asset URL (already prefixed with https:). */
  src?: string | null;
  /** The asset's MIME type (file.contentType). Video types render a <video>. */
  type?: string;
  alt?: string;
  /** Cover its container like next/image fill — used for hero/featured backgrounds. */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  /** Poster image shown for video before it plays / if autoplay is blocked. */
  poster?: string;
  className?: string;
  width?: number;
  height?: number;
}

// Renders a Contentful asset as a <video> when it's a video file, otherwise a
// next/image. In `fill` mode (hero/featured backgrounds) video autoplays muted
// and loops; inline video gets player controls.
export default function Media({
  src,
  type,
  alt = "",
  fill,
  sizes,
  priority,
  poster,
  className = "",
  width,
  height,
}: MediaProps) {
  if (!src) return null;
  const isVideo = (type || "").startsWith("video/");

  if (isVideo) {
    if (fill) {
      return (
        <video
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
    return (
      <video
        className={className || "w-full"}
        controls
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type={type} />
      </video>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 600}
      height={height ?? 600}
      priority={priority}
      className={className}
    />
  );
}
