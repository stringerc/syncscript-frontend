#!/usr/bin/env python3
"""
🧠 GEMINI PHASE 5: Utility Files Template Generator
Mission: Generate clean templates for 10 utility files
"""

import os

def generate_achievement_system_ts():
    """Generate clean src/utils/achievementSystem.ts"""
    return '''import { create } from 'zustand';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

interface AchievementStore {
  achievements: Achievement[];
  totalPoints: number;
  unlockedCount: number;
  unlockAchievement: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  resetAchievements: () => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first_task',
    title: 'First Task',
    description: 'Complete your first task',
    icon: '🎯',
    points: 10,
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'streak_week',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    points: 50,
    unlocked: false,
    progress: 0,
    maxProgress: 7
  },
  {
    id: 'productivity_master',
    title: 'Productivity Master',
    description: 'Complete 100 tasks',
    icon: '⚡',
    points: 100,
    unlocked: false,
    progress: 0,
    maxProgress: 100
  }
];

export const useAchievementStore = create<AchievementStore>((set, get) => ({
  achievements: defaultAchievements,
  totalPoints: 0,
  unlockedCount: 0,

  unlockAchievement: (id: string) => {
    set((state) => ({
      achievements: state.achievements.map((achievement) =>
        achievement.id === id && !achievement.unlocked
          ? {
              ...achievement,
              unlocked: true,
              unlockedAt: new Date(),
              progress: achievement.maxProgress
            }
          : achievement
      ),
      totalPoints: state.totalPoints + (state.achievements.find(a => a.id === id)?.points || 0),
      unlockedCount: state.unlockedCount + 1
    }));
  },

  updateProgress: (id: string, progress: number) => {
    set((state) => ({
      achievements: state.achievements.map((achievement) =>
        achievement.id === id
          ? {
              ...achievement,
              progress: Math.min(progress, achievement.maxProgress)
            }
          : achievement
      )
    }));

    // Check if achievement should be unlocked
    const achievement = get().achievements.find(a => a.id === id);
    if (achievement && achievement.progress >= achievement.maxProgress && !achievement.unlocked) {
      get().unlockAchievement(id);
    }
  },

  resetAchievements: () => {
    set({
      achievements: defaultAchievements,
      totalPoints: 0,
      unlockedCount: 0
    });
  }
}));

export const getAchievementById = (id: string): Achievement | undefined => {
  return useAchievementStore.getState().achievements.find(a => a.id === id);
};

export const getUnlockedAchievements = (): Achievement[] => {
  return useAchievementStore.getState().achievements.filter(a => a.unlocked);
};

export const getTotalPoints = (): number => {
  return useAchievementStore.getState().totalPoints;
};
'''

def generate_customization_ts():
    """Generate clean src/utils/customization.ts"""
    return '''import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomizationSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  animations: boolean;
  soundEffects: boolean;
  notifications: boolean;
  sidebarCollapsed: boolean;
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface CustomizationStore {
  settings: CustomizationSettings;
  updateSetting: <K extends keyof CustomizationSettings>(
    key: K,
    value: CustomizationSettings[K]
  ) => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
}

const defaultSettings: CustomizationSettings = {
  theme: 'auto',
  fontSize: 'medium',
  compactMode: false,
  animations: true,
  soundEffects: true,
  notifications: true,
  sidebarCollapsed: false,
  customColors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    accent: '#F59E0B'
  }
};

export const useCustomizationStore = create<CustomizationStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,

      updateSetting: (key, value) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value
          }
        }));
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
      },

      exportSettings: () => {
        const settings = useCustomizationStore.getState().settings;
        return JSON.stringify(settings, null, 2);
      },

      importSettings: (settingsJson: string) => {
        try {
          const importedSettings = JSON.parse(settingsJson);
          
          // Validate the imported settings
          if (typeof importedSettings === 'object' && importedSettings !== null) {
            set({ settings: { ...defaultSettings, ...importedSettings } });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Failed to import settings:', error);
          return false;
        }
      }
    }),
    {
      name: 'customization-storage',
      version: 1
    }
  )
);

export const getTheme = (): string => {
  const settings = useCustomizationStore.getState().settings;
  
  if (settings.theme === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  return settings.theme;
};

export const applyCustomColors = (): void => {
  const settings = useCustomizationStore.getState().settings;
  const root = document.documentElement;
  
  root.style.setProperty('--color-primary', settings.customColors.primary);
  root.style.setProperty('--color-secondary', settings.customColors.secondary);
  root.style.setProperty('--color-accent', settings.customColors.accent);
};

export const toggleSidebar = (): void => {
  const currentState = useCustomizationStore.getState().settings.sidebarCollapsed;
  useCustomizationStore.getState().updateSetting('sidebarCollapsed', !currentState);
};
'''

