import { create } from 'zustand';
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
