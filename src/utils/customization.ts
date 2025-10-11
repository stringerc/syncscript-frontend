/**
 * Customization System
 * Features #33, #34, #35
 * - Custom Energy Labels
 * - Emblem Marketplace
 * - Daily Login Rewards
 */

// ===== FEATURE #33: CUSTOM ENERGY LABELS =====

export interface EnergyLabelSet {
  id: string
  name: string
  labels: {
    veryLow: string
    low: string
    medium: string
    high: string
    veryHigh: string
  }
  icon: string
  description: string
  isPremium: boolean
  cost?: number // emblems
}

export const ENERGY_LABEL_PRESETS: EnergyLabelSet[] = [
  {
    id: 'default',
    name: 'Default',
    labels: {
      veryLow: 'Very Low',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      veryHigh: 'Very High'
    },
    icon: '⚡',
    description: 'Standard energy labels',
    isPremium: false
  },
  {
    id: 'battery',
    name: 'Battery Mode',
    labels: {
      veryLow: 'Nearly Dead 🪫',
      low: 'Low Battery 🔋',
      medium: 'Half Charged ⚡',
      high: 'Fully Charged 🔋',
      veryHigh: 'Overcharged ⚡'
    },
    icon: '🔋',
    description: 'Battery-themed labels',
    isPremium: false
  },
  {
    id: 'superhero',
    name: 'Superhero',
    labels: {
      veryLow: 'Sidekick 🦸',
      low: 'Hero in Training 💪',
      medium: 'Local Hero 🦸',
      high: 'Superhero 🦸‍♂️',
      veryHigh: 'Legendary Hero 🌟'
    },
    icon: '🦸',
    description: 'Feel like a superhero!',
    isPremium: true,
    cost: 100
  },
  {
    id: 'dragon',
    name: 'Dragon Power',
    labels: {
      veryLow: 'Baby Dragon 🐲',
      low: 'Young Dragon 🐉',
      medium: 'Adult Dragon 🐲',
      high: 'Elder Dragon 🐉',
      veryHigh: 'Ancient Dragon 🔥'
    },
    icon: '🐉',
    description: 'Unleash your inner dragon',
    isPremium: true,
    cost: 150
  },
  {
    id: 'space',
    name: 'Space Explorer',
    labels: {
      veryLow: 'Ground Control 🌍',
      low: 'Launch Prep 🚀',
      medium: 'In Orbit 🛸',
      high: 'Asteroid Belt ☄️',
      veryHigh: 'Galaxy Explorer 🌌'
    },
    icon: '🚀',
    description: 'Explore the cosmos',
    isPremium: true,
    cost: 200
  },
  {
    id: 'wizard',
    name: 'Magic Power',
    labels: {
      veryLow: 'Apprentice 🪄',
      low: 'Novice Wizard 🧙',
      medium: 'Mage ✨',
      high: 'Arch-Mage 🔮',
      veryHigh: 'Grand Wizard 🌟'
    },
    icon: '🧙',
    description: 'Magical energy tracking',
    isPremium: true,
    cost: 175
  }
]

export function getEnergyLabelSet(): EnergyLabelSet {
  if (typeof window === 'undefined') return ENERGY_LABEL_PRESETS[0]
  
  try {
    const stored = localStorage.getItem('energy_label_set')
    if (!stored) return ENERGY_LABEL_PRESETS[0]
    
    const setId = JSON.parse(stored)
    return ENERGY_LABEL_PRESETS.find(set => set.id === setId) || ENERGY_LABEL_PRESETS[0]
  } catch {
    return ENERGY_LABEL_PRESETS[0]
  }
}

export function setEnergyLabelSet(setId: string): boolean {
  if (typeof window === 'undefined') return false
  
  const labelSet = ENERGY_LABEL_PRESETS.find(set => set.id === setId)
  if (!labelSet) return false
  
  // Check if premium and if purchased
  if (labelSet.isPremium) {
    const purchased = getPurchasedItems()
    if (!purchased.includes(`label_${setId}`)) {
      console.error('Label set not purchased')
      return false
    }
  }
  
  localStorage.setItem('energy_label_set', JSON.stringify(setId))
  console.log(`✨ Energy labels set to: ${labelSet.name}`)
  return true
}

// ===== FEATURE #34: EMBLEM MARKETPLACE =====

