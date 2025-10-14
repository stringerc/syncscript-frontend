/**
 * AI Explainability System
 * WP-PERS-01: Enhanced AI Explainability
 * 
 * Provides intelligent explanations for AI decisions and recommendations
 * Target: <200ms explanation generation time
 */

interface AIExplanation {
  id: string;
  type: 'task_suggestion' | 'energy_recommendation' | 'schedule_optimization' | 'productivity_insight';
  title: string;
  explanation: string;
  confidence: number; // 0-1
  reasoning: string[];
  alternatives?: string[];
  actionableSteps: string[];
  timestamp: string;
}

interface TaskSuggestionContext {
  userEnergy: number;
  availableTime: number;
  taskHistory: Array<{
    taskId: string;
    energyRequired: number;
    completed: boolean;
    completionTime?: number;
  }>;
  currentTasks: Array<{
    id: string;
    title: string;
    priority: number;
    energy_requirement: number;
    estimated_duration: number;
  }>;
  userPreferences: {
    preferredWorkTimes: string[];
    energyPatterns: number[];
    productivityPeaks: string[];
  };
}

interface EnergyRecommendationContext {
  currentEnergy: number;
  timeOfDay: string;
  upcomingTasks: Array<{
    id: string;
    energy_requirement: number;
    priority: number;
    dueDate?: string;
  }>;
  recentActivity: Array<{
    type: 'task_completion' | 'break' | 'energy_log';
    timestamp: string;
    impact: number;
  }>;
  userGoals: {
    targetEnergy: number;
    dailyTarget: number;
    weeklyTarget: number;
  };
}

/**
 * Generate AI explanation for task suggestions
 */
