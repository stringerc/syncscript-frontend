import { useState, useCallback } from 'react'
import { checkGoalMilestones, updateGoalProgress } from '@/utils/savingsGoals'

interface CelebrationData {
  show: boolean
  title: string
  message: string
  type: 'goal' | 'achievement' | 'streak' | 'milestone'
}

export function useGoalCelebration() {
  const [celebration, setCelebration] = useState<CelebrationData>({
    show: false,
    title: '',
    message: '',
    type: 'goal'
  })

  /**
   * Update goal progress and check for celebrations
   */
  const updateGoalWithCelebration = useCallback((goalId: string, amount: number) => {
    // Update the goal
    const updatedGoal = updateGoalProgress(goalId, amount)
    
    if (!updatedGoal) return null

    // Check for milestones
    const milestone = checkGoalMilestones(goalId)

    // Trigger celebration if milestone reached
    if (milestone.isComplete) {
      setCelebration({
        show: true,
        title: 'Goal Complete! 🎯',
        message: milestone.message || `You've reached your ${updatedGoal.name} goal!`,
        type: 'goal'
      })
    } else if (milestone.milestone) {
      setCelebration({
        show: true,
        title: getMilestoneTitle(milestone.milestone),
        message: milestone.message || `Great progress on your ${updatedGoal.name}!`,
        type: 'milestone'
      })
    }

    return updatedGoal
  }, [])

  /**
   * Trigger a custom celebration
   */
  const triggerCelebration = useCallback((
    title: string, 
    message: string, 
    type: 'goal' | 'achievement' | 'streak' | 'milestone' = 'achievement'
  ) => {
    setCelebration({
      show: true,
      title,
      message,
      type
    })
  }, [])

  /**
   * Clear the celebration
   */
  const clearCelebration = useCallback(() => {
    setCelebration({
      show: false,
      title: '',
      message: '',
      type: 'goal'
    })
  }, [])

  return {
    celebration,
    updateGoalWithCelebration,
    triggerCelebration,
    clearCelebration
  }
}

function getMilestoneTitle(milestone: 'quarter' | 'half' | 'three-quarters' | 'complete'): string {
  switch (milestone) {
    case 'quarter': return '25% Complete! ✨'
    case 'half': return 'Halfway There! 💪'
    case 'three-quarters': return 'Almost Done! 🔥'
    case 'complete': return 'Goal Achieved! 🎉'
    default: return 'Milestone Reached!'
  }
}

