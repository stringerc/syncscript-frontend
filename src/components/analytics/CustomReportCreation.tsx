/**
 * Custom Report Creation System Component
 * 
 * Personalized analytics and reporting
 * Includes drag-and-drop report builder, custom metrics, and scheduled reports
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomMetric {
  id: string;
  name: string;
  description: string;
  type: 'number' | 'percentage' | 'currency' | 'ratio' | 'score';
  formula: string;
  dataSource: string;
  category: 'productivity' | 'team' | 'financial' | 'operational';
  isCalculated: boolean;
  lastCalculated: string;
  value: number;
  unit: string;
}

interface ReportWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'text' | 'image';
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  config: Record<string, any>;
  data: any[];
  isVisible: boolean;
}

interface CustomReport {
  id: string;
  name: string;
  description: string;
  category: 'executive' | 'operational' | 'financial' | 'custom';
  widgets: ReportWidget[];
  layout: 'grid' | 'freeform' | 'dashboard';
  theme: 'light' | 'dark' | 'corporate' | 'modern';
  isPublic: boolean;
  isScheduled: boolean;
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    time: string;
    recipients: string[];
  };
  createdAt: string;
  lastModified: string;
  lastGenerated: string;
}

interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'manual';
  connection: string;
  tables: string[];
  fields: Record<string, string[]>;
  lastSync: string;
  isActive: boolean;
}

interface CustomReportCreationProps {
  onClose: () => void;
}

const CustomReportCreation: React.FC<CustomReportCreationProps> = ({ onClose }) => {
  const [customMetrics, setCustomMetrics] = useState<CustomMetric[]>([]);
  const [reportWidgets, setReportWidgets] = useState<ReportWidget[]>([]);
  const [customReports, setCustomReports] = useState<CustomReport[]>([]);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'metrics' | 'widgets' | 'reports' | 'sources'>('metrics');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadCustomReportData();
  }, []);

  const loadCustomReportData = async () => {
    setIsLoading(true);
    
    try {
      // Mock custom metrics
      const mockCustomMetrics: CustomMetric[] = [
        {
          id: 'metric-1',
          name: 'Team Efficiency Ratio',
          description: 'Ratio of completed tasks to assigned tasks per team member',
          type: 'ratio',
          formula: 'completed_tasks / assigned_tasks',
          dataSource: 'task_database',
          category: 'team',
          isCalculated: true,
          lastCalculated: new Date(Date.now() - 3600000).toISOString(),
          value: 0.87,
          unit: 'ratio'
        },
        {
          id: 'metric-2',
          name: 'Productivity Growth Rate',
          description: 'Month-over-month productivity improvement percentage',
          type: 'percentage',
          formula: '(current_productivity - previous_productivity) / previous_productivity * 100',
          dataSource: 'productivity_api',
          category: 'productivity',
          isCalculated: true,
          lastCalculated: new Date(Date.now() - 7200000).toISOString(),
          value: 12.5,
          unit: '%'
        },
        {
          id: 'metric-3',
          name: 'Cost per Task',
          description: 'Average cost to complete a single task',
          type: 'currency',
          formula: 'total_costs / completed_tasks',
          dataSource: 'financial_database',
          category: 'financial',
          isCalculated: true,
          lastCalculated: new Date(Date.now() - 10800000).toISOString(),
          value: 25.50,
          unit: '$'
        },
        {
          id: 'metric-4',
          name: 'Customer Satisfaction Index',
          description: 'Weighted average of customer satisfaction scores',
          type: 'score',
          formula: 'weighted_average(satisfaction_scores)',
          dataSource: 'survey_database',
          category: 'operational',
          isCalculated: true,
          lastCalculated: new Date(Date.now() - 14400000).toISOString(),
          value: 4.7,
          unit: '/5'
        }
      ];

      // Mock report widgets
      const mockReportWidgets: ReportWidget[] = [
        {
          id: 'widget-1',
          type: 'metric',
          title: 'Productivity Score',
          position: { x: 0, y: 0 },
          size: { width: 200, height: 150 },
          config: {
            'metric_id': 'productivity_score',
            'display_format': 'large_number',
            'show_trend': true,
            'color_scheme': 'blue'
          },
          data: [{ value: 87.5, trend: 'up', change: 12.3 }],
          isVisible: true
        },
        {
          id: 'widget-2',
          type: 'chart',
          title: 'Task Completion Trends',
          position: { x: 220, y: 0 },
          size: { width: 300, height: 200 },
          config: {
            'chart_type': 'line',
            'x_axis': 'date',
            'y_axis': 'completion_rate',
            'show_grid': true,
            'show_legend': true
          },
          data: [
            { date: '2024-01-01', completion_rate: 75.2 },
            { date: '2024-01-02', completion_rate: 78.9 },
            { date: '2024-01-03', completion_rate: 82.1 }
          ],
          isVisible: true
        },
        {
          id: 'widget-3',
          type: 'table',
          title: 'Team Performance',
          position: { x: 0, y: 170 },
          size: { width: 400, height: 250 },
          config: {
            'columns': ['team', 'score', 'tasks', 'efficiency'],
            'sortable': true,
            'filterable': true,
            'pagination': true
          },
          data: [
            { team: 'Development', score: 92.5, tasks: 45, efficiency: 94.2 },
            { team: 'Design', score: 88.3, tasks: 32, efficiency: 89.7 },
            { team: 'Marketing', score: 85.7, tasks: 28, efficiency: 87.3 }
          ],
          isVisible: true
        },
        {
          id: 'widget-4',
          type: 'text',
          title: 'Executive Summary',
          position: { x: 420, y: 170 },
          size: { width: 200, height: 150 },
          config: {
            'font_size': 'medium',
            'text_align': 'left',
            'background_color': '#f8f9fa',
            'border_radius': '8px'
          },
          data: [{ text: 'Productivity has increased by 12.3% this month...' }],
          isVisible: true
        }
      ];

      // Mock custom reports
      const mockCustomReports: CustomReport[] = [
        {
          id: 'report-1',
          name: 'Executive Productivity Dashboard',
          description: 'Comprehensive productivity metrics for executive review',
          category: 'executive',
          widgets: mockReportWidgets.slice(0, 2),
          layout: 'dashboard',
          theme: 'corporate',
          isPublic: false,
          isScheduled: true,
          schedule: {
            frequency: 'weekly',
            time: '09:00',
            recipients: ['CEO', 'CTO', 'VP_Product']
          },
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          lastModified: new Date(Date.now() - 3600000).toISOString(),
          lastGenerated: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'report-2',
          name: 'Team Performance Analysis',
          description: 'Detailed team performance and collaboration metrics',
          category: 'operational',
          widgets: mockReportWidgets.slice(2, 4),
          layout: 'grid',
          theme: 'modern',
          isPublic: true,
          isScheduled: false,
          schedule: {
            frequency: 'monthly',
            time: '10:00',
            recipients: ['Team_Leads', 'HR_Director']
          },
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          lastModified: new Date(Date.now() - 7200000).toISOString(),
          lastGenerated: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: 'report-3',
          name: 'Financial Performance Report',
          description: 'Revenue, costs, and profitability analysis',
          category: 'financial',
          widgets: mockReportWidgets.slice(0, 3),
          layout: 'freeform',
          theme: 'light',
          isPublic: false,
          isScheduled: true,
          schedule: {
            frequency: 'monthly',
            time: '08:00',
            recipients: ['CFO', 'Finance_Team']
          },
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          lastModified: new Date(Date.now() - 10800000).toISOString(),
          lastGenerated: new Date(Date.now() - 345600000).toISOString()
        }
      ];

      // Mock data sources
      const mockDataSources: DataSource[] = [
        {
          id: 'source-1',
          name: 'Task Database',
          type: 'database',
          connection: 'postgresql://tasks.db',
          tables: ['tasks', 'users', 'projects', 'teams'],
          fields: {
            'tasks': ['id', 'title', 'status', 'priority', 'created_at', 'completed_at'],
            'users': ['id', 'name', 'email', 'role', 'team_id'],
            'projects': ['id', 'name', 'description', 'status', 'deadline'],
            'teams': ['id', 'name', 'description', 'members']
          },
          lastSync: new Date(Date.now() - 3600000).toISOString(),
          isActive: true
        },
        {
          id: 'source-2',
          name: 'Productivity API',
          type: 'api',
          connection: 'https://api.syncscript.com/productivity',
          tables: ['metrics', 'analytics', 'insights'],
          fields: {
            'metrics': ['productivity_score', 'energy_level', 'focus_time'],
            'analytics': ['user_id', 'timestamp', 'activity', 'duration'],
            'insights': ['type', 'confidence', 'recommendations', 'impact']
          },
          lastSync: new Date(Date.now() - 7200000).toISOString(),
          isActive: true
        },
        {
          id: 'source-3',
          name: 'Financial Database',
          type: 'database',
          connection: 'mysql://financial.db',
          tables: ['revenue', 'costs', 'subscriptions', 'payments'],
          fields: {
            'revenue': ['amount', 'date', 'source', 'user_id'],
            'costs': ['amount', 'date', 'category', 'description'],
            'subscriptions': ['user_id', 'plan', 'status', 'renewal_date'],
            'payments': ['user_id', 'amount', 'date', 'method', 'status']
          },
          lastSync: new Date(Date.now() - 10800000).toISOString(),
          isActive: true
        },
        {
          id: 'source-4',
          name: 'Survey Data',
          type: 'file',
          connection: 'csv://surveys.csv',
          tables: ['responses', 'questions', 'users'],
          fields: {
            'responses': ['user_id', 'question_id', 'answer', 'timestamp'],
            'questions': ['id', 'text', 'type', 'category'],
            'users': ['id', 'email', 'demographics', 'satisfaction_score']
          },
          lastSync: new Date(Date.now() - 14400000).toISOString(),
          isActive: false
        }
      ];

      setCustomMetrics(mockCustomMetrics);
      setReportWidgets(mockReportWidgets);
      setCustomReports(mockCustomReports);
      setDataSources(mockDataSources);
    } catch (error) {
      console.error('Failed to load custom report data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomReport = async () => {
    setIsCreating(true);
    
    try {
      // Simulate report creation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newReport: CustomReport = {
        id: `report-${Date.now()}`,
        name: 'New Custom Report',
        description: 'Custom report created by user',
        category: 'custom',
        widgets: [],
        layout: 'grid',
        theme: 'light',
        isPublic: false,
        isScheduled: false,
        schedule: {
          frequency: 'monthly',
          time: '09:00',
          recipients: []
        },
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        lastGenerated: new Date().toISOString()
      };
      
      setCustomReports(prev => [...prev, newReport]);
      console.log('Created custom report:', newReport.id);
    } catch (error) {
      console.error('Failed to create custom report:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'number': return '🔢';
      case 'percentage': return '📊';
      case 'currency': return '💰';
      case 'ratio': return '⚖️';
      case 'score': return '⭐';
      case 'metric': return '📈';
      case 'chart': return '📊';
      case 'table': return '📋';
      case 'text': return '📝';
      case 'image': return '🖼️';
      case 'database': return '🗄️';
      case 'api': return '🔌';
      case 'file': return '📁';
      case 'manual': return '✋';
      default: return '📄';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'productivity': return 'text-blue-600 bg-blue-100';
      case 'team': return 'text-green-600 bg-green-100';
      case 'financial': return 'text-yellow-600 bg-yellow-100';
      case 'operational': return 'text-purple-600 bg-purple-100';
      case 'executive': return 'text-red-600 bg-red-100';
      case 'custom': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'light': return 'text-gray-600 bg-gray-100';
      case 'dark': return 'text-gray-800 bg-gray-200';
      case 'corporate': return 'text-blue-600 bg-blue-100';
      case 'modern': return 'text-purple-600 bg-purple-100';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading custom report creation...</span>
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
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Custom Report Creation</h2>
              <p className="text-green-100 mt-1">Personalized analytics and reporting</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Metrics:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {customMetrics.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Widgets:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {reportWidgets.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Reports:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {customReports.length}
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
              { id: 'metrics', name: 'Custom Metrics', icon: '📊' },
              { id: 'widgets', name: 'Report Widgets', icon: '🧩' },
              { id: 'reports', name: 'Custom Reports', icon: '📋' },
              { id: 'sources', name: 'Data Sources', icon: '🗄️' }
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
          {selectedTab === 'metrics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Custom Metrics</h3>
              
              <div className="space-y-4">
                {customMetrics.map((metric) => (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getTypeIcon(metric.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{metric.name}</h4>
                        <p className="text-sm text-gray-600">{metric.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(metric.category)}`}>
                        {metric.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Formula:</div>
                      <div className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                        {metric.formula}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Data Source:</span>
                          <span className="ml-2 text-gray-900">{metric.dataSource}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Current Value:</span>
                          <span className="ml-2 text-gray-900">{metric.value} {metric.unit}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        Last Calculated: {new Date(metric.lastCalculated).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Recalculate
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'widgets' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Report Widgets</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportWidgets.map((widget) => (
                  <motion.div
                    key={widget.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getTypeIcon(widget.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{widget.title}</h4>
                        <p className="text-sm text-gray-600 capitalize">{widget.type} widget</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        widget.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {widget.isVisible ? 'VISIBLE' : 'HIDDEN'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Position:</div>
                      <div className="text-sm text-gray-600">
                        ({widget.position.x}, {widget.position.y}) - {widget.size.width}×{widget.size.height}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Configuration:</div>
                      <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded">
                        {JSON.stringify(widget.config, null, 2)}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Preview
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Custom Reports</h3>
              
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
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(report.category)}`}>
                          {report.category.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getThemeColor(report.theme)}`}>
                          {report.theme.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Layout:</div>
                      <div className="text-sm text-gray-600 capitalize">{report.layout}</div>
                      
                      <div className="text-sm font-medium text-gray-700">Widgets:</div>
                      <div className="text-sm text-gray-600">{report.widgets.length} widgets</div>
                      
                      {report.isScheduled && (
                        <div className="text-sm font-medium text-gray-700">Schedule:</div>
                        <div className="text-sm text-gray-600">
                          {report.schedule.frequency} at {report.schedule.time} to {report.schedule.recipients.length} recipients
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Modified:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(report.lastModified).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Generate
                      </button>
                      <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all">
                        Share
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6">
                <button
                  onClick={createCustomReport}
                  disabled={isCreating}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all disabled:opacity-50"
                >
                  {isCreating ? 'Creating...' : 'Create New Custom Report'}
                </button>
              </div>
            </div>
          )}

          {selectedTab === 'sources' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Data Sources</h3>
              
              <div className="space-y-4">
                {dataSources.map((source) => (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      source.isActive 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getTypeIcon(source.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{source.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{source.type} connection</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          source.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {source.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {source.tables.length} tables
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Connection:</div>
                      <div className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                        {source.connection}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Tables:</div>
                      <div className="flex flex-wrap gap-1">
                        {source.tables.map((table, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {table}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        Last Sync: {new Date(source.lastSync).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Test Connection
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Sync Now
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
            Custom Report Creation • {customMetrics.length} metrics • {reportWidgets.length} widgets • {customReports.length} reports
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
                console.log('Exporting custom report data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomReportCreation;
