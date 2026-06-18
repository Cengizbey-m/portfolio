import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Muhammed Cengiz — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(900px 500px at 18% 0%, rgba(102,192,244,0.22), transparent 60%), linear-gradient(160deg, #1b2838 0%, #16202d 55%, #0f1722 100%)",
          color: "#c7d5e0",
          fontFamily: "sans-serif",
        }}
      >
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "linear-gradient(180deg, rgba(102,192,244,0.5), rgba(0,0,0,0.35))",
              color: "#fff",
              fontSize: 34,
              fontWeight: 800,
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            C
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#8f98a0", letterSpacing: 2 }}>
            Oakville / GTA · Canada
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginLeft: "auto",
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(120, 190, 80, 0.16)",
              border: "1px solid rgba(143, 195, 79, 0.45)",
              color: "#a4d65e",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#a4d65e" }} />
            Open to opportunities
          </div>
        </div>

        {/* name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, color: "#ffffff", lineHeight: 1.02 }}>
            Muhammed Cengiz
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", width: 70, height: 6, borderRadius: 3, background: "#66c0f4" }} />
            <div style={{ display: "flex", fontSize: 44, fontWeight: 600, color: "#66c0f4" }}>
              Full-Stack Developer
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9fb0bf", maxWidth: 920 }}>
            Fast, reliable web apps end-to-end — with a networking background underneath.
          </div>
        </div>

        {/* tags */}
        <div style={{ display: "flex", gap: 14 }}>
          {["Next.js", "TypeScript", "React", "Python", "Networking"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#c7d5e0",
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