def generate_savings_goals_ts():
    """Generate clean src/utils/savingsGoals.ts"""
    return '''import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: 'emergency' | 'vacation' | 'purchase' | 'investment' | 'other';
  priority: 'low' | 'medium' | 'high';
  description?: string;
  createdAt: Date;
  completed: boolean;
}

interface SavingsStore {
  goals: SavingsGoal[];
  totalSaved: number;
  addGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount' | 'createdAt' | 'completed'>) => void;
  updateGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  deleteGoal: (id: string) => void;
  addContribution: (goalId: string, amount: number) => void;
  getGoalProgress: (goalId: string) => number;
  getGoalsByCategory: (category: SavingsGoal['category']) => SavingsGoal[];
  getTotalTargetAmount: () => number;
}

export const useSavingsStore = create<SavingsStore>()(
  persist(
    (set, get) => ({
      goals: [],
      totalSaved: 0,

      addGoal: (goalData) => {
        const newGoal: SavingsGoal = {
          ...goalData,
          id: Date.now().toString(),
          currentAmount: 0,
          createdAt: new Date(),
          completed: false
        };

        set((state) => ({
          goals: [...state.goals, newGoal]
        }));
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          )
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id)
        }));
      },

      addContribution: (goalId, amount) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId
              ? {
                  ...goal,
                  currentAmount: goal.currentAmount + amount,
                  completed: goal.currentAmount + amount >= goal.targetAmount
                }
              : goal
          )
        }));

        // Update total saved
        set((state) => ({
          totalSaved: state.goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
        }));
      },

      getGoalProgress: (goalId) => {
        const goal = get().goals.find((g) => g.id === goalId);
        if (!goal) return 0;
        return (goal.currentAmount / goal.targetAmount) * 100;
      },

      getGoalsByCategory: (category) => {
        return get().goals.filter((goal) => goal.category === category);
      },

      getTotalTargetAmount: () => {
        return get().goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
      }
    }),
    {
      name: 'savings-storage',
      version: 1
    }
  )
);

export const calculateTimeToGoal = (goal: SavingsGoal): number => {
  const now = new Date();
  const timeDiff = goal.targetDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (daysRemaining <= 0) return 0;
  
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const dailyTarget = remainingAmount / daysRemaining;
  
  return Math.max(0, dailyTarget);
};

export const getSavingsInsights = () => {
  const goals = useSavingsStore.getState().goals;
  const totalSaved = useSavingsStore.getState().totalSaved;
  const totalTarget = useSavingsStore.getState().getTotalTargetAmount();
  
  return {
    totalGoals: goals.length,
    completedGoals: goals.filter(g => g.completed).length,
    totalSaved,
    totalTarget,
    overallProgress: totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0,
    averageGoalValue: goals.length > 0 ? totalTarget / goals.length : 0
  };
};
'''

def generate_streak_system_ts():
    """Generate clean src/utils/streakSystem.ts"""
    return '''import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Streak {
  id: string;
  name: string;
  currentStreak: number;
  longestStreak: number;
  lastActivity: Date;
  target: number;
  category: 'productivity' | 'health' | 'learning' | 'creative' | 'other';
  description?: string;
  createdAt: Date;
}

interface StreakStore {
  streaks: Streak[];
  activeStreaks: Streak[];
  updateStreak: (id: string, activity: boolean) => void;
  addStreak: (streak: Omit<Streak, 'id' | 'currentStreak' | 'longestStreak' | 'lastActivity' | 'createdAt'>) => void;
  deleteStreak: (id: string) => void;
  resetStreak: (id: string) => void;
  getStreakById: (id: string) => Streak | undefined;
  getTotalActiveStreaks: () => number;
  getStreaksByCategory: (category: Streak['category']) => Streak[];
}

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
};

export const useStreakStore = create<StreakStore>()(
  persist(
    (set, get) => ({
      streaks: [],
      activeStreaks: [],

      updateStreak: (id, activity) => {
        set((state) => ({
          streaks: state.streaks.map((streak) => {
            if (streak.id !== id) return streak;

            const now = new Date();
            const wasActiveYesterday = isYesterday(streak.lastActivity);
            const isActiveToday = isSameDay(streak.lastActivity, now);

            if (activity) {
              if (!isActiveToday) {
                // New activity
                if (wasActiveYesterday || streak.currentStreak === 0) {
                  // Continue streak
                  return {
                    ...streak,
                    currentStreak: streak.currentStreak + 1,
                    longestStreak: Math.max(streak.longestStreak, streak.currentStreak + 1),
                    lastActivity: now
                  };
                } else {
                  // Start new streak
                  return {
                    ...streak,
                    currentStreak: 1,
                    longestStreak: Math.max(streak.longestStreak, 1),
                    lastActivity: now
                  };
                }
              }
            } else {
              // No activity today
              if (wasActiveYesterday) {
                // Streak continues (no penalty for missing one day)
                return streak;
              } else if (!isActiveToday && streak.currentStreak > 0) {
                // Streak broken
                return {
                  ...streak,
                  currentStreak: 0,
                  lastActivity: now
                };
              }
            }

            return streak;
          })
        }));

        // Update active streaks
        set((state) => ({
          activeStreaks: state.streaks.filter((streak) => streak.currentStreak > 0)
        }));
      },

      addStreak: (streakData) => {
        const newStreak: Streak = {
          ...streakData,
          id: Date.now().toString(),
          currentStreak: 0,
          longestStreak: 0,
          lastActivity: new Date(),
          createdAt: new Date()
        };

        set((state) => ({
          streaks: [...state.streaks, newStreak]
        }));
      },

      deleteStreak: (id) => {
        set((state) => ({
          streaks: state.streaks.filter((streak) => streak.id !== id),
          activeStreaks: state.activeStreaks.filter((streak) => streak.id !== id)
        }));
      },

      resetStreak: (id) => {
        set((state) => ({
          streaks: state.streaks.map((streak) =>
            streak.id === id
              ? {
                  ...streak,
                  currentStreak: 0,
                  lastActivity: new Date()
                }
              : streak
          )
        }));
      },

      getStreakById: (id) => {
        return get().streaks.find((streak) => streak.id === id);
      },

      getTotalActiveStreaks: () => {
        return get().activeStreaks.length;
      },

      getStreaksByCategory: (category) => {
        return get().streaks.filter((streak) => streak.category === category);
      }
    }),
    {
      name: 'streak-storage',
      version: 1
    }
  )
);

export const getStreakStatus = (streak: Streak): 'active' | 'broken' | 'new' => {
  const now = new Date();
  const wasActiveToday = isSameDay(streak.lastActivity, now);
  const wasActiveYesterday = isYesterday(streak.lastActivity);

  if (streak.currentStreak === 0) return 'new';
  if (wasActiveToday || wasActiveYesterday) return 'active';
  return 'broken';
};

export const getStreakMotivation = (streak: Streak): string => {
  const status = getStreakStatus(streak);
  
  switch (status) {
    case 'active':
      if (streak.currentStreak >= streak.target) {
        return `🎉 Amazing! You've reached your target of ${streak.target} days!`;
      }
      return `🔥 Keep it up! ${streak.target - streak.currentStreak} days to go!`;
    case 'broken':
      return `💪 Don't give up! Start a new streak today!`;
    case 'new':
      return `🚀 Ready to start your ${streak.name} streak?`;
    default:
      return 'Keep going!';
  }
};

export const getTotalStreakDays = (): number => {
  const streaks = useStreakStore.getState().streaks;
  return streaks.reduce((total, streak) => total + streak.currentStreak, 0);
};
'''

