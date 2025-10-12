'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StreakDisplay from './StreakDisplay'
import AchievementGallery from './AchievementGallery'
import GoalProgressCard from './GoalProgressCard'
import CustomizationPanel from './CustomizationPanel'
import { getStreakData } from '@/utils/streakSystem'
import { getAchievementStats } from '@/utils/achievementSystem'
import { loadSavingsGoals } from '@/utils/savingsGoals'
import { getLoginRewardStatus } from '@/utils/customization'

export default function GamificationDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'streaks' | 'achievements' | 'goals' | 'rewards' | 'marketplace'>('overview')
  const [streakData, setStreakData] = useState(getStreakData())
  const [achievementStats, setAchievementStats] = useState(getAchievementStats())
  const [goals, setGoals] = useState(loadSavingsGoals())
  const [loginStatus, setLoginStatus] = useState(getLoginRewardStatus())

  useEffect(() => {
    // Refresh data
    setStreakData(getStreakData())
    setAchievementStats(getAchievementStats())
    setGoals(loadSavingsGoals())
    setLoginStatus(getLoginRewardStatus())
  }, [])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🌟' },
    { id: 'streaks', label: 'Streaks', icon: '🔥' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'rewards', label: 'Rewards', icon: '🎁' },
    { id: 'marketplace', label: 'Marketplace', icon: '🛒' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-4">🎮 Gamification Dashboard</h1>
          <p className="text-xl text-white/90">Track your progress, earn rewards, and level up!</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="text-5xl mb-2">🔥</div>
            <div className="text-4xl font-bold mb-1">{streakData.currentStreak}</div>
            <div className="text-sm text-white/80">Day Streak</div>
            <div className="text-xs text-white/60 mt-2">{streakData.multiplier}x Multiplier</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="text-5xl mb-2">🏆</div>
            <div className="text-4xl font-bold mb-1">{achievementStats.unlocked}/{achievementStats.total}</div>
            <div className="text-sm text-white/80">Achievements</div>
            <div className="text-xs text-white/60 mt-2">{achievementStats.percentage.toFixed(0)}% Complete</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="text-5xl mb-2">🎯</div>
            <div className="text-4xl font-bold mb-1">{goals.length}</div>
            <div className="text-sm text-white/80">Active Goals</div>
            <div className="text-xs text-white/60 mt-2">Keep pushing!</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="text-5xl mb-2">💎</div>
            <div className="text-4xl font-bold mb-1">{achievementStats.earnedRewards}</div>
            <div className="text-sm text-white/80">Emblems Earned</div>
            <div className="text-xs text-white/60 mt-2">{achievementStats.totalRewards - achievementStats.earnedRewards} available</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all border-b-4 ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Gamification Overview
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Current Streak</h3>
                    <StreakDisplay />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Daily Rewards</h3>
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                      <div className="text-3xl mb-2">🎁</div>
                      <div className="text-2xl font-bold mb-2">Day {loginStatus.consecutiveDays}</div>
                      <div className="text-sm text-white/80 mb-4">
                        {loginStatus.todaysClaimed ? 'Claimed today!' : `Next reward: ${loginStatus.nextReward.emblems} emblems`}
                      </div>
                      {!loginStatus.todaysClaimed && (
                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors">
                          Claim Reward
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Recent Achievements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-4 text-white">
                        <div className="text-3xl mb-2">🏆</div>
                        <div className="font-bold">Achievement {i}</div>
                        <div className="text-xs text-white/80 mt-1">Unlocked recently</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'streaks' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Streak Management
                </h2>
                <StreakDisplay />
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <AchievementGallery />
              </div>
            )}

            {activeTab === 'goals' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Your Goals
                </h2>
                {goals.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {goals.map((goal) => (
                      <GoalProgressCard key={goal.id} goal={goal} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-500">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-xl">No goals yet</p>
                    <button className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold">
                      Create Your First Goal
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'rewards' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Daily Login Rewards
                </h2>
                <CustomizationPanel />
              </div>
            )}

            {activeTab === 'marketplace' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Emblem Marketplace
                </h2>
                <CustomizationPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

