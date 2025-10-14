/**
 * Analytics Dashboard Component
 * 
 * Provides comprehensive analytics and insights for users
 * Includes energy patterns, productivity trends, and performance metrics
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { analytics } from '../../utils/analytics';

interface AnalyticsData {
  energyPatterns: {
    daily: Array<{ date: string; energy: number; tasks: number }>;
    weekly: Array<{ week: string; avgEnergy: number; totalTasks: number }>;
    monthly: Array<{ month: string; avgEnergy: number; totalTasks: number }>;
  };
  productivityMetrics: {
    tasksCompleted: number;
    averageTaskDuration: number;
    focusTime: number;
    productivityScore: number;
    streakDays: number;
  };
  performanceTrends: {
    efficiency: number;
    consistency: number;
    improvement: number;
  };
  insights: Array<{
    type: 'achievement' | 'suggestion' | 'warning' | 'celebration';
    title: string;
    description: string;
    action?: string;
  }>;
}

interface AnalyticsDashboardProps {
  userId: string;
  onClose: () => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userId, onClose }) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'energy' | 'productivity' | 'insights'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      // Simulate API call - in real implementation, this would fetch from backend
      const mockData: AnalyticsData = {
        energyPatterns: {
          daily: generateDailyData(),
          weekly: generateWeeklyData(),
          monthly: generateMonthlyData()
        },
        productivityMetrics: {
          tasksCompleted: 47,
          averageTaskDuration: 25,
          focusTime: 8.5,
          productivityScore: 87,
          streakDays: 12
        },
        performanceTrends: {
          efficiency: 92,
          consistency: 78,
          improvement: 15
        },
        insights: [
          {
            type: 'achievement',
            title: 'Energy Master!',
            description: 'You\'ve maintained high energy levels for 5 consecutive days',
            action: 'Keep it up!'
          },
          {
            type: 'suggestion',
            title: 'Peak Performance Window',
            description: 'You\'re most productive between 9-11 AM. Schedule important tasks then.',
            action: 'Optimize Schedule'
          },
          {
            type: 'celebration',
            title: 'Streak Champion!',
            description: '12 days of consistent task completion - your longest streak yet!',
            action: 'Celebrate!'
          }
        ]
      };

      setData(mockData);
      
      // Track analytics dashboard view
      analytics.trackPageView('Analytics Dashboard');
      
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateDailyData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        energy: Math.floor(Math.random() * 10) + 1,
        tasks: Math.floor(Math.random() * 8) + 2
      });
    }
    return data;
  };

  const generateWeeklyData = () => {
    const data = [];
    for (let i = 3; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      data.push({
        week: `Week ${4 - i}`,
        avgEnergy: Math.floor(Math.random() * 5) + 5,
        totalTasks: Math.floor(Math.random() * 20) + 10
      });
    }
    return data;
  };

  const generateMonthlyData = () => {
    const data = [];
    for (let i = 2; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      data.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        avgEnergy: Math.floor(Math.random() * 3) + 6,
        totalTasks: Math.floor(Math.random() * 50) + 30
      });
    }
    return data;
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'achievement': return '🏆';
      case 'suggestion': return '💡';
      case 'warning': return '⚠️';
      case 'celebration': return '🎉';
      default: return '📊';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'from-yellow-400 to-orange-500';
      case 'suggestion': return 'from-blue-400 to-cyan-500';
      case 'warning': return 'from-red-400 to-pink-500';
      case 'celebration': return 'from-green-400 to-emerald-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading Analytics...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Data Available</h3>
            <p className="text-gray-600 mb-4">Start using SyncScript to see your analytics</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
              <p className="text-purple-100 mt-1">Your productivity insights and trends</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-2 bg-white/20 text-white rounded-lg border border-white/30 focus:ring-2 focus:ring-white/50"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
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
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'energy', label: 'Energy Patterns', icon: '⚡' },
              { id: 'productivity', label: 'Productivity', icon: '🎯' },
              { id: 'insights', label: 'Insights', icon: '💡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Tasks Completed</p>
                      <p className="text-3xl font-bold">{data.productivityMetrics.tasksCompleted}</p>
                    </div>
                    <div className="text-4xl">✅</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Productivity Score</p>
                      <p className="text-3xl font-bold">{data.productivityMetrics.productivityScore}%</p>
                    </div>
                    <div className="text-4xl">📈</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Streak Days</p>
                      <p className="text-3xl font-bold">{data.productivityMetrics.streakDays}</p>
                    </div>
                    <div className="text-4xl">🔥</div>
                  </div>
                </motion.div>
              </div>

              {/* Performance Trends */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{data.performanceTrends.efficiency}%</div>
                    <div className="text-sm text-gray-600">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{data.performanceTrends.consistency}%</div>
                    <div className="text-sm text-gray-600">Consistency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">+{data.performanceTrends.improvement}%</div>
                    <div className="text-sm text-gray-600">Improvement</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'energy' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Patterns</h3>
                <div className="space-y-4">
                  {data.energyPatterns.daily.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm text-gray-600">{day.date}</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Energy:</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(day.energy / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{day.energy}/10</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {day.tasks} tasks
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'productivity' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Focus Time</h3>
                  <div className="text-3xl font-bold text-blue-600">{data.productivityMetrics.focusTime}h</div>
                  <p className="text-sm text-gray-600 mt-2">Total focused work time</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Task Duration</h3>
                  <div className="text-3xl font-bold text-green-600">{data.productivityMetrics.averageTaskDuration}m</div>
                  <p className="text-sm text-gray-600 mt-2">Per task completion</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-4">
              {data.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-r ${getInsightColor(insight.type)} text-white p-6 rounded-xl`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{getInsightIcon(insight.type)}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">{insight.title}</h4>
                      <p className="text-sm opacity-90 mb-3">{insight.description}</p>
                      {insight.action && (
                        <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-medium">
                          {insight.action}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
