import type { Story } from "./types";

/*
  Every shoot / event is a Story.
  To add one: copy a block, give it a unique slug, and put its files in
  /public/media/<slug>/. Any media without a `src` shows a placeholder frame.
*/
export const stories: Story[] = [
  // ---- Samples: visible in `npm run dev` only, to preview each treatment. ----
  // Replace them with real stories (or delete them) as your work comes in.
  {
    slug: "sample-evening-reception",
    title: "An Evening Reception",
    tagline: "Candlelight, slow dances and long shadows.",
    date: "2026-08-01",
    location: "Sample location",
    eventTypes: ["Reception"],
    guestScale: "intimate",
    treatment: "cinematic",
    services: ["media", "styling"],
    intro: [
      "Sample story showing the Cinematic treatment. Replace it with a real event or delete it.",
    ],
    hero: { kind: "video", alt: "Reception film", aspect: "wide" },
    gallery: [
      { kind: "image", alt: "Sample", aspect: "wide" },
      { kind: "image", alt: "Sample", aspect: "landscape" },
      { kind: "image", alt: "Sample", aspect: "landscape" },
      { kind: "image", alt: "Sample", aspect: "wide" },
    ],
    featured: true,
    sample: true,
  },
  {
    slug: "sample-sunlit-haldi",
    title: "A Sunlit Haldi",
    tagline: "Marigolds, turmeric and a courtyard full of family.",
    date: "2026-05-10",
    location: "Sample location",
    eventTypes: ["Haldi", "Mehndi"],
    guestScale: "mid",
    treatment: "bright",
    services: ["media", "draping", "styling"],
    intro: [
      "Sample story showing the Bright & Airy treatment. Replace it with a real event or delete it.",
    ],
    hero: { kind: "image", alt: "Haldi ceremony", aspect: "landscape" },
    gallery: [
      { kind: "image", alt: "Sample", aspect: "portrait" },
      { kind: "image", alt: "Sample", aspect: "landscape" },
      { kind: "image", alt: "Sample", aspect: "portrait" },
      { kind: "image", alt: "Sample", aspect: "square" },
      { kind: "image", alt: "Sample", aspect: "portrait" },
      { kind: "image", alt: "Sample", aspect: "landscape" },
    ],
    featured: true,
    sample: true,
  },
  {
    slug: "sample-sangeet-night",
    title: "Sangeet Night",
    tagline: "Draped in deep red, styled for the stage.",
    date: "2026-03-22",
    location: "Sample location",
    eventTypes: ["Sangeet"],
    guestScale: "grand",
    treatment: "editorial",
    services: ["media", "draping"],
    intro: [
      "Sample story showing the Editorial treatment. Replace it with a real event or delete it.",
    ],
    hero: { kind: "image", alt: "Sangeet stage", aspect: "landscape" },
    gallery: [
      { kind: "image", alt: "Sample", aspect: "portrait" },
      { kind: "image", alt: "Sample", aspect: "portrait" },
      { kind: "image", alt: "Sample", aspect: "landscape" },
      { kind: "image", alt: "Sample", aspect: "portrait" },
      { kind: "image", alt: "Sample", aspect: "square" },
    ],
    quote: { text: "Sample client quote goes here.", by: "Sample" },
    featured: true,
    sample: true,
  },
];
