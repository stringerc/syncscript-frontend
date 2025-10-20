import { create } from 'zustand';

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
