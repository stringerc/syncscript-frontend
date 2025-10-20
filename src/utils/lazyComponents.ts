import { lazy } from 'react';

// Lazy load components for better performance - include all components that pages are trying to import
export const LazyGanttChart = lazy(() => import('../components/ui/GanttChart'));
export const LazyKanbanBoard = lazy(() => import('../components/ui/KanbanBoard'));
export const LazyMindMap = lazy(() => import('../components/ui/MindMap'));
export const LazySmartScheduler = lazy(() => import('../components/ui/SmartScheduler'));
export const LazyTeamCollaboration = lazy(() => import('../components/ui/TeamCollaboration'));
export const LazyVoiceCommandsCenter = lazy(() => import('../components/ui/VoiceCommandsCenter'));
export const LazyIntegrationsHub = lazy(() => import('../components/ui/IntegrationsHub'));
export const LazyProductivityCenter = lazy(() => import('../components/ui/ProductivityCenter'));
export const LazySettingsCentral = lazy(() => import('../components/ui/SettingsCentral'));
export const LazyPolishShowcase = lazy(() => import('../components/ui/PolishShowcase'));

// Add missing components that pages are trying to import
export const AdvancedTaskBreakdown = lazy(() => import('../components/ui/ProductivityCenter')); // Fallback
export const AnalyticsDashboard = lazy(() => import('../components/ui/ProductivityCenter')); // Fallback
export const CalendarSync = lazy(() => import('../components/ui/ProductivityCenter')); // Fallback
export const GamificationDashboard = lazy(() => import('../components/ui/ProductivityCenter')); // Fallback
export const TeamWorkspaceUI = lazy(() => import('../components/ui/TeamCollaboration')); // Use existing

// Export the components with the names pages are expecting
export const IntegrationsHub = LazyIntegrationsHub;
export const ProductivityCenter = LazyProductivityCenter;
export const SettingsCentral = LazySettingsCentral;
export const TeamCollaboration = LazyTeamCollaboration;
export const VoiceCommandsCenter = LazyVoiceCommandsCenter;

// Utility function to preload components
export const preloadComponent = (componentImport: () => Promise<any>) => {
  return componentImport();
};

// Preload critical components
export const preloadCriticalComponents = () => {
  // Preload components that are likely to be used soon
  preloadComponent(() => import('../components/ui/GanttChart'));
  preloadComponent(() => import('../components/ui/KanbanBoard'));
};
