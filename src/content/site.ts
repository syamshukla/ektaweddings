import type { Media } from "./types";

export const site = {
  name: "Ekta Weddings",
  tagline: "Curated wedding media, draping & styling",
  description: "Curated wedding media, draping and styling.",
  instagram: {
    handle: "ektaweddings",
    url: "https://www.instagram.com/ektaweddings/",
  },
  /** Leave empty to hide email everywhere and route people to Instagram / the form. */
  email: "",
  /** Used for sitemap + social cards. Set NEXT_PUBLIC_SITE_URL once a domain is live. */
  url: resolveSiteUrl(),
};

/* Accepts "example.com" or "https://example.com"; empty values fall through to Vercel's URL, then localhost. */
function resolveSiteUrl() {
  const raw = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ].find((v) => v && v.trim());
  if (!raw) return "http://localhost:3000";
  const withProtocol = /^https?:\/\//.test(raw.trim()) ? raw.trim() : `https://${raw.trim()}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return "http://localhost:3000";
  }
}

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
