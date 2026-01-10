import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        That page doesn’t exist (or the URL was typed incorrectly).
      </p>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/projects">Projects</Link>
        </Button>
      </div>
    </div>
  );
}


