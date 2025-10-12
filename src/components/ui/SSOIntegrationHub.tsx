/**
 * Feature #94: SSO Integration
 * Enterprise single sign-on management
 */

'use client'

import React, { useState } from 'react'
import { Key, CheckCircle, XCircle, Settings } from 'lucide-react'
import { ssoProviders, SSOProvider } from '../../utils/enterpriseFeatures'

const SSOIntegrationHub: React.FC = () => {
  const [providers, setProviders] = useState<SSOProvider[]>(ssoProviders)

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">SSO Integration</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise authentication</p>
          </div>
        </div>

        <div className="space-y-4">
          {providers.map(provider => (
            <div key={provider.id} className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {provider.enabled ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-gray-400" />
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{provider.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{provider.type.toUpperCase()}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  <Settings className="w-4 h-4" />
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SSOIntegrationHub

