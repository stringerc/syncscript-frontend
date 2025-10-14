/**
 * App Marketplace System Component
 * 
 * Third-party integrations and extensions
 * Includes app discovery, installation, management, and reviews
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MarketplaceApp {
  id: string;
  name: string;
  description: string;
  developer: string;
  category: 'productivity' | 'communication' | 'analytics' | 'automation' | 'integration' | 'customization';
  price: 'free' | 'freemium' | 'paid';
  priceAmount?: number;
  currency?: string;
  rating: number;
  reviewCount: number;
  downloads: number;
  version: string;
  lastUpdated: string;
  size: string;
  permissions: string[];
  features: string[];
  screenshots: string[];
  icon: string;
  isInstalled: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  tags: string[];
  compatibility: string[];
  requirements: string[];
}

interface AppReview {
  id: string;
  appId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  content: string;
  isVerified: boolean;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

interface AppCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  appCount: number;
  featuredApps: string[];
}

interface DeveloperProfile {
  id: string;
  name: string;
  description: string;
  avatar: string;
  website: string;
  email: string;
  isVerified: boolean;
  apps: string[];
  totalDownloads: number;
  averageRating: number;
  joinDate: string;
  location: string;
  specialties: string[];
}

interface AppMarketplaceProps {
  onClose: () => void;
}

const AppMarketplace: React.FC<AppMarketplaceProps> = ({ onClose }) => {
  const [marketplaceApps, setMarketplaceApps] = useState<MarketplaceApp[]>([]);
  const [appReviews, setAppReviews] = useState<AppReview[]>([]);
  const [appCategories, setAppCategories] = useState<AppCategory[]>([]);
  const [developerProfiles, setDeveloperProfiles] = useState<DeveloperProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'discover' | 'installed' | 'reviews' | 'developers'>('discover');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    loadMarketplaceData();
  }, []);

  const loadMarketplaceData = async () => {
    setIsLoading(true);
    
    try {
      // Mock marketplace apps
      const mockMarketplaceApps: MarketplaceApp[] = [
        {
          id: 'app-1',
          name: 'Slack Integration Pro',
          description: 'Advanced Slack integration with custom workflows and automation',
          developer: 'SyncScript Team',
          category: 'communication',
          price: 'freemium',
          priceAmount: 9.99,
          currency: 'USD',
          rating: 4.8,
          reviewCount: 1247,
          downloads: 45678,
          version: '2.1.0',
          lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          size: '15.2 MB',
          permissions: ['read_messages', 'send_messages', 'manage_channels'],
          features: ['Custom workflows', 'Automated responses', 'Team analytics', 'Message scheduling'],
          screenshots: ['https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Slack+Integration'],
          icon: '💬',
          isInstalled: true,
          isFeatured: true,
          isVerified: true,
          tags: ['slack', 'communication', 'automation', 'workflow'],
          compatibility: ['web', 'mobile', 'desktop'],
          requirements: ['Slack workspace', 'Admin permissions']
        },
        {
          id: 'app-2',
          name: 'Advanced Analytics Dashboard',
          description: 'Comprehensive analytics dashboard with custom metrics and reporting',
          developer: 'DataViz Solutions',
          category: 'analytics',
          price: 'paid',
          priceAmount: 19.99,
          currency: 'USD',
          rating: 4.6,
          reviewCount: 892,
          downloads: 23456,
          version: '1.8.2',
          lastUpdated: new Date(Date.now() - 172800000).toISOString(),
          size: '28.7 MB',
          permissions: ['read_data', 'export_data', 'create_reports'],
          features: ['Custom metrics', 'Real-time dashboards', 'Data export', 'Scheduled reports'],
          screenshots: ['https://via.placeholder.com/400x300/059669/FFFFFF?text=Analytics+Dashboard'],
          icon: '📊',
          isInstalled: false,
          isFeatured: true,
          isVerified: true,
          tags: ['analytics', 'dashboard', 'reporting', 'metrics'],
          compatibility: ['web', 'desktop'],
          requirements: ['SyncScript Pro', 'Data access permissions']
        },
        {
          id: 'app-3',
          name: 'Task Automation Suite',
          description: 'Powerful task automation with conditional logic and triggers',
          developer: 'AutoFlow Inc',
          category: 'automation',
          price: 'freemium',
          priceAmount: 14.99,
          currency: 'USD',
          rating: 4.9,
          reviewCount: 2156,
          downloads: 67890,
          version: '3.0.1',
          lastUpdated: new Date(Date.now() - 259200000).toISOString(),
          size: '22.1 MB',
          permissions: ['create_tasks', 'modify_tasks', 'access_calendar'],
          features: ['Conditional logic', 'Custom triggers', 'Bulk operations', 'Template library'],
          screenshots: ['https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Task+Automation'],
          icon: '⚡',
          isInstalled: false,
          isFeatured: false,
          isVerified: true,
          tags: ['automation', 'tasks', 'workflow', 'productivity'],
          compatibility: ['web', 'mobile', 'desktop'],
          requirements: ['SyncScript account', 'Task management permissions']
        },
        {
          id: 'app-4',
          name: 'Team Collaboration Hub',
          description: 'Enhanced team collaboration with video calls and screen sharing',
          developer: 'CollabTech',
          category: 'communication',
          price: 'free',
          rating: 4.4,
          reviewCount: 567,
          downloads: 12345,
          version: '1.5.3',
          lastUpdated: new Date(Date.now() - 345600000).toISOString(),
          size: '45.3 MB',
          permissions: ['access_camera', 'access_microphone', 'screen_share'],
          features: ['Video calls', 'Screen sharing', 'Team chat', 'File sharing'],
          screenshots: ['https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Team+Collaboration'],
          icon: '👥',
          isInstalled: true,
          isFeatured: false,
          isVerified: false,
          tags: ['team', 'collaboration', 'video', 'communication'],
          compatibility: ['web', 'mobile', 'desktop'],
          requirements: ['Camera access', 'Microphone access']
        },
        {
          id: 'app-5',
          name: 'Custom Theme Builder',
          description: 'Create and share custom themes for SyncScript interface',
          developer: 'ThemeCraft',
          category: 'customization',
          price: 'freemium',
          priceAmount: 4.99,
          currency: 'USD',
          rating: 4.7,
          reviewCount: 743,
          downloads: 18923,
          version: '2.0.0',
          lastUpdated: new Date(Date.now() - 432000000).toISOString(),
          size: '8.9 MB',
          permissions: ['modify_ui', 'access_themes'],
          features: ['Theme editor', 'Color palettes', 'Custom fonts', 'Theme sharing'],
          screenshots: ['https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Theme+Builder'],
          icon: '🎨',
          isInstalled: false,
          isFeatured: false,
          isVerified: true,
          tags: ['themes', 'customization', 'ui', 'design'],
          compatibility: ['web', 'desktop'],
          requirements: ['SyncScript account', 'UI modification permissions']
        },
        {
          id: 'app-6',
          name: 'Google Workspace Sync',
          description: 'Seamless integration with Google Workspace applications',
          developer: 'Google',
          category: 'integration',
          price: 'free',
          rating: 4.9,
          reviewCount: 3421,
          downloads: 98765,
          version: '1.2.1',
          lastUpdated: new Date(Date.now() - 518400000).toISOString(),
          size: '12.4 MB',
          permissions: ['read_gmail', 'access_drive', 'read_calendar'],
          features: ['Gmail integration', 'Drive sync', 'Calendar sync', 'Docs collaboration'],
          screenshots: ['https://via.placeholder.com/400x300/4285F4/FFFFFF?text=Google+Workspace'],
          icon: '🔗',
          isInstalled: true,
          isFeatured: true,
          isVerified: true,
          tags: ['google', 'workspace', 'integration', 'sync'],
          compatibility: ['web', 'mobile', 'desktop'],
          requirements: ['Google account', 'Workspace permissions']
        }
      ];

      // Mock app reviews
      const mockAppReviews: AppReview[] = [
        {
          id: 'review-1',
          appId: 'app-1',
          userId: 'user-1',
          userName: 'Sarah Johnson',
          userAvatar: 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=SJ',
          rating: 5,
          title: 'Excellent Slack integration!',
          content: 'This app has revolutionized our team communication. The automation features are incredible and save us hours every week.',
          isVerified: true,
          helpful: 23,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'review-2',
          appId: 'app-2',
          userId: 'user-2',
          userName: 'Mike Chen',
          userAvatar: 'https://via.placeholder.com/40x40/059669/FFFFFF?text=MC',
          rating: 4,
          title: 'Great analytics, but could be better',
          content: 'The dashboard is very comprehensive and the custom metrics are helpful. However, the UI could be more intuitive.',
          isVerified: true,
          helpful: 15,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'review-3',
          appId: 'app-3',
          userId: 'user-3',
          userName: 'Emily Rodriguez',
          userAvatar: 'https://via.placeholder.com/40x40/DC2626/FFFFFF?text=ER',
          rating: 5,
          title: 'Game changer for productivity!',
          content: 'This automation suite has completely transformed how we manage tasks. The conditional logic is powerful and easy to use.',
          isVerified: false,
          helpful: 31,
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          updatedAt: new Date(Date.now() - 259200000).toISOString()
        }
      ];

      // Mock app categories
      const mockAppCategories: AppCategory[] = [
        {
          id: 'productivity',
          name: 'Productivity',
          description: 'Apps to boost your productivity and efficiency',
          icon: '📈',
          appCount: 45,
          featuredApps: ['app-3', 'app-2']
        },
        {
          id: 'communication',
          name: 'Communication',
          description: 'Team communication and collaboration tools',
          icon: '💬',
          appCount: 32,
          featuredApps: ['app-1', 'app-4']
        },
        {
          id: 'analytics',
          name: 'Analytics',
          description: 'Data analysis and reporting applications',
          icon: '📊',
          appCount: 28,
          featuredApps: ['app-2']
        },
        {
          id: 'automation',
          name: 'Automation',
          description: 'Workflow automation and task management',
          icon: '⚡',
          appCount: 19,
          featuredApps: ['app-3']
        },
        {
          id: 'integration',
          name: 'Integration',
          description: 'Third-party service integrations',
          icon: '🔗',
          appCount: 67,
          featuredApps: ['app-6']
        },
        {
          id: 'customization',
          name: 'Customization',
          description: 'UI themes and personalization tools',
          icon: '🎨',
          appCount: 15,
          featuredApps: ['app-5']
        }
      ];

      // Mock developer profiles
      const mockDeveloperProfiles: DeveloperProfile[] = [
        {
          id: 'dev-1',
          name: 'SyncScript Team',
          description: 'Official SyncScript development team',
          avatar: 'https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=SS',
          website: 'https://syncscript.com',
          email: 'dev@syncscript.com',
          isVerified: true,
          apps: ['app-1'],
          totalDownloads: 45678,
          averageRating: 4.8,
          joinDate: new Date(Date.now() - 31536000000).toISOString(),
          location: 'San Francisco, CA',
          specialties: ['productivity', 'communication', 'integration']
        },
        {
          id: 'dev-2',
          name: 'DataViz Solutions',
          description: 'Specialized in data visualization and analytics',
          avatar: 'https://via.placeholder.com/60x60/059669/FFFFFF?text=DV',
          website: 'https://dataviz-solutions.com',
          email: 'contact@dataviz-solutions.com',
          isVerified: true,
          apps: ['app-2'],
          totalDownloads: 23456,
          averageRating: 4.6,
          joinDate: new Date(Date.now() - 15768000000).toISOString(),
          location: 'New York, NY',
          specialties: ['analytics', 'data-visualization', 'reporting']
        },
        {
          id: 'dev-3',
          name: 'AutoFlow Inc',
          description: 'Automation experts creating powerful workflow tools',
          avatar: 'https://via.placeholder.com/60x60/DC2626/FFFFFF?text=AF',
          website: 'https://autoflow-inc.com',
          email: 'hello@autoflow-inc.com',
          isVerified: true,
          apps: ['app-3'],
          totalDownloads: 67890,
          averageRating: 4.9,
          joinDate: new Date(Date.now() - 9460800000).toISOString(),
          location: 'Austin, TX',
          specialties: ['automation', 'workflow', 'productivity']
        }
      ];

      setMarketplaceApps(mockMarketplaceApps);
      setAppReviews(mockAppReviews);
      setAppCategories(mockAppCategories);
      setDeveloperProfiles(mockDeveloperProfiles);
    } catch (error) {
      console.error('Failed to load marketplace data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const installApp = async (appId: string) => {
    setIsInstalling(true);
    
    try {
      // Simulate app installation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setMarketplaceApps(prev => prev.map(app => 
        app.id === appId 
          ? { ...app, isInstalled: true }
          : app
      ));
      
      console.log(`Installed app: ${appId}`);
    } catch (error) {
      console.error('Failed to install app:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const uninstallApp = async (appId: string) => {
    try {
      setMarketplaceApps(prev => prev.map(app => 
        app.id === appId 
          ? { ...app, isInstalled: false }
          : app
      ));
      
      console.log(`Uninstalled app: ${appId}`);
    } catch (error) {
      console.error('Failed to uninstall app:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'productivity': return '📈';
      case 'communication': return '💬';
      case 'analytics': return '📊';
      case 'automation': return '⚡';
      case 'integration': return '🔗';
      case 'customization': return '🎨';
      default: return '📱';
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

  const filteredApps = marketplaceApps.filter(app => {
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading app marketplace...</span>
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">App Marketplace</h2>
              <p className="text-blue-100 mt-1">Third-party integrations and extensions</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Apps:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {marketplaceApps.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Installed:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {marketplaceApps.filter(app => app.isInstalled).length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Developers:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {developerProfiles.length}
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
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              {appCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
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
              { id: 'reviews', name: 'Reviews', icon: '⭐' },
              { id: 'developers', name: 'Developers', icon: '👨‍💻' }
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
          {selectedTab === 'discover' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Discover Apps</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredApps.map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      app.isInstalled 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{app.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{app.name}</h4>
                        <p className="text-sm text-gray-600">{app.developer}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriceColor(app.price)}`}>
                          {app.price.toUpperCase()}
                        </span>
                        {app.isFeatured && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{app.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <span className={getRatingColor(app.rating)}>⭐</span>
                          <span className="text-gray-900">{app.rating}</span>
                          <span className="text-gray-600">({app.reviewCount})</span>
                        </div>
                        <div className="text-gray-600">{app.downloads.toLocaleString()} downloads</div>
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {app.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                        {app.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                            +{app.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {app.isInstalled ? (
                        <button
                          onClick={() => uninstallApp(app.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-all"
                        >
                          Uninstall
                        </button>
                      ) : (
                        <button
                          onClick={() => installApp(app.id)}
                          disabled={isInstalling}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all disabled:opacity-50"
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
              <h3 className="text-lg font-semibold text-gray-900">Installed Apps</h3>
              
              <div className="space-y-4">
                {marketplaceApps.filter(app => app.isInstalled).map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-green-200 bg-green-50 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{app.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{app.name}</h4>
                        <p className="text-sm text-gray-600">{app.developer} • v{app.version}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          INSTALLED
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {app.size}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Open
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Settings
                      </button>
                      <button
                        onClick={() => uninstallApp(app.id)}
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

          {selectedTab === 'reviews' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">App Reviews</h3>
              
              <div className="space-y-4">
                {appReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <img 
                        src={review.userAvatar} 
                        alt={review.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{review.userName}</h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {review.isVerified && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          VERIFIED
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900">{review.title}</h5>
                      <p className="text-sm text-gray-600">{review.content}</p>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Helpful ({review.helpful})
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Reply
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'developers' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Developers</h3>
              
              <div className="space-y-4">
                {developerProfiles.map((developer) => (
                  <motion.div
                    key={developer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <img 
                        src={developer.avatar} 
                        alt={developer.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{developer.name}</h4>
                        <p className="text-sm text-gray-600">{developer.description}</p>
                        <p className="text-sm text-gray-500">{developer.location}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {developer.isVerified && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            VERIFIED
                          </span>
                        )}
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {developer.apps.length} apps
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Total Downloads:</span>
                          <span className="ml-2 text-gray-900">{developer.totalDownloads.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Average Rating:</span>
                          <span className="ml-2 text-gray-900">{developer.averageRating}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Specialties:</div>
                      <div className="flex flex-wrap gap-1">
                        {developer.specialties.map((specialty, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {specialty.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View Apps
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Contact
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
            App Marketplace • {marketplaceApps.length} apps • {marketplaceApps.filter(app => app.isInstalled).length} installed • {developerProfiles.length} developers
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
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppMarketplace;
