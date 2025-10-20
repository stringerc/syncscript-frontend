import { create } from 'zustand';
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
