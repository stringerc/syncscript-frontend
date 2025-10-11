/**
 * Streak System with Multipliers & Rewards
 * Feature #28: Gamification of consistent usage
 */

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
  totalDays: number
  multiplier: number
  nextMilestone: number
  bonusEmblemsEarned: number
}

export interface StreakReward {
  day: number
  emblems: number
  multiplier: number
  title: string
  message: string
  icon: string
}

/**
 * Streak Milestones & Rewards
 */
const STREAK_MILESTONES: StreakReward[] = [
  { day: 3, emblems: 5, multiplier: 1.1, title: '3-Day Streak!', message: 'Building momentum! 🔥', icon: '🔥' },
  { day: 7, emblems: 15, multiplier: 1.2, title: 'Week Warrior!', message: 'One week strong! 💪', icon: '💪' },
  { day: 14, emblems: 30, multiplier: 1.3, title: 'Two Weeks!', message: 'Consistency champion! ⚡', icon: '⚡' },
  { day: 30, emblems: 75, multiplier: 1.5, title: 'Month Master!', message: 'Incredible dedication! 🏆', icon: '🏆' },
  { day: 60, emblems: 150, multiplier: 1.75, title: '60-Day Legend!', message: 'You\'re unstoppable! 🌟', icon: '🌟' },
  { day: 90, emblems: 250, multiplier: 2.0, title: '90-Day Hero!', message: 'Habits = Superpowers! 💎', icon: '💎' },
  { day: 180, emblems: 500, multiplier: 2.5, title: 'Half-Year King!', message: 'Elite level reached! 👑', icon: '👑' },
  { day: 365, emblems: 1000, multiplier: 3.0, title: 'Year Champion!', message: 'LEGENDARY STATUS! 🚀', icon: '🚀' }
]

/**
 * Get current streak data
 */
export function getStreakData(): StreakData {
  if (typeof window === 'undefined') {
    return getDefaultStreakData()
  }

  try {
    const stored = localStorage.getItem('streak_data')
    if (!stored) return getDefaultStreakData()
    
    const data: StreakData = JSON.parse(stored)
    
    // Check if streak is still active
    const today = new Date().toDateString()
    const lastActive = new Date(data.lastActiveDate).toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    
    // If last active was today, return as is
    if (lastActive === today) {
      return data
    }
    
    // If last active was yesterday, increment streak
    if (lastActive === yesterday) {
      return data
    }
    
    // Streak broken - reset
    return {
      ...data,
      currentStreak: 0,
      multiplier: 1.0,
      nextMilestone: 3
    }
  } catch (error) {
    console.error('Error loading streak data:', error)
    return getDefaultStreakData()
  }
}

/**
 * Update streak (call once per day)
 */
export function updateStreak(): {
  data: StreakData
  reward?: StreakReward
  streakBroken?: boolean
} {
  const current = getStreakData()
  const today = new Date().toDateString()
  const lastActive = new Date(current.lastActiveDate).toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()
  
  // Already updated today
  if (lastActive === today) {
    return { data: current }
  }
  
  let newStreak: number
  let streakBroken = false
  
  // Continue streak from yesterday
  if (lastActive === yesterday) {
    newStreak = current.currentStreak + 1
  } 
  // Streak broken
  else {
    newStreak = 1
    streakBroken = true
  }
  
  // Calculate multiplier based on streak
  const multiplier = calculateMultiplier(newStreak)
  
  // Find next milestone
  const nextMilestone = STREAK_MILESTONES.find(m => m.day > newStreak)?.day || 999
  
  // Check if milestone reached
  const reward = STREAK_MILESTONES.find(m => m.day === newStreak)
  
  const newData: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, current.longestStreak),
    lastActiveDate: new Date().toISOString(),
    totalDays: current.totalDays + 1,
    multiplier,
    nextMilestone,
    bonusEmblemsEarned: current.bonusEmblemsEarned + (reward?.emblems || 0)
  }
  
  saveStreakData(newData)
  
  console.log(`🔥 Streak Updated: Day ${newStreak} | ${multiplier}x multiplier`)
  if (reward) {
    console.log(`🎁 Milestone Reward: ${reward.title} - ${reward.emblems} emblems!`)
  }
  
  return { data: newData, reward, streakBroken }
}

