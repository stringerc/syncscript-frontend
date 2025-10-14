import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, Target, Users, DollarSign, TrendingUp, BarChart3, CheckCircle, AlertTriangle, Clock, Settings, Code, Award, Star, Zap, Mail, Phone, Calendar, MapPin, Building, Share2, Download, Upload, Eye, Edit, Save, Send, Globe, Megaphone, Handshake, PieChart, LineChart, Activity, UserCheck, FileText, Presentation } from 'lucide-react';

interface EnterpriseDeal {
  id: string;
  company: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    title: string;
    role: 'decision-maker' | 'influencer' | 'champion' | 'user';
  };
  status: 'prospect' | 'qualified' | 'demo' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  priority: 'low' | 'medium' | 'high' | 'critical';
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
    budget: number;
    decisionProcess: string;
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
    lastActivity: Date;
    nextAction: string;
  };
  stakeholders: {
    name: string;
    title: string;
    influence: 'high' | 'medium' | 'low';
    sentiment: 'positive' | 'neutral' | 'negative';
    lastContact: Date;
  }[];
  competitors: string[];
  objections: {
    concern: string;
    response: string;
    status: 'addressed' | 'pending' | 'blocking';
  }[];
}

interface SalesActivity {
  id: string;
  dealId: string;
  type: 'call' | 'email' | 'demo' | 'proposal' | 'meeting' | 'follow-up';
  subject: string;
  description: string;
  date: Date;
  duration: number;
  outcome: 'positive' | 'neutral' | 'negative';
  nextAction: string;
  assignedTo: string;
  status: 'completed' | 'scheduled' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  notes: string;
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
    conversionRate: number;
  };
  conversion: {
    fromStage: string;
    toStage: string;
    rate: number;
    avgTime: number;
  }[];
  goals: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
}

interface SalesTeam {
  id: string;
  name: string;
  role: 'account-executive' | 'sales-manager' | 'business-development' | 'sales-engineer';
  territory: string;
  quota: number;
  performance: {
    dealsClosed: number;
    revenue: number;
    quota: number;
    attainment: number;
  };
  pipeline: {
    activeDeals: number;
    pipelineValue: number;
    expectedClose: number;
  };
  activities: {
    calls: number;
    emails: number;
    demos: number;
    meetings: number;
  };
  metrics: {
    winRate: number;
    avgDealSize: number;
    salesCycle: number;
    activityScore: number;
  };
}

interface SalesForecast {
  id: string;
  period: string;
  forecast: {
    committed: number;
    bestCase: number;
    worstCase: number;
    pipeline: number;
  };
  confidence: number;
  deals: {
    stage: string;
    count: number;
    value: number;
    probability: number;
    expectedValue: number;
  }[];
  trends: {
    pipelineGrowth: number;
    winRateTrend: number;
    dealSizeTrend: number;
    cycleTimeTrend: number;
  };
  risks: {
    description: string;
    impact: number;
    probability: number;
    mitigation: string;
  }[];
}

interface SalesProcess {
  id: string;
  stage: string;
  description: string;
  criteria: string[];
  activities: string[];
  deliverables: string[];
  averageTime: number;
  successRate: number;
  nextStage: string;
}

interface SalesAnalytics {
  id: string;
  period: string;
  metrics: {
    totalPipeline: number;
    newDeals: number;
    closedWon: number;
    closedLost: number;
    winRate: number;
    avgDealSize: number;
    avgSalesCycle: number;
    revenue: number;
  };
  trends: {
    pipelineTrend: number[];
    revenueTrend: number[];
    winRateTrend: number[];
    activityTrend: number[];
  };
  performance: {
    topPerformers: {
      name: string;
      deals: number;
      revenue: number;
      attainment: number;
    }[];
    stageAnalysis: {
      stage: string;
      count: number;
      value: number;
      conversionRate: number;
    }[];
  };
}

