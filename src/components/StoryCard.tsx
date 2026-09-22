import Link from "next/link";
import type { Story } from "@/content/types";
import { COVERAGE } from "@/content/types";
import { MediaFrame } from "./MediaFrame";

export function StoryCard({ story, priority }: { story: Story; priority?: boolean }) {
  const cover = { ...story.hero, aspect: "portrait" as const };
  const coverMedia = story.hero.kind === "video" && story.hero.poster
    ? { ...cover, kind: "image" as const, src: story.hero.poster }
    : cover;

  return (
    <Link href={`/work/${story.slug}`} className="group block">
      <div data-treatment={story.treatment} className="overflow-hidden">
        <div className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
          <MediaFrame media={coverMedia} sizes="(min-width: 768px) 33vw, 100vw" priority={priority} />
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl leading-tight">
            {story.title}
            {story.sample && <span className="eyebrow ml-2 align-middle text-accent!">Sample</span>}
          </h3>
          <p className="mt-1 text-sm text-muted">{story.tagline}</p>
        </div>
      </div>
      <p className="eyebrow mt-3">
        {story.coverage === "weekend" ? `${COVERAGE.weekend} · ${story.events.length} events` : story.events.join(" · ")}
      </p>
    </Link>
  );
}
