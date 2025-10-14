import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityThreat {
  id: string;
  type: 'malware' | 'phishing' | 'ddos' | 'brute_force' | 'sql_injection' | 'xss' | 'csrf' | 'unauthorized_access';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  timestamp: Date;
  status: 'detected' | 'investigating' | 'contained' | 'resolved';
  description: string;
  indicators: string[];
  response: {
    action: string;
    timestamp: Date;
    automated: boolean;
  }[];
  riskScore: number;
}

interface SecurityAudit {
  id: string;
  name: string;
  category: 'authentication' | 'authorization' | 'data_protection' | 'network_security' | 'application_security' | 'infrastructure';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  score: number;
  maxScore: number;
  findings: {
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    recommendation: string;
    status: 'open' | 'in_progress' | 'resolved' | 'false_positive';
    evidence: string[];
  }[];
  lastRun: Date;
  nextRun: Date;
  compliance: {
    framework: 'GDPR' | 'SOC2' | 'HIPAA' | 'ISO27001' | 'PCI-DSS';
    status: 'compliant' | 'non_compliant' | 'partial';
    score: number;
  }[];
}

interface ComplianceRequirement {
  id: string;
  framework: 'GDPR' | 'SOC2' | 'HIPAA' | 'ISO27001' | 'PCI-DSS';
  requirement: string;
  description: string;
  status: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
  evidence: string[];
  lastAssessed: Date;
  nextAssessment: Date;
  responsible: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'permission_change' | 'data_access' | 'admin_action' | 'system_change';
  user: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  details: {
    action: string;
    resource: string;
    metadata: Record<string, any>;
  };
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  location: {
    country: string;
    city: string;
    coordinates: [number, number];
  };
}

interface SecurityPolicy {
  id: string;
  name: string;
  category: 'authentication' | 'authorization' | 'data_protection' | 'network' | 'application';
  description: string;
  rules: {
    id: string;
    condition: string;
    action: string;
    enabled: boolean;
  }[];
  lastUpdated: Date;
  version: string;
  status: 'active' | 'draft' | 'deprecated';
}

interface SecurityMetrics {
  totalThreats: number;
  threatsResolved: number;
  averageResponseTime: number;
  complianceScore: number;
  securityScore: number;
  activeAudits: number;
  criticalFindings: number;
  lastIncident: Date;
  uptime: number;
}

