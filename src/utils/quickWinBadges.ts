/**
 * Quick Win Badges - Instant gratification micro-achievements
 * These are lightweight badges that appear as toast notifications
 */

export interface QuickWin {
  id: string;
  title: string;
  emoji: string;
  message: string;
  points: number;
}

export const QUICK_WINS: Record<string, QuickWin> = {
  THREE_IN_ROW: {
    id: 'three_in_row',
    title: 'On Fire!',
    emoji: '🔥',
    message: '3 tasks completed in a row!',
    points: 15
  },
  EARLY_BIRD: {
    id: 'early_bird',
    title: 'Early Bird',
    emoji: '🌅',
    message: 'First task completed before 9 AM!',
    points: 10
  },
  NIGHT_OWL: {
    id: 'night_owl',
    title: 'Night Owl',
    emoji: '🦉',
    message: 'Task completed after 10 PM!',
    points: 10
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    title: 'Speed Demon',
    emoji: '⚡',
    message: 'Task completed in under 5 minutes!',
    points: 20
  },
  POWER_HOUR: {
    id: 'power_hour',
    title: 'Power Hour',
    emoji: '💪',
    message: '5 tasks completed in one hour!',
    points: 25
  },
  PERFECTIONIST: {
    id: 'perfectionist',
    title: 'Perfectionist',
    emoji: '🎯',
    message: 'All tasks in project completed!',
    points: 30
  },
  QUICK_START: {
    id: 'quick_start',
    title: 'Quick Start',
    emoji: '🚀',
    message: 'Task created and completed immediately!',
    points: 15
  },
  ENERGY_SURGE: {
    id: 'energy_surge',
    title: 'Energy Surge',
    emoji: '⚡',
    message: 'Maintained 80+ energy for 3 hours!',
    points: 20
  },
  FIRST_OF_DAY: {
    id: 'first_of_day',
    title: 'Day Starter',
    emoji: '☀️',
    message: 'First task of the day completed!',
    points: 5
  }
};

/**
 * Track recent task completions for combo detection
 */
let recentCompletions: Date[] = [];
let lastCompletionTime: Date | null = null;

/**
 * Check for quick wins when a task is completed
 */
export function checkQuickWins(
  completedTask: {
    completed_at?: string;
    created_at?: string;
    project_id?: string;
  },
  allTasks: Array<{
    id: string;
    completed: boolean;
    completed_at?: string;
    project_id?: string;
  }>,
  energyLogs: Array<{
    level: number;
    timestamp: string;
  }>
): QuickWin[] {
  const wins: QuickWin[] = [];
  const now = new Date();
  const completionTime = completedTask.completed_at ? new Date(completedTask.completed_at) : now;
  const creationTime = completedTask.created_at ? new Date(completedTask.created_at) : null;
  const hour = completionTime.getHours();

  // Clean up old completions (older than 2 hours)
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  recentCompletions = recentCompletions.filter(time => time > twoHoursAgo);
  
  // Add this completion
  recentCompletions.push(completionTime);

  // 1. FIRST OF DAY
  const todayCompletions = allTasks.filter(t => {
    if (!t.completed || !t.completed_at) return false;
    return new Date(t.completed_at).toDateString() === now.toDateString();
  });
  
  if (todayCompletions.length === 1) {
    wins.push(QUICK_WINS.FIRST_OF_DAY);
  }

  // 2. EARLY BIRD (before 9 AM)
  if (hour < 9 && todayCompletions.length === 1) {
    wins.push(QUICK_WINS.EARLY_BIRD);
  }

  // 3. NIGHT OWL (after 10 PM)
  if (hour >= 22) {
    wins.push(QUICK_WINS.NIGHT_OWL);
  }

  // 4. QUICK START (created and completed within 5 minutes)
  if (creationTime) {
    const timeDiff = (completionTime.getTime() - creationTime.getTime()) / 1000 / 60;
    if (timeDiff <= 5) {
      wins.push(QUICK_WINS.QUICK_START);
    }
  }

  // 5. SPEED DEMON (last completion was within 5 minutes)
  if (lastCompletionTime) {
    const timeSinceLast = (completionTime.getTime() - lastCompletionTime.getTime()) / 1000 / 60;
    if (timeSinceLast <= 5) {
      wins.push(QUICK_WINS.SPEED_DEMON);
    }
  }

  // 6. THREE IN A ROW (3 completions within 30 minutes)
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
  const recentCount = recentCompletions.filter(time => time > thirtyMinutesAgo).length;
  
  if (recentCount >= 3) {
    wins.push(QUICK_WINS.THREE_IN_ROW);
  }

  // 7. POWER HOUR (5 completions within 60 minutes)
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const hourCount = recentCompletions.filter(time => time > oneHourAgo).length;
  
  if (hourCount >= 5) {
    wins.push(QUICK_WINS.POWER_HOUR);
  }

  // 8. PERFECTIONIST (all tasks in project completed)
  if (completedTask.project_id) {
    const projectTasks = allTasks.filter(t => t.project_id === completedTask.project_id);
    const allCompleted = projectTasks.every(t => t.completed);
    
    if (allCompleted && projectTasks.length > 0) {
      wins.push(QUICK_WINS.PERFECTIONIST);
    }
  }

  // 9. ENERGY SURGE (maintained 80+ energy for 3 hours)
  const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  const recentEnergyLogs = energyLogs.filter(log => {
    return new Date(log.timestamp) > threeHoursAgo;
  });
  
  const allHighEnergy = recentEnergyLogs.length >= 3 && 
    recentEnergyLogs.every(log => log.level >= 80);
  
  if (allHighEnergy) {
    wins.push(QUICK_WINS.ENERGY_SURGE);
  }

  // Update last completion time
  lastCompletionTime = completionTime;

  // Remove duplicates (in case multiple conditions trigger same badge)
  const uniqueWins = wins.filter((win, index, self) => 
    index === self.findIndex(w => w.id === win.id)
  );

  return uniqueWins;
}

/**
 * Reset daily quick win tracking
 */
export function resetDailyQuickWins(): void {
  recentCompletions = [];
  lastCompletionTime = null;
}

/**
 * Get total quick win points earned today
 */
export function getTodayQuickWinPoints(): number {
  const stored = localStorage.getItem('todayQuickWinPoints');
  const date = localStorage.getItem('quickWinDate');
  const today = new Date().toDateString();
  
  if (date === today && stored) {
    return parseInt(stored, 10) || 0;
  }
  return 0;
}

/**
 * Save quick win points
 */
export function saveQuickWinPoints(points: number): void {
  const today = new Date().toDateString();
  const current = getTodayQuickWinPoints();
  
  localStorage.setItem('todayQuickWinPoints', String(current + points));
  localStorage.setItem('quickWinDate', today);
}

