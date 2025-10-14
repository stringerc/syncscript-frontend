import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart3, TrendingUp, PieChart, LineChart, Target, Users, DollarSign, Zap, ArrowUpRight, ArrowDownRight, Eye, MousePointer, CheckCircle, AlertTriangle, Clock, Settings, Code, Award, FileText, Presentation, Link, Calculator, Percent, ArrowRight, Filter, Search, Plus, Edit, Save, Send, Play, Pause, Stop, Maximize, Minimize, Database, Cpu, HardDrive, Network, Activity, Globe, TrendingDown, Calendar, UserCheck, Building, Briefcase } from 'lucide-react';

interface BIKeyMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  growth: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  category: 'revenue' | 'users' | 'engagement' | 'performance' | 'conversion' | 'retention';
  forecast: {
    nextMonth: number;
    nextQuarter: number;
    confidence: number;
  };
  benchmarks: {
    industry: number;
    competitors: number;
    bestInClass: number;
  };
}

interface BIInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'risk' | 'trend' | 'anomaly' | 'recommendation';
  impact: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  actionable: boolean;
  category: string;
  metrics: {
    affected: number;
    potential: number;
    timeframe: string;
  };
  recommendations: string[];
  owner: string;
  status: 'new' | 'in-review' | 'implemented' | 'monitoring';
}

interface BIDashboard {
  id: string;
  name: string;
  description: string;
  category: 'executive' | 'operational' | 'marketing' | 'product' | 'financial' | 'custom';
  widgets: {
    id: string;
    type: 'chart' | 'metric' | 'table' | 'kpi' | 'alert';
    title: string;
    data: any;
    config: any;
  }[];
  users: string[];
  lastUpdated: Date;
  refreshRate: number;
}

interface BIReport {
  id: string;
  name: string;
  description: string;
  type: 'scheduled' | 'ad-hoc' | 'automated';
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    time: string;
    recipients: string[];
  };
  data: {
    metrics: string[];
    filters: any;
    timeRange: string;
  };
  format: 'pdf' | 'excel' | 'csv' | 'dashboard';
  status: 'active' | 'paused' | 'completed';
  lastRun: Date;
  nextRun: Date;
}

interface BIPrediction {
  id: string;
  model: string;
  target: string;
  prediction: {
    value: number;
    confidence: number;
    timeframe: string;
  };
  factors: {
    name: string;
    impact: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  accuracy: number;
  lastUpdated: Date;
  recommendations: string[];
}

interface BIAlert {
  id: string;
  name: string;
  description: string;
  type: 'threshold' | 'anomaly' | 'trend' | 'forecast';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'triggered' | 'acknowledged' | 'resolved';
  condition: string;
  value: number;
  threshold: number;
  triggeredAt: Date;
  acknowledgedBy: string;
  resolution: string;
}

const AdvancedBusinessIntelligence: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [keyMetrics, setKeyMetrics] = useState<BIKeyMetric[]>([]);
  const [insights, setInsights] = useState<BIInsight[]>([]);
  const [dashboards, setDashboards] = useState<BIDashboard[]>([]);
  const [reports, setReports] = useState<BIReport[]>([]);
  const [predictions, setPredictions] = useState<BIPrediction[]>([]);
  const [alerts, setAlerts] = useState<BIAlert[]>([]);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [isRunningPrediction, setIsRunningPrediction] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<BIKeyMetric | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<BIInsight | null>(null);