def generate_goal_tracker_ts():
    """Generate clean src/utils/goalTracker.ts"""
    return '''import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Goal {
  id: string;
  title: string;
  description?: string;
  category: 'personal' | 'work' | 'health' | 'learning' | 'financial' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  targetDate?: Date;
  createdAt: Date;
  completedAt?: Date;
  progress: number;
  maxProgress: number;
  unit: string;
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
}

interface GoalStore {
  goals: Goal[];
  activeGoals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'progress' | 'milestones'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  completeGoal: (id: string) => void;
  addMilestone: (goalId: string, milestone: Omit<Milestone, 'id'>) => void;
  completeMilestone: (goalId: string, milestoneId: string) => void;
  getGoalsByCategory: (category: Goal['category']) => Goal[];
  getGoalsByStatus: (status: Goal['status']) => Goal[];
  getGoalById: (id: string) => Goal | undefined;
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set, get) => ({
      goals: [],
      activeGoals: [],

      addGoal: (goalData) => {
        const newGoal: Goal = {
          ...goalData,
          id: Date.now().toString(),
          createdAt: new Date(),
          progress: 0,
          milestones: []
        };

        set((state) => ({
          goals: [...state.goals, newGoal],
          activeGoals: newGoal.status === 'active' ? [...state.activeGoals, newGoal] : state.activeGoals
        }));
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          ),
          activeGoals: state.goals
            .map((goal) => (goal.id === id ? { ...goal, ...updates } : goal))
            .filter((goal) => goal.status === 'active')
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
          activeGoals: state.activeGoals.filter((goal) => goal.id !== id)
        }));
      },

      updateProgress: (id, progress) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? {
                  ...goal,
                  progress: Math.min(Math.max(progress, 0), goal.maxProgress)
                }
              : goal
          )
        }));
      },

      completeGoal: (id) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? {
                  ...goal,
                  status: 'completed' as const,
                  progress: goal.maxProgress,
                  completedAt: new Date()
                }
              : goal
          ),
          activeGoals: state.activeGoals.filter((goal) => goal.id !== id)
        }));
      },

      addMilestone: (goalId, milestoneData) => {
        const newMilestone: Milestone = {
          ...milestoneData,
          id: Date.now().toString()
        };

        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId
              ? {
                  ...goal,
                  milestones: [...goal.milestones, newMilestone]
                }
              : goal
          )
        }));
      },

      completeMilestone: (goalId, milestoneId) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId
              ? {
                  ...goal,
                  milestones: goal.milestones.map((milestone) =>
                    milestone.id === milestoneId
                      ? {
                          ...milestone,
                          completed: true,
                          completedAt: new Date()
                        }
                      : milestone
                  )
                }
              : goal
          )
        }));
      },

      getGoalsByCategory: (category) => {
        return get().goals.filter((goal) => goal.category === category);
      },

      getGoalsByStatus: (status) => {
        return get().goals.filter((goal) => goal.status === status);
      },

      getGoalById: (id) => {
        return get().goals.find((goal) => goal.id === id);
      }
    }),
    {
      name: 'goal-storage',
      version: 1
    }
  )
);

export const getGoalProgress = (goal: Goal): number => {
  return (goal.progress / goal.maxProgress) * 100;
};

export const getDaysRemaining = (goal: Goal): number => {
  if (!goal.targetDate) return -1;
  
  const now = new Date();
  const timeDiff = goal.targetDate.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const getGoalStatus = (goal: Goal): 'on-track' | 'behind' | 'ahead' | 'completed' => {
  if (goal.status === 'completed') return 'completed';
  
  if (!goal.targetDate) return 'on-track';
  
  const daysRemaining = getDaysRemaining(goal);
  const progressPercentage = getGoalProgress(goal);
  const expectedProgress = Math.max(0, ((goal.maxProgress - daysRemaining) / goal.maxProgress) * 100);
  
  if (progressPercentage >= expectedProgress + 10) return 'ahead';
  if (progressPercentage <= expectedProgress - 10) return 'behind';
  return 'on-track';
};

export const getGoalInsights = () => {
  const goals = useGoalStore.getState().goals;
  const activeGoals = useGoalStore.getState().activeGoals;
  const completedGoals = goals.filter(g => g.status === 'completed');
  
  return {
    totalGoals: goals.length,
    activeGoals: activeGoals.length,
    completedGoals: completedGoals.length,
    completionRate: goals.length > 0 ? (completedGoals.length / goals.length) * 100 : 0,
    averageProgress: activeGoals.length > 0 
      ? activeGoals.reduce((sum, goal) => sum + getGoalProgress(goal), 0) / activeGoals.length 
      : 0
  };
};
'''

