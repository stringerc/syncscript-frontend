'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  getStreakData, 
  updateStreak, 
  getStreakMessage, 
  getNextMilestoneProgress,
  getMilestoneAchievements,
  StreakReward
} from '@/utils/streakSystem'
import Celebration from './Celebration'

export default function StreakDisplay() {
  const [streakData, setStreakData] = useState(getStreakData())
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationData, setCelebrationData] = useState<{
    title: string
    message: string
  }>({ title: '', message: '' })
  const [showMilestones, setShowMilestones] = useState(false)
  
  const milestoneProgress = getNextMilestoneProgress()
  const achievements = getMilestoneAchievements()

  useEffect(() => {
    // Update streak on mount
    const { data, reward, streakBroken } = updateStreak()
    setStreakData(data)
    
    if (reward) {
      setCelebrationData({
        title: reward.title,
        message: `${reward.message} +${reward.emblems} emblems! ${reward.multiplier}x multiplier!`
      })
      setShowCelebration(true)
    } else if (streakBroken && data.currentStreak > 1) {
      setCelebrationData({
        title: 'Streak Broken 💔',
        message: 'But you\'re back! Let\'s rebuild even stronger! 💪'
      })
      setShowCelebration(true)
    }
  }, [])

  return (
    <>
      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-4xl"
            >
              🔥
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">
                {streakData.currentStreak} Day Streak
              </h3>
              <p className="text-white/80 text-sm">
                {getStreakMessage(streakData.currentStreak)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {streakData.multiplier.toFixed(1)}x
            </div>
            <div className="text-xs text-white/70">
              Multiplier
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-xs text-white/70 mb-1">Longest</div>
            <div className="text-xl font-bold">{streakData.longestStreak}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-xs text-white/70 mb-1">Total Days</div>
            <div className="text-xl font-bold">{streakData.totalDays}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-xs text-white/70 mb-1">Bonus Emblems</div>
            <div className="text-xl font-bold">{streakData.bonusEmblemsEarned}</div>
          </div>
        </div>

        {/* Next Milestone Progress */}
        {milestoneProgress.reward && (
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{milestoneProgress.reward.icon}</span>
                <div>
                  <div className="font-semibold">{milestoneProgress.reward.title}</div>
                  <div className="text-xs text-white/70">
                    {milestoneProgress.remaining} days to go
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">+{milestoneProgress.reward.emblems}</div>
                <div className="text-xs text-white/70">emblems</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${milestoneProgress.percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <div className="text-xs text-white/70 mt-1 text-right">
              {milestoneProgress.percentage.toFixed(0)}% complete
            </div>
          </div>
        )}

        {/* View All Milestones Button */}
        <button
          onClick={() => setShowMilestones(!showMilestones)}
          className="w-full mt-4 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm font-medium"
        >
          {showMilestones ? 'Hide Milestones' : 'View All Milestones'}
        </button>

        {/* Milestones Grid */}
        {showMilestones && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 grid grid-cols-2 gap-3"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-lg ${
                  achievement.achieved
                    ? 'bg-green-500/30 border-2 border-green-400'
                    : 'bg-white/5 border-2 border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{achievement.icon}</span>
                  <span className={`text-sm font-semibold ${
                    achievement.achieved ? 'text-white' : 'text-white/50'
                  }`}>
                    Day {achievement.day}
                  </span>
                </div>
                <div className={`text-xs ${
                  achievement.achieved ? 'text-white/90' : 'text-white/40'
                }`}>
                  {achievement.emblems} emblems
                </div>
                <div className={`text-xs font-medium ${
                  achievement.achieved ? 'text-green-300' : 'text-white/30'
                }`}>
                  {achievement.multiplier}x multiplier
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Celebration */}
      <Celebration
        show={showCelebration}
        title={celebrationData.title}
        message={celebrationData.message}
        type="streak"
        onComplete={() => setShowCelebration(false)}
      />
    </>
  )
}

