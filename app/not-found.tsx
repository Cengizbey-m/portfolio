import Link from "next/link";
import { Home, Library, Gamepad2, FileText } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
      <p className="font-mono text-7xl font-black text-[hsl(var(--steam-link))] drop-shadow-[0_0_24px_hsl(var(--steam-link)/0.4)] sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        This install couldn&rsquo;t be found
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        The page failed to mount — like a save file that didn&rsquo;t sync. Let&rsquo;s get you back
        to something that actually loads.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-2 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.95),rgba(26,68,194,0.95))] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] hover:brightness-110"
        >
          <Home className="h-4 w-4" /> Profile
        </Link>
        <Link href="/library" className="link-pill h-10">
          <Library className="h-4 w-4" /> Library
        </Link>
        <Link href="/library/arcade" className="link-pill h-10">
          <Gamepad2 className="h-4 w-4" /> Arcade
        </Link>
        <Link href="/resume" className="link-pill h-10">
          <FileText className="h-4 w-4" /> Resume
        </Link>
      </div>
    </div>
  );
}
