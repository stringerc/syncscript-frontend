/**
 * Achievement System for SyncScript
 * Comprehensive gamification with badges, milestones, and rewards
 */

export type AchievementCategory = 
  | 'tasks' 
  | 'streaks' 
  | 'energy' 
  | 'focus' 
  | 'projects' 
  | 'speed' 
  | 'consistency';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';

export interface Achievement {
  id: string;
  category: AchievementCategory;
  tier: AchievementTier;
  name: string;
  description: string;
  icon: string;
  condition: {
    type: string;
    value: number;
  };
  reward: {
    points: number;
    title?: string;
  };
}

export interface UserAchievement {
  achievementId: string;
  unlockedAt: Date;
  progress: number;
  isCompleted: boolean;
}

export interface AchievementProgress {
  achievementId: string;
  currentValue: number;
  targetValue: number;
  percentage: number;
  isUnlocked: boolean;
}

// Achievement definitions
export const ACHIEVEMENTS: Achievement[] = [
  // TASKS CATEGORY
  {
    id: 'first_task',
    category: 'tasks',
    tier: 'bronze',
    name: 'First Steps',
    description: 'Complete your first task',
    icon: '✅',
    condition: { type: 'tasks_completed', value: 1 },
    reward: { points: 10 }
  },
  {
    id: 'task_warrior',
    category: 'tasks',
    tier: 'silver',
    name: 'Task Warrior',
    description: 'Complete 10 tasks',
    icon: '⚔️',
    condition: { type: 'tasks_completed', value: 10 },
    reward: { points: 50 }
  },
  {
    id: 'task_master',
    category: 'tasks',
    tier: 'gold',
    name: 'Task Master',
    description: 'Complete 50 tasks',
    icon: '👑',
    condition: { type: 'tasks_completed', value: 50 },
    reward: { points: 200, title: 'Task Master' }
  },
  {
    id: 'task_legend',
    category: 'tasks',
    tier: 'platinum',
    name: 'Task Legend',
    description: 'Complete 100 tasks',
    icon: '🏆',
    condition: { type: 'tasks_completed', value: 100 },
    reward: { points: 500, title: 'Productivity Legend' }
  },
  {
    id: 'task_god',
    category: 'tasks',
    tier: 'legendary',
    name: 'Task Deity',
    description: 'Complete 500 tasks',
    icon: '⚡',
    condition: { type: 'tasks_completed', value: 500 },
    reward: { points: 2000, title: 'Task Deity' }
  },

  // STREAKS CATEGORY
  {
    id: 'streak_start',
    category: 'streaks',
    tier: 'bronze',
    name: 'On a Roll',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    condition: { type: 'streak_days', value: 3 },
    reward: { points: 30 }
  },
  {
    id: 'streak_week',
    category: 'streaks',
    tier: 'silver',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    condition: { type: 'streak_days', value: 7 },
    reward: { points: 100 }
  },
  {
    id: 'streak_month',
    category: 'streaks',
    tier: 'gold',
    name: 'Unstoppable',
    description: 'Maintain a 30-day streak',
    icon: '🔥',
    condition: { type: 'streak_days', value: 30 },
    reward: { points: 500, title: 'Unstoppable' }
  },
  {
    id: 'streak_legend',
    category: 'streaks',
    tier: 'legendary',
    name: 'Streak Legend',
    description: 'Maintain a 100-day streak',
    icon: '🔥',
    condition: { type: 'streak_days', value: 100 },
    reward: { points: 2500, title: 'Streak Legend' }
  },

  // ENERGY CATEGORY
  {
    id: 'energy_tracker',
    category: 'energy',
    tier: 'bronze',
    name: 'Energy Aware',
    description: 'Log your energy 10 times',
    icon: '⚡',
    condition: { type: 'energy_logs', value: 10 },
    reward: { points: 20 }
  },
  {
    id: 'energy_master',
    category: 'energy',
    tier: 'silver',
    name: 'Energy Master',
    description: 'Log your energy 50 times',
    icon: '⚡',
    condition: { type: 'energy_logs', value: 50 },
    reward: { points: 100 }
  },
  {
    id: 'high_energy',
    category: 'energy',
    tier: 'gold',
    name: 'Energizer',
    description: 'Maintain 80+ energy for 7 days',
    icon: '🌟',
    condition: { type: 'high_energy_days', value: 7 },
    reward: { points: 200, title: 'Energizer' }
  },

  // FOCUS CATEGORY
  {
    id: 'first_focus',
    category: 'focus',
    tier: 'bronze',
    name: 'Focus Beginner',
    description: 'Complete your first focus session',
    icon: '🎯',
    condition: { type: 'focus_sessions', value: 1 },
    reward: { points: 15 }
  },
  {
    id: 'focus_enthusiast',
    category: 'focus',
    tier: 'silver',
    name: 'Focus Enthusiast',
    description: 'Complete 10 focus sessions',
    icon: '🎯',
    condition: { type: 'focus_sessions', value: 10 },
    reward: { points: 75 }
  },
  {
    id: 'focus_master',
    category: 'focus',
    tier: 'gold',
    name: 'Deep Work Master',
    description: 'Complete 50 focus sessions',
    icon: '🧠',
    condition: { type: 'focus_sessions', value: 50 },
    reward: { points: 300, title: 'Deep Work Master' }
  },
  {
    id: 'focus_marathon',
    category: 'focus',
    tier: 'platinum',
    name: 'Focus Marathon',
    description: 'Accumulate 25 hours of focus time',
    icon: '⏱️',
    condition: { type: 'focus_minutes', value: 1500 },
    reward: { points: 500, title: 'Focus Champion' }
  },

  // PROJECTS CATEGORY
  {
    id: 'first_project',
    category: 'projects',
    tier: 'bronze',
    name: 'Project Pioneer',
    description: 'Create your first project',
    icon: '📁',
    condition: { type: 'projects_created', value: 1 },
    reward: { points: 20 }
  },
  {
    id: 'project_manager',
    category: 'projects',
    tier: 'silver',
    name: 'Project Manager',
    description: 'Create 5 projects',
    icon: '📊',
    condition: { type: 'projects_created', value: 5 },
    reward: { points: 100 }
  },
  {
    id: 'project_complete',
    category: 'projects',
    tier: 'gold',
    name: 'Project Completionist',
    description: 'Complete all tasks in a project',
    icon: '✨',
    condition: { type: 'projects_completed', value: 1 },
    reward: { points: 150, title: 'Completionist' }
  },

  // SPEED CATEGORY
  {
    id: 'speed_demon',
    category: 'speed',
    tier: 'silver',
    name: 'Speed Demon',
    description: 'Complete 5 tasks in one day',
    icon: '⚡',
    condition: { type: 'tasks_per_day', value: 5 },
    reward: { points: 100 }
  },
  {
    id: 'productivity_beast',
    category: 'speed',
    tier: 'gold',
    name: 'Productivity Beast',
    description: 'Complete 10 tasks in one day',
    icon: '🦁',
    condition: { type: 'tasks_per_day', value: 10 },
    reward: { points: 250, title: 'Productivity Beast' }
  },

  // CONSISTENCY CATEGORY
  {
    id: 'morning_person',
    category: 'consistency',
    tier: 'silver',
    name: 'Early Bird',
    description: 'Complete tasks before 9 AM for 7 days',
    icon: '🌅',
    condition: { type: 'morning_tasks', value: 7 },
    reward: { points: 150, title: 'Early Bird' }
  },
  {
    id: 'night_owl',
    category: 'consistency',
    tier: 'silver',
    name: 'Night Owl',
    description: 'Complete tasks after 9 PM for 7 days',
    icon: '🦉',
    condition: { type: 'night_tasks', value: 7 },
    reward: { points: 150, title: 'Night Owl' }
  },
  {
    id: 'weekend_warrior',
    category: 'consistency',
    tier: 'bronze',
    name: 'Weekend Warrior',
    description: 'Complete tasks on a weekend',
    icon: '🎉',
    condition: { type: 'weekend_tasks', value: 1 },
    reward: { points: 50 }
  }
];

// Helper functions
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.category === category);
}

export function getAchievementsByTier(tier: AchievementTier): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.tier === tier);
}

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

// Tier colors for UI
export const TIER_COLORS = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#E5E4E2',
  legendary: '#FF6B6B'
};

export const TIER_GRADIENTS = {
  bronze: 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)',
  silver: 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)',
  gold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  platinum: 'linear-gradient(135deg, #E5E4E2 0%, #B0B0B0 100%)',
  legendary: 'linear-gradient(135deg, #FF6B6B 0%, #8B0000 100%)'
};

