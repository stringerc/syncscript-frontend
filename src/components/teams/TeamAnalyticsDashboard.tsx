/**
 * Team Analytics Dashboard Component
 * 
 * Comprehensive analytics and insights for team productivity,
 * performance tracking, and collaborative metrics
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamAnalytics {
  teamId: string;
  timeRange: '7d' | '30d' | '90d' | '1y';
  productivity: {
    overallScore: number;
    taskCompletionRate: number;
    averageTaskTime: number;
    onTimeDelivery: number;
    qualityScore: number;
  };
  collaboration: {
    communicationFrequency: number;
    crossTeamCollaboration: number;
    knowledgeSharing: number;
    meetingEfficiency: number;
    feedbackQuality: number;
  };
  performance: {
    sprintVelocity: number;
    codeQuality: number;
    bugResolutionTime: number;
    featureDeliveryRate: number;
    customerSatisfaction: number;
  };
  engagement: {
    activeMembers: number;
    averageSessionTime: number;
    featureAdoption: number;
    userRetention: number;
    satisfactionScore: number;
  };
  trends: {
    productivityTrend: 'up' | 'down' | 'stable';
    collaborationTrend: 'up' | 'down' | 'stable';
    performanceTrend: 'up' | 'down' | 'stable';
    engagementTrend: 'up' | 'down' | 'stable';
  };
  insights: AnalyticsInsight[];
  recommendations: AnalyticsRecommendation[];
}

interface AnalyticsInsight {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  category: 'productivity' | 'collaboration' | 'performance' | 'engagement';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  dataPoints: number[];
  timestamp: string;
}

interface AnalyticsRecommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  expectedImpact: number;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  actionItems: string[];
}

interface MemberPerformance {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  metrics: {
    tasksCompleted: number;
    tasksOnTime: number;
    averageQuality: number;
    collaborationScore: number;
    productivityScore: number;
    lastActive: string;
  };
  trends: {
    productivity: 'up' | 'down' | 'stable';
    collaboration: 'up' | 'down' | 'stable';
    quality: 'up' | 'down' | 'stable';
  };
}

interface TeamAnalyticsDashboardProps {
  teamId: string;
  onClose: () => void;
}

const TIME_RANGES = [
  { id: '7d', name: 'Last 7 Days', color: 'from-blue-500 to-cyan-500' },
  { id: '30d', name: 'Last 30 Days', color: 'from-green-500 to-emerald-500' },
  { id: '90d', name: 'Last 90 Days', color: 'from-purple-500 to-indigo-500' },
  { id: '1y', name: 'Last Year', color: 'from-orange-500 to-red-500' }
];

const CATEGORY_COLORS = {
  productivity: 'from-blue-500 to-cyan-500',
  collaboration: 'from-green-500 to-emerald-500',
  performance: 'from-purple-500 to-indigo-500',
  engagement: 'from-orange-500 to-red-500'
};

const TeamAnalyticsDashboard: React.FC<TeamAnalyticsDashboardProps> = ({ teamId, onClose }) => {
  const [analytics, setAnalytics] = useState<TeamAnalytics | null>(null);
  const [memberPerformance, setMemberPerformance] = useState<MemberPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedCategory, setSelectedCategory] = useState<'overview' | 'productivity' | 'collaboration' | 'performance' | 'engagement' | 'members'>('overview');

  useEffect(() => {
    loadAnalyticsData();
  }, [teamId, selectedTimeRange]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analytics data
      const mockAnalytics: TeamAnalytics = {
        teamId,
        timeRange: selectedTimeRange,
        productivity: {
          overallScore: 87,
          taskCompletionRate: 92,
          averageTaskTime: 4.2,
          onTimeDelivery: 89,
          qualityScore: 91
        },
        collaboration: {
          communicationFrequency: 78,
          crossTeamCollaboration: 65,
          knowledgeSharing: 82,
          meetingEfficiency: 74,
          feedbackQuality: 88
        },
        performance: {
          sprintVelocity: 85,
          codeQuality: 89,
          bugResolutionTime: 76,
          featureDeliveryRate: 83,
          customerSatisfaction: 92
        },
        engagement: {
          activeMembers: 95,
          averageSessionTime: 2.8,
          featureAdoption: 78,
          userRetention: 94,
          satisfactionScore: 86
        },
        trends: {
          productivityTrend: 'up',
          collaborationTrend: 'stable',
          performanceTrend: 'up',
          engagementTrend: 'up'
        },
        insights: [
          {
            id: 'insight-1',
            type: 'positive',
            category: 'productivity',
            title: 'Task Completion Rate Improved',
            description: 'Team task completion rate increased by 8% this month',
            impact: 'high',
            confidence: 95,
            dataPoints: [84, 86, 88, 90, 92],
            timestamp: new Date().toISOString()
          },
          {
            id: 'insight-2',
            type: 'negative',
            category: 'collaboration',
            title: 'Cross-Team Collaboration Declining',
            description: 'Cross-team collaboration decreased by 12% over the past 30 days',
            impact: 'medium',
            confidence: 82,
            dataPoints: [77, 73, 69, 67, 65],
            timestamp: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 'insight-3',
            type: 'positive',
            category: 'performance',
            title: 'Code Quality Metrics Strong',
            description: 'Code quality scores consistently above 85% for 3 months',
            impact: 'high',
            confidence: 98,
            dataPoints: [87, 88, 89, 89, 89],
            timestamp: new Date(Date.now() - 172800000).toISOString()
          }
        ],
        recommendations: [
          {
            id: 'rec-1',
            priority: 'high',
            category: 'collaboration',
            title: 'Increase Cross-Team Collaboration',
            description: 'Implement regular cross-team meetings and shared project initiatives',
            expectedImpact: 15,
            effort: 'medium',
            timeframe: '2-4 weeks',
            actionItems: [
              'Schedule weekly cross-team sync meetings',
              'Create shared project channels',
              'Implement rotation program for team members'
            ]
          },
          {
            id: 'rec-2',
            priority: 'medium',
            category: 'productivity',
            title: 'Optimize Task Estimation',
            description: 'Improve task estimation accuracy to reduce overruns',
            expectedImpact: 10,
            effort: 'low',
            timeframe: '1-2 weeks',
            actionItems: [
              'Review historical task completion times',
              'Implement estimation guidelines',
              'Train team on estimation techniques'
            ]
          }
        ]
      };

      // Mock member performance data
      const mockMemberPerformance: MemberPerformance[] = [
        {
          id: 'member-1',
          name: 'John Admin',
          email: 'admin@team.com',
          role: 'Owner',
          department: 'Engineering',
          metrics: {
            tasksCompleted: 45,
            tasksOnTime: 42,
            averageQuality: 94,
            collaborationScore: 88,
            productivityScore: 91,
            lastActive: new Date().toISOString()
          },
          trends: {
            productivity: 'up',
            collaboration: 'stable',
            quality: 'up'
          }
        },
        {
          id: 'member-2',
          name: 'Jane Manager',
          email: 'manager@team.com',
          role: 'Manager',
          department: 'Product',
          metrics: {
            tasksCompleted: 32,
            tasksOnTime: 28,
            averageQuality: 87,
            collaborationScore: 92,
            productivityScore: 85,
            lastActive: new Date(Date.now() - 3600000).toISOString()
          },
          trends: {
            productivity: 'stable',
            collaboration: 'up',
            quality: 'stable'
          }
        },
        {
          id: 'member-3',
          name: 'Bob Developer',
          email: 'developer@team.com',
          role: 'Member',
          department: 'Engineering',
          metrics: {
            tasksCompleted: 38,
            tasksOnTime: 35,
            averageQuality: 89,
            collaborationScore: 75,
            productivityScore: 88,
            lastActive: new Date(Date.now() - 7200000).toISOString()
          },
          trends: {
            productivity: 'up',
            collaboration: 'down',
            quality: 'up'
          }
        }
      ];

      setAnalytics(mockAnalytics);
      setMemberPerformance(mockMemberPerformance);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading team analytics...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Team Analytics Dashboard</h2>
              <p className="text-indigo-100 mt-1">Comprehensive team performance and productivity insights</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-200 text-sm">Time Range:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {TIME_RANGES.find(tr => tr.id === selectedTimeRange)?.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-200 text-sm">Overall Score:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {analytics.productivity.overallScore}%
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'productivity', name: 'Productivity', icon: '⚡' },
              { id: 'collaboration', name: 'Collaboration', icon: '🤝' },
              { id: 'performance', name: 'Performance', icon: '🎯' },
              { id: 'engagement', name: 'Engagement', icon: '💪' },
              { id: 'members', name: 'Members', icon: '👥' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedCategory === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Time Range Selector */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Time Range:</span>
            <div className="flex space-x-2">
              {TIME_RANGES.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedTimeRange(range.id as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedTimeRange === range.id
                      ? 'bg-white shadow-sm border border-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {range.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedCategory === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">⚡</span>
                      <span className={`text-lg ${getTrendColor(analytics.trends.productivityTrend)}`}>
                        {getTrendIcon(analytics.trends.productivityTrend)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{analytics.productivity.overallScore}%</div>
                    <div className="text-blue-600 text-sm">Productivity Score</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">🤝</span>
                      <span className={`text-lg ${getTrendColor(analytics.trends.collaborationTrend)}`}>
                        {getTrendIcon(analytics.trends.collaborationTrend)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">{analytics.collaboration.knowledgeSharing}%</div>
                    <div className="text-green-600 text-sm">Collaboration Score</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">🎯</span>
                      <span className={`text-lg ${getTrendColor(analytics.trends.performanceTrend)}`}>
                        {getTrendIcon(analytics.trends.performanceTrend)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">{analytics.performance.sprintVelocity}%</div>
                    <div className="text-purple-600 text-sm">Performance Score</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">💪</span>
                      <span className={`text-lg ${getTrendColor(analytics.trends.engagementTrend)}`}>
                        {getTrendIcon(analytics.trends.engagementTrend)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900">{analytics.engagement.satisfactionScore}%</div>
                    <div className="text-orange-600 text-sm">Engagement Score</div>
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="space-y-4">
                  {analytics.insights.map((insight) => (
                    <div key={insight.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(insight.impact)}`}>
                            {insight.impact.toUpperCase()}
                          </span>
                          <span className="font-medium text-gray-900">{insight.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(insight.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                <div className="space-y-4">
                  {analytics.recommendations.map((rec) => (
                    <div key={rec.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                            {rec.priority.toUpperCase()}
                          </span>
                          <span className="font-medium text-gray-900">{rec.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">{rec.timeframe}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                      <div className="space-y-1">
                        {rec.actionItems.map((item, index) => (
                          <div key={index} className="text-sm text-gray-600">• {item}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'members' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Member Performance</h3>
              <div className="space-y-4">
                {memberPerformance.map((member) => (
                  <div key={member.id} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{member.metrics.productivityScore}%</div>
                        <div className="text-sm text-gray-500">Productivity Score</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{member.metrics.tasksCompleted}</div>
                        <div className="text-sm text-gray-600">Tasks Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{member.metrics.tasksOnTime}</div>
                        <div className="text-sm text-gray-600">On Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{member.metrics.averageQuality}%</div>
                        <div className="text-sm text-gray-600">Quality</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{member.metrics.collaborationScore}%</div>
                        <div className="text-sm text-gray-600">Collaboration</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`text-sm ${getTrendColor(member.trends.productivity)}`}>
                          {getTrendIcon(member.trends.productivity)} Productivity
                        </span>
                        <span className={`text-sm ${getTrendColor(member.trends.collaboration)}`}>
                          {getTrendIcon(member.trends.collaboration)} Collaboration
                        </span>
                        <span className={`text-sm ${getTrendColor(member.trends.quality)}`}>
                          {getTrendIcon(member.trends.quality)} Quality
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        Last active: {new Date(member.metrics.lastActive).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category-specific views */}
          {selectedCategory !== 'overview' && selectedCategory !== 'members' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">{selectedCategory} Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(analytics[selectedCategory as keyof typeof analytics]).map(([key, value]) => (
                  <div key={key} className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`text-lg ${getTrendColor(analytics.trends[`${selectedCategory}Trend` as keyof typeof analytics.trends])}`}>
                        {getTrendIcon(analytics.trends[`${selectedCategory}Trend` as keyof typeof analytics.trends])}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {typeof value === 'number' ? `${value}${key.includes('Score') || key.includes('Rate') ? '%' : ''}` : value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Analytics for {TIME_RANGES.find(tr => tr.id === selectedTimeRange)?.name.toLowerCase()}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                console.log('Exporting analytics data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Export Report
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamAnalyticsDashboard;
