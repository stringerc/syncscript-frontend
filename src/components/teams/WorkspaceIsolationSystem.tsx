/**
 * Workspace Isolation System Component
 * 
 * Provides secure data isolation and access control for team workspaces
 * Includes data separation, permission boundaries, and security policies
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkspaceIsolation {
  teamId: string;
  isolationLevel: 'strict' | 'moderate' | 'permissive';
  dataBoundaries: {
    tasks: boolean;
    projects: boolean;
    analytics: boolean;
    settings: boolean;
    integrations: boolean;
  };
  accessPolicies: {
    crossTeamAccess: boolean;
    dataSharing: boolean;
    externalIntegrations: boolean;
    apiAccess: boolean;
  };
  securitySettings: {
    encryption: boolean;
    auditLogging: boolean;
    ipRestrictions: boolean;
    sessionTimeout: number;
    mfaRequired: boolean;
  };
  compliance: {
    dataRetention: number; // days
    dataLocation: string;
    backupFrequency: string;
    disasterRecovery: boolean;
  };
}

interface DataAccessLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  teamId: string;
  timestamp: string;
  ipAddress: string;
  location: string;
  status: 'allowed' | 'denied' | 'restricted';
  reason?: string;
}

interface WorkspaceIsolationSystemProps {
  teamId: string;
  onClose: () => void;
}

const ISOLATION_LEVELS = [
  {
    id: 'strict',
    name: 'Strict Isolation',
    description: 'Complete data separation with no cross-team access',
    features: [
      'Zero cross-team data access',
      'Encrypted data storage',
      'Mandatory MFA for all users',
      'Full audit logging',
      'IP restrictions enabled'
    ],
    restrictions: [
      'No shared resources between teams',
      'All external access blocked',
      'Strict session timeouts',
      'Enhanced monitoring'
    ],
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'moderate',
    name: 'Moderate Isolation',
    description: 'Balanced security with selective data sharing',
    features: [
      'Limited cross-team access',
      'Encrypted data storage',
      'MFA for admin users',
      'Basic audit logging',
      'Optional IP restrictions'
    ],
    restrictions: [
      'Shared projects require approval',
      'External integrations allowed',
      'Standard session timeouts',
      'Standard monitoring'
    ],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'permissive',
    name: 'Permissive Access',
    description: 'Open collaboration with minimal restrictions',
    features: [
      'Open cross-team collaboration',
      'Standard data encryption',
      'Optional MFA',
      'Basic logging',
      'No IP restrictions'
    ],
    restrictions: [
      'Full team collaboration',
      'All external access allowed',
      'Extended session timeouts',
      'Minimal monitoring'
    ],
    color: 'from-green-500 to-emerald-500'
  }
];

const WorkspaceIsolationSystem: React.FC<WorkspaceIsolationSystemProps> = ({ teamId, onClose }) => {
  const [isolation, setIsolation] = useState<WorkspaceIsolation>({
    teamId,
    isolationLevel: 'moderate',
    dataBoundaries: {
      tasks: true,
      projects: true,
      analytics: true,
      settings: true,
      integrations: false
    },
    accessPolicies: {
      crossTeamAccess: false,
      dataSharing: true,
      externalIntegrations: true,
      apiAccess: true
    },
    securitySettings: {
      encryption: true,
      auditLogging: true,
      ipRestrictions: false,
      sessionTimeout: 8, // hours
      mfaRequired: false
    },
    compliance: {
      dataRetention: 365,
      dataLocation: 'us-east-1',
      backupFrequency: 'daily',
      disasterRecovery: true
    }
  });

  const [accessLogs, setAccessLogs] = useState<DataAccessLog[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'isolation' | 'logs' | 'alerts' | 'compliance'>('isolation');

  useEffect(() => {
    loadIsolationData();
  }, [teamId]);

  const loadIsolationData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock access logs
      const mockLogs: DataAccessLog[] = [
        {
          id: 'log-1',
          userId: 'user-1',
          userEmail: 'admin@team.com',
          action: 'TASK_ACCESS',
          resource: 'task-123',
          teamId,
          timestamp: new Date().toISOString(),
          ipAddress: '192.168.1.100',
          location: 'New York, NY',
          status: 'allowed'
        },
        {
          id: 'log-2',
          userId: 'user-2',
          userEmail: 'member@team.com',
          action: 'CROSS_TEAM_ACCESS',
          resource: 'team-other',
          teamId,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          ipAddress: '192.168.1.101',
          location: 'San Francisco, CA',
          status: 'denied',
          reason: 'Cross-team access not permitted'
        },
        {
          id: 'log-3',
          userId: 'user-3',
          userEmail: 'external@company.com',
          action: 'API_ACCESS',
          resource: 'api/projects',
          teamId,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          ipAddress: '203.0.113.1',
          location: 'Unknown',
          status: 'restricted',
          reason: 'External IP address'
        }
      ];

      // Mock security alerts
      const mockAlerts = [
        {
          id: 'alert-1',
          type: 'suspicious_access',
          severity: 'medium',
          message: 'Multiple failed login attempts detected',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          resolved: false
        },
        {
          id: 'alert-2',
          type: 'data_breach_attempt',
          severity: 'high',
          message: 'Unauthorized access attempt to sensitive data',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          resolved: true
        }
      ];

      setAccessLogs(mockLogs);
      setSecurityAlerts(mockAlerts);
    } catch (error) {
      console.error('Failed to load isolation data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateIsolation = async (updates: Partial<WorkspaceIsolation>) => {
    try {
      setIsolation(prev => ({ ...prev, ...updates }));
      console.log('✅ Isolation settings updated');
    } catch (error) {
      console.error('Failed to update isolation settings:', error);
    }
  };

  const handleToggleDataBoundary = (boundary: keyof WorkspaceIsolation['dataBoundaries']) => {
    setIsolation(prev => ({
      ...prev,
      dataBoundaries: {
        ...prev.dataBoundaries,
        [boundary]: !prev.dataBoundaries[boundary]
      }
    }));
  };

  const handleToggleAccessPolicy = (policy: keyof WorkspaceIsolation['accessPolicies']) => {
    setIsolation(prev => ({
      ...prev,
      accessPolicies: {
        ...prev.accessPolicies,
        [policy]: !prev.accessPolicies[policy]
      }
    }));
  };

  const handleToggleSecuritySetting = (setting: keyof WorkspaceIsolation['securitySettings']) => {
    if (setting === 'sessionTimeout' || setting === 'mfaRequired') {
      // Handle special cases
      return;
    }
    
    setIsolation(prev => ({
      ...prev,
      securitySettings: {
        ...prev.securitySettings,
        [setting]: !prev.securitySettings[setting]
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'allowed': return 'text-green-600 bg-green-100';
      case 'denied': return 'text-red-600 bg-red-100';
      case 'restricted': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading isolation settings...</span>
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
              <h2 className="text-2xl font-bold">Workspace Isolation</h2>
              <p className="text-purple-100 mt-1">Secure data isolation and access control</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Level:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium capitalize">
                    {isolation.isolationLevel}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Alerts:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {securityAlerts.filter(a => !a.resolved).length}
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
              { id: 'isolation', name: 'Isolation Settings', icon: '🔒' },
              { id: 'logs', name: 'Access Logs', icon: '📋' },
              { id: 'alerts', name: 'Security Alerts', icon: '⚠️' },
              { id: 'compliance', name: 'Compliance', icon: '📊' }
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
          {selectedTab === 'isolation' && (
            <div className="space-y-8">
              {/* Isolation Level */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Isolation Level</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ISOLATION_LEVELS.map((level) => (
                    <motion.div
                      key={level.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleUpdateIsolation({ isolationLevel: level.id as any })}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                        isolation.isolationLevel === level.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${level.color} mb-4`}></div>
                      <h4 className="font-semibold text-gray-900 mb-2">{level.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">{level.description}</p>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Features:</div>
                        {level.features.map((feature, index) => (
                          <div key={index} className="text-xs text-gray-600">• {feature}</div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Data Boundaries */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Boundaries</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(isolation.dataBoundaries).map(([boundary, enabled]) => (
                    <div key={boundary} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 capitalize">{boundary}</div>
                        <div className="text-sm text-gray-600">Isolated data access</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={() => handleToggleDataBoundary(boundary as any)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Access Policies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(isolation.accessPolicies).map(([policy, enabled]) => (
                    <div key={policy} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 capitalize">
                          {policy.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {policy === 'crossTeamAccess' && 'Allow access to other teams'}
                          {policy === 'dataSharing' && 'Enable data sharing between users'}
                          {policy === 'externalIntegrations' && 'Allow external service integrations'}
                          {policy === 'apiAccess' && 'Enable API access for external applications'}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={() => handleToggleAccessPolicy(policy as any)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(isolation.securitySettings).map(([setting, value]) => (
                    <div key={setting} className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 mb-2 capitalize">
                        {setting.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      {typeof value === 'boolean' ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handleToggleSecuritySetting(setting as any)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={value}
                            onChange={(e) => setIsolation(prev => ({
                              ...prev,
                              securitySettings: {
                                ...prev.securitySettings,
                                [setting]: parseInt(e.target.value)
                              }
                            }))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-600">hours</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'logs' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Access Logs</h3>
              <div className="space-y-3">
                {accessLogs.map((log) => (
                  <div key={log.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(log.status)}`}>
                          {log.status.toUpperCase()}
                        </span>
                        <span className="font-medium text-gray-900">{log.action}</span>
                        <span className="text-sm text-gray-600">{log.resource}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-700">
                      <strong>{log.userEmail}</strong> • {log.ipAddress} • {log.location}
                    </div>
                    
                    {log.reason && (
                      <div className="text-sm text-red-600 mt-1">
                        Reason: {log.reason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'alerts' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
              <div className="space-y-3">
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border rounded-lg ${
                    alert.resolved ? 'border-gray-200 bg-gray-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="font-medium text-gray-900">{alert.type.replace('_', ' ').toUpperCase()}</span>
                        {alert.resolved && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            RESOLVED
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-700">{alert.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'compliance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Compliance Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Data Retention</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={isolation.compliance.dataRetention}
                      onChange={(e) => setIsolation(prev => ({
                        ...prev,
                        compliance: {
                          ...prev.compliance,
                          dataRetention: parseInt(e.target.value)
                        }
                      }))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">days</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Data Location</h4>
                  <select
                    value={isolation.compliance.dataLocation}
                    onChange={(e) => setIsolation(prev => ({
                      ...prev,
                      compliance: {
                        ...prev.compliance,
                        dataLocation: e.target.value
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="us-east-1">US East (N. Virginia)</option>
                    <option value="us-west-2">US West (Oregon)</option>
                    <option value="eu-west-1">Europe (Ireland)</option>
                    <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Backup Frequency</h4>
                  <select
                    value={isolation.compliance.backupFrequency}
                    onChange={(e) => setIsolation(prev => ({
                      ...prev,
                      compliance: {
                        ...prev.compliance,
                        backupFrequency: e.target.value
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Disaster Recovery</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isolation.compliance.disasterRecovery}
                      onChange={(e) => setIsolation(prev => ({
                        ...prev,
                        compliance: {
                          ...prev.compliance,
                          disasterRecovery: e.target.checked
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Isolation level: {isolation.isolationLevel} • {accessLogs.length} access logs
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
                console.log('Saving isolation settings...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Save Settings
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkspaceIsolationSystem;
