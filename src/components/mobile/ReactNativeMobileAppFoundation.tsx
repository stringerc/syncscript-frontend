/**
 * React Native Mobile App Foundation Component
 * 
 * Core mobile app structure, navigation, and mobile-specific features
 * Includes React Native setup, mobile navigation, and cross-platform compatibility
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileApp {
  id: string;
  name: string;
  platform: 'ios' | 'android' | 'cross-platform';
  version: string;
  status: 'development' | 'testing' | 'production';
  features: string[];
  lastUpdated: string;
}

interface MobileFeature {
  id: string;
  name: string;
  description: string;
  category: 'navigation' | 'ui' | 'performance' | 'integration' | 'offline';
  implemented: boolean;
  priority: number;
  dependencies: string[];
}

interface MobileNavigation {
  id: string;
  name: string;
  icon: string;
  route: string;
  badge?: number;
  active: boolean;
}

interface ReactNativeMobileAppFoundationProps {
  onClose: () => void;
}

const ReactNativeMobileAppFoundation: React.FC<ReactNativeMobileAppFoundationProps> = ({ onClose }) => {
  const [mobileApps, setMobileApps] = useState<MobileApp[]>([]);
  const [mobileFeatures, setMobileFeatures] = useState<MobileFeature[]>([]);
  const [mobileNavigation, setMobileNavigation] = useState<MobileNavigation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'apps' | 'features' | 'navigation' | 'setup'>('apps');
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    loadMobileData();
  }, []);

  const loadMobileData = async () => {
    setIsLoading(true);
    
    try {
      // Mock mobile apps
      const mockApps: MobileApp[] = [
        {
          id: 'app-1',
          name: 'SyncScript iOS',
          platform: 'ios',
          version: '1.0.0',
          status: 'development',
          features: ['Task Management', 'Energy Tracking', 'AI Assistant', 'Offline Sync'],
          lastUpdated: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'app-2',
          name: 'SyncScript Android',
          platform: 'android',
          version: '1.0.0',
          status: 'development',
          features: ['Task Management', 'Energy Tracking', 'AI Assistant', 'Offline Sync'],
          lastUpdated: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 'app-3',
          name: 'SyncScript Universal',
          platform: 'cross-platform',
          version: '1.0.0',
          status: 'testing',
          features: ['Cross-Platform Sync', 'Universal UI', 'Shared Components'],
          lastUpdated: new Date(Date.now() - 1800000).toISOString()
        }
      ];

      // Mock mobile features
      const mockFeatures: MobileFeature[] = [
        {
          id: 'feature-1',
          name: 'React Native Navigation',
          description: 'Implement React Navigation for seamless mobile navigation',
          category: 'navigation',
          implemented: true,
          priority: 10,
          dependencies: ['react-navigation', 'react-native-screens']
        },
        {
          id: 'feature-2',
          name: 'Touch Gestures',
          description: 'Add swipe, pinch, and tap gestures for mobile interaction',
          category: 'ui',
          implemented: true,
          priority: 9,
          dependencies: ['react-native-gesture-handler']
        },
        {
          id: 'feature-3',
          name: 'Offline Storage',
          description: 'Implement AsyncStorage for offline data persistence',
          category: 'offline',
          implemented: true,
          priority: 10,
          dependencies: ['@react-native-async-storage/async-storage']
        },
        {
          id: 'feature-4',
          name: 'Push Notifications',
          description: 'Add push notification support for task reminders',
          category: 'integration',
          implemented: false,
          priority: 8,
          dependencies: ['@react-native-firebase/messaging']
        },
        {
          id: 'feature-5',
          name: 'Camera Integration',
          description: 'Add camera functionality for task attachments',
          category: 'integration',
          implemented: false,
          priority: 7,
          dependencies: ['react-native-camera', 'react-native-image-picker']
        },
        {
          id: 'feature-6',
          name: 'Haptic Feedback',
          description: 'Add haptic feedback for better mobile experience',
          category: 'ui',
          implemented: false,
          priority: 6,
          dependencies: ['react-native-haptic-feedback']
        },
        {
          id: 'feature-7',
          name: 'Performance Optimization',
          description: 'Optimize app performance with lazy loading and virtualization',
          category: 'performance',
          implemented: false,
          priority: 8,
          dependencies: ['react-native-fast-image', 'react-native-reanimated']
        }
      ];

      // Mock mobile navigation
      const mockNavigation: MobileNavigation[] = [
        {
          id: 'nav-1',
          name: 'Dashboard',
          icon: '🏠',
          route: '/dashboard',
          active: true
        },
        {
          id: 'nav-2',
          name: 'Tasks',
          icon: '📝',
          route: '/tasks',
          badge: 5,
          active: false
        },
        {
          id: 'nav-3',
          name: 'Energy',
          icon: '⚡',
          route: '/energy',
          active: false
        },
        {
          id: 'nav-4',
          name: 'AI Assistant',
          icon: '🤖',
          route: '/ai-assistant',
          active: false
        },
        {
          id: 'nav-5',
          name: 'Analytics',
          icon: '📊',
          route: '/analytics',
          active: false
        },
        {
          id: 'nav-6',
          name: 'Settings',
          icon: '⚙️',
          route: '/settings',
          active: false
        }
      ];

      setMobileApps(mockApps);
      setMobileFeatures(mockFeatures);
      setMobileNavigation(mockNavigation);
    } catch (error) {
      console.error('Failed to load mobile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buildMobileApp = async (appId: string) => {
    setIsBuilding(true);
    
    try {
      // Simulate mobile app build process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setMobileApps(prev => prev.map(app => 
        app.id === appId 
          ? { ...app, status: 'testing' as const, lastUpdated: new Date().toISOString() }
          : app
      ));
      
      console.log(`Building ${appId}...`);
    } catch (error) {
      console.error('Failed to build mobile app:', error);
    } finally {
      setIsBuilding(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'development': return 'text-blue-600 bg-blue-100';
      case 'testing': return 'text-yellow-600 bg-yellow-100';
      case 'production': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'ios': return '🍎';
      case 'android': return '🤖';
      case 'cross-platform': return '🌐';
      default: return '📱';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'navigation': return '🧭';
      case 'ui': return '🎨';
      case 'performance': return '⚡';
      case 'integration': return '🔗';
      case 'offline': return '📱';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading mobile app foundation...</span>
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
              <h2 className="text-2xl font-bold">React Native Mobile App Foundation</h2>
              <p className="text-blue-100 mt-1">Core mobile app structure, navigation, and cross-platform compatibility</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Apps:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {mobileApps.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Features:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {mobileFeatures.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Implemented:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {mobileFeatures.filter(f => f.implemented).length}
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
              { id: 'apps', name: 'Mobile Apps', icon: '📱' },
              { id: 'features', name: 'Features', icon: '⚙️' },
              { id: 'navigation', name: 'Navigation', icon: '🧭' },
              { id: 'setup', name: 'Setup Guide', icon: '📋' }
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
          {selectedTab === 'apps' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Mobile Applications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mobileApps.map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{getPlatformIcon(app.platform)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{app.name}</h4>
                        <p className="text-sm text-gray-600">v{app.version}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(app.status)}`}>
                          {app.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Platform:</span>
                        <span className="text-sm font-medium text-gray-900 capitalize">{app.platform}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Features:</span>
                        <span className="text-sm font-medium text-gray-900">{app.features.length}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Key Features:</div>
                        <div className="text-xs text-gray-600">{app.features.slice(0, 3).join(', ')}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-2">
                      <button
                        onClick={() => buildMobileApp(app.id)}
                        disabled={isBuilding}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all disabled:opacity-50"
                      >
                        {isBuilding ? 'Building...' : 'Build App'}
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

          {selectedTab === 'features' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Mobile Features</h3>
              
              <div className="space-y-4">
                {mobileFeatures.map((feature) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getCategoryIcon(feature.category)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{feature.name}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          feature.implemented ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {feature.implemented ? 'IMPLEMENTED' : 'PENDING'}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Priority {feature.priority}/10
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <span className="ml-2 text-gray-900 capitalize">{feature.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Dependencies:</span>
                        <span className="ml-2 text-gray-900">{feature.dependencies.length}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Dependencies:</div>
                      <div className="text-xs text-gray-600">{feature.dependencies.join(', ')}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'navigation' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Mobile Navigation</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mobileNavigation.map((nav) => (
                  <motion.div
                    key={nav.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      nav.active 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{nav.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{nav.name}</h4>
                        <p className="text-sm text-gray-600">{nav.route}</p>
                      </div>
                      {nav.badge && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          {nav.badge}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'setup' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">React Native Setup Guide</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">1. Install React Native CLI</h4>
                  <code className="text-sm text-gray-700 bg-white p-2 rounded block">
                    npm install -g @react-native-community/cli
                  </code>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">2. Create New Project</h4>
                  <code className="text-sm text-gray-700 bg-white p-2 rounded block">
                    npx react-native init SyncScriptMobile
                  </code>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">3. Install Dependencies</h4>
                  <code className="text-sm text-gray-700 bg-white p-2 rounded block">
                    npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
                  </code>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">4. Install Additional Packages</h4>
                  <code className="text-sm text-gray-700 bg-white p-2 rounded block">
                    npm install @react-native-async-storage/async-storage react-native-gesture-handler react-native-reanimated
                  </code>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">5. Run on Device</h4>
                  <code className="text-sm text-gray-700 bg-white p-2 rounded block">
                    npx react-native run-ios
                    npx react-native run-android
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            React Native Mobile App Foundation • {mobileApps.length} apps • {mobileFeatures.filter(f => f.implemented).length}/{mobileFeatures.length} features implemented
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
                console.log('Exporting mobile app data...');
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

export default ReactNativeMobileAppFoundation;
