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
    <div className="border-t border-border">
      <div className="container-max py-4">
        <HouseMap key={pathname} />
      </div>
    </div>
  );
}


