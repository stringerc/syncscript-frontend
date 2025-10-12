/**
 * Lazy Loading Component Registry
 * Improves initial page load by splitting heavy components
 */

import dynamic from 'next/dynamic'

// Core feature hubs (lazy load these heavy components)
export const FeatureHub = dynamic(() => import('@/components/ui/FeatureHub'), {
  ssr: false
})

export const GamificationDashboard = dynamic(() => import('@/components/ui/GamificationDashboard'), {
  ssr: false
})

export const ProductivityCenter = dynamic(() => import('@/components/ui/ProductivityCenter'), { ssr: false })
export const TeamWorkspaceUI = dynamic(() => import('@/components/ui/TeamWorkspaceUI'), { ssr: false })
export const IntegrationsHub = dynamic(() => import('@/components/ui/IntegrationsHub'), { ssr: false })
export const SettingsCentral = dynamic(() => import('@/components/ui/SettingsCentral'), { ssr: false })
export const CalendarSync = dynamic(() => import('@/components/ui/CalendarSync'), { ssr: false })
export const VoiceCommandsCenter = dynamic(() => import('@/components/ui/VoiceCommandsCenter'), { ssr: false })
export const AnalyticsDashboard = dynamic(() => import('@/components/ui/AnalyticsDashboard'), { ssr: false })
export const TeamCollaboration = dynamic(() => import('@/components/ui/TeamCollaboration'), { ssr: false })
export const AdvancedTaskBreakdown = dynamic(() => import('@/components/ui/AdvancedTaskBreakdown'), { ssr: false })
export const SmartScheduler = dynamic(() => import('@/components/ui/SmartScheduler'), { ssr: false })

// Dashboard components - lazy load heavy ones
export const AchievementGallery = dynamic(() => import('@/components/ui/AchievementGallery'))
export const CalendarIntegration = dynamic(() => import('@/components/ui/CalendarIntegration'))
export const TeamDashboard = dynamic(() => import('@/components/ui/TeamDashboard'))
export const AdvancedAnalytics = dynamic(() => import('@/components/ui/AdvancedAnalytics'))
export const KanbanBoard = dynamic(() => import('@/components/ui/KanbanBoard'))
export const GanttChart = dynamic(() => import('@/components/ui/GanttChart'))
export const MindMap = dynamic(() => import('@/components/ui/MindMap'))

