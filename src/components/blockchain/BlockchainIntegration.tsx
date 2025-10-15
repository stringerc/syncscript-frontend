import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Coins, Shield, Zap, TrendingUp, Globe, Key, Lock, Unlock, CheckCircle, AlertTriangle, Clock, Calendar, MessageCircle, Mail, Phone, Video, Mic, Camera, Image, FileText, Link, Share2, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Meh, Laugh, Angry, Surprised, Target, Building, UserCheck, Server, Cloud, Workflow, Integration, Analytics, Compliance, Governance, Audit, Policy, Certificate, Badge, Flag, Alert, Info, HelpCircle, ExternalLink, Edit, Trash2, Save, Copy, Paste, Cut, Undo, Redo, Play, Pause, Stop, RefreshCw, RotateCcw, Maximize, Minimize, Filter, Search, Plus, Minus, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Code, Database, Cpu, HardDrive, Network, Globe as GlobeIcon, Lock as LockIcon, CheckCircle as CheckIcon, AlertTriangle as AlertIcon, Clock as ClockIcon, Calendar as CalendarIcon, MessageCircle as MessageIcon, Mail as MailIcon, Phone as PhoneIcon, Video as VideoIcon, Image as ImageIcon, FileText as FileIcon, Link as LinkIcon, Share2 as ShareIcon, Heart as HeartIcon, ThumbsUp as ThumbsUpIcon, ThumbsDown as ThumbsDownIcon, Smile as SmileIcon, Frown as FrownIcon, Meh as MehIcon, Laugh as LaughIcon, Angry as AngryIcon, Surprised as SurprisedIcon, Target as TargetIcon, Building as BuildingIcon, UserCheck as UserCheckIcon, Server as ServerIcon, Cloud as CloudIcon, Workflow as WorkflowIcon, Integration as IntegrationIcon, Analytics as AnalyticsIcon, Compliance as ComplianceIcon, Governance as GovernanceIcon, Audit as AuditIcon, Policy as PolicyIcon, Certificate as CertificateIcon, Badge as BadgeIcon, Flag as FlagIcon, Alert as AlertIcon2, Info as InfoIcon, HelpCircle as HelpIcon, ExternalLink as ExternalIcon, Edit as EditIcon, Trash2 as TrashIcon, Save as SaveIcon, Copy as CopyIcon, Paste as PasteIcon, Cut as CutIcon, Undo as UndoIcon, Redo as RedoIcon, Play as PlayIcon, Pause as PauseIcon, Stop as StopIcon, RefreshCw as RefreshIcon, RotateCcw as RotateIcon, Maximize as MaximizeIcon, Minimize as MinimizeIcon, Filter as FilterIcon, Search as SearchIcon, Plus as PlusIcon, Minus as MinusIcon, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, ArrowRight as ArrowRightIcon, ArrowLeft as ArrowLeftIcon, Code as CodeIcon, Database as DatabaseIcon, Cpu as CpuIcon, HardDrive as HardDriveIcon, Network as NetworkIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-hot-toast';

// Blockchain interfaces
interface Wallet {
  id: string;
  name: string;
  address: string;
  type: 'metamask' | 'walletconnect' | 'coinbase' | 'phantom';
  network: string;
  balance: number;
  isConnected: boolean;
  lastActivity: string;
}

interface SmartContract {
  id: string;
  name: string;
  address: string;
  network: string;
  type: 'task' | 'reward' | 'governance' | 'defi';
  abi: any;
  deployedAt: string;
  gasUsed: number;
  status: 'active' | 'paused' | 'upgrading';
}

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  tokenId: string;
  contractAddress: string;
  network: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  attributes: Record<string, any>;
  owner: string;
  mintedAt: string;
}

interface DeFiPosition {
  id: string;
  protocol: string;
  type: 'lending' | 'borrowing' | 'staking' | 'liquidity';
  asset: string;
  amount: number;
  apy: number;
  value: number;
  network: string;
  createdAt: string;
}

interface DAOProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  deadline: string;
  createdAt: string;
}

interface BlockchainNetwork {
  id: string;
  name: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  isActive: boolean;
}

