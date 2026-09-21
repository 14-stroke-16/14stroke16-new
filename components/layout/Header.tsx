import Link from "next/link";

const NAV_LINKS = [
  { href: "/articles", label: "Features" },
  { href: "/events", label: "Events" },
  { href: "/community", label: "Community" },
  { href: "/gallery", label: "Gallery" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

// Placeholder header — mobile nav (formerly react-burger-menu) and the rebrand
// styling are handled in a later phase.
export default function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between px-3 py-6">
      <Link href="/" className="text-xl font-bold uppercase">
        14STROKE16
      </Link>
      <nav className="hidden gap-6 md:flex">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm uppercase">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
