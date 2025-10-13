'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeToClose } from '@/hooks/useSwipeGesture'

const NAVIGATION_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊', color: 'from-blue-500 to-cyan-500' },
  { href: '/features', label: 'Feature Hub', icon: '🌟', color: 'from-purple-500 to-pink-500' },
  { href: '/polish', label: 'Polish Showcase', icon: '✨', color: 'from-yellow-500 to-orange-500', badge: 'New' },
  { href: '/ai-breakdown', label: 'AI Task Breakdown', icon: '🤖', color: 'from-blue-600 to-indigo-600' },
  { href: '/smart-schedule', label: 'Smart Scheduling', icon: '🧠', color: 'from-cyan-500 to-blue-600' },
  { href: '/calendar-sync', label: 'Calendar Sync', icon: '📅', color: 'from-blue-500 to-indigo-500' },
  { href: '/voice-commands', label: 'Voice Commands', icon: '🎤', color: 'from-pink-500 to-purple-600' },
  { href: '/analytics', label: 'Analytics', icon: '📈', color: 'from-green-500 to-blue-500' },
  { href: '/team-collaboration', label: 'Team Collaboration', icon: '👥', color: 'from-indigo-600 to-purple-600' },
  { href: '/gamification', label: 'Gamification', icon: '🎮', color: 'from-orange-500 to-red-500' },
  { href: '/productivity', label: 'Productivity', icon: '⚡', color: 'from-green-500 to-emerald-500' },
  { href: '/team', label: 'Team Workspace', icon: '🤝', color: 'from-indigo-500 to-purple-500' },
  { href: '/integrations', label: 'Integrations', icon: '🔌', color: 'from-pink-500 to-rose-500' },
  { href: '/settings', label: 'Settings', icon: '⚙️', color: 'from-gray-600 to-gray-800' }
]

export default function GlobalNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const swipeHandlers = useSwipeToClose(() => setIsOpen(false), 'right')

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="spaceship-nav-fab"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          right: 'auto',
          top: 'auto',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
          border: 'none',
          boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          color: 'white',
          transition: 'all 0.3s ease'
        }}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? '✕' : '🚀'}
      </button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="global-navigation fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
              role="dialog"
              aria-label="Navigation menu"
              {...swipeHandlers}
            >
              <div className="p-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Navigation
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Explore all features
                  </p>
                </div>

                <div className="space-y-3">
                  {NAVIGATION_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group block"
                      >
                        <div className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${item.color} hover:shadow-xl transition-all transform hover:scale-105`}>
                          <div className="text-4xl">{item.icon}</div>
                          <div className="flex-1">
                            <div className="font-bold text-white text-lg">
                              {item.label}
                            </div>
                          </div>
                          <div className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <div className="font-bold text-lg mb-1">100 Features</div>
                    <div className="text-sm text-white/80">All production-ready!</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

