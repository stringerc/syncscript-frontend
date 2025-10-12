'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SmartTooltip from './SmartTooltip'
import { soundEffects } from '@/utils/soundEffects'
import { hapticFeedback } from '@/utils/hapticFeedback'
import { ICONS, getIcon } from '@/utils/iconSystem'

export default function PolishShowcase() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [hapticEnabled, setHapticEnabled] = useState(true)
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(null)

  const handleTestSound = (type: Parameters<typeof soundEffects.play>[0]) => {
    if (soundEnabled) {
      soundEffects.play(type)
    }
  }

  const handleTestHaptic = (type: Parameters<typeof hapticFeedback.trigger>[0]) => {
    if (hapticEnabled) {
      hapticFeedback.trigger(type)
    }
  }

  const handleCombinedFeedback = () => {
    if (soundEnabled) soundEffects.play('success')
    if (hapticEnabled) hapticFeedback.trigger('success')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ✨ Polish Showcase
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Experience all the delightful microinteractions and polish features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Microinteractions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🎨 Microinteractions
            </h2>
            
            <div className="space-y-4">
              <button className="btn-microinteraction w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold">
                Button with Ripple Effect
              </button>
              
              <div className="card-interactive bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                <div className="icon-bounce inline-block text-4xl mb-2">🚀</div>
                <h3 className="font-bold text-gray-900 dark:text-white">Hover this card!</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Watch the elevation and icon animation</p>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-6 h-6" />
                  <span className="text-gray-900 dark:text-white">Animated checkbox</span>
                </label>
              </div>
              
              <div className="gradient-shift bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6 rounded-xl text-white font-bold text-center">
                Hover for gradient shift
              </div>
            </div>
          </div>

          {/* Icon System */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🎯 Icon System
            </h2>
            
            <div className="grid grid-cols-6 gap-4">
              {Object.entries(ICONS).slice(0, 24).map(([key, icon]) => (
                <SmartTooltip key={key} content={icon.label} position="auto">
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors cursor-pointer">
                    <span className="text-3xl">{icon.emoji}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 truncate w-full text-center">
                      {key}
                    </span>
                  </div>
                </SmartTooltip>
              ))}
            </div>
          </div>

          {/* Sound Effects */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                🔊 Sound Effects
              </h2>
              <button
                onClick={() => {
                  if (soundEnabled) {
                    soundEffects.disable()
                    setSoundEnabled(false)
                  } else {
                    soundEffects.enable()
                    setSoundEnabled(true)
                  }
                }}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  soundEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    soundEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { type: 'success', label: 'Success', icon: '✅' },
                { type: 'error', label: 'Error', icon: '❌' },
                { type: 'warning', label: 'Warning', icon: '⚠️' },
                { type: 'achievement', label: 'Achievement', icon: '🏆' },
                { type: 'complete', label: 'Complete', icon: '🎉' },
                { type: 'notification', label: 'Notification', icon: '🔔' }
              ].map((sound) => (
                <button
                  key={sound.type}
                  onClick={() => handleTestSound(sound.type as Parameters<typeof soundEffects.play>[0])}
                  disabled={!soundEnabled}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-2xl">{sound.icon}</span>
                  <span>{sound.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Haptic Feedback */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                📳 Haptic Feedback
              </h2>
              <button
                onClick={() => {
                  if (hapticEnabled) {
                    hapticFeedback.disable()
                    setHapticEnabled(false)
                  } else {
                    hapticFeedback.enable()
                    setHapticEnabled(true)
                  }
                }}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  hapticEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    hapticEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {hapticFeedback.isHapticSupported() ? (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: 'light', label: 'Light', icon: '⚪' },
                  { type: 'medium', label: 'Medium', icon: '🟡' },
                  { type: 'heavy', label: 'Heavy', icon: '🔴' },
                  { type: 'success', label: 'Success', icon: '✅' },
                  { type: 'warning', label: 'Warning', icon: '⚠️' },
                  { type: 'error', label: 'Error', icon: '❌' }
                ].map((haptic) => (
                  <button
                    key={haptic.type}
                    onClick={() => handleTestHaptic(haptic.type as Parameters<typeof hapticFeedback.trigger>[0])}
                    disabled={!hapticEnabled}
                    className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-2xl">{haptic.icon}</span>
                    <span>{haptic.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📱</div>
                <p className="text-sm">Haptic feedback not supported on this device</p>
              </div>
            )}
          </div>

          {/* Animation Curves */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              ⏱️ Animation Curves
            </h2>
            
            <div className="space-y-4">
              {[
                { name: 'Standard', class: 'transition-standard', label: 'Balanced motion' },
                { name: 'Smooth', class: 'transition-smooth', label: 'Gentle entrance' },
                { name: 'Bounce', class: 'transition-bounce', label: 'Playful spring' }
              ].map((curve) => (
                <div key={curve.name}>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {curve.name} - {curve.label}
                  </div>
                  <div className="relative h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <motion.div
                      key={selectedAnimation === curve.name ? 'active' : 'inactive'}
                      className={`absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-purple-500 to-blue-500 ${curve.class}`}
                      animate={selectedAnimation === curve.name ? { left: 'calc(100% - 4rem)' } : { left: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <button
                    onClick={() => setSelectedAnimation(curve.name)}
                    className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold"
                  >
                    Test {curve.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Feedback */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🎊 Combined Feedback
            </h2>
            
            <div className="text-center py-8">
              <button
                onClick={handleCombinedFeedback}
                className="px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 glow-effect"
              >
                🎉 Test Everything!
              </button>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                Experience sound + haptic + animation combined
              </p>
            </div>
          </div>

          {/* Illustration Examples */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🎨 Illustration System
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Empty State */}
              <div className="empty-state-illustration">
                <div className="emoji-illustration">📭</div>
                <h3>Empty State</h3>
                <p>Clean, centered, helpful</p>
              </div>
              
              {/* Success State */}
              <div className="empty-state-illustration">
                <div className="illustration-circle emoji-illustration-sm">✅</div>
                <h3>Success State</h3>
                <p>Celebratory and clear</p>
              </div>
              
              {/* Loading State */}
              <div className="empty-state-illustration">
                <div className="emoji-illustration loading-illustration">⏳</div>
                <h3>Loading State</h3>
                <p>Patient and animated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎛️ Polish Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Sound Effects</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Audio feedback for actions</div>
                </div>
                <button
                  onClick={() => {
                    if (soundEnabled) {
                      soundEffects.disable()
                      setSoundEnabled(false)
                    } else {
                      soundEffects.enable()
                      setSoundEnabled(true)
                      soundEffects.play('success')
                    }
                  }}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    soundEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Haptic Feedback</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Vibration on mobile devices</div>
                </div>
                <button
                  onClick={() => {
                    if (hapticEnabled) {
                      hapticFeedback.disable()
                      setHapticEnabled(false)
                    } else {
                      hapticFeedback.enable()
                      setHapticEnabled(true)
                      hapticFeedback.trigger('medium')
                    }
                  }}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    hapticEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      hapticEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  World-Class Polish
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Every interaction is crafted for delight
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

