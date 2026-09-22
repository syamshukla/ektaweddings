/*
  Content model for Ekta Weddings.
  Mirrors what the future Sanity schema will look like, so moving to a CMS
  only means swapping the functions in src/lib/content.ts.
*/

/* What a story covers: the whole weekend, one event, or a standalone shoot. */
export const COVERAGE = {
  weekend: "Wedding weekend",
  event: "Single event",
  shoot: "Shoot",
} as const;
export type Coverage = keyof typeof COVERAGE;

/* Events a story includes. A weekend story lists every event it covers. */
export const EVENT_TYPES = [
  "Engagement",
  "Pre-wedding",
  "Haldi",
  "Mehndi",
  "Sangeet",
  "Garba",
  "Baraat",
  "Ceremony",
  "Reception",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

/* Page look for a story. Styling only; not shown to visitors as a filter. */
export const TREATMENTS = {
  cinematic: { label: "Cinematic", detail: "Moody, filmic, letterboxed" },
  bright: { label: "Bright & Airy", detail: "Light, soft, joyful" },
  editorial: { label: "Editorial", detail: "Bold, styled, magazine-like" },
} as const;
export type Treatment = keyof typeof TREATMENTS;

export const SERVICE_KEYS = ["media", "draping", "styling", "planning"] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export type Aspect = "portrait" | "landscape" | "square" | "wide";

export type Media = {
  kind: "image" | "video";
  /** Path under /public (e.g. "/media/my-story/hero.mp4") or a full URL. Leave empty to show a placeholder frame. */
  src?: string;
  /** Poster frame for videos. */
  poster?: string;
  alt: string;
  aspect: Aspect;
  caption?: string;
};

export type Story = {
  slug: string;
  title: string;
  /** One-line hook shown on cards and the story hero. */
  tagline: string;
  couple?: string;
  /** ISO date, e.g. "2026-08-14" */
  date: string;
  location: string;
  coverage: Coverage;
  events: EventType[];
  treatment: Treatment;
  services: ServiceKey[];
  /** Two or three short paragraphs. */
  intro: string[];
  hero: Media;
  gallery: Media[];
  instagramUrl?: string;
  quote?: { text: string; by: string };
  credits?: { role: string; name: string }[];
  featured?: boolean;
  /** Sample stories render in development only, never in production. */
  sample?: boolean;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: Media;
  instagram?: string;
};

export type Service = {
  key: ServiceKey;
  name: string;
  summary: string;
  status: "available" | "coming-soon";
  image: Media;
};
