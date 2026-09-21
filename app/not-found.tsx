import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-md px-6 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Page Not Found
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          The page you are looking for might have been removed or does not
          exist.
        </p>
        <Link href="/">
          <p>
            Go back to{" "}
            <span className="font-medium text-blue-600 hover:underline">
              Homepage
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
}
