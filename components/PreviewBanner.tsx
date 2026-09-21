import Link from "next/link";

export default function PreviewBanner() {
  return (
    <div className="flex h-14 items-center justify-center bg-red-500 text-lg font-bold text-white">
      <h2>PREVIEW MODE ENABLED</h2>
      <Link
        prefetch={false}
        href="/api/draft/disable"
        className="bg-ivoryWhite ml-5 rounded-lg px-2 py-2 text-xs font-bold text-black"
      >
        EXIT PREVIEW MODE
      </Link>
    </div>
  );
}
