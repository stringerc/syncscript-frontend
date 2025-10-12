/**
 * Context-Aware AI
 * WP-PERS-02: AI that considers ALL context for recommendations
 * 
 * Integrates: Energy + Budget + Weather + Traffic + Time
 * Goal: Recommendation acceptance 40% → 70% (+30pp)
 */

import { WeatherCondition } from './weatherIntegration';
import { BudgetFitResult } from './budgetFitScoring';
import { LeaveByResult } from './leaveByCalculations';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: number;
  energy_requirement: number;
  location?: string;
  estimated_duration?: number; // minutes
  due_date?: string | Date;
  requires_outdoor?: boolean;
  estimated_cost?: number;
  category?: string;
}

export interface ContextualFactors {
  // User state
  currentEnergy: number; // 1-5
  currentTime: Date;
  availableTime: number; // minutes until next commitment
  currentLocation?: string;
  
  // Context data (optional, if available)
  weather?: WeatherCondition;
  budgetFit?: BudgetFitResult;
  traffic?: 'light' | 'moderate' | 'heavy';
  
  // Preferences
  preferences?: {
    avoidBadWeather?: boolean;
    stayOnBudget?: boolean;
    prioritizeEnergy?: boolean;
  };
}

export interface ContextAwareScore {
  overallScore: number; // 0-100
  reasoning: string[];
  warnings: string[];
  adjustments: {
    factor: string;
    impact: number; // -50 to +50
    reason: string;
  }[];
}

/**
 * Score a task based on ALL contextual factors
 * This is the core of context-aware AI
 */
export function scoreTaskWithContext(
  task: Task,
  context: ContextualFactors
): ContextAwareScore {
  let score = 50; // Base score
  const reasoning: string[] = [];
  const warnings: string[] = [];
  const adjustments: Array<{ factor: string; impact: number; reason: string }> = [];
  
  // 1. ENERGY MATCHING (most important)
  const energyDiff = Math.abs(task.energy_requirement - context.currentEnergy);
  if (energyDiff === 0) {
    score += 25;
    reasoning.push('Perfect energy match!');
    adjustments.push({
      factor: 'Energy Match',
      impact: +25,
      reason: 'Task energy perfectly matches your current state'
    });
  } else if (energyDiff === 1) {
    score += 15;
    reasoning.push('Good energy match');
    adjustments.push({
      factor: 'Energy Match',
      impact: +15,
      reason: 'Task energy is close to your current state'
    });
  } else if (energyDiff >= 3) {
    score -= 20;
    warnings.push('Energy mismatch - might feel difficult');
    adjustments.push({
      factor: 'Energy Mismatch',
      impact: -20,
      reason: 'Task requires very different energy than you currently have'
    });
  }
  
  // 2. TIME AVAILABILITY
  const taskDuration = task.estimated_duration || 30; // Default 30 min
  if (taskDuration <= context.availableTime) {
    score += 10;
    reasoning.push('You have enough time');
    adjustments.push({
      factor: 'Time Available',
      impact: +10,
      reason: `You have ${context.availableTime} min, task needs ${taskDuration} min`
    });
  } else {
    score -= 25;
    warnings.push(`Need ${taskDuration} min but only have ${context.availableTime} min`);
    adjustments.push({
      factor: 'Insufficient Time',
      impact: -25,
      reason: 'Not enough time before your next commitment'
    });
  }
  
  // 3. WEATHER CONTEXT (for outdoor/location-based tasks)
  if (context.weather && task.requires_outdoor) {
    if (context.weather.severity === 'severe' || context.weather.severity === 'warning') {
      score -= 30;
      warnings.push(`Bad weather: ${context.weather.description}`);
      adjustments.push({
        factor: 'Severe Weather',
        impact: -30,
        reason: `${context.weather.description} - not ideal for outdoor activity`
      });
    } else if (context.weather.precipitation > 60) {
      score -= 15;
      warnings.push(`${context.weather.precipitation}% chance of rain`);
      adjustments.push({
        factor: 'Weather Risk',
        impact: -15,
        reason: 'High chance of precipitation'
      });
    } else if (context.weather.severity === 'normal') {
      score += 10;
      reasoning.push('Good weather conditions');
      adjustments.push({
        factor: 'Good Weather',
        impact: +10,
        reason: 'Ideal conditions for outdoor activity'
      });
    }
  }
  
  // 4. BUDGET CONTEXT
  if (context.budgetFit && task.estimated_cost) {
    if (context.budgetFit.withinBudget) {
      score += 10;
      reasoning.push('Within your budget');
      adjustments.push({
        factor: 'Budget Fit',
        impact: +10,
        reason: `${context.budgetFit.stars} - fits your comfort zone`
      });
    } else {
      score -= 20;
      warnings.push('Over your budget');
      adjustments.push({
        factor: 'Over Budget',
        impact: -20,
        reason: `$${task.estimated_cost} exceeds your max`
      });
    }
  }
  
  // 5. TRAFFIC CONTEXT (for location-based tasks)
  if (context.traffic && task.location) {
    if (context.traffic === 'heavy') {
      score -= 15;
      warnings.push('Heavy traffic expected');
      adjustments.push({
        factor: 'Heavy Traffic',
        impact: -15,
        reason: 'Travel will take 50% longer than usual'
      });
    } else if (context.traffic === 'light') {
      score += 5;
      reasoning.push('Light traffic');
      adjustments.push({
        factor: 'Light Traffic',
        impact: +5,
        reason: 'Easy travel conditions'
      });
    }
  }
  
  // 6. TIME OF DAY APPROPRIATENESS
  const hour = context.currentTime.getHours();
  
  // Don't suggest gym at midnight
  if (task.title.toLowerCase().includes('gym') && (hour < 5 || hour > 22)) {
    score -= 30;
    warnings.push('Unusual time for this activity');
    adjustments.push({
      factor: 'Time Inappropriateness',
      impact: -30,
      reason: 'Gym typically closes late'
    });
  }
  
  // Don't suggest morning tasks in the evening
  if (task.title.toLowerCase().includes('morning') && hour > 12) {
    score -= 20;
    warnings.push('This is a morning task');
    adjustments.push({
      factor: 'Time Mismatch',
      impact: -20,
      reason: 'This task is typically done in the morning'
    });
  }
  
  // 7. PRIORITY BOOST
  if (task.priority >= 4) {
    score += 10;
    reasoning.push('High priority task');
    adjustments.push({
      factor: 'Priority',
      impact: +10,
      reason: 'Marked as high priority'
    });
  }
  
  // Cap score between 0-100
  const finalScore = Math.max(0, Math.min(100, score));
  
  return {
    overallScore: Math.round(finalScore),
    reasoning,
    warnings,
    adjustments
  };
}

