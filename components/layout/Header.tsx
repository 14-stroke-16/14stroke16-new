"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Features" },
  { href: "/community", label: "Community" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
];

// Custom mobile/slide-in nav — replaces the old react-burger-menu dependency.
// Styling is intentionally minimal; the rebrand restyles it later.
export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-ivoryWhite">
      <Link href="/" onClick={close} className="px-4 py-4 md:px-6">
        <Image
          src="/logo_svg.svg"
          width={320}
          height={80}
          alt="14STROKE16 logo"
          priority
          className="h-auto w-[180px] md:w-[320px]"
        />
      </Link>

      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col gap-1.5 p-4"
      >
        <span className="block h-0.5 w-6 bg-black" />
        <span className="block h-0.5 w-6 bg-black" />
        <span className="block h-0.5 w-6 bg-black" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-ivoryWhite p-8 shadow-lg transition-transform duration-300 ${
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
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className="text-lg uppercase"
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
