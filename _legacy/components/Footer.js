import Image from "next/image"
import Link from "next/link";

export default function Footer() {
  return (
    <div className=" mt-20">
      <div className="flex justify-center align-center">
        <div>
          <Link
            href={`https://www.instagram.com/14stroke16?igsh=MXQyejNkZHV2cWYzMw==`}
            target="blank"
          >
            <Image
              src={"/instagram-logo.png"}
              width={35}
              height={35}
              alt="Instagram Logo"
            />
          </Link>
        </div>

        <Image
          src={"/logo-2.svg"}
          width={220}
          height={220}
          alt="Company Logo"
          className="ml-5"
        />

        <div className="ml-4">
          <Link
            href={`https://www.tiktok.com/@onefour_onesix?_t=8kxJKoRd1UW&_r=1`}
            target="blank"
          >
            <Image
              src={"/tiktok-logo.png"}
              width={32}
              height={32}
              alt="Tik Tok Logo"
            />
          </Link>
        </div>
      </div>
      <div>
        <p className="mt-2 text-center text-xs pb-5 text-gray-400">
          &copy; {new Date().getFullYear()} 14STROKE16 MAGAZINE
        </p>
      </div>
    </div>
  );
}
