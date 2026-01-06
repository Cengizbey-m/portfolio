"use client";

import { usePathname } from "next/navigation";
import { useHouseMode } from "@/components/HouseModeProvider";
import { HouseMap } from "@/components/HouseMap";

export function HouseModeGate() {
  const { enabled } = useHouseMode();
  const pathname = usePathname();

  if (!enabled) return null;

  // Keep the house map out of the way on very short pages if needed; for now show everywhere.
  return (
    <div className="border-t border-border bg-[hsl(var(--steam-topbar))]/40">
      <div className="steam-container py-4">
        <div className="rounded-md border border-border bg-[linear-gradient(180deg,hsla(0,0%,100%,0.06),transparent_38%),hsl(var(--steam-panel))] p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <HouseMap key={pathname} />
        </div>
      </div>
    </div>
  );
}


