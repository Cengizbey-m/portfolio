"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Avatar({
  src,
  alt,
  initials,
  className,
}: {
  src: string;
  alt: string;
  initials: string;
  className?: string;
}) {
  const [failed, setFailed] = React.useState(false);

  return (
    <div
      className={cn(
        "relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border bg-muted",
        className
      )}
    >
      {!failed ? (
        // If /public/images/profile.jpg doesn't exist yet, we fall back to initials.
        // Upload a headshot at: public/images/profile.jpg
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary/20 to-transparent text-sm font-semibold text-foreground">
          {initials}
        </div>
      )}
    </div>
  );
}


