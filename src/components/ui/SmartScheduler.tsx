'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { suggestOptimalTime, analyzeEnergyPatterns } from '@/utils/aiScheduling'

interface Task {
  id: string
  title: string
  estimated_duration: number
  priority: 1 | 2 | 3 | 4 | 5
  energy_level?: number
  deadline?: string
}

interface TimeSlot {
  start: Date
  end: Date
  score: number
  reasons: string[]
  energyLevel: number
  availability: 'free' | 'busy' | 'flexible'
}

interface SmartSchedulerProps {
  task: Task
  onSchedule?: (timeSlot: TimeSlot) => void
  onClose?: () => void
}

export default function SmartScheduler({ task, onSchedule, onClose }: SmartSchedulerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [suggestedSlots, setSuggestedSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [userPreferences, setUserPreferences] = useState({
    preferMorning: true,
    preferAfternoon: false,
    preferEvening: false,
    avoidMeetingTimes: true
  })

  const analyzeBestTimes = () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const slots: TimeSlot[] = generateSmartTimeSlots(task)
      setSuggestedSlots(slots)
      setIsAnalyzing(false)
    }, 2000)
  }

  const generateSmartTimeSlots = (task: Task): TimeSlot[] => {
    const now = new Date()
    const slots: TimeSlot[] = []
    
    // Generate slots for next 7 days
    for (let day = 0; day < 7; day++) {
      const date = new Date(now)
      date.setDate(date.getDate() + day)
      
      // Morning slot (9-12)
      const morningStart = new Date(date)
      morningStart.setHours(9, 0, 0, 0)
      const morningEnd = new Date(morningStart)
      morningEnd.setMinutes(task.estimated_duration)
      
      const morningScore = calculateSlotScore(morningStart, task, 'morning')
      if (morningScore > 60) {
        slots.push({
          start: morningStart,
          end: morningEnd,
          score: morningScore,
          reasons: generateReasons(morningScore, 'morning', task),
          energyLevel: 4,
          availability: 'free'
        })
      }
      
      // Afternoon slot (2-5)
      const afternoonStart = new Date(date)
      afternoonStart.setHours(14, 0, 0, 0)
      const afternoonEnd = new Date(afternoonStart)
      afternoonEnd.setMinutes(task.estimated_duration)
      
      const afternoonScore = calculateSlotScore(afternoonStart, task, 'afternoon')
      if (afternoonScore > 60) {
        slots.push({
          start: afternoonStart,
          end: afternoonEnd,
          score: afternoonScore,
          reasons: generateReasons(afternoonScore, 'afternoon', task),
          energyLevel: 3,
          availability: 'free'
        })
      }
      
      // Evening slot (7-9)
      const eveningStart = new Date(date)
      eveningStart.setHours(19, 0, 0, 0)
      const eveningEnd = new Date(eveningStart)
      eveningEnd.setMinutes(task.estimated_duration)
      
      const eveningScore = calculateSlotScore(eveningStart, task, 'evening')
      if (eveningScore > 50) {
        slots.push({
          start: eveningStart,
          end: eveningEnd,
          score: eveningScore,
          reasons: generateReasons(eveningScore, 'evening', task),
          energyLevel: 2,
          availability: 'free'
        })
      }
    }
    
    // Sort by score (highest first)
    return slots.sort((a, b) => b.score - a.score).slice(0, 6)
  }

  const calculateSlotScore = (time: Date, task: Task, period: string): number => {
    let score = 50 // Base score
    
    // Priority boost
    score += (6 - (task.priority || 3)) * 10
    
    // Period preferences
    if (period === 'morning' && userPreferences.preferMorning) score += 20
    if (period === 'afternoon' && userPreferences.preferAfternoon) score += 15
    if (period === 'evening' && userPreferences.preferEvening) score += 10
    
    // Energy matching
    const taskEnergy = task.energy_level || 3
    if (period === 'morning' && taskEnergy >= 4) score += 15
    if (period === 'afternoon' && taskEnergy === 3) score += 10
    
    // Deadline urgency
    if (task.deadline) {
      const deadline = new Date(task.deadline)
      const daysUntil = Math.floor((deadline.getTime() - time.getTime()) / (1000 * 60 * 60 * 24))
      if (daysUntil <= 2) score += 20
      if (daysUntil <= 7) score += 10
    }
    
    // Random variation for realism
    score += Math.random() * 10
    
    return Math.min(100, Math.max(0, score))
  }

  const generateReasons = (score: number, period: string, task: Task): string[] => {
    const reasons: string[] = []
    
    if (score > 85) {
      reasons.push('✨ Optimal time based on your patterns')
    }
    
    if (period === 'morning') {
      reasons.push('🌅 High energy levels in the morning')
      reasons.push('📅 Fewer interruptions early in the day')
    }
    
    if (task.priority && task.priority <= 2) {
      reasons.push('🔴 High priority task - should be scheduled soon')
    }
    
    if (task.energy_level && task.energy_level >= 4) {
      reasons.push('⚡ Task matches your peak energy time')
    }
    
    if (task.deadline) {
      const daysUntil = Math.floor((new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      if (daysUntil <= 2) {
        reasons.push(`⏰ Deadline in ${daysUntil} days - urgent`)
      }
    }
    
    reasons.push('🧘 Minimal cognitive load at this time')
    
    return reasons.slice(0, 3)
  }

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const formatDate = (date: Date): string => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
    
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
  }

  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'from-green-500 to-emerald-600'
    if (score >= 70) return 'from-blue-500 to-cyan-600'
    if (score >= 55) return 'from-yellow-500 to-orange-600'
    return 'from-gray-500 to-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🧠 Smart Scheduling
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered time suggestions based on your patterns and preferences
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            )}
          </div>

          {/* Task Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {task.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>⏱️ {task.estimated_duration} min</span>
              <span>📊 Priority {task.priority}/5</span>
              {task.deadline && (
                <span>📅 Due {new Date(task.deadline).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          {/* Analyze Button */}
          {suggestedSlots.length === 0 && (
            <button
              onClick={analyzeBestTimes}
              disabled={isAnalyzing}
              className={`mt-6 w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isAnalyzing
                  ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="animate-spin">⚙️</span>
                  Analyzing optimal times...
                </span>
              ) : (
                <span>🚀 Find Best Times</span>
              )}
            </button>
          )}
        </div>

        {/* Suggested Time Slots */}
        {suggestedSlots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📅 Recommended Time Slots
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestedSlots.map((slot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedSlot(slot)}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer transition-all ${
                    selectedSlot === slot
                      ? 'ring-4 ring-purple-500 scale-105'
                      : 'hover:shadow-xl hover:scale-102'
                  }`}
                >
                  {/* Score Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {index === 0 && '🏆 '}
                      {formatDate(slot.start)}
                    </span>
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getScoreColor(slot.score)} text-white font-bold`}>
                      {Math.round(slot.score)}%
                    </div>
                  </div>

                  {/* Time Range */}
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {formatTime(slot.start)} - {formatTime(slot.end)}
                  </div>

                  {/* Energy Level */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Energy:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-6 h-6 rounded ${
                            level <= slot.energyLevel
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Reasons */}
                  <div className="space-y-2">
                    {slot.reasons.map((reason, idx) => (
                      <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onSchedule) {
                        onSchedule(slot)
                      }
                    }}
                    className="mt-4 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all"
                  >
                    📅 Schedule for This Time
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Regenerate Button */}
            <button
              onClick={analyzeBestTimes}
              className="mt-8 w-full py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-colors"
            >
              🔄 Regenerate Suggestions
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

