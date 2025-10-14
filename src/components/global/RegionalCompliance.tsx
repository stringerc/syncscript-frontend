/**
 * Regional Compliance System Component
 * 
 * GDPR, CCPA, and data privacy regulations compliance
 * Includes data protection, consent management, and compliance reporting
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComplianceFramework {
  id: string;
  name: string;
  region: string;
  flag: string;
  description: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  lastAudit: string;
  nextAudit: string;
  requirements: string[];
}

interface DataProcessingActivity {
  id: string;
  name: string;
  purpose: string;
  legalBasis: string;
  dataTypes: string[];
  retentionPeriod: string;
  processors: string[];
  status: 'active' | 'suspended' | 'completed';
}

interface ConsentRecord {
  id: string;
  userId: string;
  purpose: string;
  consentGiven: boolean;
  timestamp: string;
  method: 'explicit' | 'implied' | 'opt-in' | 'opt-out';
  version: string;
  withdrawn?: string;
}

interface PrivacyRequest {
  id: string;
  userId: string;
  type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  submittedAt: string;
  completedAt?: string;
  description: string;
}

interface RegionalComplianceProps {
  onClose: () => void;
}

const RegionalCompliance: React.FC<RegionalComplianceProps> = ({ onClose }) => {
  const [complianceFrameworks, setComplianceFrameworks] = useState<ComplianceFramework[]>([]);
  const [dataProcessingActivities, setDataProcessingActivities] = useState<DataProcessingActivity[]>([]);
  const [consentRecords, setConsentRecords] = useState<ConsentRecord[]>([]);
  const [privacyRequests, setPrivacyRequests] = useState<PrivacyRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'frameworks' | 'processing' | 'consent' | 'requests'>('frameworks');
  const [isAuditing, setIsAuditing] = useState(false);

  useEffect(() => {
    loadComplianceData();
  }, []);

  const loadComplianceData = async () => {
    setIsLoading(true);
    
    try {
      // Mock compliance frameworks
      const mockFrameworks: ComplianceFramework[] = [
        {
          id: 'gdpr',
          name: 'GDPR',
          region: 'European Union',
          flag: '🇪🇺',
          description: 'General Data Protection Regulation',
          status: 'compliant',
          lastAudit: new Date(Date.now() - 2592000000).toISOString(),
          nextAudit: new Date(Date.now() + 7776000000).toISOString(),
          requirements: [
            'Data minimization',
            'Purpose limitation',
            'Storage limitation',
            'Consent management',
            'Right to erasure',
            'Data portability',
            'Privacy by design',
            'Data protection impact assessment'
          ]
        },
        {
          id: 'ccpa',
          name: 'CCPA',
          region: 'California, USA',
          flag: '🇺🇸',
          description: 'California Consumer Privacy Act',
          status: 'compliant',
          lastAudit: new Date(Date.now() - 1728000000).toISOString(),
          nextAudit: new Date(Date.now() + 6912000000).toISOString(),
          requirements: [
            'Right to know',
            'Right to delete',
            'Right to opt-out',
            'Right to non-discrimination',
            'Transparency requirements',
            'Data security measures',
            'Third-party disclosures'
          ]
        },
        {
          id: 'pipeda',
          name: 'PIPEDA',
          region: 'Canada',
          flag: '🇨🇦',
          description: 'Personal Information Protection and Electronic Documents Act',
          status: 'partial',
          lastAudit: new Date(Date.now() - 3456000000).toISOString(),
          nextAudit: new Date(Date.now() + 5184000000).toISOString(),
          requirements: [
            'Consent for collection',
            'Purpose identification',
            'Limiting collection',
            'Limiting use and disclosure',
            'Accuracy',
            'Safeguards',
            'Openness',
            'Individual access'
          ]
        },
        {
          id: 'lgpd',
          name: 'LGPD',
          region: 'Brazil',
          flag: '🇧🇷',
          description: 'Lei Geral de Proteção de Dados',
          status: 'non-compliant',
          lastAudit: new Date(Date.now() - 4320000000).toISOString(),
          nextAudit: new Date(Date.now() + 4320000000).toISOString(),
          requirements: [
            'Data processing principles',
            'Legal basis for processing',
            'Data subject rights',
            'Data protection officer',
            'Impact assessment',
            'Security measures',
            'Breach notification'
          ]
        }
      ];

      // Mock data processing activities
      const mockProcessingActivities: DataProcessingActivity[] = [
        {
          id: 'activity-1',
          name: 'User Authentication',
          purpose: 'User account management and security',
          legalBasis: 'Legitimate interest',
          dataTypes: ['Email', 'Password hash', 'IP address', 'Device info'],
          retentionPeriod: '3 years after account closure',
          processors: ['Auth0', 'AWS Cognito'],
          status: 'active'
        },
        {
          id: 'activity-2',
          name: 'Analytics and Performance',
          purpose: 'Improve application performance and user experience',
          legalBasis: 'Consent',
          dataTypes: ['Usage data', 'Performance metrics', 'Error logs'],
          retentionPeriod: '2 years',
          processors: ['Google Analytics', 'PostHog', 'Sentry'],
          status: 'active'
        },
        {
          id: 'activity-3',
          name: 'Marketing Communications',
          purpose: 'Send promotional emails and product updates',
          legalBasis: 'Consent',
          dataTypes: ['Email address', 'Name', 'Preferences'],
          retentionPeriod: 'Until consent withdrawn',
          processors: ['Mailchimp', 'SendGrid'],
          status: 'active'
        },
        {
          id: 'activity-4',
          name: 'Customer Support',
          purpose: 'Provide customer service and technical support',
          legalBasis: 'Contract performance',
          dataTypes: ['Support tickets', 'Chat logs', 'Contact information'],
          retentionPeriod: '5 years',
          processors: ['Zendesk', 'Intercom'],
          status: 'active'
        }
      ];

      // Mock consent records
      const mockConsentRecords: ConsentRecord[] = [
        {
          id: 'consent-1',
          userId: 'user-123',
          purpose: 'Analytics and Performance',
          consentGiven: true,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          method: 'explicit',
          version: '1.2'
        },
        {
          id: 'consent-2',
          userId: 'user-123',
          purpose: 'Marketing Communications',
          consentGiven: true,
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          method: 'opt-in',
          version: '1.1'
        },
        {
          id: 'consent-3',
          userId: 'user-456',
          purpose: 'Marketing Communications',
          consentGiven: false,
          timestamp: new Date(Date.now() - 259200000).toISOString(),
          method: 'opt-out',
          version: '1.2'
        },
        {
          id: 'consent-4',
          userId: 'user-789',
          purpose: 'Analytics and Performance',
          consentGiven: true,
          timestamp: new Date(Date.now() - 345600000).toISOString(),
          method: 'implied',
          version: '1.0',
          withdrawn: new Date(Date.now() - 86400000).toISOString()
        }
      ];

      // Mock privacy requests
      const mockPrivacyRequests: PrivacyRequest[] = [
        {
          id: 'request-1',
          userId: 'user-123',
          type: 'access',
          status: 'completed',
          submittedAt: new Date(Date.now() - 172800000).toISOString(),
          completedAt: new Date(Date.now() - 86400000).toISOString(),
          description: 'Request for personal data export'
        },
        {
          id: 'request-2',
          userId: 'user-456',
          type: 'erasure',
          status: 'in-progress',
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          description: 'Request for account deletion and data removal'
        },
        {
          id: 'request-3',
          userId: 'user-789',
          type: 'portability',
          status: 'pending',
          submittedAt: new Date(Date.now() - 43200000).toISOString(),
          description: 'Request for data portability to another service'
        },
        {
          id: 'request-4',
          userId: 'user-321',
          type: 'rectification',
          status: 'completed',
          submittedAt: new Date(Date.now() - 259200000).toISOString(),
          completedAt: new Date(Date.now() - 172800000).toISOString(),
          description: 'Request to correct inaccurate personal information'
        }
      ];

      setComplianceFrameworks(mockFrameworks);
      setDataProcessingActivities(mockProcessingActivities);
      setConsentRecords(mockConsentRecords);
      setPrivacyRequests(mockPrivacyRequests);
    } catch (error) {
      console.error('Failed to load compliance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const runComplianceAudit = async () => {
    setIsAuditing(true);
    
    try {
      // Simulate compliance audit
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('Compliance audit completed');
    } catch (error) {
      console.error('Failed to run compliance audit:', error);
    } finally {
      setIsAuditing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'non-compliant': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'access': return '👁️';
      case 'rectification': return '✏️';
      case 'erasure': return '🗑️';
      case 'portability': return '📦';
      case 'restriction': return '🚫';
      case 'objection': return '❌';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading compliance data...</span>
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
              <h2 className="text-2xl font-bold">Regional Compliance</h2>
              <p className="text-red-100 mt-1">GDPR, CCPA, and data privacy regulations compliance</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-red-200 text-sm">Frameworks:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {complianceFrameworks.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-200 text-sm">Activities:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {dataProcessingActivities.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-200 text-sm">Requests:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {privacyRequests.length}
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
              { id: 'frameworks', name: 'Frameworks', icon: '📋' },
              { id: 'processing', name: 'Processing', icon: '⚙️' },
              { id: 'consent', name: 'Consent', icon: '✅' },
              { id: 'requests', name: 'Requests', icon: '📝' }
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
          {selectedTab === 'frameworks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Compliance Frameworks</h3>
                <button
                  onClick={runComplianceAudit}
                  disabled={isAuditing}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isAuditing ? 'Auditing...' : 'Run Audit'}
                </button>
              </div>
              
              <div className="space-y-4">
                {complianceFrameworks.map((framework) => (
                  <motion.div
                    key={framework.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{framework.flag}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{framework.name}</h4>
                        <p className="text-sm text-gray-600">{framework.description}</p>
                        <p className="text-xs text-gray-500">{framework.region}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(framework.status)}`}>
                        {framework.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Last Audit:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(framework.lastAudit).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Next Audit:</span>
                        <span className="ml-2 text-gray-900">
                          {new Date(framework.nextAudit).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Requirements:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {framework.requirements.map((requirement, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {requirement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'processing' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Data Processing Activities</h3>
              
              <div className="space-y-4">
                {dataProcessingActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{activity.name}</h4>
                        <p className="text-sm text-gray-600">{activity.purpose}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        activity.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Legal Basis:</span>
                        <span className="ml-2 text-gray-900">{activity.legalBasis}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Retention:</span>
                        <span className="ml-2 text-gray-900">{activity.retentionPeriod}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Data Types:</div>
                      <div className="flex flex-wrap gap-2">
                        {activity.dataTypes.map((type, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Processors:</div>
                      <div className="text-sm text-gray-600">{activity.processors.join(', ')}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'consent' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Consent Records</h3>
              
              <div className="space-y-4">
                {consentRecords.map((consent) => (
                  <motion.div
                    key={consent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border rounded-lg transition-all ${
                      consent.consentGiven ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">User: {consent.userId}</h4>
                        <p className="text-sm text-gray-600">{consent.purpose}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(consent.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          consent.consentGiven ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {consent.consentGiven ? 'CONSENT GIVEN' : 'CONSENT DENIED'}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {consent.method.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Method:</span>
                        <span className="ml-2 text-gray-900 capitalize">{consent.method}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Version:</span>
                        <span className="ml-2 text-gray-900">{consent.version}</span>
                      </div>
                    </div>
                    
                    {consent.withdrawn && (
                      <div className="mt-2 text-sm text-red-600">
                        Consent withdrawn: {new Date(consent.withdrawn).toLocaleString()}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'requests' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Privacy Requests</h3>
              
              <div className="space-y-4">
                {privacyRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getRequestTypeIcon(request.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 capitalize">{request.type} Request</h4>
                        <p className="text-sm text-gray-600">User: {request.userId}</p>
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(request.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRequestStatusColor(request.status)}`}>
                        {request.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-3">{request.description}</div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-2 text-gray-900 capitalize">{request.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className="ml-2 text-gray-900 capitalize">{request.status}</span>
                      </div>
                      {request.completedAt && (
                        <div>
                          <span className="text-gray-600">Completed:</span>
                          <span className="ml-2 text-gray-900">
                            {new Date(request.completedAt).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View Details
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Process
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Regional Compliance • {complianceFrameworks.length} frameworks • {dataProcessingActivities.length} activities • {privacyRequests.length} requests
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
                console.log('Exporting compliance data...');
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

export default RegionalCompliance;
