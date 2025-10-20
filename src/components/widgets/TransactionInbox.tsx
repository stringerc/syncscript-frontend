import { Card } from "@/components/primitives/Card";
import { Clock, SquareCheckBig, AlertTriangle } from "lucide-react";

const inboxItems = [
  {
    icon: Clock,
    text: "7-Day Streak Tot 2 Overdue Tasks",
  },
  {
    icon: SquareCheckBig,
    text: "Q4 Latinde Tasks 1 2vesdue Tasks",
  },
  {
    icon: AlertTriangle,
    text: "1 Decision Pending off 1 Decision tibe 20xing",
  },
];

export function TransactionInbox() {
  return (
    <Card title="Transaction In-Box">
      <div className="space-y-3">
        {inboxItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl border border-border/40 hover:bg-card-hover transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4 text-text-mute" />
                <span className="text-sm text-text-subtle">{item.text}</span>
              </div>
              <button className="w-6 h-6 rounded-full bg-accent-blue text-white text-sm font-medium flex items-center justify-center hover:bg-accent-blue/80 transition-all duration-200">
                +
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
