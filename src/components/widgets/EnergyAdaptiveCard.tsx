import { Card } from "@/components/primitives/Card";
import { MeterRing } from "@/components/primitives/MeterRing";
import { Zap, Mic } from "lucide-react";

export function EnergyAdaptiveCard() {
  return (
    <Card
      title="Energy Adaptive Agent"
      toolbar={
        <Zap className="w-6 h-6 text-accent-green" />
      }
    >
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <MeterRing value={85} size={120} />
        </div>
        
        <div>
          <p className="text-sm text-text-subtle mb-2">4 hrs left. Optimize load?</p>
          <button className="w-full flex items-center justify-center space-x-2 bg-accent-green text-black py-3 px-4 rounded-xl font-medium hover:bg-accent-green/80 transition-all duration-200 shadow-glow">
            <Mic className="w-4 h-4" />
            <span>Voice-to-Task</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
