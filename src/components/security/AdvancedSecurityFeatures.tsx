import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityThreat {
  id: string;
  type: 'malware' | 'phishing' | 'brute_force' | 'suspicious_activity' | 'data_breach' | 'insider_threat';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  source: string;
  target: string;
  detectedAt: Date;
  status: 'active' | 'investigating' | 'resolved' | 'false_positive';
  confidence: number;
  indicators: {
    type: string;
    value: string;
    description: string;
  }[];
  response: {
    action: string;
    timestamp: Date;
    user: string;
    details: string;
  }[];
  riskScore: number;
}

interface ComplianceRequirement {
  id: string;
  framework: 'GDPR' | 'SOC2' | 'HIPAA' | 'PCI-DSS' | 'ISO27001' | 'CCPA';
  requirement: string;
  description: string;
  status: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
  evidence: {
    id: string;
    type: 'document' | 'log' | 'policy' | 'test';
    title: string;
    description: string;
    lastUpdated: Date;
  }[];
  lastAssessment: Date;
  nextAssessment: Date;
  responsible: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface SecurityAudit {
  id: string;
  name: string;
  type: 'internal' | 'external' | 'penetration' | 'compliance' | 'vulnerability';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  auditor: string;
  scope: string[];
  findings: {
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    recommendation: string;
    status: 'open' | 'in_progress' | 'resolved' | 'accepted_risk';
    assignedTo: string;
    dueDate: Date;
  }[];
  score: number;
  reportUrl?: string;
}

interface SecurityPolicy {
  id: string;
  name: string;
  category: 'access_control' | 'data_protection' | 'incident_response' | 'network_security' | 'physical_security';
  version: string;
  status: 'draft' | 'active' | 'archived' | 'under_review';
  lastUpdated: Date;
  nextReview: Date;
  owner: string;
  description: string;
  requirements: string[];
  exceptions: {
    id: string;
    description: string;
    justification: string;
    approvedBy: string;
    expiryDate: Date;
  }[];
  compliance: {
    framework: string;
    status: 'compliant' | 'non_compliant' | 'partial';
    evidence: string[];
  }[];
}

interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'investigating' | 'contained' | 'resolved' | 'closed';
  reportedBy: string;
  reportedAt: Date;
  assignedTo: string;
  timeline: {
    timestamp: Date;
    action: string;
    user: string;
    details: string;
  }[];
  impact: {
    dataAffected: string;
    systemsAffected: string[];
    usersAffected: number;
    businessImpact: string;
  };
  resolution: {
    rootCause: string;
    remediation: string;
    preventiveMeasures: string[];
    lessonsLearned: string;
  };
  metrics: {
    detectionTime: number;
    responseTime: number;
    resolutionTime: number;
    cost: number;
  };
}

