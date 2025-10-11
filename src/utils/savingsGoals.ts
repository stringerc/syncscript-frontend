/**
 * Savings Goals System
 * WP-FIN-03: Connects budget adherence to life goals
 * 
 * Shows users how staying within budget helps them achieve dreams
 * "Skip this = $50 closer to vacation"
 */

export interface SavingsGoal {
  id: string;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  category: 'vacation' | 'house' | 'car' | 'education' | 'emergency' | 'retirement' | 'custom';
  color: string;
  createdAt: string;
}

export interface SavingsImpact {
  goalId: string;
  goalName: string;
  savingsAmount: number;
  message: string;
  motivationalText: string;
}

/**
 * Predefined goal templates
 */
export const GOAL_TEMPLATES = [
  {
    category: 'vacation' as const,
    icon: '🏖️',
    name: 'Dream Vacation',
    suggestedAmount: 3000,
    color: '#3B82F6',
    description: 'Plan your perfect getaway'
  },
  {
    category: 'house' as const,
    icon: '🏠',
    name: 'Down Payment',
    suggestedAmount: 20000,
    color: '#10B981',
    description: 'Save for your dream home'
  },
  {
    category: 'car' as const,
    icon: '🚗',
    name: 'New Car',
    suggestedAmount: 8000,
    color: '#8B5CF6',
    description: 'Upgrade your ride'
  },
  {
    category: 'education' as const,
    icon: '🎓',
    name: 'Education Fund',
    suggestedAmount: 10000,
    color: '#F59E0B',
    description: 'Invest in learning'
  },
  {
    category: 'emergency' as const,
    icon: '🛡️',
    name: 'Emergency Fund',
    suggestedAmount: 5000,
    color: '#EF4444',
    description: '3-6 months of expenses'
  },
  {
    category: 'retirement' as const,
    icon: '🌅',
    name: 'Retirement',
    suggestedAmount: 50000,
    color: '#EC4899',
    description: 'Plan for the future'
  }
];

/**
 * Save goals to localStorage
 */
export function saveSavingsGoals(goals: SavingsGoal[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('savings_goals', JSON.stringify(goals));
    console.log('💰 Savings Goals saved:', goals.length);
  } catch (error) {
    console.error('Error saving goals:', error);
  }
}

/**
 * Load goals from localStorage
 */
export function loadSavingsGoals(): SavingsGoal[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('savings_goals');
    if (!stored) return [];
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading goals:', error);
    return [];
  }
}

/**
 * Add a new savings goal
 */
export function addSavingsGoal(goal: Omit<SavingsGoal, 'id' | 'currentAmount' | 'createdAt'>): SavingsGoal {
  const newGoal: SavingsGoal = {
    ...goal,
    id: `goal-${Date.now()}`,
    currentAmount: 0,
    createdAt: new Date().toISOString()
  };
  
  const goals = loadSavingsGoals();
  goals.push(newGoal);
  saveSavingsGoals(goals);
  
  return newGoal;
}

/**
 * Update goal progress
 */
export function updateGoalProgress(goalId: string, amountToAdd: number): SavingsGoal | null {
  const goals = loadSavingsGoals();
  const goal = goals.find(g => g.id === goalId);
  
  if (!goal) return null;
  
  goal.currentAmount = Math.min(goal.currentAmount + amountToAdd, goal.targetAmount);
  saveSavingsGoals(goals);
  
  console.log(`💰 Goal Progress Updated: ${goal.name} - $${goal.currentAmount}/$${goal.targetAmount}`);
  
  return goal;
}

/**
 * Calculate savings impact of skipping an expense
 */
export function calculateSavingsImpact(
  expenseAmount: number,
  activeGoalId?: string
): SavingsImpact | null {
  const goals = loadSavingsGoals();
  
  if (goals.length === 0) return null;
  
  // Use specified goal or first goal
  const goal = activeGoalId 
    ? goals.find(g => g.id === activeGoalId)
    : goals[0];
    
  if (!goal) return null;
  
  const percentageProgress = (expenseAmount / goal.targetAmount) * 100;
  const newTotal = goal.currentAmount + expenseAmount;
  const remainingAfterSave = goal.targetAmount - newTotal;
  
  return {
    goalId: goal.id,
    goalName: goal.name,
    savingsAmount: expenseAmount,
    message: `Skip this = $${expenseAmount.toFixed(0)} closer to ${goal.name}`,
    motivationalText: getMotivationalText(goal, expenseAmount, percentageProgress, remainingAfterSave)
  };
}

