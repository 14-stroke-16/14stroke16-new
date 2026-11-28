import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping",
  description: "Shipping information for 14STROKE16.",
};

// Placeholder stub. The footer "Shipping" link points here; real shipping copy
// to follow.
export default function ShippingPage() {
  return (
    <main className="mx-auto flex min-h-[55vh] max-w-[1200px] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold uppercase md:text-6xl">Shipping</h1>
      <p className="mt-4 text-lg text-black/50">Coming soon.</p>
    </main>
  );
}
