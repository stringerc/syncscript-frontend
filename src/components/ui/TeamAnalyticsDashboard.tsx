/**
 * Feature #81: Team Analytics
 * Collaboration insights and team performance metrics
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users, TrendingUp, Award, MessageCircle, CheckCircle, Clock, Target } from 'lucide-react'

interface TeamMetric {
  label: string
  value: number
  change: number
  icon: React.ReactNode
  color: string
}

const TeamAnalyticsDashboard: React.FC = () => {
  const metrics: TeamMetric[] = [
    { label: 'Team Velocity', value: 42, change: 8, icon: <TrendingUp className="w-6 h-6" />, color: 'text-blue-600' },
    { label: 'Collaboration Score', value: 87, change: 5, icon: <Users className="w-6 h-6" />, color: 'text-purple-600' },
    { label: 'Tasks Completed', value: 156, change: 12, icon: <CheckCircle className="w-6 h-6" />, color: 'text-green-600' },
    { label: 'Avg Response Time', value: 1.8, change: -0.3, icon: <Clock className="w-6 h-6" />, color: 'text-orange-600' },
    { label: 'Messages Sent', value: 847, change: 15, icon: <MessageCircle className="w-6 h-6" />, color: 'text-indigo-600' },
    { label: 'Goals Achieved', value: 12, change: 3, icon: <Target className="w-6 h-6" />, color: 'text-pink-600' }
  ]

  const topContributors = [
    { name: 'Sarah Chen', avatar: '👩‍💻', tasks: 42, score: 95 },
    { name: 'Mike Johnson', avatar: '👨‍🎨', tasks: 38, score: 92 },
    { name: 'Alex Kumar', avatar: '👨‍💼', tasks: 35, score: 88 }
  ]

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Analytics</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Collaboration insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {metrics.map(metric => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color}`}>{metric.icon}</div>
              <span className={`text-sm font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change >= 0 ? '↗' : '↘'} {Math.abs(metric.change)}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {metric.value}{metric.label.includes('Score') || metric.label.includes('Time') ? '' : ''}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          Top Contributors
        </h3>
        <div className="space-y-3">
          {topContributors.map((contributor, i) => (
            <div key={contributor.name} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-400">#{i + 1}</div>
              <div className="text-3xl">{contributor.avatar}</div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">{contributor.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{contributor.tasks} tasks completed</div>
              </div>
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {contributor.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamAnalyticsDashboard

