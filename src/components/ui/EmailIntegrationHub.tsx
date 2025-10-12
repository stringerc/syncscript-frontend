/**
 * Feature #65: Email Integration Hub
 * Turn emails into tasks automatically
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, Inbox, CheckCircle, Clock, AlertCircle, 
  Zap, ArrowRight, Filter, Search, Send
} from 'lucide-react'
import { 
  Email, EmailTask, parseEmailToTask, sortInboxByPriority,
  generateReplySuggestions, emailTemplates, categorizeEmail
} from '../../utils/emailIntegration'

interface EmailIntegrationHubProps {
  onTaskCreate?: (task: EmailTask) => void
}

const EmailIntegrationHub: React.FC<EmailIntegrationHubProps> = ({
  onTaskCreate
}) => {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      from: 'john@example.com',
      subject: 'Urgent: Review Q4 Report',
      body: 'Hi, can you please review the Q4 financial report by end of day? It\'s critical for tomorrow\'s board meeting.',
      receivedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'high',
      hasAttachments: true,
      labels: ['work', 'urgent']
    },
    {
      id: '2',
      from: 'sarah@example.com',
      subject: 'Schedule: Team Meeting Next Week',
      body: 'Let\'s schedule our weekly sync for next Tuesday at 2pm. Please confirm your availability.',
      receivedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      priority: 'medium',
      hasAttachments: false,
      labels: ['meetings']
    }
  ])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const sortedEmails = sortInboxByPriority(emails)
  const filteredEmails = sortedEmails.filter(email => {
    const matchesSearch = searchQuery === '' || 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterCategory === 'all' || 
      categorizeEmail(email) === filterCategory

    return matchesSearch && matchesFilter
  })

  const convertToTask = (email: Email) => {
    const task = parseEmailToTask(email)
    onTaskCreate?.(task)
    // Mark email as processed
    setEmails(prev => prev.filter(e => e.id !== email.id))
  }

  const categories = ['all', 'Meetings', 'Tasks', 'Projects', 'Urgent', 'Updates']

  return (
    <div className="h-full flex bg-gray-50 dark:bg-gray-900">
      {/* Inbox List */}
      <div className="w-96 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">Email Inbox</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {filteredEmails.length} emails
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search emails..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedEmail?.id === email.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  {email.from}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  email.priority === 'high'
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    : email.priority === 'low'
                    ? 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                }`}>
                  {email.priority}
                </span>
              </div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {email.subject}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 truncate mb-2">
                {email.body}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                {email.receivedAt.toLocaleTimeString()}
                {email.hasAttachments && (
                  <>
                    <span>•</span>
                    <span>📎 Attachment</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Detail & Actions */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedEmail.subject}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    From: {selectedEmail.from}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedEmail.receivedAt.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => convertToTask(selectedEmail)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  Convert to Task
                </button>
              </div>

              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full">
                  {categorizeEmail(selectedEmail)}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {/* Email Body */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {selectedEmail.body}
                </p>
              </div>

              {/* Quick Reply Suggestions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Smart Reply Suggestions
                </h4>
                <div className="space-y-2">
                  {generateReplySuggestions(selectedEmail).map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => navigator.clipboard.writeText(suggestion)}
                      className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm text-gray-700 dark:text-gray-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task Preview */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Task Preview
                </h4>
                {(() => {
                  const task = parseEmailToTask(selectedEmail)
                  return (
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Title</div>
                        <div className="font-medium text-gray-900 dark:text-white">{task.title}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Priority</div>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            task.priority >= 4
                              ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                              : task.priority >= 3
                              ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                              : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          }`}>
                            {task.priority}/5
                          </span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Due Date</div>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {task.dueDate.toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Duration</div>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {task.estimatedDuration} min
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Category</div>
                        <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded text-xs">
                          {task.category}
                        </span>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <Inbox className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select an email to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailIntegrationHub

