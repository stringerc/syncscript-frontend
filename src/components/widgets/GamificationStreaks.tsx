import { Card } from "@/components/primitives/Card";

export function GamificationStreaks() {
  return (
    <Card title="Gamification Streaks">
      <div className="space-y-4">
        <p className="text-sm text-text-subtle">Weekly Spend Analysis</p>
        <div className="space-y-2">
          <button className="w-full py-2 bg-accent-blue text-white text-sm font-medium rounded-xl hover:bg-accent-blue/80 transition-all duration-200">
            Suggest Alternatives
          </button>
          <button className="w-full py-2 border border-border/40 text-text-subtle text-sm font-medium rounded-xl hover:bg-card-hover transition-all duration-200">
            Adjust Budget
          </button>
        </div>
      </div>
    </Card>
  );
}
