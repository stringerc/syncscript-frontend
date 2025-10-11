/**
 * Energy Recalibration Utility
 * WP-ENG-01: PRIMARY KPI Implementation
 * 
 * Automatically recalibrates user energy after task completion
 * Target: <100ms calculation time
 */

interface Task {
  energy_requirement: 1 | 2 | 3 | 4 | 5;
  priority: 1 | 2 | 3 | 4 | 5;
  estimated_duration?: number;
}

interface RecalibrationResult {
  newEnergy: number;
  delta: number;
  reason: string;
  matched: boolean;
}

/**
 * Recalibrate energy level after completing a task
 * 
 * Algorithm considers:
 * - Energy match (did task match user's energy?)
 * - Task completion outcome
 * - Time since last energy log
 * - Natural energy depletion
 * 
 * @param currentEnergy - User's current energy level (1-5)
 * @param completedTask - The task that was just completed
 * @param lastEnergyLogTime - Timestamp of last manual energy log (optional)
 * @param outcome - How the task completion went ('success' or 'struggle')
 * @returns New energy level (bounded 1-5, rounded to nearest 0.5)
 */
export function recalibrateEnergy(
  currentEnergy: number,
  completedTask: Task,
  lastEnergyLogTime?: number,
  outcome: 'success' | 'struggle' = 'success'
): RecalibrationResult {
  const startTime = performance.now();
  
  let newEnergy = currentEnergy;
  let reason = '';
  
  // 1. Energy Match Bonus/Penalty
  const energyDiff = Math.abs(completedTask.energy_requirement - currentEnergy);
  const matched = energyDiff <= 1; // Within ±1 is considered a match
  
  if (completedTask.energy_requirement === currentEnergy) {
    // Perfect match: Small boost for completing task at ideal energy
    newEnergy += 0.3;
    reason = 'Perfect energy match (+0.3)';
  } else if (completedTask.energy_requirement > currentEnergy) {
    // Task required more energy than user had
    if (outcome === 'success') {
      // They pushed through! Small drain but they made it
      newEnergy -= 0.2;
      reason = 'Pushed through higher energy task (-0.2)';
    } else {
      // Struggled with high-energy task
      newEnergy -= 0.5;
      reason = 'Struggled with high energy task (-0.5)';
    }
  } else {
    // Task required less energy (easy task)
    newEnergy += 0.1;
    reason = 'Completed easier task (+0.1)';
  }
  
  // 2. Time-Based Natural Depletion
  // Energy naturally depletes over time (~0.1 per hour)
  if (lastEnergyLogTime) {
    const hoursElapsed = (Date.now() - lastEnergyLogTime) / (1000 * 60 * 60);
    const depletion = Math.min(hoursElapsed * 0.1, 1.0); // Cap at 1.0 per session
    newEnergy -= depletion;
    
    if (depletion > 0.3) {
      reason += ` | Time depletion (-${depletion.toFixed(1)})`;
    }
  }
  
  // 3. Task Duration Impact (optional, if estimated_duration exists)
  if (completedTask.estimated_duration) {
    const hours = completedTask.estimated_duration / 60;
    if (hours > 2) {
      // Long task (>2 hours): Additional depletion
      newEnergy -= 0.2;
      reason += ' | Long task (-0.2)';
    }
  }
  
  // 4. Bounds: Keep energy within 1-5 range
  newEnergy = Math.max(1, Math.min(5, newEnergy));
  
  // 5. Round to nearest 0.5 (1.0, 1.5, 2.0, 2.5, ...)
  newEnergy = Math.round(newEnergy * 2) / 2;
  
  // Calculate delta
  const delta = newEnergy - currentEnergy;
  
  // Performance check
  const endTime = performance.now();
  const latency = endTime - startTime;
  
  if (latency > 50) {
    console.warn(`Energy recalibration took ${latency.toFixed(2)}ms (target: <50ms)`);
  }
  
  return {
    newEnergy,
    delta,
    reason: reason || 'Standard recalibration',
    matched
  };
}

/**
 * Check if current energy matches task energy requirement
 * Used for PRIMARY KPI tracking: Energy-Matched Completion Rate
 * 
 * @param userEnergy - User's energy level
 * @param taskEnergy - Task's energy requirement
 * @returns true if within ±1 level (considered a match)
 */
export function isEnergyMatched(
  userEnergy: number,
  taskEnergy: number
): boolean {
  return Math.abs(userEnergy - taskEnergy) <= 1;
}

/**
 * Format energy change for user display
 * 
 * @param delta - Energy change amount
 * @returns Formatted string with emoji
 */
export function formatEnergyDelta(delta: number): string {
  if (delta > 0) {
    return `↗️ +${delta.toFixed(1)}`;
  } else if (delta < 0) {
    return `↘️ ${delta.toFixed(1)}`;
  } else {
    return `→ ${delta.toFixed(1)}`;
  }
}

/**
 * Get energy level label
 */
export function getEnergyLabel(energy: number): string {
  if (energy >= 4.5) return 'Peak';
  if (energy >= 3.5) return 'High';
  if (energy >= 2.5) return 'Medium';
  if (energy >= 1.5) return 'Medium-Low';
  return 'Low';
}

// Export for testing
export const __test__ = {
  recalibrateEnergy,
  isEnergyMatched,
  formatEnergyDelta,
  getEnergyLabel
};

