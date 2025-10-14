/**
 * Business Intelligence Dashboard Component
 * 
 * Advanced reporting and data visualization
 * Includes comprehensive analytics, KPIs, and business insights
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KPIMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  trend: 'up' | 'down' | 'stable';
  target: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
}

interface ChartData {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap';
  data: any[];
  xAxis: string;
  yAxis: string;
  color: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastUpdated: string;
}

interface BusinessInsight {
  id: string;
  title: string;
  description: string;
  category: 'productivity' | 'team' | 'financial' | 'operational' | 'strategic';
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  actionable: boolean;
  recommendations: string[];
  data: Record<string, any>;
  createdAt: string;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'executive' | 'operational' | 'financial' | 'custom';
  metrics: string[];
  charts: string[];
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  isPublic: boolean;
  lastGenerated: string;
}

interface BusinessIntelligenceProps {
  onClose: () => void;
}

const BusinessIntelligence: React.FC<BusinessIntelligenceProps> = ({ onClose }) => {
  const [kpiMetrics, setKPIMetrics] = useState<KPIMetric[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [businessInsights, setBusinessInsights] = useState<BusinessInsight[]>([]);
  const [reportTemplates, setReportTemplates] = useState<ReportTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'charts' | 'insights' | 'reports'>('overview');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadBusinessData();
  }, []);

  const loadBusinessData = async () => {
    setIsLoading(true);
    
    try {
      // Mock KPI metrics
      const mockKPIMetrics: KPIMetric[] = [
        {
          id: 'kpi-1',
          name: 'Productivity Score',
          value: 87.5,
          unit: '%',
          change: 12.3,
          changeType: 'increase',
          trend: 'up',
          target: 85.0,
          status: 'excellent',
          description: 'Overall productivity performance across all tasks'
        },
        {
          id: 'kpi-2',
          name: 'Task Completion Rate',
          value: 94.2,
          unit: '%',
          change: 5.7,
          changeType: 'increase',
          trend: 'up',
          target: 90.0,
          status: 'excellent',
          description: 'Percentage of tasks completed on time'
        },
        {
          id: 'kpi-3',
          name: 'Team Collaboration Index',
          value: 78.9,
          unit: '%',
          change: -2.1,
          changeType: 'decrease',
          trend: 'down',
          target: 80.0,
          status: 'good',
          description: 'Level of team collaboration and communication'
        },
        {
          id: 'kpi-4',
          name: 'Energy Efficiency',
          value: 82.3,
          unit: '%',
          change: 8.4,
          changeType: 'increase',
          trend: 'up',
          target: 75.0,
          status: 'excellent',
          description: 'Energy management and optimization efficiency'
        },
        {
          id: 'kpi-5',
          name: 'Revenue per User',
          value: 125.50,
          unit: '$',
          change: 15.2,
          changeType: 'increase',
          trend: 'up',
          target: 100.0,
          status: 'excellent',
          description: 'Average revenue generated per active user'
        },
        {
          id: 'kpi-6',
          name: 'Customer Satisfaction',
          value: 4.7,
          unit: '/5',
          change: 0.3,
          changeType: 'increase',
          trend: 'up',
          target: 4.5,
          status: 'excellent',
          description: 'Average customer satisfaction rating'
        }
      ];

      // Mock chart data
      const mockChartData: ChartData[] = [
        {
          id: 'chart-1',
          title: 'Productivity Trends',
          type: 'line',
          data: [
            { date: '2024-01-01', productivity: 75.2 },
            { date: '2024-01-02', productivity: 78.9 },
            { date: '2024-01-03', productivity: 82.1 },
            { date: '2024-01-04', productivity: 85.3 },
            { date: '2024-01-05', productivity: 87.5 }
          ],
          xAxis: 'Date',
          yAxis: 'Productivity %',
          color: '#3B82F6',
          period: 'daily',
          lastUpdated: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'chart-2',
          title: 'Task Distribution by Priority',
          type: 'pie',
          data: [
            { priority: 'High', count: 45, percentage: 35 },
            { priority: 'Medium', count: 52, percentage: 40 },
            { priority: 'Low', count: 32, percentage: 25 }
          ],
          xAxis: 'Priority',
          yAxis: 'Count',
          color: '#10B981',
          period: 'weekly',
          lastUpdated: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 'chart-3',
          title: 'Team Performance Comparison',
          type: 'bar',
          data: [
            { team: 'Development', score: 92.5 },
            { team: 'Design', score: 88.3 },
            { team: 'Marketing', score: 85.7 },
            { team: 'Sales', score: 91.2 }
          ],
          xAxis: 'Team',
          yAxis: 'Score',
          color: '#F59E0B',
          period: 'monthly',
          lastUpdated: new Date(Date.now() - 10800000).toISOString()
        },
        {
          id: 'chart-4',
          title: 'Energy Level Distribution',
          type: 'area',
          data: [
            { time: '09:00', energy: 75 },
            { time: '10:00', energy: 85 },
            { time: '11:00', energy: 92 },
            { time: '12:00', energy: 88 },
            { time: '13:00', energy: 70 },
            { time: '14:00', energy: 65 },
            { time: '15:00', energy: 78 },
            { time: '16:00', energy: 82 }
          ],
          xAxis: 'Time',
          yAxis: 'Energy Level',
          color: '#8B5CF6',
          period: 'daily',
          lastUpdated: new Date(Date.now() - 14400000).toISOString()
        }
      ];

      // Mock business insights
      const mockBusinessInsights: BusinessInsight[] = [
        {
          id: 'insight-1',
          title: 'Peak Productivity Window Identified',
          description: 'Analysis reveals that productivity peaks between 10 AM and 12 PM across all teams',
          category: 'productivity',
          impact: 'high',
          confidence: 94.2,
          actionable: true,
          recommendations: [
            'Schedule important meetings during peak hours',
            'Assign critical tasks to peak productivity windows',
            'Implement focus time blocks during peak hours'
          ],
          data: {
            'peak_hours': '10:00-12:00',
            'productivity_increase': 23.5,
            'teams_affected': 4,
            'confidence_level': 94.2
          },
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'insight-2',
          title: 'Team Collaboration Efficiency Drop',
          description: 'Team collaboration efficiency has decreased by 8% over the past month',
          category: 'team',
          impact: 'medium',
          confidence: 87.3,
          actionable: true,
          recommendations: [
            'Increase team meeting frequency',
            'Implement collaboration tools',
            'Schedule team building activities'
          ],
          data: {
            'efficiency_drop': 8.0,
            'time_period': '30_days',
            'affected_teams': 3,
            'root_cause': 'remote_work_challenges'
          },
          createdAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 'insight-3',
          title: 'Revenue Growth Opportunity',
          description: 'Premium feature adoption could increase revenue by 35%',
          category: 'financial',
          impact: 'high',
          confidence: 91.5,
          actionable: true,
          recommendations: [
            'Launch premium feature campaign',
            'Offer limited-time discounts',
            'Implement usage-based pricing'
          ],
          data: {
            'potential_increase': 35.0,
            'target_users': 1250,
            'conversion_rate': 15.2,
            'revenue_impact': 45000
          },
          createdAt: new Date(Date.now() - 10800000).toISOString()
        },
        {
          id: 'insight-4',
          title: 'Operational Efficiency Gains',
          description: 'Automation implementation could reduce manual work by 40%',
          category: 'operational',
          impact: 'high',
          confidence: 89.7,
          actionable: true,
          recommendations: [
            'Implement task automation workflows',
            'Deploy AI-powered scheduling',
            'Automate reporting processes'
          ],
          data: {
            'efficiency_gain': 40.0,
            'manual_hours_saved': 120,
            'cost_savings': 15000,
            'implementation_time': '6_weeks'
          },
          createdAt: new Date(Date.now() - 14400000).toISOString()
        }
      ];

      // Mock report templates
      const mockReportTemplates: ReportTemplate[] = [
        {
          id: 'template-1',
          name: 'Executive Dashboard',
          description: 'High-level overview of key business metrics for executives',
          category: 'executive',
          metrics: ['productivity_score', 'revenue_per_user', 'customer_satisfaction'],
          charts: ['productivity_trends', 'revenue_growth'],
          frequency: 'weekly',
          recipients: ['CEO', 'CTO', 'VP_Product'],
          isPublic: false,
          lastGenerated: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'template-2',
          name: 'Team Performance Report',
          description: 'Detailed team performance and collaboration metrics',
          category: 'operational',
          metrics: ['team_collaboration_index', 'task_completion_rate', 'energy_efficiency'],
          charts: ['team_performance_comparison', 'collaboration_trends'],
          frequency: 'monthly',
          recipients: ['Team_Leads', 'HR_Director'],
          isPublic: true,
          lastGenerated: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'template-3',
          name: 'Financial Analytics',
          description: 'Revenue, costs, and profitability analysis',
          category: 'financial',
          metrics: ['revenue_per_user', 'customer_acquisition_cost', 'lifetime_value'],
          charts: ['revenue_trends', 'cost_analysis'],
          frequency: 'monthly',
          recipients: ['CFO', 'Finance_Team'],
          isPublic: false,
          lastGenerated: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: 'template-4',
          name: 'Custom Productivity Report',
          description: 'Customizable productivity and efficiency metrics',
          category: 'custom',
          metrics: ['productivity_score', 'energy_efficiency', 'task_completion_rate'],
          charts: ['productivity_trends', 'energy_distribution'],
          frequency: 'daily',
          recipients: ['Product_Manager', 'Analytics_Team'],
          isPublic: true,
          lastGenerated: new Date(Date.now() - 3600000).toISOString()
        }
      ];

      setKPIMetrics(mockKPIMetrics);
      setChartData(mockChartData);
      setBusinessInsights(mockBusinessInsights);
      setReportTemplates(mockReportTemplates);
    } catch (error) {
      console.error('Failed to load business data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async (templateId: string) => {
    setIsGenerating(true);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setReportTemplates(prev => prev.map(template => 
        template.id === templateId 
          ? { 
              ...template, 
              lastGenerated: new Date().toISOString()
            }
          : template
      ));
      
      console.log(`Generated report: ${templateId}`);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'productivity': return '📈';
      case 'team': return '👥';
      case 'financial': return '💰';
      case 'operational': return '⚙️';
      case 'strategic': return '🎯';
      default: return '📊';
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
            <span className="text-lg font-medium text-gray-700">Loading business intelligence...</span>
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Business Intelligence Dashboard</h2>
              <p className="text-blue-100 mt-1">Advanced reporting and data visualization</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">KPIs:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {kpiMetrics.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Charts:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {chartData.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Insights:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {businessInsights.length}
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
              { id: 'charts', name: 'Charts', icon: '📈' },
              { id: 'insights', name: 'Insights', icon: '💡' },
              { id: 'reports', name: 'Reports', icon: '📋' }
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
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">KPI Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kpiMetrics.map((kpi) => (
                  <motion.div
                    key={kpi.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{kpi.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(kpi.status)}`}>
                        {kpi.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          {kpi.value}{kpi.unit}
                        </span>
                        <span className="text-lg">{getTrendIcon(kpi.trend)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Target:</span>
                        <span className="text-gray-900">{kpi.target}{kpi.unit}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Change:</span>
                        <span className={`font-medium ${getChangeColor(kpi.changeType)}`}>
                          {kpi.changeType === 'increase' ? '+' : ''}{kpi.change}%
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-600">{kpi.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'charts' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Data Visualizations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chartData.map((chart) => (
                  <motion.div
                    key={chart.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{chart.title}</h4>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {chart.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500">Chart Visualization</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Period:</span>
                        <span className="text-gray-900 capitalize">{chart.period}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="text-gray-900">
                          {new Date(chart.lastUpdated).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Data Points:</span>
                        <span className="text-gray-900">{chart.data.length}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View Details
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

          {selectedTab === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Business Insights</h3>
              
              <div className="space-y-4">
                {businessInsights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getCategoryIcon(insight.category)}</span>
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
                      <div className="text-sm font-medium text-gray-700">Recommendations:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {insight.recommendations.map((recommendation, index) => (
                          <li key={index}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {insight.actionable && (
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                          Take Action
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

          {selectedTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
              
              <div className="space-y-4">
                {reportTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {template.category.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          template.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.isPublic ? 'PUBLIC' : 'PRIVATE'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Metrics:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.metrics.map((metric, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {metric.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Charts:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.charts.map((chart, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            {chart.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Frequency:</span>
                        <span className="ml-2 text-gray-900 capitalize">{template.frequency}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Recipients:</span>
                        <span className="ml-2 text-gray-900">{template.recipients.length}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => generateReport(template.id)}
                        disabled={isGenerating}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all disabled:opacity-50"
                      >
                        {isGenerating ? 'Generating...' : 'Generate Report'}
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Edit Template
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
            Business Intelligence • {kpiMetrics.length} KPIs • {chartData.length} charts • {businessInsights.length} insights
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
                console.log('Exporting business intelligence data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessIntelligence;