def generate_habit_tracker_ts():
    """Generate clean src/utils/habitTracker.ts"""
    return '''import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Habit {
  id: string;
  name: string;
  description?: string;
  category: 'health' | 'productivity' | 'learning' | 'social' | 'mindfulness' | 'other';
  frequency: 'daily' | 'weekly' | 'monthly';
  targetCount: number;
  currentStreak: number;
  longestStreak: number;
  createdAt: Date;
  isActive: boolean;
  color: string;
}

interface HabitEntry {
  id: string;
  habitId: string;
  date: Date;
  completed: boolean;
  notes?: string;
}

interface HabitStore {
  habits: Habit[];
  entries: HabitEntry[];
  addHabit: (habit: Omit<Habit, 'id' | 'currentStreak' | 'longestStreak' | 'createdAt'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitEntry: (habitId: string, date: Date, completed: boolean) => void;
  getHabitEntries: (habitId: string, startDate: Date, endDate: Date) => HabitEntry[];
  getHabitStreak: (habitId: string) => number;
  getTodayEntries: () => HabitEntry[];
  getHabitById: (id: string) => Habit | undefined;
}

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      entries: [],

      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: Date.now().toString(),
          currentStreak: 0,
          longestStreak: 0,
          createdAt: new Date()
        };

        set((state) => ({
          habits: [...state.habits, newHabit]
        }));
      },

      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, ...updates } : habit
          )
        }));
      },

      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
          entries: state.entries.filter((entry) => entry.habitId !== id)
        }));
      },

      toggleHabitEntry: (habitId, date, completed) => {
        const entryId = `${habitId}-${date.toDateString()}`;
        const existingEntry = get().entries.find(
          (entry) => entry.habitId === habitId && isSameDay(entry.date, date)
        );

        if (existingEntry) {
          // Update existing entry
          set((state) => ({
            entries: state.entries.map((entry) =>
              entry.id === existingEntry.id
                ? { ...entry, completed, notes: entry.notes }
                : entry
            )
          }));
        } else {
          // Create new entry
          const newEntry: HabitEntry = {
            id: entryId,
            habitId,
            date,
            completed,
            notes: ''
          };

          set((state) => ({
            entries: [...state.entries, newEntry]
          }));
        }

        // Update streak
        get().updateStreak(habitId);
      },

      updateStreak: (habitId) => {
        const habit = get().habits.find(h => h.id === habitId);
        if (!habit) return;

        const entries = get().entries.filter(e => e.habitId === habitId && e.completed);
        const sortedEntries = entries.sort((a, b) => b.date.getTime() - a.date.getTime());

        let currentStreak = 0;
        const today = new Date();
        let checkDate = new Date(today);

        for (const entry of sortedEntries) {
          if (isSameDay(entry.date, checkDate)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === habitId
              ? {
                  ...h,
                  currentStreak,
                  longestStreak: Math.max(h.longestStreak, currentStreak)
                }
              : h
          )
        }));
      },

      getHabitEntries: (habitId, startDate, endDate) => {
        return get().entries.filter((entry) => {
          return (
            entry.habitId === habitId &&
            entry.date >= startDate &&
            entry.date <= endDate
          );
        });
      },

      getHabitStreak: (habitId) => {
        const habit = get().habits.find(h => h.id === habitId);
        return habit ? habit.currentStreak : 0;
      },

      getTodayEntries: () => {
        const today = new Date();
        return get().entries.filter((entry) => isSameDay(entry.date, today));
      },

      getHabitById: (id) => {
        return get().habits.find((habit) => habit.id === id);
      }
    }),
    {
      name: 'habit-storage',
      version: 1
    }
  )
);

export const getHabitCompletionRate = (habitId: string, days: number = 30): number => {
  const entries = useHabitStore.getState().getHabitEntries(
    habitId,
    new Date(Date.now() - days * 24 * 60 * 60 * 1000),
    new Date()
  );

  const completedEntries = entries.filter(entry => entry.completed);
  return entries.length > 0 ? (completedEntries.length / entries.length) * 100 : 0;
};

export const getHabitInsights = () => {
  const habits = useHabitStore.getState().habits;
  const activeHabits = habits.filter(h => h.isActive);
  const totalStreaks = habits.reduce((sum, habit) => sum + habit.currentStreak, 0);
  
  return {
    totalHabits: habits.length,
    activeHabits: activeHabits.length,
    totalStreaks,
    averageStreak: habits.length > 0 ? totalStreaks / habits.length : 0,
    longestStreak: Math.max(...habits.map(h => h.longestStreak), 0)
  };
};

export const getTodayProgress = (): number => {
  const todayEntries = useHabitStore.getState().getTodayEntries();
  const activeHabits = useHabitStore.getState().habits.filter(h => h.isActive);
  
  if (activeHabits.length === 0) return 0;
  
  const completedToday = todayEntries.filter(entry => entry.completed).length;
  return (completedToday / activeHabits.length) * 100;
};
'''

