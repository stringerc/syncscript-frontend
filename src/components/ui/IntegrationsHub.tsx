'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Integration {
  id: string
  name: string
  description: string
  icon: string
  category: 'productivity' | 'communication' | 'development' | 'data' | 'health'
  connected: boolean
  features: string[]
  premium?: boolean
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Sync tasks and get notifications in Slack',
    icon: '💬',
    category: 'communication',
    connected: false,
    features: ['Task sync', 'Notifications', 'Slash commands']
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Two-way sync with Google Calendar',
    icon: '📅',
    category: 'productivity',
    connected: false,
    features: ['Two-way sync', 'Event creation', 'Deadline sync']
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Import boards and cards from Trello',
    icon: '📋',
    category: 'productivity',
    connected: false,
    features: ['Board import', 'Card sync', 'Label mapping']
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Sync databases with Notion',
    icon: '📓',
    category: 'productivity',
    connected: false,
    features: ['Database sync', 'Property mapping', 'Real-time updates']
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Track commits, issues, and pull requests',
    icon: '🐙',
    category: 'development',
    connected: false,
    features: ['Issue sync', 'PR tracking', 'Commit history']
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect to 3000+ apps via webhooks',
    icon: '⚡',
    category: 'productivity',
    connected: false,
    features: ['Custom webhooks', 'Event triggers', 'Automation']
  },
  {
    id: 'apple-health',
    name: 'Apple Health',
    description: 'Track health metrics and correlate with productivity',
    icon: '❤️',
    category: 'health',
    connected: false,
    features: ['Sleep tracking', 'Steps correlation', 'Activity insights'],
    premium: true
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    description: 'Sync fitness data with productivity',
    icon: '⌚',
    category: 'health',
    connected: false,
    features: ['Fitness sync', 'Heart rate', 'Sleep analysis'],
    premium: true
  }
]

export default function IntegrationsHub() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Integration['category']>('all')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const filteredIntegrations = selectedCategory === 'all'
    ? INTEGRATIONS
    : INTEGRATIONS.filter(i => i.category === selectedCategory)

  const categories = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'productivity', label: 'Productivity', icon: '⚡' },
    { id: 'communication', label: 'Communication', icon: '💬' },
    { id: 'development', label: 'Development', icon: '🔧' },
    { id: 'health', label: 'Health', icon: '❤️' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-4">🔌 Integrations Hub</h1>
          <p className="text-xl text-white/90">Connect SyncScript with your favorite tools</p>
          
          <div className="mt-6 flex gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">{INTEGRATIONS.length}</div>
              <div className="text-sm text-white/80">Integrations</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">{INTEGRATIONS.filter(i => i.connected).length}</div>
              <div className="text-sm text-white/80">Connected</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Filter */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration, index) => (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedIntegration(integration)}
              className="group cursor-pointer"
            >
              <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 ${
                integration.connected
                  ? 'border-green-500'
                  : 'border-transparent hover:border-purple-500'
              } relative`}>
                {/* Premium Badge */}
                {integration.premium && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Premium
                  </div>
                )}

                {/* Connected Badge */}
                {integration.connected && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ✓ Connected
                  </div>
                )}

                <div className="text-6xl mb-4">{integration.icon}</div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {integration.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {integration.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-4">
                  {integration.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    integration.connected
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg text-white'
                  }`}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Integration Detail Modal */}
      {selectedIntegration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedIntegration(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full p-8"
          >
            <div className="text-center">
              <div className="text-8xl mb-4">{selectedIntegration.icon}</div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedIntegration.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedIntegration.description}
              </p>

              <div className="text-left mb-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Features:</h4>
                <ul className="space-y-2">
                  {selectedIntegration.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold"
                >
                  Close
                </button>
                <button
                  className={`flex-1 px-6 py-3 rounded-xl font-bold ${
                    selectedIntegration.connected
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  }`}
                >
                  {selectedIntegration.connected ? 'Disconnect' : 'Connect Now'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

