import posthog from 'posthog-js';

// Initialize PostHog
export const initPostHog = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false, // We'll capture pageviews manually
      capture_pageleave: true,
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined') {
    posthog.capture('$pageview', {
      $current_url: url,
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
};

// Identify user
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties);
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.people.set(properties);
  }
};

// Reset user (on logout)
export const resetUser = () => {
  if (typeof window !== 'undefined') {
    posthog.reset();
  }
};

// Common event tracking functions
export const trackUserAction = (action: string, context?: Record<string, any>) => {
  trackEvent('user_action', {
    action,
    ...context,
  });
};

export const trackFeatureUsage = (feature: string, usage?: Record<string, any>) => {
  trackEvent('feature_used', {
    feature,
    ...usage,
  });
};

export const trackError = (error: string, context?: Record<string, any>) => {
  trackEvent('error_occurred', {
    error,
    ...context,
  });
};

export const trackPerformance = (metric: string, value: number, context?: Record<string, any>) => {
  trackEvent('performance_metric', {
    metric,
    value,
    ...context,
  });
};

// Export PostHog instance for direct use if needed
export { posthog };
