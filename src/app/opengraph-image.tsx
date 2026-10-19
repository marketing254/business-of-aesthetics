import { ImageResponse } from "next/og";

/**
 * Default social preview (1200x630) for every page that doesn't set its own.
 * Rendered on the edge once and cached - no design tool round-trip needed.
 */
export const alt = "Business of Aesthetics - Where Aesthetic Leaders Grow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0c1730 0%, #13223f 60%, #0b8478 140%)",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#1fc2b2",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8fe3d9",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Business of Aesthetics
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 600,
              maxWidth: 980,
            }}
          >
            <span>Where aesthetic leaders</span>
            <span style={{ color: "#4adcca", fontStyle: "italic" }}>grow.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.78)",
              fontFamily: "Arial, sans-serif",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Podcast · Expert Panels · Live Events · Growth Marketing for dermatology,
            plastic surgery and med spa practices
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <span>businessofaesthetics.org</span>
          <span>Powered by Ekwa Marketing</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
