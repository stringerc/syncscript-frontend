'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const NAVIGATION_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊', color: 'from-blue-500 to-cyan-500' },
  { href: '/features', label: 'Feature Hub', icon: '🌟', color: 'from-purple-500 to-pink-500' },
  { href: '/gamification', label: 'Gamification', icon: '🎮', color: 'from-orange-500 to-red-500' },
  { href: '/productivity', label: 'Productivity', icon: '⚡', color: 'from-green-500 to-emerald-500' },
  { href: '/team', label: 'Team', icon: '👥', color: 'from-indigo-500 to-purple-500' },
  { href: '/integrations', label: 'Integrations', icon: '🔌', color: 'from-pink-500 to-rose-500' },
  { href: '/settings', label: 'Settings', icon: '⚙️', color: 'from-gray-600 to-gray-800' }
]

export default function GlobalNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center justify-center text-3xl"
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl z-40 overflow-y-auto"
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

