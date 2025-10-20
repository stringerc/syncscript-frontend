import { Card } from "@/components/primitives/Card";
import { CloudRain } from "lucide-react";

export function WeatherRouteCard() {
  return (
    <Card title="Weather & Route Intelligence">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-bg-raised rounded-full border border-border/40 flex items-center justify-center">
          <CloudRain className="w-4 h-4 text-text-mute" />
        </div>
        <div className="text-sm text-text-subtle">
          Heavy rain 5 PM. Reschedule outdoor run or pack gear.
        </div>
      </div>
    </Card>
  );
}
