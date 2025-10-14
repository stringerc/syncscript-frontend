/**
 * Third-Party Integrations Hub Component
 * 
 * Central hub for managing integrations with popular productivity tools
 * Includes Slack, Microsoft Teams, Google Workspace, GitHub, and more
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'communication' | 'productivity' | 'development' | 'design' | 'analytics' | 'storage';
  icon: string;
  status: 'available' | 'connected' | 'disconnected' | 'error';
  features: string[];
  setupRequired: boolean;
  apiKey?: string;
  webhookUrl?: string;
  lastSync?: string;
  usage: {
    requests: number;
    lastUsed: string;
    quota: number;
  };
}

interface IntegrationConfig {
  id: string;
  name: string;
  settings: {
    syncFrequency: 'realtime' | '5min' | '15min' | '1hour' | 'manual';
    autoSync: boolean;
    notifications: boolean;
    dataRetention: number; // days
  };
  permissions: string[];
  webhooks: {
    enabled: boolean;
    url: string;
    events: string[];
  };
}

interface ThirdPartyIntegrationsHubProps {
  onClose: () => void;
}

const ThirdPartyIntegrationsHub: React.FC<ThirdPartyIntegrationsHubProps> = ({ onClose }) => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [configurations, setConfigurations] = useState<IntegrationConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'available' | 'connected' | 'settings' | 'analytics'>('available');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    setIsLoading(true);
    
    try {
      // Mock integrations data
      const mockIntegrations: Integration[] = [
        {
          id: 'slack',
          name: 'Slack',
          description: 'Connect with your Slack workspace for team communication and task updates',
          category: 'communication',
          icon: '💬',
          status: 'available',
          features: ['Channel notifications', 'Task updates', 'Team mentions', 'Status sync'],
          setupRequired: true,
          usage: {
            requests: 0,
            lastUsed: '',
            quota: 1000
          }
        },
        {
          id: 'microsoft-teams',
          name: 'Microsoft Teams',
          description: 'Integrate with Microsoft Teams for seamless collaboration',
          category: 'communication',
          icon: '👥',
          status: 'available',
          features: ['Meeting integration', 'File sharing', 'Team channels', 'Calendar sync'],
          setupRequired: true,
          usage: {
            requests: 0,
            lastUsed: '',
            quota: 1000
          }
        },
        {
          id: 'google-workspace',
          name: 'Google Workspace',
          description: 'Sync with Google Calendar, Drive, and Gmail for complete productivity',
          category: 'productivity',
          icon: '📅',
          status: 'connected',
          features: ['Calendar sync', 'Drive integration', 'Gmail notifications', 'Docs collaboration'],
          setupRequired: false,
          apiKey: 'gws_***',
          lastSync: new Date(Date.now() - 300000).toISOString(),
          usage: {
            requests: 245,
            lastUsed: new Date(Date.now() - 60000).toISOString(),
            quota: 1000
          }
        },
        {
          id: 'github',
          name: 'GitHub',
          description: 'Connect with GitHub for development workflow integration',
          category: 'development',
          icon: '🐙',
          status: 'available',
          features: ['Issue tracking', 'PR notifications', 'Commit sync', 'Project boards'],
          setupRequired: true,
          usage: {
            requests: 0,
            lastUsed: '',
            quota: 5000
          }
        },
        {
          id: 'figma',
          name: 'Figma',
          description: 'Integrate with Figma for design workflow and collaboration',
          category: 'design',
          icon: '🎨',
          status: 'available',
          features: ['Design updates', 'Comment sync', 'File sharing', 'Version tracking'],
          setupRequired: true,
          usage: {
            requests: 0,
            lastUsed: '',
            quota: 1000
          }
        },
        {
          id: 'notion',
          name: 'Notion',
          description: 'Sync with Notion for enhanced note-taking and documentation',
          category: 'productivity',
          icon: '📝',
          status: 'connected',
          features: ['Page sync', 'Database integration', 'Template sharing', 'Comment sync'],
          setupRequired: false,
          apiKey: 'notion_***',
          lastSync: new Date(Date.now() - 600000).toISOString(),
          usage: {
            requests: 89,
            lastUsed: new Date(Date.now() - 120000).toISOString(),
            quota: 1000
          }
        },
        {
          id: 'trello',
          name: 'Trello',
          description: 'Connect with Trello for project management and task tracking',
          category: 'productivity',
          icon: '📋',
          status: 'disconnected',
          features: ['Board sync', 'Card updates', 'List management', 'Member sync'],
          setupRequired: true,
          usage: {
            requests: 156,
            lastUsed: new Date(Date.now() - 86400000).toISOString(),
            quota: 1000
          }
        },
        {
          id: 'jira',
          name: 'Jira',
          description: 'Integrate with Jira for advanced project and issue management',
          category: 'productivity',
          icon: '🎯',
          status: 'available',
          features: ['Issue tracking', 'Sprint management', 'Workflow sync', 'Reporting'],
          setupRequired: true,
          usage: {
            requests: 0,
            lastUsed: '',
            quota: 1000
          }
        }
      ];

      setIntegrations(mockIntegrations);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const connectIntegration = async (integrationId: string) => {
    setIsConnecting(true);
    
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: 'connected',
              apiKey: `${integrationId}_***`,
              lastSync: new Date().toISOString()
            }
          : integration
      ));
      
    } catch (error) {
      console.error('Failed to connect integration:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectIntegration = async (integrationId: string) => {
    try {
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: 'disconnected',
              apiKey: undefined,
              lastSync: undefined
            }
          : integration
      ));
    } catch (error) {
      console.error('Failed to disconnect integration:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'disconnected': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'available': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'communication': return '💬';
      case 'productivity': return '📊';
      case 'development': return '💻';
      case 'design': return '🎨';
      case 'analytics': return '📈';
      case 'storage': return '💾';
      default: return '🔗';
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    switch (selectedTab) {
      case 'available': return integration.status === 'available';
      case 'connected': return integration.status === 'connected';
      case 'settings': return integration.status === 'connected';
      case 'analytics': return integration.status === 'connected';
      default: return true;
    }
  });

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
            <span className="text-lg font-medium text-gray-700">Loading integrations...</span>
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
              <h2 className="text-2xl font-bold">Third-Party Integrations Hub</h2>
              <p className="text-blue-100 mt-1">Connect with your favorite productivity tools</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Available:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {integrations.filter(i => i.status === 'available').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Connected:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {integrations.filter(i => i.status === 'connected').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Total:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {integrations.length}
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
              { id: 'available', name: 'Available', icon: '🔗' },
              { id: 'connected', name: 'Connected', icon: '✅' },
              { id: 'settings', name: 'Settings', icon: '⚙️' },
              { id: 'analytics', name: 'Analytics', icon: '📊' }
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
          {selectedTab === 'available' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Available Integrations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIntegrations.map((integration) => (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{integration.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Category</span>
                        <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                          {getCategoryIcon(integration.category)} {integration.category}
                        </span>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Features:</div>
                        <div className="space-y-1">
                          {integration.features.map((feature, index) => (
                            <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => connectIntegration(integration.id)}
                        disabled={isConnecting}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {isConnecting ? 'Connecting...' : 'Connect'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'connected' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Connected Integrations</h3>
              
              <div className="space-y-4">
                {filteredIntegrations.map((integration) => (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{integration.name}</h4>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(integration.status)}`}>
                          {integration.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => disconnectIntegration(integration.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-all"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Last Sync:</span>
                        <span className="ml-2 text-gray-900">
                          {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">API Key:</span>
                        <span className="ml-2 text-gray-900">{integration.apiKey || 'Not set'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Requests:</span>
                        <span className="ml-2 text-gray-900">{integration.usage.requests}/{integration.usage.quota}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Used:</span>
                        <span className="ml-2 text-gray-900">
                          {integration.usage.lastUsed ? new Date(integration.usage.lastUsed).toLocaleString() : 'Never'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Integration Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Global Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Auto Sync</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sync Frequency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="realtime">Real-time</option>
                        <option value="5min">Every 5 minutes</option>
                        <option value="15min">Every 15 minutes</option>
                        <option value="1hour">Every hour</option>
                        <option value="manual">Manual only</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Webhook Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Enable Webhooks</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
                      <input
                        type="url"
                        placeholder="https://your-app.com/webhook"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Events</label>
                      <div className="space-y-2">
                        {['task_created', 'task_updated', 'project_created', 'energy_logged'].map((event) => (
                          <label key={event} className="flex items-center">
                            <input type="checkbox" defaultChecked className="mr-2" />
                            <span className="text-sm text-gray-600">{event}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Integration Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📊</span>
                    <span className="text-lg text-blue-600">+15%</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {integrations.filter(i => i.status === 'connected').length}
                  </div>
                  <div className="text-blue-600 text-sm">Active Integrations</div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🔄</span>
                    <span className="text-lg text-green-600">+8%</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    {integrations.reduce((sum, i) => sum + i.usage.requests, 0)}
                  </div>
                  <div className="text-green-600 text-sm">Total API Calls</div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">⚡</span>
                    <span className="text-lg text-purple-600">+22%</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">98.5%</div>
                  <div className="text-purple-600 text-sm">Uptime</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Third-Party Integrations • {integrations.filter(i => i.status === 'connected').length} connected • {integrations.length} available
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
                console.log('Exporting integration data...');
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

export default ThirdPartyIntegrationsHub;
