import { useState, useEffect, useCallback } from 'react';
import { 
  Achievement,
  getAchievements,
  getAchievementStats,
  unlockAchievement,
  updateAchievementProgress
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
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState(getAchievementStats());
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);

  // Load achievements on mount
  useEffect(() => {
    setAchievements(getAchievements());
    setStats(getAchievementStats());
  }, []);

  // Check for achievement unlocks based on progress
  useEffect(() => {
    // Update task-based achievements
    const tasksCompleted = tasks.filter(t => t.completed).length
    
    // Check and update task achievements
    if (tasksCompleted === 1) {
      const result = unlockAchievement('task_first')
      if (result) setNewlyUnlocked(prev => [...prev, result])
    }
    
    if (tasksCompleted >= 10) {
      const { achievement, unlocked } = updateAchievementProgress('task_10', tasksCompleted)
      if (unlocked && achievement) setNewlyUnlocked(prev => [...prev, achievement])
    }
    
    if (tasksCompleted >= 50) {
      const { achievement, unlocked } = updateAchievementProgress('task_50', tasksCompleted)
      if (unlocked && achievement) setNewlyUnlocked(prev => [...prev, achievement])
    }
    
    if (tasksCompleted >= 100) {
      const { achievement, unlocked } = updateAchievementProgress('task_100', tasksCompleted)
      if (unlocked && achievement) setNewlyUnlocked(prev => [...prev, achievement])
    }
    
    // Update streak achievements
    if (currentStreak >= 3) {
      const { achievement, unlocked } = updateAchievementProgress('streak_3', currentStreak)
      if (unlocked && achievement) setNewlyUnlocked(prev => [...prev, achievement])
    }
    
    if (currentStreak >= 7) {
      const { achievement, unlocked } = updateAchievementProgress('streak_7', currentStreak)
      if (unlocked && achievement) setNewlyUnlocked(prev => [...prev, achievement])
    }
    
    if (currentStreak >= 30) {
      const { achievement, unlocked } = updateAchievementProgress('streak_30', currentStreak)
      if (unlocked && achievement) setNewlyUnlocked(prev => [...prev, achievement])
    }
    
    // Reload achievements and stats
    setAchievements(getAchievements())
    setStats(getAchievementStats())
  }, [tasks, currentStreak, energyLogs, projects, focusSessions, focusMinutes]);

  // Clear newly unlocked achievements (after showing notification)
  const clearNewlyUnlocked = useCallback(() => {
    setNewlyUnlocked([]);
  }, []);

  return {
    achievements,
    unlockedAchievements: achievements.filter(a => a.unlocked),
    newlyUnlocked,
    achievementProgress: achievements.map(a => ({
      achievementId: a.id,
      currentValue: a.progress || 0,
      targetValue: a.target || 1,
      percentage: a.target ? ((a.progress || 0) / a.target) * 100 : (a.unlocked ? 100 : 0),
      isUnlocked: a.unlocked
    })),
    totalPoints: stats.earnedRewards,
    completionPercentage: stats.percentage,
    totalAchievements: stats.total,
    unlockedCount: stats.unlocked,
    getProgressByCategory: (category: string) => 
      achievements.filter(a => a.category === category).map(a => ({
        achievementId: a.id,
        currentValue: a.progress || 0,
        targetValue: a.target || 1,
        percentage: a.target ? ((a.progress || 0) / a.target) * 100 : (a.unlocked ? 100 : 0),
        isUnlocked: a.unlocked
      })),
    clearNewlyUnlocked
  };
}

