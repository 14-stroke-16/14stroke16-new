import Link from "next/link";

// Small "back to home" link for the top of category/listing pages.
export default function BackToHome() {
  return (
    <Link
      href="/"
      className="inline-block text-xs uppercase tracking-wide opacity-60 transition-opacity hover:opacity-100"
    >
      ← Back to home
    </Link>
  );
}
