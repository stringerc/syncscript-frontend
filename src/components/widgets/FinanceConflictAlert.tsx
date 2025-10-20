import { Card } from "@/components/primitives/Card";
import { AlertTriangle, Award } from "lucide-react";

export function FinanceConflictAlert() {
  return (
    <Card className="border-2 border-accent-amber/50 shadow-glow">
      <div className="flex items-center space-x-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-accent-amber" />
        <h3 className="text-lg font-bold text-text-primary">Financial Conflict Alert</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="mb-3 text-text-subtle">Dinner exceeds budget by $45</p>
          <button className="px-4 py-2 bg-accent-blue text-white text-sm font-medium rounded-xl hover:bg-accent-blue/80 transition-all duration-200">
            Suggest Alternatives
          </button>
        </div>
        
        <div className="border-t border-border/40 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-text-primary">Daily Challenge</h4>
              <p className="text-sm text-text-subtle">Points: +500</p>
            </div>
            <Award className="w-6 h-6 text-accent-amber" />
          </div>
        </div>
      </div>
    </Card>
  );
}