export interface MarketplaceItem {
  id: string
  name: string
  description: string
  category: 'theme' | 'label' | 'feature' | 'boost' | 'cosmetic'
  icon: string
  cost: number
  isPurchased?: boolean
  effect?: string
}

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  // Energy Label Sets
  {
    id: 'label_superhero',
    name: 'Superhero Labels',
    description: 'Transform your energy tracking with superhero-themed labels',
    category: 'label',
    icon: '🦸',
    cost: 100,
    effect: 'Unlock Superhero energy labels'
  },
  {
    id: 'label_dragon',
    name: 'Dragon Power Labels',
    description: 'Unleash your inner dragon with epic labels',
    category: 'label',
    icon: '🐉',
    cost: 150,
    effect: 'Unlock Dragon Power labels'
  },
  {
    id: 'label_space',
    name: 'Space Explorer Labels',
    description: 'Take your energy tracking to the stars',
    category: 'label',
    icon: '🚀',
    cost: 200,
    effect: 'Unlock Space Explorer labels'
  },
  {
    id: 'label_wizard',
    name: 'Magic Power Labels',
    description: 'Track energy with magical flair',
    category: 'label',
    icon: '🧙',
    cost: 175,
    effect: 'Unlock Magic Power labels'
  },

  // Themes
  {
    id: 'theme_ocean',
    name: 'Ocean Theme',
    description: 'Calming blue ocean-inspired interface',
    category: 'theme',
    icon: '🌊',
    cost: 250,
    effect: 'Unlock Ocean color theme'
  },
  {
    id: 'theme_sunset',
    name: 'Sunset Theme',
    description: 'Warm orange and pink sunset colors',
    category: 'theme',
    icon: '🌅',
    cost: 250,
    effect: 'Unlock Sunset color theme'
  },
  {
    id: 'theme_forest',
    name: 'Forest Theme',
    description: 'Natural green forest-inspired design',
    category: 'theme',
    icon: '🌲',
    cost: 250,
    effect: 'Unlock Forest color theme'
  },

  // Boosts
  {
    id: 'boost_double_emblems',
    name: '2x Emblem Boost (24h)',
    description: 'Double all emblem earnings for 24 hours',
    category: 'boost',
    icon: '💎',
    cost: 500,
    effect: '2x emblems for 24 hours'
  },
  {
    id: 'boost_streak_protect',
    name: 'Streak Protection',
    description: 'Protect your streak for one missed day',
    category: 'boost',
    icon: '🛡️',
    cost: 300,
    effect: 'One-time streak protection'
  },

  // Features
  {
    id: 'feature_advanced_stats',
    name: 'Advanced Statistics',
    description: 'Unlock detailed analytics and charts',
    category: 'feature',
    icon: '📊',
    cost: 400,
    effect: 'Unlock advanced stats dashboard'
  },
  {
    id: 'feature_custom_categories',
    name: 'Custom Categories',
    description: 'Create unlimited custom task categories',
    category: 'feature',
    icon: '🏷️',
    cost: 350,
    effect: 'Unlimited custom categories'
  },

  // Cosmetics
  {
    id: 'cosmetic_rainbow_emblems',
    name: 'Rainbow Emblems',
    description: 'Make your emblems sparkle with rainbow colors',
    category: 'cosmetic',
    icon: '🌈',
    cost: 200,
    effect: 'Rainbow emblem effect'
  },
  {
    id: 'cosmetic_particle_effects',
    name: 'Particle Effects',
    description: 'Add beautiful particle effects to completions',
    category: 'cosmetic',
    icon: '✨',
    cost: 300,
    effect: 'Particle celebration effects'
  }
]

export function getPurchasedItems(): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('purchased_items')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function purchaseItem(itemId: string, currentEmblems: number): {
  success: boolean
  message: string
  newBalance?: number
} {
  const item = MARKETPLACE_ITEMS.find(i => i.id === itemId)
  if (!item) {
    return { success: false, message: 'Item not found' }
  }
  
  const purchased = getPurchasedItems()
  if (purchased.includes(itemId)) {
    return { success: false, message: 'Already purchased' }
  }
  
  if (currentEmblems < item.cost) {
    return { success: false, message: `Insufficient emblems (need ${item.cost})` }
  }
  
  // Add to purchased items
  purchased.push(itemId)
  localStorage.setItem('purchased_items', JSON.stringify(purchased))
  
  const newBalance = currentEmblems - item.cost
  
  console.log(`🛒 Purchased: ${item.name} for ${item.cost} emblems`)
  
  return {
    success: true,
    message: `Successfully purchased ${item.name}!`,
    newBalance
  }
}

