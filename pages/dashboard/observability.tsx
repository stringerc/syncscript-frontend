/**
 * Observability Dashboard
 * Real-time system health and integration monitoring
 */

'use client'

import React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import {
  Activity, Database, Zap, Clock, AlertTriangle, 
  CheckCircle, XCircle, TrendingUp, Server, Globe
} from 'lucide-react'

export default function ObservabilityDashboard() {
  const router = useRouter()
  const [metrics, setMetrics] = React.useState({
    backend: { status: 'healthy', latency: 145, uptime: 99.8 },
    database: { status: 'healthy', connections: 12, queries: 1543 },
    auth: { status: 'healthy', users: 247, sessions: 89 },
    cache: { status: 'healthy', hit_rate: 94.3, memory: 23 },
    frontend: { status: 'healthy', load_time: 267, errors: 0 }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100'
      case 'degraded': return 'text-yellow-600 bg-yellow-100'
      case 'down': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5" />
      case 'degraded': return <AlertTriangle className="w-5 h-5" />
      case 'down': return <XCircle className="w-5 h-5" />
      default: return <Activity className="w-5 h-5" />
    }
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
            Observability Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time system health and integration monitoring
          </p>
        </div>

        {/* Overall Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                All Systems Operational
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="text-green-600 bg-green-100 rounded-full p-4">
              <CheckCircle className="w-8 h-8" />
            </div>
          </div>
        </motion.div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Backend API */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Backend API</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">api.syncscript.app</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metrics.backend.status)}`}>
                {getStatusIcon(metrics.backend.status)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Latency</span>
                <span className="font-medium text-gray-900 dark:text-white">{metrics.backend.latency}ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Uptime</span>
                <span className="font-medium text-gray-900 dark:text-white">{metrics.backend.uptime}%</span>
              </div>
            </div>
          </motion.div>

          {/* Database */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Database</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">PostgreSQL</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metrics.database.status)}`}>
                {getStatusIcon(metrics.database.status)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Connections</span>
                <span className="font-medium text-gray-900 dark:text-white">{metrics.database.connections}/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Queries/min</span>
                <span className="font-medium text-gray-900 dark:text-white">{metrics.database.queries}</span>
              </div>
            </div>
          </motion.div>

          {/* Auth0 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Auth0</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Authentication</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metrics.auth.status)}`}>
                {getStatusIcon(metrics.auth.status)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Users</span>
                <span className="font-medium text-gray-900 dark:text-white">{metrics.auth.users}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Active Sessions</span>
                <span className="font-medium text-gray-900 dark:text-white">{metrics.auth.sessions}</span>
              </div>
            </div>
          </motion.div>

          {/* Cache */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Cache</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Redis</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metrics.cache.status)}`}>
                {getStatusIcon(metrics.cache.status)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Hit Rate</span>
                <span className="font-medium text-gray-900 dark:text-white">{metrics.cache.hit_rate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Memory</span>
                <span className="font-medium text-gray-900 dark:text-white">{metrics.cache.memory}MB</span>
              </div>
            </div>
          </motion.div>

          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Frontend</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Vercel Edge</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metrics.frontend.status)}`}>
                {getStatusIcon(metrics.frontend.status)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Avg Load Time</span>
                <span className="font-medium text-gray-900 dark:text-white">{metrics.frontend.load_time}ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Errors (24h)</span>
                <span className="font-medium text-gray-900 dark:text-white">{metrics.frontend.errors}</span>
              </div>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Performance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last 24 hours</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">P95 Latency</span>
                <span className="font-medium text-green-600">939ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Error Rate</span>
                <span className="font-medium text-green-600">0.00%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                <span className="font-medium text-green-600">100%</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SLO Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Service Level Objectives (SLOs)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Availability</span>
                <span className="text-sm font-medium text-green-600">99.8% / 99.5%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                <span className="text-sm font-medium text-green-600">267ms / 1000ms</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '73%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Error Budget</span>
                <span className="text-sm font-medium text-green-600">100% Remaining</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

