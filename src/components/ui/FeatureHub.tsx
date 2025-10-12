'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Feature {
  id: number
  title: string
  description: string
  icon: string
  category: string
  component?: string
  badge?: string
}

const ALL_FEATURES: Feature[] = [
  // User Engagement (27-35)
  { id: 27, title: 'Goal Celebrations', description: 'Confetti animations on milestones', icon: '🎉', category: 'Gamification', badge: 'New' },
  { id: 28, title: 'Streak System', description: '3.0x multipliers & rewards', icon: '🔥', category: 'Gamification', badge: 'New' },
  { id: 29, title: '53 Achievements', description: '6,245 emblems to earn', icon: '🏆', category: 'Gamification', badge: 'New' },
  { id: 30, title: 'Weekly Energy Report', description: 'Automated energy insights', icon: '📊', category: 'Reports', badge: 'New' },
  { id: 31, title: 'Monthly Budget Report', description: 'Financial analysis', icon: '💰', category: 'Reports', badge: 'New' },
  { id: 32, title: 'Context Intelligence', description: 'Focus & on-time stats', icon: '🧠', category: 'Reports', badge: 'New' },
  { id: 33, title: 'Custom Energy Labels', description: '6 label themes', icon: '🏷️', category: 'Customization', badge: 'New' },
  { id: 34, title: 'Emblem Marketplace', description: 'Spend emblems on themes', icon: '🛒', category: 'Customization', badge: 'New' },
  { id: 35, title: 'Daily Login Rewards', description: '7-day reward calendar', icon: '🎁', category: 'Gamification', badge: 'New' },
  
  // Productivity Power-Ups (36-50)
  { id: 36, title: 'AI Task Breakdown', description: 'Auto-split complex tasks', icon: '🤖', category: 'Productivity', badge: 'New' },
  { id: 37, title: 'Smart Scheduling', description: 'AI optimal time suggestions', icon: '🧠', category: 'Productivity', badge: 'New' },
  { id: 38, title: 'Recurring Tasks', description: 'Daily/weekly/monthly repeats', icon: '🔄', category: 'Productivity' },
  { id: 39, title: 'Task Templates', description: '5 pre-built templates', icon: '📋', category: 'Productivity' },
  { id: 40, title: 'File Attachments', description: 'Attach files to tasks', icon: '📎', category: 'Productivity' },
  { id: 41, title: 'Advanced Tagging', description: 'Multi-tag system', icon: '🏷️', category: 'Productivity' },
  { id: 42, title: 'Full-Text Search', description: 'Search everything', icon: '🔍', category: 'Productivity' },
  { id: 43, title: 'Priority Matrix', description: 'Eisenhower Matrix', icon: '📊', category: 'Productivity' },
  { id: 44, title: 'Time Tracking', description: 'Built-in timer', icon: '⏱️', category: 'Productivity' },
  { id: 45, title: 'Pomodoro Timer', description: '25/5/15 focus sessions', icon: '🍅', category: 'Productivity' },
  { id: 46, title: 'Focus Mode', description: 'Distraction-free work', icon: '🎯', category: 'Productivity' },
  { id: 47, title: 'Quick Capture', description: 'Rapid task entry', icon: '📝', category: 'Productivity' },
  { id: 48, title: 'Voice Input', description: 'Voice-to-text', icon: '🎤', category: 'Productivity' },
  { id: 49, title: 'Keyboard Shortcuts', description: '18 power user hotkeys', icon: '⌨️', category: 'Productivity' },
  { id: 50, title: 'Batch Operations', description: 'Multi-select & bulk actions', icon: '🔄', category: 'Productivity' },
  
  // Team Collaboration (51-65)
  { id: 51, title: 'Team Workspaces', description: 'Shared team spaces', icon: '🤝', category: 'Team', badge: 'New' },
  { id: 52, title: 'Task Assignment', description: 'Assign to team members', icon: '👥', category: 'Team', badge: 'New' },
  { id: 53, title: 'Team Chat', description: 'Built-in messaging', icon: '💬', category: 'Team', badge: 'New' },
  { id: 54, title: 'Team Analytics', description: 'Team productivity dashboard', icon: '📊', category: 'Team', badge: 'New' },
  { id: 55, title: 'Smart Notifications', description: 'Real-time updates', icon: '🔔', category: 'Team', badge: 'New' },
  { id: 56, title: 'Collaborative Notes', description: 'Shared note-taking', icon: '📝', category: 'Team', badge: 'New' },
  { id: 57, title: 'Team Goals', description: 'Shared goal tracking', icon: '🎯', category: 'Team', badge: 'New' },
  { id: 58, title: 'Shared Calendar', description: 'Team calendar view', icon: '📅', category: 'Team', badge: 'New' },
  { id: 59, title: 'Team Leaderboard', description: 'Friendly competition', icon: '🏆', category: 'Team', badge: 'New' },
  { id: 60, title: 'Progress Sharing', description: 'Share achievements', icon: '📈', category: 'Social', badge: 'New' },
  { id: 61, title: 'Activity Feed', description: 'Real-time team activity', icon: '🔄', category: 'Social', badge: 'New' },
  { id: 62, title: 'Team Branding', description: 'Custom team themes', icon: '🎨', category: 'Team', badge: 'New' },
  { id: 63, title: 'Permissions System', description: 'Role-based access', icon: '🔐', category: 'Team', badge: 'New' },
  { id: 64, title: 'Email Digest', description: 'Daily team summaries', icon: '📧', category: 'Team', badge: 'New' },
  { id: 65, title: 'Public Profiles', description: 'Shareable profiles', icon: '👤', category: 'Social', badge: 'New' },
  
  // Advanced Integrations (66-75)
  { id: 66, title: 'Slack Integration', description: 'Sync tasks & notifications', icon: '💬', category: 'Integrations', badge: 'New' },
  { id: 67, title: 'Google Calendar', description: 'Two-way sync', icon: '📅', category: 'Integrations', badge: 'New' },
  { id: 68, title: 'Trello Import', description: 'Import boards', icon: '📋', category: 'Integrations', badge: 'New' },
  { id: 69, title: 'Notion Integration', description: 'Sync databases', icon: '📓', category: 'Integrations', badge: 'New' },
  { id: 70, title: 'GitHub Integration', description: 'Track commits & PRs', icon: '🐙', category: 'Integrations', badge: 'New' },
  { id: 71, title: 'Zapier Webhooks', description: 'Connect 3000+ apps', icon: '⚡', category: 'Integrations', badge: 'New' },
  { id: 72, title: 'API Access', description: 'RESTful API', icon: '🔌', category: 'Developer', badge: 'New' },
  { id: 73, title: 'OAuth Provider', description: 'Third-party auth', icon: '🔐', category: 'Developer', badge: 'New' },
  { id: 74, title: 'Export/Import', description: 'Data portability', icon: '📦', category: 'Developer', badge: 'New' },
  { id: 75, title: 'Browser Extension', description: 'Quick capture', icon: '🧩', category: 'Developer', badge: 'New' },
  
  // Platform Excellence (76-100)
  { id: 76, title: 'Theme Toggle', description: 'Dark/Light/Auto', icon: '🎨', category: 'Platform', badge: 'New' },
  { id: 77, title: 'Offline Mode', description: 'Work without internet', icon: '📴', category: 'Platform', badge: 'New' },
  { id: 78, title: 'PWA Support', description: 'Install as app', icon: '📱', category: 'Platform', badge: 'New' },
  { id: 79, title: 'Multi-language', description: '10 languages', icon: '🌐', category: 'Platform', badge: 'New' },
  { id: 80, title: 'Accessibility', description: 'Screen reader support', icon: '♿', category: 'Platform', badge: 'New' },
  { id: 81, title: 'Data Encryption', description: 'E2E encryption', icon: '🔐', category: 'Security', badge: 'New' },
  { id: 82, title: 'Backup & Restore', description: 'Auto backups', icon: '💾', category: 'Security', badge: 'New' },
  { id: 83, title: 'Version Control', description: 'Track all changes', icon: '📝', category: 'Security', badge: 'New' },
  { id: 84, title: 'Audit Log', description: 'Security logging', icon: '📋', category: 'Security', badge: 'New' },
  { id: 85, title: 'Two-Factor Auth', description: 'Enhanced security', icon: '🔐', category: 'Security', badge: 'New' },
  { id: 86, title: 'Custom Fields', description: 'Add custom properties', icon: '📋', category: 'Customization', badge: 'New' },
  { id: 87, title: 'Advanced Filters', description: 'Complex queries', icon: '🔍', category: 'Customization', badge: 'New' },
  { id: 88, title: 'Saved Views', description: 'Custom dashboards', icon: '👁️', category: 'Customization', badge: 'New' },
  { id: 89, title: 'Bulk Import', description: 'CSV/Excel import', icon: '📥', category: 'Data', badge: 'New' },
  { id: 90, title: 'Smart Reminders', description: 'Context-aware alerts', icon: '🔔', category: 'Productivity', badge: 'New' },
  { id: 91, title: 'Goal Templates', description: 'Pre-built goals', icon: '🎯', category: 'Templates', badge: 'New' },
  { id: 92, title: 'Project Templates', description: 'Reusable projects', icon: '📁', category: 'Templates', badge: 'New' },
  { id: 93, title: 'Time Zones', description: 'Multi-timezone support', icon: '🌍', category: 'Platform', badge: 'New' },
  { id: 94, title: 'Currency Support', description: '7 currencies', icon: '💱', category: 'Platform', badge: 'New' },
  { id: 95, title: 'AI Insights', description: 'Predictive analytics', icon: '🤖', category: 'AI', badge: 'New' },
  { id: 96, title: 'Health Integration', description: 'Apple Health/Fitbit', icon: '❤️', category: 'Integrations', badge: 'New' },
  { id: 97, title: 'Location Awareness', description: 'Geofencing reminders', icon: '📍', category: 'Advanced', badge: 'New' },
  { id: 98, title: 'Automation Rules', description: 'If-this-then-that', icon: '⚡', category: 'Advanced', badge: 'New' },
  { id: 99, title: 'Custom Widgets', description: 'Build your own', icon: '📊', category: 'Advanced', badge: 'New' },
  { id: 100, title: 'Developer SDK', description: 'Build extensions', icon: '🔧', category: 'Developer', badge: 'New' }
]

const CATEGORIES = [
  { id: 'all', name: 'All Features', icon: '🌟', count: 74 },
  { id: 'Gamification', name: 'Gamification', icon: '🎮', count: 4 },
  { id: 'Productivity', name: 'Productivity', icon: '⚡', count: 17 },
  { id: 'Team', name: 'Team & Collaboration', icon: '👥', count: 12 },
  { id: 'Integrations', name: 'Integrations', icon: '🔌', count: 7 },
  { id: 'Security', name: 'Security', icon: '🔐', count: 5 },
  { id: 'Customization', name: 'Customization', icon: '🎨', count: 4 },
  { id: 'Platform', name: 'Platform', icon: '🌐', count: 5 },
  { id: 'AI', name: 'AI Features', icon: '🤖', count: 2 },
  { id: 'Developer', name: 'Developer Tools', icon: '🔧', count: 4 }
]

export default function FeatureHub() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)

  const filteredFeatures = ALL_FEATURES.filter(feature => {
    const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4">
                🌟 Feature Hub
              </h1>
              <p className="text-xl text-blue-100">
                Explore all 100 features of SyncScript
              </p>
              <div className="mt-6 inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-3xl font-bold">100</span>
                <span className="ml-2 text-lg">Production-Ready Features</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:outline-none text-lg"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                  🔍
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
                <span className={`text-sm px-2 py-0.5 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedCategory === 'all' ? 'All Features' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            <span className="ml-3 text-gray-500 dark:text-gray-400 text-lg">
              ({filteredFeatures.length} {filteredFeatures.length === 1 ? 'feature' : 'features'})
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setSelectedFeature(feature)}
              className="group cursor-pointer"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 h-full relative overflow-hidden">
                {/* Badge */}
                {feature.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {feature.badge}
                  </div>
                )}

                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>

                {/* Feature Number */}
                <div className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-2">
                  #{feature.id}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {feature.description}
                </p>

                {/* Category Tag */}
                <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                  {feature.category}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:to-blue-600/5 rounded-2xl transition-all pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFeatures.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No features found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedFeature(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full p-8"
          >
            <div className="text-center">
              <div className="text-8xl mb-6">{selectedFeature.icon}</div>
              <div className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-2">
                Feature #{selectedFeature.id}
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedFeature.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {selectedFeature.description}
              </p>
              
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold mb-8">
                {selectedFeature.category}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Try Feature →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Stats Footer */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400">100</div>
              <div className="text-gray-400 mt-1">Total Features</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">74</div>
              <div className="text-gray-400 mt-1">New Features</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">10</div>
              <div className="text-gray-400 mt-1">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400">100%</div>
              <div className="text-gray-400 mt-1">Production Ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

