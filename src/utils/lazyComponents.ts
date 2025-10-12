/**
 * Lazy Loading Component Registry
 * Improves initial page load by splitting heavy components
 */

import dynamic from 'next/dynamic'

// Core feature hubs (lazy load these heavy components)
export const FeatureHub = dynamic(() => import('@/components/ui/FeatureHub'), {
  loading: () => <LoadingSpinner message="Loading Feature Hub..." />,
  ssr: false
})

export const GamificationDashboard = dynamic(() => import('@/components/ui/GamificationDashboard'), {
  loading: () => <LoadingSpinner message="Loading Gamification..." />,
  ssr: false
})

export const ProductivityCenter = dynamic(() => import('@/components/ui/ProductivityCenter'), {
  loading: () => <LoadingSpinner message="Loading Productivity Tools..." />,
  ssr: false
})

export const TeamWorkspaceUI = dynamic(() => import('@/components/ui/TeamWorkspaceUI'), {
  loading: () => <LoadingSpinner message="Loading Team Workspace..." />,
  ssr: false
})

export const IntegrationsHub = dynamic(() => import('@/components/ui/IntegrationsHub'), {
  loading: () => <LoadingSpinner message="Loading Integrations..." />,
  ssr: false
})

export const SettingsCentral = dynamic(() => import('@/components/ui/SettingsCentral'), {
  loading: () => <LoadingSpinner message="Loading Settings..." />,
  ssr: false
})

export const CalendarSync = dynamic(() => import('@/components/ui/CalendarSync'), {
  loading: () => <LoadingSpinner message="Loading Calendar Sync..." />,
  ssr: false
})

export const VoiceCommandsCenter = dynamic(() => import('@/components/ui/VoiceCommandsCenter'), {
  loading: () => <LoadingSpinner message="Loading Voice Commands..." />,
  ssr: false
})

export const AnalyticsDashboard = dynamic(() => import('@/components/ui/AnalyticsDashboard'), {
  loading: () => <LoadingSpinner message="Loading Analytics..." />,
  ssr: false
})

export const TeamCollaboration = dynamic(() => import('@/components/ui/TeamCollaboration'), {
  loading: () => <LoadingSpinner message="Loading Team Collaboration..." />,
  ssr: false
})

export const AdvancedTaskBreakdown = dynamic(() => import('@/components/ui/AdvancedTaskBreakdown'), {
  loading: () => <LoadingSpinner message="Loading AI Task Breakdown..." />,
  ssr: false
})

export const SmartScheduler = dynamic(() => import('@/components/ui/SmartScheduler'), {
  loading: () => <LoadingSpinner message="Loading Smart Scheduler..." />,
  ssr: false
})

// Dashboard components - lazy load heavy ones
export const AchievementGallery = dynamic(() => import('@/components/ui/AchievementGallery'), {
  loading: () => <LoadingSpinner message="Loading achievements..." />
})

export const CalendarIntegration = dynamic(() => import('@/components/ui/CalendarIntegration'), {
  loading: () => <LoadingSpinner message="Loading calendar..." />
})

export const TeamDashboard = dynamic(() => import('@/components/ui/TeamDashboard'), {
  loading: () => <LoadingSpinner message="Loading team dashboard..." />
})

export const AdvancedAnalytics = dynamic(() => import('@/components/ui/AdvancedAnalytics'), {
  loading: () => <LoadingSpinner message="Loading analytics..." />
})

export const KanbanBoard = dynamic(() => import('@/components/ui/KanbanBoard'), {
  loading: () => <LoadingSpinner message="Loading kanban..." />
})

export const GanttChart = dynamic(() => import('@/components/ui/GanttChart'), {
  loading: () => <LoadingSpinner message="Loading gantt chart..." />
})

export const MindMap = dynamic(() => import('@/components/ui/MindMap'), {
  loading: () => <LoadingSpinner message="Loading mind map..." />
})

// Loading Spinner Component
function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 font-medium">{message}</p>
    </div>
  )
}

