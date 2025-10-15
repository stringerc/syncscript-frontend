import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart3, TrendingUp, Target, Users, Calendar, DollarSign, Building, Phone, Mail, MessageCircle, FileText, Award, Clock, CheckCircle, AlertTriangle, Plus, Edit, Trash2, Save, Copy, ExternalLink, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Star, Zap, Shield, Activity, MapPin, Share2, Video, Briefcase, PieChart, LineChart, Brain, Cpu, Database, Server, Cloud, Wifi, Signal, Battery, WifiOff, Eye, EyeOff, Lock, Unlock, Key, Settings, Bell, Filter, Search, Download, Upload, RefreshCw, Monitor, Smartphone, Tablet, Laptop, Globe, Map, Flag, Building2, Home, Work, School, Coffee, Gamepad2, Music, Book, Code, Paintbrush, Calculator, Lightbulb, Target as TargetIcon, TrendingDown, Activity as ActivityIcon, Zap as ZapIcon, Shield as ShieldIcon, Star as StarIcon, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Meh } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, ReferenceLine, Legend } from 'recharts';
import { toast } from 'react-hot-toast';

// Advanced Analytics & Business Intelligence interfaces
interface BusinessMetric {
  id: string;
  name: string;
  category: 'revenue' | 'users' | 'engagement' | 'performance' | 'conversion' | 'retention';
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
  lastUpdated: string;
  createdAt: string;
}

interface AIGeneratedInsight {
  id: string;
  title: string;
  category: 'trend' | 'anomaly' | 'prediction' | 'recommendation' | 'optimization';
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'reviewing' | 'implemented' | 'dismissed';
  dataSource: string[];
  metrics: string[];
  recommendations: string[];
  tags: string[];
  createdAt: string;
}

interface PredictiveAnalytics {
  id: string;
  metric: string;
  predictionType: 'forecast' | 'classification' | 'regression' | 'clustering';
  timeHorizon: 'short' | 'medium' | 'long';
  confidence: number;
  predictions: PredictionData[];
  accuracy: number;
  model: string;
  lastTrained: string;
  createdAt: string;
}

interface PredictionData {
  date: string;
  predictedValue: number;
  actualValue?: number;
  confidence: number;
  factors: string[];
}

interface BusinessIntelligenceDashboard {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  filters: DashboardFilter[];
  refreshInterval: number;
  isPublic: boolean;
  permissions: string[];
  createdAt: string;
}

interface DashboardWidget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'text' | 'image';
  title: string;
  dataSource: string;
  configuration: WidgetConfiguration;
  position: WidgetPosition;
  size: WidgetSize;
}

interface WidgetConfiguration {
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar';
  metrics: string[];
  dimensions: string[];
  filters: Record<string, any>;
  aggregation: string;
  timeRange: string;
}

interface WidgetPosition {
  x: number;
  y: number;
}

interface WidgetSize {
  width: number;
  height: number;
}

interface DashboardFilter {
  id: string;
  name: string;
  type: 'date' | 'select' | 'multiselect' | 'range' | 'text';
  options?: string[];
  defaultValue: any;
}

interface AutomatedReport {
  id: string;
  name: string;
  description: string;
  schedule: ReportSchedule;
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv' | 'html';
  template: string;
  metrics: string[];
  filters: Record<string, any>;
  status: 'active' | 'paused' | 'error';
  lastRun?: string;
  nextRun?: string;
  createdAt: string;
}

interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  timezone: string;
}

interface SystemAlert {
  id: string;
  name: string;
  description: string;
  type: 'metric_threshold' | 'anomaly_detection' | 'system_error' | 'performance_degradation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'triggered' | 'acknowledged' | 'resolved';
  conditions: AlertCondition[];
  actions: AlertAction[];
  lastTriggered?: string;
  createdAt: string;
}

interface AlertCondition {
  metric: string;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte' | 'contains';
  value: number | string;
  timeWindow: number;
}

