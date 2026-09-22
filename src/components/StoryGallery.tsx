import type { Media, Treatment } from "@/content/types";
import { MediaFrame } from "./MediaFrame";
import { Reveal } from "./Reveal";

function Figure({ m, sizes }: { m: Media; sizes: string }) {
  return (
    <figure>
      <MediaFrame media={m} sizes={sizes} />
      {m.caption && <figcaption className="eyebrow mt-3">{m.caption}</figcaption>}
    </figure>
  );
}

/* Each treatment lays the gallery out differently. */
export function StoryGallery({ items, treatment }: { items: Media[]; treatment: Treatment }) {
  if (treatment === "cinematic") {
    // A film strip: wide frames run full width, others pair up.
    return (
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {items.map((m, i) => (
          <Reveal key={i} className={m.aspect === "wide" ? "md:col-span-2" : ""}>
            <Figure m={m} sizes={m.aspect === "wide" ? "100vw" : "(min-width: 768px) 50vw, 100vw"} />
          </Reveal>
        ))}
      </div>
    );
  }

  if (treatment === "editorial") {
    // Asymmetric magazine spreads.
    const spans = ["md:col-span-7", "md:col-span-5 md:mt-32", "md:col-span-5 md:col-start-2", "md:col-span-6"];
    return (
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        {items.map((m, i) => (
          <Reveal key={i} className={spans[i % spans.length]}>
            <Figure m={m} sizes="(min-width: 768px) 58vw, 100vw" />
          </Reveal>
        ))}
      </div>
    );
  }

  // Bright & airy: soft masonry with lots of breathing room.
  return (
    <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-8 [&>*]:break-inside-avoid">
      {items.map((m, i) => (
        <Reveal key={i}>
          <Figure m={m} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        </Reveal>
      ))}
    </div>
  );
}