  // Generate BI data
  useEffect(() => {
    const generateKeyMetrics = (): BIKeyMetric[] => {
      return [
        {
          id: 'revenue-mrr',
          name: 'Monthly Recurring Revenue',
          value: 85000,
          target: 100000,
          growth: 28,
          trend: 'up',
          unit: 'USD',
          category: 'revenue',
          forecast: {
            nextMonth: 92000,
            nextQuarter: 105000,
            confidence: 85
          },
          benchmarks: {
            industry: 75000,
            competitors: 68000,
            bestInClass: 120000
          }
        },
        {
          id: 'user-growth',
          name: 'Monthly Active Users',
          value: 2850,
          target: 3500,
          growth: 22,
          trend: 'up',
          unit: 'users',
          category: 'users',
          forecast: {
            nextMonth: 3100,
            nextQuarter: 3800,
            confidence: 78
          },
          benchmarks: {
            industry: 2200,
            competitors: 1950,
            bestInClass: 4500
          }
        },
        {
          id: 'engagement-rate',
          name: 'Daily Engagement Rate',
          value: 72,
          target: 80,
          growth: 8,
          trend: 'up',
          unit: '%',
          category: 'engagement',
          forecast: {
            nextMonth: 75,
            nextQuarter: 82,
            confidence: 72
          },
          benchmarks: {
            industry: 65,
            competitors: 58,
            bestInClass: 85
          }
        },
        {
          id: 'conversion-rate',
          name: 'Free to Paid Conversion',
          value: 14.2,
          target: 18.0,
          growth: 12,
          trend: 'up',
          unit: '%',
          category: 'conversion',
          forecast: {
            nextMonth: 15.5,
            nextQuarter: 17.8,
            confidence: 68
          },
          benchmarks: {
            industry: 12.5,
            competitors: 10.8,
            bestInClass: 22.0
          }
        },
        {
          id: 'churn-rate',
          name: 'Monthly Churn Rate',
          value: 2.8,
          target: 2.0,
          growth: -15,
          trend: 'down',
          unit: '%',
          category: 'retention',
          forecast: {
            nextMonth: 2.5,
            nextQuarter: 2.1,
            confidence: 82
          },
          benchmarks: {
            industry: 4.2,
            competitors: 5.1,
            bestInClass: 1.5
          }
        },
        {
          id: 'performance-score',
          name: 'Platform Performance Score',
          value: 94.5,
          target: 98.0,
          growth: 3,
          trend: 'up',
          unit: 'score',
          category: 'performance',
          forecast: {
            nextMonth: 95.8,
            nextQuarter: 97.2,
            confidence: 75
          },
          benchmarks: {
            industry: 89.2,
            competitors: 85.7,
            bestInClass: 99.1
          }
        }
      ];
    };

    const generateInsights = (): BIInsight[] => {
      return [
        {
          id: 'insight-1',
          title: 'Mobile User Engagement Drop',
          description: 'Mobile users show 23% lower engagement compared to desktop users in the last 30 days.',
          type: 'anomaly',
          impact: 'high',
          confidence: 89,
          actionable: true,
          category: 'User Experience',
          metrics: {
            affected: 850,
            potential: 250,
            timeframe: '2-4 weeks'
          },
          recommendations: [
            'Optimize mobile app performance',
            'Improve mobile UI/UX design',
            'Add mobile-specific features',
            'Implement push notifications'
          ],
          owner: 'Product Team',
          status: 'in-review'
        },
        {
          id: 'insight-2',
          title: 'Enterprise Segment Growth Opportunity',
          description: 'Enterprise prospects show 45% higher conversion rates when demo includes SSO integration.',
          type: 'opportunity',
          impact: 'critical',
          confidence: 92,
          actionable: true,
          category: 'Revenue',
          metrics: {
            affected: 120,
            potential: 45000,
            timeframe: '1-2 months'
          },
          recommendations: [
            'Prioritize SSO integration development',
            'Create enterprise-focused demo flows',
            'Develop enterprise pricing tiers',
            'Hire enterprise sales specialist'
          ],
          owner: 'Sales Team',
          status: 'implemented'
        },
        {
          id: 'insight-3',
          title: 'Weekend Usage Pattern Change',
          description: 'Weekend usage has increased 34% in the last month, indicating shift to personal productivity.',
          type: 'trend',
          impact: 'medium',
          confidence: 76,
          actionable: true,
          category: 'User Behavior',
          metrics: {
            affected: 1200,
            potential: 180,
            timeframe: '3-6 months'
          },
          recommendations: [
            'Develop personal productivity features',
            'Create weekend-specific content',
            'Adjust support hours for weekends',
            'Implement weekend engagement campaigns'
          ],
          owner: 'Marketing Team',
          status: 'new'
        }
      ];
    };

    const generateDashboards = (): BIDashboard[] => {
      return [
        {
          id: 'executive-dashboard',
          name: 'Executive Dashboard',
          description: 'High-level KPIs and strategic metrics for executive team',
          category: 'executive',
          widgets: [
            {
              id: 'revenue-widget',
              type: 'kpi',
              title: 'Revenue Metrics',
              data: { mrr: 85000, growth: 28 },
              config: { chartType: 'line', timeRange: '12m' }
            },
            {
              id: 'user-widget',
              type: 'chart',
              title: 'User Growth',
              data: { users: 2850, growth: 22 },
              config: { chartType: 'bar', timeRange: '6m' }
            }
          ],
          users: ['CEO', 'CTO', 'CFO', 'VP Sales'],
          lastUpdated: new Date(),
          refreshRate: 300
        },
        {
          id: 'product-dashboard',
          name: 'Product Analytics',
          description: 'Product usage, feature adoption, and user behavior metrics',
          category: 'product',
          widgets: [
            {
              id: 'feature-adoption',
              type: 'chart',
              title: 'Feature Adoption',
              data: { features: ['task-mgmt', 'analytics', 'collaboration'] },
              config: { chartType: 'pie', timeRange: '3m' }
            }
          ],
          users: ['Product Manager', 'UX Designer', 'Engineering Team'],
          lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
          refreshRate: 600
        }
      ];
    };

    const generateReports = (): BIReport[] => {
      return [
        {
          id: 'weekly-executive',
          name: 'Weekly Executive Summary',
          description: 'Weekly performance summary for executive team',
          type: 'scheduled',
          schedule: {
            frequency: 'weekly',
            time: '09:00',
            recipients: ['CEO', 'CTO', 'CFO']
          },
          data: {
            metrics: ['revenue', 'users', 'engagement', 'churn'],
            filters: { segment: 'all' },
            timeRange: '7d'
          },
          format: 'pdf',
          status: 'active',
          lastRun: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          nextRun: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'monthly-product',
          name: 'Monthly Product Report',
          description: 'Monthly product performance and feature usage report',
          type: 'scheduled',
          schedule: {
            frequency: 'monthly',
            time: '10:00',
            recipients: ['Product Team', 'Engineering Team']
          },
          data: {
            metrics: ['feature-adoption', 'user-behavior', 'performance'],
            filters: { platform: 'all' },
            timeRange: '30d'
          },
          format: 'excel',
          status: 'active',
          lastRun: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          nextRun: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generatePredictions = (): BIPrediction[] => {
      return [
        {
          id: 'revenue-prediction',
          model: 'Revenue Forecasting Model',
          target: 'Monthly Recurring Revenue',
          prediction: {
            value: 105000,
            confidence: 85,
            timeframe: 'Next Quarter'
          },
          factors: [
            { name: 'User Growth', impact: 0.4, trend: 'up' },
            { name: 'Conversion Rate', impact: 0.3, trend: 'up' },
            { name: 'Churn Rate', impact: -0.2, trend: 'down' },
            { name: 'Pricing Changes', impact: 0.1, trend: 'up' }
          ],
          accuracy: 87,
          lastUpdated: new Date(),
          recommendations: [
            'Focus on user acquisition campaigns',
            'Optimize conversion funnel',
            'Implement retention programs'
          ]
        },
        {
          id: 'churn-prediction',
          model: 'Churn Prediction Model',
          target: 'Customer Churn Risk',
          prediction: {
            value: 2.1,
            confidence: 78,
            timeframe: 'Next Month'
          },
          factors: [
            { name: 'Usage Frequency', impact: -0.5, trend: 'down' },
            { name: 'Support Tickets', impact: 0.3, trend: 'up' },
            { name: 'Feature Adoption', impact: -0.2, trend: 'down' }
          ],
          accuracy: 82,
          lastUpdated: new Date(),
          recommendations: [
            'Identify at-risk customers',
            'Implement proactive outreach',
            'Improve onboarding experience'
          ]
        }
      ];
    };

    const generateAlerts = (): BIAlert[] => {
      return [
        {
          id: 'alert-1',
          name: 'High Churn Rate Alert',
          description: 'Monthly churn rate exceeded 3% threshold',
          type: 'threshold',
          severity: 'high',
          status: 'triggered',
          condition: 'churn_rate > 3.0',
          value: 3.2,
          threshold: 3.0,
          triggeredAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          acknowledgedBy: 'Customer Success Team',
          resolution: 'Investigating customer feedback and implementing retention campaigns'
        },
        {
          id: 'alert-2',
          name: 'Performance Degradation',
          description: 'Platform response time increased by 40%',
          type: 'anomaly',
          severity: 'critical',
          status: 'acknowledged',
          condition: 'response_time > 2s',
          value: 2.8,
          threshold: 2.0,
          triggeredAt: new Date(Date.now() - 30 * 60 * 1000),
          acknowledgedBy: 'Engineering Team',
          resolution: 'Scaling infrastructure and optimizing database queries'
        }
      ];
    };

    setKeyMetrics(generateKeyMetrics());
    setInsights(generateInsights());
    setDashboards(generateDashboards());
    setReports(generateReports());
    setPredictions(generatePredictions());
    setAlerts(generateAlerts());
  }, []);

  const generateInsights = async () => {
    setIsGeneratingInsights(true);
    
    // Simulate insight generation
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Add new insight
    const newInsight: BIInsight = {
      id: `insight-${Date.now()}`,
      title: 'New Market Opportunity Identified',
      description: 'Analysis reveals untapped market segment with high conversion potential.',
      type: 'opportunity',
      impact: 'high',
      confidence: 85,
      actionable: true,
      category: 'Market Analysis',
      metrics: {
        affected: 500,
        potential: 25000,
        timeframe: '2-3 months'
      },
      recommendations: [
        'Develop targeted marketing campaign',
        'Create segment-specific features',
        'Adjust pricing strategy'
      ],
      owner: 'Marketing Team',
      status: 'new'
    };
    
    setInsights(prev => [newInsight, ...prev]);
    setIsGeneratingInsights(false);
  };

  const createReport = async () => {
    setIsCreatingReport(true);
    
    // Simulate report creation
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Add new report
    const newReport: BIReport = {
      id: `report-${Date.now()}`,
      name: 'Custom Analytics Report',
      description: 'Ad-hoc report generated from user request',
      type: 'ad-hoc',
      schedule: {
        frequency: 'monthly',
        time: '09:00',
        recipients: ['Analytics Team']
      },
      data: {
        metrics: ['user-behavior', 'feature-usage', 'performance'],
        filters: { segment: 'premium' },
        timeRange: '30d'
      },
      format: 'pdf',
      status: 'active',
      lastRun: new Date(),
      nextRun: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };
    
    setReports(prev => [newReport, ...prev]);
    setIsCreatingReport(false);
  };

  const runPrediction = async () => {
    setIsRunningPrediction(true);
    
    // Simulate prediction run
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update predictions with new data
    setPredictions(prev => prev.map(prediction => ({
      ...prediction,
      prediction: {
        ...prediction.prediction,
        confidence: Math.min(prediction.prediction.confidence + 5, 95)
      },
      accuracy: Math.min(prediction.accuracy + 3, 95),
      lastUpdated: new Date()
    })));
    
    setIsRunningPrediction(false);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
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

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'implemented': case 'resolved': case 'completed': return 'bg-green-100 text-green-800';
      case 'in-review': case 'acknowledged': case 'active': return 'bg-yellow-100 text-yellow-800';
      case 'new': case 'triggered': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-orange-100 text-orange-800';
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

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'opportunity': return 'bg-green-100 text-green-800';
      case 'risk': return 'bg-red-100 text-red-800';
      case 'trend': return 'bg-blue-100 text-blue-800';
      case 'anomaly': return 'bg-orange-100 text-orange-800';
      case 'recommendation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalInsights = insights.length;
  const criticalInsights = insights.filter(i => i.impact === 'critical').length;
  const actionableInsights = insights.filter(i => i.actionable).length;
  const avgConfidence = insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length || 0;

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
              <h2 className="text-2xl font-bold">📊 Advanced Business Intelligence</h2>
              <p className="text-indigo-100 mt-1">Comprehensive BI dashboard with predictive analytics and actionable insights</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-indigo-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* BI Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Total Insights</p>
                  <p className="text-2xl font-bold text-indigo-800">{totalInsights}</p>
                  <p className="text-xs text-indigo-600">{criticalInsights} critical</p>
                </div>
                <BarChart3 className="text-3xl text-indigo-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Actionable Insights</p>
                  <p className="text-2xl font-bold text-green-800">{actionableInsights}</p>
                  <p className="text-xs text-green-600">Ready for action</p>
                </div>
                <Target className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Avg Confidence</p>
                  <p className="text-2xl font-bold text-blue-800">{avgConfidence.toFixed(0)}%</p>
                  <p className="text-xs text-blue-600">Insight accuracy</p>
                </div>
                <TrendingUp className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Active Alerts</p>
                  <p className="text-2xl font-bold text-purple-800">{alerts.filter(a => a.status === 'triggered').length}</p>
                  <p className="text-xs text-purple-600">Requiring attention</p>
                </div>
                <AlertTriangle className="text-3xl text-purple-600" />
              </div>
            </div>
          </div>

          {/* BI Actions */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6 border-2 border-indigo-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-indigo-700 font-medium">
                📊 Advanced BI Active - Generating insights, creating reports, and running predictions!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={generateInsights}
                  disabled={isGeneratingInsights}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingInsights ? '⏳ Generating...' : '🧠 Generate Insights'}
                </button>
                <button
                  onClick={createReport}
                  disabled={isCreatingReport}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingReport ? '⏳ Creating...' : '📋 Create Report'}
                </button>
                <button
                  onClick={runPrediction}
                  disabled={isRunningPrediction}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningPrediction ? '⏳ Running...' : '🔮 Run Predictions'}
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-2 text-indigo-600" />
              Key Business Metrics ({keyMetrics.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {keyMetrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                      <p className="text-sm text-gray-600">{metric.category} • {metric.unit}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.growth > 0 ? '+' : ''}{metric.growth}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium text-gray-900">
                        {metric.unit === 'USD' ? formatCurrency(metric.value) : 
                         metric.unit === '%' ? `${metric.value}%` : 
                         metric.unit === 'score' ? `${metric.value}/100` :
                         formatNumber(metric.value)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium text-gray-900">
                        {metric.unit === 'USD' ? formatCurrency(metric.target) : 
                         metric.unit === 'score' ? `${metric.target}/100` :
                         `${metric.target}${metric.unit}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Forecast:</span>
                      <span className="font-medium text-blue-600">
                        {metric.unit === 'USD' ? formatCurrency(metric.forecast.nextQuarter) : 
                         metric.unit === 'score' ? `${metric.forecast.nextQuarter}/100` :
                         `${metric.forecast.nextQuarter}${metric.unit}`}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{((metric.value / metric.target) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Confidence:</span> {metric.forecast.confidence}% | 
                    <span className="font-medium ml-2">Benchmark:</span> {metric.benchmarks.industry}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BI Insights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Zap className="mr-2 text-yellow-600" />
              AI-Generated Insights ({insights.length})
            </h3>
            <div className="space-y-4">
              {insights.map((insight) => (
                <div key={insight.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(insight.type)}`}>
                        {insight.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(insight.impact)}`}>
                        {insight.impact}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(insight.status)}`}>
                        {insight.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium text-gray-900 ml-1">{insight.category}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Confidence:</span>
                      <span className="font-medium text-gray-900 ml-1">{insight.confidence}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Affected:</span>
                      <span className="font-medium text-gray-900 ml-1">{insight.metrics.affected}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Potential:</span>
                      <span className="font-medium text-green-600 ml-1">
                        {insight.metrics.potential > 1000 ? formatCurrency(insight.metrics.potential) : insight.metrics.potential}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Recommendations:</span>
                    </div>
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                      {insight.recommendations.slice(0, 2).map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Owner:</span> {insight.owner} | 
                    <span className="font-medium ml-2">Timeframe:</span> {insight.metrics.timeframe} | 
                    <span className="font-medium ml-2">Actionable:</span> {insight.actionable ? '✅' : '❌'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BI Predictions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-2 text-purple-600" />
              Predictive Analytics ({predictions.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{prediction.target}</h4>
                      <p className="text-sm text-gray-600">{prediction.model}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {prediction.prediction.confidence}% confidence
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Prediction:</span>
                      <span className="font-medium text-gray-900">
                        {prediction.target.includes('Revenue') ? formatCurrency(prediction.prediction.value) : 
                         prediction.target.includes('Churn') ? `${prediction.prediction.value}%` :
                         prediction.prediction.value}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Timeframe:</span>
                      <span className="font-medium text-gray-900">{prediction.prediction.timeframe}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Accuracy:</span>
                      <span className="font-medium text-green-600">{prediction.accuracy}%</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Key Factors:</span>
                    </div>
                    <div className="space-y-1">
                      {prediction.factors.slice(0, 2).map((factor, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{factor.name}:</span>
                          <span className={`font-medium ${factor.impact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {factor.impact > 0 ? '+' : ''}{(factor.impact * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last Updated:</span> {prediction.lastUpdated.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Recommendations:</span> {prediction.recommendations.length}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BI Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-600" />
              System Alerts ({alerts.length})
            </h3>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{alert.name}</h4>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900 ml-1 capitalize">{alert.type}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Value:</span>
                      <span className="font-medium text-gray-900 ml-1">{alert.value}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Threshold:</span>
                      <span className="font-medium text-gray-900 ml-1">{alert.threshold}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Acknowledged:</span>
                      <span className="font-medium text-gray-900 ml-1">{alert.acknowledgedBy}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Triggered:</span> {alert.triggeredAt.toLocaleString()} | 
                    <span className="font-medium ml-2">Resolution:</span> {alert.resolution}
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

export default AdvancedBusinessIntelligence;
