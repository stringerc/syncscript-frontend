import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Target, CheckCircle, AlertTriangle, Clock, Calendar, MessageCircle, Mail, Phone, Video, Mic, Camera, Image, Link, Share2, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Meh, Laugh, Angry, Building, UserCheck, Workflow, BarChart3, Shield, FileText, Award, Badge, Flag, Info, HelpCircle, ExternalLink, Edit, Trash2, Save, Copy, Undo, Redo, Play, Pause, RefreshCw, RotateCcw, Maximize, Minimize, Filter, Search, Plus, Minus, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Database, Cpu, HardDrive, Network, Globe, Lock as LockIcon, CheckCircle as CheckIcon, AlertTriangle as AlertIcon, Clock as ClockIcon, Calendar as CalendarIcon, MessageCircle as MessageIcon, Mail as MailIcon, Phone as PhoneIcon, Video as VideoIcon, Image as ImageIcon, FileText as FileIcon, Link as LinkIcon, Share2 as ShareIcon, Heart as HeartIcon, ThumbsUp as ThumbsUpIcon, ThumbsDown as ThumbsDownIcon, Smile as SmileIcon, Frown as FrownIcon, Meh as MehIcon, Laugh as LaughIcon, Angry as AngryIcon, Target as TargetIcon, Building as BuildingIcon, UserCheck as UserCheckIcon, Server as ServerIcon, Cloud as CloudIcon, Workflow as WorkflowIcon, BarChart3 as AnalyticsIcon, Shield as ComplianceIcon, FileText as AuditIcon, FileText as PolicyIcon, Award as CertificateIcon, Award as BadgeIcon, Flag as FlagIcon, Info as InfoIcon, HelpCircle as HelpIcon, ExternalLink as ExternalIcon, Edit as EditIcon, Trash2 as TrashIcon, Save as SaveIcon, Copy as CopyIcon, Undo as UndoIcon, Redo as RedoIcon, Play as PlayIcon, Pause as PauseIcon, RefreshCw as RefreshIcon, RotateCcw as RotateIcon, Maximize as MaximizeIcon, Minimize as MinimizeIcon, Filter as FilterIcon, Search as SearchIcon, Plus as PlusIcon, Minus as MinusIcon, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, ArrowRight as ArrowRightIcon, ArrowLeft as ArrowLeftIcon, Code as CodeIcon, Database as DatabaseIcon, Cpu as CpuIcon, HardDrive as HardDriveIcon, Network as NetworkIcon, Star, Zap, Rocket, Crown, Diamond, Gem, Sparkles, DollarSign, Server } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { toast } from 'react-hot-toast';

// Ultimate Platform interfaces
interface UltimateAchievement {
  id: string;
  title: string;
  description: string;
  category: 'development' | 'performance' | 'security' | 'user_experience' | 'business' | 'innovation';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  status: 'locked' | 'unlocked' | 'completed';
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
  completedAt?: string;
  rewards: string[];
  requirements: string[];
  icon: string;
  points: number;
}

interface PlatformMilestone {
  id: string;
  name: string;
  description: string;
  phase: 'foundation' | 'development' | 'optimization' | 'launch' | 'growth' | 'scale';
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  completionDate?: string;
  progress: number;
  dependencies: string[];
  deliverables: string[];
  team: string[];
  impact: 'low' | 'medium' | 'high' | 'critical';
  metrics: MilestoneMetrics;
}

interface MilestoneMetrics {
  featuresDelivered: number;
  bugsFixed: number;
  performanceImprovement: number;
  userSatisfaction: number;
  codeQuality: number;
  testCoverage: number;
}

interface UltimateStatistics {
  totalFeatures: number;
  totalComponents: number;
  totalLinesOfCode: number;
  totalTests: number;
  totalUsers: number;
  totalSessions: number;
  totalRevenue: number;
  totalDeployments: number;
  uptime: number;
  performanceScore: number;
  securityScore: number;
  userSatisfaction: number;
  teamSize: number;
  developmentTime: number;
  lastUpdated: string;
}

interface UltimateDeploymentStatus {
  id: string;
  environment: 'development' | 'staging' | 'production' | 'canary';
  version: string;
  status: 'deployed' | 'deploying' | 'failed' | 'rollback';
  timestamp: string;
  features: string[];
  improvements: string[];
  fixes: string[];
  metrics: DeploymentMetrics;
  healthChecks: HealthCheck[];
  rollbackAvailable: boolean;
  nextDeployment?: string;
}

interface DeploymentMetrics {
  buildTime: number;
  deployTime: number;
  totalTime: number;
  bundleSize: number;
  performanceScore: number;
  accessibilityScore: number;
  seoScore: number;
  securityScore: number;
  testCoverage: number;
  codeQuality: number;
}

interface HealthCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  responseTime: number;
  lastCheck: string;
  details: string;
}

interface PlatformRoadmap {
  id: string;
  title: string;
  description: string;
  category: 'feature' | 'improvement' | 'fix' | 'optimization' | 'security';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  assignedTo: string;
  dependencies: string[];
  deliverables: string[];
  impact: 'low' | 'medium' | 'high' | 'critical';
  effort: 'small' | 'medium' | 'large' | 'extra_large';
  progress: number;
  notes: string[];
}

const UltimatePlatformCompletion: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [ultimateAchievements, setUltimateAchievements] = useState<UltimateAchievement[]>([]);
  const [platformMilestones, setPlatformMilestones] = useState<PlatformMilestone[]>([]);
  const [ultimateStatistics, setUltimateStatistics] = useState<UltimateStatistics | null>(null);
  const [ultimateDeploymentStatus, setUltimateDeploymentStatus] = useState<UltimateDeploymentStatus[]>([]);
  const [platformRoadmap, setPlatformRoadmap] = useState<PlatformRoadmap[]>([]);
  const [isCelebrating, setIsCelebrating] = useState(false);

  // SSR-safe data loading
  useEffect(() => {
    const loadUltimateData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call with SSR-safe delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock ultimate achievements data
        const mockUltimateAchievements: UltimateAchievement[] = [
          {
            id: 'achievement-1',
            title: 'Platform Architect',
            description: 'Successfully designed and implemented the complete platform architecture',
            category: 'development',
            rarity: 'legendary',
            status: 'completed',
            progress: 100,
            maxProgress: 100,
            unlockedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            rewards: ['🏆 Ultimate Developer Badge', '💎 Diamond Status', '🚀 Launch Access'],
            requirements: ['Complete platform architecture', 'Implement all core features', 'Pass all tests'],
            icon: '🏗️',
            points: 1000
          },
          {
            id: 'achievement-2',
            title: 'Performance Master',
            description: 'Achieved exceptional performance scores across all metrics',
            category: 'performance',
            rarity: 'epic',
            status: 'completed',
            progress: 100,
            maxProgress: 100,
            unlockedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            rewards: ['⚡ Speed Demon Badge', '🎯 Performance Expert'],
            requirements: ['Core Web Vitals > 90', 'Bundle Size < 3MB', 'Response Time < 500ms'],
            icon: '⚡',
            points: 750
          },
          {
            id: 'achievement-3',
            title: 'Security Guardian',
            description: 'Implemented comprehensive security measures and achieved high security scores',
            category: 'security',
            rarity: 'epic',
            status: 'completed',
            progress: 100,
            maxProgress: 100,
            unlockedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
            rewards: ['🛡️ Security Expert Badge', '🔒 Fortress Status'],
            requirements: ['Security Score > 85', 'Implement CSP', 'Enable HSTS'],
            icon: '🛡️',
            points: 800
          },
          {
            id: 'achievement-4',
            title: 'User Experience Champion',
            description: 'Created an exceptional user experience with high satisfaction scores',
            category: 'user_experience',
            rarity: 'rare',
            status: 'completed',
            progress: 100,
            maxProgress: 100,
            unlockedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            rewards: ['👑 UX Royalty Badge', '✨ Experience Master'],
            requirements: ['Accessibility Score > 95', 'User Satisfaction > 90', 'NPS Score > 70'],
            icon: '👑',
            points: 600
          },
          {
            id: 'achievement-5',
            title: 'Innovation Pioneer',
            description: 'Implemented cutting-edge features and innovative solutions',
            category: 'innovation',
            rarity: 'legendary',
            status: 'completed',
            progress: 100,
            maxProgress: 100,
            unlockedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            rewards: ['🚀 Innovation Badge', '💎 Pioneer Status', '🌟 Future Vision'],
            requirements: ['Implement AI Features', 'Blockchain Integration', 'Advanced Analytics'],
            icon: '🚀',
            points: 1200
          },
          {
            id: 'achievement-6',
            title: 'Business Success',
            description: 'Achieved significant business milestones and revenue targets',
            category: 'business',
            rarity: 'epic',
            status: 'unlocked',
            progress: 75,
            maxProgress: 100,
            unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            rewards: ['💰 Revenue Master Badge', '📈 Growth Expert'],
            requirements: ['Revenue Target', 'User Growth', 'Market Expansion'],
            icon: '💰',
            points: 900
          }
        ];

        // Mock platform milestones data
        const mockPlatformMilestones: PlatformMilestone[] = [
          {
            id: 'milestone-1',
            name: 'Foundation Phase',
            description: 'Establish core platform architecture and basic features',
            phase: 'foundation',
            status: 'completed',
            startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            completionDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            progress: 100,
            dependencies: [],
            deliverables: ['Core Architecture', 'Basic UI Components', 'Authentication System'],
            team: ['Architecture Team', 'Frontend Team', 'Backend Team'],
            impact: 'critical',
            metrics: {
              featuresDelivered: 25,
              bugsFixed: 45,
              performanceImprovement: 15,
              userSatisfaction: 70,
              codeQuality: 80,
              testCoverage: 75
            }
          },
          {
            id: 'milestone-2',
            name: 'Development Phase',
            description: 'Implement advanced features and integrations',
            phase: 'development',
            status: 'completed',
            startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            completionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            progress: 100,
            dependencies: ['milestone-1'],
            deliverables: ['Advanced Features', 'Third-party Integrations', 'API Development'],
            team: ['Development Team', 'Integration Team', 'API Team'],
            impact: 'high',
            metrics: {
              featuresDelivered: 50,
              bugsFixed: 80,
              performanceImprovement: 25,
              userSatisfaction: 85,
              codeQuality: 90,
              testCoverage: 85
            }
          },
          {
            id: 'milestone-3',
            name: 'Optimization Phase',
            description: 'Performance optimization and production readiness',
            phase: 'optimization',
            status: 'completed',
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            completionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            progress: 100,
            dependencies: ['milestone-2'],
            deliverables: ['Performance Optimization', 'Security Hardening', 'Production Readiness'],
            team: ['Performance Team', 'Security Team', 'DevOps Team'],
            impact: 'high',
            metrics: {
              featuresDelivered: 15,
              bugsFixed: 60,
              performanceImprovement: 40,
              userSatisfaction: 95,
              codeQuality: 95,
              testCoverage: 92
            }
          },
          {
            id: 'milestone-4',
            name: 'Launch Phase',
            description: 'Platform launch and market entry',
            phase: 'launch',
            status: 'in_progress',
            startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            progress: 75,
            dependencies: ['milestone-3'],
            deliverables: ['Market Launch', 'User Onboarding', 'Marketing Campaign'],
            team: ['Marketing Team', 'Product Team', 'Support Team'],
            impact: 'critical',
            metrics: {
              featuresDelivered: 5,
              bugsFixed: 20,
              performanceImprovement: 5,
              userSatisfaction: 90,
              codeQuality: 95,
              testCoverage: 90
            }
          },
          {
            id: 'milestone-5',
            name: 'Growth Phase',
            description: 'Scale platform and expand user base',
            phase: 'growth',
            status: 'planned',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            progress: 0,
            dependencies: ['milestone-4'],
            deliverables: ['User Growth', 'Feature Expansion', 'Market Expansion'],
            team: ['Growth Team', 'Product Team', 'Sales Team'],
            impact: 'high',
            metrics: {
              featuresDelivered: 0,
              bugsFixed: 0,
              performanceImprovement: 0,
              userSatisfaction: 0,
              codeQuality: 0,
              testCoverage: 0
            }
          }
        ];

        // Mock ultimate statistics data
        const mockUltimateStatistics: UltimateStatistics = {
          totalFeatures: 150,
          totalComponents: 85,
          totalLinesOfCode: 125000,
          totalTests: 2500,
          totalUsers: 1250,
          totalSessions: 15000,
          totalRevenue: 45000,
          totalDeployments: 45,
          uptime: 99.9,
          performanceScore: 95,
          securityScore: 88,
          userSatisfaction: 92,
          teamSize: 12,
          developmentTime: 90,
          lastUpdated: new Date().toISOString()
        };

        // Mock ultimate deployment status data
        const mockUltimateDeploymentStatus: UltimateDeploymentStatus[] = [
          {
            id: 'deploy-ultimate-1',
            environment: 'production',
            version: '3.0.0',
            status: 'deployed',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            features: ['Ultimate Platform Completion', 'Advanced Analytics', 'AI-Powered Features'],
            improvements: ['Performance Optimization', 'Security Enhancements', 'UX Improvements'],
            fixes: ['Bug Fixes', 'Memory Leaks', 'Accessibility Issues'],
            rollbackAvailable: true,
            nextDeployment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            metrics: {
              buildTime: 180,
              deployTime: 240,
              totalTime: 420,
              bundleSize: 2.3,
              performanceScore: 95,
              accessibilityScore: 98,
              seoScore: 92,
              securityScore: 88,
              testCoverage: 92,
              codeQuality: 95
            },
            healthChecks: [
              {
                name: 'API Health',
                status: 'pass',
                responseTime: 45,
                lastCheck: new Date().toISOString(),
                details: 'All API endpoints responding normally'
              },
              {
                name: 'Database Health',
                status: 'pass',
                responseTime: 12,
                lastCheck: new Date().toISOString(),
                details: 'Database connections stable'
              },
              {
                name: 'CDN Health',
                status: 'pass',
                responseTime: 23,
                lastCheck: new Date().toISOString(),
                details: 'CDN serving assets efficiently'
              }
            ]
          }
        ];

        // Mock platform roadmap data
        const mockPlatformRoadmap: PlatformRoadmap[] = [
          {
            id: 'roadmap-1',
            title: 'AI-Powered Personalization',
            description: 'Implement advanced AI features for personalized user experiences',
            category: 'feature',
            priority: 'high',
            status: 'in_progress',
            startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            assignedTo: 'AI Team',
            dependencies: [],
            deliverables: ['ML Models', 'Personalization Engine', 'Recommendation System'],
            impact: 'high',
            effort: 'large',
            progress: 60,
            notes: ['Model training in progress', 'Testing with beta users']
          },
          {
            id: 'roadmap-2',
            title: 'Mobile App Development',
            description: 'Develop native mobile applications for iOS and Android',
            category: 'feature',
            priority: 'critical',
            status: 'planned',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
            assignedTo: 'Mobile Team',
            dependencies: ['roadmap-1'],
            deliverables: ['iOS App', 'Android App', 'Cross-platform Features'],
            impact: 'critical',
            effort: 'extra_large',
            progress: 0,
            notes: ['Waiting for AI features completion', 'Design phase starting soon']
          },
          {
            id: 'roadmap-3',
            title: 'Enterprise Integration',
            description: 'Add enterprise-grade features and integrations',
            category: 'feature',
            priority: 'medium',
            status: 'planned',
            startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
            assignedTo: 'Enterprise Team',
            dependencies: ['roadmap-2'],
            deliverables: ['SSO Integration', 'Enterprise Dashboard', 'Advanced Security'],
            impact: 'medium',
            effort: 'large',
            progress: 0,
            notes: ['Research phase', 'Enterprise requirements gathering']
          }
        ];

        setUltimateAchievements(mockUltimateAchievements);
        setPlatformMilestones(mockPlatformMilestones);
        setUltimateStatistics(mockUltimateStatistics);
        setUltimateDeploymentStatus(mockUltimateDeploymentStatus);
        setPlatformRoadmap(mockPlatformRoadmap);

        toast.success('Ultimate platform completion data loaded successfully!');
      } catch (error) {
        console.error('Failed to load ultimate data:', error);
        toast.error('Failed to load ultimate platform data');
      } finally {
        setIsLoading(false);
      }
    };

    loadUltimateData();
  }, []);

  const handleCelebrateAchievement = useCallback(async (achievementId: string) => {
    setIsCelebrating(true);
    try {
      // Simulate celebration process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setUltimateAchievements(prev => prev.map(achievement => 
        achievement.id === achievementId 
          ? { 
              ...achievement, 
              status: 'completed',
              progress: achievement.maxProgress,
              completedAt: new Date().toISOString()
            }
          : achievement
      ));
      
      toast.success(`🎉 Achievement "${achievementId}" celebrated successfully!`);
    } catch (error) {
      console.error('Failed to celebrate:', error);
      toast.error('Failed to celebrate achievement');
    } finally {
      setIsCelebrating(false);
    }
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Trophy },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'milestones', label: 'Milestones', icon: Target },
    { id: 'statistics', label: 'Statistics', icon: AnalyticsIcon },
    { id: 'deployment', label: 'Deployment', icon: Rocket },
    { id: 'roadmap', label: 'Roadmap', icon: Flag }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'planned': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'unlocked': return 'text-purple-600 bg-purple-100';
      case 'locked': return 'text-gray-600 bg-gray-100';
      case 'deployed': return 'text-green-600 bg-green-100';
      case 'deploying': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'foundation': return 'text-blue-600 bg-blue-100';
      case 'development': return 'text-green-600 bg-green-100';
      case 'optimization': return 'text-purple-600 bg-purple-100';
      case 'launch': return 'text-orange-600 bg-orange-100';
      case 'growth': return 'text-pink-600 bg-pink-100';
      case 'scale': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
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
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Ultimate Platform Completion</h2>
                <p className="text-yellow-100">Final features and launch preparation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm">Ultimate</span>
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
          <div className="flex space-x-1 mt-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-yellow-100 hover:bg-white hover:bg-opacity-10'
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
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
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-yellow-100">Total Achievements</p>
                          <p className="text-3xl font-bold">{ultimateAchievements.length}</p>
                        </div>
                        <Trophy className="w-8 h-8 text-yellow-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Platform Milestones</p>
                          <p className="text-3xl font-bold">{platformMilestones.length}</p>
                        </div>
                        <Target className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Total Features</p>
                          <p className="text-3xl font-bold">{ultimateStatistics?.totalFeatures || 0}</p>
                        </div>
                        <CodeIcon className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Platform Score</p>
                          <p className="text-3xl font-bold">{ultimateStatistics?.performanceScore || 0}</p>
                        </div>
                        <Star className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Achievement Progress</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Completed', value: ultimateAchievements.filter(a => a.status === 'completed').length },
                              { name: 'Unlocked', value: ultimateAchievements.filter(a => a.status === 'unlocked').length },
                              { name: 'Locked', value: ultimateAchievements.filter(a => a.status === 'locked').length }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#8b5cf6" />
                            <Cell fill="#6b7280" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Milestone Progress</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={platformMilestones.map(milestone => ({
                          name: milestone.name,
                          progress: milestone.progress
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="progress" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {ultimateAchievements.map((achievement) => (
                    <div key={achievement.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div>
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(achievement.status)}`}>
                            {achievement.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            achievement.category === 'development' ? 'bg-blue-100 text-blue-800' :
                            achievement.category === 'performance' ? 'bg-green-100 text-green-800' :
                            achievement.category === 'security' ? 'bg-red-100 text-red-800' :
                            achievement.category === 'user_experience' ? 'bg-purple-100 text-purple-800' :
                            achievement.category === 'business' ? 'bg-yellow-100 text-yellow-800' : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {achievement.category}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Progress</span>
                          <p className="font-semibold">{achievement.progress}/{achievement.maxProgress}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Points</span>
                          <p className="font-semibold">{achievement.points}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Completed</span>
                          <p className="font-semibold text-sm">
                            {achievement.completedAt ? new Date(achievement.completedAt).toLocaleDateString() : 'Not completed'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Rewards:</h4>
                        <div className="flex flex-wrap gap-2">
                          {achievement.rewards.map((reward, index) => (
                            <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                              {reward}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Requirements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {achievement.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-end">
                        {achievement.status === 'unlocked' && (
                          <button
                            onClick={() => handleCelebrateAchievement(achievement.id)}
                            disabled={isCelebrating}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
                          >
                            {isCelebrating ? 'Celebrating...' : '🎉 Celebrate'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'milestones' && (
                <motion.div
                  key="milestones"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {platformMilestones.map((milestone) => (
                    <div key={milestone.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Target className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{milestone.name}</h3>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(milestone.status)}`}>
                            {milestone.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPhaseColor(milestone.phase)}`}>
                            {milestone.phase}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            milestone.impact === 'critical' ? 'bg-red-100 text-red-800' :
                            milestone.impact === 'high' ? 'bg-orange-100 text-orange-800' :
                            milestone.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {milestone.impact}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Progress</span>
                          <p className="font-semibold">{milestone.progress}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Start Date</span>
                          <p className="font-semibold text-sm">
                            {new Date(milestone.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">End Date</span>
                          <p className="font-semibold text-sm">
                            {milestone.endDate ? new Date(milestone.endDate).toLocaleDateString() : 'TBD'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Team Size</span>
                          <p className="font-semibold">{milestone.team.length}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Deliverables:</h4>
                        <div className="flex flex-wrap gap-2">
                          {milestone.deliverables.map((deliverable, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Metrics:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Features Delivered</span>
                            <p className="font-semibold">{milestone.metrics.featuresDelivered}</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Bugs Fixed</span>
                            <p className="font-semibold">{milestone.metrics.bugsFixed}</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Performance Improvement</span>
                            <p className="font-semibold">{milestone.metrics.performanceImprovement}%</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">User Satisfaction</span>
                            <p className="font-semibold">{milestone.metrics.userSatisfaction}%</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Code Quality</span>
                            <p className="font-semibold">{milestone.metrics.codeQuality}%</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Test Coverage</span>
                            <p className="font-semibold">{milestone.metrics.testCoverage}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'statistics' && ultimateStatistics && (
                <motion.div
                  key="statistics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Total Features</p>
                          <p className="text-3xl font-bold">{ultimateStatistics.totalFeatures}</p>
                        </div>
                        <CodeIcon className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Total Users</p>
                          <p className="text-3xl font-bold">{ultimateStatistics.totalUsers.toLocaleString()}</p>
                        </div>
                        <UserCheck className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Total Revenue</p>
                          <p className="text-3xl font-bold">${ultimateStatistics.totalRevenue.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Uptime</p>
                          <p className="text-3xl font-bold">{ultimateStatistics.uptime}%</p>
                        </div>
                        <Server className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Performance Score</span>
                          <span className="font-semibold">{ultimateStatistics.performanceScore}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${ultimateStatistics.performanceScore}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Security Score</span>
                          <span className="font-semibold">{ultimateStatistics.securityScore}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${ultimateStatistics.securityScore}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>User Satisfaction</span>
                          <span className="font-semibold">{ultimateStatistics.userSatisfaction}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${ultimateStatistics.userSatisfaction}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Development Statistics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Components</span>
                          <span className="font-semibold">{ultimateStatistics.totalComponents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lines of Code</span>
                          <span className="font-semibold">{ultimateStatistics.totalLinesOfCode.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Tests</span>
                          <span className="font-semibold">{ultimateStatistics.totalTests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Deployments</span>
                          <span className="font-semibold">{ultimateStatistics.totalDeployments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Team Size</span>
                          <span className="font-semibold">{ultimateStatistics.teamSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Development Time</span>
                          <span className="font-semibold">{ultimateStatistics.developmentTime} days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'deployment' && (
                <motion.div
                  key="deployment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {ultimateDeploymentStatus.map((deployment) => (
                    <div key={deployment.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Rocket className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Ultimate Platform v{deployment.version}</h3>
                            <p className="text-sm text-gray-600">{deployment.environment} environment</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(deployment.status)}`}>
                            {deployment.status}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                            {deployment.environment}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Deployed</span>
                          <p className="font-semibold text-sm">
                            {new Date(deployment.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Bundle Size</span>
                          <p className="font-semibold">{deployment.metrics.bundleSize} MB</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Performance Score</span>
                          <p className="font-semibold">{deployment.metrics.performanceScore}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Test Coverage</span>
                          <p className="font-semibold">{deployment.metrics.testCoverage}%</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">New Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {deployment.features.map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Improvements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {deployment.improvements.map((improvement, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {improvement}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Health Checks:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {deployment.healthChecks.map((check) => (
                            <div key={check.name} className="p-2 bg-gray-50 rounded">
                              <div className="flex justify-between text-sm">
                                <span>{check.name}</span>
                                <span className={`font-medium ${
                                  check.status === 'pass' ? 'text-green-600' :
                                  check.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {check.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{check.details}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        {deployment.rollbackAvailable && (
                          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                            Rollback
                          </button>
                        )}
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'roadmap' && (
                <motion.div
                  key="roadmap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {platformRoadmap.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <Flag className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            item.category === 'feature' ? 'bg-blue-100 text-blue-800' :
                            item.category === 'improvement' ? 'bg-green-100 text-green-800' :
                            item.category === 'fix' ? 'bg-red-100 text-red-800' :
                            item.category === 'optimization' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Progress</span>
                          <p className="font-semibold">{item.progress}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Assigned To</span>
                          <p className="font-semibold">{item.assignedTo}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Start Date</span>
                          <p className="font-semibold text-sm">
                            {new Date(item.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">End Date</span>
                          <p className="font-semibold text-sm">
                            {item.endDate ? new Date(item.endDate).toLocaleDateString() : 'TBD'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Deliverables:</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.deliverables.map((deliverable, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                      {item.notes.length > 0 && (
                        <div className="space-y-2 mb-4">
                          <h4 className="font-medium">Notes:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {item.notes.map((note, index) => (
                              <li key={index}>{note}</li>
                            ))}
                          </ul>
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

export default UltimatePlatformCompletion;