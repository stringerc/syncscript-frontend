import { create } from 'zustand';
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
