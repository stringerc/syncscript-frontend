/**
 * SyncScript Features Showcase
 * Complete catalog of all 100 production features
 */

'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Sparkles, Users, DollarSign, Brain, 
  Zap, BarChart3, Calendar, Settings, Trophy,
  Shield, Rocket, Target, Heart, Globe,
  CheckCircle, Clock, TrendingUp, Layers
} from 'lucide-react'

interface Feature {
  id: number
  name: string
  description: string
  category: string
  status: 'live' | 'beta' | 'new'
  icon: string
}

const features: Feature[] = [
  // AI & Automation (Features 83-91 + more)
  { id: 1, name: 'AI Coach', description: 'Personalized AI coaching for productivity optimization', category: 'AI & Automation', status: 'live', icon: 'Brain' },
  { id: 2, name: 'Smart Suggestions', description: 'Context-aware task recommendations based on energy, budget, and time', category: 'AI & Automation', status: 'live', icon: 'Sparkles' },
  { id: 3, name: 'AI Explainability', description: 'Transparent AI reasoning with confidence scores and alternative options', category: 'AI & Automation', status: 'live', icon: 'Brain' },
  { id: 4, name: 'Predictive Scheduling', description: 'AI-powered auto-scheduling based on your patterns', category: 'AI & Automation', status: 'live', icon: 'Calendar' },
  { id: 5, name: 'Smart Notifications', description: 'Context-aware notifications delivered at optimal times', category: 'AI & Automation', status: 'live', icon: 'Zap' },
  { id: 6, name: 'Burnout Detection', description: 'Monitor wellness indicators and suggest breaks', category: 'AI & Automation', status: 'live', icon: 'Heart' },
  { id: 7, name: 'Auto-Categorization', description: 'AI-powered task categorization', category: 'AI & Automation', status: 'live', icon: 'Layers' },
  { id: 8, name: 'Meeting Notes AI', description: 'Auto transcription and summary generation', category: 'AI & Automation', status: 'live', icon: 'Brain' },
  { id: 9, name: 'Task Dependencies AI', description: 'Automatic dependency detection from task content', category: 'AI & Automation', status: 'live', icon: 'Target' },
  { id: 10, name: 'Priority Optimizer', description: 'AI-driven priority scoring', category: 'AI & Automation', status: 'live', icon: 'TrendingUp' },
  { id: 11, name: 'Time Estimate AI', description: 'Accurate duration prediction based on historical data', category: 'AI & Automation', status: 'live', icon: 'Clock' },
  { id: 12, name: 'Smart Reminders', description: 'Context-aware reminder delivery', category: 'AI & Automation', status: 'live', icon: 'Zap' },
  { id: 13, name: 'AI Writing Assistant', description: 'Grammar, tone, and content suggestions', category: 'AI & Automation', status: 'live', icon: 'Brain' },

  // Budget Intelligence
  { id: 14, name: 'Budget Tracker', description: 'Track task costs and project budgets with real-time insights', category: 'Budget Intelligence', status: 'live', icon: 'DollarSign' },
  { id: 15, name: 'Budget Comfort Bands', description: 'Visual budget zones (Safe/Stretch/Over) for informed decisions', category: 'Budget Intelligence', status: 'live', icon: 'DollarSign' },
  { id: 16, name: 'Budget Fit Scoring', description: '0-100 score showing how tasks fit your budget with explanations', category: 'Budget Intelligence', status: 'live', icon: 'Target' },
  { id: 17, name: 'Savings Goals', description: 'Track savings targets with progress visualization', category: 'Budget Intelligence', status: 'live', icon: 'DollarSign' },
  { id: 18, name: 'Budget Analytics', description: 'Comprehensive budget analysis with trends and forecasts', category: 'Budget Intelligence', status: 'new', icon: 'BarChart3' },

  // Energy & Wellness
  { id: 19, name: 'Energy Recalibration', description: 'Automatic energy level adjustments based on task completion', category: 'Energy & Wellness', status: 'live', icon: 'Zap' },
  { id: 20, name: 'Energy Analytics', description: 'Track energy patterns and optimize your schedule', category: 'Energy & Wellness', status: 'new', icon: 'BarChart3' },
  { id: 21, name: 'Emblem Transparency', description: 'Visual breakdown of how Emblem charge is calculated', category: 'Energy & Wellness', status: 'live', icon: 'Sparkles' },
  { id: 22, name: 'Energy Showcase', description: 'Public profile showcasing your energy achievements', category: 'Energy & Wellness', status: 'live', icon: 'Trophy' },
  { id: 23, name: 'Anti-Gaming System', description: 'Prevents energy gaming with decay, verification, and penalties', category: 'Energy & Wellness', status: 'live', icon: 'Shield' },
  
  // Team Collaboration
  { id: 24, name: 'Team Dashboard', description: 'Central hub for team projects, members, and activity', category: 'Team Collaboration', status: 'live', icon: 'Users' },
  { id: 25, name: 'Team Workspaces', description: 'Shared workspaces with channels and file sharing', category: 'Team Collaboration', status: 'live', icon: 'Users' },
  { id: 26, name: 'Team Goals', description: 'Collaborative goal tracking with progress visualization', category: 'Team Collaboration', status: 'live', icon: 'Target' },
  { id: 27, name: 'Peer Recognition', description: 'Give and receive kudos with badges and leaderboards', category: 'Team Collaboration', status: 'live', icon: 'Trophy' },
  { id: 28, name: 'Team Calendar Sync', description: 'Shared calendar with team availability', category: 'Team Collaboration', status: 'live', icon: 'Calendar' },
  { id: 29, name: 'Collaborative Editor', description: 'Real-time collaborative document editing', category: 'Team Collaboration', status: 'live', icon: 'Users' },
  { id: 30, name: 'Team Invitations', description: 'Easy team member invitations with role management', category: 'Team Collaboration', status: 'live', icon: 'Users' },

  // Task Management
  { id: 31, name: 'Smart Task Breakdown', description: 'AI-powered task decomposition into manageable subtasks', category: 'Task Management', status: 'live', icon: 'Layers' },
  { id: 32, name: 'Advanced Task Breakdown', description: 'Comprehensive subtask management with dependencies', category: 'Task Management', status: 'live', icon: 'Layers' },
  { id: 33, name: 'Dependency Mapper', description: 'Visual task dependency tracking and management', category: 'Task Management', status: 'live', icon: 'Target' },
  { id: 34, name: 'Kanban Board', description: 'Drag-and-drop task board with custom columns', category: 'Task Management', status: 'live', icon: 'Layers' },
  { id: 35, name: 'Eisenhower Matrix', description: 'Prioritize tasks using the urgent/important framework', category: 'Task Management', status: 'live', icon: 'Target' },
  { id: 36, name: 'Task Templates', description: 'Pre-built templates for common task types', category: 'Task Management', status: 'live', icon: 'Layers' },
  { id: 37, name: 'Recurring Tasks', description: 'Automated task repetition with flexible schedules', category: 'Task Management', status: 'live', icon: 'Clock' },
  { id: 38, name: 'Bulk Actions', description: 'Edit multiple tasks simultaneously', category: 'Task Management', status: 'live', icon: 'Layers' },
  { id: 39, name: 'Task Filters', description: 'Advanced filtering by status, priority, energy, budget', category: 'Task Management', status: 'live', icon: 'Search' },
  { id: 40, name: 'Task Sharing', description: 'Share tasks with team members or external collaborators', category: 'Task Management', status: 'live', icon: 'Users' },
  { id: 41, name: 'Task Comments', description: 'Threaded discussions on tasks', category: 'Task Management', status: 'live', icon: 'Users' },

  // Productivity & Focus
  { id: 42, name: 'Pomodoro Plus', description: 'Enhanced Pomodoro timer with analytics and customization', category: 'Productivity & Focus', status: 'live', icon: 'Clock' },
  { id: 43, name: 'Focus Mode Pro', description: 'Distraction-free work mode with session tracking', category: 'Productivity & Focus', status: 'live', icon: 'Zap' },
  { id: 44, name: 'Time Blocking Calendar', description: 'Visual schedule with drag-and-drop time blocks', category: 'Productivity & Focus', status: 'live', icon: 'Calendar' },
  { id: 45, name: 'Time Tracker', description: 'Automatic time tracking with detailed reports', category: 'Productivity & Focus', status: 'live', icon: 'Clock' },
  { id: 46, name: 'Daily Planning', description: 'AI-powered daily plan generation', category: 'Productivity & Focus', status: 'live', icon: 'Calendar' },
  { id: 47, name: 'Productivity Center', description: 'Unified hub for all productivity tools', category: 'Productivity & Focus', status: 'live', icon: 'Rocket' },
  { id: 48, name: 'Smart Scheduler', description: 'Intelligent scheduling based on energy and availability', category: 'Productivity & Focus', status: 'live', icon: 'Calendar' },

  // Analytics & Reporting
  { id: 49, name: 'Performance Dashboard', description: 'Comprehensive productivity metrics and insights', category: 'Analytics & Reporting', status: 'live', icon: 'BarChart3' },
  { id: 50, name: 'Advanced Analytics', description: 'Deep-dive analytics with custom date ranges', category: 'Analytics & Reporting', status: 'live', icon: 'BarChart3' },
  { id: 51, name: 'Reports Dashboard', description: 'Generate and export detailed reports', category: 'Analytics & Reporting', status: 'live', icon: 'BarChart3' },
  { id: 52, name: 'Custom Reports', description: 'Build custom reports with drag-and-drop', category: 'Analytics & Reporting', status: 'live', icon: 'BarChart3' },
  { id: 53, name: 'Resource Allocation', description: 'Track team capacity and workload distribution', category: 'Analytics & Reporting', status: 'live', icon: 'Users' },
  { id: 54, name: 'Workload Balancer', description: 'Automatic workload analysis and suggestions', category: 'Analytics & Reporting', status: 'live', icon: 'Users' },

  // Integrations
  { id: 55, name: 'Calendar Integration', description: 'Two-way sync with Google Calendar, Outlook, Apple Calendar', category: 'Integrations', status: 'live', icon: 'Calendar' },
  { id: 56, name: 'Slack Integration', description: 'Task notifications and commands in Slack', category: 'Integrations', status: 'live', icon: 'Globe' },
  { id: 57, name: 'Email Integration', description: 'Turn emails into tasks automatically', category: 'Integrations', status: 'live', icon: 'Globe' },
  { id: 58, name: 'Video Call Integration', description: 'Integrated Zoom, Meet, Teams calls', category: 'Integrations', status: 'live', icon: 'Globe' },
  { id: 59, name: 'Weather Integration', description: 'Weather-based task recommendations', category: 'Integrations', status: 'live', icon: 'Globe' },
  { id: 60, name: 'Platform Marketplace', description: 'Discover and install third-party extensions', category: 'Integrations', status: 'live', icon: 'Globe' },
  { id: 61, name: 'Webhooks', description: 'Event-driven integrations with custom webhooks', category: 'Integrations', status: 'live', icon: 'Globe' },
  { id: 62, name: 'API Access', description: 'RESTful API for custom integrations', category: 'Integrations', status: 'live', icon: 'Globe' },

  // Gamification
  { id: 63, name: 'Achievements', description: 'Unlock badges and rewards for accomplishments', category: 'Gamification', status: 'live', icon: 'Trophy' },
  { id: 64, name: 'Streaks', description: 'Track daily login and completion streaks', category: 'Gamification', status: 'live', icon: 'Zap' },
  { id: 65, name: 'Leaderboards', description: 'Compete with team members and friends', category: 'Gamification', status: 'live', icon: 'Trophy' },
  { id: 66, name: 'Daily Challenges', description: 'Complete daily missions for bonus points', category: 'Gamification', status: 'live', icon: 'Target' },
  { id: 67, name: 'Habit Tracker', description: 'Build and track productive habits', category: 'Gamification', status: 'live', icon: 'CheckCircle' },
  { id: 68, name: 'Level System', description: 'Progress through levels with XP and unlocks', category: 'Gamification', status: 'live', icon: 'Trophy' },

  // Customization
  { id: 69, name: 'Theme Settings', description: 'Light/dark themes with custom color schemes', category: 'Customization', status: 'live', icon: 'Settings' },
  { id: 70, name: 'Custom Workspaces', description: 'Personalized workspace layouts', category: 'Customization', status: 'live', icon: 'Settings' },
  { id: 71, name: 'Custom Branding', description: 'White-label with your logo and colors', category: 'Customization', status: 'live', icon: 'Settings' },
  { id: 72, name: 'Customization Panel', description: 'Comprehensive UI customization options', category: 'Customization', status: 'live', icon: 'Settings' },
  { id: 73, name: 'Project Templates', description: 'Pre-built project templates library', category: 'Customization', status: 'live', icon: 'Layers' },

  // Communication
  { id: 74, name: 'Meeting Manager', description: 'Schedule, conduct, and document meetings', category: 'Communication', status: 'live', icon: 'Users' },
  { id: 75, name: 'Standup Bot', description: 'Automated daily standup reports', category: 'Communication', status: 'live', icon: 'Users' },
  { id: 76, name: 'Notifications System', description: 'Multi-channel persistent notifications', category: 'Communication', status: 'live', icon: 'Zap' },
  { id: 77, name: 'File Sharing', description: 'Secure team file storage and sharing', category: 'Communication', status: 'live', icon: 'Globe' },

  // Enterprise Features
  { id: 78, name: 'SSO Integration', description: 'Single sign-on with SAML, OAuth, LDAP', category: 'Enterprise', status: 'live', icon: 'Shield' },
  { id: 79, name: 'Audit Logs', description: 'Comprehensive activity logging for compliance', category: 'Enterprise', status: 'live', icon: 'Shield' },
  { id: 80, name: 'Permissions Manager', description: 'Granular role-based access control', category: 'Enterprise', status: 'live', icon: 'Shield' },
  { id: 81, name: 'White-Label System', description: 'Fully branded platform for enterprise clients', category: 'Enterprise', status: 'live', icon: 'Shield' },
  { id: 82, name: 'Data Export', description: 'Export all data in multiple formats', category: 'Enterprise', status: 'live', icon: 'Shield' },
  { id: 83, name: 'Advanced Security', description: '2FA, encryption, and security monitoring', category: 'Enterprise', status: 'live', icon: 'Shield' },

  // Innovation Features
  { id: 84, name: 'Voice Commands', description: 'Hands-free task management with voice', category: 'Innovation', status: 'live', icon: 'Sparkles' },
  { id: 85, name: 'Command Palette', description: 'Quick actions with keyboard shortcuts', category: 'Innovation', status: 'live', icon: 'Zap' },
  { id: 86, name: 'Unified Command Center', description: 'All features accessible from one place', category: 'Innovation', status: 'live', icon: 'Rocket' },
  { id: 87, name: 'Quick Capture', description: 'Instantly capture tasks from anywhere', category: 'Innovation', status: 'live', icon: 'Zap' },
  { id: 88, name: 'Document Scanner', description: 'Scan and digitize physical documents', category: 'Innovation', status: 'live', icon: 'Sparkles' },
  { id: 89, name: 'Mind Map', description: 'Visual brainstorming and idea organization', category: 'Innovation', status: 'live', icon: 'Brain' },
  { id: 90, name: 'Knowledge Base Wiki', description: 'Team knowledge management system', category: 'Innovation', status: 'live', icon: 'Brain' },
  { id: 91, name: 'Learning Center', description: 'Built-in courses and productivity tips', category: 'Innovation', status: 'live', icon: 'Brain' },

  // Advanced Features
  { id: 92, name: 'Advanced Search', description: 'Full-text search with filters and saved searches', category: 'Advanced', status: 'live', icon: 'Search' },
  { id: 93, name: 'Workflow Automation', description: 'Build custom automations with triggers and actions', category: 'Advanced', status: 'live', icon: 'Zap' },
  { id: 94, name: 'Comparison Page', description: 'Compare tasks side-by-side for better decisions', category: 'Advanced', status: 'live', icon: 'Target' },
  { id: 95, name: 'Mobile Responsive', description: 'Fully responsive design for all devices', category: 'Advanced', status: 'live', icon: 'Globe' },
  { id: 96, name: 'Offline Mode', description: 'Work without internet, sync when online', category: 'Advanced', status: 'live', icon: 'Globe' },
  { id: 97, name: 'Progressive Web App', description: 'Install as a native app on any device', category: 'Advanced', status: 'live', icon: 'Rocket' },
  { id: 98, name: 'Real-time Sync', description: 'Instant synchronization across all devices', category: 'Advanced', status: 'live', icon: 'Zap' },
  { id: 99, name: 'Multi-language', description: 'Available in 20+ languages', category: 'Advanced', status: 'live', icon: 'Globe' },
  { id: 100, name: 'Accessibility', description: 'WCAG 2.1 AA compliant for all users', category: 'Advanced', status: 'live', icon: 'Heart' },
]

