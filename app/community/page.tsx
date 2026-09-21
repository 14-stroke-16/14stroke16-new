import type { Metadata } from "next";
import { getCommunity } from "@/lib/contentful/community";
import CommunityCard from "@/components/cards/CommunityCard";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Community",
  description: "14STROKE16 Community",
};

export default async function CommunityPage() {
  const items = await getCommunity();

  return (
    <div className="container mx-auto mt-10 px-3">
      <h1 className="py-6 text-2xl font-bold">COMMUNITY</h1>
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {items.map((item) => (
          <div key={item.sys.id} className="mb-4 break-inside-avoid">
            <CommunityCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
