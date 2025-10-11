/**
 * Emblem Charge Calculation Utility
 * WP-ENG-02: Emblem Transparency
 * 
 * Calculates and explains emblem charges
 * Goal: Increase engagement from 48% to 60% DAU
 */

interface Task {
  priority: 1 | 2 | 3 | 4 | 5;
  energy_requirement: 1 | 2 | 3 | 4 | 5;
}

export interface EmblemBreakdown {
  base: number;
  energyMatchBonus: number;
  streakBonus: number;
  perfectMatchBonus: number;
  total: number;
  explanation: {
    base: string;
    energyMatch: string;
    streak: string;
    perfectMatch?: string;
  };
}

/**
 * Calculate emblem charge with full breakdown
 * 
 * Formula:
 * - Base: Priority × 5 (Priority 1 = 5⚡, Priority 5 = 25⚡)
 * - Energy Match Bonus: +5⚡ if within ±1 level
 * - Perfect Match Bonus: +10⚡ if exact match
 * - Streak Bonus: +2⚡ per day (max +10⚡ at 5-day streak)
 * 
 * @param task - Completed task
 * @param userEnergy - User's energy when task completed
 * @param streak - Current completion streak (days)
 * @returns Breakdown of charge calculation
 */
export function calculateEmblemCharge(
  task: Task,
  userEnergy: number,
  streak: number = 0
): EmblemBreakdown {
  // 1. Base charge (priority-based)
  const base = task.priority * 5;
  
  // 2. Energy match analysis
  const energyDiff = Math.abs(task.energy_requirement - userEnergy);
  const isPerfectMatch = energyDiff === 0;
  const isGoodMatch = energyDiff <= 1;
  
  let energyMatchBonus = 0;
  let perfectMatchBonus = 0;
  
  if (isPerfectMatch) {
    perfectMatchBonus = 10;
    energyMatchBonus = 5; // Base match bonus
  } else if (isGoodMatch) {
    energyMatchBonus = 5;
  }
  
  // 3. Streak bonus (capped at 5 days)
  const effectiveStreak = Math.min(streak, 5);
  const streakBonus = effectiveStreak * 2;
  
  // 4. Total
  const total = base + energyMatchBonus + perfectMatchBonus + streakBonus;
  
  // 5. Generate explanations
  const explanation = {
    base: `Priority ${task.priority} × 5 = ${base}⚡`,
    energyMatch: isGoodMatch 
      ? `Energy match (task ${task.energy_requirement}, you ${userEnergy.toFixed(1)}) = +${energyMatchBonus}⚡`
      : 'No energy match bonus',
    streak: streak > 0 
      ? `${effectiveStreak}-day streak × 2 = +${streakBonus}⚡`
      : 'No active streak',
    perfectMatch: isPerfectMatch 
      ? `Perfect energy match! = +${perfectMatchBonus}⚡`
      : undefined
  };
  
  return {
    base,
    energyMatchBonus,
    streakBonus,
    perfectMatchBonus,
    total,
    explanation
  };
}

/**
 * Format emblem charge for display
 */
export function formatEmblemCharge(charge: number): string {
  return `+${charge}⚡`;
}

/**
 * Get level from total emblem charge
 * Every 500⚡ = 1 level
 */
export function getEmblemLevel(totalCharge: number): {
  level: number;
  current: number;
  next: number;
  progress: number;
} {
  const level = Math.floor(totalCharge / 500) + 1;
  const current = totalCharge % 500;
  const next = 500;
  const progress = (current / next) * 100;
  
  return {
    level,
    current,
    next,
    progress
  };
}

/**
 * Get emblem level title
 */
export function getEmblemLevelTitle(level: number): string {
  const titles = [
    '',
    'Novice', // Level 1
    'Apprentice', // Level 2
    'Practitioner', // Level 3
    'Expert', // Level 4
    'Master', // Level 5
    'Grandmaster', // Level 6
    'Legend', // Level 7
    'Mythic', // Level 8
    'Transcendent', // Level 9
    'Godlike' // Level 10+
  ];
  
  return titles[Math.min(level, titles.length - 1)] || 'Legendary';
}

// Export for testing
export const __test__ = {
  calculateEmblemCharge,
  formatEmblemCharge,
  getEmblemLevel,
  getEmblemLevelTitle
};