/**
 * Filter tasks by context (remove poor matches)
 */
export function filterTasksByContext(
  tasks: Task[],
  context: ContextualFactors,
  minScore: number = 40
): Array<Task & { contextScore: ContextAwareScore }> {
  const scoredTasks = tasks.map(task => ({
    ...task,
    contextScore: scoreTaskWithContext(task, context)
  }));
  
  // Filter out low-scoring tasks
  const filteredTasks = scoredTasks.filter(t => t.contextScore.overallScore >= minScore);
  
  // Sort by score (highest first)
  filteredTasks.sort((a, b) => b.contextScore.overallScore - a.contextScore.overallScore);
  
  return filteredTasks;
}

/**
 * Get context-aware recommendation explanation
 */
export function getContextExplanation(score: ContextAwareScore): string {
  let explanation = `Context Score: ${score.overallScore}/100\n\n`;
  
  if (score.reasoning.length > 0) {
    explanation += '✅ Why this is a good fit:\n';
    score.reasoning.forEach(r => {
      explanation += `  • ${r}\n`;
    });
  }
  
  if (score.warnings.length > 0) {
    explanation += '\n⚠️ Things to consider:\n';
    score.warnings.forEach(w => {
      explanation += `  • ${w}\n`;
    });
  }
  
  return explanation.trim();
}

/**
 * Get smart rejection reason (why a task was filtered out)
 */
export function getRejectionReason(score: ContextAwareScore): string {
  if (score.overallScore < 20) {
    return 'Multiple factors make this task unsuitable right now';
  }
  
  const negativeFactors = score.adjustments.filter(a => a.impact < 0);
  if (negativeFactors.length > 0) {
    // Return the biggest negative factor
    const worst = negativeFactors.reduce((prev, current) => 
      current.impact < prev.impact ? current : prev
    );
    return worst.reason;
  }
  
  return 'Not the best match for your current context';
}

// Export for testing
export const __test__ = {
  scoreTaskWithContext,
  getContextExplanation
};

