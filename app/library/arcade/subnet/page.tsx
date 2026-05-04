import { SubnetSprint } from "@/components/arcade/SubnetSprint";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Subnet Sprint",
  description: "60-second networking quiz mini-game.",
};

export default function SubnetPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SectionHeader
            title="Subnet Sprint"
            description="60 seconds. CIDR, masks, host counts. How many can you nail?"
          />
        </CardHeader>
        <CardContent className="pt-4">
          <SubnetSprint />
        </CardContent>
      </Card>
    </div>
  );
}
