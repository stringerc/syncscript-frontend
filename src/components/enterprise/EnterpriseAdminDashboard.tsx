/**
 * Enterprise Admin Dashboard Component
 * 
 * Comprehensive admin interface for user management, analytics, and compliance
 * Includes user roles, permissions, system monitoring, and enterprise controls
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnterpriseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'user' | 'viewer';
  department: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin?: string;
  createdAt: string;
  permissions: string[];
  mfaEnabled: boolean;
  ssoProvider?: string;
}

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  systemUptime: number;
  apiRequests: number;
  storageUsed: number;
  integrationsActive: number;
  securityIncidents: number;
  complianceScore: number;
}

interface EnterpriseSettings {
  organizationName: string;
  domain: string;
  timezone: string;
  dataRetention: number;
  backupFrequency: string;
  securityLevel: 'basic' | 'standard' | 'high' | 'maximum';
  features: {
    sso: boolean;
    mfa: boolean;
    auditLogging: boolean;
    dataEncryption: boolean;
    apiAccess: boolean;
  };
}

interface EnterpriseAdminDashboardProps {
  onClose: () => void;
}

const EnterpriseAdminDashboard: React.FC<EnterpriseAdminDashboardProps> = ({ onClose }) => {
  const [users, setUsers] = useState<EnterpriseUser[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [settings, setSettings] = useState<EnterpriseSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'analytics' | 'settings'>('overview');
  const [selectedUser, setSelectedUser] = useState<EnterpriseUser | null>(null);

  useEffect(() => {
    loadEnterpriseData();
  }, []);

  const loadEnterpriseData = async () => {
    setIsLoading(true);
    
    try {
      // Mock enterprise users
      const mockUsers: EnterpriseUser[] = [
        {
          id: 'user-1',
          email: 'john.doe@company.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'admin',
          department: 'IT',
          status: 'active',
          lastLogin: new Date(Date.now() - 3600000).toISOString(),
          createdAt: '2024-01-01T00:00:00Z',
          permissions: ['read', 'write', 'admin', 'delete'],
          mfaEnabled: true,
          ssoProvider: 'Okta SSO'
        },
        {
          id: 'user-2',
          email: 'jane.smith@company.com',
          firstName: 'Jane',
          lastName: 'Smith',
          role: 'manager',
          department: 'Marketing',
          status: 'active',
          lastLogin: new Date(Date.now() - 7200000).toISOString(),
          createdAt: '2024-01-05T00:00:00Z',
          permissions: ['read', 'write', 'manage'],
          mfaEnabled: true,
          ssoProvider: 'Azure AD'
        },
        {
          id: 'user-3',
          email: 'bob.wilson@company.com',
          firstName: 'Bob',
          lastName: 'Wilson',
          role: 'user',
          department: 'Sales',
          status: 'active',
          lastLogin: new Date(Date.now() - 86400000).toISOString(),
          createdAt: '2024-01-10T00:00:00Z',
          permissions: ['read', 'write'],
          mfaEnabled: false,
          ssoProvider: 'Google OAuth'
        },
        {
          id: 'user-4',
          email: 'alice.brown@company.com',
          firstName: 'Alice',
          lastName: 'Brown',
          role: 'viewer',
          department: 'Finance',
          status: 'inactive',
          lastLogin: new Date(Date.now() - 604800000).toISOString(),
          createdAt: '2024-01-15T00:00:00Z',
          permissions: ['read'],
          mfaEnabled: false
        }
      ];

      // Mock system metrics
      const mockMetrics: SystemMetrics = {
        totalUsers: 1250,
        activeUsers: 1180,
        systemUptime: 99.9,
        apiRequests: 456789,
        storageUsed: 2.5, // TB
        integrationsActive: 15,
        securityIncidents: 3,
        complianceScore: 98
      };

      // Mock enterprise settings
      const mockSettings: EnterpriseSettings = {
        organizationName: 'Acme Corporation',
        domain: 'acme.com',
        timezone: 'UTC',
        dataRetention: 365, // days
        backupFrequency: 'daily',
        securityLevel: 'high',
        features: {
          sso: true,
          mfa: true,
          auditLogging: true,
          dataEncryption: true,
          apiAccess: true
        }
      };

      setUsers(mockUsers);
      setSystemMetrics(mockMetrics);
      setSettings(mockSettings);
    } catch (error) {
      console.error('Failed to load enterprise data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, status: EnterpriseUser['status']) => {
    try {
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status } : user
      ));
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const updateUserRole = async (userId: string, role: EnterpriseUser['role']) => {
    try {
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, role } : user
      ));
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  const updateSettings = async (updates: Partial<EnterpriseSettings>) => {
    try {
      if (settings) {
        setSettings({ ...settings, ...updates });
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-100';
      case 'manager': return 'text-blue-600 bg-blue-100';
      case 'user': return 'text-green-600 bg-green-100';
      case 'viewer': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return 'text-gray-600 bg-gray-100';
      case 'standard': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'maximum': return 'text-red-600 bg-red-100';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading enterprise dashboard...</span>
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
              <h2 className="text-2xl font-bold">Enterprise Admin Dashboard</h2>
              <p className="text-blue-100 mt-1">User management, analytics, and enterprise controls</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Users:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {users.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Active:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {users.filter(u => u.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Uptime:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {systemMetrics?.systemUptime}%
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
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'users', name: 'User Management', icon: '👥' },
              { id: 'analytics', name: 'Analytics', icon: '📈' },
              { id: 'settings', name: 'Settings', icon: '⚙️' }
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
          {selectedTab === 'overview' && systemMetrics && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">System Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">👥</span>
                    <span className="text-lg text-blue-600">+5.2%</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{systemMetrics.totalUsers}</div>
                  <div className="text-blue-600 text-sm">Total Users</div>
                  <div className="text-xs text-blue-500 mt-1">
                    {systemMetrics.activeUsers} active
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">⚡</span>
                    <span className="text-lg text-green-600">+0.1%</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">{systemMetrics.systemUptime}%</div>
                  <div className="text-green-600 text-sm">System Uptime</div>
                  <div className="text-xs text-green-500 mt-1">
                    Last 30 days
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📊</span>
                    <span className="text-lg text-purple-600">+12.3%</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {systemMetrics.apiRequests.toLocaleString()}
                  </div>
                  <div className="text-purple-600 text-sm">API Requests</div>
                  <div className="text-xs text-purple-500 mt-1">
                    Last 24 hours
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">💾</span>
                    <span className="text-lg text-orange-600">+2.1%</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">{systemMetrics.storageUsed}TB</div>
                  <div className="text-orange-600 text-sm">Storage Used</div>
                  <div className="text-xs text-orange-500 mt-1">
                    Of 10TB allocated
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Security Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Compliance Score</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        {systemMetrics.complianceScore}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Security Incidents</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                        {systemMetrics.securityIncidents}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Integrations</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {systemMetrics.integrationsActive}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">• 5 new users added today</div>
                    <div className="text-sm text-gray-600">• 3 integrations configured</div>
                    <div className="text-sm text-gray-600">• 1 security policy updated</div>
                    <div className="text-sm text-gray-600">• System backup completed</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'users' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
              
              <div className="space-y-4">
                {users.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Last Login:</span>
                        <span className="ml-2 text-gray-900">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">MFA:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                          user.mfaEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.mfaEnabled ? 'ENABLED' : 'DISABLED'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">SSO Provider:</span>
                        <span className="ml-2 text-gray-900">{user.ssoProvider || 'None'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <span className="ml-2 text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          user.status === 'active' 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {user.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all"
                      >
                        Edit Permissions
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Enterprise Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">User Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Daily Active Users</span>
                      <span className="text-sm font-medium text-gray-900">1,180</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Weekly Active Users</span>
                      <span className="text-sm font-medium text-gray-900">1,245</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly Active Users</span>
                      <span className="text-sm font-medium text-gray-900">1,250</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Session Duration</span>
                      <span className="text-sm font-medium text-gray-900">2h 15m</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">System Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">API Response Time</span>
                      <span className="text-sm font-medium text-gray-900">120ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Database Query Time</span>
                      <span className="text-sm font-medium text-gray-900">45ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Error Rate</span>
                      <span className="text-sm font-medium text-gray-900">0.02%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cache Hit Rate</span>
                      <span className="text-sm font-medium text-gray-900">94.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'settings' && settings && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Enterprise Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Organization</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                      <input
                        type="text"
                        value={settings.organizationName}
                        onChange={(e) => updateSettings({ organizationName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                      <input
                        type="text"
                        value={settings.domain}
                        onChange={(e) => updateSettings({ domain: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => updateSettings({ timezone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Security & Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Security Level</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSecurityLevelColor(settings.securityLevel)}`}>
                        {settings.securityLevel.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(settings.features).map(([feature, enabled]) => (
                        <div key={feature} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 capitalize">{feature.replace(/([A-Z])/g, ' $1')}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={enabled}
                              onChange={(e) => updateSettings({
                                features: { ...settings.features, [feature]: e.target.checked }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
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
            Enterprise Admin Dashboard • {users.filter(u => u.status === 'active').length} active users • {systemMetrics?.systemUptime}% uptime
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
                console.log('Exporting enterprise data...');
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

export default EnterpriseAdminDashboard;