import { Card } from "@/components/primitives/Card";
import { MoreHorizontal, Mic } from "lucide-react";

export function AIFocusPanel() {
  return (
    <Card
      title="What Should I Be Doing Right Now?"
      toolbar={
        <button className="p-2 text-text-mute hover:text-text-primary transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      }
    >
      <div className="space-y-4">
        <div className="p-3 bg-accent-blue/10 border border-accent-blue/30 rounded-xl">
          <p className="text-sm text-accent-blue font-medium">
            Prioritize 'Q4 Budget Allocation (Financial Agent)'
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-bg-raised rounded-full border border-border/40"></div>
            <div className="text-sm text-text-subtle">
              Q4 Budget Allocation before your FM 1 team sync for maximum feedback.
            </div>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center space-x-2 bg-accent-blue text-white py-3 px-4 rounded-xl font-medium hover:bg-accent-blue/80 transition-all duration-200 shadow-glow">
          <Mic className="w-4 h-4" />
          <span>Voice-to-Task</span>
        </button>
      </div>
    </Card>
  );
}
