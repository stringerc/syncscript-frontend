/**
 * Mobile Push Notifications Component
 * 
 * Web push API integration, notification management, and mobile alerts
 * Includes permission handling, notification scheduling, and delivery tracking
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PushNotification {
  id: string;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: any;
  timestamp: string;
  status: 'sent' | 'delivered' | 'clicked' | 'dismissed' | 'failed';
  priority: 'low' | 'normal' | 'high';
  category: 'task' | 'project' | 'energy' | 'team' | 'system';
}

interface NotificationSettings {
  enabled: boolean;
  permission: NotificationPermission;
  categories: {
    task: boolean;
    project: boolean;
    energy: boolean;
    team: boolean;
    system: boolean;
  };
  schedule: {
    quietHours: boolean;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  frequency: 'immediate' | 'batched' | 'digest';
}

interface MobilePushNotificationsProps {
  onClose: () => void;
}

const MobilePushNotifications: React.FC<MobilePushNotificationsProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    permission: 'default',
    categories: {
      task: true,
      project: true,
      energy: true,
      team: true,
      system: true
    },
    schedule: {
      quietHours: false,
      startTime: '22:00',
      endTime: '08:00',
      timezone: 'UTC'
    },
    frequency: 'immediate'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'notifications' | 'settings' | 'stats' | 'test'>('notifications');

  useEffect(() => {
    initializePushNotifications();
  }, []);

  const initializePushNotifications = async () => {
    setIsLoading(true);
    
    try {
      // Check notification permission
      const permission = Notification.permission;
      
      // Load saved settings
      const savedSettings = localStorage.getItem('push_notification_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
      
      // Load notification history
      const savedNotifications = localStorage.getItem('push_notifications');
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
      
      // Update permission in settings
      setSettings(prev => ({ ...prev, permission }));
      
    } catch (error) {
      console.error('Failed to initialize push notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setSettings(prev => ({ ...prev, permission }));
      
      if (permission === 'granted') {
        setSettings(prev => ({ ...prev, enabled: true }));
        localStorage.setItem('push_notification_settings', JSON.stringify({
          ...settings,
          permission,
          enabled: true
        }));
      }
    } catch (error) {
      console.error('Failed to request notification permission:', error);
    }
  };

  const sendNotification = async (notification: Omit<PushNotification, 'id' | 'timestamp' | 'status'>) => {
    if (!settings.enabled || settings.permission !== 'granted') return;
    
    try {
      const newNotification: PushNotification = {
        ...notification,
        id: `push_${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };
      
      // Send actual notification
      const notificationObj = new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon || '/icon-192x192.png',
        badge: notification.badge || '/badge-72x72.png',
        image: notification.image,
        tag: notification.tag,
        data: notification.data,
        requireInteraction: notification.priority === 'high'
      });
      
      // Track notification events
      notificationObj.onclick = () => {
        updateNotificationStatus(newNotification.id, 'clicked');
      };
      
      notificationObj.onclose = () => {
        updateNotificationStatus(newNotification.id, 'dismissed');
      };
      
      // Add to history
      setNotifications(prev => [newNotification, ...prev.slice(0, 49)]);
      localStorage.setItem('push_notifications', JSON.stringify([newNotification, ...notifications.slice(0, 49)]));
      
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  const updateNotificationStatus = (notificationId: string, status: PushNotification['status']) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, status } : notif
    ));
  };

  const updateSettings = (updates: Partial<NotificationSettings>) => {
    const updatedSettings = { ...settings, ...updates };
    setSettings(updatedSettings);
    localStorage.setItem('push_notification_settings', JSON.stringify(updatedSettings));
  };

  const testNotification = () => {
    sendNotification({
      title: 'Test Notification',
      body: 'This is a test push notification from SyncScript',
      priority: 'normal',
      category: 'system',
      tag: 'test'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'clicked': return 'text-purple-600 bg-purple-100';
      case 'dismissed': return 'text-gray-600 bg-gray-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'task': return '📝';
      case 'project': return '📁';
      case 'energy': return '⚡';
      case 'team': return '👥';
      case 'system': return '🔔';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="text-lg font-medium text-gray-700">Initializing push notifications...</span>
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
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Mobile Push Notifications</h2>
              <p className="text-orange-100 mt-1">Web push API and notification management</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Permission:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    settings.permission === 'granted' ? 'bg-green-500' :
                    settings.permission === 'denied' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}>
                    {settings.permission.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Enabled:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    settings.enabled ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {settings.enabled ? 'ON' : 'OFF'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Notifications:</span>
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
              { id: 'notifications', name: 'Notifications', icon: '🔔' },
              { id: 'settings', name: 'Settings', icon: '⚙️' },
              { id: 'stats', name: 'Statistics', icon: '📊' },
              { id: 'test', name: 'Test', icon: '🧪' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-orange-500 text-orange-600'
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
          {selectedTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Push Notifications</h3>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getCategoryIcon(notification.category)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.body}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(notification.status)}`}>
                        {notification.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Permission</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        settings.permission === 'granted' ? 'bg-green-100 text-green-800' :
                        settings.permission === 'denied' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {settings.permission.toUpperCase()}
                      </span>
                    </div>
                    {settings.permission !== 'granted' && (
                      <button
                        onClick={requestPermission}
                        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Request Permission
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
                  <div className="space-y-3">
                    {Object.entries(settings.categories).map(([category, enabled]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{category}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => updateSettings({
                              categories: { ...settings.categories, [category]: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'test' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Test Notifications</h3>
              
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔔</div>
                  <div className="text-lg font-medium text-gray-700 mb-2">Test Push Notification</div>
                  <div className="text-sm text-gray-600 mb-4">
                    Send a test notification to verify your setup
                  </div>
                  <button
                    onClick={testNotification}
                    disabled={!settings.enabled || settings.permission !== 'granted'}
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                  >
                    Send Test Notification
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Mobile Push Notifications • {settings.permission} • {notifications.length} sent
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
                console.log('Exporting notification data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobilePushNotifications;