export function generateTaskSuggestionExplanation(
  suggestedTask: any,
  context: TaskSuggestionContext
): AIExplanation {
  const startTime = performance.now();
  
  const explanations: string[] = [];
  const reasoning: string[] = [];
  const actionableSteps: string[] = [];
  
  // Energy matching explanation
  const energyDiff = Math.abs(suggestedTask.energy_requirement - context.userEnergy);
  if (energyDiff <= 1) {
    explanations.push(`This task matches your current energy level (${context.userEnergy}/5)`);
    reasoning.push(`Energy match score: ${(1 - energyDiff).toFixed(2)}`);
  } else if (suggestedTask.energy_requirement > context.userEnergy) {
    explanations.push(`This task requires higher energy (${suggestedTask.energy_requirement}/5) than you currently have`);
    reasoning.push(`Energy gap: ${energyDiff} levels`);
    actionableSteps.push('Consider taking a short break or doing a warm-up task first');
  } else {
    explanations.push(`This task is easier than your current energy level - good for building momentum`);
    reasoning.push(`Energy efficiency: ${(context.userEnergy - suggestedTask.energy_requirement).toFixed(1)} levels above requirement`);
  }
  
  // Time-based reasoning
  if (context.availableTime >= suggestedTask.estimated_duration) {
    explanations.push(`You have enough time (${context.availableTime}min available vs ${suggestedTask.estimated_duration}min needed)`);
    reasoning.push(`Time buffer: ${context.availableTime - suggestedTask.estimated_duration} minutes`);
  } else {
    explanations.push(`This task might be too long for your available time`);
    reasoning.push(`Time constraint: ${suggestedTask.estimated_duration - context.availableTime} minutes over`);
    actionableSteps.push('Consider breaking this task into smaller chunks');
  }
  
  // Priority-based reasoning
  if (suggestedTask.priority >= 4) {
    explanations.push(`This is a high-priority task that should be tackled soon`);
    reasoning.push(`Priority score: ${suggestedTask.priority}/5`);
  } else {
    explanations.push(`This task has moderate priority - good for current energy level`);
    reasoning.push(`Priority balance: ${suggestedTask.priority}/5`);
  }
  
  // Historical pattern analysis
  const similarTasks = context.taskHistory.filter(t => 
    Math.abs(t.energyRequired - suggestedTask.energy_requirement) <= 1
  );
  
  if (similarTasks.length > 0) {
    const completionRate = similarTasks.filter(t => t.completed).length / similarTasks.length;
    if (completionRate > 0.7) {
      explanations.push(`You've successfully completed similar energy-level tasks ${(completionRate * 100).toFixed(0)}% of the time`);
      reasoning.push(`Historical success rate: ${(completionRate * 100).toFixed(0)}%`);
    } else {
      explanations.push(`Similar tasks have been challenging - consider your energy carefully`);
      reasoning.push(`Historical completion rate: ${(completionRate * 100).toFixed(0)}%`);
      actionableSteps.push('Try a different approach or break the task into smaller steps');
    }
  }
  
  // Calculate confidence score
  let confidence = 0.5; // Base confidence
  
  // Energy match bonus
  if (energyDiff <= 1) confidence += 0.2;
  if (energyDiff === 0) confidence += 0.1;
  
  // Time availability bonus
  if (context.availableTime >= suggestedTask.estimated_duration) confidence += 0.15;
  
  // Priority bonus
  if (suggestedTask.priority >= 4) confidence += 0.1;
  
  // Historical success bonus
  if (similarTasks.length > 0) {
    const completionRate = similarTasks.filter(t => t.completed).length / similarTasks.length;
    confidence += completionRate * 0.05;
  }
  
  confidence = Math.min(1, confidence);
  
  const endTime = performance.now();
  const latency = endTime - startTime;
  
  if (latency > 100) {
    console.warn(`AI explanation generation took ${latency.toFixed(2)}ms (target: <100ms)`);
  }
  
  return {
    id: `explanation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'task_suggestion',
    title: `Why I suggest "${suggestedTask.title}"`,
    explanation: explanations.join(' '),
    confidence,
    reasoning,
    actionableSteps,
    timestamp: new Date().toISOString()
  };
}

/**
 * Generate AI explanation for energy recommendations
 */
export function generateEnergyRecommendationExplanation(
  recommendation: {
    action: 'increase' | 'maintain' | 'decrease';
    method: string;
    duration: number;
  },
  context: EnergyRecommendationContext
): AIExplanation {
  const startTime = performance.now();
  
  const explanations: string[] = [];
  const reasoning: string[] = [];
  const actionableSteps: string[] = [];
  
  // Current energy analysis
  if (context.currentEnergy >= 4) {
    explanations.push(`Your energy is at peak level (${context.currentEnergy}/5) - perfect for high-impact tasks`);
    reasoning.push(`Current energy: ${context.currentEnergy}/5 (Peak range)`);
  } else if (context.currentEnergy >= 3) {
    explanations.push(`Your energy is high (${context.currentEnergy}/5) - good for most tasks`);
    reasoning.push(`Current energy: ${context.currentEnergy}/5 (High range)`);
  } else if (context.currentEnergy >= 2) {
    explanations.push(`Your energy is moderate (${context.currentEnergy}/5) - consider energy-boosting activities`);
    reasoning.push(`Current energy: ${context.currentEnergy}/5 (Medium range)`);
  } else {
    explanations.push(`Your energy is low (${context.currentEnergy}/5) - focus on recovery and easy tasks`);
    reasoning.push(`Current energy: ${context.currentEnergy}/5 (Low range)`);
  }
  
  // Time-based reasoning
  const hour = parseInt(context.timeOfDay.split(':')[0]);
  if (hour >= 9 && hour <= 11) {
    explanations.push(`It's morning peak time - ideal for high-energy tasks`);
    reasoning.push(`Time of day: ${context.timeOfDay} (Morning peak)`);
  } else if (hour >= 14 && hour <= 16) {
    explanations.push(`It's afternoon - good for moderate energy tasks`);
    reasoning.push(`Time of day: ${context.timeOfDay} (Afternoon)`);
  } else if (hour >= 19) {
    explanations.push(`It's evening - focus on low-energy tasks and preparation`);
    reasoning.push(`Time of day: ${context.timeOfDay} (Evening)`);
  }
  
  // Upcoming tasks analysis
  const highEnergyTasks = context.upcomingTasks.filter(t => t.energy_requirement >= 4);
  const urgentTasks = context.upcomingTasks.filter(t => t.priority >= 4);
  
  if (highEnergyTasks.length > 0) {
    explanations.push(`You have ${highEnergyTasks.length} high-energy tasks coming up`);
    reasoning.push(`High-energy tasks: ${highEnergyTasks.length}`);
    if (recommendation.action === 'increase') {
      actionableSteps.push('Prepare for high-energy tasks with a short break or energizing activity');
    }
  }
  
  if (urgentTasks.length > 0) {
    explanations.push(`${urgentTasks.length} urgent tasks require your attention`);
    reasoning.push(`Urgent tasks: ${urgentTasks.length}`);
    actionableSteps.push('Prioritize urgent tasks and manage energy accordingly');
  }
  
  // Recent activity analysis
  const recentCompletions = context.recentActivity.filter(a => a.type === 'task_completion');
  if (recentCompletions.length >= 3) {
    explanations.push(`You've completed ${recentCompletions.length} tasks recently - consider a break`);
    reasoning.push(`Recent completions: ${recentCompletions.length}`);
    actionableSteps.push('Take a 5-10 minute break to recharge');
  }
  
  // Goal alignment
  if (context.currentEnergy < context.userGoals.targetEnergy) {
    explanations.push(`Your energy is below your target goal (${context.userGoals.targetEnergy}/5)`);
    reasoning.push(`Goal gap: ${context.userGoals.targetEnergy - context.currentEnergy} levels`);
    actionableSteps.push('Try energy-boosting activities to reach your target');
  }
  
  // Calculate confidence
  let confidence = 0.6; // Base confidence for energy recommendations
  
  // Time-based confidence
  if (hour >= 9 && hour <= 11) confidence += 0.15; // Morning peak
  if (hour >= 14 && hour <= 16) confidence += 0.1; // Afternoon
  
  // Task-based confidence
  if (highEnergyTasks.length > 0 && recommendation.action === 'increase') confidence += 0.1;
  if (urgentTasks.length > 0) confidence += 0.1;
  
  confidence = Math.min(1, confidence);
  
  const endTime = performance.now();
  const latency = endTime - startTime;
  
  if (latency > 100) {
    console.warn(`AI energy explanation took ${latency.toFixed(2)}ms (target: <100ms)`);
  }
  
  return {
    id: `energy_explanation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'energy_recommendation',
    title: `Energy Recommendation: ${recommendation.action.charAt(0).toUpperCase() + recommendation.action.slice(1)}`,
    explanation: explanations.join(' '),
    confidence,
    reasoning,
    actionableSteps,
    timestamp: new Date().toISOString()
  };
}

/**
 * Generate productivity insights based on user patterns
 */
export function generateProductivityInsight(
  userData: {
    tasksCompleted: number;
    averageEnergy: number;
    productivityTrend: 'up' | 'down' | 'stable';
    timeOfDay: string;
    weeklyGoal: number;
  }
): AIExplanation {
  const startTime = performance.now();
  
  const explanations: string[] = [];
  const reasoning: string[] = [];
  const actionableSteps: string[] = [];
  
  // Task completion analysis
  if (userData.tasksCompleted >= userData.weeklyGoal * 0.8) {
    explanations.push(`You're on track to meet your weekly goal (${userData.tasksCompleted}/${userData.weeklyGoal} tasks)`);
    reasoning.push(`Goal progress: ${((userData.tasksCompleted / userData.weeklyGoal) * 100).toFixed(0)}%`);
  } else {
    explanations.push(`You're behind on your weekly goal - consider adjusting your approach`);
    reasoning.push(`Goal progress: ${((userData.tasksCompleted / userData.weeklyGoal) * 100).toFixed(0)}%`);
    actionableSteps.push('Break down large tasks into smaller, manageable pieces');
  }
  
  // Energy pattern analysis
  if (userData.averageEnergy >= 4) {
    explanations.push(`Your average energy is high (${userData.averageEnergy.toFixed(1)}/5) - you're in a productive zone`);
    reasoning.push(`Average energy: ${userData.averageEnergy.toFixed(1)}/5 (High)`);
  } else if (userData.averageEnergy >= 3) {
    explanations.push(`Your average energy is good (${userData.averageEnergy.toFixed(1)}/5) - maintain this level`);
    reasoning.push(`Average energy: ${userData.averageEnergy.toFixed(1)}/5 (Good)`);
  } else {
    explanations.push(`Your average energy is low (${userData.averageEnergy.toFixed(1)}/5) - focus on energy management`);
    reasoning.push(`Average energy: ${userData.averageEnergy.toFixed(1)}/5 (Low)`);
    actionableSteps.push('Try energy-boosting activities like short walks or healthy snacks');
  }
  
  // Trend analysis
  if (userData.productivityTrend === 'up') {
    explanations.push(`Your productivity is trending upward - keep up the great work!`);
    reasoning.push(`Trend: Upward (Positive)`);
  } else if (userData.productivityTrend === 'down') {
    explanations.push(`Your productivity is declining - consider what might be causing this`);
    reasoning.push(`Trend: Downward (Needs attention)`);
    actionableSteps.push('Review your recent tasks and energy patterns');
  } else {
    explanations.push(`Your productivity is stable - look for opportunities to optimize`);
    reasoning.push(`Trend: Stable (Consistent)`);
  }
  
  // Time-based insights
  const hour = parseInt(userData.timeOfDay.split(':')[0]);
  if (hour >= 9 && hour <= 11) {
    explanations.push(`You're in your morning peak - perfect for high-impact work`);
    actionableSteps.push('Schedule your most important tasks for this time');
  } else if (hour >= 14 && hour <= 16) {
    explanations.push(`It's afternoon - good for moderate tasks and follow-ups`);
    actionableSteps.push('Use this time for meetings and collaborative work');
  }
  
  // Calculate confidence
  let confidence = 0.7; // Base confidence for insights
  
  // Data quality confidence
  if (userData.tasksCompleted >= 5) confidence += 0.1; // Sufficient data
  if (userData.averageEnergy > 0) confidence += 0.1; // Energy data available
  
  confidence = Math.min(1, confidence);
  
  const endTime = performance.now();
  const latency = endTime - startTime;
  
  if (latency > 100) {
    console.warn(`AI insight generation took ${latency.toFixed(2)}ms (target: <100ms)`);
  }
  
  return {
    id: `insight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'productivity_insight',
    title: 'Productivity Insight',
    explanation: explanations.join(' '),
    confidence,
    reasoning,
    actionableSteps,
    timestamp: new Date().toISOString()
  };
}

/**
 * Get explanation by ID (for caching and retrieval)
 */
export function getExplanationById(id: string): AIExplanation | null {
  // In a real implementation, this would query a database or cache
  // For now, return null to indicate not found
  return null;
}

/**
 * Get recent explanations for a user
 */
export function getRecentExplanations(userId: string, limit: number = 10): AIExplanation[] {
  // In a real implementation, this would query user's explanation history
  // For now, return empty array
  return [];
}

// Additional exports for components
export interface ExplanationReason {
  type: string;
  description: string;
  confidence: number;
}

export interface TaskExplanation {
  id: string;
  title: string;
  explanation: string;
  confidence: number;
  reasoning: ExplanationReason[];
  actionableSteps: string[];
}

export function generateExplanation(task: any, context: any): TaskExplanation {
  return {
    id: `explanation_${Date.now()}`,
    title: `Explanation for ${task.title}`,
    explanation: 'AI-generated explanation for task recommendation',
    confidence: 0.85,
    reasoning: [
      {
        type: 'energy_match',
        description: 'Task matches current energy level',
        confidence: 0.9
      }
    ],
    actionableSteps: ['Review task details', 'Consider energy requirements']
  };
}

export function formatConfidence(confidence: number): string {
  return `${(confidence * 100).toFixed(0)}%`;
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.8) return 'text-green-600';
  if (confidence >= 0.6) return 'text-yellow-600';
  return 'text-red-600';
}

// Export for testing
export const __test__ = {
  generateTaskSuggestionExplanation,
  generateEnergyRecommendationExplanation,
  generateProductivityInsight,
  getExplanationById,
  getRecentExplanations,
  generateExplanation,
  formatConfidence,
  getConfidenceColor
};