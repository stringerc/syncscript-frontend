import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Target, Users, BarChart3, Calendar, DollarSign, Building, Phone, Mail, MessageCircle, FileText, Award, Clock, CheckCircle, AlertTriangle, Plus, Edit, Trash2, Save, Copy, ExternalLink, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Star, Zap, Shield, Activity, MapPin, Share2, Video, Briefcase, PieChart, LineChart, CreditCard, ShoppingCart, Percent, Calculator, Filter, Search, Download, Upload, RefreshCw, Settings, Bell, Eye, EyeOff, Lock, Unlock, Key, Database, Server, Cloud, Wifi, Signal, Battery, WifiOff } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { toast } from 'react-hot-toast';

// Revenue Scaling interfaces
interface RevenueMetrics {
  id: string;
  period: string;
  totalRevenue: number;
  recurringRevenue: number;
  oneTimeRevenue: number;
  currency: string;
  growthRate: number;
  churnRate: number;
  ltv: number;
  cac: number;
  arpu: number;
  arr: number;
  mrr: number;
  createdAt: string;
}

interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'lifetime';
  features: string[];
  limits: PricingLimits;
  performance: TierPerformance;
  status: 'active' | 'inactive' | 'beta' | 'deprecated';
  createdAt: string;
}

interface PricingLimits {
  users: number;
  projects: number;
  storage: number;
  apiCalls: number;
  integrations: number;
  supportLevel: 'basic' | 'standard' | 'premium' | 'enterprise';
}

interface TierPerformance {
  subscribers: number;
  revenue: number;
  conversionRate: number;
  churnRate: number;
  satisfactionScore: number;
  upgradeRate: number;
  downgradeRate: number;
}

interface ConversionFunnel {
  id: string;
  name: string;
  stages: FunnelStage[];
  totalVisitors: number;
  conversionRate: number;
  createdAt: string;
}

interface FunnelStage {
  id: string;
  name: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  dropOffRate: number;
  averageTime: number;
}

interface CustomerSegment {
  id: string;
  name: string;
  criteria: SegmentCriteria;
  customers: number;
  revenue: number;
  arpu: number;
  churnRate: number;
  growthRate: number;
  characteristics: string[];
  createdAt: string;
}

interface SegmentCriteria {
  companySize: string[];
  industry: string[];
  geography: string[];
  usageLevel: string[];
  subscriptionTier: string[];
  tenure: string[];
}

interface RevenueGoal {
  id: string;
  name: string;
  targetAmount: number;
  currency: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  currentProgress: number;
  status: 'on_track' | 'behind' | 'ahead' | 'completed' | 'failed';
  milestones: RevenueMilestone[];
  createdAt: string;
}

interface RevenueMilestone {
  id: string;
  name: string;
  targetAmount: number;
  achievedAmount: number;
  targetDate: string;
  achievedDate?: string;
  status: 'pending' | 'achieved' | 'missed';
}

interface RevenueOptimization {
  id: string;
  name: string;
  type: 'pricing' | 'conversion' | 'retention' | 'upsell' | 'cross_sell';
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  expectedRevenue: number;
  actualRevenue?: number;
  startDate: string;
  endDate?: string;
  metrics: OptimizationMetrics;
  createdAt: string;
}

interface OptimizationMetrics {
  beforeValue: number;
  afterValue: number;
  improvement: number;
  confidence: number;
  sampleSize: number;
}

interface DynamicPricingStrategy {
  id: string;
  name: string;
  strategy: 'demand_based' | 'competitor_based' | 'value_based' | 'time_based' | 'segment_based';
  rules: PricingRule[];
  status: 'active' | 'inactive' | 'testing';
  performance: PricingPerformance;
  createdAt: string;
}

interface PricingRule {
  id: string;
  condition: string;
  action: string;
  value: number;
  priority: number;
}

interface PricingPerformance {
  revenueImpact: number;
  conversionImpact: number;
  customerSatisfaction: number;
  implementationCost: number;
  roi: number;
}

interface OnboardingFlow {
  id: string;
  name: string;
  steps: OnboardingStep[];
  completionRate: number;
  averageTime: number;
  dropOffPoints: DropOffPoint[];
  optimization: OnboardingOptimization;
  createdAt: string;
}

interface OnboardingStep {
  id: string;
  name: string;
  description: string;
  order: number;
  completionRate: number;
  averageTime: number;
  required: boolean;
}

