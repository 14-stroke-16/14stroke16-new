"use client";

import { useState } from "react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import type { TeamMember } from "@/lib/contentful/types";

// THE TEAM: a name list on the left (hovering a name turns it red and
// highlights that person's portrait) beside a grid of portraits on the right.
export default function TeamSection({ members }: { members: TeamMember[] }) {
  const [active, setActive] = useState(0);
  if (!members?.length) return null;

  const grid = members.slice(0, 9);

  return (
    <section className="bg-ivoryWhite py-16 text-black md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionLabel invert className="text-2xl md:text-3xl">
          THE TEAM.
        </SectionLabel>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <ul>
            {members.map((m, i) => (
              <li key={m.sys.id} className="border-b border-black/20">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`block w-full py-3.5 text-left text-2xl font-bold uppercase leading-tight tracking-tight transition-colors md:text-3xl ${
                    i === active ? "text-brandRed" : "text-black"
                  }`}
                >
                  {m.fields.name}
                  {m.fields.role ? ` (${m.fields.role})` : ""}
                </button>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-3 gap-3">
            {grid.map((m, i) => {
              const url = m.fields.photo?.fields?.file?.url;
              return (
                <div
                  key={m.sys.id}
                  className={`relative aspect-square overflow-hidden bg-black/10 transition-opacity duration-300 ${
                    i === active ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {url && (
                    <Image
                      src={`https:${url}`}
                      alt={m.fields.photoAltTag || m.fields.name}
                      fill
                      sizes="(max-width: 768px) 30vw, 180px"
                      className="object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
