'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  breakdownTask,
  saveTaskBreakdown,
  updateSubtaskStatus,
  TaskBreakdown,
  SubTask
} from '@/utils/aiTaskBreakdown'

interface TaskBreakdownModalProps {
  show: boolean
  taskId: string
  taskTitle: string
  taskDescription?: string
  onClose: () => void
  onApply?: (breakdown: TaskBreakdown) => void
}

export default function TaskBreakdownModal({
  show,
  taskId,
  taskTitle,
  taskDescription,
  onClose,
  onApply
}: TaskBreakdownModalProps) {
  const [breakdown, setBreakdown] = useState<TaskBreakdown | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate AI thinking time
    setTimeout(() => {
      const result = breakdownTask(taskTitle, taskDescription)
      setBreakdown(result)
      setIsGenerating(false)
    }, 1500)
  }

  const handleToggleSubtask = (subtaskId: string) => {
    if (!breakdown) return
    
    const updatedBreakdown = {
      ...breakdown,
      subtasks: breakdown.subtasks.map(st =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      )
    }
    setBreakdown(updatedBreakdown)
  }

  const handleApply = () => {
    if (!breakdown) return
    
    saveTaskBreakdown(taskId, breakdown)
    onApply?.(breakdown)
    onClose()
  }

  const getComplexityColor = (complexity: TaskBreakdown['complexity']) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      case 'moderate': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
      case 'complex': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
      case 'very-complex': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
  }

  const completedCount = breakdown?.subtasks.filter(st => st.completed).length || 0
  const totalCount = breakdown?.subtasks.length || 0
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">🤖 AI Task Breakdown</h2>
                  <p className="text-white/90 text-sm">
                    Let AI break down your task into manageable subtasks
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Original Task */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original Task:</div>
                <div className="font-semibold text-gray-900 dark:text-white mb-2">{taskTitle}</div>
                {taskDescription && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">{taskDescription}</div>
                )}
              </div>

              {/* Generate Button */}
              {!breakdown && !isGenerating && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🤖</div>
                  <button
                    onClick={handleGenerate}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                  >
                    Generate Breakdown with AI
                  </button>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    AI will analyze your task and create an optimal breakdown
                  </p>
                </div>
              )}

              {/* Loading State */}
              {isGenerating && (
                <div className="text-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-6xl mb-4 inline-block"
                  >
                    🤖
                  </motion.div>
                  <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Analyzing task...
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    AI is breaking down your task into subtasks
                  </div>
                </div>
              )}

              {/* Breakdown Results */}
              {breakdown && !isGenerating && (
                <div>
                  {/* Breakdown Info */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                      <div className="text-3xl font-bold">{breakdown.subtasks.length}</div>
                      <div className="text-sm text-blue-100">Subtasks</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                      <div className="text-3xl font-bold">{formatDuration(breakdown.totalEstimatedTime)}</div>
                      <div className="text-sm text-purple-100">Est. Time</div>
                    </div>
                    <div className={`rounded-xl p-4 ${getComplexityColor(breakdown.complexity)}`}>
                      <div className="text-lg font-bold capitalize">{breakdown.complexity.replace('-', ' ')}</div>
                      <div className="text-xs opacity-80">Complexity</div>
                    </div>
                  </div>

                  {/* Strategy */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">💡</div>
                      <div>
                        <div className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                          Recommended Strategy
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-400">
                          {breakdown.strategy}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {completedCount > 0 && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {completedCount}/{totalCount} completed
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Subtasks List */}
                  <div className="space-y-3">
                    {breakdown.subtasks.map((subtask, index) => (
                      <motion.div
                        key={subtask.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`rounded-lg border-2 p-4 cursor-pointer transition-all ${
                          subtask.completed
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                        }`}
                        onClick={() => handleToggleSubtask(subtask.id)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Checkbox */}
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                              subtask.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {subtask.completed && (
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-gray-400 dark:text-gray-600">
                                  #{index + 1}
                                </span>
                                <h4 className={`font-bold ${
                                  subtask.completed 
                                    ? 'text-green-700 dark:text-green-400 line-through' 
                                    : 'text-gray-900 dark:text-white'
                                }`}>
                                  {subtask.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-purple-600 dark:text-purple-400 font-semibold">
                                  {formatDuration(subtask.estimatedDuration)}
                                </span>
                              </div>
                            </div>
                            <p className={`text-sm ${
                              subtask.completed
                                ? 'text-green-600 dark:text-green-500'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {subtask.description}
                            </p>
                            {subtask.dependsOn && subtask.dependsOn.length > 0 && (
                              <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                                ⚠️ Depends on previous task{subtask.dependsOn.length > 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {breakdown && !isGenerating && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 flex gap-3">
                <button
                  onClick={() => setBreakdown(null)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Regenerate
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Apply Breakdown
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

