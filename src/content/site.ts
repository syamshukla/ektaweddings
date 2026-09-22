import type { Media } from "./types";

export const site = {
  name: "Ekta Weddings",
  tagline: "Curated wedding media, draping & styling",
  description:
    "Ekta Weddings creates curated wedding media, draping and styling, with each film and gallery shaped around the event and the people in the room.",
  instagram: {
    handle: "ektaweddings",
    url: "https://www.instagram.com/ektaweddings/",
  },
  /** Leave empty to hide email everywhere and route people to Instagram / the form. */
  email: "",
  /** Set once a domain is live (used for sitemap + social cards). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  serviceArea: "Based in the U.S. · Available to travel",
};

/*
  Hand-picked Instagram posts for the home page strip.
  Paste the post/reel link and drop a still into /public/media/instagram/.
*/
export const instagramPicks: { url: string; media: Media }[] = [
  { url: site.instagram.url, media: { kind: "image", alt: "Instagram post", aspect: "portrait" } },
  { url: site.instagram.url, media: { kind: "image", alt: "Instagram post", aspect: "portrait" } },
  { url: site.instagram.url, media: { kind: "image", alt: "Instagram post", aspect: "portrait" } },
  { url: site.instagram.url, media: { kind: "image", alt: "Instagram post", aspect: "portrait" } },
];
