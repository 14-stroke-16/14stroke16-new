import type { Metadata } from "next";
import { getEvents } from "@/lib/contentful/events";
import EventsCard from "@/components/cards/EventsCard";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Events",
  description: "14STROKE16 Events",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container mx-auto mt-10 px-3">
      <h1 className="py-6 text-2xl font-bold">EVENTS</h1>
      {events.length === 0 ? (
        <div className="h-screen py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-500">
            THERE ARE NO UPCOMING EVENTS
          </h1>
        </div>
      ) : (
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {events.map((event) => (
            <div key={event.sys.id} className="mb-4 break-inside-avoid">
              <EventsCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
