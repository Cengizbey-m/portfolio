import Link from "next/link";
import { PacketEcho } from "@/components/arcade/PacketEcho";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Packet Echo",
  description: "Simon-style sequence memory mini-game.",
};

export default function PacketEchoPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link href="/library/arcade" className="steam-link text-sm font-semibold">
        ← Arcade
      </Link>
      <Card>
        <CardHeader>
          <SectionHeader
            title="Packet Echo"
            description="Watch the packets light up, then tap them back in order. Each round adds one more."
          />
        </CardHeader>
        <CardContent className="pt-4">
          <PacketEcho />
        </CardContent>
      </Card>
    </div>
  );
}
