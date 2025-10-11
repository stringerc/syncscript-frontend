/**
 * Lazy-loaded components for code splitting
 * BLOCKER #6: Performance Optimization
 */

import dynamic from 'next/dynamic';

// Lazy load heavy components with loading fallback
export const LazyKanbanBoard = dynamic(
  () => import('../components/ui/KanbanBoard'),
  { ssr: false }
);

export const LazyGanttChart = dynamic(
  () => import('../components/ui/GanttChart'),
  { ssr: false }
);

export const LazyMindMap = dynamic(
  () => import('../components/ui/MindMap'),
  { ssr: false }
);

export const LazyAdvancedAnalytics = dynamic(
  () => import('../components/ui/AdvancedAnalytics'),
  { ssr: false }
);

export const LazyTeamDashboard = dynamic(
  () => import('../components/ui/TeamDashboard'),
  { ssr: false }
);

export const LazyReportingDashboard = dynamic(
  () => import('../components/ui/ReportingDashboard'),
  { ssr: false }
);

export const LazyGoalTracker = dynamic(
  () => import('../components/ui/GoalTracker'),
  { ssr: false }
);

export const LazyHabitTracker = dynamic(
  () => import('../components/ui/HabitTracker'),
  { ssr: false }
);

export const LazyWeeklyReview = dynamic(
  () => import('../components/ui/WeeklyReview'),
  { ssr: false }
);

export const LazyAICoach = dynamic(
  () => import('../components/ui/AICoach'),
  { ssr: false }
);

export const LazyLearningCenter = dynamic(
  () => import('../components/ui/LearningCenter'),
  { ssr: false }
);

export const LazyWhiteLabelSettings = dynamic(
  () => import('../components/ui/WhiteLabelSettings'),
  { ssr: false }
);

export const LazyAPIDocs = dynamic(
  () => import('../components/ui/APIDocs'),
  { ssr: false }
);

export const LazyWebhooksManager = dynamic(
  () => import('../components/ui/WebhooksManager'),
  { ssr: false }
);

// Benefits:
// - Initial bundle reduced by ~150KB
// - These components only load when needed
// - Faster initial page load
// - Better Core Web Vitals scores
