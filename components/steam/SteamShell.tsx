"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { SteamTopNav } from "@/components/steam/SteamTopNav";
import { SteamBackground } from "@/components/steam/SteamBackground";
import { AmbientBackground } from "@/components/steam/AmbientBackground";
import { StatusBar } from "@/components/steam/StatusBar";
import { Footer } from "@/components/Footer";
import { AchievementsProvider } from "@/components/steam/AchievementsProvider";
import { CardDropProvider } from "@/components/cards/CardDropProvider";
import { KonamiListener } from "@/components/steam/KonamiListener";
import { ConsoleEgg } from "@/components/steam/ConsoleEgg";

/** Pages that opt out of the centered container and go full-bleed. */
const FULL_BLEED_ROUTES = ["/replay"];

/** Pages rendered with no site chrome at all, because they become a PDF. */
const BARE_ROUTES = ["/resume/print"];

function matches(pathname: string, routes: string[]) {
  return routes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function SteamShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fullBleed = matches(pathname, FULL_BLEED_ROUTES);
  const showBackground = pathname === "/";

  // The print view is the source for the generated PDF, so nothing may wrap it.
  if (matches(pathname, BARE_ROUTES)) {
    return <>{children}</>;
  }

  return (
    <AchievementsProvider>
      <CardDropProvider>
        <div className="relative flex min-h-dvh flex-col">
          {/* Calm drift behind every page, then the brighter hero backdrop on home. */}
          <AmbientBackground />
          {showBackground ? <SteamBackground /> : null}
          <SteamTopNav />

          <main className="flex-1">
            {fullBleed ? (
              <div className="mx-auto w-full max-w-[100rem] px-3 py-6 sm:px-5 lg:py-8">
                {children}
              </div>
            ) : (
              <div className="mx-auto w-full max-w-[80rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                {children}
              </div>
            )}
          </main>

          <Footer />
          <StatusBar />
          <KonamiListener />
          <ConsoleEgg />
        </div>
      </CardDropProvider>
    </AchievementsProvider>
  );
}
