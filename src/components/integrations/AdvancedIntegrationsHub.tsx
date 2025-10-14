/**
 * Advanced Integrations Hub Component
 * 
 * Provides comprehensive third-party API connections and integrations
 * Includes Slack, Google Workspace, Microsoft 365, GitHub, and more
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'communication' | 'development' | 'finance' | 'health' | 'entertainment';
  icon: string;
  color: string;
  status: 'available' | 'connected' | 'error' | 'loading';
  isPopular: boolean;
  features: string[];
  setupSteps: number;
  permissions: string[];
  dataSync: {
    enabled: boolean;
    frequency: 'real-time' | 'hourly' | 'daily' | 'manual';
    lastSync?: string;
  };
  settings: Record<string, any>;
}

interface AdvancedIntegrationsHubProps {
  userId: string;
  onClose: () => void;
}

const AVAILABLE_INTEGRATIONS: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Sync tasks and updates with your team channels',
    category: 'communication',
    icon: '💬',
    color: 'from-purple-500 to-pink-500',
    status: 'available',
    isPopular: true,
    features: ['Task notifications', 'Status updates', 'Team collaboration'],
    setupSteps: 3,
    permissions: ['Read messages', 'Send notifications', 'Access channels'],
    dataSync: { enabled: false, frequency: 'real-time' },
    settings: {}
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync events and deadlines with your calendar',
    category: 'productivity',
    icon: '📅',
    color: 'from-blue-500 to-cyan-500',
    status: 'available',
    isPopular: true,
    features: ['Event sync', 'Deadline reminders', 'Time blocking'],
    setupSteps: 2,
    permissions: ['Read calendar', 'Create events', 'Update events'],
    dataSync: { enabled: false, frequency: 'hourly' },
    settings: {}
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Track development tasks and pull requests',
    category: 'development',
    icon: '🐙',
    color: 'from-gray-600 to-gray-800',
    status: 'available',
    isPopular: true,
    features: ['Issue tracking', 'PR management', 'Commit sync'],
    setupSteps: 4,
    permissions: ['Read repositories', 'Read issues', 'Read pull requests'],
    dataSync: { enabled: false, frequency: 'hourly' },
    settings: {}
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Sync pages and databases with your workspace',
    category: 'productivity',
    icon: '📝',
    color: 'from-gray-500 to-gray-700',
    status: 'available',
    isPopular: true,
    features: ['Page sync', 'Database integration', 'Content management'],
    setupSteps: 3,
    permissions: ['Read pages', 'Read databases', 'Create pages'],
    dataSync: { enabled: false, frequency: 'daily' },
    settings: {}
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Integrate with your Teams workspace and meetings',
    category: 'communication',
    icon: '👥',
    color: 'from-blue-600 to-indigo-600',
    status: 'available',
    isPopular: false,
    features: ['Meeting sync', 'Team updates', 'File sharing'],
    setupSteps: 4,
    permissions: ['Read meetings', 'Send messages', 'Access files'],
    dataSync: { enabled: false, frequency: 'real-time' },
    settings: {}
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Sync boards and cards with your task management',
    category: 'productivity',
    icon: '📋',
    color: 'from-blue-400 to-blue-600',
    status: 'available',
    isPopular: false,
    features: ['Board sync', 'Card management', 'List organization'],
    setupSteps: 3,
    permissions: ['Read boards', 'Read cards', 'Update cards'],
    dataSync: { enabled: false, frequency: 'hourly' },
    settings: {}
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Connect projects and tasks with your workflow',
    category: 'productivity',
    icon: '🎯',
    color: 'from-red-500 to-pink-500',
    status: 'available',
    isPopular: false,
    features: ['Project sync', 'Task management', 'Team collaboration'],
    setupSteps: 3,
    permissions: ['Read projects', 'Read tasks', 'Update tasks'],
    dataSync: { enabled: false, frequency: 'hourly' },
    settings: {}
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Enhance focus with music and productivity playlists',
    category: 'entertainment',
    icon: '🎵',
    color: 'from-green-500 to-emerald-500',
    status: 'available',
    isPopular: false,
    features: ['Focus playlists', 'Music controls', 'Mood tracking'],
    setupSteps: 2,
    permissions: ['Read playback state', 'Control playback', 'Read playlists'],
    dataSync: { enabled: false, frequency: 'real-time' },
    settings: {}
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Sync meetings and recordings with your schedule',
    category: 'communication',
    icon: '📹',
    color: 'from-blue-500 to-blue-700',
    status: 'available',
    isPopular: false,
    features: ['Meeting sync', 'Recording access', 'Calendar integration'],
    setupSteps: 3,
    permissions: ['Read meetings', 'Access recordings', 'Read calendar'],
    dataSync: { enabled: false, frequency: 'daily' },
    settings: {}
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Track payments and financial transactions',
    category: 'finance',
    icon: '💳',
    color: 'from-purple-600 to-indigo-600',
    status: 'available',
    isPopular: false,
    features: ['Payment tracking', 'Revenue analytics', 'Transaction sync'],
    setupSteps: 4,
    permissions: ['Read payments', 'Read customers', 'Read analytics'],
    dataSync: { enabled: false, frequency: 'daily' },
    settings: {}
  }
];

const CATEGORY_COLORS = {
  productivity: 'from-blue-500 to-cyan-500',
  communication: 'from-purple-500 to-pink-500',
  development: 'from-gray-600 to-gray-800',
  finance: 'from-green-500 to-emerald-500',
  health: 'from-red-500 to-pink-500',
  entertainment: 'from-yellow-500 to-orange-500'
};

const AdvancedIntegrationsHub: React.FC<AdvancedIntegrationsHubProps> = ({ userId, onClose }) => {
  const [integrations, setIntegrations] = useState<Integration[]>(AVAILABLE_INTEGRATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [connectedCount, setConnectedCount] = useState(0);

  useEffect(() => {
    // Simulate loading connected integrations
    const connectedIntegrations = integrations.filter(i => i.status === 'connected').length;
    setConnectedCount(connectedIntegrations);
  }, [integrations]);

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConnectIntegration = async (integrationId: string) => {
    setIsConnecting(integrationId);
    
    try {
      // Simulate API call for integration setup
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: 'connected' as const,
              dataSync: { ...integration.dataSync, enabled: true, lastSync: new Date().toISOString() }
            }
          : integration
      ));
      
      setConnectedCount(prev => prev + 1);
    } catch (error) {
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'error' as const }
          : integration
      ));
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnectIntegration = async (integrationId: string) => {
    setIsConnecting(integrationId);
    
    try {
      // Simulate API call for integration removal
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: 'available' as const,
              dataSync: { ...integration.dataSync, enabled: false }
            }
          : integration
      ));
      
      setConnectedCount(prev => prev - 1);
    } catch (error) {
      console.error('Failed to disconnect integration:', error);
    } finally {
      setIsConnecting(null);
    }
  };

  const categories = [
    { id: 'all', name: 'All', count: integrations.length },
    { id: 'productivity', name: 'Productivity', count: integrations.filter(i => i.category === 'productivity').length },
    { id: 'communication', name: 'Communication', count: integrations.filter(i => i.category === 'communication').length },
    { id: 'development', name: 'Development', count: integrations.filter(i => i.category === 'development').length },
    { id: 'finance', name: 'Finance', count: integrations.filter(i => i.category === 'finance').length },
    { id: 'entertainment', name: 'Entertainment', count: integrations.filter(i => i.category === 'entertainment').length }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Advanced Integrations Hub</h2>
              <p className="text-blue-100 mt-1">Connect your favorite tools and services</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Connected:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {connectedCount} / {integrations.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Popular:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {integrations.filter(i => i.isPopular).length}
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${integration.color} flex items-center justify-center text-2xl`}>
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                        <span>{integration.name}</span>
                        {integration.isPopular && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    integration.status === 'connected' ? 'bg-green-500' :
                    integration.status === 'error' ? 'bg-red-500' :
                    integration.status === 'loading' ? 'bg-yellow-500 animate-pulse' :
                    'bg-gray-300'
                  }`}></div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="space-y-3">
                  {integration.status === 'connected' && (
                    <div className="text-sm text-green-600 flex items-center space-x-2">
                      <span>✅</span>
                      <span>Connected</span>
                      {integration.dataSync.lastSync && (
                        <span className="text-gray-500">
                          (Last sync: {new Date(integration.dataSync.lastSync).toLocaleDateString()})
                        </span>
                      )}
                    </div>
                  )}
                  
                  {integration.status === 'error' && (
                    <div className="text-sm text-red-600 flex items-center space-x-2">
                      <span>❌</span>
                      <span>Connection failed</span>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {integration.status === 'available' && (
                      <button
                        onClick={() => handleConnectIntegration(integration.id)}
                        disabled={isConnecting === integration.id}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        {isConnecting === integration.id ? 'Connecting...' : 'Connect'}
                      </button>
                    )}
                    
                    {integration.status === 'connected' && (
                      <button
                        onClick={() => handleDisconnectIntegration(integration.id)}
                        disabled={isConnecting === integration.id}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        {isConnecting === integration.id ? 'Disconnecting...' : 'Disconnect'}
                      </button>
                    )}
                    
                    {integration.status === 'error' && (
                      <button
                        onClick={() => handleConnectIntegration(integration.id)}
                        disabled={isConnecting === integration.id}
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        Retry Connection
                      </button>
                    )}
                  </div>

                  {/* Setup Steps */}
                  <div className="text-xs text-gray-500">
                    {integration.setupSteps} step{integration.setupSteps > 1 ? 's' : ''} to setup
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredIntegrations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No integrations found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {connectedCount} integration{connectedCount !== 1 ? 's' : ''} connected
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
                // TODO: Open integration settings
                console.log('Opening integration settings...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Manage Settings
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedIntegrationsHub;
