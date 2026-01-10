"use client";

import * as React from "react";
import { profile } from "@/data/profile";

export function SteamBackground() {
  const bg = profile.background;
  if (!bg?.src) return null;

  return (
    // Steam behavior: background is behind the profile area, then fades out and ends as you scroll.
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[640px] overflow-hidden">
      {bg.type === "video" ? (
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
        <img src={bg.src} alt="" className="h-full w-full object-cover" loading="lazy" />
      )}

      {/* Darken + add Steam-ish blue glow for readability */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_10%,rgba(102,192,244,0.18),transparent_60%),radial-gradient(900px_420px_at_85%_20%,rgba(102,192,244,0.12),transparent_62%)]" />

      {/* Fade out so the profile background ends (Steam-like) */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-[hsl(var(--background))]" />
    </div>
  );
}

