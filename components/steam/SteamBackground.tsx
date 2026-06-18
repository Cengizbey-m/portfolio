"use client";

import * as React from "react";
import { profile } from "@/data/profile";

export function SteamBackground() {
  const bg = profile.background;
  const [useVideo, setUseVideo] = React.useState(false);

  React.useEffect(() => {
    // Only load/autoplay the (multi-MB) video on larger screens, and respect
    // reduced-motion. Mobile gets a lightweight gradient instead — better for
    // data, battery, and Core Web Vitals.
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setUseVideo(desktop && !reduced && bg?.type === "video" && !!bg?.src);
  }, [bg]);

  return (
    // Steam behavior: background sits behind the profile area, then fades out as you scroll.
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[640px] overflow-hidden">
      {useVideo && bg?.src ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={bg.src}
        />
      ) : (
        <div className="h-full w-full bg-[radial-gradient(900px_420px_at_20%_-5%,rgba(102,192,244,0.22),transparent_60%),radial-gradient(800px_420px_at_85%_10%,rgba(155,109,226,0.14),transparent_62%),linear-gradient(180deg,rgba(23,26,33,0.95),rgba(27,40,56,0.6))]" />
      )}

      {/* Darken + Steam-ish blue glow for readability */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_10%,rgba(102,192,244,0.18),transparent_60%),radial-gradient(900px_420px_at_85%_20%,rgba(102,192,244,0.12),transparent_62%)]" />

      {/* Fade out so the profile background ends (Steam-like) */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-[hsl(var(--background))]" />
    </div>
  );
}
