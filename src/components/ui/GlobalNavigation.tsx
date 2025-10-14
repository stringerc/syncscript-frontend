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
              <div style={{ padding: '8px', height: '100vh', overflow: 'hidden' }}>
                <div style={{ marginBottom: '8px' }}>
                  <h2 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#374151' }}>
                    Navigation
                  </h2>
                  <p style={{ fontSize: '12px', margin: '0', color: '#6B7280' }}>
                    Features
                  </p>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '4px',
                  height: 'calc(100vh - 80px)',
                  overflow: 'hidden'
                }}>
                  {NAVIGATION_ITEMS.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        background: `linear-gradient(135deg, ${item.color.includes('blue') ? '#3B82F6' : item.color.includes('purple') ? '#8B5CF6' : item.color.includes('green') ? '#10B981' : item.color.includes('pink') ? '#EC4899' : item.color.includes('orange') ? '#F59E0B' : '#6B7280'}, ${item.color.includes('blue') ? '#1D4ED8' : item.color.includes('purple') ? '#7C3AED' : item.color.includes('green') ? '#059669' : item.color.includes('pink') ? '#DB2777' : item.color.includes('orange') ? '#D97706' : '#4B5563'})`,
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '500',
                        height: '32px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <span style={{ fontSize: '14px' }}>{item.icon}</span>
                      <span style={{ flex: 1, fontSize: '11px', lineHeight: '1.2' }}>{item.label}</span>
                    </Link>
                  ))}
                </div>

                <div style={{ 
                  marginTop: '8px', 
                  padding: '8px', 
                  background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', 
                  borderRadius: '6px', 
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '12px', margin: '0' }}>🎉</div>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', margin: '0' }}>100 Features</div>
                  <div style={{ fontSize: '10px', margin: '0', opacity: '0.8' }}>Ready!</div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

