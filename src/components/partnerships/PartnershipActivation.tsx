import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Handshake, Target, Users, BarChart3, Calendar, Globe, Building, Phone, Mail, MessageCircle, FileText, Award, Clock, CheckCircle, AlertTriangle, Plus, Edit, Trash2, Save, Copy, ExternalLink, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Star, Zap, Shield, Activity, MapPin, Share2, Video, Briefcase, PieChart, LineChart, Network, Link, Layers, Cpu, Database, Code, Settings, Workflow } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-hot-toast';

// Partnership Activation interfaces
interface ActivePartnership {
  id: string;
  partnerName: string;
  partnerType: 'integration' | 'channel' | 'strategic' | 'technology' | 'reseller';
  status: 'active' | 'paused' | 'terminated' | 'renewal_pending';
  startDate: string;
  endDate?: string;
  contractValue: number;
  currency: string;
  revenue: number;
  contactPerson: string;
  email: string;
  phone: string;
  description: string;
  benefits: string[];
  metrics: PartnershipMetrics;
  activities: PartnershipActivity[];
  createdAt: string;
  updatedAt: string;
}

interface PartnershipMetrics {
  leadsGenerated: number;
  dealsClosed: number;
  revenueGenerated: number;
  customerAcquisition: number;
  marketReach: number;
  satisfactionScore: number;
}

interface PartnershipActivity {
  id: string;
  type: 'meeting' | 'call' | 'email' | 'event' | 'training' | 'review';
  subject: string;
  description: string;
  date: string;
  participants: string[];
  outcome: 'positive' | 'neutral' | 'negative';
  nextAction?: string;
  createdAt: string;
}

interface PartnershipPipeline {
  id: string;
  name: string;
  stages: PartnershipStage[];
  totalValue: number;
  currency: string;
  createdAt: string;
}

interface PartnershipStage {
  id: string;
  name: string;
  partnerships: ActivePartnership[];
  value: number;
  probability: number;
  averageDays: number;
}

interface PartnershipTeamMember {
  id: string;
  name: string;
  role: 'partnership_manager' | 'business_development' | 'channel_manager' | 'integration_specialist' | 'partnership_director';
  email: string;
  phone: string;
  territory: string;
  responsibilities: string[];
  performance: PartnershipPerformance;
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
}

interface PartnershipPerformance {
  partnershipsManaged: number;
  revenueGenerated: number;
  dealsClosed: number;
  satisfactionScore: number;
  activitiesCompleted: number;
}

interface PartnershipAnalytics {
  totalPartnerships: number;
  activePartnerships: number;
  totalRevenue: number;
  averagePartnershipValue: number;
  satisfactionScore: number;
  renewalRate: number;
  leadGeneration: number;
  marketReach: number;
}

interface IntegrationPartnership {
  id: string;
  partnerName: string;
  integrationType: 'api' | 'webhook' | 'sso' | 'data_sync' | 'workflow';
  status: 'development' | 'testing' | 'live' | 'maintenance';
  technicalContact: string;
  documentation: string;
  apiEndpoints: string[];
  lastSync: string;
  uptime: number;
  createdAt: string;
}

interface StrategicPartnership {
  id: string;
  partnerName: string;
  partnershipType: 'joint_venture' | 'co_marketing' | 'co_development' | 'exclusive' | 'preferred';
  status: 'exploring' | 'negotiating' | 'active' | 'evaluating' | 'completed';
  dealValue: number;
  currency: string;
  duration: string;
  objectives: string[];
  successMetrics: string[];
  risks: string[];
  mitigation: string[];
  createdAt: string;
}

interface ChannelPartnership {
  id: string;
  partnerName: string;
  channelType: 'reseller' | 'distributor' | 'consultant' | 'referral' | 'marketplace';
  status: 'onboarding' | 'active' | 'suspended' | 'terminated';
  commissionRate: number;
  territory: string;
  certifications: string[];
  salesTarget: number;
  currency: string;
  performance: ChannelPerformance;
  createdAt: string;
}

interface ChannelPerformance {
  dealsClosed: number;
  revenue: number;
  targetAchievement: number;
  customerSatisfaction: number;
  trainingCompleted: boolean;
}

interface TechnologyPartnership {
  id: string;
  partnerName: string;
  technologyType: 'platform' | 'infrastructure' | 'security' | 'analytics' | 'ai_ml';
  status: 'evaluation' | 'integration' | 'live' | 'optimization';
  technicalSpecs: string[];
  documentation: string;
  supportLevel: 'basic' | 'standard' | 'premium' | 'enterprise';
  sla: string;
  createdAt: string;
}

