/**
 * Analytics Provider
 * Initializes analytics and tracks core user interactions
 */

'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initWebVitals, analytics } from '@/lib/analytics'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize Web Vitals tracking on mount
  useEffect(() => {
    initWebVitals()
  }, [])

  // Track page views
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      // Get user ID from localStorage (if logged in)
      const userId = typeof window !== 'undefined' 
        ? localStorage.getItem('userId') 
        : undefined

      analytics.pageViewed(userId || undefined, url, document.referrer)
    }
  }, [pathname, searchParams])

  // Track errors globally
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      analytics.errorOccurred(
        'javascript',
        event.message,
        window.location.pathname
      )
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      analytics.errorOccurred(
        'promise_rejection',
        event.reason?.toString() || 'Unhandled promise rejection',
        window.location.pathname
      )
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return <>{children}</>
}

export default AnalyticsProvider

