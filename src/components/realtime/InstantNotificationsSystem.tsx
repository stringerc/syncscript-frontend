/**
 * Instant Notifications System Component
 * 
 * Real-time alerts, team activities, and notification management
 * Includes push notifications, email alerts, and notification preferences
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'task_assigned' | 'task_due' | 'project_update' | 'team_mention' | 'deadline_approaching' | 'milestone_reached' | 'system_alert' | 'collaboration_invite';
  title: string;
  message: string;
  userId: string;
  teamId: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'task' | 'project' | 'team' | 'system' | 'collaboration';
  actionUrl?: string;
  metadata: {
    resourceId?: string;
    resourceType?: string;
    senderId?: string;
    senderName?: string;
    expiresAt?: string;
    requiresAction: boolean;
  };
}

interface NotificationPreferences {
  userId: string;
  teamId: string;
  email: {
    enabled: boolean;
    frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
    types: string[];
  };
  push: {
    enabled: boolean;
    types: string[];
  };
  inApp: {
    enabled: boolean;
    types: string[];
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
}

interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
  byCategory: Record<string, number>;
  avgResponseTime: number; // minutes
}

interface InstantNotificationsSystemProps {
  teamId: string;
  userId: string;
  onClose: () => void;
}

const InstantNotificationsSystem: React.FC<InstantNotificationsSystemProps> = ({ teamId, userId, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [stats, setStats] = useState<NotificationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'notifications' | 'preferences' | 'stats' | 'settings'>('notifications');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterRead, setFilterRead] = useState<string>('all');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    loadNotificationData();
  }, [teamId, userId]);

  const loadNotificationData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock notifications
      const mockNotifications: Notification[] = [
        {
          id: 'notif-1',
          type: 'task_assigned',
          title: 'New Task Assigned',
          message: 'You have been assigned to "Implement user authentication" task',
          userId,
          teamId,
          timestamp: new Date().toISOString(),
          read: false,
          priority: 'high',
          category: 'task',
          actionUrl: '/tasks/task-123',
          metadata: {
            resourceId: 'task-123',
            resourceType: 'task',
            senderId: 'user-1',
            senderName: 'John Admin',
            requiresAction: true
          }
        },
        {
          id: 'notif-2',
          type: 'deadline_approaching',
          title: 'Deadline Approaching',
          message: 'Project "Mobile App Development" deadline is in 2 days',
          userId,
          teamId,
          timestamp: new Date(Date.now() - 300000).toISOString(),
          read: false,
          priority: 'urgent',
          category: 'project',
          actionUrl: '/projects/project-789',
          metadata: {
            resourceId: 'project-789',
            resourceType: 'project',
            requiresAction: true
          }
        },
        {
          id: 'notif-3',
          type: 'team_mention',
          title: 'You were mentioned',
          message: 'Alice Designer mentioned you in a comment on task "UI Mockups"',
          userId,
          teamId,
          timestamp: new Date(Date.now() - 600000).toISOString(),
          read: true,
          priority: 'medium',
          category: 'team',
          actionUrl: '/tasks/task-456',
          metadata: {
            resourceId: 'task-456',
            resourceType: 'task',
            senderId: 'user-4',
            senderName: 'Alice Designer',
            requiresAction: false
          }
        },
        {
          id: 'notif-4',
          type: 'milestone_reached',
          title: 'Milestone Achieved',
          message: 'Team successfully completed Q1 objectives milestone',
          userId,
          teamId,
          timestamp: new Date(Date.now() - 900000).toISOString(),
          read: true,
          priority: 'medium',
          category: 'team',
          metadata: {
            requiresAction: false
          }
        },
        {
          id: 'notif-5',
          type: 'collaboration_invite',
          title: 'Collaboration Invite',
          message: 'Bob Developer invited you to collaborate on "API Integration" project',
          userId,
          teamId,
          timestamp: new Date(Date.now() - 1200000).toISOString(),
          read: false,
          priority: 'high',
          category: 'collaboration',
          actionUrl: '/projects/project-101',
          metadata: {
            resourceId: 'project-101',
            resourceType: 'project',
            senderId: 'user-3',
            senderName: 'Bob Developer',
            requiresAction: true
          }
        }
      ];

      // Mock preferences
      const mockPreferences: NotificationPreferences = {
        userId,
        teamId,
        email: {
          enabled: true,
          frequency: 'hourly',
          types: ['task_assigned', 'deadline_approaching', 'milestone_reached']
        },
        push: {
          enabled: true,
          types: ['task_assigned', 'team_mention', 'collaboration_invite']
        },
        inApp: {
          enabled: true,
          types: ['task_assigned', 'task_due', 'project_update', 'team_mention', 'deadline_approaching', 'milestone_reached', 'system_alert', 'collaboration_invite']
        },
        quietHours: {
          enabled: true,
          start: '22:00',
          end: '08:00',
          timezone: 'UTC'
        }
      };

      // Mock stats
      const mockStats: NotificationStats = {
        total: mockNotifications.length,
        unread: mockNotifications.filter(n => !n.read).length,
        byType: {
          'task_assigned': 1,
          'deadline_approaching': 1,
          'team_mention': 1,
          'milestone_reached': 1,
          'collaboration_invite': 1
        },
        byPriority: {
          'urgent': 1,
          'high': 2,
          'medium': 2,
          'low': 0
        },
        byCategory: {
          'task': 1,
          'project': 1,
          'team': 2,
          'collaboration': 1,
          'system': 0
        },
        avgResponseTime: 15.5
      };

      setNotifications(mockNotifications);
      setPreferences(mockPreferences);
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load notification data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const updatePreferences = (newPreferences: Partial<NotificationPreferences>) => {
    if (preferences) {
      setPreferences({ ...preferences, ...newPreferences });
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    const typeMatch = filterType === 'all' || notif.type === filterType;
    const priorityMatch = filterPriority === 'all' || notif.priority === filterPriority;
    const readMatch = filterRead === 'all' || (filterRead === 'read' ? notif.read : !notif.read);
    return typeMatch && priorityMatch && readMatch;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task_assigned': return '📝';
      case 'task_due': return '⏰';
      case 'project_update': return '📂';
      case 'team_mention': return '👥';
      case 'deadline_approaching': return '⚠️';
      case 'milestone_reached': return '🎯';
      case 'system_alert': return '🚨';
      case 'collaboration_invite': return '🤝';
      default: return '📄';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'task': return 'text-blue-600 bg-blue-100';
      case 'project': return 'text-purple-600 bg-purple-100';
      case 'team': return 'text-green-600 bg-green-100';
      case 'system': return 'text-red-600 bg-red-100';
      case 'collaboration': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
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
            <span className="text-lg font-medium text-gray-700">Loading notifications...</span>
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
              <h2 className="text-2xl font-bold">Instant Notifications</h2>
              <p className="text-orange-100 mt-1">Real-time alerts and team communication</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    isConnected ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Total:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {stats?.total || 0}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Unread:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {stats?.unread || 0}
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
              { id: 'preferences', name: 'Preferences', icon: '⚙️' },
              { id: 'stats', name: 'Statistics', icon: '📊' },
              { id: 'settings', name: 'Settings', icon: '🔧' }
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

        {/* Filters */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Type:</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Types</option>
                <option value="task_assigned">Task Assigned</option>
                <option value="deadline_approaching">Deadline Approaching</option>
                <option value="team_mention">Team Mention</option>
                <option value="collaboration_invite">Collaboration Invite</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Priority:</span>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <select
                value={filterRead}
                onChange={(e) => setFilterRead(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
            <button
              onClick={markAllAsRead}
              className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-all text-sm"
            >
              Mark All Read
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      notification.read ? 'border-gray-200 bg-gray-50' : 'border-orange-200 bg-orange-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                              {notification.priority.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(notification.category)}`}>
                              {notification.category.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <p className={`text-sm mb-3 ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {new Date(notification.timestamp).toLocaleString()}
                            {notification.metadata.senderName && (
                              <span> • From {notification.metadata.senderName}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-all"
                              >
                                Mark Read
                              </button>
                            )}
                            {notification.actionUrl && (
                              <button
                                onClick={() => {
                                  console.log('Navigate to:', notification.actionUrl);
                                }}
                                className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs hover:bg-orange-200 transition-all"
                              >
                                View
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'preferences' && preferences && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Enable Email</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={preferences.email.enabled}
                          onChange={(e) => updatePreferences({
                            email: { ...preferences.email, enabled: e.target.checked }
                          })}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                      <select 
                        value={preferences.email.frequency}
                        onChange={(e) => updatePreferences({
                          email: { ...preferences.email, frequency: e.target.value as any }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="immediate">Immediate</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Enable Push</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={preferences.push.enabled}
                          onChange={(e) => updatePreferences({
                            push: { ...preferences.push, enabled: e.target.checked }
                          })}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notification Types</label>
                      <div className="space-y-2">
                        {['task_assigned', 'team_mention', 'collaboration_invite', 'deadline_approaching'].map((type) => (
                          <label key={type} className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={preferences.push.types.includes(type)}
                              onChange={(e) => {
                                const newTypes = e.target.checked 
                                  ? [...preferences.push.types, type]
                                  : preferences.push.types.filter(t => t !== type);
                                updatePreferences({
                                  push: { ...preferences.push, types: newTypes }
                                });
                              }}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-600">{type.replace('_', ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'stats' && stats && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Statistics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📊</span>
                    <span className="text-lg text-orange-600">+5%</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">{stats.total}</div>
                  <div className="text-orange-600 text-sm">Total Notifications</div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🔔</span>
                    <span className="text-lg text-red-600">-12%</span>
                  </div>
                  <div className="text-2xl font-bold text-red-900">{stats.unread}</div>
                  <div className="text-red-600 text-sm">Unread Notifications</div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">⏱️</span>
                    <span className="text-lg text-blue-600">-8%</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{stats.avgResponseTime}m</div>
                  <div className="text-blue-600 text-sm">Avg Response Time</div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📈</span>
                    <span className="text-lg text-green-600">+15%</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    {Math.round((stats.total - stats.unread) / stats.total * 100)}%
                  </div>
                  <div className="text-green-600 text-sm">Read Rate</div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">General Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sound Notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Desktop Notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Auto Mark as Read</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Quiet Hours</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Enable Quiet Hours</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                      <input 
                        type="time" 
                        defaultValue="22:00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                      <input 
                        type="time" 
                        defaultValue="08:00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Instant Notifications • {stats?.total || 0} total • {stats?.unread || 0} unread
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

export default InstantNotificationsSystem;
