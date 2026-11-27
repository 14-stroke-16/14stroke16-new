"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteChrome } from "@/lib/contentful/types";

// Footer: a full-width row of links + copyright, then an oversized 14STROKE16
// wordmark as the last thing on the page. Links and background/text colour come
// from the Site Chrome entry (applied on the homepage always, and site-wide when
// its Scope is "Whole site"); otherwise these defaults are used. Social links
// live on the Contact page, not here. /legal holds Privacy + T&Cs; /shipping its
// own page.
const DEFAULT_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Legals", href: "/legal" },
  { label: "Shipping", href: "/shipping" },
];

export default function Footer({ chrome }: { chrome?: SiteChrome | null }) {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const applies = pathname === "/" || chrome?.fields?.scope === "Whole site";
  const links =
    applies && chrome?.fields?.footerLinks?.length
      ? chrome.fields.footerLinks.map((l) => ({
          label: l.fields.label,
          href: l.fields.href,
        }))
      : DEFAULT_LINKS;
  const bg = applies ? chrome?.fields?.backgroundColor : undefined;
  const fg = applies ? chrome?.fields?.textColor : undefined;

  return (
    <footer
      className="bg-ivoryWhite text-black"
      style={{ backgroundColor: bg, color: fg }}
    >
      {/* Links + copyright. On phones the side gutter matches the inset wordmark
          below (~5.25vw) so they line up; full-width padding from sm up. */}
      <div className="px-[5.25vw] pb-10 pt-12 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-wide">
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="transition-colors hover:text-brandRed"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="opacity-60">
            &copy; {year} 14STROKE16 Magazine &mdash; All rights reserved
          </p>
        </div>
      </div>

      {/* Oversized wordmark — last thing on the page, one line. On phones it is
          inset on all sides (14.5vw + a matching bottom gutter) so rounded screen
          corners clip the footer background, not the text. From sm up it is
          full-bleed (16.2vw) and pulled flush to the bottom, as on desktop. */}
      <div className="overflow-x-hidden pb-[5.25vw] sm:pb-0">
        <p className="whitespace-nowrap text-center text-[14.5vw] font-bold uppercase leading-none tracking-tight sm:-mb-[2.5vw] sm:text-[16.2vw]">
          14STROKE16
        </p>
      </div>
    </footer>
  );
}
