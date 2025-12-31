import { Badge } from "@/components/ui/badge";

export function ProofBar() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm font-medium tracking-tight">Quick highlights</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>SDNE • Sheridan</Badge>
        <Badge>Networking • CCNA Subnetting (Exam Prep)</Badge>
        <Badge>Cybersecurity Fundamentals</Badge>
        <Badge>Databases • SQL schema design</Badge>
        <Badge>AI/ML • Python</Badge>
        <Badge>Linux/UNIX</Badge>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        <li>Built client-facing web experiences with privacy constraints</li>
        <li>Comfortable shipping across web, networks, and data fundamentals</li>
        <li>Write documentation that helps others deploy and maintain</li>
      </ul>
    </div>
  );
}


