'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EveningBriefData } from '../../types/briefing'

interface EveningBriefProps {
  isOpen: boolean
  onClose: () => void
  data: EveningBriefData
  onCarryOverTasks?: (taskIds: string[]) => void
  onRescheduleTasks?: (taskIds: string[]) => void
  onAddReflection?: (reflection: string) => void
}

export default function EveningBrief({ 
  isOpen, 
  onClose, 
  data, 
  onCarryOverTasks,
  onRescheduleTasks,
  onAddReflection
}: EveningBriefProps) {
  const [reflection, setReflection] = useState('')
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (data.energyAchievement.celebrationLevel === 'extreme') {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [data.energyAchievement.celebrationLevel])

  const getEmblemAnimation = () => {
    const level = data.energyAchievement.emblemAnimation
    switch (level) {
      case 'vibrant':
        return {
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      case 'pulsing':
        return {
          scale: [1, 1.15, 1],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      case 'glowing':
        return {
          scale: [1, 1.1, 1],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      default:
        return {}
    }
  }

  const getEnergyColor = () => {
    const percentage = data.energyAchievement.energyPercentage
    if (percentage >= 90) return 'from-green-400 to-emerald-500'
    if (percentage >= 70) return 'from-yellow-400 to-orange-500'
    if (percentage >= 50) return 'from-orange-400 to-red-500'
    return 'from-red-400 to-red-600'
  }

  const handleCarryOver = () => {
    const taskIds = data.pendingItems.incompleteTasks
      .filter(task => task.suggestedAction === 'carry-over')
      .map(task => task.id)
    onCarryOverTasks?.(taskIds)
  }

  const handleReflectionSubmit = () => {
    if (reflection.trim()) {
      onAddReflection?.(reflection)
      setReflection('')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            aria-hidden="true"
          />

          {/* Celebration Confetti */}
          {showCelebration && (
            <div className="fixed inset-0 z-40 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: -10,
                    rotate: 0,
                    scale: 1
                  }}
                  animate={{ 
                    y: window.innerHeight + 10,
                    rotate: 360,
                    scale: 0
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 2,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                />
              ))}
            </div>
          )}

          {/* Evening Brief Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              mass: 0.8
            }}
            className="fixed inset-4 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-4xl max-h-full overflow-hidden">
              {/* Main Brief Container */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                
                {/* Header */}
                <div className="relative p-8 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        animate={getEmblemAnimation()}
                        className={`w-16 h-16 bg-gradient-to-br ${getEnergyColor()} rounded-full flex items-center justify-center text-2xl shadow-lg`}
                      >
                        ⚡
                      </motion.div>
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                          Day Complete! 🌅
                        </h1>
                        <p className="text-white/80 text-lg">
                          {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8 max-h-96 overflow-y-auto custom-scrollbar">
                  
                  {/* Energy Achievement */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        ⚡
                      </div>
                      <h2 className="text-xl font-semibold text-white">Energy Achievement</h2>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-white mb-2">
                        {data.energyAchievement.finalEnergy}/10
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-4 mb-4">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${data.energyAchievement.energyPercentage}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className={`bg-gradient-to-r ${getEnergyColor()} h-4 rounded-full`}
                        />
                      </div>
                      <p className="text-white/80 text-sm mb-2">{data.energyAchievement.motivationalMessage}</p>
                      <p className="text-white/70 text-xs">{data.energyAchievement.nextDayGoal}</p>
                    </div>
                  </motion.div>

                  {/* Completed Tasks Summary */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        ✅
                      </div>
                      <h2 className="text-xl font-semibold text-white">Tasks Completed</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{data.completedTasks.total}</div>
                        <div className="text-sm text-white/70">Total Tasks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{data.completedTasks.totalEnergyGained}</div>
                        <div className="text-sm text-white/70">Energy Gained</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{data.completedTasks.byCategory.work || 0}</div>
                        <div className="text-sm text-white/70">Work Tasks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-400">{data.completedTasks.byCategory.personal || 0}</div>
                        <div className="text-sm text-white/70">Personal Tasks</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-white mb-3">Today's Accomplishments</h3>
                      {data.completedTasks.tasks.slice(0, 5).map((task) => (
                        <div key={task.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-green-400">✓</span>
                            <span className="text-white text-sm">{task.title}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                              +{task.energyGained} Energy
                            </span>
                            <span className="text-xs text-white/70">
                              {new Date(task.completedAt).toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                      {data.completedTasks.tasks.length > 5 && (
                        <p className="text-sm text-white/70 text-center">
                          +{data.completedTasks.tasks.length - 5} more tasks completed
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* Productivity Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        📊
                      </div>
                      <h2 className="text-xl font-semibold text-white">Productivity Stats</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{data.productivityStats.hoursWorked}h</div>
                        <div className="text-sm text-white/70">Hours Worked</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{data.productivityStats.focusSessions}</div>
                        <div className="text-sm text-white/70">Focus Sessions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{data.productivityStats.efficiencyScore}%</div>
                        <div className="text-sm text-white/70">Efficiency</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">Productivity Trend</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          data.productivityStats.productivityTrend === 'up' ? 'bg-green-500/20 text-green-400' :
                          data.productivityStats.productivityTrend === 'down' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {data.productivityStats.productivityTrend === 'up' ? '↗️ Up' :
                           data.productivityStats.productivityTrend === 'down' ? '↘️ Down' :
                           '→ Stable'}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Pending Items */}
                  {data.pendingItems.incompleteTasks.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                          ⏰
                        </div>
                        <h2 className="text-xl font-semibold text-white">Pending Items</h2>
                      </div>
                      
                      <p className="text-white/80 text-sm mb-4">{data.pendingItems.carryOverPrompt}</p>
                      
                      <div className="space-y-3 mb-4">
                        {data.pendingItems.incompleteTasks.map((task) => (
                          <div key={task.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-orange-400">⏳</span>
                              <span className="text-white text-sm">{task.title}</span>
                            </div>
                            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                              Priority {task.priority}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={handleCarryOver}
                          className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm"
                        >
                          Carry Over to Tomorrow
                        </button>
                        <button
                          onClick={() => onRescheduleTasks?.(data.pendingItems.incompleteTasks.map(t => t.id))}
                          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors text-sm"
                        >
                          Reschedule
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Achievements */}
                  {data.reflection.achievementsUnlocked.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                          🏆
                        </div>
                        <h2 className="text-xl font-semibold text-white">Achievements Unlocked</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.reflection.achievementsUnlocked.map((achievement) => (
                          <div key={achievement.id} className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">{achievement.icon}</div>
                              <div>
                                <div className="text-white font-medium">{achievement.title}</div>
                                <div className="text-white/70 text-sm">{achievement.description}</div>
                                <div className="text-xs text-yellow-400 capitalize mt-1">
                                  {achievement.rarity} Achievement
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Reflection */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                        💭
                      </div>
                      <h2 className="text-xl font-semibold text-white">Daily Reflection</h2>
                    </div>
                    
                    <p className="text-white/80 text-sm mb-4">{data.reflection.prompt}</p>
                    
                    <div className="space-y-3">
                      <textarea
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                        placeholder="How was your day? Any thoughts or notes you'd like to record?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/50 resize-none h-24 focus:outline-none focus:border-white/30"
                      />
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-white/70">
                          {data.reflection.encouragementMessage}
                        </div>
                        <button
                          onClick={handleReflectionSubmit}
                          disabled={!reflection.trim()}
                          className="px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-pink-400 rounded-lg transition-colors text-sm"
                        >
                          Save Reflection
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-white/5 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/70">
                      Generated at {new Date(data.generatedAt).toLocaleTimeString()}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => {
                          // TODO: Implement "Done for the Day" action
                          onClose()
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all transform hover:scale-105"
                      >
                        Done for the Day 🌙
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
