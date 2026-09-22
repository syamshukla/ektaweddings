import { instagramPicks, site } from "@/content/site";
import { MediaFrame } from "./MediaFrame";
import { Reveal } from "./Reveal";

export function InstagramStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl">@{site.instagram.handle}</h2>
        </div>
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noreferrer"
          className="eyebrow rounded-full border border-ink px-5 py-2.5 text-ink! transition-colors hover:bg-ink hover:text-bg!"
        >
          Follow
        </a>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {instagramPicks.map((p, i) => (
          <Reveal key={i} delay={i * 90}>
            <a href={p.url} target="_blank" rel="noreferrer" className="group block overflow-hidden">
              <div className="transition-transform duration-1000 group-hover:scale-[1.04]">
                <MediaFrame media={p.media} sizes="(min-width: 768px) 25vw, 50vw" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
