// Responsive, privacy-friendly embed for a YouTube or Vimeo URL (for long-form
// in-content video). Falls back to a plain link for unrecognised URLs.
function embedSrc(url: string): string | null {
  const yt =
    url.match(/youtu\.be\/([\w-]{11})/) ||
    url.match(/youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}

export default function VideoEmbed({
  url,
  title,
}: {
  url: string;
  title?: string;
}) {
  const src = embedSrc(url);

  if (!src) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Watch video
      </a>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16 / 9" }}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={title || "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
