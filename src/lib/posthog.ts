/**
 * PostHog Analytics Integration
 * Tracks user behavior and enables feature flags
 */

import posthog from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    console.log('🎯 Initializing PostHog with key:', process.env.NEXT_PUBLIC_POSTHOG_KEY.substring(0, 10) + '...')
    
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: 'https://app.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      loaded: (posthog) => {
        console.log('🎯 PostHog initialized successfully!')
        console.log('🎯 PostHog instance:', posthog)
        
        // Test event
        posthog.capture('posthog_test_event', {
          test: true,
          timestamp: new Date().toISOString()
        })
        console.log('🎯 Test event sent to PostHog')
      }
    })
  } else {
    console.log('⚠️ PostHog not initialized:', {
      window: typeof window !== 'undefined',
      hasKey: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
      key: process.env.NEXT_PUBLIC_POSTHOG_KEY?.substring(0, 10) + '...'
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