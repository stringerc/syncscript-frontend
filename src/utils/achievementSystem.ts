/**
 * Achievement System Expansion
 * Feature #29: 50+ Unique Achievements
 * 
 * Categories:
 * - Tasks & Productivity
 * - Energy Management
 * - Budget & Finance
 * - Streaks & Consistency
 * - Goals & Milestones
 * - Social & Collaboration
 * - Platform Mastery
 * - Special Events
 */

export interface Achievement {
  id: string
  title: string
  description: string
  category: AchievementCategory
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  reward: number // emblems
  progress?: number // current progress
  target?: number // target to complete
  unlocked: boolean
  unlockedAt?: string
  secret?: boolean // Hidden until unlocked
}

export type AchievementCategory = 
  | 'tasks'
  | 'energy'
  | 'budget'
  | 'streaks'
  | 'goals'
  | 'social'
  | 'mastery'
  | 'events'

/**
 * All 50+ Achievements
 */
export const ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  // ===== TASKS & PRODUCTIVITY (10 achievements) =====
  {
    id: 'task_first',
    title: 'First Step',
    description: 'Complete your first task',
    category: 'tasks',
    icon: '✅',
    rarity: 'common',
    reward: 5,
    target: 1
  },
  {
    id: 'task_10',
    title: 'Getting Started',
    description: 'Complete 10 tasks',
    category: 'tasks',
    icon: '📝',
    rarity: 'common',
    reward: 10,
    target: 10
  },
  {
    id: 'task_50',
    title: 'Productive Player',
    description: 'Complete 50 tasks',
    category: 'tasks',
    icon: '📋',
    rarity: 'rare',
    reward: 25,
    target: 50
  },
  {
    id: 'task_100',
    title: 'Task Master',
    description: 'Complete 100 tasks',
    category: 'tasks',
    icon: '🎯',
    rarity: 'epic',
    reward: 50,
    target: 100
  },
  {
    id: 'task_500',
    title: 'Productivity Legend',
    description: 'Complete 500 tasks',
    category: 'tasks',
    icon: '⚡',
    rarity: 'legendary',
    reward: 200,
    target: 500
  },
  {
    id: 'task_perfect_day',
    title: 'Perfect Day',
    description: 'Complete all tasks in a single day',
    category: 'tasks',
    icon: '💯',
    rarity: 'rare',
    reward: 30
  },
  {
    id: 'task_early_bird',
    title: 'Early Bird',
    description: 'Complete a task before 8 AM',
    category: 'tasks',
    icon: '🌅',
    rarity: 'common',
    reward: 15
  },
  {
    id: 'task_night_owl',
    title: 'Night Owl',
    description: 'Complete a task after 10 PM',
    category: 'tasks',
    icon: '🦉',
    rarity: 'common',
    reward: 15
  },
  {
    id: 'task_speed_demon',
    title: 'Speed Demon',
    description: 'Complete 5 tasks in under 30 minutes',
    category: 'tasks',
    icon: '⚡',
    rarity: 'epic',
    reward: 40
  },
  {
    id: 'task_organizer',
    title: 'Master Organizer',
    description: 'Create tasks in 5 different categories',
    category: 'tasks',
    icon: '🗂️',
    rarity: 'rare',
    reward: 20
  },

  // ===== ENERGY MANAGEMENT (10 achievements) =====
  {
    id: 'energy_first_log',
    title: 'Energy Aware',
    description: 'Log your first energy level',
    category: 'energy',
    icon: '💚',
    rarity: 'common',
    reward: 5
  },
  {
    id: 'energy_high_streak',
    title: 'High Energy Hero',
    description: 'Maintain high energy for 7 consecutive days',
    category: 'energy',
    icon: '🔋',
    rarity: 'rare',
    reward: 30,
    target: 7
  },
  {
    id: 'energy_recovery',
    title: 'Recovery Master',
    description: 'Boost energy from low to high in one day',
    category: 'energy',
    icon: '🚀',
    rarity: 'epic',
    reward: 40
  },
  {
    id: 'energy_consistent',
    title: 'Consistent Energy',
    description: 'Log energy 30 days in a row',
    category: 'energy',
    icon: '📊',
    rarity: 'rare',
    reward: 35,
    target: 30
  },
  {
    id: 'energy_optimizer',
    title: 'Energy Optimizer',
    description: 'Complete 10 high-energy tasks',
    category: 'energy',
    icon: '⚡',
    rarity: 'rare',
    reward: 25,
    target: 10
  },
  {
    id: 'energy_balanced',
    title: 'Balanced Life',
    description: 'Maintain medium-high energy for 14 days',
    category: 'energy',
    icon: '⚖️',
    rarity: 'epic',
    reward: 45,
    target: 14
  },
  {
    id: 'energy_rest_day',
    title: 'Rest Day Champion',
    description: 'Take a rest day when energy is low',
    category: 'energy',
    icon: '😴',
    rarity: 'common',
    reward: 10
  },
  {
    id: 'energy_100_logs',
    title: 'Energy Tracker',
    description: 'Log energy 100 times',
    category: 'energy',
    icon: '📈',
    rarity: 'epic',
    reward: 50,
    target: 100
  },
  {
    id: 'energy_emblem_charged',
    title: 'Emblem Charged',
    description: 'Earn maximum emblem charge in one day',
    category: 'energy',
    icon: '💎',
    rarity: 'legendary',
    reward: 100
  },
  {
    id: 'energy_wisdom',
    title: 'Energy Wisdom',
    description: 'Accept AI suggestion to adjust energy level',
    category: 'energy',
    icon: '🧠',
    rarity: 'rare',
    reward: 20
  },

  // ===== BUDGET & FINANCE (10 achievements) =====
  {
    id: 'budget_first',
    title: 'Budget Beginner',
    description: 'Set your first budget',
    category: 'budget',
    icon: '💰',
    rarity: 'common',
    reward: 5
  },
  {
    id: 'budget_under_budget',
    title: 'Under Budget',
    description: 'Stay under budget for a week',
    category: 'budget',
    icon: '📉',
    rarity: 'rare',
    reward: 30,
    target: 7
  },
  {
    id: 'budget_perfect_month',
    title: 'Perfect Month',
    description: 'Stay within budget all month',
    category: 'budget',
    icon: '🎯',
    rarity: 'epic',
    reward: 75
  },
  {
    id: 'budget_saver',
    title: 'Super Saver',
    description: 'Save $100 below budget',
    category: 'budget',
    icon: '💵',
    rarity: 'rare',
    reward: 35
  },
  {
    id: 'budget_tracker',
    title: 'Expense Tracker',
    description: 'Log 50 expenses',
    category: 'budget',
    icon: '📝',
    rarity: 'common',
    reward: 15,
    target: 50
  },
  {
    id: 'budget_categories',
    title: 'Category Master',
    description: 'Track expenses in 10 categories',
    category: 'budget',
    icon: '🏷️',
    rarity: 'rare',
    reward: 25,
    target: 10
  },
  {
    id: 'budget_fit_100',
    title: 'Budget Fit Champion',
    description: 'Achieve 100% budget fit score',
    category: 'budget',
    icon: '💯',
    rarity: 'epic',
    reward: 50
  },
  {
    id: 'budget_emergency_fund',
    title: 'Emergency Ready',
    description: 'Build emergency fund goal',
    category: 'budget',
    icon: '🛡️',
    rarity: 'rare',
    reward: 40
  },
  {
    id: 'budget_no_impulse',
    title: 'Impulse Control',
    description: 'Decline 5 AI suggestions to skip expenses',
    category: 'budget',
    icon: '🎮',
    rarity: 'rare',
    reward: 30,
    target: 5
  },
  {
    id: 'budget_year',
    title: 'Financial Year',
    description: 'Track budget for 365 days',
    category: 'budget',
    icon: '📅',
    rarity: 'legendary',
    reward: 150,
    target: 365
  },

  // ===== STREAKS & CONSISTENCY (10 achievements) =====
  {
    id: 'streak_3',
    title: '3-Day Warrior',
    description: 'Maintain a 3-day streak',
    category: 'streaks',
    icon: '🔥',
    rarity: 'common',
    reward: 10,
    target: 3
  },
  {
    id: 'streak_7',
    title: 'Week Champion',
    description: 'Maintain a 7-day streak',
    category: 'streaks',
    icon: '📅',
    rarity: 'rare',
    reward: 25,
    target: 7
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    category: 'streaks',
    icon: '🏆',
    rarity: 'epic',
    reward: 100,
    target: 30
  },
  {
    id: 'streak_90',
    title: '90-Day Legend',
    description: 'Maintain a 90-day streak',
    category: 'streaks',
    icon: '👑',
    rarity: 'legendary',
    reward: 300,
    target: 90
  },
  {
    id: 'streak_365',
    title: 'Year-Long Dedication',
    description: 'Maintain a 365-day streak',
    category: 'streaks',
    icon: '🚀',
    rarity: 'legendary',
    reward: 1000,
    target: 365,
    secret: true
  },
  {
    id: 'streak_comeback',
    title: 'Comeback King',
    description: 'Rebuild a streak after losing a 30+ day streak',
    category: 'streaks',
    icon: '💪',
    rarity: 'epic',
    reward: 50
  },
  {
    id: 'streak_weekend',
    title: 'Weekend Warrior',
    description: 'Maintain streaks on weekends for a month',
    category: 'streaks',
    icon: '🎉',
    rarity: 'rare',
    reward: 35
  },
  {
    id: 'streak_multiplier_2x',
    title: '2x Multiplier',
    description: 'Achieve 2.0x streak multiplier',
    category: 'streaks',
    icon: '✖️',
    rarity: 'epic',
    reward: 60
  },
  {
    id: 'streak_multiplier_3x',
    title: '3x Multiplier',
    description: 'Achieve 3.0x streak multiplier',
    category: 'streaks',
    icon: '⚡',
    rarity: 'legendary',
    reward: 150,
    secret: true
  },
  {
    id: 'streak_never_miss',
    title: 'Never Miss',
    description: 'Log in every day for 180 days',
    category: 'streaks',
    icon: '💎',
    rarity: 'legendary',
    reward: 500,
    target: 180
  },

  // ===== GOALS & MILESTONES (10 achievements) =====
  {
    id: 'goal_first',
    title: 'Dream Starter',
    description: 'Create your first savings goal',
    category: 'goals',
    icon: '🎯',
    rarity: 'common',
    reward: 10
  },
  {
    id: 'goal_complete_first',
    title: 'Goal Achiever',
    description: 'Complete your first goal',
    category: 'goals',
    icon: '🏁',
    rarity: 'rare',
    reward: 50
  },
  {
    id: 'goal_complete_5',
    title: 'Serial Achiever',
    description: 'Complete 5 goals',
    category: 'goals',
    icon: '🎖️',
    rarity: 'epic',
    reward: 150,
    target: 5
  },
  {
    id: 'goal_big_dreamer',
    title: 'Big Dreamer',
    description: 'Create a goal over $10,000',
    category: 'goals',
    icon: '💰',
    rarity: 'rare',
    reward: 30
  },
  {
    id: 'goal_quick_win',
    title: 'Quick Win',
    description: 'Complete a goal in under 30 days',
    category: 'goals',
    icon: '⚡',
    rarity: 'rare',
    reward: 40
  },
  {
    id: 'goal_halfway',
    title: 'Halfway Hero',
    description: 'Reach 50% on any goal',
    category: 'goals',
    icon: '🎭',
    rarity: 'common',
    reward: 15
  },
  {
    id: 'goal_75_percent',
    title: 'Almost There',
    description: 'Reach 75% on any goal',
    category: 'goals',
    icon: '🔥',
    rarity: 'rare',
    reward: 25
  },
  {
    id: 'goal_multi_goals',
    title: 'Multi-Tasker',
    description: 'Have 5 active goals simultaneously',
    category: 'goals',
    icon: '🎪',
    rarity: 'epic',
    reward: 60,
    target: 5
  },
  {
    id: 'goal_all_categories',
    title: 'Life Balance',
    description: 'Complete a goal in each category',
    category: 'goals',
    icon: '⚖️',
    rarity: 'epic',
    reward: 100
  },
  {
    id: 'goal_10k_saved',
    title: '$10K Milestone',
    description: 'Save $10,000 across all goals',
    category: 'goals',
    icon: '💎',
    rarity: 'legendary',
    reward: 200
  },

  // ===== PLATFORM MASTERY (10 achievements) =====
  {
    id: 'mastery_signup',
    title: 'Welcome Aboard',
    description: 'Create your account',
    category: 'mastery',
    icon: '👋',
    rarity: 'common',
    reward: 5
  },
  {
    id: 'mastery_profile',
    title: 'Identity Complete',
    description: 'Complete your profile',
    category: 'mastery',
    icon: '👤',
    rarity: 'common',
    reward: 10
  },
  {
    id: 'mastery_all_features',
    title: 'Feature Explorer',
    description: 'Use all major features at least once',
    category: 'mastery',
    icon: '🗺️',
    rarity: 'epic',
    reward: 75
  },
  {
    id: 'mastery_dark_mode',
    title: 'Dark Side',
    description: 'Enable dark mode',
    category: 'mastery',
    icon: '🌙',
    rarity: 'common',
    reward: 5
  },
  {
    id: 'mastery_mobile',
    title: 'Mobile Master',
    description: 'Use SyncScript on mobile',
    category: 'mastery',
    icon: '📱',
    rarity: 'common',
    reward: 10
  },
  {
    id: 'mastery_emblem_1000',
    title: 'Emblem Collector',
    description: 'Earn 1,000 emblems',
    category: 'mastery',
    icon: '💰',
    rarity: 'epic',
    reward: 100,
    target: 1000
  },
  {
    id: 'mastery_emblem_5000',
    title: 'Emblem Tycoon',
    description: 'Earn 5,000 emblems',
    category: 'mastery',
    icon: '👑',
    rarity: 'legendary',
    reward: 500,
    target: 5000
  },
  {
    id: 'mastery_ai_expert',
    title: 'AI Whisperer',
    description: 'Accept 20 AI suggestions',
    category: 'mastery',
    icon: '🤖',
    rarity: 'rare',
    reward: 30,
    target: 20
  },
  {
    id: 'mastery_customize',
    title: 'Personal Touch',
    description: 'Customize 3+ settings',
    category: 'mastery',
    icon: '🎨',
    rarity: 'common',
    reward: 15
  },
  {
    id: 'mastery_power_user',
    title: 'Power User',
    description: 'Use SyncScript for 6 months',
    category: 'mastery',
    icon: '⚡',
    rarity: 'legendary',
    reward: 250
  },

  // ===== SPECIAL EVENTS & SECRETS (3 achievements) =====
  {
    id: 'secret_midnight',
    title: 'Midnight Warrior',
    description: 'Use SyncScript at exactly midnight',
    category: 'events',
    icon: '🌌',
    rarity: 'epic',
    reward: 50,
    secret: true
  },
  {
    id: 'secret_100_perfect',
    title: 'Perfectionist',
    description: 'Complete 100 tasks with 100% on-time rate',
    category: 'events',
    icon: '💯',
    rarity: 'legendary',
    reward: 300,
    target: 100,
    secret: true
  },
  {
    id: 'secret_founder',
    title: 'Founding Member',
    description: 'Join during launch week',
    category: 'events',
    icon: '🚀',
    rarity: 'legendary',
    reward: 500,
    secret: true
  }
]

