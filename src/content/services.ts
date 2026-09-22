import type { Service } from "./types";

export const services: Service[] = [
  {
    key: "media",
    name: "Curated Media",
    summary:
      "Films and photographs made for your event and the people at it. An intimate haldi and a 400-guest reception need different eyes, pacing and edits.",
    includes: [
      "Highlight films and short-form reels",
      "Photography, with an edit style matched to the event",
      "Printed keepsakes",
    ],
    status: "available",
    image: { kind: "image", alt: "Camera on set", aspect: "portrait" },
  },
  {
    key: "draping",
    name: "Draping",
    summary:
      "Saree and dupatta draping that fits the outfit, the ceremony and how you want to move through the day.",
    includes: [
      "Bridal and family draping",
      "Styles by region and ceremony",
      "On-site touch-ups between events",
    ],
    status: "available",
    image: { kind: "image", alt: "Saree draping", aspect: "portrait" },
  },
  {
    key: "styling",
    name: "Styling",
    summary:
      "Outfit, jewellery and scene styling so everything in frame belongs together.",
    includes: [
      "Look planning across events",
      "Jewellery and accessory pairing",
      "Shoot-day scene and prop styling",
    ],
    status: "available",
    image: { kind: "image", alt: "Styled flat lay", aspect: "portrait" },
  },
  {
    key: "planning",
    name: "Full Planning",
    summary:
      "One in-house team for the whole celebration, from the first idea to the last dance.",
    includes: ["Design and vendor curation", "Timeline and day-of coordination", "Every service above"],
    status: "coming-soon",
    image: { kind: "image", alt: "Planning", aspect: "portrait" },
  },
];

export const serviceName = (key: string) => services.find((s) => s.key === key)?.name ?? key;
