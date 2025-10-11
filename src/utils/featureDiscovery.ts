/**
 * Feature Discovery System
 * WP-PAR-01: Progressive feature discovery with contextual tips
 * 
 * Goal: Feature discovery 40% → 75% (+35pp)
 * Users discover 10+ features in first 30 days
 */

export interface DiscoveryTip {
  id: string;
  featureName: string;
  title: string;
  description: string;
  icon: string;
  trigger: 'manual' | 'automatic' | 'achievement' | 'contextual';
  condition?: () => boolean;
  priority: number; // 1-5, higher = more important
  category: 'productivity' | 'energy' | 'budget' | 'context' | 'team' | 'advanced';
  actionButton?: {
    label: string;
    action: () => void;
  };
}

export interface UserDiscoveryProgress {
  discoveredFeatures: string[]; // feature IDs
  dismissedTips: string[]; // tip IDs
  completedAchievements: string[];
  lastTipShown: string | null;
  lastTipTime: number;
}

/**
 * All discovery tips
 */
export const DISCOVERY_TIPS: DiscoveryTip[] = [
  // Energy Features
  {
    id: 'energy-recalibration',
    featureName: 'Energy Recalibration',
    title: '⚡ Your Energy Updates Automatically!',
    description: 'Complete a task and watch your energy level adjust in real-time based on the match.',
    icon: '⚡',
    trigger: 'contextual',
    priority: 5,
    category: 'energy'
  },
  {
    id: 'emblem-breakdown',
    featureName: 'Emblem Breakdown',
    title: '💎 See How You Earned Emblems',
    description: 'Click on emblem charges to see the full breakdown: base, energy match, and streak bonuses!',
    icon: '💎',
    trigger: 'contextual',
    priority: 4,
    category: 'energy'
  },
  {
    id: 'energy-matching',
    featureName: 'Energy Matching',
    title: '🎯 Match Tasks to Your Energy',
    description: 'SyncScript suggests tasks that match your current energy level. Work smarter, not harder!',
    icon: '🎯',
    trigger: 'automatic',
    priority: 5,
    category: 'energy'
  },
  
  // Budget Features
  {
    id: 'comfort-bands',
    featureName: 'Comfort Bands',
    title: '💰 Set Your Budget Comfort Zones',
    description: 'Define min/ideal/max spending per category to see budget fit stars on all recommendations.',
    icon: '💰',
    trigger: 'contextual',
    priority: 4,
    category: 'budget'
  },
  {
    id: 'budget-fit-stars',
    featureName: 'Budget Fit Scoring',
    title: '⭐ Budget Fit Stars',
    description: 'See 5-star ratings on recommendations to know what fits your budget before committing!',
    icon: '⭐',
    trigger: 'contextual',
    priority: 4,
    category: 'budget'
  },
  {
    id: 'savings-goals',
    featureName: 'Savings Goals',
    title: '🎯 Connect Spending to Dreams',
    description: 'Set savings goals and see \"Skip this = $50 closer to vacation\" on over-budget items!',
    icon: '🎯',
    trigger: 'contextual',
    priority: 3,
    category: 'budget'
  },
  
  // Context Features
  {
    id: 'leave-by',
    featureName: 'Leave-By Time',
    title: '🚗 Never Be Late Again',
    description: 'See when to leave for events with real-time traffic awareness. \"Leave by 2:25 PM\"',
    icon: '🚗',
    trigger: 'contextual',
    priority: 5,
    category: 'context'
  },
  {
    id: 'weather',
    featureName: 'Weather Integration',
    title: '🌤️ Weather-Aware Planning',
    description: 'See weather conditions and severe alerts on events. Never get caught in the rain!',
    icon: '🌤️',
    trigger: 'contextual',
    priority: 4,
    category: 'context'
  },
  
  // Productivity Features
  {
    id: 'command-center',
    featureName: 'Command Center',
    title: '⌨️ Command Center (Cmd+K)',
    description: 'Press Cmd+K to instantly access all features. The fastest way to navigate SyncScript!',
    icon: '⌨️',
    trigger: 'manual',
    priority: 5,
    category: 'productivity'
  },
  {
    id: 'smart-suggestions',
    featureName: 'Smart Suggestions',
    title: '🤖 AI-Powered Suggestions',
    description: 'Get personalized task recommendations based on your energy, time, and patterns.',
    icon: '🤖',
    trigger: 'automatic',
    priority: 4,
    category: 'productivity'
  },
  {
    id: 'ai-explainability',
    featureName: 'AI Explainability',
    title: '💡 Understand AI Suggestions',
    description: 'Click \"Why this?\" on any suggestion to see the AI\'s reasoning and build trust!',
    icon: '💡',
    trigger: 'contextual',
    priority: 3,
    category: 'productivity'
  },
  
  // Advanced Features
  {
    id: 'time-blocking',
    featureName: 'Time Blocking',
    title: '📅 Time Blocking',
    description: 'Automatically schedule your day with AI-powered time blocking based on energy patterns.',
    icon: '📅',
    trigger: 'manual',
    priority: 2,
    category: 'advanced'
  },
  {
    id: 'habit-tracker',
    featureName: 'Habit Tracker',
    title: '🔄 Build Better Habits',
    description: 'Track daily habits with streaks, reminders, and visual progress indicators.',
    icon: '🔄',
    trigger: 'manual',
    priority: 2,
    category: 'advanced'
  },
  {
    id: 'weekly-review',
    featureName: 'Weekly Review',
    title: '📊 Weekly Review',
    description: 'Reflect on your week with detailed analytics, patterns, and achievements.',
    icon: '📊',
    trigger: 'achievement',
    priority: 2,
    category: 'advanced'
  }
];

