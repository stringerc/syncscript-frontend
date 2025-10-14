// 📋 BRIEFING SYSTEM - MANAGER HOOK

import { useState, useEffect, useCallback } from 'react'
import { BriefingSettings, MorningBriefData, EveningBriefData } from '../types/briefing'

interface UseBriefingManagerProps {
  userId: string
  onError?: (error: string) => void
}

interface UseBriefingManagerReturn {
  // Settings
  settings: BriefingSettings | null
  updateSettings: (settings: BriefingSettings) => Promise<void>
  
  // Briefs
  morningBrief: MorningBriefData | null
  eveningBrief: EveningBriefData | null
  generateMorningBrief: (date?: string) => Promise<void>
  generateEveningBrief: (date?: string) => Promise<void>
  
  // UI State
  showMorningBrief: boolean
  showEveningBrief: boolean
  showBriefingSettings: boolean
  setShowMorningBrief: (show: boolean) => void
  setShowEveningBrief: (show: boolean) => void
  setShowBriefingSettings: (show: boolean) => void
  
  // Actions
  markBriefViewed: (type: 'morning' | 'evening') => Promise<void>
  carryOverTasks: (taskIds: string[]) => Promise<void>
  rescheduleTasks: (taskIds: string[]) => Promise<void>
  addReflection: (reflection: string) => Promise<void>
  
  // Status
  isLoading: boolean
  error: string | null
}

