'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getAchievements,
  getAchievementStats,
  getAchievementsByCategory,
  AchievementCategory,
  Achievement
} from '@/utils/achievementSystem'

const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  tasks: 'Tasks & Productivity',
  energy: 'Energy Management',
  budget: 'Budget & Finance',
  streaks: 'Streaks & Consistency',
  goals: 'Goals & Milestones',
  social: 'Social & Collaboration',
  mastery: 'Platform Mastery',
  events: 'Special Events'
}

const RARITY_COLORS = {
  common: {
    bg: 'from-gray-400 to-gray-600',
    border: 'border-gray-400',
    glow: 'shadow-gray-400/50'
  },
  rare: {
    bg: 'from-blue-400 to-blue-600',
    border: 'border-blue-400',
    glow: 'shadow-blue-400/50'
  },
  epic: {
    bg: 'from-purple-400 to-purple-600',
    border: 'border-purple-400',
    glow: 'shadow-purple-400/50'
  },
  legendary: {
    bg: 'from-yellow-400 to-orange-600',
    border: 'border-yellow-400',
    glow: 'shadow-yellow-400/50'
  }
}

export default function AchievementGallery() {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all')
  const [showLocked, setShowLocked] = useState(true)
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  
  const stats = getAchievementStats()
  const allAchievements = getAchievements()
  
  const filteredAchievements = selectedCategory === 'all'
    ? allAchievements
    : getAchievementsByCategory(selectedCategory)
  
  const displayedAchievements = showLocked
    ? filteredAchievements.filter(a => !a.secret || a.unlocked)
    : filteredAchievements.filter(a => a.unlocked)
  
  const categories: Array<AchievementCategory | 'all'> = [
    'all', 'tasks', 'energy', 'budget', 'streaks', 'goals', 'mastery', 'events'
  ]

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-4xl font-bold mb-4">Achievement Gallery 🏆</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">{stats.unlocked}/{stats.total}</div>
            <div className="text-sm text-white/80">Achievements</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">{stats.percentage.toFixed(0)}%</div>
            <div className="text-sm text-white/80">Complete</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">{stats.earnedRewards}</div>
            <div className="text-sm text-white/80">Emblems Earned</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">{stats.totalRewards - stats.earnedRewards}</div>
            <div className="text-sm text-white/80">Available</div>
          </div>
        </div>

        {/* Rarity Breakdown */}
        <div className="mt-6 flex flex-wrap gap-3">
          {Object.entries(stats.byRarity).map(([rarity, data]) => (
            <div key={rarity} className="bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <span className="capitalize font-semibold">{rarity}:</span>{' '}
              <span>{data.unlocked}/{data.total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showLocked}
            onChange={(e) => setShowLocked(e.target.checked)}
            className="w-5 h-5 rounded"
          />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Show Locked
          </span>
        </label>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedAchievement(achievement)}
            className="cursor-pointer"
          >
            <div
              className={`relative rounded-xl p-6 ${
                achievement.unlocked
                  ? `bg-gradient-to-br ${RARITY_COLORS[achievement.rarity].bg} text-white ${RARITY_COLORS[achievement.rarity].glow} shadow-xl`
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600'
              } transition-transform hover:scale-105`}
            >
              {/* Rarity Badge */}
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold uppercase ${
                  achievement.unlocked
                    ? 'bg-white/20 backdrop-blur-sm'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                {achievement.rarity}
              </div>

              {/* Icon */}
              <div className={`text-5xl mb-3 ${!achievement.unlocked && 'opacity-30 grayscale'}`}>
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>

              {/* Title */}
              <h3 className={`font-bold text-lg mb-2 ${!achievement.unlocked && 'text-gray-400'}`}>
                {achievement.unlocked || !achievement.secret ? achievement.title : '???'}
              </h3>

              {/* Description */}
              <p className={`text-sm mb-3 ${
                achievement.unlocked 
                  ? 'text-white/90' 
                  : 'text-gray-600 dark:text-gray-500'
              }`}>
                {achievement.unlocked || !achievement.secret 
                  ? achievement.description 
                  : 'Secret achievement - unlock to reveal!'}
              </p>

              {/* Progress Bar (if applicable) */}
              {achievement.target && (
                <div className="mb-3">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${((achievement.progress || 0) / achievement.target) * 100}%` 
                      }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                  <div className={`text-xs mt-1 ${
                    achievement.unlocked ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {achievement.progress || 0} / {achievement.target}
                  </div>
                </div>
              )}

              {/* Reward */}
              <div className={`flex items-center justify-between text-sm font-semibold ${
                achievement.unlocked ? 'text-white' : 'text-gray-400'
              }`}>
                <span>💎 {achievement.reward} emblems</span>
                {achievement.unlocked && (
                  <span className="text-xs text-white/70">
                    ✓ Unlocked
                  </span>
                )}
              </div>

              {/* Unlocked date */}
              {achievement.unlocked && achievement.unlockedAt && (
                <div className="text-xs text-white/60 mt-2">
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {displayedAchievements.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-6xl mb-4">🏆</div>
          <p className="text-xl">No achievements to display</p>
          <p className="text-sm mt-2">Try changing your filters</p>
        </div>
      )}

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-md w-full rounded-2xl p-8 ${
                selectedAchievement.unlocked
                  ? `bg-gradient-to-br ${RARITY_COLORS[selectedAchievement.rarity].bg}`
                  : 'bg-gray-800'
              } text-white shadow-2xl`}
            >
              <div className="text-center">
                <div className="text-7xl mb-4">
                  {selectedAchievement.unlocked ? selectedAchievement.icon : '🔒'}
                </div>
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold uppercase mb-4 ${
                  selectedAchievement.unlocked
                    ? 'bg-white/20'
                    : 'bg-white/10'
                }`}>
                  {selectedAchievement.rarity}
                </div>
                <h2 className="text-3xl font-bold mb-3">
                  {selectedAchievement.unlocked || !selectedAchievement.secret 
                    ? selectedAchievement.title 
                    : 'Secret Achievement'}
                </h2>
                <p className="text-white/90 mb-6">
                  {selectedAchievement.unlocked || !selectedAchievement.secret
                    ? selectedAchievement.description
                    : 'This is a secret achievement. Unlock it to reveal details!'}
                </p>
                
                {selectedAchievement.target && (
                  <div className="mb-6">
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${((selectedAchievement.progress || 0) / selectedAchievement.target) * 100}%` 
                        }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                    <div className="text-sm mt-2">
                      {selectedAchievement.progress || 0} / {selectedAchievement.target}
                    </div>
                  </div>
                )}

                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <div className="text-4xl font-bold mb-1">
                    💎 {selectedAchievement.reward}
                  </div>
                  <div className="text-sm text-white/80">Emblem Reward</div>
                </div>

                {selectedAchievement.unlocked && selectedAchievement.unlockedAt && (
                  <div className="text-sm text-white/60">
                    Unlocked: {new Date(selectedAchievement.unlockedAt).toLocaleString()}
                  </div>
                )}

                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="mt-6 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