const AdvancedSecurityFeatures: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [securityThreats, setSecurityThreats] = useState<SecurityThreat[]>([]);
  const [securityAudits, setSecurityAudits] = useState<SecurityAudit[]>([]);
  const [complianceRequirements, setComplianceRequirements] = useState<ComplianceRequirement[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [securityPolicies, setSecurityPolicies] = useState<SecurityPolicy[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics | null>(null);
  const [isRunningThreatScan, setIsRunningThreatScan] = useState(false);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [isUpdatingPolicies, setIsUpdatingPolicies] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<SecurityThreat | null>(null);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);

  // Generate security data
  useEffect(() => {
    const generateSecurityThreats = (): SecurityThreat[] => {
      return [
        {
          id: 'threat-1',
          type: 'brute_force',
          severity: 'high',
          source: '192.168.1.100',
          target: 'admin@syncscript.com',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          status: 'investigating',
          description: 'Multiple failed login attempts detected',
          indicators: ['5 failed attempts in 2 minutes', 'Unusual login pattern', 'Geographic anomaly'],
          response: [
            {
              action: 'IP temporarily blocked',
              timestamp: new Date(Date.now() - 10 * 60 * 1000),
              automated: true
            },
            {
              action: 'Security team notified',
              timestamp: new Date(Date.now() - 5 * 60 * 1000),
              automated: true
            }
          ],
          riskScore: 85
        },
        {
          id: 'threat-2',
          type: 'phishing',
          severity: 'medium',
          source: 'suspicious-domain.com',
          target: 'user@syncscript.com',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'contained',
          description: 'Suspicious email with malicious link detected',
          indicators: ['Suspicious sender domain', 'Malicious URL detected', 'Social engineering attempt'],
          response: [
            {
              action: 'Email quarantined',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              automated: true
            },
            {
              action: 'User notified',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
              automated: true
            }
          ],
          riskScore: 65
        },
        {
          id: 'threat-3',
          type: 'unauthorized_access',
          severity: 'critical',
          source: '10.0.0.50',
          target: 'database-server',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          status: 'resolved',
          description: 'Unauthorized access attempt to database server',
          indicators: ['Privilege escalation attempt', 'Unusual access pattern', 'Suspicious query detected'],
          response: [
            {
              action: 'Access blocked',
              timestamp: new Date(Date.now() - 30 * 60 * 1000),
              automated: true
            },
            {
              action: 'Security incident created',
              timestamp: new Date(Date.now() - 25 * 60 * 1000),
              automated: true
            },
            {
              action: 'Forensic analysis completed',
              timestamp: new Date(Date.now() - 5 * 60 * 1000),
              automated: false
            }
          ],
          riskScore: 95
        }
      ];
    };

    const generateSecurityAudits = (): SecurityAudit[] => {
      return [
        {
          id: 'audit-1',
          name: 'Authentication Security Audit',
          category: 'authentication',
          status: 'completed',
          score: 92,
          maxScore: 100,
          findings: [
            {
              id: 'finding-1',
              severity: 'medium',
              title: 'Weak password policy',
              description: 'Password policy allows weak passwords',
              recommendation: 'Implement stronger password requirements',
              status: 'open',
              evidence: ['Password policy configuration', 'User password analysis']
            },
            {
              id: 'finding-2',
              severity: 'low',
              title: 'Missing MFA for admin accounts',
              description: 'Some admin accounts lack multi-factor authentication',
              recommendation: 'Enable MFA for all admin accounts',
              status: 'resolved',
              evidence: ['Admin account audit', 'MFA configuration check']
            }
          ],
          lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
          nextRun: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
          compliance: [
            {
              framework: 'SOC2',
              status: 'compliant',
              score: 95
            },
            {
              framework: 'ISO27001',
              status: 'compliant',
              score: 88
            }
          ]
        },
        {
          id: 'audit-2',
          name: 'Data Protection Audit',
          category: 'data_protection',
          status: 'in_progress',
          score: 0,
          maxScore: 100,
          findings: [],
          lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
          nextRun: new Date(Date.now() + 4 * 60 * 60 * 1000),
          compliance: [
            {
              framework: 'GDPR',
              status: 'partial',
              score: 75
            },
            {
              framework: 'HIPAA',
              status: 'non_compliant',
              score: 45
            }
          ]
        }
      ];
    };

    const generateComplianceRequirements = (): ComplianceRequirement[] => {
      return [
        {
          id: 'req-1',
          framework: 'GDPR',
          requirement: 'Data Processing Lawfulness',
          description: 'Ensure all data processing has a lawful basis',
          status: 'compliant',
          evidence: ['Privacy policy', 'Consent management', 'Data processing records'],
          lastAssessed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          nextAssessment: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
          responsible: 'Data Protection Officer',
          priority: 'high'
        },
        {
          id: 'req-2',
          framework: 'SOC2',
          requirement: 'Access Controls',
          description: 'Implement and maintain access controls',
          status: 'compliant',
          evidence: ['RBAC implementation', 'Access logs', 'User provisioning'],
          lastAssessed: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          nextAssessment: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
          responsible: 'Security Team',
          priority: 'critical'
        },
        {
          id: 'req-3',
          framework: 'HIPAA',
          requirement: 'Administrative Safeguards',
          description: 'Implement administrative safeguards for PHI',
          status: 'non_compliant',
          evidence: ['Security policies', 'Training records', 'Incident response'],
          lastAssessed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          nextAssessment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          responsible: 'Compliance Team',
          priority: 'critical'
        }
      ];
    };

    const generateSecurityEvents = (): SecurityEvent[] => {
      return [
        {
          id: 'event-1',
          type: 'login',
          user: 'admin@syncscript.com',
          ip: '192.168.1.50',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          success: true,
          details: {
            action: 'Successful login',
            resource: 'Dashboard',
            metadata: { mfa: true, session_duration: 3600 }
          },
          riskLevel: 'low',
          location: {
            country: 'United States',
            city: 'San Francisco',
            coordinates: [37.7749, -122.4194]
          }
        },
        {
          id: 'event-2',
          type: 'failed_login',
          user: 'user@syncscript.com',
          ip: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          success: false,
          details: {
            action: 'Failed login attempt',
            resource: 'Login page',
            metadata: { reason: 'Invalid password', attempts: 3 }
          },
          riskLevel: 'medium',
          location: {
            country: 'United States',
            city: 'New York',
            coordinates: [40.7128, -74.0060]
          }
        },
        {
          id: 'event-3',
          type: 'admin_action',
          user: 'admin@syncscript.com',
          ip: '192.168.1.50',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          success: true,
          details: {
            action: 'User role changed',
            resource: 'User Management',
            metadata: { target_user: 'user@syncscript.com', new_role: 'admin' }
          },
          riskLevel: 'high',
          location: {
            country: 'United States',
            city: 'San Francisco',
            coordinates: [37.7749, -122.4194]
          }
        }
      ];
    };

    const generateSecurityPolicies = (): SecurityPolicy[] => {
      return [
        {
          id: 'policy-1',
          name: 'Password Policy',
          category: 'authentication',
          description: 'Defines password requirements and management',
          rules: [
            {
              id: 'rule-1',
              condition: 'password_length < 8',
              action: 'reject_password',
              enabled: true
            },
            {
              id: 'rule-2',
              condition: 'password_complexity < 3',
              action: 'reject_password',
              enabled: true
            }
          ],
          lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          version: '2.1',
          status: 'active'
        },
        {
          id: 'policy-2',
          name: 'Access Control Policy',
          category: 'authorization',
          description: 'Defines access control rules and permissions',
          rules: [
            {
              id: 'rule-3',
              condition: 'user_role == admin',
              action: 'grant_full_access',
              enabled: true
            },
            {
              id: 'rule-4',
              condition: 'user_role == user',
              action: 'grant_limited_access',
              enabled: true
            }
          ],
          lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          version: '1.5',
          status: 'active'
        }
      ];
    };

    const generateSecurityMetrics = (): SecurityMetrics => {
      return {
        totalThreats: 15,
        threatsResolved: 12,
        averageResponseTime: 8.5,
        complianceScore: 87,
        securityScore: 92,
        activeAudits: 3,
        criticalFindings: 2,
        lastIncident: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        uptime: 99.9
      };
    };

    setSecurityThreats(generateSecurityThreats());
    setSecurityAudits(generateSecurityAudits());
    setComplianceRequirements(generateComplianceRequirements());
    setSecurityEvents(generateSecurityEvents());
    setSecurityPolicies(generateSecurityPolicies());
    setSecurityMetrics(generateSecurityMetrics());
  }, []);

  // Real-time monitoring simulation
  useEffect(() => {
    if (!realTimeMonitoring) return;

    const interval = setInterval(() => {
      // Simulate new security events
      const newEvent: SecurityEvent = {
        id: `event-${Date.now()}`,
        type: Math.random() > 0.5 ? 'login' : 'failed_login',
        user: `user${Math.floor(Math.random() * 100)}@syncscript.com`,
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        timestamp: new Date(),
        success: Math.random() > 0.3,
        details: {
          action: Math.random() > 0.5 ? 'Successful login' : 'Failed login attempt',
          resource: 'Dashboard',
          metadata: { mfa: Math.random() > 0.5 }
        },
        riskLevel: Math.random() > 0.7 ? 'high' : 'low',
        location: {
          country: 'United States',
          city: 'San Francisco',
          coordinates: [37.7749, -122.4194]
        }
      };

      setSecurityEvents(prev => [newEvent, ...prev.slice(0, 19)]); // Keep last 20 events
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [realTimeMonitoring]);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'contained': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'detected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non_compliant': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelColor = (riskLevel: string): string => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const runThreatScan = async () => {
    setIsRunningThreatScan(true);
    
    // Simulate threat scan
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Add new threat
    const newThreat: SecurityThreat = {
      id: `threat-${Date.now()}`,
      type: 'malware',
      severity: 'medium',
      source: 'suspicious-domain.com',
      target: 'user@syncscript.com',
      timestamp: new Date(),
      status: 'detected',
      description: 'Potential malware detected in email attachment',
      indicators: ['Suspicious file type', 'Unusual attachment size', 'Malicious URL'],
      response: [],
      riskScore: 70
    };
    
    setSecurityThreats(prev => [newThreat, ...prev]);
    setIsRunningThreatScan(false);
  };

  const runSecurityAudit = async () => {
    setIsRunningAudit(true);
    
    // Simulate security audit
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    // Update audit status
    setSecurityAudits(prev => prev.map(audit => 
      audit.status === 'in_progress' 
        ? { ...audit, status: 'completed' as const, score: 85 }
        : audit
    ));
    
    setIsRunningAudit(false);
  };

  const updateSecurityPolicies = async () => {
    setIsUpdatingPolicies(true);
    
    // Simulate policy update
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Update policy version
    setSecurityPolicies(prev => prev.map(policy => ({
      ...policy,
      version: `${parseFloat(policy.version) + 0.1}`.slice(0, 3),
      lastUpdated: new Date()
    })));
    
    setIsUpdatingPolicies(false);
  };

  const totalThreats = securityThreats.length;
  const activeThreats = securityThreats.filter(t => t.status !== 'resolved').length;
  const criticalThreats = securityThreats.filter(t => t.severity === 'critical').length;
  const avgResponseTime = securityThreats.reduce((sum, t) => sum + t.response.length, 0) / totalThreats;
  const complianceScore = securityMetrics?.complianceScore || 0;
  const securityScore = securityMetrics?.securityScore || 0;
  const activeAudits = securityAudits.filter(a => a.status === 'in_progress').length;
  const criticalFindings = securityAudits.reduce((sum, a) => sum + a.findings.filter(f => f.severity === 'critical').length, 0);
  const recentEvents = securityEvents.filter(e => Date.now() - e.timestamp.getTime() < 24 * 60 * 60 * 1000).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🛡️ Advanced Security Features</h2>
              <p className="text-red-100 mt-1">Threat detection, security audits, compliance monitoring, and policy management</p>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={realTimeMonitoring}
                  onChange={(e) => setRealTimeMonitoring(e.target.checked)}
                  className="rounded"
                />
                <span>Real-time Monitoring</span>
              </label>
              <button
                onClick={onClose}
                className="text-white hover:text-red-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Active Threats</p>
                  <p className="text-2xl font-bold text-red-800">{activeThreats}</p>
                  <p className="text-xs text-red-600">of {totalThreats} total</p>
                </div>
                <div className="text-3xl">🚨</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Security Score</p>
                  <p className="text-2xl font-bold text-green-800">{securityScore}%</p>
                  <p className="text-xs text-green-600">Overall security</p>
                </div>
                <div className="text-3xl">🛡️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Compliance Score</p>
                  <p className="text-2xl font-bold text-blue-800">{complianceScore}%</p>
                  <p className="text-xs text-blue-600">Regulatory compliance</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Recent Events</p>
                  <p className="text-2xl font-bold text-purple-800">{recentEvents}</p>
                  <p className="text-xs text-purple-600">Last 24 hours</p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Security monitoring and threat management tools
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={runThreatScan}
                  disabled={isRunningThreatScan}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningThreatScan ? '⏳ Scanning...' : '🔍 Threat Scan'}
                </button>
                <button
                  onClick={runSecurityAudit}
                  disabled={isRunningAudit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningAudit ? '⏳ Auditing...' : '📋 Security Audit'}
                </button>
                <button
                  onClick={updateSecurityPolicies}
                  disabled={isUpdatingPolicies}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isUpdatingPolicies ? '⏳ Updating...' : '📝 Update Policies'}
                </button>
              </div>
            </div>
          </div>

          {/* Security Threats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Security Threats ({securityThreats.length})</h3>
            <div className="space-y-4">
              {securityThreats.map((threat) => (
                <div key={threat.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{threat.type.replace('_', ' ').toUpperCase()}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(threat.status)}`}>
                        {threat.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        Risk: {threat.riskScore}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{threat.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Source:</span>
                        <span className="font-medium text-gray-900 ml-1">{threat.source}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Target:</span>
                        <span className="font-medium text-gray-900 ml-1">{threat.target}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Detected:</span>
                        <span className="text-gray-500 ml-1">{formatDate(threat.timestamp)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Responses:</span>
                        <span className="font-medium text-gray-900 ml-1">{threat.response.length}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Indicators:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {threat.indicators.map((indicator, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {indicator}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {threat.response.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-700 mb-2">Response Actions:</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {threat.response.map((response, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {response.action} {response.automated ? '(Automated)' : '(Manual)'}
                              <span className="text-gray-500 ml-2">{formatDate(response.timestamp)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Events */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Security Events ({securityEvents.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {securityEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.type.replace('_', ' ')}</div>
                          <div className="text-sm text-gray-500">{event.details.action}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.ip}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskLevelColor(event.riskLevel)}`}>
                          {event.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${event.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {event.success ? 'Success' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(event.timestamp)}
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

export default AdvancedSecurityFeatures;