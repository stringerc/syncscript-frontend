import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Heart, TrendingUp, Target, Calendar, DollarSign, Building, Phone, Mail, MessageCircle, FileText, Award, Clock, CheckCircle, AlertTriangle, Plus, Edit, Trash2, Save, Copy, ExternalLink, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Star, Zap, Shield, Activity, MapPin, Share2, Video, Briefcase, PieChart, LineChart, Brain, Cpu, Database, Server, Cloud, Wifi, Signal, Battery, WifiOff, Eye, EyeOff, Lock, Unlock, Key, Settings, Bell, Filter, Search, Download, Upload, RefreshCw, Monitor, Smartphone, Tablet, Laptop, Globe, Map, Flag, Building2, Home, Work, School, Coffee, Gamepad2, Music, Book, Code, Paintbrush, Calculator, Lightbulb, Target as TargetIcon, TrendingDown, Activity as ActivityIcon, Zap as ZapIcon, Shield as ShieldIcon, Star as StarIcon, Heart as HeartIcon, ThumbsUp, ThumbsDown, Smile, Frown, Meh, UserCheck, UserX, UserPlus, UserMinus, UserCog, UserSettings, UserStar, UserHeart, UserShield, UserZap, UserTarget, UserTrendingUp, UserTrendingDown, UserActivity, UserMonitor, UserSmartphone, UserTablet, UserLaptop, UserGlobe, UserMap, UserFlag, UserBuilding, UserHome, UserWork, UserSchool, UserCoffee, UserGamepad, UserMusic, UserBook, UserCode, UserPaintbrush, UserCalculator, UserLightbulb, UserBell, UserFilter, UserSearch, UserDownload, UserUpload, UserRefresh, UserSettings as UserSettingsIcon, UserCog as UserCogIcon, UserStar as UserStarIcon, UserHeart as UserHeartIcon, UserShield as UserShieldIcon, UserZap as UserZapIcon, UserTarget as UserTargetIcon, UserTrendingUp as UserTrendingUpIcon, UserTrendingDown as UserTrendingDownIcon, UserActivity as UserActivityIcon, UserMonitor as UserMonitorIcon, UserSmartphone as UserSmartphoneIcon, UserTablet as UserTabletIcon, UserLaptop as UserLaptopIcon, UserGlobe as UserGlobeIcon, UserMap as UserMapIcon, UserFlag as UserFlagIcon, UserBuilding as UserBuildingIcon, UserHome as UserHomeIcon, UserWork as UserWorkIcon, UserSchool as UserSchoolIcon, UserCoffee as UserCoffeeIcon, UserGamepad as UserGamepadIcon, UserMusic as UserMusicIcon, UserBook as UserBookIcon, UserCode as UserCodeIcon, UserPaintbrush as UserPaintbrushIcon, UserCalculator as UserCalculatorIcon, UserLightbulb as UserLightbulbIcon, UserBell as UserBellIcon, UserFilter as UserFilterIcon, UserSearch as UserSearchIcon, UserDownload as UserDownloadIcon, UserUpload as UserUploadIcon, UserRefresh as UserRefreshIcon } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, ReferenceLine, Legend } from 'recharts';
import { toast } from 'react-hot-toast';

// Customer Success & Retention Program interfaces
interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  companySize: string;
  joinDate: string;
  subscriptionTier: 'free' | 'premium' | 'enterprise';
  status: 'active' | 'at_risk' | 'churned' | 'onboarding';
  healthScore: number;
  lastActivity: string;
  totalSpend: number;
  lifetimeValue: number;
  churnRisk: 'low' | 'medium' | 'high' | 'critical';
  successManager: string;
  createdAt: string;
}

interface CustomerHealth {
  id: string;
  customerId: string;
  overallScore: number;
  engagementScore: number;
  usageScore: number;
  supportScore: number;
  paymentScore: number;
  satisfactionScore: number;
  factors: HealthFactor[];
  trends: HealthTrend[];
  recommendations: string[];
  lastUpdated: string;
  createdAt: string;
}

interface HealthFactor {
  name: string;
  weight: number;
  score: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

interface HealthTrend {
  date: string;
  score: number;
  factors: string[];
}

interface RetentionCampaign {
  id: string;
  name: string;
  description: string;
  type: 'onboarding' | 'engagement' | 'win_back' | 'expansion' | 'renewal';
  targetSegment: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  channels: CampaignChannel[];
  metrics: CampaignMetrics;
  createdAt: string;
}

interface CampaignChannel {
  type: 'email' | 'sms' | 'push' | 'in_app' | 'phone' | 'webinar';
  template: string;
  schedule: string;
  status: 'active' | 'paused' | 'completed';
}

interface CampaignMetrics {
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  conversionRate: number;
  revenue: number;
}

interface CustomerSuccessWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  conditions: WorkflowCondition[];
  status: 'active' | 'paused' | 'draft';
  createdAt: string;
}

