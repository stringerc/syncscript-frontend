/**
 * Live Presence System Component
 * 
 * Real-time user presence tracking with activity monitoring,
 * status updates, and collaborative awareness features
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserPresence {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  currentActivity: string;
  lastSeen: string;
  location: {
    page: string;
    section?: string;
    element?: string;
  };
  typing: boolean;
  focusTime: number; // minutes
  productivityScore: number;
  recentActions: ActivityAction[];
}

interface ActivityAction {
  id: string;
  type: 'task_created' | 'task_completed' | 'project_updated' | 'comment_added' | 'file_shared' | 'meeting_joined';
  description: string;
  timestamp: string;
  resourceId?: string;
  resourceName?: string;
}

interface TeamActivity {
  id: string;
  type: 'sprint_started' | 'milestone_reached' | 'team_meeting' | 'project_launched' | 'goal_achieved';
  title: string;
  description: string;
  participants: string[];
  timestamp: string;
  impact: 'low' | 'medium' | 'high';
}

interface LivePresenceSystemProps {
  teamId: string;
  onClose: () => void;
}

const LivePresenceSystem: React.FC<LivePresenceSystemProps> = ({ teamId, onClose }) => {
  const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);
  const [teamActivity, setTeamActivity] = useState<TeamActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'presence' | 'activity' | 'insights' | 'settings'>('presence');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'status' | 'activity' | 'productivity'>('status');

  useEffect(() => {
    loadPresenceData();
  }, [teamId]);

  const loadPresenceData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user presence data
      const mockUsers: UserPresence[] = [
        {
          userId: 'user-1',
          name: 'John Admin',
          email: 'admin@team.com',
          status: 'online',
          currentActivity: 'Editing project roadmap',
          lastSeen: new Date().toISOString(),
          location: {
            page: 'Projects',
            section: 'Project Management',
            element: 'roadmap-editor'
          },
          typing: true,
          focusTime: 45,
          productivityScore: 92,
          recentActions: [
            {
              id: 'action-1',
              type: 'task_completed',
              description: 'Completed user authentication setup',
              timestamp: new Date(Date.now() - 300000).toISOString(),
              resourceId: 'task-123',
              resourceName: 'Auth Setup'
            },
            {
              id: 'action-2',
              type: 'project_updated',
              description: 'Updated project timeline',
              timestamp: new Date(Date.now() - 600000).toISOString(),
              resourceId: 'project-456',
              resourceName: 'Mobile App'
            }
          ]
        },
        {
          userId: 'user-2',
          name: 'Jane Manager',
          email: 'manager@team.com',
          status: 'away',
          currentActivity: 'In team meeting',
          lastSeen: new Date(Date.now() - 300000).toISOString(),
          location: {
            page: 'Meetings',
            section: 'Video Call',
            element: 'meeting-room'
          },
          typing: false,
          focusTime: 120,
          productivityScore: 87,
          recentActions: [
            {
              id: 'action-3',
              type: 'meeting_joined',
              description: 'Joined sprint planning meeting',
              timestamp: new Date(Date.now() - 900000).toISOString(),
              resourceId: 'meeting-789',
              resourceName: 'Sprint Planning'
            }
          ]
        },
        {
          userId: 'user-3',
          name: 'Bob Developer',
          email: 'developer@team.com',
          status: 'busy',
          currentActivity: 'Debugging API issues',
          lastSeen: new Date(Date.now() - 60000).toISOString(),
          location: {
            page: 'Code',
            section: 'API Debugging',
            element: 'debugger'
          },
          typing: true,
          focusTime: 90,
          productivityScore: 78,
          recentActions: [
            {
              id: 'action-4',
              type: 'task_created',
              description: 'Created bug fix task',
              timestamp: new Date(Date.now() - 1200000).toISOString(),
              resourceId: 'task-456',
              resourceName: 'API Bug Fix'
            }
          ]
        },
        {
          userId: 'user-4',
          name: 'Alice Designer',
          email: 'designer@team.com',
          status: 'online',
          currentActivity: 'Creating UI mockups',
          lastSeen: new Date(Date.now() - 120000).toISOString(),
          location: {
            page: 'Design',
            section: 'UI Mockups',
            element: 'figma-editor'
          },
          typing: false,
          focusTime: 60,
          productivityScore: 95,
          recentActions: [
            {
              id: 'action-5',
              type: 'file_shared',
              description: 'Shared design system updates',
              timestamp: new Date(Date.now() - 1800000).toISOString(),
              resourceId: 'file-789',
              resourceName: 'Design System'
            }
          ]
        }
      ];

      // Mock team activity data
      const mockTeamActivity: TeamActivity[] = [
        {
          id: 'activity-1',
          type: 'milestone_reached',
          title: 'Q1 Milestone Achieved',
          description: 'Team successfully completed Q1 objectives',
          participants: ['user-1', 'user-2', 'user-3', 'user-4'],
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          impact: 'high'
        },
        {
          id: 'activity-2',
          type: 'sprint_started',
          title: 'Sprint 12 Started',
          description: 'New sprint focused on mobile optimization',
          participants: ['user-1', 'user-2', 'user-3'],
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          impact: 'medium'
        },
        {
          id: 'activity-3',
          type: 'project_launched',
          title: 'Beta Version Launched',
          description: 'Beta version released to test users',
          participants: ['user-1', 'user-4'],
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          impact: 'high'
        }
      ];

      setOnlineUsers(mockUsers);
      setTeamActivity(mockTeamActivity);
    } catch (error) {
      console.error('Failed to load presence data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = onlineUsers.filter(user => {
    if (filterStatus === 'all') return true;
    return user.status === filterStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'status':
        const statusOrder = { 'online': 0, 'away': 1, 'busy': 2, 'offline': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      case 'activity':
        return b.focusTime - a.focusTime;
      case 'productivity':
        return b.productivityScore - a.productivityScore;
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'away': return 'text-yellow-600 bg-yellow-100';
      case 'busy': return 'text-red-600 bg-red-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '🟢';
      case 'away': return '🟡';
      case 'busy': return '🔴';
      case 'offline': return '⚫';
      default: return '⚫';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_created': return '📝';
      case 'task_completed': return '✅';
      case 'project_updated': return '📂';
      case 'comment_added': return '💬';
      case 'file_shared': return '📁';
      case 'meeting_joined': return '🎥';
      default: return '📄';
    }
  };

  const getTeamActivityIcon = (type: string) => {
    switch (type) {
      case 'sprint_started': return '🏃';
      case 'milestone_reached': return '🎯';
      case 'team_meeting': return '👥';
      case 'project_launched': return '🚀';
      case 'goal_achieved': return '🏆';
      default: return '📊';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading presence data...</span>
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Live Presence System</h2>
              <p className="text-green-100 mt-1">Real-time team activity and collaboration awareness</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Online:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {onlineUsers.filter(u => u.status === 'online').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Away:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {onlineUsers.filter(u => u.status === 'away').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Busy:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {onlineUsers.filter(u => u.status === 'busy').length}
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
              { id: 'presence', name: 'Team Presence', icon: '👥' },
              { id: 'activity', name: 'Activity Feed', icon: '📊' },
              { id: 'insights', name: 'Insights', icon: '💡' },
              { id: 'settings', name: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-green-500 text-green-600'
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
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="status">Status</option>
                <option value="activity">Activity</option>
                <option value="productivity">Productivity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'presence' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Team Presence</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedUsers.map((user) => (
                  <motion.div
                    key={user.userId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          user.status === 'online' ? 'bg-green-500' :
                          user.status === 'away' ? 'bg-yellow-500' :
                          user.status === 'busy' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`}></div>
                        {user.typing && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
                          {getStatusIcon(user.status)} {user.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Activity</span>
                        <span className="text-sm font-medium text-gray-900">{user.currentActivity}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Location</span>
                        <span className="text-sm text-gray-900">{user.location.page}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Focus Time</span>
                        <span className="text-sm font-medium text-gray-900">{user.focusTime}m</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Productivity</span>
                        <span className="text-sm font-medium text-gray-900">{user.productivityScore}%</span>
                      </div>
                    </div>
                    
                    {user.recentActions.length > 0 && (
                      <div className="border-t pt-2">
                        <div className="text-xs font-medium text-gray-700 mb-1">Recent Actions:</div>
                        <div className="space-y-1">
                          {user.recentActions.slice(0, 2).map((action) => (
                            <div key={action.id} className="flex items-center space-x-2 text-xs text-gray-600">
                              <span>{getActivityIcon(action.type)}</span>
                              <span className="truncate">{action.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'activity' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Team Activity Feed</h3>
              
              <div className="space-y-4">
                {teamActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getTeamActivityIcon(activity.type)}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{activity.title}</div>
                        <div className="text-sm text-gray-600">{activity.description}</div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(activity.impact)}`}>
                          {activity.impact.toUpperCase()}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">Participants:</span>
                      <div className="flex space-x-1">
                        {activity.participants.map((participantId) => {
                          const user = onlineUsers.find(u => u.userId === participantId);
                          return (
                            <div key={participantId} className="w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {user ? user.name.split(' ').map(n => n[0]).join('') : '?'}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Team Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📊</span>
                    <span className="text-lg text-green-600">+12%</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    {onlineUsers.reduce((sum, user) => sum + user.productivityScore, 0) / onlineUsers.length}%
                  </div>
                  <div className="text-green-600 text-sm">Average Productivity</div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">⏱️</span>
                    <span className="text-lg text-blue-600">+8%</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {Math.round(onlineUsers.reduce((sum, user) => sum + user.focusTime, 0) / onlineUsers.length)}m
                  </div>
                  <div className="text-blue-600 text-sm">Average Focus Time</div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🎯</span>
                    <span className="text-lg text-purple-600">+15%</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {onlineUsers.filter(u => u.status === 'online').length}
                  </div>
                  <div className="text-purple-600 text-sm">Active Collaborators</div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">⚡</span>
                    <span className="text-lg text-orange-600">+22%</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">
                    {onlineUsers.reduce((sum, user) => sum + user.recentActions.length, 0)}
                  </div>
                  <div className="text-orange-600 text-sm">Recent Actions</div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Presence Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Privacy Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Show Activity</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Show Location</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Show Typing Status</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Notification Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Team Activity</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status Changes</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Milestone Achievements</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
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
            Live Presence • {onlineUsers.length} team members • Last updated {new Date().toLocaleTimeString()}
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
                console.log('Exporting presence data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LivePresenceSystem;
