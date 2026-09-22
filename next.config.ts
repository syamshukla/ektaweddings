import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home folder otherwise confuses root detection.
  turbopack: { root: __dirname },
  images: {
    // Next 16 only allows quality 75 by default; 90 is used for hero frames.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
