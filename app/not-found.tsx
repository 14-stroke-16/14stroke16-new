import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto px-3 py-20 text-center">
      <h1 className="text-4xl font-bold uppercase">404</h1>
      <p className="mt-4 text-gray-600">This page could not be found.</p>
      <Link href="/" className="mt-6 inline-block text-sm uppercase underline">
        Back home
      </Link>
    </main>
  );
}
