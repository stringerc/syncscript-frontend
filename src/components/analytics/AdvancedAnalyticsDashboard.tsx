import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'stable';
  trend: 'up' | 'down' | 'stable';
  period: string;
  category: 'productivity' | 'energy' | 'focus' | 'collaboration' | 'wellness';
  target?: number;
  lastUpdated: Date;
}

interface CustomReport {
  id: string;
  name: string;
  description: string;
  metrics: string[];
  filters: {
    dateRange: string;
    categories: string[];
    users?: string[];
  };
  visualization: 'chart' | 'table' | 'cards' | 'dashboard';
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    recipients: string[];
  };
  isScheduled: boolean;
  createdAt: Date;
  lastRun?: Date;
}

interface DataVisualization {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap';
  title: string;
  data: any[];
  config: {
    xAxis?: string;
    yAxis?: string;
    color?: string;
    size?: string;
  };
  insights: string[];
  lastUpdated: Date;
}

interface RealTimeMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  threshold: {
    warning: number;
    critical: number;
  };
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
}

const AdvancedAnalyticsDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [customReports, setCustomReports] = useState<CustomReport[]>([]);
  const [visualizations, setVisualizations] = useState<DataVisualization[]>([]);
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetric[]>([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isCreatingVisualization, setIsCreatingVisualization] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Generate analytics data
  useEffect(() => {
    const generateMetrics = (): AnalyticsMetric[] => {
      return [
        {
          id: 'metric-1',
          name: 'Tasks Completed',
          value: 47,
          unit: 'tasks',
          change: 12.5,
          changeType: 'increase',
          trend: 'up',
          period: 'Last 7 days',
          category: 'productivity',
          target: 50,
          lastUpdated: new Date(Date.now() - 5 * 60 * 1000)
        },
        {
          id: 'metric-2',
          name: 'Average Energy Level',
          value: 7.2,
          unit: '/10',
          change: -2.1,
          changeType: 'decrease',
          trend: 'down',
          period: 'Last 7 days',
          category: 'energy',
          target: 8.0,
          lastUpdated: new Date(Date.now() - 3 * 60 * 1000)
        },
        {
          id: 'metric-3',
          name: 'Focus Time',
          value: 4.5,
          unit: 'hours',
          change: 8.3,
          changeType: 'increase',
          trend: 'up',
          period: 'Today',
          category: 'focus',
          target: 6.0,
          lastUpdated: new Date(Date.now() - 2 * 60 * 1000)
        },
        {
          id: 'metric-4',
          name: 'Team Collaboration',
          value: 23,
          unit: 'interactions',
          change: 0,
          changeType: 'stable',
          trend: 'stable',
          period: 'Last 7 days',
          category: 'collaboration',
          target: 25,
          lastUpdated: new Date(Date.now() - 1 * 60 * 1000)
        },
        {
          id: 'metric-5',
          name: 'Wellness Score',
          value: 8.1,
          unit: '/10',
          change: 1.2,
          changeType: 'increase',
          trend: 'up',
          period: 'Last 7 days',
          category: 'wellness',
          target: 8.5,
          lastUpdated: new Date(Date.now() - 4 * 60 * 1000)
        },
        {
          id: 'metric-6',
          name: 'Productivity Index',
          value: 85.3,
          unit: '%',
          change: 5.7,
          changeType: 'increase',
          trend: 'up',
          period: 'Last 7 days',
          category: 'productivity',
          target: 90.0,
          lastUpdated: new Date(Date.now() - 6 * 60 * 1000)
        }
      ];
    };

    const generateCustomReports = (): CustomReport[] => {
      return [
        {
          id: 'report-1',
          name: 'Weekly Productivity Summary',
          description: 'Comprehensive overview of productivity metrics for the past week',
          metrics: ['Tasks Completed', 'Focus Time', 'Energy Level', 'Productivity Index'],
          filters: {
            dateRange: '7d',
            categories: ['productivity', 'focus', 'energy']
          },
          visualization: 'dashboard',
          schedule: {
            frequency: 'weekly',
            time: '09:00',
            recipients: ['team@company.com']
          },
          isScheduled: true,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          lastRun: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'report-2',
          name: 'Energy Pattern Analysis',
          description: 'Detailed analysis of energy patterns and optimization opportunities',
          metrics: ['Average Energy Level', 'Energy Peaks', 'Energy Dips'],
          filters: {
            dateRange: '30d',
            categories: ['energy', 'wellness']
          },
          visualization: 'chart',
          isScheduled: false,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'report-3',
          name: 'Team Performance Dashboard',
          description: 'Real-time team performance metrics and collaboration insights',
          metrics: ['Team Collaboration', 'Task Completion Rate', 'Communication Frequency'],
          filters: {
            dateRange: '14d',
            categories: ['collaboration', 'productivity']
          },
          visualization: 'dashboard',
          schedule: {
            frequency: 'daily',
            time: '17:00',
            recipients: ['manager@company.com', 'team@company.com']
          },
          isScheduled: true,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000)
        }
      ];
    };

    const generateVisualizations = (): DataVisualization[] => {
      return [
        {
          id: 'viz-1',
          type: 'line',
          title: 'Productivity Trends Over Time',
          data: [
            { date: '2024-10-01', productivity: 78 },
            { date: '2024-10-02', productivity: 82 },
            { date: '2024-10-03', productivity: 85 },
            { date: '2024-10-04', productivity: 88 },
            { date: '2024-10-05', productivity: 90 },
            { date: '2024-10-06', productivity: 87 },
            { date: '2024-10-07', productivity: 92 }
          ],
          config: {
            xAxis: 'date',
            yAxis: 'productivity',
            color: '#3B82F6'
          },
          insights: [
            'Productivity increased 18% over the week',
            'Peak performance on day 7',
            'Consistent upward trend'
          ],
          lastUpdated: new Date(Date.now() - 1 * 60 * 1000)
        },
        {
          id: 'viz-2',
          type: 'bar',
          title: 'Task Completion by Category',
          data: [
            { category: 'Work', completed: 25, total: 30 },
            { category: 'Personal', completed: 15, total: 18 },
            { category: 'Learning', completed: 8, total: 12 },
            { category: 'Health', completed: 12, total: 15 }
          ],
          config: {
            xAxis: 'category',
            yAxis: 'completed',
            color: '#10B981'
          },
          insights: [
            'Work tasks have highest completion rate',
            'Learning tasks need more attention',
            'Overall completion rate: 83%'
          ],
          lastUpdated: new Date(Date.now() - 2 * 60 * 1000)
        },
        {
          id: 'viz-3',
          type: 'pie',
          title: 'Energy Level Distribution',
          data: [
            { level: 'High (8-10)', count: 15, percentage: 35 },
            { level: 'Medium (5-7)', count: 20, percentage: 47 },
            { level: 'Low (1-4)', count: 8, percentage: 18 }
          ],
          config: {
            color: '#F59E0B'
          },
          insights: [
            '47% of time spent in medium energy',
            'High energy periods are optimal for complex tasks',
            'Low energy periods need better management'
          ],
          lastUpdated: new Date(Date.now() - 3 * 60 * 1000)
        }
      ];
    };

    const generateRealTimeMetrics = (): RealTimeMetric[] => {
      return [
        {
          id: 'rt-1',
          name: 'Active Users',
          value: 127,
          unit: 'users',
          status: 'good',
          threshold: { warning: 100, critical: 150 },
          trend: 'up',
          lastUpdated: new Date(Date.now() - 30 * 1000)
        },
        {
          id: 'rt-2',
          name: 'API Response Time',
          value: 245,
          unit: 'ms',
          status: 'good',
          threshold: { warning: 500, critical: 1000 },
          trend: 'stable',
          lastUpdated: new Date(Date.now() - 15 * 1000)
        },
        {
          id: 'rt-3',
          name: 'Error Rate',
          value: 0.8,
          unit: '%',
          status: 'warning',
          threshold: { warning: 1.0, critical: 5.0 },
          trend: 'up',
          lastUpdated: new Date(Date.now() - 45 * 1000)
        },
        {
          id: 'rt-4',
          name: 'CPU Usage',
          value: 65,
          unit: '%',
          status: 'good',
          threshold: { warning: 80, critical: 95 },
          trend: 'down',
          lastUpdated: new Date(Date.now() - 20 * 1000)
        }
      ];
    };

    setMetrics(generateMetrics());
    setCustomReports(generateCustomReports());
    setVisualizations(generateVisualizations());
    setRealTimeMetrics(generateRealTimeMetrics());
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getChangeColor = (changeType: string): string => {
    switch (changeType) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getChangeIcon = (trend: string): string => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'productivity': return 'bg-blue-100 text-blue-800';
      case 'energy': return 'bg-orange-100 text-orange-800';
      case 'focus': return 'bg-purple-100 text-purple-800';
      case 'collaboration': return 'bg-green-100 text-green-800';
      case 'wellness': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisualizationIcon = (type: string): string => {
    switch (type) {
      case 'line': return '📈';
      case 'bar': return '📊';
      case 'pie': return '🥧';
      case 'area': return '📈';
      case 'scatter': return '🔸';
      case 'heatmap': return '🔥';
      default: return '📊';
    }
  };

  const generateCustomReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newReport: CustomReport = {
      id: `report-${Date.now()}`,
      name: 'AI-Generated Report',
      description: 'Automatically generated report based on your data patterns and preferences',
      metrics: ['Productivity Index', 'Focus Time', 'Energy Level'],
      filters: {
        dateRange: selectedTimeRange,
        categories: ['productivity', 'focus', 'energy']
      },
      visualization: 'dashboard',
      isScheduled: false,
      createdAt: new Date()
    };
    
    setCustomReports(prev => [newReport, ...prev]);
    setIsGeneratingReport(false);
  };

  const createVisualization = async () => {
    setIsCreatingVisualization(true);
    
    // Simulate visualization creation
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const newVisualization: DataVisualization = {
      id: `viz-${Date.now()}`,
      type: 'line',
      title: 'Custom Data Visualization',
      data: [
        { x: 1, y: 20 },
        { x: 2, y: 35 },
        { x: 3, y: 45 },
        { x: 4, y: 60 },
        { x: 5, y: 75 }
      ],
      config: {
        xAxis: 'x',
        yAxis: 'y',
        color: '#8B5CF6'
      },
      insights: [
        'Custom visualization created successfully',
        'Data shows positive trend',
        'Ready for analysis'
      ],
      lastUpdated: new Date()
    };
    
    setVisualizations(prev => [newVisualization, ...prev]);
    setIsCreatingVisualization(false);
  };

  const totalMetrics = metrics.length;
  const avgChange = metrics.reduce((sum, m) => sum + Math.abs(m.change), 0) / metrics.length;
  const metricsOnTarget = metrics.filter(m => m.target && m.value >= m.target).length;
  const scheduledReports = customReports.filter(r => r.isScheduled).length;

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
              <h2 className="text-2xl font-bold">📊 Advanced Analytics Dashboard</h2>
              <p className="text-blue-100 mt-1">Real-time metrics, custom reports, and data visualization</p>
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
          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Metrics</p>
                  <p className="text-2xl font-bold text-blue-800">{totalMetrics}</p>
                  <p className="text-xs text-blue-600">{metricsOnTarget} on target</p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Avg Change</p>
                  <p className="text-2xl font-bold text-green-800">{avgChange.toFixed(1)}%</p>
                  <p className="text-xs text-green-600">This week</p>
                </div>
                <div className="text-3xl">📈</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Custom Reports</p>
                  <p className="text-2xl font-bold text-purple-800">{customReports.length}</p>
                  <p className="text-xs text-purple-600">{scheduledReports} scheduled</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Visualizations</p>
                  <p className="text-2xl font-bold text-orange-800">{visualizations.length}</p>
                  <p className="text-xs text-orange-600">Active charts</p>
                </div>
                <div className="text-3xl">📈</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Time Range:
                </div>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1d">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={generateCustomReport}
                  disabled={isGeneratingReport}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingReport ? '⏳ Generating...' : '📋 Generate Report'}
                </button>
                <button
                  onClick={createVisualization}
                  disabled={isCreatingVisualization}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingVisualization ? '⏳ Creating...' : '📊 Create Chart'}
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Metrics ({metrics.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(metric.category)}`}>
                      {metric.category}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        {metric.value} {metric.unit}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-lg">{getChangeIcon(metric.trend)}</span>
                        <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Period:</span>
                      <span className="font-medium text-gray-900">{metric.period}</span>
                    </div>
                    
                    {metric.target && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Target:</span>
                        <span className="font-medium text-gray-900">{metric.target} {metric.unit}</span>
                      </div>
                    )}
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metric.target && metric.value >= metric.target ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ 
                          width: metric.target 
                            ? `${Math.min((metric.value / metric.target) * 100, 100)}%` 
                            : '100%' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Real-time Metrics ({realTimeMetrics.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {realTimeMetrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(metric.status)}`}>
                      {metric.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        {metric.value} {metric.unit}
                      </span>
                      <span className="text-lg">{getChangeIcon(metric.trend)}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Updated: {formatDate(metric.lastUpdated)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Visualizations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Visualizations ({visualizations.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visualizations.map((viz) => (
                <div key={viz.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{viz.title}</h4>
                    <span className="text-2xl">{getVisualizationIcon(viz.type)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      Type: <span className="font-medium text-gray-900">{viz.type}</span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      Data Points: <span className="font-medium text-gray-900">{viz.data.length}</span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Key Insights:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {viz.insights.slice(0, 2).map((insight, index) => (
                          <li key={index}>{insight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Reports */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Custom Reports ({customReports.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visualization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.name}</div>
                          <div className="text-sm text-gray-500">{report.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-2xl">{getVisualizationIcon(report.visualization)}</span>
                        <span className="ml-2 text-sm text-gray-900">{report.visualization}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.isScheduled ? (
                          <div>
                            <div className="font-medium">{report.schedule?.frequency}</div>
                            <div className="text-gray-500">{report.schedule?.time}</div>
                          </div>
                        ) : (
                          <span className="text-gray-500">Manual</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.lastRun ? formatDate(report.lastRun) : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors">
                          Run
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

export default AdvancedAnalyticsDashboard;
