'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SavingsGoal, getGoalProgress } from '@/utils/savingsGoals'
import { useGoalCelebration } from '@/hooks/useGoalCelebration'
import Celebration from './Celebration'

interface GoalProgressCardProps {
  goal: SavingsGoal
  onUpdate?: () => void
}

export default function GoalProgressCard({ goal, onUpdate }: GoalProgressCardProps) {
  const { celebration, updateGoalWithCelebration, clearCelebration } = useGoalCelebration()
  const progress = getGoalProgress(goal)

  const handleAddProgress = (amount: number) => {
    updateGoalWithCelebration(goal.id, amount)
    onUpdate?.()
  }

  const quickAmounts = [10, 25, 50, 100]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{goal.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {goal.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ${goal.currentAmount.toFixed(0)} of ${goal.targetAmount.toFixed(0)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {progress.percentage.toFixed(0)}%
            </div>
            {progress.daysRemaining && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {progress.daysRemaining} days left
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: goal.color }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ${progress.remaining.toFixed(0)} remaining
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="flex gap-2">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAddProgress(amount)}
              className="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: `${goal.color}20`,
                color: goal.color,
                border: `2px solid ${goal.color}`
              }}
            >
              +${amount}
            </button>
          ))}
        </div>

        {/* Milestones */}
        <div className="mt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className={progress.percentage >= 25 ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
            25% ✓
          </div>
          <div className={progress.percentage >= 50 ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
            50% ✓
          </div>
          <div className={progress.percentage >= 75 ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
            75% ✓
          </div>
          <div className={progress.percentage >= 100 ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
            100% ✓
          </div>
        </div>
      </motion.div>

      {/* Celebration Component */}
      <Celebration
        show={celebration.show}
        title={celebration.title}
        message={celebration.message}
        type={celebration.type}
        onComplete={clearCelebration}
      />
    </>
  )
}

