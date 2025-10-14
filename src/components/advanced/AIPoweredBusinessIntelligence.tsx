import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: 'trend' | 'anomaly' | 'prediction' | 'recommendation' | 'optimization';
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  dataSource: string;
  generatedAt: Date;
  actionable: boolean;
  actions: string[];
  metrics: InsightMetric[];
}

interface InsightMetric {
  name: string;
  value: number;
  change: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

interface AIModel {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering' | 'nlp' | 'time-series';
  description: string;
  accuracy: number;
  status: 'training' | 'active' | 'inactive' | 'error';
  lastTrained: Date;
  trainingData: number;
  features: string[];
  performance: ModelPerformance;
}

interface ModelPerformance {
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  mse: number;
  mae: number;
}

interface Prediction {
  id: string;
  modelId: string;
  target: string;
  prediction: any;
  confidence: number;
  actualValue: any;
  accuracy: number;
  createdAt: Date;
  horizon: string;
}

interface BusinessMetric {
  id: string;
  name: string;
  category: 'revenue' | 'growth' | 'efficiency' | 'quality' | 'satisfaction';
  currentValue: number;
  targetValue: number;
  previousValue: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  unit: string;
  forecast: ForecastData[];
}

interface ForecastData {
  date: Date;
  value: number;
  confidence: number;
}

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'strategy' | 'operations' | 'marketing' | 'product' | 'finance';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  impact: number;
  effort: number;
  roi: number;
  timeline: string;
  dependencies: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
}

const AIPoweredBusinessIntelligence: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [models, setModels] = useState<AIModel[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetric[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [isTrainingModel, setIsTrainingModel] = useState(false);

  // Generate AI BI data
  useEffect(() => {
    const generateInsights = (): AIInsight[] => {
      const insightData = [
        {
          title: 'User Engagement Spike Detected',
          description: 'Unusual increase in user engagement detected in the last 24 hours',
          category: 'anomaly' as const,
          confidence: 0.92,
          impact: 'high' as const,
          dataSource: 'user_analytics',
          actionable: true,
          actions: ['Investigate cause', 'Scale infrastructure', 'Monitor performance'],
          metrics: [
            { name: 'Active Users', value: 15420, change: 23.5, unit: 'users', trend: 'up' },
            { name: 'Session Duration', value: 8.7, change: 15.2, unit: 'minutes', trend: 'up' },
            { name: 'Page Views', value: 89200, change: 31.8, unit: 'views', trend: 'up' }
          ]
        },
        {
          title: 'Revenue Growth Forecast',
          description: 'AI predicts 15% revenue growth for next quarter based on current trends',
          category: 'prediction' as const,
          confidence: 0.87,
          impact: 'critical' as const,
          dataSource: 'financial_data',
          actionable: true,
          actions: ['Plan resource allocation', 'Set growth targets', 'Prepare scaling'],
          metrics: [
            { name: 'Revenue', value: 1250000, change: 15.0, unit: 'USD', trend: 'up' },
            { name: 'New Customers', value: 450, change: 12.3, unit: 'customers', trend: 'up' },
            { name: 'Churn Rate', value: 3.2, change: -0.8, unit: '%', trend: 'down' }
          ]
        },
        {
          title: 'Product Performance Optimization',
          description: 'Recommendation to optimize product features based on user behavior analysis',
          category: 'recommendation' as const,
          confidence: 0.89,
          impact: 'medium' as const,
          dataSource: 'product_analytics',
          actionable: true,
          actions: ['Implement feature A/B test', 'Update user interface', 'Gather feedback'],
          metrics: [
            { name: 'Feature Usage', value: 67.8, change: 8.5, unit: '%', trend: 'up' },
            { name: 'User Satisfaction', value: 4.3, change: 0.2, unit: '/5', trend: 'up' },
            { name: 'Support Tickets', value: 45, change: -12.0, unit: 'tickets', trend: 'down' }
          ]
        },
        {
          title: 'Market Trend Analysis',
          description: 'Emerging market trends identified in productivity software sector',
          category: 'trend' as const,
          confidence: 0.85,
          impact: 'high' as const,
          dataSource: 'market_data',
          actionable: true,
          actions: ['Research competitors', 'Update product roadmap', 'Adjust marketing strategy'],
          metrics: [
            { name: 'Market Growth', value: 12.5, change: 2.1, unit: '%', trend: 'up' },
            { name: 'Competition Index', value: 7.8, change: 0.5, unit: '/10', trend: 'up' },
            { name: 'Customer Demand', value: 89.2, change: 5.7, unit: '%', trend: 'up' }
          ]
        },
        {
          title: 'Operational Efficiency Opportunity',
          description: 'AI identified potential 20% improvement in operational efficiency',
          category: 'optimization' as const,
          confidence: 0.91,
          impact: 'medium' as const,
          dataSource: 'operational_data',
          actionable: true,
          actions: ['Automate processes', 'Optimize workflows', 'Train staff'],
          metrics: [
            { name: 'Process Time', value: 45.2, change: -20.0, unit: 'minutes', trend: 'down' },
            { name: 'Error Rate', value: 2.1, change: -15.0, unit: '%', trend: 'down' },
            { name: 'Resource Usage', value: 78.5, change: -12.3, unit: '%', trend: 'down' }
          ]
        }
      ];

      return insightData.map((insight, index) => ({
        id: `insight-${index}`,
        ...insight,
        generatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      }));
    };

    const generateModels = (): AIModel[] => {
      const modelData = [
        {
          name: 'User Behavior Classifier',
          type: 'classification' as const,
          description: 'Classifies user behavior patterns for personalization',
          accuracy: 0.94,
          status: 'active' as const,
          trainingData: 150000,
          features: ['session_duration', 'page_views', 'click_patterns', 'time_of_day'],
          performance: {
            precision: 0.92,
            recall: 0.89,
            f1Score: 0.90,
            auc: 0.95,
            mse: 0.08,
            mae: 0.12
          }
        },
        {
          name: 'Revenue Predictor',
          type: 'regression' as const,
          description: 'Predicts revenue based on user metrics and market conditions',
          accuracy: 0.87,
          status: 'active' as const,
          trainingData: 75000,
          features: ['user_count', 'conversion_rate', 'market_trends', 'seasonality'],
          performance: {
            precision: 0.85,
            recall: 0.88,
            f1Score: 0.86,
            auc: 0.89,
            mse: 0.15,
            mae: 0.18
          }
        },
        {
          name: 'Customer Segmentation',
          type: 'clustering' as const,
          description: 'Segments customers based on behavior and demographics',
          accuracy: 0.91,
          status: 'active' as const,
          trainingData: 200000,
          features: ['age', 'income', 'usage_patterns', 'preferences'],
          performance: {
            precision: 0.89,
            recall: 0.92,
            f1Score: 0.90,
            auc: 0.93,
            mse: 0.11,
            mae: 0.14
          }
        },
        {
          name: 'Sentiment Analyzer',
          type: 'nlp' as const,
          description: 'Analyzes customer sentiment from feedback and reviews',
          accuracy: 0.88,
          status: 'training' as const,
          trainingData: 50000,
          features: ['text_content', 'rating', 'context', 'tone'],
          performance: {
            precision: 0.86,
            recall: 0.84,
            f1Score: 0.85,
            auc: 0.87,
            mse: 0.13,
            mae: 0.16
          }
        },
        {
          name: 'Demand Forecasting',
          type: 'time-series' as const,
          description: 'Forecasts product demand based on historical data',
          accuracy: 0.82,
          status: 'active' as const,
          trainingData: 100000,
          features: ['historical_sales', 'seasonality', 'promotions', 'external_factors'],
          performance: {
            precision: 0.80,
            recall: 0.83,
            f1Score: 0.81,
            auc: 0.84,
            mse: 0.18,
            mae: 0.22
          }
        }
      ];

      return modelData.map((model, index) => ({
        id: `model-${index}`,
        ...model,
        lastTrained: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      }));
    };

    const generatePredictions = (): Prediction[] => {
      const predictions: Prediction[] = [];
      for (let i = 0; i < 20; i++) {
        const modelId = `model-${Math.floor(Math.random() * 5)}`;
        const targets = ['revenue', 'users', 'conversion', 'churn', 'satisfaction'];
        const target = targets[Math.floor(Math.random() * targets.length)];
        
        predictions.push({
          id: `prediction-${i}`,
          modelId,
          target,
          prediction: Math.random() * 1000 + 100,
          confidence: Math.random() * 0.3 + 0.7,
          actualValue: Math.random() * 1000 + 100,
          accuracy: Math.random() * 0.2 + 0.8,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          horizon: ['1 day', '1 week', '1 month', '3 months'][Math.floor(Math.random() * 4)]
        });
      }

      return predictions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    };

    const generateBusinessMetrics = (): BusinessMetric[] => {
      const metricData = [
        {
          name: 'Monthly Recurring Revenue',
          category: 'revenue' as const,
          currentValue: 1250000,
          targetValue: 1500000,
          previousValue: 1180000,
          trend: 'up' as const,
          change: 5.9,
          unit: 'USD'
        },
        {
          name: 'Customer Growth Rate',
          category: 'growth' as const,
          currentValue: 12.5,
          targetValue: 15.0,
          previousValue: 11.2,
          trend: 'up' as const,
          change: 11.6,
          unit: '%'
        },
        {
          name: 'Operational Efficiency',
          category: 'efficiency' as const,
          currentValue: 78.5,
          targetValue: 85.0,
          previousValue: 75.2,
          trend: 'up' as const,
          change: 4.4,
          unit: '%'
        },
        {
          name: 'Product Quality Score',
          category: 'quality' as const,
          currentValue: 4.3,
          targetValue: 4.5,
          previousValue: 4.1,
          trend: 'up' as const,
          change: 4.9,
          unit: '/5'
        },
        {
          name: 'Customer Satisfaction',
          category: 'satisfaction' as const,
          currentValue: 89.2,
          targetValue: 92.0,
          previousValue: 87.8,
          trend: 'up' as const,
          change: 1.6,
          unit: '%'
        }
      ];

      return metricData.map((metric, index) => {
        const forecast: ForecastData[] = [];
        for (let i = 0; i < 12; i++) {
          const date = new Date();
          date.setMonth(date.getMonth() + i);
          forecast.push({
            date,
            value: metric.currentValue * (1 + (metric.change / 100) * (i + 1) / 12),
            confidence: Math.random() * 0.2 + 0.8
          });
        }

        return {
          id: `metric-${index}`,
          ...metric,
          forecast
        };
      });
    };

    const generateRecommendations = (): AIRecommendation[] => {
      const recommendationData = [
        {
          title: 'Implement Advanced Analytics Dashboard',
          description: 'Deploy comprehensive analytics dashboard to improve decision-making',
          category: 'strategy' as const,
          priority: 'high' as const,
          impact: 85,
          effort: 60,
          roi: 250,
          timeline: '3 months',
          dependencies: ['Data infrastructure', 'UI/UX team'],
          status: 'pending' as const
        },
        {
          title: 'Optimize Customer Onboarding Flow',
          description: 'Streamline customer onboarding to reduce time-to-value',
          category: 'operations' as const,
          priority: 'medium' as const,
          impact: 70,
          effort: 40,
          roi: 180,
          timeline: '2 months',
          dependencies: ['Product team', 'Design team'],
          status: 'in-progress' as const
        },
        {
          title: 'Launch AI-Powered Recommendations',
          description: 'Implement AI-driven product recommendations to increase engagement',
          category: 'product' as const,
          priority: 'high' as const,
          impact: 90,
          effort: 80,
          roi: 320,
          timeline: '4 months',
          dependencies: ['ML team', 'Backend team'],
          status: 'pending' as const
        },
        {
          title: 'Expand Market Reach',
          description: 'Target new market segments based on AI analysis',
          category: 'marketing' as const,
          priority: 'medium' as const,
          impact: 75,
          effort: 50,
          roi: 200,
          timeline: '6 months',
          dependencies: ['Marketing team', 'Sales team'],
          status: 'pending' as const
        },
        {
          title: 'Automate Financial Reporting',
          description: 'Implement automated financial reporting and forecasting',
          category: 'finance' as const,
          priority: 'low' as const,
          impact: 60,
          effort: 30,
          roi: 150,
          timeline: '1 month',
          dependencies: ['Finance team', 'IT team'],
          status: 'completed' as const
        }
      ];

      return recommendationData.map((recommendation, index) => ({
        id: `recommendation-${index}`,
        ...recommendation
      }));
    };

    setInsights(generateInsights());
    setModels(generateModels());
    setPredictions(generatePredictions());
    setBusinessMetrics(generateBusinessMetrics());
    setRecommendations(generateRecommendations());
  }, []);

  const filteredInsights = insights.filter(insight => 
    selectedCategory === 'all' || insight.category === selectedCategory
  );

  const filteredModels = models.filter(model => 
    selectedModel === 'all' || model.id === selectedModel
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'trend': return 'bg-blue-100 text-blue-800';
      case 'anomaly': return 'bg-red-100 text-red-800';
      case 'prediction': return 'bg-green-100 text-green-800';
      case 'recommendation': return 'bg-purple-100 text-purple-800';
      case 'optimization': return 'bg-orange-100 text-orange-800';
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

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'classification': return 'bg-blue-100 text-blue-800';
      case 'regression': return 'bg-green-100 text-green-800';
      case 'clustering': return 'bg-purple-100 text-purple-800';
      case 'nlp': return 'bg-orange-100 text-orange-800';
      case 'time-series': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string): string => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string): string => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const generateInsights = async () => {
    setIsGeneratingInsights(true);
    
    // Simulate insight generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newInsight: AIInsight = {
      id: `insight-${Date.now()}`,
      title: 'AI Generated Insight',
      description: 'New insight generated by AI analysis',
      category: 'trend',
      confidence: Math.random() * 0.3 + 0.7,
      impact: 'medium',
      dataSource: 'ai_analysis',
      generatedAt: new Date(),
      actionable: true,
      actions: ['Review data', 'Take action'],
      metrics: [
        { name: 'Metric', value: 100, change: 5, unit: '%', trend: 'up' }
      ]
    };

    setInsights(prev => [newInsight, ...prev]);
    setIsGeneratingInsights(false);
  };

  const trainModel = async (modelId: string) => {
    setIsTrainingModel(true);
    
    // Simulate model training
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { 
            ...model, 
            status: 'active',
            accuracy: Math.min(0.99, model.accuracy + 0.02),
            lastTrained: new Date()
          }
        : model
    ));
    
    setIsTrainingModel(false);
  };

  const categories = [
    { key: 'all', label: 'All Categories', count: insights.length },
    { key: 'trend', label: 'Trends', count: insights.filter(i => i.category === 'trend').length },
    { key: 'anomaly', label: 'Anomalies', count: insights.filter(i => i.category === 'anomaly').length },
    { key: 'prediction', label: 'Predictions', count: insights.filter(i => i.category === 'prediction').length },
    { key: 'recommendation', label: 'Recommendations', count: insights.filter(i => i.category === 'recommendation').length },
    { key: 'optimization', label: 'Optimizations', count: insights.filter(i => i.category === 'optimization').length }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🤖 AI-Powered Business Intelligence</h2>
              <p className="text-indigo-100 mt-1">Advanced AI analytics, predictions, and recommendations</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* AI BI Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">AI Insights</p>
                  <p className="text-2xl font-bold text-blue-800">{insights.length}</p>
                </div>
                <div className="text-3xl">💡</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">ML Models</p>
                  <p className="text-2xl font-bold text-green-800">{models.length}</p>
                </div>
                <div className="text-3xl">🧠</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Predictions</p>
                  <p className="text-2xl font-bold text-purple-800">{predictions.length}</p>
                </div>
                <div className="text-3xl">🔮</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Recommendations</p>
                  <p className="text-2xl font-bold text-orange-800">{recommendations.length}</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Avg Accuracy</p>
                  <p className="text-2xl font-bold text-red-800">
                    {(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    {categories.map(category => (
                      <option key={category.key} value={category.key}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Model:</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Models</option>
                    {models.map(model => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={generateInsights}
                  disabled={isGeneratingInsights}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingInsights ? '⏳ Generating...' : '💡 Generate Insights'}
                </button>
              </div>
            </div>
          </div>

          {/* Business Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {businessMetrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                    <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium text-gray-900">{metric.currentValue.toLocaleString()} {metric.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium text-blue-600">{metric.targetValue.toLocaleString()} {metric.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Change:</span>
                      <span className={`font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(metric.currentValue / metric.targetValue) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {((metric.currentValue / metric.targetValue) * 100).toFixed(0)}% of target
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Insights ({filteredInsights.length})</h3>
            <div className="space-y-4">
              {filteredInsights.map((insight) => (
                <div key={insight.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(insight.category)}`}>
                        {insight.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(insight.impact)}`}>
                        {insight.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Confidence:</span>
                      <span className="font-medium text-blue-600">{(insight.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data Source:</span>
                      <span className="font-medium text-gray-900">{insight.dataSource}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Generated:</span>
                      <span className="text-gray-500">{formatDate(insight.generatedAt)}</span>
                    </div>
                    
                    {insight.actionable && (
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-700 mb-1">Actions:</div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {insight.actions.map((action, index) => (
                            <li key={index}>• {action}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ML Models */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">ML Models ({filteredModels.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Trained</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredModels.map((model) => (
                    <tr key={model.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{model.name}</div>
                          <div className="text-sm text-gray-500">{model.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(model.type)}`}>
                          {model.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(model.status)}`}>
                          {model.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(model.accuracy * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {model.trainingData.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(model.lastTrained)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => trainModel(model.id)}
                          disabled={isTrainingModel}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                        >
                          {isTrainingModel ? 'Training...' : 'Retrain'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIPoweredBusinessIntelligence;
