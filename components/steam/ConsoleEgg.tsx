"use client";

import * as React from "react";

const ART = `
   ____               _
  / ___|___ _ __   __ _(_)____
 | |   / _ \\ '_ \\ / _\` | |_  /
 | |__|  __/ | | | (_| | |/ /
  \\____\\___|_| |_|\\__, |_/___|
                  |___/
`;

export function ConsoleEgg() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as unknown as { __cengizGreeted?: boolean }).__cengizGreeted) return;
    (window as unknown as { __cengizGreeted?: boolean }).__cengizGreeted = true;
    console.log(`%c${ART}`, "color:#66c0f4;font-family:monospace;");
    console.log(
      "%cYou opened the dev console. That's recruiter-tier curiosity.\n%cPing me: muhammedcengiz2778@gmail.com",
      "color:#b6c645;font-weight:bold;font-size:13px;",
      "color:#c7d5e0;font-size:12px;"
    );
  }, []);
  return null;
}
