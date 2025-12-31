"use client";

import { useHouseMode } from "@/components/HouseModeProvider";
import { Switch } from "@/components/ui/switch";

export function HouseModeToggle() {
  const { enabled, setEnabled } = useHouseMode();
  return (
    <label className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="hidden sm:inline">House Mode</span>
      <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Toggle House Mode" />
    </label>
  );
}


