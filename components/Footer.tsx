import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-max flex flex-col gap-3 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Muhammed “Cengiz” Cengiz • Oakville / GTA
        </p>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-foreground" href="/projects">
            Projects
          </Link>
          <Link className="hover:text-foreground" href="/about">
            About
          </Link>
          <Link className="hover:text-foreground" href="/resume">
            Resume
          </Link>
          <Link className="hover:text-foreground" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}


