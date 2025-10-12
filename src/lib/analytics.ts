/**
 * Analytics & Event Tracking
 * Unified analytics interface for Vercel Analytics + Google Analytics 4
 */

import { track } from '@vercel/analytics'

// Core event types
type EventProperties = Record<string, string | number | boolean | undefined>

/**
 * Analytics wrapper - supports multiple providers
 */
export const analytics = {
  // ============================================================================
  // USER LIFECYCLE EVENTS
  // ============================================================================
  
  userRegistered: (userId: string, method: 'email' | 'google' | 'github' | 'sso', source?: string) => {
    track('user_registered', {
      user_id: userId,
      signup_method: method,
      referral_source: source || 'direct',
      timestamp: new Date().toISOString()
    })
  },

  userCompletedOnboarding: (userId: string, stepsCompleted: number, durationSeconds: number) => {
    track('user_completed_onboarding', {
      user_id: userId,
      steps_completed: stepsCompleted,
      duration_seconds: durationSeconds,
      timestamp: new Date().toISOString()
    })
  },

  // ============================================================================
  // TASK EVENTS
  // ============================================================================
  
  taskCreated: (userId: string, taskId: string, properties: {
    priority?: number
    energyLevel?: number
    hasBudget?: boolean
    estimatedDuration?: number
    source?: 'manual' | 'ai' | 'import' | 'template' | 'voice'
  }) => {
    track('task_created', {
      user_id: userId,
      task_id: taskId,
      priority: properties.priority,
      energy_level: properties.energyLevel,
      has_budget: properties.hasBudget || false,
      estimated_duration: properties.estimatedDuration,
      source: properties.source || 'manual',
      timestamp: new Date().toISOString()
    })
  },

  taskCompleted: (userId: string, taskId: string, properties: {
    actualDuration?: number
    energyBefore?: number
    energyAfter?: number
    completedDuringPeak?: boolean
    budgetVariance?: number
  }) => {
    track('task_completed', {
      user_id: userId,
      task_id: taskId,
      actual_duration: properties.actualDuration,
      energy_before: properties.energyBefore,
      energy_after: properties.energyAfter,
      completed_during_peak: properties.completedDuringPeak || false,
      budget_variance: properties.budgetVariance,
      timestamp: new Date().toISOString()
    })
  },

  // ============================================================================
  // ENERGY EVENTS
  // ============================================================================
  
  energyLevelUpdated: (userId: string, oldLevel: number, newLevel: number, source: 'manual' | 'auto_recalibration', confidence?: number) => {
    track('energy_level_updated', {
      user_id: userId,
      old_level: oldLevel,
      new_level: newLevel,
      source,
      confidence: confidence || 1.0,
      timestamp: new Date().toISOString()
    })
  },

  // ============================================================================
  // AI & SUGGESTION EVENTS
  // ============================================================================
  
  aiSuggestionShown: (userId: string, suggestionId: string, suggestionType: string, confidence: number, contextFactors: string[]) => {
    track('ai_suggestion_shown', {
      user_id: userId,
      suggestion_id: suggestionId,
      suggestion_type: suggestionType,
      ai_confidence: confidence,
      context_factors: contextFactors.join(','),
      timestamp: new Date().toISOString()
    })
  },

  aiSuggestionAccepted: (userId: string, suggestionId: string, timeToDecision: number) => {
    track('ai_suggestion_accepted', {
      user_id: userId,
      suggestion_id: suggestionId,
      time_to_decision_seconds: timeToDecision,
      timestamp: new Date().toISOString()
    })
  },

  aiExplanationViewed: (userId: string, feature: string, explanationType: 'why' | 'how' | 'alternatives' | 'confidence') => {
    track('ai_explanation_viewed', {
      user_id: userId,
      feature,
      explanation_type: explanationType,
      timestamp: new Date().toISOString()
    })
  },

  // ============================================================================
  // BUDGET EVENTS
  // ============================================================================
  
  budgetFitCalculated: (userId: string, taskId: string, fitScore: number, comfortBand: 'safe' | 'stretch' | 'over') => {
    track('budget_fit_calculated', {
      user_id: userId,
      task_id: taskId,
      fit_score: fitScore,
      comfort_band: comfortBand,
      timestamp: new Date().toISOString()
    })
  },

  savingsGoalUpdated: (userId: string, goalId: string, amountSaved: number, daysAccelerated: number) => {
    track('savings_goal_progress_updated', {
      user_id: userId,
      goal_id: goalId,
      amount_saved: amountSaved,
      days_accelerated: daysAccelerated,
      timestamp: new Date().toISOString()
    })
  },

  // ============================================================================
  // GAMIFICATION EVENTS
  // ============================================================================
  
  achievementUnlocked: (userId: string, achievementId: string, achievementName: string, points: number) => {
    track('achievement_unlocked', {
      user_id: userId,
      achievement_id: achievementId,
      achievement_name: achievementName,
      points_earned: points,
      timestamp: new Date().toISOString()
    })
  },

  emblemCharged: (userId: string, emblemId: string, chargeDelta: number, totalCharge: number, reason: string) => {
    track('emblem_charged', {
      user_id: userId,
      emblem_id: emblemId,
      charge_delta: chargeDelta,
      total_charge: totalCharge,
      reason,
      timestamp: new Date().toISOString()
    })
  },

  streakMilestone: (userId: string, streakType: string, streakCount: number) => {
    track('streak_milestone_reached', {
      user_id: userId,
      streak_type: streakType,
      streak_count: streakCount,
      timestamp: new Date().toISOString()
    })
  },

  // ============================================================================
  // FEATURE USAGE EVENTS
  // ============================================================================
  
  featureDiscovered: (userId: string, featureId: string, discoveryMethod: string) => {
    track('feature_discovered', {
      user_id: userId,
      feature_id: featureId,
      discovery_method: discoveryMethod,
      timestamp: new Date().toISOString()
    })
  },

  featureFirstUse: (userId: string, featureId: string) => {
    track('feature_first_use', {
      user_id: userId,
      feature_id: featureId,
      timestamp: new Date().toISOString()
    })
  },

  // ============================================================================
  // NAVIGATION & PAGE VIEWS
  // ============================================================================
  
  pageViewed: (userId: string | undefined, pagePath: string, referrer?: string) => {
    track('page_viewed', {
      user_id: userId || 'anonymous',
      page_path: pagePath,
      referrer: referrer || document.referrer,
      timestamp: new Date().toISOString()
    })
  },

  // ============================================================================
  // CONVERSION EVENTS
  // ============================================================================
  
  premiumUpgradeStarted: (userId: string, plan: string, billingPeriod: 'monthly' | 'annual') => {
    track('premium_upgrade_started', {
      user_id: userId,
      plan,
      billing_period: billingPeriod,
      timestamp: new Date().toISOString()
    })
  },

  premiumUpgradeCompleted: (userId: string, plan: string, amountPaid: number) => {
    track('premium_upgrade_completed', {
      user_id: userId,
      plan,
      amount_paid: amountPaid,
      timestamp: new Date().toISOString()
    })
  },

  // ============================================================================
  // ERROR EVENTS
  // ============================================================================
  
  errorOccurred: (errorType: string, errorMessage: string, pagePath: string) => {
    track('error_occurred', {
      error_type: errorType,
      error_message: errorMessage,
      page_path: pagePath,
      timestamp: new Date().toISOString()
    })
  },

  // ============================================================================
  // CUSTOM EVENT (generic)
  // ============================================================================
  
  custom: (eventName: string, properties: EventProperties) => {
    track(eventName, {
      ...properties,
      timestamp: new Date().toISOString()
    })
  }
}

/**
 * Web Vitals Tracking
 * Automatically tracks Core Web Vitals
 */
export function initWebVitals() {
  if (typeof window === 'undefined') return

  import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
    onCLS((metric) => {
      track('web_vitals_measured', {
        metric: 'CLS',
        value: metric.value,
        rating: metric.rating,
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    })

    onFCP((metric) => {
      track('web_vitals_measured', {
        metric: 'FCP',
        value: metric.value,
        rating: metric.rating,
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    })

    onINP((metric) => {
      track('web_vitals_measured', {
        metric: 'INP',
        value: metric.value,
        rating: metric.rating,
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    })

    onLCP((metric) => {
      track('web_vitals_measured', {
        metric: 'LCP',
        value: metric.value,
        rating: metric.rating,
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    })

    onTTFB((metric) => {
      track('web_vitals_measured', {
        metric: 'TTFB',
        value: metric.value,
        rating: metric.rating,
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    })
  })
}

export default analytics

