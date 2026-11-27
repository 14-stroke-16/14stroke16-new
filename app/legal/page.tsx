import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legals",
  description: "Privacy Policy and Terms & Conditions for 14STROKE16.",
};

// Placeholder stub. This single page will hold both the Privacy Policy and the
// Terms & Conditions once the real copy is provided. The footer "Legals" link
// points here.
export default function LegalPage() {
  return (
    <main className="mx-auto flex min-h-[55vh] max-w-[1200px] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold uppercase md:text-6xl">Legals</h1>
      <p className="mt-4 text-lg text-black/50">
        Privacy Policy &amp; Terms &amp; Conditions coming soon.
      </p>
    </main>
  );
}
