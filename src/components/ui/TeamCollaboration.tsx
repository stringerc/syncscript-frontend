'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TeamMember {
  id: string
  name: string
  avatar: string
  status: 'online' | 'away' | 'offline'
  currentTask?: string
}

interface Message {
  id: string
  userId: string
  userName: string
  text: string
  timestamp: Date
  type: 'text' | 'system' | 'task'
  taskId?: string
}

interface Activity {
  id: string
  userId: string
  userName: string
  action: string
  target: string
  timestamp: Date
  icon: string
}

export default function TeamCollaboration() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Alice Johnson', avatar: 'A', status: 'online', currentTask: 'Reviewing designs' },
    { id: '2', name: 'Bob Smith', avatar: 'B', status: 'online', currentTask: 'Writing code' },
    { id: '3', name: 'Carol Williams', avatar: 'C', status: 'away', currentTask: 'In meeting' },
    { id: '4', name: 'David Brown', avatar: 'D', status: 'online' },
    { id: '5', name: 'Eve Davis', avatar: 'E', status: 'offline' }
  ])

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', userId: '1', userName: 'Alice', text: 'Hey team! I just finished the design mockups 🎨', timestamp: new Date(Date.now() - 600000), type: 'text' },
    { id: '2', userId: '2', userName: 'Bob', text: 'Great work! I\'ll start implementing tomorrow', timestamp: new Date(Date.now() - 300000), type: 'text' },
    { id: '3', userId: 'system', userName: 'System', text: 'Carol Williams completed "Project Planning"', timestamp: new Date(Date.now() - 120000), type: 'system' }
  ])

  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', userId: '1', userName: 'Alice', action: 'completed', target: 'Design mockups', timestamp: new Date(Date.now() - 600000), icon: '✅' },
    { id: '2', userId: '2', userName: 'Bob', action: 'started', target: 'API Integration', timestamp: new Date(Date.now() - 400000), icon: '▶️' },
    { id: '3', userId: '3', userName: 'Carol', action: 'commented on', target: 'Budget Review', timestamp: new Date(Date.now() - 200000), icon: '💬' }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [activeView, setActiveView] = useState<'chat' | 'activity' | 'members'>('chat')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      text: newMessage,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const onlineCount = teamMembers.filter(m => m.status === 'online').length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                👥 Team Collaboration
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time chat, activity tracking, and team coordination
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{onlineCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Online Now</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* View Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {[
                  { id: 'chat', label: 'Team Chat', icon: '💬' },
                  { id: 'activity', label: 'Activity Feed', icon: '🔄' },
                  { id: 'members', label: 'Members', icon: '👥' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id as typeof activeView)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all border-b-4 ${
                      activeView === tab.id
                        ? 'border-purple-600 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Team Chat */}
                {activeView === 'chat' && (
                  <div>
                    <div className="h-96 overflow-y-auto mb-4 space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-3 ${
                            message.type === 'system' ? 'justify-center' : ''
                          }`}
                        >
                          {message.type === 'system' ? (
                            <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
                              {message.text}
                            </div>
                          ) : (
                            <>
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                {message.userName.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    {message.userName}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {message.timestamp.toLocaleTimeString()}
                                  </span>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white">
                                  {message.text}
                                </div>
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}

                {/* Activity Feed */}
                {activeView === 'activity' && (
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                      >
                        <div className="text-3xl">{activity.icon}</div>
                        <div className="flex-1">
                          <div className="text-gray-900 dark:text-white">
                            <span className="font-semibold">{activity.userName}</span>
                            {' '}{activity.action}{' '}
                            <span className="font-semibold">{activity.target}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {activity.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Team Members */}
                {activeView === 'members' && (
                  <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                      >
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                            {member.avatar}
                          </div>
                          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                            member.status === 'online' ? 'bg-green-500' : member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {member.name}
                          </div>
                          {member.currentTask && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {member.currentTask}
                            </div>
                          )}
                        </div>
                        <div className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          member.status === 'online' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : member.status === 'away'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          {member.status}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Tasks */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                🎯 Active Tasks
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Design Review', assignee: 'Alice', progress: 75 },
                  { title: 'API Integration', assignee: 'Bob', progress: 45 },
                  { title: 'Testing Phase', assignee: 'Carol', progress: 30 }
                ].map((task, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">
                      {task.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      👤 {task.assignee}
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {task.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ⚡ Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all">
                  ➕ Create Team Task
                </button>
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all">
                  📅 Schedule Meeting
                </button>
                <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all">
                  📊 View Team Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

