import type { Metadata } from "next";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { InquireBand } from "@/components/InquireBand";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "The team behind Ekta Weddings, and why we called it Ekta.",
};

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-16 md:grid-cols-[1.2fr_1fr] md:gap-24 md:px-10 md:pt-24">
        <div>
          <p className="eyebrow">About</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] font-light md:text-7xl">
            <em>Ekta</em> means unity.
          </h1>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-muted md:pt-12">
          {/* TODO: replace with your founding story in your own words. */}
          <p>
            A wedding brings two families, generations of ritual, and hundreds of small moments together. We started Ekta Weddings to keep all of it together in one place: the way a saree is draped, the way a room is styled and the way it is remembered on film.
          </p>
          <p>
            Today we create curated media, draping and styling. Tomorrow, we&apos;ll plan the whole celebration in house.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <p className="eyebrow">The team</p>
        <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={i} delay={i * 120}>
              <MediaFrame media={m.photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              <h2 className="mt-6 font-serif text-3xl">{m.name}</h2>
              <p className="eyebrow mt-2">{m.role}</p>
              <p className="mt-4 leading-relaxed text-muted">{m.bio}</p>
              {m.instagram && (
                <a
                  href={`https://www.instagram.com/${m.instagram}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm underline underline-offset-4"
                >
                  @{m.instagram}
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <InquireBand />
    </>
  );
}
