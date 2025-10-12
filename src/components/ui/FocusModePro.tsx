/**
 * Feature #63: Focus Mode Pro
 * Deep work session manager with distraction-free UI
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, Play, Pause, SkipForward, Settings, Volume2, 
  VolumeX, Eye, EyeOff, Target, TrendingUp, Award,
  Clock, Coffee, Brain, Moon
} from 'lucide-react'

interface FocusSession {
  id: string
  taskName: string
  duration: number // minutes
  type: 'deep-work' | 'pomodoro' | 'flow' | 'sprint'
  startTime: Date
  endTime?: Date
  completed: boolean
  breaks: number
  distractions: number
}

interface FocusModeProProps {
  onSessionComplete?: (session: FocusSession) => void
  enabledFeatures?: {
    websiteBlocker?: boolean
    distractionFreeMode?: boolean
    focusMusic?: boolean
    analytics?: boolean
  }
}

const sessionTypes = [
  { 
    type: 'deep-work' as const, 
    label: 'Deep Work', 
    icon: Brain,
    duration: 90,
    description: '90 min intense focus',
    color: 'bg-purple-600'
  },
  { 
    type: 'pomodoro' as const, 
    label: 'Pomodoro', 
    icon: Clock,
    duration: 25,
    description: '25 min + 5 min break',
    color: 'bg-red-600'
  },
  { 
    type: 'flow' as const, 
    label: 'Flow State', 
    icon: Zap,
    duration: 120,
    description: '2 hours uninterrupted',
    color: 'bg-blue-600'
  },
  { 
    type: 'sprint' as const, 
    label: 'Quick Sprint', 
    icon: Target,
    duration: 15,
    description: '15 min focused burst',
    color: 'bg-green-600'
  }
]

const focusMusicGenres = [
  { id: 'lo-fi', name: 'Lo-Fi Beats', icon: '🎵' },
  { id: 'classical', name: 'Classical', icon: '🎻' },
  { id: 'ambient', name: 'Ambient', icon: '🌊' },
  { id: 'nature', name: 'Nature Sounds', icon: '🌲' },
  { id: 'white-noise', name: 'White Noise', icon: '📻' },
  { id: 'binaural', name: 'Binaural Beats', icon: '🧠' }
]

const blockedWebsites = [
  'twitter.com', 'facebook.com', 'instagram.com', 'youtube.com',
  'reddit.com', 'tiktok.com', 'netflix.com', 'twitch.tv'
]

const FocusModePro: React.FC<FocusModeProProps> = ({
  onSessionComplete,
  enabledFeatures = {
    websiteBlocker: true,
    distractionFreeMode: true,
    focusMusic: true,
    analytics: true
  }
}) => {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [selectedType, setSelectedType] = useState(sessionTypes[0])
  const [taskName, setTaskName] = useState('')
  const [distractionFreeMode, setDistractionFreeMode] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [selectedMusic, setSelectedMusic] = useState(focusMusicGenres[0])
  const [showSettings, setShowSettings] = useState(false)
  const [sessions, setSessions] = useState<FocusSession[]>([])
  const [distractionCount, setDistractionCount] = useState(0)
  const [breakCount, setBreakCount] = useState(0)
  
  const sessionRef = useRef<FocusSession | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && !isPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSessionComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isActive, isPaused, timeRemaining])

  const startSession = () => {
    const session: FocusSession = {
      id: `session-${Date.now()}`,
      taskName: taskName || 'Focus Session',
      duration: selectedType.duration,
      type: selectedType.type,
      startTime: new Date(),
      completed: false,
      breaks: 0,
      distractions: 0
    }

    sessionRef.current = session
    setTimeRemaining(selectedType.duration * 60)
    setIsActive(true)
    setIsPaused(false)
    setDistractionCount(0)
    setBreakCount(0)

    // Enable distraction-free mode if configured
    if (enabledFeatures.distractionFreeMode) {
      setDistractionFreeMode(true)
    }
  }

  const pauseSession = () => {
    setIsPaused(!isPaused)
  }

  const skipSession = () => {
    handleSessionComplete()
  }

  const handleSessionComplete = () => {
    if (sessionRef.current) {
      const completedSession: FocusSession = {
        ...sessionRef.current,
        endTime: new Date(),
        completed: true,
        breaks: breakCount,
        distractions: distractionCount
      }

      setSessions(prev => [completedSession, ...prev])
      onSessionComplete?.(completedSession)

      // Check if this was a pomodoro - offer break
      if (selectedType.type === 'pomodoro') {
        setBreakCount(prev => prev + 1)
        // TODO: Show break modal
      }
    }

    setIsActive(false)
    setIsPaused(false)
    setDistractionFreeMode(false)
    sessionRef.current = null
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const calculateProgress = () => {
    const totalSeconds = selectedType.duration * 60
    return ((totalSeconds - timeRemaining) / totalSeconds) * 100
  }

  const getTodayStats = () => {
    const today = new Date().toDateString()
    const todaySessions = sessions.filter(s => s.startTime.toDateString() === today)
    
    const totalMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0)
    const completedSessions = todaySessions.filter(s => s.completed).length
    const totalDistractions = todaySessions.reduce((sum, s) => sum + s.distractions, 0)

    return {
      minutes: totalMinutes,
      sessions: completedSessions,
      distractions: totalDistractions,
      streak: calculateStreak()
    }
  }

  const calculateStreak = () => {
    // Simple streak calculation - days with at least one session
    let streak = 0
    let currentDate = new Date()
    
    for (let i = 0; i < 30; i++) {
      const dateStr = currentDate.toDateString()
      const hasSessions = sessions.some(s => s.startTime.toDateString() === dateStr)
      
      if (hasSessions) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }
    
    return streak
  }

  const stats = getTodayStats()

  if (distractionFreeMode && isActive) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-[9999] flex items-center justify-center">
        <div className="text-center">
          {/* Minimal Timer Display */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <div className="text-8xl font-bold text-white mb-4">
              {formatTime(timeRemaining)}
            </div>
            <div className="text-2xl text-gray-400">
              {taskName || 'Focus Session'}
            </div>
          </motion.div>

          {/* Progress Circle */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-64 h-64 transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#6366f1"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - calculateProgress() / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-16 h-16 text-indigo-500" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={pauseSession}
              className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              {isPaused ? (
                <Play className="w-6 h-6 text-white" />
              ) : (
                <Pause className="w-6 h-6 text-white" />
              )}
            </button>
            
            <button
              onClick={skipSession}
              className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <SkipForward className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => setDistractionFreeMode(false)}
              className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <Eye className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Distraction Counter */}
          <div className="mt-8 text-gray-400 text-sm">
            Distractions: {distractionCount}
            <button
              onClick={() => setDistractionCount(prev => prev + 1)}
              className="ml-4 px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              + Mark Distraction
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Focus Mode Pro
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Deep work sessions with zero distractions
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Today's Stats */}
      {enabledFeatures.analytics && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.minutes}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Minutes Today
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.sessions}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Sessions
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.streak}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Day Streak
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.distractions}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Distractions
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* Left: Session Setup */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {isActive ? 'Active Session' : 'Start Focus Session'}
          </h3>

          {!isActive ? (
            <div className="space-y-4">
              {/* Task Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What are you working on?
                </label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="e.g., Write project proposal"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Session Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Session Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {sessionTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.type}
                        onClick={() => setSelectedType(type)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedType.type === type.type
                            ? `${type.color} border-transparent text-white`
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Icon className="w-6 h-6 mb-2 mx-auto" />
                        <div className="font-medium text-sm">{type.label}</div>
                        <div className="text-xs opacity-80 mt-1">
                          {type.description}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Music Selection */}
              {enabledFeatures.focusMusic && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Focus Music (Optional)
                  </label>
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => setMusicEnabled(!musicEnabled)}
                      className={`p-2 rounded-lg transition-colors ${
                        musicEnabled
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {musicEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {musicEnabled ? 'Music Enabled' : 'Music Disabled'}
                    </span>
                  </div>

                  {musicEnabled && (
                    <div className="grid grid-cols-3 gap-2">
                      {focusMusicGenres.map((genre) => (
                        <button
                          key={genre.id}
                          onClick={() => setSelectedMusic(genre)}
                          className={`p-3 rounded-lg text-xs transition-all ${
                            selectedMusic.id === genre.id
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{genre.icon}</div>
                          {genre.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Start Button */}
              <button
                onClick={startSession}
                disabled={!taskName}
                className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start {selectedType.label} Session
              </button>
            </div>
          ) : (
            <div className="text-center">
              {/* Active Session Display */}
              <div className="mb-6">
                <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  {taskName}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
                <div
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex gap-3 justify-center mb-4">
                <button
                  onClick={pauseSession}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>

                <button
                  onClick={skipSession}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <SkipForward className="w-5 h-5" />
                  End Session
                </button>
              </div>

              {/* Distraction-Free Toggle */}
              {enabledFeatures.distractionFreeMode && (
                <button
                  onClick={() => setDistractionFreeMode(true)}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <EyeOff className="w-5 h-5" />
                  Enter Distraction-Free Mode
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right: Website Blocker & Session History */}
        <div className="space-y-6">
          {/* Website Blocker */}
          {enabledFeatures.websiteBlocker && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Website Blocker
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {isActive ? 'These sites are blocked during your session:' : 'Will be blocked during focus:'}
              </p>
              <div className="space-y-2">
                {blockedWebsites.map((site) => (
                  <div
                    key={site}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isActive
                        ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {site}
                    </span>
                    {isActive && (
                      <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                        BLOCKED
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Sessions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Recent Sessions
            </h3>
            <div className="space-y-2">
              {sessions.slice(0, 5).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {session.taskName}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {session.duration} min • {session.startTime.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.completed && (
                      <span className="text-green-600 dark:text-green-400">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {sessions.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No sessions yet. Start your first focus session!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FocusModePro

