import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, Target, Users, DollarSign, TrendingUp, BarChart3, CheckCircle, AlertTriangle, Clock, Settings, Code, Award, Star, Zap, Mail, Phone, Calendar, MapPin, Building, Share2, Download, Upload, Eye, Edit, Save, Send, Globe, Megaphone, Handshake, Briefcase, PieChart, LineChart, Activity } from 'lucide-react';

interface LaunchCampaign {
  id: string;
  name: string;
  type: 'product-hunt' | 'social-media' | 'email' | 'pr' | 'influencer' | 'partnership';
  status: 'planned' | 'active' | 'completed' | 'paused';
  startDate: Date;
  endDate: Date;
  targetAudience: string;
  goals: {
    awareness: number;
    signups: number;
    conversions: number;
    revenue: number;
  };
  metrics: {
    reach: number;
    engagement: number;
    clicks: number;
    signups: number;
    conversions: number;
    revenue: number;
  };
  channels: {
    name: string;
    type: 'website' | 'social' | 'email' | 'paid' | 'pr';
    budget: number;
    performance: {
      impressions: number;
      clicks: number;
      conversions: number;
      cost: number;
    };
  }[];
  content: {
    headlines: string[];
    descriptions: string[];
    ctas: string[];
    visuals: string[];
  };
  team: {
    role: string;
    person: string;
    responsibilities: string[];
  }[];
}

interface LaunchMilestone {
  id: string;
  name: string;
  description: string;
  type: 'pre-launch' | 'launch' | 'post-launch';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'critical' | 'high' | 'medium' | 'low';
  dueDate: Date;
  assignedTo: string;
  dependencies: string[];
  deliverables: string[];
  successCriteria: string[];
  progress: number;
  notes: string;
}

interface MarketEntryStrategy {
  id: string;
  market: string;
  segment: string;
  approach: 'direct' | 'partnership' | 'channel' | 'freemium';
  status: 'research' | 'planning' | 'executing' | 'scaling';
  targetCustomers: {
    size: string;
    industry: string;
    useCase: string;
    budget: string;
  };
  competition: {
    name: string;
    strength: 'weak' | 'moderate' | 'strong';
    marketShare: number;
    pricing: number;
    differentiation: string;
  }[];
  pricing: {
    strategy: string;
    entryPrice: number;
    premiumPrice: number;
    discountStrategy: string;
  };
  channels: {
    name: string;
    type: 'direct' | 'partner' | 'reseller' | 'online';
    priority: number;
    investment: number;
    expectedROI: number;
  }[];
  metrics: {
    targetCustomers: number;
    marketShare: number;
    revenue: number;
    timeline: string;
  };
}

interface LaunchMetrics {
  id: string;
  period: string;
  metrics: {
    websiteTraffic: number;
    signups: number;
    conversions: number;
    revenue: number;
    socialMediaReach: number;
    pressMentions: number;
    demoRequests: number;
    enterpriseInquiries: number;
  };
  trends: {
    trafficTrend: number[];
    signupTrend: number[];
    conversionTrend: number[];
    revenueTrend: number[];
  };
  channels: {
    organic: number;
    paid: number;
    social: number;
    email: number;
    referral: number;
    direct: number;
  };
  goals: {
    targetTraffic: number;
    targetSignups: number;
    targetConversions: number;
    targetRevenue: number;
  };
}

interface LaunchTeam {
  id: string;
  role: string;
  person: string;
  responsibilities: string[];
  availability: 'full-time' | 'part-time' | 'contract';
  expertise: string[];
  currentTasks: {
    task: string;
    priority: string;
    dueDate: Date;
    status: string;
  }[];
}

interface LaunchRisk {
  id: string;
  category: 'technical' | 'market' | 'competitive' | 'financial' | 'operational';
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  probability: 'low' | 'medium' | 'high';
  mitigation: string[];
  owner: string;
  status: 'identified' | 'mitigating' | 'resolved';
}

