/**
 * Feature #72: Real-time Team Chat
 * Live messaging with channels and direct messages
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, Send, Hash, Lock, Users, Search,
  Smile, Paperclip, MoreVertical, Pin, Bell, BellOff
} from 'lucide-react'

interface Message {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  timestamp: Date
  channelId: string
  reactions: { emoji: string; users: string[] }[]
  isPinned?: boolean
  attachments?: { name: string; url: string; type: string }[]
}

interface Channel {
  id: string
  name: string
  description: string
  type: 'public' | 'private'
  memberCount: number
  unreadCount: number
  lastMessage?: Message
  isMuted: boolean
}

const channels: Channel[] = [
  {
    id: 'general',
    name: 'general',
    description: 'Team-wide announcements and discussions',
    type: 'public',
    memberCount: 24,
    unreadCount: 3,
    isMuted: false
  },
  {
    id: 'dev',
    name: 'development',
    description: 'Engineering discussions and code reviews',
    type: 'public',
    memberCount: 8,
    unreadCount: 12,
    isMuted: false
  },
  {
    id: 'design',
    name: 'design',
    description: 'Design feedback and creative collaboration',
    type: 'private',
    memberCount: 5,
    unreadCount: 0,
    isMuted: false
  }
]

const TeamChatHub: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel>(channels[0])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Chen',
      userAvatar: '👩‍💻',
      content: 'Hey team! Just pushed the new features to staging. Ready for review!',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      channelId: 'general',
      reactions: [{ emoji: '👍', users: ['2', '3'] }]
    },
    {
      id: '2',
      userId: '2',
      userName: 'Mike Johnson',
      userAvatar: '👨‍🎨',
      content: 'Awesome! I&apos;ll test it this afternoon.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      channelId: 'general',
      reactions: []
    }
  ])
  const [messageInput, setMessageInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const channelMessages = messages.filter(m => m.channelId === selectedChannel.id)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [channelMessages])

  const sendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      userAvatar: '👤',
      content: messageInput,
      timestamp: new Date(),
      channelId: selectedChannel.id,
      reactions: []
    }

    setMessages(prev => [...prev, newMessage])
    setMessageInput('')
  }

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.emoji === emoji)
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.map(r =>
              r.emoji === emoji
                ? { ...r, users: [...r.users, 'current-user'] }
                : r
            )
          }
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, users: ['current-user'] }]
          }
        }
      }
      return msg
    }))
  }

  const toggleMute = (channelId: string) => {
    // Update channel mute status
    console.log(`Toggle mute for ${channelId}`)
  }

  const quickReactions = ['👍', '❤️', '😂', '🎉', '🚀', '👀']

  return (
    <div className="h-full flex bg-gray-50 dark:bg-gray-900">
      {/* Channel Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="font-bold text-gray-900 dark:text-white">Team Chat</h2>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-auto p-2">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 mb-2">
            CHANNELS
          </div>
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel)}
              className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                selectedChannel.id === channel.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {channel.type === 'private' ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Hash className="w-4 h-4" />
                )}
                <span className="font-medium text-sm">{channel.name}</span>
                {channel.unreadCount > 0 && (
                  <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {channel.unreadCount}
                  </span>
                )}
                {channel.isMuted && (
                  <BellOff className="w-3 h-3 ml-auto text-gray-400" />
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {channel.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Hash className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {selectedChannel.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedChannel.description} • {selectedChannel.memberCount} members
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleMute(selectedChannel.id)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {selectedChannel.isMuted ? (
                  <BellOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <AnimatePresence>
            {channelMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 group"
              >
                <div className="text-2xl flex-shrink-0">{message.userAvatar}</div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      {message.userName}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.isPinned && (
                      <Pin className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 text-sm">
                    {message.content}
                  </div>
                  
                  {/* Reactions */}
                  {message.reactions.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {message.reactions.map((reaction, i) => (
                        <button
                          key={i}
                          onClick={() => addReaction(message.id, reaction.emoji)}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs"
                        >
                          <span>{reaction.emoji}</span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {reaction.users.length}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Quick Reactions (show on hover) */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                    <div className="flex gap-1">
                      {quickReactions.slice(0, 3).map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => addReaction(message.id, emoji)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-sm"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex items-end gap-2"
          >
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Smile className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder={`Message #${selectedChannel.name}`}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Members Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
          Members ({selectedChannel.memberCount})
        </h3>
        <div className="space-y-2">
          {['👩‍💻 Sarah Chen', '👨‍🎨 Mike Johnson', '👨‍💼 Alex Kumar', '👩‍⚖️ Emma Davis'].map((member, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
            >
              <div className="relative">
                <span className="text-2xl">{member.split(' ')[0]}</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
              </div>
              <span className="text-sm text-gray-900 dark:text-white">
                {member.split(' ').slice(1).join(' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamChatHub

