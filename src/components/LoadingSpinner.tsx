/**
 * Reusable Loading Spinner Component
 * For use throughout the app
 */

'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullScreen?: boolean
  text?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

export function LoadingSpinner({ 
  size = 'md', 
  fullScreen = false,
  text 
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600 dark:text-blue-400`} />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

export function LoadingSkeleton({ 
  width = 'w-full', 
  height = 'h-4',
  rounded = 'rounded'
}: { 
  width?: string
  height?: string 
  rounded?: string
}) {
  return (
    <div className={`${width} ${height} ${rounded} bg-gray-200 dark:bg-gray-700 animate-pulse`} />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <LoadingSkeleton width="w-12" height="h-12" rounded="rounded-lg" />
        <LoadingSkeleton width="w-16" height="h-6" rounded="rounded-full" />
      </div>
      <LoadingSkeleton width="w-3/4" height="h-6" rounded="rounded" />
      <div className="mt-2">
        <LoadingSkeleton width="w-full" height="h-4" rounded="rounded" />
      </div>
      <div className="mt-4">
        <LoadingSkeleton width="w-1/3" height="h-4" rounded="rounded" />
      </div>
    </div>
  )
}

export default LoadingSpinner

