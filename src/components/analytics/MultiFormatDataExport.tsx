/**
 * Multi-Format Data Export System Component
 * 
 * Multiple format support for data analysis
 * Includes CSV, Excel, PDF, JSON, and API export capabilities
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExportFormat {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
  description: string;
  icon: string;
  isSupported: boolean;
  maxRecords: number;
  features: string[];
}

interface ExportJob {
  id: string;
  name: string;
  description: string;
  format: string;
  dataSource: string;
  filters: Record<string, any>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  recordsExported: number;
  totalRecords: number;
  fileSize: number;
  downloadUrl?: string;
  createdAt: string;
  completedAt?: string;
  errorMessage?: string;
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'team' | 'financial' | 'custom';
  format: string;
  dataSource: string;
  filters: Record<string, any>;
  isPublic: boolean;
  isScheduled: boolean;
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    time: string;
    recipients: string[];
  };
  createdAt: string;
  lastUsed: string;
  usageCount: number;
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

interface MultiFormatDataExportProps {
  onClose: () => void;
}

const MultiFormatDataExport: React.FC<MultiFormatDataExportProps> = ({ onClose }) => {
  const [exportFormats, setExportFormats] = useState<ExportFormat[]>([]);
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [exportTemplates, setExportTemplates] = useState<ExportTemplate[]>([]);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'formats' | 'jobs' | 'templates' | 'sources'>('formats');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    loadExportData();
  }, []);

  const loadExportData = async () => {
    setIsLoading(true);
    
    try {
      // Mock export formats
      const mockExportFormats: ExportFormat[] = [
        {
          id: 'format-1',
          name: 'CSV',
          extension: '.csv',
          mimeType: 'text/csv',
          description: 'Comma-separated values for spreadsheet applications',
          icon: '📊',
          isSupported: true,
          maxRecords: 1000000,
          features: ['Large datasets', 'Spreadsheet compatible', 'Universal support']
        },
        {
          id: 'format-2',
          name: 'Excel',
          extension: '.xlsx',
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          description: 'Microsoft Excel format with formatting and charts',
          icon: '📈',
          isSupported: true,
          maxRecords: 1000000,
          features: ['Formatting', 'Charts', 'Multiple sheets', 'Formulas']
        },
        {
          id: 'format-3',
          name: 'PDF',
          extension: '.pdf',
          mimeType: 'application/pdf',
          description: 'Portable Document Format for reports and presentations',
          icon: '📄',
          isSupported: true,
          maxRecords: 10000,
          features: ['Professional formatting', 'Charts and graphs', 'Print ready']
        },
        {
          id: 'format-4',
          name: 'JSON',
          extension: '.json',
          mimeType: 'application/json',
          description: 'JavaScript Object Notation for API integration',
          icon: '🔗',
          isSupported: true,
          maxRecords: 1000000,
          features: ['API integration', 'Structured data', 'Machine readable']
        },
        {
          id: 'format-5',
          name: 'XML',
          extension: '.xml',
          mimeType: 'application/xml',
          description: 'Extensible Markup Language for enterprise systems',
          icon: '📋',
          isSupported: true,
          maxRecords: 1000000,
          features: ['Enterprise integration', 'Structured data', 'Validation']
        },
        {
          id: 'format-6',
          name: 'API',
          extension: 'N/A',
          mimeType: 'application/json',
          description: 'RESTful API endpoint for real-time data access',
          icon: '🔌',
          isSupported: true,
          maxRecords: -1,
          features: ['Real-time access', 'Authentication', 'Rate limiting']
        }
      ];

      // Mock export jobs
      const mockExportJobs: ExportJob[] = [
        {
          id: 'job-1',
          name: 'Productivity Data Export',
          description: 'Export all productivity metrics for Q1 2024',
          format: 'CSV',
          dataSource: 'productivity_database',
          filters: {
            'date_range': '2024-01-01 to 2024-03-31',
            'metrics': ['productivity_score', 'energy_level', 'focus_time'],
            'users': 'all'
          },
          status: 'completed',
          progress: 100,
          recordsExported: 15420,
          totalRecords: 15420,
          fileSize: 2.3,
          downloadUrl: 'https://exports.syncscript.com/job-1.csv',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          completedAt: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: 'job-2',
          name: 'Team Performance Report',
          description: 'Monthly team performance data in Excel format',
          format: 'Excel',
          dataSource: 'team_database',
          filters: {
            'date_range': '2024-03-01 to 2024-03-31',
            'teams': ['development', 'design', 'marketing'],
            'metrics': ['completion_rate', 'collaboration_score']
          },
          status: 'processing',
          progress: 65,
          recordsExported: 3250,
          totalRecords: 5000,
          fileSize: 0,
          createdAt: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: 'job-3',
          name: 'Financial Analytics PDF',
          description: 'Q1 financial performance report',
          format: 'PDF',
          dataSource: 'financial_database',
          filters: {
            'date_range': '2024-01-01 to 2024-03-31',
            'include_charts': true,
            'include_summary': true
          },
          status: 'failed',
          progress: 0,
          recordsExported: 0,
          totalRecords: 5000,
          fileSize: 0,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          errorMessage: 'PDF generation failed due to large dataset size'
        },
        {
          id: 'job-4',
          name: 'API Data Export',
          description: 'Real-time data access via API endpoint',
          format: 'API',
          dataSource: 'analytics_api',
          filters: {
            'endpoint': '/api/v1/analytics',
            'authentication': 'bearer_token',
            'rate_limit': '1000/hour'
          },
          status: 'completed',
          progress: 100,
          recordsExported: -1,
          totalRecords: -1,
          fileSize: 0,
          downloadUrl: 'https://api.syncscript.com/v1/analytics',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          completedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];

      // Mock export templates
      const mockExportTemplates: ExportTemplate[] = [
        {
          id: 'template-1',
          name: 'Monthly Productivity Report',
          description: 'Standard monthly productivity metrics export',
          category: 'productivity',
          format: 'Excel',
          dataSource: 'productivity_database',
          filters: {
            'date_range': 'last_month',
            'metrics': ['productivity_score', 'energy_level', 'focus_time', 'task_completion'],
            'users': 'all',
            'include_charts': true
          },
          isPublic: true,
          isScheduled: true,
          schedule: {
            frequency: 'monthly',
            time: '09:00',
            recipients: ['productivity_team', 'managers']
          },
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          lastUsed: new Date(Date.now() - 172800000).toISOString(),
          usageCount: 12
        },
        {
          id: 'template-2',
          name: 'Team Performance CSV',
          description: 'Team performance data for analysis',
          category: 'team',
          format: 'CSV',
          dataSource: 'team_database',
          filters: {
            'date_range': 'last_quarter',
            'teams': 'all',
            'metrics': ['completion_rate', 'collaboration_score', 'efficiency'],
            'include_user_details': true
          },
          isPublic: false,
          isScheduled: false,
          schedule: {
            frequency: 'quarterly',
            time: '10:00',
            recipients: ['hr_team']
          },
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          lastUsed: new Date(Date.now() - 259200000).toISOString(),
          usageCount: 8
        },
        {
          id: 'template-3',
          name: 'Financial Dashboard PDF',
          description: 'Executive financial performance report',
          category: 'financial',
          format: 'PDF',
          dataSource: 'financial_database',
          filters: {
            'date_range': 'last_month',
            'include_charts': true,
            'include_summary': true,
            'format': 'executive_summary'
          },
          isPublic: false,
          isScheduled: true,
          schedule: {
            frequency: 'monthly',
            time: '08:00',
            recipients: ['executives', 'finance_team']
          },
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          lastUsed: new Date(Date.now() - 345600000).toISOString(),
          usageCount: 15
        }
      ];

      // Mock data sources
      const mockDataSources: DataSource[] = [
        {
          id: 'source-1',
          name: 'Productivity Database',
          type: 'database',
          connection: 'postgresql://productivity.db',
          tables: ['users', 'tasks', 'metrics', 'sessions'],
          fields: {
            'users': ['id', 'name', 'email', 'team', 'role'],
            'tasks': ['id', 'title', 'status', 'priority', 'created_at', 'completed_at'],
            'metrics': ['user_id', 'date', 'productivity_score', 'energy_level', 'focus_time'],
            'sessions': ['user_id', 'start_time', 'end_time', 'duration', 'type']
          },
          lastSync: new Date(Date.now() - 3600000).toISOString(),
          isActive: true
        },
        {
          id: 'source-2',
          name: 'Team Database',
          type: 'database',
          connection: 'mysql://team.db',
          tables: ['teams', 'members', 'collaborations', 'performance'],
          fields: {
            'teams': ['id', 'name', 'description', 'manager_id'],
            'members': ['team_id', 'user_id', 'role', 'joined_at'],
            'collaborations': ['id', 'team_id', 'type', 'duration', 'effectiveness'],
            'performance': ['team_id', 'date', 'score', 'metrics']
          },
          lastSync: new Date(Date.now() - 7200000).toISOString(),
          isActive: true
        },
        {
          id: 'source-3',
          name: 'Financial Database',
          type: 'database',
          connection: 'postgresql://financial.db',
          tables: ['revenue', 'costs', 'subscriptions', 'payments'],
          fields: {
            'revenue': ['id', 'amount', 'date', 'source', 'user_id'],
            'costs': ['id', 'amount', 'date', 'category', 'description'],
            'subscriptions': ['user_id', 'plan', 'status', 'renewal_date', 'amount'],
            'payments': ['id', 'user_id', 'amount', 'date', 'method', 'status']
          },
          lastSync: new Date(Date.now() - 10800000).toISOString(),
          isActive: true
        },
        {
          id: 'source-4',
          name: 'Analytics API',
          type: 'api',
          connection: 'https://api.syncscript.com/analytics',
          tables: ['metrics', 'events', 'insights'],
          fields: {
            'metrics': ['id', 'name', 'value', 'timestamp', 'user_id'],
            'events': ['id', 'type', 'data', 'timestamp', 'user_id'],
            'insights': ['id', 'type', 'confidence', 'recommendations', 'impact']
          },
          lastSync: new Date(Date.now() - 14400000).toISOString(),
          isActive: true
        }
      ];

      setExportFormats(mockExportFormats);
      setExportJobs(mockExportJobs);
      setExportTemplates(mockExportTemplates);
      setDataSources(mockDataSources);
    } catch (error) {
      console.error('Failed to load export data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startExport = async (templateId: string) => {
    setIsExporting(true);
    
    try {
      // Simulate export job creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const template = exportTemplates.find(t => t.id === templateId);
      if (template) {
        const newJob: ExportJob = {
          id: `job-${Date.now()}`,
          name: template.name,
          description: template.description,
          format: template.format,
          dataSource: template.dataSource,
          filters: template.filters,
          status: 'processing',
          progress: 0,
          recordsExported: 0,
          totalRecords: Math.floor(Math.random() * 10000) + 1000,
          fileSize: 0,
          createdAt: new Date().toISOString()
        };
        
        setExportJobs(prev => [newJob, ...prev]);
        console.log('Started export job:', newJob.id);
      }
    } catch (error) {
      console.error('Failed to start export:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'productivity': return 'text-blue-600 bg-blue-100';
      case 'team': return 'text-green-600 bg-green-100';
      case 'financial': return 'text-yellow-600 bg-yellow-100';
      case 'custom': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database': return '🗄️';
      case 'api': return '🔌';
      case 'file': return '📁';
      case 'manual': return '✋';
      default: return '📄';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading data export system...</span>
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
              <h2 className="text-2xl font-bold">Multi-Format Data Export</h2>
              <p className="text-purple-100 mt-1">Multiple format support for data analysis</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Formats:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {exportFormats.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Jobs:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {exportJobs.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Templates:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {exportTemplates.length}
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
              { id: 'formats', name: 'Export Formats', icon: '📊' },
              { id: 'jobs', name: 'Export Jobs', icon: '⚙️' },
              { id: 'templates', name: 'Templates', icon: '📋' },
              { id: 'sources', name: 'Data Sources', icon: '🗄️' }
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
          {selectedTab === 'formats' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Supported Export Formats</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exportFormats.map((format) => (
                  <motion.div
                    key={format.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      format.isSupported 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{format.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{format.name}</h4>
                        <p className="text-sm text-gray-600">{format.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        format.isSupported ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {format.isSupported ? 'SUPPORTED' : 'NOT SUPPORTED'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {format.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Max Records:</div>
                      <div className="text-sm text-gray-600">
                        {format.maxRecords === -1 ? 'Unlimited' : format.maxRecords.toLocaleString()}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">MIME Type:</div>
                      <div className="text-sm text-gray-600 font-mono">{format.mimeType}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'jobs' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Export Jobs</h3>
              
              <div className="space-y-4">
                {exportJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{job.name}</h4>
                        <p className="text-sm text-gray-600">{job.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {job.format}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Progress:</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {job.recordsExported} / {job.totalRecords === -1 ? '∞' : job.totalRecords} records
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                      <div>
                        <span className="text-gray-600">Data Source:</span>
                        <span className="ml-2 text-gray-900">{job.dataSource}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">File Size:</span>
                        <span className="ml-2 text-gray-900">
                          {job.fileSize > 0 ? `${job.fileSize} MB` : 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    {job.errorMessage && (
                      <div className="mt-3 p-2 bg-red-100 text-red-800 rounded text-sm">
                        Error: {job.errorMessage}
                      </div>
                    )}
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {job.status === 'completed' && job.downloadUrl && (
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                          Download
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

          {selectedTab === 'templates' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Export Templates</h3>
              
              <div className="space-y-4">
                {exportTemplates.map((template) => (
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
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(template.category)}`}>
                          {template.category.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {template.format}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Filters:</div>
                      <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded">
                        {JSON.stringify(template.filters, null, 2)}
                      </div>
                      
                      {template.isScheduled && (
                        <>
                          <div className="text-sm font-medium text-gray-700">Schedule:</div>
                          <div className="text-sm text-gray-600">
                            {template.schedule.frequency} at {template.schedule.time} to {template.schedule.recipients.length} recipients
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Usage Count:</span>
                        <span className="ml-2 text-gray-900">{template.usageCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Used:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(template.lastUsed).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => startExport(template.id)}
                        disabled={isExporting}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all disabled:opacity-50"
                      >
                        {isExporting ? 'Starting...' : 'Start Export'}
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Edit
                      </button>
                    </div>
                  </motion.div>
                ))}
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
            Multi-Format Data Export • {exportFormats.length} formats • {exportJobs.length} jobs • {exportTemplates.length} templates
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
                console.log('Exporting data export system...');
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

export default MultiFormatDataExport;
