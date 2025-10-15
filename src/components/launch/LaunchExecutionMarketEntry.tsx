import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, Target, Calendar, BarChart3, Users, AlertTriangle, CheckCircle, Clock, Globe, TrendingUp, Award, Flag, Zap, Star, Shield, Activity, MapPin, DollarSign, MessageCircle, Mail, Phone, Video, Share2, ExternalLink, Plus, Edit, Trash2, Save, Copy, ArrowUp, ArrowDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-hot-toast';

// Launch Execution & Market Entry interfaces
interface LaunchCampaign {
  id: string;
  name: string;
  type: 'product_launch' | 'market_entry' | 'feature_launch' | 'partnership_launch' | 'event_launch';
  status: 'planned' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  budget: number;
  currency: string;
  targetAudience: string[];
  channels: string[];
  metrics: LaunchMetrics;
  content: LaunchContent[];
  createdAt: string;
}

interface LaunchMetrics {
  reach: number;
  impressions: number;
  clicks: number;
  conversions: number;
  signups: number;
  revenue: number;
  cost: number;
  roi: number;
  engagementRate: number;
  conversionRate: number;
}

interface LaunchContent {
  id: string;
  type: 'announcement' | 'demo' | 'tutorial' | 'case_study' | 'press_release' | 'social_post';
  title: string;
  content: string;
  platform: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  publishDate?: string;
  performance: ContentPerformance;
}

interface ContentPerformance {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  clicks: number;
}

interface LaunchMilestone {
  id: string;
  name: string;
  description: string;
  type: 'pre_launch' | 'launch_day' | 'post_launch' | 'follow_up';
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  dueDate: string;
  completedDate?: string;
  dependencies: string[];
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
}

interface MarketEntryStrategy {
  id: string;
  name: string;
  targetMarket: string;
  region: string;
  strategy: 'direct_sales' | 'partnership' | 'channel' | 'online' | 'hybrid';
  status: 'research' | 'planning' | 'executing' | 'evaluating' | 'completed';
  budget: number;
  currency: string;
  timeline: string;
  successMetrics: string[];
  risks: string[];
  mitigation: string[];
  createdAt: string;
}

interface LaunchTeam {
  id: string;
  name: string;
  role: 'project_manager' | 'marketing_manager' | 'product_manager' | 'developer' | 'designer' | 'analyst';
  email: string;
  phone: string;
  responsibilities: string[];
  availability: 'full_time' | 'part_time' | 'consultant';
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
}

interface LaunchRisk {
  id: string;
  name: string;
  category: 'technical' | 'market' | 'competitive' | 'regulatory' | 'operational';
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  mitigation: string;
  owner: string;
  status: 'identified' | 'monitoring' | 'mitigating' | 'resolved';
  createdAt: string;
}

const LaunchExecutionMarketEntry: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [launchCampaigns, setLaunchCampaigns] = useState<LaunchCampaign[]>([]);
  const [launchMilestones, setLaunchMilestones] = useState<LaunchMilestone[]>([]);
  const [marketEntryStrategies, setMarketEntryStrategies] = useState<MarketEntryStrategy[]>([]);
  const [launchTeam, setLaunchTeam] = useState<LaunchTeam[]>([]);
  const [launchRisks, setLaunchRisks] = useState<LaunchRisk[]>([]);
  const [overallMetrics, setOverallMetrics] = useState<LaunchMetrics | null>(null);

  // SSR-safe data loading
  useEffect(() => {
    const loadLaunchData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock launch campaigns
        const mockCampaigns: LaunchCampaign[] = [
          {
            id: 'campaign-1',
            name: 'SyncScript Product Hunt Launch',
            type: 'product_launch',
            status: 'active',
            startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            budget: 10000,
            currency: 'USD',
            targetAudience: ['tech_enthusiasts', 'product_managers', 'early_adopters'],
            channels: ['product_hunt', 'social_media', 'email', 'blog'],
            metrics: {
              reach: 50000,
              impressions: 300000,
              clicks: 5000,
              conversions: 250,
              signups: 500,
              revenue: 15000,
              cost: 7500,
              roi: 200,
              engagementRate: 8.5,
              conversionRate: 5.0
            },
            content: [
              {
                id: 'content-1',
                type: 'announcement',
                title: 'SyncScript is Live on Product Hunt!',
                content: '🚀 We\'re excited to announce SyncScript on Product Hunt!',
                platform: 'product_hunt',
                status: 'published',
                publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                performance: {
                  views: 25000,
                  likes: 1200,
                  shares: 300,
                  comments: 150,
                  clicks: 2500
                }
              }
            ],
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock launch milestones
        const mockMilestones: LaunchMilestone[] = [
          {
            id: 'milestone-1',
            name: 'Product Hunt Submission',
            description: 'Submit SyncScript to Product Hunt for launch day',
            type: 'pre_launch',
            status: 'completed',
            dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            completedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            dependencies: [],
            assignee: 'Sarah Johnson',
            priority: 'critical',
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'milestone-2',
            name: 'Launch Day Execution',
            description: 'Execute launch day activities and monitor performance',
            type: 'launch_day',
            status: 'in_progress',
            dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            dependencies: ['milestone-1'],
            assignee: 'Michael Chen',
            priority: 'critical',
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'milestone-3',
            name: 'Post-Launch Analysis',
            description: 'Analyze launch performance and gather feedback',
            type: 'post_launch',
            status: 'pending',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            dependencies: ['milestone-2'],
            assignee: 'Emily Rodriguez',
            priority: 'high',
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock market entry strategies
        const mockStrategies: MarketEntryStrategy[] = [
          {
            id: 'strategy-1',
            name: 'North American Market Entry',
            targetMarket: 'SMBs and Mid-Market Companies',
            region: 'North America',
            strategy: 'hybrid',
            status: 'executing',
            budget: 50000,
            currency: 'USD',
            timeline: '6 months',
            successMetrics: ['User acquisition', 'Revenue growth', 'Market share'],
            risks: ['Competition', 'Regulatory compliance', 'Market saturation'],
            mitigation: ['Competitive differentiation', 'Legal review', 'Market research'],
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock launch team
        const mockTeam: LaunchTeam[] = [
          {
            id: 'team-1',
            name: 'Sarah Johnson',
            role: 'project_manager',
            email: 'sarah.johnson@syncscript.com',
            phone: '+1-555-0123',
            responsibilities: ['Project coordination', 'Timeline management', 'Team communication'],
            availability: 'full_time',
            status: 'active',
            joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'team-2',
            name: 'Michael Chen',
            role: 'marketing_manager',
            email: 'michael.chen@syncscript.com',
            phone: '+1-555-0456',
            responsibilities: ['Campaign execution', 'Content creation', 'Analytics'],
            availability: 'full_time',
            status: 'active',
            joinDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'team-3',
            name: 'Emily Rodriguez',
            role: 'product_manager',
            email: 'emily.rodriguez@syncscript.com',
            phone: '+1-555-0789',
            responsibilities: ['Product strategy', 'Feature prioritization', 'User feedback'],
            availability: 'full_time',
            status: 'active',
            joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock launch risks
        const mockRisks: LaunchRisk[] = [
          {
            id: 'risk-1',
            name: 'Server Overload',
            category: 'technical',
            probability: 'medium',
            impact: 'high',
            description: 'High traffic during launch could overwhelm servers',
            mitigation: 'Scale infrastructure and implement load balancing',
            owner: 'Technical Team',
            status: 'mitigating',
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'risk-2',
            name: 'Competitive Response',
            category: 'competitive',
            probability: 'high',
            impact: 'medium',
            description: 'Competitors may launch similar features',
            mitigation: 'Focus on unique value proposition and rapid iteration',
            owner: 'Product Team',
            status: 'monitoring',
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock overall metrics
        const mockOverallMetrics: LaunchMetrics = {
          reach: 75000,
          impressions: 450000,
          clicks: 7500,
          conversions: 375,
          signups: 750,
          revenue: 22500,
          cost: 11250,
          roi: 200,
          engagementRate: 8.5,
          conversionRate: 5.0
        };

        setLaunchCampaigns(mockCampaigns);
        setLaunchMilestones(mockMilestones);
        setMarketEntryStrategies(mockStrategies);
        setLaunchTeam(mockTeam);
        setLaunchRisks(mockRisks);
        setOverallMetrics(mockOverallMetrics);

        toast.success('Launch execution data loaded successfully!');
      } catch (error) {
        console.error('Failed to load launch data:', error);
        toast.error('Failed to load launch execution data');
      } finally {
        setIsLoading(false);
      }
    };

    loadLaunchData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'campaigns', label: 'Campaigns', icon: Rocket },
    { id: 'milestones', label: 'Milestones', icon: Target },
    { id: 'market', label: 'Market Entry', icon: Globe },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'risks', label: 'Risks', icon: AlertTriangle }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'text-gray-600 bg-gray-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'delayed': return 'text-orange-600 bg-orange-100';
      case 'research': return 'text-purple-600 bg-purple-100';
      case 'planning': return 'text-blue-600 bg-blue-100';
      case 'executing': return 'text-green-600 bg-green-100';
      case 'evaluating': return 'text-yellow-600 bg-yellow-100';
      case 'identified': return 'text-red-600 bg-red-100';
      case 'monitoring': return 'text-yellow-600 bg-yellow-100';
      case 'mitigating': return 'text-orange-600 bg-orange-100';
      case 'resolved': return 'text-green-600 bg-green-100';
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'text-green-600 bg-green-100';
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
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Launch Execution & Market Entry</h2>
                <p className="text-orange-100">Market penetration and launch execution</p>
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
                      : 'text-orange-100 hover:bg-white hover:bg-opacity-10'
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
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
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Total Reach</p>
                          <p className="text-3xl font-bold">{overallMetrics?.reach.toLocaleString()}</p>
                        </div>
                        <Users className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Conversions</p>
                          <p className="text-3xl font-bold">{overallMetrics?.conversions}</p>
                        </div>
                        <Target className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Revenue</p>
                          <p className="text-3xl font-bold">${overallMetrics?.revenue.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">ROI</p>
                          <p className="text-3xl font-bold">{overallMetrics?.roi}%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={launchCampaigns.map(campaign => ({
                          name: campaign.name.substring(0, 15) + '...',
                          reach: campaign.metrics.reach,
                          conversions: campaign.metrics.conversions
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="reach" fill="#f97316" />
                          <Bar dataKey="conversions" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Milestone Status</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Completed', value: launchMilestones.filter(m => m.status === 'completed').length },
                              { name: 'In Progress', value: launchMilestones.filter(m => m.status === 'in_progress').length },
                              { name: 'Pending', value: launchMilestones.filter(m => m.status === 'pending').length },
                              { name: 'Delayed', value: launchMilestones.filter(m => m.status === 'delayed').length }
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
                            <Cell fill="#3b82f6" />
                            <Cell fill="#6b7280" />
                            <Cell fill="#f97316" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
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
                  {launchCampaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Rocket className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{campaign.name}</h3>
                            <p className="text-sm text-gray-600">{campaign.type.replace('_', ' ')}</p>
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
                          <span className="text-sm text-gray-500">Revenue</span>
                          <p className="font-semibold">${campaign.metrics.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Target Audience:</h4>
                        <div className="flex flex-wrap gap-2">
                          {campaign.targetAudience.map((audience, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {audience.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Channels:</h4>
                        <div className="flex flex-wrap gap-2">
                          {campaign.channels.map((channel, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {channel.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
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
                  {launchMilestones.map((milestone) => (
                    <div key={milestone.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Target className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{milestone.name}</h3>
                            <p className="text-sm text-gray-600">{milestone.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(milestone.status)}`}>
                            {milestone.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(milestone.priority)}`}>
                            {milestone.priority}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{milestone.description}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Due Date</span>
                          <p className="font-semibold text-sm">
                            {new Date(milestone.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Assignee</span>
                          <p className="font-semibold text-sm">{milestone.assignee}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Completed</span>
                          <p className="font-semibold text-sm">
                            {milestone.completedDate ? new Date(milestone.completedDate).toLocaleDateString() : 'Not completed'}
                          </p>
                        </div>
                      </div>
                      {milestone.dependencies.length > 0 && (
                        <div className="space-y-2 mb-4">
                          <h4 className="font-medium">Dependencies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {milestone.dependencies.map((dep, index) => (
                              <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                                {dep}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'market' && (
                <motion.div
                  key="market"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {marketEntryStrategies.map((strategy) => (
                    <div key={strategy.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Globe className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{strategy.name}</h3>
                            <p className="text-sm text-gray-600">{strategy.targetMarket}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(strategy.status)}`}>
                            {strategy.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            ${strategy.budget.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Region</span>
                          <p className="font-semibold">{strategy.region}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Strategy</span>
                          <p className="font-semibold">{strategy.strategy.replace('_', ' ')}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Timeline</span>
                          <p className="font-semibold">{strategy.timeline}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Success Metrics:</h4>
                        <div className="flex flex-wrap gap-2">
                          {strategy.successMetrics.map((metric, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Risks:</h4>
                        <div className="flex flex-wrap gap-2">
                          {strategy.risks.map((risk, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                              {risk}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Mitigation:</h4>
                        <div className="flex flex-wrap gap-2">
                          {strategy.mitigation.map((mitigation, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {mitigation}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'team' && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {launchTeam.map((member) => (
                    <div key={member.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Users className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {member.availability.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Email</span>
                          <p className="font-semibold text-sm">{member.email}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Phone</span>
                          <p className="font-semibold text-sm">{member.phone}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Responsibilities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.responsibilities.map((responsibility, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {responsibility}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Contact
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'risks' && (
                <motion.div
                  key="risks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {launchRisks.map((risk) => (
                    <div key={risk.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{risk.name}</h3>
                            <p className="text-sm text-gray-600">{risk.category.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(risk.status)}`}>
                            {risk.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(risk.probability)}`}>
                            {risk.probability} probability
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getImpactColor(risk.impact)}`}>
                            {risk.impact} impact
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{risk.description}</p>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Mitigation:</span>
                        <p className="text-gray-700">{risk.mitigation}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Owner</span>
                          <p className="font-semibold">{risk.owner}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Identified</span>
                          <p className="font-semibold text-sm">
                            {new Date(risk.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Update
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Mitigate
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

export default LaunchExecutionMarketEntry;