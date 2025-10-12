'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ENERGY_LABEL_PRESETS,
  getEnergyLabelSet,
  setEnergyLabelSet,
  getMarketplaceItems,
  purchaseItem,
  getLoginRewardStatus,
  claimDailyReward,
  MarketplaceItem
} from '@/utils/customization'

export default function CustomizationPanel() {
  const [activeTab, setActiveTab] = useState<'labels' | 'marketplace' | 'rewards'>('labels')
  const [currentEmblems, setCurrentEmblems] = useState(1500) // Mock balance
  const [selectedLabelSet, setSelectedLabelSet] = useState(getEnergyLabelSet())
  const [marketplaceItems, setMarketplaceItems] = useState(getMarketplaceItems())
  const [loginStatus, setLoginStatus] = useState(getLoginRewardStatus())
  const [showRewardClaim, setShowRewardClaim] = useState(false)
  const [claimedReward, setClaimedReward] = useState<any>(null)

  const handleLabelChange = (setId: string) => {
    if (setEnergyLabelSet(setId)) {
      setSelectedLabelSet(getEnergyLabelSet())
    }
  }

  const handlePurchase = (item: MarketplaceItem) => {
    const result = purchaseItem(item.id, currentEmblems)
    if (result.success && result.newBalance !== undefined) {
      setCurrentEmblems(result.newBalance)
      setMarketplaceItems(getMarketplaceItems())
      alert(result.message)
    } else {
      alert(result.message)
    }
  }

  const handleClaimReward = () => {
    const result = claimDailyReward()
    if (result.success && result.reward) {
      setClaimedReward(result.reward)
      setShowRewardClaim(true)
      setCurrentEmblems(prev => prev + result.reward!.emblems)
      setLoginStatus(getLoginRewardStatus())
      
      setTimeout(() => {
        setShowRewardClaim(false)
      }, 3000)
    } else {
      alert(result.message)
    }
  }

  const tabs = [
    { id: 'labels' as const, label: 'Energy Labels', icon: '🏷️' },
    { id: 'marketplace' as const, label: 'Marketplace', icon: '🛒' },
    { id: 'rewards' as const, label: 'Daily Rewards', icon: '🎁' }
  ]

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Customization 🎨
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Personalize your SyncScript experience
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{currentEmblems}</div>
          <div className="text-sm">💎 Emblems</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium rounded-t-lg transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'labels' && (
            <EnergyLabelsSection
              labelSets={ENERGY_LABEL_PRESETS}
              selected={selectedLabelSet}
              onSelect={handleLabelChange}
              purchased={marketplaceItems.filter(i => i.category === 'label' && i.isPurchased).map(i => i.id)}
            />
          )}
          
          {activeTab === 'marketplace' && (
            <MarketplaceSection
              items={marketplaceItems}
              onPurchase={handlePurchase}
              currentEmblems={currentEmblems}
            />
          )}
          
          {activeTab === 'rewards' && (
            <DailyRewardsSection
              status={loginStatus}
              onClaim={handleClaimReward}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Reward Claim Animation */}
      <AnimatePresence>
        {showRewardClaim && claimedReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center shadow-2xl">
              <div className="text-7xl mb-4">{claimedReward.icon}</div>
              <div className="text-3xl font-bold mb-2">Day {loginStatus.consecutiveDays}</div>
              <div className="text-5xl font-bold mb-2">+{claimedReward.emblems}</div>
              <div className="text-xl">Emblems!</div>
              {claimedReward.bonus && (
                <div className="mt-4 text-lg bg-white/20 rounded-lg p-3">
                  Bonus: {claimedReward.bonus.value}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function EnergyLabelsSection({ labelSets, selected, onSelect, purchased }: {
  labelSets: typeof ENERGY_LABEL_PRESETS
  selected: typeof ENERGY_LABEL_PRESETS[0]
  onSelect: (id: string) => void
  purchased: string[]
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Choose Your Energy Labels
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labelSets.map((set) => {
          const isLocked = set.isPremium && !purchased.includes(`label_${set.id}`)
          const isSelected = selected.id === set.id
          
          return (
            <motion.div
              key={set.id}
              whileHover={{ scale: isLocked ? 1 : 1.05 }}
              className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer transition-all ${
                isSelected ? 'ring-4 ring-purple-600' : ''
              } ${isLocked ? 'opacity-50' : ''}`}
              onClick={() => !isLocked && onSelect(set.id)}
            >
              {isLocked && (
                <div className="absolute top-4 right-4 text-3xl">🔒</div>
              )}
              {isSelected && (
                <div className="absolute top-4 right-4 text-3xl">✓</div>
              )}
              
              <div className="text-5xl mb-4">{set.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {set.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {set.description}
              </p>
              
              {/* Label Preview */}
              <div className="space-y-2 mb-4">
                {Object.entries(set.labels).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">
                    {value}
                  </div>
                ))}
              </div>
              
              {set.isPremium && (
                <div className="text-center py-2 px-4 bg-yellow-500 text-white rounded-lg font-bold">
                  {isLocked ? `${set.cost} emblems` : 'Unlocked!'}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function MarketplaceSection({ items, onPurchase, currentEmblems }: {
  items: MarketplaceItem[]
  onPurchase: (item: MarketplaceItem) => void
  currentEmblems: number
}) {
  const [filter, setFilter] = useState<string>('all')
  const categories = ['all', 'label', 'theme', 'boost', 'feature', 'cosmetic']
  
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter((i: MarketplaceItem) => i.category === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Emblem Marketplace
        </h2>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                filter === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item: MarketplaceItem) => (
          <div
            key={item.id}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${
              item.isPurchased ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">{item.icon}</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {item.cost} 💎
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {item.description}
            </p>
            
            {item.effect && (
              <div className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded px-3 py-2 mb-4">
                {item.effect}
            </div>
            )}

            <button
              onClick={() => onPurchase(item)}
              disabled={item.isPurchased || currentEmblems < item.cost}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                item.isPurchased
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  : currentEmblems < item.cost
                  ? 'bg-red-500 text-white cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {item.isPurchased ? 'Purchased ✓' : 'Purchase'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function DailyRewardsSection({ status, onClaim }: {
  status: ReturnType<typeof getLoginRewardStatus>
  onClaim: () => void
}) {
  const DAILY_REWARDS_UI = [
    { day: 1, emblems: 10, icon: '🎁' },
    { day: 2, emblems: 15, icon: '🎁' },
    { day: 3, emblems: 20, icon: '🎁' },
    { day: 4, emblems: 25, icon: '🎁' },
    { day: 5, emblems: 35, icon: '🎁' },
    { day: 6, emblems: 45, icon: '🎁' },
    { day: 7, emblems: 100, icon: '🎉', special: true }
  ]

  const currentDay = (status.consecutiveDays % 7) || 7

  return (
    <div>
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
        <h2 className="text-3xl font-bold mb-4">Daily Login Rewards 🎁</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">{status.consecutiveDays}</div>
            <div className="text-sm">Current Streak</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">{status.nextReward.emblems}</div>
            <div className="text-sm">Next Reward</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">{status.totalClaimed}</div>
            <div className="text-sm">Total Earned</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold">{status.todaysClaimed ? '✓' : '⏰'}</div>
            <div className="text-sm">{status.todaysClaimed ? 'Claimed' : 'Pending'}</div>
          </div>
        </div>
        
        {!status.todaysClaimed && (
          <button
            onClick={onClaim}
            className="w-full mt-6 py-4 bg-white text-purple-600 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all"
          >
            Claim Today's Reward! 🎁
          </button>
        )}
      </div>

      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        7-Day Reward Calendar
      </h3>
      <div className="grid grid-cols-7 gap-4">
        {DAILY_REWARDS_UI.map((reward) => {
          const isClaimed = reward.day < currentDay
          const isCurrent = reward.day === currentDay
          const isUpcoming = reward.day > currentDay
          
          return (
            <motion.div
              key={reward.day}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reward.day * 0.05 }}
              className={`relative rounded-xl p-6 text-center ${
                isClaimed
                  ? 'bg-green-100 dark:bg-green-900/20 border-2 border-green-500'
                  : isCurrent
                  ? 'bg-purple-100 dark:bg-purple-900/20 border-4 border-purple-600 ring-4 ring-purple-200'
                  : 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700'
              }`}
            >
              {isClaimed && (
                <div className="absolute top-2 right-2 text-green-600 text-xl">✓</div>
              )}
              
              <div className="text-4xl mb-2">{reward.icon}</div>
              <div className="text-sm font-bold mb-1 text-gray-900 dark:text-white">
                Day {reward.day}
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {reward.emblems}
              </div>
              {reward.special && (
                <div className="text-xs mt-2 text-yellow-600 dark:text-yellow-400 font-bold">
                  +Bonus!
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
          💡 Pro Tip
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          Log in every day to build your streak! Day 7 gives you a massive 100 emblem reward plus a special bonus!
        </p>
      </div>
    </div>
  )
}

