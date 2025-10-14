/**
 * Predictive Analytics System Component
 * 
 * Productivity forecasting and optimization
 * Includes trend analysis, forecasting models, and optimization recommendations
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ForecastModel {
  id: string;
  name: string;
  description: string;
  type: 'time-series' | 'regression' | 'classification' | 'clustering' | 'neural-network';
  target: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  status: 'training' | 'evaluating' | 'deployed' | 'retraining';
  lastTrained: string;
  predictions: number;
  features: string[];
  hyperparameters: Record<string, any>;
}

interface Forecast {
  id: string;
  model: string;
  target: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  predictions: Array<{
    date: string;
    value: number;
    confidence: number;
    upperBound: number;
    lowerBound: number;
  }>;
  accuracy: number;
  createdAt: string;
  expiresAt: string;
}

interface TrendAnalysis {
  id: string;
  metric: string;
  period: string;
  trend: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  strength: number;
  direction: number;
  significance: number;
  description: string;
  factors: string[];
  recommendations: string[];
  createdAt: string;
}

interface OptimizationRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'productivity' | 'efficiency' | 'resource' | 'schedule' | 'team';
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  expectedImprovement: number;
  currentValue: number;
  targetValue: number;
  implementation: string[];
  metrics: string[];
  isImplemented: boolean;
  createdAt: string;
}

interface PredictiveAnalyticsProps {
  onClose: () => void;
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ onClose }) => {
  const [forecastModels, setForecastModels] = useState<ForecastModel[]>([]);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [trendAnalyses, setTrendAnalyses] = useState<TrendAnalysis[]>([]);
  const [optimizationRecommendations, setOptimizationRecommendations] = useState<OptimizationRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'models' | 'forecasts' | 'trends' | 'optimization'>('models');
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    loadPredictiveData();
  }, []);

  const loadPredictiveData = async () => {
    setIsLoading(true);
    
    try {
      // Mock forecast models
      const mockForecastModels: ForecastModel[] = [
        {
          id: 'model-1',
          name: 'Productivity Time Series Model',
          description: 'Predicts productivity trends using historical time series data',
          type: 'time-series',
          target: 'productivity_score',
          accuracy: 94.2,
          precision: 92.8,
          recall: 95.1,
          f1Score: 93.9,
          status: 'deployed',
          lastTrained: new Date(Date.now() - 86400000).toISOString(),
          predictions: 1250,
          features: ['historical_productivity', 'seasonality', 'trend', 'external_factors'],
          hyperparameters: {
            'window_size': 30,
            'forecast_horizon': 7,
            'seasonality': 'weekly',
            'trend': 'additive'
          }
        },
        {
          id: 'model-2',
          name: 'Task Completion Regression',
          description: 'Predicts task completion rates based on various factors',
          type: 'regression',
          target: 'completion_rate',
          accuracy: 89.7,
          precision: 88.3,
          recall: 91.2,
          f1Score: 89.7,
          status: 'deployed',
          lastTrained: new Date(Date.now() - 172800000).toISOString(),
          predictions: 890,
          features: ['task_complexity', 'user_experience', 'team_size', 'deadline_pressure'],
          hyperparameters: {
            'algorithm': 'random_forest',
            'n_estimators': 100,
            'max_depth': 10,
            'min_samples_split': 5
          }
        },
        {
          id: 'model-3',
          name: 'Energy Level Neural Network',
          description: 'Deep learning model for energy level prediction',
          type: 'neural-network',
          target: 'energy_level',
          accuracy: 91.5,
          precision: 90.1,
          recall: 93.8,
          f1Score: 91.9,
          status: 'evaluating',
          lastTrained: new Date(Date.now() - 259200000).toISOString(),
          predictions: 567,
          features: ['sleep_quality', 'exercise', 'nutrition', 'stress', 'workload'],
          hyperparameters: {
            'layers': [64, 32, 16],
            'activation': 'relu',
            'optimizer': 'adam',
            'learning_rate': 0.001,
            'epochs': 100
          }
        },
        {
          id: 'model-4',
          name: 'Team Performance Classifier',
          description: 'Classifies team performance levels using ensemble methods',
          type: 'classification',
          target: 'performance_level',
          accuracy: 87.3,
          precision: 85.9,
          recall: 89.2,
          f1Score: 87.5,
          status: 'training',
          lastTrained: new Date(Date.now() - 345600000).toISOString(),
          predictions: 234,
          features: ['team_size', 'communication_frequency', 'skill_diversity', 'project_complexity'],
          hyperparameters: {
            'algorithm': 'gradient_boosting',
            'n_estimators': 200,
            'learning_rate': 0.1,
            'max_depth': 6
          }
        }
      ];

      // Mock forecasts
      const mockForecasts: Forecast[] = [
        {
          id: 'forecast-1',
          model: 'Productivity Time Series Model',
          target: 'productivity_score',
          period: 'weekly',
          predictions: [
            { date: '2024-01-08', value: 88.5, confidence: 0.92, upperBound: 92.1, lowerBound: 84.9 },
            { date: '2024-01-09', value: 89.2, confidence: 0.91, upperBound: 93.8, lowerBound: 84.6 },
            { date: '2024-01-10', value: 87.8, confidence: 0.89, upperBound: 91.4, lowerBound: 84.2 },
            { date: '2024-01-11', value: 90.1, confidence: 0.88, upperBound: 94.7, lowerBound: 85.5 },
            { date: '2024-01-12', value: 91.3, confidence: 0.87, upperBound: 95.9, lowerBound: 86.7 },
            { date: '2024-01-13', value: 89.7, confidence: 0.86, upperBound: 94.3, lowerBound: 85.1 },
            { date: '2024-01-14', value: 88.9, confidence: 0.85, upperBound: 93.5, lowerBound: 84.3 }
          ],
          accuracy: 94.2,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          expiresAt: new Date(Date.now() + 604800000).toISOString()
        },
        {
          id: 'forecast-2',
          model: 'Task Completion Regression',
          target: 'completion_rate',
          period: 'monthly',
          predictions: [
            { date: '2024-02-01', value: 92.5, confidence: 0.89, upperBound: 96.1, lowerBound: 88.9 },
            { date: '2024-03-01', value: 94.1, confidence: 0.87, upperBound: 97.7, lowerBound: 90.5 },
            { date: '2024-04-01', value: 95.8, confidence: 0.85, upperBound: 99.4, lowerBound: 92.2 }
          ],
          accuracy: 89.7,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          expiresAt: new Date(Date.now() + 2592000000).toISOString()
        },
        {
          id: 'forecast-3',
          model: 'Energy Level Neural Network',
          target: 'energy_level',
          period: 'daily',
          predictions: [
            { date: '2024-01-08', value: 78.5, confidence: 0.91, upperBound: 82.1, lowerBound: 74.9 },
            { date: '2024-01-09', value: 82.3, confidence: 0.90, upperBound: 85.9, lowerBound: 78.7 },
            { date: '2024-01-10', value: 85.7, confidence: 0.89, upperBound: 89.3, lowerBound: 82.1 }
          ],
          accuracy: 91.5,
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          expiresAt: new Date(Date.now() + 86400000).toISOString()
        }
      ];

      // Mock trend analyses
      const mockTrendAnalyses: TrendAnalysis[] = [
        {
          id: 'trend-1',
          metric: 'Productivity Score',
          period: 'Last 30 days',
          trend: 'increasing',
          strength: 0.87,
          direction: 0.73,
          significance: 0.95,
          description: 'Productivity has been steadily increasing over the past month',
          factors: ['Improved task management', 'Better energy management', 'Enhanced team collaboration'],
          recommendations: [
            'Continue current productivity practices',
            'Implement advanced task prioritization',
            'Share best practices across teams'
          ],
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'trend-2',
          metric: 'Team Collaboration Index',
          period: 'Last 90 days',
          trend: 'volatile',
          strength: 0.45,
          direction: 0.12,
          significance: 0.78,
          description: 'Team collaboration shows high variability with no clear trend',
          factors: ['Remote work challenges', 'Inconsistent meeting schedules', 'Mixed communication tools'],
          recommendations: [
            'Standardize communication protocols',
            'Implement regular team check-ins',
            'Use consistent collaboration tools'
          ],
          createdAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 'trend-3',
          metric: 'Energy Efficiency',
          period: 'Last 60 days',
          trend: 'increasing',
          strength: 0.92,
          direction: 0.85,
          significance: 0.98,
          description: 'Energy efficiency has shown strong upward trend',
          factors: ['Better sleep patterns', 'Regular exercise', 'Improved nutrition'],
          recommendations: [
            'Maintain current energy management practices',
            'Document successful energy optimization strategies',
            'Train team members on energy management'
          ],
          createdAt: new Date(Date.now() - 10800000).toISOString()
        }
      ];

      // Mock optimization recommendations
      const mockOptimizationRecommendations: OptimizationRecommendation[] = [
        {
          id: 'opt-1',
          title: 'Implement Advanced Task Prioritization',
          description: 'Use AI-powered task prioritization to improve productivity by 15%',
          category: 'productivity',
          impact: 'high',
          confidence: 92.1,
          effort: 'medium',
          timeframe: '2-3 weeks',
          expectedImprovement: 15.0,
          currentValue: 78.5,
          targetValue: 90.3,
          implementation: [
            'Deploy AI prioritization algorithm',
            'Train team on new prioritization system',
            'Monitor and adjust parameters',
            'Measure productivity improvements'
          ],
          metrics: ['task_completion_rate', 'productivity_score', 'time_to_completion'],
          isImplemented: false,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'opt-2',
          title: 'Optimize Meeting Schedules',
          description: 'Reschedule meetings to peak productivity hours for 12% efficiency gain',
          category: 'schedule',
          impact: 'medium',
          confidence: 87.3,
          effort: 'low',
          timeframe: '1 week',
          expectedImprovement: 12.0,
          currentValue: 65.2,
          targetValue: 73.0,
          implementation: [
            'Analyze current meeting patterns',
            'Identify peak productivity hours',
            'Reschedule meetings to optimal times',
            'Implement meeting duration limits'
          ],
          metrics: ['meeting_effectiveness', 'productivity_during_meetings', 'team_satisfaction'],
          isImplemented: true,
          createdAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 'opt-3',
          title: 'Enhance Team Communication',
          description: 'Implement structured communication protocols for 20% collaboration improvement',
          category: 'team',
          impact: 'high',
          confidence: 89.7,
          effort: 'high',
          timeframe: '4-6 weeks',
          expectedImprovement: 20.0,
          currentValue: 72.3,
          targetValue: 86.8,
          implementation: [
            'Develop communication guidelines',
            'Train team on new protocols',
            'Implement communication tools',
            'Monitor collaboration metrics'
          ],
          metrics: ['collaboration_index', 'communication_frequency', 'team_satisfaction'],
          isImplemented: false,
          createdAt: new Date(Date.now() - 10800000).toISOString()
        },
        {
          id: 'opt-4',
          title: 'Resource Allocation Optimization',
          description: 'Optimize resource allocation across teams for 18% efficiency gain',
          category: 'resource',
          impact: 'high',
          confidence: 85.4,
          effort: 'medium',
          timeframe: '3-4 weeks',
          expectedImprovement: 18.0,
          currentValue: 68.7,
          targetValue: 81.1,
          implementation: [
            'Analyze current resource utilization',
            'Identify optimization opportunities',
            'Implement resource reallocation',
            'Monitor efficiency improvements'
          ],
          metrics: ['resource_utilization', 'team_efficiency', 'project_completion_rate'],
          isImplemented: false,
          createdAt: new Date(Date.now() - 14400000).toISOString()
        }
      ];

      setForecastModels(mockForecastModels);
      setForecasts(mockForecasts);
      setTrendAnalyses(mockTrendAnalyses);
      setOptimizationRecommendations(mockOptimizationRecommendations);
    } catch (error) {
      console.error('Failed to load predictive data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trainModel = async (modelId: string) => {
    setIsTraining(true);
    
    try {
      // Simulate model training
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      setForecastModels(prev => prev.map(model => 
        model.id === modelId 
          ? { 
              ...model, 
              status: 'deployed',
              lastTrained: new Date().toISOString(),
              accuracy: Math.min(100, model.accuracy + Math.random() * 2)
            }
          : model
      ));
      
      console.log(`Trained model: ${modelId}`);
    } catch (error) {
      console.error('Failed to train model:', error);
    } finally {
      setIsTraining(false);
    }
  };

  const implementRecommendation = async (recommendationId: string) => {
    try {
      setOptimizationRecommendations(prev => prev.map(rec => 
        rec.id === recommendationId 
          ? { ...rec, isImplemented: true }
          : rec
      ));
      
      console.log(`Implemented recommendation: ${recommendationId}`);
    } catch (error) {
      console.error('Failed to implement recommendation:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'time-series': return '📈';
      case 'regression': return '📊';
      case 'classification': return '🏷️';
      case 'clustering': return '🔗';
      case 'neural-network': return '🧠';
      default: return '📄';
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

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-green-600 bg-green-100';
      case 'decreasing': return 'text-red-600 bg-red-100';
      case 'stable': return 'text-blue-600 bg-blue-100';
      case 'volatile': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
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
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Predictive Analytics</h2>
              <p className="text-orange-100 mt-1">Productivity forecasting and optimization</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Models:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {forecastModels.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Forecasts:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {forecasts.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Recommendations:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {optimizationRecommendations.length}
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
              { id: 'models', name: 'Forecast Models', icon: '🧠' },
              { id: 'forecasts', name: 'Forecasts', icon: '📈' },
              { id: 'trends', name: 'Trend Analysis', icon: '📊' },
              { id: 'optimization', name: 'Optimization', icon: '⚡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-orange-500 text-orange-600'
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
          {selectedTab === 'models' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Forecast Models</h3>
              
              <div className="space-y-4">
                {forecastModels.map((model) => (
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
                      <div className="text-sm font-medium text-gray-700">Target:</div>
                      <div className="text-sm text-gray-600">{model.target}</div>
                      
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
                      {model.status === 'training' && (
                        <button
                          onClick={() => trainModel(model.id)}
                          disabled={isTraining}
                          className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-sm hover:bg-orange-200 transition-all disabled:opacity-50"
                        >
                          {isTraining ? 'Training...' : 'Train Model'}
                        </button>
                      )}
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'forecasts' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Forecasts</h3>
              
              <div className="space-y-4">
                {forecasts.map((forecast) => (
                  <motion.div
                    key={forecast.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{forecast.model}</h4>
                        <p className="text-sm text-gray-600">Target: {forecast.target}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {forecast.period.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {forecast.accuracy}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Predictions:</div>
                      <div className="space-y-1">
                        {forecast.predictions.slice(0, 3).map((pred, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{pred.date}</span>
                            <span className="text-gray-900">{pred.value.toFixed(1)}</span>
                            <span className="text-gray-600">±{((pred.upperBound - pred.lowerBound) / 2).toFixed(1)}</span>
                          </div>
                        ))}
                        {forecast.predictions.length > 3 && (
                          <div className="text-sm text-gray-600">
                            ... and {forecast.predictions.length - 3} more predictions
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View All
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Export
                      </button>
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
                {trendAnalyses.map((trend) => (
                  <motion.div
                    key={trend.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{trend.metric}</h4>
                        <p className="text-sm text-gray-600">{trend.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTrendColor(trend.trend)}`}>
                          {trend.trend.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {trend.strength.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Period:</div>
                      <div className="text-sm text-gray-600">{trend.period}</div>
                      
                      <div className="text-sm font-medium text-gray-700">Factors:</div>
                      <div className="flex flex-wrap gap-1">
                        {trend.factors.map((factor, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {factor}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Recommendations:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {trend.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'optimization' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Optimization Recommendations</h3>
              
              <div className="space-y-4">
                {optimizationRecommendations.map((rec) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      rec.isImplemented 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{rec.title}</h4>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(rec.impact)}`}>
                          {rec.impact.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getEffortColor(rec.effort)}`}>
                          {rec.effort.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Expected Improvement:</div>
                      <div className="text-sm text-gray-600">
                        {rec.currentValue} → {rec.targetValue} (+{rec.expectedImprovement}%)
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Implementation:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {rec.implementation.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                      
                      <div className="text-sm font-medium text-gray-700">Metrics:</div>
                      <div className="flex flex-wrap gap-1">
                        {rec.metrics.map((metric, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {metric.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {!rec.isImplemented && (
                        <button
                          onClick={() => implementRecommendation(rec.id)}
                          className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-sm hover:bg-orange-200 transition-all"
                        >
                          Implement
                        </button>
                      )}
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
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
            Predictive Analytics • {forecastModels.length} models • {forecasts.length} forecasts • {optimizationRecommendations.length} recommendations
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
                console.log('Exporting predictive analytics data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PredictiveAnalytics;
