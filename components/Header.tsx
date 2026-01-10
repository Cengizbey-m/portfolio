import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-max flex h-14 items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/" className="font-semibold tracking-tight">
            Cengiz
          </Link>
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            <Link href="/projects" className="hover:text-foreground">
              Projects
            </Link>
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/resume" className="hover:text-foreground">
              Resume
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}


