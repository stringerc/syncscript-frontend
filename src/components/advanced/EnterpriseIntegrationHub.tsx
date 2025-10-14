import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Integration {
  id: string;
  name: string;
  category: 'productivity' | 'communication' | 'development' | 'marketing' | 'finance' | 'analytics';
  description: string;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  apiVersion: string;
  lastSync: Date;
  syncFrequency: string;
  dataTransferred: number;
  errorCount: number;
  configuration: Record<string, any>;
  permissions: string[];
  webhookUrl: string;
  rateLimit: {
    requests: number;
    period: string;
    remaining: number;
  };
}

interface IntegrationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  setupSteps: string[];
  estimatedTime: number;
  popularity: number;
  features: string[];
  pricing: 'free' | 'paid' | 'freemium';
}

interface DataMapping {
  id: string;
  sourceField: string;
  targetField: string;
  transformation: string;
  required: boolean;
  dataType: string;
}

interface SyncLog {
  id: string;
  integrationId: string;
  timestamp: Date;
  status: 'success' | 'error' | 'warning';
  recordsProcessed: number;
  duration: number;
  errorMessage: string | null;
  data: Record<string, any>;
}

const EnterpriseIntegrationHub: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [templates, setTemplates] = useState<IntegrationTemplate[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isConnectingIntegration, setIsConnectingIntegration] = useState(false);
  const [isSyncingData, setIsSyncingData] = useState(false);

  // Generate integration data
  useEffect(() => {
    const generateIntegrations = (): Integration[] => {
      const integrationData = [
        {
          name: 'Slack',
          category: 'communication' as const,
          description: 'Team communication and collaboration platform',
          status: 'connected' as const,
          apiVersion: 'v1.0',
          syncFrequency: 'real-time',
          dataTransferred: 1024000,
          errorCount: 2,
          permissions: ['read:channels', 'write:messages', 'read:users'],
          webhookUrl: 'https://hooks.slack.com/services/...',
          rateLimit: { requests: 1000, period: 'hour', remaining: 850 }
        },
        {
          name: 'Microsoft Teams',
          category: 'communication' as const,
          description: 'Enterprise communication and collaboration',
          status: 'connected' as const,
          apiVersion: 'v2.0',
          syncFrequency: '5min',
          dataTransferred: 2048000,
          errorCount: 0,
          permissions: ['read:teams', 'write:messages', 'read:members'],
          webhookUrl: 'https://teams.microsoft.com/webhook/...',
          rateLimit: { requests: 500, period: 'hour', remaining: 420 }
        },
        {
          name: 'GitHub',
          category: 'development' as const,
          description: 'Code repository and project management',
          status: 'connected' as const,
          apiVersion: 'v4',
          syncFrequency: '15min',
          dataTransferred: 512000,
          errorCount: 1,
          permissions: ['read:repo', 'write:issues', 'read:commits'],
          webhookUrl: 'https://api.github.com/webhooks/...',
          rateLimit: { requests: 5000, period: 'hour', remaining: 4800 }
        },
        {
          name: 'Salesforce',
          category: 'marketing' as const,
          description: 'Customer relationship management platform',
          status: 'error' as const,
          apiVersion: 'v52.0',
          syncFrequency: '1hour',
          dataTransferred: 0,
          errorCount: 15,
          permissions: ['read:contacts', 'write:leads', 'read:accounts'],
          webhookUrl: 'https://salesforce.com/webhook/...',
          rateLimit: { requests: 10000, period: 'day', remaining: 8500 }
        },
        {
          name: 'HubSpot',
          category: 'marketing' as const,
          description: 'Marketing automation and CRM platform',
          status: 'pending' as const,
          apiVersion: 'v3',
          syncFrequency: '30min',
          dataTransferred: 0,
          errorCount: 0,
          permissions: ['read:contacts', 'write:deals', 'read:companies'],
          webhookUrl: 'https://api.hubspot.com/webhooks/...',
          rateLimit: { requests: 100, period: '10seconds', remaining: 100 }
        },
        {
          name: 'Google Analytics',
          category: 'analytics' as const,
          description: 'Web analytics and reporting platform',
          status: 'connected' as const,
          apiVersion: 'v4',
          syncFrequency: '1hour',
          dataTransferred: 256000,
          errorCount: 0,
          permissions: ['read:analytics', 'read:reports'],
          webhookUrl: 'https://analytics.google.com/webhook/...',
          rateLimit: { requests: 10000, period: 'day', remaining: 9200 }
        },
        {
          name: 'Jira',
          category: 'productivity' as const,
          description: 'Project management and issue tracking',
          status: 'connected' as const,
          apiVersion: 'v3',
          syncFrequency: '10min',
          dataTransferred: 768000,
          errorCount: 3,
          permissions: ['read:issues', 'write:comments', 'read:projects'],
          webhookUrl: 'https://atlassian.net/webhook/...',
          rateLimit: { requests: 1000, period: 'hour', remaining: 750 }
        },
        {
          name: 'Stripe',
          category: 'finance' as const,
          description: 'Payment processing and financial data',
          status: 'connected' as const,
          apiVersion: 'v2020-08-27',
          syncFrequency: 'real-time',
          dataTransferred: 128000,
          errorCount: 0,
          permissions: ['read:charges', 'read:customers', 'read:invoices'],
          webhookUrl: 'https://api.stripe.com/webhooks/...',
          rateLimit: { requests: 100, period: 'second', remaining: 95 }
        }
      ];

      return integrationData.map((integration, index) => ({
        id: `integration-${index}`,
        ...integration,
        lastSync: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        configuration: {
          apiKey: '***hidden***',
          endpoint: `https://api.${integration.name.toLowerCase()}.com`,
          timeout: 30000,
          retries: 3
        }
      }));
    };

    const generateTemplates = (): IntegrationTemplate[] => {
      const templateData = [
        {
          name: 'Zapier',
          description: 'Automation platform connecting 5000+ apps',
          category: 'productivity',
          icon: '⚡',
          setupSteps: ['Connect account', 'Select triggers', 'Configure actions'],
          estimatedTime: 10,
          popularity: 95,
          features: ['Multi-step workflows', 'Conditional logic', 'Data transformation'],
          pricing: 'freemium'
        },
        {
          name: 'Notion',
          description: 'All-in-one workspace for notes and collaboration',
          category: 'productivity',
          icon: '📝',
          setupSteps: ['Authenticate', 'Select workspace', 'Configure sync'],
          estimatedTime: 5,
          popularity: 88,
          features: ['Real-time sync', 'Rich content', 'Team collaboration'],
          pricing: 'freemium'
        },
        {
          name: 'Figma',
          description: 'Collaborative design and prototyping tool',
          category: 'development',
          icon: '🎨',
          setupSteps: ['Connect team', 'Select projects', 'Set permissions'],
          estimatedTime: 8,
          popularity: 82,
          features: ['Design sync', 'Version control', 'Comment integration'],
          pricing: 'paid'
        },
        {
          name: 'Mailchimp',
          description: 'Email marketing and automation platform',
          category: 'marketing',
          icon: '📧',
          setupSteps: ['Connect account', 'Import contacts', 'Set up campaigns'],
          estimatedTime: 15,
          popularity: 76,
          features: ['Email automation', 'Audience segmentation', 'Analytics'],
          pricing: 'freemium'
        },
        {
          name: 'QuickBooks',
          description: 'Accounting and financial management software',
          category: 'finance',
          icon: '💰',
          setupSteps: ['Connect business', 'Sync transactions', 'Configure reports'],
          estimatedTime: 20,
          popularity: 71,
          features: ['Financial sync', 'Invoice management', 'Tax reporting'],
          pricing: 'paid'
        },
        {
          name: 'Mixpanel',
          description: 'Advanced analytics and user behavior tracking',
          category: 'analytics',
          icon: '📊',
          setupSteps: ['Install SDK', 'Configure events', 'Set up funnels'],
          estimatedTime: 12,
          popularity: 69,
          features: ['Event tracking', 'Funnel analysis', 'Cohort analysis'],
          pricing: 'freemium'
        }
      ];

      return templateData.map((template, index) => ({
        id: `template-${index}`,
        ...template
      }));
    };

    const generateSyncLogs = (): SyncLog[] => {
      const logs: SyncLog[] = [];
      for (let i = 0; i < 50; i++) {
        const statuses: SyncLog['status'][] = ['success', 'error', 'warning'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const integrationId = `integration-${Math.floor(Math.random() * 8)}`;
        const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);

        logs.push({
          id: `log-${i}`,
          integrationId,
          timestamp,
          status,
          recordsProcessed: Math.floor(Math.random() * 1000) + 10,
          duration: Math.random() * 5000 + 500,
          errorMessage: status === 'error' ? 'Connection timeout' : null,
          data: { source: 'external', target: 'syncscript' }
        });
      }

      return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    setIntegrations(generateIntegrations());
    setTemplates(generateTemplates());
    setSyncLogs(generateSyncLogs());
  }, []);

  const filteredIntegrations = integrations.filter(integration => 
    (selectedCategory === 'all' || integration.category === selectedCategory) &&
    (selectedStatus === 'all' || integration.status === selectedStatus)
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'productivity': return 'bg-blue-100 text-blue-800';
      case 'communication': return 'bg-green-100 text-green-800';
      case 'development': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-orange-100 text-orange-800';
      case 'finance': return 'bg-indigo-100 text-indigo-800';
      case 'analytics': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLogStatusColor = (status: string): string => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPricingColor = (pricing: string): string => {
    switch (pricing) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-red-100 text-red-800';
      case 'freemium': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const connectIntegration = async (templateId: string) => {
    setIsConnectingIntegration(true);
    
    // Simulate integration connection
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newIntegration: Integration = {
        id: `integration-${Date.now()}`,
        name: template.name,
        category: template.category as any,
        description: template.description,
        status: 'connected',
        apiVersion: 'v1.0',
        lastSync: new Date(),
        syncFrequency: '1hour',
        dataTransferred: 0,
        errorCount: 0,
        configuration: { apiKey: '***hidden***' },
        permissions: ['read:basic'],
        webhookUrl: `https://api.${template.name.toLowerCase()}.com/webhook`,
        rateLimit: { requests: 1000, period: 'hour', remaining: 1000 }
      };

      setIntegrations(prev => [newIntegration, ...prev]);
    }
    
    setIsConnectingIntegration(false);
  };

  const syncData = async (integrationId: string) => {
    setIsSyncingData(true);
    
    // Simulate data sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newLog: SyncLog = {
      id: `log-${Date.now()}`,
      integrationId,
      timestamp: new Date(),
      status: 'success',
      recordsProcessed: Math.floor(Math.random() * 500) + 50,
      duration: Math.random() * 3000 + 1000,
      errorMessage: null,
      data: { syncType: 'manual', records: 'updated' }
    };

    setSyncLogs(prev => [newLog, ...prev]);
    setIsSyncingData(false);
  };

  const disconnectIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'disconnected' }
        : integration
    ));
  };

  const categories = [
    { key: 'all', label: 'All Categories', count: integrations.length },
    { key: 'productivity', label: 'Productivity', count: integrations.filter(i => i.category === 'productivity').length },
    { key: 'communication', label: 'Communication', count: integrations.filter(i => i.category === 'communication').length },
    { key: 'development', label: 'Development', count: integrations.filter(i => i.category === 'development').length },
    { key: 'marketing', label: 'Marketing', count: integrations.filter(i => i.category === 'marketing').length },
    { key: 'finance', label: 'Finance', count: integrations.filter(i => i.category === 'finance').length },
    { key: 'analytics', label: 'Analytics', count: integrations.filter(i => i.category === 'analytics').length }
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
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🔗 Enterprise Integration Hub</h2>
              <p className="text-blue-100 mt-1">Advanced third-party integrations and data synchronization</p>
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
          {/* Integration Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Connected</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {integrations.filter(i => i.status === 'connected').length}
                  </p>
                </div>
                <div className="text-3xl">🔗</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Templates</p>
                  <p className="text-2xl font-bold text-green-800">{templates.length}</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Data Synced</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {formatBytes(integrations.reduce((sum, i) => sum + i.dataTransferred, 0))}
                  </p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Sync Logs</p>
                  <p className="text-2xl font-bold text-orange-800">{syncLogs.length}</p>
                </div>
                <div className="text-3xl">📝</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Errors</p>
                  <p className="text-2xl font-bold text-red-800">
                    {integrations.reduce((sum, i) => sum + i.errorCount, 0)}
                  </p>
                </div>
                <div className="text-3xl">⚠️</div>
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
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="connected">Connected</option>
                    <option value="disconnected">Disconnected</option>
                    <option value="error">Error</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Integration Templates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div key={template.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{template.icon}</span>
                      <h4 className="font-semibold text-gray-800">{template.name}</h4>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPricingColor(template.pricing)}`}>
                      {template.pricing}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Setup Time:</span>
                      <span className="font-medium text-blue-600">{template.estimatedTime} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Popularity:</span>
                      <span className="font-medium text-green-600">{template.popularity}%</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium mb-1">Features:</div>
                      <ul className="text-xs space-y-1">
                        {template.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => connectIntegration(template.id)}
                    disabled={isConnectingIntegration}
                    className="w-full mt-3 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors text-sm"
                  >
                    {isConnectingIntegration ? '⏳ Connecting...' : '🔗 Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Integrations */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Connected Integrations ({filteredIntegrations.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Transferred</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate Limit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredIntegrations.map((integration) => (
                    <tr key={integration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{integration.name}</div>
                          <div className="text-sm text-gray-500">{integration.description}</div>
                          <div className="text-xs text-gray-400">v{integration.apiVersion}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(integration.category)}`}>
                          {integration.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.status)}`}>
                          {integration.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatBytes(integration.dataTransferred)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(integration.lastSync)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{integration.rateLimit.remaining}/{integration.rateLimit.requests}</div>
                          <div className="text-xs text-gray-500">per {integration.rateLimit.period}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => syncData(integration.id)}
                            disabled={isSyncingData}
                            className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                          >
                            {isSyncingData ? 'Syncing...' : 'Sync'}
                          </button>
                          <button
                            onClick={() => disconnectIntegration(integration.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            Disconnect
                          </button>
                        </div>
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

export default EnterpriseIntegrationHub;
