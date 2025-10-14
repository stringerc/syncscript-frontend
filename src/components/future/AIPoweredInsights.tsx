/**
 * AI-Powered Insights System Component
 * 
 * Machine learning-powered productivity recommendations
 * Includes predictive analytics, intelligent suggestions, and automated insights
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'prediction' | 'recommendation' | 'pattern' | 'optimization' | 'alert';
  category: 'productivity' | 'health' | 'schedule' | 'team' | 'energy';
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  timestamp: string;
  source: string;
  data: Record<string, any>;
}

interface PredictiveModel {
  id: string;
  name: string;
  description: string;
  type: 'regression' | 'classification' | 'clustering' | 'time-series' | 'nlp';
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  status: 'training' | 'evaluating' | 'deployed' | 'retraining';
  lastUpdated: string;
  predictions: number;
  features: string[];
}

interface IntelligentSuggestion {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'schedule' | 'break' | 'focus' | 'collaboration' | 'learning';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  confidence: number;
  reasoning: string;
  expectedOutcome: string;
  timeToImplement: number;
  isAccepted: boolean;
  createdAt: string;
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
  createdAt: string;
  expiresAt?: string;
}

interface AIPoweredInsightsProps {
  onClose: () => void;
}

const AIPoweredInsights: React.FC<AIPoweredInsightsProps> = ({ onClose }) => {
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [predictiveModels, setPredictiveModels] = useState<PredictiveModel[]>([]);
  const [intelligentSuggestions, setIntelligentSuggestions] = useState<IntelligentSuggestion[]>([]);
  const [automatedInsights, setAutomatedInsights] = useState<AutomatedInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'insights' | 'models' | 'suggestions' | 'automated'>('insights');
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
          title: 'Peak Productivity Window Detected',
          description: 'Your productivity peaks between 10 AM and 12 PM. Consider scheduling your most important tasks during this time.',
          type: 'pattern',
          category: 'productivity',
          confidence: 94.2,
          impact: 'high',
          actionable: true,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          source: 'Behavioral Analysis Model',
          data: {
            'peak_hours': '10:00-12:00',
            'productivity_score': 94.2,
            'task_completion_rate': 87.5,
            'focus_duration': 45.2
          }
        },
        {
          id: 'insight-2',
          title: 'Energy Dip Prediction',
          description: 'Based on your patterns, you\'re likely to experience an energy dip around 3 PM. Consider scheduling a break or lighter tasks.',
          type: 'prediction',
          category: 'energy',
          confidence: 89.7,
          impact: 'medium',
          actionable: true,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          source: 'Energy Prediction Model',
          data: {
            'predicted_dip_time': '15:00',
            'confidence': 89.7,
            'historical_accuracy': 92.1,
            'recommended_action': 'schedule_break'
          }
        },
        {
          id: 'insight-3',
          title: 'Team Collaboration Optimization',
          description: 'Your team collaboration efficiency increases by 23% when meetings are scheduled in the morning. Consider adjusting meeting times.',
          type: 'optimization',
          category: 'team',
          confidence: 91.5,
          impact: 'high',
          actionable: true,
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          source: 'Team Performance Model',
          data: {
            'efficiency_improvement': 23.0,
            'optimal_meeting_time': '09:00-11:00',
            'team_size': 8,
            'meeting_frequency': 'daily'
          }
        },
        {
          id: 'insight-4',
          title: 'Task Completion Time Prediction',
          description: 'The current task is likely to take 2.5 hours to complete based on similar historical tasks.',
          type: 'prediction',
          category: 'schedule',
          confidence: 87.3,
          impact: 'medium',
          actionable: true,
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          source: 'Task Duration Model',
          data: {
            'predicted_duration': 2.5,
            'confidence': 87.3,
            'similar_tasks': 15,
            'complexity_score': 7.2
          }
        }
      ];

      // Mock predictive models
      const mockPredictiveModels: PredictiveModel[] = [
        {
          id: 'model-1',
          name: 'Productivity Pattern Recognition',
          description: 'Identifies patterns in productivity levels and task completion rates',
          type: 'time-series',
          accuracy: 94.2,
          precision: 92.8,
          recall: 95.1,
          f1Score: 93.9,
          status: 'deployed',
          lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          predictions: 1250,
          features: ['time_of_day', 'task_type', 'energy_level', 'previous_completion_rate']
        },
        {
          id: 'model-2',
          name: 'Energy Level Forecasting',
          description: 'Predicts energy levels throughout the day based on historical data',
          type: 'regression',
          accuracy: 89.7,
          precision: 88.3,
          recall: 91.2,
          f1Score: 89.7,
          status: 'deployed',
          lastUpdated: new Date(Date.now() - 172800000).toISOString(),
          predictions: 890,
          features: ['sleep_quality', 'exercise', 'nutrition', 'stress_level', 'workload']
        },
        {
          id: 'model-3',
          name: 'Task Priority Classifier',
          description: 'Automatically classifies task priorities based on context and urgency',
          type: 'classification',
          accuracy: 91.5,
          precision: 90.1,
          recall: 93.8,
          f1Score: 91.9,
          status: 'evaluating',
          lastUpdated: new Date(Date.now() - 259200000).toISOString(),
          predictions: 567,
          features: ['deadline', 'importance', 'complexity', 'dependencies', 'stakeholder_impact']
        },
        {
          id: 'model-4',
          name: 'Team Performance Analyzer',
          description: 'Analyzes team performance and identifies optimization opportunities',
          type: 'clustering',
          accuracy: 87.3,
          precision: 85.9,
          recall: 89.2,
          f1Score: 87.5,
          status: 'training',
          lastUpdated: new Date(Date.now() - 345600000).toISOString(),
          predictions: 234,
          features: ['team_size', 'communication_frequency', 'skill_diversity', 'project_complexity']
        }
      ];

      // Mock intelligent suggestions
      const mockIntelligentSuggestions: IntelligentSuggestion[] = [
        {
          id: 'suggestion-1',
          title: 'Schedule Deep Work Session',
          description: 'Block 2 hours for focused work on Project Alpha during your peak productivity window',
          type: 'focus',
          priority: 'high',
          confidence: 92.1,
          reasoning: 'Your productivity peaks at 10 AM and Project Alpha requires deep focus',
          expectedOutcome: 'Complete 40% of Project Alpha tasks',
          timeToImplement: 2,
          isAccepted: false,
          createdAt: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: 'suggestion-2',
          title: 'Take a 15-minute Break',
          description: 'You\'ve been working for 90 minutes. A short break will help maintain focus and energy',
          type: 'break',
          priority: 'medium',
          confidence: 88.7,
          reasoning: 'Focus duration typically decreases after 90 minutes of continuous work',
          expectedOutcome: 'Restored focus and increased energy levels',
          timeToImplement: 15,
          isAccepted: true,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'suggestion-3',
          title: 'Collaborate with Team Member',
          description: 'Schedule a 30-minute collaboration session with Sarah on the new feature design',
          type: 'collaboration',
          priority: 'medium',
          confidence: 85.3,
          reasoning: 'Sarah has expertise in UI/UX and you\'re working on feature design',
          expectedOutcome: 'Improved feature design and faster implementation',
          timeToImplement: 30,
          isAccepted: false,
          createdAt: new Date(Date.now() - 5400000).toISOString()
        },
        {
          id: 'suggestion-4',
          title: 'Learn New Skill',
          description: 'Spend 1 hour learning React hooks to improve your frontend development skills',
          type: 'learning',
          priority: 'low',
          confidence: 79.2,
          reasoning: 'You\'re working on React projects and hooks knowledge would be beneficial',
          expectedOutcome: 'Improved React development skills and faster coding',
          timeToImplement: 60,
          isAccepted: false,
          createdAt: new Date(Date.now() - 7200000).toISOString()
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
            'affected_tasks': 12
          },
          recommendations: [
            'Review recent changes in work environment',
            'Check for external distractions',
            'Consider adjusting task priorities'
          ],
          isRead: false,
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
            'previous_score': 64.5
          },
          recommendations: [
            'Continue current energy management practices',
            'Share strategies with team members',
            'Document successful techniques'
          ],
          isRead: true,
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
            'team_size': 8
          },
          recommendations: [
            'Schedule important meetings in the morning',
            'Reduce meeting frequency',
            'Implement meeting agendas'
          ],
          isRead: false,
          createdAt: new Date(Date.now() - 5400000).toISOString()
        }
      ];

      setAIInsights(mockAIInsights);
      setPredictiveModels(mockPredictiveModels);
      setIntelligentSuggestions(mockIntelligentSuggestions);
      setAutomatedInsights(mockAutomatedInsights);
    } catch (error) {
      console.error('Failed to load AI data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptSuggestion = async (suggestionId: string) => {
    try {
      setIntelligentSuggestions(prev => prev.map(suggestion => 
        suggestion.id === suggestionId 
          ? { ...suggestion, isAccepted: true }
          : suggestion
      ));
      
      console.log(`Accepted suggestion: ${suggestionId}`);
    } catch (error) {
      console.error('Failed to accept suggestion:', error);
    }
  };

  const markInsightAsRead = async (insightId: string) => {
    try {
      setAutomatedInsights(prev => prev.map(insight => 
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
      case 'optimization': return '⚡';
      case 'alert': return '⚠️';
      case 'task': return '📋';
      case 'schedule': return '📅';
      case 'break': return '☕';
      case 'focus': return '🎯';
      case 'collaboration': return '👥';
      case 'learning': return '📚';
      case 'performance': return '📈';
      case 'behavior': return '🧠';
      case 'trend': return '📊';
      case 'anomaly': return '🔍';
      case 'opportunity': return '🚀';
      default: return '🤖';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'text-gray-600 bg-gray-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
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
              <p className="text-blue-100 mt-1">Machine learning-powered productivity recommendations</p>
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
                    {predictiveModels.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Suggestions:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {intelligentSuggestions.length}
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
              { id: 'models', name: 'Predictive Models', icon: '🧠' },
              { id: 'suggestions', name: 'Intelligent Suggestions', icon: '💡' },
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
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
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
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {insight.confidence}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Source:</div>
                      <div className="text-sm text-gray-600">{insight.source}</div>
                      
                      <div className="text-sm font-medium text-gray-700">Key Data:</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(insight.data).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-gray-600">{key.replace('_', ' ')}:</span>
                            <span className="ml-2 text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {insight.actionable && (
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                          Take Action
                        </button>
                      )}
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'models' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Predictive Models</h3>
              
              <div className="space-y-4">
                {predictiveModels.map((model) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{model.name}</h4>
                        <p className="text-sm text-gray-600">{model.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(model.status)}`}>
                        {model.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Model Type:</div>
                      <div className="text-sm text-gray-600 capitalize">{model.type.replace('-', ' ')}</div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Accuracy:</span>
                          <span className="ml-2 text-gray-900">{model.accuracy}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Precision:</span>
                          <span className="ml-2 text-gray-900">{model.precision}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Recall:</span>
                          <span className="ml-2 text-gray-900">{model.recall}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">F1 Score:</span>
                          <span className="ml-2 text-gray-900">{model.f1Score}%</span>
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
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'suggestions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Intelligent Suggestions</h3>
              
              <div className="space-y-4">
                {intelligentSuggestions.map((suggestion) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      suggestion.isAccepted 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getTypeIcon(suggestion.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(suggestion.priority)}`}>
                          {suggestion.priority.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {suggestion.confidence}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Reasoning:</div>
                      <div className="text-sm text-gray-600">{suggestion.reasoning}</div>
                      
                      <div className="text-sm font-medium text-gray-700">Expected Outcome:</div>
                      <div className="text-sm text-gray-600">{suggestion.expectedOutcome}</div>
                      
                      <div className="text-sm font-medium text-gray-700">Time to Implement:</div>
                      <div className="text-sm text-gray-600">{suggestion.timeToImplement} minutes</div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {!suggestion.isAccepted && (
                        <button
                          onClick={() => acceptSuggestion(suggestion.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all"
                        >
                          Accept
                        </button>
                      )}
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Details
                      </button>
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
                        {insight.recommendations.map((recommendation, index) => (
                          <li key={index}>{recommendation}</li>
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
            AI-Powered Insights • {aiInsights.length} insights • {predictiveModels.length} models • {intelligentSuggestions.length} suggestions
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
                console.log('Exporting AI data...');
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
