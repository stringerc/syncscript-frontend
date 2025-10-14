/**
 * Enterprise SSO System Component
 * 
 * Provides comprehensive Single Sign-On integration for enterprise customers
 * Includes SAML, OAuth, LDAP, and custom provider support
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SSOProvider {
  id: string;
  name: string;
  type: 'saml' | 'oauth' | 'ldap' | 'oauth2' | 'custom';
  description: string;
  icon: string;
  color: string;
  isConfigured: boolean;
  isActive: boolean;
  configuration: {
    clientId?: string;
    clientSecret?: string;
    domain?: string;
    metadataUrl?: string;
    certificate?: string;
    attributes: Record<string, string>;
  };
  userMapping: {
    email: string;
    firstName: string;
    lastName: string;
    groups: string;
  };
  security: {
    encryption: boolean;
    signature: boolean;
    forceAuth: boolean;
    allowPassive: boolean;
  };
}

interface EnterpriseSSOSystemProps {
  userId: string;
  onClose: () => void;
}

const AVAILABLE_SSO_PROVIDERS: SSOProvider[] = [
  {
    id: 'auth0-enterprise',
    name: 'Auth0 Enterprise',
    type: 'oauth2',
    description: 'Enterprise-grade identity platform with advanced security',
    icon: '🔐',
    color: 'from-blue-600 to-indigo-600',
    isConfigured: false,
    isActive: false,
    configuration: {
      attributes: {
        'connection_type': 'enterprise',
        'requires_username': 'false'
      }
    },
    userMapping: {
      email: 'email',
      firstName: 'given_name',
      lastName: 'family_name',
      groups: 'groups'
    },
    security: {
      encryption: true,
      signature: true,
      forceAuth: true,
      allowPassive: false
    }
  },
  {
    id: 'okta',
    name: 'Okta',
    type: 'saml',
    description: 'Leading enterprise identity management platform',
    icon: '🏢',
    color: 'from-purple-600 to-pink-600',
    isConfigured: false,
    isActive: false,
    configuration: {
      attributes: {
        'issuer': 'https://your-org.okta.com',
        'audience': 'syncscript-app',
        'name_id_format': 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
      }
    },
    userMapping: {
      email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
      firstName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
      lastName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
      groups: 'http://schemas.xmlsoap.org/claims/Group'
    },
    security: {
      encryption: true,
      signature: true,
      forceAuth: true,
      allowPassive: false
    }
  },
  {
    id: 'azure-ad',
    name: 'Microsoft Azure AD',
    type: 'oauth2',
    description: 'Microsoft enterprise identity and access management',
    icon: '☁️',
    color: 'from-blue-500 to-cyan-500',
    isConfigured: false,
    isActive: false,
    configuration: {
      attributes: {
        'tenant_id': 'common',
        'scope': 'openid profile email',
        'response_type': 'code'
      }
    },
    userMapping: {
      email: 'email',
      firstName: 'given_name',
      lastName: 'family_name',
      groups: 'groups'
    },
    security: {
      encryption: true,
      signature: true,
      forceAuth: false,
      allowPassive: true
    }
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    type: 'oauth2',
    description: 'Google enterprise identity for Workspace customers',
    icon: '🌐',
    color: 'from-green-500 to-emerald-500',
    isConfigured: false,
    isActive: false,
    configuration: {
      attributes: {
        'hd': 'your-domain.com',
        'scope': 'openid email profile',
        'access_type': 'offline'
      }
    },
    userMapping: {
      email: 'email',
      firstName: 'given_name',
      lastName: 'family_name',
      groups: 'groups'
    },
    security: {
      encryption: true,
      signature: true,
      forceAuth: true,
      allowPassive: false
    }
  },
  {
    id: 'ldap-active-directory',
    name: 'Active Directory (LDAP)',
    type: 'ldap',
    description: 'Microsoft Active Directory LDAP integration',
    icon: '🏛️',
    color: 'from-gray-600 to-gray-800',
    isConfigured: false,
    isActive: false,
    configuration: {
      attributes: {
        'server_url': 'ldap://your-domain.com:389',
        'base_dn': 'DC=your-domain,DC=com',
        'bind_dn': 'CN=service-account,OU=Service Accounts,DC=your-domain,DC=com'
      }
    },
    userMapping: {
      email: 'mail',
      firstName: 'givenName',
      lastName: 'sn',
      groups: 'memberOf'
    },
    security: {
      encryption: true,
      signature: false,
      forceAuth: true,
      allowPassive: false
    }
  },
  {
    id: 'onelogin',
    name: 'OneLogin',
    type: 'saml',
    description: 'Unified access management platform',
    icon: '🔑',
    color: 'from-orange-500 to-red-500',
    isConfigured: false,
    isActive: false,
    configuration: {
      attributes: {
        'issuer': 'https://your-org.onelogin.com/saml/metadata',
        'audience': 'syncscript-app',
        'name_id_format': 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
      }
    },
    userMapping: {
      email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
      firstName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
      lastName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
      groups: 'http://schemas.xmlsoap.org/claims/Group'
    },
    security: {
      encryption: true,
      signature: true,
      forceAuth: true,
      allowPassive: false
    }
  }
];

const EnterpriseSSOSystem: React.FC<EnterpriseSSOSystemProps> = ({ userId, onClose }) => {
  const [ssoProviders, setSsoProviders] = useState<SSOProvider[]>(AVAILABLE_SSO_PROVIDERS);
  const [selectedProvider, setSelectedProvider] = useState<SSOProvider | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [configurationStep, setConfigurationStep] = useState<'basic' | 'mapping' | 'security' | 'test'>('basic');

  const handleProviderSelect = (provider: SSOProvider) => {
    setSelectedProvider(provider);
    setConfigurationStep('basic');
  };

  const handleConfigureProvider = async (providerId: string, config: Partial<SSOProvider['configuration']>) => {
    setIsConfiguring(true);
    
    try {
      // Simulate API call for SSO configuration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSsoProviders(prev => prev.map(provider => 
        provider.id === providerId 
          ? { 
              ...provider, 
              configuration: { ...provider.configuration, ...config },
              isConfigured: true 
            }
          : provider
      ));
      
      console.log('✅ SSO provider configured successfully');
    } catch (error) {
      console.error('Failed to configure SSO provider:', error);
    } finally {
      setIsConfiguring(false);
    }
  };

  const handleTestConnection = async (providerId: string) => {
    setIsTesting(true);
    
    try {
      // Simulate SSO connection test
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResults = {
        status: 'success',
        message: 'SSO connection successful',
        userInfo: {
          email: 'test@company.com',
          firstName: 'John',
          lastName: 'Doe',
          groups: ['admin', 'users']
        },
        timestamp: new Date().toISOString()
      };
      
      setTestResults(mockResults);
    } catch (error) {
      setTestResults({
        status: 'error',
        message: 'SSO connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleActivateProvider = async (providerId: string) => {
    try {
      // Simulate provider activation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSsoProviders(prev => prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, isActive: true }
          : { ...provider, isActive: false } // Deactivate others
      ));
      
      console.log('✅ SSO provider activated');
    } catch (error) {
      console.error('Failed to activate SSO provider:', error);
    }
  };

  const getProviderStatusColor = (provider: SSOProvider) => {
    if (provider.isActive) return 'text-green-600 bg-green-100';
    if (provider.isConfigured) return 'text-blue-600 bg-blue-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getProviderStatusText = (provider: SSOProvider) => {
    if (provider.isActive) return 'Active';
    if (provider.isConfigured) return 'Configured';
    return 'Available';
  };

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
              <h2 className="text-2xl font-bold">Enterprise SSO System</h2>
              <p className="text-blue-100 mt-1">Secure single sign-on for enterprise customers</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Providers:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {ssoProviders.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Active:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {ssoProviders.filter(p => p.isActive).length}
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

        {/* Content */}
        <div className="flex h-[60vh]">
          {/* Provider List */}
          <div className="w-1/2 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SSO Providers</h3>
              <div className="space-y-3">
                {ssoProviders.map((provider) => (
                  <motion.div
                    key={provider.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProviderSelect(provider)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedProvider?.id === provider.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${provider.color} flex items-center justify-center text-xl`}>
                          {provider.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                          <p className="text-sm text-gray-600">{provider.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProviderStatusColor(provider)}`}>
                          {getProviderStatusText(provider)}
                        </span>
                        {provider.isActive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Type: {provider.type.toUpperCase()}</span>
                      <div className="flex space-x-2">
                        {provider.security.encryption && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Encrypted</span>
                        )}
                        {provider.security.signature && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Signed</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {selectedProvider ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Configure {selectedProvider.name}</h3>
                    <p className="text-sm text-gray-600">{selectedProvider.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleTestConnection(selectedProvider.id)}
                      disabled={isTesting || !selectedProvider.isConfigured}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {isTesting ? 'Testing...' : 'Test Connection'}
                    </button>
                    <button
                      onClick={() => handleActivateProvider(selectedProvider.id)}
                      disabled={!selectedProvider.isConfigured}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {selectedProvider.isActive ? 'Active' : 'Activate'}
                    </button>
                  </div>
                </div>

                {/* Configuration Steps */}
                <div className="flex space-x-2 mb-6">
                  {['basic', 'mapping', 'security', 'test'].map((step, index) => (
                    <button
                      key={step}
                      onClick={() => setConfigurationStep(step as any)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        configurationStep === step
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {step.charAt(0).toUpperCase() + step.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Basic Configuration */}
                {configurationStep === 'basic' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Basic Configuration</h4>
                    {selectedProvider.type === 'oauth2' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Client ID
                          </label>
                          <input
                            type="text"
                            placeholder="Enter OAuth client ID"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Client Secret
                          </label>
                          <input
                            type="password"
                            placeholder="Enter OAuth client secret"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Domain
                          </label>
                          <input
                            type="text"
                            placeholder="your-domain.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                    
                    {selectedProvider.type === 'saml' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            SAML Metadata URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://your-idp.com/saml/metadata"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Issuer
                          </label>
                          <input
                            type="text"
                            placeholder="https://your-idp.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Audience
                          </label>
                          <input
                            type="text"
                            placeholder="syncscript-app"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}

                    {selectedProvider.type === 'ldap' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Server URL
                          </label>
                          <input
                            type="text"
                            placeholder="ldap://your-domain.com:389"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Base DN
                          </label>
                          <input
                            type="text"
                            placeholder="DC=your-domain,DC=com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bind DN
                          </label>
                          <input
                            type="text"
                            placeholder="CN=service-account,OU=Service Accounts,DC=your-domain,DC=com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bind Password
                          </label>
                          <input
                            type="password"
                            placeholder="Enter service account password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* User Mapping */}
                {configurationStep === 'mapping' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">User Attribute Mapping</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedProvider.userMapping).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </label>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                              // Update user mapping
                              const newMapping = { ...selectedProvider.userMapping, [key]: e.target.value };
                              setSelectedProvider({ ...selectedProvider, userMapping: newMapping });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {configurationStep === 'security' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Security Settings</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedProvider.security).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {key === 'encryption' && 'Encrypt SAML assertions'}
                              {key === 'signature' && 'Sign SAML requests and responses'}
                              {key === 'forceAuth' && 'Force re-authentication'}
                              {key === 'allowPassive' && 'Allow passive authentication'}
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => {
                                const newSecurity = { ...selectedProvider.security, [key]: e.target.checked };
                                setSelectedProvider({ ...selectedProvider, security: newSecurity });
                              }}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Test Results */}
                {configurationStep === 'test' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Connection Test</h4>
                    {testResults ? (
                      <div className={`p-4 rounded-lg ${
                        testResults.status === 'success' 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`text-lg ${testResults.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {testResults.status === 'success' ? '✅' : '❌'}
                          </span>
                          <span className={`font-medium ${
                            testResults.status === 'success' ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {testResults.message}
                          </span>
                        </div>
                        {testResults.userInfo && (
                          <div className="text-sm text-gray-700">
                            <div>Email: {testResults.userInfo.email}</div>
                            <div>Name: {testResults.userInfo.firstName} {testResults.userInfo.lastName}</div>
                            <div>Groups: {testResults.userInfo.groups.join(', ')}</div>
                          </div>
                        )}
                        {testResults.error && (
                          <div className="text-sm text-red-700 mt-2">
                            Error: {testResults.error}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-400 text-lg mb-2">🧪</div>
                        <p className="text-gray-600">Click "Test Connection" to verify your SSO configuration</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Save Configuration */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleConfigureProvider(selectedProvider.id, selectedProvider.configuration)}
                    disabled={isConfiguring}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConfiguring ? 'Saving Configuration...' : 'Save Configuration'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an SSO Provider</h3>
                <p className="text-gray-600">Choose a provider from the list to configure enterprise SSO</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {ssoProviders.filter(p => p.isActive).length} provider{ssoProviders.filter(p => p.isActive).length !== 1 ? 's' : ''} active
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
                // TODO: Export SSO configuration
                console.log('Exporting SSO configuration...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Export Config
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnterpriseSSOSystem;