export function useBriefingManager({ 
  userId, 
  onError 
}: UseBriefingManagerProps): UseBriefingManagerReturn {
  
  // State
  const [settings, setSettings] = useState<BriefingSettings | null>(null)
  const [morningBrief, setMorningBrief] = useState<MorningBriefData | null>(null)
  const [eveningBrief, setEveningBrief] = useState<EveningBriefData | null>(null)
  const [showMorningBrief, setShowMorningBrief] = useState(false)
  const [showEveningBrief, setShowEveningBrief] = useState(false)
  const [showBriefingSettings, setShowBriefingSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load settings on mount
  useEffect(() => {
    loadSettings()
  }, [userId])

  // Check for scheduled briefs
  useEffect(() => {
    checkScheduledBriefs()
    const interval = setInterval(checkScheduledBriefs, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [settings])

  // Load briefing settings
  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/briefings/settings')
      const result = await response.json()
      
      if (result.success) {
        setSettings(result.data)
      } else {
        throw new Error(result.error || 'Failed to load settings')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load settings'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [onError])

  // Update briefing settings
  const updateSettings = useCallback(async (newSettings: BriefingSettings) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/briefings/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSettings(result.data)
      } else {
        throw new Error(result.error || 'Failed to update settings')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update settings'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [onError])

  // Generate morning brief
  const generateMorningBrief = useCallback(async (date?: string) => {
    try {
      setIsLoading(true)
      const targetDate = date || new Date().toISOString().split('T')[0]
      
      try {
        const response = await fetch(`/api/briefings/morning?date=${targetDate}`)
        
        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            setMorningBrief(result.data)
            setShowMorningBrief(true)
            return
          }
        }
      } catch (fetchError) {
        console.warn('Briefing API not available, using fallback data')
      }
      
      // Fallback data when API is not available
      const fallbackBrief: MorningBriefData = {
        id: `morning-${Date.now()}`,
        date: targetDate,
        greeting: 'Good morning! Ready to tackle the day?',
        weather: { condition: 'sunny', temperature: 22, location: 'Your City' },
        tasks: {
          pending: 3,
          overdue: 1,
          highPriority: 2,
          today: [
            { id: '1', title: 'Review project proposal', priority: 'high', energy: 'medium' },
            { id: '2', title: 'Team standup meeting', priority: 'medium', energy: 'low' },
            { id: '3', title: 'Update documentation', priority: 'low', energy: 'high' }
          ]
        },
        insights: {
          productivity: { score: 85, trend: 'up' },
          energy: { level: 7, optimal: 'morning' },
          focus: { duration: 45, breaks: 2 }
        },
        recommendations: [
          'Start with high-energy tasks in the morning',
          'Schedule your most important meeting before lunch',
          'Take breaks every 45 minutes for optimal focus'
        ],
        quotes: [
          { text: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney' }
        ]
      }
      
      setMorningBrief(fallbackBrief)
      setShowMorningBrief(true)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate morning brief'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [onError])

  // Generate evening brief
  const generateEveningBrief = useCallback(async (date?: string) => {
    try {
      setIsLoading(true)
      const targetDate = date || new Date().toISOString().split('T')[0]
      
      try {
        const response = await fetch(`/api/briefings/evening?date=${targetDate}`)
        
        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            setEveningBrief(result.data)
            setShowEveningBrief(true)
            return
          }
        }
      } catch (fetchError) {
        console.warn('Briefing API not available, using fallback data')
      }
      
      // Fallback data when API is not available
      const fallbackBrief: EveningBriefData = {
        id: `evening-${Date.now()}`,
        date: targetDate,
        greeting: 'Great work today! Let\'s wrap up with a reflection.',
        summary: {
          tasksCompleted: 8,
          tasksRemaining: 2,
          productivity: 87,
          energyUsed: 6.5,
          focusTime: 320
        },
        achievements: [
          { id: '1', title: 'Completed project milestone', type: 'major', points: 100 },
          { id: '2', title: 'Helped team member', type: 'collaboration', points: 50 }
        ],
        insights: {
          peakProductivity: '10:30 AM',
          energyDips: ['2:00 PM', '4:30 PM'],
          focusSessions: 7,
          interruptions: 3
        },
        tomorrow: {
          priorityTasks: [
            { id: '1', title: 'Follow up on client feedback', priority: 'high' },
            { id: '2', title: 'Prepare presentation slides', priority: 'medium' }
          ],
          meetings: [
            { time: '9:00 AM', title: 'Sprint planning', duration: 60 },
            { time: '2:00 PM', title: 'Client call', duration: 30 }
          ],
          recommendations: [
            'Schedule creative work in the morning',
            'Block time for deep focus sessions'
          ]
        },
        reflection: {
          whatWentWell: 'Completed the major project milestone ahead of schedule',
          challenges: 'Had some interruptions during focus time',
          learnings: 'Morning sessions are most productive for complex tasks',
          mood: 'satisfied',
          energy: 7,
          stress: 3
        }
      }
      
      setEveningBrief(fallbackBrief)
      setShowEveningBrief(true)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate evening brief'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [onError])

  // Mark brief as viewed
  const markBriefViewed = useCallback(async (type: 'morning' | 'evening') => {
    try {
      const briefId = type === 'morning' ? morningBrief?.id : eveningBrief?.id
      if (!briefId) return

      await fetch('/api/briefings/viewed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ briefId, type }),
      })
    } catch (err) {
      console.error('Failed to mark brief as viewed:', err)
    }
  }, [morningBrief?.id, eveningBrief?.id])

  // Carry over tasks to next day
  const carryOverTasks = useCallback(async (taskIds: string[]) => {
    try {
      setIsLoading(true)
      await fetch('/api/tasks/carry-over', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskIds }),
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to carry over tasks'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [onError])

  // Reschedule tasks
  const rescheduleTasks = useCallback(async (taskIds: string[]) => {
    try {
      setIsLoading(true)
      await fetch('/api/tasks/reschedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskIds }),
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reschedule tasks'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [onError])

  // Add reflection
  const addReflection = useCallback(async (reflection: string) => {
    try {
      setIsLoading(true)
      const today = new Date().toISOString().split('T')[0]
      await fetch('/api/briefings/reflection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: today, reflection }),
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add reflection'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [onError])

  // Check for scheduled briefs
  const checkScheduledBriefs = useCallback(() => {
    if (!settings) return

    const now = new Date()
    const currentTime = now.toTimeString().slice(0, 5) // HH:MM format
    const currentDay = now.getDay() // 0 = Sunday, 6 = Saturday

    // Check morning brief
    if (settings.morningBrief.enabled && 
        settings.morningBrief.deliveryChannels.includes('in-app') &&
        currentTime === settings.morningBrief.deliveryTime) {
      
      const shouldShow = 
        settings.morningBrief.frequency === 'daily' ||
        (settings.morningBrief.frequency === 'weekdays' && currentDay >= 1 && currentDay <= 5) ||
        (settings.morningBrief.frequency === 'custom' && settings.morningBrief.customDays?.includes(currentDay))

      if (shouldShow) {
        generateMorningBrief()
      }
    }

    // Check evening brief
    if (settings.eveningBrief.enabled && 
        settings.eveningBrief.deliveryChannels.includes('in-app') &&
        currentTime === settings.eveningBrief.deliveryTime) {
      
      const shouldShow = 
        settings.eveningBrief.frequency === 'daily' ||
        (settings.eveningBrief.frequency === 'weekdays' && currentDay >= 1 && currentDay <= 5) ||
        (settings.eveningBrief.frequency === 'custom' && settings.eveningBrief.customDays?.includes(currentDay))

      if (shouldShow) {
        generateEveningBrief()
      }
    }
  }, [settings, generateMorningBrief, generateEveningBrief])

  // Auto-generate briefs on first login
  useEffect(() => {
    const lastLogin = localStorage.getItem('lastLogin')
    const today = new Date().toDateString()
    
    if (lastLogin !== today && settings) {
      // First login of the day - check if we should show morning brief
      const now = new Date()
      const currentHour = now.getHours()
      
      if (currentHour < 12 && settings.morningBrief.enabled) {
        generateMorningBrief()
      } else if (currentHour >= 17 && settings.eveningBrief.enabled) {
        generateEveningBrief()
      }
      
      localStorage.setItem('lastLogin', today)
    }
  }, [settings, generateMorningBrief, generateEveningBrief])

  return {
    // Settings
    settings,
    updateSettings,
    
    // Briefs
    morningBrief,
    eveningBrief,
    generateMorningBrief,
    generateEveningBrief,
    
    // UI State
    showMorningBrief,
    showEveningBrief,
    showBriefingSettings,
    setShowMorningBrief,
    setShowEveningBrief,
    setShowBriefingSettings,
    
    // Actions
    markBriefViewed,
    carryOverTasks,
    rescheduleTasks,
    addReflection,
    
    // Status
    isLoading,
    error,
  }
}

// Utility functions for briefing management
export const briefingUtils = {
  // Check if it's time for a brief
  isTimeForBrief: (settings: BriefingSettings, type: 'morning' | 'evening'): boolean => {
    const now = new Date()
    const currentTime = now.toTimeString().slice(0, 5)
    const currentDay = now.getDay()
    
    const briefSettings = type === 'morning' ? settings.morningBrief : settings.eveningBrief
    
    if (!briefSettings.enabled) return false
    
    const timeMatches = currentTime === briefSettings.deliveryTime
    const dayMatches = 
      briefSettings.frequency === 'daily' ||
      (briefSettings.frequency === 'weekdays' && currentDay >= 1 && currentDay <= 5) ||
      (briefSettings.frequency === 'custom' && briefSettings.customDays?.includes(currentDay))
    
    return timeMatches && dayMatches
  },

  // Get next brief time
  getNextBriefTime: (settings: BriefingSettings, type: 'morning' | 'evening'): Date | null => {
    const briefSettings = type === 'morning' ? settings.morningBrief : settings.eveningBrief
    
    if (!briefSettings.enabled) return null
    
    const now = new Date()
    const [hours, minutes] = briefSettings.deliveryTime.split(':').map(Number)
    
    const nextBrief = new Date()
    nextBrief.setHours(hours, minutes, 0, 0)
    
    // If time has passed today, set for tomorrow
    if (nextBrief <= now) {
      nextBrief.setDate(nextBrief.getDate() + 1)
    }
    
    return nextBrief
  },

  // Format brief time
  formatBriefTime: (time: string): string => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  },

  // Get energy level color
  getEnergyLevelColor: (level: number): string => {
    if (level >= 9) return 'from-green-400 to-emerald-500'
    if (level >= 7) return 'from-yellow-400 to-orange-500'
    if (level >= 5) return 'from-orange-400 to-red-500'
    return 'from-red-400 to-red-600'
  },

  // Get energy emblem animation
  getEnergyEmblemAnimation: (level: number): string => {
    if (level >= 9) return 'vibrant'
    if (level >= 7) return 'pulsing'
    if (level >= 5) return 'glowing'
    return 'dim'
  },
}
