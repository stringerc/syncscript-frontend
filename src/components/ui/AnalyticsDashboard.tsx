'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface AnalyticsMetric {
  label: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: string
  color: string
}

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month')
  const [activeTab, setActiveTab] = useState<'overview' | 'productivity' | 'energy' | 'budget'>('overview')

  const metrics: AnalyticsMetric[] = [
    { label: 'Tasks Completed', value: 127, change: 15.2, trend: 'up', icon: '✅', color: 'from-green-500 to-emerald-600' },
    { label: 'Productivity Score', value: '87%', change: 5.3, trend: 'up', icon: '📈', color: 'from-blue-500 to-cyan-600' },
    { label: 'Avg Energy Level', value: '4.2/5', change: 0.3, trend: 'up', icon: '⚡', color: 'from-yellow-500 to-orange-600' },
    { label: 'Focus Time', value: '32.5h', change: -2.1, trend: 'down', icon: '🎯', color: 'from-purple-500 to-pink-600' },
    { label: 'Streak Days', value: 21, change: 21, trend: 'up', icon: '🔥', color: 'from-orange-500 to-red-600' },
    { label: 'Budget Saved', value: '$245', change: 12.8, trend: 'up', icon: '💰', color: 'from-green-600 to-teal-600' },
    { label: 'Team Projects', value: 8, change: 2, trend: 'up', icon: '👥', color: 'from-indigo-500 to-blue-600' },
    { label: 'Completion Rate', value: '94%', change: 3.5, trend: 'up', icon: '🎯', color: 'from-purple-600 to-indigo-600' }
  ]

  const productivityByDay = [
    { day: 'Mon', tasks: 18, energy: 4.2, focus: 6.5 },
    { day: 'Tue', tasks: 22, energy: 4.5, focus: 7.2 },
    { day: 'Wed', tasks: 15, energy: 3.8, focus: 5.8 },
    { day: 'Thu', tasks: 25, energy: 4.7, focus: 8.1 },
    { day: 'Fri', tasks: 20, energy: 4.3, focus: 6.9 },
    { day: 'Sat', tasks: 12, energy: 3.5, focus: 4.2 },
    { day: 'Sun', tasks: 8, energy: 3.2, focus: 3.5 }
  ]

  const topCategories = [
    { name: 'Work Projects', tasks: 45, percentage: 35, color: 'bg-blue-500' },
    { name: 'Personal Dev', tasks: 28, percentage: 22, color: 'bg-purple-500' },
    { name: 'Health & Fitness', tasks: 20, percentage: 16, color: 'bg-green-500' },
    { name: 'Learning', tasks: 18, percentage: 14, color: 'bg-yellow-500' },
    { name: 'Social', tasks: 16, percentage: 13, color: 'bg-pink-500' }
  ]

  const insights = [
    { icon: '🌟', title: 'Peak Performance', description: 'Thursdays are your most productive day with an average of 25 tasks completed', type: 'success' },
    { icon: '⚠️', title: 'Energy Dip', description: 'Weekend energy levels are 25% lower. Consider lighter tasks on Sat/Sun', type: 'warning' },
    { icon: '💡', title: 'Focus Pattern', description: 'Your focus time peaks between 9-11 AM. Schedule important tasks then', type: 'info' },
    { icon: '🎯', title: 'Achievement', description: 'You\'re on track to beat last month\'s record by 15%!', type: 'success' }
  ]

  const maxTasks = Math.max(...productivityByDay.map(d => d.tasks))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                📊 Advanced Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Deep insights into your productivity and performance
              </p>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2">
              {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                    timeRange === range
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'overview', label: 'Overview', icon: '📈' },
              { id: 'productivity', label: 'Productivity', icon: '⚡' },
              { id: 'energy', label: 'Energy', icon: '🔋' },
              { id: 'budget', label: 'Budget', icon: '💰' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all border-b-4 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center text-2xl`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Productivity Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📈 Weekly Productivity
            </h2>

            <div className="space-y-4">
              {productivityByDay.map((day, index) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{day.day}</span>
                    <span className="text-gray-600 dark:text-gray-400">{day.tasks} tasks</span>
                  </div>
                  <div className="relative h-8 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.tasks / maxTasks) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-end pr-3"
                    >
                      {day.tasks > maxTasks * 0.3 && (
                        <span className="text-white text-xs font-bold">{day.tasks}</span>
                      )}
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Energy: {day.energy}/5</span>
                    <span>Focus: {day.focus}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📂 Top Categories
            </h2>

            <div className="space-y-6">
              {topCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      {category.tasks} tasks ({category.percentage}%)
                    </span>
                  </div>
                  <div className="relative h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                      className={`absolute top-0 left-0 h-full ${category.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🤖 AI-Powered Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 ${
                  insight.type === 'success'
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : insight.type === 'warning'
                    ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                    : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{insight.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
