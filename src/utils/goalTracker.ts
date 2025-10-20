import { create } from 'zustand';
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
