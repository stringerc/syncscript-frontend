/**
 * Feature #93: Custom Branding
 * White-label theming and customization
 */

'use client'

import React, { useState } from 'react'
import { Palette, Upload, Eye, Save } from 'lucide-react'

const CustomBrandingEditor: React.FC = () => {
  const [branding, setBranding] = useState({
    companyName: 'My Company',
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    accentColor: '#ec4899'
  })

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Custom Branding</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={branding.companyName}
              onChange={(e) => setBranding({...branding, companyName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Color
              </label>
              <input
                type="color"
                value={branding.primaryColor}
                onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secondary Color
              </label>
              <input
                type="color"
                value={branding.secondaryColor}
                onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accent Color
              </label>
              <input
                type="color"
                value={branding.accentColor}
                onChange={(e) => setBranding({...branding, accentColor: e.target.value})}
                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              <Save className="w-4 h-4" />
              Save Branding
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomBrandingEditor

