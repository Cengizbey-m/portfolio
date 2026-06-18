import Link from "next/link";
import { CacheMatch } from "@/components/arcade/CacheMatch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Cache Match",
  description: "Memory match mini-game — flip cards to find matching pairs.",
};

export default function CacheMatchPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link href="/library/arcade" className="steam-link text-sm font-semibold">
        ← Arcade
      </Link>
      <Card>
        <CardHeader>
          <SectionHeader
            title="Cache Match"
            description="Flip two cards to find matching pairs. Clear the board in as few moves as you can."
          />
        </CardHeader>
        <CardContent className="pt-4">
          <CacheMatch />
        </CardContent>
      </Card>
    </div>
  );
}
