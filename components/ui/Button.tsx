import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "outline" | "solid";

interface ButtonProps {
  children: ReactNode;
  /** If set, renders a Next.js Link; otherwise a <button>. */
  href?: string;
  variant?: Variant;
  /** Appends a trailing arrow (used by ALL ARTICLES / ALL FITPICS). */
  withArrow?: boolean;
  className?: string;
  target?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

// Shared CTA used across the homepage (hero ABOUT US, READ MORE, ALL ARTICLES, etc.).
// `outline` uses the inherited text colour (border-current), so the same button
// works on light and dark backgrounds — the parent sets the colour.
const base =
  "inline-flex items-center gap-2 rounded-lg px-10 py-2.5 text-sm font-bold uppercase tracking-wide transition-opacity";

const variants: Record<Variant, string> = {
  outline: "border border-current bg-transparent hover:opacity-60",
  solid: "border border-black bg-black text-ivoryWhite hover:opacity-90",
};

export default function Button({
  children,
  href,
  variant = "outline",
  withArrow = false,
  className = "",
  target,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <span aria-hidden="true">→</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        onClick={onClick}
        aria-label={ariaLabel}
        className={cls}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cls}>
      {content}
    </button>
  );
}
