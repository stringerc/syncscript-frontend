import { Card } from "@/components/primitives/Card";

const achievements = [
  {
    title: "Budget Master 8/10 Weeks This Week",
    progress: 80,
  },
  {
    title: "Task Spree 20/25 Tasks This Week",
    progress: 80,
  },
  {
    title: "Sudgri Master",
    progress: 60,
  },
];

export function AchievementProgressRail() {
  return (
    <Card title="Achievement Progress Rail">
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1 mr-3">
              <div className="text-sm text-text-subtle mb-2">{achievement.title}</div>
              <div className="w-full bg-bg-raised rounded-full h-2">
                <div 
                  className="bg-accent-green h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
            </div>
            <button className="w-6 h-6 rounded-full bg-accent-green text-black text-sm font-medium flex items-center justify-center hover:bg-accent-green/80 transition-all duration-200">
              +
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