const EnterpriseSalesAcceleration: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [enterpriseDeals, setEnterpriseDeals] = useState<EnterpriseDeal[]>([]);
  const [salesActivities, setSalesActivities] = useState<SalesActivity[]>([]);
  const [salesPipeline, setSalesPipeline] = useState<SalesPipeline[]>([]);
  const [salesTeam, setSalesTeam] = useState<SalesTeam[]>([]);
  const [salesForecast, setSalesForecast] = useState<SalesForecast[]>([]);
  const [salesProcess, setSalesProcess] = useState<SalesProcess[]>([]);
  const [salesAnalytics, setSalesAnalytics] = useState<SalesAnalytics[]>([]);
  const [isClosingDeal, setIsClosingDeal] = useState(false);
  const [isQualifyingProspect, setIsQualifyingProspect] = useState(false);
  const [isSchedulingDemo, setIsSchedulingDemo] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<EnterpriseDeal | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<SalesActivity | null>(null);

  // Generate sales data
  useEffect(() => {
    const generateEnterpriseDeals = (): EnterpriseDeal[] => {
      return [
        {
          id: 'deal-1',
          company: 'TechCorp Solutions',
          contact: {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@techcorp.com',
            phone: '+1 (555) 123-4567',
            title: 'VP of Operations',
            role: 'decision-maker'
          },
          status: 'proposal',
          priority: 'high',
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
            timeline: 'Q1 2024',
            budget: 50000,
            decisionProcess: 'Committee decision with final approval from CEO'
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
            revenue: 37500,
            lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            nextAction: 'Follow up on proposal feedback'
          },
          stakeholders: [
            {
              name: 'Sarah Johnson',
              title: 'VP of Operations',
              influence: 'high',
              sentiment: 'positive',
              lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
              name: 'Mike Chen',
              title: 'CTO',
              influence: 'high',
              sentiment: 'positive',
              lastContact: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            },
            {
              name: 'Lisa Wang',
              title: 'IT Director',
              influence: 'medium',
              sentiment: 'neutral',
              lastContact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          ],
          competitors: ['Asana', 'Monday.com'],
          objections: [
            {
              concern: 'Integration complexity',
              response: 'We provide dedicated integration support and have pre-built connectors',
              status: 'addressed'
            },
            {
              concern: 'Security and compliance',
              response: 'We are SOC2 certified and GDPR compliant with enterprise-grade security',
              status: 'addressed'
            },
            {
              concern: 'Cost vs. budget',
              response: 'ROI analysis shows 300% return within 12 months',
              status: 'pending'
            }
          ]
        },
        {
          id: 'deal-2',
          company: 'Global Manufacturing Inc',
          contact: {
            name: 'Michael Chen',
            email: 'michael.chen@gmi.com',
            phone: '+1 (555) 987-6543',
            title: 'CTO',
            role: 'decision-maker'
          },
          status: 'negotiation',
          priority: 'critical',
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
            timeline: 'Q2 2024',
            budget: 75000,
            decisionProcess: 'Board approval required for deals over $50K'
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
            revenue: 45000,
            lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            nextAction: 'Schedule legal review meeting'
          },
          stakeholders: [
            {
              name: 'Michael Chen',
              title: 'CTO',
              influence: 'high',
              sentiment: 'positive',
              lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
              name: 'Jennifer Smith',
              title: 'CFO',
              influence: 'high',
              sentiment: 'neutral',
              lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            },
            {
              name: 'David Lee',
              title: 'Legal Counsel',
              influence: 'medium',
              sentiment: 'neutral',
              lastContact: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            }
          ],
          competitors: ['Microsoft 365', 'Salesforce'],
          objections: [
            {
              concern: 'Legal and compliance review',
              response: 'We provide comprehensive legal documentation and compliance certifications',
              status: 'addressed'
            },
            {
              concern: 'Implementation timeline',
              response: 'We offer phased implementation with dedicated project management',
              status: 'pending'
            },
            {
              concern: 'Custom integration requirements',
              response: 'Our professional services team handles all custom integrations',
              status: 'addressed'
            }
          ]
        },
        {
          id: 'deal-3',
          company: 'StartupIO',
          contact: {
            name: 'Emma Davis',
            email: 'emma.davis@startupio.com',
            phone: '+1 (555) 456-7890',
            title: 'Head of Product',
            role: 'champion'
          },
          status: 'qualified',
          priority: 'medium',
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
            timeline: 'Q1 2024',
            budget: 25000,
            decisionProcess: 'Founder decision with input from product team'
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
            revenue: 10000,
            lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            nextAction: 'Schedule product demo'
          },
          stakeholders: [
            {
              name: 'Emma Davis',
              title: 'Head of Product',
              influence: 'high',
              sentiment: 'positive',
              lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            },
            {
              name: 'Alex Rodriguez',
              title: 'Founder & CEO',
              influence: 'high',
              sentiment: 'neutral',
              lastContact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          ],
          competitors: ['Notion', 'Airtable'],
          objections: [
            {
              concern: 'Budget constraints',
              response: 'We offer flexible pricing and can start with a smaller team size',
              status: 'pending'
            },
            {
              concern: 'Implementation resources',
              response: 'We provide free onboarding and training for startup customers',
              status: 'addressed'
            }
          ]
        }
      ];
    };

    const generateSalesActivities = (): SalesActivity[] => {
      return [
        {
          id: 'activity-1',
          dealId: 'deal-1',
          type: 'proposal',
          subject: 'SyncScript Enterprise Proposal',
          description: 'Submitted comprehensive proposal with pricing and implementation timeline',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          duration: 120,
          outcome: 'positive',
          nextAction: 'Follow up in 3 days',
          assignedTo: 'Sarah Johnson',
          status: 'completed',
          priority: 'high',
          notes: 'Client was very interested in AI features and team collaboration capabilities'
        },
        {
          id: 'activity-2',
          dealId: 'deal-2',
          type: 'call',
          subject: 'Contract Negotiation Call',
          description: 'Discussed contract terms, pricing, and implementation requirements',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          duration: 90,
          outcome: 'neutral',
          nextAction: 'Schedule legal review meeting',
          assignedTo: 'Mike Chen',
          status: 'completed',
          priority: 'critical',
          notes: 'Legal team needs to review compliance requirements and data security'
        },
        {
          id: 'activity-3',
          dealId: 'deal-3',
          type: 'demo',
          subject: 'Product Demo for StartupIO',
          description: 'Scheduled product demonstration focusing on team collaboration features',
          date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          duration: 60,
          outcome: 'neutral',
          nextAction: 'Prepare demo environment',
          assignedTo: 'Emma Davis',
          status: 'scheduled',
          priority: 'medium',
          notes: 'Focus on startup-friendly features and pricing flexibility'
        },
        {
          id: 'activity-4',
          dealId: 'deal-1',
          type: 'follow-up',
          subject: 'Proposal Follow-up',
          description: 'Follow up on proposal submission and address any questions',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          duration: 30,
          outcome: 'neutral',
          nextAction: 'Send additional case studies',
          assignedTo: 'Sarah Johnson',
          status: 'scheduled',
          priority: 'high',
          notes: 'Client requested additional information about enterprise security features'
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
            avgSalesCycle: 90,
            conversionRate: 40
          },
          conversion: [
            { fromStage: 'Prospect', toStage: 'Qualified', rate: 40, avgTime: 14 },
            { fromStage: 'Qualified', toStage: 'Demo', rate: 60, avgTime: 21 },
            { fromStage: 'Demo', toStage: 'Proposal', rate: 50, avgTime: 30 },
            { fromStage: 'Proposal', toStage: 'Negotiation', rate: 70, avgTime: 45 }
          ],
          goals: {
            monthly: 50000,
            quarterly: 150000,
            yearly: 600000
          }
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
            avgSalesCycle: 75,
            conversionRate: 60
          },
          conversion: [],
          goals: {
            monthly: 30000,
            quarterly: 90000,
            yearly: 360000
          }
        },
        {
          id: 'pipeline-3',
          stage: 'Demo',
          deals: enterpriseDeals.filter(d => d.status === 'demo'),
          metrics: {
            count: 8,
            value: 200000,
            probability: 60,
            expectedValue: 120000,
            avgDealSize: 25000,
            avgSalesCycle: 60,
            conversionRate: 75
          },
          conversion: [],
          goals: {
            monthly: 20000,
            quarterly: 60000,
            yearly: 240000
          }
        },
        {
          id: 'pipeline-4',
          stage: 'Proposal',
          deals: enterpriseDeals.filter(d => d.status === 'proposal'),
          metrics: {
            count: 5,
            value: 150000,
            probability: 75,
            expectedValue: 112500,
            avgDealSize: 30000,
            avgSalesCycle: 45,
            conversionRate: 80
          },
          conversion: [],
          goals: {
            monthly: 15000,
            quarterly: 45000,
            yearly: 180000
          }
        },
        {
          id: 'pipeline-5',
          stage: 'Negotiation',
          deals: enterpriseDeals.filter(d => d.status === 'negotiation'),
          metrics: {
            count: 3,
            value: 100000,
            probability: 85,
            expectedValue: 85000,
            avgDealSize: 33333,
            avgSalesCycle: 30,
            conversionRate: 90
          },
          conversion: [],
          goals: {
            monthly: 10000,
            quarterly: 30000,
            yearly: 120000
          }
        }
      ];
    };

    const generateSalesTeam = (): SalesTeam[] => {
      return [
        {
          id: 'team-1',
          name: 'Sarah Johnson',
          role: 'account-executive',
          territory: 'West Coast Enterprise',
          quota: 500000,
          performance: {
            dealsClosed: 12,
            revenue: 425000,
            quota: 500000,
            attainment: 85
          },
          pipeline: {
            activeDeals: 8,
            pipelineValue: 350000,
            expectedClose: 280000
          },
          activities: {
            calls: 45,
            emails: 120,
            demos: 15,
            meetings: 25
          },
          metrics: {
            winRate: 75,
            avgDealSize: 35000,
            salesCycle: 65,
            activityScore: 92
          }
        },
        {
          id: 'team-2',
          name: 'Mike Chen',
          role: 'sales-manager',
          territory: 'East Coast Enterprise',
          quota: 750000,
          performance: {
            dealsClosed: 18,
            revenue: 680000,
            quota: 750000,
            attainment: 91
          },
          pipeline: {
            activeDeals: 12,
            pipelineValue: 450000,
            expectedClose: 380000
          },
          activities: {
            calls: 65,
            emails: 180,
            demos: 22,
            meetings: 35
          },
          metrics: {
            winRate: 82,
            avgDealSize: 38000,
            salesCycle: 58,
            activityScore: 95
          }
        },
        {
          id: 'team-3',
          name: 'Emma Davis',
          role: 'business-development',
          territory: 'Mid-Market',
          quota: 300000,
          performance: {
            dealsClosed: 8,
            revenue: 245000,
            quota: 300000,
            attainment: 82
          },
          pipeline: {
            activeDeals: 6,
            pipelineValue: 180000,
            expectedClose: 145000
          },
          activities: {
            calls: 35,
            emails: 90,
            demos: 12,
            meetings: 18
          },
          metrics: {
            winRate: 68,
            avgDealSize: 30500,
            salesCycle: 72,
            activityScore: 88
          }
        }
      ];
    };

    const generateSalesForecast = (): SalesForecast[] => {
      return [
        {
          id: 'forecast-1',
          period: 'Q1 2024',
          forecast: {
            committed: 450000,
            bestCase: 600000,
            worstCase: 350000,
            pipeline: 1200000
          },
          confidence: 78,
          deals: [
            {
              stage: 'Negotiation',
              count: 3,
              value: 100000,
              probability: 85,
              expectedValue: 85000
            },
            {
              stage: 'Proposal',
              count: 5,
              value: 150000,
              probability: 75,
              expectedValue: 112500
            },
            {
              stage: 'Demo',
              count: 8,
              value: 200000,
              probability: 60,
              expectedValue: 120000
            },
            {
              stage: 'Qualified',
              count: 15,
              value: 300000,
              probability: 40,
              expectedValue: 120000
            }
          ],
          trends: {
            pipelineGrowth: 15,
            winRateTrend: 5,
            dealSizeTrend: 8,
            cycleTimeTrend: -10
          },
          risks: [
            {
              description: 'Large enterprise deal may be delayed due to budget approval',
              impact: 75000,
              probability: 30,
              mitigation: 'Alternative financing options and phased implementation'
            },
            {
              description: 'Competitor pricing pressure in mid-market segment',
              impact: 25000,
              probability: 40,
              mitigation: 'Value-based selling and ROI demonstration'
            }
          ]
        }
      ];
    };

    const generateSalesProcess = (): SalesProcess[] => {
      return [
        {
          id: 'process-1',
          stage: 'Prospect',
          description: 'Initial lead qualification and basic needs assessment',
          criteria: ['Budget available', 'Decision timeline', 'Pain points identified'],
          activities: ['Initial call', 'Needs assessment', 'BANT qualification'],
          deliverables: ['Qualification scorecard', 'Needs analysis document'],
          averageTime: 7,
          successRate: 40,
          nextStage: 'Qualified'
        },
        {
          id: 'process-2',
          stage: 'Qualified',
          description: 'Deep dive discovery and stakeholder mapping',
          criteria: ['Stakeholders identified', 'Requirements documented', 'Budget confirmed'],
          activities: ['Discovery call', 'Stakeholder mapping', 'Requirements gathering'],
          deliverables: ['Stakeholder map', 'Requirements document', 'Proposal outline'],
          averageTime: 14,
          successRate: 60,
          nextStage: 'Demo'
        },
        {
          id: 'process-3',
          stage: 'Demo',
          description: 'Product demonstration and proof of concept',
          criteria: ['Demo completed', 'Stakeholders engaged', 'Interest confirmed'],
          activities: ['Product demo', 'Use case scenarios', 'Q&A session'],
          deliverables: ['Demo script', 'Follow-up materials', 'Next steps plan'],
          averageTime: 21,
          successRate: 75,
          nextStage: 'Proposal'
        },
        {
          id: 'process-4',
          stage: 'Proposal',
          description: 'Formal proposal submission and presentation',
          criteria: ['Proposal submitted', 'Presentation completed', 'Feedback received'],
          activities: ['Proposal creation', 'Executive presentation', 'Follow-up calls'],
          deliverables: ['Formal proposal', 'Presentation deck', 'Implementation plan'],
          averageTime: 30,
          successRate: 80,
          nextStage: 'Negotiation'
        },
        {
          id: 'process-5',
          stage: 'Negotiation',
          description: 'Contract negotiation and final agreement',
          criteria: ['Terms agreed', 'Legal review completed', 'Contract signed'],
          activities: ['Contract negotiation', 'Legal review', 'Final approval'],
          deliverables: ['Final contract', 'Implementation timeline', 'Success plan'],
          averageTime: 45,
          successRate: 90,
          nextStage: 'Closed-Won'
        }
      ];
    };

    const generateSalesAnalytics = (): SalesAnalytics[] => {
      return [
        {
          id: 'analytics-1',
          period: 'Last 30 Days',
          metrics: {
            totalPipeline: 1200000,
            newDeals: 25,
            closedWon: 8,
            closedLost: 5,
            winRate: 62,
            avgDealSize: 32000,
            avgSalesCycle: 68,
            revenue: 256000
          },
          trends: {
            pipelineTrend: [800000, 850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000, 1200000],
            revenueTrend: [180000, 190000, 200000, 210000, 220000, 230000, 240000, 250000, 256000],
            winRateTrend: [58, 59, 60, 61, 62, 62, 62, 62, 62],
            activityTrend: [150, 160, 170, 180, 190, 200, 210, 220, 230]
          },
          performance: {
            topPerformers: [
              {
                name: 'Mike Chen',
                deals: 18,
                revenue: 680000,
                attainment: 91
              },
              {
                name: 'Sarah Johnson',
                deals: 12,
                revenue: 425000,
                attainment: 85
              },
              {
                name: 'Emma Davis',
                deals: 8,
                revenue: 245000,
                attainment: 82
              }
            ],
            stageAnalysis: [
              {
                stage: 'Prospect',
                count: 25,
                value: 500000,
                conversionRate: 40
              },
              {
                stage: 'Qualified',
                count: 15,
                value: 300000,
                conversionRate: 60
              },
              {
                stage: 'Demo',
                count: 8,
                value: 200000,
                conversionRate: 75
              },
              {
                stage: 'Proposal',
                count: 5,
                value: 150000,
                conversionRate: 80
              },
              {
                stage: 'Negotiation',
                count: 3,
                value: 100000,
                conversionRate: 90
              }
            ]
          }
        }
      ];
    };

    setEnterpriseDeals(generateEnterpriseDeals());
    setSalesActivities(generateSalesActivities());
    setSalesPipeline(generateSalesPipeline());
    setSalesTeam(generateSalesTeam());
    setSalesForecast(generateSalesForecast());
    setSalesProcess(generateSalesProcess());
    setSalesAnalytics(generateSalesAnalytics());
  }, []);

  const closeDeal = async () => {
    setIsClosingDeal(true);
    
    // Simulate deal closing
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update deal status
    setEnterpriseDeals(prev => prev.map(deal => 
      deal.status === 'negotiation' 
        ? { 
            ...deal, 
            status: 'closed-won' as const,
            probability: 100,
            metrics: {
              ...deal.metrics,
              revenue: deal.value
            }
          }
        : deal
    ));
    
    setIsClosingDeal(false);
  };

  const qualifyProspect = async () => {
    setIsQualifyingProspect(true);
    
    // Simulate prospect qualification
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Add new qualified prospect
    const newDeal: EnterpriseDeal = {
      id: `deal-${Date.now()}`,
      company: 'New Enterprise Client',
      contact: {
        name: 'New Contact',
        email: 'contact@company.com',
        phone: '+1 (555) 000-0000',
        title: 'Decision Maker',
        role: 'decision-maker'
      },
      status: 'qualified',
      priority: 'medium',
      value: 30000,
      probability: 40,
      closeDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      source: 'Marketing',
      stage: 'Discovery',
      notes: 'New qualified enterprise prospect',
      requirements: {
        users: 50,
        features: ['Team Collaboration', 'Basic AI'],
        integrations: ['Slack'],
        compliance: ['Basic Security'],
        timeline: 'Q2 2024',
        budget: 30000,
        decisionProcess: 'Committee decision'
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
        winRate: 40,
        revenue: 12000,
        lastActivity: new Date(),
        nextAction: 'Schedule discovery call'
      },
      stakeholders: [],
      competitors: [],
      objections: []
    };
    
    setEnterpriseDeals(prev => [...prev, newDeal]);
    setIsQualifyingProspect(false);
  };

  const scheduleDemo = async () => {
    setIsSchedulingDemo(true);
    
    // Simulate demo scheduling
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Add new demo activity
    const newActivity: SalesActivity = {
      id: `activity-${Date.now()}`,
      dealId: 'deal-3',
      type: 'demo',
      subject: 'Product Demo - New Enterprise Client',
      description: 'Scheduled product demonstration for new qualified prospect',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      duration: 60,
      outcome: 'neutral',
      nextAction: 'Prepare demo environment and use cases',
      assignedTo: 'Sales Team',
      status: 'scheduled',
      priority: 'high',
      notes: 'Focus on enterprise features and ROI demonstration'
    };
    
    setSalesActivities(prev => [...prev, newActivity]);
    setIsSchedulingDemo(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'closed-won': case 'completed': return 'bg-green-100 text-green-800';
      case 'proposal': case 'negotiation': case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'qualified': case 'demo': case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'prospect': case 'pending': return 'bg-gray-100 text-gray-800';
      case 'closed-lost': case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOutcomeColor = (outcome: string): string => {
    switch (outcome) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'neutral': return 'bg-yellow-100 text-yellow-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInfluenceColor = (influence: string): string => {
    switch (influence) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentColor = (sentiment: string): string => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'neutral': return 'bg-yellow-100 text-yellow-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPipeline = salesAnalytics[0]?.metrics.totalPipeline || 0;
  const totalRevenue = salesAnalytics[0]?.metrics.revenue || 0;
  const winRate = salesAnalytics[0]?.metrics.winRate || 0;
  const activeDeals = enterpriseDeals.filter(d => d.status !== 'closed-won' && d.status !== 'closed-lost').length;
  const closedWon = enterpriseDeals.filter(d => d.status === 'closed-won').length;
  const avgDealSize = salesAnalytics[0]?.metrics.avgDealSize || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">💼 Enterprise Sales Acceleration</h2>
              <p className="text-blue-100 mt-1">Close active deals, qualify new prospects, and accelerate enterprise sales</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Sales Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Pipeline</p>
                  <p className="text-2xl font-bold text-blue-800">${(totalPipeline / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-blue-600">Pipeline value</p>
                </div>
                <TrendingUp className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-green-800">${(totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-green-600">Monthly revenue</p>
                </div>
                <DollarSign className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Win Rate</p>
                  <p className="text-2xl font-bold text-purple-800">{winRate}%</p>
                  <p className="text-xs text-purple-600">Deal success rate</p>
                </div>
                <Target className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Active Deals</p>
                  <p className="text-2xl font-bold text-orange-800">{activeDeals}</p>
                  <p className="text-xs text-orange-600">In pipeline</p>
                </div>
                <Briefcase className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* Sales Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-blue-700 font-medium">
                💼 Enterprise Sales Active - Closing deals and qualifying prospects for revenue growth!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={closeDeal}
                  disabled={isClosingDeal}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isClosingDeal ? '⏳ Closing...' : '✅ Close Deal'}
                </button>
                <button
                  onClick={qualifyProspect}
                  disabled={isQualifyingProspect}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isQualifyingProspect ? '⏳ Qualifying...' : '🎯 Qualify Prospect'}
                </button>
                <button
                  onClick={scheduleDemo}
                  disabled={isSchedulingDemo}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isSchedulingDemo ? '⏳ Scheduling...' : '📺 Schedule Demo'}
                </button>
              </div>
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
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(deal.priority)}`}>
                        {deal.priority}
                      </span>
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

                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{deal.probability}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${deal.probability}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Source:</span> {deal.source} | 
                    <span className="font-medium ml-2">Stage:</span> {deal.stage} | 
                    <span className="font-medium ml-2">Users:</span> {deal.requirements.users} | 
                    <span className="font-medium ml-2">Next:</span> {deal.metrics.nextAction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Pipeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="mr-2 text-green-600" />
              Sales Pipeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {salesPipeline.map((stage) => (
                <div key={stage.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">{stage.stage}</h4>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {stage.metrics.count}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Value:</span>
                      <span className="font-medium text-gray-900">${(stage.metrics.value / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected:</span>
                      <span className="font-medium text-gray-900">${(stage.metrics.expectedValue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Size:</span>
                      <span className="font-medium text-gray-900">${(stage.metrics.avgDealSize / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversion:</span>
                      <span className="font-medium text-gray-900">{stage.metrics.conversionRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Team Performance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="mr-2 text-purple-600" />
              Sales Team Performance ({salesTeam.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {salesTeam.map((member) => (
                <div key={member.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role} • {member.territory}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {member.performance.attainment}%
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Deals Closed:</span>
                      <span className="font-medium text-gray-900">{member.performance.dealsClosed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-gray-900">${(member.performance.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Win Rate:</span>
                      <span className="font-medium text-gray-900">{member.metrics.winRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg Deal Size:</span>
                      <span className="font-medium text-gray-900">${(member.metrics.avgDealSize / 1000).toFixed(0)}K</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Pipeline:</span> ${(member.pipeline.pipelineValue / 1000).toFixed(0)}K | 
                    <span className="font-medium ml-2">Activity Score:</span> {member.metrics.activityScore}/100
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Activity className="mr-2 text-orange-600" />
              Recent Sales Activities ({salesActivities.length})
            </h3>
            <div className="space-y-4">
              {salesActivities.map((activity) => (
                <div key={activity.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{activity.subject}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getOutcomeColor(activity.outcome)}`}>
                        {activity.outcome}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900 ml-1">{activity.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatDate(activity.date)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900 ml-1">{activity.duration}min</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Assigned:</span>
                      <span className="font-medium text-gray-900 ml-1">{activity.assignedTo}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Next Action:</span> {activity.nextAction}
                    {activity.notes && (
                      <span className="ml-2">| <span className="font-medium">Notes:</span> {activity.notes}</span>
                    )}
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

export default EnterpriseSalesAcceleration;
