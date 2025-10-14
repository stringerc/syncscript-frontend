'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MorningBriefData } from '../../types/briefing'

interface MorningBriefProps {
  isOpen: boolean
  onClose: () => void
  data: MorningBriefData
  onViewTask?: (taskId: string) => void
  onViewEvent?: (eventId: string) => void
}

export default function MorningBrief({ 
  isOpen, 
  onClose, 
  data, 
  onViewTask, 
  onViewEvent 
}: MorningBriefProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const getEnergyEmblemAnimation = () => {
    return {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
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

          {/* Morning Brief Modal */}
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
                <div className="relative p-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        animate={getEnergyEmblemAnimation()}
                        className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg"
                      >
                        🚀
                      </motion.div>
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                          {getGreeting()}, Ready to Launch?
                        </h1>
                        <p className="text-white/80 text-lg">
                          {formatTime(currentTime)} • {new Date().toLocaleDateString('en-US', { 
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
                  
                  {/* Previous Day Summary */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        📊
                      </div>
                      <h2 className="text-xl font-semibold text-white">Yesterday's Summary</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{data.previousDay.tasksCompleted}</div>
                        <div className="text-sm text-white/70">Tasks Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">{data.previousDay.energyPointsEarned}</div>
                        <div className="text-sm text-white/70">Energy Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{data.previousDay.streaksMaintained.loginStreak}</div>
                        <div className="text-sm text-white/70">Day Streak</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{data.previousDay.achievementsUnlocked.length}</div>
                        <div className="text-sm text-white/70">Achievements</div>
                      </div>
                    </div>
                    {data.previousDay.notableAccomplishments.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-white/80 mb-2">Notable Accomplishments:</p>
                        <ul className="space-y-1">
                          {data.previousDay.notableAccomplishments.map((accomplishment, index) => (
                            <li key={index} className="text-sm text-white/70 flex items-center space-x-2">
                              <span className="text-green-400">✓</span>
                              <span>{accomplishment}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>

                  {/* Today's Agenda */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        📅
                      </div>
                      <h2 className="text-xl font-semibold text-white">Today's Agenda</h2>
                    </div>
                    
                    {/* High Priority Tasks */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-white mb-3">High Priority Tasks</h3>
                      <div className="space-y-3">
                        {data.todayAgenda.highPriorityTasks.map((task) => (
                          <motion.div
                            key={task.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/5 rounded-xl p-4 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                            onClick={() => onViewTask?.(task.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                                  🔥
                                </div>
                                <span className="text-white font-medium">{task.title}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                                  Priority {task.priority}
                                </span>
                                <span className="text-xs text-white/70">
                                  {task.estimatedDuration}min
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Calendar Events */}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Calendar Events</h3>
                      <div className="space-y-3">
                        {data.todayAgenda.calendarEvents.map((event) => (
                          <motion.div
                            key={event.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/5 rounded-xl p-4 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                            onClick={() => onViewEvent?.(event.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                                  📅
                                </div>
                                <div>
                                  <span className="text-white font-medium">{event.title}</span>
                                  {event.location && (
                                    <p className="text-xs text-white/70">{event.location}</p>
                                  )}
                                </div>
                              </div>
                              <div className="text-xs text-white/70">
                                {event.startTime} - {event.endTime}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Energy Game Plan */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        ⚡
                      </div>
                      <h2 className="text-xl font-semibold text-white">Energy Game Plan</h2>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">Current Energy</span>
                        <span className="text-white/70">{data.energyGamePlan.currentEnergy}/10</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(data.energyGamePlan.currentEnergy / 10) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-white/80 text-sm mb-3">{data.energyGamePlan.motivationalMessage}</p>
                      <div className="space-y-2">
                        {data.energyGamePlan.energyTips.map((tip, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-white/70">
                            <span className="text-yellow-400">💡</span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suggested Tasks for Energy */}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Suggested Energy Tasks</h3>
                      <div className="space-y-2">
                        {data.energyGamePlan.suggestedTasks.map((task) => (
                          <div key={task.taskId} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                            <span className="text-white text-sm">Task #{task.taskId}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                                +{task.energyGain} Energy
                              </span>
                              <span className="text-xs text-white/70 capitalize">
                                {task.difficulty}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Contextual Insights */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                        🤖
                      </div>
                      <h2 className="text-xl font-semibold text-white">AI Insights</h2>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-white/80 text-sm mb-3">{data.contextualInsights.aiSummary}</p>
                      <div className="space-y-2">
                        {data.contextualInsights.productivityTips.map((tip, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-white/70">
                            <span className="text-purple-400">🎯</span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Optional Content */}
                  {data.optionalContent && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                          🌟
                        </div>
                        <h2 className="text-xl font-semibold text-white">Extra Insights</h2>
                      </div>
                      
                      {data.optionalContent.weather && (
                        <div className="mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{data.optionalContent.weather.icon}</div>
                            <div>
                              <div className="text-white font-medium">
                                {data.optionalContent.weather.temperature}°F - {data.optionalContent.weather.condition}
                              </div>
                              <div className="text-sm text-white/70">{data.optionalContent.weather.recommendation}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {data.optionalContent.motivationalQuote && (
                        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-4">
                          <p className="text-white italic text-sm mb-2">"{data.optionalContent.motivationalQuote.quote}"</p>
                          <p className="text-white/70 text-xs">— {data.optionalContent.motivationalQuote.author}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
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
                          // TODO: Implement "Start My Day" action
                          onClose()
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all transform hover:scale-105"
                      >
                        Start My Day 🚀
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
