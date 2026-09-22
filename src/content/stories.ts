import type { Story } from "./types";

/*
  Every shoot / event is a Story.
  To add one: copy a block, give it a unique slug, and put its files in
  /public/media/<slug>/. Any media without a `src` shows a placeholder frame.
*/
export const stories: Story[] = [
  // ---- Samples: visible in `npm run dev` only. Replace with real stories. ----
  {
    slug: "sample-weekend",
    title: "Sample Wedding Weekend",
    tagline: "Sample tagline.",
    date: "2026-08-01",
    location: "Sample location",
    coverage: "weekend",
    events: ["Haldi", "Mehndi", "Sangeet", "Baraat", "Ceremony", "Reception"],
    treatment: "cinematic",
    services: ["media", "draping", "styling"],
    intro: ["Sample weekend story. Replace or delete."],
    hero: { kind: "video", alt: "Sample", aspect: "wide" },
    gallery: [
      { kind: "image", alt: "Sample", aspect: "wide", caption: "Haldi" },
      { kind: "image", alt: "Sample", aspect: "landscape", caption: "Sangeet" },
      { kind: "image", alt: "Sample", aspect: "landscape" },
      { kind: "image", alt: "Sample", aspect: "wide", caption: "Ceremony" },
    ],
    featured: true,
    sample: true,
  },
  {
    slug: "sample-second-weekend",
    title: "Sample Wedding Weekend II",
    tagline: "Sample tagline.",
    date: "2026-05-10",
    location: "Sample location",
    coverage: "weekend",
    events: ["Mehndi", "Garba", "Ceremony"],
    treatment: "bright",
    services: ["media", "styling"],
    intro: ["Sample weekend story. Replace or delete."],
    hero: { kind: "image", alt: "Sample", aspect: "landscape" },
    gallery: [
      { kind: "image", alt: "Sample", aspect: "portrait" },
      { kind: "image", alt: "Sample", aspect: "landscape" },
      { kind: "image", alt: "Sample", aspect: "portrait" },
      { kind: "image", alt: "Sample", aspect: "square" },
    ],
    featured: true,
    sample: true,
  },
  {
    slug: "sample-shoot",
    title: "Sample Engagement Shoot",
    tagline: "Sample tagline.",
    date: "2026-03-22",
    location: "Sample location",
    coverage: "shoot",
    events: ["Engagement"],
    treatment: "editorial",
    services: ["media", "styling"],
    intro: ["Sample shoot story. Replace or delete."],
    hero: { kind: "image", alt: "Sample", aspect: "landscape" },
    gallery: [
      { kind: "image", alt: "Sample", aspect: "portrait" },
      { kind: "image", alt: "Sample", aspect: "portrait" },
      { kind: "image", alt: "Sample", aspect: "landscape" },
      { kind: "image", alt: "Sample", aspect: "portrait" },
    ],
    featured: true,
    sample: true,
  },
];
