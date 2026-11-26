"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Nav items follow the homepage design (Production · About Us · Contact · Shop).
// NOTE: destinations for Production and Shop are still TBD — Shop depends on the
// ecommerce work (docs/ecommerce-plan.md); both point at "#" until confirmed.
// About Us → /about (stub) and Contact → /contact already exist.
// See docs/homepage-redesign-plan.md §7.7.
const NAV_LINKS = [
  { href: "#", label: "Production" }, // TODO: destination TBD
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];
const SHOP = { href: "#", label: "Shop" }; // TODO: destination TBD (ecommerce)

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-ivoryWhite px-4 py-4 md:px-8">
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
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs font-medium uppercase tracking-wide hover:opacity-60"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={SHOP.href}
          className="bg-black px-10 py-2.5 text-xs font-bold uppercase tracking-wide text-ivoryWhite transition-opacity hover:opacity-90"
        >
          {SHOP.label}
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
        <span className="block h-0.5 w-6 bg-black" />
        <span className="block h-0.5 w-6 bg-black" />
        <span className="block h-0.5 w-6 bg-black" />
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
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-ivoryWhite p-8 shadow-lg transition-transform duration-300 md:hidden ${
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
          {[...NAV_LINKS, SHOP].map((link) => (
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
