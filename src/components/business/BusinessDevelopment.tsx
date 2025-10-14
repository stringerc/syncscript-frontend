import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Users, Handshake, TrendingUp, BarChart3, CheckCircle, AlertTriangle, Clock, Settings, Code, Award, Star, Zap, Rocket, Mail, Phone, Calendar, MapPin, Building, Share2, Download, Upload, Eye, Edit, Save, Send, Target, Globe, Briefcase, PieChart, LineChart } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  type: 'free' | 'starter' | 'professional' | 'enterprise' | 'custom';
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  features: {
    id: string;
    name: string;
    description: string;
    included: boolean;
    limit?: number;
  }[];
  limits: {
    users: number;
    projects: number;
    storage: string;
    apiCalls: number;
    support: string;
  };
  popular: boolean;
  cta: string;
  description: string;
  targetAudience: string;
  metrics: {
    signups: number;
    conversions: number;
    revenue: number;
    churn: number;
  };
}

interface EnterpriseDeal {
  id: string;
  company: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    title: string;
  };
  status: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  closeDate: Date;
  source: string;
  stage: string;
  notes: string;
  requirements: {
    users: number;
    features: string[];
    integrations: string[];
    compliance: string[];
    timeline: string;
  };
  timeline: {
    discovery: Date;
    demo: Date;
    proposal: Date;
    negotiation: Date;
    close: Date;
  };
  metrics: {
    dealSize: number;
    salesCycle: number;
    winRate: number;
    revenue: number;
  };
}

interface Partnership {
  id: string;
  name: string;
  type: 'technology' | 'channel' | 'strategic' | 'integration' | 'reseller';
  status: 'exploring' | 'negotiating' | 'active' | 'paused' | 'terminated';
  partner: {
    name: string;
    website: string;
    industry: string;
    size: string;
    location: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    title: string;
  };
  agreement: {
    startDate: Date;
    endDate: Date | null;
    terms: string[];
    revenue: {
      type: 'revenue-share' | 'referral-fee' | 'licensing' | 'custom';
      percentage: number;
      amount: number;
    };
    responsibilities: {
      partner: string[];
      syncscript: string[];
    };
  };
  metrics: {
    leads: number;
    conversions: number;
    revenue: number;
    satisfaction: number;
  };
  goals: {
    leads: number;
    revenue: number;
    integrations: number;
    coMarketing: number;
  };
}

interface RevenueModel {
  id: string;
  name: string;
  type: 'subscription' | 'usage-based' | 'freemium' | 'enterprise' | 'marketplace';
  description: string;
  pricing: {
    basePrice: number;
    perUserPrice: number;
    usagePrice: number;
    minimumCommit: number;
  };
  metrics: {
    mrr: number;
    arr: number;
    churn: number;
    ltv: number;
    cac: number;
  };
  projections: {
    month1: number;
    month3: number;
    month6: number;
    month12: number;
    year2: number;
    year3: number;
  };
  assumptions: {
    userGrowth: number;
    conversionRate: number;
    churnRate: number;
    priceIncrease: number;
  };
}

interface SalesPipeline {
  id: string;
  stage: string;
  deals: EnterpriseDeal[];
  metrics: {
    count: number;
    value: number;
    probability: number;
    expectedValue: number;
    avgDealSize: number;
    avgSalesCycle: number;
  };
  conversion: {
    fromStage: string;
    toStage: string;
    rate: number;
    avgTime: number;
  }[];
}

interface BusinessMetrics {
  id: string;
  period: string;
  revenue: {
    total: number;
    recurring: number;
    oneTime: number;
    growth: number;
  };
  customers: {
    total: number;
    new: number;
    churned: number;
    growth: number;
  };
  pricing: {
    avgRevenuePerUser: number;
    customerLifetimeValue: number;
    customerAcquisitionCost: number;
    paybackPeriod: number;
  };
  sales: {
    pipelineValue: number;
    closedWon: number;
    winRate: number;
    avgDealSize: number;
  };
  partnerships: {
    active: number;
    leads: number;
    revenue: number;
    satisfaction: number;
  };
}

