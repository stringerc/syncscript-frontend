/**
 * Achievement System 2.0 Component
 * 
 * More complex achievements and rewards
 * Includes dynamic achievements, progress tracking, and unlockable content
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'social' | 'streak' | 'milestone' | 'special' | 'seasonal';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
  requirements: string[];
  rewards: {
    points: number;
    badges?: string[];
    titles?: string[];
    unlocks?: string[];
  };
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  category: string;
  earned: boolean;
  earnedAt?: string;
  progress: number;
  maxProgress: number;
}

interface Title {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  requirements: string[];
  unlocked: boolean;
  unlockedAt?: string;
}

interface AchievementSystemProps {
  onClose: () => void;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ onClose }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [titles, setTitles] = useState<Title[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'achievements' | 'badges' | 'titles' | 'progress'>('achievements');
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    loadAchievementData();
  }, []);

  const loadAchievementData = async () => {
    setIsLoading(true);
    
    try {
      // Mock achievements
      const mockAchievements: Achievement[] = [
        {
          id: 'ach-1',
          name: 'Task Master',
          description: 'Complete 100 tasks',
          category: 'productivity',
          rarity: 'common',
          icon: '📝',
          points: 100,
          unlocked: true,
          progress: 100,
          maxProgress: 100,
          unlockedAt: new Date(Date.now() - 86400000).toISOString(),
          requirements: ['Complete 100 tasks'],
          rewards: {
            points: 100,
            badges: ['task-master'],
            titles: ['Task Master'],
            unlocks: ['golden-task-icon']
          }
        },
        {
          id: 'ach-2',
          name: 'Energy Surge',
          description: 'Reach maximum energy level 50 times',
          category: 'productivity',
          rarity: 'uncommon',
          icon: '⚡',
          points: 250,
          unlocked: false,
          progress: 32,
          maxProgress: 50,
          requirements: ['Reach energy level 10 fifty times'],
          rewards: {
            points: 250,
            badges: ['energy-surge'],
            titles: ['Energy Master'],
            unlocks: ['lightning-theme']
          }
        },
        {
          id: 'ach-3',
          name: 'Streak Legend',
          description: 'Maintain a 30-day productivity streak',
          category: 'streak',
          rarity: 'rare',
          icon: '🔥',
          points: 500,
          unlocked: false,
          progress: 15,
          maxProgress: 30,
          requirements: ['Complete at least one task for 30 consecutive days'],
          rewards: {
            points: 500,
            badges: ['streak-legend'],
            titles: ['Streak Master'],
            unlocks: ['fire-animation']
          }
        },
        {
          id: 'ach-4',
          name: 'Team Player',
          description: 'Collaborate on 25 team projects',
          category: 'social',
          rarity: 'uncommon',
          icon: '👥',
          points: 300,
          unlocked: true,
          progress: 25,
          maxProgress: 25,
          unlockedAt: new Date(Date.now() - 172800000).toISOString(),
          requirements: ['Participate in 25 team projects'],
          rewards: {
            points: 300,
            badges: ['team-player'],
            titles: ['Collaborator'],
            unlocks: ['team-chat-theme']
          }
        },
        {
          id: 'ach-5',
          name: 'Milestone Master',
          description: 'Complete 10 major project milestones',
          category: 'milestone',
          rarity: 'epic',
          icon: '🏆',
          points: 750,
          unlocked: false,
          progress: 7,
          maxProgress: 10,
          requirements: ['Complete 10 major project milestones'],
          rewards: {
            points: 750,
            badges: ['milestone-master'],
            titles: ['Project Champion'],
            unlocks: ['trophy-display']
          }
        },
        {
          id: 'ach-6',
          name: 'Night Owl',
          description: 'Complete tasks between 11 PM and 2 AM',
          category: 'special',
          rarity: 'rare',
          icon: '🦉',
          points: 400,
          unlocked: false,
          progress: 3,
          maxProgress: 10,
          requirements: ['Complete 10 tasks between 11 PM and 2 AM'],
          rewards: {
            points: 400,
            badges: ['night-owl'],
            titles: ['Nocturnal Worker'],
            unlocks: ['dark-mode-plus']
          }
        },
        {
          id: 'ach-7',
          name: 'Early Bird',
          description: 'Complete tasks between 5 AM and 8 AM',
          category: 'special',
          rarity: 'rare',
          icon: '🐦',
          points: 400,
          unlocked: false,
          progress: 8,
          maxProgress: 10,
          requirements: ['Complete 10 tasks between 5 AM and 8 AM'],
          rewards: {
            points: 400,
            badges: ['early-bird'],
            titles: ['Morning Warrior'],
            unlocks: ['sunrise-theme']
          }
        },
        {
          id: 'ach-8',
          name: 'Seasonal Champion',
          description: 'Complete all seasonal challenges',
          category: 'seasonal',
          rarity: 'legendary',
          icon: '🌟',
          points: 1000,
          unlocked: false,
          progress: 0,
          maxProgress: 4,
          requirements: ['Complete Spring, Summer, Fall, and Winter challenges'],
          rewards: {
            points: 1000,
            badges: ['seasonal-champion'],
            titles: ['Seasonal Master'],
            unlocks: ['cosmic-theme', 'special-effects']
          }
        }
      ];

      // Mock badges
      const mockBadges: Badge[] = [
        {
          id: 'badge-1',
          name: 'Task Master',
          description: 'Completed 100 tasks',
          icon: '📝',
          rarity: 'common',
          category: 'productivity',
          earned: true,
          earnedAt: new Date(Date.now() - 86400000).toISOString(),
          progress: 100,
          maxProgress: 100
        },
        {
          id: 'badge-2',
          name: 'Team Player',
          description: 'Collaborated on 25 team projects',
          icon: '👥',
          rarity: 'uncommon',
          category: 'social',
          earned: true,
          earnedAt: new Date(Date.now() - 172800000).toISOString(),
          progress: 25,
          maxProgress: 25
        },
        {
          id: 'badge-3',
          name: 'Energy Surge',
          description: 'Reached max energy 50 times',
          icon: '⚡',
          rarity: 'uncommon',
          category: 'productivity',
          earned: false,
          progress: 32,
          maxProgress: 50
        },
        {
          id: 'badge-4',
          name: 'Streak Legend',
          description: '30-day productivity streak',
          icon: '🔥',
          rarity: 'rare',
          category: 'streak',
          earned: false,
          progress: 15,
          maxProgress: 30
        },
        {
          id: 'badge-5',
          name: 'Milestone Master',
          description: 'Completed 10 major milestones',
          icon: '🏆',
          rarity: 'epic',
          category: 'milestone',
          earned: false,
          progress: 7,
          maxProgress: 10
        }
      ];

      // Mock titles
      const mockTitles: Title[] = [
        {
          id: 'title-1',
          name: 'Task Master',
          description: 'Master of task completion',
          rarity: 'common',
          requirements: ['Complete 100 tasks'],
          unlocked: true,
          unlockedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'title-2',
          name: 'Collaborator',
          description: 'Team player extraordinaire',
          rarity: 'uncommon',
          requirements: ['Participate in 25 team projects'],
          unlocked: true,
          unlockedAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'title-3',
          name: 'Energy Master',
          description: 'Master of energy management',
          rarity: 'uncommon',
          requirements: ['Reach energy level 10 fifty times'],
          unlocked: false
        },
        {
          id: 'title-4',
          name: 'Streak Master',
          description: 'Master of consistency',
          rarity: 'rare',
          requirements: ['Complete at least one task for 30 consecutive days'],
          unlocked: false
        },
        {
          id: 'title-5',
          name: 'Project Champion',
          description: 'Champion of major projects',
          rarity: 'epic',
          requirements: ['Complete 10 major project milestones'],
          unlocked: false
        }
      ];

      setAchievements(mockAchievements);
      setBadges(mockBadges);
      setTitles(mockTitles);
    } catch (error) {
      console.error('Failed to load achievement data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    setIsUnlocking(true);
    
    try {
      // Simulate achievement unlock
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAchievements(prev => prev.map(achievement => 
        achievement.id === achievementId 
          ? { 
              ...achievement, 
              unlocked: true, 
              progress: achievement.maxProgress,
              unlockedAt: new Date().toISOString()
            }
          : achievement
      ));
      
      console.log(`Achievement unlocked: ${achievementId}`);
    } catch (error) {
      console.error('Failed to unlock achievement:', error);
    } finally {
      setIsUnlocking(false);
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'productivity': return '📈';
      case 'social': return '👥';
      case 'streak': return '🔥';
      case 'milestone': return '🏆';
      case 'special': return '⭐';
      case 'seasonal': return '🌟';
      default: return '📄';
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
            <span className="text-lg font-medium text-gray-700">Loading achievement system...</span>
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
              <h2 className="text-2xl font-bold">Achievement System 2.0</h2>
              <p className="text-purple-100 mt-1">More complex achievements and rewards</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Achievements:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {achievements.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Unlocked:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {achievements.filter(a => a.unlocked).length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Total Points:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)}
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
              { id: 'achievements', name: 'Achievements', icon: '🏆' },
              { id: 'badges', name: 'Badges', icon: '🎖️' },
              { id: 'titles', name: 'Titles', icon: '👑' },
              { id: 'progress', name: 'Progress', icon: '📊' }
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
          {selectedTab === 'achievements' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      achievement.unlocked 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {achievement.points} pts
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress:</span>
                        <span className="text-gray-900">
                          {achievement.progress} / {achievement.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            achievement.unlocked ? 'bg-green-500' : 'bg-purple-500'
                          }`}
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Requirements:</div>
                      <div className="text-xs text-gray-600">{achievement.requirements.join(', ')}</div>
                    </div>
                    
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="mt-2 text-xs text-green-600">
                        Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                    
                    {!achievement.unlocked && (
                      <div className="mt-3 flex items-center space-x-2">
                        <button
                          onClick={() => unlockAchievement(achievement.id)}
                          disabled={isUnlocking}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all disabled:opacity-50"
                        >
                          {isUnlocking ? 'Unlocking...' : 'Unlock'}
                        </button>
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                          View Details
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'badges' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Badges</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      badge.earned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h4 className="font-medium text-gray-900 mb-1">{badge.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                      
                      <div className="space-y-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity.toUpperCase()}
                        </span>
                        <div className="text-xs text-gray-500 capitalize">{badge.category}</div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              badge.earned ? 'bg-green-500' : 'bg-purple-500'
                            }`}
                            style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-xs text-gray-600">
                          {badge.progress} / {badge.maxProgress}
                        </div>
                        
                        {badge.earned && badge.earnedAt && (
                          <div className="text-xs text-green-600">
                            Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'titles' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Titles</h3>
              
              <div className="space-y-4">
                {titles.map((title) => (
                  <motion.div
                    key={title.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      title.unlocked 
                        ? 'border-yellow-200 bg-yellow-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{title.name}</h4>
                        <p className="text-sm text-gray-600">{title.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(title.rarity)}`}>
                        {title.rarity.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Requirements:</div>
                      <div className="text-sm text-gray-600">{title.requirements.join(', ')}</div>
                    </div>
                    
                    {title.unlocked && title.unlockedAt && (
                      <div className="mt-2 text-sm text-green-600">
                        Unlocked: {new Date(title.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'progress' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Progress Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {achievements.filter(a => a.unlocked).length}
                  </div>
                  <div className="text-sm text-gray-600">Achievements Unlocked</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}% Complete
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {badges.filter(b => b.earned).length}
                  </div>
                  <div className="text-sm text-gray-600">Badges Earned</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round((badges.filter(b => b.earned).length / badges.length) * 100)}% Complete
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {titles.filter(t => t.unlocked).length}
                  </div>
                  <div className="text-sm text-gray-600">Titles Unlocked</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round((titles.filter(t => t.unlocked).length / titles.length) * 100)}% Complete
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    {achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Points</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)} / {achievements.reduce((sum, a) => sum + a.points, 0)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Achievement System 2.0 • {achievements.filter(a => a.unlocked).length}/{achievements.length} unlocked • {achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)} points
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
                console.log('Exporting achievement data...');
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

export default AchievementSystem;
