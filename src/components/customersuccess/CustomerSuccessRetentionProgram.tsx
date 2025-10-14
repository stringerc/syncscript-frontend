import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Heart, TrendingUp, AlertTriangle, CheckCircle, Clock, Target, Mail, Phone, Calendar, Star, Award, Zap, BarChart3, PieChart, LineChart, Activity, Shield, UserCheck, MessageCircle, Gift, Trophy, Crown, Sparkles, Bell, Settings, Play, Pause, Stop, RefreshCw, Download, Upload, Eye, Edit, Save, Send, Filter, Search, Plus, Minus, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Maximize, Minimize } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'at-risk' | 'churned' | 'expanding';
  healthScore: number;
  onboardingProgress: number;
  lastActivity: Date;
  signupDate: Date;
  renewalDate: Date;
  mrr: number;
  ltv: number;
  usage: {
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    featuresUsed: string[];
    apiCalls: number;
    storageUsed: number;
  };
  support: {
    ticketsOpen: number;
    ticketsResolved: number;
    satisfactionScore: number;
    lastInteraction: Date;
  };
  engagement: {
    loginFrequency: number;
    sessionDuration: number;
    featureAdoption: number;
    teamGrowth: number;
  };
  risks: {
    type: 'usage' | 'support' | 'payment' | 'competition' | 'technical';
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    detectedDate: Date;
    resolved: boolean;
  }[];
  opportunities: {
    type: 'upsell' | 'expansion' | 'referral' | 'advocacy';
    potential: number;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }[];
}

interface RetentionCampaign {
  id: string;
  name: string;
  type: 'onboarding' | 'engagement' | 'retention' | 'win-back' | 'expansion';
  status: 'draft' | 'active' | 'paused' | 'completed';
  targetSegment: string;
  triggers: {
    condition: string;
    value: number;
    timeframe: string;
  }[];
  channels: {
    email: boolean;
    inApp: boolean;
    phone: boolean;
    sms: boolean;
  };
  content: {
    subject: string;
    message: string;
    cta: string;
    personalization: string[];
  };
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
    revenue: number;
  };
  schedule: {
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    startDate: Date;
    endDate: Date;
    timeOfDay: string;
  };
  successCriteria: {
    metric: string;
    target: number;
    timeframe: string;
  }[];
}

interface CustomerSuccessWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    event: 'signup' | 'first-login' | 'feature-usage' | 'support-ticket' | 'payment-failed' | 'inactivity';
    conditions: any[];
  };
  actions: {
    type: 'email' | 'in-app-message' | 'phone-call' | 'task-assignment' | 'slack-notification';
    template: string;
    delay: number;
    assignedTo: string;
  }[];
  conditions: {
    segment: string;
    healthScore: number;
    plan: string;
    lastActivity: number;
  };
  metrics: {
    executions: number;
    successRate: number;
    revenueImpact: number;
    customerSatisfaction: number;
  };
  status: 'active' | 'paused' | 'draft';
  lastRun: Date;
  nextRun: Date;
}

interface HealthScore {
  customerId: string;
  score: number;
  factors: {
    usage: number;
    engagement: number;
    support: number;
    payment: number;
    growth: number;
  };
  trend: 'improving' | 'stable' | 'declining';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  lastUpdated: Date;
}

interface RetentionMetrics {
  period: string;
  metrics: {
    churnRate: number;
    retentionRate: number;
    expansionRate: number;
    netPromoterScore: number;
    customerSatisfactionScore: number;
    timeToValue: number;
    featureAdoptionRate: number;
    supportTicketVolume: number;
  };
  trends: {
    churnTrend: number[];
    retentionTrend: number[];
    expansionTrend: number[];
    satisfactionTrend: number[];
  };
  segments: {
    free: number;
    pro: number;
    enterprise: number;
  };
  cohorts: {
    month: string;
    retention: number[];
  }[];
}

interface SuccessPlaybook {
  id: string;
  name: string;
  description: string;
  category: 'onboarding' | 'adoption' | 'retention' | 'expansion' | 'advocacy';
  steps: {
    order: number;
    action: string;
    description: string;
    duration: string;
    owner: string;
    successCriteria: string;
  }[];
  templates: {
    email: string[];
    inApp: string[];
    phone: string[];
  };
  metrics: {
    usageRate: number;
    successRate: number;
    timeToComplete: number;
    customerSatisfaction: number;
  };
  tags: string[];
  lastUsed: Date;
  usageCount: number;
}

