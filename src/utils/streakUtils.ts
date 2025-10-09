export interface StreakData {
  loginStreak: number;
  lastLoginDate: string;
  completionStreak: number;
  lastCompletionDate: string;
  longestLoginStreak: number;
  longestCompletionStreak: number;
  milestones: string[];
}

const STORAGE_KEY = 'syncscript_streaks';

/**
 * Get current streak data from localStorage
 */
export const getStreakData = (): StreakData => {
  if (typeof window === 'undefined') {
    return getDefaultStreakData();
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return getDefaultStreakData();
  }

  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultStreakData();
  }
};

/**
 * Get default streak data
 */
const getDefaultStreakData = (): StreakData => ({
  loginStreak: 0,
  lastLoginDate: '',
  completionStreak: 0,
  lastCompletionDate: '',
  longestLoginStreak: 0,
  longestCompletionStreak: 0,
  milestones: []
});

/**
 * Save streak data to localStorage
 */
const saveStreakData = (data: StreakData): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Get today's date in YYYY-MM-DD format
 */
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Check if dates are consecutive days
 */
const areConsecutiveDays = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

/**
 * Update login streak
 */
export const updateLoginStreak = (): StreakData => {
  const today = getTodayDate();
  const data = getStreakData();

  // Already logged in today
  if (data.lastLoginDate === today) {
    return data;
  }

  // First ever login or restart
  if (!data.lastLoginDate) {
    data.loginStreak = 1;
    data.lastLoginDate = today;
    data.longestLoginStreak = Math.max(1, data.longestLoginStreak);
    saveStreakData(data);
    return data;
  }

  // Consecutive day
  if (areConsecutiveDays(data.lastLoginDate, today)) {
    data.loginStreak += 1;
    data.lastLoginDate = today;
    data.longestLoginStreak = Math.max(data.loginStreak, data.longestLoginStreak);
    
    // Check for milestones
    checkMilestone(data, 'login', data.loginStreak);
    
    saveStreakData(data);
    return data;
  }

  // Streak broken - reset
  data.loginStreak = 1;
  data.lastLoginDate = today;
  saveStreakData(data);
  return data;
};

/**
 * Update completion streak (call when task is completed)
 */
export const updateCompletionStreak = (): StreakData => {
  const today = getTodayDate();
  const data = getStreakData();

  // Already completed a task today
  if (data.lastCompletionDate === today) {
    return data;
  }

  // First ever completion or restart
  if (!data.lastCompletionDate) {
    data.completionStreak = 1;
    data.lastCompletionDate = today;
    data.longestCompletionStreak = Math.max(1, data.longestCompletionStreak);
    saveStreakData(data);
    return data;
  }

  // Consecutive day
  if (areConsecutiveDays(data.lastCompletionDate, today)) {
    data.completionStreak += 1;
    data.lastCompletionDate = today;
    data.longestCompletionStreak = Math.max(data.completionStreak, data.longestCompletionStreak);
    
    // Check for milestones
    checkMilestone(data, 'completion', data.completionStreak);
    
    saveStreakData(data);
    return data;
  }

  // Streak broken - reset
  data.completionStreak = 1;
  data.lastCompletionDate = today;
  saveStreakData(data);
  return data;
};

/**
 * Check and record milestones
 */
const checkMilestone = (data: StreakData, type: 'login' | 'completion', streak: number): void => {
  const milestones = [3, 7, 14, 30, 50, 100];
  const milestoneKey = `${type}_${streak}`;
  
  if (milestones.includes(streak) && !data.milestones.includes(milestoneKey)) {
    data.milestones.push(milestoneKey);
  }
};

/**
 * Get streak milestone info
 */
export const getStreakMilestone = (streak: number): { emoji: string; label: string; color: string } | null => {
  if (streak >= 100) return { emoji: '💎', label: 'Diamond', color: '#60A5FA' };
  if (streak >= 30) return { emoji: '🥇', label: 'Gold', color: '#F59E0B' };
  if (streak >= 7) return { emoji: '🥈', label: 'Silver', color: '#9CA3AF' };
  if (streak >= 3) return { emoji: '🥉', label: 'Bronze', color: '#D97706' };
  return null;
};

/**
 * Check if new milestone was just achieved
 */
export const checkNewMilestone = (oldStreak: number, newStreak: number): { emoji: string; label: string; color: string } | null => {
  const milestones = [3, 7, 30, 100];
  const achievedMilestone = milestones.find(m => newStreak === m);
  if (achievedMilestone) {
    return getStreakMilestone(newStreak);
  }
  return null;
};