/**
 * Load user discovery progress
 */
export function loadDiscoveryProgress(): UserDiscoveryProgress {
  if (typeof window === 'undefined') {
    return {
      discoveredFeatures: [],
      dismissedTips: [],
      completedAchievements: [],
      lastTipShown: null,
      lastTipTime: 0
    };
  }
  
  try {
    const stored = localStorage.getItem('feature_discovery_progress');
    if (!stored) {
      return {
        discoveredFeatures: [],
        dismissedTips: [],
        completedAchievements: [],
        lastTipShown: null,
        lastTipTime: 0
      };
    }
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading discovery progress:', error);
    return {
      discoveredFeatures: [],
      dismissedTips: [],
      completedAchievements: [],
      lastTipShown: null,
      lastTipTime: 0
    };
  }
}

/**
 * Save user discovery progress
 */
export function saveDiscoveryProgress(progress: UserDiscoveryProgress): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('feature_discovery_progress', JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving discovery progress:', error);
  }
}

/**
 * Mark a feature as discovered
 */
export function markFeatureDiscovered(featureId: string): void {
  const progress = loadDiscoveryProgress();
  
  if (!progress.discoveredFeatures.includes(featureId)) {
    progress.discoveredFeatures.push(featureId);
    saveDiscoveryProgress(progress);
    
    console.log(`🎯 Feature Discovered: ${featureId} (${progress.discoveredFeatures.length} total)`);
  }
}

/**
 * Dismiss a tip
 */
export function dismissTip(tipId: string): void {
  const progress = loadDiscoveryProgress();
  
  if (!progress.dismissedTips.includes(tipId)) {
    progress.dismissedTips.push(tipId);
    progress.lastTipShown = tipId;
    progress.lastTipTime = Date.now();
    saveDiscoveryProgress(progress);
  }
}

/**
 * Get next tip to show
 */
export function getNextTip(context?: {
  currentPage?: string;
  userAction?: string;
  recentFeatures?: string[];
}): DiscoveryTip | null {
  const progress = loadDiscoveryProgress();
  
  // Don't show tips too frequently (minimum 5 minutes apart)
  const MIN_TIP_INTERVAL = 5 * 60 * 1000;
  if (progress.lastTipTime && (Date.now() - progress.lastTipTime) < MIN_TIP_INTERVAL) {
    return null;
  }
  
  // Filter out already discovered and dismissed tips
  const availableTips = DISCOVERY_TIPS.filter(tip => 
    !progress.discoveredFeatures.includes(tip.id) &&
    !progress.dismissedTips.includes(tip.id)
  );
  
  if (availableTips.length === 0) return null;
  
  // Sort by priority (highest first)
  availableTips.sort((a, b) => b.priority - a.priority);
  
  // Return highest priority tip
  return availableTips[0];
}

/**
 * Get discovery stats
 */
export function getDiscoveryStats(): {
  discovered: number;
  total: number;
  percentage: number;
  category Breakdown: { [key: string]: { discovered: number; total: number } };
} {
  const progress = loadDiscoveryProgress();
  const total = DISCOVERY_TIPS.length;
  const discovered = progress.discoveredFeatures.length;
  const percentage = Math.round((discovered / total) * 100);
  
  // Calculate category breakdown
  const categoryBreakdown: { [key: string]: { discovered: number; total: number } } = {};
  
  DISCOVERY_TIPS.forEach(tip => {
    if (!categoryBreakdown[tip.category]) {
      categoryBreakdown[tip.category] = { discovered: 0, total: 0 };
    }
    categoryBreakdown[tip.category].total++;
    
    if (progress.discoveredFeatures.includes(tip.id)) {
      categoryBreakdown[tip.category].discovered++;
    }
  });
  
  return {
    discovered,
    total,
    percentage,
    categoryBreakdown
  };
}

/**
 * Get tips by category
 */
export function getTipsByCategory(category: string): DiscoveryTip[] {
  return DISCOVERY_TIPS.filter(tip => tip.category === category);
}

/**
 * Reset discovery progress (for testing)
 */
export function resetDiscoveryProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('feature_discovery_progress');
}

// Export for testing
export const __test__ = {
  getNextTip,
  getDiscoveryStats
};

