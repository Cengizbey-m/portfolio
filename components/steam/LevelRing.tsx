"use client";

import { cn } from "@/lib/utils";

type Props = {
  level: number;
  /** Kept for API compatibility; Steam's badge has no progress arc. */
  progress?: number;
  size?: number;
  className?: string;
  badgeLabel?: string;
  /** Show the word "Level" beside the badge, as on a Steam profile. */
  withLabel?: boolean;
};

// Steam colours a level badge by its tens digit.
const LEVEL_COLORS = [
  "#9b9b9b", // 0-9
  "#c02942", // 10-19
  "#d95b43", // 20-29
  "#fecc23", // 30-39
  "#467a3c", // 40-49
  "#4e8ddb", // 50-59
  "#7652c9", // 60-69
  "#c252c9", // 70-79
  "#542437", // 80-89
  "#997c52", // 90-99
];

export function levelColor(level: number) {
  return LEVEL_COLORS[Math.min(9, Math.max(0, Math.floor(level / 10)))];
}

export function LevelRing({ level, size = 36, className, badgeLabel, withLabel = true }: Props) {
  const color = levelColor(level);
  return (
    <div
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label={badgeLabel ?? `Level ${level}`}
      title={badgeLabel ?? `Level ${level}`}
    >
      {withLabel ? (
        <span className="text-[20px] font-light text-white light:text-foreground">Level</span>
      ) : null}
      <span
        className="grid place-items-center rounded-full font-normal text-white light:text-foreground"
        style={{
          width: size,
          height: size,
          border: `2px solid ${color}`,
          fontSize: Math.max(12, Math.round(size * 0.46)),
        }}
      >
        {level}
      </span>
    </div>
  );
}
