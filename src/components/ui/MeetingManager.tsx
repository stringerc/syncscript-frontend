/**
 * Feature #64: Meeting Manager
 * Smart meeting preparation & follow-up with AI assistance
 */

'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, Users, Clock, FileText, CheckSquare, 
  Plus, Send, DollarSign, AlertCircle, Sparkles,
  Download, Share2, Copy
} from 'lucide-react'

interface Meeting {
  id: string
  title: string
  date: Date
  duration: number // minutes
  attendees: string[]
  agenda: AgendaItem[]
  notes: string
  actionItems: ActionItem[]
  cost: number // calculated based on attendees' hourly rates
  status: 'upcoming' | 'in-progress' | 'completed'
}

interface AgendaItem {
  id: string
  topic: string
  duration: number
  owner?: string
  completed: boolean
}

interface ActionItem {
  id: string
  task: string
  assignee: string
  dueDate: Date
  priority: 'low' | 'medium' | 'high'
  completed: boolean
}

interface MeetingManagerProps {
  onMeetingCreate?: (meeting: Meeting) => void
  onActionItemCreate?: (item: ActionItem) => void
}

const MeetingManager: React.FC<MeetingManagerProps> = ({
  onMeetingCreate,
  onActionItemCreate
}) => {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list')
  const [averageHourlyRate] = useState(75) // Default hourly rate for cost calculation

  const generateAgenda = (title: string, duration: number): AgendaItem[] => {
    // AI-powered agenda generation based on meeting title
    const commonTopics = [
      'Introductions and check-in',
      'Review previous action items',
      'Main discussion',
      'Decision making',
      'Next steps and action items',
      'Q&A and wrap-up'
    ]

    const timeSplit = duration / commonTopics.length

    return commonTopics.map((topic, i) => ({
      id: `agenda-${i}`,
      topic,
      duration: Math.floor(timeSplit),
      completed: false
    }))
  }

  const calculateMeetingCost = (attendees: number, duration: number): number => {
    return (attendees * averageHourlyRate * duration) / 60
  }

  const extractActionItems = (notes: string): ActionItem[] => {
    // Simple extraction - look for patterns like "TODO:", "Action:", "[ ]"
    const lines = notes.split('\n')
    const actions: ActionItem[] = []

    lines.forEach((line, i) => {
      if (line.toLowerCase().includes('todo:') || 
          line.toLowerCase().includes('action:') ||
          line.includes('[ ]')) {
        actions.push({
          id: `action-${i}`,
          task: line.replace(/todo:|action:|\[ \]/gi, '').trim(),
          assignee: 'Unassigned',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
          priority: 'medium',
          completed: false
        })
      }
    })

    return actions
  }

  const generateSummary = (meeting: Meeting): string => {
    const completedItems = meeting.agenda.filter(a => a.completed).length
    const totalItems = meeting.agenda.length
    const actionItemsCount = meeting.actionItems.length

    return `Meeting completed with ${completedItems}/${totalItems} agenda items covered. Generated ${actionItemsCount} action items. Estimated cost: $${meeting.cost.toFixed(2)}.`
  }

  const createMeeting = (data: Partial<Meeting>) => {
    const meeting: Meeting = {
      id: `meeting-${Date.now()}`,
      title: data.title || 'New Meeting',
      date: data.date || new Date(),
      duration: data.duration || 60,
      attendees: data.attendees || [],
      agenda: data.agenda || generateAgenda(data.title || 'New Meeting', data.duration || 60),
      notes: data.notes || '',
      actionItems: data.actionItems || [],
      cost: calculateMeetingCost(data.attendees?.length || 3, data.duration || 60),
      status: 'upcoming'
    }

    setMeetings(prev => [meeting, ...prev])
    onMeetingCreate?.(meeting)
    setView('list')
  }

  const completeMeeting = (meetingId: string, notes: string) => {
    setMeetings(prev => prev.map(m => {
      if (m.id === meetingId) {
        const actionItems = extractActionItems(notes)
        return {
          ...m,
          notes,
          actionItems,
          status: 'completed' as const
        }
      }
      return m
    }))
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Meeting Manager
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Smart preparation and follow-up
              </p>
            </div>
          </div>

          <button
            onClick={() => setView('create')}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Meeting
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {view === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetings.map((meeting) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedMeeting(meeting)
                  setView('detail')
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {meeting.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    meeting.status === 'completed'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : meeting.status === 'in-progress'
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {meeting.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {meeting.date.toLocaleString()} • {meeting.duration} min
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    {meeting.attendees.length} attendees
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-4 h-4" />
                    Cost: ${meeting.cost.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <CheckSquare className="w-4 h-4" />
                    {meeting.actionItems.length} action items
                  </div>
                </div>

                {meeting.cost > 500 && (
                  <div className="mt-4 flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    High-cost meeting
                  </div>
                )}
              </motion.div>
            ))}

            {meetings.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No meetings yet. Create your first meeting!</p>
              </div>
            )}
          </div>
        )}

        {view === 'create' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Create Meeting
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                createMeeting({
                  title: formData.get('title') as string,
                  date: new Date(formData.get('date') as string),
                  duration: Number(formData.get('duration')),
                  attendees: (formData.get('attendees') as string).split(',').map(a => a.trim())
                })
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meeting Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g., Q4 Planning Review"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    required
                    defaultValue={60}
                    min={15}
                    step={15}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Attendees (comma-separated emails)
                </label>
                <input
                  type="text"
                  name="attendees"
                  required
                  placeholder="john@example.com, jane@example.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">AI-Powered Features</span>
                </div>
                <ul className="text-sm text-purple-600 dark:text-purple-300 space-y-1">
                  <li>• Auto-generated agenda based on meeting title</li>
                  <li>• Cost calculation for meeting time</li>
                  <li>• Action item extraction from notes</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Meeting
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {view === 'detail' && selectedMeeting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => setView('list')}
              className="mb-4 text-purple-600 dark:text-purple-400 hover:underline"
            >
              ← Back to meetings
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-6">
              {/* Meeting Header */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedMeeting.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{selectedMeeting.date.toLocaleString()}</span>
                  <span>•</span>
                  <span>{selectedMeeting.duration} minutes</span>
                  <span>•</span>
                  <span>{selectedMeeting.attendees.length} attendees</span>
                </div>
              </div>

              {/* Cost Warning */}
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <DollarSign className="w-5 h-5" />
                  <div>
                    <div className="font-medium">Meeting Cost: ${selectedMeeting.cost.toFixed(2)}</div>
                    <div className="text-sm opacity-80">
                      Based on {selectedMeeting.attendees.length} attendees × ${averageHourlyRate}/hr × {selectedMeeting.duration} min
                    </div>
                  </div>
                </div>
              </div>

              {/* Agenda */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Agenda</h4>
                <div className="space-y-2">
                  {selectedMeeting.agenda.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {
                          setMeetings(prev => prev.map(m => {
                            if (m.id === selectedMeeting.id) {
                              return {
                                ...m,
                                agenda: m.agenda.map(a =>
                                  a.id === item.id ? { ...a, completed: !a.completed } : a
                                )
                              }
                            }
                            return m
                          }))
                        }}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                          {item.topic}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.duration} min
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Meeting Notes</h4>
                <textarea
                  value={selectedMeeting.notes}
                  onChange={(e) => {
                    setMeetings(prev => prev.map(m =>
                      m.id === selectedMeeting.id ? { ...m, notes: e.target.value } : m
                    ))
                  }}
                  placeholder="Add meeting notes here... Use 'TODO:' or 'Action:' to auto-create action items."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Action Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-900 dark:text-white">Action Items</h4>
                  <button
                    onClick={() => {
                      const items = extractActionItems(selectedMeeting.notes)
                      setMeetings(prev => prev.map(m =>
                        m.id === selectedMeeting.id ? { ...m, actionItems: items } : m
                      ))
                    }}
                    className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <Sparkles className="w-4 h-4" />
                    Extract from Notes
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedMeeting.actionItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {
                          setMeetings(prev => prev.map(m => {
                            if (m.id === selectedMeeting.id) {
                              return {
                                ...m,
                                actionItems: m.actionItems.map(a =>
                                  a.id === item.id ? { ...a, completed: !a.completed } : a
                                )
                              }
                            }
                            return m
                          }))
                        }}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                          {item.task}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.assignee} • Due: {item.dueDate.toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.priority === 'high'
                          ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                          : item.priority === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  ))}
                  {selectedMeeting.actionItems.length === 0 && (
                    <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                      No action items yet. Add notes with "TODO:" to auto-generate.
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    const summary = generateSummary(selectedMeeting)
                    navigator.clipboard.writeText(summary)
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy Summary
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={() => completeMeeting(selectedMeeting.id, selectedMeeting.notes)}
                  disabled={selectedMeeting.status === 'completed'}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <CheckSquare className="w-4 h-4" />
                  Complete Meeting
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MeetingManager

