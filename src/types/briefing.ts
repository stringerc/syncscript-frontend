// 📋 BRIEFING SYSTEM - DATA MODELS & TYPES

export interface BriefingSettings {
  id: string;
  userId: string;
  
  // Morning Brief Settings
  morningBrief: {
    enabled: boolean;
    frequency: 'daily' | 'weekdays' | 'custom';
    customDays?: number[]; // 0-6 (Sunday-Saturday)
    deliveryTime: string; // HH:MM format
    deliveryChannels: ('in-app' | 'email' | 'slack')[];
    contentModules: {
      previousDaySummary: boolean;
      todayTasks: boolean;
      calendarEvents: boolean;
      energyGamePlan: boolean;
      contextualInsights: boolean;
      weather: boolean;
      news: boolean;
      motivationalQuote: boolean;
    };
    tone: 'professional' | 'casual' | 'motivational';
  };
  
  // Evening Brief Settings
  eveningBrief: {
    enabled: boolean;
    frequency: 'daily' | 'weekdays' | 'custom';
    customDays?: number[];
    deliveryTime: string;
    deliveryChannels: ('in-app' | 'email' | 'slack')[];
    contentModules: {
      completedTasksSummary: boolean;
      energyLevelAchieved: boolean;
      dailyProductivityStats: boolean;
      pendingItems: boolean;
      reflectionPrompt: boolean;
      achievements: boolean;
      nextDayPrep: boolean;
    };
    tone: 'professional' | 'casual' | 'celebratory';
  };
  
  // Global Settings
  timezone: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface MorningBriefData {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  generatedAt: string;
  
  // Previous Day Summary
  previousDay: {
    tasksCompleted: number;
    energyPointsEarned: number;
    achievementsUnlocked: string[];
    streaksMaintained: {
      loginStreak: number;
      taskCompletionStreak: number;
      energyLevelStreak: number;
    };
    notableAccomplishments: string[];
  };
  
  // Today's Agenda
  todayAgenda: {
    highPriorityTasks: Array<{
      id: string;
      title: string;
      priority: number;
      estimatedDuration: number;
      energyLevel: number;
    }>;
    calendarEvents: Array<{
      id: string;
      title: string;
      startTime: string;
      endTime: string;
      location?: string;
      attendees?: string[];
    }>;
    suggestedSchedule: Array<{
      timeBlock: string;
      taskId: string;
      energyLevel: number;
      reasoning: string;
    }>;
  };
  
  // Energy Game Plan
  energyGamePlan: {
    currentEnergy: number;
    targetEnergy: number;
    suggestedTasks: Array<{
      taskId: string;
      energyGain: number;
      difficulty: 'easy' | 'medium' | 'hard';
    }>;
    motivationalMessage: string;
    energyTips: string[];
  };
  
  // Contextual Insights
  contextualInsights: {
    aiSummary: string;
    productivityTips: string[];
    scheduleAnalysis: string;
    energyOptimization: string;
  };
  
  // Optional Content
  optionalContent?: {
    weather?: {
      temperature: number;
      condition: string;
      icon: string;
      recommendation: string;
    };
    news?: Array<{
      title: string;
      summary: string;
      source: string;
      relevance: 'high' | 'medium' | 'low';
    }>;
    motivationalQuote?: {
      quote: string;
      author: string;
      category: string;
    };
  };
  
  // Delivery Status
  deliveryStatus: {
    inApp: { delivered: boolean; viewed: boolean; viewedAt?: string };
    email: { sent: boolean; sentAt?: string; opened?: boolean };
    slack: { posted: boolean; postedAt?: string; channel?: string };
  };
}

export interface EveningBriefData {
  id: string;
  userId: string;
  date: string;
  generatedAt: string;
  
  // Completed Tasks Summary
  completedTasks: {
    total: number;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
    tasks: Array<{
      id: string;
      title: string;
      completedAt: string;
      energyGained: number;
      category: string;
      priority: number;
    }>;
    totalEnergyGained: number;
  };
  
  // Energy Level Achieved
  energyAchievement: {
    finalEnergy: number;
    maxEnergy: number;
    energyPercentage: number;
    emblemAnimation: 'dim' | 'glowing' | 'pulsing' | 'vibrant';
    celebrationLevel: 'none' | 'subtle' | 'moderate' | 'extreme';
    motivationalMessage: string;
    nextDayGoal: string;
  };
  
  // Daily Productivity Stats
  productivityStats: {
    hoursWorked: number;
    timeByCategory: Record<string, number>;
    focusSessions: number;
    totalFocusMinutes: number;
    breaksTaken: number;
    efficiencyScore: number;
    productivityTrend: 'up' | 'down' | 'stable';
  };
  
  // Pending Items & Next Day Prep
  pendingItems: {
    incompleteTasks: Array<{
      id: string;
      title: string;
      priority: number;
      dueDate?: string;
      suggestedAction: 'carry-over' | 'reschedule' | 'defer' | 'cancel';
    }>;
    carryOverPrompt: string;
    quickActions: Array<{
      action: string;
      taskIds: string[];
      description: string;
    }>;
  };
  
  // Reflection and Achievements
  reflection: {
    prompt: string;
    userResponse?: string;
    achievementsUnlocked: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      rarity: 'common' | 'rare' | 'epic' | 'legendary';
    }>;
    streaksUpdated: {
      loginStreak: number;
      taskCompletionStreak: number;
      energyLevelStreak: number;
    };
    encouragementMessage: string;
  };
  
  // Delivery Status
  deliveryStatus: {
    inApp: { delivered: boolean; viewed: boolean; viewedAt?: string };
    email: { sent: boolean; sentAt?: string; opened?: boolean };
    slack: { posted: boolean; postedAt?: string; channel?: string };
  };
}

export interface BriefingTemplate {
  id: string;
  name: string;
  description: string;
  category: 'morning' | 'evening' | 'both';
  settings: Partial<BriefingSettings>;
  isDefault: boolean;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
}

export interface BriefingAnalytics {
  userId: string;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  
  morningBrief: {
    totalGenerated: number;
    totalViewed: number;
    averageViewTime: number;
    mostViewedModules: string[];
    userEngagement: number;
  };
  
  eveningBrief: {
    totalGenerated: number;
    totalViewed: number;
    averageViewTime: number;
    mostViewedModules: string[];
    userEngagement: number;
  };
  
  productivityImpact: {
    averageEnergyLevel: number;
    taskCompletionRate: number;
    streakMaintenance: number;
    userSatisfaction: number;
  };
}

// API Response Types
export interface BriefingAPIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface BriefingGenerationRequest {
  userId: string;
  type: 'morning' | 'evening';
  date: string;
  forceRegenerate?: boolean;
}

export interface BriefingDeliveryRequest {
  briefingId: string;
  channels: ('in-app' | 'email' | 'slack')[];
  scheduledTime?: string;
}
