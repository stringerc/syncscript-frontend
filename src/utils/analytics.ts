/**
 * PostHog Analytics Integration
 * Enhanced Analytics & Monitoring System
 * 
 * Provides comprehensive analytics for user behavior, feature usage, and performance
 * Target: <50ms event tracking latency
 */

import { PostHog } from 'posthog-js';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: string;
  distinctId?: string;
}

interface UserProperties {
  userId: string;
  email?: string;
  name?: string;
  plan?: string;
  signupDate?: string;
  lastActive?: string;
  energyLevel?: number;
  taskCount?: number;
  productivityScore?: number;
}

interface FeatureFlag {
  key: string;
  value: boolean | string;
  variant?: string;
}

class SyncScriptAnalytics {
  private posthog: PostHog | null = null;
  private isInitialized = false;
  private eventQueue: AnalyticsEvent[] = [];
  private userProperties: UserProperties | null = null;

  /**
   * Initialize PostHog analytics
   */
  async initialize(apiKey: string, userId?: string): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        console.warn('PostHog can only be initialized in browser environment');
        return;
      }

      // Dynamic import to avoid SSR issues
      const { PostHog } = await import('posthog-js');
      
      this.posthog = PostHog.init(apiKey, {
        api_host: 'https://app.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: false, // We'll handle this manually
        capture_pageleave: true,
        loaded: (posthog) => {
          console.log('✅ PostHog analytics initialized');
          this.isInitialized = true;
          this.processEventQueue();
        }
      });

      if (userId) {
        this.identifyUser(userId);
      }

    } catch (error) {
      console.error('Failed to initialize PostHog:', error);
    }
  }

  /**
   * Identify user for analytics
   */
  identifyUser(userId: string, properties?: UserProperties): void {
    if (!this.isInitialized || !this.posthog) {
      console.warn('PostHog not initialized, queuing identify event');
      this.eventQueue.push({
        event: '$identify',
        properties: { userId, ...properties }
      });
      return;
    }

    this.userProperties = { userId, ...properties };
    this.posthog.identify(userId, properties);
    
    // Track user identification
    this.track('User Identified', {
      userId,
      hasProperties: !!properties,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track custom events
   */
  track(eventName: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      event: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined
      }
    };

    if (!this.isInitialized || !this.posthog) {
      console.warn('PostHog not initialized, queuing event:', eventName);
      this.eventQueue.push(event);
      return;
    }

    this.posthog.capture(eventName, event.properties);
  }

  /**
   * Track feature usage
   */
  trackFeatureUsage(featureName: string, action: string, properties?: Record<string, any>): void {
    this.track('Feature Used', {
      feature: featureName,
      action,
      ...properties
    });
  }

  /**
   * Track energy-related events
   */
  trackEnergyEvent(eventType: 'energy_logged' | 'energy_recalibrated' | 'energy_matched', properties?: Record<string, any>): void {
    this.track('Energy Event', {
      eventType,
      ...properties
    });
  }

  /**
   * Track task-related events
   */
  trackTaskEvent(eventType: 'task_created' | 'task_completed' | 'task_updated' | 'task_deleted', properties?: Record<string, any>): void {
    this.track('Task Event', {
      eventType,
      ...properties
    });
  }

  /**
   * Track briefing system events
   */
  trackBriefingEvent(eventType: 'morning_brief_viewed' | 'evening_brief_viewed' | 'briefing_settings_updated', properties?: Record<string, any>): void {
    this.track('Briefing Event', {
      eventType,
      ...properties
    });
  }

  /**
   * Track AI explainability events
   */
  trackAIEvent(eventType: 'explanation_generated' | 'explanation_viewed' | 'explanation_helpful', properties?: Record<string, any>): void {
    this.track('AI Event', {
      eventType,
      ...properties
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: string, value: number, unit: string = 'ms'): void {
    this.track('Performance Metric', {
      metric,
      value,
      unit,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track user engagement
   */
  trackEngagement(action: string, properties?: Record<string, any>): void {
    this.track('User Engagement', {
      action,
      ...properties
    });
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: UserProperties): void {
    if (!this.isInitialized || !this.posthog) {
      console.warn('PostHog not initialized, cannot set user properties');
      return;
    }

    this.userProperties = { ...this.userProperties, ...properties };
    this.posthog.people.set(properties);
  }

  /**
   * Get feature flag value
   */
  async getFeatureFlag(flagKey: string): Promise<FeatureFlag | null> {
    if (!this.isInitialized || !this.posthog) {
      console.warn('PostHog not initialized, cannot get feature flag');
      return null;
    }

    try {
      const value = this.posthog.getFeatureFlag(flagKey);
      return {
        key: flagKey,
        value: value as boolean | string,
        variant: this.posthog.getFeatureFlagPayload(flagKey) as string
      };
    } catch (error) {
      console.error('Failed to get feature flag:', error);
      return null;
    }
  }

  /**
   * Check if feature flag is enabled
   */
  async isFeatureEnabled(flagKey: string): Promise<boolean> {
    const flag = await this.getFeatureFlag(flagKey);
    return flag?.value === true;
  }

  /**
   * Process queued events after initialization
   */
  private processEventQueue(): void {
    if (this.eventQueue.length === 0) return;

    console.log(`Processing ${this.eventQueue.length} queued events`);
    
    this.eventQueue.forEach(event => {
      if (event.event === '$identify' && event.properties) {
        this.identifyUser(event.properties.userId, event.properties);
      } else {
        this.track(event.event, event.properties);
      }
    });

    this.eventQueue = [];
  }

  /**
   * Track page views
   */
  trackPageView(pageName?: string): void {
    if (!this.isInitialized || !this.posthog) return;

    this.posthog.capture('$pageview', {
      page: pageName || (typeof window !== 'undefined' ? window.location.pathname : 'unknown')
    });
  }

  /**
   * Track errors
   */
  trackError(error: Error, context?: Record<string, any>): void {
    this.track('Error Occurred', {
      errorMessage: error.message,
      errorStack: error.stack,
      errorName: error.name,
      ...context
    });
  }

  /**
   * Track user session
   */
  trackSessionStart(): void {
    this.track('Session Started', {
      timestamp: new Date().toISOString(),
      sessionId: this.generateSessionId()
    });
  }

  trackSessionEnd(): void {
    this.track('Session Ended', {
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get analytics instance
   */
  getInstance(): PostHog | null {
    return this.posthog;
  }

  /**
   * Check if analytics is initialized
   */
  isReady(): boolean {
    return this.isInitialized && this.posthog !== null;
  }
}

// Create singleton instance
export const analytics = new SyncScriptAnalytics();

// Export types
export type { AnalyticsEvent, UserProperties, FeatureFlag };

// Export for testing
export const __test__ = {
  SyncScriptAnalytics
};
