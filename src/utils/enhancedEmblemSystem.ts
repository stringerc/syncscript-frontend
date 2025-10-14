/**
 * Enhanced Emblem Transparency System
 * WP-ENG-02: Emblem Transparency Enhancement
 * 
 * Provides transparent, real-time emblem calculations and breakdowns
 * Target: <100ms emblem calculation time
 */

interface EmblemBreakdown {
  baseCharge: number;
  energyBonus: number;
  streakBonus: number;
  taskBonus: number;
  timeBonus: number;
  totalCharge: number;
  level: number;
  nextLevelThreshold: number;
  progressPercentage: number;
}

interface EmblemCalculationContext {
  userEnergy: number;
  taskCount: number;
  streakDays: number;
  timeOfDay: string;
  recentActivity: Array<{
    type: 'task_completion' | 'energy_log' | 'break';
    timestamp: string;
    impact: number;
  }>;
  userLevel: number;
  currentPoints: number;
}

interface EmblemAnimation {
  type: 'pulse' | 'glow' | 'sparkle' | 'wave';
  intensity: number; // 0-1
  duration: number; // milliseconds
  color: string;
}

/**
 * Calculate comprehensive emblem breakdown
 */
export function calculateEmblemBreakdown(context: EmblemCalculationContext): EmblemBreakdown {
  const startTime = performance.now();
  
  // Base charge calculation
  const baseCharge = Math.min(context.userEnergy * 0.2, 1.0);
  
  // Energy bonus (higher energy = more emblem charge)
  const energyBonus = Math.min(context.userEnergy * 0.15, 0.75);
  
  // Streak bonus (consistency rewards)
  const streakBonus = Math.min(context.streakDays * 0.05, 0.5);
  
  // Task completion bonus
  const taskBonus = Math.min(context.taskCount * 0.1, 0.6);
  
  // Time-based bonus (morning peak, afternoon moderate, evening low)
  const hour = parseInt(context.timeOfDay.split(':')[0]);
  let timeBonus = 0;
  if (hour >= 9 && hour <= 11) {
    timeBonus = 0.3; // Morning peak
  } else if (hour >= 14 && hour <= 16) {
    timeBonus = 0.2; // Afternoon moderate
  } else if (hour >= 19) {
    timeBonus = 0.1; // Evening low
  }
  
  // Recent activity bonus
  const recentActivityBonus = context.recentActivity
    .filter(a => a.type === 'task_completion')
    .reduce((sum, activity) => sum + (activity.impact * 0.1), 0);
  
  // Calculate total charge
  const totalCharge = Math.min(
    baseCharge + energyBonus + streakBonus + taskBonus + timeBonus + recentActivityBonus,
    5.0 // Cap at 5.0
  );
  
  // Determine emblem level
  const level = Math.floor(totalCharge) + 1;
  
  // Calculate progress to next level
  const nextLevelThreshold = level;
  const progressPercentage = ((totalCharge % 1) * 100);
  
  const endTime = performance.now();
  const latency = endTime - startTime;
  
  if (latency > 50) {
    console.warn(`Emblem calculation took ${latency.toFixed(2)}ms (target: <50ms)`);
  }
  
  return {
    baseCharge: Math.round(baseCharge * 100) / 100,
    energyBonus: Math.round(energyBonus * 100) / 100,
    streakBonus: Math.round(streakBonus * 100) / 100,
    taskBonus: Math.round(taskBonus * 100) / 100,
    timeBonus: Math.round(timeBonus * 100) / 100,
    totalCharge: Math.round(totalCharge * 100) / 100,
    level,
    nextLevelThreshold,
    progressPercentage: Math.round(progressPercentage * 100) / 100
  };
}

/**
 * Get emblem animation based on charge level
 */
export function getEmblemAnimation(charge: number): EmblemAnimation {
  if (charge >= 4.5) {
    return {
      type: 'sparkle',
      intensity: 1.0,
      duration: 2000,
      color: '#ffd700' // Gold
    };
  } else if (charge >= 3.5) {
    return {
      type: 'pulse',
      intensity: 0.8,
      duration: 1500,
      color: '#ff6b35' // Orange
    };
  } else if (charge >= 2.5) {
    return {
      type: 'glow',
      intensity: 0.6,
      duration: 1000,
      color: '#4ecdc4' // Teal
    };
  } else if (charge >= 1.5) {
    return {
      type: 'wave',
      intensity: 0.4,
      duration: 800,
      color: '#45b7d1' // Blue
    };
  } else {
    return {
      type: 'glow',
      intensity: 0.2,
      duration: 500,
      color: '#96ceb4' // Light green
    };
  }
}

/**
 * Get emblem color based on charge level
 */
export function getEmblemColor(charge: number): string {
  if (charge >= 4.5) return '#ffd700'; // Gold
  if (charge >= 3.5) return '#ff6b35'; // Orange
  if (charge >= 2.5) return '#4ecdc4'; // Teal
  if (charge >= 1.5) return '#45b7d1'; // Blue
  return '#96ceb4'; // Light green
}

/**
 * Get emblem size based on charge level
 */
export function getEmblemSize(charge: number): number {
  // Base size 40px, scales up to 60px at max charge
  return 40 + (charge / 5.0) * 20;
}

/**
 * Get emblem opacity based on charge level
 */
export function getEmblemOpacity(charge: number): number {
  // Minimum opacity 0.6, maximum 1.0
  return 0.6 + (charge / 5.0) * 0.4;
}

