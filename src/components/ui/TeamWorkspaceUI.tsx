'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  getAllWorkspaces,
  createWorkspace,
  TeamWorkspace,
  TeamMember
} from '@/utils/teamWorkspaces'
import {
  generateLeaderboard,
  getActivityFeed,
  LeaderboardEntry,
  ActivityItem
} from '@/utils/socialFeatures'

export default function TeamWorkspaceUI() {
  const [workspaces, setWorkspaces] = useState<TeamWorkspace[]>([])
  const [selectedWorkspace, setSelectedWorkspace] = useState<TeamWorkspace | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'chat' | 'analytics' | 'leaderboard' | 'activity'>('overview')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([])

  useEffect(() => {
    // Load workspaces
    const ws = getAllWorkspaces('current-user')
    setWorkspaces(ws)
    if (ws.length > 0) {
      setSelectedWorkspace(ws[0])
      setLeaderboard(generateLeaderboard(ws[0].id))
      setActivityFeed(getActivityFeed(ws[0].id))
    }
  }, [])

  const handleCreateWorkspace = () => {
    const newWorkspace = createWorkspace('My Team', 'current-user', '#8B5CF6')
    setWorkspaces([...workspaces, newWorkspace])
    setSelectedWorkspace(newWorkspace)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'chat', label: 'Team Chat', icon: '💬' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    { id: 'activity', label: 'Activity Feed', icon: '🔄' }
  ]

  if (!selectedWorkspace) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🤝</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            No Team Workspaces Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Create your first team workspace to collaborate
          </p>
          <button
            onClick={handleCreateWorkspace}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
          >
            Create Workspace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2">{selectedWorkspace.name}</h1>
              <p className="text-xl text-white/90">{selectedWorkspace.members.length} members</p>
            </div>
            <div className="text-6xl">{selectedWorkspace.icon}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all border-b-4 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="text-3xl font-bold mb-1">{selectedWorkspace.members.length}</div>
                <div className="text-sm text-blue-100">Team Members</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="text-3xl font-bold mb-1">0</div>
                <div className="text-sm text-green-100">Active Tasks</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="text-3xl font-bold mb-1">0</div>
                <div className="text-sm text-purple-100">Projects</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                <div className="text-3xl font-bold mb-1">0</div>
                <div className="text-sm text-orange-100">Goals</div>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Team Members</h3>
              <div className="space-y-4">
                {selectedWorkspace.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{member.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{member.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 capitalize">
                        {member.role}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {member.tasksCompleted || 0} tasks
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Team Chat</h3>
            <div className="text-center py-16 text-gray-500">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-xl">Team chat coming soon!</p>
              <p className="text-sm mt-2">Real-time messaging for your team</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Team Analytics</h3>
            <div className="text-center py-16 text-gray-500">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-xl">Team analytics dashboard</p>
              <p className="text-sm mt-2">Track team productivity and performance</p>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Team Leaderboard</h3>
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: entry.rank * 0.1 }}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-4xl font-bold text-gray-400 dark:text-gray-500 w-12 text-center">
                      {entry.rank}
                    </div>
                    <div className="text-5xl">{entry.badge}</div>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {entry.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-xl text-gray-900 dark:text-white">{entry.userName}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {entry.tasksCompleted || 0} tasks • {entry.emblemsEarned || 0} emblems
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {entry.score}
                    </div>
                    <div className={`text-sm font-semibold ${
                      entry.change > 0 ? 'text-green-600' : entry.change < 0 ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {entry.change > 0 && '↑'}
                      {entry.change < 0 && '↓'}
                      {entry.change !== 0 && Math.abs(entry.change)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Activity Feed</h3>
            {activityFeed.length > 0 ? (
              <div className="space-y-4">
                {activityFeed.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <div className="text-3xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {activity.userName} {activity.action}
                      </div>
                      {activity.details && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {activity.details}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <div className="text-6xl mb-4">🔄</div>
                <p className="text-xl">No recent activity</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

