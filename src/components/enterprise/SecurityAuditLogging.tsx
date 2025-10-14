/**
 * Security Audit Logging Component
 * 
 * Provides comprehensive security audit trail and compliance monitoring
 * Includes activity tracking, security events, and compliance reporting
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceId: string;
  category: 'authentication' | 'authorization' | 'data_access' | 'configuration' | 'security' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
  userAgent: string;
  location: string;
  status: 'success' | 'failure' | 'warning';
  details: Record<string, any>;
  complianceFlags: string[];
}

interface SecurityMetrics {
  totalEvents: number;
  criticalEvents: number;
  failedLogins: number;
  suspiciousActivity: number;
  dataBreaches: number;
  complianceScore: number;
}

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  requirements: ComplianceRequirement[];
  status: 'compliant' | 'partial' | 'non_compliant';
  lastAudit: string;
}

interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  status: 'compliant' | 'non_compliant' | 'not_applicable';
  evidence: string[];
  lastChecked: string;
}

interface SecurityAuditLoggingProps {
  userId: string;
  onClose: () => void;
}

const COMPLIANCE_FRAMEWORKS: ComplianceFramework[] = [
  {
    id: 'gdpr',
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    requirements: [
      {
        id: 'gdpr-1',
        name: 'Data Processing Records',
        description: 'Maintain records of all data processing activities',
        status: 'compliant',
        evidence: ['audit-logs-2024', 'processing-register'],
        lastChecked: '2024-03-01T00:00:00Z'
      },
      {
        id: 'gdpr-2',
        name: 'User Consent Tracking',
        description: 'Track and manage user consent for data processing',
        status: 'compliant',
        evidence: ['consent-management-system'],
        lastChecked: '2024-03-01T00:00:00Z'
      },
      {
        id: 'gdpr-3',
        name: 'Data Breach Notification',
        description: 'Ability to detect and report data breaches within 72 hours',
        status: 'compliant',
        evidence: ['breach-detection-system', 'notification-procedures'],
        lastChecked: '2024-03-01T00:00:00Z'
      }
    ],
    status: 'compliant',
    lastAudit: '2024-03-01T00:00:00Z'
  },
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    description: 'Security, Availability, Processing Integrity, Confidentiality, Privacy',
    requirements: [
      {
        id: 'soc2-1',
        name: 'Access Controls',
        description: 'Implement and monitor access controls',
        status: 'compliant',
        evidence: ['rbac-system', 'access-logs'],
        lastChecked: '2024-03-01T00:00:00Z'
      },
      {
        id: 'soc2-2',
        name: 'System Monitoring',
        description: 'Continuous monitoring of system activities',
        status: 'compliant',
        evidence: ['audit-logging', 'monitoring-dashboard'],
        lastChecked: '2024-03-01T00:00:00Z'
      },
      {
        id: 'soc2-3',
        name: 'Data Encryption',
        description: 'Encrypt data at rest and in transit',
        status: 'compliant',
        evidence: ['encryption-certificates', 'tls-configuration'],
        lastChecked: '2024-03-01T00:00:00Z'
      }
    ],
    status: 'compliant',
    lastAudit: '2024-03-01T00:00:00Z'
  },
  {
    id: 'ccpa',
    name: 'CCPA',
    description: 'California Consumer Privacy Act',
    requirements: [
      {
        id: 'ccpa-1',
        name: 'Consumer Rights Management',
        description: 'Enable consumers to access, delete, and opt-out of data sales',
        status: 'compliant',
        evidence: ['privacy-portal', 'data-export-tools'],
        lastChecked: '2024-03-01T00:00:00Z'
      }
    ],
    status: 'compliant',
    lastAudit: '2024-03-01T00:00:00Z'
  }
];

const SecurityAuditLogging: React.FC<SecurityAuditLoggingProps> = ({ userId, onClose }) => {
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    totalEvents: 0,
    criticalEvents: 0,
    failedLogins: 0,
    suspiciousActivity: 0,
    dataBreaches: 0,
    complianceScore: 0
  });
  const [complianceFrameworks, setComplianceFrameworks] = useState<ComplianceFramework[]>(COMPLIANCE_FRAMEWORKS);
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<ComplianceFramework | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading audit data
    const loadAuditData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate mock audit events
        const mockEvents: AuditEvent[] = [
          {
            id: 'audit-1',
            timestamp: new Date().toISOString(),
            userId: 'user-1',
            userEmail: 'admin@company.com',
            action: 'LOGIN_SUCCESS',
            resource: 'authentication',
            resourceId: 'auth-session-123',
            category: 'authentication',
            severity: 'low',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            location: 'San Francisco, CA, US',
            status: 'success',
            details: {
              loginMethod: 'sso',
              provider: 'okta',
              sessionDuration: 3600
            },
            complianceFlags: ['gdpr', 'soc2']
          },
          {
            id: 'audit-2',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            userId: 'user-2',
            userEmail: 'manager@company.com',
            action: 'TASK_CREATE',
            resource: 'task',
            resourceId: 'task-456',
            category: 'data_access',
            severity: 'low',
            ipAddress: '192.168.1.101',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            location: 'New York, NY, US',
            status: 'success',
            details: {
              taskTitle: 'Q1 Project Review',
              projectId: 'project-789',
              priority: 'high'
            },
            complianceFlags: ['gdpr']
          },
          {
            id: 'audit-3',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            userId: 'unknown',
            userEmail: 'unknown@external.com',
            action: 'LOGIN_FAILED',
            resource: 'authentication',
            resourceId: 'auth-attempt-789',
            category: 'authentication',
            severity: 'high',
            ipAddress: '203.0.113.1',
            userAgent: 'Mozilla/5.0 (Unknown)',
            location: 'Unknown',
            status: 'failure',
            details: {
              reason: 'invalid_credentials',
              attempts: 5,
              blocked: true
            },
            complianceFlags: ['soc2']
          },
          {
            id: 'audit-4',
            timestamp: new Date(Date.now() - 10800000).toISOString(),
            userId: 'user-3',
            userEmail: 'member@company.com',
            action: 'DATA_EXPORT',
            resource: 'user_data',
            resourceId: 'export-321',
            category: 'data_access',
            severity: 'medium',
            ipAddress: '192.168.1.102',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            location: 'Los Angeles, CA, US',
            status: 'success',
            details: {
              dataType: 'personal_data',
              format: 'json',
              size: '2.5MB'
            },
            complianceFlags: ['gdpr', 'ccpa']
          }
        ];

        setAuditEvents(mockEvents);
        
        setSecurityMetrics({
          totalEvents: mockEvents.length,
          criticalEvents: mockEvents.filter(e => e.severity === 'critical').length,
          failedLogins: mockEvents.filter(e => e.action === 'LOGIN_FAILED').length,
          suspiciousActivity: mockEvents.filter(e => e.severity === 'high').length,
          dataBreaches: 0,
          complianceScore: 95
        });
      } catch (error) {
        console.error('Failed to load audit data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuditData();
  }, []);

  const filteredEvents = auditEvents.filter(event => {
    const categoryMatch = filterCategory === 'all' || event.category === filterCategory;
    const severityMatch = filterSeverity === 'all' || event.severity === filterSeverity;
    const statusMatch = filterStatus === 'all' || event.status === filterStatus;
    return categoryMatch && severityMatch && statusMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-800 bg-red-100';
      case 'high': return 'text-orange-800 bg-orange-100';
      case 'medium': return 'text-yellow-800 bg-yellow-100';
      case 'low': return 'text-green-800 bg-green-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'failure': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'non_compliant': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
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
            <span className="text-lg font-medium text-gray-700">Loading security audit data...</span>
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
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Security Audit Logging</h2>
              <p className="text-red-100 mt-1">Comprehensive security monitoring and compliance tracking</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-red-200 text-sm">Events:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {securityMetrics.totalEvents}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-200 text-sm">Critical:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {securityMetrics.criticalEvents}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-200 text-sm">Compliance:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {securityMetrics.complianceScore}%
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
          {/* Audit Events */}
          <div className="w-2/3 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Audit Events</h3>
              <div className="flex space-x-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="authentication">Authentication</option>
                  <option value="authorization">Authorization</option>
                  <option value="data_access">Data Access</option>
                  <option value="configuration">Configuration</option>
                  <option value="security">Security</option>
                  <option value="system">System</option>
                </select>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="success">Success</option>
                  <option value="failure">Failure</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedEvent(event)}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(event.severity)}`}>
                        {event.severity.toUpperCase()}
                      </span>
                      <span className={`text-sm font-medium ${getStatusColor(event.status)}`}>
                        {event.status.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">{event.action}</span>
                    </div>
                    <span className="text-sm text-gray-500">{formatTimestamp(event.timestamp)}</span>
                  </div>
                  
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>{event.userEmail}</strong> • {event.ipAddress} • {event.location}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Resource: {event.resource} • ID: {event.resourceId}
                  </div>
                  
                  {event.complianceFlags.length > 0 && (
                    <div className="mt-2">
                      <div className="flex space-x-1">
                        {event.complianceFlags.map((flag) => (
                          <span key={flag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {flag.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Compliance & Details */}
          <div className="w-1/3 p-6 overflow-y-auto">
            {selectedEvent ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-700">Action</div>
                      <div className="text-gray-900">{selectedEvent.action}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">User</div>
                      <div className="text-gray-900">{selectedEvent.userEmail}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">IP Address</div>
                      <div className="text-gray-900">{selectedEvent.ipAddress}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Location</div>
                      <div className="text-gray-900">{selectedEvent.location}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">User Agent</div>
                      <div className="text-gray-900 text-xs break-all">{selectedEvent.userAgent}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Details</div>
                      <pre className="text-gray-900 text-xs bg-gray-50 p-2 rounded">
                        {JSON.stringify(selectedEvent.details, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
                  <div className="space-y-3">
                    {complianceFrameworks.map((framework) => (
                      <motion.div
                        key={framework.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedFramework(framework)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedFramework?.id === framework.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{framework.name}</h4>
                            <p className="text-sm text-gray-600">{framework.description}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getComplianceStatusColor(framework.status)}`}>
                            {framework.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {framework.requirements.length} requirements • Last audit: {new Date(framework.lastAudit).toLocaleDateString()}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Security Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Events</span>
                      <span className="font-medium">{securityMetrics.totalEvents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Critical Events</span>
                      <span className="font-medium text-red-600">{securityMetrics.criticalEvents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Failed Logins</span>
                      <span className="font-medium text-orange-600">{securityMetrics.failedLogins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Suspicious Activity</span>
                      <span className="font-medium text-yellow-600">{securityMetrics.suspiciousActivity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Data Breaches</span>
                      <span className="font-medium text-red-600">{securityMetrics.dataBreaches}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Compliance Score</span>
                        <span className="font-bold text-green-600">{securityMetrics.complianceScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${securityMetrics.complianceScore}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} shown
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
                // TODO: Export audit log
                console.log('Exporting audit log...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all"
            >
              Export Log
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityAuditLogging;
