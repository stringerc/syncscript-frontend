'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { breakdownTask } from '@/utils/aiTaskBreakdown'

interface Task {
  id: string
  title: string
  description?: string
  complexity?: 'simple' | 'moderate' | 'complex' | 'very_complex'
  estimated_duration?: number
}

interface Subtask {
  id: string
  title: string
  description: string
  estimated_duration: number
  priority: 1 | 2 | 3 | 4 | 5
  dependencies: string[]
  order: number
  completed: boolean
}

interface AdvancedTaskBreakdownProps {
  task: Task
  onSubtasksGenerated?: (subtasks: Subtask[]) => void
  onClose?: () => void
}

export default function AdvancedTaskBreakdown({ task, onSubtasksGenerated, onClose }: AdvancedTaskBreakdownProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [subtasks, setSubtasks] = useState<Subtask[]>([])
  const [selectedSubtask, setSelectedSubtask] = useState<Subtask | null>(null)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const analyzeTask = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate subtasks using AI
    const breakdown = breakdownTask({
      title: task.title,
      description: task.description || '',
      complexity: task.complexity || 'moderate'
    })
    
    // Convert to subtask format
    const generatedSubtasks: Subtask[] = breakdown.subtasks.map((st, index) => ({
      id: `subtask-${Date.now()}-${index}`,
      title: st.title,
      description: st.description,
      estimated_duration: st.estimated_duration,
      priority: st.priority,
      dependencies: st.dependencies || [],
      order: st.order,
      completed: false
    }))
    
    setSubtasks(generatedSubtasks)
    setAnalysisComplete(true)
    setIsAnalyzing(false)
  }

  const toggleSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.map(st => 
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    ))
  }

  const totalDuration = subtasks.reduce((sum, st) => sum + st.estimated_duration, 0)
  const completedCount = subtasks.filter(st => st.completed).length
  const progressPercentage = subtasks.length > 0 ? (completedCount / subtasks.length) * 100 : 0

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'from-red-500 to-red-600'
      case 2: return 'from-orange-500 to-orange-600'
      case 3: return 'from-yellow-500 to-yellow-600'
      case 4: return 'from-blue-500 to-blue-600'
      case 5: return 'from-gray-500 to-gray-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getPriorityLabel = (priority: number) => {
    const labels = ['', 'Critical', 'High', 'Medium', 'Low', 'Optional']
    return labels[priority] || 'Unknown'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🤖 AI Task Breakdown
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Let AI help you break down complex tasks into manageable steps
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>

          {/* Task Info */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {task.title}
            </h2>
            {task.description && (
              <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
            )}
          </div>

          {/* Analyze Button */}
          {!analysisComplete && (
            <button
              onClick={analyzeTask}
              disabled={isAnalyzing}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isAnalyzing
                  ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="animate-spin">⚙️</span>
                  Analyzing task with AI...
                </span>
              ) : (
                <span>🚀 Break Down This Task</span>
              )}
            </button>
          )}
        </div>

        {/* Analysis Results */}
        {analysisComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Progress Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  📊 Breakdown Overview
                </h3>
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  {showExplanation ? 'Hide' : 'Show'} AI Reasoning
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                  <div className="text-3xl font-bold">{subtasks.length}</div>
                  <div className="text-sm text-blue-100">Subtasks</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                  <div className="text-3xl font-bold">{completedCount}</div>
                  <div className="text-sm text-green-100">Completed</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                  <div className="text-3xl font-bold">{totalDuration}m</div>
                  <div className="text-sm text-purple-100">Est. Time</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                  <div className="text-3xl font-bold">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm text-orange-100">Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-500"
                />
              </div>

              {/* AI Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl"
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>🧠 AI Analysis:</strong> I&apos;ve broken down this task based on complexity, 
                      dependencies, and best practices. The subtasks are ordered for optimal workflow, 
                      with critical path items prioritized first.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtasks List */}
            <div className="space-y-4">
              {subtasks.map((subtask, index) => (
                <motion.div
                  key={subtask.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleSubtask(subtask.id)}
                      className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                        subtask.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 dark:border-gray-600 hover:border-purple-500'
                      }`}
                      aria-label={subtask.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {subtask.completed && <span className="text-white text-lg">✓</span>}
                    </button>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                              Step {subtask.order}
                            </span>
                            <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getPriorityColor(subtask.priority)} text-white font-semibold`}>
                              {getPriorityLabel(subtask.priority)}
                            </span>
                          </div>
                          <h4 className={`text-lg font-bold mb-2 ${
                            subtask.completed
                              ? 'text-gray-400 line-through'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {subtask.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {subtask.description}
                          </p>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          ⏱️ {subtask.estimated_duration} min
                        </span>
                        {subtask.dependencies.length > 0 && (
                          <span className="flex items-center gap-1">
                            🔗 {subtask.dependencies.length} dependencies
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={() => setSelectedSubtask(subtask)}
                      className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      aria-label="View details"
                    >
                      <span className="text-xl">ℹ️</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  if (onSubtasksGenerated) {
                    onSubtasksGenerated(subtasks)
                  }
                }}
                className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                ✅ Save Breakdown
              </button>
              <button
                onClick={() => {
                  setAnalysisComplete(false)
                  setSubtasks([])
                }}
                className="px-6 py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-colors"
              >
                🔄 Regenerate
              </button>
            </div>
          </motion.div>
        )}

        {/* Subtask Detail Modal */}
        <AnimatePresence>
          {selectedSubtask && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubtask(null)}
              className="modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Subtask Details
                  </h3>
                  <button
                    onClick={() => setSelectedSubtask(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {selectedSubtask.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedSubtask.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Priority</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {getPriorityLabel(selectedSubtask.priority)}
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedSubtask.estimated_duration} min
                      </div>
                    </div>
                  </div>

                  {selectedSubtask.dependencies.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Dependencies
                      </h5>
                      <div className="space-y-2">
                        {selectedSubtask.dependencies.map((depId, idx) => (
                          <div key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                            🔗 Step {depId}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedSubtask(null)}
                  className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

