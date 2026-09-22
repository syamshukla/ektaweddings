import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { StoryGallery } from "@/components/StoryGallery";
import { InquireBand } from "@/components/InquireBand";
import { GUEST_SCALES, TREATMENTS } from "@/content/types";
import { serviceName } from "@/content/services";
import { formatDate, getStories, getStory } from "@/lib/content";

export async function generateStaticParams() {
  return (await getStories()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return {};
  const image = story.hero.kind === "image" ? story.hero.src : story.hero.poster;
  return {
    title: story.title,
    description: story.tagline,
    openGraph: { title: story.title, description: story.tagline, images: image ? [image] : undefined },
  };
}

export default async function StoryPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  const all = await getStories();
  const next = all[(all.findIndex((s) => s.slug === slug) + 1) % all.length];
  const cinematic = story.treatment === "cinematic";

  const details = [
    { label: "Event", value: story.eventTypes.join(", ") },
    { label: "Guests", value: `${GUEST_SCALES[story.guestScale].label} (${GUEST_SCALES[story.guestScale].detail})` },
    { label: "Mood", value: TREATMENTS[story.treatment].label },
    { label: "Services", value: story.services.map(serviceName).join(", ") },
    story.location && { label: "Location", value: story.location },
    { label: "Date", value: formatDate(story.date) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article data-treatment={story.treatment}>
      {/* Hero */}
      <header className="mx-auto max-w-7xl px-5 pt-14 md:px-10 md:pt-20">
        <p className="eyebrow">
          {story.eventTypes.join(" · ")}
          {story.sample && <span className="ml-3 text-accent!">Sample story (dev only)</span>}
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[1.02] font-light md:text-8xl">{story.title}</h1>
        <p className="mt-5 max-w-2xl font-serif text-xl text-muted italic md:text-2xl">{story.tagline}</p>
      </header>

      <div className={`mt-12 md:mt-16 ${cinematic ? "grain relative" : "mx-auto max-w-7xl px-5 md:px-10"}`}>
        <MediaFrame media={{ ...story.hero, aspect: cinematic ? "wide" : story.hero.aspect }} priority />
      </div>

      {/* Intro + details */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-[1.5fr_1fr] md:gap-24 md:px-10 md:py-28">
        <Reveal>
          {story.couple && <p className="eyebrow mb-6">{story.couple}</p>}
          <div className="space-y-6 font-serif text-2xl leading-relaxed font-light md:text-3xl md:leading-snug">
            {story.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <dl className="divide-y divide-line border-y border-line">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4 text-sm">
                <dt className="eyebrow pt-0.5">{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
          {story.instagramUrl && (
            <a
              href={story.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="eyebrow mt-8 inline-block border-b border-ink pb-1 text-ink!"
            >
              Watch the reel on Instagram
            </a>
          )}
        </Reveal>
      </section>

      {/* Gallery */}
      <section className={`mx-auto px-5 pb-24 md:px-10 ${cinematic ? "max-w-[96rem]" : "max-w-7xl"}`}>
        <StoryGallery items={story.gallery} treatment={story.treatment} />
      </section>

      {story.quote && (
        <Reveal className="mx-auto max-w-4xl px-5 pb-24 text-center md:px-10">
          <blockquote className="font-serif text-3xl leading-snug italic md:text-5xl">“{story.quote.text}”</blockquote>
          <p className="eyebrow mt-6">{story.quote.by}</p>
        </Reveal>
      )}

      {story.credits?.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-10">
          <p className="eyebrow">Credits</p>
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-2 text-sm">
            {story.credits.map((c) => (
              <li key={c.role}>
                <span className="text-muted">{c.role}:</span> {c.name}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {next && next.slug !== story.slug && (
        <Link href={`/work/${next.slug}`} className="group block border-t border-line">
          <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 py-16 md:px-10 md:py-24">
            <div>
              <p className="eyebrow">Next story</p>
              <p className="mt-3 font-serif text-4xl transition-colors group-hover:text-accent md:text-6xl">{next.title}</p>
            </div>
            <span aria-hidden className="font-serif text-4xl transition-transform group-hover:translate-x-2 md:text-6xl">→</span>
          </div>
        </Link>
      )}

      <InquireBand />
    </article>
  );
}
