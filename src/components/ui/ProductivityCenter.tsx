'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { globalFocusMode } from '@/utils/powerUserFeatures'

export default function ProductivityCenter() {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60)
  const [isPomodoroActive, setIsPomodoroActive] = useState(false)
  const [pomodoroPhase, setPomodoroPhase] = useState<'work' | 'short-break' | 'long-break'>('work')
  const [timeTrackingActive, setTimeTrackingActive] = useState(false)
  const [trackedTime, setTrackedTime] = useState(0)
  const [focusModeActive, setFocusModeActive] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  
  const pomodoroIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const trackingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (pomodoroIntervalRef.current) clearInterval(pomodoroIntervalRef.current)
      if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current)
    }
  }, [])

  const startPomodoro = () => {
    if (!isPomodoroActive) {
      setIsPomodoroActive(true)
      pomodoroIntervalRef.current = setInterval(() => {
        setPomodoroTime(prev => {
          if (prev <= 1) {
            // Complete pomodoro
            if (pomodoroPhase === 'work') {
              setCompletedPomodoros(c => c + 1)
            }
            if (pomodoroIntervalRef.current) clearInterval(pomodoroIntervalRef.current)
            setIsPomodoroActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (pomodoroIntervalRef.current) clearInterval(pomodoroIntervalRef.current)
      setIsPomodoroActive(false)
    }
  }

  const resetPomodoro = () => {
    if (pomodoroIntervalRef.current) clearInterval(pomodoroIntervalRef.current)
    setIsPomodoroActive(false)
    setPomodoroTime(25 * 60)
  }

  const toggleFocusMode = () => {
    if (focusModeActive) {
      globalFocusMode.deactivate()
    } else {
      globalFocusMode.activate({
        hideNotifications: true,
        hideSidebar: true,
        hideCompletedTasks: true,
        zenMode: false
      })
    }
    setFocusModeActive(!focusModeActive)
  }
  
  const toggleTimeTracking = () => {
    if (!timeTrackingActive) {
      setTimeTrackingActive(true)
      trackingIntervalRef.current = setInterval(() => {
        setTrackedTime(prev => prev + 1)
      }, 1000)
    } else {
      if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current)
      setTimeTrackingActive(false)
      setTrackedTime(0)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const phaseLabels = {
    'work': '🍅 Focus Time',
    'short-break': '☕ Short Break',
    'long-break': '🌴 Long Break'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-4">⚡ Productivity Center</h1>
          <p className="text-xl text-white/90">Focus tools, time tracking, and productivity boosters</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Pomodoro Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 border-transparent hover:border-red-500 transition-all"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🍅</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Pomodoro Timer
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {phaseLabels[pomodoroPhase]}
              </div>
              
              <div className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {formatTime(pomodoroTime)}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={startPomodoro}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    isPomodoroActive
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg text-white'
                  }`}
                >
                  {isPomodoroActive ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={resetPomodoro}
                  className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl font-bold transition-colors"
                >
                  Reset
                </button>
              </div>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {completedPomodoros} completed today
              </div>
            </div>
          </motion.div>

          {/* Focus Mode */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 transition-all ${
              focusModeActive 
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                : 'border-transparent hover:border-purple-500'
            }`}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Focus Mode
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {focusModeActive ? 'Focus mode active' : 'Distraction-free work'}
              </div>
              
              <button
                onClick={toggleFocusMode}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  focusModeActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg text-white'
                }`}
              >
                {focusModeActive ? 'Exit Focus Mode' : 'Enter Focus Mode'}
              </button>
              
              {focusModeActive && (
                <div className="mt-4 text-sm text-purple-600 dark:text-purple-400 font-semibold">
                  ✓ Notifications hidden<br />
                  ✓ Distractions removed
                </div>
              )}
            </div>
          </motion.div>

          {/* Time Tracking */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 transition-all ${
              timeTrackingActive
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-transparent hover:border-green-500'
            }`}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">⏱️</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Time Tracking
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Track time on tasks
              </div>
              
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {formatTime(trackedTime)}
              </div>
              
              <button
                onClick={toggleTimeTracking}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  timeTrackingActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg text-white'
                }`}
              >
                {timeTrackingActive ? 'Stop Tracking' : 'Start Tracking'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Productivity Tools Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Productivity Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Quick Capture', icon: '📝', desc: 'Rapid task entry', color: 'from-blue-500 to-cyan-500' },
              { title: 'Voice Input', icon: '🎤', desc: 'Voice-to-text', color: 'from-purple-500 to-pink-500' },
              { title: 'Task Templates', icon: '📋', desc: '5 ready templates', color: 'from-green-500 to-teal-500' },
              { title: 'Keyboard Shortcuts', icon: '⌨️', desc: '18 hotkeys', color: 'from-orange-500 to-red-500' },
              { title: 'Batch Operations', icon: '🔄', desc: 'Multi-select actions', color: 'from-indigo-500 to-purple-500' },
              { title: 'Priority Matrix', icon: '📊', desc: 'Urgent/Important', color: 'from-pink-500 to-rose-500' },
              { title: 'Full-Text Search', icon: '🔍', desc: 'Search everything', color: 'from-yellow-500 to-orange-500' },
              { title: 'Smart Scheduling', icon: '🧠', desc: 'AI suggests times', color: 'from-teal-500 to-cyan-500' }
            ].map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${tool.color} rounded-xl p-6 text-white hover:shadow-2xl transition-all hover:scale-105`}>
                  <div className="text-4xl mb-3">{tool.icon}</div>
                  <h4 className="font-bold text-lg mb-1">{tool.title}</h4>
                  <p className="text-sm text-white/80">{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

