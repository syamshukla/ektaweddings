import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { InstagramStrip } from "@/components/InstagramStrip";
import { InquireBand } from "@/components/InquireBand";
import { getFeaturedStories, getServices } from "@/lib/content";

export default async function Home() {
  const featured = await getFeaturedStories();
  const lead = featured[0];
  const services = (await getServices()).filter((s) => s.status === "available");

  return (
    <>
      {/* Hero: the lead story's film, full-bleed */}
      <section data-treatment={lead?.treatment ?? "cinematic"} className="grain relative h-[calc(100svh-4rem)] min-h-[520px] md:h-[calc(100svh-5rem)]">
        {lead && <MediaFrame media={lead.hero} fill priority className="absolute! inset-0" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 text-[#f4ede2] md:px-10 md:pb-20">
          <p className="eyebrow text-[#f4ede2]/80!">Curated media · Draping · Styling</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] font-light sm:text-6xl md:text-8xl">
            Every celebration, <em className="font-normal">its own film.</em>
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/work" className="eyebrow rounded-full bg-[#f4ede2] px-6 py-3 text-[#1b1816]! transition-opacity hover:opacity-85">
              View the work
            </Link>
            {lead && (
              <Link href={`/work/${lead.slug}`} className="eyebrow border-b border-[#f4ede2]/50 pb-1 text-[#f4ede2]! hover:border-[#f4ede2]">
                Now showing: {lead.title}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="max-w-3xl font-serif text-3xl leading-snug font-light md:text-5xl md:leading-[1.15]">
            Wedding media, draping and styling, curated for each event.
          </p>
        </Reveal>
      </section>

      {/* Featured work (hidden until there are stories to show) */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-36">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected stories</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">Recent work</h2>
            </div>
            <Link href="/work" className="eyebrow border-b border-ink pb-1 text-ink!">All work</Link>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-3">
            {featured.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug} delay={i * 120}>
                <StoryCard story={s} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-[1fr_1.4fr] md:px-10 md:py-32">
          <Reveal>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">Services</h2>
            <Link href="/services" className="eyebrow mt-8 inline-block border-b border-ink pb-1 text-ink!">Details</Link>
          </Reveal>
          <ul className="divide-y divide-line border-y border-line">
            {services.map((s, i) => (
              <li key={s.key}>
                <Reveal delay={i * 100} className="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:gap-10">
                  <h3 className="w-48 shrink-0 font-serif text-3xl">{s.name}</h3>
                  <p className="leading-relaxed text-muted">{s.summary}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InstagramStrip />
      <InquireBand />
    </>
  );
}
