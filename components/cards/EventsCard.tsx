import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/lib/contentful/types";

export default function EventsCard({ event }: { event: EventItem }) {
  const { eventsTitle, slug, eventsThumbnail, eventDate } = event.fields;

  return (
    <div className="py-3">
      <Link href={`/events/${slug}`}>
        <h3 className="md:text-md mt-4 text-sm font-bold uppercase">
          {eventsTitle}
        </h3>
        {eventDate && <p className="py-1 text-xs text-black">{eventDate}</p>}
        {eventsThumbnail && (
          <Image
            src={`https:${eventsThumbnail.fields.file.url}`}
            width={500}
            height={600}
            alt="Event Flyer"
            className="h-auto w-full"
          />
        )}
      </Link>
    </div>
  );
}
