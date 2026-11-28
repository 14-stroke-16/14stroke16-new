"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteChrome } from "@/lib/contentful/types";

// Nav + colours come from the Site Chrome entry in Contentful. They apply on
// the homepage always, and site-wide when its Scope is "Whole site"; otherwise
// these hardcoded defaults are used. Magazine/Print/Cart are "#" placeholders;
// About → /about exists. The Cart button is a fixed element (ecommerce), not a
// CMS link.
const DEFAULT_NAV = [
  { href: "#", label: "Magazine" },
  { href: "/about", label: "About" },
  { href: "#", label: "Print" },
];
const CART = { href: "#", label: "Cart" };

export default function Header({ chrome }: { chrome?: SiteChrome | null }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const pathname = usePathname();

  const applies = pathname === "/" || chrome?.fields?.scope === "Whole site";
  const navLinks =
    applies && chrome?.fields?.navLinks?.length
      ? chrome.fields.navLinks.map((l) => ({
          label: l.fields.label,
          href: l.fields.href,
        }))
      : DEFAULT_NAV;
  const bg = applies ? chrome?.fields?.backgroundColor : undefined;
  const fg = applies ? chrome?.fields?.textColor : undefined;

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between bg-ivoryWhite px-4 py-4 text-black md:px-8"
      style={{ backgroundColor: bg, color: fg }}
    >
      <Link href="/" onClick={close} aria-label="14STROKE16 home">
        <Image
          src="/logo_svg.svg"
          width={320}
          height={80}
          alt="14STROKE16 logo"
          priority
          className="h-auto w-[130px] md:w-[180px]"
        />
      </Link>

      {/* Desktop inline nav */}
      <nav className="hidden items-center gap-8 md:flex lg:gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs font-medium uppercase tracking-wide hover:opacity-60"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={CART.href}
          className="bg-black px-10 py-2.5 text-xs font-bold uppercase tracking-wide text-ivoryWhite transition-opacity hover:opacity-90"
        >
          {CART.label}
        </Link>
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col gap-1.5 md:hidden"
      >
        <span className="block h-0.5 w-6 bg-current" />
        <span className="block h-0.5 w-6 bg-current" />
        <span className="block h-0.5 w-6 bg-current" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-in menu */}
      <nav
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-ivoryWhite p-8 text-black shadow-lg transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={close}
          className="mb-8 text-2xl leading-none"
        >
          &times;
        </button>
        <ul className="flex flex-col gap-5">
          {[...navLinks, CART].map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={close}
                className="text-lg font-bold uppercase"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
