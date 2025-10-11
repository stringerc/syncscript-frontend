'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CelebrationProps {
  show: boolean
  title: string
  message?: string
  type?: 'goal' | 'achievement' | 'streak' | 'milestone'
  onComplete?: () => void
}

export default function Celebration({ 
  show, 
  title, 
  message, 
  type = 'goal',
  onComplete 
}: CelebrationProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; rotation: number; delay: number }>>([])

  useEffect(() => {
    if (show) {
      // Generate confetti particles
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -100 - 20,
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][Math.floor(Math.random() * 6)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2
      }))
      setConfetti(particles)

      // Auto-close after animation
      const timer = setTimeout(() => {
        onComplete?.()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  const getEmoji = () => {
    switch (type) {
      case 'goal': return '🎯'
      case 'achievement': return '🏆'
      case 'streak': return '🔥'
      case 'milestone': return '💎'
      default: return '🎉'
    }
  }

  const getGradient = () => {
    switch (type) {
      case 'goal': return 'from-green-500 to-emerald-600'
      case 'achievement': return 'from-yellow-500 to-orange-600'
      case 'streak': return 'from-red-500 to-orange-600'
      case 'milestone': return 'from-purple-500 to-pink-600'
      default: return 'from-blue-500 to-purple-600'
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

          {/* Confetti */}
          {confetti.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                x: '50vw', 
                y: '50vh', 
                opacity: 1,
                scale: 0,
                rotate: 0
              }}
              animate={{ 
                x: `calc(50vw + ${particle.x}vw)`,
                y: `calc(50vh + ${particle.y}vh)`,
                opacity: 0,
                scale: [0, 1, 1, 0.5],
                rotate: particle.rotation
              }}
              transition={{ 
                duration: 2,
                delay: particle.delay,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ backgroundColor: particle.color }}
            />
          ))}

          {/* Celebration Card */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [10, -5, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="relative z-10 pointer-events-auto"
          >
            <div className={`bg-gradient-to-br ${getGradient()} p-8 rounded-3xl shadow-2xl max-w-md mx-4`}>
              {/* Emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: [0, 1.3, 1],
                  rotate: [180, -10, 0]
                }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-6xl mb-4 text-center"
              >
                {getEmoji()}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white text-center mb-2"
              >
                {title}
              </motion.h2>

              {/* Message */}
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/90 text-center text-lg"
                >
                  {message}
                </motion.p>
              )}

              {/* Sparkle Effects */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      delay: i * 0.1,
                      duration: 1,
                      repeat: 2
                    }}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Rays of Light */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 2],
              opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 1.5 }}
            className={`absolute w-96 h-96 rounded-full bg-gradient-radial ${getGradient().replace('to-', 'via-')} blur-3xl`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