const LaunchExecutionMarketEntry: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [launchCampaigns, setLaunchCampaigns] = useState<LaunchCampaign[]>([]);
  const [launchMilestones, setLaunchMilestones] = useState<LaunchMilestone[]>([]);
  const [marketEntryStrategies, setMarketEntryStrategies] = useState<MarketEntryStrategy[]>([]);
  const [launchMetrics, setLaunchMetrics] = useState<LaunchMetrics[]>([]);
  const [launchTeam, setLaunchTeam] = useState<LaunchTeam[]>([]);
  const [launchRisks, setLaunchRisks] = useState<LaunchRisk[]>([]);
  const [isExecutingLaunch, setIsExecutingLaunch] = useState(false);
  const [isActivatingCampaign, setIsActivatingCampaign] = useState(false);
  const [isMonitoringMetrics, setIsMonitoringMetrics] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<LaunchCampaign | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<LaunchMilestone | null>(null);

  // Generate launch data
  useEffect(() => {
    const generateLaunchCampaigns = (): LaunchCampaign[] => {
      return [
        {
          id: 'campaign-1',
          name: 'Product Hunt Launch',
          type: 'product-hunt',
          status: 'active',
          startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          targetAudience: 'Early adopters and productivity enthusiasts',
          goals: {
            awareness: 100000,
            signups: 5000,
            conversions: 500,
            revenue: 25000
          },
          metrics: {
            reach: 75000,
            engagement: 3500,
            clicks: 2800,
            signups: 420,
            conversions: 89,
            revenue: 4450
          },
          channels: [
            {
              name: 'Product Hunt',
              type: 'website',
              budget: 0,
              performance: {
                impressions: 50000,
                clicks: 2000,
                conversions: 300,
                cost: 0
              }
            },
            {
              name: 'Social Media Blitz',
              type: 'social',
              budget: 2000,
              performance: {
                impressions: 25000,
                clicks: 800,
                conversions: 89,
                cost: 2000
              }
            }
          ],
          content: {
            headlines: [
              'SyncScript: The Ultimate Productivity Platform',
              'Revolutionize Your Team\'s Productivity Today',
              'Join 10,000+ Teams Using SyncScript'
            ],
            descriptions: [
              'AI-powered productivity platform that adapts to your energy and team needs',
              'The most comprehensive productivity solution ever built',
              'Transform your team\'s productivity with intelligent task management'
            ],
            ctas: [
              'Try SyncScript Free',
              'Start Your Productivity Journey',
              'Join the Revolution'
            ],
            visuals: [
              'product-hunt-banner.jpg',
              'social-media-graphics.png',
              'email-header.jpg'
            ]
          },
          team: [
            {
              role: 'Campaign Manager',
              person: 'Sarah Johnson',
              responsibilities: ['Campaign coordination', 'Content approval', 'Performance monitoring']
            },
            {
              role: 'Social Media Manager',
              person: 'Mike Chen',
              responsibilities: ['Social media posts', 'Community engagement', 'Influencer outreach']
            }
          ]
        },
        {
          id: 'campaign-2',
          name: 'LinkedIn Enterprise Campaign',
          type: 'social-media',
          status: 'active',
          startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          targetAudience: 'Enterprise decision makers and IT leaders',
          goals: {
            awareness: 50000,
            signups: 1000,
            conversions: 100,
            revenue: 100000
          },
          metrics: {
            reach: 35000,
            engagement: 1200,
            clicks: 450,
            signups: 89,
            conversions: 12,
            revenue: 12000
          },
          channels: [
            {
              name: 'LinkedIn Ads',
              type: 'paid',
              budget: 5000,
              performance: {
                impressions: 30000,
                clicks: 400,
                conversions: 10,
                cost: 5000
              }
            },
            {
              name: 'LinkedIn Organic',
              type: 'social',
              budget: 0,
              performance: {
                impressions: 5000,
                clicks: 50,
                conversions: 2,
                cost: 0
              }
            }
          ],
          content: {
            headlines: [
              'Enterprise-Grade Productivity Platform',
              'Scale Your Team\'s Productivity with SyncScript',
              'Trusted by Leading Organizations'
            ],
            descriptions: [
              'Enterprise-grade security, compliance, and scalability',
              'Advanced analytics and reporting for large teams',
              'Custom integrations and white-label solutions'
            ],
            ctas: [
              'Schedule Enterprise Demo',
              'Request Custom Quote',
              'Speak with Sales'
            ],
            visuals: [
              'enterprise-dashboard.jpg',
              'security-compliance.png',
              'integration-diagram.jpg'
            ]
          },
          team: [
            {
              role: 'Enterprise Sales Manager',
              person: 'Emma Davis',
              responsibilities: ['Lead qualification', 'Demo scheduling', 'Proposal creation']
            },
            {
              role: 'Marketing Manager',
              person: 'David Wilson',
              responsibilities: ['Campaign optimization', 'Content creation', 'Performance analysis']
            }
          ]
        }
      ];
    };

    const generateLaunchMilestones = (): LaunchMilestone[] => {
      return [
        {
          id: 'milestone-1',
          name: 'Product Hunt Submission',
          description: 'Submit SyncScript to Product Hunt for launch day',
          type: 'pre-launch',
          status: 'completed',
          priority: 'critical',
          dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          assignedTo: 'Sarah Johnson',
          dependencies: ['Product finalization', 'Marketing materials'],
          deliverables: ['Product Hunt listing', 'Launch assets', 'Hunter coordination'],
          successCriteria: ['Successful submission', 'Hunter confirmation', 'Launch assets ready'],
          progress: 100,
          notes: 'Successfully submitted with Hunter confirmation'
        },
        {
          id: 'milestone-2',
          name: 'Social Media Campaign Launch',
          description: 'Launch coordinated social media campaign across all platforms',
          type: 'launch',
          status: 'in-progress',
          priority: 'high',
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          assignedTo: 'Mike Chen',
          dependencies: ['Content creation', 'Platform setup'],
          deliverables: ['Social media posts', 'Graphics', 'Scheduling'],
          successCriteria: ['Posts live on all platforms', 'Engagement targets met'],
          progress: 75,
          notes: 'Twitter and LinkedIn live, Instagram pending'
        },
        {
          id: 'milestone-3',
          name: 'Email Campaign Execution',
          description: 'Send launch announcement to email subscribers',
          type: 'launch',
          status: 'pending',
          priority: 'high',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          assignedTo: 'Lisa Anderson',
          dependencies: ['Email template', 'Subscriber list'],
          deliverables: ['Email template', 'Send schedule', 'Performance tracking'],
          successCriteria: ['Email sent to all subscribers', 'Open rate > 25%'],
          progress: 50,
          notes: 'Template ready, testing in progress'
        },
        {
          id: 'milestone-4',
          name: 'Press Release Distribution',
          description: 'Distribute press release to industry publications',
          type: 'post-launch',
          status: 'pending',
          priority: 'medium',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          assignedTo: 'Robert Taylor',
          dependencies: ['Press release writing', 'Media list'],
          deliverables: ['Press release', 'Media outreach', 'Coverage tracking'],
          successCriteria: ['5+ media mentions', 'Industry coverage'],
          progress: 25,
          notes: 'Press release drafted, media list compiled'
        },
        {
          id: 'milestone-5',
          name: 'Analytics and Reporting',
          description: 'Set up comprehensive analytics and reporting system',
          type: 'post-launch',
          status: 'in-progress',
          priority: 'medium',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          assignedTo: 'Technical Team',
          dependencies: ['Analytics setup', 'Dashboard creation'],
          deliverables: ['Analytics dashboard', 'Reporting system', 'KPI tracking'],
          successCriteria: ['Real-time metrics', 'Automated reports'],
          progress: 60,
          notes: 'Dashboard in development, basic metrics live'
        }
      ];
    };

    const generateMarketEntryStrategies = (): MarketEntryStrategy[] => {
      return [
        {
          id: 'strategy-1',
          market: 'North America',
          segment: 'SMB Productivity Tools',
          approach: 'freemium',
          status: 'executing',
          targetCustomers: {
            size: '10-500 employees',
            industry: 'Technology, Consulting, Professional Services',
            useCase: 'Team productivity and project management',
            budget: '$100-5000/month'
          },
          competition: [
            {
              name: 'Asana',
              strength: 'strong',
              marketShare: 25,
              pricing: 15,
              differentiation: 'Better AI and energy management'
            },
            {
              name: 'Monday.com',
              strength: 'strong',
              marketShare: 20,
              pricing: 25,
              differentiation: 'More intuitive interface'
            },
            {
              name: 'Notion',
              strength: 'moderate',
              marketShare: 15,
              pricing: 8,
              differentiation: 'Integrated workspace solution'
            }
          ],
          pricing: {
            strategy: 'Freemium with premium tiers',
            entryPrice: 0,
            premiumPrice: 29,
            discountStrategy: 'Annual discounts, volume pricing'
          },
          channels: [
            {
              name: 'Direct Sales',
              type: 'direct',
              priority: 1,
              investment: 10000,
              expectedROI: 300
            },
            {
              name: 'Content Marketing',
              type: 'online',
              priority: 2,
              investment: 5000,
              expectedROI: 200
            },
            {
              name: 'Partner Channel',
              type: 'partner',
              priority: 3,
              investment: 3000,
              expectedROI: 150
            }
          ],
          metrics: {
            targetCustomers: 5000,
            marketShare: 5,
            revenue: 500000,
            timeline: '12 months'
          }
        },
        {
          id: 'strategy-2',
          market: 'Europe',
          segment: 'Enterprise Productivity',
          approach: 'partnership',
          status: 'planning',
          targetCustomers: {
            size: '500+ employees',
            industry: 'Financial Services, Healthcare, Manufacturing',
            useCase: 'Enterprise productivity and compliance',
            budget: '$5000-50000/month'
          },
          competition: [
            {
              name: 'Microsoft 365',
              strength: 'strong',
              marketShare: 40,
              pricing: 22,
              differentiation: 'Better integration and customization'
            },
            {
              name: 'Google Workspace',
              strength: 'strong',
              marketShare: 30,
              pricing: 18,
              differentiation: 'Superior AI and analytics'
            }
          ],
          pricing: {
            strategy: 'Enterprise licensing with volume discounts',
            entryPrice: 99,
            premiumPrice: 299,
            discountStrategy: 'Volume discounts, multi-year contracts'
          },
          channels: [
            {
              name: 'System Integrators',
              type: 'partner',
              priority: 1,
              investment: 15000,
              expectedROI: 250
            },
            {
              name: 'Direct Enterprise Sales',
              type: 'direct',
              priority: 2,
              investment: 20000,
              expectedROI: 400
            }
          ],
          metrics: {
            targetCustomers: 100,
            marketShare: 2,
            revenue: 2000000,
            timeline: '18 months'
          }
        }
      ];
    };

    const generateLaunchMetrics = (): LaunchMetrics[] => {
      return [
        {
          id: 'metrics-1',
          period: 'Launch Week',
          metrics: {
            websiteTraffic: 45000,
            signups: 1250,
            conversions: 89,
            revenue: 15420,
            socialMediaReach: 125000,
            pressMentions: 15,
            demoRequests: 45,
            enterpriseInquiries: 12
          },
          trends: {
            trafficTrend: [5000, 8000, 12000, 15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 40000, 42000, 45000],
            signupTrend: [150, 250, 350, 450, 550, 650, 750, 850, 950, 1050, 1150, 1250],
            conversionTrend: [8, 12, 18, 25, 32, 40, 48, 56, 64, 72, 80, 89],
            revenueTrend: [1200, 2400, 3600, 4800, 6000, 7200, 8400, 9600, 10800, 12000, 13200, 14400, 15420]
          },
          channels: {
            organic: 35,
            paid: 25,
            social: 20,
            email: 15,
            referral: 3,
            direct: 2
          },
          goals: {
            targetTraffic: 50000,
            targetSignups: 1500,
            targetConversions: 100,
            targetRevenue: 20000
          }
        }
      ];
    };

    const generateLaunchTeam = (): LaunchTeam[] => {
      return [
        {
          id: 'team-1',
          role: 'Launch Manager',
          person: 'Sarah Johnson',
          responsibilities: ['Campaign coordination', 'Milestone tracking', 'Team management'],
          availability: 'full-time',
          expertise: ['Project management', 'Marketing', 'Team leadership'],
          currentTasks: [
            {
              task: 'Product Hunt coordination',
              priority: 'critical',
              dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
              status: 'in-progress'
            },
            {
              task: 'Team status updates',
              priority: 'high',
              dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
              status: 'pending'
            }
          ]
        },
        {
          id: 'team-2',
          role: 'Social Media Manager',
          person: 'Mike Chen',
          responsibilities: ['Social media strategy', 'Content creation', 'Community engagement'],
          availability: 'full-time',
          expertise: ['Social media', 'Content creation', 'Community management'],
          currentTasks: [
            {
              task: 'Launch day social posts',
              priority: 'critical',
              dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
              status: 'in-progress'
            },
            {
              task: 'Influencer outreach',
              priority: 'high',
              dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              status: 'pending'
            }
          ]
        },
        {
          id: 'team-3',
          role: 'Enterprise Sales Manager',
          person: 'Emma Davis',
          responsibilities: ['Enterprise sales', 'Demo coordination', 'Proposal creation'],
          availability: 'full-time',
          expertise: ['Enterprise sales', 'Product demos', 'Proposal writing'],
          currentTasks: [
            {
              task: 'Enterprise demo scheduling',
              priority: 'high',
              dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
              status: 'pending'
            },
            {
              task: 'Sales pipeline review',
              priority: 'medium',
              dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              status: 'pending'
            }
          ]
        }
      ];
    };

    const generateLaunchRisks = (): LaunchRisk[] => {
      return [
        {
          id: 'risk-1',
          category: 'technical',
          description: 'Server overload during launch traffic spike',
          impact: 'high',
          probability: 'medium',
          mitigation: ['Load testing', 'Auto-scaling setup', 'CDN implementation'],
          owner: 'Technical Team',
          status: 'mitigating'
        },
        {
          id: 'risk-2',
          category: 'competitive',
          description: 'Competitor launches similar product during our launch',
          impact: 'medium',
          probability: 'low',
          mitigation: ['Unique positioning', 'Patent protection', 'Speed to market'],
          owner: 'Marketing Team',
          status: 'identified'
        },
        {
          id: 'risk-3',
          category: 'market',
          description: 'Lower than expected market interest in productivity tools',
          impact: 'medium',
          probability: 'low',
          mitigation: ['Market research validation', 'Pivot strategy', 'Niche targeting'],
          owner: 'Product Team',
          status: 'identified'
        }
      ];
    };

    setLaunchCampaigns(generateLaunchCampaigns());
    setLaunchMilestones(generateLaunchMilestones());
    setMarketEntryStrategies(generateMarketEntryStrategies());
    setLaunchMetrics(generateLaunchMetrics());
    setLaunchTeam(generateLaunchTeam());
    setLaunchRisks(generateLaunchRisks());
  }, []);

  const executeLaunch = async () => {
    setIsExecutingLaunch(true);
    
    // Simulate launch execution
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    // Update campaign metrics
    setLaunchCampaigns(prev => prev.map(campaign => 
      campaign.status === 'active' 
        ? { 
            ...campaign, 
            metrics: {
              ...campaign.metrics,
              reach: campaign.metrics.reach + 10000,
              engagement: campaign.metrics.engagement + 500,
              signups: campaign.metrics.signups + 50,
              conversions: campaign.metrics.conversions + 10,
              revenue: campaign.metrics.revenue + 2000
            }
          }
        : campaign
    ));
    
    setIsExecutingLaunch(false);
  };

  const activateCampaign = async () => {
    setIsActivatingCampaign(true);
    
    // Simulate campaign activation
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Update campaign status
    setLaunchCampaigns(prev => prev.map(campaign => 
      campaign.status === 'planned' 
        ? { 
            ...campaign, 
            status: 'active' as const,
            startDate: new Date()
          }
        : campaign
    ));
    
    setIsActivatingCampaign(false);
  };

  const monitorMetrics = async () => {
    setIsMonitoringMetrics(true);
    
    // Simulate metrics monitoring
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update metrics
    setLaunchMetrics(prev => prev.map(metrics => 
      ({ 
        ...metrics, 
        metrics: {
          ...metrics.metrics,
          websiteTraffic: metrics.metrics.websiteTraffic + 1000,
          signups: metrics.metrics.signups + 25,
          conversions: metrics.metrics.conversions + 5,
          revenue: metrics.metrics.revenue + 500
        }
      })
    ));
    
    setIsMonitoringMetrics(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': case 'completed': case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': case 'mitigating': return 'bg-yellow-100 text-yellow-800';
      case 'pending': case 'identified': case 'planned': return 'bg-blue-100 text-blue-800';
      case 'paused': case 'blocked': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
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
      case 'product-hunt': return 'bg-orange-100 text-orange-800';
      case 'social-media': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'pr': return 'bg-purple-100 text-purple-800';
      case 'influencer': return 'bg-pink-100 text-pink-800';
      case 'partnership': return 'bg-indigo-100 text-indigo-800';
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

  const totalReach = launchMetrics[0]?.metrics.websiteTraffic || 0;
  const totalSignups = launchMetrics[0]?.metrics.signups || 0;
  const totalRevenue = launchMetrics[0]?.metrics.revenue || 0;
  const activeCampaigns = launchCampaigns.filter(c => c.status === 'active').length;
  const completedMilestones = launchMilestones.filter(m => m.status === 'completed').length;
  const totalMilestones = launchMilestones.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🚀 Launch Execution & Market Entry</h2>
              <p className="text-orange-100 mt-1">Execute Product Hunt launch, activate campaigns, and enter new markets</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Launch Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Website Traffic</p>
                  <p className="text-2xl font-bold text-orange-800">{totalReach.toLocaleString()}</p>
                  <p className="text-xs text-orange-600">Launch week</p>
                </div>
                <Globe className="text-3xl text-orange-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Signups</p>
                  <p className="text-2xl font-bold text-green-800">{totalSignups.toLocaleString()}</p>
                  <p className="text-xs text-green-600">New users</p>
                </div>
                <Users className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Active Campaigns</p>
                  <p className="text-2xl font-bold text-blue-800">{activeCampaigns}</p>
                  <p className="text-xs text-blue-600">Running campaigns</p>
                </div>
                <Megaphone className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Milestones</p>
                  <p className="text-2xl font-bold text-purple-800">{completedMilestones}/{totalMilestones}</p>
                  <p className="text-xs text-purple-600">Completed</p>
                </div>
                <Target className="text-3xl text-purple-600" />
              </div>
            </div>
          </div>

          {/* Launch Actions */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6 border-2 border-orange-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-orange-700 font-medium">
                🚀 Launch Execution Active - Product Hunt launch live and campaigns running!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={executeLaunch}
                  disabled={isExecutingLaunch}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                >
                  {isExecutingLaunch ? '⏳ Executing...' : '🚀 Execute Launch'}
                </button>
                <button
                  onClick={activateCampaign}
                  disabled={isActivatingCampaign}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isActivatingCampaign ? '⏳ Activating...' : '📢 Activate Campaign'}
                </button>
                <button
                  onClick={monitorMetrics}
                  disabled={isMonitoringMetrics}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isMonitoringMetrics ? '⏳ Monitoring...' : '📊 Monitor Metrics'}
                </button>
              </div>
            </div>
          </div>

          {/* Launch Campaigns */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Megaphone className="mr-2 text-orange-600" />
              Launch Campaigns ({launchCampaigns.length})
            </h3>
            <div className="space-y-4">
              {launchCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">{campaign.targetAudience}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(campaign.type)}`}>
                        {campaign.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Reach:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.reach.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Signups:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.signups}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Conversions:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.conversions}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-gray-900 ml-1">${campaign.metrics.revenue.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Channels:</span> {campaign.channels.length} active | 
                    <span className="font-medium ml-2">Team:</span> {campaign.team.length} members | 
                    <span className="font-medium ml-2">Duration:</span> {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Launch Milestones */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="mr-2 text-blue-600" />
              Launch Milestones ({launchMilestones.length})
            </h3>
            <div className="space-y-4">
              {launchMilestones.map((milestone) => (
                <div key={milestone.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{milestone.name}</h4>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(milestone.priority)}`}>
                        {milestone.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-600">Assigned to:</span>
                      <span className="font-medium text-gray-900 ml-1">{milestone.assignedTo}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatDate(milestone.dueDate)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Dependencies:</span>
                      <span className="font-medium text-gray-900 ml-1">{milestone.dependencies.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Deliverables:</span>
                      <span className="font-medium text-gray-900 ml-1">{milestone.deliverables.length}</span>
                    </div>
                  </div>

                  {milestone.notes && (
                    <div className="text-sm text-gray-600 bg-white rounded p-2">
                      <span className="font-medium">Notes:</span> {milestone.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Market Entry Strategies */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Globe className="mr-2 text-green-600" />
              Market Entry Strategies ({marketEntryStrategies.length})
            </h3>
            <div className="space-y-4">
              {marketEntryStrategies.map((strategy) => (
                <div key={strategy.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{strategy.market} - {strategy.segment}</h4>
                      <p className="text-sm text-gray-600">{strategy.targetCustomers.industry} • {strategy.targetCustomers.size}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(strategy.status)}`}>
                        {strategy.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}>
                        {strategy.approach}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Target Customers:</span>
                      <span className="font-medium text-gray-900 ml-1">{strategy.metrics.targetCustomers.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Market Share:</span>
                      <span className="font-medium text-gray-900 ml-1">{strategy.metrics.marketShare}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Revenue Target:</span>
                      <span className="font-medium text-gray-900 ml-1">${strategy.metrics.revenue.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-medium text-gray-900 ml-1">{strategy.metrics.timeline}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Competition:</span> {strategy.competition.length} competitors | 
                    <span className="font-medium ml-2">Channels:</span> {strategy.channels.length} channels | 
                    <span className="font-medium ml-2">Budget:</span> ${strategy.channels.reduce((sum, c) => sum + c.investment, 0).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Launch Team */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="mr-2 text-purple-600" />
              Launch Team ({launchTeam.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {launchTeam.map((member) => (
                <div key={member.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{member.person}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.availability)}`}>
                      {member.availability}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">Responsibilities:</div>
                    <div className="text-sm text-gray-800">
                      {member.responsibilities.slice(0, 2).map((resp, index) => (
                        <div key={index}>• {resp}</div>
                      ))}
                      {member.responsibilities.length > 2 && (
                        <div className="text-gray-500">+{member.responsibilities.length - 2} more</div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Current Tasks:</span> {member.currentTasks.length} | 
                    <span className="font-medium ml-2">Expertise:</span> {member.expertise.length} areas
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Launch Risks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-600" />
              Launch Risks ({launchRisks.length})
            </h3>
            <div className="space-y-4">
              {launchRisks.map((risk) => (
                <div key={risk.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{risk.description}</h4>
                      <p className="text-sm text-gray-600">{risk.category} risk</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(risk.impact)}`}>
                        {risk.impact} impact
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(risk.status)}`}>
                        {risk.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-600">Probability:</span>
                      <span className="font-medium text-gray-900 ml-1">{risk.probability}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Owner:</span>
                      <span className="font-medium text-gray-900 ml-1">{risk.owner}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Mitigations:</span>
                      <span className="font-medium text-gray-900 ml-1">{risk.mitigation.length}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Mitigation Actions:</span>
                    <div className="mt-1">
                      {risk.mitigation.map((action, index) => (
                        <div key={index}>• {action}</div>
                      ))}
                    </div>
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

export default LaunchExecutionMarketEntry;