interface WorkflowTrigger {
  type: 'event' | 'schedule' | 'condition' | 'manual';
  event?: string;
  schedule?: string;
  condition?: string;
}

interface WorkflowStep {
  id: string;
  type: 'email' | 'task' | 'call' | 'meeting' | 'survey' | 'notification';
  title: string;
  description: string;
  assignee: string;
  dueDate?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
}

interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
  value: string | number;
}

interface SuccessPlaybook {
  id: string;
  name: string;
  description: string;
  category: 'onboarding' | 'adoption' | 'expansion' | 'renewal' | 'churn_prevention';
  steps: PlaybookStep[];
  metrics: PlaybookMetrics;
  isActive: boolean;
  createdAt: string;
}

interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  order: number;
  type: 'action' | 'checklist' | 'template' | 'resource';
  content: string;
  assignee: string;
  estimatedTime: number;
}

interface PlaybookMetrics {
  usageCount: number;
  successRate: number;
  averageTime: number;
  satisfaction: number;
}

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: SegmentCriteria;
  customerCount: number;
  averageHealthScore: number;
  churnRate: number;
  lifetimeValue: number;
  characteristics: string[];
  createdAt: string;
}

interface SegmentCriteria {
  subscriptionTier?: string[];
  industry?: string[];
  companySize?: string[];
  healthScore?: { min: number; max: number };
  churnRisk?: string[];
  tenure?: { min: number; max: number };
}

interface ChurnPrediction {
  id: string;
  customerId: string;
  churnProbability: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: ChurnFactor[];
  recommendations: string[];
  predictedChurnDate?: string;
  confidence: number;
  lastUpdated: string;
}

interface ChurnFactor {
  name: string;
  weight: number;
  impact: 'positive' | 'negative';
  description: string;
}

interface OnboardingOptimization {
  id: string;
  stage: string;
  name: string;
  description: string;
  completionRate: number;
  averageTime: number;
  dropoffPoints: DropoffPoint[];
  improvements: Improvement[];
  metrics: OnboardingMetrics;
  createdAt: string;
}

interface DropoffPoint {
  step: string;
  dropoffRate: number;
  reasons: string[];
}

interface Improvement {
  name: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  status: 'planned' | 'in_progress' | 'completed';
}

interface OnboardingMetrics {
  totalStarted: number;
  totalCompleted: number;
  completionRate: number;
  averageTimeToComplete: number;
  satisfactionScore: number;
}

interface CustomerFeedback {
  id: string;
  customerId: string;
  type: 'survey' | 'interview' | 'support_ticket' | 'review' | 'nps';
  rating: number;
  comments: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo: string;
  createdAt: string;
}

interface SuccessMetrics {
  id: string;
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  category: 'retention' | 'expansion' | 'satisfaction' | 'adoption';
  description: string;
  lastUpdated: string;
}

interface RetentionAnalytics {
  id: string;
  period: string;
  cohortRetention: CohortRetention[];
  churnAnalysis: ChurnAnalysis;
  retentionDrivers: RetentionDriver[];
  insights: string[];
  createdAt: string;
}

interface CohortRetention {
  cohort: string;
  month1: number;
  month3: number;
  month6: number;
  month12: number;
}

interface ChurnAnalysis {
  totalChurned: number;
  churnRate: number;
  reasons: ChurnReason[];
  trends: ChurnTrend[];
}

interface ChurnReason {
  reason: string;
  count: number;
  percentage: number;
}

interface ChurnTrend {
  date: string;
  churnRate: number;
  churnedCustomers: number;
}

interface RetentionDriver {
  factor: string;
  impact: number;
  correlation: number;
  description: string;
}

