/**
 * Calendar View Page
 * Visual calendar with tasks, events, and time blocking
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Zap } from 'lucide-react'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek }
  }
  
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate)
  
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }
  
  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Calendar View
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
            >
              ← Back to Dashboard
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Visual calendar with time blocking, task scheduling, and energy optimization
          </p>
        </div>

        {/* Calendar Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              aria-label="Next month"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map(day => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const today = isToday(day)
              
              return (
                <div
                  key={day}
                  className={`aspect-square border rounded-lg p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition ${
                    today
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className={`text-sm font-semibold mb-1 ${today ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {day}
                  </div>
                  
                  {/* Sample tasks (you can connect to real data later) */}
                  {day === new Date().getDate() && (
                    <div className="space-y-1">
                      <div className="text-xs bg-green-500 text-white rounded px-1 py-0.5 truncate">
                        ⚡ Task 1
                      </div>
                      <div className="text-xs bg-orange-500 text-white rounded px-1 py-0.5 truncate">
                        🔥 Task 2
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Event
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Schedule tasks and events on your calendar
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Create Event
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Time Blocking
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Block time for focused work sessions
            </p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
              Block Time
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Energy Planning
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Schedule tasks based on your energy patterns
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Optimize Schedule
            </button>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">🚀 Full Calendar Features Coming Soon!</h3>
          <p className="text-blue-100 mb-4">
            Advanced calendar integration, drag-and-drop scheduling, and Google Calendar sync
            are being refined for the best possible experience.
          </p>
          <p className="text-sm text-blue-200">
            In the meantime, use the dashboard for task management with energy-based recommendations!
          </p>
          <Link
            href="/dashboard"
            className="inline-block mt-4 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

