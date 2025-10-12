/**
 * Feature #62: Time Blocking System
 * Visual time block planning with drag-drop calendar
 */

'use client'

import React, { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, Clock, Plus, Trash2, Edit2, Copy, 
  AlertCircle, Coffee, Moon, Zap, CheckCircle
} from 'lucide-react'

interface TimeBlock {
  id: string
  title: string
  startTime: string // HH:MM format
  endTime: string
  color: string
  type: 'task' | 'meeting' | 'break' | 'focus' | 'buffer'
  taskId?: string
  description?: string
}

interface TimeBlockingCalendarProps {
  date: Date
  onDateChange?: (date: Date) => void
  existingBlocks?: TimeBlock[]
  onBlocksChange?: (blocks: TimeBlock[]) => void
}

const blockTypes = [
  { type: 'task', label: 'Task', color: 'bg-blue-500', icon: CheckCircle },
  { type: 'meeting', label: 'Meeting', color: 'bg-purple-500', icon: Calendar },
  { type: 'break', label: 'Break', color: 'bg-green-500', icon: Coffee },
  { type: 'focus', label: 'Deep Work', color: 'bg-orange-500', icon: Zap },
  { type: 'buffer', label: 'Buffer', color: 'bg-gray-400', icon: Clock }
] as const

const generateTimeSlots = () => {
  const slots = []
  for (let hour = 0; hour < 24; hour++) {
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      label: hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`
    })
  }
  return slots
}

const calculateTopPosition = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return (hours * 60 + minutes) / 1440 * 100 // % of day
}

const calculateDuration = (start: string, end: string) => {
  const [startH, startM] = start.split(':').map(Number)
  const [endH, endM] = end.split(':').map(Number)
  const startMins = startH * 60 + startM
  const endMins = endH * 60 + endM
  return endMins - startMins
}

const TimeBlockingCalendar: React.FC<TimeBlockingCalendarProps> = ({
  date,
  onDateChange,
  existingBlocks = [],
  onBlocksChange
}) => {
  const [blocks, setBlocks] = useState<TimeBlock[]>(existingBlocks)
  const [selectedBlock, setSelectedBlock] = useState<TimeBlock | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [dragStart, setDragStart] = useState<{ y: number; time: string } | null>(null)
  const [view, setView] = useState<'day' | 'week'>('day')
  const calendarRef = useRef<HTMLDivElement>(null)

  const timeSlots = generateTimeSlots()

  const handleBlockCreate = (newBlock: Partial<TimeBlock>) => {
    const block: TimeBlock = {
      id: `block-${Date.now()}`,
      title: newBlock.title || 'New Block',
      startTime: newBlock.startTime || '09:00',
      endTime: newBlock.endTime || '10:00',
      color: newBlock.color || 'bg-blue-500',
      type: newBlock.type || 'task',
      description: newBlock.description
    }

    const updatedBlocks = [...blocks, block]
    setBlocks(updatedBlocks)
    onBlocksChange?.(updatedBlocks)
    setShowCreateModal(false)
  }

  const handleBlockUpdate = (id: string, updates: Partial<TimeBlock>) => {
    const updatedBlocks = blocks.map(b => b.id === id ? { ...b, ...updates } : b)
    setBlocks(updatedBlocks)
    onBlocksChange?.(updatedBlocks)
    setSelectedBlock(null)
  }

  const handleBlockDelete = (id: string) => {
    const updatedBlocks = blocks.filter(b => b.id !== id)
    setBlocks(updatedBlocks)
    onBlocksChange?.(updatedBlocks)
    setSelectedBlock(null)
  }

  const handleBlockDuplicate = (block: TimeBlock) => {
    const [hours, minutes] = block.endTime.split(':').map(Number)
    const newStart = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    const duration = calculateDuration(block.startTime, block.endTime)
    const newEndHours = Math.floor((hours * 60 + minutes + duration) / 60)
    const newEndMinutes = (hours * 60 + minutes + duration) % 60
    const newEnd = `${newEndHours.toString().padStart(2, '0')}:${newEndMinutes.toString().padStart(2, '0')}`

    handleBlockCreate({
      ...block,
      startTime: newStart,
      endTime: newEnd,
      title: `${block.title} (Copy)`
    })
  }

  const detectConflicts = (block: TimeBlock) => {
    return blocks.filter(b => {
      if (b.id === block.id) return false
      const bStart = calculateTopPosition(b.startTime)
      const bEnd = calculateTopPosition(b.endTime)
      const blockStart = calculateTopPosition(block.startTime)
      const blockEnd = calculateTopPosition(block.endTime)
      return (blockStart < bEnd && blockEnd > bStart)
    })
  }

  const suggestBreaks = () => {
    const workBlocks = blocks.filter(b => b.type === 'task' || b.type === 'focus')
    const suggestions: TimeBlock[] = []

    workBlocks.forEach((block, i) => {
      const duration = calculateDuration(block.startTime, block.endTime)
      if (duration >= 90 && i < workBlocks.length - 1) {
        // Suggest break after long work blocks
        const breakStart = block.endTime
        const nextBlock = workBlocks[i + 1]
        const breakEnd = nextBlock?.startTime || block.endTime

        if (breakStart !== breakEnd) {
          suggestions.push({
            id: `break-suggestion-${i}`,
            title: '☕ Suggested Break',
            startTime: breakStart,
            endTime: breakEnd,
            color: 'bg-green-500',
            type: 'break',
            description: 'Take a break to recharge'
          })
        }
      }
    })

    return suggestions
  }

  const calculateStats = () => {
    const totalMinutes = blocks.reduce((sum, block) => {
      return sum + calculateDuration(block.startTime, block.endTime)
    }, 0)

    const byType = blocks.reduce((acc, block) => {
      const duration = calculateDuration(block.startTime, block.endTime)
      acc[block.type] = (acc[block.type] || 0) + duration
      return acc
    }, {} as Record<string, number>)

    return {
      total: totalMinutes,
      byType,
      blocked: Math.round((totalMinutes / 1440) * 100) // % of day
    }
  }

  const stats = calculateStats()
  const breakSuggestions = suggestBreaks()
  const hasConflicts = blocks.some(b => detectConflicts(b).length > 0)

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Time Blocking
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  view === 'day'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  view === 'week'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Week
              </button>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Block
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400">
              {Math.floor(stats.total / 60)}h {stats.total % 60}m blocked ({stats.blocked}%)
            </span>
          </div>

          {hasConflicts && (
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <AlertCircle className="w-4 h-4" />
              <span>Conflicts detected</span>
            </div>
          )}

          {breakSuggestions.length > 0 && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Coffee className="w-4 h-4" />
              <span>{breakSuggestions.length} break suggestions</span>
            </div>
          )}
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 overflow-auto">
        <div ref={calendarRef} className="relative min-h-[1440px]">
          {/* Time Grid */}
          {timeSlots.map((slot, i) => (
            <div
              key={slot.time}
              className="absolute w-full h-[60px] border-b border-gray-200 dark:border-gray-700"
              style={{ top: `${(i / 24) * 100}%` }}
            >
              <div className="flex items-start gap-4 px-4 pt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">
                  {slot.label}
                </span>
              </div>
            </div>
          ))}

          {/* Time Blocks */}
          <div className="absolute inset-0 left-20">
            <AnimatePresence>
              {blocks.map((block) => {
                const conflicts = detectConflicts(block)
                const duration = calculateDuration(block.startTime, block.endTime)
                const height = (duration / 1440) * 100

                return (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`absolute left-2 right-2 rounded-lg p-3 cursor-pointer ${block.color} bg-opacity-90 border-2 ${
                      conflicts.length > 0 ? 'border-red-500' : 'border-transparent'
                    } hover:shadow-lg transition-shadow`}
                    style={{
                      top: `${calculateTopPosition(block.startTime)}%`,
                      height: `${height}%`,
                      minHeight: '40px'
                    }}
                    onClick={() => setSelectedBlock(block)}
                  >
                    <div className="text-white">
                      <div className="font-semibold text-sm truncate">{block.title}</div>
                      <div className="text-xs opacity-90">
                        {block.startTime} - {block.endTime} ({duration} min)
                      </div>
                      {block.description && (
                        <div className="text-xs mt-1 opacity-80 truncate">
                          {block.description}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Break Suggestions */}
            <AnimatePresence>
              {breakSuggestions.map((suggestion) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-2 right-2 rounded-lg p-2 border-2 border-dashed border-green-500 bg-green-50 dark:bg-green-900/20 cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  style={{
                    top: `${calculateTopPosition(suggestion.startTime)}%`,
                    height: `${(calculateDuration(suggestion.startTime, suggestion.endTime) / 1440) * 100}%`,
                    minHeight: '30px'
                  }}
                  onClick={() => handleBlockCreate(suggestion)}
                >
                  <div className="text-green-700 dark:text-green-300 text-xs">
                    {suggestion.title}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Block Details Modal */}
      <AnimatePresence>
        {selectedBlock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedBlock(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Time Block Details
                </h3>
                <button
                  onClick={() => setSelectedBlock(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.title}
                    onChange={(e) => handleBlockUpdate(selectedBlock.id, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={selectedBlock.startTime}
                      onChange={(e) => handleBlockUpdate(selectedBlock.id, { startTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={selectedBlock.endTime}
                      onChange={(e) => handleBlockUpdate(selectedBlock.id, { endTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <div className="flex gap-2">
                    {blockTypes.map(({ type, label, color }) => (
                      <button
                        key={type}
                        onClick={() => handleBlockUpdate(selectedBlock.id, { type, color })}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          selectedBlock.type === type
                            ? `${color} text-white`
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conflict Warning */}
                {detectConflicts(selectedBlock).length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Conflicts with {detectConflicts(selectedBlock).length} other block(s)
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleBlockDuplicate(selectedBlock)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                  <button
                    onClick={() => handleBlockDelete(selectedBlock.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Block Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Create Time Block
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleBlockCreate({
                    title: formData.get('title') as string,
                    startTime: formData.get('startTime') as string,
                    endTime: formData.get('endTime') as string,
                    type: formData.get('type') as TimeBlock['type'],
                    color: blockTypes.find(t => t.type === formData.get('type'))?.color,
                    description: formData.get('description') as string
                  })
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="What are you working on?"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      required
                      defaultValue="09:00"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      required
                      defaultValue="10:00"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {blockTypes.map(({ type, label }) => (
                      <option key={type} value={type}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    name="description"
                    rows={2}
                    placeholder="Add notes..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Block
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TimeBlockingCalendar

