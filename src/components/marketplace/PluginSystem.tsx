/**
 * Plugin System Component
 * 
 * Custom plugins and extensions
 * Includes plugin management, installation, and configuration
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Plugin {
  id: string;
  name: string;
  description: string;
  developer: string;
  category: 'productivity' | 'communication' | 'analytics' | 'automation' | 'customization' | 'integration';
  version: string;
  price: 'free' | 'freemium' | 'paid';
  priceAmount?: number;
  currency?: string;
  rating: number;
  reviewCount: number;
  downloads: number;
  size: string;
  permissions: string[];
  features: string[];
  screenshots: string[];
  icon: string;
  isInstalled: boolean;
  isEnabled: boolean;
  isVerified: boolean;
  tags: string[];
  compatibility: string[];
  requirements: string[];
  lastUpdated: string;
  changelog: string[];
  support: {
    email: string;
    website: string;
    documentation: string;
  };
}

interface PluginConfiguration {
  id: string;
  pluginId: string;
  settings: Record<string, any>;
  isConfigured: boolean;
  lastConfigured: string;
}

interface PluginCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  pluginCount: number;
  featuredPlugins: string[];
}

interface PluginSystemProps {
  onClose: () => void;
}

const PluginSystem: React.FC<PluginSystemProps> = ({ onClose }) => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [pluginConfigurations, setPluginConfigurations] = useState<PluginConfiguration[]>([]);
  const [pluginCategories, setPluginCategories] = useState<PluginCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'discover' | 'installed' | 'configure' | 'categories'>('discover');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInstalling, setIsInstalling] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState<string | null>(null);

  useEffect(() => {
    loadPluginData();
  }, []);

  const loadPluginData = async () => {
    setIsLoading(true);
    
    try {
      // Mock plugins
      const mockPlugins: Plugin[] = [
        {
          id: 'plugin-1',
          name: 'Advanced Task Scheduler',
          description: 'Powerful task scheduling with recurring patterns and smart suggestions',
          developer: 'TaskFlow Solutions',
          category: 'productivity',
          version: '2.3.1',
          price: 'freemium',
          priceAmount: 12.99,
          currency: 'USD',
          rating: 4.8,
          reviewCount: 892,
          downloads: 23456,
          size: '18.7 MB',
          permissions: ['create_tasks', 'modify_tasks', 'access_calendar', 'send_notifications'],
          features: ['Recurring tasks', 'Smart scheduling', 'Calendar integration', 'Notification system'],
          screenshots: ['https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Task+Scheduler'],
          icon: '⏰',
          isInstalled: true,
          isEnabled: true,
          isVerified: true,
          tags: ['scheduling', 'tasks', 'automation', 'calendar'],
          compatibility: ['web', 'mobile', 'desktop'],
          requirements: ['SyncScript Pro', 'Calendar access'],
          lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          changelog: [
            'Added smart scheduling algorithms',
            'Improved calendar integration',
            'Fixed notification timing issues',
            'Enhanced user interface'
          ],
          support: {
            email: 'support@taskflow-solutions.com',
            website: 'https://taskflow-solutions.com',
            documentation: 'https://docs.taskflow-solutions.com'
          }
        },
        {
          id: 'plugin-2',
          name: 'Team Communication Hub',
          description: 'Enhanced team communication with video calls, screen sharing, and file collaboration',
          developer: 'CommTech',
          category: 'communication',
          version: '1.9.4',
          price: 'free',
          rating: 4.6,
          reviewCount: 1247,
          downloads: 45678,
          size: '32.1 MB',
          permissions: ['access_camera', 'access_microphone', 'screen_share', 'file_access'],
          features: ['Video calls', 'Screen sharing', 'File collaboration', 'Team chat', 'Meeting recording'],
          screenshots: ['https://via.placeholder.com/400x300/059669/FFFFFF?text=Team+Communication'],
          icon: '💬',
          isInstalled: true,
          isEnabled: false,
          isVerified: true,
          tags: ['communication', 'video', 'team', 'collaboration'],
          compatibility: ['web', 'mobile', 'desktop'],
          requirements: ['Camera access', 'Microphone access'],
          lastUpdated: new Date(Date.now() - 172800000).toISOString(),
          changelog: [
            'Added meeting recording feature',
            'Improved video quality',
            'Enhanced file sharing',
            'Fixed audio issues'
          ],
          support: {
            email: 'help@commtech.com',
            website: 'https://commtech.com',
            documentation: 'https://docs.commtech.com'
          }
        },
        {
          id: 'plugin-3',
          name: 'Advanced Analytics Pro',
          description: 'Comprehensive analytics with custom metrics, reports, and data visualization',
          developer: 'DataViz Pro',
          category: 'analytics',
          version: '3.1.0',
          price: 'paid',
          priceAmount: 24.99,
          currency: 'USD',
          rating: 4.9,
          reviewCount: 567,
          downloads: 12345,
          size: '45.2 MB',
          permissions: ['read_data', 'export_data', 'create_reports', 'access_analytics'],
          features: ['Custom metrics', 'Advanced reports', 'Data visualization', 'Export capabilities', 'Scheduled reports'],
          screenshots: ['https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Analytics+Pro'],
          icon: '📊',
          isInstalled: false,
          isEnabled: false,
          isVerified: true,
          tags: ['analytics', 'reports', 'data', 'visualization'],
          compatibility: ['web', 'desktop'],
          requirements: ['SyncScript Pro', 'Data access permissions'],
          lastUpdated: new Date(Date.now() - 259200000).toISOString(),
          changelog: [
            'Added custom metric builder',
            'Enhanced data visualization',
            'Improved report generation',
            'Added export to multiple formats'
          ],
          support: {
            email: 'support@dataviz-pro.com',
            website: 'https://dataviz-pro.com',
            documentation: 'https://docs.dataviz-pro.com'
          }
        },
        {
          id: 'plugin-4',
          name: 'Workflow Automation Suite',
          description: 'Powerful workflow automation with conditional logic and custom triggers',
          developer: 'AutoFlow Systems',
          category: 'automation',
          version: '2.7.3',
          price: 'freemium',
          priceAmount: 19.99,
          currency: 'USD',
          rating: 4.7,
          reviewCount: 1892,
          downloads: 67890,
          size: '28.9 MB',
          permissions: ['create_tasks', 'modify_tasks', 'access_data', 'send_notifications'],
          features: ['Conditional logic', 'Custom triggers', 'Bulk operations', 'Template library', 'Error handling'],
          screenshots: ['https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Workflow+Automation'],
          icon: '⚡',
          isInstalled: false,
          isEnabled: false,
          isVerified: true,
          tags: ['automation', 'workflow', 'triggers', 'logic'],
          compatibility: ['web', 'mobile', 'desktop'],
          requirements: ['SyncScript account', 'Task management permissions'],
          lastUpdated: new Date(Date.now() - 345600000).toISOString(),
          changelog: [
            'Added conditional logic builder',
            'Enhanced trigger system',
            'Improved error handling',
            'Added template marketplace'
          ],
          support: {
            email: 'support@autoflow-systems.com',
            website: 'https://autoflow-systems.com',
            documentation: 'https://docs.autoflow-systems.com'
          }
        },
        {
          id: 'plugin-5',
          name: 'Custom Theme Engine',
          description: 'Advanced theme customization with CSS editor and component styling',
          developer: 'ThemeCraft Studio',
          category: 'customization',
          version: '1.4.2',
          price: 'free',
          rating: 4.5,
          reviewCount: 743,
          downloads: 18923,
          size: '12.3 MB',
          permissions: ['modify_ui', 'access_themes', 'custom_css'],
          features: ['CSS editor', 'Component styling', 'Color palettes', 'Custom fonts', 'Theme sharing'],
          screenshots: ['https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Theme+Engine'],
          icon: '🎨',
          isInstalled: true,
          isEnabled: true,
          isVerified: false,
          tags: ['themes', 'customization', 'css', 'styling'],
          compatibility: ['web', 'desktop'],
          requirements: ['SyncScript account', 'UI modification permissions'],
          lastUpdated: new Date(Date.now() - 432000000).toISOString(),
          changelog: [
            'Added CSS editor',
            'Enhanced component styling',
            'Improved color palette system',
            'Added theme sharing'
          ],
          support: {
            email: 'help@themecraft-studio.com',
            website: 'https://themecraft-studio.com',
            documentation: 'https://docs.themecraft-studio.com'
          }
        },
        {
          id: 'plugin-6',
          name: 'Google Workspace Connector',
          description: 'Seamless integration with Google Workspace applications and services',
          developer: 'Google',
          category: 'integration',
          version: '1.8.1',
          price: 'free',
          rating: 4.9,
          reviewCount: 3421,
          downloads: 98765,
          size: '15.6 MB',
          permissions: ['read_gmail', 'access_drive', 'read_calendar', 'access_docs'],
          features: ['Gmail integration', 'Drive sync', 'Calendar sync', 'Docs collaboration', 'Sheets integration'],
          screenshots: ['https://via.placeholder.com/400x300/4285F4/FFFFFF?text=Google+Workspace'],
          icon: '🔗',
          isInstalled: true,
          isEnabled: true,
          isVerified: true,
          tags: ['google', 'workspace', 'integration', 'sync'],
          compatibility: ['web', 'mobile', 'desktop'],
          requirements: ['Google account', 'Workspace permissions'],
          lastUpdated: new Date(Date.now() - 518400000).toISOString(),
          changelog: [
            'Enhanced Gmail integration',
            'Improved Drive sync performance',
            'Added Sheets integration',
            'Fixed calendar sync issues'
          ],
          support: {
            email: 'support@google.com',
            website: 'https://workspace.google.com',
            documentation: 'https://developers.google.com/workspace'
          }
        }
      ];

      // Mock plugin configurations
      const mockPluginConfigurations: PluginConfiguration[] = [
        {
          id: 'config-1',
          pluginId: 'plugin-1',
          settings: {
            'default_schedule_time': '09:00',
            'notification_enabled': true,
            'recurring_patterns': ['daily', 'weekly', 'monthly'],
            'smart_scheduling': true
          },
          isConfigured: true,
          lastConfigured: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'config-2',
          pluginId: 'plugin-2',
          settings: {
            'video_quality': 'HD',
            'recording_enabled': false,
            'auto_mute': true,
            'screen_share_permissions': 'team_only'
          },
          isConfigured: false,
          lastConfigured: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'config-3',
          pluginId: 'plugin-5',
          settings: {
            'theme_name': 'Dark Professional',
            'custom_css': '.header { background: #1a1a1a; }',
            'font_family': 'Inter',
            'color_scheme': 'dark'
          },
          isConfigured: true,
          lastConfigured: new Date(Date.now() - 259200000).toISOString()
        }
      ];

      // Mock plugin categories
      const mockPluginCategories: PluginCategory[] = [
        {
          id: 'productivity',
          name: 'Productivity',
          description: 'Plugins to boost productivity and efficiency',
          icon: '📈',
          pluginCount: 23,
          featuredPlugins: ['plugin-1', 'plugin-4']
        },
        {
          id: 'communication',
          name: 'Communication',
          description: 'Team communication and collaboration plugins',
          icon: '💬',
          pluginCount: 18,
          featuredPlugins: ['plugin-2']
        },
        {
          id: 'analytics',
          name: 'Analytics',
          description: 'Data analysis and reporting plugins',
          icon: '📊',
          pluginCount: 15,
          featuredPlugins: ['plugin-3']
        },
        {
          id: 'automation',
          name: 'Automation',
          description: 'Workflow automation and task management plugins',
          icon: '⚡',
          pluginCount: 12,
          featuredPlugins: ['plugin-4']
        },
        {
          id: 'customization',
          name: 'Customization',
          description: 'UI themes and personalization plugins',
          icon: '🎨',
          pluginCount: 8,
          featuredPlugins: ['plugin-5']
        },
        {
          id: 'integration',
          name: 'Integration',
          description: 'Third-party service integration plugins',
          icon: '🔗',
          pluginCount: 34,
          featuredPlugins: ['plugin-6']
        }
      ];

      setPlugins(mockPlugins);
      setPluginConfigurations(mockPluginConfigurations);
      setPluginCategories(mockPluginCategories);
    } catch (error) {
      console.error('Failed to load plugin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const installPlugin = async (pluginId: string) => {
    setIsInstalling(true);
    
    try {
      // Simulate plugin installation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setPlugins(prev => prev.map(plugin => 
        plugin.id === pluginId 
          ? { ...plugin, isInstalled: true, isEnabled: true }
          : plugin
      ));
      
      console.log(`Installed plugin: ${pluginId}`);
    } catch (error) {
      console.error('Failed to install plugin:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const uninstallPlugin = async (pluginId: string) => {
    try {
      setPlugins(prev => prev.map(plugin => 
        plugin.id === pluginId 
          ? { ...plugin, isInstalled: false, isEnabled: false }
          : plugin
      ));
      
      console.log(`Uninstalled plugin: ${pluginId}`);
    } catch (error) {
      console.error('Failed to uninstall plugin:', error);
    }
  };

  const togglePlugin = async (pluginId: string) => {
    try {
      setPlugins(prev => prev.map(plugin => 
        plugin.id === pluginId 
          ? { ...plugin, isEnabled: !plugin.isEnabled }
          : plugin
      ));
      
      console.log(`Toggled plugin: ${pluginId}`);
    } catch (error) {
      console.error('Failed to toggle plugin:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'productivity': return '📈';
      case 'communication': return '💬';
      case 'analytics': return '📊';
      case 'automation': return '⚡';
      case 'customization': return '🎨';
      case 'integration': return '🔗';
      default: return '🔌';
    }
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case 'free': return 'text-green-600 bg-green-100';
      case 'freemium': return 'text-blue-600 bg-blue-100';
      case 'paid': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredPlugins = plugins.filter(plugin => {
    const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
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
            <span className="text-lg font-medium text-gray-700">Loading plugin system...</span>
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
              <h2 className="text-2xl font-bold">Plugin System</h2>
              <p className="text-purple-100 mt-1">Custom plugins and extensions</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Plugins:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {plugins.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Installed:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {plugins.filter(plugin => plugin.isInstalled).length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Enabled:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {plugins.filter(plugin => plugin.isEnabled).length}
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

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search plugins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              {pluginCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'discover', name: 'Discover', icon: '🔍' },
              { id: 'installed', name: 'Installed', icon: '📱' },
              { id: 'configure', name: 'Configure', icon: '⚙️' },
              { id: 'categories', name: 'Categories', icon: '📂' }
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
          {selectedTab === 'discover' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Discover Plugins</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPlugins.map((plugin) => (
                  <motion.div
                    key={plugin.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      plugin.isInstalled 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{plugin.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{plugin.name}</h4>
                        <p className="text-sm text-gray-600">{plugin.developer}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriceColor(plugin.price)}`}>
                          {plugin.price.toUpperCase()}
                        </span>
                        {plugin.isVerified && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            VERIFIED
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{plugin.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <span className={getRatingColor(plugin.rating)}>⭐</span>
                          <span className="text-gray-900">{plugin.rating}</span>
                          <span className="text-gray-600">({plugin.reviewCount})</span>
                        </div>
                        <div className="text-gray-600">{plugin.downloads.toLocaleString()} downloads</div>
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {plugin.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                        {plugin.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                            +{plugin.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {plugin.isInstalled ? (
                        <button
                          onClick={() => uninstallPlugin(plugin.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-all"
                        >
                          Uninstall
                        </button>
                      ) : (
                        <button
                          onClick={() => installPlugin(plugin.id)}
                          disabled={isInstalling}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all disabled:opacity-50"
                        >
                          {isInstalling ? 'Installing...' : 'Install'}
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

          {selectedTab === 'installed' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Installed Plugins</h3>
              
              <div className="space-y-4">
                {plugins.filter(plugin => plugin.isInstalled).map((plugin) => (
                  <motion.div
                    key={plugin.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      plugin.isEnabled 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{plugin.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{plugin.name}</h4>
                        <p className="text-sm text-gray-600">{plugin.developer} • v{plugin.version}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          plugin.isEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {plugin.isEnabled ? 'ENABLED' : 'DISABLED'}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {plugin.size}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => togglePlugin(plugin.id)}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          plugin.isEnabled 
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {plugin.isEnabled ? 'Disable' : 'Enable'}
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Configure
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Open
                      </button>
                      <button
                        onClick={() => uninstallPlugin(plugin.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-all"
                      >
                        Uninstall
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'configure' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Plugin Configuration</h3>
              
              <div className="space-y-4">
                {plugins.filter(plugin => plugin.isInstalled).map((plugin) => {
                  const config = pluginConfigurations.find(c => c.pluginId === plugin.id);
                  return (
                    <motion.div
                      key={plugin.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-3xl">{plugin.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{plugin.name}</h4>
                          <p className="text-sm text-gray-600">{plugin.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          config?.isConfigured ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {config?.isConfigured ? 'CONFIGURED' : 'NEEDS CONFIGURATION'}
                        </span>
                      </div>
                      
                      {config && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-700">Current Settings:</div>
                          <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
                            {JSON.stringify(config.settings, null, 2)}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-3 flex items-center space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                          Configure
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                          Reset to Default
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedTab === 'categories' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Plugin Categories</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pluginCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{category.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {category.pluginCount} plugins
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Featured Plugins:</div>
                      <div className="flex flex-wrap gap-1">
                        {category.featuredPlugins.map((pluginId, index) => {
                          const plugin = plugins.find(p => p.id === pluginId);
                          return plugin ? (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              {plugin.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all">
                        Browse Category
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
            Plugin System • {plugins.length} plugins • {plugins.filter(plugin => plugin.isInstalled).length} installed • {plugins.filter(plugin => plugin.isEnabled).length} enabled
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
                console.log('Exporting plugin system data...');
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

export default PluginSystem;
