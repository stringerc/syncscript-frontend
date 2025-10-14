import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Handshake, Target, Users, DollarSign, TrendingUp, BarChart3, CheckCircle, AlertTriangle, Clock, Settings, Code, Award, Star, Zap, Mail, Phone, Calendar, MapPin, Building, Share2, Download, Upload, Eye, Edit, Save, Send, Globe, Megaphone, Briefcase, PieChart, LineChart, Activity, UserCheck, FileText, Presentation, Link } from 'lucide-react';

interface Partnership {
  id: string;
  name: string;
  type: 'technology' | 'channel' | 'strategic' | 'integration' | 'reseller' | 'distribution';
  status: 'exploring' | 'negotiating' | 'active' | 'paused' | 'terminated' | 'launched';
  priority: 'low' | 'medium' | 'high' | 'critical';
  partner: {
    name: string;
    website: string;
    industry: string;
    size: 'startup' | 'mid-market' | 'enterprise' | 'fortune-500';
    location: string;
    description: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    title: string;
    role: 'partnership-manager' | 'business-development' | 'executive' | 'technical';
  };
  agreement: {
    startDate: Date;
    endDate: Date | null;
    terms: string[];
    revenue: {
      type: 'revenue-share' | 'referral-fee' | 'licensing' | 'custom' | 'joint-venture';
      percentage: number;
      amount: number;
      minimumCommit: number;
    };
    responsibilities: {
      partner: string[];
      syncscript: string[];
    };
    deliverables: {
      partner: string[];
      syncscript: string[];
    };
  };
  metrics: {
    leads: number;
    conversions: number;
    revenue: number;
    satisfaction: number;
    lastActivity: Date;
    nextMilestone: string;
  };
  goals: {
    leads: number;
    revenue: number;
    integrations: number;
    coMarketing: number;
    marketShare: number;
  };
  activities: {
    id: string;
    type: 'meeting' | 'demo' | 'integration' | 'marketing' | 'training' | 'support';
    description: string;
    date: Date;
    status: 'completed' | 'scheduled' | 'overdue';
    outcome: 'positive' | 'neutral' | 'negative';
    notes: string;
  }[];
  risks: {
    description: string;
    impact: 'low' | 'medium' | 'high' | 'critical';
    probability: 'low' | 'medium' | 'high';
    mitigation: string[];
    owner: string;
    status: 'identified' | 'mitigating' | 'resolved';
  }[];
}

interface PartnershipPipeline {
  id: string;
  stage: string;
  partnerships: Partnership[];
  metrics: {
    count: number;
    expectedValue: number;
    probability: number;
    avgDealSize: number;
    avgCycle: number;
  };
  goals: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
}

interface PartnershipTeam {
  id: string;
  name: string;
  role: 'partnership-manager' | 'business-development' | 'technical-partner' | 'channel-manager';
  territory: string;
  partnerships: number;
  performance: {
    partnershipsClosed: number;
    revenue: number;
    quota: number;
    attainment: number;
  };
  activities: {
    meetings: number;
    demos: number;
    integrations: number;
    training: number;
  };
  metrics: {
    successRate: number;
    avgPartnershipValue: number;
    cycleTime: number;
    satisfactionScore: number;
  };
}

interface PartnershipForecast {
  id: string;
  period: string;
  forecast: {
    committed: number;
    bestCase: number;
    worstCase: number;
    pipeline: number;
  };
  confidence: number;
  partnerships: {
    stage: string;
    count: number;
    value: number;
    probability: number;
    expectedValue: number;
  }[];
  trends: {
    partnershipGrowth: number;
    revenueGrowth: number;
    satisfactionTrend: number;
    cycleTimeTrend: number;
  };
  risks: {
    description: string;
    impact: number;
    probability: number;
    mitigation: string;
  }[];
}

interface PartnershipAnalytics {
  id: string;
  period: string;
  metrics: {
    totalPartnerships: number;
    activePartnerships: number;
    newPartnerships: number;
    terminatedPartnerships: number;
    totalRevenue: number;
    avgPartnershipValue: number;
    satisfactionScore: number;
    successRate: number;
  };
  trends: {
    partnershipTrend: number[];
    revenueTrend: number[];
    satisfactionTrend: number[];
    activityTrend: number[];
  };
  performance: {
    topPartners: {
      name: string;
      revenue: number;
      satisfaction: number;
      partnership: string;
    }[];
    typeAnalysis: {
      type: string;
      count: number;
      revenue: number;
      successRate: number;
    }[];
  };
}

