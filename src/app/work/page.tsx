import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";
import { InquireBand } from "@/components/InquireBand";
import { getStories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Wedding films and photographs by Ekta Weddings. Filter by event, guest count and mood.",
};

export default async function WorkPage() {
  const stories = await getStories();

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-16 md:px-10 md:pt-24">
        <p className="eyebrow">The work</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] font-light md:text-7xl">
          Stories, <em>curated</em> by event, people and mood.
        </h1>
      </section>
      <WorkGrid stories={stories} />
      <InquireBand title="See your celebration here next." />
    </>
  );
}
