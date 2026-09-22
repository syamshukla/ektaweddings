import type { TeamMember } from "./types";

/* Put headshots in /public/media/team/ and set photo.src, e.g. "/media/team/name.jpg". */
export const team: TeamMember[] = [
  {
    name: "Team member",
    role: "Founder · Creative Director",
    bio: "A short, warm bio: what you love about weddings and what you're known for on set.",
    photo: { kind: "image", alt: "Portrait", aspect: "portrait" },
    instagram: "",
  },
  {
    name: "Team member",
    role: "Founder · Draping & Styling",
    bio: "A short, warm bio: what you love about weddings and what you're known for on set.",
    photo: { kind: "image", alt: "Portrait", aspect: "portrait" },
    instagram: "",
  },
  {
    name: "Team member",
    role: "Film & Photography",
    bio: "A short, warm bio: what you love about weddings and what you're known for on set.",
    photo: { kind: "image", alt: "Portrait", aspect: "portrait" },
    instagram: "",
  },
];
