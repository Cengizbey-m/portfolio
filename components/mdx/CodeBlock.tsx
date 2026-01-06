"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Mermaid } from "@/components/Mermaid";

export function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const raw =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.join("")
        : "";

  const isMermaid = className?.includes("language-mermaid");

  if (isMermaid) {
    return <Mermaid chart={raw.trim()} />;
  }

  return (
    <pre className="overflow-x-auto rounded-sm border border-border bg-black/20 p-4 ring-1 ring-white/5">
      <code className={cn("text-xs leading-5", className)}>{children}</code>
    </pre>
  );
}


