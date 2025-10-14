'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BriefingSettings } from '../../types/briefing'

interface BriefingSettingsProps {
  isOpen: boolean
  onClose: () => void
  settings: BriefingSettings
  onSave: (settings: BriefingSettings) => void
}

export default function BriefingSettings({ 
  isOpen, 
  onClose, 
  settings, 
  onSave 
}: BriefingSettingsProps) {
  const [localSettings, setLocalSettings] = useState<BriefingSettings>(settings)
  const [activeTab, setActiveTab] = useState<'morning' | 'evening' | 'delivery'>('morning')
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setLocalSettings(settings)
    setHasChanges(false)
  }, [settings])

  const handleSettingChange = (path: string, value: any) => {
    setLocalSettings(prev => {
      const newSettings = { ...prev }
      const keys = path.split('.')
      let current = newSettings as any
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      
      return newSettings
    })
    setHasChanges(true)
  }

  const handleSave = () => {
    onSave(localSettings)
    setHasChanges(false)
  }

  const tabs = [
    { id: 'morning', label: 'Morning Brief', icon: '🌅' },
    { id: 'evening', label: 'Evening Brief', icon: '🌙' },
    { id: 'delivery', label: 'Delivery', icon: '📱' }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            aria-hidden="true"
          />

          {/* Settings Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              mass: 0.8
            }}
            className="fixed inset-4 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-5xl max-h-full overflow-hidden">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
                        ⚙️
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-white">Briefing Settings</h1>
                        <p className="text-white/80">Customize your daily briefs</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 px-6 py-4 text-center transition-colors ${
                        activeTab === tab.id
                          ? 'bg-white/10 text-white border-b-2 border-blue-400'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>{tab.icon}</span>
                        <span className="font-medium">{tab.label}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar">
                  
                  {/* Morning Brief Settings */}
                  {activeTab === 'morning' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      {/* Enable/Disable */}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <h3 className="text-lg font-semibold text-white">Enable Morning Brief</h3>
                          <p className="text-white/70 text-sm">Receive a daily morning summary</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localSettings.morningBrief.enabled}
                            onChange={(e) => handleSettingChange('morningBrief.enabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>

                      {/* Frequency */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Frequency</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'daily', label: 'Daily' },
                            { value: 'weekdays', label: 'Weekdays' },
                            { value: 'custom', label: 'Custom' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleSettingChange('morningBrief.frequency', option.value)}
                              className={`p-3 rounded-lg transition-colors ${
                                localSettings.morningBrief.frequency === option.value
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white/10 text-white/70 hover:bg-white/20'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Time */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Delivery Time</h3>
                        <div className="flex items-center space-x-4">
                          <input
                            type="time"
                            value={localSettings.morningBrief.deliveryTime}
                            onChange={(e) => handleSettingChange('morningBrief.deliveryTime', e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                          />
                          <span className="text-white/70 text-sm">Your timezone: {localSettings.timezone}</span>
                        </div>
                      </div>

                      {/* Content Modules */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Content Modules</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(localSettings.morningBrief.contentModules).map(([key, value]) => (
                            <label key={key} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => handleSettingChange(`morningBrief.contentModules.${key}`, e.target.checked)}
                                className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500/20"
                              />
                              <span className="text-white text-sm capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Tone */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Tone</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'professional', label: 'Professional' },
                            { value: 'casual', label: 'Casual' },
                            { value: 'motivational', label: 'Motivational' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleSettingChange('morningBrief.tone', option.value)}
                              className={`p-3 rounded-lg transition-colors ${
                                localSettings.morningBrief.tone === option.value
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white/10 text-white/70 hover:bg-white/20'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Evening Brief Settings */}
                  {activeTab === 'evening' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      {/* Enable/Disable */}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <h3 className="text-lg font-semibold text-white">Enable Evening Brief</h3>
                          <p className="text-white/70 text-sm">Receive a daily evening summary</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localSettings.eveningBrief.enabled}
                            onChange={(e) => handleSettingChange('eveningBrief.enabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>

                      {/* Frequency */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Frequency</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'daily', label: 'Daily' },
                            { value: 'weekdays', label: 'Weekdays' },
                            { value: 'custom', label: 'Custom' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleSettingChange('eveningBrief.frequency', option.value)}
                              className={`p-3 rounded-lg transition-colors ${
                                localSettings.eveningBrief.frequency === option.value
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white/10 text-white/70 hover:bg-white/20'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Time */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Delivery Time</h3>
                        <div className="flex items-center space-x-4">
                          <input
                            type="time"
                            value={localSettings.eveningBrief.deliveryTime}
                            onChange={(e) => handleSettingChange('eveningBrief.deliveryTime', e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                          />
                          <span className="text-white/70 text-sm">Your timezone: {localSettings.timezone}</span>
                        </div>
                      </div>

                      {/* Content Modules */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Content Modules</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(localSettings.eveningBrief.contentModules).map(([key, value]) => (
                            <label key={key} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => handleSettingChange(`eveningBrief.contentModules.${key}`, e.target.checked)}
                                className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500/20"
                              />
                              <span className="text-white text-sm capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Tone */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Tone</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'professional', label: 'Professional' },
                            { value: 'casual', label: 'Casual' },
                            { value: 'celebratory', label: 'Celebratory' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleSettingChange('eveningBrief.tone', option.value)}
                              className={`p-3 rounded-lg transition-colors ${
                                localSettings.eveningBrief.tone === option.value
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white/10 text-white/70 hover:bg-white/20'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Delivery Settings */}
                  {activeTab === 'delivery' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      {/* Morning Brief Delivery Channels */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Morning Brief Delivery</h3>
                        <div className="space-y-3">
                          {[
                            { value: 'in-app', label: 'In-App', description: 'Show brief in SyncScript app' },
                            { value: 'email', label: 'Email', description: 'Send brief to your email' },
                            { value: 'slack', label: 'Slack', description: 'Post brief to Slack channel' }
                          ].map((channel) => (
                            <label key={channel.value} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={localSettings.morningBrief.deliveryChannels.includes(channel.value as any)}
                                onChange={(e) => {
                                  const channels = localSettings.morningBrief.deliveryChannels
                                  if (e.target.checked) {
                                    handleSettingChange('morningBrief.deliveryChannels', [...channels, channel.value])
                                  } else {
                                    handleSettingChange('morningBrief.deliveryChannels', channels.filter(c => c !== channel.value))
                                  }
                                }}
                                className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500/20"
                              />
                              <div>
                                <span className="text-white text-sm font-medium">{channel.label}</span>
                                <p className="text-white/70 text-xs">{channel.description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Evening Brief Delivery Channels */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Evening Brief Delivery</h3>
                        <div className="space-y-3">
                          {[
                            { value: 'in-app', label: 'In-App', description: 'Show brief in SyncScript app' },
                            { value: 'email', label: 'Email', description: 'Send brief to your email' },
                            { value: 'slack', label: 'Slack', description: 'Post brief to Slack channel' }
                          ].map((channel) => (
                            <label key={channel.value} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={localSettings.eveningBrief.deliveryChannels.includes(channel.value as any)}
                                onChange={(e) => {
                                  const channels = localSettings.eveningBrief.deliveryChannels
                                  if (e.target.checked) {
                                    handleSettingChange('eveningBrief.deliveryChannels', [...channels, channel.value])
                                  } else {
                                    handleSettingChange('eveningBrief.deliveryChannels', channels.filter(c => c !== channel.value))
                                  }
                                }}
                                className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500/20"
                              />
                              <div>
                                <span className="text-white text-sm font-medium">{channel.label}</span>
                                <p className="text-white/70 text-xs">{channel.description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Global Settings */}
                      <div className="p-4 bg-white/5 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Global Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-white text-sm font-medium mb-2">Timezone</label>
                            <select
                              value={localSettings.timezone}
                              onChange={(e) => handleSettingChange('timezone', e.target.value)}
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                            >
                              <option value="America/New_York">Eastern Time</option>
                              <option value="America/Chicago">Central Time</option>
                              <option value="America/Denver">Mountain Time</option>
                              <option value="America/Los_Angeles">Pacific Time</option>
                              <option value="Europe/London">London</option>
                              <option value="Europe/Paris">Paris</option>
                              <option value="Asia/Tokyo">Tokyo</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-white text-sm font-medium mb-2">Language</label>
                            <select
                              value={localSettings.language}
                              onChange={(e) => handleSettingChange('language', e.target.value)}
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                            >
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-white/5 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/70">
                      {hasChanges ? 'You have unsaved changes' : 'All changes saved'}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all transform hover:scale-105"
                      >
                        Save Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
