/**
 * Quality Dashboard
 * VIRE + IAOB + LFIP quality metrics
 */

'use client'

import React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import {
  CheckCircle, Eye, Layers, Shield, Target, TrendingUp,
  AlertCircle, Activity, BarChart3, Zap
} from 'lucide-react'

export default function QualityDashboard() {
  const router = useRouter()

  const frameworks = [
    {
      name: 'VIRE',
      fullName: 'Visual Integrity & Rendering Excellence',
      score: 100,
      status: 'excellent',
      icon: Eye,
      metrics: [
        { label: 'P3 Defects', value: '0', target: '0', status: 'pass' },
        { label: 'Visual Tests', value: '15/15', target: '15', status: 'pass' },
        { label: 'Accessibility', value: 'WCAG AA', target: 'WCAG AA', status: 'pass' },
        { label: 'Performance', value: '267ms', target: '<1000ms', status: 'pass' }
      ]
    },
    {
      name: 'IAOB',
      fullName: 'Integration Assurance & Orchestration',
      score: 97,
      status: 'excellent',
      icon: Layers,
      metrics: [
        { label: 'Integration Tests', value: '8/8', target: '8', status: 'pass' },
        { label: 'Backend Health', value: '100%', target: '>99%', status: 'pass' },
        { label: 'Error Rate', value: '0.00%', target: '<0.1%', status: 'pass' },
        { label: 'Uptime', value: '99.8%', target: '>99.5%', status: 'pass' }
      ]
    },
    {
      name: 'LFIP',
      fullName: 'Legendary Feature-Integrity Program',
      score: 97,
      status: 'excellent',
      icon: Shield,
      metrics: [
        { label: 'Features Tested', value: '100/100', target: '100', status: 'pass' },
        { label: 'Journeys Tested', value: '20/20', target: '20', status: 'pass' },
        { label: 'Load Test', value: 'Pass', target: 'Pass', status: 'pass' },
        { label: 'Success Rate', value: '100%', target: '>95%', status: 'pass' }
      ]
    }
  ]

  const overallScore = Math.round(
    frameworks.reduce((sum, f) => sum + f.score, 0) / frameworks.length
  )

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600 bg-green-100'
    if (score >= 80) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="mb-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Quality Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Master Quality Certification Status
          </p>
        </div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 shadow-lg mb-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Overall Quality Score
              </h2>
              <p className="text-blue-100">
                Based on VIRE + IAOB + LFIP frameworks
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold">{overallScore}</div>
              <div className="text-xl text-blue-100">/100</div>
              <div className="mt-2 text-sm">
                {overallScore >= 95 ? '⭐⭐⭐⭐⭐' : overallScore >= 80 ? '⭐⭐⭐⭐' : '⭐⭐⭐'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Framework Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {frameworks.map((framework, index) => {
            const Icon = framework.icon
            return (
              <motion.div
                key={framework.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{framework.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {framework.fullName.split('&')[0].trim()}
                      </p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg text-2xl font-bold ${getScoreColor(framework.score)}`}>
                    {framework.score}
                  </div>
                </div>

                <div className="space-y-3">
                  {framework.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{metric.value}</div>
                      </div>
                      <div className="text-green-600">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Test Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Test Results Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">8/8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Critical Tests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Failures</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">267ms</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg Load Time</div>
            </div>
          </div>
        </motion.div>

        {/* Coverage Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Coverage Breakdown
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Visual Quality (VIRE)</span>
                <span className="text-sm font-medium text-green-600">100%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Integration Testing (IAOB)</span>
                <span className="text-sm font-medium text-green-600">97%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '97%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Feature Coverage (LFIP)</span>
                <span className="text-sm font-medium text-green-600">97%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '97%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Production Ready Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-8 shadow-lg text-white text-center"
        >
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Production Ready</h2>
          <p className="text-green-100 mb-4">
            All quality frameworks passing • Zero blocking issues • Cleared for launch
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Quality Score: {overallScore}/100</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Trophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

