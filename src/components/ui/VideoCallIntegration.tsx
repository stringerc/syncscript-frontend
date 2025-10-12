/**
 * Feature #73: Video Call Integration
 * Built-in video conferencing with screen sharing
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Video, VideoOff, Mic, MicOff, Monitor, MonitorOff,
  PhoneOff, Users, Settings, MessageCircle, Grid, Maximize
} from 'lucide-react'

interface Participant {
  id: string
  name: string
  avatar: string
  isMuted: boolean
  isVideoOn: boolean
  isSpeaking: boolean
  isScreenSharing: boolean
}

const VideoCallIntegration: React.FC = () => {
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'speaker'>('grid')

  const participants: Participant[] = [
    { id: '1', name: 'Sarah Chen', avatar: '👩‍💻', isMuted: false, isVideoOn: true, isSpeaking: true, isScreenSharing: false },
    { id: '2', name: 'Mike Johnson', avatar: '👨‍🎨', isMuted: false, isVideoOn: true, isSpeaking: false, isScreenSharing: false },
    { id: '3', name: 'Alex Kumar', avatar: '👨‍💼', isMuted: true, isVideoOn: false, isSpeaking: false, isScreenSharing: false },
    { id: '4', name: 'You', avatar: '👤', isMuted, isVideoOn, isSpeaking: false, isScreenSharing }
  ]

  if (!isInCall) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Video className="w-16 h-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Video Calls
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start or join a video call with your team
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setIsInCall(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Video className="w-5 h-5" />
              Start New Call
            </button>
            <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
              <Users className="w-5 h-5" />
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Video Grid */}
      <div className="flex-1 p-4">
        <div className={`h-full grid gap-4 ${
          viewMode === 'grid' 
            ? 'grid-cols-2 grid-rows-2' 
            : 'grid-cols-1 grid-rows-1'
        }`}>
          {participants.map((participant) => (
            <motion.div
              key={participant.id}
              layout
              className="relative bg-gray-800 rounded-xl overflow-hidden"
            >
              {participant.isScreenSharing ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <Monitor className="w-16 h-16 text-gray-500" />
                </div>
              ) : participant.isVideoOn ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                  <span className="text-6xl">{participant.avatar}</span>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <span className="text-6xl opacity-50">{participant.avatar}</span>
                </div>
              )}

              {/* Name Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className={`px-3 py-1 rounded-lg backdrop-blur-sm ${
                  participant.isSpeaking 
                    ? 'bg-green-500 text-white ring-2 ring-green-400'
                    : 'bg-black/50 text-white'
                }`}>
                  <span className="text-sm font-medium">{participant.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!participant.isMuted ? (
                    <div className="p-1.5 bg-black/50 rounded-lg">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="p-1.5 bg-red-500 rounded-lg">
                      <MicOff className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">
              {participants.length} participants
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-colors ${
                isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full transition-colors ${
                !isVideoOn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isVideoOn ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <VideoOff className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-4 rounded-full transition-colors ${
                isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isScreenSharing ? (
                <MonitorOff className="w-6 h-6 text-white" />
              ) : (
                <Monitor className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsInCall(false)}
              className="p-4 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'speaker' : 'grid')}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Grid className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setShowChat(!showChat)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors relative"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCallIntegration

