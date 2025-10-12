/**
 * Feature #100: Platform Marketplace
 * Plugin ecosystem with install/manage capabilities
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Search, Star, Download, Check, TrendingUp, Shield } from 'lucide-react'
import { marketplacePlugins, MarketplacePlugin } from '../../utils/enterpriseFeatures'

const PlatformMarketplace: React.FC = () => {
  const [plugins, setPlugins] = useState<MarketplacePlugin[]>(marketplacePlugins)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredPlugins = plugins.filter(p =>
    (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterCategory === 'all' || p.category === filterCategory)
  )

  const installPlugin = (pluginId: string) => {
    setPlugins(prev => prev.map(p =>
      p.id === pluginId ? { ...p, installed: true } : p
    ))
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Plugin Marketplace</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredPlugins.length} plugins available
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plugins..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="Integration">Integrations</option>
              <option value="Productivity">Productivity</option>
              <option value="Analytics">Analytics</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlugins.map(plugin => (
            <motion.div
              key={plugin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{plugin.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">by {plugin.developer}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded">
                  {plugin.category}
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{plugin.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{plugin.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{plugin.installs.toLocaleString()}</span>
                </div>
                <span>v{plugin.version}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="font-bold text-gray-900 dark:text-white">
                  {plugin.price === 0 ? 'Free' : `$${plugin.price}/mo`}
                </span>
                <button
                  onClick={() => installPlugin(plugin.id)}
                  disabled={plugin.installed}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    plugin.installed
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {plugin.installed ? (
                    <>
                      <Check className="w-4 h-4" />
                      Installed
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Install
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlatformMarketplace

