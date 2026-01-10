"use client";

import * as React from "react";
import { SteamTopNav } from "@/components/steam/SteamTopNav";
import { SteamSidebar } from "@/components/steam/SteamSidebar";
import { SteamBackground } from "@/components/steam/SteamBackground";

export function SteamShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <SteamBackground />
      <SteamTopNav />
      <div className="steam-container py-6 lg:py-8">
        {/* Center frame (Steam-like): solid background behind the whole middle column */}
        <div className="rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_30%),linear-gradient(180deg,hsl(var(--steam-panel)),hsl(var(--steam-panel-2)))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <div className="grid gap-6 p-4 lg:grid-cols-[260px_1fr] lg:p-6">
            <SteamSidebar />
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


