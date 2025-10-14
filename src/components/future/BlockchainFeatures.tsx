/**
 * Blockchain Features System Component
 * 
 * Decentralized task verification and rewards
 * Includes smart contracts, NFT rewards, and decentralized storage
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SmartContract {
  id: string;
  name: string;
  description: string;
  type: 'task-verification' | 'reward-distribution' | 'governance' | 'staking';
  address: string;
  network: 'ethereum' | 'polygon' | 'solana' | 'syncscript-chain';
  status: 'active' | 'pending' | 'paused' | 'deprecated';
  gasCost: number;
  lastExecuted: string;
  executions: number;
}

interface NFTReward {
  id: string;
  name: string;
  description: string;
  image: string;
  contractAddress: string;
  tokenId: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  attributes: Record<string, string>;
  mintedAt: string;
  owner: string;
  value: number;
  tradeable: boolean;
}

interface DecentralizedTask {
  id: string;
  title: string;
  description: string;
  hash: string;
  blockNumber: number;
  timestamp: string;
  verifier: string;
  status: 'pending' | 'verified' | 'disputed' | 'completed';
  reward: number;
  stake: number;
  evidence: string[];
}

interface DAOGovernance {
  id: string;
  proposal: string;
  description: string;
  proposer: string;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  endDate: string;
  executionDate?: string;
}

interface BlockchainFeaturesProps {
  onClose: () => void;
}

const BlockchainFeatures: React.FC<BlockchainFeaturesProps> = ({ onClose }) => {
  const [smartContracts, setSmartContracts] = useState<SmartContract[]>([]);
  const [nftRewards, setNFTRewards] = useState<NFTReward[]>([]);
  const [decentralizedTasks, setDecentralizedTasks] = useState<DecentralizedTask[]>([]);
  const [daoGovernance, setDAOGovernance] = useState<DAOGovernance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'contracts' | 'nfts' | 'tasks' | 'governance'>('contracts');
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    setIsLoading(true);
    
    try {
      // Mock smart contracts
      const mockSmartContracts: SmartContract[] = [
        {
          id: 'contract-1',
          name: 'Task Verification Contract',
          description: 'Automatically verifies task completion using blockchain',
          type: 'task-verification',
          address: '0x1234...5678',
          network: 'ethereum',
          status: 'active',
          gasCost: 0.001,
          lastExecuted: new Date(Date.now() - 3600000).toISOString(),
          executions: 1250
        },
        {
          id: 'contract-2',
          name: 'Reward Distribution Contract',
          description: 'Distributes rewards based on productivity metrics',
          type: 'reward-distribution',
          address: '0x5678...9ABC',
          network: 'polygon',
          status: 'active',
          gasCost: 0.0005,
          lastExecuted: new Date(Date.now() - 1800000).toISOString(),
          executions: 890
        },
        {
          id: 'contract-3',
          name: 'Governance Contract',
          description: 'Manages DAO voting and proposal execution',
          type: 'governance',
          address: '0x9ABC...DEF0',
          network: 'syncscript-chain',
          status: 'active',
          gasCost: 0.002,
          lastExecuted: new Date(Date.now() - 7200000).toISOString(),
          executions: 45
        },
        {
          id: 'contract-4',
          name: 'Staking Contract',
          description: 'Allows users to stake tokens for additional rewards',
          type: 'staking',
          address: '0xDEF0...1234',
          network: 'solana',
          status: 'pending',
          gasCost: 0.0001,
          lastExecuted: new Date(Date.now() - 86400000).toISOString(),
          executions: 0
        }
      ];

      // Mock NFT rewards
      const mockNFTRewards: NFTReward[] = [
        {
          id: 'nft-1',
          name: 'Productivity Master NFT',
          description: 'Rare NFT awarded for exceptional productivity',
          image: 'https://via.placeholder.com/300x300/FFD700/000000?text=Productivity+Master',
          contractAddress: '0x1234...5678',
          tokenId: '1',
          rarity: 'legendary',
          attributes: {
            'Productivity': '100',
            'Consistency': '95',
            'Innovation': '90',
            'Leadership': '85'
          },
          mintedAt: new Date(Date.now() - 86400000).toISOString(),
          owner: '0x1234...5678',
          value: 5000,
          tradeable: true
        },
        {
          id: 'nft-2',
          name: 'Task Completion Badge',
          description: 'Common NFT for completing 100 tasks',
          image: 'https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Task+Badge',
          contractAddress: '0x5678...9ABC',
          tokenId: '42',
          rarity: 'common',
          attributes: {
            'Tasks Completed': '100',
            'Accuracy': '98',
            'Speed': '85'
          },
          mintedAt: new Date(Date.now() - 172800000).toISOString(),
          owner: '0x5678...9ABC',
          value: 100,
          tradeable: true
        },
        {
          id: 'nft-3',
          name: 'Team Collaboration Token',
          description: 'Epic NFT for outstanding team collaboration',
          image: 'https://via.placeholder.com/300x300/8A2BE2/FFFFFF?text=Team+Token',
          contractAddress: '0x9ABC...DEF0',
          tokenId: '100',
          rarity: 'epic',
          attributes: {
            'Teamwork': '95',
            'Communication': '90',
            'Leadership': '85',
            'Innovation': '80'
          },
          mintedAt: new Date(Date.now() - 259200000).toISOString(),
          owner: '0x9ABC...DEF0',
          value: 2000,
          tradeable: true
        }
      ];

      // Mock decentralized tasks
      const mockDecentralizedTasks: DecentralizedTask[] = [
        {
          id: 'task-1',
          title: 'Complete Project Alpha',
          description: 'Finish the alpha version of the new feature',
          hash: '0xabcd1234...',
          blockNumber: 12345678,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          verifier: '0x1234...5678',
          status: 'verified',
          reward: 100,
          stake: 50,
          evidence: ['screenshot.png', 'code-review.pdf', 'test-results.json']
        },
        {
          id: 'task-2',
          title: 'Code Review Session',
          description: 'Review pull requests and provide feedback',
          hash: '0xefgh5678...',
          blockNumber: 12345679,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          verifier: '0x5678...9ABC',
          status: 'pending',
          reward: 75,
          stake: 25,
          evidence: ['review-notes.md', 'feedback.pdf']
        },
        {
          id: 'task-3',
          title: 'Team Meeting',
          description: 'Weekly team sync and planning session',
          hash: '0xijkl9012...',
          blockNumber: 12345680,
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          verifier: '0x9ABC...DEF0',
          status: 'disputed',
          reward: 50,
          stake: 30,
          evidence: ['meeting-recording.mp4', 'minutes.pdf']
        }
      ];

      // Mock DAO governance
      const mockDAOGovernance: DAOGovernance[] = [
        {
          id: 'proposal-1',
          proposal: 'Increase Task Reward Multiplier',
          description: 'Proposal to increase task reward multiplier from 1.5x to 2x',
          proposer: '0x1234...5678',
          status: 'active',
          votesFor: 1250,
          votesAgainst: 320,
          totalVotes: 1570,
          endDate: new Date(Date.now() + 86400000).toISOString()
        },
        {
          id: 'proposal-2',
          proposal: 'Add New Productivity Metrics',
          description: 'Add focus time and energy efficiency as new productivity metrics',
          proposer: '0x5678...9ABC',
          status: 'passed',
          votesFor: 890,
          votesAgainst: 210,
          totalVotes: 1100,
          endDate: new Date(Date.now() - 172800000).toISOString(),
          executionDate: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'proposal-3',
          proposal: 'Implement Staking Rewards',
          description: 'Allow users to stake tokens for additional productivity rewards',
          proposer: '0x9ABC...DEF0',
          status: 'rejected',
          votesFor: 450,
          votesAgainst: 780,
          totalVotes: 1230,
          endDate: new Date(Date.now() - 259200000).toISOString()
        }
      ];

      setSmartContracts(mockSmartContracts);
      setNFTRewards(mockNFTRewards);
      setDecentralizedTasks(mockDecentralizedTasks);
      setDAOGovernance(mockDAOGovernance);
    } catch (error) {
      console.error('Failed to load blockchain data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const executeContract = async (contractId: string) => {
    setIsExecuting(true);
    
    try {
      // Simulate contract execution
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setSmartContracts(prev => prev.map(contract => 
        contract.id === contractId 
          ? { 
              ...contract, 
              executions: contract.executions + 1,
              lastExecuted: new Date().toISOString()
            }
          : contract
      ));
      
      console.log(`Executed contract: ${contractId}`);
    } catch (error) {
      console.error('Failed to execute contract:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const voteOnProposal = async (proposalId: string, vote: 'for' | 'against') => {
    try {
      setDAOGovernance(prev => prev.map(proposal => 
        proposal.id === proposalId 
          ? { 
              ...proposal, 
              votesFor: vote === 'for' ? proposal.votesFor + 1 : proposal.votesFor,
              votesAgainst: vote === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst,
              totalVotes: proposal.totalVotes + 1
            }
          : proposal
      ));
      
      console.log(`Voted ${vote} on proposal: ${proposalId}`);
    } catch (error) {
      console.error('Failed to vote on proposal:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task-verification': return '✅';
      case 'reward-distribution': return '💰';
      case 'governance': return '🗳️';
      case 'staking': return '🔒';
      default: return '📄';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'paused': return 'text-orange-600 bg-orange-100';
      case 'deprecated': return 'text-red-600 bg-red-100';
      case 'verified': return 'text-green-600 bg-green-100';
      case 'disputed': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'passed': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'executed': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const getNetworkIcon = (network: string) => {
    switch (network) {
      case 'ethereum': return '⟠';
      case 'polygon': return '⬟';
      case 'solana': return '◎';
      case 'syncscript-chain': return '⚡';
      default: return '🔗';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading blockchain features...</span>
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
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Blockchain Features</h2>
              <p className="text-blue-100 mt-1">Decentralized task verification and rewards</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Contracts:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {smartContracts.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">NFTs:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {nftRewards.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Tasks:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {decentralizedTasks.length}
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
              { id: 'contracts', name: 'Smart Contracts', icon: '📄' },
              { id: 'nfts', name: 'NFT Rewards', icon: '🎨' },
              { id: 'tasks', name: 'Decentralized Tasks', icon: '📋' },
              { id: 'governance', name: 'DAO Governance', icon: '🗳️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
          {selectedTab === 'contracts' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Smart Contracts</h3>
              
              <div className="space-y-4">
                {smartContracts.map((contract) => (
                  <motion.div
                    key={contract.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getTypeIcon(contract.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{contract.name}</h4>
                        <p className="text-sm text-gray-600">{contract.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(contract.status)}`}>
                          {contract.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {getNetworkIcon(contract.network)} {contract.network.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Address:</span>
                        <span className="ml-2 text-gray-900 font-mono">{contract.address}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Gas Cost:</span>
                        <span className="ml-2 text-gray-900">{contract.gasCost} ETH</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Executions:</span>
                        <span className="ml-2 text-gray-900">{contract.executions}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Executed:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(contract.lastExecuted).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => executeContract(contract.id)}
                        disabled={isExecuting || contract.status !== 'active'}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all disabled:opacity-50"
                      >
                        {isExecuting ? 'Executing...' : 'Execute'}
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        View Code
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'nfts' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">NFT Rewards</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nftRewards.map((nft) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="text-center">
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-gray-500">NFT Image</span>
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
                          Contract: {nft.contractAddress}
                        </div>
                        <div className="text-xs text-gray-600">
                          Token ID: {nft.tokenId}
                        </div>
                        
                        <div className="text-sm font-medium text-gray-700">Attributes:</div>
                        <div className="space-y-1">
                          {Object.entries(nft.attributes).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-xs">
                              <span className="text-gray-600">{key}:</span>
                              <span className="text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
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

          {selectedTab === 'tasks' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Decentralized Tasks</h3>
              
              <div className="space-y-4">
                {decentralizedTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Hash:</span>
                        <span className="ml-2 text-gray-900 font-mono">{task.hash}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Block:</span>
                        <span className="ml-2 text-gray-900">{task.blockNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Reward:</span>
                        <span className="ml-2 text-gray-900">{task.reward} tokens</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Stake:</span>
                        <span className="ml-2 text-gray-900">{task.stake} tokens</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Evidence:</div>
                      <div className="flex flex-wrap gap-1">
                        {task.evidence.map((evidence, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {evidence}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'governance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">DAO Governance</h3>
              
              <div className="space-y-4">
                {daoGovernance.map((proposal) => (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{proposal.proposal}</h4>
                        <p className="text-sm text-gray-600">{proposal.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(proposal.status)}`}>
                        {proposal.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Votes For:</span>
                        <span className="text-green-600 font-medium">{proposal.votesFor}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Votes Against:</span>
                        <span className="text-red-600 font-medium">{proposal.votesAgainst}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Votes: {proposal.totalVotes}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {proposal.status === 'active' && (
                        <>
                          <button
                            onClick={() => voteOnProposal(proposal.id, 'for')}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all"
                          >
                            Vote For
                          </button>
                          <button
                            onClick={() => voteOnProposal(proposal.id, 'against')}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-all"
                          >
                            Vote Against
                          </button>
                        </>
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
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Blockchain Features • {smartContracts.filter(c => c.status === 'active').length} active contracts • {nftRewards.length} NFTs • {decentralizedTasks.length} decentralized tasks
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
                console.log('Exporting blockchain data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlockchainFeatures;
