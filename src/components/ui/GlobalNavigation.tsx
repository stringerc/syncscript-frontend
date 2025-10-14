'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeToClose } from '@/hooks/useSwipeGesture'

const FEATURE_CATEGORIES = [
  {
    title: 'Core Features',
    features: [
      { href: '/dashboard', label: 'Dashboard', icon: '📊', description: 'Your productivity command center' },
      { href: '/features', label: 'Feature Hub', icon: '🌟', description: 'Explore all available features' },
      { href: '/ai-breakdown', label: 'AI Task Breakdown', icon: '🤖', description: 'Intelligent task analysis' },
      { href: '/smart-schedule', label: 'Smart Scheduling', icon: '🧠', description: 'AI-powered time optimization' }
    ]
  },
  {
    title: 'Productivity Tools',
    features: [
      { href: '/calendar-sync', label: 'Calendar Sync', icon: '📅', description: 'Seamless calendar integration' },
      { href: '/voice-commands', label: 'Voice Commands', icon: '🎤', description: 'Hands-free productivity' },
      { href: '/analytics', label: 'Analytics', icon: '📈', description: 'Deep insights and reports' },
      { href: '/team-collaboration', label: 'Team Collaboration', icon: '👥', description: 'Work together seamlessly' }
    ]
  },
  {
    title: 'Advanced Features',
    features: [
      { href: '/gamification', label: 'Gamification', icon: '🎮', description: 'Make work fun and engaging' },
      { href: '/productivity', label: 'Productivity', icon: '⚡', description: 'Boost your efficiency' },
      { href: '/team', label: 'Team Workspace', icon: '🤝', description: 'Collaborative workspace' },
      { href: '/integrations', label: 'Integrations', icon: '🔌', description: 'Connect your favorite tools' }
    ]
  },
  {
    title: 'Settings & More',
    features: [
      { href: '/settings', label: 'Settings', icon: '⚙️', description: 'Customize your experience' },
      { href: '/polish', label: 'Polish Showcase', icon: '✨', description: 'See our beautiful design', badge: 'New' }
    ]
  }
]

export default function GlobalNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const swipeHandlers = useSwipeToClose(() => setIsOpen(false), 'right')

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Stunning Spaceship Button */}
      <button
        onClick={handleToggle}
        className="spaceship-nav-fab"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? '✕' : '🚀'}
      </button>

      {/* Stunning Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="modal-backdrop"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
                zIndex: 9998
              }}
              aria-hidden="true"
            />

            {/* Stunning Menu Panel */}
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 200,
                mass: 0.8
              }}
              className="global-navigation"
              role="dialog"
              aria-label="Navigation menu"
              {...swipeHandlers}
            >
              <div className="menu-content-container">
                {/* Stunning Header */}
                <div className="menu-header">
                  <h2 className="menu-title">Feature Command Center</h2>
                  <p className="menu-subtitle">Your gateway to productivity</p>
                </div>

                {/* Feature Categories */}
                <div className="feature-categories">
                  {FEATURE_CATEGORIES.map((category, categoryIndex) => (
                    <div key={category.title} className="category-section">
                      <h3 className="category-title">{category.title}</h3>
                      <div className="features-grid">
                        {category.features.map((feature, featureIndex) => (
                          <motion.div
                            key={feature.href}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ 
                              delay: (categoryIndex * 0.1) + (featureIndex * 0.05),
                              duration: 0.4,
                              ease: "easeOut"
                            }}
                          >
                            <Link
                              href={feature.href}
                              onClick={() => setIsOpen(false)}
                              className="feature-item"
                            >
                              <div className="feature-icon">
                                {feature.icon}
                              </div>
                              <div className="feature-content">
                                <div className="feature-name">{feature.label}</div>
                                <div className="feature-description">{feature.description}</div>
                              </div>
                              <div className="feature-arrow">→</div>
                              {feature.badge && (
                                <div className="feature-badge">{feature.badge}</div>
                              )}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Achievement Section */}
                <div className="achievement-section">
                  <div className="achievement-icon">🎉</div>
                  <div className="achievement-title">100 Features Ready!</div>
                  <div className="achievement-description">
                    Experience the most comprehensive productivity platform ever built
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

