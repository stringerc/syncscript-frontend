import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, UserCheck, Target, Bell, BarChart3, Mail, Phone, Video, MessageCircle, Calendar, Clock, Star, Award, Trophy, Crown, Diamond, Gem, Sparkles, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Meh, Laugh, Angry, Building, Workflow, Shield, FileText, Flag, Info, HelpCircle, ExternalLink, Edit, Trash2, Save, Copy, Undo, Redo, Play, Pause, RefreshCw, RotateCcw, Maximize, Minimize, Filter, Search, Plus, Minus, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Database, Cpu, HardDrive, Network, Globe, Lock, CheckCircle, AlertTriangle, Clock as ClockIcon, Calendar as CalendarIcon, MessageCircle as MessageIcon, Mail as MailIcon, Phone as PhoneIcon, Video as VideoIcon, FileText as FileIcon, Share2 as ShareIcon, Heart as HeartIcon, ThumbsUp as ThumbsUpIcon, ThumbsDown as ThumbsDownIcon, Smile as SmileIcon, Frown as FrownIcon, Meh as MehIcon, Laugh as LaughIcon, Angry as AngryIcon, Target as TargetIcon, Building as BuildingIcon, UserCheck as UserCheckIcon, Server as ServerIcon, Cloud as CloudIcon, Workflow as WorkflowIcon, BarChart3 as AnalyticsIcon, Shield as ComplianceIcon, FileText as AuditIcon, Award as CertificateIcon, Award as BadgeIcon, Flag as FlagIcon, Info as InfoIcon, HelpCircle as HelpIcon, ExternalLink as ExternalIcon, Edit as EditIcon, Trash2 as TrashIcon, Save as SaveIcon, Copy as CopyIcon, Undo as UndoIcon, Redo as RedoIcon, Play as PlayIcon, Pause as PauseIcon, RefreshCw as RefreshIcon, RotateCcw as RotateIcon, Maximize as MaximizeIcon, Minimize as MinimizeIcon, Filter as FilterIcon, Search as SearchIcon, Plus as PlusIcon, Minus as MinusIcon, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, ArrowRight as ArrowRightIcon, ArrowLeft as ArrowLeftIcon, Code as CodeIcon, Database as DatabaseIcon, Cpu as CpuIcon, HardDrive as HardDriveIcon, Network as NetworkIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-hot-toast';

// Beta User Recruitment interfaces
interface BetaUser {
  id: string;
  name: string;
  email: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  status: 'pending' | 'active' | 'inactive' | 'graduated';
  joinDate: string;
  lastActive: string;
  profile: UserProfile;
  incentives: Incentive[];
  feedback: Feedback[];
  metrics: UserMetrics;
}

interface UserProfile {
  company: string;
  role: string;
  industry: string;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  interests: string[];
  goals: string[];
  preferences: UserPreferences;
}

interface UserPreferences {
  communicationFrequency: 'daily' | 'weekly' | 'monthly';
  preferredChannels: string[];
  timezone: string;
  language: string;
}

interface Incentive {
  id: string;
  type: 'discount' | 'early_access' | 'exclusive_feature' | 'recognition' | 'monetary';
  title: string;
  description: string;
  value: number;
  currency: string;
  status: 'available' | 'claimed' | 'expired';
  claimedAt?: string;
  expiresAt: string;
}

interface Feedback {
  id: string;
  type: 'bug_report' | 'feature_request' | 'usability' | 'performance' | 'general';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  status: 'submitted' | 'under_review' | 'in_progress' | 'resolved' | 'rejected';
  submittedAt: string;
  resolvedAt?: string;
  votes: number;
  comments: FeedbackComment[];
}

interface FeedbackComment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  isOfficial: boolean;
}

interface UserMetrics {
  sessionsCount: number;
  totalTimeSpent: number;
  featuresUsed: number;
  bugsReported: number;
  feedbackSubmitted: number;
  referralsMade: number;
  satisfactionScore: number;
}

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'referral' | 'content' | 'event' | 'partnership';
  status: 'planned' | 'active' | 'paused' | 'completed';
  targetAudience: string[];
  startDate: string;
  endDate?: string;
  budget: number;
  metrics: CampaignMetrics;
  content: CampaignContent[];
}

interface CampaignMetrics {
  reach: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  roi: number;
}

interface CampaignContent {
  id: string;
  type: 'email' | 'social_post' | 'blog_post' | 'video' | 'infographic';
  title: string;
  content: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  publishDate?: string;
}

interface FeedbackAnalytics {
  totalFeedback: number;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
  byStatus: Record<string, number>;
  averageResolutionTime: number;
  satisfactionScore: number;
  topIssues: string[];
}

