import type { Metadata } from "next";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { InquireBand } from "@/components/InquireBand";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Curated wedding media, draping and styling by one in-house team. Full planning coming soon.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-16 md:px-10 md:pt-24">
        <p className="eyebrow">Services</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.05] font-light md:text-7xl">
          One team, <em>in house</em>, so every detail belongs together.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Book one service or all of them. When the people draping and styling you also film the day, nothing gets lost between vendors.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-24 md:gap-32">
          {services.map((s, i) => (
            <Reveal key={s.key}>
              <div id={s.key} className="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 md:gap-20">
                <div className={i % 2 ? "md:order-2" : ""}>
                  <MediaFrame media={s.image} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div>
                  <p className="font-serif text-lg text-accent italic">0{i + 1}</p>
                  <h2 className="mt-2 font-serif text-4xl md:text-5xl">
                    {s.name}
                    {s.status === "coming-soon" && (
                      <span className="eyebrow ml-4 rounded-full border border-accent px-3 py-1 align-middle text-accent!">Coming soon</span>
                    )}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{s.summary}</p>
                  <ul className="mt-8 divide-y divide-line border-y border-line">
                    {s.includes.map((x) => (
                      <li key={x} className="py-3">{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <InquireBand title="Not sure what you need? Start with a conversation." />
    </>
  );
}