const PartnershipActivation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [partnershipPipeline, setPartnershipPipeline] = useState<PartnershipPipeline[]>([]);
  const [partnershipTeam, setPartnershipTeam] = useState<PartnershipTeam[]>([]);
  const [partnershipForecast, setPartnershipForecast] = useState<PartnershipForecast[]>([]);
  const [partnershipAnalytics, setPartnershipAnalytics] = useState<PartnershipAnalytics[]>([]);
  const [isLaunchingPartnership, setIsLaunchingPartnership] = useState(false);
  const [isScalingPartnership, setIsScalingPartnership] = useState(false);
  const [isActivatingIntegration, setIsActivatingIntegration] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  // Generate partnership data
  useEffect(() => {
    const generatePartnerships = (): Partnership[] => {
      return [
        {
          id: 'partnership-1',
          name: 'Slack Integration Partnership',
          type: 'integration',
          status: 'active',
          priority: 'high',
          partner: {
            name: 'Slack Technologies',
            website: 'slack.com',
            industry: 'Communication',
            size: 'enterprise',
            location: 'San Francisco, CA',
            description: 'Leading team communication platform with 12+ million daily active users'
          },
          contact: {
            name: 'David Wilson',
            email: 'david.wilson@slack.com',
            phone: '+1 (555) 111-2222',
            title: 'Partnership Manager',
            role: 'partnership-manager'
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
              amount: 5000,
              minimumCommit: 0
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
            },
            deliverables: {
              partner: [
                'API documentation',
                'Marketing co-op funds',
                'Technical resources',
                'Sales enablement'
              ],
              syncscript: [
                'Integration development',
                'User documentation',
                'Support resources',
                'Marketing materials'
              ]
            }
          },
          metrics: {
            leads: 250,
            conversions: 45,
            revenue: 5000,
            satisfaction: 9.2,
            lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            nextMilestone: 'Expand integration features'
          },
          goals: {
            leads: 500,
            revenue: 10000,
            integrations: 100,
            coMarketing: 5,
            marketShare: 10
          },
          activities: [
            {
              id: 'activity-1',
              type: 'integration',
              description: 'Slack app integration development',
              date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              status: 'completed',
              outcome: 'positive',
              notes: 'Integration successfully launched with positive user feedback'
            },
            {
              id: 'activity-2',
              type: 'marketing',
              description: 'Co-marketing campaign launch',
              date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
              status: 'completed',
              outcome: 'positive',
              notes: 'Campaign generated 150+ new leads'
            },
            {
              id: 'activity-3',
              type: 'meeting',
              description: 'Quarterly partnership review',
              date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              status: 'scheduled',
              outcome: 'neutral',
              notes: 'Review partnership performance and plan next quarter'
            }
          ],
          risks: [
            {
              description: 'API changes affecting integration',
              impact: 'medium',
              probability: 'low',
              mitigation: ['Regular API monitoring', 'Backup integration options'],
              owner: 'Technical Team',
              status: 'mitigating'
            }
          ]
        },
        {
          id: 'partnership-2',
          name: 'Microsoft Teams Channel Partnership',
          type: 'channel',
          status: 'launched',
          priority: 'critical',
          partner: {
            name: 'Microsoft Corporation',
            website: 'microsoft.com',
            industry: 'Technology',
            size: 'fortune-500',
            location: 'Redmond, WA',
            description: 'Global technology leader with 280+ million Teams users'
          },
          contact: {
            name: 'Lisa Anderson',
            email: 'lisa.anderson@microsoft.com',
            phone: '+1 (555) 333-4444',
            title: 'Channel Partner Manager',
            role: 'business-development'
          },
          agreement: {
            startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 358 * 24 * 60 * 60 * 1000),
            terms: [
              'Channel partner program',
              'Reseller agreement',
              'Technical certification',
              'Marketing support'
            ],
            revenue: {
              type: 'referral-fee',
              percentage: 20,
              amount: 0,
              minimumCommit: 0
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
            },
            deliverables: {
              partner: [
                'Partner portal access',
                'Sales training materials',
                'Marketing co-op funds',
                'Technical resources'
              ],
              syncscript: [
                'Partner certification',
                'Sales enablement materials',
                'Marketing support',
                'Technical integration'
              ]
            }
          },
          metrics: {
            leads: 0,
            conversions: 0,
            revenue: 0,
            satisfaction: 0,
            lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            nextMilestone: 'Complete partner certification'
          },
          goals: {
            leads: 1000,
            revenue: 50000,
            integrations: 200,
            coMarketing: 10,
            marketShare: 15
          },
          activities: [
            {
              id: 'activity-4',
              type: 'training',
              description: 'Partner certification training',
              date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
              status: 'completed',
              outcome: 'positive',
              notes: 'Team successfully completed Microsoft partner certification'
            },
            {
              id: 'activity-5',
              type: 'integration',
              description: 'Teams app integration',
              date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
              status: 'scheduled',
              outcome: 'neutral',
              notes: 'Develop native Teams app integration'
            }
          ],
          risks: [
            {
              description: 'Complex partner certification requirements',
              impact: 'high',
              probability: 'medium',
              mitigation: ['Dedicated certification team', 'Regular progress reviews'],
              owner: 'Partnership Team',
              status: 'mitigating'
            }
          ]
        },
        {
          id: 'partnership-3',
          name: 'Consulting Firm Strategic Partnership',
          type: 'strategic',
          status: 'active',
          priority: 'medium',
          partner: {
            name: 'Productivity Consulting Group',
            website: 'pcg.com',
            industry: 'Consulting',
            size: 'mid-market',
            location: 'New York, NY',
            description: 'Leading productivity consulting firm specializing in team optimization'
          },
          contact: {
            name: 'Robert Taylor',
            email: 'robert.taylor@pcg.com',
            phone: '+1 (555) 555-6666',
            title: 'Managing Partner',
            role: 'executive'
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
              amount: 15000,
              minimumCommit: 5000
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
            },
            deliverables: {
              partner: [
                'Implementation services',
                'Customer training',
                'Market research',
                'Referral pipeline'
              ],
              syncscript: [
                'Product licenses',
                'Sales support',
                'Marketing materials',
                'Technical training'
              ]
            }
          },
          metrics: {
            leads: 150,
            conversions: 25,
            revenue: 15000,
            satisfaction: 8.8,
            lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            nextMilestone: 'Expand joint go-to-market activities'
          },
          goals: {
            leads: 300,
            revenue: 30000,
            integrations: 50,
            coMarketing: 8,
            marketShare: 5
          },
          activities: [
            {
              id: 'activity-6',
              type: 'meeting',
              description: 'Strategic planning session',
              date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
              status: 'completed',
              outcome: 'positive',
              notes: 'Agreed on joint go-to-market strategy and referral process'
            },
            {
              id: 'activity-7',
              type: 'training',
              description: 'Partner training session',
              date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
              status: 'completed',
              outcome: 'positive',
              notes: 'Trained 15 consultants on SyncScript features and implementation'
            }
          ],
          risks: [
            {
              description: 'Competing with partner\'s existing tools',
              impact: 'medium',
              probability: 'low',
              mitigation: ['Clear value proposition', 'Joint customer success'],
              owner: 'Partnership Team',
              status: 'identified'
            }
          ]
        }
      ];
    };

    const generatePartnershipPipeline = (): PartnershipPipeline[] => {
      return [
        {
          id: 'pipeline-1',
          stage: 'Exploring',
          partnerships: partnerships.filter(p => p.status === 'exploring'),
          metrics: {
            count: 8,
            expectedValue: 150000,
            probability: 20,
            avgDealSize: 18750,
            avgCycle: 45
          },
          goals: {
            monthly: 25000,
            quarterly: 75000,
            yearly: 300000
          }
        },
        {
          id: 'pipeline-2',
          stage: 'Negotiating',
          partnerships: partnerships.filter(p => p.status === 'negotiating'),
          metrics: {
            count: 3,
            expectedValue: 75000,
            probability: 60,
            avgDealSize: 25000,
            avgCycle: 30
          },
          goals: {
            monthly: 15000,
            quarterly: 45000,
            yearly: 180000
          }
        },
        {
          id: 'pipeline-3',
          stage: 'Active',
          partnerships: partnerships.filter(p => p.status === 'active'),
          metrics: {
            count: 2,
            expectedValue: 20000,
            probability: 100,
            avgDealSize: 10000,
            avgCycle: 0
          },
          goals: {
            monthly: 10000,
            quarterly: 30000,
            yearly: 120000
          }
        },
        {
          id: 'pipeline-4',
          stage: 'Launched',
          partnerships: partnerships.filter(p => p.status === 'launched'),
          metrics: {
            count: 1,
            expectedValue: 0,
            probability: 100,
            avgDealSize: 0,
            avgCycle: 0
          },
          goals: {
            monthly: 0,
            quarterly: 0,
            yearly: 0
          }
        }
      ];
    };

    const generatePartnershipTeam = (): PartnershipTeam[] => {
      return [
        {
          id: 'team-1',
          name: 'Sarah Johnson',
          role: 'partnership-manager',
          territory: 'Technology Partners',
          partnerships: 3,
          performance: {
            partnershipsClosed: 2,
            revenue: 20000,
            quota: 50000,
            attainment: 40
          },
          activities: {
            meetings: 25,
            demos: 12,
            integrations: 5,
            training: 8
          },
          metrics: {
            successRate: 67,
            avgPartnershipValue: 10000,
            cycleTime: 60,
            satisfactionScore: 9.0
          }
        },
        {
          id: 'team-2',
          name: 'Mike Chen',
          role: 'business-development',
          territory: 'Enterprise Partners',
          partnerships: 2,
          performance: {
            partnershipsClosed: 1,
            revenue: 50000,
            quota: 75000,
            attainment: 67
          },
          activities: {
            meetings: 30,
            demos: 15,
            integrations: 3,
            training: 5
          },
          metrics: {
            successRate: 50,
            avgPartnershipValue: 25000,
            cycleTime: 90,
            satisfactionScore: 8.5
          }
        },
        {
          id: 'team-3',
          name: 'Emma Davis',
          role: 'channel-manager',
          territory: 'Channel Partners',
          partnerships: 1,
          performance: {
            partnershipsClosed: 1,
            revenue: 0,
            quota: 25000,
            attainment: 0
          },
          activities: {
            meetings: 20,
            demos: 8,
            integrations: 2,
            training: 10
          },
          metrics: {
            successRate: 100,
            avgPartnershipValue: 0,
            cycleTime: 30,
            satisfactionScore: 0
          }
        }
      ];
    };

    const generatePartnershipForecast = (): PartnershipForecast[] => {
      return [
        {
          id: 'forecast-1',
          period: 'Q1 2024',
          forecast: {
            committed: 70000,
            bestCase: 100000,
            worstCase: 50000,
            pipeline: 245000
          },
          confidence: 75,
          partnerships: [
            {
              stage: 'Active',
              count: 2,
              value: 20000,
              probability: 100,
              expectedValue: 20000
            },
            {
              stage: 'Launched',
              count: 1,
              value: 0,
              probability: 100,
              expectedValue: 0
            },
            {
              stage: 'Negotiating',
              count: 3,
              value: 75000,
              probability: 60,
              expectedValue: 45000
            },
            {
              stage: 'Exploring',
              count: 8,
              value: 150000,
              probability: 20,
              expectedValue: 30000
            }
          ],
          trends: {
            partnershipGrowth: 25,
            revenueGrowth: 40,
            satisfactionTrend: 5,
            cycleTimeTrend: -15
          },
          risks: [
            {
              description: 'Large enterprise partnership may be delayed',
              impact: 50000,
              probability: 30,
              mitigation: 'Alternative partnership options and timeline flexibility'
            }
          ]
        }
      ];
    };

    const generatePartnershipAnalytics = (): PartnershipAnalytics[] => {
      return [
        {
          id: 'analytics-1',
          period: 'Last 30 Days',
          metrics: {
            totalPartnerships: 6,
            activePartnerships: 3,
            newPartnerships: 1,
            terminatedPartnerships: 0,
            totalRevenue: 20000,
            avgPartnershipValue: 3333,
            satisfactionScore: 9.0,
            successRate: 67
          },
          trends: {
            partnershipTrend: [4, 4, 5, 5, 6, 6, 6],
            revenueTrend: [10000, 12000, 15000, 17000, 18000, 19000, 20000],
            satisfactionTrend: [8.5, 8.6, 8.7, 8.8, 8.9, 8.9, 9.0],
            activityTrend: [15, 18, 22, 25, 28, 30, 35]
          },
          performance: {
            topPartners: [
              {
                name: 'Slack Technologies',
                revenue: 5000,
                satisfaction: 9.2,
                partnership: 'Integration'
              },
              {
                name: 'Productivity Consulting Group',
                revenue: 15000,
                satisfaction: 8.8,
                partnership: 'Strategic'
              },
              {
                name: 'Microsoft Corporation',
                revenue: 0,
                satisfaction: 0,
                partnership: 'Channel'
              }
            ],
            typeAnalysis: [
              {
                type: 'Integration',
                count: 1,
                revenue: 5000,
                successRate: 100
              },
              {
                type: 'Strategic',
                count: 1,
                revenue: 15000,
                successRate: 100
              },
              {
                type: 'Channel',
                count: 1,
                revenue: 0,
                successRate: 100
              }
            ]
          }
        }
      ];
    };

    setPartnerships(generatePartnerships());
    setPartnershipPipeline(generatePartnershipPipeline());
    setPartnershipTeam(generatePartnershipTeam());
    setPartnershipForecast(generatePartnershipForecast());
    setPartnershipAnalytics(generatePartnershipAnalytics());
  }, []);

  const launchPartnership = async () => {
    setIsLaunchingPartnership(true);
    
    // Simulate partnership launch
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update partnership status
    setPartnerships(prev => prev.map(partnership => 
      partnership.status === 'negotiating' 
        ? { 
            ...partnership, 
            status: 'launched' as const,
            agreement: {
              ...partnership.agreement,
              startDate: new Date()
            }
          }
        : partnership
    ));
    
    setIsLaunchingPartnership(false);
  };

  const scalePartnership = async () => {
    setIsScalingPartnership(true);
    
    // Simulate partnership scaling
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Update partnership metrics
    setPartnerships(prev => prev.map(partnership => 
      partnership.status === 'active' 
        ? { 
            ...partnership, 
            metrics: {
              ...partnership.metrics,
              leads: partnership.metrics.leads + 50,
              conversions: partnership.metrics.conversions + 10,
              revenue: partnership.metrics.revenue + 2000
            }
          }
        : partnership
    ));
    
    setIsScalingPartnership(false);
  };

  const activateIntegration = async () => {
    setIsActivatingIntegration(true);
    
    // Simulate integration activation
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Add new integration activity
    const newActivity = {
      id: `activity-${Date.now()}`,
      type: 'integration',
      description: 'New integration activated',
      date: new Date(),
      status: 'completed',
      outcome: 'positive',
      notes: 'Integration successfully activated and tested'
    };
    
    setPartnerships(prev => prev.map(partnership => 
      partnership.type === 'integration' 
        ? { 
            ...partnership, 
            activities: [...partnership.activities, newActivity]
          }
        : partnership
    ));
    
    setIsActivatingIntegration(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': case 'launched': case 'completed': return 'bg-green-100 text-green-800';
      case 'negotiating': case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'exploring': case 'pending': return 'bg-blue-100 text-blue-800';
      case 'paused': case 'overdue': return 'bg-orange-100 text-orange-800';
      case 'terminated': case 'negative': return 'bg-red-100 text-red-800';
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

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'technology': return 'bg-blue-100 text-blue-800';
      case 'channel': return 'bg-green-100 text-green-800';
      case 'strategic': return 'bg-purple-100 text-purple-800';
      case 'integration': return 'bg-orange-100 text-orange-800';
      case 'reseller': return 'bg-pink-100 text-pink-800';
      case 'distribution': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
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

  const totalPartnerships = partnershipAnalytics[0]?.metrics.totalPartnerships || 0;
  const activePartnerships = partnershipAnalytics[0]?.metrics.activePartnerships || 0;
  const totalRevenue = partnershipAnalytics[0]?.metrics.totalRevenue || 0;
  const satisfactionScore = partnershipAnalytics[0]?.metrics.satisfactionScore || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🤝 Partnership Activation</h2>
              <p className="text-purple-100 mt-1">Launch Microsoft partnership, scale existing partnerships, and activate integrations</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Partnership Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Total Partnerships</p>
                  <p className="text-2xl font-bold text-purple-800">{totalPartnerships}</p>
                  <p className="text-xs text-purple-600">Active partnerships</p>
                </div>
                <Handshake className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Partnership Revenue</p>
                  <p className="text-2xl font-bold text-green-800">${(totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-green-600">Monthly revenue</p>
                </div>
                <DollarSign className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Active Partnerships</p>
                  <p className="text-2xl font-bold text-blue-800">{activePartnerships}</p>
                  <p className="text-xs text-blue-600">Currently active</p>
                </div>
                <Target className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Satisfaction Score</p>
                  <p className="text-2xl font-bold text-orange-800">{satisfactionScore}/10</p>
                  <p className="text-xs text-orange-600">Partner satisfaction</p>
                </div>
                <Star className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* Partnership Actions */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-6 border-2 border-purple-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-purple-700 font-medium">
                🤝 Partnership Activation Active - Microsoft partnership launched and scaling existing partnerships!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={launchPartnership}
                  disabled={isLaunchingPartnership}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isLaunchingPartnership ? '⏳ Launching...' : '🚀 Launch Partnership'}
                </button>
                <button
                  onClick={scalePartnership}
                  disabled={isScalingPartnership}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isScalingPartnership ? '⏳ Scaling...' : '📈 Scale Partnership'}
                </button>
                <button
                  onClick={activateIntegration}
                  disabled={isActivatingIntegration}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isActivatingIntegration ? '⏳ Activating...' : '🔗 Activate Integration'}
                </button>
              </div>
            </div>
          </div>

          {/* Active Partnerships */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Handshake className="mr-2 text-purple-600" />
              Active Partnerships ({partnerships.length})
            </h3>
            <div className="space-y-4">
              {partnerships.map((partnership) => (
                <div key={partnership.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{partnership.name}</h4>
                      <p className="text-sm text-gray-600">{partnership.partner.name} • {partnership.partner.industry}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(partnership.type)}`}>
                        {partnership.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(partnership.status)}`}>
                        {partnership.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(partnership.priority)}`}>
                        {partnership.priority}
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

                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{partnership.metrics.satisfaction * 10}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${partnership.metrics.satisfaction * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Contact:</span> {partnership.contact.name} | 
                    <span className="font-medium ml-2">Revenue Type:</span> {partnership.agreement.revenue.type} | 
                    <span className="font-medium ml-2">Next:</span> {partnership.metrics.nextMilestone}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Pipeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="mr-2 text-green-600" />
              Partnership Pipeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {partnershipPipeline.map((stage) => (
                <div key={stage.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">{stage.stage}</h4>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {stage.metrics.count}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Value:</span>
                      <span className="font-medium text-gray-900">${(stage.metrics.expectedValue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Probability:</span>
                      <span className="font-medium text-gray-900">{stage.metrics.probability}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Value:</span>
                      <span className="font-medium text-gray-900">${(stage.metrics.avgDealSize / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Cycle:</span>
                      <span className="font-medium text-gray-900">{stage.metrics.avgCycle} days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Team */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="mr-2 text-blue-600" />
              Partnership Team ({partnershipTeam.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {partnershipTeam.map((member) => (
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
                      <span className="text-gray-600">Partnerships:</span>
                      <span className="font-medium text-gray-900">{member.partnerships}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-gray-900">${(member.performance.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Success Rate:</span>
                      <span className="font-medium text-gray-900">{member.metrics.successRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Satisfaction:</span>
                      <span className="font-medium text-gray-900">{member.metrics.satisfactionScore}/10</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Activities:</span> {Object.values(member.activities).reduce((sum, val) => sum + val, 0)} total | 
                    <span className="font-medium ml-2">Avg Value:</span> ${(member.metrics.avgPartnershipValue / 1000).toFixed(0)}K
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Activity className="mr-2 text-orange-600" />
              Recent Partnership Activities
            </h3>
            <div className="space-y-4">
              {partnerships.flatMap(p => p.activities).slice(0, 6).map((activity) => (
                <div key={activity.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{activity.description}</h4>
                      <p className="text-sm text-gray-600">{activity.type} activity</p>
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
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span> {formatDate(activity.date)}
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

export default PartnershipActivation;