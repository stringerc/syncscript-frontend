import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, TrendingUp, Users, Target, BarChart3, PieChart, LineChart, Zap, ArrowUpRight, ArrowDownRight, Eye, MousePointer, CreditCard, RefreshCw, CheckCircle, AlertTriangle, Clock, Settings, Code, Award, Star, Mail, Phone, Calendar, MapPin, Building, Share2, Download, Upload, Globe, Megaphone, Briefcase, Activity, UserCheck, FileText, Presentation, Link, Calculator, Percent, ArrowRight, Filter, Search, Plus, Edit, Save, Send, Play, Pause, Stop, Maximize, Minimize } from 'lucide-react';

interface RevenueMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  growth: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  category: 'mrr' | 'arr' | 'churn' | 'ltv' | 'cac' | 'conversion' | 'retention';
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  lastUpdated: Date;
}

interface PricingTier {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  features: string[];
  limits: {
    users: number;
    projects: number;
    storage: number;
    apiCalls: number;
  };
  conversion: {
    visitors: number;
    signups: number;
    conversions: number;
    rate: number;
  };
  revenue: {
    current: number;
    target: number;
    growth: number;
  };
  churn: {
    rate: number;
    customers: number;
    lost: number;
  };
}

interface ConversionFunnel {
  id: string;
  stage: string;
  visitors: number;
  conversions: number;
  rate: number;
  dropoff: number;
  value: number;
  optimization: {
    priority: 'high' | 'medium' | 'low';
    impact: number;
    effort: 'low' | 'medium' | 'high';
    status: 'identified' | 'testing' | 'implemented' | 'optimized';
  };
}

interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  revenue: number;
  ltv: number;
  cac: number;
  churn: number;
  growth: number;
  characteristics: string[];
  opportunities: {
    upsell: number;
    crossSell: number;
    retention: number;
  };
}

interface RevenueGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: Date;
  progress: number;
  status: 'on-track' | 'at-risk' | 'behind' | 'achieved';
  owner: string;
  dependencies: string[];
  milestones: {
    name: string;
    target: number;
    achieved: boolean;
    date: Date;
  }[];
}

interface RevenueOptimization {
  id: string;
  name: string;
  description: string;
  type: 'pricing' | 'conversion' | 'retention' | 'expansion' | 'acquisition';
  impact: 'low' | 'medium' | 'high' | 'critical';
  effort: 'low' | 'medium' | 'high';
  status: 'identified' | 'testing' | 'implemented' | 'optimized';
  metrics: {
    before: number;
    after: number;
    improvement: number;
  };
  cost: number;
  roi: number;
  timeline: string;
  owner: string;
}

interface RevenueForecast {
  id: string;
  period: string;
  forecast: {
    committed: number;
    bestCase: number;
    worstCase: number;
    pipeline: number;
  };
  confidence: number;
  drivers: {
    newCustomers: number;
    expansion: number;
    churn: number;
    priceChanges: number;
  };
  scenarios: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
  };
  risks: {
    description: string;
    impact: number;
    probability: number;
    mitigation: string;
  }[];
}

interface RevenueAnalytics {
  id: string;
  period: string;
  metrics: {
    mrr: number;
    arr: number;
    growth: number;
    churn: number;
    ltv: number;
    cac: number;
    payback: number;
    magicNumber: number;
  };
  trends: {
    mrrTrend: number[];
    churnTrend: number[];
    growthTrend: number[];
    ltvTrend: number[];
  };
  cohorts: {
    month: string;
    customers: number;
    revenue: number;
    retention: number[];
  }[];
}

