import { Card } from "@/components/primitives/Card";
import { User } from "lucide-react";

const tasks = [
  { title: "Time", progress: "7.0/8", priority: "low" },
  { title: "Thevitee tiee", progress: "6.5/8", priority: "medium" },
  { title: "Money Snaik by", progress: "8.0/8", priority: "low" },
  { title: "Personal", progress: "5.0/8", priority: "high" },
  { title: "Treenies idbe", progress: "7.5/8", priority: "low" },
  { title: "Thenainoit", progress: "6.0/8", priority: "medium" },
];

export function PrioritizedTasks() {
  return (
    <Card title="Prioritized Tasks">
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-bg-raised border border-border/40 rounded-xl hover:bg-card-hover transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-bg-raised rounded-full border border-border/40 flex items-center justify-center">
                <User className="w-4 h-4 text-text-mute" />
              </div>
              <span className="font-medium text-text-primary">{task.title}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-text-subtle">{task.progress}</span>
              <button className="px-3 py-1 bg-accent-green text-black text-xs font-medium rounded-lg hover:bg-accent-green/80 transition-all duration-200">
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