const PartnershipActivation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [activePartnerships, setActivePartnerships] = useState<ActivePartnership[]>([]);
  const [partnershipPipeline, setPartnershipPipeline] = useState<PartnershipPipeline[]>([]);
  const [partnershipTeam, setPartnershipTeam] = useState<PartnershipTeamMember[]>([]);
  const [integrationPartnerships, setIntegrationPartnerships] = useState<IntegrationPartnership[]>([]);
  const [strategicPartnerships, setStrategicPartnerships] = useState<StrategicPartnership[]>([]);
  const [channelPartnerships, setChannelPartnerships] = useState<ChannelPartnership[]>([]);
  const [technologyPartnerships, setTechnologyPartnerships] = useState<TechnologyPartnership[]>([]);
  const [partnershipAnalytics, setPartnershipAnalytics] = useState<PartnershipAnalytics | null>(null);

  // SSR-safe data loading
  useEffect(() => {
    const loadPartnershipData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock active partnerships
        const mockActivePartnerships: ActivePartnership[] = [
          {
            id: 'partnership-1',
            partnerName: 'Microsoft',
            partnerType: 'integration',
            status: 'active',
            startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            contractValue: 500000,
            currency: 'USD',
            revenue: 125000,
            contactPerson: 'David Wilson',
            email: 'david.wilson@microsoft.com',
            phone: '+1-555-0123',
            description: 'Integration with Microsoft Teams and Office 365 for enterprise customers',
            benefits: ['Increased market reach', 'Enterprise credibility', 'Technical integration'],
            metrics: {
              leadsGenerated: 250,
              dealsClosed: 15,
              revenueGenerated: 125000,
              customerAcquisition: 45,
              marketReach: 50000,
              satisfactionScore: 9.2
            },
            activities: [
              {
                id: 'activity-1',
                type: 'meeting',
                subject: 'Monthly Partnership Review',
                description: 'Reviewed partnership performance and identified growth opportunities',
                date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                participants: ['David Wilson', 'Sarah Johnson'],
                outcome: 'positive',
                nextAction: 'Plan joint marketing campaign',
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
              }
            ],
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'partnership-2',
            partnerName: 'Salesforce',
            partnerType: 'strategic',
            status: 'active',
            startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            contractValue: 750000,
            currency: 'USD',
            revenue: 200000,
            contactPerson: 'Lisa Chen',
            email: 'lisa.chen@salesforce.com',
            phone: '+1-555-0456',
            description: 'Strategic partnership for CRM integration and co-marketing',
            benefits: ['CRM integration', 'Co-marketing opportunities', 'Customer referrals'],
            metrics: {
              leadsGenerated: 400,
              dealsClosed: 25,
              revenueGenerated: 200000,
              customerAcquisition: 60,
              marketReach: 75000,
              satisfactionScore: 8.8
            },
            activities: [],
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock partnership pipeline
        const mockPipeline: PartnershipPipeline[] = [
          {
            id: 'pipeline-1',
            name: 'Partnership Development Pipeline',
            stages: [
              {
                id: 'stage-1',
                name: 'Initial Contact',
                partnerships: [],
                value: 0,
                probability: 10,
                averageDays: 7
              },
              {
                id: 'stage-2',
                name: 'Qualification',
                partnerships: [],
                value: 0,
                probability: 25,
                averageDays: 14
              },
              {
                id: 'stage-3',
                name: 'Negotiation',
                partnerships: [],
                value: 0,
                probability: 50,
                averageDays: 30
              },
              {
                id: 'stage-4',
                name: 'Contract',
                partnerships: [],
                value: 0,
                probability: 75,
                averageDays: 45
              },
              {
                id: 'stage-5',
                name: 'Active',
                partnerships: activePartnerships,
                value: 1250000,
                probability: 100,
                averageDays: 0
              }
            ],
            totalValue: 1250000,
            currency: 'USD',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock partnership team
        const mockTeam: PartnershipTeamMember[] = [
          {
            id: 'team-1',
            name: 'Sarah Johnson',
            role: 'partnership_manager',
            email: 'sarah.johnson@syncscript.com',
            phone: '+1-555-0123',
            territory: 'North America',
            responsibilities: ['Partnership development', 'Relationship management', 'Contract negotiation'],
            performance: {
              partnershipsManaged: 8,
              revenueGenerated: 325000,
              dealsClosed: 40,
              satisfactionScore: 9.0,
              activitiesCompleted: 120
            },
            status: 'active',
            joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'team-2',
            name: 'Michael Chen',
            role: 'channel_manager',
            email: 'michael.chen@syncscript.com',
            phone: '+1-555-0456',
            territory: 'Asia Pacific',
            responsibilities: ['Channel partner management', 'Training programs', 'Performance tracking'],
            performance: {
              partnershipsManaged: 12,
              revenueGenerated: 450000,
              dealsClosed: 55,
              satisfactionScore: 8.7,
              activitiesCompleted: 95
            },
            status: 'active',
            joinDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock integration partnerships
        const mockIntegrations: IntegrationPartnership[] = [
          {
            id: 'integration-1',
            partnerName: 'Slack',
            integrationType: 'api',
            status: 'live',
            technicalContact: 'tech@slack.com',
            documentation: 'https://api.slack.com/syncscript',
            apiEndpoints: ['/messages', '/channels', '/users'],
            lastSync: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            uptime: 99.9,
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock strategic partnerships
        const mockStrategic: StrategicPartnership[] = [
          {
            id: 'strategic-1',
            partnerName: 'Google Cloud',
            partnershipType: 'co_development',
            status: 'active',
            dealValue: 1000000,
            currency: 'USD',
            duration: '2 years',
            objectives: ['Cloud integration', 'AI/ML capabilities', 'Market expansion'],
            successMetrics: ['Revenue growth', 'Customer acquisition', 'Technical integration'],
            risks: ['Technical complexity', 'Market competition', 'Resource allocation'],
            mitigation: ['Dedicated team', 'Regular reviews', 'Risk monitoring'],
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock channel partnerships
        const mockChannels: ChannelPartnership[] = [
          {
            id: 'channel-1',
            partnerName: 'TechCorp Solutions',
            channelType: 'reseller',
            status: 'active',
            commissionRate: 15,
            territory: 'West Coast',
            certifications: ['Sales Certified', 'Technical Certified'],
            salesTarget: 200000,
            currency: 'USD',
            performance: {
              dealsClosed: 8,
              revenue: 150000,
              targetAchievement: 75,
              customerSatisfaction: 9.1,
              trainingCompleted: true
            },
            createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock technology partnerships
        const mockTechnology: TechnologyPartnership[] = [
          {
            id: 'tech-1',
            partnerName: 'AWS',
            technologyType: 'infrastructure',
            status: 'live',
            technicalSpecs: ['EC2', 'S3', 'Lambda', 'RDS'],
            documentation: 'https://aws.amazon.com/syncscript',
            supportLevel: 'enterprise',
            sla: '99.99% uptime',
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock partnership analytics
        const mockAnalytics: PartnershipAnalytics = {
          totalPartnerships: 15,
          activePartnerships: 12,
          totalRevenue: 325000,
          averagePartnershipValue: 21667,
          satisfactionScore: 9.0,
          renewalRate: 85,
          leadGeneration: 650,
          marketReach: 125000
        };

        setActivePartnerships(mockActivePartnerships);
        setPartnershipPipeline(mockPipeline);
        setPartnershipTeam(mockTeam);
        setIntegrationPartnerships(mockIntegrations);
        setStrategicPartnerships(mockStrategic);
        setChannelPartnerships(mockChannels);
        setTechnologyPartnerships(mockTechnology);
        setPartnershipAnalytics(mockAnalytics);

        toast.success('Partnership activation data loaded successfully!');
      } catch (error) {
        console.error('Failed to load partnership data:', error);
        toast.error('Failed to load partnership activation data');
      } finally {
        setIsLoading(false);
      }
    };

    loadPartnershipData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'partnerships', label: 'Partnerships', icon: Handshake },
    { id: 'pipeline', label: 'Pipeline', icon: Target },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'strategic', label: 'Strategic', icon: Star },
    { id: 'channels', label: 'Channels', icon: Network },
    { id: 'technology', label: 'Technology', icon: Cpu },
    { id: 'analytics', label: 'Analytics', icon: PieChart }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'terminated': return 'text-red-600 bg-red-100';
      case 'renewal_pending': return 'text-orange-600 bg-orange-100';
      case 'development': return 'text-blue-600 bg-blue-100';
      case 'testing': return 'text-purple-600 bg-purple-100';
      case 'live': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-gray-600 bg-gray-100';
      case 'exploring': return 'text-purple-600 bg-purple-100';
      case 'negotiating': return 'text-blue-600 bg-blue-100';
      case 'evaluating': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'onboarding': return 'text-blue-600 bg-blue-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'evaluation': return 'text-purple-600 bg-purple-100';
      case 'integration': return 'text-blue-600 bg-blue-100';
      case 'optimization': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'integration': return 'text-blue-600 bg-blue-100';
      case 'channel': return 'text-green-600 bg-green-100';
      case 'strategic': return 'text-purple-600 bg-purple-100';
      case 'technology': return 'text-orange-600 bg-orange-100';
      case 'reseller': return 'text-indigo-600 bg-indigo-100';
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
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Handshake className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Partnership Activation</h2>
                <p className="text-emerald-100">Strategic partnerships and channel development</p>
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
                      : 'text-emerald-100 hover:bg-white hover:bg-opacity-10'
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
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
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-emerald-100">Total Partnerships</p>
                          <p className="text-3xl font-bold">{partnershipAnalytics?.totalPartnerships}</p>
                        </div>
                        <Handshake className="w-8 h-8 text-emerald-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Active Partnerships</p>
                          <p className="text-3xl font-bold">{partnershipAnalytics?.activePartnerships}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Total Revenue</p>
                          <p className="text-3xl font-bold">${partnershipAnalytics?.totalRevenue.toLocaleString()}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Satisfaction Score</p>
                          <p className="text-3xl font-bold">{partnershipAnalytics?.satisfactionScore}</p>
                        </div>
                        <Star className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Partnership Types</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: 'Integration', value: activePartnerships.filter(p => p.partnerType === 'integration').length },
                              { name: 'Strategic', value: activePartnerships.filter(p => p.partnerType === 'strategic').length },
                              { name: 'Channel', value: activePartnerships.filter(p => p.partnerType === 'channel').length },
                              { name: 'Technology', value: activePartnerships.filter(p => p.partnerType === 'technology').length },
                              { name: 'Reseller', value: activePartnerships.filter(p => p.partnerType === 'reseller').length }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#8b5cf6" />
                            <Cell fill="#10b981" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#6366f1" />
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={partnershipTeam.map(member => ({
                          name: member.name.split(' ')[0],
                          revenue: member.performance.revenueGenerated / 1000,
                          satisfaction: member.performance.satisfactionScore
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="revenue" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'partnerships' && (
                <motion.div
                  key="partnerships"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {activePartnerships.map((partnership) => (
                    <div key={partnership.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <Handshake className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{partnership.partnerName}</h3>
                            <p className="text-sm text-gray-600">{partnership.partnerType.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(partnership.status)}`}>
                            {partnership.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTypeColor(partnership.partnerType)}`}>
                            {partnership.partnerType}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Contract Value</span>
                          <p className="font-semibold">${partnership.contractValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Revenue Generated</span>
                          <p className="font-semibold">${partnership.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Contact Person</span>
                          <p className="font-semibold text-sm">{partnership.contactPerson}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Satisfaction Score</span>
                          <p className="font-semibold">{partnership.metrics.satisfactionScore}/10</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{partnership.description}</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {partnership.benefits.map((benefit, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Leads Generated</span>
                          <p className="font-semibold">{partnership.metrics.leadsGenerated}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Deals Closed</span>
                          <p className="font-semibold">{partnership.metrics.dealsClosed}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Market Reach</span>
                          <p className="font-semibold">{partnership.metrics.marketReach.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Manage
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'pipeline' && (
                <motion.div
                  key="pipeline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {partnershipPipeline.map((pipeline) => (
                    <div key={pipeline.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-teal-100 rounded-lg">
                            <Target className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{pipeline.name}</h3>
                            <p className="text-sm text-gray-600">Total Value: ${pipeline.totalValue.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {pipeline.stages.map((stage) => (
                          <div key={stage.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="text-center mb-3">
                              <h4 className="font-medium text-gray-900">{stage.name}</h4>
                              <p className="text-sm text-gray-600">{stage.partnerships.length} partnerships</p>
                            </div>
                            <div className="text-center mb-3">
                              <p className="text-lg font-bold text-gray-900">${stage.value.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">{stage.probability}% probability</p>
                            </div>
                            <div className="space-y-2">
                              {stage.partnerships.map((partnership) => (
                                <div key={partnership.id} className="bg-white rounded p-2 text-sm">
                                  <p className="font-medium">{partnership.partnerName}</p>
                                  <p className="text-gray-600">${partnership.contractValue.toLocaleString()}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
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
                  {partnershipTeam.map((member) => (
                    <div key={member.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Users className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(member.status)}`}>
                            {member.status.replace('_', ' ')}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {member.territory}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Partnerships Managed</span>
                          <p className="font-semibold">{member.performance.partnershipsManaged}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Revenue Generated</span>
                          <p className="font-semibold">${member.performance.revenueGenerated.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Deals Closed</span>
                          <p className="font-semibold">{member.performance.dealsClosed}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Satisfaction Score</span>
                          <p className="font-semibold">{member.performance.satisfactionScore}/10</p>
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
                          View Performance
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'integrations' && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {integrationPartnerships.map((integration) => (
                    <div key={integration.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Link className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{integration.partnerName}</h3>
                            <p className="text-sm text-gray-600">{integration.integrationType.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(integration.status)}`}>
                            {integration.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {integration.uptime}% uptime
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Technical Contact</span>
                          <p className="font-semibold text-sm">{integration.technicalContact}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Last Sync</span>
                          <p className="font-semibold text-sm">
                            {new Date(integration.lastSync).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">API Endpoints</span>
                          <p className="font-semibold">{integration.apiEndpoints.length}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Documentation:</span>
                        <p className="text-gray-700">{integration.documentation}</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">API Endpoints:</h4>
                        <div className="flex flex-wrap gap-2">
                          {integration.apiEndpoints.map((endpoint, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {endpoint}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'strategic' && (
                <motion.div
                  key="strategic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {strategicPartnerships.map((partnership) => (
                    <div key={partnership.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Star className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{partnership.partnerName}</h3>
                            <p className="text-sm text-gray-600">{partnership.partnershipType.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(partnership.status)}`}>
                            {partnership.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            ${partnership.dealValue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Duration</span>
                          <p className="font-semibold">{partnership.duration}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Deal Value</span>
                          <p className="font-semibold">${partnership.dealValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Currency</span>
                          <p className="font-semibold">{partnership.currency}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Objectives:</h4>
                        <div className="flex flex-wrap gap-2">
                          {partnership.objectives.map((objective, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {objective}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Success Metrics:</h4>
                        <div className="flex flex-wrap gap-2">
                          {partnership.successMetrics.map((metric, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Risks:</h4>
                        <div className="flex flex-wrap gap-2">
                          {partnership.risks.map((risk, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                              {risk}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Mitigation:</h4>
                        <div className="flex flex-wrap gap-2">
                          {partnership.mitigation.map((mitigation, index) => (
                            <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                              {mitigation}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'channels' && (
                <motion.div
                  key="channels"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {channelPartnerships.map((channel) => (
                    <div key={channel.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Network className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{channel.partnerName}</h3>
                            <p className="text-sm text-gray-600">{channel.channelType.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(channel.status)}`}>
                            {channel.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {channel.commissionRate}% commission
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Territory</span>
                          <p className="font-semibold">{channel.territory}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Sales Target</span>
                          <p className="font-semibold">${channel.salesTarget.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Target Achievement</span>
                          <p className="font-semibold">{channel.performance.targetAchievement}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Customer Satisfaction</span>
                          <p className="font-semibold">{channel.performance.customerSatisfaction}/10</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Certifications:</h4>
                        <div className="flex flex-wrap gap-2">
                          {channel.certifications.map((cert, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Deals Closed</span>
                          <p className="font-semibold">{channel.performance.dealsClosed}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Revenue</span>
                          <p className="font-semibold">${channel.performance.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'technology' && (
                <motion.div
                  key="technology"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {technologyPartnerships.map((tech) => (
                    <div key={tech.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Cpu className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{tech.partnerName}</h3>
                            <p className="text-sm text-gray-600">{tech.technologyType.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(tech.status)}`}>
                            {tech.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {tech.supportLevel}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Documentation:</span>
                        <p className="text-gray-700">{tech.documentation}</p>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">SLA:</span>
                        <p className="text-gray-700">{tech.sla}</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Technical Specs:</h4>
                        <div className="flex flex-wrap gap-2">
                          {tech.technicalSpecs.map((spec, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'analytics' && partnershipAnalytics && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-emerald-100">Renewal Rate</p>
                          <p className="text-3xl font-bold">{partnershipAnalytics.renewalRate}%</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-emerald-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Lead Generation</p>
                          <p className="text-3xl font-bold">{partnershipAnalytics.leadGeneration}</p>
                        </div>
                        <Target className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Market Reach</p>
                          <p className="text-3xl font-bold">{partnershipAnalytics.marketReach.toLocaleString()}</p>
                        </div>
                        <Globe className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Avg Partnership Value</p>
                          <p className="text-3xl font-bold">${partnershipAnalytics.averagePartnershipValue.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-orange-200" />
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

export default PartnershipActivation;