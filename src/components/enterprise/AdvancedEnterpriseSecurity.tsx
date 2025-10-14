/**
 * Advanced Enterprise Security Component
 * 
 * Enterprise-grade security features including SSO, SAML, LDAP, MFA, and RBAC
 * Includes security policies, audit logging, and compliance management
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityProvider {
  id: string;
  name: string;
  type: 'sso' | 'saml' | 'ldap' | 'oauth' | 'oidc';
  icon: string;
  status: 'active' | 'inactive' | 'error';
  configuration: {
    endpoint?: string;
    certificate?: string;
    attributes?: Record<string, string>;
    mappings?: Record<string, string>;
  };
  users: number;
  lastSync?: string;
}

interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  category: 'authentication' | 'authorization' | 'data_protection' | 'network' | 'compliance';
  rules: SecurityRule[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  lastModified: string;
}

interface SecurityRule {
  id: string;
  name: string;
  condition: string;
  action: 'allow' | 'deny' | 'require_mfa' | 'log' | 'notify';
  priority: number;
  enabled: boolean;
}

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  resource: string;
  result: 'success' | 'failure' | 'warning';
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
}

interface AdvancedEnterpriseSecurityProps {
  onClose: () => void;
}

const AdvancedEnterpriseSecurity: React.FC<AdvancedEnterpriseSecurityProps> = ({ onClose }) => {
  const [securityProviders, setSecurityProviders] = useState<SecurityProvider[]>([]);
  const [securityPolicies, setSecurityPolicies] = useState<SecurityPolicy[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'providers' | 'policies' | 'audit' | 'compliance'>('providers');
  const [selectedProvider, setSelectedProvider] = useState<SecurityProvider | null>(null);

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    setIsLoading(true);
    
    try {
      // Mock security providers
      const mockProviders: SecurityProvider[] = [
        {
          id: 'sso-okta',
          name: 'Okta SSO',
          type: 'sso',
          icon: '🔐',
          status: 'active',
          configuration: {
            endpoint: 'https://company.okta.com',
            attributes: {
              email: 'user.email',
              firstName: 'user.firstName',
              lastName: 'user.lastName',
              department: 'user.department'
            }
          },
          users: 1250,
          lastSync: new Date(Date.now() - 300000).toISOString()
        },
        {
          id: 'saml-azure',
          name: 'Azure AD SAML',
          type: 'saml',
          icon: '☁️',
          status: 'active',
          configuration: {
            endpoint: 'https://login.microsoftonline.com/tenant-id/saml2',
            certificate: 'cert_***',
            mappings: {
              email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
              name: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            }
          },
          users: 890,
          lastSync: new Date(Date.now() - 600000).toISOString()
        },
        {
          id: 'ldap-ad',
          name: 'Active Directory LDAP',
          type: 'ldap',
          icon: '🏢',
          status: 'inactive',
          configuration: {
            endpoint: 'ldap://company-dc.company.com:389',
            attributes: {
              baseDN: 'DC=company,DC=com',
              userDN: 'CN=Users,DC=company,DC=com'
            }
          },
          users: 0,
          lastSync: undefined
        },
        {
          id: 'oauth-google',
          name: 'Google OAuth',
          type: 'oauth',
          icon: '🔍',
          status: 'active',
          configuration: {
            endpoint: 'https://accounts.google.com',
            attributes: {
              clientId: 'google_client_***',
              scopes: 'openid profile email'
            }
          },
          users: 340,
          lastSync: new Date(Date.now() - 120000).toISOString()
        }
      ];

      // Mock security policies
      const mockPolicies: SecurityPolicy[] = [
        {
          id: 'policy-1',
          name: 'Multi-Factor Authentication',
          description: 'Require MFA for all administrative actions',
          category: 'authentication',
          rules: [
            {
              id: 'rule-1',
              name: 'Admin MFA Required',
              condition: 'user.role == "admin"',
              action: 'require_mfa',
              priority: 1,
              enabled: true
            }
          ],
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          lastModified: '2024-01-15T00:00:00Z'
        },
        {
          id: 'policy-2',
          name: 'Data Access Control',
          description: 'Control access to sensitive data based on user roles',
          category: 'authorization',
          rules: [
            {
              id: 'rule-2',
              name: 'Sensitive Data Access',
              condition: 'resource.type == "sensitive" && user.role != "admin"',
              action: 'deny',
              priority: 1,
              enabled: true
            }
          ],
          status: 'active',
          createdAt: '2024-01-05T00:00:00Z',
          lastModified: '2024-01-10T00:00:00Z'
        }
      ];

      // Mock audit logs
      const mockAuditLogs: AuditLog[] = [
        {
          id: 'log-1',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          userId: 'user-123',
          action: 'login',
          resource: 'authentication',
          result: 'success',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          details: {
            provider: 'Okta SSO',
            method: 'saml'
          }
        },
        {
          id: 'log-2',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          userId: 'user-456',
          action: 'data_access',
          resource: 'sensitive_data',
          result: 'failure',
          ipAddress: '192.168.1.200',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          details: {
            reason: 'Insufficient permissions',
            policy: 'Data Access Control'
          }
        }
      ];

      setSecurityProviders(mockProviders);
      setSecurityPolicies(mockPolicies);
      setAuditLogs(mockAuditLogs);
    } catch (error) {
      console.error('Failed to load security data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProviderStatus = async (providerId: string, status: SecurityProvider['status']) => {
    try {
      setSecurityProviders(prev => prev.map(provider => 
        provider.id === providerId ? { ...provider, status } : provider
      ));
    } catch (error) {
      console.error('Failed to update provider status:', error);
    }
  };

  const createSecurityPolicy = async (policy: Omit<SecurityPolicy, 'id' | 'createdAt' | 'lastModified'>) => {
    try {
      const newPolicy: SecurityPolicy = {
        ...policy,
        id: `policy_${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      };
      
      setSecurityPolicies(prev => [...prev, newPolicy]);
    } catch (error) {
      console.error('Failed to create security policy:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'success': return 'text-green-600 bg-green-100';
      case 'failure': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'sso': return '🔐';
      case 'saml': return '☁️';
      case 'ldap': return '🏢';
      case 'oauth': return '🔍';
      case 'oidc': return '🆔';
      default: return '🔒';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return '🔐';
      case 'authorization': return '👤';
      case 'data_protection': return '🛡️';
      case 'network': return '🌐';
      case 'compliance': return '📋';
      default: return '🔒';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading security configuration...</span>
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
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Advanced Enterprise Security</h2>
              <p className="text-red-100 mt-1">SSO, SAML, LDAP, MFA, RBAC, and compliance management</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-red-200 text-sm">Providers:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {securityProviders.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-200 text-sm">Active:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {securityProviders.filter(p => p.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-200 text-sm">Policies:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {securityPolicies.length}
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
              { id: 'providers', name: 'Security Providers', icon: '🔐' },
              { id: 'policies', name: 'Security Policies', icon: '🛡️' },
              { id: 'audit', name: 'Audit Logs', icon: '📋' },
              { id: 'compliance', name: 'Compliance', icon: '✅' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-red-500 text-red-600'
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
          {selectedTab === 'providers' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Providers</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityProviders.map((provider) => (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{provider.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{provider.name}</h4>
                        <p className="text-sm text-gray-600">{provider.type.toUpperCase()}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>👥 {provider.users} users</span>
                          {provider.lastSync && (
                            <span>🔄 {new Date(provider.lastSync).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(provider.status)}`}>
                          {provider.status.toUpperCase()}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateProviderStatus(provider.id, provider.status === 'active' ? 'inactive' : 'active')}
                            className={`px-3 py-1 rounded text-sm transition-all ${
                              provider.status === 'active' 
                                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {provider.status === 'active' ? 'Disable' : 'Enable'}
                          </button>
                          <button
                            onClick={() => setSelectedProvider(provider)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all"
                          >
                            Configure
                          </button>
                        </div>
                      </div>
                      
                      {provider.configuration.endpoint && (
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">Endpoint:</span> {provider.configuration.endpoint}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'policies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Security Policies</h3>
                <button
                  onClick={() => {
                    createSecurityPolicy({
                      name: 'New Security Policy',
                      description: 'Custom security policy',
                      category: 'authentication',
                      rules: [],
                      status: 'draft'
                    });
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create Policy
                </button>
              </div>
              
              <div className="space-y-4">
                {securityPolicies.map((policy) => (
                  <div key={policy.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getCategoryIcon(policy.category)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{policy.name}</h4>
                        <p className="text-sm text-gray-600">{policy.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(policy.status)}`}>
                        {policy.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Rules:</div>
                      {policy.rules.map((rule) => (
                        <div key={rule.id} className="p-2 bg-gray-50 rounded text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{rule.name}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {rule.enabled ? 'ENABLED' : 'DISABLED'}
                            </span>
                          </div>
                          <div className="text-gray-600 mt-1">
                            <span className="font-medium">Condition:</span> {rule.condition}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Action:</span> {rule.action}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'audit' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Audit Logs</h3>
              
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📋</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            {log.action.replace('_', ' ').toUpperCase()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(log.result)}`}>
                        {log.result.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">User:</span>
                        <span className="ml-2 text-gray-900">{log.userId}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Resource:</span>
                        <span className="ml-2 text-gray-900">{log.resource}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">IP:</span>
                        <span className="ml-2 text-gray-900">{log.ipAddress}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">User Agent:</span>
                        <span className="ml-2 text-gray-900 text-xs">{log.userAgent.substring(0, 50)}...</span>
                      </div>
                    </div>
                    
                    {Object.keys(log.details).length > 0 && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                        <div className="font-medium text-gray-700 mb-1">Details:</div>
                        <pre className="text-xs text-gray-600 overflow-x-auto">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'compliance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Compliance Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">SOC 2 Compliance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Security</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        COMPLIANT
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Availability</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        COMPLIANT
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Processing Integrity</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        COMPLIANT
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Confidentiality</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        COMPLIANT
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Privacy</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        COMPLIANT
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">GDPR Compliance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Data Protection</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        COMPLIANT
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Right to Erasure</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        COMPLIANT
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Data Portability</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        COMPLIANT
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Consent Management</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        COMPLIANT
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Breach Notification</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        COMPLIANT
                      </span>
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
            Advanced Enterprise Security • {securityProviders.filter(p => p.status === 'active').length} active providers • {securityPolicies.length} policies
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
                console.log('Exporting security data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedEnterpriseSecurity;
