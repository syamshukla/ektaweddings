import type { TeamMember } from "./types";

/* Put headshots in /public/media/team/ and set photo.src, e.g. "/media/team/name.jpg". */
export const team: TeamMember[] = [
  {
    name: "Team member",
    role: "Role",
    bio: "Bio goes here.",
    photo: { kind: "image", alt: "Portrait", aspect: "portrait" },
    instagram: "",
  },
  {
    name: "Team member",
    role: "Role",
    bio: "Bio goes here.",
    photo: { kind: "image", alt: "Portrait", aspect: "portrait" },
    instagram: "",
  },
  {
    name: "Team member",
    role: "Role",
    bio: "Bio goes here.",
    photo: { kind: "image", alt: "Portrait", aspect: "portrait" },
    instagram: "",
  },
];
