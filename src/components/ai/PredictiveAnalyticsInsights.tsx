/**
 * Predictive Analytics & Insights Component
 * 
 * Productivity forecasting, optimization recommendations, and intelligent insights
 * Includes trend analysis, predictive modeling, and optimization suggestions
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PredictiveInsight {
  id: string;
  type: 'productivity' | 'schedule' | 'energy' | 'focus' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  timeframe: 'short' | 'medium' | 'long';
  actionable: boolean;
  recommendations: string[];
}

interface TrendAnalysis {
  id: string;
  metric: string;
  currentValue: number;
  predictedValue: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  timeframe: string;
}

interface OptimizationSuggestion {
  id: string;
  category: 'schedule' | 'energy' | 'focus' | 'workflow' | 'communication';
  title: string;
  description: string;
  potentialImprovement: number;
  effort: 'low' | 'medium' | 'high';
  priority: number;
}

interface PredictiveAnalyticsInsightsProps {
  onClose: () => void;
}

const PredictiveAnalyticsInsights: React.FC<PredictiveAnalyticsInsightsProps> = ({ onClose }) => {
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [trends, setTrends] = useState<TrendAnalysis[]>([]);
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'insights' | 'trends' | 'optimization'>('insights');

  useEffect(() => {
    loadPredictiveData();
  }, []);

  const loadPredictiveData = async () => {
    setIsLoading(true);
    
    try {
      // Mock predictive insights
      const mockInsights: PredictiveInsight[] = [
        {
          id: 'insight-1',
          type: 'productivity',
          title: 'Productivity Peak Prediction',
          description: 'Based on your patterns, you\'ll be most productive tomorrow between 10-11 AM',
          confidence: 0.94,
          impact: 'high',
          timeframe: 'short',
          actionable: true,
          recommendations: ['Schedule important tasks for 10-11 AM', 'Avoid meetings during this time', 'Prepare materials beforehand']
        },
        {
          id: 'insight-2',
          type: 'energy',
          title: 'Energy Level Forecast',
          description: 'Your energy levels are predicted to drop 15% next week due to increased workload',
          confidence: 0.87,
          impact: 'medium',
          timeframe: 'medium',
          actionable: true,
          recommendations: ['Plan lighter tasks for next week', 'Schedule breaks every 2 hours', 'Consider delegating some tasks']
        },
        {
          id: 'insight-3',
          type: 'schedule',
          title: 'Schedule Optimization',
          description: 'Moving your standup meeting to 9:30 AM could improve team productivity by 12%',
          confidence: 0.91,
          impact: 'high',
          timeframe: 'short',
          actionable: true,
          recommendations: ['Reschedule standup to 9:30 AM', 'Send calendar invite to team', 'Monitor productivity metrics']
        }
      ];

      // Mock trend analysis
      const mockTrends: TrendAnalysis[] = [
        {
          id: 'trend-1',
          metric: 'Task Completion Rate',
          currentValue: 78,
          predictedValue: 85,
          trend: 'up',
          confidence: 0.89,
          timeframe: 'Next 30 days'
        },
        {
          id: 'trend-2',
          metric: 'Average Energy Level',
          currentValue: 6.8,
          predictedValue: 7.2,
          trend: 'up',
          confidence: 0.82,
          timeframe: 'Next 2 weeks'
        },
        {
          id: 'trend-3',
          metric: 'Focus Time Duration',
          currentValue: 45,
          predictedValue: 52,
          trend: 'up',
          confidence: 0.76,
          timeframe: 'Next month'
        }
      ];

      // Mock optimization suggestions
      const mockSuggestions: OptimizationSuggestion[] = [
        {
          id: 'suggestion-1',
          category: 'schedule',
          title: 'Optimize Meeting Times',
          description: 'Move recurring meetings to Tuesday-Thursday for better productivity',
          potentialImprovement: 18,
          effort: 'medium',
          priority: 8
        },
        {
          id: 'suggestion-2',
          category: 'energy',
          title: 'Implement Energy Breaks',
          description: 'Add 15-minute breaks every 90 minutes to maintain energy levels',
          potentialImprovement: 22,
          effort: 'low',
          priority: 9
        },
        {
          id: 'suggestion-3',
          category: 'focus',
          title: 'Block Focus Time',
          description: 'Schedule 2-hour focus blocks for deep work sessions',
          potentialImprovement: 15,
          effort: 'low',
          priority: 7
        }
      ];

      setInsights(mockInsights);
      setTrends(mockTrends);
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Failed to load predictive data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'productivity': return '📈';
      case 'schedule': return '📅';
      case 'energy': return '⚡';
      case 'focus': return '🎯';
      case 'optimization': return '🔧';
      default: return '💡';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading predictive analytics...</span>
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
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Predictive Analytics & Insights</h2>
              <p className="text-green-100 mt-1">Productivity forecasting, optimization recommendations, and intelligent insights</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Insights:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {insights.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Trends:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {trends.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Suggestions:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {suggestions.length}
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
              { id: 'insights', name: 'Predictive Insights', icon: '🔮' },
              { id: 'trends', name: 'Trend Analysis', icon: '📊' },
              { id: 'optimization', name: 'Optimization', icon: '⚡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Predictive Insights</h3>
              
              <div className="space-y-4">
                {insights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getInsightIcon(insight.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(insight.impact)}`}>
                          {insight.impact.toUpperCase()} IMPACT
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {Math.round(insight.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Recommendations:</div>
                      <div className="space-y-1">
                        {insight.recommendations.map((recommendation, index) => (
                          <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                            {recommendation}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'trends' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Trend Analysis</h3>
              
              <div className="space-y-4">
                {trends.map((trend) => (
                  <motion.div
                    key={trend.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{trend.metric}</h4>
                        <p className="text-sm text-gray-600">{trend.timeframe}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg ${getTrendColor(trend.trend)}`}>
                          {getTrendIcon(trend.trend)}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {Math.round(trend.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Current Value:</span>
                        <span className="ml-2 text-gray-900 font-medium">{trend.currentValue}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Predicted Value:</span>
                        <span className="ml-2 text-gray-900 font-medium">{trend.predictedValue}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'optimization' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Optimization Suggestions</h3>
              
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          +{suggestion.potentialImprovement}% improvement
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Priority {suggestion.priority}/10
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <span className="ml-2 text-gray-900 capitalize">{suggestion.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Effort Required:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                          suggestion.effort === 'low' ? 'bg-green-100 text-green-800' :
                          suggestion.effort === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {suggestion.effort.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Implement
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Learn More
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Predictive Analytics & Insights • {insights.length} insights • {trends.length} trends • {suggestions.length} suggestions
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
                console.log('Exporting predictive data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PredictiveAnalyticsInsights;