/**
 * Calculate emblem transparency level
 */
export function calculateEmblemTransparency(charge: number): {
  opacity: number;
  blur: number;
  scale: number;
  glowIntensity: number;
} {
  const normalizedCharge = charge / 5.0; // Normalize to 0-1
  
  return {
    opacity: 0.7 + (normalizedCharge * 0.3), // 0.7 to 1.0
    blur: Math.max(0, 2 - (normalizedCharge * 2)), // 2px to 0px
    scale: 1.0 + (normalizedCharge * 0.2), // 1.0 to 1.2
    glowIntensity: normalizedCharge * 0.8 // 0 to 0.8
  };
}

/**
 * Get emblem status message
 */
export function getEmblemStatusMessage(breakdown: EmblemBreakdown): string {
  if (breakdown.totalCharge >= 4.5) {
    return '🌟 Emblem is glowing brilliantly! You\'re at peak performance!';
  } else if (breakdown.totalCharge >= 3.5) {
    return '⚡ Emblem is pulsing with energy! Great momentum!';
  } else if (breakdown.totalCharge >= 2.5) {
    return '✨ Emblem is glowing steadily. Keep up the good work!';
  } else if (breakdown.totalCharge >= 1.5) {
    return '💫 Emblem is building energy. You\'re getting there!';
  } else {
    return '🌱 Emblem is charging up. Every task counts!';
  }
}

/**
 * Get emblem tips for improvement
 */
export function getEmblemImprovementTips(breakdown: EmblemBreakdown): string[] {
  const tips: string[] = [];
  
  if (breakdown.energyBonus < 0.5) {
    tips.push('💪 Boost your energy with a short break or energizing activity');
  }
  
  if (breakdown.streakBonus < 0.3) {
    tips.push('🔥 Maintain your daily streak to build emblem power');
  }
  
  if (breakdown.taskBonus < 0.4) {
    tips.push('✅ Complete more tasks to increase emblem charge');
  }
  
  if (breakdown.timeBonus < 0.2) {
    tips.push('⏰ Work during peak hours (9-11 AM) for maximum emblem boost');
  }
  
  if (tips.length === 0) {
    tips.push('🎯 You\'re doing great! Keep maintaining this level of activity');
  }
  
  return tips;
}

/**
 * Calculate emblem efficiency score
 */
export function calculateEmblemEfficiency(breakdown: EmblemBreakdown): number {
  // Efficiency = (total charge) / (energy input)
  const energyInput = breakdown.baseCharge + breakdown.energyBonus;
  const efficiency = energyInput > 0 ? breakdown.totalCharge / energyInput : 0;
  
  return Math.min(efficiency, 2.0); // Cap at 2.0x efficiency
}

/**
 * Get emblem level name
 */
export function getEmblemLevelName(level: number): string {
  const levelNames = [
    'Seedling',      // Level 1
    'Sprout',        // Level 2
    'Sapling',       // Level 3
    'Tree',          // Level 4
    'Ancient Tree',  // Level 5
    'World Tree'     // Level 6+
  ];
  
  return levelNames[Math.min(level - 1, levelNames.length - 1)] || 'Mystical';
}

/**
 * Get emblem level description
 */
export function getEmblemLevelDescription(level: number): string {
  const descriptions = [
    'A small spark of potential, ready to grow',
    'Growing stronger with each task completed',
    'Building momentum and showing promise',
    'A solid foundation of productivity',
    'An ancient source of wisdom and power',
    'A legendary force of nature itself'
  ];
  
  return descriptions[Math.min(level - 1, descriptions.length - 1)] || 'Beyond comprehension';
}

/**
 * Calculate emblem charge for specific task completion
 */
export function calculateTaskEmblemCharge(
  task: {
    energy_requirement: number;
    priority: number;
    estimated_duration?: number;
  },
  userEnergy: number,
  timeOfDay: string
): number {
  const startTime = performance.now();
  
  // Base charge from task energy requirement
  let charge = task.energy_requirement * 0.2;
  
  // Energy match bonus
  const energyDiff = Math.abs(task.energy_requirement - userEnergy);
  if (energyDiff <= 1) {
    charge += 0.3; // Energy match bonus
  }
  
  // Priority bonus
  charge += task.priority * 0.1;
  
  // Time bonus
  const hour = parseInt(timeOfDay.split(':')[0]);
  if (hour >= 9 && hour <= 11) {
    charge += 0.2; // Morning peak
  } else if (hour >= 14 && hour <= 16) {
    charge += 0.1; // Afternoon moderate
  }
  
  // Duration bonus (longer tasks = more charge)
  if (task.estimated_duration && task.estimated_duration > 60) {
    charge += 0.1; // Long task bonus
  }
  
  const endTime = performance.now();
  const latency = endTime - startTime;
  
  if (latency > 25) {
    console.warn(`Task emblem calculation took ${latency.toFixed(2)}ms (target: <25ms)`);
  }
  
  return Math.min(charge, 1.0); // Cap at 1.0 per task
}

// Export for testing
export const __test__ = {
  calculateEmblemBreakdown,
  getEmblemAnimation,
  getEmblemColor,
  getEmblemSize,
  getEmblemOpacity,
  calculateEmblemTransparency,
  getEmblemStatusMessage,
  getEmblemImprovementTips,
  calculateEmblemEfficiency,
  getEmblemLevelName,
  getEmblemLevelDescription,
  calculateTaskEmblemCharge
};
