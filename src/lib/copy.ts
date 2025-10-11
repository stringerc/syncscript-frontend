/**
 * SyncScript Copy & Content System
 * BLOCKER #8: Helpful, actionable messaging
 * 
 * Principle: Every message should help the user take action
 */

// ==========================================
// ERROR MESSAGES
// ==========================================

export const errorMessages = {
  // Authentication
  authFailed: "Couldn't log you in. Check your email/password and try again.",
  authExpired: "Your session expired. Please log in again to continue.",
  authRequired: "You need to log in to access this feature.",
  
  // Task operations
  taskCreateFailed: "Couldn't create task. Check your connection and try again.",
  taskUpdateFailed: "Couldn't save changes. Your edits are safe - tap to retry.",
  taskDeleteFailed: "Couldn't delete task. Tap to try again.",
  taskLoadFailed: "Couldn't load your tasks. Tap to retry.",
  
  // Validation
  taskTitleRequired: "Task title must be at least 3 characters. Try: 'Email client'",
  taskTitleTooLong: "Task title is too long. Keep it under 200 characters.",
  invalidEmail: "Please enter a valid email address like: you@example.com",
  invalidDate: "Please select a valid date in the future.",
  
  // Network
  networkError: "No internet connection. We'll retry when you're back online.",
  serverError: "Something went wrong on our end. We're looking into it.",
  timeout: "This is taking longer than usual. Tap to try again.",
  
  // Feature not available
  featureComingSoon: "This feature is coming soon! Want early access? Join the waitlist.",
  featurePremium: "Upgrade to Pro to unlock this feature. Learn more →",
  
  // Generic
  somethingWrong: "Oops! Something went wrong. Tap to retry or contact support.",
};

// ==========================================
// SUCCESS MESSAGES
// ==========================================

export const successMessages = {
  // Tasks
  taskCreated: (title: string) => `✅ "${title}" created! Want to start focus mode?`,
  taskCompleted: (points: number) => `🎉 +${points} points! Great job completing that task!`,
  taskDeleted: "Task deleted. Undo? (5 seconds)",
  tasksImported: (count: number) => `📥 Imported ${count} tasks successfully!`,
  
  // Projects
  projectCreated: (name: string) => `📁 "${name}" project created!`,
  projectUpdated: "Project updated successfully.",
  
  // Energy
  energyLogged: (level: number) => `⚡ Energy level ${level}/5 logged. We'll match your tasks!`,
  
  // Achievements
  achievementUnlocked: (name: string) => `🏆 Achievement unlocked: ${name}!`,
  levelUp: (level: number) => `🎉 Level up! You're now Level ${level}!`,
  streakMilestone: (days: number) => `🔥 ${days}-day streak! You're on fire!`,
  
  // Collaboration
  inviteSent: (email: string) => `Invitation sent to ${email}. They'll receive an email shortly.`,
  teamMemberAdded: (name: string) => `${name} joined your team!`,
  
  // Settings
  settingsSaved: "Settings saved. Changes applied immediately.",
  profileUpdated: "Profile updated successfully.",
  
  // Integrations
  integrationConnected: (service: string) => `✅ ${service} connected! Syncing your data...`,
  integrationDisconnected: (service: string) => `${service} disconnected. Your data is safe.`,
};

// ==========================================
// LOADING STATES
// ==========================================

export const loadingMessages = {
  default: "Loading...",
  tasks: "Getting your tasks ready...",
  projects: "Loading your projects...",
  analytics: "Crunching the numbers...",
  aiCoach: "Your AI coach is thinking...",
  suggestions: "Finding personalized suggestions...",
  sync: "Syncing your data...",
  export: "Preparing your data for download...",
};

// ==========================================
// EMPTY STATES
// ==========================================

export const emptyStates = {
  noTasks: {
    title: "Your task list is empty!",
    description: "Create your first task to start tracking your productivity",
    action: "Create Task"
  },
  noProjects: {
    title: "No projects yet",
    description: "Organize your tasks into projects for better focus",
    action: "Create Project"
  },
  noNotifications: {
    title: "All caught up!",
    description: "You have no new notifications",
    action: null
  },
  noSearchResults: {
    title: "No tasks found",
    description: "Try adjusting your search or filters",
    action: "Clear Filters"
  },
  noAchievements: {
    title: "Start unlocking achievements!",
    description: "Complete tasks and maintain streaks to earn badges",
    action: "View Challenges"
  },
  noTeamMembers: {
    title: "Work better together",
    description: "Invite team members to collaborate on projects",
    action: "Invite Team"
  },
};

// ==========================================
// CONFIRMATION MESSAGES
// ==========================================

export const confirmations = {
  deleteTask: {
    title: "Delete this task?",
    description: "This action cannot be undone.",
    confirm: "Delete Task",
    cancel: "Keep Task"
  },
  deleteProject: {
    title: "Delete this project?",
    description: "All tasks in this project will remain, but the project grouping will be removed.",
    confirm: "Delete Project",
    cancel: "Keep Project"
  },
  logout: {
    title: "Log out?",
    description: "Make sure all your changes are saved.",
    confirm: "Log Out",
    cancel: "Stay Logged In"
  },
  bulkDelete: (count: number) => ({
    title: `Delete ${count} tasks?`,
    description: "This action cannot be undone.",
    confirm: "Delete All",
    cancel: "Cancel"
  }),
};

// ==========================================
// TOOLTIPS
// ==========================================

export const tooltips = {
  // Energy
  energyLevel: (level: number) => `Energy Level ${level}/5 - ${getEnergyDescription(level)}`,
  energyMatch: "Tasks matched to your current energy level",
  energySelector: "Log your current energy level to get personalized task recommendations",
  
  // Features
  focusMode: "Start a focused work session with Pomodoro timer",
  quickCapture: "Quickly capture a task without opening a form",
  aiBreakdown: "Let AI break this task into smaller steps",
  taskDependencies: "Set tasks that must be completed before this one",
  
  // Gamification
  points: (points: number) => `You've earned ${points} points this week`,
  level: (level: number) => `Level ${level} - ${getLevelName(level)}`,
  streak: (days: number) => `${days} day login streak - keep it going!`,
  
  // Shortcuts
  cmdK: "Press Cmd+K to open quick actions",
  cmdN: "Press Cmd+N to create a new task",
  cmdShiftP: "Press Cmd+Shift+P for command palette",
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function getEnergyDescription(level: number): string {
  const descriptions: Record<number, string> = {
    1: "Low - Simple, mindless tasks",
    2: "Medium-Low - Light work",
    3: "Medium - Standard tasks",
    4: "Medium-High - Challenging work",
    5: "High - Deep focus required"
  };
  return descriptions[level] || "Unknown";
}

function getLevelName(level: number): string {
  if (level < 5) return "Beginner";
  if (level < 10) return "Novice";
  if (level < 20) return "Intermediate";
  if (level < 35) return "Advanced";
  if (level < 50) return "Expert";
  return "Master";
}

// ==========================================
// ONBOARDING COPY
// ==========================================

export const onboarding = {
  welcome: {
    title: "Welcome to SyncScript! 🎉",
    subtitle: "Your AI-powered productivity companion",
    steps: [
      {
        title: "Log your energy",
        description: "Start by telling us how you're feeling (1-5). We'll match tasks to your energy level.",
      },
      {
        title: "Create your first task",
        description: "Add a task you need to complete. Be specific: 'Email client about project' not just 'Email'",
      },
      {
        title: "Complete and level up",
        description: "Check off tasks to earn points, level up, and unlock achievements!",
      },
    ],
  },
};

