import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { getEventBySlug, getEventSlugs } from "@/lib/contentful/events";
import PreviewBanner from "@/components/PreviewBanner";

export const revalidate = 10;

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return { title: event.fields.eventsTitle, description: "14STROKE16 Events" };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const event = await getEventBySlug(slug, isEnabled);
  if (!event) notFound();

  const {
    eventsTitle,
    eventsThumbnail,
    eventDate,
    eventLink,
    eventDescription,
  } = event.fields;

  const title = (
    <h3 className="md:text-md mb-4 mt-4 text-lg font-bold uppercase">
      {eventsTitle}
    </h3>
  );
  const flyer = eventsThumbnail ? (
    <Image
      src={`https:${eventsThumbnail.fields.file.url}`}
      width={500}
      height={600}
      alt="Event Flyer"
      className="h-auto w-full"
    />
  ) : null;

  return (
    <div className="flex min-h-screen flex-col">
      {isEnabled && <PreviewBanner />}
      <div className="flex-grow">
        <div className="px-3 py-3">
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 md:px-10">
            <div>
              {eventLink ? (
                <>
                  <Link href={eventLink} target="_blank">
                    {title}
                  </Link>
                  <Link href={eventLink} target="_blank">
                    {flyer}
                  </Link>
                </>
              ) : (
                <>
                  {title}
                  {flyer}
                </>
              )}
            </div>
            <div className="py-5">
              {eventDate && (
                <p className="pb-2 text-xs text-black">{eventDate}</p>
              )}
              {eventLink && (
                <Link href={eventLink} target="_blank">
                  <p className="pb-4 text-base font-bold">TICKETS</p>
                </Link>
              )}
              <p className="md:text-md text-base">{eventDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
