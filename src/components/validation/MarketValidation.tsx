import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Target, BarChart3, Calendar, MessageCircle, FileText, Award, Clock, CheckCircle, AlertTriangle, Plus, Edit, Trash2, Save, Copy, ExternalLink, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Star, Zap, Shield, Activity, MapPin, Share2, Video, Briefcase, PieChart, LineChart, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Meh, TrendingUp, TrendingDown, UserCheck, UserX, UserPlus, UserMinus, Phone, Mail, MessageSquare, Mic, Camera, Headphones, Monitor, Smartphone, Tablet, Laptop, Globe, Map, Flag, Building, Home, Work, School, Coffee, Gamepad2, Music, Book, Code, Paintbrush, Calculator, Search, Filter, Download, Upload, RefreshCw, Settings, Bell, Eye, EyeOff, Lock, Unlock, Key, Database, Server, Cloud, Wifi, Signal, Battery, WifiOff } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { toast } from 'react-hot-toast';

// Market Validation interfaces
interface BetaUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  companySize: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'churned' | 'onboarding';
  tier: 'free' | 'premium' | 'enterprise';
  usage: UserUsage;
  feedback: UserFeedback[];
  interviews: UserInterview[];
  createdAt: string;
}

interface UserUsage {
  totalSessions: number;
  averageSessionDuration: number;
  featuresUsed: string[];
  lastActiveDate: string;
  weeklyActiveDays: number;
  monthlyActiveDays: number;
  coreFeaturesUsed: number;
  advancedFeaturesUsed: number;
}