const AdvancedSecurityFeatures: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [securityThreats, setSecurityThreats] = useState<SecurityThreat[]>([]);
  const [complianceRequirements, setComplianceRequirements] = useState<ComplianceRequirement[]>([]);
  const [securityAudits, setSecurityAudits] = useState<SecurityAudit[]>([]);
  const [securityPolicies, setSecurityPolicies] = useState<SecurityPolicy[]>([]);
  const [securityIncidents, setSecurityIncidents] = useState<SecurityIncident[]>([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [isCreatingPolicy, setIsCreatingPolicy] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<SecurityThreat | null>(null);

  // Generate security data
  useEffect(() => {
    const generateSecurityThreats = (): SecurityThreat[] => {
      return [
        {
          id: 'threat-1',
          type: 'brute_force',
          severity: 'high',
          title: 'Multiple Failed Login Attempts',
          description: 'Detected 15 failed login attempts from IP 192.168.1.100 within 5 minutes',
          source: '192.168.1.100',
          target: 'admin@company.com',
          detectedAt: new Date(Date.now() - 30 * 60 * 1000),
          status: 'investigating',
          confidence: 0.95,
          indicators: [
            {
              type: 'IP Address',
              value: '192.168.1.100',
              description: 'Source IP address'
            },
            {
              type: 'Login Attempts',
              value: '15',
              description: 'Number of failed attempts'
            }
          ],
          response: [
            {
              action: 'IP Blocked',
              timestamp: new Date(Date.now() - 25 * 60 * 1000),
              user: 'Security System',
              details: 'Automatically blocked IP address'
            }
          ],
          riskScore: 85
        },
        {
          id: 'threat-2',
          type: 'phishing',
          severity: 'medium',
          title: 'Suspicious Email Detected',
          description: 'Email with suspicious attachments and links detected',
          source: 'unknown@phishing.com',
          target: 'Multiple users',
          detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'resolved',
          confidence: 0.78,
          indicators: [
            {
              type: 'Email Address',
              value: 'unknown@phishing.com',
              description: 'Suspicious sender'
            },
            {
              type: 'Attachment',
              value: 'invoice.exe',
              description: 'Suspicious executable file'
            }
          ],
          response: [
            {
              action: 'Email Quarantined',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
              user: 'Security System',
              details: 'Email moved to quarantine'
            }
          ],
          riskScore: 65
        },
        {
          id: 'threat-3',
          type: 'suspicious_activity',
          severity: 'low',
          title: 'Unusual Data Access Pattern',
          description: 'User accessing large amounts of data outside normal hours',
          source: 'user@company.com',
          target: 'Database',
          detectedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          status: 'active',
          confidence: 0.62,
          indicators: [
            {
              type: 'Access Time',
              value: '02:30 AM',
              description: 'Unusual access time'
            },
            {
              type: 'Data Volume',
              value: '500MB',
              description: 'Large data download'
            }
          ],
          response: [],
          riskScore: 45
        }
      ];
    };

    const generateComplianceRequirements = (): ComplianceRequirement[] => {
      return [
        {
          id: 'comp-1',
          framework: 'GDPR',
          requirement: 'Data Protection Impact Assessment',
          description: 'Conduct DPIA for high-risk processing activities',
          status: 'compliant',
          evidence: [
            {
              id: 'ev-1',
              type: 'document',
              title: 'DPIA Report 2024',
              description: 'Comprehensive DPIA for customer data processing',
              lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          ],
          lastAssessment: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          nextAssessment: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
          responsible: 'Data Protection Officer',
          priority: 'high'
        },
        {
          id: 'comp-2',
          framework: 'SOC2',
          requirement: 'Access Control Monitoring',
          description: 'Monitor and log all access to sensitive systems',
          status: 'partial',
          evidence: [
            {
              id: 'ev-2',
              type: 'log',
              title: 'Access Logs',
              description: 'System access logs for Q3 2024',
              lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          ],
          lastAssessment: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          nextAssessment: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
          responsible: 'IT Security Team',
          priority: 'critical'
        },
        {
          id: 'comp-3',
          framework: 'HIPAA',
          requirement: 'Encryption of PHI',
          description: 'Encrypt all protected health information at rest and in transit',
          status: 'compliant',
          evidence: [
            {
              id: 'ev-3',
              type: 'policy',
              title: 'Encryption Policy',
              description: 'Comprehensive encryption policy and procedures',
              lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
            }
          ],
          lastAssessment: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          nextAssessment: new Date(Date.now() + 351 * 24 * 60 * 60 * 1000),
          responsible: 'Security Team',
          priority: 'high'
        }
      ];
    };

    const generateSecurityAudits = (): SecurityAudit[] => {
      return [
        {
          id: 'audit-1',
          name: 'Q4 2024 Security Assessment',
          type: 'internal',
          status: 'in_progress',
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          auditor: 'Internal Security Team',
          scope: ['Network Security', 'Access Controls', 'Data Protection'],
          findings: [
            {
              id: 'find-1',
              severity: 'medium',
              title: 'Weak Password Policy',
              description: 'Password policy does not meet current security standards',
              recommendation: 'Implement stronger password requirements',
              status: 'open',
              assignedTo: 'IT Team',
              dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            },
            {
              id: 'find-2',
              severity: 'low',
              title: 'Outdated Software',
              description: 'Several systems running outdated software versions',
              recommendation: 'Update to latest versions',
              status: 'in_progress',
              assignedTo: 'System Admin',
              dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
          ],
          score: 78
        },
        {
          id: 'audit-2',
          name: 'Penetration Testing',
          type: 'penetration',
          status: 'completed',
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          auditor: 'External Security Firm',
          scope: ['Web Application', 'Network Infrastructure'],
          findings: [
            {
              id: 'find-3',
              severity: 'high',
              title: 'SQL Injection Vulnerability',
              description: 'Critical SQL injection vulnerability found in user portal',
              recommendation: 'Implement parameterized queries',
              status: 'resolved',
              assignedTo: 'Development Team',
              dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          ],
          score: 85,
          reportUrl: '/reports/pen-test-2024.pdf'
        }
      ];
    };

    const generateSecurityPolicies = (): SecurityPolicy[] => {
      return [
        {
          id: 'policy-1',
          name: 'Password Security Policy',
          category: 'access_control',
          version: '2.1',
          status: 'active',
          lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
          owner: 'IT Security Team',
          description: 'Comprehensive password security requirements and procedures',
          requirements: [
            'Minimum 12 characters',
            'Must include uppercase, lowercase, numbers, and symbols',
            'Cannot reuse last 5 passwords',
            'Must be changed every 90 days'
          ],
          exceptions: [],
          compliance: [
            {
              framework: 'SOC2',
              status: 'compliant',
              evidence: ['Policy Document', 'Implementation Logs']
            }
          ]
        },
        {
          id: 'policy-2',
          name: 'Data Classification Policy',
          category: 'data_protection',
          version: '1.3',
          status: 'under_review',
          lastUpdated: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 305 * 24 * 60 * 60 * 1000),
          owner: 'Data Protection Officer',
          description: 'Guidelines for classifying and handling sensitive data',
          requirements: [
            'Classify all data as Public, Internal, Confidential, or Restricted',
            'Apply appropriate security controls based on classification',
            'Regular review and reclassification of data'
          ],
          exceptions: [
            {
              id: 'exc-1',
              description: 'Legacy system data',
              justification: 'System scheduled for decommissioning',
              approvedBy: 'CISO',
              expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            }
          ],
          compliance: [
            {
              framework: 'GDPR',
              status: 'compliant',
              evidence: ['Classification Matrix', 'Training Records']
            }
          ]
        }
      ];
    };

    const generateSecurityIncidents = (): SecurityIncident[] => {
      return [
        {
          id: 'incident-1',
          title: 'Unauthorized Access Attempt',
          description: 'Attempted unauthorized access to admin panel',
          severity: 'high',
          status: 'resolved',
          reportedBy: 'Security System',
          reportedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          assignedTo: 'Security Team',
          timeline: [
            {
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
              action: 'Incident Reported',
              user: 'Security System',
              details: 'Automated detection of suspicious activity'
            },
            {
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000),
              action: 'Investigation Started',
              user: 'Security Analyst',
              details: 'Initial investigation and evidence collection'
            },
            {
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
              action: 'Incident Resolved',
              user: 'Security Team',
              details: 'Threat contained and systems secured'
            }
          ],
          impact: {
            dataAffected: 'None',
            systemsAffected: ['Admin Panel'],
            usersAffected: 0,
            businessImpact: 'Minimal - no data accessed'
          },
          resolution: {
            rootCause: 'Weak authentication on admin panel',
            remediation: 'Implemented MFA and IP restrictions',
            preventiveMeasures: [
              'Enhanced monitoring',
              'Regular security reviews',
              'Staff training'
            ],
            lessonsLearned: 'Need for stronger authentication controls'
          },
          metrics: {
            detectionTime: 5,
            responseTime: 15,
            resolutionTime: 1440,
            cost: 5000
          }
        }
      ];
    };

    setSecurityThreats(generateSecurityThreats());
    setComplianceRequirements(generateComplianceRequirements());
    setSecurityAudits(generateSecurityAudits());
    setSecurityPolicies(generateSecurityPolicies());
    setSecurityIncidents(generateSecurityIncidents());
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
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
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non_compliant': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'not_applicable': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'reported': return 'bg-blue-100 text-blue-800';
      case 'contained': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'malware': return 'bg-red-100 text-red-800';
      case 'phishing': return 'bg-orange-100 text-orange-800';
      case 'brute_force': return 'bg-yellow-100 text-yellow-800';
      case 'suspicious_activity': return 'bg-blue-100 text-blue-800';
      case 'data_breach': return 'bg-red-100 text-red-800';
      case 'insider_threat': return 'bg-purple-100 text-purple-800';
      case 'internal': return 'bg-blue-100 text-blue-800';
      case 'external': return 'bg-green-100 text-green-800';
      case 'penetration': return 'bg-red-100 text-red-800';
      case 'compliance': return 'bg-purple-100 text-purple-800';
      case 'vulnerability': return 'bg-orange-100 text-orange-800';
      case 'access_control': return 'bg-blue-100 text-blue-800';
      case 'data_protection': return 'bg-green-100 text-green-800';
      case 'incident_response': return 'bg-red-100 text-red-800';
      case 'network_security': return 'bg-purple-100 text-purple-800';
      case 'physical_security': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrameworkColor = (framework: string): string => {
    switch (framework) {
      case 'GDPR': return 'bg-blue-100 text-blue-800';
      case 'SOC2': return 'bg-green-100 text-green-800';
      case 'HIPAA': return 'bg-purple-100 text-purple-800';
      case 'PCI-DSS': return 'bg-red-100 text-red-800';
      case 'ISO27001': return 'bg-yellow-100 text-yellow-800';
      case 'CCPA': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateSecurityReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setIsGeneratingReport(false);
  };

  const runSecurityAudit = async () => {
    setIsRunningAudit(true);
    
    // Simulate audit execution
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const newAudit: SecurityAudit = {
      id: `audit-${Date.now()}`,
      name: 'Automated Security Scan',
      type: 'vulnerability',
      status: 'completed',
      startDate: new Date(Date.now() - 5 * 60 * 1000),
      endDate: new Date(),
      auditor: 'Security System',
      scope: ['Network', 'Applications', 'Database'],
      findings: [
        {
          id: `find-${Date.now()}`,
          severity: 'low',
          title: 'Minor Configuration Issue',
          description: 'Non-critical configuration issue detected',
          recommendation: 'Update configuration settings',
          status: 'open',
          assignedTo: 'System Admin',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      ],
      score: 92
    };
    
    setSecurityAudits(prev => [newAudit, ...prev]);
    setIsRunningAudit(false);
  };

  const createSecurityPolicy = async () => {
    setIsCreatingPolicy(true);
    
    // Simulate policy creation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newPolicy: SecurityPolicy = {
      id: `policy-${Date.now()}`,
      name: 'AI-Generated Security Policy',
      category: 'access_control',
      version: '1.0',
      status: 'draft',
      lastUpdated: new Date(),
      nextReview: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      owner: 'Security Team',
      description: 'AI-generated security policy based on current threats and best practices',
      requirements: [
        'AI-generated requirement 1',
        'AI-generated requirement 2'
      ],
      exceptions: [],
      compliance: []
    };
    
    setSecurityPolicies(prev => [newPolicy, ...prev]);
    setIsCreatingPolicy(false);
  };

  const totalThreats = securityThreats.length;
  const activeThreats = securityThreats.filter(t => t.status === 'active' || t.status === 'investigating').length;
  const criticalThreats = securityThreats.filter(t => t.severity === 'critical').length;
  const avgRiskScore = securityThreats.reduce((sum, t) => sum + t.riskScore, 0) / securityThreats.length;
  const complianceScore = complianceRequirements.filter(c => c.status === 'compliant').length / complianceRequirements.length;
  const totalAudits = securityAudits.length;
  const avgAuditScore = securityAudits.reduce((sum, a) => sum + a.score, 0) / securityAudits.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🛡️ Advanced Security Features</h2>
              <p className="text-red-100 mt-1">Threat detection, compliance monitoring, and security analytics</p>
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

        <div className="p-6 h-full overflow-y-auto">
          {/* Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Active Threats</p>
                  <p className="text-2xl font-bold text-red-800">{activeThreats}</p>
                  <p className="text-xs text-red-600">{criticalThreats} critical</p>
                </div>
                <div className="text-3xl">🚨</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Risk Score</p>
                  <p className="text-2xl font-bold text-orange-800">{avgRiskScore.toFixed(0)}</p>
                  <p className="text-xs text-orange-600">Average</p>
                </div>
                <div className="text-3xl">⚠️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Compliance</p>
                  <p className="text-2xl font-bold text-green-800">{(complianceScore * 100).toFixed(0)}%</p>
                  <p className="text-xs text-green-600">Compliant</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Audits</p>
                  <p className="text-2xl font-bold text-blue-800">{totalAudits}</p>
                  <p className="text-xs text-blue-600">{avgAuditScore.toFixed(0)} avg score</p>
                </div>
                <div className="text-3xl">🔍</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Policies</p>
                  <p className="text-2xl font-bold text-purple-800">{securityPolicies.length}</p>
                  <p className="text-xs text-purple-600">Active policies</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Security management actions
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={generateSecurityReport}
                  disabled={isGeneratingReport}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingReport ? '⏳ Generating...' : '📊 Generate Report'}
                </button>
                <button
                  onClick={runSecurityAudit}
                  disabled={isRunningAudit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningAudit ? '⏳ Running...' : '🔍 Run Audit'}
                </button>
                <button
                  onClick={createSecurityPolicy}
                  disabled={isCreatingPolicy}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingPolicy ? '⏳ Creating...' : '📋 New Policy'}
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
                    <h4 className="font-semibold text-gray-800">{threat.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(threat.type)}`}>
                        {threat.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(threat.status)}`}>
                        {threat.status}
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
                        <span className="text-gray-600">Confidence:</span>
                        <span className="font-medium text-blue-600 ml-1">{(threat.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Risk Score:</span>
                        <span className="font-medium text-red-600 ml-1">{threat.riskScore}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-gray-600">Detected:</span>
                      <span className="text-gray-500 ml-1">{formatDate(threat.detectedAt)}</span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Indicators:</div>
                      <div className="flex flex-wrap gap-2">
                        {threat.indicators.map((indicator, index) => (
                          <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                            {indicator.type}: {indicator.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Requirements */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Compliance Requirements ({complianceRequirements.length})</h3>
            <div className="space-y-4">
              {complianceRequirements.map((requirement) => (
                <div key={requirement.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{requirement.requirement}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getFrameworkColor(requirement.framework)}`}>
                        {requirement.framework}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(requirement.status)}`}>
                        {requirement.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{requirement.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Priority:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(requirement.priority)}`}>
                          {requirement.priority}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Responsible:</span>
                        <span className="font-medium text-gray-900 ml-1">{requirement.responsible}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Evidence:</span>
                        <span className="font-medium text-gray-900 ml-1">{requirement.evidence.length}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Next Assessment:</span>
                        <span className="text-gray-500 ml-1">{formatDate(requirement.nextAssessment)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Audits */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Security Audits ({securityAudits.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auditor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {securityAudits.map((audit) => (
                    <tr key={audit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{audit.name}</div>
                          <div className="text-sm text-gray-500">{audit.scope.join(', ')}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(audit.type)}`}>
                          {audit.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(audit.status)}`}>
                          {audit.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                audit.score >= 90 ? 'bg-green-500' : 
                                audit.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${audit.score}%` }}
                            ></div>
                          </div>
                          <span>{audit.score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {audit.findings.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {audit.auditor}
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
