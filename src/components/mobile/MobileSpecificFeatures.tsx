/**
 * Mobile-Specific Features Component
 * 
 * Camera integration, GPS, push notifications, and mobile-specific functionality
 * Includes device capabilities, mobile UI components, and platform-specific features
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileFeature {
  id: string;
  name: string;
  description: string;
  category: 'camera' | 'location' | 'notifications' | 'sensors' | 'ui' | 'performance';
  platform: 'ios' | 'android' | 'both';
  implemented: boolean;
  permissions: string[];
  dependencies: string[];
}

interface DeviceCapability {
  id: string;
  name: string;
  available: boolean;
  permission: 'granted' | 'denied' | 'not-requested';
  usage: string;
}

interface MobileNotification {
  id: string;
  title: string;
  body: string;
  type: 'task' | 'energy' | 'reminder' | 'achievement';
  scheduled: string;
  sent: boolean;
  action?: string;
}

interface MobileSpecificFeaturesProps {
  onClose: () => void;
}

const MobileSpecificFeatures: React.FC<MobileSpecificFeaturesProps> = ({ onClose }) => {
  const [mobileFeatures, setMobileFeatures] = useState<MobileFeature[]>([]);
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapability[]>([]);
  const [notifications, setNotifications] = useState<MobileNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'features' | 'capabilities' | 'notifications' | 'permissions'>('features');
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    loadMobileFeatures();
  }, []);

  const loadMobileFeatures = async () => {
    setIsLoading(true);
    
    try {
      // Mock mobile features
      const mockFeatures: MobileFeature[] = [
        {
          id: 'feature-1',
          name: 'Camera Integration',
          description: 'Take photos for task attachments and project documentation',
          category: 'camera',
          platform: 'both',
          implemented: true,
          permissions: ['camera', 'photo-library'],
          dependencies: ['react-native-camera', 'react-native-image-picker']
        },
        {
          id: 'feature-2',
          name: 'GPS Location',
          description: 'Track location-based tasks and time tracking',
          category: 'location',
          platform: 'both',
          implemented: true,
          permissions: ['location', 'location-always'],
          dependencies: ['@react-native-community/geolocation']
        },
        {
          id: 'feature-3',
          name: 'Push Notifications',
          description: 'Send task reminders and achievement notifications',
          category: 'notifications',
          platform: 'both',
          implemented: true,
          permissions: ['notifications'],
          dependencies: ['@react-native-firebase/messaging']
        },
        {
          id: 'feature-4',
          name: 'Haptic Feedback',
          description: 'Provide tactile feedback for interactions',
          category: 'sensors',
          platform: 'both',
          implemented: false,
          permissions: ['haptic'],
          dependencies: ['react-native-haptic-feedback']
        },
        {
          id: 'feature-5',
          name: 'Biometric Authentication',
          description: 'Secure app access with fingerprint/face recognition',
          category: 'sensors',
          platform: 'both',
          implemented: false,
          permissions: ['biometric'],
          dependencies: ['react-native-biometrics']
        },
        {
          id: 'feature-6',
          name: 'Device Orientation',
          description: 'Adapt UI based on device orientation',
          category: 'ui',
          platform: 'both',
          implemented: true,
          permissions: ['orientation'],
          dependencies: ['react-native-orientation-locker']
        },
        {
          id: 'feature-7',
          name: 'Background Sync',
          description: 'Sync data in background when app is not active',
          category: 'performance',
          platform: 'both',
          implemented: false,
          permissions: ['background-refresh'],
          dependencies: ['@react-native-background-job']
        },
        {
          id: 'feature-8',
          name: 'Share Integration',
          description: 'Share tasks and projects with other apps',
          category: 'ui',
          platform: 'both',
          implemented: true,
          permissions: ['share'],
          dependencies: ['react-native-share']
        }
      ];

      // Mock device capabilities
      const mockCapabilities: DeviceCapability[] = [
        {
          id: 'cap-1',
          name: 'Camera',
          available: true,
          permission: 'granted',
          usage: 'Task attachments, project photos'
        },
        {
          id: 'cap-2',
          name: 'GPS Location',
          available: true,
          permission: 'granted',
          usage: 'Location-based tasks, time tracking'
        },
        {
          id: 'cap-3',
          name: 'Push Notifications',
          available: true,
          permission: 'granted',
          usage: 'Task reminders, achievements'
        },
        {
          id: 'cap-4',
          name: 'Haptic Feedback',
          available: true,
          permission: 'not-requested',
          usage: 'Touch feedback, vibrations'
        },
        {
          id: 'cap-5',
          name: 'Biometric Authentication',
          available: true,
          permission: 'denied',
          usage: 'Secure app access'
        },
        {
          id: 'cap-6',
          name: 'Microphone',
          available: true,
          permission: 'not-requested',
          usage: 'Voice notes, voice commands'
        }
      ];

      // Mock notifications
      const mockNotifications: MobileNotification[] = [
        {
          id: 'notif-1',
          title: 'Task Reminder',
          body: 'Complete project proposal is due in 1 hour',
          type: 'task',
          scheduled: new Date(Date.now() + 3600000).toISOString(),
          sent: false,
          action: 'Open Task'
        },
        {
          id: 'notif-2',
          title: 'Energy Level Low',
          body: 'Your energy is at 2/10. Consider taking a break.',
          type: 'energy',
          scheduled: new Date().toISOString(),
          sent: true
        },
        {
          id: 'notif-3',
          title: 'Achievement Unlocked!',
          body: 'You\'ve completed 10 tasks this week! 🎉',
          type: 'achievement',
          scheduled: new Date(Date.now() - 1800000).toISOString(),
          sent: true,
          action: 'View Achievement'
        },
        {
          id: 'notif-4',
          title: 'Daily Standup',
          body: 'Team standup meeting starts in 15 minutes',
          type: 'reminder',
          scheduled: new Date(Date.now() + 900000).toISOString(),
          sent: false,
          action: 'Join Meeting'
        }
      ];

      setMobileFeatures(mockFeatures);
      setDeviceCapabilities(mockCapabilities);
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Failed to load mobile features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testFeature = async (featureId: string) => {
    setIsTesting(true);
    
    try {
      // Simulate feature testing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Testing feature: ${featureId}`);
    } catch (error) {
      console.error('Failed to test feature:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const requestPermission = async (capabilityId: string) => {
    try {
      setDeviceCapabilities(prev => prev.map(cap => 
        cap.id === capabilityId 
          ? { ...cap, permission: 'granted' as const }
          : cap
      ));
      
      console.log(`Permission granted for: ${capabilityId}`);
    } catch (error) {
      console.error('Failed to request permission:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'camera': return '📷';
      case 'location': return '📍';
      case 'notifications': return '🔔';
      case 'sensors': return '📱';
      case 'ui': return '🎨';
      case 'performance': return '⚡';
      default: return '📄';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'ios': return '🍎';
      case 'android': return '🤖';
      case 'both': return '📱';
      default: return '📄';
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'granted': return 'text-green-600 bg-green-100';
      case 'denied': return 'text-red-600 bg-red-100';
      case 'not-requested': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task': return '📝';
      case 'energy': return '⚡';
      case 'reminder': return '⏰';
      case 'achievement': return '🏆';
      default: return '🔔';
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
            <span className="text-lg font-medium text-gray-700">Loading mobile features...</span>
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
              <h2 className="text-2xl font-bold">Mobile-Specific Features</h2>
              <p className="text-purple-100 mt-1">Camera integration, GPS, push notifications, and mobile-specific functionality</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Features:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {mobileFeatures.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Implemented:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {mobileFeatures.filter(f => f.implemented).length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Notifications:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {notifications.length}
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
              { id: 'features', name: 'Features', icon: '⚙️' },
              { id: 'capabilities', name: 'Capabilities', icon: '📱' },
              { id: 'notifications', name: 'Notifications', icon: '🔔' },
              { id: 'permissions', name: 'Permissions', icon: '🔐' }
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
                        <span className="text-lg">{getPlatformIcon(feature.platform)}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          feature.implemented ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {feature.implemented ? 'IMPLEMENTED' : 'PENDING'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <span className="ml-2 text-gray-900 capitalize">{feature.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Platform:</span>
                        <span className="ml-2 text-gray-900 capitalize">{feature.platform}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Permissions:</div>
                        <div className="text-xs text-gray-600">{feature.permissions.join(', ')}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Dependencies:</div>
                        <div className="text-xs text-gray-600">{feature.dependencies.join(', ')}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => testFeature(feature.id)}
                        disabled={isTesting || !feature.implemented}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all disabled:opacity-50"
                      >
                        {isTesting ? 'Testing...' : 'Test Feature'}
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Configure
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'capabilities' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Device Capabilities</h3>
              
              <div className="space-y-4">
                {deviceCapabilities.map((capability) => (
                  <motion.div
                    key={capability.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📱</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{capability.name}</h4>
                          <p className="text-sm text-gray-600">{capability.usage}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPermissionColor(capability.permission)}`}>
                          {capability.permission.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          capability.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {capability.available ? 'AVAILABLE' : 'UNAVAILABLE'}
                        </span>
                      </div>
                    </div>
                    
                    {capability.permission === 'not-requested' && (
                      <button
                        onClick={() => requestPermission(capability.id)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all"
                      >
                        Request Permission
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Push Notifications</h3>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      notification.sent ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.body}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.scheduled).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          notification.sent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {notification.sent ? 'SENT' : 'SCHEDULED'}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {notification.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    {notification.action && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">Action: </span>
                        <span className="text-sm font-medium text-gray-900">{notification.action}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'permissions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Permission Management</h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Required Permissions</h4>
                  <div className="space-y-3">
                    {['Camera', 'Location', 'Notifications', 'Storage'].map((permission) => (
                      <div key={permission} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{permission}</span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          GRANTED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Optional Permissions</h4>
                  <div className="space-y-3">
                    {['Microphone', 'Contacts', 'Calendar', 'Biometric'].map((permission) => (
                      <div key={permission} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{permission}</span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          NOT REQUESTED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Permission Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Request permissions on first use</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">Show permission explanations</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">Allow permission changes in settings</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Mobile-Specific Features • {mobileFeatures.filter(f => f.implemented).length}/{mobileFeatures.length} implemented • {notifications.length} notifications
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
                console.log('Exporting mobile features data...');
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

export default MobileSpecificFeatures;
