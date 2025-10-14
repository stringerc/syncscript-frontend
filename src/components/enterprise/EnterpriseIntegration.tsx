import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SSOProvider {
  id: string;
  name: string;
  type: 'SAML' | 'OAuth' | 'LDAP' | 'OpenID Connect';
  status: 'active' | 'inactive' | 'testing' | 'error';
  configuration: {
    endpoint: string;
    certificate?: string;
    clientId?: string;
    clientSecret?: string;
    domain?: string;
    attributes: {
      email: string;
      firstName: string;
      lastName: string;
      groups: string;
    };
  };
  users: number;
  lastSync: Date;
  syncFrequency: string;
  errorRate: number;
}

interface EnterpriseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'user' | 'viewer';
  department: string;
  ssoProvider: string;
  lastLogin: Date;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  permissions: {
    canCreateTeams: boolean;
    canManageUsers: boolean;
    canAccessAnalytics: boolean;
    canModifySettings: boolean;
    canExportData: boolean;
  };
  groups: string[];
  customAttributes: Record<string, any>;
}

interface WhiteLabelConfig {
  id: string;
  organization: string;
  domain: string;
  branding: {
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    customCSS: string;
  };
  features: {
    enabled: string[];
    disabled: string[];
    customizations: Record<string, any>;
  };
  settings: {
    allowUserRegistration: boolean;
    requireEmailVerification: boolean;
    enableSSO: boolean;
    customDomain: boolean;
    dataRetention: number;
  };
  status: 'active' | 'pending' | 'suspended';
  lastUpdated: Date;
}

interface EnterpriseSettings {
  id: string;
  organization: string;
  settings: {
    security: {
      passwordPolicy: {
        minLength: number;
        requireUppercase: boolean;
        requireLowercase: boolean;
        requireNumbers: boolean;
        requireSymbols: boolean;
        maxAge: number;
      };
      sessionTimeout: number;
      mfaRequired: boolean;
      ipWhitelist: string[];
    };
    data: {
      retentionPeriod: number;
      backupFrequency: string;
      encryptionEnabled: boolean;
      dataLocation: string;
    };
    compliance: {
      frameworks: string[];
      auditLogging: boolean;
      dataProcessingAgreement: boolean;
      privacyPolicy: string;
    };
    integrations: {
      allowedDomains: string[];
      apiRateLimit: number;
      webhookEndpoints: string[];
    };
  };
  lastUpdated: Date;
  updatedBy: string;
}

interface EnterpriseAnalytics {
  id: string;
  organization: string;
  metrics: {
    totalUsers: number;
    activeUsers: number;
    teamsCreated: number;
    tasksCompleted: number;
    productivityScore: number;
    adoptionRate: number;
  };
  trends: {
    userGrowth: number[];
    productivityTrend: number[];
    featureUsage: Record<string, number>;
  };
  reports: {
    id: string;
    name: string;
    type: 'usage' | 'productivity' | 'security' | 'compliance';
    generatedAt: Date;
    data: any;
  }[];
  lastUpdated: Date;
}

