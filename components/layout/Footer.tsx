import Link from "next/link";

// Footer: one line of links + copyright, then an oversized full-width
// 14STROKE16 wordmark as the last thing on the page. Hardcoded (not CMS).
// Social links live on the Contact page, not here. /legal is a single page
// holding the Privacy Policy + T&Cs; /shipping its own page.
const LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Legals", href: "/legal" },
  { label: "Shipping", href: "/shipping" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-ivoryWhite">
      {/* Links + copyright, one line (wraps only on very narrow screens) */}
      <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-12 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-wide">
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="transition-colors hover:text-brandRed"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="text-ivoryWhite/60">
            &copy; {year} 14STROKE16 Magazine &mdash; All rights reserved
          </p>
        </div>
      </div>

      {/* Oversized wordmark — last thing on the page, one line, full-bleed.
          16.2vw fills the viewport width on a single line. overflow-x hides any
          sub-pixel horizontal spill; generous line-height so the caps are not
          clipped at the top, with a negative bottom margin to sit it flush. */}
      <div className="overflow-x-hidden">
        <p className="-mb-[2.5vw] whitespace-nowrap text-center text-[16.2vw] font-bold uppercase leading-none tracking-tight">
          14STROKE16
        </p>
      </div>
    </footer>
  );
}
