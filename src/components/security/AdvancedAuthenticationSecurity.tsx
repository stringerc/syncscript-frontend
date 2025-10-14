import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthenticationMethod {
  id: string;
  name: string;
  type: 'password' | 'mfa' | 'biometric' | 'hardware-key' | 'sso' | 'oauth';
  status: 'enabled' | 'disabled' | 'pending';
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  users: number;
  lastUsed: Date;
  securityLevel: number;
}

interface SecurityPolicy {
  id: string;
  name: string;
  type: 'password' | 'session' | 'mfa' | 'access';
  enabled: boolean;
  rules: SecurityRule[];
  description: string;
  lastUpdated: Date;
}

interface SecurityRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
}

interface AuthenticationEvent {
  id: string;
  userId: string;
  method: string;
  result: 'success' | 'failure' | 'blocked';
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  riskScore: number;
  location: string;
}

interface SecurityMetrics {
  totalUsers: number;
  mfaEnabled: number;
  strongPasswords: number;
  failedAttempts: number;
  blockedAttempts: number;
  securityScore: number;
}

const AdvancedAuthenticationSecurity: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [methods, setMethods] = useState<AuthenticationMethod[]>([]);
  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);
  const [events, setEvents] = useState<AuthenticationEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalUsers: 0,
    mfaEnabled: 0,
    strongPasswords: 0,
    failedAttempts: 0,
    blockedAttempts: 0,
    securityScore: 0
  });
  const [selectedTab, setSelectedTab] = useState<'methods' | 'policies' | 'events'>('methods');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isUpdatingPolicy, setIsUpdatingPolicy] = useState(false);

  // Generate authentication data
  useEffect(() => {
    const generateMethods = (): AuthenticationMethod[] => {
      const methodTypes: AuthenticationMethod['type'][] = [
        'password', 'mfa', 'biometric', 'hardware-key', 'sso', 'oauth'
      ];
      const statuses: AuthenticationMethod['status'][] = ['enabled', 'disabled', 'pending'];
      const strengths: AuthenticationMethod['strength'][] = ['weak', 'medium', 'strong', 'very-strong'];

      const methodNames = {
        password: 'Password Authentication',
        mfa: 'Multi-Factor Authentication',
        biometric: 'Biometric Authentication',
        'hardware-key': 'Hardware Security Keys',
        sso: 'Single Sign-On',
        oauth: 'OAuth 2.0'
      };

      return methodTypes.map((type, index) => {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const strength = strengths[Math.floor(Math.random() * strengths.length)];
        const users = Math.floor(Math.random() * 1000) + 100;
        const securityLevel = status === 'enabled' ? Math.floor(Math.random() * 40) + 60 : 0;

        return {
          id: `method-${index}`,
          name: methodNames[type],
          type,
          status,
          strength,
          users,
          lastUsed: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
          securityLevel
        };
      });
    };

    const generatePolicies = (): SecurityPolicy[] => {
      const policyTypes: SecurityPolicy['type'][] = ['password', 'session', 'mfa', 'access'];
      const policyNames = {
        password: 'Password Policy',
        session: 'Session Management',
        mfa: 'MFA Requirements',
        access: 'Access Control'
      };

      return policyTypes.map((type, index) => {
        const enabled = Math.random() > 0.2;
        const rules: SecurityRule[] = [];
        const ruleCount = Math.floor(Math.random() * 5) + 3;

        for (let i = 0; i < ruleCount; i++) {
          rules.push({
            id: `rule-${index}-${i}`,
            name: `Rule ${i + 1}`,
            condition: `Condition ${i + 1}`,
            action: `Action ${i + 1}`,
            enabled: Math.random() > 0.3
          });
        }

        return {
          id: `policy-${index}`,
          name: policyNames[type],
          type,
          enabled,
          rules,
          description: `Security policy for ${type} management`,
          lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        };
      });
    };

    const generateEvents = (): AuthenticationEvent[] => {
      const methods = ['password', 'mfa', 'biometric', 'sso'];
      const results: AuthenticationEvent['result'][] = ['success', 'failure', 'blocked'];
      const locations = ['New York', 'London', 'Tokyo', 'San Francisco', 'Berlin', 'Sydney'];

      const events: AuthenticationEvent[] = [];
      for (let i = 0; i < 100; i++) {
        const method = methods[Math.floor(Math.random() * methods.length)];
        const result = results[Math.floor(Math.random() * results.length)];
        const riskScore = result === 'success' ? Math.random() * 30 : Math.random() * 100;
        const location = locations[Math.floor(Math.random() * locations.length)];

        events.push({
          id: `event-${i}`,
          userId: `user-${Math.floor(Math.random() * 1000)}`,
          method,
          result,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          riskScore,
          location
        });
      }

      return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    const methods = generateMethods();
    const policies = generatePolicies();
    const events = generateEvents();

    setMethods(methods);
    setPolicies(policies);
    setEvents(events);

    // Calculate metrics
    const totalUsers = methods.reduce((sum, method) => sum + method.users, 0);
    const mfaEnabled = methods.find(m => m.type === 'mfa')?.users || 0;
    const strongPasswords = methods.find(m => m.type === 'password')?.users || 0;
    const failedAttempts = events.filter(e => e.result === 'failure').length;
    const blockedAttempts = events.filter(e => e.result === 'blocked').length;
    const securityScore = Math.max(0, 100 - (failedAttempts * 0.5) - (blockedAttempts * 0.3));

    setMetrics({
      totalUsers,
      mfaEnabled,
      strongPasswords,
      failedAttempts,
      blockedAttempts,
      securityScore
    });
  }, []);

  const filteredMethods = methods.filter(method => 
    selectedStatus === 'all' || method.status === selectedStatus
  );

  const filteredPolicies = policies.filter(policy => 
    selectedStatus === 'all' || (policy.enabled ? 'enabled' : 'disabled') === selectedStatus
  );

  const filteredEvents = events.filter(event => 
    selectedStatus === 'all' || event.result === selectedStatus
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'enabled': return 'bg-green-100 text-green-800';
      case 'disabled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStrengthColor = (strength: string): string => {
    switch (strength) {
      case 'very-strong': return 'bg-green-100 text-green-800';
      case 'strong': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'weak': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultColor = (result: string): string => {
    switch (result) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failure': return 'bg-red-100 text-red-800';
      case 'blocked': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSecurityScoreColor = (score: number): string => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    if (score >= 50) return '#f97316';
    return '#ef4444';
  };

  const getMethodIcon = (type: string): string => {
    switch (type) {
      case 'password': return '🔐';
      case 'mfa': return '🔑';
      case 'biometric': return '👆';
      case 'hardware-key': return '🔑';
      case 'sso': return '🔗';
      case 'oauth': return '🔒';
      default: return '🛡️';
    }
  };

  const toggleMethod = (methodId: string) => {
    setMethods(prev => prev.map(method => 
      method.id === methodId 
        ? { 
            ...method, 
            status: method.status === 'enabled' ? 'disabled' : 'enabled',
            lastUsed: new Date()
          }
        : method
    ));
  };

  const togglePolicy = async (policyId: string) => {
    setIsUpdatingPolicy(true);
    
    // Simulate policy update
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPolicies(prev => prev.map(policy => 
      policy.id === policyId 
        ? { 
            ...policy, 
            enabled: !policy.enabled,
            lastUpdated: new Date()
          }
        : policy
    ));
    
    setIsUpdatingPolicy(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🔐 Advanced Authentication Security</h2>
              <p className="text-indigo-100 mt-1">Multi-factor authentication and security policies</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: getSecurityScoreColor(metrics.securityScore) }}
                >
                  {metrics.securityScore}
                </div>
                <div className="text-sm text-indigo-100">
                  Security Score
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-blue-800">{metrics.totalUsers}</p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">MFA Enabled</p>
                  <p className="text-2xl font-bold text-green-800">{metrics.mfaEnabled}</p>
                </div>
                <div className="text-3xl">🔑</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Strong Passwords</p>
                  <p className="text-2xl font-bold text-purple-800">{metrics.strongPasswords}</p>
                </div>
                <div className="text-3xl">🔐</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Failed Attempts</p>
                  <p className="text-2xl font-bold text-red-800">{metrics.failedAttempts}</p>
                </div>
                <div className="text-3xl">❌</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Blocked Attempts</p>
                  <p className="text-2xl font-bold text-orange-800">{metrics.blockedAttempts}</p>
                </div>
                <div className="text-3xl">🚫</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Security Score</p>
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: getSecurityScoreColor(metrics.securityScore) }}
                  >
                    {metrics.securityScore}
                  </p>
                </div>
                <div className="text-3xl">🛡️</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTab('methods')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTab === 'methods' 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Auth Methods
                  </button>
                  <button
                    onClick={() => setSelectedTab('policies')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTab === 'policies' 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Security Policies
                  </button>
                  <button
                    onClick={() => setSelectedTab('events')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTab === 'events' 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Auth Events
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Statuses</option>
                    {selectedTab === 'methods' && (
                      <>
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                        <option value="pending">Pending</option>
                      </>
                    )}
                    {selectedTab === 'policies' && (
                      <>
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                      </>
                    )}
                    {selectedTab === 'events' && (
                      <>
                        <option value="success">Success</option>
                        <option value="failure">Failure</option>
                        <option value="blocked">Blocked</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Authentication Methods Tab */}
          {selectedTab === 'methods' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Authentication Methods ({filteredMethods.length})</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strength</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Security Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMethods.map((method) => (
                      <tr key={method.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{getMethodIcon(method.type)}</span>
                            <div className="text-sm font-medium text-gray-900">{method.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(method.status)}`}>
                            {method.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStrengthColor(method.strength)}`}>
                            {method.strength}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {method.users}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${method.securityLevel}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{method.securityLevel}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(method.lastUsed)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => toggleMethod(method.id)}
                            className={`transition-colors ${
                              method.status === 'enabled' 
                                ? 'text-red-600 hover:text-red-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {method.status === 'enabled' ? 'Disable' : 'Enable'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Security Policies Tab */}
          {selectedTab === 'policies' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Security Policies ({filteredPolicies.length})</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rules</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPolicies.map((policy) => (
                      <tr key={policy.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{policy.name}</div>
                            <div className="text-sm text-gray-500">{policy.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {policy.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.enabled ? 'enabled' : 'disabled')}`}>
                            {policy.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {policy.rules.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(policy.lastUpdated)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => togglePolicy(policy.id)}
                            disabled={isUpdatingPolicy}
                            className={`transition-colors disabled:opacity-50 ${
                              policy.enabled 
                                ? 'text-red-600 hover:text-red-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {isUpdatingPolicy ? 'Updating...' : (policy.enabled ? 'Disable' : 'Enable')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Authentication Events Tab */}
          {selectedTab === 'events' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Authentication Events ({filteredEvents.length})</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEvents.slice(0, 20).map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {event.userId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.method}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getResultColor(event.result)}`}>
                            {event.result}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  event.riskScore > 70 ? 'bg-red-500' :
                                  event.riskScore > 40 ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${event.riskScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{event.riskScore.toFixed(0)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.ipAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(event.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedAuthenticationSecurity;
