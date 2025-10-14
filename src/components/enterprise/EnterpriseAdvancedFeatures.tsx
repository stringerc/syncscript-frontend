import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Users, Settings, BarChart3, PieChart, LineChart, Activity, Eye, Star, Award, Crown, Sparkles, Bell, RefreshCw, Download, Upload, Maximize, Minimize, Filter, Search, Plus, Minus, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Code, Database, Cpu, HardDrive, Network, Globe, Lock, CheckCircle, AlertTriangle, Clock, Calendar, MessageCircle, Mail, Phone, Video, Mic, Camera, Image, FileText, Link, Share2, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Meh, Laugh, Angry, Surprised, Zap, Target, TrendingUp, Building, Key, UserCheck, Server, Cloud, Workflow, Integration, Analytics, Compliance, Governance, Audit, Policy, Certificate, Badge, Flag, Alert, Info, HelpCircle, ExternalLink, Edit, Trash2, Save, Copy, Paste, Cut, Undo, Redo, Play, Pause, Stop } from 'lucide-react';

interface EnterpriseSecurity {
  id: string;
  name: string;
  category: 'authentication' | 'authorization' | 'encryption' | 'monitoring' | 'compliance';
  status: 'active' | 'pending' | 'maintenance' | 'deprecated';
  level: 'basic' | 'standard' | 'advanced' | 'enterprise';
  features: string[];
  compliance: {
    sox: boolean;
    hipaa: boolean;
    pci: boolean;
    iso27001: boolean;
    soc2: boolean;
  };
  performance: {
    latency: number;
    throughput: number;
    uptime: number;
    errorRate: number;
  };
  configuration: {
    enabled: boolean;
    autoUpdate: boolean;
    monitoring: boolean;
    alerting: boolean;
  };
  lastAudit: Date;
  nextAudit: Date;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface EnterpriseIntegration {
  id: string;
  name: string;
  provider: string;
  category: 'crm' | 'erp' | 'hr' | 'finance' | 'communication' | 'development';
  status: 'active' | 'pending' | 'error' | 'maintenance';
  type: 'api' | 'webhook' | 'sftp' | 'database' | 'sso';
  authentication: {
    method: 'oauth2' | 'api-key' | 'basic' | 'saml' | 'ldap';
    status: 'connected' | 'expired' | 'failed' | 'pending';
    lastSync: Date;
  };
  data: {
    direction: 'inbound' | 'outbound' | 'bidirectional';
    frequency: string;
    volume: number;
    lastSync: Date;
    errors: number;
  };
  monitoring: {
    health: number;
    latency: number;
    throughput: number;
    errorRate: number;
  };
  compliance: {
    dataClassification: string;
    retentionPolicy: string;
    encryption: boolean;
    auditLogging: boolean;
  };
  cost: {
    monthly: number;
    perTransaction: number;
    currency: string;
  };
  lastUpdated: Date;
}

interface EnterpriseWorkflow {
  id: string;
  name: string;
  description: string;
  category: 'approval' | 'automation' | 'notification' | 'integration' | 'compliance';
  status: 'active' | 'draft' | 'testing' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'critical';
  triggers: {
    event: string;
    condition: string;
    frequency: string;
  };
  steps: {
    id: string;
    name: string;
    type: 'action' | 'condition' | 'approval' | 'notification';
    configuration: any;
    timeout: number;
    retry: number;
  }[];
  performance: {
    executions: number;
    success: number;
    failures: number;
    averageTime: number;
  };
  permissions: {
    create: string[];
    execute: string[];
    modify: string[];
    delete: string[];
  };
  compliance: {
    auditTrail: boolean;
    dataRetention: boolean;
    encryption: boolean;
    approval: boolean;
  };
  createdBy: string;
  lastModified: Date;
  nextReview: Date;
}

interface EnterpriseDataGovernance {
  id: string;
  name: string;
  category: 'classification' | 'retention' | 'access' | 'quality' | 'privacy';
  status: 'active' | 'pending' | 'review' | 'deprecated';
  scope: 'organization' | 'department' | 'project' | 'dataset';
  rules: {
    id: string;
    name: string;
    description: string;
    condition: string;
    action: string;
    severity: 'info' | 'warning' | 'error' | 'critical';
    enabled: boolean;
  }[];
  policies: {
    dataClassification: string[];
    retentionPeriod: string;
    accessControl: string[];
    privacySettings: string[];
  };
  monitoring: {
    violations: number;
    alerts: number;
    remediations: number;
    compliance: number;
  };
  stakeholders: {
    owner: string;
    steward: string;
    approver: string;
    reviewer: string;
  };
  audit: {
    lastReview: Date;
    nextReview: Date;
    reviewer: string;
    findings: string[];
  };
  lastUpdated: Date;
}

interface EnterpriseCompliance {
  id: string;
  framework: 'sox' | 'hipaa' | 'pci-dss' | 'iso27001' | 'soc2' | 'gdpr' | 'ccpa';
  name: string;
  status: 'compliant' | 'partial' | 'non-compliant' | 'pending';
  score: number;
  requirements: {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'implemented' | 'in-progress' | 'pending' | 'failed';
    evidence: string[];
    dueDate: Date;
    owner: string;
  }[];
  controls: {
    preventive: number;
    detective: number;
    corrective: number;
    total: number;
  };
  testing: {
    lastTest: Date;
    nextTest: Date;
    tester: string;
    results: {
      passed: number;
      failed: number;
      exceptions: number;
    };
  };
  remediation: {
    open: number;
    inProgress: number;
    completed: number;
    overdue: number;
  };
  certification: {
    current: string;
    expiry: Date;
    issuer: string;
    scope: string;
  };
  lastAudit: Date;
  nextAudit: Date;
}

interface EnterpriseAnalytics {
  id: string;
  name: string;
  category: 'business' | 'operational' | 'security' | 'compliance' | 'performance';
  type: 'dashboard' | 'report' | 'alert' | 'insight';
  status: 'active' | 'draft' | 'archived';
  frequency: 'real-time' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  metrics: {
    name: string;
    value: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
    unit: string;
  }[];
  kpis: {
    name: string;
    value: number;
    benchmark: number;
    performance: number;
  }[];
  insights: {
    type: 'anomaly' | 'trend' | 'recommendation' | 'alert';
    description: string;
    impact: 'low' | 'medium' | 'high';
    confidence: number;
    action: string;
  }[];
  permissions: {
    view: string[];
    edit: string[];
    share: string[];
    export: string[];
  };
  dataSources: string[];
  lastRefresh: Date;
  nextRefresh: Date;
  createdBy: string;
}

const EnterpriseAdvancedFeatures: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [enterpriseSecurity, setEnterpriseSecurity] = useState<EnterpriseSecurity[]>([]);
  const [enterpriseIntegrations, setEnterpriseIntegrations] = useState<EnterpriseIntegration[]>([]);
  const [enterpriseWorkflows, setEnterpriseWorkflows] = useState<EnterpriseWorkflow[]>([]);
  const [dataGovernance, setDataGovernance] = useState<EnterpriseDataGovernance[]>([]);
  const [compliance, setCompliance] = useState<EnterpriseCompliance[]>([]);
  const [enterpriseAnalytics, setEnterpriseAnalytics] = useState<EnterpriseAnalytics[]>([]);
  const [isDeployingSecurity, setIsDeployingSecurity] = useState(false);
  const [isConfiguringIntegration, setIsConfiguringIntegration] = useState(false);
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false);
  const [isUpdatingCompliance, setIsUpdatingCompliance] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState<EnterpriseSecurity | null>(null);
  const [selectedIntegration, setSelectedIntegration] = useState<EnterpriseIntegration | null>(null);

  // Generate enterprise advanced features data
  useEffect(() => {
    const generateEnterpriseSecurity = (): EnterpriseSecurity[] => {
      return [
        {
          id: 'security-1',
          name: 'Multi-Factor Authentication',
          category: 'authentication',
          status: 'active',
          level: 'enterprise',
          features: ['TOTP', 'SMS', 'Hardware tokens', 'Biometric', 'SSO integration'],
          compliance: {
            sox: true,
            hipaa: true,
            pci: true,
            iso27001: true,
            soc2: true
          },
          performance: {
            latency: 2.5,
            throughput: 50000,
            uptime: 99.99,
            errorRate: 0.01
          },
          configuration: {
            enabled: true,
            autoUpdate: true,
            monitoring: true,
            alerting: true
          },
          lastAudit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          nextAudit: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
          riskLevel: 'low'
        },
        {
          id: 'security-2',
          name: 'Role-Based Access Control',
          category: 'authorization',
          status: 'active',
          level: 'enterprise',
          features: ['Dynamic roles', 'Attribute-based', 'Time-based access', 'Delegation', 'Audit trail'],
          compliance: {
            sox: true,
            hipaa: true,
            pci: true,
            iso27001: true,
            soc2: true
          },
          performance: {
            latency: 1.2,
            throughput: 100000,
            uptime: 99.98,
            errorRate: 0.02
          },
          configuration: {
            enabled: true,
            autoUpdate: true,
            monitoring: true,
            alerting: true
          },
          lastAudit: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
          nextAudit: new Date(Date.now() + 320 * 24 * 60 * 60 * 1000),
          riskLevel: 'low'
        },
        {
          id: 'security-3',
          name: 'End-to-End Encryption',
          category: 'encryption',
          status: 'active',
          level: 'enterprise',
          features: ['AES-256', 'TLS 1.3', 'Key management', 'Data at rest', 'Data in transit'],
          compliance: {
            sox: true,
            hipaa: true,
            pci: true,
            iso27001: true,
            soc2: true
          },
          performance: {
            latency: 5.8,
            throughput: 25000,
            uptime: 99.95,
            errorRate: 0.05
          },
          configuration: {
            enabled: true,
            autoUpdate: true,
            monitoring: true,
            alerting: true
          },
          lastAudit: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
          nextAudit: new Date(Date.now() + 305 * 24 * 60 * 60 * 1000),
          riskLevel: 'low'
        },
        {
          id: 'security-4',
          name: 'Security Information and Event Management',
          category: 'monitoring',
          status: 'active',
          level: 'enterprise',
          features: ['Real-time monitoring', 'Threat detection', 'Incident response', 'Forensics', 'Compliance reporting'],
          compliance: {
            sox: true,
            hipaa: true,
            pci: true,
            iso27001: true,
            soc2: true
          },
          performance: {
            latency: 0.5,
            throughput: 200000,
            uptime: 99.97,
            errorRate: 0.03
          },
          configuration: {
            enabled: true,
            autoUpdate: true,
            monitoring: true,
            alerting: true
          },
          lastAudit: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          nextAudit: new Date(Date.now() + 350 * 24 * 60 * 60 * 1000),
          riskLevel: 'low'
        }
      ];
    };

    const generateEnterpriseIntegrations = (): EnterpriseIntegration[] => {
      return [
        {
          id: 'integration-1',
          name: 'Salesforce CRM',
          provider: 'Salesforce',
          category: 'crm',
          status: 'active',
          type: 'api',
          authentication: {
            method: 'oauth2',
            status: 'connected',
            lastSync: new Date(Date.now() - 5 * 60 * 1000)
          },
          data: {
            direction: 'bidirectional',
            frequency: 'real-time',
            volume: 15000,
            lastSync: new Date(Date.now() - 5 * 60 * 1000),
            errors: 12
          },
          monitoring: {
            health: 98,
            latency: 150,
            throughput: 500,
            errorRate: 0.8
          },
          compliance: {
            dataClassification: 'confidential',
            retentionPolicy: '7 years',
            encryption: true,
            auditLogging: true
          },
          cost: {
            monthly: 2500,
            perTransaction: 0.05,
            currency: 'USD'
          },
          lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'integration-2',
          name: 'Workday HR',
          provider: 'Workday',
          category: 'hr',
          status: 'active',
          type: 'api',
          authentication: {
            method: 'oauth2',
            status: 'connected',
            lastSync: new Date(Date.now() - 15 * 60 * 1000)
          },
          data: {
            direction: 'inbound',
            frequency: 'daily',
            volume: 5000,
            lastSync: new Date(Date.now() - 15 * 60 * 1000),
            errors: 3
          },
          monitoring: {
            health: 99,
            latency: 200,
            throughput: 200,
            errorRate: 0.3
          },
          compliance: {
            dataClassification: 'restricted',
            retentionPolicy: '10 years',
            encryption: true,
            auditLogging: true
          },
          cost: {
            monthly: 1800,
            perTransaction: 0.02,
            currency: 'USD'
          },
          lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'integration-3',
          name: 'SAP ERP',
          provider: 'SAP',
          category: 'erp',
          status: 'active',
          type: 'sftp',
          authentication: {
            method: 'api-key',
            status: 'connected',
            lastSync: new Date(Date.now() - 30 * 60 * 1000)
          },
          data: {
            direction: 'bidirectional',
            frequency: 'hourly',
            volume: 25000,
            lastSync: new Date(Date.now() - 30 * 60 * 1000),
            errors: 8
          },
          monitoring: {
            health: 95,
            latency: 300,
            throughput: 800,
            errorRate: 1.2
          },
          compliance: {
            dataClassification: 'confidential',
            retentionPolicy: 'indefinite',
            encryption: true,
            auditLogging: true
          },
          cost: {
            monthly: 5000,
            perTransaction: 0.10,
            currency: 'USD'
          },
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'integration-4',
          name: 'Microsoft Teams',
          provider: 'Microsoft',
          category: 'communication',
          status: 'pending',
          type: 'webhook',
          authentication: {
            method: 'oauth2',
            status: 'pending',
            lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000)
          },
          data: {
            direction: 'outbound',
            frequency: 'real-time',
            volume: 0,
            lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
            errors: 0
          },
          monitoring: {
            health: 0,
            latency: 0,
            throughput: 0,
            errorRate: 0
          },
          compliance: {
            dataClassification: 'internal',
            retentionPolicy: '3 years',
            encryption: true,
            auditLogging: true
          },
          cost: {
            monthly: 800,
            perTransaction: 0.01,
            currency: 'USD'
          },
          lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateEnterpriseWorkflows = (): EnterpriseWorkflow[] => {
      return [
        {
          id: 'workflow-1',
          name: 'Employee Onboarding',
          description: 'Automated workflow for new employee onboarding process',
          category: 'approval',
          status: 'active',
          priority: 'high',
          triggers: {
            event: 'new_employee_created',
            condition: 'employee.status = pending',
            frequency: 'immediate'
          },
          steps: [
            {
              id: 'step-1',
              name: 'HR Approval',
              type: 'approval',
              configuration: { approvers: ['hr-manager'], timeout: 24 },
              timeout: 24,
              retry: 2
            },
            {
              id: 'step-2',
              name: 'IT Setup',
              type: 'action',
              configuration: { action: 'create_account', systems: ['ad', 'email', 'crm'] },
              timeout: 48,
              retry: 3
            },
            {
              id: 'step-3',
              name: 'Equipment Assignment',
              type: 'action',
              configuration: { action: 'assign_equipment', notify: ['it-admin'] },
              timeout: 72,
              retry: 2
            }
          ],
          performance: {
            executions: 245,
            success: 238,
            failures: 7,
            averageTime: 2.5
          },
          permissions: {
            create: ['hr-admin'],
            execute: ['hr-admin', 'hr-manager'],
            modify: ['hr-admin'],
            delete: ['hr-admin']
          },
          compliance: {
            auditTrail: true,
            dataRetention: true,
            encryption: true,
            approval: true
          },
          createdBy: 'hr-admin',
          lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'workflow-2',
          name: 'Expense Approval',
          description: 'Multi-level expense approval workflow with automated routing',
          category: 'approval',
          status: 'active',
          priority: 'medium',
          triggers: {
            event: 'expense_submitted',
            condition: 'expense.amount > 100',
            frequency: 'immediate'
          },
          steps: [
            {
              id: 'step-1',
              name: 'Manager Approval',
              type: 'approval',
              configuration: { approvers: ['direct-manager'], timeout: 48 },
              timeout: 48,
              retry: 1
            },
            {
              id: 'step-2',
              name: 'Finance Review',
              type: 'condition',
              configuration: { condition: 'amount > 1000', action: 'finance-approval' },
              timeout: 24,
              retry: 2
            },
            {
              id: 'step-3',
              name: 'Payment Processing',
              type: 'action',
              configuration: { action: 'process_payment', system: 'payroll' },
              timeout: 24,
              retry: 3
            }
          ],
          performance: {
            executions: 1250,
            success: 1198,
            failures: 52,
            averageTime: 1.2
          },
          permissions: {
            create: ['finance-admin'],
            execute: ['finance-admin', 'managers'],
            modify: ['finance-admin'],
            delete: ['finance-admin']
          },
          compliance: {
            auditTrail: true,
            dataRetention: true,
            encryption: true,
            approval: true
          },
          createdBy: 'finance-admin',
          lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'workflow-3',
          name: 'Security Incident Response',
          description: 'Automated security incident response and escalation workflow',
          category: 'automation',
          status: 'active',
          priority: 'critical',
          triggers: {
            event: 'security_incident_detected',
            condition: 'severity >= high',
            frequency: 'immediate'
          },
          steps: [
            {
              id: 'step-1',
              name: 'Initial Assessment',
              type: 'action',
              configuration: { action: 'assess_incident', ai_analysis: true },
              timeout: 15,
              retry: 1
            },
            {
              id: 'step-2',
              name: 'Security Team Notification',
              type: 'notification',
              configuration: { recipients: ['security-team'], priority: 'high' },
              timeout: 5,
              retry: 3
            },
            {
              id: 'step-3',
              name: 'Executive Escalation',
              type: 'condition',
              configuration: { condition: 'severity = critical', action: 'executive_alert' },
              timeout: 10,
              retry: 2
            }
          ],
          performance: {
            executions: 45,
            success: 42,
            failures: 3,
            averageTime: 0.5
          },
          permissions: {
            create: ['security-admin'],
            execute: ['security-admin', 'security-team'],
            modify: ['security-admin'],
            delete: ['security-admin']
          },
          compliance: {
            auditTrail: true,
            dataRetention: true,
            encryption: true,
            approval: false
          },
          createdBy: 'security-admin',
          lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          nextReview: new Date(Date.now() + 57 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateDataGovernance = (): EnterpriseDataGovernance[] => {
      return [
        {
          id: 'governance-1',
          name: 'Data Classification Policy',
          category: 'classification',
          status: 'active',
          scope: 'organization',
          rules: [
            {
              id: 'rule-1',
              name: 'PII Detection',
              description: 'Automatically classify personally identifiable information',
              condition: 'contains(pii_patterns)',
              action: 'classify_as_restricted',
              severity: 'error',
              enabled: true
            },
            {
              id: 'rule-2',
              name: 'Financial Data',
              description: 'Classify financial information as confidential',
              condition: 'contains(financial_keywords)',
              action: 'classify_as_confidential',
              severity: 'warning',
              enabled: true
            }
          ],
          policies: {
            dataClassification: ['public', 'internal', 'confidential', 'restricted'],
            retentionPeriod: '7 years',
            accessControl: ['role-based', 'attribute-based', 'time-based'],
            privacySettings: ['gdpr', 'ccpa', 'data-minimization']
          },
          monitoring: {
            violations: 23,
            alerts: 156,
            remediations: 142,
            compliance: 91
          },
          stakeholders: {
            owner: 'data-governance-team',
            steward: 'data-analyst',
            approver: 'cio',
            reviewer: 'compliance-officer'
          },
          audit: {
            lastReview: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            nextReview: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
            reviewer: 'external-auditor',
            findings: ['Minor classification inconsistencies', 'Improve automated detection']
          },
          lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'governance-2',
          name: 'Data Retention Management',
          category: 'retention',
          status: 'active',
          scope: 'organization',
          rules: [
            {
              id: 'rule-3',
              name: 'Email Retention',
              description: 'Retain business emails for 7 years',
              condition: 'type = email AND business_context = true',
              action: 'retain_for_7_years',
              severity: 'info',
              enabled: true
            },
            {
              id: 'rule-4',
              name: 'Temp Data Cleanup',
              description: 'Automatically delete temporary data after 30 days',
              condition: 'type = temporary',
              action: 'delete_after_30_days',
              severity: 'warning',
              enabled: true
            }
          ],
          policies: {
            dataClassification: ['temporary', 'business', 'legal', 'archival'],
            retentionPeriod: 'varies_by_type',
            accessControl: ['automated', 'scheduled', 'approval-based'],
            privacySettings: ['right-to-erasure', 'data-portability']
          },
          monitoring: {
            violations: 8,
            alerts: 45,
            remediations: 43,
            compliance: 96
          },
          stakeholders: {
            owner: 'data-governance-team',
            steward: 'data-engineer',
            approver: 'legal-counsel',
            reviewer: 'compliance-officer'
          },
          audit: {
            lastReview: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
            nextReview: new Date(Date.now() + 320 * 24 * 60 * 60 * 1000),
            reviewer: 'internal-audit',
            findings: ['Excellent retention compliance', 'Consider automated archival']
          },
          lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateCompliance = (): EnterpriseCompliance[] => {
      return [
        {
          id: 'compliance-1',
          framework: 'sox',
          name: 'Sarbanes-Oxley Act Compliance',
          status: 'compliant',
          score: 94,
          requirements: [
            {
              id: 'req-1',
              title: 'Internal Controls Documentation',
              description: 'Document and maintain internal controls over financial reporting',
              category: 'controls',
              status: 'implemented',
              evidence: ['control-documentation.pdf', 'testing-results.xlsx'],
              dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              owner: 'internal-audit'
            },
            {
              id: 'req-2',
              title: 'Management Assessment',
              description: 'Management assessment of internal controls effectiveness',
              category: 'assessment',
              status: 'implemented',
              evidence: ['management-assessment.pdf'],
              dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
              owner: 'management'
            }
          ],
          controls: {
            preventive: 45,
            detective: 32,
            corrective: 18,
            total: 95
          },
          testing: {
            lastTest: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
            nextTest: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
            tester: 'external-auditor',
            results: {
              passed: 89,
              failed: 6,
              exceptions: 2
            }
          },
          remediation: {
            open: 3,
            inProgress: 2,
            completed: 95,
            overdue: 1
          },
          certification: {
            current: 'SOX Type II',
            expiry: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
            issuer: 'Big Four Audit Firm',
            scope: 'Financial Reporting Controls'
          },
          lastAudit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          nextAudit: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'compliance-2',
          framework: 'hipaa',
          name: 'Health Insurance Portability and Accountability Act',
          status: 'compliant',
          score: 96,
          requirements: [
            {
              id: 'req-3',
              title: 'Administrative Safeguards',
              description: 'Implement administrative safeguards for PHI protection',
              category: 'administrative',
              status: 'implemented',
              evidence: ['safeguards-policy.pdf', 'training-records.pdf'],
              dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
              owner: 'privacy-officer'
            },
            {
              id: 'req-4',
              title: 'Technical Safeguards',
              description: 'Implement technical safeguards for PHI protection',
              category: 'technical',
              status: 'implemented',
              evidence: ['encryption-cert.pdf', 'access-logs.pdf'],
              dueDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
              owner: 'security-team'
            }
          ],
          controls: {
            preventive: 38,
            detective: 28,
            corrective: 15,
            total: 81
          },
          testing: {
            lastTest: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
            nextTest: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
            tester: 'hipaa-auditor',
            results: {
              passed: 78,
              failed: 3,
              exceptions: 0
            }
          },
          remediation: {
            open: 2,
            inProgress: 1,
            completed: 78,
            overdue: 0
          },
          certification: {
            current: 'HIPAA Compliance Certificate',
            expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            issuer: 'HIPAA Compliance Auditor',
            scope: 'Healthcare Data Protection'
          },
          lastAudit: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          nextAudit: new Date(Date.now() + 345 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'compliance-3',
          framework: 'iso27001',
          name: 'ISO 27001 Information Security Management',
          status: 'partial',
          score: 78,
          requirements: [
            {
              id: 'req-5',
              title: 'Information Security Policy',
              description: 'Develop and maintain information security policy',
              category: 'policy',
              status: 'implemented',
              evidence: ['security-policy.pdf'],
              dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              owner: 'ciso'
            },
            {
              id: 'req-6',
              title: 'Risk Assessment',
              description: 'Conduct regular information security risk assessments',
              category: 'risk',
              status: 'in-progress',
              evidence: ['risk-assessment-template.xlsx'],
              dueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
              owner: 'risk-manager'
            }
          ],
          controls: {
            preventive: 65,
            detective: 45,
            corrective: 25,
            total: 135
          },
          testing: {
            lastTest: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            nextTest: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
            tester: 'iso-auditor',
            results: {
              passed: 105,
              failed: 30,
              exceptions: 5
            }
          },
          remediation: {
            open: 25,
            inProgress: 15,
            completed: 95,
            overdue: 5
          },
          certification: {
            current: 'ISO 27001:2013 (Partial)',
            expiry: new Date(Date.now() + 200 * 24 * 60 * 60 * 1000),
            issuer: 'ISO Certification Body',
            scope: 'Information Security Management'
          },
          lastAudit: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
          nextAudit: new Date(Date.now() + 305 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateEnterpriseAnalytics = (): EnterpriseAnalytics[] => {
      return [
        {
          id: 'analytics-1',
          name: 'Enterprise Security Dashboard',
          category: 'security',
          type: 'dashboard',
          status: 'active',
          frequency: 'real-time',
          metrics: [
            { name: 'Security Events', value: 1247, target: 1000, trend: 'up', unit: 'events' },
            { name: 'Threats Blocked', value: 892, target: 800, trend: 'up', unit: 'threats' },
            { name: 'Incident Response Time', value: 15, target: 30, trend: 'down', unit: 'minutes' },
            { name: 'Compliance Score', value: 94, target: 90, trend: 'up', unit: '%' }
          ],
          kpis: [
            { name: 'Security Posture', value: 94, benchmark: 85, performance: 111 },
            { name: 'Threat Detection', value: 98, benchmark: 90, performance: 109 },
            { name: 'Response Efficiency', value: 87, benchmark: 80, performance: 109 }
          ],
          insights: [
            {
              type: 'trend',
              description: 'Security events increased 15% this week',
              impact: 'medium',
              confidence: 92,
              action: 'Review security policies and increase monitoring'
            },
            {
              type: 'anomaly',
              description: 'Unusual login patterns detected from 3 IP addresses',
              impact: 'high',
              confidence: 88,
              action: 'Investigate and potentially block suspicious IPs'
            }
          ],
          permissions: {
            view: ['security-team', 'management'],
            edit: ['security-admin'],
            share: ['security-team'],
            export: ['security-admin', 'compliance-officer']
          },
          dataSources: ['siem', 'firewall', 'ids', 'authentication-logs'],
          lastRefresh: new Date(Date.now() - 5 * 60 * 1000),
          nextRefresh: new Date(Date.now() + 5 * 60 * 1000),
          createdBy: 'security-admin'
        },
        {
          id: 'analytics-2',
          name: 'Business Performance Report',
          category: 'business',
          type: 'report',
          status: 'active',
          frequency: 'weekly',
          metrics: [
            { name: 'Revenue', value: 2850000, target: 3000000, trend: 'up', unit: 'USD' },
            { name: 'Customer Acquisition', value: 245, target: 200, trend: 'up', unit: 'customers' },
            { name: 'Customer Satisfaction', value: 4.6, target: 4.5, trend: 'stable', unit: 'rating' },
            { name: 'Employee Productivity', value: 87, target: 85, trend: 'up', unit: '%' }
          ],
          kpis: [
            { name: 'Revenue Growth', value: 15, benchmark: 10, performance: 150 },
            { name: 'Customer Retention', value: 92, benchmark: 85, performance: 108 },
            { name: 'Operational Efficiency', value: 89, benchmark: 80, performance: 111 }
          ],
          insights: [
            {
              type: 'recommendation',
              description: 'Customer acquisition is 23% above target - consider scaling support',
              impact: 'high',
              confidence: 95,
              action: 'Hire additional customer success team members'
            },
            {
              type: 'trend',
              description: 'Revenue trending upward but below target',
              impact: 'medium',
              confidence: 78,
              action: 'Review pricing strategy and sales pipeline'
            }
          ],
          permissions: {
            view: ['management', 'sales-team', 'finance'],
            edit: ['business-analyst'],
            share: ['management'],
            export: ['business-analyst', 'finance']
          },
          dataSources: ['crm', 'finance-system', 'customer-feedback', 'hr-system'],
          lastRefresh: new Date(Date.now() - 2 * 60 * 60 * 1000),
          nextRefresh: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          createdBy: 'business-analyst'
        }
      ];
    };

    setEnterpriseSecurity(generateEnterpriseSecurity());
    setEnterpriseIntegrations(generateEnterpriseIntegrations());
    setEnterpriseWorkflows(generateEnterpriseWorkflows());
    setDataGovernance(generateDataGovernance());
    setCompliance(generateCompliance());
    setEnterpriseAnalytics(generateEnterpriseAnalytics());
  }, []);

  const deploySecurity = async (securityId: string) => {
    setIsDeployingSecurity(true);
    
    // Simulate security deployment
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    // Update security status
    setEnterpriseSecurity(prev => prev.map(security => 
      security.id === securityId 
        ? { 
            ...security, 
            status: 'active' as const,
            configuration: {
              ...security.configuration,
              enabled: true,
              autoUpdate: true,
              monitoring: true,
              alerting: true
            },
            performance: {
              ...security.performance,
              latency: Math.max(security.performance.latency - 0.5, 0.5),
              uptime: 99.9,
              errorRate: 0.05
            },
            riskLevel: 'low' as const
          }
        : security
    ));
    
    setIsDeployingSecurity(false);
  };

  const configureIntegration = async (integrationId: string) => {
    setIsConfiguringIntegration(true);
    
    // Simulate integration configuration
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Update integration status
    setEnterpriseIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: 'active' as const,
            authentication: {
              ...integration.authentication,
              status: 'connected' as const,
              lastSync: new Date()
            },
            monitoring: {
              ...integration.monitoring,
              health: 98,
              latency: Math.max(integration.monitoring.latency - 50, 100),
              errorRate: Math.max(integration.monitoring.errorRate - 0.2, 0.1)
            },
            lastUpdated: new Date()
          }
        : integration
    ));
    
    setIsConfiguringIntegration(false);
  };

  const createWorkflow = async () => {
    setIsCreatingWorkflow(true);
    
    // Simulate workflow creation
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Add new workflow
    const newWorkflow: EnterpriseWorkflow = {
      id: `workflow-${Date.now()}`,
      name: 'New Enterprise Workflow',
      description: 'Automated workflow for enterprise process optimization',
      category: 'automation',
      status: 'active',
      priority: 'medium',
      triggers: {
        event: 'data_updated',
        condition: 'data.status = ready',
        frequency: 'immediate'
      },
      steps: [
        {
          id: 'step-1',
          name: 'Data Validation',
          type: 'action',
          configuration: { action: 'validate_data', rules: ['format', 'completeness'] },
          timeout: 30,
          retry: 2
        },
        {
          id: 'step-2',
          name: 'Approval Process',
          type: 'approval',
          configuration: { approvers: ['data-owner'], timeout: 24 },
          timeout: 24,
          retry: 1
        }
      ],
      performance: {
        executions: 0,
        success: 0,
        failures: 0,
        averageTime: 0
      },
      permissions: {
        create: ['workflow-admin'],
        execute: ['workflow-admin', 'data-owners'],
        modify: ['workflow-admin'],
        delete: ['workflow-admin']
      },
      compliance: {
        auditTrail: true,
        dataRetention: true,
        encryption: true,
        approval: true
      },
      createdBy: 'workflow-admin',
      lastModified: new Date(),
      nextReview: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    };
    
    setEnterpriseWorkflows(prev => [newWorkflow, ...prev]);
    setIsCreatingWorkflow(false);
  };

  const updateCompliance = async (complianceId: string) => {
    setIsUpdatingCompliance(true);
    
    // Simulate compliance update
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Update compliance score
    setCompliance(prev => prev.map(comp => 
      comp.id === complianceId 
        ? { 
            ...comp, 
            score: Math.min(comp.score + 2, 100),
            remediation: {
              ...comp.remediation,
              completed: comp.remediation.completed + 1,
              open: Math.max(comp.remediation.open - 1, 0)
            }
          }
        : comp
    ));
    
    setIsUpdatingCompliance(false);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': case 'compliant': case 'connected': return 'bg-green-100 text-green-800';
      case 'pending': case 'partial': case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'draft': case 'testing': case 'review': return 'bg-blue-100 text-blue-800';
      case 'maintenance': case 'paused': return 'bg-orange-100 text-orange-800';
      case 'error': case 'failed': case 'non-compliant': return 'bg-red-100 text-red-800';
      case 'deprecated': case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const totalSecurity = enterpriseSecurity.length;
  const activeSecurity = enterpriseSecurity.filter(s => s.status === 'active').length;
  const totalIntegrations = enterpriseIntegrations.length;
  const activeIntegrations = enterpriseIntegrations.filter(i => i.status === 'active').length;
  const totalWorkflows = enterpriseWorkflows.length;
  const activeWorkflows = enterpriseWorkflows.filter(w => w.status === 'active').length;
  const avgComplianceScore = compliance.reduce((sum, c) => sum + c.score, 0) / compliance.length || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🏢 Enterprise Advanced Features</h2>
              <p className="text-purple-100 mt-1">Advanced enterprise capabilities and compliance tools for large organizations</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Enterprise Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Security Controls</p>
                  <p className="text-2xl font-bold text-purple-800">{activeSecurity}/{totalSecurity}</p>
                  <p className="text-xs text-purple-600">Active controls</p>
                </div>
                <Shield className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Integrations</p>
                  <p className="text-2xl font-bold text-blue-800">{activeIntegrations}/{totalIntegrations}</p>
                  <p className="text-xs text-blue-600">Connected systems</p>
                </div>
                <Integration className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Workflows</p>
                  <p className="text-2xl font-bold text-green-800">{activeWorkflows}/{totalWorkflows}</p>
                  <p className="text-xs text-green-600">Automated processes</p>
                </div>
                <Workflow className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Compliance Score</p>
                  <p className="text-2xl font-bold text-indigo-800">{avgComplianceScore.toFixed(0)}%</p>
                  <p className="text-xs text-indigo-600">Average score</p>
                </div>
                <Compliance className="text-3xl text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Enterprise Actions */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-6 border-2 border-purple-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-purple-700 font-medium">
                🏢 Enterprise Advanced Features Active - Managing security, integrations, workflows, and compliance!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => deploySecurity('security-4')}
                  disabled={isDeployingSecurity}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isDeployingSecurity ? '⏳ Deploying...' : '🛡️ Deploy Security'}
                </button>
                <button
                  onClick={() => configureIntegration('integration-4')}
                  disabled={isConfiguringIntegration}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isConfiguringIntegration ? '⏳ Configuring...' : '🔗 Configure Integration'}
                </button>
                <button
                  onClick={createWorkflow}
                  disabled={isCreatingWorkflow}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingWorkflow ? '⏳ Creating...' : '⚡ Create Workflow'}
                </button>
                <button
                  onClick={() => updateCompliance('compliance-3')}
                  disabled={isUpdatingCompliance}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-colors"
                >
                  {isUpdatingCompliance ? '⏳ Updating...' : '📋 Update Compliance'}
                </button>
              </div>
            </div>
          </div>

          {/* Enterprise Security */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="mr-2 text-purple-600" />
              Enterprise Security ({enterpriseSecurity.length})
            </h3>
            <div className="space-y-4">
              {enterpriseSecurity.map((security) => (
                <div key={security.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{security.name}</h4>
                      <p className="text-sm text-gray-600">{security.category} • {security.level} level</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(security.status)}`}>
                        {security.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(security.riskLevel)}`}>
                        {security.riskLevel} risk
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Latency:</span>
                      <span className="font-medium text-gray-900 ml-1">{security.performance.latency}ms</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Throughput:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatNumber(security.performance.throughput)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Uptime:</span>
                      <span className="font-medium text-gray-900 ml-1">{security.performance.uptime}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Error Rate:</span>
                      <span className="font-medium text-gray-900 ml-1">{security.performance.errorRate}%</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Compliance:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(security.compliance).map(([key, value]) => (
                        <span key={key} className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {key.toUpperCase()}: {value ? '✅' : '❌'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Features:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {security.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {feature}
                        </span>
                      ))}
                      {security.features.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                          +{security.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last Audit:</span> {security.lastAudit.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Next Audit:</span> {security.nextAudit.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Monitoring:</span> {security.configuration.monitoring ? '✅' : '❌'} | 
                    <span className="font-medium ml-2">Auto Update:</span> {security.configuration.autoUpdate ? '✅' : '❌'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Integrations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Integration className="mr-2 text-blue-600" />
              Enterprise Integrations ({enterpriseIntegrations.length})
            </h3>
            <div className="space-y-4">
              {enterpriseIntegrations.map((integration) => (
                <div key={integration.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{integration.name}</h4>
                      <p className="text-sm text-gray-600">{integration.provider} • {integration.category} • {integration.type}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.status)}`}>
                      {integration.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Health:</span>
                      <span className="font-medium text-gray-900 ml-1">{integration.monitoring.health}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Latency:</span>
                      <span className="font-medium text-gray-900 ml-1">{integration.monitoring.latency}ms</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatNumber(integration.data.volume)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Monthly Cost:</span>
                      <span className="font-medium text-gray-900 ml-1">{integration.cost.currency} {formatNumber(integration.cost.monthly)}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Authentication:</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm">
                        <span className="font-medium">Method:</span> {integration.authentication.method}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.authentication.status)}`}>
                        {integration.authentication.status}
                      </span>
                      <span className="text-sm">
                        <span className="font-medium">Last Sync:</span> {integration.authentication.lastSync.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Compliance:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <span className="text-sm">
                        <span className="font-medium">Classification:</span> {integration.compliance.dataClassification}
                      </span>
                      <span className="text-sm">
                        <span className="font-medium">Retention:</span> {integration.compliance.retentionPolicy}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        integration.compliance.encryption ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        Encryption: {integration.compliance.encryption ? '✅' : '❌'}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        integration.compliance.auditLogging ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        Audit: {integration.compliance.auditLogging ? '✅' : '❌'}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Data Direction:</span> {integration.data.direction} | 
                    <span className="font-medium ml-2">Frequency:</span> {integration.data.frequency} | 
                    <span className="font-medium ml-2">Errors:</span> {integration.data.errors} | 
                    <span className="font-medium ml-2">Last Updated:</span> {integration.lastUpdated.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Workflows */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Workflow className="mr-2 text-green-600" />
              Enterprise Workflows ({enterpriseWorkflows.length})
            </h3>
            <div className="space-y-4">
              {enterpriseWorkflows.map((workflow) => (
                <div key={workflow.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{workflow.name}</h4>
                      <p className="text-sm text-gray-600">{workflow.category} • {workflow.priority} priority</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(workflow.status)}`}>
                      {workflow.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{workflow.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Executions:</span>
                      <span className="font-medium text-gray-900 ml-1">{formatNumber(workflow.performance.executions)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Success Rate:</span>
                      <span className="font-medium text-green-600 ml-1">
                        {((workflow.performance.success / workflow.performance.executions) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Avg Time:</span>
                      <span className="font-medium text-gray-900 ml-1">{workflow.performance.averageTime}h</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Steps:</span>
                      <span className="font-medium text-gray-900 ml-1">{workflow.steps.length}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Trigger:</span> {workflow.triggers.event} when {workflow.triggers.condition}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Compliance:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {Object.entries(workflow.compliance).map(([key, value]) => (
                        <span key={key} className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {key}: {value ? '✅' : '❌'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Created by:</span> {workflow.createdBy} | 
                    <span className="font-medium ml-2">Last Modified:</span> {workflow.lastModified.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Next Review:</span> {workflow.nextReview.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Compliance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Compliance className="mr-2 text-indigo-600" />
              Enterprise Compliance ({compliance.length})
            </h3>
            <div className="space-y-4">
              {compliance.map((comp) => (
                <div key={comp.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{comp.name}</h4>
                      <p className="text-sm text-gray-600">{comp.framework.toUpperCase()} Framework</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(comp.status)}`}>
                        {comp.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {comp.score}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Compliance Score</span>
                      <span className="font-medium text-gray-900">{comp.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          comp.score >= 90 ? 'bg-green-500' :
                          comp.score >= 70 ? 'bg-yellow-500' :
                          comp.score >= 50 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${comp.score}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Preventive:</span>
                      <span className="font-medium text-gray-900 ml-1">{comp.controls.preventive}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Detective:</span>
                      <span className="font-medium text-gray-900 ml-1">{comp.controls.detective}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Corrective:</span>
                      <span className="font-medium text-gray-900 ml-1">{comp.controls.corrective}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium text-gray-900 ml-1">{comp.controls.total}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Testing Results:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">Passed: {comp.testing.results.passed}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-red-600 font-medium">Failed: {comp.testing.results.failed}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-yellow-600 font-medium">Exceptions: {comp.testing.results.exceptions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Remediation:</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Open: </span>
                        <span className="font-medium text-red-600">{comp.remediation.open}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">In Progress: </span>
                        <span className="font-medium text-yellow-600">{comp.remediation.inProgress}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Completed: </span>
                        <span className="font-medium text-green-600">{comp.remediation.completed}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Overdue: </span>
                        <span className="font-medium text-red-600">{comp.remediation.overdue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Certification:</span> {comp.certification.current} | 
                    <span className="font-medium ml-2">Expiry:</span> {comp.certification.expiry.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Last Audit:</span> {comp.lastAudit.toLocaleDateString()} | 
                    <span className="font-medium ml-2">Next Audit:</span> {comp.nextAudit.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnterpriseAdvancedFeatures;
