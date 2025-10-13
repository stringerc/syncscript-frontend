/**
 * Feature Flag Definitions
 * IAOB Infrastructure Component
 */

export enum FeatureFlag {
  // Backend Integration
  BACKEND_INTEGRATION = 'backend_integration',
  TASK_PERSISTENCE = 'task_persistence',
  PROJECT_PERSISTENCE = 'project_persistence',
  ENERGY_TRACKING = 'energy_tracking',
  
  // Real-time
  REALTIME_SYNC = 'realtime_sync',
  WEBSOCKET_CONNECTION = 'websocket_connection',
  
  // AI Features
  AI_SUGGESTIONS = 'ai_suggestions',
  AI_COACH = 'ai_coach',
  
  // Advanced
  TEAM_WORKSPACES = 'team_workspaces',
  CALENDAR_INTEGRATION = 'calendar_integration',
  BUDGET_TRACKING = 'budget_tracking',
}

export const defaultFlags: Record<FeatureFlag, boolean> = {
  [FeatureFlag.BACKEND_INTEGRATION]: false,
  [FeatureFlag.TASK_PERSISTENCE]: false,
  [FeatureFlag.PROJECT_PERSISTENCE]: false,
  [FeatureFlag.ENERGY_TRACKING]: false,
  [FeatureFlag.REALTIME_SYNC]: false,
  [FeatureFlag.WEBSOCKET_CONNECTION]: false,
  [FeatureFlag.AI_SUGGESTIONS]: false,
  [FeatureFlag.AI_COACH]: false,
  [FeatureFlag.TEAM_WORKSPACES]: false,
  [FeatureFlag.CALENDAR_INTEGRATION]: false,
  [FeatureFlag.BUDGET_TRACKING]: true, // Already built
};

