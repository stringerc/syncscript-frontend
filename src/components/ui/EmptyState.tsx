'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  variant?: 'empty' | 'loading' | 'error' | 'success'
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'empty'
}: EmptyStateProps) {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'loading': return '⏳'
      case 'error': return '❌'
      case 'success': return '✅'
      default: return icon || '📭'
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'loading':
        return {
          iconBg: 'from-blue-500 to-cyan-500',
          textColor: 'text-blue-600 dark:text-blue-400'
        }
      case 'error':
        return {
          iconBg: 'from-red-500 to-pink-500',
          textColor: 'text-red-600 dark:text-red-400'
        }
      case 'success':
        return {
          iconBg: 'from-green-500 to-emerald-500',
          textColor: 'text-green-600 dark:text-green-400'
        }
      default:
        return {
          iconBg: 'from-gray-400 to-gray-500',
          textColor: 'text-gray-600 dark:text-gray-400'
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {/* Icon */}
      <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${styles.iconBg} flex items-center justify-center text-5xl text-white mb-6 shadow-lg ${
        variant === 'loading' ? 'animate-pulse' : ''
      }`}>
        {getDefaultIcon()}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 max-w-md">
        {title}
      </h3>

      {/* Description */}
      <p className={`${styles.textColor} mb-8 max-w-md`}>
        {description}
      </p>

      {/* Action Button */}
      {actionLabel && onAction && variant !== 'loading' && (
        <button
          onClick={onAction}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  )
}

// Pre-built common empty states
export function EmptyTasks() {
  return (
    <EmptyState
      icon="✅"
      title="No tasks yet"
      description="Create your first task to get started with SyncScript"
      actionLabel="Create Task"
      onAction={() => console.log('Create task clicked')}
    />
  )
}

export function EmptyProjects() {
  return (
    <EmptyState
      icon="📁"
      title="No projects yet"
      description="Organize your tasks by creating a project"
      actionLabel="Create Project"
      onAction={() => console.log('Create project clicked')}
    />
  )
}

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <EmptyState
      variant="loading"
      title={message}
      description="Please wait while we fetch your data"
    />
  )
}

export function ErrorState({ 
  message = 'Something went wrong',
  onRetry
}: { 
  message?: string
  onRetry?: () => void
}) {
  return (
    <EmptyState
      variant="error"
      title="Oops!"
      description={message}
      actionLabel="Try Again"
      onAction={onRetry}
    />
  )
}

export function SuccessState({ message }: { message: string }) {
  return (
    <EmptyState
      variant="success"
      title="Success!"
      description={message}
    />
  )
}