interface DropOffPoint {
  stepId: string;
  stepName: string;
  dropOffRate: number;
  reasons: string[];
}

interface OnboardingOptimization {
  suggestions: string[];
  priority: 'low' | 'medium' | 'high';
  expectedImpact: number;
}

interface CustomerSuccessProgram {
  id: string;
  name: string;
  segments: string[];
  touchpoints: SuccessTouchpoint[];
  metrics: SuccessMetrics;
  status: 'active' | 'inactive' | 'pilot';
  createdAt: string;
}

interface SuccessTouchpoint {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'training' | 'check_in';
  trigger: string;
  frequency: string;
  content: string;
}

interface SuccessMetrics {
  engagementRate: number;
  satisfactionScore: number;
  retentionRate: number;
  upsellRate: number;
  referralRate: number;
}

interface UpsellCampaign {
  id: string;
  name: string;
  targetSegment: string;
  offer: UpsellOffer;
  channels: string[];
  performance: CampaignPerformance;
  status: 'draft' | 'active' | 'paused' | 'completed';
  createdAt: string;
}

interface UpsellOffer {
  product: string;
  discount: number;
  duration: string;
  conditions: string[];
}

interface CampaignPerformance {
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  revenue: number;
  roi: number;
}

const RevenueScaling: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics[]>([]);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [conversionFunnels, setConversionFunnels] = useState<ConversionFunnel[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([]);
  const [revenueGoals, setRevenueGoals] = useState<RevenueGoal[]>([]);
  const [revenueOptimizations, setRevenueOptimizations] = useState<RevenueOptimization[]>([]);
  const [dynamicPricingStrategies, setDynamicPricingStrategies] = useState<DynamicPricingStrategy[]>([]);
  const [onboardingFlows, setOnboardingFlows] = useState<OnboardingFlow[]>([]);
  const [customerSuccessPrograms, setCustomerSuccessPrograms] = useState<CustomerSuccessProgram[]>([]);
  const [upsellCampaigns, setUpsellCampaigns] = useState<UpsellCampaign[]>([]);

  // SSR-safe data loading
  useEffect(() => {
    const loadRevenueData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock revenue metrics
        const mockRevenueMetrics: RevenueMetrics[] = [
          {
            id: 'metrics-1',
            period: 'Q1 2024',
            totalRevenue: 2500000,
            recurringRevenue: 2000000,
            oneTimeRevenue: 500000,
            currency: 'USD',
            growthRate: 25.5,
            churnRate: 3.2,
            ltv: 2500,
            cac: 450,
            arpu: 125,
            arr: 8000000,
            mrr: 666667,
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'metrics-2',
            period: 'Q2 2024',
            totalRevenue: 3200000,
            recurringRevenue: 2600000,
            oneTimeRevenue: 600000,
            currency: 'USD',
            growthRate: 28.0,
            churnRate: 2.8,
            ltv: 2800,
            cac: 420,
            arpu: 140,
            arr: 10400000,
            mrr: 866667,
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock pricing tiers
        const mockPricingTiers: PricingTier[] = [
          {
            id: 'tier-1',
            name: 'Starter',
            price: 29,
            currency: 'USD',
            billingCycle: 'monthly',
            features: ['5 Projects', '10GB Storage', 'Basic Support', 'Email Integration'],
            limits: {
              users: 5,
              projects: 5,
              storage: 10,
              apiCalls: 1000,
              integrations: 3,
              supportLevel: 'basic'
            },
            performance: {
              subscribers: 1250,
              revenue: 36250,
              conversionRate: 12.5,
              churnRate: 4.2,
              satisfactionScore: 8.1,
              upgradeRate: 15.3,
              downgradeRate: 2.1
            },
            status: 'active',
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'tier-2',
            name: 'Professional',
            price: 99,
            currency: 'USD',
            billingCycle: 'monthly',
            features: ['25 Projects', '100GB Storage', 'Priority Support', 'All Integrations', 'Advanced Analytics'],
            limits: {
              users: 25,
              projects: 25,
              storage: 100,
              apiCalls: 10000,
              integrations: 10,
              supportLevel: 'standard'
            },
            performance: {
              subscribers: 850,
              revenue: 84150,
              conversionRate: 18.7,
              churnRate: 2.8,
              satisfactionScore: 9.2,
              upgradeRate: 8.5,
              downgradeRate: 1.2
            },
            status: 'active',
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'tier-3',
            name: 'Enterprise',
            price: 299,
            currency: 'USD',
            billingCycle: 'monthly',
            features: ['Unlimited Projects', '1TB Storage', '24/7 Support', 'Custom Integrations', 'Advanced Security', 'Dedicated Manager'],
            limits: {
              users: 100,
              projects: -1,
              storage: 1000,
              apiCalls: 100000,
              integrations: -1,
              supportLevel: 'enterprise'
            },
            performance: {
              subscribers: 180,
              revenue: 53820,
              conversionRate: 25.3,
              churnRate: 1.5,
              satisfactionScore: 9.6,
              upgradeRate: 2.1,
              downgradeRate: 0.3
            },
            status: 'active',
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock conversion funnels
        const mockConversionFunnels: ConversionFunnel[] = [
          {
            id: 'funnel-1',
            name: 'Free Trial to Paid',
            stages: [
              {
                id: 'stage-1',
                name: 'Website Visit',
                visitors: 10000,
                conversions: 1000,
                conversionRate: 10.0,
                dropOffRate: 90.0,
                averageTime: 2
              },
              {
                id: 'stage-2',
                name: 'Sign Up',
                visitors: 1000,
                conversions: 300,
                conversionRate: 30.0,
                dropOffRate: 70.0,
                averageTime: 5
              },
              {
                id: 'stage-3',
                name: 'Trial Start',
                visitors: 300,
                conversions: 180,
                conversionRate: 60.0,
                dropOffRate: 40.0,
                averageTime: 1
              },
              {
                id: 'stage-4',
                name: 'Trial Complete',
                visitors: 180,
                conversions: 90,
                conversionRate: 50.0,
                dropOffRate: 50.0,
                averageTime: 14
              },
              {
                id: 'stage-5',
                name: 'Paid Conversion',
                visitors: 90,
                conversions: 45,
                conversionRate: 50.0,
                dropOffRate: 50.0,
                averageTime: 3
              }
            ],
            totalVisitors: 10000,
            conversionRate: 0.45,
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock customer segments
        const mockCustomerSegments: CustomerSegment[] = [
          {
            id: 'segment-1',
            name: 'SMB Tech Companies',
            criteria: {
              companySize: ['10-50', '50-200'],
              industry: ['Technology', 'Software'],
              geography: ['North America', 'Europe'],
              usageLevel: ['high', 'medium'],
              subscriptionTier: ['Professional', 'Enterprise'],
              tenure: ['6-12 months', '1-2 years']
            },
            customers: 450,
            revenue: 675000,
            arpu: 1500,
            churnRate: 2.1,
            growthRate: 18.5,
            characteristics: ['High engagement', 'Feature-heavy users', 'Price sensitive'],
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'segment-2',
            name: 'Enterprise Clients',
            criteria: {
              companySize: ['500+'],
              industry: ['Finance', 'Healthcare', 'Manufacturing'],
              geography: ['Global'],
              usageLevel: ['high'],
              subscriptionTier: ['Enterprise'],
              tenure: ['2+ years']
            },
            customers: 85,
            revenue: 1275000,
            arpu: 15000,
            churnRate: 0.8,
            growthRate: 12.3,
            characteristics: ['High LTV', 'Low churn', 'Custom requirements'],
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock revenue goals
        const mockRevenueGoals: RevenueGoal[] = [
          {
            id: 'goal-1',
            name: 'Q3 2024 Revenue Target',
            targetAmount: 4000000,
            currency: 'USD',
            period: 'quarterly',
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
            currentProgress: 2800000,
            status: 'on_track',
            milestones: [
              {
                id: 'milestone-1',
                name: 'Month 1 Target',
                targetAmount: 1300000,
                achievedAmount: 1350000,
                targetDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                achievedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'achieved'
              },
              {
                id: 'milestone-2',
                name: 'Month 2 Target',
                targetAmount: 1300000,
                achievedAmount: 1450000,
                targetDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'pending'
              }
            ],
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock revenue optimizations
        const mockRevenueOptimizations: RevenueOptimization[] = [
          {
            id: 'optimization-1',
            name: 'Pricing Page Redesign',
            type: 'conversion',
            description: 'Redesigned pricing page with better value proposition and clearer feature comparison',
            impact: 'high',
            effort: 'medium',
            status: 'completed',
            expectedRevenue: 150000,
            actualRevenue: 175000,
            startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            metrics: {
              beforeValue: 12.5,
              afterValue: 18.7,
              improvement: 49.6,
              confidence: 95,
              sampleSize: 5000
            },
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock dynamic pricing strategies
        const mockDynamicPricingStrategies: DynamicPricingStrategy[] = [
          {
            id: 'strategy-1',
            name: 'Seasonal Pricing',
            strategy: 'time_based',
            rules: [
              {
                id: 'rule-1',
                condition: 'Q4 Holiday Season',
                action: 'increase_price',
                value: 15,
                priority: 1
              }
            ],
            status: 'active',
            performance: {
              revenueImpact: 12.5,
              conversionImpact: -2.1,
              customerSatisfaction: 8.7,
              implementationCost: 5000,
              roi: 250
            },
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock onboarding flows
        const mockOnboardingFlows: OnboardingFlow[] = [
          {
            id: 'flow-1',
            name: 'Standard Onboarding',
            steps: [
              {
                id: 'step-1',
                name: 'Account Setup',
                description: 'Create account and verify email',
                order: 1,
                completionRate: 95,
                averageTime: 3,
                required: true
              },
              {
                id: 'step-2',
                name: 'Profile Completion',
                description: 'Complete user profile and preferences',
                order: 2,
                completionRate: 78,
                averageTime: 5,
                required: true
              },
              {
                id: 'step-3',
                name: 'First Project',
                description: 'Create first project and add team members',
                order: 3,
                completionRate: 65,
                averageTime: 10,
                required: true
              }
            ],
            completionRate: 65,
            averageTime: 18,
            dropOffPoints: [
              {
                stepId: 'step-2',
                stepName: 'Profile Completion',
                dropOffRate: 22,
                reasons: ['Too many fields', 'Privacy concerns', 'Time constraints']
              }
            ],
            optimization: {
              suggestions: ['Reduce profile fields', 'Add progress indicators', 'Offer skip options'],
              priority: 'high',
              expectedImpact: 15
            },
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock customer success programs
        const mockCustomerSuccessPrograms: CustomerSuccessProgram[] = [
          {
            id: 'program-1',
            name: 'Enterprise Success Program',
            segments: ['Enterprise Clients'],
            touchpoints: [
              {
                id: 'touchpoint-1',
                type: 'call',
                trigger: 'Onboarding Complete',
                frequency: 'Weekly',
                content: 'Check-in call to ensure successful setup and answer questions'
              }
            ],
            metrics: {
              engagementRate: 92,
              satisfactionScore: 9.4,
              retentionRate: 98.5,
              upsellRate: 25.3,
              referralRate: 18.7
            },
            status: 'active',
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock upsell campaigns
        const mockUpsellCampaigns: UpsellCampaign[] = [
          {
            id: 'campaign-1',
            name: 'Q3 Feature Upgrade',
            targetSegment: 'Professional Users',
            offer: {
              product: 'Enterprise Features',
              discount: 20,
              duration: '3 months',
              conditions: ['Active for 6+ months', 'High usage']
            },
            channels: ['email', 'in_app'],
            performance: {
              sent: 2500,
              opened: 1875,
              clicked: 563,
              converted: 112,
              revenue: 33600,
              roi: 340
            },
            status: 'completed',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        setRevenueMetrics(mockRevenueMetrics);
        setPricingTiers(mockPricingTiers);
        setConversionFunnels(mockConversionFunnels);
        setCustomerSegments(mockCustomerSegments);
        setRevenueGoals(mockRevenueGoals);
        setRevenueOptimizations(mockRevenueOptimizations);
        setDynamicPricingStrategies(mockDynamicPricingStrategies);
        setOnboardingFlows(mockOnboardingFlows);
        setCustomerSuccessPrograms(mockCustomerSuccessPrograms);
        setUpsellCampaigns(mockUpsellCampaigns);

        toast.success('Revenue scaling data loaded successfully!');
      } catch (error) {
        console.error('Failed to load revenue data:', error);
        toast.error('Failed to load revenue scaling data');
      } finally {
        setIsLoading(false);
      }
    };

    loadRevenueData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'metrics', label: 'Metrics', icon: TrendingUp },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'funnel', label: 'Funnel', icon: Target },
    { id: 'segments', label: 'Segments', icon: Users },
    { id: 'goals', label: 'Goals', icon: Award },
    { id: 'optimizations', label: 'Optimizations', icon: Zap },
    { id: 'pricing_strategy', label: 'Pricing Strategy', icon: Calculator },
    { id: 'onboarding', label: 'Onboarding', icon: ArrowRight },
    { id: 'success', label: 'Success', icon: CheckCircle },
    { id: 'upsell', label: 'Upsell', icon: ArrowUp },
    { id: 'analytics', label: 'Analytics', icon: PieChart }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'beta': return 'text-blue-600 bg-blue-100';
      case 'deprecated': return 'text-red-600 bg-red-100';
      case 'on_track': return 'text-green-600 bg-green-100';
      case 'behind': return 'text-red-600 bg-red-100';
      case 'ahead': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'planned': return 'text-yellow-600 bg-yellow-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'testing': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
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
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Revenue Scaling</h2>
                <p className="text-green-100">Revenue metrics tracking and optimization</p>
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
                          <p className="text-green-100">Total Revenue</p>
                          <p className="text-3xl font-bold">${revenueMetrics[0]?.totalRevenue.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Growth Rate</p>
                          <p className="text-3xl font-bold">{revenueMetrics[0]?.growthRate}%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">MRR</p>
                          <p className="text-3xl font-bold">${revenueMetrics[0]?.mrr.toLocaleString()}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Churn Rate</p>
                          <p className="text-3xl font-bold">{revenueMetrics[0]?.churnRate}%</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Revenue Growth Trend</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsLineChart data={revenueMetrics}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="period" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="totalRevenue" stroke="#10b981" strokeWidth={2} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Pricing Tier Performance</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={pricingTiers.map(tier => ({
                          name: tier.name,
                          revenue: tier.performance.revenue / 1000,
                          subscribers: tier.performance.subscribers
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

              {activeTab === 'metrics' && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {revenueMetrics.map((metric) => (
                    <div key={metric.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{metric.period}</h3>
                            <p className="text-sm text-gray-600">Revenue Metrics</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                            {metric.growthRate}% growth
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Total Revenue</span>
                          <p className="font-semibold">${metric.totalRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Recurring Revenue</span>
                          <p className="font-semibold">${metric.recurringRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">One-Time Revenue</span>
                          <p className="font-semibold">${metric.oneTimeRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">MRR</span>
                          <p className="font-semibold">${metric.mrr.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">LTV</span>
                          <p className="font-semibold">${metric.ltv}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">CAC</span>
                          <p className="font-semibold">${metric.cac}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">ARPU</span>
                          <p className="font-semibold">${metric.arpu}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">ARR</span>
                          <p className="font-semibold">${metric.arr.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  {pricingTiers.map((tier) => (
                    <div key={tier.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{tier.name}</h3>
                            <p className="text-sm text-gray-600">${tier.price}/{tier.billingCycle}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(tier.status)}`}>
                            {tier.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {tier.performance.subscribers} subscribers
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Revenue</span>
                          <p className="font-semibold">${tier.performance.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Conversion Rate</span>
                          <p className="font-semibold">{tier.performance.conversionRate}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Churn Rate</span>
                          <p className="font-semibold">{tier.performance.churnRate}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Satisfaction</span>
                          <p className="font-semibold">{tier.performance.satisfactionScore}/10</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {tier.features.map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Limits:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          <div>Users: {tier.limits.users === -1 ? 'Unlimited' : tier.limits.users}</div>
                          <div>Projects: {tier.limits.projects === -1 ? 'Unlimited' : tier.limits.projects}</div>
                          <div>Storage: {tier.limits.storage}GB</div>
                          <div>API Calls: {tier.limits.apiCalls.toLocaleString()}</div>
                          <div>Integrations: {tier.limits.integrations === -1 ? 'Unlimited' : tier.limits.integrations}</div>
                          <div>Support: {tier.limits.supportLevel}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'funnel' && (
                <motion.div
                  key="funnel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {conversionFunnels.map((funnel) => (
                    <div key={funnel.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Target className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{funnel.name}</h3>
                            <p className="text-sm text-gray-600">Overall Conversion: {(funnel.conversionRate * 100).toFixed(2)}%</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {funnel.totalVisitors.toLocaleString()} visitors
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {funnel.stages.map((stage, index) => (
                          <div key={stage.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{stage.name}</h4>
                                <span className="text-sm text-gray-600">{stage.averageTime} min avg</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Visitors:</span>
                                  <p className="font-semibold">{stage.visitors.toLocaleString()}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Conversions:</span>
                                  <p className="font-semibold">{stage.conversions.toLocaleString()}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Conversion Rate:</span>
                                  <p className="font-semibold">{stage.conversionRate}%</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Drop-off Rate:</span>
                                  <p className="font-semibold">{stage.dropOffRate}%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'segments' && (
                <motion.div
                  key="segments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {customerSegments.map((segment) => (
                    <div key={segment.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <Users className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{segment.name}</h3>
                            <p className="text-sm text-gray-600">{segment.customers} customers</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                            {segment.growthRate}% growth
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                            {segment.churnRate}% churn
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Revenue</span>
                          <p className="font-semibold">${segment.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">ARPU</span>
                          <p className="font-semibold">${segment.arpu}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Growth Rate</span>
                          <p className="font-semibold">{segment.growthRate}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Churn Rate</span>
                          <p className="font-semibold">{segment.churnRate}%</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Characteristics:</h4>
                        <div className="flex flex-wrap gap-2">
                          {segment.characteristics.map((characteristic, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-sm">
                              {characteristic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Criteria:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          <div>Company Size: {segment.criteria.companySize.join(', ')}</div>
                          <div>Industry: {segment.criteria.industry.join(', ')}</div>
                          <div>Geography: {segment.criteria.geography.join(', ')}</div>
                          <div>Usage Level: {segment.criteria.usageLevel.join(', ')}</div>
                          <div>Subscription Tier: {segment.criteria.subscriptionTier.join(', ')}</div>
                          <div>Tenure: {segment.criteria.tenure.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'goals' && (
                <motion.div
                  key="goals"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {revenueGoals.map((goal) => (
                    <div key={goal.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-yellow-100 rounded-lg">
                            <Award className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{goal.name}</h3>
                            <p className="text-sm text-gray-600">{goal.period} goal</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(goal.status)}`}>
                            {goal.status.replace('_', ' ')}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {((goal.currentProgress / goal.targetAmount) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>${goal.currentProgress.toLocaleString()} / ${goal.targetAmount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(goal.currentProgress / goal.targetAmount) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Target Amount</span>
                          <p className="font-semibold">${goal.targetAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Current Progress</span>
                          <p className="font-semibold">${goal.currentProgress.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Remaining</span>
                          <p className="font-semibold">${(goal.targetAmount - goal.currentProgress).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Milestones:</h4>
                        <div className="space-y-2">
                          {goal.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{milestone.name}</p>
                                <p className="text-sm text-gray-600">
                                  ${milestone.achievedAmount.toLocaleString()} / ${milestone.targetAmount.toLocaleString()}
                                </p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(milestone.status)}`}>
                                {milestone.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'optimizations' && (
                <motion.div
                  key="optimizations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {revenueOptimizations.map((optimization) => (
                    <div key={optimization.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Zap className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{optimization.name}</h3>
                            <p className="text-sm text-gray-600">{optimization.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(optimization.status)}`}>
                            {optimization.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getImpactColor(optimization.impact)}`}>
                            {optimization.impact} impact
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{optimization.description}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Expected Revenue</span>
                          <p className="font-semibold">${optimization.expectedRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Actual Revenue</span>
                          <p className="font-semibold">
                            {optimization.actualRevenue ? `$${optimization.actualRevenue.toLocaleString()}` : 'TBD'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Improvement</span>
                          <p className="font-semibold">{optimization.metrics.improvement}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Confidence</span>
                          <p className="font-semibold">{optimization.metrics.confidence}%</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Before Value</span>
                          <p className="font-semibold">{optimization.metrics.beforeValue}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">After Value</span>
                          <p className="font-semibold">{optimization.metrics.afterValue}</p>
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
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">LTV:CAC Ratio</p>
                          <p className="text-3xl font-bold">
                            {revenueMetrics[0] ? (revenueMetrics[0].ltv / revenueMetrics[0].cac).toFixed(1) : '0'}
                          </p>
                        </div>
                        <Calculator className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Payback Period</p>
                          <p className="text-3xl font-bold">
                            {revenueMetrics[0] ? Math.ceil(revenueMetrics[0].cac / (revenueMetrics[0].arpu * 12)) : '0'}m
                          </p>
                        </div>
                        <Clock className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Gross Revenue Retention</p>
                          <p className="text-3xl font-bold">
                            {revenueMetrics[0] ? (100 - revenueMetrics[0].churnRate).toFixed(1) : '0'}%
                          </p>
                        </div>
                        <Shield className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Net Revenue Retention</p>
                          <p className="text-3xl font-bold">
                            {revenueMetrics[0] ? (100 - revenueMetrics[0].churnRate + 15).toFixed(1) : '0'}%
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-orange-200" />
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

export default RevenueScaling;