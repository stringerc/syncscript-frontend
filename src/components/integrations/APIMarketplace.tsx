/**
 * API Marketplace Component
 * 
 * Custom integrations and extensions marketplace
 * Includes API discovery, documentation, and extension management
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface APIMarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'automation' | 'analytics' | 'communication' | 'custom';
  icon: string;
  version: string;
  author: string;
  rating: number;
  downloads: number;
  price: 'free' | 'premium' | 'enterprise';
  features: string[];
  documentation: string;
  endpoints: APIEndpoint[];
  status: 'available' | 'installed' | 'updating' | 'error';
  lastUpdated: string;
}

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters: APIParameter[];
  response: any;
  rateLimit: number;
}

interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: any;
}

interface CustomExtension {
  id: string;
  name: string;
  description: string;
  code: string;
  triggers: string[];
  actions: string[];
  status: 'active' | 'inactive' | 'error';
  lastRun?: string;
  executions: number;
}

interface APIMarketplaceProps {
  onClose: () => void;
}

const APIMarketplace: React.FC<APIMarketplaceProps> = ({ onClose }) => {
  const [marketplaceItems, setMarketplaceItems] = useState<APIMarketplaceItem[]>([]);
  const [customExtensions, setCustomExtensions] = useState<CustomExtension[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'marketplace' | 'installed' | 'custom' | 'docs'>('marketplace');
  const [selectedItem, setSelectedItem] = useState<APIMarketplaceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadMarketplaceData();
  }, []);

  const loadMarketplaceData = async () => {
    setIsLoading(true);
    
    try {
      // Mock marketplace data
      const mockItems: APIMarketplaceItem[] = [
        {
          id: 'task-automation',
          name: 'Task Automation Suite',
          description: 'Automate repetitive tasks with powerful workflow triggers',
          category: 'automation',
          icon: '🤖',
          version: '2.1.0',
          author: 'SyncScript Team',
          rating: 4.8,
          downloads: 15420,
          price: 'free',
          features: ['Workflow triggers', 'Conditional logic', 'Batch operations', 'Scheduling'],
          documentation: 'https://docs.syncscript.com/task-automation',
          endpoints: [
            {
              method: 'POST',
              path: '/api/automation/trigger',
              description: 'Trigger an automation workflow',
              parameters: [
                { name: 'workflow_id', type: 'string', required: true, description: 'ID of the workflow to trigger' },
                { name: 'data', type: 'object', required: false, description: 'Data to pass to the workflow' }
              ],
              response: { success: true, execution_id: 'exec_123' },
              rateLimit: 100
            }
          ],
          status: 'available',
          lastUpdated: '2024-01-15'
        },
        {
          id: 'advanced-analytics',
          name: 'Advanced Analytics Engine',
          description: 'Deep insights into productivity patterns and team performance',
          category: 'analytics',
          icon: '📊',
          version: '1.5.2',
          author: 'Data Insights Co.',
          rating: 4.9,
          downloads: 8930,
          price: 'premium',
          features: ['Custom dashboards', 'Predictive analytics', 'Team insights', 'Export reports'],
          documentation: 'https://docs.syncscript.com/advanced-analytics',
          endpoints: [
            {
              method: 'GET',
              path: '/api/analytics/dashboard',
              description: 'Get analytics dashboard data',
              parameters: [
                { name: 'period', type: 'string', required: false, description: 'Time period for analysis' }
              ],
              response: { metrics: {}, charts: [] },
              rateLimit: 50
            }
          ],
          status: 'installed',
          lastUpdated: '2024-01-10'
        },
        {
          id: 'slack-integration',
          name: 'Slack Integration Pro',
          description: 'Enhanced Slack integration with advanced features',
          category: 'communication',
          icon: '💬',
          version: '3.0.1',
          author: 'Communication Labs',
          rating: 4.7,
          downloads: 22150,
          price: 'free',
          features: ['Rich notifications', 'Slash commands', 'Bot interactions', 'Channel management'],
          documentation: 'https://docs.syncscript.com/slack-pro',
          endpoints: [
            {
              method: 'POST',
              path: '/api/slack/message',
              description: 'Send a message to Slack',
              parameters: [
                { name: 'channel', type: 'string', required: true, description: 'Slack channel ID' },
                { name: 'message', type: 'string', required: true, description: 'Message content' }
              ],
              response: { success: true, message_id: 'msg_123' },
              rateLimit: 200
            }
          ],
          status: 'available',
          lastUpdated: '2024-01-12'
        },
        {
          id: 'custom-dashboard',
          name: 'Custom Dashboard Builder',
          description: 'Build custom dashboards with drag-and-drop interface',
          category: 'productivity',
          icon: '🎛️',
          version: '1.2.0',
          author: 'UI/UX Studio',
          rating: 4.6,
          downloads: 6750,
          price: 'premium',
          features: ['Drag-and-drop builder', 'Custom widgets', 'Real-time updates', 'Theme customization'],
          documentation: 'https://docs.syncscript.com/custom-dashboard',
          endpoints: [
            {
              method: 'GET',
              path: '/api/dashboard/widgets',
              description: 'Get available dashboard widgets',
              parameters: [],
              response: { widgets: [] },
              rateLimit: 1000
            }
          ],
          status: 'available',
          lastUpdated: '2024-01-08'
        }
      ];

      // Mock custom extensions
      const mockExtensions: CustomExtension[] = [
        {
          id: 'custom-1',
          name: 'Daily Standup Bot',
          description: 'Automatically creates daily standup tasks',
          code: 'function createStandupTasks() { /* custom code */ }',
          triggers: ['daily', 'morning'],
          actions: ['create_task', 'send_notification'],
          status: 'active',
          lastRun: new Date(Date.now() - 3600000).toISOString(),
          executions: 45
        },
        {
          id: 'custom-2',
          name: 'Energy Level Tracker',
          description: 'Tracks energy levels and suggests optimal work times',
          code: 'function trackEnergyLevels() { /* custom code */ }',
          triggers: ['energy_logged', 'task_completed'],
          actions: ['analyze_patterns', 'send_insights'],
          status: 'inactive',
          executions: 12
        }
      ];

      setMarketplaceItems(mockItems);
      setCustomExtensions(mockExtensions);
    } catch (error) {
      console.error('Failed to load marketplace data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const installItem = async (itemId: string) => {
    try {
      setMarketplaceItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, status: 'installed' } : item
      ));
    } catch (error) {
      console.error('Failed to install item:', error);
    }
  };

  const uninstallItem = async (itemId: string) => {
    try {
      setMarketplaceItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, status: 'available' } : item
      ));
    } catch (error) {
      console.error('Failed to uninstall item:', error);
    }
  };

  const createCustomExtension = (extension: Omit<CustomExtension, 'id' | 'executions'>) => {
    const newExtension: CustomExtension = {
      ...extension,
      id: `custom_${Date.now()}`,
      executions: 0
    };
    
    setCustomExtensions(prev => [...prev, newExtension]);
  };

  const toggleExtension = (extensionId: string) => {
    setCustomExtensions(prev => prev.map(ext => 
      ext.id === extensionId 
        ? { ...ext, status: ext.status === 'active' ? 'inactive' : 'active' }
        : ext
    ));
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case 'free': return 'text-green-600 bg-green-100';
      case 'premium': return 'text-blue-600 bg-blue-100';
      case 'enterprise': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'installed': return 'text-green-600 bg-green-100';
      case 'available': return 'text-blue-600 bg-blue-100';
      case 'updating': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading marketplace...</span>
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
              <h2 className="text-2xl font-bold">API Marketplace</h2>
              <p className="text-purple-100 mt-1">Custom integrations and extensions</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Available:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {marketplaceItems.filter(i => i.status === 'available').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Installed:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {marketplaceItems.filter(i => i.status === 'installed').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Custom:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {customExtensions.length}
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
              { id: 'marketplace', name: 'Marketplace', icon: '🛒' },
              { id: 'installed', name: 'Installed', icon: '📦' },
              { id: 'custom', name: 'Custom Extensions', icon: '⚡' },
              { id: 'docs', name: 'API Docs', icon: '📚' }
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

        {/* Search and Filters */}
        {selectedTab === 'marketplace' && (
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search marketplace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Categories</option>
                <option value="productivity">Productivity</option>
                <option value="automation">Automation</option>
                <option value="analytics">Analytics</option>
                <option value="communication">Communication</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'marketplace' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Marketplace Items</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriceColor(item.price)}`}>
                            {item.price.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>⭐ {item.rating}</span>
                          <span>📥 {item.downloads.toLocaleString()}</span>
                          <span>v{item.version}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Features:</div>
                        <div className="space-y-1">
                          {item.features.map((feature, index) => (
                            <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </span>
                        {item.status === 'available' ? (
                          <button
                            onClick={() => installItem(item.id)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                          >
                            Install
                          </button>
                        ) : (
                          <button
                            onClick={() => uninstallItem(item.id)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                          >
                            Uninstall
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'installed' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Installed Items</h3>
              
              <div className="space-y-4">
                {marketplaceItems.filter(item => item.status === 'installed').map((item) => (
                  <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => uninstallItem(item.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-all"
                        >
                          Uninstall
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Version:</span>
                        <span className="ml-2 text-gray-900">{item.version}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Author:</span>
                        <span className="ml-2 text-gray-900">{item.author}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="ml-2 text-gray-900">{item.lastUpdated}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getPriceColor(item.price)}`}>
                          {item.price.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'custom' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Custom Extensions</h3>
                <button
                  onClick={() => {
                    createCustomExtension({
                      name: 'New Extension',
                      description: 'Custom extension',
                      code: '// Your code here',
                      triggers: [],
                      actions: [],
                      status: 'inactive'
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Extension
                </button>
              </div>
              
              <div className="space-y-4">
                {customExtensions.map((extension) => (
                  <div key={extension.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{extension.name}</h4>
                        <p className="text-sm text-gray-600">{extension.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          extension.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {extension.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => toggleExtension(extension.id)}
                          className={`px-3 py-1 rounded text-sm transition-all ${
                            extension.status === 'active' 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {extension.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Executions:</span>
                        <span className="ml-2 text-gray-900">{extension.executions}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Run:</span>
                        <span className="ml-2 text-gray-900">
                          {extension.lastRun ? new Date(extension.lastRun).toLocaleString() : 'Never'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Triggers:</span>
                        <span className="ml-2 text-gray-900">{extension.triggers.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Actions:</span>
                        <span className="ml-2 text-gray-900">{extension.actions.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'docs' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">API Documentation</h3>
              
              <div className="space-y-4">
                {marketplaceItems.filter(item => item.status === 'installed').map((item) => (
                  <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Endpoints:</div>
                        {item.endpoints.map((endpoint, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded mb-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                                endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {endpoint.method}
                              </span>
                              <span className="font-mono text-sm">{endpoint.path}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                            <div className="text-xs text-gray-500">
                              Rate Limit: {endpoint.rateLimit} requests/hour
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <a
                          href={item.documentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                        >
                          View Full Docs
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            API Marketplace • {marketplaceItems.filter(i => i.status === 'installed').length} installed • {customExtensions.length} custom extensions
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
                console.log('Exporting marketplace data...');
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

export default APIMarketplace;
