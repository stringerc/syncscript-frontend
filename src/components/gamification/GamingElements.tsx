/**
 * Gaming Elements System Component
 * 
 * Points, levels, streaks, and unlockable content
 * Includes progression system, power-ups, and mini-games
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserLevel {
  currentLevel: number;
  currentXP: number;
  xpToNext: number;
  totalXP: number;
  levelTitle: string;
  levelColor: string;
  levelIcon: string;
  perks: string[];
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  streakType: 'daily' | 'weekly' | 'monthly';
  lastActivity: string;
  streakRewards: string[];
  streakMultiplier: number;
}

interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'energy' | 'focus' | 'speed' | 'luck' | 'team';
  duration: number;
  effect: string;
  cost: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  active: boolean;
  expiresAt?: string;
}

interface MiniGame {
  id: string;
  name: string;
  description: string;
  type: 'puzzle' | 'memory' | 'reaction' | 'strategy' | 'arcade';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  reward: {
    xp: number;
    points: number;
    items: string[];
  };
  highScore: number;
  playCount: number;
  unlocked: boolean;
}

interface UnlockableContent {
  id: string;
  name: string;
  description: string;
  type: 'theme' | 'avatar' | 'animation' | 'sound' | 'effect';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockCondition: string;
  unlocked: boolean;
  unlockedAt?: string;
  preview: string;
}

interface GamingElementsProps {
  onClose: () => void;
}

const GamingElements: React.FC<GamingElementsProps> = ({ onClose }) => {
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [miniGames, setMiniGames] = useState<MiniGame[]>([]);
  const [unlockableContent, setUnlockableContent] = useState<UnlockableContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'level' | 'streaks' | 'powerups' | 'games' | 'unlocks'>('level');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadGamingData();
  }, []);

  const loadGamingData = async () => {
    setIsLoading(true);
    
    try {
      // Mock user level
      const mockUserLevel: UserLevel = {
        currentLevel: 25,
        currentXP: 7500,
        xpToNext: 10000,
        totalXP: 87500,
        levelTitle: 'Productivity Master',
        levelColor: 'purple',
        levelIcon: '👑',
        perks: [
          'Double XP weekends',
          'Priority support',
          'Exclusive themes',
          'Advanced analytics',
          'Team leadership tools'
        ]
      };

      // Mock streak data
      const mockStreakData: StreakData = {
        currentStreak: 12,
        longestStreak: 45,
        streakType: 'daily',
        lastActivity: new Date(Date.now() - 3600000).toISOString(),
        streakRewards: [
          '3-day streak: +10% XP bonus',
          '7-day streak: Unlock golden theme',
          '14-day streak: Double points weekend',
          '30-day streak: Legendary avatar frame'
        ],
        streakMultiplier: 1.5
      };

      // Mock power-ups
      const mockPowerUps: PowerUp[] = [
        {
          id: 'powerup-1',
          name: 'Energy Boost',
          description: 'Increases energy regeneration by 50%',
          icon: '⚡',
          type: 'energy',
          duration: 3600,
          effect: '+50% energy regeneration',
          cost: 100,
          rarity: 'common',
          active: false
        },
        {
          id: 'powerup-2',
          name: 'Focus Mode',
          description: 'Eliminates distractions for 2 hours',
          icon: '🎯',
          type: 'focus',
          duration: 7200,
          effect: 'No notifications, enhanced concentration',
          cost: 250,
          rarity: 'uncommon',
          active: true,
          expiresAt: new Date(Date.now() + 3600000).toISOString()
        },
        {
          id: 'powerup-3',
          name: 'Speed Demon',
          description: 'Complete tasks 25% faster',
          icon: '🏃',
          type: 'speed',
          duration: 1800,
          effect: '+25% task completion speed',
          cost: 150,
          rarity: 'rare',
          active: false
        },
        {
          id: 'powerup-4',
          name: 'Lucky Break',
          description: 'Higher chance of bonus rewards',
          icon: '🍀',
          type: 'luck',
          duration: 14400,
          effect: '+100% bonus reward chance',
          cost: 500,
          rarity: 'epic',
          active: false
        },
        {
          id: 'powerup-5',
          name: 'Team Synergy',
          description: 'Boosts entire team productivity',
          icon: '👥',
          type: 'team',
          duration: 21600,
          effect: '+30% team productivity',
          cost: 1000,
          rarity: 'legendary',
          active: false
        }
      ];

      // Mock mini-games
      const mockMiniGames: MiniGame[] = [
        {
          id: 'game-1',
          name: 'Task Tetris',
          description: 'Arrange tasks like Tetris blocks for maximum efficiency',
          type: 'puzzle',
          difficulty: 'medium',
          reward: {
            xp: 100,
            points: 50,
            items: ['Focus Boost']
          },
          highScore: 1250,
          playCount: 15,
          unlocked: true
        },
        {
          id: 'game-2',
          name: 'Memory Master',
          description: 'Remember task sequences to boost memory skills',
          type: 'memory',
          difficulty: 'easy',
          reward: {
            xp: 75,
            points: 30,
            items: ['Memory Enhancement']
          },
          highScore: 890,
          playCount: 8,
          unlocked: true
        },
        {
          id: 'game-3',
          name: 'Reaction Rush',
          description: 'Quick decision-making game for faster task processing',
          type: 'reaction',
          difficulty: 'hard',
          reward: {
            xp: 150,
            points: 75,
            items: ['Speed Boost', 'Reaction Enhancer']
          },
          highScore: 2100,
          playCount: 3,
          unlocked: false
        },
        {
          id: 'game-4',
          name: 'Strategy Sprint',
          description: 'Plan optimal task sequences for maximum productivity',
          type: 'strategy',
          difficulty: 'expert',
          reward: {
            xp: 300,
            points: 150,
            items: ['Strategic Planner', 'Productivity Guru']
          },
          highScore: 0,
          playCount: 0,
          unlocked: false
        },
        {
          id: 'game-5',
          name: 'Arcade Energy',
          description: 'Classic arcade-style energy management game',
          type: 'arcade',
          difficulty: 'medium',
          reward: {
            xp: 120,
            points: 60,
            items: ['Energy Pack']
          },
          highScore: 0,
          playCount: 0,
          unlocked: false
        }
      ];

      // Mock unlockable content
      const mockUnlockableContent: UnlockableContent[] = [
        {
          id: 'unlock-1',
          name: 'Golden Theme',
          description: 'Luxurious golden UI theme',
          type: 'theme',
          rarity: 'rare',
          unlockCondition: 'Reach level 20',
          unlocked: true,
          unlockedAt: new Date(Date.now() - 172800000).toISOString(),
          preview: 'https://via.placeholder.com/200x200/FFD700/000000?text=Golden+Theme'
        },
        {
          id: 'unlock-2',
          name: 'Lightning Avatar',
          description: 'Electric avatar frame with lightning effects',
          type: 'avatar',
          rarity: 'epic',
          unlockCondition: 'Complete 1000 tasks',
          unlocked: true,
          unlockedAt: new Date(Date.now() - 86400000).toISOString(),
          preview: 'https://via.placeholder.com/200x200/00BFFF/FFFFFF?text=Lightning+Avatar'
        },
        {
          id: 'unlock-3',
          name: 'Confetti Animation',
          description: 'Celebratory confetti animation for achievements',
          type: 'animation',
          rarity: 'uncommon',
          unlockCondition: 'Earn 10 achievements',
          unlocked: false,
          preview: 'https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Confetti+Animation'
        },
        {
          id: 'unlock-4',
          name: 'Epic Sound Pack',
          description: 'Epic sound effects for task completion',
          type: 'sound',
          rarity: 'rare',
          unlockCondition: 'Maintain 30-day streak',
          unlocked: false,
          preview: 'https://via.placeholder.com/200x200/8A2BE2/FFFFFF?text=Epic+Sound+Pack'
        },
        {
          id: 'unlock-5',
          name: 'Cosmic Effect',
          description: 'Mystical cosmic background effect',
          type: 'effect',
          rarity: 'legendary',
          unlockCondition: 'Reach level 50',
          unlocked: false,
          preview: 'https://via.placeholder.com/200x200/4B0082/FFFFFF?text=Cosmic+Effect'
        }
      ];

      setUserLevel(mockUserLevel);
      setStreakData(mockStreakData);
      setPowerUps(mockPowerUps);
      setMiniGames(mockMiniGames);
      setUnlockableContent(mockUnlockableContent);
    } catch (error) {
      console.error('Failed to load gaming data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const activatePowerUp = async (powerUpId: string) => {
    try {
      setPowerUps(prev => prev.map(powerUp => 
        powerUp.id === powerUpId 
          ? { 
              ...powerUp, 
              active: true,
              expiresAt: new Date(Date.now() + powerUp.duration * 1000).toISOString()
            }
          : powerUp
      ));
      
      console.log(`Activated power-up: ${powerUpId}`);
    } catch (error) {
      console.error('Failed to activate power-up:', error);
    }
  };

  const playMiniGame = async (gameId: string) => {
    setIsPlaying(true);
    
    try {
      // Simulate mini-game play
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setMiniGames(prev => prev.map(game => 
        game.id === gameId 
          ? { 
              ...game, 
              playCount: game.playCount + 1,
              highScore: Math.max(game.highScore, Math.floor(Math.random() * 2000) + 500)
            }
          : game
      ));
      
      console.log(`Played mini-game: ${gameId}`);
    } catch (error) {
      console.error('Failed to play mini-game:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'uncommon': return 'text-green-600 bg-green-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-orange-600 bg-orange-100';
      case 'expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'energy': return '⚡';
      case 'focus': return '🎯';
      case 'speed': return '🏃';
      case 'luck': return '🍀';
      case 'team': return '👥';
      case 'puzzle': return '🧩';
      case 'memory': return '🧠';
      case 'reaction': return '⚡';
      case 'strategy': return '♟️';
      case 'arcade': return '🎮';
      case 'theme': return '🎨';
      case 'avatar': return '👤';
      case 'animation': return '✨';
      case 'sound': return '🔊';
      case 'effect': return '🌟';
      default: return '🎮';
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading gaming elements...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Gaming Elements</h2>
              <p className="text-purple-100 mt-1">Points, levels, streaks, and unlockable content</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Level:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {userLevel?.currentLevel || 0}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Streak:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {streakData?.currentStreak || 0} days
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Power-ups:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {powerUps.filter(p => p.active).length}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'level', name: 'Level & XP', icon: '📈' },
              { id: 'streaks', name: 'Streaks', icon: '🔥' },
              { id: 'powerups', name: 'Power-ups', icon: '⚡' },
              { id: 'games', name: 'Mini-Games', icon: '🎮' },
              { id: 'unlocks', name: 'Unlocks', icon: '🔓' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'level' && userLevel && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Level & Experience</h3>
              
              <div className="p-6 border border-gray-200 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="text-center">
                  <div className="text-6xl mb-4">{userLevel.levelIcon}</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Level {userLevel.currentLevel}
                  </h4>
                  <p className="text-lg text-purple-600 font-medium mb-4">
                    {userLevel.levelTitle}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="text-gray-900">
                        {userLevel.currentXP.toLocaleString()} / {userLevel.xpToNext.toLocaleString()} XP
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                        style={{ width: `${(userLevel.currentXP / userLevel.xpToNext) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {userLevel.xpToNext - userLevel.currentXP} XP to next level
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Level Perks</h4>
                <div className="space-y-2">
                  {userLevel.perks.map((perk, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'streaks' && streakData && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Streak System</h3>
              
              <div className="p-6 border border-gray-200 rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔥</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {streakData.currentStreak} Day Streak
                  </h4>
                  <p className="text-lg text-orange-600 font-medium mb-4">
                    {streakData.streakType.charAt(0).toUpperCase() + streakData.streakType.slice(1)} Streak
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Longest Streak:</span>
                      <span className="text-gray-900">{streakData.longestStreak} days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Multiplier:</span>
                      <span className="text-gray-900">{streakData.streakMultiplier}x</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last Activity:</span>
                      <span className="text-gray-900">
                        {new Date(streakData.lastActivity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Streak Rewards</h4>
                <div className="space-y-2">
                  {streakData.streakRewards.map((reward, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="text-orange-500">🔥</span>
                      <span>{reward}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'powerups' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Power-ups</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {powerUps.map((powerUp) => (
                  <motion.div
                    key={powerUp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      powerUp.active 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{powerUp.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{powerUp.name}</h4>
                        <p className="text-sm text-gray-600">{powerUp.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(powerUp.rarity)}`}>
                          {powerUp.rarity.toUpperCase()}
                        </span>
                        {powerUp.active && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Effect:</span>
                        <span className="text-gray-900">{powerUp.effect}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="text-gray-900">{Math.floor(powerUp.duration / 60)} minutes</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Cost:</span>
                        <span className="text-gray-900">{powerUp.cost} points</span>
                      </div>
                    </div>
                    
                    {powerUp.active && powerUp.expiresAt && (
                      <div className="mt-2 text-sm text-green-600">
                        Expires: {new Date(powerUp.expiresAt).toLocaleString()}
                      </div>
                    )}
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {!powerUp.active && (
                        <button
                          onClick={() => activatePowerUp(powerUp.id)}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all"
                        >
                          Activate
                        </button>
                      )}
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'games' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Mini-Games</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {miniGames.map((game) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      game.unlocked 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{getTypeIcon(game.type)}</div>
                      <h4 className="font-medium text-gray-900 mb-1">{game.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{game.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                            {game.difficulty.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {game.type.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          High Score: {game.highScore}
                        </div>
                        <div className="text-sm text-gray-600">
                          Played: {game.playCount} times
                        </div>
                        
                        <div className="text-sm font-medium text-gray-700">Rewards:</div>
                        <div className="text-xs text-gray-600">
                          {game.reward.xp} XP • {game.reward.points} points
                        </div>
                        <div className="text-xs text-gray-600">
                          {game.reward.items.join(', ')}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-center space-x-2">
                        {game.unlocked ? (
                          <button
                            onClick={() => playMiniGame(game.id)}
                            disabled={isPlaying}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all disabled:opacity-50"
                          >
                            {isPlaying ? 'Playing...' : 'Play'}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-sm"
                          >
                            Locked
                          </button>
                        )}
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                          Info
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'unlocks' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Unlockable Content</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unlockableContent.map((content) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      content.unlocked 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-4xl">{getTypeIcon(content.type)}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{content.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{content.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(content.rarity)}`}>
                            {content.rarity.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {content.type.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="text-sm font-medium text-gray-700">Unlock Condition:</div>
                        <div className="text-xs text-gray-600">{content.unlockCondition}</div>
                        
                        {content.unlocked && content.unlockedAt && (
                          <div className="text-xs text-green-600">
                            Unlocked: {new Date(content.unlockedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 flex items-center justify-center space-x-2">
                        {content.unlocked ? (
                          <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                            Use
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-sm"
                          >
                            Locked
                          </button>
                        )}
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                          Preview
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Gaming Elements • Level {userLevel?.currentLevel || 0} • {streakData?.currentStreak || 0} day streak • {powerUps.filter(p => p.active).length} active power-ups
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                console.log('Exporting gaming data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GamingElements;
