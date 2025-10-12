'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CalendarProvider {
  id: string
  name: string
  icon: string
  color: string
  connected: boolean
  lastSync?: Date
  eventsCount?: number
}

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  calendar: string
  type: 'event' | 'task' | 'synced'
  synced: boolean
  location?: string
  attendees?: string[]
}

export default function CalendarSync() {
  const [providers, setProviders] = useState<CalendarProvider[]>([
    { id: 'google', name: 'Google Calendar', icon: '📅', color: 'from-blue-500 to-blue-600', connected: false },
    { id: 'outlook', name: 'Outlook Calendar', icon: '📧', color: 'from-blue-600 to-indigo-600', connected: false },
    { id: 'apple', name: 'Apple Calendar', icon: '🍎', color: 'from-gray-700 to-gray-800', connected: false },
    { id: 'notion', name: 'Notion', icon: '📓', color: 'from-gray-800 to-black', connected: false }
  ])

  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedProvider, setSelectedProvider] = useState<CalendarProvider | null>(null)
  const [syncInProgress, setSyncInProgress] = useState(false)
  const [syncMode, setSyncMode] = useState<'one-way' | 'two-way'>('two-way')
  const [autoSync, setAutoSync] = useState(true)

  const connectProvider = async (providerId: string) => {
    setSyncInProgress(true)
    
    // Simulate OAuth connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setProviders(providers.map(p => 
      p.id === providerId 
        ? { ...p, connected: true, lastSync: new Date(), eventsCount: Math.floor(Math.random() * 50) + 10 }
        : p
    ))
    
    // Generate demo events
    generateDemoEvents(providerId)
    
    setSyncInProgress(false)
  }

  const disconnectProvider = (providerId: string) => {
    setProviders(providers.map(p => 
      p.id === providerId 
        ? { ...p, connected: false, lastSync: undefined, eventsCount: 0 }
        : p
    ))
    
    // Remove events from this provider
    setEvents(events.filter(e => e.calendar !== providerId))
  }

  const generateDemoEvents = (providerId: string) => {
    const newEvents: CalendarEvent[] = []
    const now = new Date()
    
    for (let i = 0; i < 8; i++) {
      const start = new Date(now)
      start.setDate(start.getDate() + i)
      start.setHours(9 + (i % 8), 0, 0, 0)
      
      const end = new Date(start)
      end.setHours(start.getHours() + 1)
      
      newEvents.push({
        id: `${providerId}-event-${i}`,
        title: getRandomEventTitle(),
        start,
        end,
        calendar: providerId,
        type: Math.random() > 0.5 ? 'event' : 'task',
        synced: true,
        location: Math.random() > 0.5 ? 'Virtual' : undefined,
        attendees: Math.random() > 0.5 ? ['user@example.com'] : undefined
      })
    }
    
    setEvents([...events, ...newEvents])
  }

  const getRandomEventTitle = () => {
    const titles = [
      'Team Standup',
      'Project Review',
      'Client Meeting',
      'Design Review',
      'Sprint Planning',
      'Code Review',
      'Department Sync',
      'Quarterly Planning'
    ]
    return titles[Math.floor(Math.random() * titles.length)]
  }

  const syncNow = async (providerId?: string) => {
    setSyncInProgress(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (providerId) {
      setProviders(providers.map(p => 
        p.id === providerId ? { ...p, lastSync: new Date() } : p
      ))
    } else {
      setProviders(providers.map(p => 
        p.connected ? { ...p, lastSync: new Date() } : p
      ))
    }
    
    setSyncInProgress(false)
  }

  const connectedCount = providers.filter(p => p.connected).length
  const totalEvents = events.length
  const syncedEvents = events.filter(e => e.synced).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                📅 Calendar Integration
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Connect your calendars and sync tasks bidirectionally
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{connectedCount}</div>
              <div className="text-sm text-blue-100">Connected</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{totalEvents}</div>
              <div className="text-sm text-green-100">Total Events</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{syncedEvents}</div>
              <div className="text-sm text-purple-100">Synced</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{syncMode === 'two-way' ? '2-Way' : '1-Way'}</div>
              <div className="text-sm text-orange-100">Sync Mode</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar Providers */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🔌 Calendar Providers
            </h2>

            <div className="space-y-4">
              {providers.map((provider) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`border-2 rounded-xl p-6 transition-all ${
                    provider.connected
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${provider.color} flex items-center justify-center text-3xl`}>
                        {provider.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {provider.name}
                        </h3>
                        {provider.connected && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {provider.eventsCount} events
                            {provider.lastSync && (
                              <span className="ml-2">
                                • Synced {new Date(provider.lastSync).toLocaleTimeString()}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {provider.connected ? (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        ✓ Connected
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-bold rounded-full">
                        Not Connected
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {!provider.connected ? (
                      <button
                        onClick={() => connectProvider(provider.id)}
                        disabled={syncInProgress}
                        className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                          syncInProgress
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                        }`}
                      >
                        {syncInProgress ? '⚙️ Connecting...' : '🔗 Connect'}
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => syncNow(provider.id)}
                          disabled={syncInProgress}
                          className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                        >
                          🔄 Sync Now
                        </button>
                        <button
                          onClick={() => disconnectProvider(provider.id)}
                          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                        >
                          Disconnect
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sync Settings */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ⚙️ Sync Settings
              </h2>

              <div className="space-y-6">
                {/* Sync Mode */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Sync Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSyncMode('one-way')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        syncMode === 'one-way'
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="text-2xl mb-2">➡️</div>
                      <div className="font-semibold text-gray-900 dark:text-white">One-Way</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Calendar → Tasks</div>
                    </button>
                    <button
                      onClick={() => setSyncMode('two-way')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        syncMode === 'two-way'
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="text-2xl mb-2">🔄</div>
                      <div className="font-semibold text-gray-900 dark:text-white">Two-Way</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Bidirectional</div>
                    </button>
                  </div>
                </div>

                {/* Auto Sync */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Auto Sync</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Sync every 15 minutes</div>
                  </div>
                  <button
                    onClick={() => setAutoSync(!autoSync)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      autoSync ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        autoSync ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Sync All Button */}
                <button
                  onClick={() => syncNow()}
                  disabled={syncInProgress || connectedCount === 0}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    syncInProgress || connectedCount === 0
                      ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg'
                  }`}
                >
                  {syncInProgress ? '⚙️ Syncing...' : '🚀 Sync All Calendars'}
                </button>
              </div>
            </div>

            {/* Recent Syncs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                📊 Sync Activity
              </h3>
              
              {connectedCount > 0 ? (
                <div className="space-y-3">
                  {providers
                    .filter(p => p.connected)
                    .map((provider) => (
                      <div key={provider.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl">{provider.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            {provider.name}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {provider.eventsCount} events synced
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {provider.lastSync && new Date(provider.lastSync).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">🔌</div>
                  <p className="text-sm">Connect a calendar to see sync activity</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Synced Events */}
        {events.length > 0 && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📆 Synced Events
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.slice(0, 9).map((event) => {
                const provider = providers.find(p => p.id === event.calendar)
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${provider?.color} flex items-center justify-center text-xl`}>
                        {provider?.icon}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.type === 'event' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h4>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div>🕐 {event.start.toLocaleString()}</div>
                      {event.location && <div>📍 {event.location}</div>}
                      {event.attendees && <div>👥 {event.attendees.length} attendees</div>}
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {events.length > 9 && (
              <div className="mt-4 text-center">
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold">
                  View All {events.length} Events
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

