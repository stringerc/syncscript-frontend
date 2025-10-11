/**
 * Sample Tasks for New Users
 * 60-DAY ENHANCEMENT #2: Onboarding Optimization
 */

export const sampleTasks = [
  {
    title: "👋 Welcome to SyncScript!",
    description: "Complete this task to get started and earn your first 100 points!",
    priority: 3,
    energy_requirement: 2,
    estimated_duration: 1,
    completed: false,
    is_sample: true
  },
  {
    title: "Try the AI Task Breakdown",
    description: "Click the ✨ AI button on this task to see how AI can break down complex tasks into steps",
    priority: 3,
    energy_requirement: 3,
    estimated_duration: 5,
    completed: false,
    is_sample: true
  },
  {
    title: "Explore the 6 View Modes",
    description: "Click the view switcher to see List, Kanban, Calendar, Gantt, Mind Map, and Matrix views",
    priority: 2,
    energy_requirement: 2,
    estimated_duration: 3,
    completed: false,
    is_sample: true
  }
];

export function createSampleTasksForNewUser(userId: string) {
  return sampleTasks.map((task, index) => ({
    ...task,
    id: `sample-${userId}-${index}`,
    user_id: userId,
    created_at: new Date().toISOString(),
    points: task.energy_requirement * 20
  }));
}