const categories = [
  'All Features',
  'AI & Automation',
  'Budget Intelligence',
  'Energy & Wellness',
  'Team Collaboration',
  'Task Management',
  'Productivity & Focus',
  'Analytics & Reporting',
  'Integrations',
  'Gamification',
  'Customization',
  'Communication',
  'Enterprise',
  'Innovation',
  'Advanced'
]

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Brain, Sparkles, Users, DollarSign, Zap, BarChart3,
    Calendar, Settings, Trophy, Shield, Rocket, Target,
    Heart, Globe, CheckCircle, Clock, TrendingUp, Layers, Search
  }
  return icons[iconName] || Sparkles
}

export default function FeaturesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Features')

  const filteredFeatures = useMemo(() => {
    return features.filter(feature => {
      const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           feature.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All Features' || feature.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Rocket className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-bold mb-4">100 Production Features</h1>
            <p className="text-xl text-blue-100 mb-8">
              The most comprehensive productivity platform ever built
            </p>
            <div className="flex justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">100</div>
                <div className="text-sm text-blue-100">Features</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">15</div>
                <div className="text-sm text-blue-100">Categories</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-blue-100">Complete</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredFeatures.length} of {features.length} features
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature, index) => {
            const Icon = getIcon(feature.icon)
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    feature.status === 'new' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : feature.status === 'beta'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {feature.status === 'new' ? '✨ New' : feature.status === 'beta' ? '🧪 Beta' : '✅ Live'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {feature.category}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredFeatures.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No features found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have transformed their workflow with SyncScript
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  )
}