/**
 * Calculate multiplier based on streak length
 */
function calculateMultiplier(streak: number): number {
  if (streak >= 365) return 3.0
  if (streak >= 180) return 2.5
  if (streak >= 90) return 2.0
  if (streak >= 60) return 1.75
  if (streak >= 30) return 1.5
  if (streak >= 14) return 1.3
  if (streak >= 7) return 1.2
  if (streak >= 3) return 1.1
  return 1.0
}

/**
 * Apply streak multiplier to emblems earned
 */
export function applyStreakMultiplier(baseEmblems: number, streak?: number): {
  base: number
  bonus: number
  total: number
  multiplier: number
} {
  const data = streak !== undefined 
    ? { ...getStreakData(), currentStreak: streak }
    : getStreakData()
  
  const multiplier = data.multiplier
  const total = Math.floor(baseEmblems * multiplier)
  const bonus = total - baseEmblems
  
  return {
    base: baseEmblems,
    bonus,
    total,
    multiplier
  }
}

/**
 * Get motivational message based on streak
 */
export function getStreakMessage(streak: number): string {
  if (streak === 0) return 'Start your journey today! 🌟'
  if (streak === 1) return 'Great start! Come back tomorrow! 💫'
  if (streak === 2) return 'Two days strong! Keep it going! 🔥'
  if (streak < 7) return `${streak} days in a row! Building momentum! 💪`
  if (streak < 30) return `${streak}-day streak! You\'re crushing it! ⚡`
  if (streak < 90) return `${streak} days of excellence! Unstoppable! 🏆`
  if (streak < 180) return `${streak} consecutive days! Elite status! 👑`
  if (streak < 365) return `${streak} days straight! LEGENDARY! 💎`
  return `${streak} DAYS! You are a LEGEND! 🚀`
}

/**
 * Get progress to next milestone
 */
export function getNextMilestoneProgress(): {
  current: number
  next: number
  remaining: number
  percentage: number
  reward: StreakReward | null
} {
  const data = getStreakData()
  const nextReward = STREAK_MILESTONES.find(m => m.day > data.currentStreak)
  
  if (!nextReward) {
    return {
      current: data.currentStreak,
      next: 999,
      remaining: 0,
      percentage: 100,
      reward: null
    }
  }
  
  const previousMilestone = STREAK_MILESTONES
    .filter(m => m.day <= data.currentStreak)
    .pop()?.day || 0
  
  const totalGap = nextReward.day - previousMilestone
  const currentProgress = data.currentStreak - previousMilestone
  const percentage = (currentProgress / totalGap) * 100
  
  return {
    current: data.currentStreak,
    next: nextReward.day,
    remaining: nextReward.day - data.currentStreak,
    percentage: Math.min(100, Math.max(0, percentage)),
    reward: nextReward
  }
}

/**
 * Get all milestone achievements
 */
export function getMilestoneAchievements(): Array<StreakReward & { achieved: boolean }> {
  const data = getStreakData()
  
  return STREAK_MILESTONES.map(milestone => ({
    ...milestone,
    achieved: data.currentStreak >= milestone.day || data.longestStreak >= milestone.day
  }))
}

/**
 * Save streak data
 */
function saveStreakData(data: StreakData): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('streak_data', JSON.stringify(data))
  } catch (error) {
    console.error('Error saving streak data:', error)
  }
}

/**
 * Default streak data
 */
function getDefaultStreakData(): StreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: new Date().toISOString(),
    totalDays: 0,
    multiplier: 1.0,
    nextMilestone: 3,
    bonusEmblemsEarned: 0
  }
}

/**
 * Reset streak (for testing)
 */
export function resetStreak(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('streak_data')
  console.log('🔄 Streak data reset')
}

// Export for testing
export const __test__ = {
  STREAK_MILESTONES,
  calculateMultiplier
}

