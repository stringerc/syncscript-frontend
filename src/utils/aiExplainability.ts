/**
 * AI Explainability Utility
 * WP-PERS-01: AI Explainability Implementation
 * 
 * Generates human-readable explanations for AI suggestions
 * Target: Increase acceptance from 40% to 60% (+20pp)
 */

interface Task {
  id: string;
  title: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_requirement: 1 | 2 | 3 | 4 | 5;
  due_date?: string;
  estimated_duration?: number;
  project_id?: string;
}

interface UserContext {
  currentEnergy: number;
  currentTime: Date;
  habits?: {
    [key: string]: {
      bestTime?: string;
      frequency?: number;
    };
  };
  location?: string;
  availableTime?: number; // minutes
}

export interface ExplanationReason {
  type: 'urgency' | 'energy_match' | 'pattern' | 'priority' | 'time' | 'project' | 'streak';
  icon: string;
  title: string;
  description: string;
  score: number; // 0-1 (how much this contributed to recommendation)
}

export interface TaskExplanation {
  taskId: string;
  taskTitle: string;
  overallScore: number;
  reasons: ExplanationReason[];
  confidence: number; // 0-100%
}

/**
 * Generate explanation for why a task was suggested
 * 
 * @param task - The suggested task
 * @param context - Current user context (energy, time, etc.)
 * @returns Complete explanation with reasons
 */
export function generateExplanation(
  task: Task,
  context: UserContext
): TaskExplanation {
  const reasons: ExplanationReason[] = [];
  let totalScore = 0;
  
  // 1. URGENCY ANALYSIS
  if (task.due_date) {
    const dueDate = new Date(task.due_date);
    const now = context.currentTime;
    const hoursUntilDue = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    const daysUntilDue = Math.ceil(hoursUntilDue / 24);
    
    let urgencyScore = 0;
    let urgencyText = '';
    
    if (daysUntilDue < 0) {
      urgencyScore = 1.0;
      urgencyText = `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? 's' : ''}`;
    } else if (daysUntilDue === 0) {
      urgencyScore = 0.9;
      urgencyText = 'Due today';
    } else if (daysUntilDue === 1) {
      urgencyScore = 0.8;
      urgencyText = 'Due tomorrow';
    } else if (daysUntilDue <= 3) {
      urgencyScore = 0.6;
      urgencyText = `Due in ${daysUntilDue} days`;
    } else if (daysUntilDue <= 7) {
      urgencyScore = 0.4;
      urgencyText = `Due this week`;
    }
    
    if (urgencyScore > 0.5) {
      reasons.push({
        type: 'urgency',
        icon: '⏰',
        title: 'Time Sensitive',
        description: urgencyText,
        score: urgencyScore
      });
      totalScore += urgencyScore * 0.25; // 25% weight
    }
  }
  
  // 2. ENERGY MATCH ANALYSIS
  const energyDiff = Math.abs(task.energy_requirement - context.currentEnergy);
  const energyMatchScore = Math.max(0, 1 - (energyDiff / 4)); // Perfect match = 1.0, 4 levels off = 0
  
  if (energyMatchScore > 0.7) {
    const matchQuality = energyDiff === 0 ? 'Perfect match' : 
                        energyDiff === 1 ? 'Good match' : 
                        'Decent match';
    
    reasons.push({
      type: 'energy_match',
      icon: '⚡',
      title: 'Energy Match',
      description: `${matchQuality} for your current energy (${context.currentEnergy.toFixed(1)})`,
      score: energyMatchScore
    });
    totalScore += energyMatchScore * 0.30; // 30% weight (highest!)
  }
  
  // 3. HABIT/PATTERN ANALYSIS
  const currentHour = context.currentTime.getHours();
  const currentDay = context.currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  
  // Check if user has patterns for this type of task
  if (context.habits) {
    const taskType = task.title.toLowerCase().includes('review') ? 'review' :
                    task.title.toLowerCase().includes('email') ? 'email' :
                    task.title.toLowerCase().includes('meeting') ? 'meeting' :
                    'general';
    
    const habit = context.habits[taskType];
    if (habit && habit.bestTime) {
      reasons.push({
        type: 'pattern',
        icon: '🔄',
        title: 'Matches Your Habits',
        description: `You usually do ${taskType} tasks ${habit.bestTime}`,
        score: 0.7
      });
      totalScore += 0.7 * 0.20; // 20% weight
    }
  }
  
  // 4. PRIORITY ANALYSIS
  const priorityScore = task.priority / 5; // 1-5 → 0.2-1.0
  
  if (task.priority >= 4) {
    const priorityLabel = task.priority === 5 ? 'Critical' : 'High';
    reasons.push({
      type: 'priority',
      icon: '🎯',
      title: `${priorityLabel} Priority`,
      description: `Priority ${task.priority}/5 (important for your goals)`,
      score: priorityScore
    });
    totalScore += priorityScore * 0.15; // 15% weight
  }
  
  // 5. TIME AVAILABILITY ANALYSIS
  if (task.estimated_duration && context.availableTime) {
    const canFinish = task.estimated_duration <= context.availableTime;
    
    if (canFinish) {
      reasons.push({
        type: 'time',
        icon: '⏱️',
        title: 'You Have Time',
        description: `Estimated ${task.estimated_duration}min (you have ${context.availableTime}min available)`,
        score: 0.8
      });
      totalScore += 0.8 * 0.10; // 10% weight
    }
  }
  
  // 6. PROJECT MOMENTUM (if part of active project)
  if (task.project_id) {
    reasons.push({
      type: 'project',
      icon: '📁',
      title: 'Project Momentum',
      description: 'Part of your active project - keep the momentum!',
      score: 0.6
    });
    // Don't add to total score (bonus reason only)
  }
  
  // Calculate confidence (based on number of strong reasons)
  const strongReasons = reasons.filter(r => r.score > 0.7).length;
  const confidence = Math.min(95, 50 + (strongReasons * 15)); // 50-95%
  
  return {
    taskId: task.id,
    taskTitle: task.title,
    overallScore: Math.min(1, totalScore), // Cap at 1.0
    reasons: reasons.sort((a, b) => b.score - a.score), // Sort by importance
    confidence
  };
}

/**
 * Format confidence level for display
 */
export function formatConfidence(confidence: number): string {
  if (confidence >= 85) return 'Very High';
  if (confidence >= 70) return 'High';
  if (confidence >= 50) return 'Moderate';
  return 'Low';
}

/**
 * Get confidence color
 */
export function getConfidenceColor(confidence: number): string {
  if (confidence >= 85) return '#7ED321'; // Green
  if (confidence >= 70) return '#4A90E2'; // Blue
  if (confidence >= 50) return '#F5A623'; // Orange
  return '#D0021B'; // Red
}

// Export for testing
export const __test__ = {
  generateExplanation,
  formatConfidence,
  getConfidenceColor
};