const CustomerSuccessRetentionProgram: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [retentionCampaigns, setRetentionCampaigns] = useState<RetentionCampaign[]>([]);
  const [workflows, setWorkflows] = useState<CustomerSuccessWorkflow[]>([]);
  const [healthScores, setHealthScores] = useState<HealthScore[]>([]);
  const [retentionMetrics, setRetentionMetrics] = useState<RetentionMetrics[]>([]);
  const [successPlaybooks, setSuccessPlaybooks] = useState<SuccessPlaybook[]>([]);
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [isCalculatingHealth, setIsCalculatingHealth] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<RetentionCampaign | null>(null);

  // Generate customer success data
  useEffect(() => {
    const generateCustomers = (): Customer[] => {
      return [
        {
          id: 'customer-1',
          name: 'Sarah Johnson',
          email: 'sarah@techcorp.com',
          company: 'TechCorp Solutions',
          plan: 'enterprise',
          status: 'active',
          healthScore: 85,
          onboardingProgress: 95,
          lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
          signupDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
          renewalDate: new Date(Date.now() + 275 * 24 * 60 * 60 * 1000),
          mrr: 2500,
          ltv: 45000,
          usage: {
            dailyActiveUsers: 45,
            monthlyActiveUsers: 120,
            featuresUsed: ['task-management', 'analytics', 'collaboration', 'integrations'],
            apiCalls: 15000,
            storageUsed: 250
          },
          support: {
            ticketsOpen: 0,
            ticketsResolved: 12,
            satisfactionScore: 4.8,
            lastInteraction: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          },
          engagement: {
            loginFrequency: 5.2,
            sessionDuration: 45,
            featureAdoption: 78,
            teamGrowth: 15
          },
          risks: [],
          opportunities: [
            {
              type: 'expansion',
              potential: 5000,
              description: 'Additional team members ready to onboard',
              priority: 'high'
            }
          ]
        },
        {
          id: 'customer-2',
          name: 'Mike Chen',
          email: 'mike@startup.io',
          company: 'StartupIO',
          plan: 'pro',
          status: 'at-risk',
          healthScore: 45,
          onboardingProgress: 60,
          lastActivity: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          signupDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
          renewalDate: new Date(Date.now() + 320 * 24 * 60 * 60 * 1000),
          mrr: 299,
          ltv: 3588,
          usage: {
            dailyActiveUsers: 3,
            monthlyActiveUsers: 8,
            featuresUsed: ['task-management'],
            apiCalls: 500,
            storageUsed: 25
          },
          support: {
            ticketsOpen: 2,
            ticketsResolved: 3,
            satisfactionScore: 3.2,
            lastInteraction: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
          },
          engagement: {
            loginFrequency: 1.2,
            sessionDuration: 15,
            featureAdoption: 25,
            teamGrowth: 0
          },
          risks: [
            {
              type: 'usage',
              severity: 'high',
              description: 'Low feature adoption and engagement',
              detectedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              resolved: false
            },
            {
              type: 'support',
              severity: 'medium',
              description: 'Multiple unresolved support tickets',
              detectedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
              resolved: false
            }
          ],
          opportunities: []
        },
        {
          id: 'customer-3',
          name: 'Emma Davis',
          email: 'emma@enterprise.com',
          company: 'Enterprise Corp',
          plan: 'enterprise',
          status: 'expanding',
          healthScore: 95,
          onboardingProgress: 100,
          lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
          signupDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
          renewalDate: new Date(Date.now() + 185 * 24 * 60 * 60 * 1000),
          mrr: 5000,
          ltv: 90000,
          usage: {
            dailyActiveUsers: 120,
            monthlyActiveUsers: 300,
            featuresUsed: ['task-management', 'analytics', 'collaboration', 'integrations', 'api', 'white-label'],
            apiCalls: 50000,
            storageUsed: 1000
          },
          support: {
            ticketsOpen: 1,
            ticketsResolved: 25,
            satisfactionScore: 4.9,
            lastInteraction: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
          },
          engagement: {
            loginFrequency: 6.8,
            sessionDuration: 65,
            featureAdoption: 95,
            teamGrowth: 40
          },
          risks: [],
          opportunities: [
            {
              type: 'upsell',
              potential: 10000,
              description: 'Additional enterprise features and integrations',
              priority: 'critical'
            },
            {
              type: 'referral',
              potential: 5000,
              description: 'High satisfaction customer willing to refer',
              priority: 'high'
            }
          ]
        }
      ];
    };

    const generateRetentionCampaigns = (): RetentionCampaign[] => {
      return [
        {
          id: 'campaign-1',
          name: 'Onboarding Success Campaign',
          type: 'onboarding',
          status: 'active',
          targetSegment: 'new-customers',
          triggers: [
            {
              condition: 'signup_date',
              value: 1,
              timeframe: 'days'
            }
          ],
          channels: {
            email: true,
            inApp: true,
            phone: false,
            sms: false
          },
          content: {
            subject: 'Welcome to SyncScript! Let\'s get you started',
            message: 'We\'re excited to have you on board. Here\'s your personalized onboarding plan.',
            cta: 'Start Your Journey',
            personalization: ['name', 'company', 'plan']
          },
          metrics: {
            sent: 150,
            opened: 120,
            clicked: 85,
            converted: 45,
            revenue: 13500
          },
          schedule: {
            frequency: 'once',
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            timeOfDay: '09:00'
          },
          successCriteria: [
            {
              metric: 'onboarding_completion',
              target: 80,
              timeframe: '30 days'
            }
          ]
        },
        {
          id: 'campaign-2',
          name: 'Engagement Recovery Campaign',
          type: 'retention',
          status: 'active',
          targetSegment: 'low-engagement',
          triggers: [
            {
              condition: 'last_login',
              value: 7,
              timeframe: 'days'
            }
          ],
          channels: {
            email: true,
            inApp: true,
            phone: true,
            sms: false
          },
          content: {
            subject: 'We miss you! Here\'s what\'s new in SyncScript',
            message: 'Come back and discover new features that can boost your productivity.',
            cta: 'Explore New Features',
            personalization: ['name', 'last_activity', 'recommended_features']
          },
          metrics: {
            sent: 75,
            opened: 45,
            clicked: 25,
            converted: 12,
            revenue: 3600
          },
          schedule: {
            frequency: 'weekly',
            startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            timeOfDay: '10:00'
          },
          successCriteria: [
            {
              metric: 're-engagement_rate',
              target: 60,
              timeframe: '14 days'
            }
          ]
        }
      ];
    };

    const generateWorkflows = (): CustomerSuccessWorkflow[] => {
      return [
        {
          id: 'workflow-1',
          name: 'New Customer Onboarding',
          description: 'Automated workflow for new customer onboarding',
          trigger: {
            event: 'signup',
            conditions: []
          },
          actions: [
            {
              type: 'email',
              template: 'welcome-email',
              delay: 0,
              assignedTo: 'Customer Success Team'
            },
            {
              type: 'in-app-message',
              template: 'onboarding-tour',
              delay: 3600,
              assignedTo: 'System'
            },
            {
              type: 'task-assignment',
              template: 'onboarding-call',
              delay: 86400,
              assignedTo: 'Customer Success Manager'
            }
          ],
          conditions: {
            segment: 'new-customers',
            healthScore: 0,
            plan: 'all',
            lastActivity: 0
          },
          metrics: {
            executions: 150,
            successRate: 85,
            revenueImpact: 22500,
            customerSatisfaction: 4.6
          },
          status: 'active',
          lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
          nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000)
        },
        {
          id: 'workflow-2',
          name: 'At-Risk Customer Recovery',
          description: 'Automated workflow for at-risk customer recovery',
          trigger: {
            event: 'inactivity',
            conditions: [
              { healthScore: 50, days: 7 }
            ]
          },
          actions: [
            {
              type: 'email',
              template: 're-engagement-email',
              delay: 0,
              assignedTo: 'Customer Success Team'
            },
            {
              type: 'phone-call',
              template: 'recovery-call',
              delay: 86400,
              assignedTo: 'Customer Success Manager'
            },
            {
              type: 'slack-notification',
              template: 'escalation-notification',
              delay: 172800,
              assignedTo: 'Customer Success Team'
            }
          ],
          conditions: {
            segment: 'at-risk-customers',
            healthScore: 50,
            plan: 'all',
            lastActivity: 7
          },
          metrics: {
            executions: 25,
            successRate: 72,
            revenueImpact: 7500,
            customerSatisfaction: 4.2
          },
          status: 'active',
          lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
          nextRun: new Date(Date.now() + 20 * 60 * 60 * 1000)
        }
      ];
    };

    const generateHealthScores = (): HealthScore[] => {
      return [
        {
          customerId: 'customer-1',
          score: 85,
          factors: {
            usage: 90,
            engagement: 85,
            support: 95,
            payment: 100,
            growth: 80
          },
          trend: 'improving',
          riskLevel: 'low',
          recommendations: [
            'Continue current engagement strategy',
            'Explore expansion opportunities',
            'Maintain high support satisfaction'
          ],
          lastUpdated: new Date()
        },
        {
          customerId: 'customer-2',
          score: 45,
          factors: {
            usage: 30,
            engagement: 25,
            support: 40,
            payment: 80,
            growth: 20
          },
          trend: 'declining',
          riskLevel: 'high',
          recommendations: [
            'Immediate intervention required',
            'Schedule recovery call',
            'Provide additional training',
            'Offer personalized support'
          ],
          lastUpdated: new Date()
        },
        {
          customerId: 'customer-3',
          score: 95,
          factors: {
            usage: 98,
            engagement: 95,
            support: 90,
            payment: 100,
            growth: 95
          },
          trend: 'improving',
          riskLevel: 'low',
          recommendations: [
            'Identify expansion opportunities',
            'Request customer testimonial',
            'Explore referral program',
            'Consider case study development'
          ],
          lastUpdated: new Date()
        }
      ];
    };

    const generateRetentionMetrics = (): RetentionMetrics[] => {
      return [
        {
          period: 'Last 30 Days',
          metrics: {
            churnRate: 2.8,
            retentionRate: 97.2,
            expansionRate: 15.5,
            netPromoterScore: 8.2,
            customerSatisfactionScore: 4.6,
            timeToValue: 14,
            featureAdoptionRate: 72,
            supportTicketVolume: 45
          },
          trends: {
            churnTrend: [3.2, 2.9, 2.8, 2.6, 2.8],
            retentionTrend: [96.8, 97.1, 97.2, 97.4, 97.2],
            expansionTrend: [12.5, 14.2, 15.5, 16.8, 15.5],
            satisfactionTrend: [4.4, 4.5, 4.6, 4.7, 4.6]
          },
          segments: {
            free: 85,
            pro: 92,
            enterprise: 98
          },
          cohorts: [
            { month: 'Jan 2024', retention: [100, 95, 90, 88, 85, 82] },
            { month: 'Feb 2024', retention: [100, 96, 92, 89, 86, 83] },
            { month: 'Mar 2024', retention: [100, 97, 94, 91, 88, 85] }
          ]
        }
      ];
    };

    const generateSuccessPlaybooks = (): SuccessPlaybook[] => {
      return [
        {
          id: 'playbook-1',
          name: 'Enterprise Onboarding Playbook',
          description: 'Comprehensive onboarding process for enterprise customers',
          category: 'onboarding',
          steps: [
            {
              order: 1,
              action: 'Welcome Call',
              description: 'Schedule and conduct welcome call with key stakeholders',
              duration: '1 hour',
              owner: 'Customer Success Manager',
              successCriteria: 'All stakeholders identified and engaged'
            },
            {
              order: 2,
              action: 'Technical Setup',
              description: 'Configure integrations and technical requirements',
              duration: '2-3 days',
              owner: 'Technical Success Manager',
              successCriteria: 'All integrations working and tested'
            },
            {
              order: 3,
              action: 'Team Training',
              description: 'Conduct comprehensive team training sessions',
              duration: '1 week',
              owner: 'Training Specialist',
              successCriteria: '80% of team members trained and active'
            },
            {
              order: 4,
              action: 'Success Planning',
              description: 'Create personalized success plan and milestones',
              duration: '2 days',
              owner: 'Customer Success Manager',
              successCriteria: 'Success plan documented and approved'
            }
          ],
          templates: {
            email: ['welcome-enterprise', 'training-schedule', 'success-plan'],
            inApp: ['enterprise-tour', 'feature-highlights', 'milestone-tracker'],
            phone: ['welcome-call', 'training-follow-up', 'success-review']
          },
          metrics: {
            usageRate: 95,
            successRate: 88,
            timeToComplete: 14,
            customerSatisfaction: 4.7
          },
          tags: ['enterprise', 'onboarding', 'high-touch'],
          lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          usageCount: 25
        },
        {
          id: 'playbook-2',
          name: 'Feature Adoption Playbook',
          description: 'Systematic approach to drive feature adoption',
          category: 'adoption',
          steps: [
            {
              order: 1,
              action: 'Usage Analysis',
              description: 'Analyze current usage patterns and identify gaps',
              duration: '1 day',
              owner: 'Customer Success Manager',
              successCriteria: 'Usage gaps identified and prioritized'
            },
            {
              order: 2,
              action: 'Feature Education',
              description: 'Provide targeted education on underutilized features',
              duration: '3 days',
              owner: 'Training Specialist',
              successCriteria: 'Team educated on key features'
            },
            {
              order: 3,
              action: 'Implementation Support',
              description: 'Provide hands-on support for feature implementation',
              duration: '1 week',
              owner: 'Technical Success Manager',
              successCriteria: 'Features successfully implemented'
            },
            {
              order: 4,
              action: 'Adoption Tracking',
              description: 'Monitor and track feature adoption progress',
              duration: 'Ongoing',
              owner: 'Customer Success Manager',
              successCriteria: 'Target adoption rates achieved'
            }
          ],
          templates: {
            email: ['feature-spotlight', 'adoption-tips', 'success-celebration'],
            inApp: ['feature-tour', 'usage-tips', 'progress-tracker'],
            phone: ['feature-demo', 'adoption-check', 'success-review']
          },
          metrics: {
            usageRate: 78,
            successRate: 82,
            timeToComplete: 21,
            customerSatisfaction: 4.4
          },
          tags: ['adoption', 'training', 'feature-usage'],
          lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          usageCount: 45
        }
      ];
    };

    setCustomers(generateCustomers());
    setRetentionCampaigns(generateRetentionCampaigns());
    setWorkflows(generateWorkflows());
    setHealthScores(generateHealthScores());
    setRetentionMetrics(generateRetentionMetrics());
    setSuccessPlaybooks(generateSuccessPlaybooks());
  }, []);

  const runWorkflow = async (workflowId: string) => {
    setIsRunningWorkflow(true);
    
    // Simulate workflow execution
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Update workflow metrics
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === workflowId 
        ? { 
            ...workflow, 
            metrics: {
              ...workflow.metrics,
              executions: workflow.metrics.executions + 1,
              successRate: Math.min(workflow.metrics.successRate + 2, 100)
            },
            lastRun: new Date()
          }
        : workflow
    ));
    
    setIsRunningWorkflow(false);
  };

  const createCampaign = async () => {
    setIsCreatingCampaign(true);
    
    // Simulate campaign creation
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Add new campaign
    const newCampaign: RetentionCampaign = {
      id: `campaign-${Date.now()}`,
      name: 'New Retention Campaign',
      type: 'retention',
      status: 'active',
      targetSegment: 'at-risk-customers',
      triggers: [
        {
          condition: 'health_score',
          value: 50,
          timeframe: 'days'
        }
      ],
      channels: {
        email: true,
        inApp: true,
        phone: false,
        sms: false
      },
      content: {
        subject: 'We\'re here to help you succeed',
        message: 'Let us know how we can better support your success.',
        cta: 'Get Help',
        personalization: ['name', 'company']
      },
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
        revenue: 0
      },
      schedule: {
        frequency: 'weekly',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        timeOfDay: '09:00'
      },
      successCriteria: [
        {
          metric: 'response_rate',
          target: 40,
          timeframe: '7 days'
        }
      ]
    };
    
    setRetentionCampaigns(prev => [newCampaign, ...prev]);
    setIsCreatingCampaign(false);
  };

  const calculateHealthScores = async () => {
    setIsCalculatingHealth(true);
    
    // Simulate health score calculation
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update health scores
    setHealthScores(prev => prev.map(healthScore => ({
      ...healthScore,
      score: Math.min(healthScore.score + Math.floor(Math.random() * 5), 100),
      lastUpdated: new Date()
    })));
    
    setIsCalculatingHealth(false);
  };

  const getHealthScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'churned': return 'bg-red-100 text-red-800';
      case 'expanding': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (severity: string): string => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOpportunityColor = (priority: string): string => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const atRiskCustomers = customers.filter(c => c.status === 'at-risk').length;
  const expandingCustomers = customers.filter(c => c.status === 'expanding').length;
  const avgHealthScore = customers.reduce((sum, c) => sum + c.healthScore, 0) / customers.length || 0;

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
              <h2 className="text-2xl font-bold">👥 Customer Success & Retention Program</h2>
              <p className="text-green-100 mt-1">Automated customer success workflows and retention campaigns</p>
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
          {/* Customer Success Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Customers</p>
                  <p className="text-2xl font-bold text-green-800">{totalCustomers}</p>
                  <p className="text-xs text-green-600">{activeCustomers} active</p>
                </div>
                <Users className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Avg Health Score</p>
                  <p className="text-2xl font-bold text-blue-800">{avgHealthScore.toFixed(0)}</p>
                  <p className="text-xs text-blue-600">Customer health</p>
                </div>
                <Heart className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">At-Risk Customers</p>
                  <p className="text-2xl font-bold text-yellow-800">{atRiskCustomers}</p>
                  <p className="text-xs text-yellow-600">Need attention</p>
                </div>
                <AlertTriangle className="text-3xl text-yellow-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Expanding Customers</p>
                  <p className="text-2xl font-bold text-purple-800">{expandingCustomers}</p>
                  <p className="text-xs text-purple-600">Growth opportunities</p>
                </div>
                <TrendingUp className="text-3xl text-purple-600" />
              </div>
            </div>
          </div>

          {/* Customer Success Actions */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6 border-2 border-green-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-green-700 font-medium">
                👥 Customer Success Active - Running workflows, creating campaigns, and calculating health scores!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => runWorkflow('workflow-1')}
                  disabled={isRunningWorkflow}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningWorkflow ? '⏳ Running...' : '🔄 Run Workflow'}
                </button>
                <button
                  onClick={createCampaign}
                  disabled={isCreatingCampaign}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingCampaign ? '⏳ Creating...' : '📧 Create Campaign'}
                </button>
                <button
                  onClick={calculateHealthScores}
                  disabled={isCalculatingHealth}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isCalculatingHealth ? '⏳ Calculating...' : '💖 Calculate Health'}
                </button>
              </div>
            </div>
          </div>

          {/* Customer Health Dashboard */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Heart className="mr-2 text-green-600" />
              Customer Health Dashboard ({customers.length})
            </h3>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{customer.name}</h4>
                      <p className="text-sm text-gray-600">{customer.company} • {customer.plan}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getHealthScoreColor(customer.healthScore)}`}>
                        {customer.healthScore}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">MRR:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatCurrency(customer.mrr)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">LTV:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatCurrency(customer.ltv)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Usage:</span>
                      <span className="font-medium text-gray-900 ml-1">{customer.usage.monthlyActiveUsers} MAU</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Support:</span>
                      <span className="font-medium text-gray-900 ml-1">{customer.support.satisfactionScore}/5</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Health Score</span>
                      <span className="font-medium text-gray-900">{customer.healthScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          customer.healthScore >= 80 ? 'bg-green-500' :
                          customer.healthScore >= 60 ? 'bg-yellow-500' :
                          customer.healthScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${customer.healthScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {customer.risks.length > 0 && (
                    <div className="mb-3">
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Risks:</span>
                      </div>
                      <div className="space-y-1">
                        {customer.risks.slice(0, 2).map((risk, index) => (
                          <span key={index} className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(risk.severity)}`}>
                            {risk.type}: {risk.severity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {customer.opportunities.length > 0 && (
                    <div className="mb-3">
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Opportunities:</span>
                      </div>
                      <div className="space-y-1">
                        {customer.opportunities.slice(0, 2).map((opportunity, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">{opportunity.type}</span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getOpportunityColor(opportunity.priority)}`}>
                              {opportunity.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last Activity:</span> {customer.lastActivity.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Renewal:</span> {customer.renewalDate.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Onboarding:</span> {customer.onboardingProgress}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retention Campaigns */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Mail className="mr-2 text-blue-600" />
              Retention Campaigns ({retentionCampaigns.length})
            </h3>
            <div className="space-y-4">
              {retentionCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">{campaign.type} • {campaign.targetSegment}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Sent:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.sent}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Opened:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.opened}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Clicked:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.clicked}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Converted:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.converted}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Channels:</span>
                    </div>
                    <div className="flex space-x-2">
                      {campaign.channels.email && <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Email</span>}
                      {campaign.channels.inApp && <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">In-App</span>}
                      {campaign.channels.phone && <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Phone</span>}
                      {campaign.channels.sms && <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">SMS</span>}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Frequency:</span> {campaign.schedule.frequency} | 
                    <span className="font-medium ml-2">Revenue:</span> {formatCurrency(campaign.metrics.revenue)} | 
                    <span className="font-medium ml-2">End Date:</span> {campaign.schedule.endDate.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Workflows */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Zap className="mr-2 text-purple-600" />
              Success Workflows ({workflows.length})
            </h3>
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{workflow.name}</h4>
                      <p className="text-sm text-gray-600">{workflow.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(workflow.status)}`}>
                      {workflow.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Executions:</span>
                      <span className="font-medium text-gray-900 ml-1">{workflow.metrics.executions}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Success Rate:</span>
                      <span className="font-medium text-gray-900 ml-1">{workflow.metrics.successRate}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Revenue Impact:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatCurrency(workflow.metrics.revenueImpact)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Satisfaction:</span>
                      <span className="font-medium text-gray-900 ml-1">{workflow.metrics.customerSatisfaction}/5</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Actions:</span>
                    </div>
                    <div className="space-y-1">
                      {workflow.actions.slice(0, 2).map((action, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{action.type}: {action.template}</span>
                          <span className="text-gray-500">{action.assignedTo}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Trigger:</span> {workflow.trigger.event} | 
                    <span className="font-medium ml-2">Last Run:</span> {workflow.lastRun.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Next Run:</span> {workflow.nextRun.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retention Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="mr-2 text-indigo-600" />
              Retention Metrics
            </h3>
            <div className="space-y-4">
              {retentionMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{metric.period}</h4>
                      <p className="text-sm text-gray-600">Key retention and success metrics</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Churn Rate:</span>
                      <span className="font-medium text-red-600 ml-1">{metric.metrics.churnRate}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Retention Rate:</span>
                      <span className="font-medium text-green-600 ml-1">{metric.metrics.retentionRate}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Expansion Rate:</span>
                      <span className="font-medium text-blue-600 ml-1">{metric.metrics.expansionRate}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">NPS Score:</span>
                      <span className="font-medium text-purple-600 ml-1">{metric.metrics.netPromoterScore}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">CSAT Score:</span>
                      <span className="font-medium text-gray-900 ml-1">{metric.metrics.customerSatisfactionScore}/5</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Time to Value:</span>
                      <span className="font-medium text-gray-900 ml-1">{metric.metrics.timeToValue} days</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Feature Adoption:</span>
                      <span className="font-medium text-gray-900 ml-1">{metric.metrics.featureAdoptionRate}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Support Tickets:</span>
                      <span className="font-medium text-gray-900 ml-1">{metric.metrics.supportTicketVolume}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Segments:</span> Free: {metric.segments.free}% | 
                    <span className="font-medium ml-2">Pro:</span> {metric.segments.pro}% | 
                    <span className="font-medium ml-2">Enterprise:</span> {metric.segments.enterprise}%
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

export default CustomerSuccessRetentionProgram;
