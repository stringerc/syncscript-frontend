/**
 * Feature #69: Advanced Search & Filters
 * Powerful search with natural language and saved filters
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Filter, Save, Star, Clock, Tag,
  Calendar, User, Zap, CheckSquare, Trash2
} from 'lucide-react'

interface SearchFilter {
  id: string
  name: string
  query: string
  filters: {
    status?: string[]
    priority?: number[]
    assignee?: string[]
    tags?: string[]
    dateRange?: { start: Date; end: Date }
  }
  saved: boolean
  lastUsed: Date
}

interface SearchResult {
  id: string
  type: 'task' | 'project' | 'note' | 'meeting'
  title: string
  description: string
  matches: string[]
  relevance: number
  metadata: Record<string, string>
}

const AdvancedSearchHub: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [savedFilters, setSavedFilters] = useState<SearchFilter[]>([
    {
      id: '1',
      name: 'My High Priority Tasks',
      query: 'priority:high assignee:me',
      filters: { priority: [4, 5] },
      saved: true,
      lastUsed: new Date()
    },
    {
      id: '2',
      name: 'This Week\'s Meetings',
      query: 'type:meeting this week',
      filters: {},
      saved: true,
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ])
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<SearchFilter['filters']>({})

  const parseNaturalLanguage = (text: string): SearchFilter['filters'] => {
    const filters: SearchFilter['filters'] = {}

    // Priority
    if (text.includes('high priority') || text.includes('urgent')) {
      filters.priority = [4, 5]
    } else if (text.includes('low priority')) {
      filters.priority = [1, 2]
    }

    // Status
    if (text.includes('completed') || text.includes('done')) {
      filters.status = ['completed']
    } else if (text.includes('in progress') || text.includes('active')) {
      filters.status = ['in-progress']
    } else if (text.includes('not started') || text.includes('todo')) {
      filters.status = ['not-started']
    }

    // Time
    if (text.includes('today')) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      filters.dateRange = { start: today, end: tomorrow }
    } else if (text.includes('this week')) {
      const today = new Date()
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 7)
      filters.dateRange = { start: startOfWeek, end: endOfWeek }
    }

    // Assignee
    if (text.includes('assignee:me') || text.includes('my tasks')) {
      filters.assignee = ['current-user']
    }

    return filters
  }

  const performSearch = (searchQuery: string) => {
    const parsedFilters = parseNaturalLanguage(searchQuery)
    setActiveFilters(parsedFilters)

    // Mock search results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        type: 'task',
        title: 'Complete Q4 Financial Report',
        description: 'Prepare comprehensive financial analysis for Q4 board meeting',
        matches: ['financial', 'report', 'Q4'],
        relevance: 95,
        metadata: { priority: '5', status: 'in-progress', assignee: 'Sarah' }
      },
      {
        id: '2',
        type: 'project',
        title: 'Website Redesign Project',
        description: 'Complete overhaul of company website with new branding',
        matches: ['website', 'redesign'],
        relevance: 88,
        metadata: { status: 'active', tasks: '24', completion: '65%' }
      },
      {
        id: '3',
        type: 'meeting',
        title: 'Weekly Team Sync',
        description: 'Regular team standup and progress review',
        matches: ['team', 'meeting'],
        relevance: 75,
        metadata: { date: 'Tomorrow 2pm', attendees: '5' }
      }
    ]

    setResults(mockResults.sort((a, b) => b.relevance - a.relevance))
  }

  const saveCurrentFilter = () => {
    const filter: SearchFilter = {
      id: `filter-${Date.now()}`,
      name: query || 'Untitled Filter',
      query,
      filters: activeFilters,
      saved: true,
      lastUsed: new Date()
    }
    setSavedFilters(prev => [filter, ...prev])
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      case 'project': return <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      case 'meeting': return <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
      case 'note': return <Tag className="w-5 h-5 text-orange-600 dark:text-orange-400" />
      default: return <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    }
  }

  return (
    <div className="h-full flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar: Saved Filters */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Saved Filters</h3>
        <div className="space-y-2">
          {savedFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => {
                setQuery(filter.query)
                performSearch(filter.query)
              }}
              className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {filter.name}
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {filter.query}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Used {filter.lastUsed.toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Advanced Search
            </h2>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && performSearch(query)}
                placeholder='Try: "high priority tasks assigned to me" or "meetings this week"'
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {query && (
                <button
                  onClick={() => saveCurrentFilter()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                  title="Save Filter"
                >
                  <Star className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                showFilters
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
            <button
              onClick={() => performSearch(query)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Active Filters Display */}
          {Object.keys(activeFilters).length > 0 && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {activeFilters.priority && (
                <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full">
                  Priority: {activeFilters.priority.join(', ')}
                </span>
              )}
              {activeFilters.status && (
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full">
                  Status: {activeFilters.status.join(', ')}
                </span>
              )}
              {activeFilters.assignee && (
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full">
                  Assignee: {activeFilters.assignee.join(', ')}
                </span>
              )}
              <button
                onClick={() => setActiveFilters({})}
                className="text-xs text-red-600 dark:text-red-400 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-auto p-6">
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map(result => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {result.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                          {result.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {result.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                        {Object.entries(result.metadata).map(([key, value]) => (
                          <span key={key}>
                            <span className="font-medium">{key}:</span> {value}
                          </span>
                        ))}
                      </div>
                      {result.matches.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {result.matches.map(match => (
                            <span
                              key={match}
                              className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded"
                            >
                              {match}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                        Relevance
                      </div>
                      <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {result.relevance}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Start searching</p>
              <p className="text-sm">
                Try natural language like "high priority tasks for this week"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdvancedSearchHub

