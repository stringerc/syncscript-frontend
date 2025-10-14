import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, UserPlus, Star, MessageSquare, BarChart3, CheckCircle, AlertTriangle, Clock, Settings, Code, Target, Award, TrendingUp, Mail, Phone, Calendar, MapPin, Building, Zap } from 'lucide-react';

interface BetaUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  industry: string;
  location: string;
  status: 'pending' | 'approved' | 'active' | 'completed' | 'rejected';
  joinDate: Date;
  lastActive: Date;
  feedbackCount: number;
  bugReports: number;
  featureRequests: number;
  satisfactionScore: number;
  referralCount: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  incentives: {
    earlyAccess: boolean;
    premiumFeatures: boolean;
    directSupport: boolean;
    swag: boolean;
    credits: number;
  };
  demographics: {
    age: number;
    experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    teamSize: number;
    useCase: string;
  };
}

interface BetaCampaign {
  id: string;
  name: string;
  type: 'social-media' | 'email' | 'referral' | 'partnership' | 'content' | 'events';
  status: 'active' | 'paused' | 'completed' | 'draft';
  startDate: Date;
  endDate: Date | null;
  targetAudience: string;
  message: string;
  channels: string[];
  metrics: {
    impressions: number;
    clicks: number;
    signups: number;
    conversions: number;
    cost: number;
    roi: number;
  };
  creative: {
    headline: string;
    description: string;
    image: string;
    cta: string;
  };
}

interface FeedbackItem {
  id: string;
  userId: string;
  type: 'bug-report' | 'feature-request' | 'usability' | 'performance' | 'general';
  category: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'in-review' | 'in-progress' | 'resolved' | 'closed';
  submittedDate: Date;
  resolvedDate: Date | null;
  assignedTo: string;
  tags: string[];
  attachments: string[];
  votes: number;
  comments: {
    id: string;
    userId: string;
    content: string;
    timestamp: Date;
  }[];
}

interface BetaProgram {
  id: string;
  name: string;
  phase: 'recruitment' | 'testing' | 'feedback' | 'iteration' | 'completion';
  status: 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate: Date | null;
  targetUsers: number;
  currentUsers: number;
  goals: {
    feedbackCount: number;
    bugReports: number;
    featureRequests: number;
    satisfactionScore: number;
    retentionRate: number;
  };
  metrics: {
    signupRate: number;
    activationRate: number;
    engagementRate: number;
    satisfactionScore: number;
    retentionRate: number;
    referralRate: number;
  };
  incentives: {
    earlyAccess: boolean;
    premiumFeatures: boolean;
    directSupport: boolean;
    swag: boolean;
    credits: number;
    discount: number;
  };
}

interface BetaAnalytics {
  id: string;
  period: string;
  metrics: {
    totalSignups: number;
    activeUsers: number;
    feedbackItems: number;
    bugReports: number;
    featureRequests: number;
    averageSatisfaction: number;
    retentionRate: number;
    referralRate: number;
  };
  trends: {
    signupTrend: number[];
    engagementTrend: number[];
    satisfactionTrend: number[];
    retentionTrend: number[];
  };
  demographics: {
    industries: Record<string, number>;
    roles: Record<string, number>;
    locations: Record<string, number>;
    companySizes: Record<string, number>;
  };
}

const BetaUserRecruitment: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [betaUsers, setBetaUsers] = useState<BetaUser[]>([]);
  const [betaCampaigns, setBetaCampaigns] = useState<BetaCampaign[]>([]);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [betaProgram, setBetaProgram] = useState<BetaProgram[]>([]);
  const [betaAnalytics, setBetaAnalytics] = useState<BetaAnalytics[]>([]);
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [isLaunchingCampaign, setIsLaunchingCampaign] = useState(false);
  const [isAnalyzingFeedback, setIsAnalyzingFeedback] = useState(false);
  const [selectedUser, setSelectedUser] = useState<BetaUser | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<BetaCampaign | null>(null);

  // Generate beta data
  useEffect(() => {
    const generateBetaUsers = (): BetaUser[] => {
      return [
        {
          id: 'user-1',
          email: 'sarah.johnson@techcorp.com',
          firstName: 'Sarah',
          lastName: 'Johnson',
          company: 'TechCorp',
          role: 'Product Manager',
          industry: 'Technology',
          location: 'San Francisco, CA',
          status: 'active',
          joinDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
          feedbackCount: 12,
          bugReports: 3,
          featureRequests: 8,
          satisfactionScore: 9.2,
          referralCount: 2,
          tier: 'gold',
          incentives: {
            earlyAccess: true,
            premiumFeatures: true,
            directSupport: true,
            swag: true,
            credits: 1000
          },
          demographics: {
            age: 32,
            experience: 'advanced',
            teamSize: 15,
            useCase: 'Team productivity and project management'
          }
        },
        {
          id: 'user-2',
          email: 'mike.chen@startup.io',
          firstName: 'Mike',
          lastName: 'Chen',
          company: 'StartupIO',
          role: 'CTO',
          industry: 'Startup',
          location: 'Austin, TX',
          status: 'active',
          joinDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
          feedbackCount: 8,
          bugReports: 1,
          featureRequests: 6,
          satisfactionScore: 8.8,
          referralCount: 1,
          tier: 'silver',
          incentives: {
            earlyAccess: true,
            premiumFeatures: true,
            directSupport: false,
            swag: false,
            credits: 500
          },
          demographics: {
            age: 28,
            experience: 'expert',
            teamSize: 8,
            useCase: 'Development team coordination'
          }
        },
        {
          id: 'user-3',
          email: 'emma.davis@consulting.com',
          firstName: 'Emma',
          lastName: 'Davis',
          company: 'Davis Consulting',
          role: 'Consultant',
          industry: 'Consulting',
          location: 'New York, NY',
          status: 'pending',
          joinDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          lastActive: new Date(Date.now() - 12 * 60 * 60 * 1000),
          feedbackCount: 0,
          bugReports: 0,
          featureRequests: 0,
          satisfactionScore: 0,
          referralCount: 0,
          tier: 'bronze',
          incentives: {
            earlyAccess: true,
            premiumFeatures: false,
            directSupport: false,
            swag: false,
            credits: 100
          },
          demographics: {
            age: 35,
            experience: 'intermediate',
            teamSize: 3,
            useCase: 'Client project management'
          }
        }
      ];
    };

    const generateBetaCampaigns = (): BetaCampaign[] => {
      return [
        {
          id: 'campaign-1',
          name: 'LinkedIn Professional Outreach',
          type: 'social-media',
          status: 'active',
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          targetAudience: 'Product Managers and CTOs at tech companies',
          message: 'Join the beta for the most advanced productivity platform ever built',
          channels: ['LinkedIn', 'Twitter', 'Product Hunt'],
          metrics: {
            impressions: 15000,
            clicks: 450,
            signups: 89,
            conversions: 19.8,
            cost: 500,
            roi: 3.2
          },
          creative: {
            headline: 'Revolutionize Your Team\'s Productivity',
            description: 'SyncScript combines AI, energy management, and team collaboration in one powerful platform',
            image: 'linkedin-ad-image.jpg',
            cta: 'Join Beta Now'
          }
        },
        {
          id: 'campaign-2',
          name: 'Email Newsletter Campaign',
          type: 'email',
          status: 'active',
          startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
          targetAudience: 'Productivity enthusiasts and early adopters',
          message: 'Get early access to SyncScript and shape the future of productivity',
          channels: ['Email', 'Newsletter'],
          metrics: {
            impressions: 5000,
            clicks: 250,
            signups: 45,
            conversions: 18.0,
            cost: 200,
            roi: 4.1
          },
          creative: {
            headline: 'Shape the Future of Productivity',
            description: 'Be among the first to experience SyncScript\'s revolutionary features',
            image: 'email-header.jpg',
            cta: 'Get Early Access'
          }
        },
        {
          id: 'campaign-3',
          name: 'Referral Program',
          type: 'referral',
          status: 'active',
          startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          endDate: null,
          targetAudience: 'Existing beta users and their networks',
          message: 'Refer friends and earn premium credits',
          channels: ['In-app', 'Email', 'Social'],
          metrics: {
            impressions: 2000,
            clicks: 180,
            signups: 32,
            conversions: 17.8,
            cost: 0,
            roi: 999
          },
          creative: {
            headline: 'Invite Friends, Earn Rewards',
            description: 'Share SyncScript with your network and earn premium credits',
            image: 'referral-banner.jpg',
            cta: 'Invite Friends'
          }
        }
      ];
    };

    const generateFeedbackItems = (): FeedbackItem[] => {
      return [
        {
          id: 'feedback-1',
          userId: 'user-1',
          type: 'feature-request',
          category: 'AI Features',
          title: 'Voice Command Integration',
          description: 'Would love to see voice commands for task creation and navigation. This would make the platform even more accessible and efficient.',
          priority: 'high',
          status: 'in-review',
          submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          resolvedDate: null,
          assignedTo: 'AI Team',
          tags: ['voice', 'accessibility', 'ai'],
          attachments: ['voice-demo.mp4'],
          votes: 8,
          comments: [
            {
              id: 'comment-1',
              userId: 'user-2',
              content: 'Great idea! This would be perfect for hands-free task management.',
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            }
          ]
        },
        {
          id: 'feedback-2',
          userId: 'user-2',
          type: 'bug-report',
          category: 'Performance',
          title: 'Slow Loading on Mobile',
          description: 'The mobile app takes too long to load, especially when switching between tasks. This impacts productivity significantly.',
          priority: 'critical',
          status: 'in-progress',
          submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          resolvedDate: null,
          assignedTo: 'Mobile Team',
          tags: ['mobile', 'performance', 'loading'],
          attachments: ['performance-logs.txt'],
          votes: 12,
          comments: [
            {
              id: 'comment-2',
              userId: 'user-1',
              content: 'I\'ve experienced this too. Hope it gets fixed soon!',
              timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000)
            }
          ]
        },
        {
          id: 'feedback-3',
          userId: 'user-1',
          type: 'usability',
          category: 'UI/UX',
          title: 'Dashboard Customization',
          description: 'Would be great to have more customization options for the dashboard layout. Different teams have different needs.',
          priority: 'medium',
          status: 'new',
          submittedDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
          resolvedDate: null,
          assignedTo: 'UX Team',
          tags: ['dashboard', 'customization', 'ui'],
          attachments: [],
          votes: 5,
          comments: []
        }
      ];
    };

    const generateBetaProgram = (): BetaProgram[] => {
      return [
        {
          id: 'program-1',
          name: 'SyncScript Beta Program',
          phase: 'testing',
          status: 'active',
          startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          targetUsers: 500,
          currentUsers: 125,
          goals: {
            feedbackCount: 1000,
            bugReports: 100,
            featureRequests: 200,
            satisfactionScore: 8.5,
            retentionRate: 80
          },
          metrics: {
            signupRate: 25.0,
            activationRate: 78.4,
            engagementRate: 65.2,
            satisfactionScore: 8.9,
            retentionRate: 85.6,
            referralRate: 12.8
          },
          incentives: {
            earlyAccess: true,
            premiumFeatures: true,
            directSupport: true,
            swag: true,
            credits: 500,
            discount: 50
          }
        }
      ];
    };

    const generateBetaAnalytics = (): BetaAnalytics[] => {
      return [
        {
          id: 'analytics-1',
          period: 'Last 30 Days',
          metrics: {
            totalSignups: 125,
            activeUsers: 98,
            feedbackItems: 45,
            bugReports: 12,
            featureRequests: 28,
            averageSatisfaction: 8.9,
            retentionRate: 85.6,
            referralRate: 12.8
          },
          trends: {
            signupTrend: [5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 125],
            engagementTrend: [45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 102, 105, 108, 112, 115, 118, 122, 125, 128, 132, 135, 138, 142],
            satisfactionTrend: [8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9],
            retentionTrend: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85]
          },
          demographics: {
            industries: {
              'Technology': 45,
              'Consulting': 20,
              'Startup': 15,
              'Finance': 10,
              'Healthcare': 5,
              'Other': 5
            },
            roles: {
              'Product Manager': 30,
              'CTO': 25,
              'Developer': 20,
              'Consultant': 15,
              'Other': 10
            },
            locations: {
              'San Francisco': 25,
              'New York': 20,
              'Austin': 15,
              'Seattle': 10,
              'Boston': 10,
              'Other': 20
            },
            companySizes: {
              '1-10': 30,
              '11-50': 25,
              '51-200': 20,
              '201-1000': 15,
              '1000+': 10
            }
          }
        }
      ];
    };

    setBetaUsers(generateBetaUsers());
    setBetaCampaigns(generateBetaCampaigns());
    setFeedbackItems(generateFeedbackItems());
    setBetaProgram(generateBetaProgram());
    setBetaAnalytics(generateBetaAnalytics());
  }, []);

  const recruitBetaUsers = async () => {
    setIsRecruiting(true);
    
    // Simulate beta user recruitment
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    // Add new beta users
    const newUsers: BetaUser[] = [
      {
        id: `user-${Date.now()}`,
        email: 'newuser@example.com',
        firstName: 'New',
        lastName: 'User',
        company: 'Example Corp',
        role: 'Product Manager',
        industry: 'Technology',
        location: 'San Francisco, CA',
        status: 'pending',
        joinDate: new Date(),
        lastActive: new Date(),
        feedbackCount: 0,
        bugReports: 0,
        featureRequests: 0,
        satisfactionScore: 0,
        referralCount: 0,
        tier: 'bronze',
        incentives: {
          earlyAccess: true,
          premiumFeatures: false,
          directSupport: false,
          swag: false,
          credits: 100
        },
        demographics: {
          age: 30,
          experience: 'intermediate',
          teamSize: 10,
          useCase: 'Team productivity'
        }
      }
    ];
    
    setBetaUsers(prev => [...prev, ...newUsers]);
    setIsRecruiting(false);
  };

  const launchCampaign = async () => {
    setIsLaunchingCampaign(true);
    
    // Simulate campaign launch
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Update campaign metrics
    setBetaCampaigns(prev => prev.map(campaign => 
      campaign.status === 'active' 
        ? { 
            ...campaign, 
            metrics: {
              ...campaign.metrics,
              impressions: campaign.metrics.impressions + 1000,
              clicks: campaign.metrics.clicks + 50,
              signups: campaign.metrics.signups + 10
            }
          }
        : campaign
    ));
    
    setIsLaunchingCampaign(false);
  };

  const analyzeFeedback = async () => {
    setIsAnalyzingFeedback(true);
    
    // Simulate feedback analysis
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    setIsAnalyzingFeedback(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': case 'approved': case 'completed': case 'resolved': return 'bg-green-100 text-green-800';
      case 'pending': case 'in-review': case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'new': case 'draft': return 'bg-blue-100 text-blue-800';
      case 'rejected': case 'closed': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string): string => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'social-media': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'referral': return 'bg-purple-100 text-purple-800';
      case 'partnership': return 'bg-orange-100 text-orange-800';
      case 'content': return 'bg-pink-100 text-pink-800';
      case 'events': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalUsers = betaUsers.length;
  const activeUsers = betaUsers.filter(u => u.status === 'active').length;
  const totalCampaigns = betaCampaigns.length;
  const activeCampaigns = betaCampaigns.filter(c => c.status === 'active').length;
  const totalFeedback = feedbackItems.length;
  const resolvedFeedback = feedbackItems.filter(f => f.status === 'resolved').length;
  const averageSatisfaction = betaUsers.reduce((sum, u) => sum + u.satisfactionScore, 0) / betaUsers.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">👥 Beta User Recruitment & Testing</h2>
              <p className="text-blue-100 mt-1">Recruit beta users, collect feedback, and validate SyncScript with real users</p>
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
          {/* Beta Program Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Beta Users</p>
                  <p className="text-2xl font-bold text-blue-800">{activeUsers}/{totalUsers}</p>
                  <p className="text-xs text-blue-600">Active users</p>
                </div>
                <Users className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Campaigns</p>
                  <p className="text-2xl font-bold text-green-800">{activeCampaigns}</p>
                  <p className="text-xs text-green-600">Active campaigns</p>
                </div>
                <Target className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Feedback Items</p>
                  <p className="text-2xl font-bold text-purple-800">{totalFeedback}</p>
                  <p className="text-xs text-purple-600">Total feedback</p>
                </div>
                <MessageSquare className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Satisfaction</p>
                  <p className="text-2xl font-bold text-orange-800">{averageSatisfaction.toFixed(1)}</p>
                  <p className="text-xs text-orange-600">Average score</p>
                </div>
                <Star className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* Beta Program Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-blue-700 font-medium">
                🎯 Beta Program Active - Recruiting users and collecting valuable feedback!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={recruitBetaUsers}
                  disabled={isRecruiting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isRecruiting ? '⏳ Recruiting...' : '👥 Recruit Users'}
                </button>
                <button
                  onClick={launchCampaign}
                  disabled={isLaunchingCampaign}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isLaunchingCampaign ? '⏳ Launching...' : '🚀 Launch Campaign'}
                </button>
                <button
                  onClick={analyzeFeedback}
                  disabled={isAnalyzingFeedback}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isAnalyzingFeedback ? '⏳ Analyzing...' : '📊 Analyze Feedback'}
                </button>
              </div>
            </div>
          </div>

          {/* Beta Users */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="mr-2 text-blue-600" />
              Beta Users ({betaUsers.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {betaUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{user.company}</div>
                          <div className="text-sm text-gray-500">{user.role}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(user.tier)}`}>
                          {user.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.feedbackCount} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.satisfactionScore > 0 ? user.satisfactionScore.toFixed(1) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.lastActive)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Beta Campaigns */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="mr-2 text-green-600" />
              Beta Campaigns ({betaCampaigns.length})
            </h3>
            <div className="space-y-4">
              {betaCampaigns.map((campaign) => (
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
                      <span className="text-gray-600">Impressions:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.impressions.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Clicks:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.clicks}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Signups:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.signups}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">ROI:</span>
                      <span className="font-medium text-gray-900 ml-1">{campaign.metrics.roi}x</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Channels:</span> {campaign.channels.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MessageSquare className="mr-2 text-purple-600" />
              User Feedback ({feedbackItems.length})
            </h3>
            <div className="space-y-4">
              {feedbackItems.map((feedback) => (
                <div key={feedback.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{feedback.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(feedback.status)}`}>
                        {feedback.status}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(feedback.priority)} bg-gray-100`}>
                        {feedback.priority} priority
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{feedback.description}</p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Type: {feedback.type} | Category: {feedback.category}</span>
                    <span>Votes: {feedback.votes} | Submitted: {formatDate(feedback.submittedDate)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beta Analytics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="mr-2 text-orange-600" />
              Beta Program Analytics
            </h3>
            {betaAnalytics.map((analytics) => (
              <div key={analytics.id} className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-800">{analytics.metrics.totalSignups}</div>
                    <div className="text-sm text-blue-600">Total Signups</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-800">{analytics.metrics.activeUsers}</div>
                    <div className="text-sm text-green-600">Active Users</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-800">{analytics.metrics.feedbackItems}</div>
                    <div className="text-sm text-purple-600">Feedback Items</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-800">{analytics.metrics.averageSatisfaction.toFixed(1)}</div>
                    <div className="text-sm text-orange-600">Avg Satisfaction</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">User Demographics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 font-medium">Industries:</span>
                      <div className="mt-1">
                        {Object.entries(analytics.demographics.industries).map(([industry, count]) => (
                          <div key={industry} className="flex justify-between">
                            <span>{industry}:</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Roles:</span>
                      <div className="mt-1">
                        {Object.entries(analytics.demographics.roles).map(([role, count]) => (
                          <div key={role} className="flex justify-between">
                            <span>{role}:</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Locations:</span>
                      <div className="mt-1">
                        {Object.entries(analytics.demographics.locations).map(([location, count]) => (
                          <div key={location} className="flex justify-between">
                            <span>{location}:</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Company Sizes:</span>
                      <div className="mt-1">
                        {Object.entries(analytics.demographics.companySizes).map(([size, count]) => (
                          <div key={size} className="flex justify-between">
                            <span>{size}:</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
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

export default BetaUserRecruitment;