def generate_time_blocking_ts():
    """Generate clean src/utils/timeBlocking.ts"""
    return '''import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimeBlock {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  category: 'work' | 'personal' | 'health' | 'learning' | 'break' | 'other';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  color: string;
  recurring?: {
    type: 'daily' | 'weekly' | 'monthly';
    days?: number[];
    interval: number;
  };
}

interface TimeBlockStore {
  timeBlocks: TimeBlock[];
  addTimeBlock: (block: Omit<TimeBlock, 'id'>) => void;
  updateTimeBlock: (id: string, updates: Partial<TimeBlock>) => void;
  deleteTimeBlock: (id: string) => void;
  completeTimeBlock: (id: string) => void;
  getTimeBlocksForDate: (date: Date) => TimeBlock[];
  getTimeBlocksForRange: (startDate: Date, endDate: Date) => TimeBlock[];
  getConflictingBlocks: (startTime: Date, endTime: Date, excludeId?: string) => TimeBlock[];
  generateRecurringBlocks: (startDate: Date, endDate: Date) => void;
}

export const useTimeBlockStore = create<TimeBlockStore>()(
  persist(
    (set, get) => ({
      timeBlocks: [],

      addTimeBlock: (blockData) => {
        const newBlock: TimeBlock = {
          ...blockData,
          id: Date.now().toString()
        };

        set((state) => ({
          timeBlocks: [...state.timeBlocks, newBlock]
        }));
      },

      updateTimeBlock: (id, updates) => {
        set((state) => ({
          timeBlocks: state.timeBlocks.map((block) =>
            block.id === id ? { ...block, ...updates } : block
          )
        }));
      },

      deleteTimeBlock: (id) => {
        set((state) => ({
          timeBlocks: state.timeBlocks.filter((block) => block.id !== id)
        }));
      },

      completeTimeBlock: (id) => {
        set((state) => ({
          timeBlocks: state.timeBlocks.map((block) =>
            block.id === id ? { ...block, completed: true } : block
          )
        }));
      },

      getTimeBlocksForDate: (date) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return get().timeBlocks.filter((block) => {
          return (
            block.startTime >= startOfDay &&
            block.startTime <= endOfDay
          );
        }).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      },

      getTimeBlocksForRange: (startDate, endDate) => {
        return get().timeBlocks.filter((block) => {
          return (
            block.startTime >= startDate &&
            block.endTime <= endDate
          );
        }).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      },

      getConflictingBlocks: (startTime, endTime, excludeId) => {
        return get().timeBlocks.filter((block) => {
          if (excludeId && block.id === excludeId) return false;
          
          return (
            (block.startTime < endTime && block.endTime > startTime)
          );
        });
      },

      generateRecurringBlocks: (startDate, endDate) => {
        const recurringBlocks = get().timeBlocks.filter(block => block.recurring);
        const newBlocks: TimeBlock[] = [];

        recurringBlocks.forEach(block => {
          if (!block.recurring) return;

          let currentDate = new Date(block.startTime);
          
          while (currentDate <= endDate) {
            if (currentDate >= startDate) {
              const newBlock: TimeBlock = {
                ...block,
                id: `${block.id}-${currentDate.toISOString()}`,
                startTime: new Date(currentDate.getTime() + (block.startTime.getHours() * 60 + block.startTime.getMinutes()) * 60000),
                endTime: new Date(currentDate.getTime() + (block.endTime.getHours() * 60 + block.endTime.getMinutes()) * 60000),
                completed: false
              };

              // Check if block already exists for this date
              const existingBlocks = get().getTimeBlocksForDate(currentDate);
              const exists = existingBlocks.some(existing => 
                existing.title === newBlock.title &&
                existing.startTime.getTime() === newBlock.startTime.getTime()
              );

              if (!exists) {
                newBlocks.push(newBlock);
              }
            }

            // Move to next occurrence
            if (block.recurring.type === 'daily') {
              currentDate.setDate(currentDate.getDate() + block.recurring.interval);
            } else if (block.recurring.type === 'weekly') {
              currentDate.setDate(currentDate.getDate() + (7 * block.recurring.interval));
            } else if (block.recurring.type === 'monthly') {
              currentDate.setMonth(currentDate.getMonth() + block.recurring.interval);
            }
          }
        });

        if (newBlocks.length > 0) {
          set((state) => ({
            timeBlocks: [...state.timeBlocks, ...newBlocks]
          }));
        }
      }
    }),
    {
      name: 'timeblock-storage',
      version: 1
    }
  )
);

export const getBlockDuration = (block: TimeBlock): number => {
  return block.endTime.getTime() - block.startTime.getTime();
};

export const getBlockDurationMinutes = (block: TimeBlock): number => {
  return Math.round(getBlockDuration(block) / (1000 * 60));
};

export const getTotalBlockedTime = (blocks: TimeBlock[]): number => {
  return blocks.reduce((total, block) => total + getBlockDuration(block), 0);
};

export const getTimeBlockInsights = (date: Date) => {
  const blocks = useTimeBlockStore.getState().getTimeBlocksForDate(date);
  const completedBlocks = blocks.filter(block => block.completed);
  const totalTime = getTotalBlockedTime(blocks);
  const completedTime = getTotalBlockedTime(completedBlocks);
  
  return {
    totalBlocks: blocks.length,
    completedBlocks: completedBlocks.length,
    completionRate: blocks.length > 0 ? (completedBlocks.length / blocks.length) * 100 : 0,
    totalTimeMinutes: Math.round(totalTime / (1000 * 60)),
    completedTimeMinutes: Math.round(completedTime / (1000 * 60)),
    productivityRate: totalTime > 0 ? (completedTime / totalTime) * 100 : 0
  };
};

export const isTimeBlockActive = (block: TimeBlock): boolean => {
  const now = new Date();
  return now >= block.startTime && now <= block.endTime && !block.completed;
};
'''

