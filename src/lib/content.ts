/*
  The only place pages read content from.
  Today this reads local files; later these become Sanity queries with the same signatures.
*/
import { stories } from "@/content/stories";
import { team } from "@/content/team";
import { services } from "@/content/services";
import type { Story } from "@/content/types";

const showSamples = process.env.NODE_ENV !== "production";

const visible = (s: Story) => showSamples || !s.sample;
const byDateDesc = (a: Story, b: Story) => b.date.localeCompare(a.date);

export async function getStories(): Promise<Story[]> {
  return stories.filter(visible).sort(byDateDesc);
}

export async function getFeaturedStories(): Promise<Story[]> {
  return (await getStories()).filter((s) => s.featured);
}

export async function getStory(slug: string): Promise<Story | undefined> {
  return (await getStories()).find((s) => s.slug === slug);
}

export async function getTeam() {
  return team;
}

export async function getServices() {
  return services;
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