/**
 * Initialize achievements for user
 */
export function initializeAchievements(): Achievement[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('achievements')
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Initialize with default values
    const initialized: Achievement[] = ACHIEVEMENTS.map(ach => ({
      ...ach,
      unlocked: false,
      progress: ach.target ? 0 : undefined
    }))
    
    localStorage.setItem('achievements', JSON.stringify(initialized))
    return initialized
  } catch (error) {
    console.error('Error initializing achievements:', error)
    return []
  }
}

/**
 * Get all achievements
 */
export function getAchievements(): Achievement[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('achievements')
    if (!stored) return initializeAchievements()
    
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error getting achievements:', error)
    return []
  }
}

/**
 * Unlock an achievement
 */
export function unlockAchievement(achievementId: string): Achievement | null {
  const achievements = getAchievements()
  const achievement = achievements.find(a => a.id === achievementId)
  
  if (!achievement || achievement.unlocked) return null
  
  achievement.unlocked = true
  achievement.unlockedAt = new Date().toISOString()
  
  localStorage.setItem('achievements', JSON.stringify(achievements))
  
  console.log(`🏆 Achievement Unlocked: ${achievement.title} (+${achievement.reward} emblems)`)
  
  return achievement
}

/**
 * Update achievement progress
 */
export function updateAchievementProgress(
  achievementId: string,
  progress: number
): { achievement: Achievement | null; unlocked: boolean } {
  const achievements = getAchievements()
  const achievement = achievements.find(a => a.id === achievementId)
  
  if (!achievement || achievement.unlocked || achievement.target === undefined) {
    return { achievement: null, unlocked: false }
  }
  
  achievement.progress = Math.min(progress, achievement.target)
  
  // Check if target reached
  if (achievement.progress >= achievement.target) {
    achievement.unlocked = true
    achievement.unlockedAt = new Date().toISOString()
    
    localStorage.setItem('achievements', JSON.stringify(achievements))
    
    console.log(`🏆 Achievement Unlocked: ${achievement.title} (+${achievement.reward} emblems)`)
    
    return { achievement, unlocked: true }
  }
  
  localStorage.setItem('achievements', JSON.stringify(achievements))
  
  return { achievement, unlocked: false }
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return getAchievements().filter(a => a.category === category)
}