const CustomerSuccessRetentionProgram: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerHealth, setCustomerHealth] = useState<CustomerHealth[]>([]);
  const [retentionCampaigns, setRetentionCampaigns] = useState<RetentionCampaign[]>([]);
  const [successWorkflows, setSuccessWorkflows] = useState<CustomerSuccessWorkflow[]>([]);
  const [successPlaybooks, setSuccessPlaybooks] = useState<SuccessPlaybook[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([]);
  const [churnPredictions, setChurnPredictions] = useState<ChurnPrediction[]>([]);
  const [onboardingOptimization, setOnboardingOptimization] = useState<OnboardingOptimization[]>([]);
  const [customerFeedback, setCustomerFeedback] = useState<CustomerFeedback[]>([]);
  const [successMetrics, setSuccessMetrics] = useState<SuccessMetrics[]>([]);
  const [retentionAnalytics, setRetentionAnalytics] = useState<RetentionAnalytics[]>([]);

  // SSR-safe data loading
  useEffect(() => {
    const loadCustomerSuccessData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock customers
        const mockCustomers: Customer[] = [
          {
            id: 'customer-1',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@techcorp.com',
            company: 'TechCorp',
            role: 'VP of Engineering',
            industry: 'Technology',
            companySize: '500-1000',
            joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
            subscriptionTier: 'enterprise',
            status: 'active',
            healthScore: 85,
            lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            totalSpend: 25000,
            lifetimeValue: 45000,
            churnRisk: 'low',
            successManager: 'John Smith',
            createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'customer-2',
            name: 'Mike Chen',
            email: 'mike.chen@startup.io',
            company: 'StartupIO',
            role: 'CTO',
            industry: 'SaaS',
            companySize: '50-100',
            joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            subscriptionTier: 'premium',
            status: 'at_risk',
            healthScore: 45,
            lastActivity: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            totalSpend: 5000,
            lifetimeValue: 12000,
            churnRisk: 'high',
            successManager: 'Jane Doe',
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock customer health
        const mockCustomerHealth: CustomerHealth[] = [
          {
            id: 'health-1',
            customerId: 'customer-1',
            overallScore: 85,
            engagementScore: 90,
            usageScore: 80,
            supportScore: 85,
            paymentScore: 95,
            satisfactionScore: 88,
            factors: [
              {
                name: 'Feature Usage',
                weight: 0.3,
                score: 80,
                impact: 'positive',
                description: 'High feature adoption rate'
              },
              {
                name: 'Support Tickets',
                weight: 0.2,
                score: 85,
                impact: 'positive',
                description: 'Low support ticket volume'
              }
            ],
            trends: [
              {
                date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                score: 82,
                factors: ['Feature Usage', 'Support Tickets']
              },
              {
                date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                score: 84,
                factors: ['Feature Usage', 'Support Tickets']
              }
            ],
            recommendations: [
              'Continue current engagement strategy',
              'Offer advanced training sessions',
              'Schedule quarterly business review'
            ],
            lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock retention campaigns
        const mockRetentionCampaigns: RetentionCampaign[] = [
          {
            id: 'campaign-1',
            name: 'Q4 Renewal Campaign',
            description: 'Targeted campaign for Q4 renewals with special offers',
            type: 'renewal',
            targetSegment: 'enterprise_customers',
            status: 'active',
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            channels: [
              {
                type: 'email',
                template: 'renewal_offer',
                schedule: 'weekly',
                status: 'active'
              }
            ],
            metrics: {
              totalSent: 150,
              delivered: 148,
              opened: 120,
              clicked: 85,
              converted: 45,
              conversionRate: 30.4,
              revenue: 125000
            },
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock success metrics
        const mockSuccessMetrics: SuccessMetrics[] = [
          {
            id: 'metric-1',
            name: 'Customer Retention Rate',
            value: 87.5,
            target: 90,
            trend: 'up',
            changePercent: 2.3,
            category: 'retention',
            description: 'Percentage of customers retained over 12 months',
            lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'metric-2',
            name: 'Net Revenue Retention',
            value: 112.3,
            target: 110,
            trend: 'up',
            changePercent: 5.1,
            category: 'expansion',
            description: 'Net revenue retention including expansions and churn',
            lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'metric-3',
            name: 'Customer Satisfaction Score',
            value: 8.7,
            target: 9.0,
            trend: 'up',
            changePercent: 1.2,
            category: 'satisfaction',
            description: 'Average customer satisfaction rating',
            lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'metric-4',
            name: 'Feature Adoption Rate',
            value: 68.5,
            target: 75,
            trend: 'up',
            changePercent: 3.8,
            category: 'adoption',
            description: 'Percentage of customers using core features',
            lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        setCustomers(mockCustomers);
        setCustomerHealth(mockCustomerHealth);
        setRetentionCampaigns(mockRetentionCampaigns);
        setSuccessMetrics(mockSuccessMetrics);

        toast.success('Customer success data loaded successfully!');
      } catch (error) {
        console.error('Failed to load customer success data:', error);
        toast.error('Failed to load customer success data');
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomerSuccessData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'customers', label: 'Customers', icon: UserCheck },
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'workflows', label: 'Workflows', icon: Activity },
    { id: 'playbooks', label: 'Playbooks', icon: Book },
    { id: 'segments', label: 'Segments', icon: PieChart },
    { id: 'churn', label: 'Churn', icon: UserX },
    { id: 'onboarding', label: 'Onboarding', icon: UserPlus },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'metrics', label: 'Metrics', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'at_risk': return 'text-yellow-600 bg-yellow-100';
      case 'churned': return 'text-red-600 bg-red-100';
      case 'onboarding': return 'text-blue-600 bg-blue-100';
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
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
                <h2 className="text-2xl font-bold">Customer Success & Retention</h2>
                <p className="text-green-100">Customer health dashboard and retention strategies</p>
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
                          <p className="text-green-100">Total Customers</p>
                          <p className="text-3xl font-bold">{customers.length}</p>
                        </div>
                        <Users className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Active Customers</p>
                          <p className="text-3xl font-bold">{customers.filter(c => c.status === 'active').length}</p>
                        </div>
                        <UserCheck className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">At Risk</p>
                          <p className="text-3xl font-bold">{customers.filter(c => c.status === 'at_risk').length}</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Campaigns</p>
                          <p className="text-3xl font-bold">{retentionCampaigns.length}</p>
                        </div>
                        <Target className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Success Metrics Overview</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsLineChart data={successMetrics.map(metric => ({
                          name: metric.name.split(' ')[0],
                          value: metric.value,
                          target: metric.target
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
                          <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={2} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Customer Status Distribution</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: 'Active', value: customers.filter(c => c.status === 'active').length },
                              { name: 'At Risk', value: customers.filter(c => c.status === 'at_risk').length },
                              { name: 'Churned', value: customers.filter(c => c.status === 'churned').length },
                              { name: 'Onboarding', value: customers.filter(c => c.status === 'onboarding').length }
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
                            <Cell fill="#f59e0b" />
                            <Cell fill="#ef4444" />
                            <Cell fill="#3b82f6" />
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'customers' && (
                <motion.div
                  key="customers"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {customers.map((customer) => (
                    <div key={customer.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Users className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{customer.name}</h3>
                            <p className="text-sm text-gray-600">{customer.company} • {customer.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(customer.status)}`}>
                            {customer.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(customer.churnRisk)}`}>
                            {customer.churnRisk} risk
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getHealthScoreColor(customer.healthScore)}`}>
                            {customer.healthScore} health
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Subscription</span>
                          <p className="font-semibold capitalize">{customer.subscriptionTier}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total Spend</span>
                          <p className="font-semibold">${customer.totalSpend.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Lifetime Value</span>
                          <p className="font-semibold">${customer.lifetimeValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Success Manager</span>
                          <p className="font-semibold">{customer.successManager}</p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'health' && (
                <motion.div
                  key="health"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {customerHealth.map((health) => {
                    const customer = customers.find(c => c.id === health.customerId);
                    return (
                      <div key={health.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Heart className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{customer?.name}</h3>
                              <p className="text-sm text-gray-600">Health Score Analysis</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-lg font-bold ${getHealthScoreColor(health.overallScore)}`}>
                              {health.overallScore}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Engagement</span>
                            <p className="font-semibold">{health.engagementScore}</p>
                          </div>
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Usage</span>
                            <p className="font-semibold">{health.usageScore}</p>
                          </div>
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Support</span>
                            <p className="font-semibold">{health.supportScore}</p>
                          </div>
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Payment</span>
                            <p className="font-semibold">{health.paymentScore}</p>
                          </div>
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Satisfaction</span>
                            <p className="font-semibold">{health.satisfactionScore}</p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <h4 className="font-medium">Key Factors:</h4>
                          <div className="flex flex-wrap gap-2">
                            {health.factors.map((factor, index) => (
                              <span key={index} className={`px-2 py-1 rounded text-sm ${
                                factor.impact === 'positive' ? 'bg-green-100 text-green-800' : 
                                factor.impact === 'negative' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {factor.name}: {factor.score}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <h4 className="font-medium">Recommendations:</h4>
                          <div className="flex flex-wrap gap-2">
                            {health.recommendations.map((recommendation, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                {recommendation}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            View Trends
                          </button>
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            Take Action
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === 'metrics' && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {successMetrics.map((metric) => (
                    <div key={metric.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{metric.name}</h3>
                            <p className="text-sm text-gray-600">{metric.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTrendColor(metric.trend)}`}>
                            {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} {metric.changePercent}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Current Value</span>
                          <p className="font-semibold text-2xl">{metric.value}{metric.name.includes('Rate') || metric.name.includes('Score') ? '%' : ''}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Target</span>
                          <p className="font-semibold text-2xl">{metric.target}{metric.name.includes('Rate') || metric.name.includes('Score') ? '%' : ''}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Change</span>
                          <p className={`font-semibold text-2xl ${getTrendColor(metric.trend)}`}>
                            {metric.changePercent > 0 ? '+' : ''}{metric.changePercent}%
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{metric.description}</p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Set Alert
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

export default CustomerSuccessRetentionProgram;