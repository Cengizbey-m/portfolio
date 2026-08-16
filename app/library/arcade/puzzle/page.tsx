import Link from "next/link";
import { PixelPuzzle } from "@/components/arcade/PixelPuzzle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Slide Puzzle",
  description:
    "Sliding tile puzzle. Upload your own photo, scramble it, and slide the pieces back into place.",
};

export default function PuzzlePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link href="/library/arcade" className="steam-link text-sm font-semibold">
        ← Arcade
      </Link>
      <Card>
        <CardHeader>
          <SectionHeader
            title="Slide Puzzle"
            description="Upload a photo, scramble it, and slide the tiles back into place. Works on 3x3, 4x4, or 5x5."
          />
        </CardHeader>
        <CardContent className="pt-4">
          <PixelPuzzle />
        </CardContent>
      </Card>
    </div>
  );
}
