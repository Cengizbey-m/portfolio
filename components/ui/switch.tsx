"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border bg-muted transition-colors data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-background shadow transition-transform data-[state=checked]:translate-x-[1.25rem]" />
    </SwitchPrimitives.Root>
  );
}