export function getMarketplaceItems(): MarketplaceItem[] {
  const purchased = getPurchasedItems()
  return MARKETPLACE_ITEMS.map(item => ({
    ...item,
    isPurchased: purchased.includes(item.id)
  }))
}

// ===== FEATURE #35: DAILY LOGIN REWARDS =====

export interface DailyReward {
  day: number
  emblems: number
  bonus?: {
    type: 'multiplier' | 'boost' | 'item'
    value: string
  }
  icon: string
}

export const DAILY_REWARDS: DailyReward[] = [
  { day: 1, emblems: 10, icon: '🎁' },
  { day: 2, emblems: 15, icon: '🎁' },
  { day: 3, emblems: 20, icon: '🎁' },
  { day: 4, emblems: 25, icon: '🎁' },
  { day: 5, emblems: 35, icon: '🎁' },
  { day: 6, emblems: 45, icon: '🎁' },
  { 
    day: 7, 
    emblems: 100, 
    bonus: { type: 'multiplier', value: '1.5x for 24h' },
    icon: '🎉'
  }
]

export interface LoginRewardStatus {
  lastClaimedDate: string
  consecutiveDays: number
  totalClaimed: number
  todaysClaimed: boolean
  nextReward: DailyReward
}

export function getLoginRewardStatus(): LoginRewardStatus {
  if (typeof window === 'undefined') {
    return {
      lastClaimedDate: '',
      consecutiveDays: 0,
      totalClaimed: 0,
      todaysClaimed: false,
      nextReward: DAILY_REWARDS[0]
    }
  }
  
  try {
    const stored = localStorage.getItem('login_rewards')
    if (!stored) {
      return {
        lastClaimedDate: '',
        consecutiveDays: 0,
        totalClaimed: 0,
        todaysClaimed: false,
        nextReward: DAILY_REWARDS[0]
      }
    }
    
    const data = JSON.parse(stored)
    const today = new Date().toDateString()
    const lastClaimed = new Date(data.lastClaimedDate).toDateString()
    
    const todaysClaimed = lastClaimed === today
    const nextDay = (data.consecutiveDays % 7) + 1
    const nextReward = DAILY_REWARDS[nextDay - 1]
    
    return {
      ...data,
      todaysClaimed,
      nextReward
    }
  } catch {
    return {
      lastClaimedDate: '',
      consecutiveDays: 0,
      totalClaimed: 0,
      todaysClaimed: false,
      nextReward: DAILY_REWARDS[0]
    }
  }
}

export function claimDailyReward(): {
  success: boolean
  reward?: DailyReward
  message: string
} {
  const status = getLoginRewardStatus()
  
  if (status.todaysClaimed) {
    return {
      success: false,
      message: 'Already claimed today\'s reward. Come back tomorrow!'
    }
  }
  
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()
  const lastClaimed = status.lastClaimedDate ? new Date(status.lastClaimedDate).toDateString() : ''
  
  let consecutiveDays = status.consecutiveDays
  
  // Check if streak continues
  if (lastClaimed === yesterday) {
    consecutiveDays += 1
  } else if (lastClaimed !== today) {
    // Streak broken, reset
    consecutiveDays = 1
  }
  
  // Loop back to day 1 after day 7
  const rewardIndex = (consecutiveDays - 1) % 7
  const reward = DAILY_REWARDS[rewardIndex]
  
  // Save status
  const newStatus = {
    lastClaimedDate: new Date().toISOString(),
    consecutiveDays,
    totalClaimed: status.totalClaimed + reward.emblems
  }
  
  localStorage.setItem('login_rewards', JSON.stringify(newStatus))
  
  console.log(`🎁 Daily Reward Claimed: Day ${consecutiveDays} - ${reward.emblems} emblems!`)
  
  return {
    success: true,
    reward,
    message: `Day ${consecutiveDays} reward claimed! +${reward.emblems} emblems!`
  }
}

export function canClaimDailyReward(): boolean {
  const status = getLoginRewardStatus()
  return !status.todaysClaimed
}

