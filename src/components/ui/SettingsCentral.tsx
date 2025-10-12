'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { setThemeMode, getThemeSettings } from '@/utils/platformEssentials'
import { getCurrentLanguage, setLanguage, SUPPORTED_LANGUAGES } from '@/utils/platformEssentials'
import { getAccessibilitySettings, updateAccessibilitySettings } from '@/utils/platformEssentials'

export default function SettingsCentral() {
  const [activeSection, setActiveSection] = useState<'appearance' | 'language' | 'accessibility' | 'privacy' | 'security' | 'integrations' | 'advanced'>('appearance')
  const [themeSettings, setThemeSettingsState] = useState(getThemeSettings())
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage())
  const [a11ySettings, setA11ySettings] = useState(getAccessibilitySettings())

  const sections = [
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'language', label: 'Language', icon: '🌐' },
    { id: 'accessibility', label: 'Accessibility', icon: '♿' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'security', label: 'Security', icon: '🔐' },
    { id: 'integrations', label: 'Integrations', icon: '🔌' },
    { id: 'advanced', label: 'Advanced', icon: '⚙️' }
  ]

  const handleThemeChange = (mode: 'light' | 'dark' | 'auto') => {
    setThemeMode(mode)
    setThemeSettingsState({ ...themeSettings, mode })
  }

  const handleLanguageChange = (lang: typeof currentLang) => {
    setLanguage(lang)
    setCurrentLang(lang)
  }

  const handleA11yToggle = (setting: keyof typeof a11ySettings) => {
    const updated = { ...a11ySettings, [setting]: !a11ySettings[setting] }
    updateAccessibilitySettings(updated)
    setA11ySettings(updated)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-4">⚙️ Settings</h1>
          <p className="text-xl text-gray-300">Customize your SyncScript experience</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg sticky top-6">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as typeof activeSection)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-2xl">{section.icon}</span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              {activeSection === 'appearance' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Theme Mode
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'light', label: 'Light', icon: '☀️' },
                        { id: 'dark', label: 'Dark', icon: '🌙' },
                        { id: 'auto', label: 'Auto', icon: '🔄' }
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handleThemeChange(theme.id as 'light' | 'dark' | 'auto')}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            themeSettings.mode === theme.id
                              ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                          }`}
                        >
                          <div className="text-4xl mb-2">{theme.icon}</div>
                          <div className="font-semibold text-gray-900 dark:text-white">{theme.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'language' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Language & Region</h2>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Select Language
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                            currentLang === lang.code
                              ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                          }`}
                        >
                          <span className="text-4xl">{lang.flag}</span>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900 dark:text-white">{lang.nativeName}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{lang.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'accessibility' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Accessibility</h2>
                  
                  <div className="space-y-4">
                    {Object.entries(a11ySettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {getA11yDescription(key)}
                          </div>
                        </div>
                        <button
                          onClick={() => handleA11yToggle(key as keyof typeof a11ySettings)}
                          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                            value ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-7' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'privacy' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Data</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">🔐</div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Data Encryption</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            All your data is encrypted end-to-end with AES-256-GCM encryption
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">💾</div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Auto Backup</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Automatic daily backups keep your data safe
                          </p>
                          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
                            Configure Backups
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">📦</div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Export Your Data</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Download all your data in JSON format
                          </p>
                          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold">
                            Export Data
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Security</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">🔐</div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                        </div>
                        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold whitespace-nowrap">
                          Enable 2FA
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">📋</div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Audit Log</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            View all security events and account activity
                          </p>
                          <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold">
                            View Audit Log
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">🔑</div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">API Keys</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Manage your API keys for developer access
                          </p>
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                            Manage Keys
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'integrations' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Connected Integrations</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'Slack', icon: '💬', status: 'Not connected' },
                      { name: 'Google Calendar', icon: '📅', status: 'Not connected' },
                      { name: 'GitHub', icon: '🐙', status: 'Not connected' },
                      { name: 'Notion', icon: '📓', status: 'Not connected' },
                      { name: 'Zapier', icon: '⚡', status: 'Not connected' },
                      { name: 'Apple Health', icon: '❤️', status: 'Not connected' }
                    ].map((integration) => (
                      <div key={integration.name} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl">{integration.icon}</div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{integration.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{integration.status}</div>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold">
                            Connect
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'advanced' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Advanced Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-4">Data Management</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-left flex items-center justify-between">
                          <span>📥 Import Data</span>
                          <span className="text-sm opacity-80">CSV, JSON</span>
                        </button>
                        <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-left flex items-center justify-between">
                          <span>📤 Export Data</span>
                          <span className="text-sm opacity-80">Download all</span>
                        </button>
                        <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-left flex items-center justify-between">
                          <span>💾 Create Backup</span>
                          <span className="text-sm opacity-80">Manual backup</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-4">Developer Tools</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-left flex items-center justify-between">
                          <span>🔑 API Keys</span>
                          <span className="text-sm opacity-80">Manage access</span>
                        </button>
                        <button className="w-full px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold text-left flex items-center justify-between">
                          <span>🔗 Webhooks</span>
                          <span className="text-sm opacity-80">Setup webhooks</span>
                        </button>
                        <button className="w-full px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold text-left flex items-center justify-between">
                          <span>🔧 SDK Access</span>
                          <span className="text-sm opacity-80">Developer SDK</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-200 dark:border-red-800">
                      <h4 className="font-bold text-red-900 dark:text-red-400 mb-2">Danger Zone</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Irreversible actions - proceed with caution
                      </p>
                      <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getA11yDescription(key: string): string {
  const descriptions: Record<string, string> = {
    screenReaderOptimized: 'Optimize interface for screen readers',
    highContrast: 'Increase contrast for better visibility',
    largeText: 'Increase text size throughout the app',
    reducedMotion: 'Minimize animations and motion',
    keyboardNavigation: 'Enhanced keyboard navigation support',
    focusIndicators: 'Show clear focus indicators',
    ariaLabels: 'Add ARIA labels for accessibility'
  }
  return descriptions[key] || ''
}

