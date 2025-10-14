import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Users, MessageSquare, Star, TrendingUp, BarChart3, PieChart, LineChart, Zap, ArrowUpRight, ArrowDownRight, Eye, MousePointer, CheckCircle, AlertTriangle, Clock, Settings, Code, Award, FileText, Presentation, Link, Calculator, Percent, ArrowRight, Filter, Search, Plus, Edit, Save, Send, Play, Pause, Stop, Maximize, Minimize, ThumbsUp, ThumbsDown, Heart, Flag, Share2, Download, Upload, Globe, Megaphone, Briefcase, Activity, UserCheck } from 'lucide-react';

interface BetaUser {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  industry: string;
  signupDate: Date;
  lastActive: Date;
  usage: {
    sessions: number;
    tasksCreated: number;
    projectsCompleted: number;
    featuresUsed: string[];
  };
  feedback: {
    rating: number;
    comments: string[];
    suggestions: string[];
    painPoints: string[];
    satisfaction: number;
  };
  cohort: string;
  segment: 'early-adopter' | 'power-user' | 'casual-user' | 'at-risk';
}

interface FeedbackItem {
  id: string;
  userId: string;
  type: 'feature-request' | 'bug-report' | 'improvement' | 'complaint' | 'praise';
  category: 'ui-ux' | 'performance' | 'functionality' | 'integration' | 'mobile' | 'support';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'in-review' | 'in-progress' | 'completed' | 'rejected';
  title: string;
  description: string;
  submittedDate: Date;
  assignedTo: string;
  votes: number;
  comments: {
    id: string;
    userId: string;
    comment: string;
    date: Date;
  }[];
  impact: {
    users: number;
    severity: 'low' | 'medium' | 'high';
    effort: 'low' | 'medium' | 'high';
  };
}

interface PMFMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  category: 'retention' | 'engagement' | 'satisfaction' | 'growth' | 'referral';
  description: string;
  lastUpdated: Date;
}

interface UserInterview {
  id: string;
  userId: string;
  interviewer: string;
  date: Date;
  duration: number;
  type: 'discovery' | 'validation' | 'usability' | 'feedback';
  questions: {
    question: string;
    answer: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }[];
  insights: string[];
  recommendations: string[];
  followUp: {
    required: boolean;
    date: Date;
    actions: string[];
  };
}

interface FeatureValidation {
  id: string;
  feature: string;
  description: string;
  status: 'concept' | 'prototype' | 'testing' | 'launched' | 'deprecated';
  validation: {
    hypothesis: string;
    successCriteria: string[];
    metrics: {
      adoption: number;
      usage: number;
      satisfaction: number;
      retention: number;
    };
    results: {
      hypothesisValidated: boolean;
      confidence: number;
      keyInsights: string[];
    };
  };
  feedback: {
    positive: number;
    negative: number;
    suggestions: string[];
  };
}

interface MarketValidation {
  id: string;
  period: string;
  metrics: {
    totalBetaUsers: number;
    activeBetaUsers: number;
    feedbackItems: number;
    userInterviews: number;
    pmfScore: number;
    npsScore: number;
    satisfactionScore: number;
  };
  trends: {
    userGrowth: number[];
    feedbackTrend: number[];
    satisfactionTrend: number[];
    pmfTrend: number[];
  };
  insights: {
    topFeatures: string[];
    painPoints: string[];
    opportunities: string[];
    risks: string[];
  };
}

const MarketValidation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [betaUsers, setBetaUsers] = useState<BetaUser[]>([]);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [pmfMetrics, setPmfMetrics] = useState<PMFMetric[]>([]);
  const [userInterviews, setUserInterviews] = useState<UserInterview[]>([]);
  const [featureValidations, setFeatureValidations] = useState<FeatureValidation[]>([]);
  const [marketValidation, setMarketValidation] = useState<MarketValidation[]>([]);
  const [isCollectingFeedback, setIsCollectingFeedback] = useState(false);
  const [isAnalyzingPMF, setIsAnalyzingPMF] = useState(false);
  const [isConductingInterviews, setIsConductingInterviews] = useState(false);
  const [selectedUser, setSelectedUser] = useState<BetaUser | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  // Generate market validation data
  useEffect(() => {
    const generateBetaUsers = (): BetaUser[] => {
      return [
        {
          id: 'user-1',
          name: 'Sarah Chen',
          email: 'sarah.chen@techcorp.com',
          role: 'Product Manager',
          company: 'TechCorp',
          industry: 'Technology',
          signupDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
          lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          usage: {
            sessions: 45,
            tasksCreated: 128,
            projectsCompleted: 8,
            featuresUsed: ['task-management', 'analytics', 'team-collaboration', 'integrations']
          },
          feedback: {
            rating: 4.8,
            comments: ['Love the energy-based task management', 'Great team collaboration features', 'Would love more integrations'],
            suggestions: ['Add more calendar integrations', 'Improve mobile experience'],
            painPoints: ['Mobile app is slow', 'Limited customization options'],
            satisfaction: 9.2
          },
          cohort: 'early-adopters',
          segment: 'power-user'
        },
        {
          id: 'user-2',
          name: 'Mike Rodriguez',
          email: 'mike.r@startup.io',
          role: 'Founder',
          company: 'StartupIO',
          industry: 'Startup',
          signupDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          usage: {
            sessions: 32,
            tasksCreated: 89,
            projectsCompleted: 5,
            featuresUsed: ['task-management', 'analytics', 'automation']
          },
          feedback: {
            rating: 4.5,
            comments: ['Really helpful for startup productivity', 'Love the AI suggestions'],
            suggestions: ['More automation features', 'Better reporting'],
            painPoints: ['Learning curve was steep', 'Price is a bit high for startups'],
            satisfaction: 8.7
          },
          cohort: 'early-adopters',
          segment: 'early-adopter'
        },
        {
          id: 'user-3',
          name: 'Emily Johnson',
          email: 'emily.j@enterprise.com',
          role: 'Operations Director',
          company: 'Enterprise Corp',
          industry: 'Enterprise',
          signupDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          usage: {
            sessions: 28,
            tasksCreated: 67,
            projectsCompleted: 3,
            featuresUsed: ['task-management', 'team-collaboration', 'reporting']
          },
          feedback: {
            rating: 4.2,
            comments: ['Good for team coordination', 'Needs better enterprise features'],
            suggestions: ['Add SSO integration', 'Better admin controls'],
            painPoints: ['Limited admin features', 'No single sign-on'],
            satisfaction: 7.8
          },
          cohort: 'enterprise-trial',
          segment: 'casual-user'
        }
      ];
    };

    const generateFeedbackItems = (): FeedbackItem[] => {
      return [
        {
          id: 'feedback-1',
          userId: 'user-1',
          type: 'feature-request',
          category: 'integration',
          priority: 'high',
          status: 'in-progress',
          title: 'Slack integration improvements',
          description: 'The Slack integration is great but needs better notification customization and thread support.',
          submittedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          assignedTo: 'Integration Team',
          votes: 12,
          comments: [
            {
              id: 'comment-1',
              userId: 'user-2',
              comment: 'I agree, this would be very helpful for our team',
              date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            }
          ],
          impact: {
            users: 45,
            severity: 'medium',
            effort: 'medium'
          }
        },
        {
          id: 'feedback-2',
          userId: 'user-2',
          type: 'improvement',
          category: 'ui-ux',
          priority: 'medium',
          status: 'completed',
          title: 'Mobile app performance',
          description: 'The mobile app is slow and crashes occasionally. Please optimize performance.',
          submittedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          assignedTo: 'Mobile Team',
          votes: 8,
          comments: [],
          impact: {
            users: 23,
            severity: 'high',
            effort: 'high'
          }
        },
        {
          id: 'feedback-3',
          userId: 'user-3',
          type: 'feature-request',
          category: 'functionality',
          priority: 'critical',
          status: 'new',
          title: 'SSO integration for enterprise',
          description: 'We need single sign-on integration to use this in our enterprise environment.',
          submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          assignedTo: 'Security Team',
          votes: 15,
          comments: [],
          impact: {
            users: 12,
            severity: 'critical',
            effort: 'high'
          }
        }
      ];
    };

    const generatePMFMetrics = (): PMFMetric[] => {
      return [
        {
          id: 'retention',
          name: '30-Day Retention Rate',
          value: 78,
          target: 80,
          trend: 'up',
          category: 'retention',
          description: 'Percentage of users who return after 30 days',
          lastUpdated: new Date()
        },
        {
          id: 'engagement',
          name: 'Weekly Active Users',
          value: 65,
          target: 70,
          trend: 'up',
          category: 'engagement',
          description: 'Percentage of users active in the last 7 days',
          lastUpdated: new Date()
        },
        {
          id: 'satisfaction',
          name: 'User Satisfaction Score',
          value: 8.5,
          target: 9.0,
          trend: 'up',
          category: 'satisfaction',
          description: 'Average user satisfaction rating (1-10)',
          lastUpdated: new Date()
        },
        {
          id: 'growth',
          name: 'Organic Growth Rate',
          value: 35,
          target: 40,
          trend: 'up',
          category: 'growth',
          description: 'Monthly organic user growth rate',
          lastUpdated: new Date()
        },
        {
          id: 'referral',
          name: 'Referral Rate',
          value: 28,
          target: 30,
          trend: 'stable',
          category: 'referral',
          description: 'Percentage of users who refer others',
          lastUpdated: new Date()
        }
      ];
    };

    const generateUserInterviews = (): UserInterview[] => {
      return [
        {
          id: 'interview-1',
          userId: 'user-1',
          interviewer: 'Product Team',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          duration: 45,
          type: 'validation',
          questions: [
            {
              question: 'How has SyncScript improved your productivity?',
              answer: 'Significantly improved my task prioritization and team coordination.',
              sentiment: 'positive'
            },
            {
              question: 'What features do you use most?',
              answer: 'Task management, energy tracking, and team collaboration features.',
              sentiment: 'positive'
            },
            {
              question: 'What would make you stop using SyncScript?',
              answer: 'If it became too expensive or lost key features.',
              sentiment: 'neutral'
            }
          ],
          insights: [
            'User highly values energy-based task management',
            'Team collaboration is a key differentiator',
            'Price sensitivity exists but value is recognized'
          ],
          recommendations: [
            'Continue developing team features',
            'Consider pricing optimization',
            'Maintain focus on energy-based approach'
          ],
          followUp: {
            required: true,
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            actions: ['Test new team features', 'Gather pricing feedback']
          }
        }
      ];
    };

    const generateFeatureValidations = (): FeatureValidation[] => {
      return [
        {
          id: 'feature-1',
          feature: 'Energy-Based Task Management',
          description: 'Core feature that matches tasks to user energy levels',
          status: 'launched',
          validation: {
            hypothesis: 'Users will be more productive when tasks match their energy levels',
            successCriteria: ['Increased task completion', 'Higher satisfaction', 'Better time management'],
            metrics: {
              adoption: 92,
              usage: 87,
              satisfaction: 9.1,
              retention: 85
            },
            results: {
              hypothesisValidated: true,
              confidence: 95,
              keyInsights: ['Users love the personalized approach', 'Significantly improves task completion', 'Reduces decision fatigue']
            }
          },
          feedback: {
            positive: 89,
            negative: 11,
            suggestions: ['Add energy prediction', 'Improve energy tracking accuracy']
          }
        },
        {
          id: 'feature-2',
          feature: 'AI-Powered Suggestions',
          description: 'AI recommendations for task prioritization and scheduling',
          status: 'testing',
          validation: {
            hypothesis: 'AI suggestions will improve task prioritization and user satisfaction',
            successCriteria: ['Higher acceptance rate', 'Improved productivity', 'User engagement'],
            metrics: {
              adoption: 65,
              usage: 58,
              satisfaction: 7.8,
              retention: 72
            },
            results: {
              hypothesisValidated: true,
              confidence: 78,
              keyInsights: ['AI suggestions are helpful but need refinement', 'Users want more control over suggestions', 'Integration with existing workflow is key']
            }
          },
          feedback: {
            positive: 72,
            negative: 28,
            suggestions: ['Allow suggestion customization', 'Improve suggestion accuracy', 'Add explanation for suggestions']
          }
        }
      ];
    };

    const generateMarketValidation = (): MarketValidation[] => {
      return [
        {
          id: 'validation-1',
          period: 'Last 30 Days',
          metrics: {
            totalBetaUsers: 156,
            activeBetaUsers: 128,
            feedbackItems: 47,
            userInterviews: 8,
            pmfScore: 8.5,
            npsScore: 42,
            satisfactionScore: 8.5
          },
          trends: {
            userGrowth: [120, 130, 140, 145, 150, 152, 156],
            feedbackTrend: [35, 38, 42, 45, 47, 47, 47],
            satisfactionTrend: [8.1, 8.2, 8.3, 8.4, 8.4, 8.5, 8.5],
            pmfTrend: [8.0, 8.1, 8.2, 8.3, 8.4, 8.4, 8.5]
          },
          insights: {
            topFeatures: ['Energy-based task management', 'Team collaboration', 'Analytics dashboard'],
            painPoints: ['Mobile performance', 'Limited integrations', 'Learning curve'],
            opportunities: ['Enterprise features', 'Advanced integrations', 'Mobile optimization'],
            risks: ['Competition', 'Feature complexity', 'Pricing sensitivity']
          }
        }
      ];
    };

    setBetaUsers(generateBetaUsers());
    setFeedbackItems(generateFeedbackItems());
    setPmfMetrics(generatePMFMetrics());
    setUserInterviews(generateUserInterviews());
    setFeatureValidations(generateFeatureValidations());
    setMarketValidation(generateMarketValidation());
  }, []);

  const collectFeedback = async () => {
    setIsCollectingFeedback(true);
    
    // Simulate feedback collection
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Add new feedback items
    const newFeedback: FeedbackItem = {
      id: `feedback-${Date.now()}`,
      userId: 'user-1',
      type: 'feature-request',
      category: 'functionality',
      priority: 'medium',
      status: 'new',
      title: 'New feature request',
      description: 'User requested new feature through feedback collection',
      submittedDate: new Date(),
      assignedTo: 'Product Team',
      votes: 0,
      comments: [],
      impact: {
        users: 5,
        severity: 'medium',
        effort: 'medium'
      }
    };
    
    setFeedbackItems(prev => [newFeedback, ...prev]);
    setIsCollectingFeedback(false);
  };

  const analyzePMF = async () => {
    setIsAnalyzingPMF(true);
    
    // Simulate PMF analysis
    await new Promise(resolve => setTimeout(resolve, 7000));
    
    // Update PMF metrics with improved scores
    setPmfMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.value + (metric.target - metric.value) * 0.1, // 10% improvement
      lastUpdated: new Date()
    })));
    
    setIsAnalyzingPMF(false);
  };

  const conductInterviews = async () => {
    setIsConductingInterviews(true);
    
    // Simulate interview conduction
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Add new interview
    const newInterview: UserInterview = {
      id: `interview-${Date.now()}`,
      userId: 'user-2',
      interviewer: 'Product Team',
      date: new Date(),
      duration: 30,
      type: 'feedback',
      questions: [
        {
          question: 'How satisfied are you with SyncScript?',
          answer: 'Very satisfied, it has improved my productivity significantly.',
          sentiment: 'positive'
        }
      ],
      insights: ['User is highly satisfied with current features'],
      recommendations: ['Continue current development direction'],
      followUp: {
        required: false,
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        actions: []
      }
    };
    
    setUserInterviews(prev => [newInterview, ...prev]);
    setIsConductingInterviews(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': case 'launched': case 'power-user': case 'early-adopter': return 'bg-green-100 text-green-800';
      case 'in-progress': case 'testing': case 'casual-user': return 'bg-yellow-100 text-yellow-800';
      case 'new': case 'concept': case 'at-risk': return 'bg-blue-100 text-blue-800';
      case 'rejected': case 'deprecated': return 'bg-red-100 text-red-800';
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
      case 'feature-request': case 'validation': return 'bg-blue-100 text-blue-800';
      case 'improvement': case 'usability': return 'bg-green-100 text-green-800';
      case 'bug-report': case 'feedback': return 'bg-yellow-100 text-yellow-800';
      case 'complaint': case 'discovery': return 'bg-red-100 text-red-800';
      case 'praise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const currentPMFScore = marketValidation[0]?.metrics.pmfScore || 0;
  const targetPMFScore = 9.0;
  const pmfProgress = (currentPMFScore / targetPMFScore) * 100;

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
              <h2 className="text-2xl font-bold">🎯 Market Validation</h2>
              <p className="text-blue-100 mt-1">Collect beta feedback, analyze product-market fit, and validate features</p>
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
          {/* Market Validation Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Beta Users</p>
                  <p className="text-2xl font-bold text-blue-800">{marketValidation[0]?.metrics.totalBetaUsers || 0}</p>
                  <p className="text-xs text-blue-600">{marketValidation[0]?.metrics.activeBetaUsers || 0} active</p>
                </div>
                <Users className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">PMF Score</p>
                  <p className="text-2xl font-bold text-green-800">{currentPMFScore}/10</p>
                  <p className="text-xs text-green-600">Target: {targetPMFScore}/10</p>
                </div>
                <Target className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Feedback Items</p>
                  <p className="text-2xl font-bold text-purple-800">{marketValidation[0]?.metrics.feedbackItems || 0}</p>
                  <p className="text-xs text-purple-600">User feedback collected</p>
                </div>
                <MessageSquare className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">NPS Score</p>
                  <p className="text-2xl font-bold text-orange-800">{marketValidation[0]?.metrics.npsScore || 0}</p>
                  <p className="text-xs text-orange-600">Net Promoter Score</p>
                </div>
                <Star className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* PMF Progress */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-blue-700 font-medium">
                🎯 Product-Market Fit Progress: {pmfProgress.toFixed(1)}% Complete
              </div>
              <div className="text-sm text-blue-700 font-medium">
                {currentPMFScore}/10 → {targetPMFScore}/10
              </div>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(pmfProgress, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Market Validation Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-blue-700 font-medium">
                🎯 Market Validation Active - Collecting feedback, analyzing PMF, and conducting user interviews!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={collectFeedback}
                  disabled={isCollectingFeedback}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isCollectingFeedback ? '⏳ Collecting...' : '💬 Collect Feedback'}
                </button>
                <button
                  onClick={analyzePMF}
                  disabled={isAnalyzingPMF}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isAnalyzingPMF ? '⏳ Analyzing...' : '📊 Analyze PMF'}
                </button>
                <button
                  onClick={conductInterviews}
                  disabled={isConductingInterviews}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isConductingInterviews ? '⏳ Conducting...' : '🎤 Conduct Interviews'}
                </button>
              </div>
            </div>
          </div>

          {/* PMF Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="mr-2 text-blue-600" />
              Product-Market Fit Metrics ({pmfMetrics.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pmfMetrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                      <p className="text-sm text-gray-600">{metric.description}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium text-gray-900">
                        {metric.name.includes('Score') ? `${metric.value}/10` : `${metric.value}%`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium text-gray-900">
                        {metric.name.includes('Score') ? `${metric.target}/10` : `${metric.target}%`}
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
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beta Users */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="mr-2 text-green-600" />
              Beta Users ({betaUsers.length})
            </h3>
            <div className="space-y-4">
              {betaUsers.map((user) => (
                <div key={user.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.role} at {user.company} • {user.industry}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.segment)}`}>
                        {user.segment}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.cohort)}`}>
                        {user.cohort}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Sessions:</span>
                      <span className="font-medium text-gray-900 ml-1">{user.usage.sessions}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Tasks:</span>
                      <span className="font-medium text-gray-900 ml-1">{user.usage.tasksCreated}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Projects:</span>
                      <span className="font-medium text-gray-900 ml-1">{user.usage.projectsCompleted}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Satisfaction:</span>
                      <span className="font-medium text-gray-900 ml-1">{user.feedback.satisfaction}/10</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Usage Progress</span>
                      <span className="font-medium text-gray-900">{user.usage.sessions}/50 sessions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((user.usage.sessions / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Features Used:</span> {user.usage.featuresUsed.join(', ')} | 
                    <span className="font-medium ml-2">Rating:</span> {user.feedback.rating}/5
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MessageSquare className="mr-2 text-purple-600" />
              Feedback Items ({feedbackItems.length})
            </h3>
            <div className="space-y-4">
              {feedbackItems.map((feedback) => (
                <div key={feedback.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{feedback.title}</h4>
                      <p className="text-sm text-gray-600">{feedback.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(feedback.type)}`}>
                        {feedback.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(feedback.priority)}`}>
                        {feedback.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(feedback.status)}`}>
                        {feedback.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium text-gray-900 ml-1 capitalize">{feedback.category}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Votes:</span>
                      <span className="font-medium text-gray-900 ml-1">{feedback.votes}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Impact:</span>
                      <span className="font-medium text-gray-900 ml-1">{feedback.impact.users} users</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Assigned:</span>
                      <span className="font-medium text-gray-900 ml-1">{feedback.assignedTo}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Submitted:</span> {formatDate(feedback.submittedDate)} | 
                    <span className="font-medium ml-2">Comments:</span> {feedback.comments.length}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Validations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="mr-2 text-orange-600" />
              Feature Validations ({featureValidations.length})
            </h3>
            <div className="space-y-4">
              {featureValidations.map((feature) => (
                <div key={feature.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{feature.feature}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(feature.status)}`}>
                      {feature.status}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Hypothesis:</span> {feature.validation.hypothesis}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Adoption:</span>
                      <span className="font-medium text-gray-900 ml-1">{feature.validation.metrics.adoption}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Usage:</span>
                      <span className="font-medium text-gray-900 ml-1">{feature.validation.metrics.usage}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Satisfaction:</span>
                      <span className="font-medium text-gray-900 ml-1">{feature.validation.metrics.satisfaction}/10</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Confidence:</span>
                      <span className="font-medium text-gray-900 ml-1">{feature.validation.results.confidence}%</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Validation Progress</span>
                      <span className="font-medium text-gray-900">
                        {feature.validation.results.hypothesisValidated ? '✅ Validated' : '⏳ Testing'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${feature.validation.results.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Feedback:</span> {feature.feedback.positive} positive, {feature.feedback.negative} negative | 
                    <span className="font-medium ml-2">Status:</span> {feature.validation.results.hypothesisValidated ? 'Validated' : 'Testing'}
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

export default MarketValidation;