def generate_advanced_search_ts():
    """Generate clean src/utils/advancedSearch.ts"""
    return '''import { create } from 'zustand';

interface SearchFilter {
  id: string;
  type: 'text' | 'date' | 'category' | 'tag' | 'status' | 'priority';
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between' | 'in';
  value: any;
  label: string;
}

interface SearchQuery {
  id: string;
  name: string;
  query: string;
  filters: SearchFilter[];
  sortBy?: string;
  sortOrder: 'asc' | 'desc';
  createdAt: Date;
  isDefault: boolean;
}

interface SearchStore {
  queries: SearchQuery[];
  currentQuery: SearchQuery | null;
  searchResults: any[];
  isSearching: boolean;
  addQuery: (query: Omit<SearchQuery, 'id' | 'createdAt'>) => void;
  updateQuery: (id: string, updates: Partial<SearchQuery>) => void;
  deleteQuery: (id: string) => void;
  executeSearch: (query: SearchQuery, data: any[]) => Promise<void>;
  saveCurrentQuery: (name: string) => void;
  loadQuery: (id: string) => void;
  clearResults: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  queries: [],
  currentQuery: null,
  searchResults: [],
  isSearching: false,

  addQuery: (queryData) => {
    const newQuery: SearchQuery = {
      ...queryData,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    set((state) => ({
      queries: [...state.queries, newQuery]
    }));
  },

  updateQuery: (id, updates) => {
    set((state) => ({
      queries: state.queries.map((query) =>
        query.id === id ? { ...query, ...updates } : query
      ),
      currentQuery: state.currentQuery?.id === id 
        ? { ...state.currentQuery, ...updates }
        : state.currentQuery
    }));
  },

  deleteQuery: (id) => {
    set((state) => ({
      queries: state.queries.filter((query) => query.id !== id),
      currentQuery: state.currentQuery?.id === id ? null : state.currentQuery
    }));
  },

  executeSearch: async (query, data) => {
    set({ isSearching: true });

    try {
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 300));

      let results = [...data];

      // Apply text search
      if (query.query.trim()) {
        const searchTerms = query.query.toLowerCase().split(' ');
        results = results.filter(item => {
          const searchableText = JSON.stringify(item).toLowerCase();
          return searchTerms.every(term => searchableText.includes(term));
        });
      }

      // Apply filters
      query.filters.forEach(filter => {
        results = results.filter(item => {
          const fieldValue = getNestedValue(item, filter.field);
          return applyFilter(fieldValue, filter);
        });
      });

      // Apply sorting
      if (query.sortBy) {
        results.sort((a, b) => {
          const aValue = getNestedValue(a, query.sortBy!);
          const bValue = getNestedValue(b, query.sortBy!);
          
          if (query.sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }

      set({ 
        searchResults: results,
        isSearching: false,
        currentQuery: query
      });
    } catch (error) {
      console.error('Search error:', error);
      set({ 
        searchResults: [],
        isSearching: false
      });
    }
  },

  saveCurrentQuery: (name) => {
    const currentQuery = get().currentQuery;
    if (!currentQuery) return;

    const newQuery: SearchQuery = {
      ...currentQuery,
      id: Date.now().toString(),
      name,
      createdAt: new Date(),
      isDefault: false
    };

    set((state) => ({
      queries: [...state.queries, newQuery]
    }));
  },

  loadQuery: (id) => {
    const query = get().queries.find(q => q.id === id);
    if (query) {
      set({ currentQuery: query });
    }
  },

  clearResults: () => {
    set({ 
      searchResults: [],
      currentQuery: null
    });
  }
}));

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

const applyFilter = (fieldValue: any, filter: SearchFilter): boolean => {
  if (fieldValue === undefined || fieldValue === null) return false;

  switch (filter.operator) {
    case 'equals':
      return fieldValue === filter.value;
    case 'contains':
      return String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase());
    case 'startsWith':
      return String(fieldValue).toLowerCase().startsWith(String(filter.value).toLowerCase());
    case 'endsWith':
      return String(fieldValue).toLowerCase().endsWith(String(filter.value).toLowerCase());
    case 'greaterThan':
      return Number(fieldValue) > Number(filter.value);
    case 'lessThan':
      return Number(fieldValue) < Number(filter.value);
    case 'between':
      const [min, max] = filter.value;
      return Number(fieldValue) >= min && Number(fieldValue) <= max;
    case 'in':
      return Array.isArray(filter.value) && filter.value.includes(fieldValue);
    default:
      return true;
  }
};

export const createTextFilter = (field: string, value: string, operator: 'contains' | 'startsWith' | 'endsWith' = 'contains'): SearchFilter => {
  return {
    id: Date.now().toString(),
    type: 'text',
    field,
    operator,
    value,
    label: `${field} ${operator} "${value}"`
  };
};

export const createDateFilter = (field: string, value: Date | Date[], operator: 'equals' | 'greaterThan' | 'lessThan' | 'between' = 'equals'): SearchFilter => {
  return {
    id: Date.now().toString(),
    type: 'date',
    field,
    operator,
    value,
    label: `${field} ${operator} ${Array.isArray(value) ? `${value[0]} - ${value[1]}` : value}`
  };
};

export const createCategoryFilter = (field: string, value: string[]): SearchFilter => {
  return {
    id: Date.now().toString(),
    type: 'category',
    field,
    operator: 'in',
    value,
    label: `${field} in [${value.join(', ')}]`
  };
};

export const getSearchInsights = () => {
  const queries = useSearchStore.getState().queries;
  const results = useSearchStore.getState().searchResults;
  
  return {
    totalQueries: queries.length,
    defaultQueries: queries.filter(q => q.isDefault).length,
    customQueries: queries.filter(q => !q.isDefault).length,
    currentResults: results.length,
    lastSearch: queries.length > 0 ? Math.max(...queries.map(q => q.createdAt.getTime())) : null
  };
};
'''

