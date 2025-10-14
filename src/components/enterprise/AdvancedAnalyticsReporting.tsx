/**
 * Advanced Analytics & Reporting Component
 * 
 * Comprehensive analytics dashboard with custom reports and data export
 * Includes business intelligence, performance metrics, and predictive analytics
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: 'productivity' | 'engagement' | 'performance' | 'business';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

interface CustomReport {
  id: string;
  name: string;
  description: string;
  metrics: string[];
  filters: ReportFilter[];
  schedule: 'manual' | 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  lastGenerated?: string;
  status: 'active' | 'inactive' | 'error';
}

interface ReportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between';
  value: any;
}

interface DataExport {
  id: string;
  name: string;
  format: 'csv' | 'xlsx' | 'json' | 'pdf';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  size?: number;
}

interface AdvancedAnalyticsReportingProps {
  onClose: () => void;
}

const AdvancedAnalyticsReporting: React.FC<AdvancedAnalyticsReportingProps> = ({ onClose }) => {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [customReports, setCustomReports] = useState<CustomReport[]>([]);
  const [dataExports, setDataExports] = useState<DataExport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'reports' | 'exports' | 'insights'>('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    
    try {
      // Mock analytics metrics
      const mockMetrics: AnalyticsMetric[] = [
        {
          id: 'metric-1',
          name: 'Total Tasks Completed',
          value: 15420,
          change: 12.5,
          trend: 'up',
          category: 'productivity',
          period: 'monthly'
        },
        {
          id: 'metric-2',
          name: 'Average Energy Level',
          value: 7.8,
          change: 2.3,
          trend: 'up',
          category: 'engagement',
          period: 'monthly'
        },
        {
          id: 'metric-3',
          name: 'User Engagement Rate',
          value: 89.2,
          change: -1.2,
          trend: 'down',
          category: 'engagement',
          period: 'monthly'
        },
        {
          id: 'metric-4',
          name: 'System Performance Score',
          value: 98.5,
          change: 0.5,
          trend: 'up',
          category: 'performance',
          period: 'monthly'
        },
        {
          id: 'metric-5',
          name: 'Revenue Growth',
          value: 25.8,
          change: 8.7,
          trend: 'up',
          category: 'business',
          period: 'monthly'
        },
        {
          id: 'metric-6',
          name: 'Customer Satisfaction',
          value: 4.6,
          change: 0.1,
          trend: 'up',
          category: 'business',
          period: 'monthly'
        }
      ];

      // Mock custom reports
      const mockReports: CustomReport[] = [
        {
          id: 'report-1',
          name: 'Monthly Productivity Report',
          description: 'Comprehensive productivity metrics and insights',
          metrics: ['tasks_completed', 'energy_levels', 'focus_time'],
          filters: [
            { field: 'date_range', operator: 'between', value: ['2024-01-01', '2024-01-31'] },
            { field: 'department', operator: 'equals', value: 'all' }
          ],
          schedule: 'monthly',
          recipients: ['admin@company.com', 'manager@company.com'],
          lastGenerated: new Date(Date.now() - 86400000).toISOString(),
          status: 'active'
        },
        {
          id: 'report-2',
          name: 'User Engagement Analysis',
          description: 'Detailed analysis of user engagement patterns',
          metrics: ['login_frequency', 'session_duration', 'feature_usage'],
          filters: [
            { field: 'user_status', operator: 'equals', value: 'active' }
          ],
          schedule: 'weekly',
          recipients: ['analytics@company.com'],
          lastGenerated: new Date(Date.now() - 172800000).toISOString(),
          status: 'active'
        }
      ];

      // Mock data exports
      const mockExports: DataExport[] = [
        {
          id: 'export-1',
          name: 'User Data Export',
          format: 'csv',
          status: 'completed',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          completedAt: new Date(Date.now() - 3500000).toISOString(),
          downloadUrl: 'https://example.com/exports/user-data.csv',
          size: 2.5
        },
        {
          id: 'export-2',
          name: 'Analytics Report',
          format: 'pdf',
          status: 'processing',
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          size: 0
        }
      ];

      setMetrics(mockMetrics);
      setCustomReports(mockReports);
      setDataExports(mockExports);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomReport = async (report: Omit<CustomReport, 'id' | 'lastGenerated'>) => {
    try {
      const newReport: CustomReport = {
        ...report,
        id: `report_${Date.now()}`,
        lastGenerated: undefined
      };
      
      setCustomReports(prev => [...prev, newReport]);
    } catch (error) {
      console.error('Failed to create custom report:', error);
    }
  };

  const generateDataExport = async (exportConfig: Omit<DataExport, 'id' | 'createdAt' | 'status'>) => {
    try {
      const newExport: DataExport = {
        ...exportConfig,
        id: `export_${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'processing'
      };
      
      setDataExports(prev => [newExport, ...prev]);
      
      // Simulate export processing
      setTimeout(() => {
        setDataExports(prev => prev.map(exp => 
          exp.id === newExport.id 
            ? { 
                ...exp, 
                status: 'completed',
                completedAt: new Date().toISOString(),
                downloadUrl: `https://example.com/exports/${exp.name.toLowerCase().replace(/\s+/g, '-')}.${exp.format}`,
                size: Math.random() * 10 + 1
              }
            : exp
        ));
      }, 5000);
      
    } catch (error) {
      console.error('Failed to generate data export:', error);
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

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'productivity': return '📊';
      case 'engagement': return '👥';
      case 'performance': return '⚡';
      case 'business': return '💰';
      default: return '📈';
    }
  };

  const filteredMetrics = metrics.filter(metric => metric.period === selectedPeriod);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading analytics...</span>
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
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Advanced Analytics & Reporting</h2>
              <p className="text-purple-100 mt-1">Business intelligence, custom reports, and data export</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Metrics:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {metrics.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Reports:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {customReports.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Exports:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {dataExports.length}
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
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'reports', name: 'Custom Reports', icon: '📋' },
              { id: 'exports', name: 'Data Export', icon: '📤' },
              { id: 'insights', name: 'Insights', icon: '💡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-purple-500 text-purple-600'
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
          {selectedTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMetrics.map((metric) => (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">{getCategoryIcon(metric.category)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{metric.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{metric.category}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-gray-900">
                        {typeof metric.value === 'number' && metric.value < 100 
                          ? metric.value.toFixed(1) 
                          : metric.value.toLocaleString()}
                      </div>
                      <div className={`text-sm font-medium flex items-center gap-1 ${getTrendColor(metric.trend, metric.change)}`}>
                        <span>{getTrendIcon(metric.trend)}</span>
                        <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                        <span className="text-gray-500">vs last {selectedPeriod}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Custom Reports</h3>
                <button
                  onClick={() => {
                    createCustomReport({
                      name: 'New Custom Report',
                      description: 'Custom analytics report',
                      metrics: ['tasks_completed', 'energy_levels'],
                      filters: [],
                      schedule: 'manual',
                      recipients: [],
                      status: 'active'
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Report
                </button>
              </div>
              
              <div className="space-y-4">
                {customReports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Schedule:</span>
                        <span className="ml-2 text-gray-900 capitalize">{report.schedule}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Recipients:</span>
                        <span className="ml-2 text-gray-900">{report.recipients.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Metrics:</span>
                        <span className="ml-2 text-gray-900">{report.metrics.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Generated:</span>
                        <span className="ml-2 text-gray-900">
                          {report.lastGenerated ? new Date(report.lastGenerated).toLocaleString() : 'Never'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Generate Now
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Edit
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'exports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Data Export</h3>
                <button
                  onClick={() => {
                    generateDataExport({
                      name: 'Custom Data Export',
                      format: 'csv'
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  New Export
                </button>
              </div>
              
              <div className="space-y-4">
                {dataExports.map((exportItem) => (
                  <motion.div
                    key={exportItem.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{exportItem.name}</h4>
                        <p className="text-sm text-gray-600">
                          {exportItem.format.toUpperCase()} • {exportItem.size ? `${exportItem.size}MB` : 'Processing...'}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(exportItem.status)}`}>
                        {exportItem.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <span className="ml-2 text-gray-900">{new Date(exportItem.createdAt).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Completed:</span>
                        <span className="ml-2 text-gray-900">
                          {exportItem.completedAt ? new Date(exportItem.completedAt).toLocaleString() : 'In progress...'}
                        </span>
                      </div>
                    </div>
                    
                    {exportItem.status === 'completed' && exportItem.downloadUrl && (
                      <div className="mt-3">
                        <a
                          href={exportItem.downloadUrl}
                          download
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all"
                        >
                          Download
                        </a>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">💡</span>
                    <h4 className="font-medium text-gray-900">Productivity Insights</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="text-gray-700">
                      • Users are 23% more productive on Tuesday mornings
                    </div>
                    <div className="text-gray-700">
                      • Energy levels peak between 10-11 AM
                    </div>
                    <div className="text-gray-700">
                      • Focus time increases by 15% with background music
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">📈</span>
                    <h4 className="font-medium text-gray-900">Performance Trends</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="text-gray-700">
                      • Task completion rate up 12% this month
                    </div>
                    <div className="text-gray-700">
                      • Average session duration increased by 8 minutes
                    </div>
                    <div className="text-gray-700">
                      • User satisfaction score: 4.6/5.0
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">🎯</span>
                    <h4 className="font-medium text-gray-900">Recommendations</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="text-gray-700">
                      • Consider implementing focus mode notifications
                    </div>
                    <div className="text-gray-700">
                      • Schedule important tasks for Tuesday mornings
                    </div>
                    <div className="text-gray-700">
                      • Enable energy tracking for better insights
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">⚠️</span>
                    <h4 className="font-medium text-gray-900">Alerts & Warnings</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="text-gray-700">
                      • 3 users haven't logged in for 7+ days
                    </div>
                    <div className="text-gray-700">
                      • Storage usage approaching 80% capacity
                    </div>
                    <div className="text-gray-700">
                      • API rate limit usage at 75%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Advanced Analytics & Reporting • {metrics.length} metrics • {customReports.length} reports • {dataExports.length} exports
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
                console.log('Exporting analytics data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedAnalyticsReporting;
