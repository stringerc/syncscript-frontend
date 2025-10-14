import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, Globe, FileText, Image, Video, Users, Target, TrendingUp, BarChart3, CheckCircle, AlertTriangle, Clock, Settings, Code, Award, Star, Zap, Rocket, Mail, Phone, Calendar, MapPin, Building, Share2, Download, Upload, Eye, Edit, Save, Send } from 'lucide-react';

interface MarketingAsset {
  id: string;
  name: string;
  type: 'landing-page' | 'email-template' | 'social-media' | 'video' | 'documentation' | 'press-release' | 'demo' | 'case-study';
  category: 'content' | 'visual' | 'interactive' | 'documentation';
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived';
  title: string;
  description: string;
  content: string;
  targetAudience: string;
  channels: string[];
  metrics: {
    views: number;
    clicks: number;
    conversions: number;
    engagement: number;
    shares: number;
  };
  lastUpdated: Date;
  createdBy: string;
  tags: string[];
  assets: {
    images: string[];
    videos: string[];
    documents: string[];
  };
}

interface LaunchCampaign {
  id: string;
  name: string;
  phase: 'pre-launch' | 'soft-launch' | 'public-launch' | 'post-launch';
  status: 'planned' | 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate: Date | null;
  targetAudience: string;
  goals: {
    awareness: number;
    signups: number;
    conversions: number;
    revenue: number;
  };
  channels: {
    name: string;
    type: 'social' | 'email' | 'content' | 'paid' | 'pr' | 'events';
    budget: number;
    status: 'active' | 'paused' | 'completed';
    metrics: {
      reach: number;
      engagement: number;
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
  metrics: {
    totalReach: number;
    totalEngagement: number;
    totalConversions: number;
    totalCost: number;
    roi: number;
  };
}

interface ContentCalendar {
  id: string;
  date: Date;
  content: {
    id: string;
    title: string;
    type: 'blog-post' | 'social-media' | 'email' | 'video' | 'webinar' | 'press-release';
    status: 'scheduled' | 'published' | 'draft';
    channels: string[];
    targetAudience: string;
    goals: string[];
    metrics: {
      views: number;
      engagement: number;
      conversions: number;
    };
  }[];
  themes: string[];
  campaigns: string[];
}

interface PressKit {
  id: string;
  name: string;
  version: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  assets: {
    logo: {
      primary: string;
      secondary: string;
      variations: string[];
    };
    images: {
      product: string[];
      team: string[];
      office: string[];
      screenshots: string[];
    };
    documents: {
      factSheet: string;
      pressRelease: string;
      caseStudies: string[];
      whitepapers: string[];
    };
    videos: {
      demo: string;
      explainer: string;
      testimonials: string[];
    };
  };
  content: {
    companyDescription: string;
    productDescription: string;
    keyFeatures: string[];
    statistics: Record<string, number>;
    quotes: {
      text: string;
      author: string;
      title: string;
    }[];
    contact: {
      email: string;
      phone: string;
      pressEmail: string;
    };
  };
  lastUpdated: Date;
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
    emailSubscribers: number;
    demoRequests: number;
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

const MarketingLaunchPreparation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [marketingAssets, setMarketingAssets] = useState<MarketingAsset[]>([]);
  const [launchCampaigns, setLaunchCampaigns] = useState<LaunchCampaign[]>([]);
  const [contentCalendar, setContentCalendar] = useState<ContentCalendar[]>([]);
  const [pressKit, setPressKit] = useState<PressKit[]>([]);
  const [launchMetrics, setLaunchMetrics] = useState<LaunchMetrics[]>([]);
  const [isCreatingAsset, setIsCreatingAsset] = useState(false);
  const [isLaunchingCampaign, setIsLaunchingCampaign] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<MarketingAsset | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<LaunchCampaign | null>(null);

  // Generate marketing data
  useEffect(() => {
    const generateMarketingAssets = (): MarketingAsset[] => {
      return [
        {
          id: 'asset-1',
          name: 'SyncScript Landing Page',
          type: 'landing-page',
          category: 'interactive',
          status: 'published',
          title: 'Revolutionize Your Team\'s Productivity',
          description: 'Main landing page showcasing SyncScript\'s revolutionary features',
          content: 'SyncScript combines AI-powered insights, energy-based task management, and seamless team collaboration in one powerful platform.',
          targetAudience: 'Product Managers, CTOs, and Team Leaders',
          channels: ['Website', 'Google Ads', 'LinkedIn'],
          metrics: {
            views: 15420,
            clicks: 1250,
            conversions: 89,
            engagement: 8.1,
            shares: 156
          },
          lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          createdBy: 'Marketing Team',
          tags: ['landing-page', 'conversion', 'productivity'],
          assets: {
            images: ['hero-image.jpg', 'feature-screenshots.png'],
            videos: ['product-demo.mp4'],
            documents: ['landing-page-copy.docx']
          }
        },
        {
          id: 'asset-2',
          name: 'Product Demo Video',
          type: 'video',
          category: 'visual',
          status: 'published',
          title: 'SyncScript in Action: 5-Minute Demo',
          description: 'Comprehensive product demonstration video',
          content: 'Watch how SyncScript transforms team productivity with AI-powered insights and energy-based task management.',
          targetAudience: 'Decision Makers and Evaluators',
          channels: ['Website', 'YouTube', 'LinkedIn', 'Email'],
          metrics: {
            views: 8920,
            clicks: 450,
            conversions: 34,
            engagement: 9.2,
            shares: 89
          },
          lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          createdBy: 'Product Team',
          tags: ['demo', 'video', 'productivity'],
          assets: {
            images: ['video-thumbnail.jpg'],
            videos: ['product-demo.mp4', 'demo-trailer.mp4'],
            documents: ['demo-script.docx']
          }
        },
        {
          id: 'asset-3',
          name: 'Email Welcome Series',
          type: 'email-template',
          category: 'content',
          status: 'published',
          title: 'Welcome to SyncScript - Your Productivity Journey Starts Here',
          description: 'Automated email sequence for new users',
          content: 'Welcome to SyncScript! This series will guide you through getting started and maximizing your productivity.',
          targetAudience: 'New Users',
          channels: ['Email'],
          metrics: {
            views: 1250,
            clicks: 890,
            conversions: 156,
            engagement: 71.2,
            shares: 23
          },
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          createdBy: 'Marketing Team',
          tags: ['email', 'onboarding', 'welcome'],
          assets: {
            images: ['email-header.jpg'],
            videos: [],
            documents: ['email-templates.docx']
          }
        },
        {
          id: 'asset-4',
          name: 'LinkedIn Campaign Creative',
          type: 'social-media',
          category: 'visual',
          status: 'published',
          title: 'The Future of Team Productivity is Here',
          description: 'LinkedIn campaign creative for B2B audience',
          content: 'Join thousands of teams already using SyncScript to boost productivity by 40%.',
          targetAudience: 'B2B Professionals',
          channels: ['LinkedIn', 'Twitter'],
          metrics: {
            views: 25000,
            clicks: 1200,
            conversions: 67,
            engagement: 4.8,
            shares: 234
          },
          lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          createdBy: 'Social Media Team',
          tags: ['linkedin', 'b2b', 'social'],
          assets: {
            images: ['linkedin-ad.jpg', 'social-graphics.png'],
            videos: [],
            documents: ['social-copy.docx']
          }
        }
      ];
    };

    const generateLaunchCampaigns = (): LaunchCampaign[] => {
      return [
        {
          id: 'campaign-1',
          name: 'Product Hunt Launch',
          phase: 'public-launch',
          status: 'active',
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          targetAudience: 'Early adopters and productivity enthusiasts',
          goals: {
            awareness: 100000,
            signups: 5000,
            conversions: 500,
            revenue: 25000
          },
          channels: [
            {
              name: 'Product Hunt',
              type: 'content',
              budget: 0,
              status: 'active',
              metrics: {
                reach: 50000,
                engagement: 2500,
                conversions: 300,
                cost: 0
              }
            },
            {
              name: 'Social Media Blitz',
              type: 'social',
              budget: 2000,
              status: 'active',
              metrics: {
                reach: 25000,
                engagement: 1200,
                conversions: 150,
                cost: 2000
              }
            },
            {
              name: 'Email Newsletter',
              type: 'email',
              budget: 500,
              status: 'active',
              metrics: {
                reach: 10000,
                engagement: 800,
                conversions: 50,
                cost: 500
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
          metrics: {
            totalReach: 85000,
            totalEngagement: 4500,
            totalConversions: 500,
            totalCost: 2500,
            roi: 10.0
          }
        },
        {
          id: 'campaign-2',
          name: 'Enterprise Outreach',
          phase: 'post-launch',
          status: 'planned',
          startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          targetAudience: 'Enterprise decision makers and IT leaders',
          goals: {
            awareness: 50000,
            signups: 1000,
            conversions: 100,
            revenue: 100000
          },
          channels: [
            {
              name: 'LinkedIn Ads',
              type: 'paid',
              budget: 10000,
              status: 'planned',
              metrics: {
                reach: 0,
                engagement: 0,
                conversions: 0,
                cost: 0
              }
            },
            {
              name: 'Industry Events',
              type: 'events',
              budget: 15000,
              status: 'planned',
              metrics: {
                reach: 0,
                engagement: 0,
                conversions: 0,
                cost: 0
              }
            },
            {
              name: 'Content Marketing',
              type: 'content',
              budget: 5000,
              status: 'planned',
              metrics: {
                reach: 0,
                engagement: 0,
                conversions: 0,
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
          metrics: {
            totalReach: 0,
            totalEngagement: 0,
            totalConversions: 0,
            totalCost: 30000,
            roi: 0
          }
        }
      ];
    };

    const generateContentCalendar = (): ContentCalendar[] => {
      return [
        {
          id: 'calendar-1',
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          content: [
            {
              id: 'content-1',
              title: 'The Future of AI-Powered Productivity',
              type: 'blog-post',
              status: 'scheduled',
              channels: ['Website', 'LinkedIn', 'Twitter'],
              targetAudience: 'Productivity enthusiasts',
              goals: ['Thought leadership', 'SEO', 'Brand awareness'],
              metrics: {
                views: 0,
                engagement: 0,
                conversions: 0
              }
            },
            {
              id: 'content-2',
              title: 'SyncScript Product Hunt Launch',
              type: 'social-media',
              status: 'scheduled',
              channels: ['Twitter', 'LinkedIn', 'Facebook'],
              targetAudience: 'Early adopters',
              goals: ['Launch awareness', 'Community building'],
              metrics: {
                views: 0,
                engagement: 0,
                conversions: 0
              }
            }
          ],
          themes: ['AI Productivity', 'Team Collaboration', 'Product Launch'],
          campaigns: ['Product Hunt Launch', 'Thought Leadership']
        },
        {
          id: 'calendar-2',
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          content: [
            {
              id: 'content-3',
              title: 'How SyncScript Increased Team Productivity by 40%',
              type: 'case-study',
              status: 'scheduled',
              channels: ['Website', 'Email', 'LinkedIn'],
              targetAudience: 'Decision makers',
              goals: ['Social proof', 'Lead generation'],
              metrics: {
                views: 0,
                engagement: 0,
                conversions: 0
              }
            }
          ],
          themes: ['Case Study', 'Social Proof', 'Results'],
          campaigns: ['Social Proof', 'Lead Generation']
        }
      ];
    };

    const generatePressKit = (): PressKit[] => {
      return [
        {
          id: 'presskit-1',
          name: 'SyncScript Press Kit',
          version: '1.0',
          status: 'published',
          assets: {
            logo: {
              primary: 'syncscript-logo-primary.svg',
              secondary: 'syncscript-logo-secondary.svg',
              variations: ['logo-horizontal.svg', 'logo-vertical.svg', 'logo-icon.svg']
            },
            images: {
              product: ['dashboard-screenshot.jpg', 'mobile-app.jpg', 'team-view.jpg'],
              team: ['team-photo.jpg', 'founder-headshot.jpg'],
              office: ['office-exterior.jpg', 'office-interior.jpg'],
              screenshots: ['feature-screenshots.png', 'analytics-dashboard.jpg']
            },
            documents: {
              factSheet: 'syncscript-fact-sheet.pdf',
              pressRelease: 'syncscript-launch-press-release.pdf',
              caseStudies: ['case-study-techcorp.pdf', 'case-study-startupio.pdf'],
              whitepapers: ['ai-productivity-whitepaper.pdf', 'team-collaboration-study.pdf']
            },
            videos: {
              demo: 'syncscript-product-demo.mp4',
              explainer: 'syncscript-explainer-video.mp4',
              testimonials: ['testimonial-sarah.mp4', 'testimonial-mike.mp4']
            }
          },
          content: {
            companyDescription: 'SyncScript is revolutionizing team productivity with AI-powered insights, energy-based task management, and seamless collaboration tools.',
            productDescription: 'The most comprehensive productivity platform ever built, combining artificial intelligence, team collaboration, and intelligent automation.',
            keyFeatures: [
              'AI-powered productivity insights',
              'Energy-based task management',
              'Real-time team collaboration',
              'Advanced analytics and reporting',
              'Enterprise-grade security',
              'Custom integrations and APIs'
            ],
            statistics: {
              'Teams Using SyncScript': 1000,
              'Average Productivity Increase': 40,
              'User Satisfaction Score': 98,
              'Uptime': 99.9,
              'Security Score': 99
            },
            quotes: [
              {
                text: 'SyncScript has transformed how our team works together. The AI insights are incredibly accurate.',
                author: 'Sarah Johnson',
                title: 'Product Manager, TechCorp'
              },
              {
                text: 'The energy-based task management is revolutionary. It actually understands when I work best.',
                author: 'Mike Chen',
                title: 'CTO, StartupIO'
              }
            ],
            contact: {
              email: 'hello@syncscript.com',
              phone: '+1 (555) 123-4567',
              pressEmail: 'press@syncscript.com'
            }
          },
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateLaunchMetrics = (): LaunchMetrics[] => {
      return [
        {
          id: 'metrics-1',
          period: 'Last 30 Days',
          metrics: {
            websiteTraffic: 45000,
            signups: 1250,
            conversions: 89,
            revenue: 15420,
            socialMediaReach: 125000,
            pressMentions: 15,
            emailSubscribers: 3200,
            demoRequests: 45
          },
          trends: {
            trafficTrend: [1000, 1200, 1500, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500, 3800, 4000, 4200, 4500, 4800, 5000, 5200, 5500, 5800, 6000, 6200, 6500, 6800, 7000, 7200, 7500, 7800, 8000, 8500],
            signupTrend: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170],
            conversionTrend: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32],
            revenueTrend: [500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3500]
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

    setMarketingAssets(generateMarketingAssets());
    setLaunchCampaigns(generateLaunchCampaigns());
    setContentCalendar(generateContentCalendar());
    setPressKit(generatePressKit());
    setLaunchMetrics(generateLaunchMetrics());
  }, []);

  const createMarketingAsset = async () => {
    setIsCreatingAsset(true);
    
    // Simulate asset creation
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Add new asset
    const newAsset: MarketingAsset = {
      id: `asset-${Date.now()}`,
      name: 'New Marketing Asset',
      type: 'landing-page',
      category: 'content',
      status: 'draft',
      title: 'New Marketing Campaign',
      description: 'Created marketing asset for campaign',
      content: 'Marketing content for new campaign',
      targetAudience: 'Target audience',
      channels: ['Website'],
      metrics: {
        views: 0,
        clicks: 0,
        conversions: 0,
        engagement: 0,
        shares: 0
      },
      lastUpdated: new Date(),
      createdBy: 'Marketing Team',
      tags: ['new', 'campaign'],
      assets: {
        images: [],
        videos: [],
        documents: []
      }
    };
    
    setMarketingAssets(prev => [...prev, newAsset]);
    setIsCreatingAsset(false);
  };

  const launchCampaign = async () => {
    setIsLaunchingCampaign(true);
    
    // Simulate campaign launch
    await new Promise(resolve => setTimeout(resolve, 10000));
    
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
    
    setIsLaunchingCampaign(false);
  };

  const generateContent = async () => {
    setIsGeneratingContent(true);
    
    // Simulate content generation
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    setIsGeneratingContent(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'published': case 'approved': case 'active': case 'completed': return 'bg-green-100 text-green-800';
      case 'draft': case 'planned': case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'review': case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'paused': case 'archived': return 'bg-orange-100 text-orange-800';
      case 'rejected': case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'landing-page': return 'bg-blue-100 text-blue-800';
      case 'email-template': return 'bg-green-100 text-green-800';
      case 'social-media': return 'bg-purple-100 text-purple-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'documentation': return 'bg-gray-100 text-gray-800';
      case 'press-release': return 'bg-orange-100 text-orange-800';
      case 'demo': return 'bg-indigo-100 text-indigo-800';
      case 'case-study': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseColor = (phase: string): string => {
    switch (phase) {
      case 'pre-launch': return 'bg-blue-100 text-blue-800';
      case 'soft-launch': return 'bg-green-100 text-green-800';
      case 'public-launch': return 'bg-purple-100 text-purple-800';
      case 'post-launch': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAssets = marketingAssets.length;
  const publishedAssets = marketingAssets.filter(a => a.status === 'published').length;
  const totalCampaigns = launchCampaigns.length;
  const activeCampaigns = launchCampaigns.filter(c => c.status === 'active').length;
  const totalContent = contentCalendar.reduce((sum, cal) => sum + cal.content.length, 0);
  const scheduledContent = contentCalendar.reduce((sum, cal) => sum + cal.content.filter(c => c.status === 'scheduled').length, 0);
  const totalReach = launchMetrics[0]?.metrics.websiteTraffic || 0;
  const totalSignups = launchMetrics[0]?.metrics.signups || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">📢 Marketing & Launch Preparation</h2>
              <p className="text-purple-100 mt-1">Create compelling marketing materials, launch campaigns, and prepare for market success</p>
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
          {/* Marketing Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Marketing Assets</p>
                  <p className="text-2xl font-bold text-purple-800">{publishedAssets}/{totalAssets}</p>
                  <p className="text-xs text-purple-600">Published assets</p>
                </div>
                <FileText className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Launch Campaigns</p>
                  <p className="text-2xl font-bold text-green-800">{activeCampaigns}</p>
                  <p className="text-xs text-green-600">Active campaigns</p>
                </div>
                <Target className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Content Calendar</p>
                  <p className="text-2xl font-bold text-blue-800">{scheduledContent}</p>
                  <p className="text-xs text-blue-600">Scheduled posts</p>
                </div>
                <Calendar className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Website Traffic</p>
                  <p className="text-2xl font-bold text-orange-800">{totalReach.toLocaleString()}</p>
                  <p className="text-xs text-orange-600">Monthly visitors</p>
                </div>
                <TrendingUp className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* Marketing Actions */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border-2 border-purple-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-purple-700 font-medium">
                🎯 Marketing Campaigns Active - Building brand awareness and driving user acquisition!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={createMarketingAsset}
                  disabled={isCreatingAsset}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingAsset ? '⏳ Creating...' : '📝 Create Asset'}
                </button>
                <button
                  onClick={launchCampaign}
                  disabled={isLaunchingCampaign}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isLaunchingCampaign ? '⏳ Launching...' : '🚀 Launch Campaign'}
                </button>
                <button
                  onClick={generateContent}
                  disabled={isGeneratingContent}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingContent ? '⏳ Generating...' : '📊 Generate Content'}
                </button>
              </div>
            </div>
          </div>

          {/* Marketing Assets */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="mr-2 text-purple-600" />
              Marketing Assets ({marketingAssets.length})
            </h3>
            <div className="space-y-4">
              {marketingAssets.map((asset) => (
                <div key={asset.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{asset.name}</h4>
                      <p className="text-sm text-gray-600">{asset.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(asset.type)}`}>
                        {asset.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium text-gray-900 ml-1">{asset.metrics.views.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Clicks:</span>
                      <span className="font-medium text-gray-900 ml-1">{asset.metrics.clicks}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Conversions:</span>
                      <span className="font-medium text-gray-900 ml-1">{asset.metrics.conversions}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Engagement:</span>
                      <span className="font-medium text-gray-900 ml-1">{asset.metrics.engagement}%</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Channels:</span> {asset.channels.join(', ')} | 
                    <span className="font-medium ml-2">Target:</span> {asset.targetAudience}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Launch Campaigns */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="mr-2 text-green-600" />
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
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPhaseColor(campaign.phase)}`}>
                        {campaign.phase}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Reach:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.totalReach.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Engagement:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.totalEngagement}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Conversions:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.totalConversions}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">ROI:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.roi}x</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Channels:</span> {campaign.channels.length} active channels | 
                    <span className="font-medium ml-2">Budget:</span> ${campaign.metrics.totalCost.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Calendar */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2 text-blue-600" />
              Content Calendar
            </h3>
            <div className="space-y-4">
              {contentCalendar.map((calendar) => (
                <div key={calendar.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-800">{formatDate(calendar.date)}</h4>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {calendar.content.length} items
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {calendar.content.map((content) => (
                      <div key={content.id} className="flex justify-between items-center bg-white rounded p-2">
                        <div>
                          <div className="font-medium text-gray-800">{content.title}</div>
                          <div className="text-sm text-gray-600">{content.type} • {content.channels.join(', ')}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(content.status)}`}>
                          {content.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-600">
                    <span className="font-medium">Themes:</span> {calendar.themes.join(', ')} | 
                    <span className="font-medium ml-2">Campaigns:</span> {calendar.campaigns.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Launch Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="mr-2 text-orange-600" />
              Launch Metrics
            </h3>
            {launchMetrics.map((metrics) => (
              <div key={metrics.id} className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-800">{metrics.metrics.websiteTraffic.toLocaleString()}</div>
                    <div className="text-sm text-blue-600">Website Traffic</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-800">{metrics.metrics.signups}</div>
                    <div className="text-sm text-green-600">Signups</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-800">{metrics.metrics.conversions}</div>
                    <div className="text-sm text-purple-600">Conversions</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-800">${metrics.metrics.revenue.toLocaleString()}</div>
                    <div className="text-sm text-orange-600">Revenue</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Traffic Sources</h4>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{metrics.channels.organic}%</div>
                      <div className="text-gray-600">Organic</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{metrics.channels.paid}%</div>
                      <div className="text-gray-600">Paid</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{metrics.channels.social}%</div>
                      <div className="text-gray-600">Social</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{metrics.channels.email}%</div>
                      <div className="text-gray-600">Email</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{metrics.channels.referral}%</div>
                      <div className="text-gray-600">Referral</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{metrics.channels.direct}%</div>
                      <div className="text-gray-600">Direct</div>
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

export default MarketingLaunchPreparation;
