/**
 * Feature #71: Performance Dashboard 2.0
 * Advanced analytics & insights with custom reports
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, TrendingUp, Download, Calendar, Filter,
  Target, Zap, CheckCircle, Clock, Award, Brain
} from 'lucide-react'

interface PerformanceMetric {
  label: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: React.ReactNode
  color: string
}

interface CustomReport {
  id: string
  name: string
  metrics: string[]
  dateRange: { start: Date; end: Date }
  format: 'pdf' | 'excel' | 'csv'
  schedule?: 'daily' | 'weekly' | 'monthly'
}

const PerformanceDashboard2: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('week')
  const [showReportBuilder, setShowReportBuilder] = useState(false)

  const metrics: PerformanceMetric[] = [
    {
      label: 'Tasks Completed',
      value: 47,
      change: 12,
      trend: 'up',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Productivity Score',
      value: 87,
      change: 5,
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Focus Time',
      value: 18,
      change: -3,
      trend: 'down',
      icon: <Brain className="w-6 h-6" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Goals Achieved',
      value: 8,
      change: 2,
      trend: 'up',
      icon: <Target className="w-6 h-6" />,
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      label: 'Avg Response Time',
      value: 2.3,
      change: -0.5,
      trend: 'up',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      label: 'Achievement Points',
      value: 1250,
      change: 180,
      trend: 'up',
      icon: <Award className="w-6 h-6" />,
      color: 'text-yellow-600 dark:text-yellow-400'
    }
  ]

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return '↗'
    if (trend === 'down') return '↘'
    return '→'
  }

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Mock export functionality
    console.log(`Exporting report as ${format}`)
    alert(`Report exported as ${format.toUpperCase()}!`)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Performance Dashboard 2.0
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced analytics & custom reports
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>

            {/* Export Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                  onClick={() => exportReport('pdf')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                >
                  Export as PDF
                </button>
                <button
                  onClick={() => exportReport('excel')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                >
                  Export as Excel
                </button>
                <button
                  onClick={() => exportReport('csv')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                >
                  Export as CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 
                  metric.trend === 'down' ? 'text-red-600 dark:text-red-400' : 
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {getTrendIcon(metric.trend)} {Math.abs(metric.change)}
                  {metric.label.includes('Time') ? 'h' : metric.label.includes('Score') ? 'pts' : ''}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
                {metric.label.includes('Score') && '%'}
                {metric.label.includes('Time') && 'h'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Productivity Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Productivity Trend
            </h3>
            <div className="h-48 flex items-end gap-2">
              {[65, 72, 68, 75, 82, 87, 85].map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-indigo-600 rounded-t" style={{ height: `${value}%` }} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Task Distribution
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Completed', value: 47, color: 'bg-green-500' },
                { label: 'In Progress', value: 12, color: 'bg-blue-500' },
                { label: 'Planned', value: 8, color: 'bg-purple-500' },
                { label: 'Overdue', value: 3, color: 'bg-red-500' }
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${(item.value / 70) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Predictive Insights */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6" />
            <h3 className="text-xl font-bold">AI-Powered Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="font-medium mb-2">📈 Trend Prediction</div>
              <p className="text-sm opacity-90">
                Based on current pace, you'll complete 215 tasks this month (+15% vs last month)
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="font-medium mb-2">⚡ Peak Performance</div>
              <p className="text-sm opacity-90">
                Your most productive hours are 9-11 AM and 2-4 PM
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="font-medium mb-2">🎯 Recommendation</div>
              <p className="text-sm opacity-90">
                Schedule complex tasks during morning peak hours for 25% better completion rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceDashboard2

