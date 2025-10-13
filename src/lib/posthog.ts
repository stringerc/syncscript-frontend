/**
 * PostHog Analytics Integration
 * Tracks user behavior and enables feature flags
 */

import posthog from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: 'https://app.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      loaded: (posthog) => {
        console.log('🎯 PostHog initialized successfully')
      }
    })
  }
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture(eventName, properties)
  }
}

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.identify(userId, properties)
  }
}

export const getFeatureFlag = (flagKey: string): boolean => {
  if (typeof window !== 'undefined' && posthog) {
    return posthog.isFeatureEnabled(flagKey) || false
  }
  return false
}

export default posthog