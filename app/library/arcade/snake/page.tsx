import { SnakeGame } from "@/components/arcade/SnakeGame";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Commit Snake",
  description: "Snake mini-game where you eat git commits.",
};

export default function SnakePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SectionHeader
            title="Commit Snake"
            description="Arrow keys / WASD to move. Eat commits. Don't bite yourself."
          />
        </CardHeader>
        <CardContent className="pt-4">
          <SnakeGame />
        </CardContent>
      </Card>
    </div>
  );
}
