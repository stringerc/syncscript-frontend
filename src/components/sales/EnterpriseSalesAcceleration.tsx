import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Target, Users, BarChart3, Calendar, DollarSign, Building, Phone, Mail, MessageCircle, FileText, Award, Clock, CheckCircle, AlertTriangle, Plus, Edit, Trash2, Save, Copy, ExternalLink, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Star, Zap, Shield, Globe, Activity, MapPin, Share2, Video, Handshake, Briefcase, PieChart, LineChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-hot-toast';

// Enterprise Sales Acceleration interfaces
interface EnterpriseDeal {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  title: string;
  dealValue: number;
  currency: string;
  status: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  salesRep: string;
  source: string;
  industry: string;
  companySize: string;
  notes: string;
  activities: SalesActivity[];
  createdAt: string;
  updatedAt: string;
}

interface SalesActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'demo' | 'proposal' | 'follow_up';
  subject: string;
  description: string;
  date: string;
  duration?: number;
  outcome: 'positive' | 'neutral' | 'negative';
  nextAction?: string;
  createdAt: string;
}

interface SalesPipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  totalValue: number;
  currency: string;
  createdAt: string;
}

interface PipelineStage {
  id: string;
  name: string;
  deals: EnterpriseDeal[];
  value: number;
  probability: number;
  averageDays: number;
}

interface SalesTeamMember {
  id: string;
  name: string;
  role: 'sales_manager' | 'account_executive' | 'business_development' | 'sales_engineer' | 'sales_director';
  email: string;
  phone: string;
  territory: string;
  quota: number;
  currency: string;
  performance: SalesPerformance;
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
}

interface SalesPerformance {
  dealsClosed: number;
  revenue: number;
  quotaAchievement: number;
  averageDealSize: number;
  salesCycleLength: number;
  conversionRate: number;
  activitiesCompleted: number;
}

interface SalesForecast {
  id: string;
  period: string;
  forecastType: 'monthly' | 'quarterly' | 'yearly';
  targetRevenue: number;
  projectedRevenue: number;
  currency: string;
  confidence: number;
  deals: string[];
  assumptions: string[];
  createdAt: string;
}

interface SalesProcess {
  id: string;
  name: string;
  stages: ProcessStage[];
  averageDuration: number;
  successRate: number;
  createdAt: string;
}

interface ProcessStage {
  id: string;
  name: string;
  description: string;
  duration: number;
  requiredActivities: string[];
  successCriteria: string[];
}

interface SalesAnalytics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  averageDealSize: number;
  salesCycleLength: number;
  conversionRate: number;
  winRate: number;
  quotaAchievement: number;
  pipelineVelocity: number;
}

const EnterpriseSalesAcceleration: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [enterpriseDeals, setEnterpriseDeals] = useState<EnterpriseDeal[]>([]);
  const [salesActivities, setSalesActivities] = useState<SalesActivity[]>([]);
  const [salesPipeline, setSalesPipeline] = useState<SalesPipeline[]>([]);
  const [salesTeam, setSalesTeam] = useState<SalesTeamMember[]>([]);
  const [salesForecasts, setSalesForecasts] = useState<SalesForecast[]>([]);
  const [salesProcesses, setSalesProcesses] = useState<SalesProcess[]>([]);
  const [salesAnalytics, setSalesAnalytics] = useState<SalesAnalytics | null>(null);

  // SSR-safe data loading
  useEffect(() => {
    const loadSalesData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock enterprise deals
        const mockDeals: EnterpriseDeal[] = [
          {
            id: 'deal-1',
            company: 'TechCorp Inc.',
            contactPerson: 'Sarah Johnson',
            email: 'sarah.johnson@techcorp.com',
            phone: '+1-555-0123',
            title: 'VP of Operations',
            dealValue: 150000,
            currency: 'USD',
            status: 'negotiation',
            probability: 75,
            expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            salesRep: 'John Smith',
            source: 'LinkedIn',
            industry: 'Technology',
            companySize: '500-1000',
            notes: 'Large enterprise deal for 500+ users. Strong interest in AI features.',
            activities: [
              {
                id: 'activity-1',
                type: 'demo',
                subject: 'Product Demo',
                description: 'Demonstrated AI-powered task management features',
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                duration: 60,
                outcome: 'positive',
                nextAction: 'Send proposal',
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
              }
            ],
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'deal-2',
            company: 'Global Solutions Ltd.',
            contactPerson: 'Michael Chen',
            email: 'michael.chen@globalsolutions.com',
            phone: '+1-555-0456',
            title: 'CTO',
            dealValue: 75000,
            currency: 'USD',
            status: 'proposal',
            probability: 60,
            expectedCloseDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
            salesRep: 'Jane Doe',
            source: 'Referral',
            industry: 'Consulting',
            companySize: '100-500',
            notes: 'Mid-size consulting firm looking for team collaboration tools.',
            activities: [
              {
                id: 'activity-2',
                type: 'meeting',
                subject: 'Discovery Call',
                description: 'Understood their collaboration needs and pain points',
                date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                duration: 45,
                outcome: 'positive',
                nextAction: 'Prepare proposal',
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
              }
            ],
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock sales activities
        const mockActivities: SalesActivity[] = [
          {
            id: 'activity-1',
            type: 'demo',
            subject: 'Product Demo - TechCorp',
            description: 'Demonstrated AI-powered task management features to TechCorp team',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 60,
            outcome: 'positive',
            nextAction: 'Send proposal',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'activity-2',
            type: 'meeting',
            subject: 'Discovery Call - Global Solutions',
            description: 'Understood their collaboration needs and pain points',
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 45,
            outcome: 'positive',
            nextAction: 'Prepare proposal',
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock sales pipeline
        const mockPipeline: SalesPipeline[] = [
          {
            id: 'pipeline-1',
            name: 'Enterprise Sales Pipeline',
            stages: [
              {
                id: 'stage-1',
                name: 'Prospect',
                deals: enterpriseDeals.filter(d => d.status === 'prospect'),
                value: 0,
                probability: 10,
                averageDays: 7
              },
              {
                id: 'stage-2',
                name: 'Qualified',
                deals: enterpriseDeals.filter(d => d.status === 'qualified'),
                value: 0,
                probability: 25,
                averageDays: 14
              },
              {
                id: 'stage-3',
                name: 'Proposal',
                deals: enterpriseDeals.filter(d => d.status === 'proposal'),
                value: 75000,
                probability: 50,
                averageDays: 21
              },
              {
                id: 'stage-4',
                name: 'Negotiation',
                deals: enterpriseDeals.filter(d => d.status === 'negotiation'),
                value: 150000,
                probability: 75,
                averageDays: 30
              },
              {
                id: 'stage-5',
                name: 'Closed Won',
                deals: enterpriseDeals.filter(d => d.status === 'closed_won'),
                value: 0,
                probability: 100,
                averageDays: 0
              }
            ],
            totalValue: 225000,
            currency: 'USD',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock sales team
        const mockTeam: SalesTeamMember[] = [
          {
            id: 'team-1',
            name: 'John Smith',
            role: 'account_executive',
            email: 'john.smith@syncscript.com',
            phone: '+1-555-0123',
            territory: 'West Coast',
            quota: 500000,
            currency: 'USD',
            performance: {
              dealsClosed: 12,
              revenue: 450000,
              quotaAchievement: 90,
              averageDealSize: 37500,
              salesCycleLength: 45,
              conversionRate: 15,
              activitiesCompleted: 85
            },
            status: 'active',
            joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'team-2',
            name: 'Jane Doe',
            role: 'sales_manager',
            email: 'jane.doe@syncscript.com',
            phone: '+1-555-0456',
            territory: 'East Coast',
            quota: 750000,
            currency: 'USD',
            performance: {
              dealsClosed: 18,
              revenue: 680000,
              quotaAchievement: 91,
              averageDealSize: 37778,
              salesCycleLength: 42,
              conversionRate: 18,
              activitiesCompleted: 120
            },
            status: 'active',
            joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock sales forecasts
        const mockForecasts: SalesForecast[] = [
          {
            id: 'forecast-1',
            period: 'Q1 2024',
            forecastType: 'quarterly',
            targetRevenue: 1000000,
            projectedRevenue: 950000,
            currency: 'USD',
            confidence: 85,
            deals: ['deal-1', 'deal-2'],
            assumptions: ['Market conditions remain stable', 'Team performance consistent'],
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock sales processes
        const mockProcesses: SalesProcess[] = [
          {
            id: 'process-1',
            name: 'Enterprise Sales Process',
            stages: [
              {
                id: 'stage-1',
                name: 'Lead Qualification',
                description: 'Qualify leads based on budget, authority, need, and timeline',
                duration: 7,
                requiredActivities: ['Initial call', 'Needs assessment'],
                successCriteria: ['BANT qualification', 'Decision maker identified']
              },
              {
                id: 'stage-2',
                name: 'Discovery',
                description: 'Deep dive into customer needs and requirements',
                duration: 14,
                requiredActivities: ['Discovery call', 'Stakeholder mapping'],
                successCriteria: ['Requirements documented', 'Pain points identified']
              },
              {
                id: 'stage-3',
                name: 'Proposal',
                description: 'Create and present customized proposal',
                duration: 21,
                requiredActivities: ['Proposal creation', 'Presentation'],
                successCriteria: ['Proposal accepted', 'Next steps defined']
              },
              {
                id: 'stage-4',
                name: 'Negotiation',
                description: 'Negotiate terms and close the deal',
                duration: 30,
                requiredActivities: ['Contract negotiation', 'Legal review'],
                successCriteria: ['Contract signed', 'Deal closed']
              }
            ],
            averageDuration: 72,
            successRate: 25,
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock sales analytics
        const mockAnalytics: SalesAnalytics = {
          totalRevenue: 1130000,
          monthlyRecurringRevenue: 150000,
          averageDealSize: 37667,
          salesCycleLength: 44,
          conversionRate: 16.5,
          winRate: 25,
          quotaAchievement: 90.5,
          pipelineVelocity: 8500
        };

        setEnterpriseDeals(mockDeals);
        setSalesActivities(mockActivities);
        setSalesPipeline(mockPipeline);
        setSalesTeam(mockTeam);
        setSalesForecasts(mockForecasts);
        setSalesProcesses(mockProcesses);
        setSalesAnalytics(mockAnalytics);

        toast.success('Enterprise sales acceleration data loaded successfully!');
      } catch (error) {
        console.error('Failed to load sales data:', error);
        toast.error('Failed to load enterprise sales data');
      } finally {
        setIsLoading(false);
      }
    };

    loadSalesData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'deals', label: 'Deals', icon: Target },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'pipeline', label: 'Pipeline', icon: Users },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'forecast', label: 'Forecast', icon: TrendingUp },
    { id: 'process', label: 'Process', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: PieChart }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prospect': return 'text-gray-600 bg-gray-100';
      case 'qualified': return 'text-blue-600 bg-blue-100';
      case 'proposal': return 'text-yellow-600 bg-yellow-100';
      case 'negotiation': return 'text-orange-600 bg-orange-100';
      case 'closed_won': return 'text-green-600 bg-green-100';
      case 'closed_lost': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'on_leave': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      case 'negative': return 'text-red-600 bg-red-100';
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
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Enterprise Sales Acceleration</h2>
                <p className="text-indigo-100">Enterprise customer acquisition</p>
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
                      : 'text-indigo-100 hover:bg-white hover:bg-opacity-10'
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
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
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-indigo-100">Total Revenue</p>
                          <p className="text-3xl font-bold">${salesAnalytics?.totalRevenue.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-indigo-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Win Rate</p>
                          <p className="text-3xl font-bold">{salesAnalytics?.winRate}%</p>
                        </div>
                        <Target className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Avg Deal Size</p>
                          <p className="text-3xl font-bold">${salesAnalytics?.averageDealSize.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Pipeline Velocity</p>
                          <p className="text-3xl font-bold">${salesAnalytics?.pipelineVelocity.toLocaleString()}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Deal Status Distribution</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: 'Prospect', value: enterpriseDeals.filter(d => d.status === 'prospect').length },
                              { name: 'Qualified', value: enterpriseDeals.filter(d => d.status === 'qualified').length },
                              { name: 'Proposal', value: enterpriseDeals.filter(d => d.status === 'proposal').length },
                              { name: 'Negotiation', value: enterpriseDeals.filter(d => d.status === 'negotiation').length },
                              { name: 'Closed Won', value: enterpriseDeals.filter(d => d.status === 'closed_won').length }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#6b7280" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#f97316" />
                            <Cell fill="#10b981" />
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={salesTeam.map(member => ({
                          name: member.name.split(' ')[0],
                          quota: member.performance.quotaAchievement,
                          revenue: member.performance.revenue / 1000
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="quota" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'deals' && (
                <motion.div
                  key="deals"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {enterpriseDeals.map((deal) => (
                    <div key={deal.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <Building className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{deal.company}</h3>
                            <p className="text-sm text-gray-600">{deal.contactPerson} - {deal.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(deal.status)}`}>
                            {deal.status.replace('_', ' ')}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {deal.probability}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Deal Value</span>
                          <p className="font-semibold">${deal.dealValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Expected Close</span>
                          <p className="font-semibold text-sm">
                            {new Date(deal.expectedCloseDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Sales Rep</span>
                          <p className="font-semibold text-sm">{deal.salesRep}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Industry</span>
                          <p className="font-semibold text-sm">{deal.industry}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Notes:</span>
                        <p className="text-gray-700">{deal.notes}</p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Update
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'activities' && (
                <motion.div
                  key="activities"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {salesActivities.map((activity) => (
                    <div key={activity.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Activity className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{activity.subject}</h3>
                            <p className="text-sm text-gray-600">{activity.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getOutcomeColor(activity.outcome)}`}>
                            {activity.outcome}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {activity.duration ? `${activity.duration}m` : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{activity.description}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Date</span>
                          <p className="font-semibold text-sm">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Next Action</span>
                          <p className="font-semibold text-sm">{activity.nextAction || 'None'}</p>
                        </div>
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
                  {salesPipeline.map((pipeline) => (
                    <div key={pipeline.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Users className="w-5 h-5 text-purple-600" />
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
                              <p className="text-sm text-gray-600">{stage.deals.length} deals</p>
                            </div>
                            <div className="text-center mb-3">
                              <p className="text-lg font-bold text-gray-900">${stage.value.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">{stage.probability}% probability</p>
                            </div>
                            <div className="space-y-2">
                              {stage.deals.map((deal) => (
                                <div key={deal.id} className="bg-white rounded p-2 text-sm">
                                  <p className="font-medium">{deal.company}</p>
                                  <p className="text-gray-600">${deal.dealValue.toLocaleString()}</p>
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
                  {salesTeam.map((member) => (
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
                            {member.performance.quotaAchievement}% quota
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Territory</span>
                          <p className="font-semibold">{member.territory}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Revenue</span>
                          <p className="font-semibold">${member.performance.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Deals Closed</span>
                          <p className="font-semibold">{member.performance.dealsClosed}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Conversion Rate</span>
                          <p className="font-semibold">{member.performance.conversionRate}%</p>
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

              {activeTab === 'forecast' && (
                <motion.div
                  key="forecast"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {salesForecasts.map((forecast) => (
                    <div key={forecast.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{forecast.period}</h3>
                            <p className="text-sm text-gray-600">{forecast.forecastType} forecast</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {forecast.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Target Revenue</span>
                          <p className="font-semibold">${forecast.targetRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Projected Revenue</span>
                          <p className="font-semibold">${forecast.projectedRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Variance</span>
                          <p className="font-semibold">
                            {((forecast.projectedRevenue - forecast.targetRevenue) / forecast.targetRevenue * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Assumptions:</h4>
                        <div className="flex flex-wrap gap-2">
                          {forecast.assumptions.map((assumption, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {assumption}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'process' && (
                <motion.div
                  key="process"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {salesProcesses.map((process) => (
                    <div key={process.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <FileText className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{process.name}</h3>
                            <p className="text-sm text-gray-600">{process.averageDuration} days average</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {process.successRate}% success rate
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {process.stages.map((stage, index) => (
                          <div key={stage.id} className="border-l-4 border-purple-500 pl-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{stage.name}</h4>
                              <span className="text-sm text-gray-600">{stage.duration} days</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                            <div className="space-y-1">
                              <div className="text-xs text-gray-500">Required Activities:</div>
                              <div className="flex flex-wrap gap-1">
                                {stage.requiredActivities.map((activity, actIndex) => (
                                  <span key={actIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                    {activity}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'analytics' && salesAnalytics && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-indigo-100">MRR</p>
                          <p className="text-3xl font-bold">${salesAnalytics.monthlyRecurringRevenue.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-indigo-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Sales Cycle</p>
                          <p className="text-3xl font-bold">{salesAnalytics.salesCycleLength}d</p>
                        </div>
                        <Clock className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Conversion Rate</p>
                          <p className="text-3xl font-bold">{salesAnalytics.conversionRate}%</p>
                        </div>
                        <Target className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Quota Achievement</p>
                          <p className="text-3xl font-bold">{salesAnalytics.quotaAchievement}%</p>
                        </div>
                        <Award className="w-8 h-8 text-purple-200" />
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

export default EnterpriseSalesAcceleration;