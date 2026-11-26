import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "About 14STROKE16.",
};

// Placeholder stub. The real About Us design hasn't been delivered yet;
// this route exists so the nav and homepage ABOUT US links have a valid
// destination. When the design lands, it will render the full team roster
// from the `teamMember` Contentful type (see docs/homepage-redesign-plan.md §4.4).
export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-[55vh] max-w-[1200px] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold uppercase md:text-6xl">About Us</h1>
      <p className="mt-4 text-lg text-black/50">Coming soon.</p>
    </main>
  );
}
