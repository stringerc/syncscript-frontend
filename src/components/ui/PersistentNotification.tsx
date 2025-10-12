'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info' | 'critical'
  title: string
  message: string
  persistent?: boolean
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
}

interface PersistentNotificationProps {
  notification: Notification
  onDismiss: (id: string) => void
}

export function PersistentNotification({ notification, onDismiss }: PersistentNotificationProps) {
  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return {
          bg: 'from-green-500 to-emerald-600',
          icon: '✅',
          borderColor: 'border-green-600'
        }
      case 'error':
        return {
          bg: 'from-red-500 to-pink-600',
          icon: '❌',
          borderColor: 'border-red-600'
        }
      case 'warning':
        return {
          bg: 'from-yellow-500 to-orange-600',
          icon: '⚠️',
          borderColor: 'border-yellow-600'
        }
      case 'critical':
        return {
          bg: 'from-red-600 to-red-700',
          icon: '🚨',
          borderColor: 'border-red-700'
        }
      default:
        return {
          bg: 'from-blue-500 to-cyan-600',
          icon: 'ℹ️',
          borderColor: 'border-blue-600'
        }
    }
  }

  const styles = getStyles()

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border-l-4 ${styles.borderColor} max-w-md w-full`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${styles.bg} flex items-center justify-center text-xl flex-shrink-0`}>
            {styles.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
              {notification.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {notification.message}
            </p>
            
            {notification.action && (
              <button
                onClick={notification.action.onClick}
                className="mt-3 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline"
              >
                {notification.action.label} →
              </button>
            )}
          </div>
          
          {!notification.persistent && (
            <button
              onClick={() => onDismiss(notification.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {notification.persistent && (
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 text-xs text-gray-600 dark:text-gray-400">
          ⚠️ Action required - this notification will persist until addressed
        </div>
      )}
    </motion.div>
  )
}

// Notification Manager Component
export function NotificationManager() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`
    }
    setNotifications([...notifications, newNotification])

    // Auto-dismiss non-persistent notifications after 5 seconds
    if (!notification.persistent) {
      setTimeout(() => {
        dismissNotification(newNotification.id)
      }, 5000)
    }
  }

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <div className="fixed top-6 right-6 z-[1600] space-y-3 pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence>
          {notifications.map((notification) => (
            <div key={notification.id} className="mb-3">
              <PersistentNotification
                notification={notification}
                onDismiss={dismissNotification}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Export manager instance
export { addNotification, dismissNotification } from './notificationManager'

