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

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>

      {/* Floating Action Button */}
      <button
        onClick={handleToggle}
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
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              className="global-navigation"
              style={{
                position: 'fixed',
                top: '0',
                left: '0',
                bottom: '0',
                width: '320px',
                height: '100vh',
                backgroundColor: 'transparent',
                zIndex: '9999',
                boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
                overflow: 'auto',
                transform: 'none',
                margin: '0',
                padding: '0',
                borderRadius: '0',
                border: 'none',
                outline: 'none'
              }}
              role="dialog"
              aria-label="Navigation menu"
              {...swipeHandlers}
            >
              <div className="p-1">
                <div className="mb-1">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-0">
                    Navigation
                  </h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    All features
                  </p>
                </div>

                <div className="space-y-0">
                  {NAVIGATION_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.01 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group block"
                      >
                        <div className={`flex items-center gap-1 p-1 rounded bg-gradient-to-r ${item.color} hover:shadow-lg transition-all transform hover:scale-101`}>
                          <div className="text-lg">{item.icon}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-white text-xs">
                              {item.label}
                            </div>
                          </div>
                          <div className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-1 p-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white">
                  <div className="text-center">
                    <div className="text-lg mb-0">🎉</div>
                    <div className="font-bold text-xs mb-0">100 Features</div>
                    <div className="text-xs text-white/80">Ready!</div>
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

