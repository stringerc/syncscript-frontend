/**
 * Anti-Gaming System
 * WP-ENG-03: Protect Emblem System Integrity
 * 
 * Prevents exploitation while keeping honest users happy
 * Goal: <2% flagged events, 85% users report system feels fair
 */

interface CompletionEvent {
  taskId: string;
  timestamp: number;
  emblemCharge: number;
  userId: string;
}

interface AntiGamingResult {
  allowed: boolean;
  adjustedCharge: number;
  penalty: number;
  reason?: string;
  pattern?: 'rapid_fire' | 'cooldown' | 'undo_farming' | 'suspicious';
  warning?: string;
}

interface AntiGamingState {
  recentCompletions: CompletionEvent[];
  totalChargeInWindow: number;
  flaggedPatterns: string[];
  lastWarningTime: number;
}

// Configuration
const CONFIG = {
  MAX_COMPLETIONS_PER_5MIN: 10,
  MIN_TIME_BETWEEN_MS: 30000, // 30 seconds
  RAPID_FIRE_PENALTY: 0.5, // 50% reduction
  COOLDOWN_DURATION_MS: 60000, // 1 minute
  SUSPICIOUS_THRESHOLD: 15, // Completions in 5 min
  WINDOW_SIZE_MS: 300000 // 5 minutes
};

/**
 * Anti-Gaming State Manager
 * Tracks completion patterns in localStorage
 */
class AntiGamingManager {
  private storageKey = 'anti_gaming_state';
  
  private getState(): AntiGamingState {
    if (typeof window === 'undefined') {
      return this.getEmptyState();
    }
    
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return this.getEmptyState();
    }
    
    try {
      return JSON.parse(stored);
    } catch {
      return this.getEmptyState();
    }
  }
  
  private setState(state: AntiGamingState): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }
  
  private getEmptyState(): AntiGamingState {
    return {
      recentCompletions: [],
      totalChargeInWindow: 0,
      flaggedPatterns: [],
      lastWarningTime: 0
    };
  }
  
  /**
   * Clean old completions (outside 5-minute window)
   */
  private cleanOldCompletions(state: AntiGamingState): AntiGamingState {
    const now = Date.now();
    const cutoff = now - CONFIG.WINDOW_SIZE_MS;
    
    const recentCompletions = state.recentCompletions.filter(
      c => c.timestamp > cutoff
    );
    
    const totalChargeInWindow = recentCompletions.reduce(
      (sum, c) => sum + c.emblemCharge,
      0
    );
    
    return {
      ...state,
      recentCompletions,
      totalChargeInWindow
    };
  }
  
  /**
   * Check if completion should be allowed/penalized
   */
  checkCompletion(
    taskId: string,
    emblemCharge: number,
    userId: string
  ): AntiGamingResult {
    let state = this.getState();
    state = this.cleanOldCompletions(state);
    
    const now = Date.now();
    
    // Check 1: Cooldown period (if recently warned)
    if (state.lastWarningTime && now - state.lastWarningTime < CONFIG.COOLDOWN_DURATION_MS) {
      return {
        allowed: false,
        adjustedCharge: 0,
        penalty: 1.0,
        reason: 'Cooldown active',
        pattern: 'cooldown',
        warning: `Slow down! You can complete more tasks in ${Math.ceil((CONFIG.COOLDOWN_DURATION_MS - (now - state.lastWarningTime)) / 1000)}s`
      };
    }
    
    // Check 2: Rapid-fire detection (<30s since last completion)
    const lastCompletion = state.recentCompletions[state.recentCompletions.length - 1];
    if (lastCompletion && now - lastCompletion.timestamp < CONFIG.MIN_TIME_BETWEEN_MS) {
      const timeSince = Math.floor((now - lastCompletion.timestamp) / 1000);
      
      return {
        allowed: true,
        adjustedCharge: Math.floor(emblemCharge * CONFIG.RAPID_FIRE_PENALTY),
        penalty: CONFIG.RAPID_FIRE_PENALTY,
        reason: `Rapid completion (${timeSince}s since last)`,
        pattern: 'rapid_fire',
        warning: 'Complete tasks thoughtfully for full credit!'
      };
    }
    
    // Check 3: Excessive completions in window
    if (state.recentCompletions.length >= CONFIG.MAX_COMPLETIONS_PER_5MIN) {
      // Trigger cooldown
      state.lastWarningTime = now;
      this.setState(state);
      
      return {
        allowed: false,
        adjustedCharge: 0,
        penalty: 1.0,
        reason: `Too many completions (${state.recentCompletions.length} in 5 min)`,
        pattern: 'cooldown',
        warning: 'Whoa! Take a 1-minute break, then continue.'
      };
    }
    
    // Check 4: Suspicious pattern (very high rate)
    if (state.recentCompletions.length >= CONFIG.SUSPICIOUS_THRESHOLD) {
      // Flag for audit but still allow (don't punish too harshly)
      state.flaggedPatterns.push(`suspicious_rate_${now}`);
      this.setState(state);
      
      console.warn('🚨 Anti-Gaming: Suspicious completion rate detected', {
        count: state.recentCompletions.length,
        window: '5 minutes',
        userId
      });
      
      return {
        allowed: true,
        adjustedCharge: Math.floor(emblemCharge * 0.7), // 30% reduction
        penalty: 0.3,
        reason: 'Suspicious rate detected',
        pattern: 'suspicious'
      };
    }
    
    // All checks passed - full charge!
    return {
      allowed: true,
      adjustedCharge: emblemCharge,
      penalty: 0,
    };
  }
  
  /**
   * Record a completion (called after allowing it)
   */
  recordCompletion(taskId: string, emblemCharge: number, userId: string): void {
    let state = this.getState();
    state = this.cleanOldCompletions(state);
    
    const event: CompletionEvent = {
      taskId,
      timestamp: Date.now(),
      emblemCharge,
      userId
    };
    
    state.recentCompletions.push(event);
    state.totalChargeInWindow += emblemCharge;
    
    this.setState(state);
  }
  
  /**
   * Get current state (for debugging/analytics)
   */
  getAnalytics(): {
    completionsInWindow: number;
    totalChargeInWindow: number;
    flaggedPatterns: number;
    isInCooldown: boolean;
  } {
    let state = this.getState();
    state = this.cleanOldCompletions(state);
    
    const now = Date.now();
    const isInCooldown = state.lastWarningTime && 
      now - state.lastWarningTime < CONFIG.COOLDOWN_DURATION_MS;
    
    return {
      completionsInWindow: state.recentCompletions.length,
      totalChargeInWindow: state.totalChargeInWindow,
      flaggedPatterns: state.flaggedPatterns.length,
      isInCooldown: !!isInCooldown
    };
  }
  
  /**
   * Reset state (for testing or manual intervention)
   */
  reset(): void {
    this.setState(this.getEmptyState());
  }
}

// Singleton instance
export const antiGamingManager = new AntiGamingManager();

/**
 * Check if completion should be allowed
 * Main entry point for the system
 */
export function checkAntiGaming(
  taskId: string,
  emblemCharge: number,
  userId: string = 'user'
): AntiGamingResult {
  return antiGamingManager.checkCompletion(taskId, emblemCharge, userId);
}

/**
 * Record completion (call after allowing)
 */
export function recordCompletion(
  taskId: string,
  emblemCharge: number,
  userId: string = 'user'
): void {
  antiGamingManager.recordCompletion(taskId, emblemCharge, userId);
}

/**
 * Get analytics
 */
export function getAntiGamingAnalytics() {
  return antiGamingManager.getAnalytics();
}

/**
 * Reset (for testing)
 */
export function resetAntiGaming() {
  antiGamingManager.reset();
}

// Export for testing
export const __test__ = {
  antiGamingManager,
  CONFIG
};