def generate_voice_commands_ts():
    """Generate clean src/utils/voiceCommands.ts"""
    return '''import { create } from 'zustand';

interface VoiceCommand {
  id: string;
  phrase: string;
  action: string;
  description: string;
  category: 'navigation' | 'productivity' | 'search' | 'creation' | 'system';
  isEnabled: boolean;
  parameters?: string[];
}

interface VoiceSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  commands: VoiceCommand[];
  isActive: boolean;
}

interface VoiceStore {
  commands: VoiceCommand[];
  currentSession: VoiceSession | null;
  isListening: boolean;
  isSupported: boolean;
  recognition: any;
  addCommand: (command: Omit<VoiceCommand, 'id'>) => void;
  updateCommand: (id: string, updates: Partial<VoiceCommand>) => void;
  deleteCommand: (id: string) => void;
  startListening: () => void;
  stopListening: () => void;
  processVoiceInput: (transcript: string) => Promise<void>;
  initializeRecognition: () => void;
  getCommandsByCategory: (category: VoiceCommand['category']) => VoiceCommand[];
}

const defaultCommands: VoiceCommand[] = [
  {
    id: '1',
    phrase: 'create task',
    action: 'create_task',
    description: 'Create a new task',
    category: 'creation',
    isEnabled: true,
    parameters: ['title', 'description']
  },
  {
    id: '2',
    phrase: 'show dashboard',
    action: 'navigate',
    description: 'Navigate to dashboard',
    category: 'navigation',
    isEnabled: true,
    parameters: ['/dashboard']
  },
  {
    id: '3',
    phrase: 'search for',
    action: 'search',
    description: 'Perform a search',
    category: 'search',
    isEnabled: true,
    parameters: ['query']
  },
  {
    id: '4',
    phrase: 'start timer',
    action: 'start_timer',
    description: 'Start a productivity timer',
    category: 'productivity',
    isEnabled: true,
    parameters: ['duration']
  },
  {
    id: '5',
    phrase: 'stop listening',
    action: 'stop_voice',
    description: 'Stop voice recognition',
    category: 'system',
    isEnabled: true
  }
];

export const useVoiceStore = create<VoiceStore>((set, get) => ({
  commands: defaultCommands,
  currentSession: null,
  isListening: false,
  isSupported: false,
  recognition: null,

  addCommand: (commandData) => {
    const newCommand: VoiceCommand = {
      ...commandData,
      id: Date.now().toString()
    };

    set((state) => ({
      commands: [...state.commands, newCommand]
    }));
  },

  updateCommand: (id, updates) => {
    set((state) => ({
      commands: state.commands.map((command) =>
        command.id === id ? { ...command, ...updates } : command
      )
    }));
  },

  deleteCommand: (id) => {
    set((state) => ({
      commands: state.commands.filter((command) => command.id !== id)
    }));
  },

  startListening: () => {
    const { recognition } = get();
    if (!recognition) return;

    try {
      recognition.start();
      set({ isListening: true });

      const newSession: VoiceSession = {
        id: Date.now().toString(),
        startTime: new Date(),
        commands: [],
        isActive: true
      };

      set({ currentSession: newSession });
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  },

  stopListening: () => {
    const { recognition, currentSession } = get();
    if (!recognition) return;

    try {
      recognition.stop();
      set({ isListening: false });

      if (currentSession) {
        set((state) => ({
          currentSession: {
            ...state.currentSession!,
            endTime: new Date(),
            isActive: false
          }
        }));
      }
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  },

  processVoiceInput: async (transcript) => {
    const { commands } = get();
    const lowerTranscript = transcript.toLowerCase();

    // Find matching command
    const matchingCommand = commands.find(command => 
      command.isEnabled && lowerTranscript.includes(command.phrase.toLowerCase())
    );

    if (matchingCommand) {
      // Execute the command action
      await executeCommand(matchingCommand, transcript);
      
      // Update session
      set((state) => {
        if (state.currentSession) {
          return {
            currentSession: {
              ...state.currentSession,
              commands: [...state.currentSession.commands, matchingCommand]
            }
          };
        }
        return state;
      });
    }
  },

  initializeRecognition: () => {
    if (typeof window === 'undefined') return;

    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      set({ isSupported: false });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');

      if (event.results[event.resultIndex].isFinal) {
        get().processVoiceInput(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Voice recognition error:', event.error);
      set({ isListening: false });
    };

    recognition.onend = () => {
      set({ isListening: false });
    };

    set({ 
      recognition,
      isSupported: true
    });
  },

  getCommandsByCategory: (category) => {
    return get().commands.filter(command => command.category === category);
  }
}));

const executeCommand = async (command: VoiceCommand, transcript: string) => {
  console.log(`Executing command: ${command.action}`);
  
  switch (command.action) {
    case 'create_task':
      // Trigger task creation modal
      window.dispatchEvent(new CustomEvent('voice:createTask', { 
        detail: { transcript } 
      }));
      break;
      
    case 'navigate':
      if (command.parameters && command.parameters[0]) {
        window.location.href = command.parameters[0];
      }
      break;
      
    case 'search':
      // Extract search query from transcript
      const searchQuery = transcript.replace(command.phrase, '').trim();
      window.dispatchEvent(new CustomEvent('voice:search', { 
        detail: { query: searchQuery } 
      }));
      break;
      
    case 'start_timer':
      window.dispatchEvent(new CustomEvent('voice:startTimer', { 
        detail: { transcript } 
      }));
      break;
      
    case 'stop_voice':
      useVoiceStore.getState().stopListening();
      break;
      
    default:
      console.log(`Unknown command: ${command.action}`);
  }
};

export const initializeVoiceCommands = () => {
  useVoiceStore.getState().initializeRecognition();
};

export const getVoiceInsights = () => {
  const commands = useVoiceStore.getState().commands;
  const currentSession = useVoiceStore.getState().currentSession;
  
  return {
    totalCommands: commands.length,
    enabledCommands: commands.filter(c => c.isEnabled).length,
    commandsByCategory: commands.reduce((acc, cmd) => {
      acc[cmd.category] = (acc[cmd.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    currentSessionCommands: currentSession?.commands.length || 0,
    isSupported: useVoiceStore.getState().isSupported
  };
};
'''

def main():
    """Generate all Phase 5 templates"""
    print("🧠 GENERATING PHASE 5 TEMPLATES...")
    
    templates = {
        'src/utils/achievementSystem.ts': generate_achievement_system_ts(),
        'src/utils/customization.ts': generate_customization_ts(),
        'src/utils/savingsGoals.ts': generate_savings_goals_ts(),
        'src/utils/streakSystem.ts': generate_streak_system_ts(),
        'src/utils/goalTracker.ts': generate_goal_tracker_ts(),
        'src/utils/habitTracker.ts': generate_habit_tracker_ts(),
        'src/utils/timeBlocking.ts': generate_time_blocking_ts(),
        'src/utils/advancedSearch.ts': generate_advanced_search_ts(),
        'src/utils/voiceCommands.ts': generate_voice_commands_ts()
    }
    
    for file_path, content in templates.items():
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Generated: {file_path}")
    
    print("🎉 PHASE 5 TEMPLATES GENERATED!")
    print("📁 Files created: 9")
    print("⚡ Ready for testing!")

if __name__ == "__main__":
    main()
