"use client";

import * as React from "react";
import mermaid from "mermaid";

let configured = false;

export function Mermaid({ chart }: { chart: string }) {
  const id = React.useId();
  const [svg, setSvg] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!configured) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "neutral",
      });
      configured = true;
    }
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const { svg } = await mermaid.render(`m-${id.replace(/:/g, "")}`, chart);
        if (!cancelled) setSvg(svg);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Mermaid render failed");
      }
    }

    setSvg(null);
    setError(null);
    run();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="rounded-lg border border-border bg-card p-4 text-sm">
        <p className="font-medium">Mermaid diagram error</p>
        <p className="mt-1 text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card p-4">
      {svg ? (
        <div
          className="[&>svg]:h-auto [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <p className="text-sm text-muted-foreground">Rendering diagram…</p>
      )}
    </div>
  );
}


