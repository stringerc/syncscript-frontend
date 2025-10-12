/**
 * URL State Management Hook
 * Enables shareable/bookmarkable views (M14)
 */

import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

export function useUrlState<T extends Record<string, string | number | boolean>>(
  defaultState: T
): [T, (updates: Partial<T>) => void, () => void] {
  const router = useRouter()

  // Parse current state from URL
  const currentState = useMemo(() => {
    const state = { ...defaultState } as Record<string, any>
    
    Object.keys(defaultState).forEach((key) => {
      const urlValue = router.query[key]
      if (urlValue !== undefined) {
        const defaultValue = defaultState[key]
        
        if (typeof defaultValue === 'boolean') {
          state[key] = urlValue === 'true'
        } else if (typeof defaultValue === 'number') {
          state[key] = Number(urlValue)
        } else {
          state[key] = urlValue
        }
      }
    })
    
    return state as T
  }, [router.query, defaultState])

  // Update URL state
  const updateState = useCallback((updates: Partial<T>) => {
    const newQuery = { ...router.query }
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        delete newQuery[key]
      } else {
        newQuery[key] = String(value)
      }
    })
    
    router.push(
      {
        pathname: router.pathname,
        query: newQuery
      },
      undefined,
      { shallow: true }
    )
  }, [router])

  // Clear URL state
  const clearState = useCallback(() => {
    router.push(router.pathname, undefined, { shallow: true })
  }, [router])

  return [currentState, updateState, clearState]
}

// Simpler version for single values
export function useUrlParam(
  key: string,
  defaultValue: string = ''
): [string, (value: string) => void] {
  const router = useRouter()
  
  const value = (router.query[key] as string) || defaultValue
  
  const setValue = useCallback((newValue: string) => {
    const newQuery = { ...router.query }
    
    if (newValue) {
      newQuery[key] = newValue
    } else {
      delete newQuery[key]
    }
    
    router.push(
      {
        pathname: router.pathname,
        query: newQuery
      },
      undefined,
      { shallow: true }
    )
  }, [router, key])
  
  return [value, setValue]
}

// Hook for shareable URLs
export function useShareableUrl(): string {
  const router = useRouter()
  
  return useMemo(() => {
    if (typeof window === 'undefined') return ''
    
    const url = new URL(window.location.href)
    return url.toString()
  }, [router.asPath])
}