const BusinessDevelopment: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [enterpriseDeals, setEnterpriseDeals] = useState<EnterpriseDeal[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [revenueModels, setRevenueModels] = useState<RevenueModel[]>([]);
  const [salesPipeline, setSalesPipeline] = useState<SalesPipeline[]>([]);
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics[]>([]);
  const [isCreatingDeal, setIsCreatingDeal] = useState(false);
  const [isNegotiatingPartnership, setIsNegotiatingPartnership] = useState(false);
  const [isAnalyzingRevenue, setIsAnalyzingRevenue] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<EnterpriseDeal | null>(null);
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);

  // Generate business data
  useEffect(() => {
    const generatePricingTiers = (): PricingTier[] => {
      return [
        {
          id: 'tier-1',
          name: 'Free',
          type: 'free',
          price: {
            monthly: 0,
            yearly: 0,
            currency: 'USD'
          },
          features: [
            { id: 'f1', name: 'Basic Task Management', description: 'Create and manage basic tasks', included: true },
            { id: 'f2', name: 'Energy Tracking', description: 'Track your energy levels', included: true },
            { id: 'f3', name: 'Basic Analytics', description: 'Simple productivity insights', included: true },
            { id: 'f4', name: 'Email Support', description: 'Email support during business hours', included: true },
            { id: 'f5', name: 'Mobile App', description: 'Access via mobile app', included: true },
            { id: 'f6', name: 'Team Collaboration', description: 'Basic team features', included: false },
            { id: 'f7', name: 'Advanced AI', description: 'AI-powered insights', included: false },
            { id: 'f8', name: 'Integrations', description: 'Third-party integrations', included: false }
          ],
          limits: {
            users: 1,
            projects: 3,
            storage: '1GB',
            apiCalls: 1000,
            support: 'Email'
          },
          popular: false,
          cta: 'Get Started Free',
          description: 'Perfect for individuals getting started with productivity',
          targetAudience: 'Individual users',
          metrics: {
            signups: 2500,
            conversions: 150,
            revenue: 0,
            churn: 15
          }
        },
        {
          id: 'tier-2',
          name: 'Starter',
          type: 'starter',
          price: {
            monthly: 9,
            yearly: 90,
            currency: 'USD'
          },
          features: [
            { id: 'f1', name: 'Everything in Free', description: 'All free features included', included: true },
            { id: 'f2', name: 'Team Collaboration', description: 'Up to 5 team members', included: true, limit: 5 },
            { id: 'f3', name: 'Advanced Analytics', description: 'Detailed productivity insights', included: true },
            { id: 'f4', name: 'Priority Support', description: 'Priority email and chat support', included: true },
            { id: 'f5', name: 'Basic Integrations', description: 'Connect with popular tools', included: true },
            { id: 'f6', name: 'Custom Themes', description: 'Personalize your workspace', included: true },
            { id: 'f7', name: 'Advanced AI', description: 'AI-powered insights', included: false },
            { id: 'f8', name: 'API Access', description: 'Full API access', included: false }
          ],
          limits: {
            users: 5,
            projects: 25,
            storage: '10GB',
            apiCalls: 10000,
            support: 'Priority'
          },
          popular: true,
          cta: 'Start Free Trial',
          description: 'Ideal for small teams and growing businesses',
          targetAudience: 'Small teams',
          metrics: {
            signups: 1200,
            conversions: 180,
            revenue: 1620,
            churn: 8
          }
        },
        {
          id: 'tier-3',
          name: 'Professional',
          type: 'professional',
          price: {
            monthly: 29,
            yearly: 290,
            currency: 'USD'
          },
          features: [
            { id: 'f1', name: 'Everything in Starter', description: 'All starter features included', included: true },
            { id: 'f2', name: 'Advanced AI', description: 'AI-powered insights and automation', included: true },
            { id: 'f3', name: 'API Access', description: 'Full API access and webhooks', included: true },
            { id: 'f4', name: 'Advanced Integrations', description: 'Connect with enterprise tools', included: true },
            { id: 'f5', name: 'Custom Workflows', description: 'Build custom automation', included: true },
            { id: 'f6', name: 'Advanced Analytics', description: 'Business intelligence dashboard', included: true },
            { id: 'f7', name: 'White-label', description: 'Custom branding options', included: false },
            { id: 'f8', name: 'SSO', description: 'Single sign-on integration', included: false }
          ],
          limits: {
            users: 25,
            projects: 100,
            storage: '100GB',
            apiCalls: 100000,
            support: 'Priority + Phone'
          },
          popular: false,
          cta: 'Start Free Trial',
          description: 'Perfect for growing teams and businesses',
          targetAudience: 'Growing teams',
          metrics: {
            signups: 800,
            conversions: 120,
            revenue: 3480,
            churn: 5
          }
        },
        {
          id: 'tier-4',
          name: 'Enterprise',
          type: 'enterprise',
          price: {
            monthly: 99,
            yearly: 990,
            currency: 'USD'
          },
          features: [
            { id: 'f1', name: 'Everything in Professional', description: 'All professional features included', included: true },
            { id: 'f2', name: 'White-label', description: 'Custom branding and domain', included: true },
            { id: 'f3', name: 'SSO', description: 'Single sign-on integration', included: true },
            { id: 'f4', name: 'Advanced Security', description: 'Enterprise-grade security', included: true },
            { id: 'f5', name: 'Dedicated Support', description: 'Dedicated customer success manager', included: true },
            { id: 'f6', name: 'Custom Integrations', description: 'Custom integrations and APIs', included: true },
            { id: 'f7', name: 'Compliance', description: 'SOC2, GDPR, HIPAA compliance', included: true },
            { id: 'f8', name: 'Training', description: 'Onboarding and training sessions', included: true }
          ],
          limits: {
            users: -1,
            projects: -1,
            storage: '1TB',
            apiCalls: -1,
            support: 'Dedicated'
          },
          popular: false,
          cta: 'Contact Sales',
          description: 'For large organizations with advanced needs',
          targetAudience: 'Large organizations',
          metrics: {
            signups: 150,
            conversions: 45,
            revenue: 4455,
            churn: 2
          }
        }
      ];
    };

    const generateEnterpriseDeals = (): EnterpriseDeal[] => {
      return [
        {
          id: 'deal-1',
          company: 'TechCorp Solutions',
          contact: {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@techcorp.com',
            phone: '+1 (555) 123-4567',
            title: 'VP of Operations'
          },
          status: 'proposal',
          value: 50000,
          probability: 75,
          closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          source: 'LinkedIn',
          stage: 'Proposal Review',
          notes: 'Strong interest in AI features and team collaboration. Budget approved, waiting for final decision.',
          requirements: {
            users: 150,
            features: ['Advanced AI', 'SSO', 'Custom Integrations', 'White-label'],
            integrations: ['Slack', 'Microsoft Teams', 'Salesforce', 'Jira'],
            compliance: ['SOC2', 'GDPR'],
            timeline: 'Q1 2024'
          },
          timeline: {
            discovery: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
            demo: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            proposal: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            negotiation: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            close: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          },
          metrics: {
            dealSize: 50000,
            salesCycle: 75,
            winRate: 75,
            revenue: 37500
          }
        },
        {
          id: 'deal-2',
          company: 'Global Manufacturing Inc',
          contact: {
            name: 'Michael Chen',
            email: 'michael.chen@gmi.com',
            phone: '+1 (555) 987-6543',
            title: 'CTO'
          },
          status: 'negotiation',
          value: 75000,
          probability: 60,
          closeDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          source: 'Industry Event',
          stage: 'Contract Negotiation',
          notes: 'Large enterprise deal. Interested in custom integrations and compliance features.',
          requirements: {
            users: 500,
            features: ['Enterprise Security', 'Custom Workflows', 'Advanced Analytics'],
            integrations: ['SAP', 'Oracle', 'Microsoft Dynamics'],
            compliance: ['SOC2', 'ISO27001', 'HIPAA'],
            timeline: 'Q2 2024'
          },
          timeline: {
            discovery: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            demo: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
            proposal: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
            negotiation: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            close: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
          },
          metrics: {
            dealSize: 75000,
            salesCycle: 105,
            winRate: 60,
            revenue: 45000
          }
        },
        {
          id: 'deal-3',
          company: 'StartupIO',
          contact: {
            name: 'Emma Davis',
            email: 'emma.davis@startupio.com',
            phone: '+1 (555) 456-7890',
            title: 'Head of Product'
          },
          status: 'qualified',
          value: 25000,
          probability: 40,
          closeDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          source: 'Referral',
          stage: 'Discovery',
          notes: 'Early-stage startup. Budget constraints but high growth potential.',
          requirements: {
            users: 25,
            features: ['Team Collaboration', 'Basic AI', 'Integrations'],
            integrations: ['Slack', 'GitHub', 'Figma'],
            compliance: ['Basic Security'],
            timeline: 'Q1 2024'
          },
          timeline: {
            discovery: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
            demo: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            proposal: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            negotiation: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
            close: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
          },
          metrics: {
            dealSize: 25000,
            salesCycle: 75,
            winRate: 40,
            revenue: 10000
          }
        }
      ];
    };

    const generatePartnerships = (): Partnership[] => {
      return [
        {
          id: 'partnership-1',
          name: 'Slack Integration Partnership',
          type: 'integration',
          status: 'active',
          partner: {
            name: 'Slack Technologies',
            website: 'slack.com',
            industry: 'Communication',
            size: 'Enterprise',
            location: 'San Francisco, CA'
          },
          contact: {
            name: 'David Wilson',
            email: 'david.wilson@slack.com',
            phone: '+1 (555) 111-2222',
            title: 'Partnership Manager'
          },
          agreement: {
            startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 275 * 24 * 60 * 60 * 1000),
            terms: [
              'Mutual integration promotion',
              'Co-marketing opportunities',
              'Technical support collaboration',
              'Revenue sharing agreement'
            ],
            revenue: {
              type: 'revenue-share',
              percentage: 15,
              amount: 5000
            },
            responsibilities: {
              partner: [
                'Provide API access',
                'Promote integration',
                'Technical support',
                'Co-marketing activities'
              ],
              syncscript: [
                'Develop integration',
                'Maintain compatibility',
                'Customer support',
                'Marketing materials'
              ]
            }
          },
          metrics: {
            leads: 250,
            conversions: 45,
            revenue: 5000,
            satisfaction: 9.2
          },
          goals: {
            leads: 500,
            revenue: 10000,
            integrations: 100,
            coMarketing: 5
          }
        },
        {
          id: 'partnership-2',
          name: 'Microsoft Teams Channel Partnership',
          type: 'channel',
          status: 'negotiating',
          partner: {
            name: 'Microsoft Corporation',
            website: 'microsoft.com',
            industry: 'Technology',
            size: 'Enterprise',
            location: 'Redmond, WA'
          },
          contact: {
            name: 'Lisa Anderson',
            email: 'lisa.anderson@microsoft.com',
            phone: '+1 (555) 333-4444',
            title: 'Channel Partner Manager'
          },
          agreement: {
            startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            terms: [
              'Channel partner program',
              'Reseller agreement',
              'Technical certification',
              'Marketing support'
            ],
            revenue: {
              type: 'referral-fee',
              percentage: 20,
              amount: 0
            },
            responsibilities: {
              partner: [
                'Reseller certification',
                'Sales training',
                'Marketing support',
                'Technical support'
              ],
              syncscript: [
                'Product training',
                'Sales enablement',
                'Marketing materials',
                'Technical documentation'
              ]
            }
          },
          metrics: {
            leads: 0,
            conversions: 0,
            revenue: 0,
            satisfaction: 0
          },
          goals: {
            leads: 1000,
            revenue: 50000,
            integrations: 200,
            coMarketing: 10
          }
        },
        {
          id: 'partnership-3',
          name: 'Consulting Firm Strategic Partnership',
          type: 'strategic',
          status: 'active',
          partner: {
            name: 'Productivity Consulting Group',
            website: 'pcg.com',
            industry: 'Consulting',
            size: 'Mid-market',
            location: 'New York, NY'
          },
          contact: {
            name: 'Robert Taylor',
            email: 'robert.taylor@pcg.com',
            phone: '+1 (555) 555-6666',
            title: 'Managing Partner'
          },
          agreement: {
            startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            endDate: null,
            terms: [
              'Strategic partnership',
              'Joint go-to-market',
              'Customer referrals',
              'Knowledge sharing'
            ],
            revenue: {
              type: 'referral-fee',
              percentage: 25,
              amount: 15000
            },
            responsibilities: {
              partner: [
                'Customer referrals',
                'Implementation services',
                'Training and support',
                'Market insights'
              ],
              syncscript: [
                'Product access',
                'Sales support',
                'Marketing collaboration',
                'Technical training'
              ]
            }
          },
          metrics: {
            leads: 150,
            conversions: 25,
            revenue: 15000,
            satisfaction: 8.8
          },
          goals: {
            leads: 300,
            revenue: 30000,
            integrations: 50,
            coMarketing: 8
          }
        }
      ];
    };

    const generateRevenueModels = (): RevenueModel[] => {
      return [
        {
          id: 'model-1',
          name: 'SaaS Subscription',
          type: 'subscription',
          description: 'Monthly and annual subscription plans with tiered pricing',
          pricing: {
            basePrice: 9,
            perUserPrice: 5,
            usagePrice: 0.01,
            minimumCommit: 0
          },
          metrics: {
            mrr: 25000,
            arr: 300000,
            churn: 5,
            ltv: 1800,
            cac: 150
          },
          projections: {
            month1: 25000,
            month3: 75000,
            month6: 150000,
            month12: 300000,
            year2: 600000,
            year3: 1200000
          },
          assumptions: {
            userGrowth: 20,
            conversionRate: 15,
            churnRate: 5,
            priceIncrease: 10
          }
        },
        {
          id: 'model-2',
          name: 'Enterprise Licensing',
          type: 'enterprise',
          description: 'Custom enterprise deals with volume discounts and dedicated support',
          pricing: {
            basePrice: 99,
            perUserPrice: 25,
            usagePrice: 0.05,
            minimumCommit: 10000
          },
          metrics: {
            mrr: 15000,
            arr: 180000,
            churn: 2,
            ltv: 9000,
            cac: 500
          },
          projections: {
            month1: 15000,
            month3: 45000,
            month6: 90000,
            month12: 180000,
            year2: 360000,
            year3: 720000
          },
          assumptions: {
            userGrowth: 10,
            conversionRate: 25,
            churnRate: 2,
            priceIncrease: 5
          }
        }
      ];
    };

    const generateSalesPipeline = (): SalesPipeline[] => {
      return [
        {
          id: 'pipeline-1',
          stage: 'Prospect',
          deals: enterpriseDeals.filter(d => d.status === 'prospect'),
          metrics: {
            count: 25,
            value: 500000,
            probability: 20,
            expectedValue: 100000,
            avgDealSize: 20000,
            avgSalesCycle: 90
          },
          conversion: [
            { fromStage: 'Prospect', toStage: 'Qualified', rate: 40, avgTime: 14 },
            { fromStage: 'Qualified', toStage: 'Proposal', rate: 60, avgTime: 21 },
            { fromStage: 'Proposal', toStage: 'Negotiation', rate: 50, avgTime: 30 },
            { fromStage: 'Negotiation', toStage: 'Closed-Won', rate: 70, avgTime: 45 }
          ]
        },
        {
          id: 'pipeline-2',
          stage: 'Qualified',
          deals: enterpriseDeals.filter(d => d.status === 'qualified'),
          metrics: {
            count: 15,
            value: 300000,
            probability: 40,
            expectedValue: 120000,
            avgDealSize: 20000,
            avgSalesCycle: 75
          },
          conversion: []
        },
        {
          id: 'pipeline-3',
          stage: 'Proposal',
          deals: enterpriseDeals.filter(d => d.status === 'proposal'),
          metrics: {
            count: 8,
            value: 200000,
            probability: 75,
            expectedValue: 150000,
            avgDealSize: 25000,
            avgSalesCycle: 60
          },
          conversion: []
        },
        {
          id: 'pipeline-4',
          stage: 'Negotiation',
          deals: enterpriseDeals.filter(d => d.status === 'negotiation'),
          metrics: {
            count: 5,
            value: 150000,
            probability: 60,
            expectedValue: 90000,
            avgDealSize: 30000,
            avgSalesCycle: 45
          },
          conversion: []
        }
      ];
    };

    const generateBusinessMetrics = (): BusinessMetrics[] => {
      return [
        {
          id: 'metrics-1',
          period: 'Last 30 Days',
          revenue: {
            total: 45000,
            recurring: 40000,
            oneTime: 5000,
            growth: 25
          },
          customers: {
            total: 1250,
            new: 150,
            churned: 25,
            growth: 12
          },
          pricing: {
            avgRevenuePerUser: 36,
            customerLifetimeValue: 1800,
            customerAcquisitionCost: 150,
            paybackPeriod: 4.2
          },
          sales: {
            pipelineValue: 1500000,
            closedWon: 125000,
            winRate: 35,
            avgDealSize: 25000
          },
          partnerships: {
            active: 3,
            leads: 400,
            revenue: 20000,
            satisfaction: 9.0
          }
        }
      ];
    };

    setPricingTiers(generatePricingTiers());
    setEnterpriseDeals(generateEnterpriseDeals());
    setPartnerships(generatePartnerships());
    setRevenueModels(generateRevenueModels());
    setSalesPipeline(generateSalesPipeline());
    setBusinessMetrics(generateBusinessMetrics());
  }, []);

  const createEnterpriseDeal = async () => {
    setIsCreatingDeal(true);
    
    // Simulate deal creation
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Add new deal
    const newDeal: EnterpriseDeal = {
      id: `deal-${Date.now()}`,
      company: 'New Enterprise Client',
      contact: {
        name: 'New Contact',
        email: 'contact@company.com',
        phone: '+1 (555) 000-0000',
        title: 'Decision Maker'
      },
      status: 'prospect',
      value: 30000,
      probability: 30,
      closeDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      source: 'Marketing',
      stage: 'Initial Contact',
      notes: 'New enterprise prospect',
      requirements: {
        users: 50,
        features: ['Team Collaboration', 'Basic AI'],
        integrations: ['Slack'],
        compliance: ['Basic Security'],
        timeline: 'Q2 2024'
      },
      timeline: {
        discovery: new Date(),
        demo: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        proposal: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        negotiation: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        close: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      },
      metrics: {
        dealSize: 30000,
        salesCycle: 90,
        winRate: 30,
        revenue: 9000
      }
    };
    
    setEnterpriseDeals(prev => [...prev, newDeal]);
    setIsCreatingDeal(false);
  };

  const negotiatePartnership = async () => {
    setIsNegotiatingPartnership(true);
    
    // Simulate partnership negotiation
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update partnership status
    setPartnerships(prev => prev.map(partnership => 
      partnership.status === 'negotiating' 
        ? { 
            ...partnership, 
            status: 'active' as const,
            agreement: {
              ...partnership.agreement,
              startDate: new Date()
            }
          }
        : partnership
    ));
    
    setIsNegotiatingPartnership(false);
  };

  const analyzeRevenue = async () => {
    setIsAnalyzingRevenue(true);
    
    // Simulate revenue analysis
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    setIsAnalyzingRevenue(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': case 'closed-won': case 'published': return 'bg-green-100 text-green-800';
      case 'prospect': case 'qualified': case 'proposal': case 'negotiating': case 'draft': return 'bg-blue-100 text-blue-800';
      case 'negotiation': case 'review': case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'paused': case 'archived': return 'bg-orange-100 text-orange-800';
      case 'closed-lost': case 'terminated': case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'starter': return 'bg-blue-100 text-blue-800';
      case 'professional': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-orange-100 text-orange-800';
      case 'custom': return 'bg-pink-100 text-pink-800';
      case 'technology': return 'bg-blue-100 text-blue-800';
      case 'channel': return 'bg-green-100 text-green-800';
      case 'strategic': return 'bg-purple-100 text-purple-800';
      case 'integration': return 'bg-orange-100 text-orange-800';
      case 'reseller': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = businessMetrics[0]?.revenue.total || 0;
  const totalCustomers = businessMetrics[0]?.customers.total || 0;
  const pipelineValue = businessMetrics[0]?.sales.pipelineValue || 0;
  const activePartnerships = partnerships.filter(p => p.status === 'active').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">💼 Business Development</h2>
              <p className="text-green-100 mt-1">Pricing strategies, enterprise sales, partnerships, and revenue optimization</p>
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
          {/* Business Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-800">${totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">Monthly revenue</p>
                </div>
                <DollarSign className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Customers</p>
                  <p className="text-2xl font-bold text-blue-800">{totalCustomers.toLocaleString()}</p>
                  <p className="text-xs text-blue-600">Active customers</p>
                </div>
                <Users className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Sales Pipeline</p>
                  <p className="text-2xl font-bold text-purple-800">${pipelineValue.toLocaleString()}</p>
                  <p className="text-xs text-purple-600">Pipeline value</p>
                </div>
                <TrendingUp className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Partnerships</p>
                  <p className="text-2xl font-bold text-orange-800">{activePartnerships}</p>
                  <p className="text-xs text-orange-600">Active partnerships</p>
                </div>
                <Handshake className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* Business Actions */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6 border-2 border-green-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-green-700 font-medium">
                💼 Business Development Active - Driving revenue growth and strategic partnerships!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={createEnterpriseDeal}
                  disabled={isCreatingDeal}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingDeal ? '⏳ Creating...' : '💼 Create Deal'}
                </button>
                <button
                  onClick={negotiatePartnership}
                  disabled={isNegotiatingPartnership}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isNegotiatingPartnership ? '⏳ Negotiating...' : '🤝 Negotiate Partnership'}
                </button>
                <button
                  onClick={analyzeRevenue}
                  disabled={isAnalyzingRevenue}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isAnalyzingRevenue ? '⏳ Analyzing...' : '📊 Analyze Revenue'}
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <DollarSign className="mr-2 text-green-600" />
              Pricing Tiers ({pricingTiers.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pricingTiers.map((tier) => (
                <div key={tier.id} className={`bg-gray-50 rounded-lg p-4 ${tier.popular ? 'ring-2 ring-green-500' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{tier.name}</h4>
                      <p className="text-sm text-gray-600">{tier.description}</p>
                    </div>
                    {tier.popular && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-gray-900">
                      ${tier.price.monthly}
                      <span className="text-sm font-normal text-gray-600">/month</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      ${tier.price.yearly}/year (Save {Math.round((1 - tier.price.yearly / (tier.price.monthly * 12)) * 100)}%)
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {tier.features.slice(0, 4).map((feature) => (
                      <div key={feature.id} className="flex items-center text-sm">
                        <CheckCircle className={`w-4 h-4 mr-2 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    <div>Users: {tier.limits.users === -1 ? 'Unlimited' : tier.limits.users}</div>
                    <div>Storage: {tier.limits.storage}</div>
                    <div>Support: {tier.limits.support}</div>
                  </div>

                  <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    tier.popular 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}>
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Deals */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Briefcase className="mr-2 text-blue-600" />
              Enterprise Deals ({enterpriseDeals.length})
            </h3>
            <div className="space-y-4">
              {enterpriseDeals.map((deal) => (
                <div key={deal.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{deal.company}</h4>
                      <p className="text-sm text-gray-600">{deal.contact.name} - {deal.contact.title}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deal.status)}`}>
                        {deal.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        ${deal.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Value:</span>
                      <span className="font-medium text-gray-900 ml-1">${deal.value.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Probability:</span>
                      <span className="font-medium text-gray-900 ml-1">{deal.probability}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Expected:</span>
                      <span className="font-medium text-gray-900 ml-1">${deal.metrics.revenue.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Close Date:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatDate(deal.closeDate)}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Source:</span> {deal.source} | 
                    <span className="font-medium ml-2">Stage:</span> {deal.stage} | 
                    <span className="font-medium ml-2">Users:</span> {deal.requirements.users}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnerships */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Handshake className="mr-2 text-purple-600" />
              Strategic Partnerships ({partnerships.length})
            </h3>
            <div className="space-y-4">
              {partnerships.map((partnership) => (
                <div key={partnership.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{partnership.name}</h4>
                      <p className="text-sm text-gray-600">{partnership.partner.name} - {partnership.partner.industry}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(partnership.type)}`}>
                        {partnership.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(partnership.status)}`}>
                        {partnership.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Leads:</span>
                      <span className="font-medium text-gray-900 ml-1">{partnership.metrics.leads}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Conversions:</span>
                      <span className="font-medium text-gray-900 ml-1">{partnership.metrics.conversions}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-gray-900 ml-1">${partnership.metrics.revenue.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Satisfaction:</span>
                      <span className="font-medium text-gray-900 ml-1">{partnership.metrics.satisfaction}/10</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Contact:</span> {partnership.contact.name} | 
                    <span className="font-medium ml-2">Revenue Type:</span> {partnership.agreement.revenue.type} | 
                    <span className="font-medium ml-2">Percentage:</span> {partnership.agreement.revenue.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="mr-2 text-orange-600" />
              Business Metrics
            </h3>
            {businessMetrics.map((metrics) => (
              <div key={metrics.id} className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-800">${metrics.revenue.total.toLocaleString()}</div>
                    <div className="text-sm text-green-600">Total Revenue</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-800">{metrics.customers.total}</div>
                    <div className="text-sm text-blue-600">Total Customers</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-800">${metrics.pricing.avgRevenuePerUser}</div>
                    <div className="text-sm text-purple-600">ARPU</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-800">{metrics.sales.winRate}%</div>
                    <div className="text-sm text-orange-600">Win Rate</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Performance Indicators</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-900">Customer LTV</div>
                      <div className="text-gray-600">${metrics.pricing.customerLifetimeValue}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Customer CAC</div>
                      <div className="text-gray-600">${metrics.pricing.customerAcquisitionCost}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Payback Period</div>
                      <div className="text-gray-600">{metrics.pricing.paybackPeriod} months</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Avg Deal Size</div>
                      <div className="text-gray-600">${metrics.sales.avgDealSize.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessDevelopment;