const BlockchainIntegration: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [smartContracts, setSmartContracts] = useState<SmartContract[]>([]);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [defiPositions, setDefiPositions] = useState<DeFiPosition[]>([]);
  const [daoProposals, setDaoProposals] = useState<DAOProposal[]>([]);
  const [networks, setNetworks] = useState<BlockchainNetwork[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('ethereum');

  // Refs for Web3 functionality
  const web3Ref = useRef<any>(null);
  const providerRef = useRef<any>(null);

  // SSR-safe data loading
  useEffect(() => {
    const loadBlockchainData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call with SSR-safe delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock wallets data
        const mockWallets: Wallet[] = [
          {
            id: 'wallet-1',
            name: 'MetaMask',
            address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
            type: 'metamask',
            network: 'Ethereum',
            balance: 2.45,
            isConnected: true,
            lastActivity: new Date().toISOString()
          },
          {
            id: 'wallet-2',
            name: 'WalletConnect',
            address: '0x8ba1f109551bD432803012645Hac136c',
            type: 'walletconnect',
            network: 'Polygon',
            balance: 156.78,
            isConnected: false,
            lastActivity: new Date(Date.now() - 3600000).toISOString()
          }
        ];

        // Mock smart contracts data
        const mockSmartContracts: SmartContract[] = [
          {
            id: 'contract-1',
            name: 'TaskReward Contract',
            address: '0x1234567890123456789012345678901234567890',
            network: 'Ethereum',
            type: 'task',
            abi: {},
            deployedAt: new Date().toISOString(),
            gasUsed: 125000,
            status: 'active'
          },
          {
            id: 'contract-2',
            name: 'NFT Rewards',
            address: '0x2345678901234567890123456789012345678901',
            network: 'Polygon',
            type: 'reward',
            abi: {},
            deployedAt: new Date().toISOString(),
            gasUsed: 89000,
            status: 'active'
          },
          {
            id: 'contract-3',
            name: 'DAO Governance',
            address: '0x3456789012345678901234567890123456789012',
            network: 'Ethereum',
            type: 'governance',
            abi: {},
            deployedAt: new Date().toISOString(),
            gasUsed: 200000,
            status: 'active'
          }
        ];

        // Mock NFTs data
        const mockNFTs: NFT[] = [
          {
            id: 'nft-1',
            name: 'Productivity Master',
            description: 'Awarded for completing 100 tasks',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkZEOTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3Rpdml0eSBNYXN0ZXI8L3RleHQ+PC9zdmc+',
            tokenId: '1',
            contractAddress: '0x2345678901234567890123456789012345678901',
            network: 'Polygon',
            rarity: 'rare',
            attributes: {
              'Task Count': 100,
              'Energy Level': 'High',
              'Achievement': 'Master'
            },
            owner: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
            mintedAt: new Date().toISOString()
          },
          {
            id: 'nft-2',
            name: 'Focus Champion',
            description: 'Awarded for maintaining 7-day focus streak',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDBCRkYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Rm9jdXMgQ2hhbXBpb248L3RleHQ+PC9zdmc+',
            tokenId: '2',
            contractAddress: '0x2345678901234567890123456789012345678901',
            network: 'Polygon',
            rarity: 'epic',
            attributes: {
              'Focus Streak': 7,
              'Energy Level': 'Maximum',
              'Achievement': 'Champion'
            },
            owner: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
            mintedAt: new Date().toISOString()
          }
        ];

        // Mock DeFi positions data
        const mockDeFiPositions: DeFiPosition[] = [
          {
            id: 'defi-1',
            protocol: 'Aave',
            type: 'lending',
            asset: 'USDC',
            amount: 1000,
            apy: 3.2,
            value: 1000,
            network: 'Ethereum',
            createdAt: new Date().toISOString()
          },
          {
            id: 'defi-2',
            protocol: 'Compound',
            type: 'staking',
            asset: 'ETH',
            amount: 2.5,
            apy: 5.8,
            value: 5000,
            network: 'Ethereum',
            createdAt: new Date().toISOString()
          }
        ];

        // Mock DAO proposals data
        const mockDAOProposals: DAOProposal[] = [
          {
            id: 'proposal-1',
            title: 'Increase Task Reward Multiplier',
            description: 'Proposal to increase the reward multiplier for high-priority tasks from 1.5x to 2x',
            proposer: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
            votesFor: 1250,
            votesAgainst: 320,
            totalVotes: 1570,
            status: 'active',
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString()
          },
          {
            id: 'proposal-2',
            title: 'Add New Achievement Categories',
            description: 'Proposal to add new achievement categories for team collaboration and innovation',
            proposer: '0x8ba1f109551bD432803012645Hac136c',
            votesFor: 890,
            votesAgainst: 150,
            totalVotes: 1040,
            status: 'passed',
            deadline: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString()
          }
        ];

        // Mock networks data
        const mockNetworks: BlockchainNetwork[] = [
          {
            id: 'ethereum',
            name: 'Ethereum',
            chainId: 1,
            rpcUrl: 'https://mainnet.infura.io/v3/',
            explorerUrl: 'https://etherscan.io',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18
            },
            isActive: true
          },
          {
            id: 'polygon',
            name: 'Polygon',
            chainId: 137,
            rpcUrl: 'https://polygon-rpc.com',
            explorerUrl: 'https://polygonscan.com',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
            },
            isActive: true
          },
          {
            id: 'arbitrum',
            name: 'Arbitrum',
            chainId: 42161,
            rpcUrl: 'https://arb1.arbitrum.io/rpc',
            explorerUrl: 'https://arbiscan.io',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18
            },
            isActive: false
          }
        ];

        setWallets(mockWallets);
        setSmartContracts(mockSmartContracts);
        setNfts(mockNFTs);
        setDefiPositions(mockDeFiPositions);
        setDaoProposals(mockDAOProposals);
        setNetworks(mockNetworks);

        toast.success('Blockchain data loaded successfully!');
      } catch (error) {
        console.error('Failed to load blockchain data:', error);
        toast.error('Failed to load blockchain data');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlockchainData();
  }, []);

  const handleConnectWallet = useCallback(async (walletType: string) => {
    setIsConnecting(true);
    try {
      // Mock wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setWallets(prev => prev.map(wallet => 
        wallet.type === walletType 
          ? { ...wallet, isConnected: true, lastActivity: new Date().toISOString() }
          : wallet
      ));
      
      toast.success(`${walletType} wallet connected successfully!`);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const handleDisconnectWallet = useCallback((walletId: string) => {
    setWallets(prev => prev.map(wallet => 
      wallet.id === walletId 
        ? { ...wallet, isConnected: false }
        : wallet
    ));
    toast.success('Wallet disconnected');
  }, []);

  const handleVoteProposal = useCallback((proposalId: string, vote: 'for' | 'against') => {
    setDaoProposals(prev => prev.map(proposal => 
      proposal.id === proposalId 
        ? { 
            ...proposal, 
            votesFor: vote === 'for' ? proposal.votesFor + 1 : proposal.votesFor,
            votesAgainst: vote === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst,
            totalVotes: proposal.totalVotes + 1
          }
        : proposal
    ));
    toast.success(`Vote ${vote} submitted successfully!`);
  }, []);

  const handleSwitchNetwork = useCallback((networkId: string) => {
    setSelectedNetwork(networkId);
    toast.success(`Switched to ${networkId} network`);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'wallets', label: 'Wallets', icon: Wallet },
    { id: 'contracts', label: 'Contracts', icon: Shield },
    { id: 'nfts', label: 'NFTs', icon: Coins },
    { id: 'defi', label: 'DeFi', icon: TrendingUp },
    { id: 'dao', label: 'DAO', icon: Governance }
  ];

  const getWalletTypeIcon = (type: string) => {
    switch (type) {
      case 'metamask': return Wallet;
      case 'walletconnect': return Wallet;
      case 'coinbase': return Wallet;
      case 'phantom': return Wallet;
      default: return Wallet;
    }
  };

  const getContractTypeColor = (type: string) => {
    switch (type) {
      case 'task': return 'text-blue-600 bg-blue-100';
      case 'reward': return 'text-green-600 bg-green-100';
      case 'governance': return 'text-purple-600 bg-purple-100';
      case 'defi': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProposalStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'passed': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'executed': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Blockchain Integration</h2>
                <p className="text-purple-100">Web3, DeFi, NFTs, and DAO governance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm">Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Network:</span>
                <select
                  value={selectedNetwork}
                  onChange={(e) => handleSwitchNetwork(e.target.value)}
                  className="bg-white bg-opacity-20 text-white rounded px-2 py-1 text-sm"
                >
                  {networks.filter(n => n.isActive).map(network => (
                    <option key={network.id} value={network.id} className="text-black">
                      {network.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-purple-100 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Connected Wallets</p>
                          <p className="text-3xl font-bold">{wallets.filter(w => w.isConnected).length}</p>
                        </div>
                        <Wallet className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Smart Contracts</p>
                          <p className="text-3xl font-bold">{smartContracts.length}</p>
                        </div>
                        <Shield className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">NFTs Owned</p>
                          <p className="text-3xl font-bold">{nfts.length}</p>
                        </div>
                        <Coins className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">DeFi Positions</p>
                          <p className="text-3xl font-bold">{defiPositions.length}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Portfolio Value</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={[
                          { name: 'Jan', value: 1000 },
                          { name: 'Feb', value: 1200 },
                          { name: 'Mar', value: 1100 },
                          { name: 'Apr', value: 1400 },
                          { name: 'May', value: 1600 },
                          { name: 'Jun', value: 1800 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Network Distribution</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={networks.filter(n => n.isActive).map(network => ({
                              name: network.name,
                              value: network.name === 'Ethereum' ? 60 : network.name === 'Polygon' ? 30 : 10
                            }))}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {networks.filter(n => n.isActive).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={`hsl(${index * 120}, 70%, 50%)`} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'wallets' && (
                <motion.div
                  key="wallets"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {wallets.map((wallet) => {
                    const WalletIcon = getWalletTypeIcon(wallet.type);
                    return (
                      <div key={wallet.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <WalletIcon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{wallet.name}</h3>
                              <p className="text-sm text-gray-600">{wallet.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${wallet.isConnected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                            <span className="text-sm">{wallet.isConnected ? 'Connected' : 'Disconnected'}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-sm text-gray-500">Balance</span>
                            <p className="font-semibold">{wallet.balance.toFixed(4)} ETH</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Network</span>
                            <p className="font-semibold">{wallet.network}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Last Activity</span>
                            <p className="font-semibold text-sm">
                              {new Date(wallet.lastActivity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          {wallet.isConnected ? (
                            <button
                              onClick={() => handleDisconnectWallet(wallet.id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              Disconnect
                            </button>
                          ) : (
                            <button
                              onClick={() => handleConnectWallet(wallet.type)}
                              disabled={isConnecting}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                            >
                              {isConnecting ? 'Connecting...' : 'Connect'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === 'contracts' && (
                <motion.div
                  key="contracts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {smartContracts.map((contract) => (
                    <div key={contract.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Shield className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{contract.name}</h3>
                            <p className="text-sm text-gray-600">{contract.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getContractTypeColor(contract.type)}`}>
                            {contract.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            contract.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                          }`}>
                            {contract.status}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Network</span>
                          <p className="font-semibold">{contract.network}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Gas Used</span>
                          <p className="font-semibold">{contract.gasUsed.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Deployed</span>
                          <p className="font-semibold text-sm">
                            {new Date(contract.deployedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'nfts' && (
                <motion.div
                  key="nfts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {nfts.map((nft) => (
                      <div key={nft.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={nft.image} 
                              alt={nft.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h3 className="font-semibold">{nft.name}</h3>
                              <p className="text-sm text-gray-600">{nft.description}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getRarityColor(nft.rarity)}`}>
                            {nft.rarity}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {Object.entries(nft.attributes).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-sm text-gray-500">{key}</span>
                              <span className="font-semibold">{value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Token ID: {nft.tokenId}</span>
                            <span>{nft.network}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'defi' && (
                <motion.div
                  key="defi"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {defiPositions.map((position) => (
                    <div key={position.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{position.protocol} - {position.type}</h3>
                            <p className="text-sm text-gray-600">{position.asset}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${position.value.toLocaleString()}</p>
                          <p className="text-sm text-green-600">{position.apy}% APY</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Amount</span>
                          <p className="font-semibold">{position.amount} {position.asset}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Network</span>
                          <p className="font-semibold">{position.network}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Created</span>
                          <p className="font-semibold text-sm">
                            {new Date(position.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'dao' && (
                <motion.div
                  key="dao"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {daoProposals.map((proposal) => (
                    <div key={proposal.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Governance className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{proposal.title}</h3>
                            <p className="text-sm text-gray-600">{proposal.description}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getProposalStatusColor(proposal.status)}`}>
                          {proposal.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Votes For</span>
                          <p className="font-semibold text-green-600">{proposal.votesFor}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Votes Against</span>
                          <p className="font-semibold text-red-600">{proposal.votesAgainst}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total Votes</span>
                          <p className="font-semibold">{proposal.totalVotes}</p>
                        </div>
                      </div>
                      {proposal.status === 'active' && (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleVoteProposal(proposal.id, 'against')}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Vote Against
                          </button>
                          <button
                            onClick={() => handleVoteProposal(proposal.id, 'for')}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Vote For
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BlockchainIntegration;