/**
 * Get achievement stats
 */
export function getAchievementStats(): {
  total: number
  unlocked: number
  percentage: number
  totalRewards: number
  earnedRewards: number
  byRarity: Record<string, { total: number; unlocked: number }>
  byCategory: Record<string, { total: number; unlocked: number }>
} {
  const achievements = getAchievements()
  const unlocked = achievements.filter(a => a.unlocked)
  
  const byRarity = {
    common: { total: 0, unlocked: 0 },
    rare: { total: 0, unlocked: 0 },
    epic: { total: 0, unlocked: 0 },
    legendary: { total: 0, unlocked: 0 }
  }
  
  const byCategory: Record<string, { total: number; unlocked: number }> = {}
  
  achievements.forEach(ach => {
    byRarity[ach.rarity].total++
    if (ach.unlocked) byRarity[ach.rarity].unlocked++
    
    if (!byCategory[ach.category]) {
      byCategory[ach.category] = { total: 0, unlocked: 0 }
    }
    byCategory[ach.category].total++
    if (ach.unlocked) byCategory[ach.category].unlocked++
  })
  
  return {
    total: achievements.length,
    unlocked: unlocked.length,
    percentage: (unlocked.length / achievements.length) * 100,
    totalRewards: achievements.reduce((sum, a) => sum + a.reward, 0),
    earnedRewards: unlocked.reduce((sum, a) => sum + a.reward, 0),
    byRarity,
    byCategory
  }
}

/**
 * Get recently unlocked achievements
 */
export function getRecentAchievements(limit: number = 5): Achievement[] {
  return getAchievements()
    .filter(a => a.unlocked && a.unlockedAt)
    .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
    .slice(0, limit)
}

/**
 * Get unlocked achievements only
 */
export function getUnlockedAchievements(): Achievement[] {
  return getAchievements().filter(a => a.unlocked && !a.secret)
}

/**
 * Get visible locked achievements (excluding secrets)
 */
export function getLockedAchievements(): Achievement[] {
  return getAchievements().filter(a => !a.unlocked && !a.secret)
}
