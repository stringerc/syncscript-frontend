/**
 * Feature #75: Team Goals Dashboard
 * Shared objectives tracking with progress visualization
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Users, Award, Calendar, Plus } from 'lucide-react'

interface TeamGoal {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  deadline: Date
  owner: string
  contributors: string[]
  category: string
}

const TeamGoalsDashboard: React.FC = () => {
  const [goals] = useState<TeamGoal[]>([
    {
      id: '1',
      title: 'Complete Q4 Product Launch',
      description: 'Ship 5 major features before end of quarter',
      target: 5,
      current: 3,
      unit: 'features',
      deadline: new Date('2024-12-31'),
      owner: 'Sarah Chen',
      contributors: ['Sarah', 'Mike', 'Alex'],
      category: 'Product'
    },
    {
      id: '2',
      title: 'Improve Customer Satisfaction',
      description: 'Achieve 90% satisfaction score in Q4',
      target: 90,
      current: 82,
      unit: '%',
      deadline: new Date('2024-12-31'),
      owner: 'Mike Johnson',
      contributors: ['Mike', 'Emma'],
      category: 'Customer Success'
    }
  ])

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Goals</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Shared objectives & milestones</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <Plus className="w-4 h-4" />
          New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map(goal => {
          const progress = (goal.current / goal.target) * 100
          const daysLeft = Math.ceil((goal.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{goal.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded">
                  {goal.category}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {progress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {daysLeft} days left
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  {goal.contributors.length} contributors
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default TeamGoalsDashboard

