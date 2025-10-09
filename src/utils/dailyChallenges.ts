/**
 * Daily Challenge System
 * Fresh challenges every day with bonus rewards
 */

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  goal: number;
  type: 'tasks' | 'energy' | 'focus' | 'streak';
  reward: {
    points: number;
    bonus?: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ChallengeProgress {
  challengeId: string;
  currentValue: number;
  goal: number;
  percentage: number;
  isCompleted: boolean;
  completedAt?: Date;
}

// Challenge templates
const CHALLENGE_TEMPLATES: DailyChallenge[] = [
  // Easy Challenges
  {
    id: 'complete_3_tasks',
    title: 'Task Starter',
    description: 'Complete 3 tasks today',
    icon: '✅',
    goal: 3,
    type: 'tasks',
    reward: { points: 50, bonus: '2x Energy' },
    difficulty: 'easy'
  },
  {
    id: 'log_energy_3_times',
    title: 'Energy Logger',
    description: 'Log your energy 3 times today',
    icon: '⚡',
    goal: 3,
    type: 'energy',
    reward: { points: 40 },
    difficulty: 'easy'
  },
  {
    id: 'maintain_streak',
    title: 'Streak Keeper',
    description: 'Keep your login streak alive',
    icon: '🔥',
    goal: 1,
    type: 'streak',
    reward: { points: 30, bonus: 'Streak Shield' },
    difficulty: 'easy'
  },
  {
    id: 'one_focus_session',
    title: 'Focus Time',
    description: 'Complete 1 Pomodoro session',
    icon: '🎯',
    goal: 1,
    type: 'focus',
    reward: { points: 35 },
    difficulty: 'easy'
  },

  // Medium Challenges
  {
    id: 'complete_5_tasks',
    title: 'Productive Day',
    description: 'Complete 5 tasks today',
    icon: '⚡',
    goal: 5,
    type: 'tasks',
    reward: { points: 100, bonus: 'Task Master Badge' },
    difficulty: 'medium'
  },
  {
    id: 'log_energy_5_times',
    title: 'Energy Master',
    description: 'Log your energy 5 times',
    icon: '⚡',
    goal: 5,
    type: 'energy',
    reward: { points: 75 },
    difficulty: 'medium'
  },
  {
    id: 'three_focus_sessions',
    title: 'Deep Work Day',
    description: 'Complete 3 Pomodoro sessions',
    icon: '🧠',
    goal: 3,
    type: 'focus',
    reward: { points: 120, bonus: 'Focus Champion' },
    difficulty: 'medium'
  },

  // Hard Challenges
  {
    id: 'complete_10_tasks',
    title: 'Productivity Beast',
    description: 'Complete 10 tasks in one day',
    icon: '🦁',
    goal: 10,
    type: 'tasks',
    reward: { points: 250, bonus: 'Beast Mode Badge' },
    difficulty: 'hard'
  },
  {
    id: 'five_focus_sessions',
    title: 'Ultra Focus',
    description: 'Complete 5 Pomodoro sessions',
    icon: '🔥',
    goal: 5,
    type: 'focus',
    reward: { points: 200, bonus: 'Focus Deity' },
    difficulty: 'hard'
  }
];

/**
 * Get today's challenges (3 per day: easy, medium, hard)
 * Deterministic based on date so everyone gets the same challenges
 */
export function getTodaysChallenges(): DailyChallenge[] {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  
  const easyChallenges = CHALLENGE_TEMPLATES.filter(c => c.difficulty === 'easy');
  const mediumChallenges = CHALLENGE_TEMPLATES.filter(c => c.difficulty === 'medium');
  const hardChallenges = CHALLENGE_TEMPLATES.filter(c => c.difficulty === 'hard');

  // Rotate challenges based on day of year
  const easyIndex = dayOfYear % easyChallenges.length;
  const mediumIndex = dayOfYear % mediumChallenges.length;
  const hardIndex = dayOfYear % hardChallenges.length;

  return [
    easyChallenges[easyIndex],
    mediumChallenges[mediumIndex],
    hardChallenges[hardIndex]
  ];
}

/**
 * Check if challenges have been reset today
 */
export function shouldResetChallenges(): boolean {
  const lastReset = localStorage.getItem('lastChallengeReset');
  const today = new Date().toDateString();
  
  return lastReset !== today;
}

/**
 * Reset challenges for the new day
 */
export function resetDailyChallenges(): void {
  const today = new Date().toDateString();
  localStorage.setItem('lastChallengeReset', today);
  localStorage.removeItem('challengeProgress');
}

/**
 * Calculate current progress for a challenge
 */
export function calculateChallengeProgress(
  challenge: DailyChallenge,
  tasks: Array<{ completed: boolean; completed_at?: string }>,
  energyLogs: Array<{ level: number; timestamp: string }>,
  focusSessions: number,
  currentStreak: number
): ChallengeProgress {
  let currentValue = 0;

  switch (challenge.type) {
    case 'tasks': {
      // Count tasks completed today
      const today = new Date().toDateString();
      currentValue = tasks.filter(t => {
        if (!t.completed || !t.completed_at) return false;
        return new Date(t.completed_at).toDateString() === today;
      }).length;
      break;
    }

    case 'energy': {
      // Count energy logs today
      const today = new Date().toDateString();
      currentValue = energyLogs.filter(log => {
        return new Date(log.timestamp).toDateString() === today;
      }).length;
      break;
    }

    case 'focus': {
      // Use focus sessions count (from localStorage for today)
      const stored = localStorage.getItem('todayFocusSessions');
      const lastDate = localStorage.getItem('focusSessionsDate');
      const today = new Date().toDateString();
      
      if (lastDate === today && stored) {
        currentValue = parseInt(stored, 10) || 0;
      } else {
        currentValue = 0;
      }
      break;
    }

    case 'streak': {
      // Check if logged in today
      currentValue = currentStreak > 0 ? 1 : 0;
      break;
    }
  }

  const percentage = Math.min((currentValue / challenge.goal) * 100, 100);
  
  // Check if completed
  const stored = localStorage.getItem('challengeProgress');
  let isCompleted = false;
  let completedAt: Date | undefined;

  if (stored) {
    try {
      const progress = JSON.parse(stored);
      const challengeData = progress[challenge.id];
      if (challengeData?.isCompleted) {
        isCompleted = true;
        completedAt = new Date(challengeData.completedAt);
      }
    } catch (error) {
      // Ignore parse errors
    }
  }

  // Auto-mark as completed if goal reached
  if (percentage >= 100 && !isCompleted) {
    isCompleted = true;
    completedAt = new Date();
    
    // Save to localStorage
    const progress = stored ? JSON.parse(stored) : {};
    progress[challenge.id] = { isCompleted: true, completedAt: completedAt.toISOString() };
    localStorage.setItem('challengeProgress', JSON.stringify(progress));
  }

  return {
    challengeId: challenge.id,
    currentValue,
    goal: challenge.goal,
    percentage,
    isCompleted,
    completedAt
  };
}

/**
 * Get total challenge points earned today
 */
export function getTodayChallengePoints(): number {
  const stored = localStorage.getItem('challengeProgress');
  if (!stored) return 0;

  try {
    const progress = JSON.parse(stored);
    const todaysChallenges = getTodaysChallenges();
    
    return todaysChallenges.reduce((total, challenge) => {
      const data = progress[challenge.id];
      return total + (data?.isCompleted ? challenge.reward.points : 0);
    }, 0);
  } catch (error) {
    return 0;
  }
}

