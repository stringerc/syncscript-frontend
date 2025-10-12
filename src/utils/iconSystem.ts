/**
 * Icon Consistency System
 * Standardized icon set and usage patterns
 */

export interface IconConfig {
  emoji: string
  label: string
  category: string
  variants?: {
    filled?: string
    outlined?: string
    colored?: string
  }
}

// Standardized icon library
export const ICONS = {
  // Actions
  create: { emoji: '➕', label: 'Create', category: 'actions' },
  edit: { emoji: '✏️', label: 'Edit', category: 'actions' },
  delete: { emoji: '🗑️', label: 'Delete', category: 'actions' },
  save: { emoji: '💾', label: 'Save', category: 'actions' },
  cancel: { emoji: '✕', label: 'Cancel', category: 'actions' },
  confirm: { emoji: '✓', label: 'Confirm', category: 'actions' },
  refresh: { emoji: '🔄', label: 'Refresh', category: 'actions' },
  search: { emoji: '🔍', label: 'Search', category: 'actions' },
  filter: { emoji: '🔽', label: 'Filter', category: 'actions' },
  sort: { emoji: '⇅', label: 'Sort', category: 'actions' },
  
  // Status
  success: { emoji: '✅', label: 'Success', category: 'status' },
  error: { emoji: '❌', label: 'Error', category: 'status' },
  warning: { emoji: '⚠️', label: 'Warning', category: 'status' },
  info: { emoji: 'ℹ️', label: 'Info', category: 'status' },
  pending: { emoji: '⏳', label: 'Pending', category: 'status' },
  complete: { emoji: '🎉', label: 'Complete', category: 'status' },
  
  // Navigation
  home: { emoji: '🏠', label: 'Home', category: 'navigation' },
  back: { emoji: '←', label: 'Back', category: 'navigation' },
  forward: { emoji: '→', label: 'Forward', category: 'navigation' },
  up: { emoji: '↑', label: 'Up', category: 'navigation' },
  down: { emoji: '↓', label: 'Down', category: 'navigation' },
  menu: { emoji: '☰', label: 'Menu', category: 'navigation' },
  close: { emoji: '✕', label: 'Close', category: 'navigation' },
  
  // Features
  task: { emoji: '✓', label: 'Task', category: 'features' },
  project: { emoji: '📁', label: 'Project', category: 'features' },
  calendar: { emoji: '📅', label: 'Calendar', category: 'features' },
  analytics: { emoji: '📊', label: 'Analytics', category: 'features' },
  team: { emoji: '👥', label: 'Team', category: 'features' },
  settings: { emoji: '⚙️', label: 'Settings', category: 'features' },
  notifications: { emoji: '🔔', label: 'Notifications', category: 'features' },
  
  // Productivity
  energy: { emoji: '⚡', label: 'Energy', category: 'productivity' },
  focus: { emoji: '🎯', label: 'Focus', category: 'productivity' },
  timer: { emoji: '⏱️', label: 'Timer', category: 'productivity' },
  streak: { emoji: '🔥', label: 'Streak', category: 'productivity' },
  achievement: { emoji: '🏆', label: 'Achievement', category: 'productivity' },
  goal: { emoji: '🎯', label: 'Goal', category: 'productivity' },
  
  // AI & Intelligence
  ai: { emoji: '🤖', label: 'AI', category: 'intelligence' },
  brain: { emoji: '🧠', label: 'Smart', category: 'intelligence' },
  lightbulb: { emoji: '💡', label: 'Insight', category: 'intelligence' },
  magic: { emoji: '✨', label: 'Magic', category: 'intelligence' },
  
  // Communication
  chat: { emoji: '💬', label: 'Chat', category: 'communication' },
  voice: { emoji: '🎤', label: 'Voice', category: 'communication' },
  email: { emoji: '📧', label: 'Email', category: 'communication' },
  share: { emoji: '🔗', label: 'Share', category: 'communication' },
  
  // Data & Files
  file: { emoji: '📄', label: 'File', category: 'data' },
  folder: { emoji: '📁', label: 'Folder', category: 'data' },
  download: { emoji: '⬇️', label: 'Download', category: 'data' },
  upload: { emoji: '⬆️', label: 'Upload', category: 'data' },
  attachment: { emoji: '📎', label: 'Attachment', category: 'data' },
  
  // Priority & Urgency
  urgent: { emoji: '🔴', label: 'Urgent', category: 'priority' },
  high: { emoji: '🟠', label: 'High', category: 'priority' },
  medium: { emoji: '🟡', label: 'Medium', category: 'priority' },
  low: { emoji: '🟢', label: 'Low', category: 'priority' },
  
  // Time & Schedule
  clock: { emoji: '🕐', label: 'Time', category: 'time' },
  deadline: { emoji: '⏰', label: 'Deadline', category: 'time' },
  schedule: { emoji: '📅', label: 'Schedule', category: 'time' },
  recurring: { emoji: '🔁', label: 'Recurring', category: 'time' },
  
  // Integrations
  google: { emoji: '🔷', label: 'Google', category: 'integrations' },
  slack: { emoji: '💬', label: 'Slack', category: 'integrations' },
  github: { emoji: '🐙', label: 'GitHub', category: 'integrations' },
  notion: { emoji: '📓', label: 'Notion', category: 'integrations' }
} as const

// Icon size presets
export const ICON_SIZES = {
  xs: 'text-sm',      // 14px
  sm: 'text-base',    // 16px
  md: 'text-xl',      // 20px
  lg: 'text-2xl',     // 24px
  xl: 'text-4xl',     // 36px
  '2xl': 'text-6xl'   // 60px
} as const

// Icon wrapper component
export function getIconClasses(size: keyof typeof ICON_SIZES = 'md', className?: string): string {
  return `inline-flex items-center justify-center ${ICON_SIZES[size]} ${className || ''}`
}

// Icon categories for organization
export const ICON_CATEGORIES = {
  actions: 'Action Icons',
  status: 'Status Indicators',
  navigation: 'Navigation Icons',
  features: 'Feature Icons',
  productivity: 'Productivity Icons',
  intelligence: 'AI & Intelligence',
  communication: 'Communication Icons',
  data: 'Data & Files',
  priority: 'Priority Levels',
  time: 'Time & Schedule',
  integrations: 'Third-party Integrations'
} as const

// Helper to get icon by name
export function getIcon(name: keyof typeof ICONS): string {
  return ICONS[name]?.emoji || '❓'
}

// Helper to get icon with label
export function getIconWithLabel(name: keyof typeof ICONS): { emoji: string; label: string } {
  return {
    emoji: ICONS[name]?.emoji || '❓',
    label: ICONS[name]?.label || 'Unknown'
  }
}

// Get all icons in a category
export function getIconsByCategory(category: string): Array<{ key: string; emoji: string; label: string }> {
  return Object.entries(ICONS)
    .filter(([_, icon]) => icon.category === category)
    .map(([key, icon]) => ({
      key,
      emoji: icon.emoji,
      label: icon.label
    }))
}

