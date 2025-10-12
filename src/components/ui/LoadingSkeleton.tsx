'use client'

import React from 'react'

interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle' | 'card' | 'table' | 'list'
  width?: string | number
  height?: string | number
  count?: number
  className?: string
}

export default function LoadingSkeleton({
  variant = 'text',
  width,
  height,
  count = 1,
  className = ''
}: SkeletonProps) {
  const baseClasses = 'skeleton bg-gray-200 dark:bg-gray-700 animate-pulse'

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded'
      case 'circle':
        return 'rounded-full'
      case 'rect':
        return 'rounded-lg'
      case 'card':
        return 'rounded-xl p-6'
      default:
        return 'rounded'
    }
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  if (variant === 'card') {
    return (
      <div className={`${baseClasses} ${getVariantClasses()} ${className}`} style={style}>
        <div className="space-y-4">
          <div className="skeleton h-6 w-3/4 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-5/6 rounded" />
        </div>
      </div>
    )
  }

  if (variant === 'table') {
    return (
      <div className="space-y-3">
        <div className="skeleton h-12 w-full rounded-lg" />
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton h-16 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="skeleton w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${baseClasses} ${getVariantClasses()} ${className} ${i > 0 ? 'mt-2' : ''}`}
          style={style}
        />
      ))}
    </>
  )
}

// Pre-built skeleton patterns
export function TaskCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <LoadingSkeleton variant="text" width="60%" />
        <LoadingSkeleton variant="circle" width={40} height={40} />
      </div>
      <LoadingSkeleton variant="text" width="100%" count={2} />
      <div className="flex gap-2">
        <LoadingSkeleton variant="rect" width={80} height={24} />
        <LoadingSkeleton variant="rect" width={80} height={24} />
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="40%" height={32} />
        <LoadingSkeleton variant="text" width="60%" />
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingSkeleton key={i} variant="card" height={120} />
        ))}
      </div>
      
      {/* Task List */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