interface EnterpriseAuditLog {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string;
  result: 'success' | 'failure' | 'error';
  details: Record<string, any>;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

const EnterpriseIntegration: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [ssoProviders, setSsoProviders] = useState<SSOProvider[]>([]);
  const [enterpriseUsers, setEnterpriseUsers] = useState<EnterpriseUser[]>([]);
  const [whiteLabelConfigs, setWhiteLabelConfigs] = useState<WhiteLabelConfig[]>([]);
  const [enterpriseSettings, setEnterpriseSettings] = useState<EnterpriseSettings[]>([]);
  const [enterpriseAnalytics, setEnterpriseAnalytics] = useState<EnterpriseAnalytics[]>([]);
  const [auditLogs, setAuditLogs] = useState<EnterpriseAuditLog[]>([]);
  const [isConfiguringSSO, setIsConfiguringSSO] = useState(false);
  const [isUpdatingWhiteLabel, setIsUpdatingWhiteLabel] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isSyncingUsers, setIsSyncingUsers] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<SSOProvider | null>(null);
  const [selectedUser, setSelectedUser] = useState<EnterpriseUser | null>(null);

  // Generate enterprise data
  useEffect(() => {
    const generateSSOProviders = (): SSOProvider[] => {
      return [
        {
          id: 'sso-1',
          name: 'Azure Active Directory',
          type: 'SAML',
          status: 'active',
          configuration: {
            endpoint: 'https://login.microsoftonline.com/tenant-id/saml2',
            certificate: 'certificate-data-here',
            attributes: {
              email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
              firstName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
              lastName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
              groups: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/groups'
            }
          },
          users: 1250,
          lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
          syncFrequency: 'every 4 hours',
          errorRate: 0.02
        },
        {
          id: 'sso-2',
          name: 'Google Workspace',
          type: 'OAuth',
          status: 'active',
          configuration: {
            endpoint: 'https://accounts.google.com/oauth2/v1/auth',
            clientId: 'google-client-id',
            clientSecret: 'google-client-secret',
            attributes: {
              email: 'email',
              firstName: 'given_name',
              lastName: 'family_name',
              groups: 'groups'
            }
          },
          users: 890,
          lastSync: new Date(Date.now() - 1 * 60 * 60 * 1000),
          syncFrequency: 'every 2 hours',
          errorRate: 0.01
        },
        {
          id: 'sso-3',
          name: 'Okta',
          type: 'SAML',
          status: 'testing',
          configuration: {
            endpoint: 'https://company.okta.com/app/syncscript/sso/saml',
            certificate: 'okta-certificate-data',
            attributes: {
              email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
              firstName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
              lastName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
              groups: 'http://schemas.xmlsoap.org/claims/Group'
            }
          },
          users: 0,
          lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
          syncFrequency: 'every 6 hours',
          errorRate: 0.05
        }
      ];
    };

    const generateEnterpriseUsers = (): EnterpriseUser[] => {
      return [
        {
          id: 'user-1',
          email: 'admin@company.com',
          firstName: 'John',
          lastName: 'Smith',
          role: 'admin',
          department: 'IT',
          ssoProvider: 'Azure Active Directory',
          lastLogin: new Date(Date.now() - 30 * 60 * 1000),
          status: 'active',
          permissions: {
            canCreateTeams: true,
            canManageUsers: true,
            canAccessAnalytics: true,
            canModifySettings: true,
            canExportData: true
          },
          groups: ['IT-Admins', 'Company-Leadership'],
          customAttributes: { employeeId: 'EMP001', location: 'San Francisco' }
        },
        {
          id: 'user-2',
          email: 'manager@company.com',
          firstName: 'Sarah',
          lastName: 'Johnson',
          role: 'manager',
          department: 'Marketing',
          ssoProvider: 'Google Workspace',
          lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'active',
          permissions: {
            canCreateTeams: true,
            canManageUsers: false,
            canAccessAnalytics: true,
            canModifySettings: false,
            canExportData: true
          },
          groups: ['Marketing-Team', 'Managers'],
          customAttributes: { employeeId: 'EMP002', location: 'New York' }
        },
        {
          id: 'user-3',
          email: 'user@company.com',
          firstName: 'Mike',
          lastName: 'Davis',
          role: 'user',
          department: 'Sales',
          ssoProvider: 'Azure Active Directory',
          lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
          status: 'active',
          permissions: {
            canCreateTeams: false,
            canManageUsers: false,
            canAccessAnalytics: false,
            canModifySettings: false,
            canExportData: false
          },
          groups: ['Sales-Team'],
          customAttributes: { employeeId: 'EMP003', location: 'Chicago' }
        }
      ];
    };

    const generateWhiteLabelConfigs = (): WhiteLabelConfig[] => {
      return [
        {
          id: 'wl-1',
          organization: 'Acme Corporation',
          domain: 'acme.syncscript.com',
          branding: {
            logo: 'https://acme.com/logo.png',
            favicon: 'https://acme.com/favicon.ico',
            primaryColor: '#1e40af',
            secondaryColor: '#3b82f6',
            fontFamily: 'Inter, sans-serif',
            customCSS: '.header { background: #1e40af; }'
          },
          features: {
            enabled: ['analytics', 'team-management', 'advanced-security'],
            disabled: ['beta-features', 'experimental-tools'],
            customizations: {
              welcomeMessage: 'Welcome to Acme Productivity Platform',
              supportEmail: 'support@acme.com'
            }
          },
          settings: {
            allowUserRegistration: false,
            requireEmailVerification: true,
            enableSSO: true,
            customDomain: true,
            dataRetention: 365
          },
          status: 'active',
          lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'wl-2',
          organization: 'TechStart Inc',
          domain: 'techstart.syncscript.com',
          branding: {
            logo: 'https://techstart.com/logo.png',
            favicon: 'https://techstart.com/favicon.ico',
            primaryColor: '#059669',
            secondaryColor: '#10b981',
            fontFamily: 'Roboto, sans-serif',
            customCSS: '.dashboard { background: linear-gradient(135deg, #059669, #10b981); }'
          },
          features: {
            enabled: ['all-features'],
            disabled: [],
            customizations: {
              welcomeMessage: 'Welcome to TechStart Workspace',
              supportEmail: 'help@techstart.com'
            }
          },
          settings: {
            allowUserRegistration: true,
            requireEmailVerification: true,
            enableSSO: true,
            customDomain: false,
            dataRetention: 180
          },
          status: 'active',
          lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateEnterpriseSettings = (): EnterpriseSettings[] => {
      return [
        {
          id: 'settings-1',
          organization: 'Acme Corporation',
          settings: {
            security: {
              passwordPolicy: {
                minLength: 12,
                requireUppercase: true,
                requireLowercase: true,
                requireNumbers: true,
                requireSymbols: true,
                maxAge: 90
              },
              sessionTimeout: 480,
              mfaRequired: true,
              ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8']
            },
            data: {
              retentionPeriod: 365,
              backupFrequency: 'daily',
              encryptionEnabled: true,
              dataLocation: 'US-East-1'
            },
            compliance: {
              frameworks: ['SOC2', 'GDPR', 'HIPAA'],
              auditLogging: true,
              dataProcessingAgreement: true,
              privacyPolicy: 'https://acme.com/privacy'
            },
            integrations: {
              allowedDomains: ['acme.com', 'acme-corp.com'],
              apiRateLimit: 1000,
              webhookEndpoints: ['https://acme.com/webhooks/syncscript']
            }
          },
          lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updatedBy: 'admin@acme.com'
        }
      ];
    };

    const generateEnterpriseAnalytics = (): EnterpriseAnalytics[] => {
      return [
        {
          id: 'analytics-1',
          organization: 'Acme Corporation',
          metrics: {
            totalUsers: 1250,
            activeUsers: 980,
            teamsCreated: 45,
            tasksCompleted: 15420,
            productivityScore: 87.5,
            adoptionRate: 78.4
          },
          trends: {
            userGrowth: [1200, 1220, 1235, 1240, 1250],
            productivityTrend: [82, 84, 85, 86, 87.5],
            featureUsage: {
              'task-management': 95,
              'team-collaboration': 78,
              'analytics': 65,
              'integrations': 45
            }
          },
          reports: [
            {
              id: 'report-1',
              name: 'Monthly Usage Report',
              type: 'usage',
              generatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              data: { users: 1250, sessions: 15420, features: 8 }
            },
            {
              id: 'report-2',
              name: 'Productivity Analysis',
              type: 'productivity',
              generatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
              data: { score: 87.5, improvement: 12.3, trends: 'positive' }
            }
          ],
          lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000)
        }
      ];
    };

    const generateAuditLogs = (): EnterpriseAuditLog[] => {
      return [
        {
          id: 'audit-1',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          user: 'admin@acme.com',
          action: 'User Role Changed',
          resource: 'user@acme.com',
          ipAddress: '192.168.1.50',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          result: 'success',
          details: { oldRole: 'user', newRole: 'manager' },
          riskLevel: 'high'
        },
        {
          id: 'audit-2',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          user: 'manager@acme.com',
          action: 'Team Created',
          resource: 'Marketing Team',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          result: 'success',
          details: { teamSize: 8, permissions: 'standard' },
          riskLevel: 'low'
        },
        {
          id: 'audit-3',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          user: 'unknown',
          action: 'Failed Login Attempt',
          resource: 'admin@acme.com',
          ipAddress: '203.0.113.1',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          result: 'failure',
          details: { reason: 'Invalid password', attempts: 3 },
          riskLevel: 'critical'
        }
      ];
    };

    setSsoProviders(generateSSOProviders());
    setEnterpriseUsers(generateEnterpriseUsers());
    setWhiteLabelConfigs(generateWhiteLabelConfigs());
    setEnterpriseSettings(generateEnterpriseSettings());
    setEnterpriseAnalytics(generateEnterpriseAnalytics());
    setAuditLogs(generateAuditLogs());
  }, []);

  const configureSSO = async (providerId: string) => {
    setIsConfiguringSSO(true);
    
    // Simulate SSO configuration
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update provider status
    setSsoProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, status: 'active' as const, errorRate: 0.01 }
        : provider
    ));
    
    setIsConfiguringSSO(false);
  };

  const updateWhiteLabel = async (configId: string) => {
    setIsUpdatingWhiteLabel(true);
    
    // Simulate white-label update
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Update configuration
    setWhiteLabelConfigs(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, lastUpdated: new Date() }
        : config
    ));
    
    setIsUpdatingWhiteLabel(false);
  };

  const generateReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    // Add new report
    const newReport = {
      id: `report-${Date.now()}`,
      name: 'Enterprise Analytics Report',
      type: 'usage' as const,
      generatedAt: new Date(),
      data: { users: 1250, sessions: 15420, features: 8 }
    };
    
    setEnterpriseAnalytics(prev => prev.map(analytics => ({
      ...analytics,
      reports: [...analytics.reports, newReport]
    })));
    
    setIsGeneratingReport(false);
  };

  const syncUsers = async (providerId: string) => {
    setIsSyncingUsers(true);
    
    // Simulate user sync
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Update provider sync time
    setSsoProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, lastSync: new Date(), errorRate: Math.max(0, provider.errorRate - 0.01) }
        : provider
    ));
    
    setIsSyncingUsers(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'failure': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string): string => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSSOProviders = ssoProviders.length;
  const activeSSOProviders = ssoProviders.filter(p => p.status === 'active').length;
  const totalSSOUsers = ssoProviders.reduce((sum, p) => sum + p.users, 0);
  const avgErrorRate = ssoProviders.reduce((sum, p) => sum + p.errorRate, 0) / totalSSOProviders;
  const totalEnterpriseUsers = enterpriseUsers.length;
  const activeUsers = enterpriseUsers.filter(u => u.status === 'active').length;
  const totalWhiteLabelConfigs = whiteLabelConfigs.length;
  const activeConfigs = whiteLabelConfigs.filter(c => c.status === 'active').length;
  const totalAuditLogs = auditLogs.length;
  const criticalLogs = auditLogs.filter(l => l.riskLevel === 'critical').length;

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
              <h2 className="text-2xl font-bold">🏢 Enterprise Integration</h2>
              <p className="text-indigo-100 mt-1">SSO configuration, white-label customization, enterprise analytics, and admin controls</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-indigo-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Enterprise Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">SSO Providers</p>
                  <p className="text-2xl font-bold text-blue-800">{activeSSOProviders}/{totalSSOProviders}</p>
                  <p className="text-xs text-blue-600">Active providers</p>
                </div>
                <div className="text-3xl">🔐</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Enterprise Users</p>
                  <p className="text-2xl font-bold text-green-800">{activeUsers}</p>
                  <p className="text-xs text-green-600">of {totalEnterpriseUsers} total</p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">White-Label</p>
                  <p className="text-2xl font-bold text-purple-800">{activeConfigs}</p>
                  <p className="text-xs text-purple-600">Active configurations</p>
                </div>
                <div className="text-3xl">🎨</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Audit Logs</p>
                  <p className="text-2xl font-bold text-orange-800">{criticalLogs}</p>
                  <p className="text-xs text-orange-600">Critical events</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Enterprise management and configuration tools
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => configureSSO('sso-3')}
                  disabled={isConfiguringSSO}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isConfiguringSSO ? '⏳ Configuring...' : '🔐 Configure SSO'}
                </button>
                <button
                  onClick={() => updateWhiteLabel('wl-1')}
                  disabled={isUpdatingWhiteLabel}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isUpdatingWhiteLabel ? '⏳ Updating...' : '🎨 Update Branding'}
                </button>
                <button
                  onClick={generateReport}
                  disabled={isGeneratingReport}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingReport ? '⏳ Generating...' : '📊 Generate Report'}
                </button>
                <button
                  onClick={() => syncUsers('sso-1')}
                  disabled={isSyncingUsers}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                >
                  {isSyncingUsers ? '⏳ Syncing...' : '🔄 Sync Users'}
                </button>
              </div>
            </div>
          </div>

          {/* SSO Providers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">SSO Providers ({ssoProviders.length})</h3>
            <div className="space-y-4">
              {ssoProviders.map((provider) => (
                <div key={provider.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{provider.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(provider.status)}`}>
                        {provider.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {provider.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Users:</span>
                        <span className="font-medium text-gray-900 ml-1">{provider.users.toLocaleString()}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Last Sync:</span>
                        <span className="text-gray-500 ml-1">{formatDate(provider.lastSync)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium text-gray-900 ml-1">{provider.syncFrequency}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Error Rate:</span>
                        <span className="font-medium text-gray-900 ml-1">{(provider.errorRate * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Configuration:</div>
                      <div className="text-sm text-gray-600">
                        <div>Endpoint: {provider.configuration.endpoint}</div>
                        <div>Attributes: {Object.keys(provider.configuration.attributes).join(', ')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Users */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Enterprise Users ({enterpriseUsers.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SSO Provider</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enterpriseUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.ssoProvider}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.lastLogin)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnterpriseIntegration;
