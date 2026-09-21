import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="flex items-center justify-center">
        <Link
          href="https://www.instagram.com/14stroke16?igsh=MXQyejNkZHV2cWYzMw=="
          target="_blank"
        >
          <Image
            src="/instagram-logo.png"
            width={35}
            height={35}
            alt="Instagram"
          />
        </Link>

        <Image
          src="/logo-2.svg"
          width={220}
          height={220}
          alt="14STROKE16 logo"
          className="ml-5"
        />

        <Link
          href="https://www.tiktok.com/@onefour_onesix?_t=8kxJKoRd1UW&_r=1"
          target="_blank"
          className="ml-4"
        >
          <Image src="/tiktok-logo.png" width={32} height={32} alt="TikTok" />
        </Link>
      </div>
      <p className="mt-2 pb-5 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} 14STROKE16 MAGAZINE
      </p>
    </footer>
  );
}
