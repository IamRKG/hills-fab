import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Fabrication, Welding, uPVC Windows & Doors`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          background: "#222831", color: "white", padding: 72,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, background: "#F28C28", borderRadius: 6 }} />
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 1 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>Precision Fabrication.</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>Stronger Structures.</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, color: "#F28C28" }}>Smarter Window Solutions.</div>
        </div>
        <div style={{ fontSize: 26, color: "#C9D3DB", letterSpacing: 4 }}>FABRICATION · WELDING · uPVC WINDOWS &amp; DOORS</div>
      </div>
    ),
    size,
  );
}
