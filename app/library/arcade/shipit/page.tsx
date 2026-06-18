import Link from "next/link";
import { ShipItReflex } from "@/components/arcade/ShipItReflex";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Ship It",
  description: "Reflex mini-game — stop the marker in the deploy zone.",
};

export default function ShipItPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link href="/library/arcade" className="steam-link text-sm font-semibold">
        ← Arcade
      </Link>
      <Card>
        <CardHeader>
          <SectionHeader
            title="Ship It"
            description="Tap DEPLOY (or Space) when the marker is in the green zone. It speeds up every hit."
          />
        </CardHeader>
        <CardContent className="pt-4">
          <ShipItReflex />
        </CardContent>
      </Card>
    </div>
  );
}
