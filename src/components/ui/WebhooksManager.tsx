/**
 * Feature #98: Advanced Webhooks
 * Event-driven integration management
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Webhook, Plus, Play, Pause, Trash2, Copy, AlertCircle, CheckCircle } from 'lucide-react'
import { Webhook as WebhookType } from '../../utils/enterpriseFeatures'

const WebhooksManager: React.FC = () => {
  const [webhooks, setWebhooks] = useState<WebhookType[]>([
    {
      id: '1',
      name: 'Slack Notifications',
      url: 'https://hooks.slack.com/services/...',
      events: ['task.created', 'task.completed', 'project.updated'],
      secret: 'whsec_...',
      enabled: true,
      lastTriggered: new Date(),
      successRate: 98.5
    }
  ])

  const availableEvents = [
    'task.created', 'task.updated', 'task.completed', 'task.deleted',
    'project.created', 'project.updated', 'user.joined', 'goal.achieved'
  ]

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Webhook className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Webhooks</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Event-driven integrations</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            New Webhook
          </button>
        </div>

        <div className="space-y-4">
          {webhooks.map(webhook => (
            <motion.div
              key={webhook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{webhook.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{webhook.url}</p>
                </div>
                <div className="flex items-center gap-2">
                  {webhook.enabled ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {webhook.events.map(event => (
                  <span
                    key={event}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded"
                  >
                    {event}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <span>Success Rate: {webhook.successRate}%</span>
                  {webhook.lastTriggered && (
                    <span>Last: {webhook.lastTriggered.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    {webhook.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WebhooksManager
