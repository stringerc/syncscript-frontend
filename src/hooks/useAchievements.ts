import { useState, useEffect, useCallback } from 'react';
import { 
  Achievement, 
  ACHIEVEMENTS, 
  AchievementProgress,
  getAchievementById
} from '../utils/achievementSystem';

interface Task {
  id: string;
  completed: boolean;
  completed_at?: string;
  created_at?: string;
}

interface EnergyLog {
  level: number;
  timestamp: string;
}

interface Project {
  id: string;
  name: string;
}

interface UseAchievementsProps {
  tasks: Task[];
  energyLogs: EnergyLog[];
  projects: Project[];
  currentStreak: number;
  focusSessions: number;
  focusMinutes: number;
}

interface UnlockedAchievement {
  achievement: Achievement;
  unlockedAt: Date;
  isNew: boolean;
}

export function useAchievements({
  tasks,
  energyLogs,
  projects,
  currentStreak,
  focusSessions,
  focusMinutes
}: UseAchievementsProps) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievement[]>([]);
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);
  const [achievementProgress, setAchievementProgress] = useState<AchievementProgress[]>([]);

  // Load unlocked achievements from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('unlockedAchievements');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Array<{
          achievement: Achievement;
          unlockedAt: string;
          isNew: boolean;
        }>;
        setUnlockedAchievements(parsed.map((a) => ({
          ...a,
          unlockedAt: new Date(a.unlockedAt),
          isNew: false
        })));
      } catch (error) {
        console.error('Error loading achievements:', error);
      }
    }
  }, []);

  // Save unlocked achievements to localStorage
  useEffect(() => {
    if (unlockedAchievements.length > 0) {
      localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
    }
  }, [unlockedAchievements]);

  // Calculate current values for each achievement type
  const calculateCurrentValue = useCallback((achievement: Achievement): number => {
    const { type } = achievement.condition;
    
    switch (type) {
      case 'tasks_completed':
        return tasks.filter(t => t.completed).length;
      
      case 'streak_days':
        return currentStreak;
      
      case 'energy_logs':
        return energyLogs.length;
      
      case 'high_energy_days': {
        // Count days with average energy >= 80
        const dayGroups = new Map<string, number[]>();
        energyLogs.forEach(log => {
          const day = new Date(log.timestamp).toDateString();
          if (!dayGroups.has(day)) {
            dayGroups.set(day, []);
          }
          dayGroups.get(day)!.push(log.level);
        });
        
        let highEnergyDays = 0;
        dayGroups.forEach(levels => {
          const avg = levels.reduce((sum, l) => sum + l, 0) / levels.length;
          if (avg >= 80) highEnergyDays++;
        });
        return highEnergyDays;
      }
      
      case 'focus_sessions':
        return focusSessions;
      
      case 'focus_minutes':
        return focusMinutes;
      
      case 'projects_created':
        return projects.length;
      
      case 'projects_completed': {
        // This would need project completion data - mock for now
        return 0; // TODO: Implement when project completion tracking is added
      }
      
      case 'tasks_per_day': {
        // Find the day with most tasks completed
        const dayGroups = new Map<string, number>();
        tasks.filter(t => t.completed && t.completed_at).forEach(task => {
          const day = new Date(task.completed_at!).toDateString();
          dayGroups.set(day, (dayGroups.get(day) || 0) + 1);
        });
        return Math.max(...Array.from(dayGroups.values()), 0);
      }
      
      case 'morning_tasks': {
        // Count days with tasks completed before 9 AM
        const morningDays = new Set<string>();
        tasks.filter(t => t.completed && t.completed_at).forEach(task => {
          const date = new Date(task.completed_at!);
          if (date.getHours() < 9) {
            morningDays.add(date.toDateString());
          }
        });
        return morningDays.size;
      }
      
      case 'night_tasks': {
        // Count days with tasks completed after 9 PM
        const nightDays = new Set<string>();
        tasks.filter(t => t.completed && t.completed_at).forEach(task => {
          const date = new Date(task.completed_at!);
          if (date.getHours() >= 21) {
            nightDays.add(date.toDateString());
          }
        });
        return nightDays.size;
      }
      
      case 'weekend_tasks': {
        // Check if any tasks completed on weekend
        const weekendTasks = tasks.filter(t => {
          if (!t.completed || !t.completed_at) return false;
          const day = new Date(t.completed_at).getDay();
          return day === 0 || day === 6; // Sunday or Saturday
        });
        return weekendTasks.length > 0 ? 1 : 0;
      }
      
      default:
        return 0;
    }
  }, [tasks, energyLogs, projects, currentStreak, focusSessions, focusMinutes]);

  // Calculate progress for all achievements
  useEffect(() => {
    const progress: AchievementProgress[] = ACHIEVEMENTS.map(achievement => {
      const currentValue = calculateCurrentValue(achievement);
      const targetValue = achievement.condition.value;
      const percentage = Math.min((currentValue / targetValue) * 100, 100);
      const isUnlocked = unlockedAchievements.some(
        ua => ua.achievement.id === achievement.id
      );

      return {
        achievementId: achievement.id,
        currentValue,
        targetValue,
        percentage,
        isUnlocked
      };
    });

    setAchievementProgress(progress);

    // Check for newly unlocked achievements
    const newUnlocks: Achievement[] = [];
    progress.forEach(p => {
      if (p.percentage >= 100 && !p.isUnlocked) {
        const achievement = getAchievementById(p.achievementId);
        if (achievement) {
          newUnlocks.push(achievement);
        }
      }
    });

    if (newUnlocks.length > 0) {
      const newUnlockedAchievements = newUnlocks.map(achievement => ({
        achievement,
        unlockedAt: new Date(),
        isNew: true
      }));

      setUnlockedAchievements(prev => [...prev, ...newUnlockedAchievements]);
      setNewlyUnlocked(newUnlocks);

      // Clear new badges after 10 seconds
      setTimeout(() => {
        setUnlockedAchievements(prev =>
          prev.map(ua => ({ ...ua, isNew: false }))
        );
      }, 10000);
    }
  }, [tasks, energyLogs, projects, currentStreak, focusSessions, focusMinutes, calculateCurrentValue, unlockedAchievements]);

  // Calculate total achievement points
  const totalPoints = unlockedAchievements.reduce(
    (sum, ua) => sum + ua.achievement.reward.points,
    0
  );

  // Calculate completion percentage
  const completionPercentage = (unlockedAchievements.length / ACHIEVEMENTS.length) * 100;

  // Get achievements by category with progress
  const getProgressByCategory = useCallback((category: string) => {
    return achievementProgress.filter(p => {
      const achievement = getAchievementById(p.achievementId);
      return achievement?.category === category;
    });
  }, [achievementProgress]);

  // Clear newly unlocked achievements (after showing notification)
  const clearNewlyUnlocked = useCallback(() => {
    setNewlyUnlocked([]);
  }, []);

  return {
    unlockedAchievements,
    newlyUnlocked,
    achievementProgress,
    totalPoints,
    completionPercentage,
    totalAchievements: ACHIEVEMENTS.length,
    unlockedCount: unlockedAchievements.length,
    getProgressByCategory,
    clearNewlyUnlocked
  };
}

