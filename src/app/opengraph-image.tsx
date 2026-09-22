import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f3ec",
          color: "#1b1816",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 96 }}>Ekta Weddings</div>
        <div style={{ fontSize: 26, letterSpacing: 8, textTransform: "uppercase", marginTop: 28, color: "#6e655c" }}>
          Curated media · Draping · Styling
        </div>
      </div>
    ),
    size,
  );
}
