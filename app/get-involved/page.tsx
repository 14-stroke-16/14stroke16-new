import type { Metadata } from "next";
import BackToHome from "@/components/BackToHome";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "14STROKE16 Get Involved",
};

export default function GetInvolvedPage() {
  return (
    <div className="container mx-auto px-3 py-20">
      <BackToHome />
      <p className="mt-6">get-involved</p>
    </div>
  );
}
