import { Card } from "@/components/primitives/Card";

export function DayHeader() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">My Day: Tuesday, Nov 28, 2023</h2>
        <div className="hidden xl:block text-xs text-text-mute uppercase tracking-wider">
          RESOURCE HUB
        </div>
      </div>
    </Card>
  );
}
