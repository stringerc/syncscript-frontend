/**
 * Feature #76: Peer Recognition System
 * Kudos and appreciation with badges
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Heart, Star, Zap, Trophy, ThumbsUp, MessageCircle, Send } from 'lucide-react'

interface Recognition {
  id: string
  from: string
  to: string
  badge: string
  message: string
  timestamp: Date
  reactions: number
}

const badges = [
  { id: 'helper', icon: '🤝', label: 'Team Player', color: 'bg-blue-500' },
  { id: 'innovator', icon: '💡', label: 'Innovator', color: 'bg-purple-500' },
  { id: 'rockstar', icon: '🌟', label: 'Rockstar', color: 'bg-yellow-500' },
  { id: 'mentor', icon: '📚', label: 'Mentor', color: 'bg-green-500' },
  { id: 'speedster', icon: '⚡', label: 'Speed Demon', color: 'bg-orange-500' },
  { id: 'quality', icon: '✨', label: 'Quality Champ', color: 'bg-pink-500' }
]

const PeerRecognitionSystem: React.FC = () => {
  const [recognitions, setRecognitions] = useState<Recognition[]>([
    {
      id: '1',
      from: 'Sarah Chen',
      to: 'Mike Johnson',
      badge: '💡',
      message: 'Great idea on the new UI design! Really innovative approach.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      reactions: 5
    }
  ])
  const [showSendModal, setShowSendModal] = useState(false)

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Peer Recognition</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Celebrate your teammates</p>
          </div>
        </div>
        <button
          onClick={() => setShowSendModal(true)}
          className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        >
          <Heart className="w-4 h-4" />
          Send Recognition
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recognitions.map(rec => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6"
          >
            <div className="text-4xl mb-4">{rec.badge}</div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{rec.message}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">{rec.from}</span> → <span className="font-medium">{rec.to}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Heart className="w-4 h-4" />
                <span>{rec.reactions}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PeerRecognitionSystem

