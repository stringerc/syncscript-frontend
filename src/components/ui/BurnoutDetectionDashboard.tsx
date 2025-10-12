/**
 * Feature #85: Burnout Detection
 * Wellness monitoring with proactive recommendations
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, TrendingDown, AlertTriangle, Coffee, Moon, Activity } from 'lucide-react'

const BurnoutDetectionDashboard: React.FC = () => {
  const [metrics] = useState({
    overworkScore: 65,
    stressLevel: 58,
    workLifeBalance: 72,
    riskLevel: 'medium' as const
  })

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
      case 'high': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
      default: return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
    }
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Wellness Monitor</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Burnout detection & prevention</p>
          </div>
        </div>

        <div className={`rounded-xl p-6 mb-6 ${getRiskColor(metrics.riskLevel)}`}>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="text-xl font-bold">Risk Level: {metrics.riskLevel.toUpperCase()}</h3>
          </div>
          <p className="text-sm">You&apos;re showing signs of elevated stress. Consider taking breaks.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{metrics.overworkScore}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Overwork Score</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <TrendingDown className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{metrics.stressLevel}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Stress Level</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400 mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{metrics.workLifeBalance}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Work-Life Balance</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Coffee className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">Take Regular Breaks</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Schedule 5-10 minute breaks every 90 minutes</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">Improve Sleep Schedule</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Aim for 7-8 hours of quality sleep</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BurnoutDetectionDashboard

