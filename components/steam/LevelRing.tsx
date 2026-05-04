"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  level: number;
  /** 0..1 progress within the current level */
  progress?: number;
  size?: number;
  className?: string;
  badgeLabel?: string;
};

export function LevelRing({
  level,
  progress = 0.62,
  size = 56,
  className,
  badgeLabel,
}: Props) {
  const stroke = Math.max(2, Math.round(size * 0.08));
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const offsetTarget = c * (1 - Math.min(1, Math.max(0, progress)));
  const [offset, setOffset] = React.useState(c);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setOffset(offsetTarget));
    return () => cancelAnimationFrame(id);
  }, [offsetTarget]);

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
      aria-label={badgeLabel ?? `Level ${level}`}
      title={badgeLabel ?? `Level ${level}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="rgba(0,0,0,0.35)"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--steam-link))"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
            filter: "drop-shadow(0 0 6px hsl(var(--steam-link) / 0.55))",
          }}
        />
      </svg>
      <span
        className="absolute font-semibold text-foreground"
        style={{ fontSize: Math.max(11, Math.round(size * 0.32)) }}
      >
        {level}
      </span>
    </div>
  );
}
