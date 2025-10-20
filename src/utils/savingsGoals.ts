import { create } from 'zustand';
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
