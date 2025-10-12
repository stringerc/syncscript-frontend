/**
 * Global Notification Manager
 * Centralized notification system
 */

import toast from 'react-hot-toast'

interface NotificationOptions {
  persistent?: boolean
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
}

export function addNotification(
  type: 'success' | 'error' | 'warning' | 'info' | 'critical',
  message: string,
  options: NotificationOptions = {}
) {
  const duration = options.persistent ? Infinity : (options.duration || 4000)

  if (type === 'success') {
    toast.success(message, { duration })
  } else if (type === 'error' || type === 'critical') {
    toast.error(message, { duration })
  } else {
    toast(message, { duration, icon: type === 'warning' ? '⚠️' : 'ℹ️' })
  }
}

export function dismissNotification(id: string) {
  toast.dismiss(id)
}

export function dismissAll() {
  toast.dismiss()
}

