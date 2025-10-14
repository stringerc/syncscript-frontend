/**
 * AI-Powered Insights System Component
 * 
 * Machine learning-powered insights
 * Includes intelligent recommendations, pattern recognition, and automated insights
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'prediction' | 'recommendation' | 'pattern' | 'anomaly' | 'optimization';
  category: 'productivity' | 'team' | 'financial' | 'operational' | 'strategic';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  data: Record<string, any>;
  recommendations: string[];
  createdAt: string;
  expiresAt: string;
  isRead: boolean;
  isImplemented: boolean;
}

interface MLModel {
  id: string;
  name: string;
  description: string;
  type: 'classification' | 'regression' | 'clustering' | 'nlp' | 'time-series';
  purpose: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  status: 'training' | 'evaluating' | 'deployed' | 'retraining';
  lastTrained: string;
  predictions: number;
  features: string[];
  performance: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    auc: number;
  };
}

interface PatternRecognition {
  id: string;
  name: string;
  description: string;
  pattern: string;
  frequency: number;
  confidence: number;
  significance: number;
  examples: string[];
  insights: string[];
  recommendations: string[];
  createdAt: string;
  lastDetected: string;
}

interface AutomatedInsight {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'behavior' | 'trend' | 'anomaly' | 'opportunity';
  severity: 'info' | 'warning' | 'critical';
  data: Record<string, any>;
  recommendations: string[];
  isRead: boolean;
  isActionable: boolean;
  createdAt: string;
  expiresAt?: string;
}

interface AIPoweredInsightsProps {
  onClose: () => void;
}

const AIPoweredInsights: React.FC<AIPoweredInsightsProps> = ({ onClose }) => {
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [mlModels, setMLModels] = useState<MLModel[]>([]);
  const [patternRecognition, setPatternRecognition] = useState<PatternRecognition[]>([]);
  const [automatedInsights, setAutomatedInsights] = useState<AutomatedInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'insights' | 'models' | 'patterns' | 'automated'>('insights');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadAIData();
  }, []);

  const loadAIData = async () => {
    setIsLoading(true);
    
    try {
      // Mock AI insights
      const mockAIInsights: AIInsight[] = [
        {
          id: 'insight-1',
          title: 'Peak Productivity Window Identified',
          description: 'AI analysis reveals that productivity peaks between 10 AM and 12 PM across all teams',
          type: 'pattern',
          category: 'productivity',
          confidence: 94.2,
          impact: 'high',
          actionable: true,
          priority: 'high',
          data: {
            'peak_hours': '10:00-12:00',
            'productivity_increase': 23.5,
            'teams_affected': 4,
            'confidence_level': 94.2,
            'data_points': 1250
          },
          recommendations: [
            'Schedule important meetings during peak hours',
            'Assign critical tasks to peak productivity windows',
            'Implement focus time blocks during peak hours'
          ],
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          expiresAt: new Date(Date.now() + 604800000).toISOString(),
          isRead: false,
          isImplemented: false
        },
        {
          id: 'insight-2',
          title: 'Energy Dip Prediction',
          description: 'Based on ML analysis, you\'re likely to experience an energy dip around 3 PM',
          type: 'prediction',
          category: 'productivity',
          confidence: 89.7,
          impact: 'medium',
          actionable: true,
          priority: 'medium',
          data: {
            'predicted_dip_time': '15:00',
            'confidence': 89.7,
            'historical_accuracy': 92.1,
            'recommended_action': 'schedule_break',
            'energy_drop': 15.3
          },
          recommendations: [
            'Schedule a 15-minute break at 3 PM',
            'Move to lighter tasks during energy dip',
            'Consider a short walk or meditation'
          ],
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
          isRead: true,
          isImplemented: true
        },
        {
          id: 'insight-3',
          title: 'Team Collaboration Optimization',
          description: 'AI recommends increasing team meeting frequency by 25% for better collaboration',
          type: 'optimization',
          category: 'team',
          confidence: 91.5,
          impact: 'high',
          actionable: true,
          priority: 'high',
          data: {
            'current_frequency': 'weekly',
            'recommended_frequency': 'bi-weekly',
            'expected_improvement': 25.0,
            'teams_affected': 3,
            'implementation_effort': 'low'
          },
          recommendations: [
            'Increase team meeting frequency to twice weekly',
            'Implement structured meeting agendas',
            'Use collaboration tools for async communication'
          ],
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          expiresAt: new Date(Date.now() + 1209600000).toISOString(),
          isRead: false,
          isImplemented: false
        },
        {
          id: 'insight-4',
          title: 'Anomaly Detected in Task Completion',
          description: 'Unusual pattern detected in task completion rates - investigation recommended',
          type: 'anomaly',
          category: 'operational',
          confidence: 87.3,
          impact: 'medium',
          actionable: true,
          priority: 'urgent',
          data: {
            'anomaly_type': 'completion_rate_drop',
            'severity': 'medium',
            'affected_period': 'last_3_days',
            'normal_rate': 94.2,
            'current_rate': 78.5,
            'deviation': 15.7
          },
          recommendations: [
            'Investigate recent changes in work environment',
            'Check for external distractions or interruptions',
            'Review task assignment and prioritization'
          ],
          createdAt: new Date(Date.now() - 14400000).toISOString(),
          expiresAt: new Date(Date.now() + 172800000).toISOString(),
          isRead: false,
          isImplemented: false
        }
      ];

      // Mock ML models
      const mockMLModels: MLModel[] = [
        {
          id: 'model-1',
          name: 'Productivity Pattern Classifier',
          description: 'Classifies productivity patterns and identifies optimization opportunities',
          type: 'classification',
          purpose: 'productivity_optimization',
          accuracy: 94.2,
          precision: 92.8,
          recall: 95.1,
          f1Score: 93.9,
          status: 'deployed',
          lastTrained: new Date(Date.now() - 86400000).toISOString(),
          predictions: 1250,
          features: ['time_of_day', 'task_type', 'energy_level', 'previous_completion_rate', 'team_size'],
          performance: {
            accuracy: 94.2,
            precision: 92.8,
            recall: 95.1,
            f1Score: 93.9,
            auc: 0.96
          }
        },
        {
          id: 'model-2',
          name: 'Energy Level Predictor',
          description: 'Predicts energy levels throughout the day using regression analysis',
          type: 'regression',
          purpose: 'energy_forecasting',
          accuracy: 89.7,
          precision: 88.3,
          recall: 91.2,
          f1Score: 89.7,
          status: 'deployed',
          lastTrained: new Date(Date.now() - 172800000).toISOString(),
          predictions: 890,
          features: ['sleep_quality', 'exercise', 'nutrition', 'stress_level', 'workload', 'time_of_day'],
          performance: {
            accuracy: 89.7,
            precision: 88.3,
            recall: 91.2,
            f1Score: 89.7,
            auc: 0.92
          }
        },
        {
          id: 'model-3',
          name: 'Team Collaboration Analyzer',
          description: 'Analyzes team collaboration patterns using NLP and clustering',
          type: 'nlp',
          purpose: 'collaboration_analysis',
          accuracy: 91.5,
          precision: 90.1,
          recall: 93.8,
          f1Score: 91.9,
          status: 'evaluating',
          lastTrained: new Date(Date.now() - 259200000).toISOString(),
          predictions: 567,
          features: ['communication_frequency', 'meeting_duration', 'response_time', 'collaboration_tools', 'team_size'],
          performance: {
            accuracy: 91.5,
            precision: 90.1,
            recall: 93.8,
            f1Score: 91.9,
            auc: 0.94
          }
        },
        {
          id: 'model-4',
          name: 'Task Completion Time Series',
          description: 'Time series model for predicting task completion patterns',
          type: 'time-series',
          purpose: 'completion_forecasting',
          accuracy: 87.3,
          precision: 85.9,
          recall: 89.2,
          f1Score: 87.5,
          status: 'training',
          lastTrained: new Date(Date.now() - 345600000).toISOString(),
          predictions: 234,
          features: ['historical_completion', 'task_complexity', 'team_performance', 'seasonality', 'trend'],
          performance: {
            accuracy: 87.3,
            precision: 85.9,
            recall: 89.2,
            f1Score: 87.5,
            auc: 0.89
          }
        }
      ];

      // Mock pattern recognition
      const mockPatternRecognition: PatternRecognition[] = [
        {
          id: 'pattern-1',
          name: 'Monday Productivity Boost',
          description: 'Productivity consistently increases by 15% on Mondays',
          pattern: 'weekly_cycle',
          frequency: 0.87,
          confidence: 0.92,
          significance: 0.95,
          examples: [
            'Monday productivity: 92.5%',
            'Tuesday productivity: 78.3%',
            'Wednesday productivity: 85.7%'
          ],
          insights: [
            'Fresh start effect after weekend',
            'Higher motivation at beginning of week',
            'Better focus after rest period'
          ],
          recommendations: [
            'Schedule important tasks on Mondays',
            'Use Monday momentum for project kickoffs',
            'Plan team meetings for Monday mornings'
          ],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          lastDetected: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'pattern-2',
          name: 'Afternoon Energy Dip',
          description: 'Energy levels consistently drop between 2-4 PM',
          pattern: 'daily_cycle',
          frequency: 0.94,
          confidence: 0.89,
          significance: 0.91,
          examples: [
            '2 PM energy: 65.2%',
            '3 PM energy: 58.7%',
            '4 PM energy: 62.1%'
          ],
          insights: [
            'Natural circadian rhythm',
            'Post-lunch energy decline',
            'Consistent across all users'
          ],
          recommendations: [
            'Schedule breaks during afternoon dip',
            'Move to lighter tasks in afternoon',
            'Consider power naps or walks'
          ],
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          lastDetected: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'pattern-3',
          name: 'Team Size Efficiency Curve',
          description: 'Team efficiency peaks at 5-7 members and declines with larger teams',
          pattern: 'team_size_correlation',
          frequency: 0.76,
          confidence: 0.85,
          significance: 0.88,
          examples: [
            '5-member team: 94.2% efficiency',
            '7-member team: 96.8% efficiency',
            '10-member team: 87.3% efficiency'
          ],
          insights: [
            'Optimal team size for collaboration',
            'Communication overhead increases with size',
            'Sweet spot for productivity and coordination'
          ],
          recommendations: [
            'Keep teams between 5-7 members',
            'Split large teams into smaller units',
            'Implement cross-team coordination for larger projects'
          ],
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          lastDetected: new Date(Date.now() - 129600000).toISOString()
        }
      ];

      // Mock automated insights
      const mockAutomatedInsights: AutomatedInsight[] = [
        {
          id: 'auto-1',
          title: 'Performance Anomaly Detected',
          description: 'Your task completion rate dropped by 15% compared to last week',
          category: 'performance',
          severity: 'warning',
          data: {
            'current_rate': 75.2,
            'previous_rate': 90.2,
            'drop_percentage': 15.0,
            'affected_tasks': 12,
            'time_period': 'last_3_days'
          },
          recommendations: [
            'Review recent changes in work environment',
            'Check for external distractions',
            'Consider adjusting task priorities'
          ],
          isRead: false,
          isActionable: true,
          createdAt: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: 'auto-2',
          title: 'Positive Trend Identified',
          description: 'Your energy management has improved by 23% over the past month',
          category: 'trend',
          severity: 'info',
          data: {
            'improvement_percentage': 23.0,
            'time_period': '30_days',
            'energy_score': 87.5,
            'previous_score': 64.5,
            'trend_direction': 'upward'
          },
          recommendations: [
            'Continue current energy management practices',
            'Share strategies with team members',
            'Document successful techniques'
          ],
          isRead: true,
          isActionable: false,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'auto-3',
          title: 'Collaboration Opportunity',
          description: 'Team collaboration efficiency could increase by 18% with better meeting scheduling',
          category: 'opportunity',
          severity: 'info',
          data: {
            'potential_improvement': 18.0,
            'current_efficiency': 72.3,
            'optimal_scheduling': 'morning_meetings',
            'team_size': 8,
            'implementation_effort': 'low'
          },
          recommendations: [
            'Schedule important meetings in the morning',
            'Reduce meeting frequency',
            'Implement meeting agendas'
          ],
          isRead: false,
          isActionable: true,
          createdAt: new Date(Date.now() - 5400000).toISOString()
        },
        {
          id: 'auto-4',
          title: 'Critical Resource Constraint',
          description: 'Resource utilization has reached 95% - immediate action required',
          category: 'anomaly',
          severity: 'critical',
          data: {
            'utilization_rate': 95.0,
            'threshold': 85.0,
            'affected_resources': 3,
            'impact_level': 'high',
            'urgency': 'immediate'
          },
          recommendations: [
            'Immediately allocate additional resources',
            'Prioritize critical tasks',
            'Consider task delegation or postponement'
          ],
          isRead: false,
          isActionable: true,
          createdAt: new Date(Date.now() - 900000).toISOString()
        }
      ];

      setAIInsights(mockAIInsights);
      setMLModels(mockMLModels);
      setPatternRecognition(mockPatternRecognition);
      setAutomatedInsights(mockAutomatedInsights);
    } catch (error) {
      console.error('Failed to load AI data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const implementInsight = async (insightId: string) => {
    try {
      setAIInsights(prev => prev.map(insight => 
        insight.id === insightId 
          ? { ...insight, isImplemented: true, isRead: true }
          : insight
      ));
      
      console.log(`Implemented insight: ${insightId}`);
    } catch (error) {
      console.error('Failed to implement insight:', error);
    }
  };

  const markInsightAsRead = async (insightId: string) => {
    try {
      setAIInsights(prev => prev.map(insight => 
        insight.id === insightId 
          ? { ...insight, isRead: true }
          : insight
      ));
      
      console.log(`Marked insight as read: ${insightId}`);
    } catch (error) {
      console.error('Failed to mark insight as read:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return '🔮';
      case 'recommendation': return '💡';
      case 'pattern': return '📊';
      case 'anomaly': return '⚠️';
      case 'optimization': return '⚡';
      case 'classification': return '🏷️';
      case 'regression': return '📈';
      case 'clustering': return '🔗';
      case 'nlp': return '🗣️';
      case 'time-series': return '⏰';
      default: return '🤖';
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'training': return 'text-orange-600 bg-orange-100';
      case 'evaluating': return 'text-blue-600 bg-blue-100';
      case 'deployed': return 'text-green-600 bg-green-100';
      case 'retraining': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading AI insights...</span>
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
              <p className="text-blue-100 mt-1">Machine learning-powered insights</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Insights:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {aiInsights.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Models:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {mlModels.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Patterns:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {patternRecognition.length}
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
              { id: 'insights', name: 'AI Insights', icon: '🤖' },
              { id: 'models', name: 'ML Models', icon: '🧠' },
              { id: 'patterns', name: 'Pattern Recognition', icon: '📊' },
              { id: 'automated', name: 'Automated Insights', icon: '⚡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
              <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
              
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      !insight.isRead 
                        ? 'border-blue-200 bg-blue-50' 
                        : insight.isImplemented
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getTypeIcon(insight.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(insight.impact)}`}>
                          {insight.impact.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                          {insight.priority.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {insight.confidence}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Key Data:</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(insight.data).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-gray-600">{key.replace('_', ' ')}:</span>
                            <span className="ml-2 text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Recommendations:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {insight.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {!insight.isRead && (
                        <button
                          onClick={() => markInsightAsRead(insight.id)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all"
                        >
                          Mark as Read
                        </button>
                      )}
                      {insight.actionable && !insight.isImplemented && (
                        <button
                          onClick={() => implementInsight(insight.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all"
                        >
                          Implement
                        </button>
                      )}
                      <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'models' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">ML Models</h3>
              
              <div className="space-y-4">
                {mlModels.map((model) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getTypeIcon(model.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{model.name}</h4>
                        <p className="text-sm text-gray-600">{model.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(model.status)}`}>
                        {model.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Purpose:</div>
                      <div className="text-sm text-gray-600 capitalize">{model.purpose.replace('_', ' ')}</div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Accuracy:</span>
                          <span className="ml-2 text-gray-900">{model.accuracy}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">F1 Score:</span>
                          <span className="ml-2 text-gray-900">{model.f1Score}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Predictions:</span>
                          <span className="ml-2 text-gray-900">{model.predictions}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Features:</span>
                          <span className="ml-2 text-gray-900">{model.features.length}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {model.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {feature.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View Performance
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Retrain
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'patterns' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Pattern Recognition</h3>
              
              <div className="space-y-4">
                {patternRecognition.map((pattern) => (
                  <motion.div
                    key={pattern.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{pattern.name}</h4>
                        <p className="text-sm text-gray-600">{pattern.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {pattern.confidence.toFixed(2)}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {pattern.frequency.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Pattern Type:</div>
                      <div className="text-sm text-gray-600 capitalize">{pattern.pattern.replace('_', ' ')}</div>
                      
                      <div className="text-sm font-medium text-gray-700">Examples:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {pattern.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                      
                      <div className="text-sm font-medium text-gray-700">Insights:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {pattern.insights.map((insight, index) => (
                          <li key={index}>{insight}</li>
                        ))}
                      </ul>
                      
                      <div className="text-sm font-medium text-gray-700">Recommendations:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {pattern.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'automated' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Automated Insights</h3>
              
              <div className="space-y-4">
                {automatedInsights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      !insight.isRead 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getTypeIcon(insight.category)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(insight.severity)}`}>
                          {insight.severity.toUpperCase()}
                        </span>
                        {!insight.isRead && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            NEW
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Key Data:</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(insight.data).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-gray-600">{key.replace('_', ' ')}:</span>
                            <span className="ml-2 text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Recommendations:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {insight.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {!insight.isRead && (
                        <button
                          onClick={() => {
                            setAutomatedInsights(prev => prev.map(i => 
                              i.id === insight.id ? { ...i, isRead: true } : i
                            ));
                          }}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        View Details
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
            AI-Powered Insights • {aiInsights.length} insights • {mlModels.length} models • {patternRecognition.length} patterns
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
                console.log('Exporting AI insights data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIPoweredInsights;
