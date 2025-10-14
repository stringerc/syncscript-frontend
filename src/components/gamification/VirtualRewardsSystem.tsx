/**
 * Virtual Rewards System Component
 * 
 * Digital badges, certificates, and NFT rewards
 * Includes reward collection, trading, and showcase features
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VirtualReward {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'certificate' | 'nft' | 'theme' | 'avatar' | 'title';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  icon: string;
  image: string;
  value: number;
  earned: boolean;
  earnedAt?: string;
  source: 'achievement' | 'competition' | 'purchase' | 'gift' | 'special';
  tradeable: boolean;
  showcaseable: boolean;
}

interface Certificate {
  id: string;
  name: string;
  description: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  verificationCode: string;
  skills: string[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  earned: boolean;
}

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  blockchain: 'ethereum' | 'polygon' | 'solana' | 'syncscript';
  contractAddress: string;
  tokenId: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  attributes: Record<string, string>;
  value: number;
  owned: boolean;
  tradeable: boolean;
}

interface VirtualRewardsSystemProps {
  onClose: () => void;
}

const VirtualRewardsSystem: React.FC<VirtualRewardsSystemProps> = ({ onClose }) => {
  const [rewards, setRewards] = useState<VirtualReward[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'rewards' | 'certificates' | 'nfts' | 'showcase'>('rewards');
  const [isTrading, setIsTrading] = useState(false);

  useEffect(() => {
    loadRewardsData();
  }, []);

  const loadRewardsData = async () => {
    setIsLoading(true);
    
    try {
      // Mock virtual rewards
      const mockRewards: VirtualReward[] = [
        {
          id: 'reward-1',
          name: 'Golden Task Master',
          description: 'Earned by completing 1000 tasks',
          type: 'badge',
          rarity: 'legendary',
          icon: '🏆',
          image: 'https://via.placeholder.com/200x200/FFD700/000000?text=Golden+Task+Master',
          value: 1000,
          earned: true,
          earnedAt: new Date(Date.now() - 86400000).toISOString(),
          source: 'achievement',
          tradeable: true,
          showcaseable: true
        },
        {
          id: 'reward-2',
          name: 'Productivity Certificate',
          description: 'Certified productivity expert',
          type: 'certificate',
          rarity: 'epic',
          icon: '📜',
          image: 'https://via.placeholder.com/200x200/4169E1/FFFFFF?text=Productivity+Certificate',
          value: 500,
          earned: true,
          earnedAt: new Date(Date.now() - 172800000).toISOString(),
          source: 'achievement',
          tradeable: false,
          showcaseable: true
        },
        {
          id: 'reward-3',
          name: 'Lightning Theme',
          description: 'Exclusive lightning-themed UI',
          type: 'theme',
          rarity: 'rare',
          icon: '⚡',
          image: 'https://via.placeholder.com/200x200/FF4500/FFFFFF?text=Lightning+Theme',
          value: 300,
          earned: false,
          source: 'competition',
          tradeable: true,
          showcaseable: true
        },
        {
          id: 'reward-4',
          name: 'Cosmic Avatar',
          description: 'Mystical cosmic avatar frame',
          type: 'avatar',
          rarity: 'epic',
          icon: '🌌',
          image: 'https://via.placeholder.com/200x200/8A2BE2/FFFFFF?text=Cosmic+Avatar',
          value: 750,
          earned: false,
          source: 'special',
          tradeable: true,
          showcaseable: true
        },
        {
          id: 'reward-5',
          name: 'Legendary Title',
          description: 'Exclusive legendary title',
          type: 'title',
          rarity: 'legendary',
          icon: '👑',
          image: 'https://via.placeholder.com/200x200/FFD700/000000?text=Legendary+Title',
          value: 1200,
          earned: false,
          source: 'achievement',
          tradeable: false,
          showcaseable: true
        },
        {
          id: 'reward-6',
          name: 'SyncScript NFT #001',
          description: 'First edition SyncScript NFT',
          type: 'nft',
          rarity: 'mythic',
          icon: '🎨',
          image: 'https://via.placeholder.com/200x200/00CED1/FFFFFF?text=SyncScript+NFT',
          value: 5000,
          earned: false,
          source: 'special',
          tradeable: true,
          showcaseable: true
        }
      ];

      // Mock certificates
      const mockCertificates: Certificate[] = [
        {
          id: 'cert-1',
          name: 'Productivity Master',
          description: 'Certified productivity expert',
          issuer: 'SyncScript Academy',
          issueDate: new Date(Date.now() - 86400000).toISOString(),
          verificationCode: 'SS-PROD-2024-001',
          skills: ['Task Management', 'Time Optimization', 'Energy Management'],
          level: 'expert',
          earned: true
        },
        {
          id: 'cert-2',
          name: 'Team Collaboration Specialist',
          description: 'Expert in team collaboration and project management',
          issuer: 'SyncScript Academy',
          issueDate: new Date(Date.now() - 172800000).toISOString(),
          verificationCode: 'SS-TEAM-2024-002',
          skills: ['Project Management', 'Team Leadership', 'Communication'],
          level: 'advanced',
          earned: true
        },
        {
          id: 'cert-3',
          name: 'AI Productivity Assistant',
          description: 'Certified AI productivity assistant user',
          issuer: 'SyncScript Academy',
          issueDate: new Date(Date.now() - 259200000).toISOString(),
          verificationCode: 'SS-AI-2024-003',
          skills: ['AI Integration', 'Automation', 'Smart Scheduling'],
          level: 'intermediate',
          earned: true
        }
      ];

      // Mock NFTs
      const mockNFTs: NFT[] = [
        {
          id: 'nft-1',
          name: 'SyncScript Genesis',
          description: 'The first SyncScript NFT ever minted',
          image: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=SyncScript+Genesis',
          blockchain: 'ethereum',
          contractAddress: '0x1234...5678',
          tokenId: '1',
          rarity: 'mythic',
          attributes: {
            'Background': 'Cosmic',
            'Energy': 'Infinite',
            'Rarity': 'Mythic',
            'Edition': 'Genesis'
          },
          value: 10000,
          owned: false,
          tradeable: true
        },
        {
          id: 'nft-2',
          name: 'Productivity Dragon',
          description: 'A mystical dragon that boosts productivity',
          image: 'https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Productivity+Dragon',
          blockchain: 'polygon',
          contractAddress: '0x5678...9ABC',
          tokenId: '42',
          rarity: 'legendary',
          attributes: {
            'Species': 'Dragon',
            'Power': 'Productivity Boost',
            'Element': 'Fire',
            'Rarity': 'Legendary'
          },
          value: 5000,
          owned: false,
          tradeable: true
        },
        {
          id: 'nft-3',
          name: 'Task Master Badge',
          description: 'Digital badge representing task mastery',
          image: 'https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Task+Master+Badge',
          blockchain: 'syncscript',
          contractAddress: '0x9ABC...DEF0',
          tokenId: '100',
          rarity: 'epic',
          attributes: {
            'Type': 'Badge',
            'Achievement': 'Task Master',
            'Level': 'Epic',
            'Rarity': 'Epic'
          },
          value: 2000,
          owned: true,
          tradeable: true
        }
      ];

      setRewards(mockRewards);
      setCertificates(mockCertificates);
      setNFTs(mockNFTs);
    } catch (error) {
      console.error('Failed to load rewards data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tradeReward = async (rewardId: string) => {
    setIsTrading(true);
    
    try {
      // Simulate trading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Trading reward: ${rewardId}`);
    } catch (error) {
      console.error('Failed to trade reward:', error);
    } finally {
      setIsTrading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'uncommon': return 'text-green-600 bg-green-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      case 'mythic': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'badge': return '🏆';
      case 'certificate': return '📜';
      case 'nft': return '🎨';
      case 'theme': return '🎨';
      case 'avatar': return '👤';
      case 'title': return '👑';
      default: return '🎁';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'achievement': return '🏆';
      case 'competition': return '🥇';
      case 'purchase': return '💳';
      case 'gift': return '🎁';
      case 'special': return '⭐';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading virtual rewards...</span>
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
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Virtual Rewards</h2>
              <p className="text-yellow-100 mt-1">Digital badges, certificates, and NFT rewards</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-200 text-sm">Rewards:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {rewards.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-200 text-sm">Earned:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {rewards.filter(r => r.earned).length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-200 text-sm">Total Value:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {rewards.filter(r => r.earned).reduce((sum, r) => sum + r.value, 0)}
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
              { id: 'rewards', name: 'Rewards', icon: '🎁' },
              { id: 'certificates', name: 'Certificates', icon: '📜' },
              { id: 'nfts', name: 'NFTs', icon: '🎨' },
              { id: 'showcase', name: 'Showcase', icon: '🏆' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
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
          {selectedTab === 'rewards' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Virtual Rewards</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map((reward) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      reward.earned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{reward.icon}</div>
                      <h4 className="font-medium text-gray-900 mb-1">{reward.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(reward.rarity)}`}>
                            {reward.rarity.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {reward.value} pts
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
                          <span>{getTypeIcon(reward.type)}</span>
                          <span className="capitalize">{reward.type}</span>
                          <span>{getSourceIcon(reward.source)}</span>
                          <span className="capitalize">{reward.source}</span>
                        </div>
                        
                        {reward.earned && reward.earnedAt && (
                          <div className="text-xs text-green-600">
                            Earned: {new Date(reward.earnedAt).toLocaleDateString()}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-center space-x-2">
                          {reward.tradeable && (
                            <span className="text-xs text-blue-600">Tradeable</span>
                          )}
                          {reward.showcaseable && (
                            <span className="text-xs text-purple-600">Showcaseable</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-center space-x-2">
                        {reward.tradeable && (
                          <button
                            onClick={() => tradeReward(reward.id)}
                            disabled={isTrading}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all disabled:opacity-50"
                          >
                            {isTrading ? 'Trading...' : 'Trade'}
                          </button>
                        )}
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'certificates' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Certificates</h3>
              
              <div className="space-y-4">
                {certificates.map((certificate) => (
                  <motion.div
                    key={certificate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      certificate.earned 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">📜</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{certificate.name}</h4>
                        <p className="text-sm text-gray-600">{certificate.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Issued by: {certificate.issuer}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          certificate.level === 'expert' ? 'bg-red-100 text-red-800' :
                          certificate.level === 'advanced' ? 'bg-purple-100 text-purple-800' :
                          certificate.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {certificate.level.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="text-sm font-medium text-gray-700">Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Issue Date:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(certificate.issueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Verification:</span>
                        <span className="ml-2 text-gray-900 font-mono text-xs">
                          {certificate.verificationCode}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'nfts' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">NFT Collection</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.map((nft) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      nft.owned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-4xl">🎨</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{nft.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{nft.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(nft.rarity)}`}>
                            {nft.rarity.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {nft.value} pts
                          </span>
                        </div>
                        
                        <div className="text-xs text-gray-600">
                          Blockchain: {nft.blockchain}
                        </div>
                        
                        <div className="text-xs text-gray-600">
                          Token ID: {nft.tokenId}
                        </div>
                        
                        {nft.owned && (
                          <div className="text-xs text-green-600">
                            Owned
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 flex items-center justify-center space-x-2">
                        {nft.tradeable && (
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                            Trade
                          </button>
                        )}
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'showcase' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Reward Showcase</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Earned Rewards</h4>
                  <div className="space-y-2">
                    {rewards.filter(r => r.earned).map((reward) => (
                      <div key={reward.id} className="flex items-center space-x-3 p-2 bg-green-50 rounded">
                        <span className="text-2xl">{reward.icon}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{reward.name}</div>
                          <div className="text-xs text-gray-600">{reward.description}</div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(reward.rarity)}`}>
                          {reward.rarity.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Achievement Stats</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Rewards:</span>
                      <span className="text-sm font-medium text-gray-900">{rewards.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Earned:</span>
                      <span className="text-sm font-medium text-gray-900">{rewards.filter(r => r.earned).length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Certificates:</span>
                      <span className="text-sm font-medium text-gray-900">{certificates.filter(c => c.earned).length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">NFTs Owned:</span>
                      <span className="text-sm font-medium text-gray-900">{nfts.filter(n => n.owned).length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Value:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {rewards.filter(r => r.earned).reduce((sum, r) => sum + r.value, 0)} pts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Virtual Rewards • {rewards.filter(r => r.earned).length}/{rewards.length} earned • {certificates.filter(c => c.earned).length} certificates • {nfts.filter(n => n.owned).length} NFTs
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
                console.log('Exporting rewards data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VirtualRewardsSystem;