const BetaUserRecruitment: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [betaUsers, setBetaUsers] = useState<BetaUser[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [feedbackAnalytics, setFeedbackAnalytics] = useState<FeedbackAnalytics | null>(null);
  const [isRecruiting, setIsRecruiting] = useState(false);

  // SSR-safe data loading
  useEffect(() => {
    const loadBetaData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call with SSR-safe delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock beta users data
        const mockBetaUsers: BetaUser[] = [
          {
            id: 'user-1',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@techcorp.com',
            tier: 'platinum',
            status: 'active',
            joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            profile: {
              company: 'TechCorp',
              role: 'Product Manager',
              industry: 'Technology',
              experience: 'expert',
              interests: ['Product Management', 'User Experience', 'Analytics'],
              goals: ['Improve team productivity', 'Streamline workflows'],
              preferences: {
                communicationFrequency: 'weekly',
                preferredChannels: ['email', 'slack'],
                timezone: 'PST',
                language: 'en'
              }
            },
            incentives: [
              {
                id: 'incentive-1',
                type: 'early_access',
                title: 'Early Access to AI Features',
                description: 'Get exclusive access to new AI-powered features',
                value: 0,
                currency: 'USD',
                status: 'claimed',
                claimedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString()
              }
            ],
            feedback: [
              {
                id: 'feedback-1',
                type: 'feature_request',
                priority: 'high',
                title: 'Advanced Analytics Dashboard',
                description: 'Would love to see more detailed analytics and reporting features',
                status: 'under_review',
                submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                votes: 12,
                comments: []
              }
            ],
            metrics: {
              sessionsCount: 45,
              totalTimeSpent: 1800,
              featuresUsed: 15,
              bugsReported: 3,
              feedbackSubmitted: 8,
              referralsMade: 5,
              satisfactionScore: 9
            }
          },
          {
            id: 'user-2',
            name: 'Michael Chen',
            email: 'michael.chen@startup.io',
            tier: 'gold',
            status: 'active',
            joinDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            profile: {
              company: 'StartupIO',
              role: 'CTO',
              industry: 'Technology',
              experience: 'advanced',
              interests: ['Engineering', 'Scalability', 'Performance'],
              goals: ['Scale team operations', 'Improve code quality'],
              preferences: {
                communicationFrequency: 'daily',
                preferredChannels: ['email', 'phone'],
                timezone: 'EST',
                language: 'en'
              }
            },
            incentives: [
              {
                id: 'incentive-2',
                type: 'discount',
                title: '50% Off Annual Plan',
                description: 'Get 50% discount on annual subscription',
                value: 500,
                currency: 'USD',
                status: 'available',
                expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
              }
            ],
            feedback: [
              {
                id: 'feedback-2',
                type: 'bug_report',
                priority: 'medium',
                title: 'Performance Issue in Dashboard',
                description: 'Dashboard loads slowly when there are many tasks',
                status: 'in_progress',
                submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                votes: 8,
                comments: []
              }
            ],
            metrics: {
              sessionsCount: 32,
              totalTimeSpent: 1200,
              featuresUsed: 12,
              bugsReported: 5,
              feedbackSubmitted: 6,
              referralsMade: 3,
              satisfactionScore: 8
            }
          },
          {
            id: 'user-3',
            name: 'Emily Rodriguez',
            email: 'emily.rodriguez@designstudio.com',
            tier: 'silver',
            status: 'active',
            joinDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            profile: {
              company: 'Design Studio',
              role: 'UX Designer',
              industry: 'Design',
              experience: 'intermediate',
              interests: ['User Experience', 'Design Systems', 'Accessibility'],
              goals: ['Improve user experience', 'Create better workflows'],
              preferences: {
                communicationFrequency: 'weekly',
                preferredChannels: ['email', 'slack'],
                timezone: 'CST',
                language: 'en'
              }
            },
            incentives: [
              {
                id: 'incentive-3',
                type: 'exclusive_feature',
                title: 'Beta Design Tools',
                description: 'Access to new design collaboration features',
                value: 0,
                currency: 'USD',
                status: 'claimed',
                claimedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                expiresAt: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString()
              }
            ],
            feedback: [
              {
                id: 'feedback-3',
                type: 'usability',
                priority: 'high',
                title: 'Improve Mobile Experience',
                description: 'The mobile app needs better touch interactions and navigation',
                status: 'resolved',
                submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                resolvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                votes: 15,
                comments: []
              }
            ],
            metrics: {
              sessionsCount: 28,
              totalTimeSpent: 900,
              featuresUsed: 10,
              bugsReported: 2,
              feedbackSubmitted: 4,
              referralsMade: 2,
              satisfactionScore: 9
            }
          }
        ];

        // Mock campaigns data
        const mockCampaigns: Campaign[] = [
          {
            id: 'campaign-1',
            name: 'Product Hunt Launch',
            type: 'social',
            status: 'active',
            targetAudience: ['tech_enthusiasts', 'early_adopters', 'product_managers'],
            startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            budget: 5000,
            metrics: {
              reach: 25000,
              impressions: 150000,
              clicks: 2500,
              conversions: 125,
              cost: 3500,
              roi: 257
            },
            content: [
              {
                id: 'content-1',
                type: 'social_post',
                title: 'Product Hunt Launch Post',
                content: '🚀 SyncScript is now live on Product Hunt! Help us reach #1!',
                status: 'published',
                publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
              }
            ]
          },
          {
            id: 'campaign-2',
            name: 'Email Newsletter Series',
            type: 'email',
            status: 'active',
            targetAudience: ['existing_users', 'waitlist'],
            startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            budget: 1000,
            metrics: {
              reach: 5000,
              impressions: 5000,
              clicks: 750,
              conversions: 45,
              cost: 800,
              roi: 563
            },
            content: [
              {
                id: 'content-2',
                type: 'email',
                title: 'Welcome to SyncScript Beta',
                content: 'Thank you for joining our beta program! Here\'s what to expect...',
                status: 'published',
                publishDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
              }
            ]
          }
        ];

        // Mock feedback analytics data
        const mockFeedbackAnalytics: FeedbackAnalytics = {
          totalFeedback: 45,
          byType: {
            'feature_request': 18,
            'bug_report': 12,
            'usability': 8,
            'performance': 4,
            'general': 3
          },
          byPriority: {
            'high': 15,
            'medium': 20,
            'low': 10
          },
          byStatus: {
            'resolved': 25,
            'in_progress': 12,
            'under_review': 8
          },
          averageResolutionTime: 3.2,
          satisfactionScore: 8.7,
          topIssues: ['Mobile Experience', 'Performance', 'Analytics', 'Notifications', 'Integrations']
        };

        setBetaUsers(mockBetaUsers);
        setCampaigns(mockCampaigns);
        setFeedbackAnalytics(mockFeedbackAnalytics);

        toast.success('Beta user recruitment data loaded successfully!');
      } catch (error) {
        console.error('Failed to load beta data:', error);
        toast.error('Failed to load beta user recruitment data');
      } finally {
        setIsLoading(false);
      }
    };

    loadBetaData();
  }, []);

  const handleRecruitUser = useCallback(async (userId: string) => {
    setIsRecruiting(true);
    try {
      // Simulate recruitment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`🎉 Successfully recruited user ${userId}!`);
    } catch (error) {
      console.error('Failed to recruit user:', error);
      toast.error('Failed to recruit user');
    } finally {
      setIsRecruiting(false);
    }
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'users', label: 'Users', icon: UserCheck },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'incentives', label: 'Incentives', icon: Award }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-orange-600 bg-orange-100';
      case 'silver': return 'text-gray-600 bg-gray-100';
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'platinum': return 'text-blue-600 bg-blue-100';
      case 'diamond': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'graduated': return 'text-blue-600 bg-blue-100';
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
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Beta User Recruitment</h2>
                <p className="text-green-100">User testing and feedback collection</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm">Active</span>
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
                      : 'text-green-100 hover:bg-white hover:bg-opacity-10'
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
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
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Total Beta Users</p>
                          <p className="text-3xl font-bold">{betaUsers.length}</p>
                        </div>
                        <Users className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Active Users</p>
                          <p className="text-3xl font-bold">{betaUsers.filter(u => u.status === 'active').length}</p>
                        </div>
                        <UserCheck className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Total Feedback</p>
                          <p className="text-3xl font-bold">{feedbackAnalytics?.totalFeedback || 0}</p>
                        </div>
                        <MessageCircle className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Satisfaction Score</p>
                          <p className="text-3xl font-bold">{feedbackAnalytics?.satisfactionScore || 0}</p>
                        </div>
                        <Star className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">User Tier Distribution</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Diamond', value: betaUsers.filter(u => u.tier === 'diamond').length },
                              { name: 'Platinum', value: betaUsers.filter(u => u.tier === 'platinum').length },
                              { name: 'Gold', value: betaUsers.filter(u => u.tier === 'gold').length },
                              { name: 'Silver', value: betaUsers.filter(u => u.tier === 'silver').length },
                              { name: 'Bronze', value: betaUsers.filter(u => u.tier === 'bronze').length }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#8b5cf6" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#6b7280" />
                            <Cell fill="#f97316" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Feedback by Type</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={Object.entries(feedbackAnalytics?.byType || {}).map(([type, count]) => ({
                          type: type.replace('_', ' '),
                          count
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="type" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'users' && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {betaUsers.map((user) => (
                    <div key={user.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <UserCheck className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTierColor(user.tier)}`}>
                            {user.tier}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Company</span>
                          <p className="font-semibold">{user.profile.company}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Role</span>
                          <p className="font-semibold">{user.profile.role}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Experience</span>
                          <p className="font-semibold capitalize">{user.profile.experience}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Satisfaction</span>
                          <p className="font-semibold">{user.metrics.satisfactionScore}/10</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Interests:</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.profile.interests.map((interest, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Metrics:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Sessions</span>
                            <p className="font-semibold">{user.metrics.sessionsCount}</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Time Spent</span>
                            <p className="font-semibold">{Math.round(user.metrics.totalTimeSpent / 60)}m</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Features Used</span>
                            <p className="font-semibold">{user.metrics.featuresUsed}</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Referrals</span>
                            <p className="font-semibold">{user.metrics.referralsMade}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleRecruitUser(user.id)}
                          disabled={isRecruiting}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                        >
                          {isRecruiting ? 'Recruiting...' : '🎯 Recruit'}
                        </button>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'campaigns' && (
                <motion.div
                  key="campaigns"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Target className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{campaign.name}</h3>
                            <p className="text-sm text-gray-600">{campaign.type} campaign</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            ROI: {campaign.metrics.roi}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Budget</span>
                          <p className="font-semibold">${campaign.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Reach</span>
                          <p className="font-semibold">{campaign.metrics.reach.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Conversions</span>
                          <p className="font-semibold">{campaign.metrics.conversions}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Cost</span>
                          <p className="font-semibold">${campaign.metrics.cost.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Target Audience:</h4>
                        <div className="flex flex-wrap gap-2">
                          {campaign.targetAudience.map((audience, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                              {audience.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Content:</h4>
                        <div className="space-y-2">
                          {campaign.content.map((content) => (
                            <div key={content.id} className="p-3 bg-gray-50 rounded">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium">{content.title}</h5>
                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(content.status)}`}>
                                  {content.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{content.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'feedback' && (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {betaUsers.flatMap(user => user.feedback).map((feedback) => (
                    <div key={feedback.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-yellow-100 rounded-lg">
                            <MessageCircle className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{feedback.title}</h3>
                            <p className="text-sm text-gray-600">{feedback.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(feedback.priority)}`}>
                            {feedback.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(feedback.status)}`}>
                            {feedback.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {feedback.type.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Submitted</span>
                          <p className="font-semibold text-sm">
                            {new Date(feedback.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Votes</span>
                          <p className="font-semibold">{feedback.votes}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Resolved</span>
                          <p className="font-semibold text-sm">
                            {feedback.resolvedAt ? new Date(feedback.resolvedAt).toLocaleDateString() : 'Not resolved'}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Review
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'analytics' && feedbackAnalytics && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Total Feedback</p>
                          <p className="text-3xl font-bold">{feedbackAnalytics.totalFeedback}</p>
                        </div>
                        <MessageCircle className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Resolved</p>
                          <p className="text-3xl font-bold">{feedbackAnalytics.byStatus.resolved}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Avg Resolution</p>
                          <p className="text-3xl font-bold">{feedbackAnalytics.averageResolutionTime}d</p>
                        </div>
                        <Clock className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Satisfaction</p>
                          <p className="text-3xl font-bold">{feedbackAnalytics.satisfactionScore}</p>
                        </div>
                        <Star className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Feedback by Priority</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={Object.entries(feedbackAnalytics.byPriority).map(([priority, count]) => ({
                          priority,
                          count
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="priority" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Top Issues</h3>
                      <div className="space-y-2">
                        {feedbackAnalytics.topIssues.map((issue, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{issue}</span>
                            <span className="text-sm font-semibold text-gray-600">#{index + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'incentives' && (
                <motion.div
                  key="incentives"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {betaUsers.flatMap(user => user.incentives).map((incentive) => (
                    <div key={incentive.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-yellow-100 rounded-lg">
                            <Award className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{incentive.title}</h3>
                            <p className="text-sm text-gray-600">{incentive.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(incentive.status)}`}>
                            {incentive.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {incentive.type.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Value</span>
                          <p className="font-semibold">
                            {incentive.value > 0 ? `$${incentive.value}` : 'Exclusive Access'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Claimed</span>
                          <p className="font-semibold text-sm">
                            {incentive.claimedAt ? new Date(incentive.claimedAt).toLocaleDateString() : 'Not claimed'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Expires</span>
                          <p className="font-semibold text-sm">
                            {new Date(incentive.expiresAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Manage
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Claim
                        </button>
                      </div>
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

export default BetaUserRecruitment;