import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  /** true = black chip with ivory text; false = ivory chip with black text. */
  invert?: boolean;
  className?: string;
}

// The small boxed section labels in the design (e.g. "FITPIC.", "THE TEAM.",
// "ABOUT US."). Invertible so it reads on light or dark sections.
export default function SectionLabel({
  children,
  invert = false,
  className = "",
}: SectionLabelProps) {
  const colors = invert
    ? "bg-black text-ivoryWhite"
    : "bg-ivoryWhite text-black";
  return (
    <span
      className={`inline-block px-4 py-2 text-lg font-bold uppercase leading-none ${colors} ${className}`}
    >
      {children}
    </span>
  );
}
