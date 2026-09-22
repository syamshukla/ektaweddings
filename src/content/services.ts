import type { Service } from "./types";

export const services: Service[] = [
  {
    key: "media",
    name: "Curated Media",
    summary: "Photo and film, edited to fit the event.",
    status: "available",
    image: { kind: "image", alt: "Curated media", aspect: "portrait" },
  },
  {
    key: "draping",
    name: "Draping",
    summary: "Saree and dupatta draping for the bride and family.",
    status: "available",
    image: { kind: "image", alt: "Draping", aspect: "portrait" },
  },
  {
    key: "styling",
    name: "Styling",
    summary: "Outfits, jewellery and scene styling.",
    status: "available",
    image: { kind: "image", alt: "Styling", aspect: "portrait" },
  },
  {
    key: "planning",
    name: "Full Planning",
    summary: "The whole wedding, planned in house.",
    status: "coming-soon",
    image: { kind: "image", alt: "Planning", aspect: "portrait" },
  },
];

export const serviceName = (key: string) => services.find((s) => s.key === key)?.name ?? key;
