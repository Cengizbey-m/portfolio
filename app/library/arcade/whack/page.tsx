import { WhackABug } from "@/components/arcade/WhackABug";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Whack-a-Bug",
  description: "Click bugs before they cause prod incidents.",
};

export default function WhackPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SectionHeader
            title="Whack-a-Bug"
            description="Click the bugs. Don't click features. 30 seconds. Fixing your own bug counts."
          />
        </CardHeader>
        <CardContent className="pt-4">
          <WhackABug />
        </CardContent>
      </Card>
    </div>
  );
}
