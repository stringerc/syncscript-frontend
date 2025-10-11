'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  generateWeeklyEnergyReport,
  generateMonthlyBudgetReport,
  generateContextReport,
  formatReportPeriod,
  EnergyReport,
  BudgetReport,
  ContextReport
} from '@/utils/reportSystem'

type ReportType = 'energy' | 'budget' | 'context'

export default function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState<ReportType>('energy')
  const [energyReport, setEnergyReport] = useState<EnergyReport | null>(null)
  const [budgetReport, setBudgetReport] = useState<BudgetReport | null>(null)
  const [contextReport, setContextReport] = useState<ContextReport | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate reports on mount
    setLoading(true)
    setTimeout(() => {
      setEnergyReport(generateWeeklyEnergyReport())
      setBudgetReport(generateMonthlyBudgetReport())
      setContextReport(generateContextReport('week'))
      setLoading(false)
    }, 500)
  }, [])

  const tabs: Array<{ id: ReportType; label: string; icon: string }> = [
    { id: 'energy', label: 'Weekly Energy', icon: '⚡' },
    { id: 'budget', label: 'Monthly Budget', icon: '💰' },
    { id: 'context', label: 'Context Intelligence', icon: '🧠' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📊</div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Generating reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Automated Reports 📊
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive insights and recommendations for your productivity
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium rounded-t-lg transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Report Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'energy' && energyReport && (
          <EnergyReportView report={energyReport} />
        )}
        {activeTab === 'budget' && budgetReport && (
          <BudgetReportView report={budgetReport} />
        )}
        {activeTab === 'context' && contextReport && (
          <ContextReportView report={contextReport} />
        )}
      </motion.div>
    </div>
  )
}

function EnergyReportView({ report }: { report: EnergyReport }) {
  const trendColors = {
    improving: 'text-green-600 dark:text-green-400',
    stable: 'text-blue-600 dark:text-blue-400',
    declining: 'text-red-600 dark:text-red-400'
  }

  const trendIcons = {
    improving: '📈',
    stable: '➡️',
    declining: '📉'
  }

  return (
    <div>
      {/* Period */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {formatReportPeriod(report.startDate, report.endDate)}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">{report.avgEnergy.toFixed(1)}</div>
          <div className="text-sm text-blue-100">Average Energy</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">{report.highEnergyDays}</div>
          <div className="text-sm text-green-100">High Energy Days</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">{report.tasksCompleted}</div>
          <div className="text-sm text-purple-100">Tasks Completed</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">{report.emblemsEarned}</div>
          <div className="text-sm text-orange-100">Emblems Earned</div>
        </div>
      </div>

      {/* Trend */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Energy Trend
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{trendIcons[report.energyTrend]}</span>
          <div>
            <div className={`text-2xl font-bold ${trendColors[report.energyTrend]}`}>
              {report.energyTrend.charAt(0).toUpperCase() + report.energyTrend.slice(1)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Most productive: {report.mostProductiveDay}
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span>💡</span> Key Insights
          </h3>
          <ul className="space-y-3">
            {report.insights.map((insight, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span>🎯</span> Recommendations
          </h3>
          <ul className="space-y-3">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function BudgetReportView({ report }: { report: BudgetReport }) {
  const percentColor = 
    report.percentUsed <= 75 ? 'text-green-600' :
    report.percentUsed <= 90 ? 'text-yellow-600' :
    'text-red-600'

  return (
    <div>
      {/* Period */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {formatReportPeriod(report.startDate, report.endDate)}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">${report.totalBudget}</div>
          <div className="text-sm text-blue-100">Total Budget</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">${report.totalSpent}</div>
          <div className="text-sm text-purple-100">Total Spent</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">${report.remaining}</div>
          <div className="text-sm text-green-100">Remaining</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">{report.percentUsed.toFixed(0)}%</div>
          <div className="text-sm text-orange-100">Budget Used</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Budget Progress
        </h3>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, report.percentUsed)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${
              report.percentUsed <= 75 ? 'bg-green-500' :
              report.percentUsed <= 90 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Avg daily: ${report.avgDailySpending.toFixed(2)}
          </span>
          <span className={`font-bold ${percentColor}`}>
            {report.percentUsed.toFixed(1)}% used
          </span>
        </div>
      </div>

      {/* Biggest Category */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Biggest Expense Category
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {report.biggestCategory.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Primary spending area
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            ${report.biggestCategory.amount}
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      {report.goalProgress.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Savings Goals Progress
          </h3>
          <div className="space-y-4">
            {report.goalProgress.map((goal, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">{goal.name}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {goal.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span>💡</span> Key Insights
          </h3>
          <ul className="space-y-3">
            {report.insights.map((insight, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span>🎯</span> Recommendations
          </h3>
          <ul className="space-y-3">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ContextReportView({ report }: { report: ContextReport }) {
  const onTimeColor = 
    report.onTimeRate >= 90 ? 'text-green-600' :
    report.onTimeRate >= 75 ? 'text-yellow-600' :
    'text-red-600'

  const focusColor =
    report.focusScore >= 80 ? 'text-green-600' :
    report.focusScore >= 60 ? 'text-yellow-600' :
    'text-red-600'

  return (
    <div>
      {/* Period */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {formatReportPeriod(report.startDate, report.endDate)}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">{report.totalTasks}</div>
          <div className="text-sm text-blue-100">Total Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">{report.onTimeRate.toFixed(0)}%</div>
          <div className="text-sm text-green-100">On-Time Rate</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">{report.focusScore.toFixed(0)}</div>
          <div className="text-sm text-purple-100">Focus Score</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="text-4xl font-bold mb-1">{report.avgCompletionTime.toFixed(1)}h</div>
          <div className="text-sm text-orange-100">Avg Completion</div>
        </div>
      </div>

      {/* Task Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Task Completion Breakdown
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {report.onTimeTasks}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">On Time</div>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {report.lateTasks}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Late</div>
          </div>
        </div>
      </div>

      {/* Peak Hours */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Peak Productivity Hours
        </h3>
        <div className="flex flex-wrap gap-3">
          {report.peakProductivityHours.map((hour) => (
            <div
              key={hour}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-bold text-lg"
            >
              {hour}:00
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
          Schedule your most important tasks during these hours for maximum productivity
        </p>
      </div>

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span>💡</span> Key Insights
          </h3>
          <ul className="space-y-3">
            {report.insights.map((insight, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <span>🎯</span> Recommendations
          </h3>
          <ul className="space-y-3">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