interface AlertAction {
  type: 'email' | 'sms' | 'webhook' | 'slack' | 'teams';
  target: string;
  template: string;
}

interface DataVisualization {
  id: string;
  name: string;
  type: 'chart' | 'graph' | 'map' | 'table' | 'gauge' | 'heatmap';
  dataSource: string;
  configuration: VisualizationConfig;
  isInteractive: boolean;
  permissions: string[];
  createdAt: string;
}

interface VisualizationConfig {
  chartType: string;
  dataMapping: Record<string, string>;
  styling: Record<string, any>;
  interactions: Record<string, any>;
  animations: Record<string, any>;
}

interface TrendAnalysis {
  id: string;
  metric: string;
  timeRange: string;
  trend: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  slope: number;
  rSquared: number;
  seasonality: boolean;
  anomalies: Anomaly[];
  forecast: ForecastData[];
  insights: string[];
  createdAt: string;
}

interface Anomaly {
  date: string;
  value: number;
  expectedValue: number;
  deviation: number;
  severity: 'low' | 'medium' | 'high';
  explanation: string;
}

interface ForecastData {
  date: string;
  predictedValue: number;
  confidenceInterval: [number, number];
  factors: string[];
}

interface PerformanceBenchmark {
  id: string;
  metric: string;
  category: string;
  currentValue: number;
  benchmarkValue: number;
  percentile: number;
  comparison: 'above' | 'below' | 'at';
  industry: string;
  competitors: CompetitorData[];
  recommendations: string[];
  createdAt: string;
}

interface CompetitorData {
  name: string;
  value: number;
  source: string;
  date: string;
}

interface CustomAnalytics {
  id: string;
  name: string;
  description: string;
  query: string;
  parameters: Record<string, any>;
  resultFormat: 'table' | 'chart' | 'metric' | 'json';
  schedule?: string;
  isPublic: boolean;
  permissions: string[];
  lastRun?: string;
  createdAt: string;
}

interface RealTimeMonitoring {
  id: string;
  metric: string;
  currentValue: number;
  previousValue: number;
  changePercent: number;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: string;
  alerts: string[];
  history: MonitoringDataPoint[];
}

interface MonitoringDataPoint {
  timestamp: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
}