const RevenueScaling: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetric[]>([]);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [conversionFunnel, setConversionFunnel] = useState<ConversionFunnel[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([]);
  const [revenueGoals, setRevenueGoals] = useState<RevenueGoal[]>([]);
  const [revenueOptimizations, setRevenueOptimizations] = useState<RevenueOptimization[]>([]);
  const [revenueForecast, setRevenueForecast] = useState<RevenueForecast[]>([]);
  const [revenueAnalytics, setRevenueAnalytics] = useState<RevenueAnalytics[]>([]);
  const [isOptimizingPricing, setIsOptimizingPricing] = useState(false);
  const [isScalingConversion, setIsScalingConversion] = useState(false);
  const [isExpandingRevenue, setIsExpandingRevenue] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<RevenueMetric | null>(null);
  const [selectedOptimization, setSelectedOptimization] = useState<RevenueOptimization | null>(null);

  // Generate revenue data
  useEffect(() => {
    const generateRevenueMetrics = (): RevenueMetric[] => {
      return [
        {
          id: 'mrr',
          name: 'Monthly Recurring Revenue',
          value: 75000,
          target: 100000,
          growth: 25,
          trend: 'up',
          unit: 'USD',
          category: 'mrr',
          period: 'monthly',
          lastUpdated: new Date()
        },
        {
          id: 'arr',
          name: 'Annual Recurring Revenue',
          value: 900000,
          target: 1200000,
          growth: 30,
          trend: 'up',
          unit: 'USD',
          category: 'arr',
          period: 'yearly',
          lastUpdated: new Date()
        },
        {
          id: 'churn',
          name: 'Monthly Churn Rate',
          value: 3.2,
          target: 2.0,
          growth: -15,
          trend: 'down',
          unit: '%',
          category: 'churn',
          period: 'monthly',
          lastUpdated: new Date()
        },
        {
          id: 'ltv',
          name: 'Customer Lifetime Value',
          value: 2400,
          target: 3000,
          growth: 18,
          trend: 'up',
          unit: 'USD',
          category: 'ltv',
          period: 'monthly',
          lastUpdated: new Date()
        },
        {
          id: 'cac',
          name: 'Customer Acquisition Cost',
          value: 180,
          target: 150,
          growth: -12,
          trend: 'down',
          unit: 'USD',
          category: 'cac',
          period: 'monthly',
          lastUpdated: new Date()
        },
        {
          id: 'conversion',
          name: 'Free to Paid Conversion',
          value: 12.5,
          target: 15.0,
          growth: 8,
          trend: 'up',
          unit: '%',
          category: 'conversion',
          period: 'monthly',
          lastUpdated: new Date()
        },
        {
          id: 'retention',
          name: 'Monthly Retention Rate',
          value: 96.8,
          target: 98.0,
          growth: 2,
          trend: 'up',
          unit: '%',
          category: 'retention',
          period: 'monthly',
          lastUpdated: new Date()
        }
      ];
    };

    const generatePricingTiers = (): PricingTier[] => {
      return [
        {
          id: 'free',
          name: 'Free',
          price: 0,
          billing: 'monthly',
          features: [
            'Up to 3 projects',
            'Basic task management',
            'Mobile app access',
            'Email support'
          ],
          limits: {
            users: 1,
            projects: 3,
            storage: 100,
            apiCalls: 100
          },
          conversion: {
            visitors: 10000,
            signups: 2500,
            conversions: 0,
            rate: 0
          },
          revenue: {
            current: 0,
            target: 0,
            growth: 0
          },
          churn: {
            rate: 0,
            customers: 0,
            lost: 0
          }
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 29,
          billing: 'monthly',
          features: [
            'Unlimited projects',
            'Advanced analytics',
            'Team collaboration',
            'Priority support',
            'API access'
          ],
          limits: {
            users: 10,
            projects: -1,
            storage: 1000,
            apiCalls: 10000
          },
          conversion: {
            visitors: 2500,
            signups: 500,
            conversions: 375,
            rate: 75
          },
          revenue: {
            current: 10875,
            target: 15000,
            growth: 38
          },
          churn: {
            rate: 4.2,
            customers: 375,
            lost: 16
          }
        },
        {
          id: 'business',
          name: 'Business',
          price: 79,
          billing: 'monthly',
          features: [
            'Everything in Pro',
            'Advanced integrations',
            'Custom workflows',
            'Dedicated support',
            'White-label options'
          ],
          limits: {
            users: 50,
            projects: -1,
            storage: 5000,
            apiCalls: 50000
          },
          conversion: {
            visitors: 800,
            signups: 160,
            conversions: 120,
            rate: 75
          },
          revenue: {
            current: 9480,
            target: 12000,
            growth: 27
          },
          churn: {
            rate: 2.8,
            customers: 120,
            lost: 3
          }
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: 199,
          billing: 'monthly',
          features: [
            'Everything in Business',
            'Unlimited users',
            'Custom integrations',
            'SLA guarantee',
            'Account manager'
          ],
          limits: {
            users: -1,
            projects: -1,
            storage: -1,
            apiCalls: -1
          },
          conversion: {
            visitors: 200,
            signups: 40,
            conversions: 32,
            rate: 80
          },
          revenue: {
            current: 6368,
            target: 8000,
            growth: 26
          },
          churn: {
            rate: 1.5,
            customers: 32,
            lost: 0
          }
        }
      ];
    };

    const generateConversionFunnel = (): ConversionFunnel[] => {
      return [
        {
          id: 'awareness',
          stage: 'Website Visitors',
          visitors: 13500,
          conversions: 3100,
          rate: 23,
          dropoff: 0,
          value: 0,
          optimization: {
            priority: 'medium',
            impact: 15,
            effort: 'medium',
            status: 'testing'
          }
        },
        {
          id: 'interest',
          stage: 'Sign-ups',
          visitors: 3100,
          conversions: 620,
          rate: 20,
          dropoff: 80,
          value: 0,
          optimization: {
            priority: 'high',
            impact: 25,
            effort: 'low',
            status: 'implemented'
          }
        },
        {
          id: 'trial',
          stage: 'Free Trial',
          visitors: 620,
          conversions: 527,
          rate: 85,
          dropoff: 15,
          value: 0,
          optimization: {
            priority: 'medium',
            impact: 20,
            effort: 'medium',
            status: 'testing'
          }
        },
        {
          id: 'conversion',
          stage: 'Paid Conversion',
          visitors: 527,
          conversions: 66,
          rate: 12.5,
          dropoff: 87.5,
          value: 1914,
          optimization: {
            priority: 'critical',
            impact: 40,
            effort: 'high',
            status: 'identified'
          }
        },
        {
          id: 'retention',
          stage: 'Active Users',
          visitors: 66,
          conversions: 63,
          rate: 95.5,
          dropoff: 4.5,
          value: 1914,
          optimization: {
            priority: 'high',
            impact: 30,
            effort: 'medium',
            status: 'implemented'
          }
        }
      ];
    };

    const generateCustomerSegments = (): CustomerSegment[] => {
      return [
        {
          id: 'startups',
          name: 'Startups (1-10 employees)',
          size: 180,
          revenue: 5220,
          ltv: 1450,
          cac: 120,
          churn: 5.2,
          growth: 35,
          characteristics: [
            'Price sensitive',
            'Growth focused',
            'Tech savvy',
            'Limited budget'
          ],
          opportunities: {
            upsell: 25,
            crossSell: 15,
            retention: 20
          }
        },
        {
          id: 'smb',
          name: 'Small Business (11-50 employees)',
          size: 220,
          revenue: 17380,
          ltv: 2890,
          cac: 180,
          churn: 3.8,
          growth: 28,
          characteristics: [
            'Process oriented',
            'Team collaboration',
            'Integration needs',
            'Support focused'
          ],
          opportunities: {
            upsell: 40,
            crossSell: 30,
            retention: 35
          }
        },
        {
          id: 'midmarket',
          name: 'Mid-Market (51-200 employees)',
          size: 95,
          revenue: 7505,
          ltv: 4200,
          cac: 250,
          churn: 2.5,
          growth: 22,
          characteristics: [
            'Enterprise features',
            'Security focused',
            'Compliance needs',
            'Custom workflows'
          ],
          opportunities: {
            upsell: 60,
            crossSell: 45,
            retention: 50
          }
        },
        {
          id: 'enterprise',
          name: 'Enterprise (200+ employees)',
          size: 32,
          revenue: 6368,
          ltv: 7800,
          cac: 450,
          churn: 1.5,
          growth: 15,
          characteristics: [
            'Complex requirements',
            'Security critical',
            'Integration heavy',
            'Dedicated support'
          ],
          opportunities: {
            upsell: 80,
            crossSell: 70,
            retention: 85
          }
        }
      ];
    };

    const generateRevenueGoals = (): RevenueGoal[] => {
      return [
        {
          id: 'mrr-100k',
          name: 'Achieve $100K MRR',
          target: 100000,
          current: 75000,
          deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          progress: 75,
          status: 'on-track',
          owner: 'Revenue Team',
          dependencies: ['Pricing optimization', 'Conversion improvement'],
          milestones: [
            {
              name: 'Optimize pricing tiers',
              target: 80000,
              achieved: true,
              date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            },
            {
              name: 'Improve conversion rate',
              target: 85000,
              achieved: true,
              date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
            },
            {
              name: 'Launch enterprise features',
              target: 95000,
              achieved: false,
              date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            },
            {
              name: 'Scale partnerships',
              target: 100000,
              achieved: false,
              date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            }
          ]
        },
        {
          id: 'churn-reduction',
          name: 'Reduce Churn to 2%',
          target: 2.0,
          current: 3.2,
          deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          progress: 37.5,
          status: 'at-risk',
          owner: 'Customer Success',
          dependencies: ['Retention program', 'Onboarding improvement'],
          milestones: [
            {
              name: 'Launch retention program',
              target: 3.0,
              achieved: true,
              date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
            },
            {
              name: 'Improve onboarding',
              target: 2.5,
              achieved: false,
              date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
            },
            {
              name: 'Implement success metrics',
              target: 2.0,
              achieved: false,
              date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
            }
          ]
        }
      ];
    };

    const generateRevenueOptimizations = (): RevenueOptimization[] => {
      return [
        {
          id: 'pricing-optimization',
          name: 'Dynamic Pricing Strategy',
          description: 'Implement value-based pricing with usage tiers and enterprise discounts',
          type: 'pricing',
          impact: 'critical',
          effort: 'high',
          status: 'testing',
          metrics: {
            before: 75000,
            after: 85000,
            improvement: 13.3
          },
          cost: 25000,
          roi: 340,
          timeline: '6 weeks',
          owner: 'Revenue Team'
        },
        {
          id: 'conversion-optimization',
          name: 'Onboarding Flow Redesign',
          description: 'Streamline signup process and improve trial-to-paid conversion',
          type: 'conversion',
          impact: 'high',
          effort: 'medium',
          status: 'implemented',
          metrics: {
            before: 10.5,
            after: 12.5,
            improvement: 19
          },
          cost: 15000,
          roi: 280,
          timeline: '4 weeks',
          owner: 'Product Team'
        },
        {
          id: 'retention-program',
          name: 'Customer Success Program',
          description: 'Proactive customer success management and retention campaigns',
          type: 'retention',
          impact: 'high',
          effort: 'medium',
          status: 'testing',
          metrics: {
            before: 4.5,
            after: 3.2,
            improvement: 29
          },
          cost: 20000,
          roi: 420,
          timeline: '8 weeks',
          owner: 'Customer Success'
        },
        {
          id: 'upsell-automation',
          name: 'Automated Upsell Campaigns',
          description: 'AI-powered upsell recommendations and automated expansion campaigns',
          type: 'expansion',
          impact: 'medium',
          effort: 'high',
          status: 'identified',
          metrics: {
            before: 15,
            after: 25,
            improvement: 67
          },
          cost: 30000,
          roi: 180,
          timeline: '10 weeks',
          owner: 'Marketing Team'
        }
      ];
    };

    const generateRevenueForecast = (): RevenueForecast[] => {
      return [
        {
          id: 'q1-2024',
          period: 'Q1 2024',
          forecast: {
            committed: 85000,
            bestCase: 100000,
            worstCase: 75000,
            pipeline: 150000
          },
          confidence: 78,
          drivers: {
            newCustomers: 45000,
            expansion: 25000,
            churn: -15000,
            priceChanges: 15000
          },
          scenarios: {
            optimistic: 120000,
            realistic: 95000,
            pessimistic: 75000
          },
          risks: [
            {
              description: 'Economic downturn affecting SMB segment',
              impact: 15000,
              probability: 25,
              mitigation: 'Focus on enterprise segment and value proposition'
            },
            {
              description: 'Increased competition in productivity space',
              impact: 10000,
              probability: 40,
              mitigation: 'Differentiate through AI features and integrations'
            }
          ]
        }
      ];
    };

    const generateRevenueAnalytics = (): RevenueAnalytics[] => {
      return [
        {
          id: 'analytics-1',
          period: 'Last 30 Days',
          metrics: {
            mrr: 75000,
            arr: 900000,
            growth: 25,
            churn: 3.2,
            ltv: 2400,
            cac: 180,
            payback: 13.3,
            magicNumber: 1.2
          },
          trends: {
            mrrTrend: [60000, 62000, 64000, 66000, 68000, 70000, 72000, 74000, 75000],
            churnTrend: [4.2, 4.0, 3.8, 3.6, 3.5, 3.4, 3.3, 3.2, 3.2],
            growthTrend: [15, 18, 20, 22, 23, 24, 24, 25, 25],
            ltvTrend: [2000, 2100, 2150, 2200, 2250, 2300, 2350, 2380, 2400]
          },
          cohorts: [
            {
              month: '2023-12',
              customers: 45,
              revenue: 1305,
              retention: [100, 95, 92, 88, 85, 82]
            },
            {
              month: '2024-01',
              customers: 52,
              revenue: 1508,
              retention: [100, 96, 94, 90, 87]
            },
            {
              month: '2024-02',
              customers: 48,
              revenue: 1392,
              retention: [100, 97, 95, 91]
            }
          ]
        }
      ];
    };

    setRevenueMetrics(generateRevenueMetrics());
    setPricingTiers(generatePricingTiers());
    setConversionFunnel(generateConversionFunnel());
    setCustomerSegments(generateCustomerSegments());
    setRevenueGoals(generateRevenueGoals());
    setRevenueOptimizations(generateRevenueOptimizations());
    setRevenueForecast(generateRevenueForecast());
    setRevenueAnalytics(generateRevenueAnalytics());
  }, []);

  const optimizePricing = async () => {
    setIsOptimizingPricing(true);
    
    // Simulate pricing optimization
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Update pricing tiers with optimized values
    setPricingTiers(prev => prev.map(tier => ({
      ...tier,
      conversion: {
        ...tier.conversion,
        rate: tier.conversion.rate + (tier.conversion.rate * 0.1) // 10% improvement
      },
      revenue: {
        ...tier.revenue,
        current: tier.revenue.current + (tier.revenue.current * 0.15) // 15% revenue increase
      }
    })));
    
    setIsOptimizingPricing(false);
  };

  const scaleConversion = async () => {
    setIsScalingConversion(true);
    
    // Simulate conversion scaling
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Update conversion funnel with improved rates
    setConversionFunnel(prev => prev.map(stage => ({
      ...stage,
      rate: stage.rate + (stage.rate * 0.05), // 5% improvement
      conversions: Math.round(stage.conversions * 1.05)
    })));
    
    setIsScalingConversion(false);
  };

  const expandRevenue = async () => {
    setIsExpandingRevenue(true);
    
    // Simulate revenue expansion
    await new Promise(resolve => setTimeout(resolve, 7000));
    
    // Update revenue metrics with expansion
    setRevenueMetrics(prev => prev.map(metric => {
      if (metric.category === 'mrr') {
        return {
          ...metric,
          value: metric.value + 5000, // $5K MRR increase
          growth: metric.growth + 5
        };
      }
      return metric;
    }));
    
    setIsExpandingRevenue(false);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="text-green-600" size={16} />;
      case 'down': return <ArrowDownRight className="text-red-600" size={16} />;
      default: return <ArrowRight className="text-gray-600" size={16} />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': case 'implemented': case 'optimized': return 'bg-green-100 text-green-800';
      case 'at-risk': case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'behind': case 'identified': return 'bg-red-100 text-red-800';
      case 'achieved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentMRR = revenueMetrics.find(m => m.category === 'mrr')?.value || 0;
  const targetMRR = revenueMetrics.find(m => m.category === 'mrr')?.target || 100000;
  const mrrProgress = (currentMRR / targetMRR) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">💰 Revenue Scaling</h2>
              <p className="text-green-100 mt-1">Achieve $100K MRR and optimize conversion rates across all channels</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Revenue Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Current MRR</p>
                  <p className="text-2xl font-bold text-green-800">{formatCurrency(currentMRR)}</p>
                  <p className="text-xs text-green-600">Target: {formatCurrency(targetMRR)}</p>
                </div>
                <DollarSign className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Monthly Growth</p>
                  <p className="text-2xl font-bold text-blue-800">25%</p>
                  <p className="text-xs text-blue-600">vs last month</p>
                </div>
                <TrendingUp className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-800">12.5%</p>
                  <p className="text-xs text-purple-600">Free to paid</p>
                </div>
                <Target className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Churn Rate</p>
                  <p className="text-2xl font-bold text-orange-800">3.2%</p>
                  <p className="text-xs text-orange-600">Target: 2.0%</p>
                </div>
                <Users className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* MRR Progress */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border-2 border-green-200">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-green-700 font-medium">
                🎯 MRR Goal Progress: {mrrProgress.toFixed(1)}% Complete
              </div>
              <div className="text-sm text-green-700 font-medium">
                {formatCurrency(currentMRR)} / {formatCurrency(targetMRR)}
              </div>
            </div>
            <div className="w-full bg-green-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(mrrProgress, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Revenue Actions */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border-2 border-green-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-green-700 font-medium">
                💰 Revenue Scaling Active - Optimizing pricing, scaling conversion, and expanding revenue streams!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={optimizePricing}
                  disabled={isOptimizingPricing}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isOptimizingPricing ? '⏳ Optimizing...' : '💎 Optimize Pricing'}
                </button>
                <button
                  onClick={scaleConversion}
                  disabled={isScalingConversion}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isScalingConversion ? '⏳ Scaling...' : '📈 Scale Conversion'}
                </button>
                <button
                  onClick={expandRevenue}
                  disabled={isExpandingRevenue}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isExpandingRevenue ? '⏳ Expanding...' : '🚀 Expand Revenue'}
                </button>
              </div>
            </div>
          </div>

          {/* Revenue Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="mr-2 text-green-600" />
              Revenue Metrics ({revenueMetrics.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {revenueMetrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                      <p className="text-sm text-gray-600">{metric.period} • {metric.unit}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.growth > 0 ? '+' : ''}{metric.growth}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium text-gray-900">
                        {metric.unit === 'USD' ? formatCurrency(metric.value) : `${metric.value}${metric.unit}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium text-gray-900">
                        {metric.unit === 'USD' ? formatCurrency(metric.target) : `${metric.target}${metric.unit}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium text-gray-900">
                        {((metric.value / metric.target) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <CreditCard className="mr-2 text-blue-600" />
              Pricing Tiers Performance ({pricingTiers.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pricingTiers.map((tier) => (
                <div key={tier.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{tier.name}</h4>
                      <p className="text-lg font-bold text-green-600">
                        {tier.price === 0 ? 'Free' : formatCurrency(tier.price)}
                        <span className="text-sm text-gray-600">/{tier.billing}</span>
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {tier.conversion.customers} customers
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-gray-900">{formatCurrency(tier.revenue.current)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversion:</span>
                      <span className="font-medium text-gray-900">{tier.conversion.rate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Churn:</span>
                      <span className="font-medium text-gray-900">{tier.churn.rate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Growth:</span>
                      <span className="font-medium text-green-600">+{tier.revenue.growth}%</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-xs text-gray-600 mb-1">Revenue Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((tier.revenue.current / tier.revenue.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Filter className="mr-2 text-purple-600" />
              Conversion Funnel Analysis
            </h3>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{stage.stage}</h4>
                      <p className="text-sm text-gray-600">
                        {formatNumber(stage.visitors)} → {formatNumber(stage.conversions)} ({stage.rate.toFixed(1)}%)
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(stage.optimization.priority)}`}>
                        {stage.optimization.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(stage.optimization.status)}`}>
                        {stage.optimization.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Visitors:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatNumber(stage.visitors)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Conversions:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatNumber(stage.conversions)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Dropoff:</span>
                      <span className="font-medium text-red-600 ml-1">{stage.dropoff.toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Value:</span>
                      <span className="font-medium text-green-600 ml-1">{formatCurrency(stage.value)}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Conversion Rate</span>
                      <span className="font-medium text-gray-900">{stage.rate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(stage.rate, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Goals */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="mr-2 text-orange-600" />
              Revenue Goals ({revenueGoals.length})
            </h3>
            <div className="space-y-4">
              {revenueGoals.map((goal) => (
                <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{goal.name}</h4>
                      <p className="text-sm text-gray-600">Owner: {goal.owner} • Due: {goal.deadline.toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium text-gray-900 ml-1">
                        {goal.name.includes('MRR') ? formatCurrency(goal.target) : `${goal.target}%`}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium text-gray-900 ml-1">
                        {goal.name.includes('MRR') ? formatCurrency(goal.current) : `${goal.current}%`}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium text-gray-900 ml-1">{goal.progress.toFixed(1)}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Milestones:</span>
                      <span className="font-medium text-gray-900 ml-1">
                        {goal.milestones.filter(m => m.achieved).length}/{goal.milestones.length}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Goal Progress</span>
                      <span className="font-medium text-gray-900">{goal.progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(goal.progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Dependencies:</span> {goal.dependencies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Optimizations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Zap className="mr-2 text-yellow-600" />
              Revenue Optimizations ({revenueOptimizations.length})
            </h3>
            <div className="space-y-4">
              {revenueOptimizations.map((optimization) => (
                <div key={optimization.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{optimization.name}</h4>
                      <p className="text-sm text-gray-600">{optimization.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(optimization.impact)}`}>
                        {optimization.impact}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(optimization.status)}`}>
                        {optimization.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900 ml-1 capitalize">{optimization.type}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Impact:</span>
                      <span className="font-medium text-gray-900 ml-1">{optimization.metrics.improvement.toFixed(1)}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">ROI:</span>
                      <span className="font-medium text-green-600 ml-1">{optimization.roi}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-medium text-gray-900 ml-1">{optimization.timeline}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Owner:</span> {optimization.owner} | 
                    <span className="font-medium ml-2">Cost:</span> {formatCurrency(optimization.cost)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RevenueScaling;
