"use client";

import * as React from "react";
import { SteamTopNav } from "@/components/steam/SteamTopNav";
import { SteamSidebar } from "@/components/steam/SteamSidebar";
import { HouseModeGate } from "@/components/HouseModeGate";

export function SteamShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <SteamTopNav />
      <div className="steam-container py-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <SteamSidebar />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
      <HouseModeGate />
    </div>
  );
}


