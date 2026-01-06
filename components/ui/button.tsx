"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 tracking-[0.08em] uppercase",
  {
    variants: {
      variant: {
        default:
          "text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] bg-[linear-gradient(180deg,rgba(71,191,255,0.9),rgba(26,68,194,0.92))] hover:brightness-110",
        secondary:
          "text-foreground bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.12))] ring-1 ring-white/10 hover:bg-white/10",
        ghost:
          "text-muted-foreground hover:bg-white/5 hover:text-foreground",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-white/5",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";


