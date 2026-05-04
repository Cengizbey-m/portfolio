"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { SteamTopNav } from "@/components/steam/SteamTopNav";
import { SteamSidebar } from "@/components/steam/SteamSidebar";
import { SteamBackground } from "@/components/steam/SteamBackground";
import { StatusBar } from "@/components/steam/StatusBar";
import { AchievementsProvider } from "@/components/steam/AchievementsProvider";
import { CardDropProvider } from "@/components/cards/CardDropProvider";
import { KonamiListener } from "@/components/steam/KonamiListener";
import { ConsoleEgg } from "@/components/steam/ConsoleEgg";

/** Full-width canvas (no right-rail Steam sidebar). */
const FULL_WIDTH_ROUTES = ["/library", "/store", "/community", "/inventory", "/replay"];

/** Pages that opt out of the outer rounded panel entirely (full bleed). */
const FULL_BLEED_ROUTES = ["/replay"];

function matches(pathname: string, routes: string[]) {
  return routes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function SteamShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fullWidth = matches(pathname, FULL_WIDTH_ROUTES);
  const fullBleed = matches(pathname, FULL_BLEED_ROUTES);
  const showBackground = pathname === "/";

  return (
    <AchievementsProvider>
      <CardDropProvider>
        <div className="relative min-h-dvh">
          {showBackground ? <SteamBackground /> : null}
          <SteamTopNav />

          {fullBleed ? (
            <div className="steam-container-wide py-6 lg:py-8">
              <div className="min-w-0">{children}</div>
            </div>
          ) : (
            <div className={fullWidth ? "steam-container-wide py-6 lg:py-8" : "steam-container py-6 lg:py-8"}>
              {fullWidth ? (
                <div className="rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_30%),linear-gradient(180deg,hsl(var(--steam-panel)),hsl(var(--steam-panel-2)))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                  <div className="p-4 lg:p-6">
                    <div className="min-w-0">{children}</div>
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_30%),linear-gradient(180deg,hsl(var(--steam-panel)),hsl(var(--steam-panel-2)))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                  <div className="grid gap-6 p-4 lg:grid-cols-[260px_1fr] lg:p-6">
                    <SteamSidebar />
                    <div className="min-w-0">{children}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          <StatusBar />
          <KonamiListener />
          <ConsoleEgg />
        </div>
      </CardDropProvider>
    </AchievementsProvider>
  );
}