/**
 * Generate motivational text based on progress
 */
function getMotivationalText(
  goal: SavingsGoal, 
  savingsAmount: number,
  percentageProgress: number,
  remainingAfter: number
): string {
  if (remainingAfter <= 0) {
    return `🎉 This could complete your ${goal.name} goal!`;
  }
  
  if (percentageProgress >= 10) {
    return `💪 Big impact! You'd be ${percentageProgress.toFixed(0)}% closer to your goal!`;
  }
  
  if (percentageProgress >= 5) {
    return `✨ Nice! Every dollar counts towards your ${goal.name}!`;
  }
  
  const daysAtThisRate = Math.ceil(remainingAfter / savingsAmount);
  if (daysAtThisRate <= 30) {
    return `🚀 At this rate, you could reach your goal in ${daysAtThisRate} similar saves!`;
  }
  
  return `💰 Another step towards your ${goal.name}!`;
}

/**
 * Get progress percentage for a goal
 */
export function getGoalProgress(goal: SavingsGoal): {
  percentage: number;
  remaining: number;
  daysRemaining?: number;
} {
  const percentage = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  
  let daysRemaining: number | undefined;
  if (goal.deadline) {
    const now = new Date().getTime();
    const deadline = new Date(goal.deadline).getTime();
    daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
  }
  
  return {
    percentage: Math.min(100, Math.max(0, percentage)),
    remaining: Math.max(0, remaining),
    daysRemaining
  };
}

/**
 * Check if any goals are close to completion
 */
export function checkGoalMilestones(goalId: string): {
  isComplete: boolean;
  milestone?: 'quarter' | 'half' | 'three-quarters' | 'complete';
  message?: string;
} {
  const goals = loadSavingsGoals();
  const goal = goals.find(g => g.id === goalId);
  
  if (!goal) return { isComplete: false };
  
  const progress = getGoalProgress(goal);
  
  if (progress.percentage >= 100) {
    return {
      isComplete: true,
      milestone: 'complete',
      message: `🎉 Congratulations! You've reached your ${goal.name} goal! ${goal.icon}`
    };
  }
  
  if (progress.percentage >= 75 && progress.percentage < 76) {
    return {
      isComplete: false,
      milestone: 'three-quarters',
      message: `🔥 75% there! Your ${goal.name} is within reach!`
    };
  }
  
  if (progress.percentage >= 50 && progress.percentage < 51) {
    return {
      isComplete: false,
      milestone: 'half',
      message: `💪 Halfway to your ${goal.name}! Keep going!`
    };
  }
  
  if (progress.percentage >= 25 && progress.percentage < 26) {
    return {
      isComplete: false,
      milestone: 'quarter',
      message: `✨ 25% complete! You're making progress on your ${goal.name}!`
    };
  }
  
  return { isComplete: false };
}

/**
 * Delete a goal
 */
export function deleteSavingsGoal(goalId: string): void {
  const goals = loadSavingsGoals();
  const filtered = goals.filter(g => g.id !== goalId);
  saveSavingsGoals(filtered);
}

/**
 * Get active goal (for quick display)
 */
export function getActiveGoal(): SavingsGoal | null {
  const goals = loadSavingsGoals();
  if (goals.length === 0) return null;
  
  // Return goal with lowest completion percentage (most urgent)
  return goals.reduce((prev, current) => {
    const prevProgress = getGoalProgress(prev).percentage;
    const currentProgress = getGoalProgress(current).percentage;
    return currentProgress < prevProgress ? current : prev;
  });
}

// Export for testing
export const __test__ = {
  getMotivationalText,
  checkGoalMilestones
};

