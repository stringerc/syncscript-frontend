/**
 * Enterprise Admin Dashboard Component
 * 
 * Provides comprehensive administrative interface for enterprise customers
 * Includes user management, analytics, billing, and system monitoring
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  totalTasks: number;
  completedTasks: number;
  totalProjects: number;
  activeProjects: number;
  storageUsed: number;
  storageLimit: number;
  apiCalls: number;
  apiLimit: number;
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  errorRate: number;
  lastIncident: string;
  services: {
    database: 'up' | 'down' | 'slow';
    api: 'up' | 'down' | 'slow';
    auth: 'up' | 'down' | 'slow';
    storage: 'up' | 'down' | 'slow';
  };
}

interface BillingInfo {
  currentPlan: string;
  monthlyCost: number;
  usage: {
    users: number;
    storage: number;
    apiCalls: number;
  };
  limits: {
    users: number;
    storage: number;
    apiCalls: number;
  };
  nextBillingDate: string;
  paymentMethod: string;
}

interface EnterpriseAdminDashboardProps {
  userId: string;
  onClose: () => void;
}

const EnterpriseAdminDashboard: React.FC<EnterpriseAdminDashboardProps> = ({ userId, onClose }) => {
  const [metrics, setMetrics] = useState<AdminMetrics>({
    totalUsers: 0,
    activeUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    totalProjects: 0,
    activeProjects: 0,
    storageUsed: 0,
    storageLimit: 0,
    apiCalls: 0,
    apiLimit: 0
  });

  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    status: 'healthy',
    uptime: 99.9,
    responseTime: 120,
    errorRate: 0.1,
    lastIncident: '',
    services: {
      database: 'up',
      api: 'up',
      auth: 'up',
      storage: 'up'
    }
  });

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    currentPlan: 'Enterprise',
    monthlyCost: 2500,
    usage: {
      users: 45,
      storage: 120,
      apiCalls: 85000
    },
    limits: {
      users: 100,
      storage: 500,
      apiCalls: 100000
    },
    nextBillingDate: '2024-04-01',
    paymentMethod: '**** **** **** 4242'
  });

  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'analytics' | 'billing' | 'system'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading admin data
    const loadAdminData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate API calls for admin data
        setMetrics({
          totalUsers: 47,
          activeUsers: 42,
          totalTasks: 1250,
          completedTasks: 980,
          totalProjects: 23,
          activeProjects: 18,
          storageUsed: 2.4,
          storageLimit: 10,
          apiCalls: 85000,
          apiLimit: 100000
        });

        setSystemHealth({
          status: 'healthy',
          uptime: 99.9,
          responseTime: 120,
          errorRate: 0.1,
          lastIncident: '2024-02-15T10:30:00Z',
          services: {
            database: 'up',
            api: 'up',
            auth: 'up',
            storage: 'up'
          }
        });
      } catch (error) {
        console.error('Failed to load admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAdminData();
  }, []);

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getServiceStatus = (status: string) => {
    switch (status) {
      case 'up': return { color: 'text-green-600', icon: '✅' };
      case 'slow': return { color: 'text-yellow-600', icon: '⚠️' };
      case 'down': return { color: 'text-red-600', icon: '❌' };
      default: return { color: 'text-gray-600', icon: '❓' };
    }
  };

  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
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
            <span className="text-lg font-medium text-gray-700">Loading admin dashboard...</span>
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Enterprise Admin Dashboard</h2>
              <p className="text-purple-100 mt-1">Complete administrative control and monitoring</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Plan:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {billingInfo.currentPlan}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Health:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getHealthColor(systemHealth.status)}`}>
                    {systemHealth.status.charAt(0).toUpperCase() + systemHealth.status.slice(1)}
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
              { id: 'users', name: 'Users', icon: '👥' },
              { id: 'analytics', name: 'Analytics', icon: '📈' },
              { id: 'billing', name: 'Billing', icon: '💳' },
              { id: 'system', name: 'System', icon: '⚙️' }
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
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Users</p>
                      <p className="text-2xl font-bold text-blue-900">{formatNumber(metrics.totalUsers)}</p>
                      <p className="text-blue-600 text-sm">{metrics.activeUsers} active</p>
                    </div>
                    <div className="text-3xl text-blue-500">👥</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Tasks</p>
                      <p className="text-2xl font-bold text-green-900">{formatNumber(metrics.totalTasks)}</p>
                      <p className="text-green-600 text-sm">{metrics.completedTasks} completed</p>
                    </div>
                    <div className="text-3xl text-green-500">📋</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Projects</p>
                      <p className="text-2xl font-bold text-purple-900">{formatNumber(metrics.totalProjects)}</p>
                      <p className="text-purple-600 text-sm">{metrics.activeProjects} active</p>
                    </div>
                    <div className="text-3xl text-purple-500">📁</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Storage</p>
                      <p className="text-2xl font-bold text-orange-900">{formatBytes(metrics.storageUsed * 1024 * 1024 * 1024)}</p>
                      <p className="text-orange-600 text-sm">of {formatBytes(metrics.storageLimit * 1024 * 1024 * 1024)}</p>
                    </div>
                    <div className="text-3xl text-orange-500">💾</div>
                  </div>
                </div>
              </div>

              {/* System Health */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Uptime</span>
                      <span className="text-lg font-bold text-green-600">{systemHealth.uptime}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${systemHealth.uptime}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Response Time</span>
                      <span className="text-lg font-bold text-blue-600">{systemHealth.responseTime}ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Error Rate</span>
                      <span className="text-lg font-bold text-green-600">{systemHealth.errorRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${100 - systemHealth.errorRate * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Status */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(systemHealth.services).map(([service, status]) => {
                    const serviceInfo = getServiceStatus(status);
                    return (
                      <div key={service} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-xl">{serviceInfo.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900 capitalize">{service}</div>
                          <div className={`text-sm font-medium ${serviceInfo.color}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'users' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">👥</div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">User Management</h4>
                  <p className="text-gray-600">Comprehensive user administration tools will be available here</p>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📈</div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h4>
                  <p className="text-gray-600">Detailed usage analytics and insights will be available here</p>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Usage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Current Plan</h4>
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-900">{billingInfo.currentPlan}</div>
                      <div className="text-purple-600">${billingInfo.monthlyCost.toLocaleString()}/month</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Usage This Month</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Users</span>
                        <span className="font-medium">{billingInfo.usage.users}/{billingInfo.limits.users}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(billingInfo.usage.users / billingInfo.limits.users) * 100}%` }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Storage</span>
                        <span className="font-medium">{billingInfo.usage.storage}/{billingInfo.limits.storage} GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(billingInfo.usage.storage / billingInfo.limits.storage) * 100}%` }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">API Calls</span>
                        <span className="font-medium">{formatNumber(billingInfo.usage.apiCalls)}/{formatNumber(billingInfo.limits.apiCalls)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(billingInfo.usage.apiCalls / billingInfo.limits.apiCalls) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'system' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">⚙️</div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">System Settings</h4>
                  <p className="text-gray-600">System configuration and maintenance tools will be available here</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleString()}
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
                // TODO: Export admin report
                console.log('Exporting admin report...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Export Report
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnterpriseAdminDashboard;
