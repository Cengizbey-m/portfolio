"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Room = {
  id: string;
  label: string;
  href: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const rooms: Room[] = [
  { id: "projects", label: "Projects", href: "/projects", x: 18, y: 26, w: 164, h: 86 },
  { id: "about", label: "About", href: "/about", x: 198, y: 26, w: 164, h: 86 },
  { id: "skills", label: "Skills", href: "/about#skills", x: 18, y: 126, w: 164, h: 86 },
  { id: "certs", label: "Certificates", href: "/about#certificates", x: 198, y: 126, w: 164, h: 86 },
  { id: "contact", label: "Contact", href: "/contact", x: 18, y: 226, w: 344, h: 74 },
];

export function HouseMap({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          House navigation
        </p>
        <p className="text-xs text-muted-foreground">Fast SVG • Mobile friendly</p>
      </div>

      <motion.svg
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        viewBox="0 0 380 320"
        className="mt-3 h-auto w-full"
        role="img"
        aria-label="House map navigation"
      >
        <rect x="8" y="8" width="364" height="304" rx="14" fill="transparent" stroke="currentColor" opacity="0.18" />
        <path
          d="M60 70 L190 14 L320 70"
          fill="none"
          stroke="currentColor"
          opacity="0.18"
          strokeWidth="3"
        />

        {rooms.map((r) => (
          <a key={r.id} href={r.href}>
            <g>
              <rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx="12"
                fill="transparent"
                stroke="currentColor"
                opacity="0.35"
              />
              <text
                x={r.x + 12}
                y={r.y + 28}
                fontSize="14"
                fill="currentColor"
                opacity="0.9"
              >
                {r.label}
              </text>
              <text
                x={r.x + 12}
                y={r.y + 50}
                fontSize="11"
                fill="currentColor"
                opacity="0.55"
              >
                Click to navigate
              </text>
            </g>
          </a>
        ))}
      </motion.svg>

      <p className="mt-3 text-xs text-muted-foreground">
        Prefer the classic nav? Toggle House Mode off any time.
      </p>
    </div>
  );
}


