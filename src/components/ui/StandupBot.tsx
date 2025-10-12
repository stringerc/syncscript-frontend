/**
 * Feature #80: Standup Bot
 * Automated daily standup collection and summaries
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, CheckCircle, AlertCircle, Clock, Calendar } from 'lucide-react'

interface StandupResponse {
  id: string
  userId: string
  userName: string
  date: Date
  yesterday: string
  today: string
  blockers: string
  sentiment: 'positive' | 'neutral' | 'blocked'
}

const StandupBot: React.FC = () => {
  const [responses] = useState<StandupResponse[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Chen',
      date: new Date(),
      yesterday: 'Completed API integration and wrote tests',
      today: 'Working on frontend components',
      blockers: 'None',
      sentiment: 'positive'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Mike Johnson',
      date: new Date(),
      yesterday: 'Designed new UI mockups',
      today: 'Getting feedback and iterating',
      blockers: 'Waiting for design review',
      sentiment: 'blocked'
    }
  ])

  const [todayInput, setTodayInput] = useState('')
  const [yesterdayInput, setYesterdayInput] = useState('')
  const [blockersInput, setBlockersInput] = useState('')

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bot className="w-8 h-8 text-green-600 dark:text-green-400" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Standup Bot</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Daily async standups</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Standup */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Today&apos;s Standup</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What did you accomplish yesterday?
              </label>
              <textarea
                value={yesterdayInput}
                onChange={(e) => setYesterdayInput(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What will you work on today?
              </label>
              <textarea
                value={todayInput}
                onChange={(e) => setTodayInput(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Any blockers?
              </label>
              <textarea
                value={blockersInput}
                onChange={(e) => setBlockersInput(e.target.value)}
                rows={2}
                placeholder="None"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700"
            >
              <Send className="w-4 h-4" />
              Submit Standup
            </button>
          </form>
        </div>

        {/* Team Responses */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Team Updates</h3>
          <div className="space-y-4">
            {responses.map(response => (
              <div
                key={response.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900 dark:text-white">{response.userName}</span>
                  {response.sentiment === 'positive' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : response.sentiment === 'blocked' ? (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Yesterday: </span>
                    <span className="text-gray-900 dark:text-white">{response.yesterday}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Today: </span>
                    <span className="text-gray-900 dark:text-white">{response.today}</span>
                  </div>
                  {response.blockers !== 'None' && (
                    <div>
                      <span className="text-red-600 dark:text-red-400">Blockers: </span>
                      <span className="text-gray-900 dark:text-white">{response.blockers}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StandupBot

