import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Disables draft mode and returns to the homepage.
// Replaces the old pages/api/exit-preview.js.
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
