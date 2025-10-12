/**
 * Feature #79: Team Calendar Sync
 * Unified team scheduling with availability tracking
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Clock, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

interface TeamEvent {
  id: string
  title: string
  start: Date
  end: Date
  attendees: string[]
  type: 'meeting' | 'deadline' | 'event' | 'out-of-office'
  color: string
}

const TeamCalendarSyncHub: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events] = useState<TeamEvent[]>([
    {
      id: '1',
      title: 'Team Standup',
      start: new Date(2024, 0, 15, 9, 0),
      end: new Date(2024, 0, 15, 9, 30),
      attendees: ['Sarah', 'Mike', 'Alex'],
      type: 'meeting',
      color: 'bg-blue-500'
    }
  ])

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Calendar</h2>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          <Plus className="w-4 h-4" />
          New Event
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-bold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={i}
              className="aspect-square p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="text-sm text-gray-900 dark:text-white">{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamCalendarSyncHub

