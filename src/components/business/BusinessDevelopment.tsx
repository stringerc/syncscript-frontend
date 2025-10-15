import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Users, Handshake, TrendingUp, BarChart3, Target, Calendar, FileText, Mail, Phone, Building, Globe, Star, Award, CheckCircle, Clock, AlertTriangle, Plus, Edit, Trash2, Save, Copy, ExternalLink, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-hot-toast';

// Business Development interfaces
interface PricingTier {
  id: string;
  name: string;
  type: 'free' | 'starter' | 'professional' | 'enterprise' | 'custom';
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  limits: Record<string, number>;
  isPopular: boolean;
  createdAt: string;
}

interface EnterpriseDeal {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  dealValue: number;
  currency: string;
  status: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface StrategicPartnership {
  id: string;
  partnerName: string;
  partnerType: 'technology' | 'channel' | 'integration' | 'reseller' | 'strategic';
  status: 'exploring' | 'negotiating' | 'active' | 'paused' | 'terminated';
  dealValue: number;
  currency: string;
  startDate: string;
  endDate?: string;
  contactPerson: string;
  email: string;
  description: string;
  benefits: string[];
  createdAt: string;
}

interface RevenueModel {
  id: string;
  name: string;
  type: 'subscription' | 'usage_based' | 'freemium' | 'enterprise' | 'marketplace';
  description: string;
  targetMarket: string[];
  pricingStrategy: string;
  expectedRevenue: number;
  actualRevenue: number;
  growthRate: number;
  isActive: boolean;
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
}

interface BusinessMetrics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  churnRate: number;
  growthRate: number;
  averageDealSize: number;
  salesCycleLength: number;
  conversionRate: number;
}

const BusinessDevelopment: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [enterpriseDeals, setEnterpriseDeals] = useState<EnterpriseDeal[]>([]);
  const [strategicPartnerships, setStrategicPartnerships] = useState<StrategicPartnership[]>([]);
  const [revenueModels, setRevenueModels] = useState<RevenueModel[]>([]);
  const [salesPipeline, setSalesPipeline] = useState<SalesPipeline[]>([]);
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics | null>(null);

  // SSR-safe data loading
  useEffect(() => {
    const loadBusinessData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock pricing tiers
        const mockPricingTiers: PricingTier[] = [
          {
            id: 'tier-1',
            name: 'Free',
            type: 'free',
            price: 0,
            currency: 'USD',
            billingCycle: 'monthly',
            features: ['Basic task management', 'Up to 5 projects', 'Basic integrations'],
            limits: { projects: 5, users: 1, storage: 100 },
            isPopular: false,
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'tier-2',
            name: 'Starter',
            type: 'starter',
            price: 9,
            currency: 'USD',
            billingCycle: 'monthly',
            features: ['Advanced task management', 'Up to 25 projects', 'Team collaboration', 'Priority support'],
            limits: { projects: 25, users: 5, storage: 1000 },
            isPopular: true,
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'tier-3',
            name: 'Professional',
            type: 'professional',
            price: 29,
            currency: 'USD',
            billingCycle: 'monthly',
            features: ['All Starter features', 'Unlimited projects', 'Advanced analytics', 'API access'],
            limits: { projects: -1, users: 25, storage: 10000 },
            isPopular: false,
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'tier-4',
            name: 'Enterprise',
            type: 'enterprise',
            price: 99,
            currency: 'USD',
            billingCycle: 'monthly',
            features: ['All Professional features', 'Custom integrations', 'Dedicated support', 'SSO'],
            limits: { projects: -1, users: -1, storage: -1 },
            isPopular: false,
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock enterprise deals
        const mockEnterpriseDeals: EnterpriseDeal[] = [
          {
            id: 'deal-1',
            company: 'TechCorp Inc.',
            contactPerson: 'Sarah Johnson',
            email: 'sarah.johnson@techcorp.com',
            phone: '+1-555-0123',
            dealValue: 50000,
            currency: 'USD',
            status: 'negotiation',
            probability: 75,
            expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            notes: 'Large enterprise deal for 500+ users',
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'deal-2',
            company: 'StartupXYZ',
            contactPerson: 'Michael Chen',
            email: 'michael@startupxyz.com',
            phone: '+1-555-0456',
            dealValue: 15000,
            currency: 'USD',
            status: 'proposal',
            probability: 60,
            expectedCloseDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
            notes: 'Mid-size startup looking for team collaboration',
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock strategic partnerships
        const mockPartnerships: StrategicPartnership[] = [
          {
            id: 'partnership-1',
            partnerName: 'Microsoft',
            partnerType: 'integration',
            status: 'active',
            dealValue: 100000,
            currency: 'USD',
            startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            contactPerson: 'David Wilson',
            email: 'david.wilson@microsoft.com',
            description: 'Integration with Microsoft Teams and Office 365',
            benefits: ['Increased market reach', 'Enterprise credibility', 'Technical integration'],
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock revenue models
        const mockRevenueModels: RevenueModel[] = [
          {
            id: 'model-1',
            name: 'SaaS Subscription',
            type: 'subscription',
            description: 'Monthly and annual subscription plans',
            targetMarket: ['SMBs', 'Enterprises', 'Teams'],
            pricingStrategy: 'Tiered pricing with feature differentiation',
            expectedRevenue: 500000,
            actualRevenue: 125000,
            growthRate: 25,
            isActive: true,
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock sales pipeline
        const mockSalesPipeline: SalesPipeline[] = [
          {
            id: 'pipeline-1',
            name: 'Enterprise Sales Pipeline',
            stages: [
              {
                id: 'stage-1',
                name: 'Prospect',
                deals: enterpriseDeals.filter(d => d.status === 'prospect'),
                value: 0,
                probability: 10
              },
              {
                id: 'stage-2',
                name: 'Qualified',
                deals: enterpriseDeals.filter(d => d.status === 'qualified'),
                value: 0,
                probability: 25
              },
              {
                id: 'stage-3',
                name: 'Proposal',
                deals: enterpriseDeals.filter(d => d.status === 'proposal'),
                value: 15000,
                probability: 50
              },
              {
                id: 'stage-4',
                name: 'Negotiation',
                deals: enterpriseDeals.filter(d => d.status === 'negotiation'),
                value: 50000,
                probability: 75
              },
              {
                id: 'stage-5',
                name: 'Closed Won',
                deals: enterpriseDeals.filter(d => d.status === 'closed_won'),
                value: 0,
                probability: 100
              }
            ],
            totalValue: 65000,
            currency: 'USD',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock business metrics
        const mockMetrics: BusinessMetrics = {
          totalRevenue: 125000,
          monthlyRecurringRevenue: 15000,
          annualRecurringRevenue: 180000,
          customerAcquisitionCost: 150,
          customerLifetimeValue: 2500,
          churnRate: 5.2,
          growthRate: 25.5,
          averageDealSize: 32500,
          salesCycleLength: 45,
          conversionRate: 12.5
        };

        setPricingTiers(mockPricingTiers);
        setEnterpriseDeals(mockEnterpriseDeals);
        setStrategicPartnerships(mockPartnerships);
        setRevenueModels(mockRevenueModels);
        setSalesPipeline(mockSalesPipeline);
        setBusinessMetrics(mockMetrics);

        toast.success('Business development data loaded successfully!');
      } catch (error) {
        console.error('Failed to load business data:', error);
        toast.error('Failed to load business development data');
      } finally {
        setIsLoading(false);
      }
    };

    loadBusinessData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'deals', label: 'Deals', icon: Target },
    { id: 'partnerships', label: 'Partnerships', icon: Handshake },
    { id: 'revenue', label: 'Revenue', icon: TrendingUp },
    { id: 'pipeline', label: 'Pipeline', icon: Users }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prospect': return 'text-gray-600 bg-gray-100';
      case 'qualified': return 'text-blue-600 bg-blue-100';
      case 'proposal': return 'text-yellow-600 bg-yellow-100';
      case 'negotiation': return 'text-orange-600 bg-orange-100';
      case 'closed_won': return 'text-green-600 bg-green-100';
      case 'closed_lost': return 'text-red-600 bg-red-100';
      case 'exploring': return 'text-purple-600 bg-purple-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'terminated': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTierColor = (type: string) => {
    switch (type) {
      case 'free': return 'text-gray-600 bg-gray-100';
      case 'starter': return 'text-blue-600 bg-blue-100';
      case 'professional': return 'text-purple-600 bg-purple-100';
      case 'enterprise': return 'text-green-600 bg-green-100';
      case 'custom': return 'text-orange-600 bg-orange-100';
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
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Business Development</h2>
                <p className="text-blue-100">Revenue scaling and partnerships</p>
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
                      : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
                          <p className="text-blue-100">Total Revenue</p>
                          <p className="text-3xl font-bold">${businessMetrics?.totalRevenue.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">MRR</p>
                          <p className="text-3xl font-bold">${businessMetrics?.monthlyRecurringRevenue.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Growth Rate</p>
                          <p className="text-3xl font-bold">{businessMetrics?.growthRate}%</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Avg Deal Size</p>
                          <p className="text-3xl font-bold">${businessMetrics?.averageDealSize.toLocaleString()}</p>
                        </div>
                        <Target className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Revenue by Model</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={revenueModels.map(model => ({
                          name: model.name,
                          expected: model.expectedRevenue,
                          actual: model.actualRevenue
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="expected" fill="#e5e7eb" />
                          <Bar dataKey="actual" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Deal Status Distribution</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
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
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'pricing' && (
                <motion.div
                  key="pricing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pricingTiers.map((tier) => (
                      <div key={tier.id} className={`bg-white border-2 rounded-xl p-6 ${tier.isPopular ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
                        {tier.isPopular && (
                          <div className="bg-blue-500 text-white text-center py-1 px-3 rounded-full text-sm font-medium mb-4">
                            Most Popular
                          </div>
                        )}
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold">{tier.name}</h3>
                          <div className="text-3xl font-bold text-gray-900">
                            ${tier.price}
                            <span className="text-sm text-gray-500">/{tier.billingCycle}</span>
                          </div>
                        </div>
                        <div className="space-y-2 mb-6">
                          {tier.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2 mb-6">
                          <h4 className="font-medium text-gray-900">Limits:</h4>
                          {Object.entries(tier.limits).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-gray-600 capitalize">{key}:</span>
                              <span className="font-medium">{value === -1 ? 'Unlimited' : value}</span>
                            </div>
                          ))}
                        </div>
                        <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          tier.isPopular 
                            ? 'bg-blue-500 text-white hover:bg-blue-600' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                          Choose Plan
                        </button>
                      </div>
                    ))}
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
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Building className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{deal.company}</h3>
                            <p className="text-sm text-gray-600">{deal.contactPerson}</p>
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
                          <span className="text-sm text-gray-500">Email</span>
                          <p className="font-semibold text-sm">{deal.email}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Phone</span>
                          <p className="font-semibold text-sm">{deal.phone}</p>
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

              {activeTab === 'partnerships' && (
                <motion.div
                  key="partnerships"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {strategicPartnerships.map((partnership) => (
                    <div key={partnership.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Handshake className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{partnership.partnerName}</h3>
                            <p className="text-sm text-gray-600">{partnership.partnerType.replace('_', ' ')}</p>
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
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{partnership.description}</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <span className="text-sm text-gray-500">Benefits:</span>
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
                          <span className="text-sm text-gray-500">Start Date</span>
                          <p className="font-semibold text-sm">
                            {new Date(partnership.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Contact Person</span>
                          <p className="font-semibold text-sm">{partnership.contactPerson}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Email</span>
                          <p className="font-semibold text-sm">{partnership.email}</p>
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

              {activeTab === 'revenue' && (
                <motion.div
                  key="revenue"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {revenueModels.map((model) => (
                    <div key={model.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{model.name}</h3>
                            <p className="text-sm text-gray-600">{model.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${model.isActive ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'}`}>
                            {model.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {model.growthRate}% growth
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{model.description}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Expected Revenue</span>
                          <p className="font-semibold">${model.expectedRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Actual Revenue</span>
                          <p className="font-semibold">${model.actualRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Growth Rate</span>
                          <p className="font-semibold">{model.growthRate}%</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <span className="text-sm text-gray-500">Target Market:</span>
                        <div className="flex flex-wrap gap-2">
                          {model.targetMarket.map((market, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {market}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Pricing Strategy:</span>
                        <p className="text-gray-700">{model.pricingStrategy}</p>
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
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <Users className="w-5 h-5 text-indigo-600" />
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
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessDevelopment;