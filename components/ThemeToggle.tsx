"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="normal-case tracking-normal font-medium"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {mounted ? (
        isDark ? (
          <>
            <Sun className="h-4 w-4" /> <span className="hidden sm:inline">Light</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4" /> <span className="hidden sm:inline">Dark</span>
          </>
        )
      ) : (
        <span className="text-xs text-muted-foreground">Theme</span>
      )}
    </Button>
  );
}


