'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Type declarations for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface Command {
  id: string
  text: string
  confidence: number
  timestamp: Date
  action: string
  success: boolean
}

interface VoiceShortcut {
  trigger: string
  action: string
  example: string
  category: string
}

const VOICE_SHORTCUTS: VoiceShortcut[] = [
  { trigger: 'create task', action: 'Opens task creation', example: 'Create task: Buy groceries', category: 'Tasks' },
  { trigger: 'schedule', action: 'Schedules an item', example: 'Schedule meeting tomorrow at 2pm', category: 'Calendar' },
  { trigger: 'show', action: 'Displays view', example: 'Show my tasks for today', category: 'Navigation' },
  { trigger: 'complete', action: 'Marks as done', example: 'Complete task: Write report', category: 'Tasks' },
  { trigger: 'set priority', action: 'Changes priority', example: 'Set priority high for project review', category: 'Tasks' },
  { trigger: 'add note', action: 'Adds a note', example: 'Add note to meeting - Discuss budget', category: 'Notes' },
  { trigger: 'find', action: 'Searches items', example: 'Find tasks about marketing', category: 'Search' },
  { trigger: 'remind me', action: 'Sets reminder', example: 'Remind me to call John at 3pm', category: 'Reminders' },
  { trigger: 'open', action: 'Opens section', example: 'Open analytics dashboard', category: 'Navigation' },
  { trigger: 'filter', action: 'Filters list', example: 'Filter tasks by high priority', category: 'Filters' }
]

export default function VoiceCommandsCenter() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [commandHistory, setCommandHistory] = useState<Command[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== 'undefined') {
      // @ts-expect-error - Web Speech API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      setIsSupported(!!SpeechRecognition)
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'en-US'
        
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = ''
          let finalTranscript = ''
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }
          
          if (finalTranscript) {
            processCommand(finalTranscript)
            setTranscript('')
          } else {
            setTranscript(interimTranscript)
          }
        }
        
        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }
        
        recognition.onend = () => {
          setIsListening(false)
        }
        
        recognitionRef.current = recognition
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        setTranscript('')
      } catch (error) {
        console.error('Error starting recognition:', error)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const processCommand = (commandText: string) => {
    const lowerCommand = commandText.toLowerCase()
    let action = 'Unknown command'
    let success = false
    
    // Match command to shortcuts
    const matchedShortcut = VOICE_SHORTCUTS.find(shortcut => 
      lowerCommand.includes(shortcut.trigger.toLowerCase())
    )
    
    if (matchedShortcut) {
      action = matchedShortcut.action
      success = true
    }
    
    const newCommand: Command = {
      id: Date.now().toString(),
      text: commandText,
      confidence: 0.85 + Math.random() * 0.15,
      timestamp: new Date(),
      action,
      success
    }
    
    setCommandHistory([newCommand, ...commandHistory].slice(0, 10))
  }

  const categories = ['all', 'Tasks', 'Calendar', 'Navigation', 'Search', 'Notes', 'Reminders', 'Filters']
  
  const filteredShortcuts = selectedCategory === 'all' 
    ? VOICE_SHORTCUTS 
    : VOICE_SHORTCUTS.filter(s => s.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                🎤 Voice Commands
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Control SyncScript with natural language voice commands
              </p>
            </div>
          </div>

          {/* Voice Input */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8">
            <div className="text-center">
              {!isSupported ? (
                <div className="py-8">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Voice Commands Not Supported
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your browser doesn't support speech recognition. Try Chrome or Edge.
                  </p>
                </div>
              ) : (
                <>
                  {/* Microphone Button */}
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`relative w-32 h-32 rounded-full transition-all ${
                      isListening
                        ? 'bg-gradient-to-br from-red-500 to-pink-600 animate-pulse scale-110'
                        : 'bg-gradient-to-br from-purple-600 to-blue-600 hover:scale-105'
                    } shadow-2xl mb-6`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-6xl text-white">
                      {isListening ? '🔴' : '🎤'}
                    </div>
                    {isListening && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-4 border-red-300"
                      />
                    )}
                  </button>

                  {/* Status Text */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {isListening ? '🎧 Listening...' : '👆 Click to speak'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {isListening 
                        ? 'Say a command like &quot;Create task - Buy groceries&quot;' 
                        : 'Press the microphone to start'
                      }
                    </p>
                  </div>

                  {/* Live Transcript */}
                  {transcript && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
                    >
                      <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                        You&apos;re saying:
                      </div>
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        &quot;{transcript}&quot;
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Command History */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📜 Command History
            </h2>

            {commandHistory.length > 0 ? (
              <div className="space-y-3">
                {commandHistory.map((command, index) => (
                  <motion.div
                    key={command.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl border-2 ${
                      command.success
                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                        : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          "{command.text}"
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {command.action}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {command.success ? '✅' : '❌'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {Math.round(command.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {command.timestamp.toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <div className="text-6xl mb-4">🎤</div>
                <p className="text-lg">No commands yet</p>
                <p className="text-sm mt-2">Start speaking to see your command history</p>
              </div>
            )}
          </div>

          {/* Voice Shortcuts */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              ⚡ Voice Shortcuts
            </h2>

            {/* Category Filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredShortcuts.map((shortcut, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {shortcut.trigger.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 dark:text-white mb-1">
                        &quot;{shortcut.trigger}&quot;
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {shortcut.action}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 inline-block">
                        💬 {shortcut.example}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