const AdvancedAnalyticsBusinessIntelligence: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetric[]>([]);
  const [aiInsights, setAiInsights] = useState<AIGeneratedInsight[]>([]);
  const [predictiveAnalytics, setPredictiveAnalytics] = useState<PredictiveAnalytics[]>([]);
  const [biDashboards, setBiDashboards] = useState<BusinessIntelligenceDashboard[]>([]);
  const [automatedReports, setAutomatedReports] = useState<AutomatedReport[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [dataVisualizations, setDataVisualizations] = useState<DataVisualization[]>([]);
  const [trendAnalysis, setTrendAnalysis] = useState<TrendAnalysis[]>([]);
  const [performanceBenchmarks, setPerformanceBenchmarks] = useState<PerformanceBenchmark[]>([]);
  const [customAnalytics, setCustomAnalytics] = useState<CustomAnalytics[]>([]);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState<RealTimeMonitoring[]>([]);

  // SSR-safe data loading
  useEffect(() => {
    const loadAnalyticsData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock business metrics
        const mockBusinessMetrics: BusinessMetric[] = [
          {
            id: 'metric-1',
            name: 'Monthly Recurring Revenue',
            category: 'revenue',
            value: 1250000,
            unit: 'USD',
            trend: 'up',
            changePercent: 12.5,
            target: 1500000,
            status: 'good',
            description: 'Total monthly recurring revenue from all subscriptions',
            lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'metric-2',
            name: 'Customer Acquisition Cost',
            category: 'conversion',
            value: 450,
            unit: 'USD',
            trend: 'down',
            changePercent: -8.2,
            target: 400,
            status: 'excellent',
            description: 'Average cost to acquire a new customer',
            lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'metric-3',
            name: 'User Engagement Score',
            category: 'engagement',
            value: 7.8,
            unit: '/10',
            trend: 'up',
            changePercent: 5.1,
            target: 8.5,
            status: 'good',
            description: 'Overall user engagement and satisfaction score',
            lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'metric-4',
            name: 'Churn Rate',
            category: 'retention',
            value: 3.2,
            unit: '%',
            trend: 'down',
            changePercent: -15.3,
            target: 2.5,
            status: 'good',
            description: 'Monthly customer churn rate',
            lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock AI insights
        const mockAIInsights: AIGeneratedInsight[] = [
          {
            id: 'insight-1',
            title: 'Revenue Growth Acceleration Detected',
            category: 'trend',
            description: 'AI analysis shows 23% acceleration in revenue growth over the last 30 days, primarily driven by enterprise customer acquisition.',
            confidence: 92,
            impact: 'high',
            priority: 'high',
            status: 'new',
            dataSource: ['revenue_metrics', 'customer_data', 'sales_pipeline'],
            metrics: ['MRR', 'CAC', 'LTV'],
            recommendations: [
              'Scale enterprise sales team by 30%',
              'Implement automated lead scoring',
              'Optimize onboarding for enterprise customers'
            ],
            tags: ['revenue', 'growth', 'enterprise'],
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'insight-2',
            title: 'User Engagement Anomaly Detected',
            category: 'anomaly',
            description: 'Unusual spike in user engagement detected on mobile platform, suggesting successful feature adoption.',
            confidence: 87,
            impact: 'medium',
            priority: 'medium',
            status: 'reviewing',
            dataSource: ['user_behavior', 'mobile_analytics', 'feature_usage'],
            metrics: ['engagement_score', 'mobile_usage', 'feature_adoption'],
            recommendations: [
              'Investigate mobile feature performance',
              'Replicate success on desktop platform',
              'Analyze user feedback for mobile features'
            ],
            tags: ['engagement', 'mobile', 'anomaly'],
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock predictive analytics
        const mockPredictiveAnalytics: PredictiveAnalytics[] = [
          {
            id: 'prediction-1',
            metric: 'Monthly Recurring Revenue',
            predictionType: 'forecast',
            timeHorizon: 'medium',
            confidence: 89,
            predictions: [
              {
                date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                predictedValue: 1350000,
                confidence: 89,
                factors: ['Current growth rate', 'Pipeline value', 'Seasonal trends']
              },
              {
                date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
                predictedValue: 1480000,
                confidence: 85,
                factors: ['Market expansion', 'Product improvements', 'Customer retention']
              }
            ],
            accuracy: 87.5,
            model: 'ARIMA + LSTM',
            lastTrained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock BI dashboards
        const mockBIDashboards: BusinessIntelligenceDashboard[] = [
          {
            id: 'dashboard-1',
            name: 'Executive Dashboard',
            description: 'High-level business metrics and KPIs for executive team',
            widgets: [
              {
                id: 'widget-1',
                type: 'metric',
                title: 'Total Revenue',
                dataSource: 'revenue_metrics',
                configuration: {
                  metrics: ['total_revenue'],
                  dimensions: [],
                  filters: {},
                  aggregation: 'sum',
                  timeRange: '30d'
                },
                position: { x: 0, y: 0 },
                size: { width: 2, height: 1 }
              }
            ],
            filters: [
              {
                id: 'filter-1',
                name: 'Date Range',
                type: 'date',
                defaultValue: '30d'
              }
            ],
            refreshInterval: 300,
            isPublic: false,
            permissions: ['executive', 'analyst'],
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock automated reports
        const mockAutomatedReports: AutomatedReport[] = [
          {
            id: 'report-1',
            name: 'Weekly Business Review',
            description: 'Comprehensive weekly business metrics and insights',
            schedule: {
              frequency: 'weekly',
              dayOfWeek: 1,
              time: '09:00',
              timezone: 'UTC'
            },
            recipients: ['executives@company.com', 'analysts@company.com'],
            format: 'pdf',
            template: 'weekly_business_review',
            metrics: ['MRR', 'CAC', 'LTV', 'Churn Rate', 'User Engagement'],
            filters: { dateRange: '7d' },
            status: 'active',
            lastRun: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            nextRun: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock system alerts
        const mockSystemAlerts: SystemAlert[] = [
          {
            id: 'alert-1',
            name: 'High Churn Rate Alert',
            description: 'Alert when monthly churn rate exceeds 5%',
            type: 'metric_threshold',
            severity: 'high',
            status: 'active',
            conditions: [
              {
                metric: 'churn_rate',
                operator: 'gt',
                value: 5,
                timeWindow: 24
              }
            ],
            actions: [
              {
                type: 'email',
                target: 'customer-success@company.com',
                template: 'high_churn_alert'
              }
            ],
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock real-time monitoring
        const mockRealTimeMonitoring: RealTimeMonitoring[] = [
          {
            id: 'monitor-1',
            metric: 'Active Users',
            currentValue: 1250,
            previousValue: 1180,
            changePercent: 5.9,
            status: 'healthy',
            lastUpdated: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
            alerts: [],
            history: [
              {
                timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
                value: 1180,
                status: 'healthy'
              },
              {
                timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                value: 1215,
                status: 'healthy'
              },
              {
                timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
                value: 1250,
                status: 'healthy'
              }
            ]
          }
        ];

        setBusinessMetrics(mockBusinessMetrics);
        setAiInsights(mockAIInsights);
        setPredictiveAnalytics(mockPredictiveAnalytics);
        setBiDashboards(mockBIDashboards);
        setAutomatedReports(mockAutomatedReports);
        setSystemAlerts(mockSystemAlerts);
        setRealTimeMonitoring(mockRealTimeMonitoring);

        toast.success('Advanced analytics data loaded successfully!');
      } catch (error) {
        console.error('Failed to load analytics data:', error);
        toast.error('Failed to load advanced analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalyticsData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'metrics', label: 'Metrics', icon: Target },
    { id: 'ai_insights', label: 'AI Insights', icon: Brain },
    { id: 'predictions', label: 'Predictions', icon: TrendingUp },
    { id: 'dashboards', label: 'Dashboards', icon: Monitor },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'visualizations', label: 'Visualizations', icon: PieChart },
    { id: 'trends', label: 'Trends', icon: Activity },
    { id: 'benchmarks', label: 'Benchmarks', icon: Award },
    { id: 'custom', label: 'Custom', icon: Code },
    { id: 'monitoring', label: 'Monitoring', icon: ActivityIcon }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'new': return 'text-blue-600 bg-blue-100';
      case 'reviewing': return 'text-yellow-600 bg-yellow-100';
      case 'implemented': return 'text-green-600 bg-green-100';
      case 'dismissed': return 'text-gray-600 bg-gray-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'triggered': return 'text-orange-600 bg-orange-100';
      case 'acknowledged': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Advanced Analytics & BI</h2>
                <p className="text-indigo-100">Key business metrics and AI-powered insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm">Active</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-indigo-100 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-indigo-100">Total Metrics</p>
                          <p className="text-3xl font-bold">{businessMetrics.length}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-indigo-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">AI Insights</p>
                          <p className="text-3xl font-bold">{aiInsights.length}</p>
                        </div>
                        <Brain className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Predictions</p>
                          <p className="text-3xl font-bold">{predictiveAnalytics.length}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Dashboards</p>
                          <p className="text-3xl font-bold">{biDashboards.length}</p>
                        </div>
                        <Monitor className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Key Metrics Overview</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsLineChart data={businessMetrics.map(metric => ({
                          name: metric.name.split(' ')[0],
                          value: metric.value,
                          target: metric.target
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                          <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">AI Insights by Category</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: 'Trend', value: aiInsights.filter(i => i.category === 'trend').length },
                              { name: 'Anomaly', value: aiInsights.filter(i => i.category === 'anomaly').length },
                              { name: 'Prediction', value: aiInsights.filter(i => i.category === 'prediction').length },
                              { name: 'Recommendation', value: aiInsights.filter(i => i.category === 'recommendation').length }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#8b5cf6" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#10b981" />
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'metrics' && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {businessMetrics.map((metric) => (
                    <div key={metric.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <Target className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{metric.name}</h3>
                            <p className="text-sm text-gray-600">{metric.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(metric.status)}`}>
                            {metric.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTrendColor(metric.trend)}`}>
                            {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} {metric.changePercent}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Current Value</span>
                          <p className="font-semibold">{metric.value.toLocaleString()} {metric.unit}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Target</span>
                          <p className="font-semibold">{metric.target.toLocaleString()} {metric.unit}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Change</span>
                          <p className={`font-semibold ${getTrendColor(metric.trend)}`}>
                            {metric.changePercent > 0 ? '+' : ''}{metric.changePercent}%
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Last Updated</span>
                          <p className="font-semibold text-sm">
                            {new Date(metric.lastUpdated).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{metric.description}</p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Set Alert
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'ai_insights' && (
                <motion.div
                  key="ai_insights"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {aiInsights.map((insight) => (
                    <div key={insight.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Brain className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{insight.title}</h3>
                            <p className="text-sm text-gray-600">{insight.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(insight.status)}`}>
                            {insight.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getImpactColor(insight.impact)}`}>
                            {insight.impact} impact
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {insight.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{insight.description}</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Recommendations:</h4>
                        <div className="flex flex-wrap gap-2">
                          {insight.recommendations.map((recommendation, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {recommendation}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Data Sources:</h4>
                        <div className="flex flex-wrap gap-2">
                          {insight.dataSource.map((source, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {insight.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Review
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Implement
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'predictions' && (
                <motion.div
                  key="predictions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {predictiveAnalytics.map((prediction) => (
                    <div key={prediction.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{prediction.metric}</h3>
                            <p className="text-sm text-gray-600">{prediction.predictionType} - {prediction.timeHorizon} term</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                            {prediction.confidence}% confidence
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {prediction.accuracy}% accuracy
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Model:</span>
                        <p className="text-gray-700">{prediction.model}</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Predictions:</h4>
                        <div className="space-y-2">
                          {prediction.predictions.map((pred, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{new Date(pred.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600">
                                  Predicted: {pred.predictedValue.toLocaleString()}
                                </p>
                              </div>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                                {pred.confidence}% confidence
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Key Factors:</h4>
                        <div className="flex flex-wrap gap-2">
                          {prediction.predictions[0]?.factors.map((factor, index) => (
                            <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Retrain Model
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'monitoring' && (
                <motion.div
                  key="monitoring"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {realTimeMonitoring.map((monitor) => (
                    <div key={monitor.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <ActivityIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{monitor.metric}</h3>
                            <p className="text-sm text-gray-600">Real-time monitoring</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(monitor.status)}`}>
                            {monitor.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTrendColor(monitor.changePercent > 0 ? 'up' : 'down')}`}>
                            {monitor.changePercent > 0 ? '+' : ''}{monitor.changePercent}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Current Value</span>
                          <p className="font-semibold">{monitor.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Previous Value</span>
                          <p className="font-semibold">{monitor.previousValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Last Updated</span>
                          <p className="font-semibold text-sm">
                            {new Date(monitor.lastUpdated).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Recent History:</h4>
                        <ResponsiveContainer width="100%" height={100}>
                          <RechartsLineChart data={monitor.history.map(point => ({
                            time: new Date(point.timestamp).toLocaleTimeString(),
                            value: point.value
                          }))}>
                            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedAnalyticsBusinessIntelligence;