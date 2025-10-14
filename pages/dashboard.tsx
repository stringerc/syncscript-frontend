import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import EnergySelector from '../src/components/ui/EnergySelector';
import TaskCard from '../src/components/ui/TaskCard';
import CreateTaskModal, { NewTaskData } from '../src/components/ui/CreateTaskModal';
import EnergyInsights from '../src/components/ui/EnergyInsights';
import UserStats from '../src/components/ui/UserStats';
import ProjectCard from '../src/components/ui/ProjectCard';
import CreateProjectModal from '../src/components/ui/CreateProjectModal';
import EditTaskModal from '../src/components/ui/EditTaskModal';
import TaskFilter from '../src/components/ui/TaskFilter';
import TaskSearch, { SortOption } from '../src/components/ui/TaskSearch';
import KeyboardHint from '../src/components/ui/KeyboardHint';
import StreakCounter from '../src/components/ui/StreakCounter';
import SaveTemplateModal from '../src/components/ui/SaveTemplateModal';
import TemplateLibrary from '../src/components/ui/TemplateLibrary';
import BulkActionToolbar from '../src/components/ui/BulkActionToolbar';
import FocusTimer from '../src/components/ui/FocusTimer';
import AdvancedAnalytics from '../src/components/ui/AdvancedAnalytics';
import ThemeSettings from '../src/components/ui/ThemeSettings';
import NotificationCenter from '../src/components/ui/NotificationCenter';
import InstallPWA from '../src/components/ui/InstallPWA';
import SmartSuggestions from '../src/components/ui/SmartSuggestions';
import AchievementGallery from '../src/components/ui/AchievementGallery';
import AchievementUnlockNotification from '../src/components/ui/AchievementUnlockNotification';
import DailyChallenges from '../src/components/ui/DailyChallenges';
import CalendarIntegration from '../src/components/ui/CalendarIntegration';
import TeamDashboard from '../src/components/ui/TeamDashboard';
import TeamInvitation from '../src/components/ui/TeamInvitation';
import APIDocs from '../src/components/ui/APIDocs';
import WebhooksManager from '../src/components/ui/WebhooksManager';
import LearningCenter from '../src/components/ui/LearningCenter';
import WhiteLabelSettings from '../src/components/ui/WhiteLabelSettings';
import MobileAppPromo from '../src/components/ui/MobileAppPromo';
import DesktopAppPromo from '../src/components/ui/DesktopAppPromo';
import UnifiedCommandCenter from '../src/components/ui/UnifiedCommandCenter';
import FloatingActionButton from '../src/components/ui/FloatingActionButton';
import QuickSwitcher from '../src/components/ui/QuickSwitcher';
import CompactHeader from '../src/components/ui/CompactHeader';
import ViewSwitcher, { ViewMode } from '../src/components/ui/ViewSwitcher';
import EnhancedWelcomeTour from '../src/components/ui/EnhancedWelcomeTour';
import FeatureUsageAnalytics from '../src/components/ui/FeatureUsageAnalytics';
import KanbanBoard from '../src/components/ui/KanbanBoard';
import GanttChart from '../src/components/ui/GanttChart';
import MindMap from '../src/components/ui/MindMap';
import EisenhowerMatrix from '../src/components/ui/EisenhowerMatrix';
import GoalTracker from '../src/components/ui/GoalTracker';
import HabitTracker from '../src/components/ui/HabitTracker';
import WeeklyReview from '../src/components/ui/WeeklyReview';
import TimeBlocking from '../src/components/ui/TimeBlocking';
import AICoach from '../src/components/ui/AICoach';
import ReportingDashboard from '../src/components/ui/ReportingDashboard';
import BudgetTracker from '../src/components/ui/BudgetTracker';
import BudgetSettings from '../src/components/ui/BudgetSettings';
import SavingsGoalsManager from '../src/components/ui/SavingsGoalsManager';
import DiscoveryTipBanner from '../src/components/ui/DiscoveryTipBanner';
import AISafetyControls from '../src/components/ui/AISafetyControls';
import EnergyAnalyticsDashboard from '../src/components/ui/EnergyAnalyticsDashboard';
import BudgetAnalyticsDashboard from '../src/components/ui/BudgetAnalyticsDashboard';
import ClientPortal from '../src/components/ui/ClientPortal';
import TeamChat from '../src/components/ui/TeamChat';
import FocusRooms from '../src/components/ui/FocusRooms';
import WorkloadBalancer from '../src/components/ui/WorkloadBalancer';
import DocumentScanner from '../src/components/ui/DocumentScanner';
import MeetingNotes from '../src/components/ui/MeetingNotes';
import Automations from '../src/components/ui/Automations';
import VoiceCommands from '../src/components/ui/VoiceCommands';
import PomodoroPlus from '../src/components/ui/PomodoroPlus';
import AdvancedSearch from '../src/components/ui/AdvancedSearch';
import EmailSettings from '../src/components/ui/EmailSettings';
import ShortcutsPanel from '../src/components/ui/ShortcutsPanel';
import DataExport from '../src/components/ui/DataExport';
import AIQuickCreate from '../src/components/ui/AIQuickCreate';
import TimeTracker from '../src/components/ui/TimeTracker';
import TemplatesGallery from '../src/components/ui/TemplatesGallery';
import TaskSharing from '../src/components/ui/TaskSharing';
import DailyPlanning from '../src/components/ui/DailyPlanning';
import IntegrationHub from '../src/components/ui/IntegrationHub';
import TaskComments from '../src/components/ui/TaskComments';
import Onboarding from '../src/components/ui/Onboarding';
import VoiceToTask from '../src/components/ui/VoiceToTask';
import QuickCapture from '../src/components/ui/QuickCapture';
import { useAuthenticatedFetch } from '../src/hooks/useAuthenticatedFetch';
import { useNotifications } from '../src/hooks/useNotifications';
import { useAchievements } from '../src/hooks/useAchievements';
import { TaskTemplate, createTaskFromTemplate } from '../src/utils/templateUtils';
import { useKeyboardShortcuts } from '../src/hooks/useKeyboardShortcuts';
import { updateLoginStreak, updateCompletionStreak, getStreakData, checkNewMilestone } from '../src/utils/streakUtils';
import { Tag } from '../src/utils/tagUtils';
import { Subtask } from '../src/utils/subtaskUtils';
import { TaskNote } from '../src/utils/noteUtils';
import { RecurrenceConfig, calculateNextDueDate, shouldEndRecurrence } from '../src/utils/recurrenceUtils';
import { checkQuickWins, saveQuickWinPoints } from '../src/utils/quickWinBadges';
import { recalibrateEnergy, isEnergyMatched, formatEnergyDelta, getEnergyLabel } from '../src/utils/energyRecalibration';
import { calculateEmblemCharge, EmblemBreakdown } from '../src/utils/emblemCalculation';
import EmblemBreakdownModal from '../src/components/ui/EmblemBreakdownModal';
import { DataPersistence } from '../src/utils/dataPersistence';
import { useBriefingManager } from '../src/hooks/useBriefingManager';
import MorningBrief from '../src/components/briefings/MorningBrief';
import EveningBrief from '../src/components/briefings/EveningBrief';
import BriefingSettings from '../src/components/briefings/BriefingSettings';
import { analytics } from '../src/utils/analytics';
import { generateTaskSuggestionExplanation, generateEnergyRecommendationExplanation } from '../src/utils/aiExplainability';
import { calculateEmblemBreakdown, getEmblemAnimation } from '../src/utils/enhancedEmblemSystem';
import { userTestingProgram } from '../src/utils/userTestingProgram';
import BetaRegistration from '../src/components/beta/BetaRegistration';
import FeedbackCollector from '../src/components/beta/FeedbackCollector';
import AnalyticsDashboard from '../src/components/analytics/AnalyticsDashboard';
import BudgetIntelligence from '../src/components/budget/BudgetIntelligence';

// Import new Phase 3 components
import CustomWorkspaceLayout from '../src/components/workspace/CustomWorkspaceLayout';
import AdvancedIntegrationsHub from '../src/components/integrations/AdvancedIntegrationsHub';
import MobileAppFoundation from '../src/components/mobile/MobileAppFoundation';
import ApiV2Release from '../src/components/api/ApiV2Release';
import WhiteLabelSystem from '../src/components/whitelabel/WhiteLabelSystem';

// Import Enterprise Security components
import EnterpriseSSOSystem from '../src/components/enterprise/EnterpriseSSOSystem';
import RoleBasedAccessControl from '../src/components/enterprise/RoleBasedAccessControl';
import EnterpriseAdminDashboard from '../src/components/enterprise/EnterpriseAdminDashboard';
import SecurityAuditLogging from '../src/components/enterprise/SecurityAuditLogging';

// Import Team Collaboration components
import TeamCreationSystem from '../src/components/teams/TeamCreationSystem';
import WorkspaceIsolationSystem from '../src/components/teams/WorkspaceIsolationSystem';
import TeamMemberManagement from '../src/components/teams/TeamMemberManagement';
import CollaborativeProjectManagement from '../src/components/teams/CollaborativeProjectManagement';
import TeamAnalyticsDashboard from '../src/components/teams/TeamAnalyticsDashboard';

// Import Payment & Monetization components
import StripePaymentIntegration from '../src/components/payments/StripePaymentIntegration';
import SubscriptionManagement from '../src/components/payments/SubscriptionManagement';
import RevenueAnalytics from '../src/components/payments/RevenueAnalytics';

// Import Real-Time Collaboration components
import WebSocketIntegration from '../src/components/realtime/WebSocketIntegration';
import LivePresenceSystem from '../src/components/realtime/LivePresenceSystem';
import RealTimeUpdatesSystem from '../src/components/realtime/RealTimeUpdatesSystem';
import InstantNotificationsSystem from '../src/components/realtime/InstantNotificationsSystem';

// Import Mobile Optimization components
import PWAFoundation from '../src/components/mobile/PWAFoundation';
import OfflineFirstArchitecture from '../src/components/mobile/OfflineFirstArchitecture';
import TouchGesturesSystem from '../src/components/mobile/TouchGesturesSystem';
import MobilePushNotifications from '../src/components/mobile/MobilePushNotifications';

// Import Advanced Integrations components
import ThirdPartyIntegrationsHub from '../src/components/integrations/ThirdPartyIntegrationsHub';
import APIMarketplace from '../src/components/integrations/APIMarketplace';
import WebhookSystem from '../src/components/integrations/WebhookSystem';
import SyncScriptSDK from '../src/components/integrations/SyncScriptSDK';

// Import Enterprise Features components
import AdvancedEnterpriseSecurity from '../src/components/enterprise/AdvancedEnterpriseSecurity';
import AdvancedAnalyticsReporting from '../src/components/enterprise/AdvancedAnalyticsReporting';
import WhiteLabelSolutions from '../src/components/enterprise/WhiteLabelSolutions';

// Import AI Features components
import AIProductivityAssistant from '../src/components/ai/AIProductivityAssistant';
import IntelligentAutomationEngine from '../src/components/ai/IntelligentAutomationEngine';
import PredictiveAnalyticsInsights from '../src/components/ai/PredictiveAnalyticsInsights';
import AIContentGeneration from '../src/components/ai/AIContentGeneration';

// Import Mobile Features components
import ReactNativeMobileAppFoundation from '../src/components/mobile/ReactNativeMobileAppFoundation';
import OfflineSynchronizationSystem from '../src/components/mobile/OfflineSynchronizationSystem';
import MobileSpecificFeatures from '../src/components/mobile/MobileSpecificFeatures';
import CrossPlatformSync from '../src/components/mobile/CrossPlatformSync';

// Import Global Features components
import MultiLanguageSupport from '../src/components/global/MultiLanguageSupport';
import TimeZoneManagement from '../src/components/global/TimeZoneManagement';
import CurrencySupport from '../src/components/global/CurrencySupport';
import RegionalCompliance from '../src/components/global/RegionalCompliance';

// Import Gamification Features components
import AchievementSystem from '../src/components/gamification/AchievementSystem';
import LeaderboardsSystem from '../src/components/gamification/LeaderboardsSystem';
import VirtualRewardsSystem from '../src/components/gamification/VirtualRewardsSystem';
import SocialFeatures from '../src/components/gamification/SocialFeatures';
import GamingElements from '../src/components/gamification/GamingElements';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_requirement: 1 | 2 | 3 | 4 | 5;
  completed: boolean;
  points: number;
  created_at: string;
  due_date?: string;
  estimated_duration?: number;
  project_id?: string;
  project?: {
    id: string;
    name: string;
    color: string;
  };
  tags?: Tag[];
  subtasks?: Subtask[];
  notes?: TaskNote[];
  recurrence?: RecurrenceConfig;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
  archived: boolean;
}

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const authenticatedFetch = useAuthenticatedFetch();
  
  const [currentEnergy, setCurrentEnergy] = React.useState(() => DataPersistence.loadCurrentEnergy());
  const [lastEnergyLogTime, setLastEnergyLogTime] = React.useState<number>(() => DataPersistence.loadLastEnergyLogTime());
  const [tasks, setTasks] = React.useState<Task[]>(() => DataPersistence.loadTasks());
  const [projects, setProjects] = React.useState<Project[]>(() => DataPersistence.loadProjects());
  const [energyLogs, setEnergyLogs] = React.useState<Array<{ level: number; timestamp: string }>>(() => DataPersistence.loadEnergyLogs());
  const [userPoints, setUserPoints] = React.useState(() => DataPersistence.loadUserPoints());
  const [userLevel, setUserLevel] = React.useState(() => DataPersistence.loadUserLevel());
  const [focusSessionsCount, setFocusSessionsCount] = React.useState(() => DataPersistence.loadFocusSessions());
  const [totalFocusMinutes, setTotalFocusMinutes] = React.useState(() => DataPersistence.loadTotalFocusMinutes());
  const [streakData, setStreakData] = React.useState(() => DataPersistence.loadStreakData() || getStreakData());
  const [loading, setLoading] = React.useState(false);

  // Briefing System Integration
  const {
    settings: briefingSettings,
    updateSettings: updateBriefingSettings,
    morningBrief,
    eveningBrief,
    generateMorningBrief,
    generateEveningBrief,
    showMorningBrief,
    showEveningBrief,
    showBriefingSettings,
    setShowMorningBrief,
    setShowEveningBrief,
    setShowBriefingSettings,
    markBriefViewed,
    carryOverTasks,
    rescheduleTasks,
    addReflection,
    isLoading: briefingLoading,
    error: briefingError
  } = useBriefingManager({ 
    userId: user?.sub || 'anonymous',
    onError: (error) => console.error('Briefing error:', error)
  });

  // User Testing Program State
  const [showBetaRegistration, setShowBetaRegistration] = React.useState(false);
  const [showFeedbackCollector, setShowFeedbackCollector] = React.useState(false);
  const [currentFeedbackFeature, setCurrentFeedbackFeature] = React.useState<string>('');
  const [betaUserStatus, setBetaUserStatus] = React.useState<any>(null);

  // Phase 2 Enhanced Features State
  const [showAnalyticsDashboard, setShowAnalyticsDashboard] = React.useState(false);
  const [showBudgetIntelligence, setShowBudgetIntelligence] = React.useState(false);

  // Phase 3 Advanced Features State
  const [showCustomWorkspace, setShowCustomWorkspace] = React.useState(false);
  const [showMobileFoundation, setShowMobileFoundation] = React.useState(false);
  const [showApiV2Release, setShowApiV2Release] = React.useState(false);
  const [showWhiteLabelSystem, setShowWhiteLabelSystem] = React.useState(false);

  // Enterprise Security Features State
  const [showEnterpriseSSO, setShowEnterpriseSSO] = React.useState(false);
  const [showRBAC, setShowRBAC] = React.useState(false);
  const [showSecurityAudit, setShowSecurityAudit] = React.useState(false);

  // Team Collaboration Features State
  const [showTeamCreation, setShowTeamCreation] = React.useState(false);
  const [showWorkspaceIsolation, setShowWorkspaceIsolation] = React.useState(false);
  const [showTeamMemberManagement, setShowTeamMemberManagement] = React.useState(false);
  const [showCollaborativeProjects, setShowCollaborativeProjects] = React.useState(false);
  const [showTeamAnalytics, setShowTeamAnalytics] = React.useState(false);

  // Payment & Monetization Features State
  const [showStripePayment, setShowStripePayment] = React.useState(false);
  const [showSubscriptionManagement, setShowSubscriptionManagement] = React.useState(false);
  const [showRevenueAnalytics, setShowRevenueAnalytics] = React.useState(false);

  // Real-Time Collaboration Features State
  const [showWebSocketIntegration, setShowWebSocketIntegration] = React.useState(false);
  const [showLivePresence, setShowLivePresence] = React.useState(false);
  const [showRealTimeUpdates, setShowRealTimeUpdates] = React.useState(false);
  const [showInstantNotifications, setShowInstantNotifications] = React.useState(false);

  // Mobile Optimization Features State
  const [showPWAFoundation, setShowPWAFoundation] = React.useState(false);
  const [showOfflineArchitecture, setShowOfflineArchitecture] = React.useState(false);
  const [showTouchGestures, setShowTouchGestures] = React.useState(false);
  const [showMobilePush, setShowMobilePush] = React.useState(false);

  // Advanced Integrations Features State
  const [showIntegrationsHub, setShowIntegrationsHub] = React.useState(false);
  const [showAPIMarketplace, setShowAPIMarketplace] = React.useState(false);
  const [showWebhookSystem, setShowWebhookSystem] = React.useState(false);
  const [showSyncScriptSDK, setShowSyncScriptSDK] = React.useState(false);

  // Enterprise Features State
  const [showEnterpriseSecurity, setShowEnterpriseSecurity] = React.useState(false);
  const [showEnterpriseAdmin, setShowEnterpriseAdmin] = React.useState(false);
  const [showEnterpriseAnalytics, setShowEnterpriseAnalytics] = React.useState(false);
  const [showWhiteLabelSolutions, setShowWhiteLabelSolutions] = React.useState(false);

  // AI Features State
  const [showAIProductivityAssistant, setShowAIProductivityAssistant] = React.useState(false);
  const [showIntelligentAutomation, setShowIntelligentAutomation] = React.useState(false);
  const [showPredictiveAnalytics, setShowPredictiveAnalytics] = React.useState(false);
  const [showAIContentGeneration, setShowAIContentGeneration] = React.useState(false);

  // Mobile Features State
  const [showMobileAppFoundation, setShowMobileAppFoundation] = React.useState(false);
  const [showOfflineSync, setShowOfflineSync] = React.useState(false);
  const [showMobileSpecificFeatures, setShowMobileSpecificFeatures] = React.useState(false);
  const [showCrossPlatformSync, setShowCrossPlatformSync] = React.useState(false);

  // Global Features State
  const [showMultiLanguageSupport, setShowMultiLanguageSupport] = React.useState(false);
  const [showTimeZoneManagement, setShowTimeZoneManagement] = React.useState(false);
  const [showCurrencySupport, setShowCurrencySupport] = React.useState(false);
  const [showRegionalCompliance, setShowRegionalCompliance] = React.useState(false);

  // Gamification Features State
  const [showAchievementSystem, setShowAchievementSystem] = React.useState(false);
  const [showLeaderboardsSystem, setShowLeaderboardsSystem] = React.useState(false);
  const [showVirtualRewardsSystem, setShowVirtualRewardsSystem] = React.useState(false);
  const [showSocialFeatures, setShowSocialFeatures] = React.useState(false);
  const [showGamingElements, setShowGamingElements] = React.useState(false);

  // Initialize Analytics
  React.useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        // Initialize PostHog analytics
        await analytics.initialize(
          process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc-demo-key',
          user?.sub
        );
        
        // Identify user
        if (user?.sub) {
          analytics.identifyUser(user.sub, {
            userId: user.sub,
            email: user.email,
            name: user.name,
            signupDate: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            energyLevel: currentEnergy,
            taskCount: tasks.length,
            productivityScore: 0 // Will be calculated
          });
        }
        
        // Track page view
        analytics.trackPageView('Dashboard');
        
        // Track session start
        analytics.trackSessionStart();
        
        console.log('✅ Analytics initialized successfully');
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    };
    
    initializeAnalytics();
  }, [user, currentEnergy, tasks.length]);

  // Check Beta User Status
  React.useEffect(() => {
    if (user?.sub) {
      const status = userTestingProgram.getBetaUserStatus(user.sub);
      setBetaUserStatus(status);
    }
  }, [user]);

  // Debug briefing system
  React.useEffect(() => {
    console.log('🔍 Briefing System Debug:', {
      briefingSettings,
      morningBrief,
      eveningBrief,
      showMorningBrief,
      showEveningBrief,
      showBriefingSettings,
      briefingLoading,
      briefingError
    });
  }, [briefingSettings, morningBrief, eveningBrief, showMorningBrief, showEveningBrief, showBriefingSettings, briefingLoading, briefingError]);

  // Auto-save data to localStorage whenever state changes
  React.useEffect(() => {
    DataPersistence.saveTasks(tasks);
  }, [tasks]);

  React.useEffect(() => {
    DataPersistence.saveProjects(projects);
  }, [projects]);

  React.useEffect(() => {
    DataPersistence.saveUserPoints(userPoints);
  }, [userPoints]);

  React.useEffect(() => {
    DataPersistence.saveUserLevel(userLevel);
  }, [userLevel]);

  React.useEffect(() => {
    DataPersistence.saveCurrentEnergy(currentEnergy);
  }, [currentEnergy]);

  React.useEffect(() => {
    DataPersistence.saveEnergyLogs(energyLogs);
  }, [energyLogs]);

  React.useEffect(() => {
    DataPersistence.saveLastEnergyLogTime(lastEnergyLogTime);
  }, [lastEnergyLogTime]);

  React.useEffect(() => {
    DataPersistence.saveFocusSessions(focusSessionsCount);
  }, [focusSessionsCount]);

  React.useEffect(() => {
    DataPersistence.saveTotalFocusMinutes(totalFocusMinutes);
  }, [totalFocusMinutes]);

  React.useEffect(() => {
    if (streakData) {
      DataPersistence.saveStreakData(streakData);
    }
  }, [streakData]);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [filterProjectId, setFilterProjectId] = React.useState<string | null>(null);
  const [filterTag, setFilterTag] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState<SortOption>('energy_match');
  const [showMilestoneConfetti, setShowMilestoneConfetti] = React.useState(false);
  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = React.useState(false);
  const [templateTaskData, setTemplateTaskData] = React.useState<{
    title: string;
    description?: string;
    priority: 1 | 2 | 3 | 4 | 5;
    energy_requirement: 1 | 2 | 3 | 4 | 5;
    estimated_duration?: number;
    project_id?: string;
    tags?: Tag[];
  } | null>(null);
  const [templateRefresh, setTemplateRefresh] = React.useState(0);
  const [selectedTaskIds, setSelectedTaskIds] = React.useState<Set<string>>(new Set());
  const [focusTaskId, setFocusTaskId] = React.useState<string | null>(null);
  const [focusTaskTitle, setFocusTaskTitle] = React.useState<string>('');
  const [showAnalytics, setShowAnalytics] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [showThemeSettings, setShowThemeSettings] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showAchievements, setShowAchievements] = React.useState(false);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [showTeamDashboard, setShowTeamDashboard] = React.useState(false);
  const [showTeamInvitation, setShowTeamInvitation] = React.useState(false);
  const [showAPIDocs, setShowAPIDocs] = React.useState(false);
  const [showWebhooks, setShowWebhooks] = React.useState(false);
  const [showLearning, setShowLearning] = React.useState(false);
  const [showWhiteLabel, setShowWhiteLabel] = React.useState(false);
  const [showMobilePromo, setShowMobilePromo] = React.useState(false);
  const [showDesktopPromo, setShowDesktopPromo] = React.useState(false);
  const [showCommandCenter, setShowCommandCenter] = React.useState(false);
  const [showQuickSwitcher, setShowQuickSwitcher] = React.useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('tour_completed');
    }
    return false;
  });
  const [showUsageAnalytics, setShowUsageAnalytics] = React.useState(false);
  const [currentView, setCurrentView] = React.useState<ViewMode>('list');

  // ALL MISSING FEATURE STATE VARIABLES (Blocker #1 Fix)
  const [showKanban, setShowKanban] = React.useState(false);
  const [showGantt, setShowGantt] = React.useState(false);
  const [showMindMap, setShowMindMap] = React.useState(false);
  const [showMatrix, setShowMatrix] = React.useState(false);
  const [showGoals, setShowGoals] = React.useState(false);
  const [showHabits, setShowHabits] = React.useState(false);
  const [showWeeklyReview, setShowWeeklyReview] = React.useState(false);
  const [showTimeBlocking, setShowTimeBlocking] = React.useState(false);
  const [showAICoach, setShowAICoach] = React.useState(false);
  const [showReporting, setShowReporting] = React.useState(false);
  const [showBudget, setShowBudget] = React.useState(false);
  const [showClientPortal, setShowClientPortal] = React.useState(false);
  const [showTeamChat, setShowTeamChat] = React.useState(false);
  const [showFocusRooms, setShowFocusRooms] = React.useState(false);
  const [showWorkloadBalancer, setShowWorkloadBalancer] = React.useState(false);
  const [showDocumentScanner, setShowDocumentScanner] = React.useState(false);
  const [showMeetingNotes, setShowMeetingNotes] = React.useState(false);
  const [showAutomations, setShowAutomations] = React.useState(false);
  const [showVoiceCommands, setShowVoiceCommands] = React.useState(false);
  const [showPomodoroPlus, setShowPomodoroPlus] = React.useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false);
  const [showEmailSettings, setShowEmailSettings] = React.useState(false);
  const [showShortcutsPanel, setShowShortcutsPanel] = React.useState(false);
  const [showDataExport, setShowDataExport] = React.useState(false);
  const [showAIQuickCreate, setShowAIQuickCreate] = React.useState(false);
  const [showTimeTracker, setShowTimeTracker] = React.useState(false);
  const [showTemplatesGallery, setShowTemplatesGallery] = React.useState(false);
  const [showTaskSharing, setShowTaskSharing] = React.useState(false);
  const [showDailyPlanning, setShowDailyPlanning] = React.useState(false);
  const [showIntegrationHub, setShowIntegrationHub] = React.useState(false);
  const [showTaskComments, setShowTaskComments] = React.useState(false);
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [showVoiceToTask, setShowVoiceToTask] = React.useState(false);
  const [showQuickCapture, setShowQuickCapture] = React.useState(false);
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = React.useState(false);
  
  // WP-ENG-02: Emblem breakdown state
  const [showEmblemBreakdown, setShowEmblemBreakdown] = React.useState(false);
  const [currentEmblemBreakdown, setCurrentEmblemBreakdown] = React.useState<EmblemBreakdown | null>(null);
  const [totalEmblemCharge, setTotalEmblemCharge] = React.useState(0);

  // Notifications
  const {
    notifications,
    unreadCount,
    preferences: notificationPreferences,
    updatePreferences: updateNotificationPreferences,
    markAsRead,
    deleteNotification: deleteNotif,
    clearAll: clearAllNotifications
  } = useNotifications(tasks, currentEnergy, streakData);

  // Achievements
  const {
    unlockedAchievements,
    newlyUnlocked,
    achievementProgress,
    totalPoints: achievementPoints,
    completionPercentage: achievementCompletion,
    totalAchievements,
    unlockedCount,
    clearNewlyUnlocked
  } = useAchievements({
    tasks,
    energyLogs,
    projects,
    currentStreak: streakData.loginStreak,
    focusSessions: focusSessionsCount,
    focusMinutes: totalFocusMinutes
  });

  // Keyboard shortcuts for power users
  useKeyboardShortcuts({
    onNewTask: () => setIsCreateModalOpen(true),
    onNewProject: () => setIsCreateProjectModalOpen(true),
    onFocusSearch: () => {
      const searchInput = document.querySelector('.search-input') as HTMLInputElement;
      searchInput?.focus();
    },
    onEscapePressed: () => {
      setIsCreateModalOpen(false);
      setIsCreateProjectModalOpen(false);
      setIsEditTaskModalOpen(false);
      setShowThemeSettings(false);
      setShowAchievements(false);
      setShowSuggestions(false);
    },
    onQuickEnergy: (level) => {
      handleEnergyChange(level);
    },
    onOpenAchievements: () => setShowAchievements(prev => !prev),
    onOpenSuggestions: () => setShowSuggestions(true),
    onOpenTheme: () => setShowThemeSettings(true),
    onOpenAnalytics: () => setShowAnalytics(prev => !prev)
  });

  // Load user data on mount - PARALLELIZED for 3x faster loading!
  const loadUserData = React.useCallback(async () => {
    try {
      setLoading(true);
      
      // Add timeout to prevent infinite loading (increased to 10s for slow APIs)
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout - API may be slow or unavailable')), 10000)
      );
      
      // Load all data in parallel for maximum speed
      const [tasksResponse, projectsResponse, energyResponse, energyLogsResponse] = await Promise.race([
        Promise.all([
          authenticatedFetch('/api/tasks'),
          authenticatedFetch('/api/projects'),
          authenticatedFetch('/api/energy/latest'),
          authenticatedFetch('/api/energy?limit=100')
        ]),
        timeout
      ]).catch(err => {
        console.error('API timeout or error:', err);
        // Show user-friendly message
        toast.error('Backend API is slow or offline. Loading local demo mode.', {
          duration: 5000,
          icon: '⚠️',
        });
        return [
          new Response(JSON.stringify({ tasks: [] }), { status: 200 }),
          new Response(JSON.stringify({ projects: [] }), { status: 200 }),
          new Response(JSON.stringify({ energy: null }), { status: 200 }),
          new Response(JSON.stringify({ logs: [] }), { status: 200 })
        ];
      }) as Response[];

      // Process tasks
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setTasks(tasksData.tasks || []);
      }

      // Process projects
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setProjects(projectsData.projects || []);
      }

      // Process latest energy
      if (energyResponse.ok) {
        const energyData = await energyResponse.json();
        if (energyData.energy) {
          setCurrentEnergy(energyData.energy.level);
        }
      }

      // Process energy logs
      if (energyLogsResponse.ok) {
        const logsData = await energyLogsResponse.json();
        if (logsData.logs) {
          setEnergyLogs(logsData.logs.map((log: { energy_level: number; logged_at: string }) => ({
            level: log.energy_level,
            timestamp: log.logged_at
          })));
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  }, [authenticatedFetch]);

  React.useEffect(() => {
    if (user && !isLoading) {
      loadUserData();
      
      // Safety timeout - if loading takes more than 10 seconds, force it to stop
      const loadingTimeout = setTimeout(() => {
        if (loading) {
          console.warn('Loading timeout - forcing completion');
          setLoading(false);
        }
      }, 10000);
      
      // Update login streak
      const oldStreak = streakData.loginStreak;
      const newStreakData = updateLoginStreak();
      setStreakData(newStreakData);
      
      // Check for milestone achievement
      const milestone = checkNewMilestone(oldStreak, newStreakData.loginStreak);
      if (milestone) {
        setShowMilestoneConfetti(true);
        toast.success(`${milestone.emoji} ${milestone.label} Login Streak! ${newStreakData.loginStreak} days!`, {
          duration: 5000,
          icon: milestone.emoji
        });
        setTimeout(() => setShowMilestoneConfetti(false), 3000);
      }

      return () => clearTimeout(loadingTimeout);
    }
  }, [user, isLoading, loadUserData]);

  // Global keyboard shortcuts for new UI
  React.useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K = Command Center
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && !e.shiftKey) {
        e.preventDefault();
        setShowCommandCenter(true);
      }
      
      // Cmd/Ctrl + Shift + P = Quick Switcher
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setShowQuickSwitcher(true);
      }
    };

    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, []);

  // Load focus session data from localStorage
  React.useEffect(() => {
    const savedSessions = localStorage.getItem('focusSessions');
    const savedMinutes = localStorage.getItem('focusMinutes');
    
    if (savedSessions) {
      setFocusSessionsCount(parseInt(savedSessions, 10) || 0);
    }
    if (savedMinutes) {
      setTotalFocusMinutes(parseInt(savedMinutes, 10) || 0);
    }
  }, []);

  const handleEnergyChange = async (energy: number) => {
    const previousEnergy = currentEnergy;
    setCurrentEnergy(energy);
    setLastEnergyLogTime(Date.now()); // WP-ENG-01: Track manual energy logs
    
    const energyLabels = ['', 'Low', 'Medium-Low', 'Medium', 'High', 'Peak'];
    
    try {
      // Log energy to backend
      const response = await authenticatedFetch('/api/energy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          energy_level: energy,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        toast.success(`Energy updated to ${energyLabels[energy]}! 🎯`, {
          duration: 3000,
          icon: '⚡',
        });
        
        // Add the new energy log to state
        if (data.energy_log) {
          setEnergyLogs(prev => [...prev, {
            level: data.energy_log.energy_level,
            timestamp: data.energy_log.logged_at
          }]);
        }
      }
    } catch (error) {
      console.error('Error logging energy:', error);
      setCurrentEnergy(previousEnergy); // Revert on error
      toast.error('Failed to update energy level. Please try again.', {
        duration: 4000,
      });
    }
  };

  const handleTaskComplete = async (taskId: string) => {
    try {
      const performanceStart = performance.now(); // WP-ENG-01: Performance tracking
      const completedTask = tasks.find(t => t.id === taskId);
      
      if (!completedTask) {
        throw new Error('Task not found');
      }
      
      const response = await authenticatedFetch(`/api/tasks/${taskId}/complete`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Update local state
        setTasks(prev => prev.map(task => 
          task.id === taskId ? { ...task, completed: true } : task
        ));
        
        // ✨ WP-ENG-01: AUTOMATIC ENERGY RECALIBRATION (PRIMARY KPI)
        const recalibrationResult = recalibrateEnergy(
          currentEnergy,
          completedTask,
          lastEnergyLogTime,
          'success' // Assume success for now
        );
        
        // Update energy state immediately
        setCurrentEnergy(recalibrationResult.newEnergy);
        setLastEnergyLogTime(Date.now());
        
        // Track PRIMARY KPI: Energy-Matched Completion
        const matched = isEnergyMatched(currentEnergy, completedTask.energy_requirement);
        
        // WP-ENG-02: Calculate emblem charge breakdown
        const emblemBreakdown = calculateEmblemCharge(
          completedTask,
          currentEnergy,
          streakData.completionStreak
        );
        
        // WP-ENG-03: Anti-gaming check
        const antiGamingResult = checkAntiGaming(
          taskId,
          emblemBreakdown.total,
          user?.sub || 'user'
        );
        
        // Apply anti-gaming penalties if needed
        const finalEmblemCharge = antiGamingResult.adjustedCharge;
        
        if (!antiGamingResult.allowed) {
          // Cooldown active - don't allow completion
          toast.error(antiGamingResult.warning || 'Please wait before completing more tasks', {
            duration: 4000,
            icon: '⏸️'
          });
          
          console.log('🛡️ Anti-Gaming: Completion blocked', {
            reason: antiGamingResult.reason,
            pattern: antiGamingResult.pattern
          });
          
          return; // Exit without completing task
        }
        
        if (antiGamingResult.penalty > 0) {
          // Penalty applied
          toast(antiGamingResult.warning || 'Charge reduced - complete tasks thoughtfully!', {
            duration: 4000,
            icon: '⚠️',
            style: {
              background: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #F59E0B'
            }
          });
          
          console.log('🛡️ Anti-Gaming: Penalty applied', {
            original: emblemBreakdown.total,
            adjusted: finalEmblemCharge,
            penalty: antiGamingResult.penalty,
            reason: antiGamingResult.reason,
            pattern: antiGamingResult.pattern
          });
        }
        
        // Record completion for future checks
        recordCompletion(taskId, finalEmblemCharge, user?.sub || 'user');
        
        // Update breakdown to show adjusted charge
        const adjustedBreakdown = {
          ...emblemBreakdown,
          total: finalEmblemCharge
        };
        
        // Store for modal display
        setCurrentEmblemBreakdown(adjustedBreakdown);
        setTotalEmblemCharge(userPoints); // Current points (will update with new points)
        
        // Log to console for now (will add analytics later)
        console.log('🎯 Energy-Matched Completion:', {
          taskId,
          user_energy: currentEnergy,
          task_energy: completedTask.energy_requirement,
          matched,
          new_energy: recalibrationResult.newEnergy,
          delta: recalibrationResult.delta,
          reason: recalibrationResult.reason
        });
        
        console.log('⚡ Emblem Charge Breakdown:', emblemBreakdown);
        
        // Performance measurement
        const performanceEnd = performance.now();
        const recalibrationLatency = performanceEnd - performanceStart;
        console.log(`⚡ Energy recalibration latency: ${recalibrationLatency.toFixed(2)}ms`);
        
        // Check for quick wins!
        const quickWins = checkQuickWins(
          {
            completed_at: new Date().toISOString(),
            created_at: completedTask?.created_at,
            project_id: completedTask?.project_id
          },
          tasks,
          energyLogs
        );

        // Show quick win badges
        if (quickWins.length > 0) {
          const totalQuickWinPoints = quickWins.reduce((sum, win) => sum + win.points, 0);
          saveQuickWinPoints(totalQuickWinPoints);
          setUserPoints(prev => prev + totalQuickWinPoints);

          // Show each quick win
          quickWins.forEach((win, index) => {
            setTimeout(() => {
              toast.success(`${win.emoji} ${win.title}! ${win.message} +${win.points}pts`, {
                duration: 3000,
                style: {
                  background: 'linear-gradient(135deg, #4A90E2 0%, #7ED321 100%)',
                  color: 'white',
                  fontWeight: 'bold'
                }
              });
            }, index * 800); // Stagger the notifications
          });
        }

        // Enhanced toast with energy update & emblem breakdown
        const energyDelta = formatEnergyDelta(recalibrationResult.delta);
        const energyLabel = getEnergyLabel(recalibrationResult.newEnergy);
        
        // WP-ENG-02: Make emblem charge clickable
        toast.success(
          (t) => (
            <div onClick={() => {
              toast.dismiss(t.id);
              setShowEmblemBreakdown(true);
            }} style={{ cursor: 'pointer' }}>
              <div style={{ fontWeight: '700', marginBottom: '4px' }}>
                Task completed! +{data.points_earned} points
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>
                Energy: {recalibrationResult.newEnergy.toFixed(1)}⚡ {energyDelta} ({energyLabel})
                {matched && ' 🎯'}
              </div>
              <div style={{
                marginTop: '8px',
                padding: '8px 12px',
                background: 'rgba(245, 166, 35, 0.2)',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#F5A623'
              }}>
                +{finalEmblemCharge}⚡ Emblem • Tap for breakdown
                {antiGamingResult.penalty > 0 && (
                  <span style={{ marginLeft: '8px', fontSize: '12px', opacity: 0.8 }}>
                    (-{Math.round(antiGamingResult.penalty * 100)}% penalty)
                  </span>
                )}
              </div>
            </div>
          ),
          {
            duration: 6000,
            icon: matched ? '🎯' : '✅',
          }
        );

        // Handle recurring task - create next instance
        if (completedTask?.recurrence && completedTask.recurrence.frequency !== 'none' && completedTask.recurrence.is_active) {
          setTimeout(async () => {
            try {
              const nextDueDate = completedTask.due_date 
                ? calculateNextDueDate(completedTask.due_date, completedTask.recurrence!)
                : new Date();
              
              // Check if recurrence should continue
              if (!shouldEndRecurrence(completedTask.recurrence!, nextDueDate)) {
                // Create next instance - build clean object
                const nextTaskData: NewTaskData = {
                  title: completedTask.title,
                  priority: completedTask.priority,
                  energy_requirement: completedTask.energy_requirement,
                  recurrence: completedTask.recurrence
                };
                
                // Only add optional fields if they exist
                if (completedTask.description) nextTaskData.description = completedTask.description;
                if (completedTask.estimated_duration) nextTaskData.estimated_duration = completedTask.estimated_duration;
                if (completedTask.project_id) nextTaskData.project_id = completedTask.project_id;
                if (completedTask.tags && completedTask.tags.length > 0) nextTaskData.tags = completedTask.tags;
                
                // Set next due date
                nextTaskData.due_date = nextDueDate.toISOString();
                
                await handleCreateTask(nextTaskData);
                
                toast.success(`🔄 Next "${completedTask.title}" task created!`, {
                  duration: 3000,
                  icon: '🔄',
                });
              }
            } catch (error) {
              console.error('Error creating recurring task:', error);
              toast.error('Failed to create next recurring task');
            }
          }, 500); // Small delay to avoid race conditions
        }

        // Update completion streak
        const oldCompletionStreak = streakData.completionStreak;
        const newStreakData = updateCompletionStreak();
        setStreakData(newStreakData);
        
        // Check for completion streak milestone
        const milestone = checkNewMilestone(oldCompletionStreak, newStreakData.completionStreak);
        if (milestone) {
          setTimeout(() => {
            toast.success(`${milestone.emoji} ${milestone.label} Completion Streak! ${newStreakData.completionStreak} days!`, {
              duration: 5000,
              icon: milestone.emoji
            });
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error('Failed to complete task. Please try again.');
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      const response = await authenticatedFetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        toast.success('Task deleted successfully', {
          icon: '🗑️',
        });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    }
  };

  const handleTaskEdit = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setIsEditTaskModalOpen(true);
    }
  };

  const handleTaskEditSuccess = async () => {
    try {
      // Only reload tasks, not everything
      const response = await authenticatedFetch('/api/tasks');
      
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks || []);
      }
    } catch (error) {
      console.error('Error reloading tasks:', error);
    }
  };

  const handleCreateTask = async (taskData: NewTaskData) => {
    try {
      const response = await authenticatedFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Add new task to the list
        setTasks(prev => [data.task, ...prev]);
        
        // Track task creation
        analytics.trackTaskEvent('task_created', {
          taskId: data.task.id,
          priority: data.task.priority,
          energyRequirement: data.task.energy_requirement,
          estimatedDuration: data.task.estimated_duration,
          category: data.task.category
        });
        
        toast.success('Task created successfully! 🎉', {
          duration: 3000,
          icon: '✨',
        });
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task. Please try again.');
      throw error; // Re-throw to keep modal open on error
    }
  };

  const handleCreateProject = () => {
    setIsCreateProjectModalOpen(true);
    setEditingProject(null);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsCreateProjectModalOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await authenticatedFetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Project deleted successfully! 🗑️', {
          duration: 3000,
          icon: '📁',
        });
        
        // Reload projects
        loadUserData();
        
        // Clear selection if this project was selected
        if (selectedProject?.id === projectId) {
          setSelectedProject(null);
        }
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project. Please try again.', {
        duration: 4000,
      });
    }
  };

  const handleProjectSuccess = async () => {
    try {
      // Only reload projects, not everything
      const response = await authenticatedFetch('/api/projects');
      
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error reloading projects:', error);
    }
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setFilterProjectId(project.id);
  };

  const handleFilterChange = (projectId: string | null) => {
    setFilterProjectId(projectId);
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      setSelectedProject(project || null);
    } else {
      setSelectedProject(null);
    }
  };

  const handleSaveAsTemplate = (task: Task) => {
    setTemplateTaskData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      energy_requirement: task.energy_requirement,
      estimated_duration: task.estimated_duration,
      project_id: task.project_id,
      tags: task.tags
    });
    setIsSaveTemplateModalOpen(true);
  };

  const handleUseTemplate = async (template: TaskTemplate) => {
    try {
      const taskData = createTaskFromTemplate(template);
      await handleCreateTask(taskData);
    } catch (error) {
      console.error('Error creating task from template:', error);
      toast.error('Failed to create task from template');
    }
  };

  // Bulk selection handlers
  const handleToggleSelect = (taskId: string) => {
    setSelectedTaskIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    const allTaskIds = activeTasks.map(t => t.id);
    setSelectedTaskIds(new Set(allTaskIds));
  };

  const handleClearSelection = () => {
    setSelectedTaskIds(new Set());
  };

  const handleBulkComplete = async () => {
    const count = selectedTaskIds.size;
    if (count === 0) return;

    try {
      // Complete all selected tasks in parallel
      await Promise.all(
        Array.from(selectedTaskIds).map(taskId =>
          authenticatedFetch(`/api/tasks/${taskId}/complete`, {
            method: 'POST',
          })
        )
      );

      // Update local state
      setTasks(prev => prev.map(task => 
        selectedTaskIds.has(task.id) ? { ...task, completed: true } : task
      ));

      toast.success(`${count} task${count > 1 ? 's' : ''} completed! 🎉`, {
        duration: 3000,
        icon: '✅',
      });

      setSelectedTaskIds(new Set());
    } catch (error) {
      console.error('Error completing tasks:', error);
      toast.error('Failed to complete some tasks');
    }
  };

  const handleBulkDelete = async () => {
    const count = selectedTaskIds.size;
    if (count === 0) return;

    if (!confirm(`Delete ${count} task${count > 1 ? 's' : ''}? This cannot be undone.`)) {
      return;
    }

    try {
      // Delete all selected tasks in parallel
      await Promise.all(
        Array.from(selectedTaskIds).map(taskId =>
          authenticatedFetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
          })
        )
      );

      // Update local state
      setTasks(prev => prev.filter(task => !selectedTaskIds.has(task.id)));

      toast.success(`${count} task${count > 1 ? 's' : ''} deleted`, {
        icon: '🗑️',
      });

      setSelectedTaskIds(new Set());
    } catch (error) {
      console.error('Error deleting tasks:', error);
      toast.error('Failed to delete some tasks');
    }
  };

  const handleStartFocus = (taskId: string, taskTitle: string) => {
    setFocusTaskId(taskId);
    setFocusTaskTitle(taskTitle);
  };

  const handleFocusComplete = () => {
    // Track focus session for achievements
    setFocusSessionsCount(prev => prev + 1);
    setTotalFocusMinutes(prev => prev + 25); // Pomodoro is 25 minutes
    
    // Save to localStorage for persistence
    localStorage.setItem('focusSessions', String(focusSessionsCount + 1));
    localStorage.setItem('focusMinutes', String(totalFocusMinutes + 25));
    
    // Track today's focus sessions for daily challenges
    const today = new Date().toDateString();
    const todaySessionsStr = localStorage.getItem('todayFocusSessions');
    const todayDate = localStorage.getItem('focusSessionsDate');
    
    if (todayDate === today) {
      const count = parseInt(todaySessionsStr || '0', 10) + 1;
      localStorage.setItem('todayFocusSessions', String(count));
    } else {
      localStorage.setItem('todayFocusSessions', '1');
      localStorage.setItem('focusSessionsDate', today);
    }
    
    toast.success('Focus session saved! Great work! 🎯', {
      duration: 3000,
      icon: '✅',
    });
    setFocusTaskId(null);
    setFocusTaskTitle('');
  };

  const handleFocusCancel = () => {
    setFocusTaskId(null);
    setFocusTaskTitle('');
  };

  const handleBulkMove = async (projectId: string | null) => {
    const count = selectedTaskIds.size;
    if (count === 0) return;

    try {
      // Move all selected tasks in parallel
      await Promise.all(
        Array.from(selectedTaskIds).map(taskId =>
          authenticatedFetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({ project_id: projectId }),
          })
        )
      );

      // Reload tasks to get updated project info
      const response = await authenticatedFetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks || []);
      }

      const projectName = projectId 
        ? projects.find(p => p.id === projectId)?.name || 'project'
        : 'No Project';

      toast.success(`${count} task${count > 1 ? 's' : ''} moved to ${projectName}! 📁`, {
        duration: 3000,
      });

      setSelectedTaskIds(new Set());
    } catch (error) {
      console.error('Error moving tasks:', error);
      toast.error('Failed to move some tasks');
    }
  };

  // Calculate stats from tasks
  const allActiveTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Apply filters first (for proper counts)
  const filteredTasks = React.useMemo(() => {
    let filtered = allActiveTasks;
    
    // Apply project filter
    if (filterProjectId) {
      if (filterProjectId === 'none') {
        filtered = filtered.filter(task => !task.project_id);
      } else {
        filtered = filtered.filter(task => task.project_id === filterProjectId);
      }
    }
    
    // Apply tag filter
    if (filterTag) {
      filtered = filtered.filter(task => 
        task.tags?.some(tag => tag.label === filterTag)
      );
    }
    
    return filtered;
  }, [allActiveTasks, filterProjectId, filterTag]);

  // Apply search and sort to filtered tasks
  const activeTasks = React.useMemo(() => {
    let filtered = filteredTasks;

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        (task.description?.toLowerCase().includes(query))
      );
    }

    // Apply sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return b.priority - a.priority;
        case 'due_date':
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        case 'points':
          return b.points - a.points;
        case 'energy_match':
          const matchA = Math.abs(a.energy_requirement - currentEnergy);
          const matchB = Math.abs(b.energy_requirement - currentEnergy);
          if (matchA === matchB) return b.priority - a.priority;
          return matchA - matchB;
        case 'created_at':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    return sorted;
  }, [filteredTasks, searchQuery, sortBy, currentEnergy]);

  // Calculate task counts for filter (only active tasks, no search applied)
  const taskCounts = React.useMemo(() => {
    const counts = {
      all: allActiveTasks.length,
      noProject: allActiveTasks.filter(t => !t.project_id).length,
      byProject: {} as { [key: string]: number }
    };
    
    projects.forEach(project => {
      counts.byProject[project.id] = allActiveTasks.filter(t => t.project_id === project.id).length;
    });
    
    return counts;
  }, [allActiveTasks, projects]);
  const totalPoints = completedTasks.reduce((sum, task) => sum + (task.points || 0), 0);
  const calculatedLevel = Math.floor(totalPoints / 1000) + 1;

  // Update points and level when tasks change
  React.useEffect(() => {
    setUserPoints(totalPoints);
    setUserLevel(calculatedLevel);
  }, [totalPoints, calculatedLevel]);

  // Calculate level progress percentage
  const levelProgress = Math.floor(((totalPoints % 1000) / 1000) * 100);

  // Feature selector handler for Command Center - ALL 105 FEATURES!
  const handleFeatureSelect = (featureId: string) => {
    const featureMap: Record<string, () => void> = {
      // VIEWS (Switch view mode)
      'kanban': () => setShowKanban(true),
      'gantt': () => setShowGantt(true),
      'mind-map': () => setShowMindMap(true),
      'matrix': () => setShowMatrix(true),
      'calendar-view': () => setShowCalendar(true),
      'timeline': () => setCurrentView('list'),
      
      // ANALYTICS
      'analytics': () => setShowAnalytics(true),
      'reporting': () => setShowReporting(true),
      'export': () => setShowDataExport(true),
      'energy-insights': () => toast.success('📊 Energy insights shown in sidebar!'),
      
      // AI-POWERED
      'ai-coach': () => setShowAICoach(true),
      'ai-task-gen': () => setShowAIQuickCreate(true),
      'ai-breakdown': () => toast.success('💡 Select a task and use AI Breakdown from task menu!'),
      'workload-balancer': () => setShowWorkloadBalancer(true),
      'smart-suggestions': () => setShowSuggestions(true),
      'daily-planning': () => setShowDailyPlanning(true),
      
      // FOCUS & TIME
      'focus-mode': () => toast.success('⚡ Click the lightning bolt on any task to start focus!'),
      'pomodoro-plus': () => setShowPomodoroPlus(true),
      'time-blocking': () => setShowTimeBlocking(true),
      'time-tracking': () => setShowTimeTracker(true),
      'focus-rooms': () => setShowFocusRooms(true),
      
      // LEARNING & GROWTH
      'goals': () => setShowGoals(true),
      'habits': () => setShowHabits(true),
      'weekly-review': () => setShowWeeklyReview(true),
      'learning': () => setShowLearning(true),
      'achievements': () => setShowAchievements(true),
      
      // TEAM
      'team-dashboard': () => setShowTeamDashboard(true),
      'team-chat': () => setShowTeamChat(true),
      'client-portal': () => setShowClientPortal(true),
      'task-sharing': () => setShowTaskSharing(true),
      'meeting-notes': () => setShowMeetingNotes(true),
      
      // SETTINGS & TOOLS
      'integrations': () => setShowIntegrationHub(true),
      'api-docs': () => setShowAPIDocs(true),
      'webhooks': () => setShowWebhooks(true),
      'automations': () => setShowAutomations(true),
      'themes': () => setShowThemeSettings(true),
      'white-label': () => setShowWhiteLabel(true),
      'budget': () => setShowBudget(true),
      'advanced-search': () => setShowAdvancedSearch(true),
      'email-settings': () => setShowEmailSettings(true),
      'shortcuts': () => setShowShortcutsPanel(true),
      
      // APPS & EXTENSIONS
      'mobile-app': () => setShowMobilePromo(true),
      'desktop-app': () => setShowDesktopPromo(true),
      'voice-commands': () => setShowVoiceCommands(true),
      'voice-to-task': () => setShowVoiceToTask(true),
      
      // QUICK TOOLS
      'calendar': () => setShowCalendar(true),
      'quick-capture': () => setShowQuickCapture(true),
      'onboarding': () => setShowOnboarding(true),
      'templates': () => setShowTemplatesGallery(true),
      'task-comments': () => setShowTaskComments(true),
      'document-scanner': () => setShowDocumentScanner(true),
    };

    if (featureMap[featureId]) {
      featureMap[featureId]();
      // Track feature usage
      if (typeof window !== 'undefined') {
        const usage = JSON.parse(localStorage.getItem('feature_usage') || '{}');
        usage[featureId] = (usage[featureId] || 0) + 1;
        localStorage.setItem('feature_usage', JSON.stringify(usage));
      }
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-syncscript-cream-50">
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #4A90E2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}></div>
          <div style={{
            fontSize: '18px',
            color: '#4B5563',
            margin: '0',
            fontWeight: '500',
            transform: 'none !important',
            animation: 'none !important'
          }}>Loading your SyncScript dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="dashboard">

      {/* Header */}
      <motion.header 
        className="dashboard-header"
        role="banner"
        aria-label="Dashboard header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="header-content">
          {/* Left Side - Title and Welcome */}
          <div className="header-left">
            <h1 className="dashboard-title">
              <div className="app-logo">
                <span className="logo-text">SyncScript</span>
              </div>
            </h1>
            <p className="dashboard-subtitle">
              Welcome back, {user.name || user.email}!
            </p>
          </div>
          
          {/* Right Side - Stats and Actions */}
          <div className="header-right">
            {/* Stats Row - Compact and Clean */}
            <div className="header-stats-compact">
              {/* Level Progress - Prominent */}
              <div className="level-progress-card">
                <div className="level-info">
                  {/* Level Badge with Progress Text Underneath */}
    <div className="level-badge-container">
      <span className="level-badge">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="trophy-icon">⭐</span>
          <span className="level-text">Level {userLevel}</span>
          {unlockedCount > 0 && (
            <span className="mini-trophy" title={`${unlockedCount} achievements unlocked`}>
              +{unlockedCount}
            </span>
          )}
        </div>
        {/* Progress Text Underneath Inside Badge */}
        <div style={{
          fontSize: '10px',
          color: 'white',
          fontWeight: '600',
          marginTop: '3px',
          textAlign: 'center',
          opacity: '0.9'
        }}>
          {1000 - (userPoints % 1000)} pts to Level {userLevel + 1}
        </div>
      </span>
    </div>
                  
                  {/* Emblem Charge Indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <motion.div
                      className="emblem-pulse-indicator"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      onClick={() => {
                        if (currentEmblemBreakdown) {
                          setShowEmblemBreakdown(true);
                        }
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: `conic-gradient(
                          from 0deg,
                          var(--color-syncscript-blue-500) 0%,
                          var(--color-syncscript-purple-500) ${(userPoints % 1000) / 10}%,
                          var(--color-neutral-200) ${(userPoints % 1000) / 10}%
                        )`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 0 12px rgba(51, 153, 255, 0.4)',
                        transition: 'transform 0.2s ease',
                        willChange: 'transform' // VIRE-002 FIX: GPU optimization for smooth 60fps
                      }}
                      whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(51, 153, 255, 0.6)' }}
                      title={`Emblem Charge: ${(userPoints % 1000) / 10}% - Click for breakdown`}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}>
                        ⚡
                      </div>
                    </motion.div>
                    <span className="points-text">⚡ {userPoints} pts</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill" 
                    style={{ width: `${(userPoints % 1000) / 10}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(userPoints % 1000) / 10}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              {/* Compact Stats */}
              <div className="compact-stats" role="group" aria-label="User statistics">
                <div className="stat-item" role="status" aria-label={`${completedTasks.length} tasks completed today`}>
                  <span className="stat-icon" aria-hidden="true">✅</span>
                  <span className="stat-text">{completedTasks.length}</span>
                </div>
                <div className="stat-item" role="status" aria-label={`${streakData.loginStreak} day login streak`}>
                  <span className="stat-icon" aria-hidden="true">🔥</span>
                  <span className="stat-text">{streakData.loginStreak}</span>
                </div>
                <div className="stat-item" role="status" aria-label={`${tasks.filter(t => !t.completed).length} active tasks`}>
                  <span className="stat-icon" aria-hidden="true">📋</span>
                  <span className="stat-text">{tasks.filter(t => !t.completed).length}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons - BLOCKER #3: Simplified to 6 items */}
            <nav className="header-actions" aria-label="Main navigation" style={{ gap: 'var(--space-3)' }}>
              {/* Notifications */}
              <button
                className="btn btn-secondary notif-btn"
                onClick={() => setShowNotifications(true)}
                title="Notifications"
                aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
                style={{ position: 'relative', overflow: 'visible' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                {unreadCount > 0 && (
                  <span 
                    className="notif-count"
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      minWidth: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--color-error-500)',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '0 5px',
                      zIndex: 9999,
                      boxShadow: 'var(--shadow-error)',
                      border: '2px solid white',
                      pointerEvents: 'none'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Quick Actions Menu */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowQuickSwitcher(true)}
                title="Quick Actions (Cmd+Shift+P)"
                aria-label="Quick Actions"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>

              {/* Theme Toggle */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowThemeSettings(true)}
                title="Theme Settings"
                aria-label="Theme Settings"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                </svg>
              </button>

              {/* All Features - Primary CTA */}
              <button
                className="btn btn-primary"
                onClick={() => setShowCommandCenter(true)}
                title="All Features (Cmd+K)"
                aria-label="Open All Features"
                style={{ 
                  background: 'var(--gradient-brand)',
                  fontWeight: 'var(--font-weight-bold)',
                  boxShadow: 'var(--shadow-primary)',
                  padding: '0 var(--space-5)'
                }}
              >
                ✨ All Features
              </button>

              {/* User Menu */}
              {/* Briefing Settings */}
              <button
                className="btn btn-secondary"
                onClick={() => {
                  console.log('🔍 Briefing Settings clicked!', { showBriefingSettings, briefingSettings });
                  analytics.trackBriefingEvent('briefing_settings_updated');
                  setShowBriefingSettings(true);
                }}
                title="Briefing Settings"
                aria-label="Briefing Settings"
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '120px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Briefings
              </button>

              {/* Test Morning Brief Button */}
              <button
                className="btn btn-secondary"
                onClick={() => {
                  analytics.trackBriefingEvent('morning_brief_viewed');
                  generateMorningBrief();
                  // Trigger feedback collection for beta users
                  if (betaUserStatus?.isBetaUser) {
                    setTimeout(() => {
                      setCurrentFeedbackFeature('morning-brief');
                      setShowFeedbackCollector(true);
                    }, 2000);
                  }
                }}
                title="Test Morning Brief"
                aria-label="Test Morning Brief"
                style={{ 
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600'
                }}
              >
                🌅 Morning
              </button>

              {/* Test Evening Brief Button */}
              <button
                className="btn btn-secondary"
                onClick={() => {
                  console.log('🌙 Evening Brief clicked!');
                  analytics.trackBriefingEvent('evening_brief_viewed');
                  generateEveningBrief();
                  // Trigger feedback collection for beta users
                  if (betaUserStatus?.isBetaUser) {
                    setTimeout(() => {
                      setCurrentFeedbackFeature('evening-brief');
                      setShowFeedbackCollector(true);
                    }, 2000);
                  }
                }}
                title="Test Evening Brief"
                aria-label="Test Evening Brief"
                style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '100px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🌙 Evening
              </button>

              {/* Simple Test Button */}
              <button
                onClick={() => {
                  console.log('🚀 Simple test button clicked!');
                  alert('Briefing system is working! Check console for debug info.');
                }}
                style={{ 
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🚀 TEST BRIEFING
              </button>

              {/* Phase 2 Enhanced Features */}
              <button
                className="btn btn-secondary"
                onClick={() => {
                  analytics.trackPageView('Analytics Dashboard');
                  setShowAnalyticsDashboard(true);
                }}
                title="Analytics Dashboard"
                aria-label="Analytics Dashboard"
                style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📊 Analytics
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  analytics.trackPageView('Budget Intelligence');
                  setShowBudgetIntelligence(true);
                }}
                title="Budget Intelligence"
                aria-label="Budget Intelligence"
                style={{ 
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                💰 Budget
              </button>

              {/* Beta Program Button */}
              {!betaUserStatus?.isBetaUser && (
                <Link href="/beta">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      analytics.trackPageView('Beta Registration');
                    }}
                    title="Join Beta Program"
                    aria-label="Join Beta Program"
                    style={{ 
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '600',
                      minWidth: '120px',
                      height: '40px',
                      zIndex: 9999,
                      position: 'relative'
                    }}
                  >
                    🚀 Join Beta
                  </button>
                </Link>
              )}

              {/* Feedback Button for Beta Users */}
              {betaUserStatus?.isBetaUser && (
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setCurrentFeedbackFeature('general');
                    setShowFeedbackCollector(true);
                  }}
                  title="Submit Feedback"
                  aria-label="Submit Feedback"
                  style={{ 
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    color: 'white',
                    border: 'none',
                    fontWeight: '600',
                    minWidth: '120px',
                    height: '40px',
                    zIndex: 9999,
                    position: 'relative'
                  }}
                >
                  💬 Feedback
                </button>
              )}

              {/* Phase 3 Advanced Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowCustomWorkspace(true)}
                title="Custom Workspace Layout"
                aria-label="Custom Workspace Layout"
                style={{ 
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🎨 Workspace
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowIntegrationsHub(true)}
                title="Advanced Integrations"
                aria-label="Advanced Integrations"
                style={{ 
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔗 Integrations
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowMobileFoundation(true)}
                title="Mobile App Foundation"
                aria-label="Mobile App Foundation"
                style={{ 
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📱 Mobile
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowApiV2Release(true)}
                title="API v2 Release"
                aria-label="API v2 Release"
                style={{ 
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔌 API v2
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowWhiteLabelSystem(true)}
                title="White-Label System"
                aria-label="White-Label System"
                style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🏷️ White-Label
              </button>

              {/* Enterprise Security Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowEnterpriseSSO(true)}
                title="Enterprise SSO"
                aria-label="Enterprise SSO"
                style={{ 
                  background: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔐 Enterprise SSO
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowRBAC(true)}
                title="Role-Based Access Control"
                aria-label="Role-Based Access Control"
                style={{ 
                  background: 'linear-gradient(135deg, #7c2d12, #991b1b)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                👥 RBAC
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowEnterpriseAdmin(true)}
                title="Enterprise Admin Dashboard"
                aria-label="Enterprise Admin Dashboard"
                style={{ 
                  background: 'linear-gradient(135deg, #6b21a8, #581c87)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🏢 Admin
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowSecurityAudit(true)}
                title="Security Audit Logging"
                aria-label="Security Audit Logging"
                style={{ 
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔍 Security Audit
              </button>

              {/* Payment & Monetization Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowStripePayment(true)}
                title="Stripe Payment Integration"
                aria-label="Stripe Payment Integration"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                💳 Payments
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowSubscriptionManagement(true)}
                title="Subscription Management"
                aria-label="Subscription Management"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📋 Subscriptions
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowRevenueAnalytics(true)}
                title="Revenue Analytics"
                aria-label="Revenue Analytics"
                style={{ 
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📊 Revenue
              </button>

              {/* Real-Time Collaboration Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowWebSocketIntegration(true)}
                title="WebSocket Integration"
                aria-label="WebSocket Integration"
                style={{ 
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                ⚡ WebSocket
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowLivePresence(true)}
                title="Live Presence System"
                aria-label="Live Presence System"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                👥 Live Presence
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowRealTimeUpdates(true)}
                title="Real-Time Updates"
                aria-label="Real-Time Updates"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔄 Real-Time
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowInstantNotifications(true)}
                title="Instant Notifications"
                aria-label="Instant Notifications"
                style={{ 
                  background: 'linear-gradient(135deg, #ea580c, #dc2626)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔔 Notifications
              </button>

              {/* Mobile Optimization Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowPWAFoundation(true)}
                title="PWA Foundation"
                aria-label="PWA Foundation"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📱 PWA
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowOfflineArchitecture(true)}
                title="Offline Architecture"
                aria-label="Offline Architecture"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                💾 Offline
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowTouchGestures(true)}
                title="Touch Gestures"
                aria-label="Touch Gestures"
                style={{ 
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                👆 Touch
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowMobilePush(true)}
                title="Mobile Push Notifications"
                aria-label="Mobile Push Notifications"
                style={{ 
                  background: 'linear-gradient(135deg, #ea580c, #dc2626)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📲 Push
              </button>

              {/* Advanced Integrations Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowIntegrationsHub(true)}
                title="Third-Party Integrations Hub"
                aria-label="Third-Party Integrations Hub"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔗 Integrations
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowAPIMarketplace(true)}
                title="API Marketplace"
                aria-label="API Marketplace"
                style={{ 
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🛒 Marketplace
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowWebhookSystem(true)}
                title="Webhook System"
                aria-label="Webhook System"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔗 Webhooks
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowSyncScriptSDK(true)}
                title="SyncScript SDK"
                aria-label="SyncScript SDK"
                style={{ 
                  background: 'linear-gradient(135deg, #ea580c, #dc2626)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🛠️ SDK
              </button>

              {/* Enterprise Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowEnterpriseSecurity(true)}
                title="Advanced Enterprise Security"
                aria-label="Advanced Enterprise Security"
                style={{ 
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔐 Security
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowEnterpriseAdmin(true)}
                title="Enterprise Admin Dashboard"
                aria-label="Enterprise Admin Dashboard"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                👥 Admin
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowEnterpriseAnalytics(true)}
                title="Advanced Analytics & Reporting"
                aria-label="Advanced Analytics & Reporting"
                style={{ 
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📊 Analytics
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowWhiteLabelSolutions(true)}
                title="White-Label Solutions"
                aria-label="White-Label Solutions"
                style={{ 
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🎨 White-Label
              </button>

              {/* AI Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowAIProductivityAssistant(true)}
                title="AI-Powered Productivity Assistant"
                aria-label="AI-Powered Productivity Assistant"
                style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🤖 AI Assistant
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowIntelligentAutomation(true)}
                title="Intelligent Automation Engine"
                aria-label="Intelligent Automation Engine"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                ⚙️ Automation
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowPredictiveAnalytics(true)}
                title="Predictive Analytics & Insights"
                aria-label="Predictive Analytics & Insights"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔮 Predictive
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowAIContentGeneration(true)}
                title="AI Content Generation"
                aria-label="AI Content Generation"
                style={{ 
                  background: 'linear-gradient(135deg, #ea580c, #dc2626)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                ✍️ AI Content
              </button>

              {/* Mobile Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowMobileAppFoundation(true)}
                title="React Native Mobile App Foundation"
                aria-label="React Native Mobile App Foundation"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📱 Mobile App
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowOfflineSync(true)}
                title="Offline Synchronization System"
                aria-label="Offline Synchronization System"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📱 Offline Sync
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowMobileSpecificFeatures(true)}
                title="Mobile-Specific Features"
                aria-label="Mobile-Specific Features"
                style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📱 Features
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowCrossPlatformSync(true)}
                title="Cross-Platform Synchronization"
                aria-label="Cross-Platform Synchronization"
                style={{ 
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🔄 Cross-Platform
              </button>

              {/* Global Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowMultiLanguageSupport(true)}
                title="Multi-Language Support"
                aria-label="Multi-Language Support"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🌍 Languages
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowTimeZoneManagement(true)}
                title="Time Zone Management"
                aria-label="Time Zone Management"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🕐 Time Zones
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowCurrencySupport(true)}
                title="Currency Support"
                aria-label="Currency Support"
                style={{ 
                  background: 'linear-gradient(135deg, #ea580c, #dc2626)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                💱 Currency
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowRegionalCompliance(true)}
                title="Regional Compliance"
                aria-label="Regional Compliance"
                style={{ 
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                📋 Compliance
              </button>

              {/* Gamification Features */}
              <button
                className="btn btn-secondary"
                onClick={() => setShowAchievementSystem(true)}
                title="Achievement System 2.0"
                aria-label="Achievement System 2.0"
                style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🏆 Achievements
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowLeaderboardsSystem(true)}
                title="Leaderboards System"
                aria-label="Leaderboards System"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🥇 Leaderboards
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowVirtualRewardsSystem(true)}
                title="Virtual Rewards System"
                aria-label="Virtual Rewards System"
                style={{ 
                  background: 'linear-gradient(135deg, #ea580c, #dc2626)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🎁 Rewards
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowSocialFeatures(true)}
                title="Social Features"
                aria-label="Social Features"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                👥 Social
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowGamingElements(true)}
                title="Gaming Elements"
                aria-label="Gaming Elements"
                style={{ 
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  minWidth: '140px',
                  height: '40px',
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                🎮 Gaming
              </button>

              <Link 
                href="/api/auth/logout" 
                className="btn btn-ghost"
                aria-label="Logout"
              >
                <svg className="neural-icon" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" fill="none" />
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Logout
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main id="main-content" className="dashboard-main" role="main" aria-label="Dashboard content">
        {/* Analytics Dashboard */}
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: 'var(--space-6)' }}
          >
            <AdvancedAnalytics 
              tasks={tasks}
              energyLogs={energyLogs}
              projects={projects}
              authenticatedFetch={authenticatedFetch}
            />
          </motion.div>
        )}

        {/* Achievement Gallery */}
        {showAchievements && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: 'var(--space-6)' }}
          >
            <AchievementGallery />
          </motion.div>
        )}

        {/* Energy Selector Section */}
        <motion.section 
          className="dashboard-section"
          aria-labelledby="energy-section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <div className="section-header">
            <h2 id="energy-section-title" className="section-title">Current Energy Level</h2>
            <p className="section-description">
              Select your current energy to see tasks matched to your capacity
            </p>
          </div>
          
          <EnergySelector
            currentEnergy={currentEnergy}
            onEnergyChange={handleEnergyChange}
            className="dashboard-energy-selector"
          />

          {/* Daily Challenges */}
          <DailyChallenges
            tasks={tasks}
            energyLogs={energyLogs}
            focusSessions={focusSessionsCount}
            currentStreak={streakData.loginStreak}
            onChallengeComplete={(challenge, points) => {
              setUserPoints(prev => prev + points);
              toast.success(`🎉 Challenge Complete! +${points} bonus points!`, {
                duration: 4000
              });
            }}
          />

          {/* Energy Insights - Collapsible */}
          {energyLogs.length > 0 && (
            <motion.details
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              style={{ 
                marginTop: 'var(--space-6)',
                padding: 'var(--space-4)',
                background: 'var(--card-bg)',
                borderRadius: 'var(--card-radius)',
                border: '1px solid var(--card-border)',
                cursor: 'pointer'
              }}
              open
            >
              <summary style={{ 
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-md)',
                marginBottom: 'var(--space-4)',
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}>
                <span style={{ transition: 'transform var(--transition-fast)' }}>▼</span>
                📊 Energy Insights
              </summary>
              <EnergyInsights
                energyLogs={energyLogs}
                currentEnergy={currentEnergy}
              />
            </motion.details>
          )}
        </motion.section>

        {/* Projects Section - Collapsible */}
        <motion.section 
          className="dashboard-section"
          aria-labelledby="projects-section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <details
            style={{
              background: 'var(--card-bg)',
              borderRadius: 'var(--card-radius)',
              border: '1px solid var(--card-border)',
              padding: 'var(--space-5)'
            }}
            open
          >
            <summary
              style={{
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--space-4)',
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ transition: 'transform var(--transition-fast)' }}>▼</span>
                <span>📁 Projects ({projects.length})</span>
              </div>
              <button
                className="new-project-btn"
                onClick={(e) => { e.preventDefault(); handleCreateProject(); }}
                style={{ pointerEvents: 'all' }}
              >
                <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                New Project
              </button>
            </summary>
            <div style={{ marginTop: 'var(--space-4)' }}>

          {projects.length > 0 ? (
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  onSelect={handleProjectSelect}
                  isSelected={selectedProject?.id === project.id}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z"/>
                  <path d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V5z"/>
                </svg>
              </div>
              <h3 className="empty-title">No projects yet</h3>
              <p className="empty-description">
                Create your first project to organize your tasks
              </p>
              <button
                className="btn btn-primary"
                onClick={handleCreateProject}
              >
                <svg className="neural-icon" viewBox="0 0 24 24">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Create Project
              </button>
            </div>
          )}
            </div>
          </details>
        </motion.section>

        {/* Active Tasks Section */}
        <motion.section 
          className="dashboard-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <div className="section-header">
            <div>
            <h2 className="section-title">Active Tasks</h2>
            <p className="section-description">
              Tasks matched to your current energy level ({currentEnergy}/5)
            </p>
            </div>
            <button
              className="new-task-btn"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
                <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              New Task
            </button>
          </div>

          {/* Template Library */}
          <TemplateLibrary 
            onUseTemplate={handleUseTemplate}
            refreshTrigger={templateRefresh}
          />

          {/* Task Filter and Tasks Grid Layout */}
          <div className="tasks-section-layout">
            {/* Filter Sidebar */}
            {(projects.length > 0 || allActiveTasks.length > 0) && (
              <div className="filter-sidebar">
                <TaskFilter
                  projects={projects}
                  selectedProjectId={filterProjectId}
                  onFilterChange={handleFilterChange}
                  taskCounts={taskCounts}
                  tasks={allActiveTasks}
                  selectedTag={filterTag}
                  onTagFilterChange={setFilterTag}
                />
              </div>
            )}

            {/* Tasks Content */}
            <div className="tasks-content">
              {/* Bulk Action Toolbar */}
              <BulkActionToolbar
                selectedCount={selectedTaskIds.size}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
                onBulkComplete={handleBulkComplete}
                onBulkDelete={handleBulkDelete}
                onBulkMove={handleBulkMove}
                projects={projects}
                totalCount={activeTasks.length}
              />

              {/* Search and Sort */}
              <TaskSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                resultsCount={activeTasks.length}
                totalCount={filteredTasks.length}
              />
          
          {activeTasks.length === 0 ? (
            <div className="empty-state card card-md">
              <div className="empty-icon">
                <svg className="neural-icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3 className="empty-title">No active tasks</h3>
              <p className="empty-description">
                Create your first task to get started with energy-matched productivity
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <svg className="neural-icon" viewBox="0 0 24 24">
                  <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Create Task
              </button>
            </div>
          ) : (
            <div className="tasks-grid">
              {activeTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.6 + (index * 0.1),
                    ease: "easeOut"
                  }}
                >
                  <TaskCard
                    task={{
                      id: task.id,
                      title: task.title,
                      description: task.description,
                      priority: task.priority,
                      energyRequirement: task.energy_requirement,
                      energy_requirement: task.energy_requirement,
                      completed: task.completed,
                      points: task.points,
                      createdAt: task.created_at,
                      created_at: task.created_at,
                      dueDate: task.due_date,
                      estimatedDuration: task.estimated_duration,
                      estimated_duration: task.estimated_duration,
                      project_id: task.project_id,
                      project: task.project,
                      tags: task.tags,
                      subtasks: task.subtasks,
                      notes: task.notes,
                      recurrence: task.recurrence
                    }}
                    currentEnergy={currentEnergy}
                    onComplete={handleTaskComplete}
                    onDelete={handleTaskDelete}
                    onEdit={handleTaskEdit}
                    onSaveAsTemplate={handleSaveAsTemplate}
                    onStartFocus={handleStartFocus}
                    isSelected={selectedTaskIds.has(task.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                </motion.div>
              ))}
            </div>
          )}
            </div>
          </div>
        </motion.section>

        {/* Completed Tasks Section */}
        {completedTasks.length > 0 && (
          <motion.section 
            className="dashboard-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          >
            <div className="section-header">
              <h2 className="section-title">Completed Tasks</h2>
              <p className="section-description">
                Great work! Here are your completed tasks
              </p>
            </div>
            
            <div className="tasks-grid">
              {completedTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 1.0 + (index * 0.1),
                    ease: "easeOut"
                  }}
                >
                  <TaskCard
                    task={{
                      id: task.id,
                      title: task.title,
                      description: task.description,
                      priority: task.priority,
                      energyRequirement: task.energy_requirement,
                      energy_requirement: task.energy_requirement,
                      completed: task.completed,
                      points: task.points,
                      createdAt: task.created_at,
                      created_at: task.created_at,
                      dueDate: task.due_date,
                      estimatedDuration: task.estimated_duration,
                      estimated_duration: task.estimated_duration,
                      project_id: task.project_id,
                      project: task.project,
                      tags: task.tags,
                      subtasks: task.subtasks,
                      notes: task.notes,
                      recurrence: task.recurrence
                    }}
                    currentEnergy={currentEnergy}
                    onComplete={handleTaskComplete}
                    onDelete={handleTaskDelete}
                    onEdit={handleTaskEdit}
                    onSaveAsTemplate={handleSaveAsTemplate}
                    onStartFocus={handleStartFocus}
                    isSelected={selectedTaskIds.has(task.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
        currentEnergy={currentEnergy}
        projects={projects}
      />

      {/* Create/Edit Project Modal */}
      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => {
          setIsCreateProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSuccess={handleProjectSuccess}
        editProject={editingProject}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={() => {
          setIsEditTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSuccess={handleTaskEditSuccess}
        task={editingTask}
        projects={projects}
      />

      {/* Save Template Modal */}
      <SaveTemplateModal
        isOpen={isSaveTemplateModalOpen}
        onClose={() => {
          setIsSaveTemplateModalOpen(false);
          setTemplateTaskData(null);
          setTemplateRefresh(prev => prev + 1); // Trigger template library refresh
        }}
        taskData={templateTaskData}
      />

      {/* Focus Timer */}
      {focusTaskId && (
        <FocusTimer
          taskTitle={focusTaskTitle}
          onComplete={handleFocusComplete}
          onCancel={handleFocusCancel}
        />
      )}

      {/* Theme Settings Modal */}
      <ThemeSettings
        isOpen={showThemeSettings}
        onClose={() => setShowThemeSettings(false)}
      />

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        unreadCount={unreadCount}
        preferences={notificationPreferences}
        onMarkAsRead={markAsRead}
        onDelete={deleteNotif}
        onClearAll={clearAllNotifications}
        onUpdatePreferences={updateNotificationPreferences}
      />

      {/* Smart Suggestions */}
      <SmartSuggestions
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        onAcceptSuggestion={(taskId) => {
          setShowSuggestions(false);
          // Find the task and open it
          const task = tasks.find(t => t.id === taskId);
          if (task) {
            setEditingTask(task);
            setIsEditTaskModalOpen(true);
          }
        }}
        authenticatedFetch={authenticatedFetch}
      />

      {/* Calendar Integration */}
      <CalendarIntegration
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onImportTasks={(events) => {
          // Convert calendar events to tasks
          events.forEach(event => {
            // Parse and format the date as full ISO datetime (backend requires this)
            const dueDate = new Date(event.start);
            const formattedDateTime = dueDate.toISOString(); // Full ISO 8601 format with time
            
            const taskData: NewTaskData = {
              title: event.summary.substring(0, 200), // Limit title length
              description: (event.description || 'Imported from Google Calendar').substring(0, 1000), // Limit description
              priority: 3,
              energy_requirement: 3,
              due_date: formattedDateTime // Full datetime string
            };
            handleCreateTask(taskData);
          });
          setShowCalendar(false);
        }}
      />

      {/* Achievement Unlock Notification */}
      <AchievementUnlockNotification
        achievement={newlyUnlocked[0] || null}
        onClose={clearNewlyUnlocked}
      />

      {/* PWA Install Prompt */}
      <InstallPWA />

      {/* Keyboard Shortcuts Hint */}
      <KeyboardHint />

      {/* Team Dashboard */}
      <TeamDashboard
        isOpen={showTeamDashboard}
        onClose={() => setShowTeamDashboard(false)}
        team={{
          id: 'team-1',
          name: 'SyncScript Team',
          description: 'The core development team working on SyncScript',
          ownerId: user?.sub || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          memberCount: 5,
          settings: {
            allowMemberInvites: true,
            defaultMemberRole: 'member',
            requireApprovalForTasks: false,
            energyInsightsVisible: true,
            maxMembers: 50,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        }}
        members={[
          {
            id: 'member-1',
            teamId: 'team-1',
            userId: user?.sub || '',
            email: user?.email || '',
            name: user?.name || 'You',
            role: 'owner',
            joinedAt: new Date().toISOString(),
            status: 'active'
          },
          {
            id: 'member-2',
            teamId: 'team-1',
            userId: 'user-2',
            email: 'sarah@syncscript.com',
            name: 'Sarah Chen',
            role: 'admin',
            joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active'
          },
          {
            id: 'member-3',
            teamId: 'team-1',
            userId: 'user-3',
            email: 'mike@syncscript.com',
            name: 'Mike Rodriguez',
            role: 'member',
            joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active'
          }
        ]}
        projects={[
          {
            id: 'project-1',
            name: 'Q4 Planning',
            description: 'Quarterly planning and goal setting',
            color: '#4A90E2',
            teamId: 'team-1',
            createdBy: user?.sub || '',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            memberCount: 3,
            settings: {
              allowMemberTaskCreation: true,
              allowMemberTaskAssignment: true,
              requireApprovalForTasks: false,
              showEnergyLevels: true,
              autoAssignByEnergy: false
            }
          }
        ]}
        analytics={{
          teamId: 'team-1',
          period: 'week',
          totalTasks: 45,
          completedTasks: 38,
          averageEnergy: 72,
          productivityScore: 85,
          topPerformers: [
            {
              userId: user?.sub || '',
              name: user?.name || 'You',
              completedTasks: 15,
              energyLevel: 78
            },
            {
              userId: 'user-2',
              name: 'Sarah Chen',
              completedTasks: 12,
              energyLevel: 82
            },
            {
              userId: 'user-3',
              name: 'Mike Rodriguez',
              completedTasks: 11,
              energyLevel: 68
            }
          ],
          energyPatterns: [
            { hour: 9, averageEnergy: 85, taskCount: 8 },
            { hour: 10, averageEnergy: 88, taskCount: 12 },
            { hour: 11, averageEnergy: 82, taskCount: 10 },
            { hour: 14, averageEnergy: 90, taskCount: 15 },
            { hour: 15, averageEnergy: 86, taskCount: 9 },
            { hour: 16, averageEnergy: 88, taskCount: 11 }
          ]
        }}
        currentUserRole="owner"
        onInviteMember={(email, role) => {
          toast.success(`Invitation sent to ${email} as ${role}`);
        }}
        onManageMember={(memberId, action) => {
          toast.success(`Member ${action} successful`);
        }}
        onCreateProject={(project) => {
          toast.success(`Project "${project.name}" created`);
        }}
      />

      {/* Team Invitation */}
      <TeamInvitation
        isOpen={showTeamInvitation}
        onClose={() => setShowTeamInvitation(false)}
        team={{
          id: 'team-1',
          name: 'SyncScript Team',
          description: 'The core development team working on SyncScript',
          ownerId: user?.sub || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          memberCount: 5,
          settings: {
            allowMemberInvites: true,
            defaultMemberRole: 'member',
            requireApprovalForTasks: false,
            energyInsightsVisible: true,
            maxMembers: 50,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        }}
        inviter={{
          id: 'member-2',
          teamId: 'team-1',
          userId: 'user-2',
          email: 'sarah@syncscript.com',
          name: 'Sarah Chen',
          role: 'admin',
          joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        }}
        inviteToken="mock-invite-token-123"
        onAcceptInvite={(_teamId, _token) => {
          toast.success('Welcome to the team!');
          setShowTeamInvitation(false);
        }}
        onDeclineInvite={(_teamId, _token) => {
          toast.success('Invitation declined');
          setShowTeamInvitation(false);
        }}
      />

      {/* NEW FEATURES 91-100 */}
      {/* API Documentation */}
      <APIDocs
        isOpen={showAPIDocs}
        onClose={() => setShowAPIDocs(false)}
      />

      {/* Webhooks Manager */}
      <WebhooksManager
        isOpen={showWebhooks}
        onClose={() => setShowWebhooks(false)}
      />

      {/* Learning Center */}
      <LearningCenter
        isOpen={showLearning}
        onClose={() => setShowLearning(false)}
      />

      {/* White Label Settings */}
      <WhiteLabelSettings
        isOpen={showWhiteLabel}
        onClose={() => setShowWhiteLabel(false)}
      />

      {/* Mobile App Promo */}
      <MobileAppPromo
        isOpen={showMobilePromo}
        onClose={() => setShowMobilePromo(false)}
      />

      {/* Desktop App Promo */}
      <DesktopAppPromo
        isOpen={showDesktopPromo}
        onClose={() => setShowDesktopPromo(false)}
      />

      {/* LEGENDARY UI OVERHAUL - NEW COMPONENTS */}
      {/* Unified Command Center */}
      <UnifiedCommandCenter
        isOpen={showCommandCenter}
        onClose={() => setShowCommandCenter(false)}
        onFeatureSelect={handleFeatureSelect}
      />

      {/* Quick Switcher (Cmd+Shift+P) */}
      <QuickSwitcher
        isOpen={showQuickSwitcher}
        onClose={() => setShowQuickSwitcher(false)}
        actions={[
          { id: 'new-task', title: 'Create New Task', description: 'Add a new task to your list', icon: '➕', category: 'Actions', keywords: ['add', 'create', 'new'], action: () => setIsCreateModalOpen(true) },
          { id: 'analytics', title: 'View Analytics', description: 'See your productivity insights', icon: '📊', category: 'Views', keywords: ['stats', 'insights'], action: () => setShowAnalytics(true) },
          { id: 'kanban', title: 'Kanban Board', description: 'Drag-and-drop task management', icon: '📋', category: 'Views', keywords: ['board', 'columns'], action: () => setCurrentView('kanban') },
          { id: 'calendar', title: 'Calendar View', description: 'See tasks on calendar', icon: '📅', category: 'Views', keywords: ['schedule', 'timeline'], action: () => setCurrentView('calendar') },
          { id: 'gantt', title: 'Gantt Chart', description: 'Project timeline visualization', icon: '📊', category: 'Views', keywords: ['timeline', 'project'], action: () => setCurrentView('gantt') },
          { id: 'matrix', title: 'Eisenhower Matrix', description: 'Urgency vs Importance grid', icon: '🎯', category: 'Views', keywords: ['priority', 'eisenhower'], action: () => setCurrentView('matrix') },
          { id: 'mind-map', title: 'Mind Map', description: 'Visual task relationships', icon: '🧠', category: 'Views', keywords: ['visual', 'brain'], action: () => setCurrentView('mind-map') },
          { id: 'achievements', title: 'Achievements', description: 'View your unlocked achievements', icon: '🏆', category: 'Gamification', keywords: ['badges', 'rewards'], action: () => setShowAchievements(true) },
          { id: 'team', title: 'Team Dashboard', description: 'Collaborate with your team', icon: '👥', category: 'Team', keywords: ['collaborate', 'members'], action: () => setShowTeamDashboard(true) },
          { id: 'learning', title: 'Learning Center', description: 'Productivity courses', icon: '🎓', category: 'Learning', keywords: ['courses', 'education'], action: () => setShowLearning(true) },
        ]}
      />

      {/* Enhanced Welcome Tour */}
      <EnhancedWelcomeTour
        isOpen={showWelcomeTour}
        onClose={() => setShowWelcomeTour(false)}
        onComplete={() => {
          toast.success('🎉 Welcome to SyncScript! You\'re ready to be incredibly productive!');
          localStorage.setItem('tour_completed', 'true');
        }}
      />

      {/* Feature Usage Analytics */}
      <FeatureUsageAnalytics
        isOpen={showUsageAnalytics}
        onClose={() => setShowUsageAnalytics(false)}
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        onQuickTask={() => setIsCreateModalOpen(true)}
        onLogEnergy={() => {
          toast.success('⚡ Energy selector in sidebar!');
        }}
        onStartFocus={() => {
          const firstTask = activeTasks[0];
          if (firstTask) {
            setFocusTaskId(firstTask.id);
            setFocusTaskTitle(firstTask.title);
          } else {
            toast.success('Create a task first to start focus mode!');
          }
        }}
        onViewAnalytics={() => setShowAnalytics(true)}
        onSearch={() => setShowQuickSwitcher(true)}
        onOpenFeatures={() => setShowCommandCenter(true)}
      />

      {/* ALL 34 FEATURE MODALS - BLOCKER #1 FIX! */}
      <KanbanBoard 
        isOpen={showKanban} 
        onClose={() => setShowKanban(false)} 
        tasks={activeTasks.map(t => ({ ...t, status: t.completed ? 'done' : 'todo' as 'todo' | 'in_progress' | 'done' }))} 
        onUpdateTask={(taskId, updates) => {
          handleTaskEdit(taskId);
        }} 
      />
      <GanttChart isOpen={showGantt} onClose={() => setShowGantt(false)} tasks={activeTasks} />
      <MindMap isOpen={showMindMap} onClose={() => setShowMindMap(false)} tasks={activeTasks} projects={projects} />
      <EisenhowerMatrix isOpen={showMatrix} onClose={() => setShowMatrix(false)} tasks={activeTasks} onUpdateTask={(taskId) => handleTaskEdit(taskId)} />
      <GoalTracker isOpen={showGoals} onClose={() => setShowGoals(false)} tasks={tasks} />
      <HabitTracker isOpen={showHabits} onClose={() => setShowHabits(false)} />
      <WeeklyReview isOpen={showWeeklyReview} onClose={() => setShowWeeklyReview(false)} tasks={tasks} energyLogs={energyLogs.map(log => ({ energy_level: log.level, created_at: log.timestamp }))} />
      <TimeBlocking isOpen={showTimeBlocking} onClose={() => setShowTimeBlocking(false)} tasks={activeTasks} energyPredictions={[]} />
      <AICoach isOpen={showAICoach} onClose={() => setShowAICoach(false)} userStats={{}} recentActivity={[]} goals={[]} />
      <ReportingDashboard isOpen={showReporting} onClose={() => setShowReporting(false)} tasks={tasks as unknown as Array<{ completed: boolean; created_at: string; completed_at?: string; [key: string]: unknown }>} energyLogs={energyLogs.map(log => ({ energy_level: log.level, created_at: log.timestamp }))} />
      <BudgetTracker isOpen={showBudget} onClose={() => setShowBudget(false)} tasks={activeTasks} projects={projects} />
      
      {/* WP-FIN-01: Budget Settings (Comfort Bands) */}
      <BudgetSettings isOpen={showBudget} onClose={() => setShowBudget(false)} />
      
      {/* WP-FIN-03: Savings Goals */}
      <SavingsGoalsManager isOpen={showGoals} onClose={() => setShowGoals(false)} />
      
      {/* WP-PAR-01: Feature Discovery Tips */}
      <DiscoveryTipBanner />
      
      {/* Phase 2: AI Safety Controls */}
      <AISafetyControls isOpen={showAICoach} onClose={() => setShowAICoach(false)} />
      
      {/* Feature #25: Energy Analytics Dashboard */}
      <EnergyAnalyticsDashboard isOpen={showAdvancedAnalytics} onClose={() => setShowAdvancedAnalytics(false)} energyLogs={energyLogs.map(log => ({ level: log.level, timestamp: log.timestamp }))} />
      
      {/* Feature #26: Budget Analytics Dashboard */}
      <BudgetAnalyticsDashboard isOpen={showBudget} onClose={() => setShowBudget(false)} />
      <ClientPortal isOpen={showClientPortal} onClose={() => setShowClientPortal(false)} projects={projects} />
      <TeamChat isOpen={showTeamChat} onClose={() => setShowTeamChat(false)} teamId="default" userName={user?.name || 'User'} userId={user?.sub || ''} />
      <FocusRooms isOpen={showFocusRooms} onClose={() => setShowFocusRooms(false)} />
      <WorkloadBalancer isOpen={showWorkloadBalancer} onClose={() => setShowWorkloadBalancer(false)} tasks={activeTasks as unknown as Array<{ id: string; completed: boolean; priority: number; estimated_duration?: number; due_date?: string; [key: string]: unknown }>} energyLevel={currentEnergy} />
      <DocumentScanner isOpen={showDocumentScanner} onClose={() => setShowDocumentScanner(false)} onCreateTask={(task) => { handleCreateTask({ ...task, priority: 2, energy_requirement: 3 }); toast.success('📸 Task created from scan!'); }} />
      <MeetingNotes isOpen={showMeetingNotes} onClose={() => setShowMeetingNotes(false)} onCreateTasks={(tasks) => toast.success(`📝 Created ${tasks.length} action items!`)} />
      <Automations isOpen={showAutomations} onClose={() => setShowAutomations(false)} />
      <VoiceCommands onCommand={(cmd) => toast.success(`🎤 Voice command: ${cmd.type}`)} />
      <PomodoroPlus isOpen={showPomodoroPlus} onClose={() => setShowPomodoroPlus(false)} />
      <AdvancedSearch isOpen={showAdvancedSearch} onClose={() => setShowAdvancedSearch(false)} projects={projects} availableTags={Array.from(new Set(tasks.flatMap(t => (t.tags || []).map(tag => typeof tag === 'string' ? tag : tag.label))))} onSearch={(_filters) => toast.success('🔍 Search applied!')} />
      <EmailSettings isOpen={showEmailSettings} onClose={() => setShowEmailSettings(false)} />
      <ShortcutsPanel isOpen={showShortcutsPanel} onClose={() => setShowShortcutsPanel(false)} />
      <DataExport isOpen={showDataExport} onClose={() => setShowDataExport(false)} tasks={tasks} projects={projects} energyLogs={energyLogs.map((log, i) => ({ id: `log-${i}`, energy_level: log.level, created_at: log.timestamp }))} user={{ sub: user?.sub || '', email: user?.email || '', name: user?.name || '' }} />
      <AIQuickCreate isOpen={showAIQuickCreate} onClose={() => setShowAIQuickCreate(false)} onCreateTask={(task) => handleCreateTask(task)} />
      {showTimeTracker && focusTaskId && (
        <TimeTracker taskId={focusTaskId} taskTitle={focusTaskTitle} onSaveTime={(minutes) => { toast.success(`⏱️ Tracked ${minutes} minutes!`); setShowTimeTracker(false); }} />
      )}
      <TemplatesGallery isOpen={showTemplatesGallery} onClose={() => setShowTemplatesGallery(false)} onUseTemplate={(template) => { handleUseTemplate(template as unknown as TaskTemplate); setShowTemplatesGallery(false); }} />
      {showTaskSharing && editingTask && <TaskSharing task={editingTask} />}
      <DailyPlanning isOpen={showDailyPlanning} onClose={() => setShowDailyPlanning(false)} tasks={activeTasks as unknown as Array<{ id: string; title: string; [key: string]: unknown }>} energyPredictions={[]} />
      <IntegrationHub isOpen={showIntegrationHub} onClose={() => setShowIntegrationHub(false)} />
      {showTaskComments && editingTask && <TaskComments taskId={editingTask.id} userName={user?.name || 'User'} />}
      {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}
      <VoiceToTask isOpen={showVoiceToTask} onClose={() => setShowVoiceToTask(false)} onCreateTask={(task) => handleCreateTask({ ...task, priority: (task.priority || 2) as 1 | 2 | 3 | 4 | 5, energy_requirement: (task.energy_requirement || 3) as 1 | 2 | 3 | 4 | 5 })} />
      <QuickCapture onCreateTask={(task) => handleCreateTask({ ...task, priority: 2, energy_requirement: 3 })} />
      
      {/* WP-ENG-02: Emblem Breakdown Modal */}
      <EmblemBreakdownModal
        breakdown={currentEmblemBreakdown}
        totalEmblemCharge={totalEmblemCharge}
        isOpen={showEmblemBreakdown}
        onClose={() => setShowEmblemBreakdown(false)}
      />

      {/* Briefing System Components */}
      {morningBrief && (
        <MorningBrief
          isOpen={showMorningBrief}
          onClose={() => {
            setShowMorningBrief(false);
            markBriefViewed('morning');
          }}
          data={morningBrief}
          onViewTask={(taskId) => {
            // TODO: Navigate to task or highlight in task list
            console.log('View task:', taskId);
          }}
          onViewEvent={(eventId) => {
            // TODO: Navigate to calendar event
            console.log('View event:', eventId);
          }}
        />
      )}

      {eveningBrief && (
        <EveningBrief
          isOpen={showEveningBrief}
          onClose={() => {
            setShowEveningBrief(false);
            markBriefViewed('evening');
          }}
          data={eveningBrief}
          onCarryOverTasks={carryOverTasks}
          onRescheduleTasks={rescheduleTasks}
          onAddReflection={addReflection}
        />
      )}

      {briefingSettings && (
        <BriefingSettings
          isOpen={showBriefingSettings}
          onClose={() => setShowBriefingSettings(false)}
          settings={briefingSettings}
          onSave={updateBriefingSettings}
        />
      )}

      {/* User Testing Program Components */}
      {showBetaRegistration && (
        <BetaRegistration
          onClose={() => setShowBetaRegistration(false)}
          onSuccess={(userId) => {
            console.log('✅ Beta user registered:', userId);
            toast.success('🎉 Welcome to the SyncScript Beta Program!');
            setBetaUserStatus(userTestingProgram.getBetaUserStatus(userId));
            setShowBetaRegistration(false);
          }}
        />
      )}

      {showFeedbackCollector && (
        <FeedbackCollector
          feature={currentFeedbackFeature}
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowFeedbackCollector(false)}
          onSuccess={(feedbackId) => {
            console.log('✅ Feedback submitted:', feedbackId);
            toast.success('🎉 Thank you for your feedback!');
            setShowFeedbackCollector(false);
          }}
        />
      )}

      {/* Phase 2 Enhanced Features */}
      {showAnalyticsDashboard && (
        <AnalyticsDashboard
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowAnalyticsDashboard(false)}
        />
      )}

      {showBudgetIntelligence && (
        <BudgetIntelligence
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowBudgetIntelligence(false)}
        />
      )}

      {/* Phase 3 Advanced Features */}
      {showCustomWorkspace && (
        <CustomWorkspaceLayout
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowCustomWorkspace(false)}
        />
      )}


      {showMobileFoundation && (
        <MobileAppFoundation
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowMobileFoundation(false)}
        />
      )}

      {showApiV2Release && (
        <ApiV2Release
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowApiV2Release(false)}
        />
      )}

      {showWhiteLabelSystem && (
        <WhiteLabelSystem
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowWhiteLabelSystem(false)}
        />
      )}

      {/* Enterprise Security Features */}
      {showEnterpriseSSO && (
        <EnterpriseSSOSystem
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowEnterpriseSSO(false)}
        />
      )}

      {showRBAC && (
        <RoleBasedAccessControl
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowRBAC(false)}
        />
      )}


      {showSecurityAudit && (
        <SecurityAuditLogging
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowSecurityAudit(false)}
        />
      )}

      {/* Team Collaboration Features */}
      {showTeamCreation && (
        <TeamCreationSystem
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowTeamCreation(false)}
        />
      )}

      {showWorkspaceIsolation && (
        <WorkspaceIsolationSystem
          teamId="team-1"
          onClose={() => setShowWorkspaceIsolation(false)}
        />
      )}

      {showTeamMemberManagement && (
        <TeamMemberManagement
          teamId="team-1"
          onClose={() => setShowTeamMemberManagement(false)}
        />
      )}

      {showCollaborativeProjects && (
        <CollaborativeProjectManagement
          teamId="team-1"
          onClose={() => setShowCollaborativeProjects(false)}
        />
      )}

      {showTeamAnalytics && (
        <TeamAnalyticsDashboard
          teamId="team-1"
          onClose={() => setShowTeamAnalytics(false)}
        />
      )}

      {/* Payment & Monetization Features */}
      {showStripePayment && (
        <StripePaymentIntegration
          teamId="team-1"
          onClose={() => setShowStripePayment(false)}
        />
      )}

      {showSubscriptionManagement && (
        <SubscriptionManagement
          teamId="team-1"
          onClose={() => setShowSubscriptionManagement(false)}
        />
      )}

      {showRevenueAnalytics && (
        <RevenueAnalytics
          teamId="team-1"
          onClose={() => setShowRevenueAnalytics(false)}
        />
      )}

      {/* Real-Time Collaboration Features */}
      {showWebSocketIntegration && (
        <WebSocketIntegration
          teamId="team-1"
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowWebSocketIntegration(false)}
        />
      )}

      {showLivePresence && (
        <LivePresenceSystem
          teamId="team-1"
          onClose={() => setShowLivePresence(false)}
        />
      )}

      {showRealTimeUpdates && (
        <RealTimeUpdatesSystem
          teamId="team-1"
          onClose={() => setShowRealTimeUpdates(false)}
        />
      )}

      {showInstantNotifications && (
        <InstantNotificationsSystem
          teamId="team-1"
          userId={user?.sub || 'anonymous'}
          onClose={() => setShowInstantNotifications(false)}
        />
      )}

      {/* Mobile Optimization Features */}
      {showPWAFoundation && (
        <PWAFoundation
          onClose={() => setShowPWAFoundation(false)}
        />
      )}

      {showOfflineArchitecture && (
        <OfflineFirstArchitecture
          onClose={() => setShowOfflineArchitecture(false)}
        />
      )}

      {showTouchGestures && (
        <TouchGesturesSystem
          onClose={() => setShowTouchGestures(false)}
        />
      )}

      {showMobilePush && (
        <MobilePushNotifications
          onClose={() => setShowMobilePush(false)}
        />
      )}

      {/* Advanced Integrations Features */}
      {showIntegrationsHub && (
        <ThirdPartyIntegrationsHub
          onClose={() => setShowIntegrationsHub(false)}
        />
      )}

      {showAPIMarketplace && (
        <APIMarketplace
          onClose={() => setShowAPIMarketplace(false)}
        />
      )}

      {showWebhookSystem && (
        <WebhookSystem
          onClose={() => setShowWebhookSystem(false)}
        />
      )}

      {showSyncScriptSDK && (
        <SyncScriptSDK
          onClose={() => setShowSyncScriptSDK(false)}
        />
      )}

      {/* Enterprise Features */}
      {showEnterpriseSecurity && (
        <AdvancedEnterpriseSecurity
          onClose={() => setShowEnterpriseSecurity(false)}
        />
      )}

      {showEnterpriseAdmin && (
        <EnterpriseAdminDashboard
          onClose={() => setShowEnterpriseAdmin(false)}
        />
      )}

      {showEnterpriseAnalytics && (
        <AdvancedAnalyticsReporting
          onClose={() => setShowEnterpriseAnalytics(false)}
        />
      )}

      {showWhiteLabelSolutions && (
        <WhiteLabelSolutions
          onClose={() => setShowWhiteLabelSolutions(false)}
        />
      )}

      {/* AI Features */}
      {showAIProductivityAssistant && (
        <AIProductivityAssistant
          onClose={() => setShowAIProductivityAssistant(false)}
        />
      )}

      {showIntelligentAutomation && (
        <IntelligentAutomationEngine
          onClose={() => setShowIntelligentAutomation(false)}
        />
      )}

      {showPredictiveAnalytics && (
        <PredictiveAnalyticsInsights
          onClose={() => setShowPredictiveAnalytics(false)}
        />
      )}

      {showAIContentGeneration && (
        <AIContentGeneration
          onClose={() => setShowAIContentGeneration(false)}
        />
      )}

      {/* Mobile Features */}
      {showMobileAppFoundation && (
        <ReactNativeMobileAppFoundation
          onClose={() => setShowMobileAppFoundation(false)}
        />
      )}

      {showOfflineSync && (
        <OfflineSynchronizationSystem
          onClose={() => setShowOfflineSync(false)}
        />
      )}

      {showMobileSpecificFeatures && (
        <MobileSpecificFeatures
          onClose={() => setShowMobileSpecificFeatures(false)}
        />
      )}

      {showCrossPlatformSync && (
        <CrossPlatformSync
          onClose={() => setShowCrossPlatformSync(false)}
        />
      )}

      {/* Global Features */}
      {showMultiLanguageSupport && (
        <MultiLanguageSupport
          onClose={() => setShowMultiLanguageSupport(false)}
        />
      )}

      {showTimeZoneManagement && (
        <TimeZoneManagement
          onClose={() => setShowTimeZoneManagement(false)}
        />
      )}

      {showCurrencySupport && (
        <CurrencySupport
          onClose={() => setShowCurrencySupport(false)}
        />
      )}

      {showRegionalCompliance && (
        <RegionalCompliance
          onClose={() => setShowRegionalCompliance(false)}
        />
      )}

      {/* Gamification Features */}
      {showAchievementSystem && (
        <AchievementSystem
          onClose={() => setShowAchievementSystem(false)}
        />
      )}

      {showLeaderboardsSystem && (
        <LeaderboardsSystem
          onClose={() => setShowLeaderboardsSystem(false)}
        />
      )}

      {showVirtualRewardsSystem && (
        <VirtualRewardsSystem
          onClose={() => setShowVirtualRewardsSystem(false)}
        />
      )}

      {showSocialFeatures && (
        <SocialFeatures
          onClose={() => setShowSocialFeatures(false)}
        />
      )}

      {showGamingElements && (
        <GamingElements
          onClose={() => setShowGamingElements(false)}
        />
      )}
    </div>
  );
}