interface UserFeedback {
  id: string;
  type: 'bug_report' | 'feature_request' | 'improvement' | 'complaint' | 'praise';
  category: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  rating: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface UserInterview {
  id: string;
  type: 'discovery' | 'usability' | 'feedback' | 'exit';
  date: string;
  duration: number;
  interviewer: string;
  participants: string[];
  questions: InterviewQuestion[];
  insights: string[];
  painPoints: string[];
  suggestions: string[];
  satisfaction: number;
  createdAt: string;
}

interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface ProductMarketFitMetrics {
  id: string;
  period: string;
  npsScore: number;
  retentionRate: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  userSatisfactionScore: number;
  organicGrowthRate: number;
  referralRate: number;
  churnRate: number;
  engagementScore: number;
  featureAdoptionRate: number;
  createdAt: string;
}

interface FeatureValidation {
  id: string;
  featureName: string;
  description: string;
  status: 'planned' | 'in_development' | 'testing' | 'released' | 'deprecated';
  validationMethod: 'user_interview' | 'survey' | 'a_b_test' | 'usage_analytics' | 'feedback_analysis';
  targetUsers: string[];
  successCriteria: string[];
  metrics: ValidationMetrics;
  results: ValidationResults;
  createdAt: string;
}

interface ValidationMetrics {
  adoptionRate: number;
  usageFrequency: number;
  userSatisfaction: number;
  completionRate: number;
  errorRate: number;
  supportTickets: number;
}

interface ValidationResults {
  validated: boolean;
  confidence: number;
  keyInsights: string[];
  recommendations: string[];
  nextSteps: string[];
  completionDate?: string;
}

interface UserSegment {
  id: string;
  name: string;
  criteria: SegmentCriteria;
  userCount: number;
  characteristics: string[];
  painPoints: string[];
  needs: string[];
  satisfactionScore: number;
  retentionRate: number;
  createdAt: string;
}

interface SegmentCriteria {
  industry: string[];
  companySize: string[];
  role: string[];
  usageLevel: string[];
  tenure: string[];
  geography: string[];
}

interface MarketInsight {
  id: string;
  title: string;
  category: 'user_behavior' | 'market_trend' | 'competitor_analysis' | 'feature_demand' | 'pain_point';
  description: string;
  source: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'validating' | 'validated' | 'implemented' | 'rejected';
  tags: string[];
  createdAt: string;
}

interface ValidationCampaign {
  id: string;
  name: string;
  objective: string;
  targetSegment: string;
  method: 'survey' | 'interview' | 'focus_group' | 'beta_test' | 'a_b_test';
  participants: number;
  duration: number;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  results: CampaignResults;
  createdAt: string;
}

interface CampaignResults {
  responseRate: number;
  completionRate: number;
  keyFindings: string[];
  recommendations: string[];
  satisfactionScore: number;
  completionDate?: string;
}

const MarketValidation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [betaUsers, setBetaUsers] = useState<BetaUser[]>([]);
  const [pmfMetrics, setPmfMetrics] = useState<ProductMarketFitMetrics[]>([]);
  const [featureValidations, setFeatureValidations] = useState<FeatureValidation[]>([]);
  const [userSegments, setUserSegments] = useState<UserSegment[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [validationCampaigns, setValidationCampaigns] = useState<ValidationCampaign[]>([]);

  // SSR-safe data loading
  useEffect(() => {
    const loadMarketValidationData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock beta users
        const mockBetaUsers: BetaUser[] = [
          {
            id: 'user-1',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@techcorp.com',
            company: 'TechCorp Inc.',
            role: 'Product Manager',
            industry: 'Technology',
            companySize: '100-500',
            joinDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active',
            tier: 'premium',
            usage: {
              totalSessions: 85,
              averageSessionDuration: 45,
              featuresUsed: ['Task Management', 'Team Collaboration', 'Analytics', 'Integrations'],
              lastActiveDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              weeklyActiveDays: 5,
              monthlyActiveDays: 18,
              coreFeaturesUsed: 8,
              advancedFeaturesUsed: 4
            },
            feedback: [
              {
                id: 'feedback-1',
                type: 'feature_request',
                category: 'UI/UX',
                title: 'Dark Mode Support',
                description: 'Would love to have a dark mode option for better visibility during night work',
                priority: 'medium',
                status: 'open',
                rating: 4,
                tags: ['ui', 'accessibility', 'preference'],
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
              }
            ],
            interviews: [],
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'user-2',
            name: 'Michael Chen',
            email: 'michael.chen@startup.com',
            company: 'StartupXYZ',
            role: 'CTO',
            industry: 'Software',
            companySize: '10-50',
            joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active',
            tier: 'free',
            usage: {
              totalSessions: 120,
              averageSessionDuration: 35,
              featuresUsed: ['Task Management', 'Team Collaboration', 'Basic Analytics'],
              lastActiveDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              weeklyActiveDays: 6,
              monthlyActiveDays: 22,
              coreFeaturesUsed: 6,
              advancedFeaturesUsed: 1
            },
            feedback: [],
            interviews: [],
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock PMF metrics
        const mockPmfMetrics: ProductMarketFitMetrics[] = [
          {
            id: 'pmf-1',
            period: 'Q3 2024',
            npsScore: 72,
            retentionRate: 85.5,
            weeklyActiveUsers: 1250,
            monthlyActiveUsers: 2100,
            userSatisfactionScore: 8.7,
            organicGrowthRate: 23.5,
            referralRate: 18.2,
            churnRate: 4.2,
            engagementScore: 7.8,
            featureAdoptionRate: 68.5,
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock feature validations
        const mockFeatureValidations: FeatureValidation[] = [
          {
            id: 'validation-1',
            featureName: 'AI-Powered Task Suggestions',
            description: 'AI system that suggests tasks based on user behavior and patterns',
            status: 'testing',
            validationMethod: 'user_interview',
            targetUsers: ['Product Managers', 'Team Leads'],
            successCriteria: ['Adoption rate > 60%', 'User satisfaction > 7.5', 'Usage frequency > 3x/week'],
            metrics: {
              adoptionRate: 45,
              usageFrequency: 2.8,
              userSatisfaction: 7.2,
              completionRate: 78,
              errorRate: 3.2,
              supportTickets: 12
            },
            results: {
              validated: false,
              confidence: 65,
              keyInsights: ['Users find suggestions helpful but want more customization', 'Integration with existing workflows needs improvement'],
              recommendations: ['Add customization options', 'Improve workflow integration', 'Reduce false positive suggestions'],
              nextSteps: ['Implement customization features', 'Conduct follow-up interviews', 'A/B test improved version']
            },
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock user segments
        const mockUserSegments: UserSegment[] = [
          {
            id: 'segment-1',
            name: 'Tech-Savvy Product Managers',
            criteria: {
              industry: ['Technology', 'Software'],
              companySize: ['50-500'],
              role: ['Product Manager', 'Product Owner'],
              usageLevel: ['high', 'medium'],
              tenure: ['1-6 months', '6-12 months'],
              geography: ['North America', 'Europe']
            },
            userCount: 180,
            characteristics: ['Feature-heavy users', 'Early adopters', 'High engagement'],
            painPoints: ['Complex workflows', 'Integration limitations', 'Learning curve'],
            needs: ['Advanced features', 'Customization', 'Integration options'],
            satisfactionScore: 8.5,
            retentionRate: 88,
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock market insights
        const mockMarketInsights: MarketInsight[] = [
          {
            id: 'insight-1',
            title: 'Remote Work Tools Demand Surge',
            category: 'market_trend',
            description: 'Increased demand for remote collaboration tools due to hybrid work models',
            source: 'User interviews and market research',
            confidence: 85,
            impact: 'high',
            priority: 'high',
            status: 'validated',
            tags: ['remote work', 'collaboration', 'trend'],
            createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock validation campaigns
        const mockValidationCampaigns: ValidationCampaign[] = [
          {
            id: 'campaign-1',
            name: 'Q3 Feature Validation',
            objective: 'Validate new AI features with target users',
            targetSegment: 'Tech-Savvy Product Managers',
            method: 'interview',
            participants: 25,
            duration: 14,
            status: 'completed',
            results: {
              responseRate: 92,
              completionRate: 88,
              keyFindings: ['High interest in AI features', 'Need for better customization', 'Integration concerns'],
              recommendations: ['Improve customization options', 'Enhance integration capabilities', 'Provide better onboarding'],
              satisfactionScore: 8.2,
              completionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        setBetaUsers(mockBetaUsers);
        setPmfMetrics(mockPmfMetrics);
        setFeatureValidations(mockFeatureValidations);
        setUserSegments(mockUserSegments);
        setMarketInsights(mockMarketInsights);
        setValidationCampaigns(mockValidationCampaigns);

        toast.success('Market validation data loaded successfully!');
      } catch (error) {
        console.error('Failed to load market validation data:', error);
        toast.error('Failed to load market validation data');
      } finally {
        setIsLoading(false);
      }
    };

    loadMarketValidationData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'beta_users', label: 'Beta Users', icon: Users },
    { id: 'pmf_metrics', label: 'PMF Metrics', icon: Target },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'interviews', label: 'Interviews', icon: Mic },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'segments', label: 'Segments', icon: Users },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: PieChart }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'churned': return 'text-red-600 bg-red-100';
      case 'onboarding': return 'text-blue-600 bg-blue-100';
      case 'open': return 'text-yellow-600 bg-yellow-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      case 'planned': return 'text-purple-600 bg-purple-100';
      case 'testing': return 'text-orange-600 bg-orange-100';
      case 'released': return 'text-green-600 bg-green-100';
      case 'deprecated': return 'text-red-600 bg-red-100';
      case 'new': return 'text-blue-600 bg-blue-100';
      case 'validating': return 'text-yellow-600 bg-yellow-100';
      case 'validated': return 'text-green-600 bg-green-100';
      case 'implemented': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bug_report': return 'text-red-600 bg-red-100';
      case 'feature_request': return 'text-blue-600 bg-blue-100';
      case 'improvement': return 'text-green-600 bg-green-100';
      case 'complaint': return 'text-orange-600 bg-orange-100';
      case 'praise': return 'text-purple-600 bg-purple-100';
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
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Market Validation</h2>
                <p className="text-purple-100">Beta users management and product-market fit</p>
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
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
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">NPS Score</p>
                          <p className="text-3xl font-bold">{pmfMetrics[0]?.npsScore}</p>
                        </div>
                        <Heart className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Retention Rate</p>
                          <p className="text-3xl font-bold">{pmfMetrics[0]?.retentionRate}%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Weekly Active Users</p>
                          <p className="text-3xl font-bold">{pmfMetrics[0]?.weeklyActiveUsers.toLocaleString()}</p>
                        </div>
                        <Users className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Satisfaction Score</p>
                          <p className="text-3xl font-bold">{pmfMetrics[0]?.userSatisfactionScore}</p>
                        </div>
                        <Star className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">User Status Distribution</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: 'Active', value: betaUsers.filter(u => u.status === 'active').length },
                              { name: 'Inactive', value: betaUsers.filter(u => u.status === 'inactive').length },
                              { name: 'Churned', value: betaUsers.filter(u => u.status === 'churned').length },
                              { name: 'Onboarding', value: betaUsers.filter(u => u.status === 'onboarding').length }
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
                            <Cell fill="#6b7280" />
                            <Cell fill="#ef4444" />
                            <Cell fill="#3b82f6" />
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Feature Adoption Rate</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                          { name: 'Core Features', rate: 85 },
                          { name: 'Advanced Features', rate: 45 },
                          { name: 'Integrations', rate: 32 },
                          { name: 'Analytics', rate: 28 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="rate" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'beta_users' && (
                <motion.div
                  key="beta_users"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {betaUsers.map((user) => (
                    <div key={user.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Users className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.role} at {user.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {user.tier}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Total Sessions</span>
                          <p className="font-semibold">{user.usage.totalSessions}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Avg Session Duration</span>
                          <p className="font-semibold">{user.usage.averageSessionDuration}m</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Weekly Active Days</span>
                          <p className="font-semibold">{user.usage.weeklyActiveDays}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Features Used</span>
                          <p className="font-semibold">{user.usage.featuresUsed.length}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Features Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.usage.featuresUsed.map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Industry</span>
                          <p className="font-semibold">{user.industry}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Company Size</span>
                          <p className="font-semibold">{user.companySize}</p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Contact
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Interview
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'pmf_metrics' && (
                <motion.div
                  key="pmf_metrics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {pmfMetrics.map((metrics) => (
                    <div key={metrics.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Target className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{metrics.period}</h3>
                            <p className="text-sm text-gray-600">Product-Market Fit Metrics</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                            Strong PMF
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">NPS Score</span>
                          <p className="font-semibold">{metrics.npsScore}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Retention Rate</span>
                          <p className="font-semibold">{metrics.retentionRate}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Weekly Active Users</span>
                          <p className="font-semibold">{metrics.weeklyActiveUsers.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Monthly Active Users</span>
                          <p className="font-semibold">{metrics.monthlyActiveUsers.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Satisfaction Score</span>
                          <p className="font-semibold">{metrics.userSatisfactionScore}/10</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Organic Growth Rate</span>
                          <p className="font-semibold">{metrics.organicGrowthRate}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Referral Rate</span>
                          <p className="font-semibold">{metrics.referralRate}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Churn Rate</span>
                          <p className="font-semibold">{metrics.churnRate}%</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Engagement Score</span>
                          <p className="font-semibold">{metrics.engagementScore}/10</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Feature Adoption Rate</span>
                          <p className="font-semibold">{metrics.featureAdoptionRate}%</p>
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
                  {betaUsers.map((user) => 
                    user.feedback.map((feedback) => (
                      <div key={feedback.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <MessageCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{feedback.title}</h3>
                              <p className="text-sm text-gray-600">From {user.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTypeColor(feedback.type)}`}>
                              {feedback.type.replace('_', ' ')}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(feedback.priority)}`}>
                              {feedback.priority}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(feedback.status)}`}>
                              {feedback.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <span className="text-sm text-gray-500">Description:</span>
                          <p className="text-gray-700">{feedback.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-500">Category</span>
                            <p className="font-semibold">{feedback.category}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Rating</span>
                            <p className="font-semibold">{feedback.rating}/5</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Created</span>
                            <p className="font-semibold text-sm">
                              {new Date(feedback.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Tags:</h4>
                          <div className="flex flex-wrap gap-2">
                            {feedback.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {featureValidations.map((validation) => (
                    <div key={validation.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Zap className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{validation.featureName}</h3>
                            <p className="text-sm text-gray-600">{validation.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(validation.status)}`}>
                            {validation.status.replace('_', ' ')}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {validation.validationMethod.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Validation Method:</span>
                        <p className="text-gray-700">{validation.validationMethod.replace('_', ' ')}</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Target Users:</h4>
                        <div className="flex flex-wrap gap-2">
                          {validation.targetUsers.map((user, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {user}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Success Criteria:</h4>
                        <div className="flex flex-wrap gap-2">
                          {validation.successCriteria.map((criteria, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {criteria}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Adoption Rate</span>
                          <p className="font-semibold">{validation.metrics.adoptionRate}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">User Satisfaction</span>
                          <p className="font-semibold">{validation.metrics.userSatisfaction}/10</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Completion Rate</span>
                          <p className="font-semibold">{validation.metrics.completionRate}%</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Key Insights:</h4>
                        <div className="flex flex-wrap gap-2">
                          {validation.results.keyInsights.map((insight, index) => (
                            <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                              {insight}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Recommendations:</h4>
                        <div className="flex flex-wrap gap-2">
                          {validation.results.recommendations.map((recommendation, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                              {recommendation}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">Confidence:</span>
                          <p className="font-semibold">{validation.results.confidence}%</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Update
                          </button>
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            Validate
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Organic Growth</p>
                          <p className="text-3xl font-bold">{pmfMetrics[0]?.organicGrowthRate}%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Referral Rate</p>
                          <p className="text-3xl font-bold">{pmfMetrics[0]?.referralRate}%</p>
                        </div>
                        <Share2 className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Engagement Score</p>
                          <p className="text-3xl font-bold">{pmfMetrics[0]?.engagementScore}</p>
                        </div>
                        <Activity className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Feature Adoption</p>
                          <p className="text-3xl font-bold">{pmfMetrics[0]?.featureAdoptionRate}%</p>
                        </div>
                        <Zap className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MarketValidation;