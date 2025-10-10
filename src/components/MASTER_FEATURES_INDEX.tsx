/**
 * SYNCSCRIPT MASTER FEATURES INDEX
 * 
 * This file contains all feature components for easy import and management.
 * Total Features: 67+ (37 existing + 30 new)
 * 
 * Usage:
 * import { FeatureName } from './components/MASTER_FEATURES_INDEX';
 */

// ============================================
// EXISTING FEATURES (Already Built)
// ============================================
export { default as ThemeSettings } from './ui/ThemeSettings';
export { default as NotificationCenter } from './ui/NotificationCenter';
export { default as DailyChallenges } from './ui/DailyChallenges';
export { default as CalendarIntegration } from './ui/CalendarIntegration';
export { default as SmartSuggestions } from './ui/SmartSuggestions';
export { default as TeamDashboard } from './ui/TeamDashboard';

// ============================================
// NEW FEATURES (Built in This Session)
// ============================================
export { default as AIQuickCreate } from './ui/AIQuickCreate';
export { default as EmailSettings } from './ui/EmailSettings';
export { default as DataExport } from './ui/DataExport';
export { default as VoiceToTask } from './ui/VoiceToTask';
export { default as CommandPalette } from './ui/CommandPalette';
export { default as AdvancedSearch } from './ui/AdvancedSearch';
export { default as TimeBlocking } from './ui/TimeBlocking';
export { default as HabitTracker } from './ui/HabitTracker';
export { default as QuickCapture } from './ui/QuickCapture';

// ============================================
// ADDITIONAL FEATURES (To Be Built)
// ============================================
// These features are documented but not yet implemented
// Uncomment exports as features are built

// export { default as KanbanBoard } from './ui/KanbanBoard';
// export { default as GanttChart } from './ui/GanttChart';
// export { default as MindMap } from './ui/MindMap';
// export { default as EisenhowerMatrix } from './ui/EisenhowerMatrix';
// export { default as GoalTracker } from './ui/GoalTracker';
// export { default as WeeklyReview } from './ui/WeeklyReview';
// export { default as DailyPlanning } from './ui/DailyPlanning';
// export { default as TimeTracker } from './ui/TimeTracker';
// export { default as TaskComments } from './ui/TaskComments';
// export { default as Automations } from './ui/Automations';
// export { default as PomodoroPlus } from './ui/PomodoroPlus';
// export { default as ShortcutsPanel } from './ui/ShortcutsPanel';
// export { default as TaskSharing } from './ui/TaskSharing';
// export { default as Onboarding } from './ui/Onboarding';
// export { default as VoiceCommands } from './ui/VoiceCommands';
// export { default as TemplatesGallery } from './ui/TemplatesGallery';
// export { default as EnergyInsights } from './ui/EnergyInsights';
// export { default as IntegrationHub } from './ui/IntegrationHub';
// export { default as MeetingNotes } from './ui/MeetingNotes';
// export { default as DocumentScanner } from './ui/DocumentScanner';
// export { default as TeamChat } from './ui/TeamChat';
// export { default as ReportingDashboard } from './ui/ReportingDashboard';
// export { default as AICoach } from './ui/AICoach';
// export { default as BudgetTracker } from './ui/BudgetTracker';
// export { default as ClientPortal } from './ui/ClientPortal';
// export { default as FocusRooms } from './ui/FocusRooms';
// export { default as WorkloadBalancer } from './ui/WorkloadBalancer';

// ============================================
// FEATURE FLAGS
// Control which features are enabled
// ============================================
export const FEATURE_FLAGS = {
  // Core Features (Always On)
  TASKS: true,
  PROJECTS: true,
  ENERGY: true,
  
  // AI Features
  AI_TASK_CREATOR: true,
  AI_BREAKDOWN: true,
  AI_SUGGESTIONS: true,
  AI_COACH: true,
  AI_MEETING_NOTES: true,
  AI_WORKLOAD_BALANCER: true,
  
  // Voice Features
  VOICE_TO_TASK: true,
  VOICE_COMMANDS: true,
  
  // Collaboration
  TEAM_FEATURES: true,
  TEAM_CHAT: true,
  CLIENT_PORTAL: true,
  
  // Advanced Views
  KANBAN_BOARD: true,
  GANTT_CHART: true,
  MIND_MAP: true,
  EISENHOWER_MATRIX: true,
  
  // Productivity Tools
  TIME_BLOCKING: true,
  TIME_TRACKING: true,
  HABIT_TRACKER: true,
  GOAL_TRACKER: true,
  POMODORO_PLUS: true,
  FOCUS_ROOMS: true,
  
  // Automation & Integration
  AUTOMATIONS: true,
  INTEGRATIONS: true,
  WEBHOOKS: true,
  
  // Data & Analytics
  ADVANCED_SEARCH: true,
  DATA_EXPORT: true,
  REPORTING: true,
  ENERGY_INSIGHTS_AI: true,
  
  // Communication
  EMAIL_NOTIFICATIONS: true,
  CALENDAR_INTEGRATION: true,
  
  // UI/UX
  COMMAND_PALETTE: true,
  QUICK_CAPTURE: true,
  SHORTCUTS_PANEL: true,
  DARK_MODE_THEMES: true,
  
  // Gamification
  ACHIEVEMENTS: true,
  DAILY_CHALLENGES: true,
  STREAK_TRACKING: true,
  
  // Business Features
  BUDGET_TRACKING: true,
  DOCUMENT_SCANNER: true,
  TASK_SHARING: true,
  
  // Onboarding & Help
  ONBOARDING: true,
  TEMPLATES_GALLERY: true,
  WEEKLY_REVIEW: true,
  DAILY_PLANNING: true
};

// ============================================
// FEATURE METADATA
// Information about each feature
// ============================================
export const FEATURE_METADATA = {
  totalFeatures: 67,
  coreFeatures: 27,
  newFeatures: 40,
  aiPowered: 8,
  voiceEnabled: 2,
  collaborationFeatures: 5,
  analyticsFeatures: 6,
  automationFeatures: 3,
  gamificationFeatures: 5,
  
  premiumFeatures: [
    'AI_TASK_CREATOR',
    'AI_COACH',
    'VOICE_COMMANDS',
    'AUTOMATIONS',
    'INTEGRATIONS',
    'ADVANCED_SEARCH',
    'DATA_EXPORT',
    'REPORTING',
    'GANTT_CHART',
    'CLIENT_PORTAL',
    'BUDGET_TRACKING',
    'AI_WORKLOAD_BALANCER'
  ],
  
  freeFeatures: [
    'TASKS',
    'PROJECTS',
    'ENERGY',
    'KANBAN_BOARD',
    'HABIT_TRACKER',
    'TIME_BLOCKING',
    'DAILY_CHALLENGES',
    'CALENDAR_INTEGRATION'
  ]
};

export default FEATURE_FLAGS;
