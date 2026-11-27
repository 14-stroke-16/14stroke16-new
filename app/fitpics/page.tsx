import type { Metadata } from "next";
import { getFitPics } from "@/lib/contentful/fitpics";
import FitpicCard from "@/components/FitpicCard";
import BackToHome from "@/components/BackToHome";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Fit Pics",
  description: "14STROKE16 Fit Pics",
};

export default async function FitPicsPage() {
  const fitpics = await getFitPics();

  return (
    <div className="container mx-auto mt-10 px-3">
      <BackToHome />
      <h1 className="py-6 text-2xl font-bold uppercase">Fit Pics</h1>
      {fitpics.length === 0 ? (
        <p className="opacity-60">No fit pics yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {fitpics.map((item) => (
            <FitpicCard key={item.sys.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
