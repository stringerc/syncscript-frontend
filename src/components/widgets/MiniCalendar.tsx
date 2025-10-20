import { Card } from "@/components/primitives/Card";

const calendarDays = [
  "S", "M", "T", "W", "T", "F", "S",
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
];

export function MiniCalendar() {
  return (
    <Card title="My Date (Calendar)">
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`p-2 text-xs rounded-lg transition-all duration-200 ${
              typeof day === "string"
                ? "text-text-mute font-medium"
                : day === 28
                ? "bg-accent-blue text-white"
                : "text-text-subtle hover:bg-bg-raised cursor-pointer"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </Card>
  );
}
