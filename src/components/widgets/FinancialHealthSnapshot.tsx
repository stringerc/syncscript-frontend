import { Card } from "@/components/primitives/Card";

export function FinancialHealthSnapshot() {
  return (
    <Card title="Financial Health Snapshot">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-subtle">Weekly Spend vs Budget</span>
            <span className="font-bold text-text-primary">75%</span>
          </div>
          <div className="w-full bg-bg-raised rounded-full h-2">
            <div className="bg-accent-green h-2 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-text-subtle">Aleroestvusness</div>
            <div className="font-medium text-text-primary">$2,340</div>
          </div>
          <div>
            <div className="text-sm text-text-subtle">Senpeertboor loc</div>
            <div className="font-medium text-text-primary">$1,890</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
