import Link from "next/link";
import Image from "next/image";

export default function EventsCard({ newEvent }) {
  const {
    eventsTitle,
    slug,
    eventsThumbnail,
    eventDate,
    eventLink,
    eventDescription
  } = newEvent.fields;
  return (
    <div className="masonry-item py-3">
      <div>
        <Link href={`events/${slug}`}>
          <h3 className="text-sm md:text-md font-bold mt-4 uppercase">
            {eventsTitle}
          </h3>
          <p className="text-xs text-black py-1">{eventDate}</p>

          <Image
            src={`https:${eventsThumbnail.fields.file.url}`}
            width={500}
            height={600}
            alt={"Event Flyer"}
          />
        </Link>
      </div>
    </div>
  );
}
