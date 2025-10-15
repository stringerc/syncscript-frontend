import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Target, CheckCircle, AlertTriangle, Clock, Calendar, MessageCircle, Mail, Phone, Video, Mic, Camera, Image, Link, Share2, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Meh, Laugh, Angry, Surprised, Building, UserCheck, Workflow, Integration, Analytics, Compliance, Audit, Policy, Certificate, Badge, Flag, Alert, Info, HelpCircle, ExternalLink, Edit, Trash2, Save, Copy, Paste, Cut, Undo, Redo, Play, Pause, Stop, RefreshCw, RotateCcw, Maximize, Minimize, Filter, Search, Plus, Minus, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Database, Cpu, HardDrive, Network, Globe, Lock as LockIcon, CheckCircle as CheckIcon, AlertTriangle as AlertIcon, Clock as ClockIcon, Calendar as CalendarIcon, MessageCircle as MessageIcon, Mail as MailIcon, Phone as PhoneIcon, Video as VideoIcon, Image as ImageIcon, FileText as FileIcon, Link as LinkIcon, Share2 as ShareIcon, Heart as HeartIcon, ThumbsUp as ThumbsUpIcon, ThumbsDown as ThumbsDownIcon, Smile as SmileIcon, Frown as FrownIcon, Meh as MehIcon, Laugh as LaughIcon, Angry as AngryIcon, Surprised as SurprisedIcon, Target as TargetIcon, Building as BuildingIcon, UserCheck as UserCheckIcon, Server as ServerIcon, Cloud as CloudIcon, Workflow as WorkflowIcon, Integration as IntegrationIcon, Analytics as AnalyticsIcon, Compliance as ComplianceIcon, Audit as AuditIcon, Policy as PolicyIcon, Certificate as CertificateIcon, Badge as BadgeIcon, Flag as FlagIcon, Alert as AlertIcon2, Info as InfoIcon, HelpCircle as HelpIcon, ExternalLink as ExternalIcon, Edit as EditIcon, Trash2 as TrashIcon, Save as SaveIcon, Copy as CopyIcon, Paste as PasteIcon, Cut as CutIcon, Undo as UndoIcon, Redo as RedoIcon, Play as PlayIcon, Pause as PauseIcon, Stop as StopIcon, RefreshCw as RefreshIcon, RotateCcw as RotateIcon, Maximize as MaximizeIcon, Minimize as MinimizeIcon, Filter as FilterIcon, Search as SearchIcon, Plus as PlusIcon, Minus as MinusIcon, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, ArrowRight as ArrowRightIcon, ArrowLeft as ArrowLeftIcon, Code as CodeIcon, Database as DatabaseIcon, Cpu as CpuIcon, HardDrive as HardDriveIcon, Network as NetworkIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { toast } from 'react-hot-toast';

// Optimization interfaces
interface OptimizationMetric {
  id: string;
  name: string;
  category: 'performance' | 'security' | 'scalability' | 'reliability' | 'maintainability';
  value: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: string;
  description: string;
  recommendations: string[];
}

interface ProductionDeployment {
  id: string;
  name: string;
  environment: 'staging' | 'production' | 'canary';
  status: 'deployed' | 'deploying' | 'failed' | 'rollback';
  version: string;
  timestamp: string;
  duration: number;
  success: boolean;
  metrics: DeploymentMetrics;
  rollbackAvailable: boolean;
  healthChecks: HealthCheck[];
}

interface DeploymentMetrics {
  buildTime: number;
  deployTime: number;
  totalTime: number;
  bundleSize: number;
  performanceScore: number;
  accessibilityScore: number;
  seoScore: number;
  securityScore: number;
}

interface HealthCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  responseTime: number;
  lastCheck: string;
  details: string;
}

interface ProductionReadiness {
  id: string;
  category: 'performance' | 'security' | 'monitoring' | 'backup' | 'scalability' | 'compliance';
  item: string;
  status: 'completed' | 'pending' | 'failed' | 'not_applicable';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: string;
  evidence: string[];
  dependencies: string[];
  description: string;
}

interface SystemAlert {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  category: 'performance' | 'security' | 'availability' | 'capacity';
  status: 'active' | 'acknowledged' | 'resolved';
  timestamp: string;
  component: string;
  actions: AlertAction[];
  escalation: EscalationRule[];
}

interface AlertAction {
  type: 'email' | 'slack' | 'webhook' | 'page' | 'sms';
  status: 'sent' | 'failed' | 'pending';
  timestamp: string;
  recipient: string;
  content: string;
}

interface EscalationRule {
  level: number;
  delay: number;
  actions: string[];
  conditions: string[];
}

interface DeploymentPipeline {
  id: string;
  name: string;
  environment: string;
  status: 'active' | 'paused' | 'failed';
  stages: PipelineStage[];
  triggers: PipelineTrigger[];
  lastRun: string;
  successRate: number;
  averageDuration: number;
  configuration: PipelineConfig;
}

interface PipelineStage {
  id: string;
  name: string;
  type: 'build' | 'test' | 'deploy' | 'verify' | 'rollback';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  duration: number;
  logs: string[];
  artifacts: string[];
  dependencies: string[];
}

interface PipelineTrigger {
  type: 'manual' | 'webhook' | 'schedule' | 'branch' | 'tag';
  condition: string;
  enabled: boolean;
}

interface PipelineConfig {
  timeout: number;
  concurrency: number;
  notifications: NotificationConfig[];
  rollback: RollbackConfig;
}

interface NotificationConfig {
  type: 'email' | 'slack' | 'webhook' | 'sms';
  recipients: string[];
  events: string[];
  enabled: boolean;
}

interface RollbackConfig {
  enabled: boolean;
  automatic: boolean;
  maxVersions: number;
  conditions: string[];
}

const FinalPlatformOptimization: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [optimizationMetrics, setOptimizationMetrics] = useState<OptimizationMetric[]>([]);
  const [productionDeployments, setProductionDeployments] = useState<ProductionDeployment[]>([]);
  const [productionReadiness, setProductionReadiness] = useState<ProductionReadiness[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [deploymentPipelines, setDeploymentPipelines] = useState<DeploymentPipeline[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // SSR-safe data loading
  useEffect(() => {
    const loadOptimizationData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call with SSR-safe delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock optimization metrics data
        const mockOptimizationMetrics: OptimizationMetric[] = [
          {
            id: 'metric-1',
            name: 'Core Web Vitals',
            category: 'performance',
            value: 95,
            target: 90,
            unit: 'score',
            status: 'excellent',
            trend: 'improving',
            lastUpdated: new Date().toISOString(),
            description: 'Core Web Vitals performance score',
            recommendations: [
              'Optimize Largest Contentful Paint (LCP)',
              'Improve First Input Delay (FID)',
              'Reduce Cumulative Layout Shift (CLS)'
            ]
          },
          {
            id: 'metric-2',
            name: 'Bundle Size',
            category: 'performance',
            value: 2.3,
            target: 3.0,
            unit: 'MB',
            status: 'excellent',
            trend: 'stable',
            lastUpdated: new Date().toISOString(),
            description: 'Total JavaScript bundle size',
            recommendations: [
              'Implement code splitting',
              'Remove unused dependencies',
              'Optimize images and assets'
            ]
          },
          {
            id: 'metric-3',
            name: 'Security Score',
            category: 'security',
            value: 88,
            target: 85,
            unit: 'score',
            status: 'good',
            trend: 'improving',
            lastUpdated: new Date().toISOString(),
            description: 'Overall security assessment score',
            recommendations: [
              'Implement CSP headers',
              'Enable HSTS',
              'Regular security audits'
            ]
          },
          {
            id: 'metric-4',
            name: 'Uptime',
            category: 'reliability',
            value: 99.9,
            target: 99.5,
            unit: '%',
            status: 'excellent',
            trend: 'stable',
            lastUpdated: new Date().toISOString(),
            description: 'System availability percentage',
            recommendations: [
              'Implement health checks',
              'Set up monitoring alerts',
              'Plan disaster recovery'
            ]
          },
          {
            id: 'metric-5',
            name: 'Response Time',
            category: 'performance',
            value: 245,
            target: 500,
            unit: 'ms',
            status: 'excellent',
            trend: 'improving',
            lastUpdated: new Date().toISOString(),
            description: 'Average API response time',
            recommendations: [
              'Implement caching',
              'Optimize database queries',
              'Use CDN for static assets'
            ]
          },
          {
            id: 'metric-6',
            name: 'Code Coverage',
            category: 'maintainability',
            value: 92,
            target: 80,
            unit: '%',
            status: 'excellent',
            trend: 'stable',
            lastUpdated: new Date().toISOString(),
            description: 'Test coverage percentage',
            recommendations: [
              'Add integration tests',
              'Implement E2E testing',
              'Maintain test quality'
            ]
          }
        ];

        // Mock production deployments data
        const mockProductionDeployments: ProductionDeployment[] = [
          {
            id: 'deploy-1',
            name: 'Production Release v2.1.0',
            environment: 'production',
            status: 'deployed',
            version: '2.1.0',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            duration: 420,
            success: true,
            rollbackAvailable: true,
            metrics: {
              buildTime: 180,
              deployTime: 240,
              totalTime: 420,
              bundleSize: 2.3,
              performanceScore: 95,
              accessibilityScore: 98,
              seoScore: 92,
              securityScore: 88
            },
            healthChecks: [
              {
                name: 'API Health',
                status: 'pass',
                responseTime: 45,
                lastCheck: new Date().toISOString(),
                details: 'All API endpoints responding normally'
              },
              {
                name: 'Database Health',
                status: 'pass',
                responseTime: 12,
                lastCheck: new Date().toISOString(),
                details: 'Database connections stable'
              },
              {
                name: 'CDN Health',
                status: 'pass',
                responseTime: 23,
                lastCheck: new Date().toISOString(),
                details: 'CDN serving assets efficiently'
              }
            ]
          },
          {
            id: 'deploy-2',
            name: 'Staging Release v2.1.1-beta',
            environment: 'staging',
            status: 'deployed',
            version: '2.1.1-beta',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            duration: 350,
            success: true,
            rollbackAvailable: true,
            metrics: {
              buildTime: 150,
              deployTime: 200,
              totalTime: 350,
              bundleSize: 2.4,
              performanceScore: 93,
              accessibilityScore: 96,
              seoScore: 90,
              securityScore: 85
            },
            healthChecks: [
              {
                name: 'API Health',
                status: 'pass',
                responseTime: 52,
                lastCheck: new Date().toISOString(),
                details: 'All API endpoints responding normally'
              },
              {
                name: 'Database Health',
                status: 'pass',
                responseTime: 15,
                lastCheck: new Date().toISOString(),
                details: 'Database connections stable'
              }
            ]
          }
        ];

        // Mock production readiness data
        const mockProductionReadiness: ProductionReadiness[] = [
          {
            id: 'readiness-1',
            category: 'performance',
            item: 'Core Web Vitals Optimization',
            status: 'completed',
            priority: 'high',
            assignedTo: 'performance-team',
            dueDate: new Date(Date.now() - 86400000).toISOString(),
            evidence: ['lighthouse-report.pdf', 'performance-metrics.json'],
            dependencies: [],
            description: 'Optimize Core Web Vitals for better user experience'
          },
          {
            id: 'readiness-2',
            category: 'security',
            item: 'Security Headers Implementation',
            status: 'completed',
            priority: 'critical',
            assignedTo: 'security-team',
            dueDate: new Date(Date.now() - 172800000).toISOString(),
            evidence: ['security-audit.pdf', 'headers-config.yaml'],
            dependencies: [],
            description: 'Implement comprehensive security headers'
          },
          {
            id: 'readiness-3',
            category: 'monitoring',
            item: 'Comprehensive Monitoring Setup',
            status: 'completed',
            priority: 'high',
            assignedTo: 'devops-team',
            dueDate: new Date(Date.now() - 259200000).toISOString(),
            evidence: ['monitoring-dashboard.json', 'alert-rules.yaml'],
            dependencies: [],
            description: 'Set up comprehensive monitoring and alerting'
          },
          {
            id: 'readiness-4',
            category: 'backup',
            item: 'Automated Backup Strategy',
            status: 'completed',
            priority: 'critical',
            assignedTo: 'devops-team',
            dueDate: new Date(Date.now() - 345600000).toISOString(),
            evidence: ['backup-procedures.pdf', 'recovery-test-results.docx'],
            dependencies: [],
            description: 'Implement automated backup and disaster recovery'
          },
          {
            id: 'readiness-5',
            category: 'scalability',
            item: 'Auto-scaling Configuration',
            status: 'pending',
            priority: 'medium',
            assignedTo: 'devops-team',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            evidence: [],
            dependencies: ['readiness-3'],
            description: 'Configure auto-scaling for production workloads'
          },
          {
            id: 'readiness-6',
            category: 'compliance',
            item: 'GDPR Compliance Audit',
            status: 'completed',
            priority: 'high',
            assignedTo: 'compliance-team',
            dueDate: new Date(Date.now() - 432000000).toISOString(),
            evidence: ['gdpr-audit-report.pdf', 'privacy-policy-update.docx'],
            dependencies: [],
            description: 'Complete GDPR compliance audit and documentation'
          }
        ];

        // Mock system alerts data
        const mockSystemAlerts: SystemAlert[] = [
          {
            id: 'alert-1',
            title: 'High Memory Usage',
            description: 'Memory usage is above 85% threshold',
            severity: 'warning',
            category: 'performance',
            status: 'active',
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            component: 'API Server',
            actions: [
              {
                type: 'email',
                status: 'sent',
                timestamp: new Date(Date.now() - 1800000).toISOString(),
                recipient: 'devops@company.com',
                content: 'High memory usage detected on API Server'
              },
              {
                type: 'slack',
                status: 'sent',
                timestamp: new Date(Date.now() - 1800000).toISOString(),
                recipient: '#alerts',
                content: '⚠️ High memory usage on API Server'
              }
            ],
            escalation: [
              {
                level: 1,
                delay: 300,
                actions: ['email', 'slack'],
                conditions: ['memory_usage > 85%']
              },
              {
                level: 2,
                delay: 600,
                actions: ['page', 'sms'],
                conditions: ['memory_usage > 90%']
              }
            ]
          },
          {
            id: 'alert-2',
            title: 'Database Connection Pool Exhausted',
            description: 'Database connection pool is at capacity',
            severity: 'error',
            category: 'availability',
            status: 'acknowledged',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            component: 'Database',
            actions: [
              {
                type: 'email',
                status: 'sent',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                recipient: 'database-team@company.com',
                content: 'Database connection pool exhausted'
              }
            ],
            escalation: [
              {
                level: 1,
                delay: 60,
                actions: ['email', 'slack'],
                conditions: ['connection_pool > 95%']
              },
              {
                level: 2,
                delay: 120,
                actions: ['page'],
                conditions: ['connection_pool = 100%']
              }
            ]
          }
        ];

        // Mock deployment pipelines data
        const mockDeploymentPipelines: DeploymentPipeline[] = [
          {
            id: 'pipeline-1',
            name: 'Production Deployment Pipeline',
            environment: 'production',
            status: 'active',
            lastRun: new Date(Date.now() - 3600000).toISOString(),
            successRate: 94.5,
            averageDuration: 420,
            configuration: {
              timeout: 1800,
              concurrency: 1,
              notifications: [
                {
                  type: 'email',
                  recipients: ['devops@company.com', 'team@company.com'],
                  events: ['started', 'completed', 'failed'],
                  enabled: true
                },
                {
                  type: 'slack',
                  recipients: ['#deployments'],
                  events: ['failed', 'completed'],
                  enabled: true
                }
              ],
              rollback: {
                enabled: true,
                automatic: false,
                maxVersions: 5,
                conditions: ['health_check_failed', 'error_rate_high']
              }
            },
            stages: [
              {
                id: 'stage-1',
                name: 'Build',
                type: 'build',
                status: 'completed',
                duration: 180,
                logs: ['Building application...', 'Running tests...', 'Build completed successfully'],
                artifacts: ['app.tar.gz', 'config.json'],
                dependencies: []
              },
              {
                id: 'stage-2',
                name: 'Test',
                type: 'test',
                status: 'completed',
                duration: 120,
                logs: ['Running unit tests...', 'Running integration tests...', 'All tests passed'],
                artifacts: ['test-results.xml', 'coverage-report.html'],
                dependencies: ['stage-1']
              },
              {
                id: 'stage-3',
                name: 'Deploy',
                type: 'deploy',
                status: 'completed',
                duration: 120,
                logs: ['Deploying to production...', 'Health checks passed', 'Deployment successful'],
                artifacts: ['deployment.log'],
                dependencies: ['stage-2']
              }
            ],
            triggers: [
              { type: 'webhook', condition: 'main branch push', enabled: true },
              { type: 'manual', condition: 'manual trigger', enabled: true }
            ]
          }
        ];

        setOptimizationMetrics(mockOptimizationMetrics);
        setProductionDeployments(mockProductionDeployments);
        setProductionReadiness(mockProductionReadiness);
        setSystemAlerts(mockSystemAlerts);
        setDeploymentPipelines(mockDeploymentPipelines);

        toast.success('Final platform optimization data loaded successfully!');
      } catch (error) {
        console.error('Failed to load optimization data:', error);
        toast.error('Failed to load optimization data');
      } finally {
        setIsLoading(false);
      }
    };

    loadOptimizationData();
  }, []);

  const handleOptimizeMetric = useCallback(async (metricId: string) => {
    setIsOptimizing(true);
    try {
      // Simulate optimization process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setOptimizationMetrics(prev => prev.map(metric => 
        metric.id === metricId 
          ? { 
              ...metric, 
              value: Math.min(metric.value + Math.random() * 5, metric.target),
              lastUpdated: new Date().toISOString(),
              trend: 'improving'
            }
          : metric
      ));
      
      toast.success(`Optimization for ${metricId} completed successfully!`);
    } catch (error) {
      console.error('Failed to optimize:', error);
      toast.error('Failed to optimize');
    } finally {
      setIsOptimizing(false);
    }
  }, []);

  const handleDeployToProduction = useCallback(async () => {
    setIsDeploying(true);
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const newDeployment: ProductionDeployment = {
        id: `deploy-${Date.now()}`,
        name: `Production Release v2.1.${Math.floor(Math.random() * 10)}`,
        environment: 'production',
        status: 'deployed',
        version: `2.1.${Math.floor(Math.random() * 10)}`,
        timestamp: new Date().toISOString(),
        duration: 420,
        success: true,
        rollbackAvailable: true,
        metrics: {
          buildTime: 180,
          deployTime: 240,
          totalTime: 420,
          bundleSize: 2.3,
          performanceScore: 95,
          accessibilityScore: 98,
          seoScore: 92,
          securityScore: 88
        },
        healthChecks: [
          {
            name: 'API Health',
            status: 'pass',
            responseTime: 45,
            lastCheck: new Date().toISOString(),
            details: 'All API endpoints responding normally'
          },
          {
            name: 'Database Health',
            status: 'pass',
            responseTime: 12,
            lastCheck: new Date().toISOString(),
            details: 'Database connections stable'
          }
        ]
      };
      
      setProductionDeployments(prev => [newDeployment, ...prev]);
      
      toast.success('Production deployment completed successfully!');
    } catch (error) {
      console.error('Failed to deploy:', error);
      toast.error('Failed to deploy');
    } finally {
      setIsDeploying(false);
    }
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'metrics', label: 'Metrics', icon: Zap },
    { id: 'deployments', label: 'Deployments', icon: Server },
    { id: 'readiness', label: 'Readiness', icon: CheckCircle },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'pipelines', label: 'Pipelines', icon: Workflow }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'deployed': return 'text-green-600 bg-green-100';
      case 'deploying': return 'text-blue-600 bg-blue-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'text-blue-600 bg-blue-100';
      case 'security': return 'text-red-600 bg-red-100';
      case 'scalability': return 'text-purple-600 bg-purple-100';
      case 'reliability': return 'text-green-600 bg-green-100';
      case 'maintainability': return 'text-orange-600 bg-orange-100';
      case 'monitoring': return 'text-indigo-600 bg-indigo-100';
      case 'backup': return 'text-pink-600 bg-pink-100';
      case 'compliance': return 'text-teal-600 bg-teal-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Final Platform Optimization</h2>
                <p className="text-purple-100">Performance optimization and production readiness</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm">Optimized</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-purple-100 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Performance Score</p>
                          <p className="text-3xl font-bold">95</p>
                        </div>
                        <Zap className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Production Deployments</p>
                          <p className="text-3xl font-bold">{productionDeployments.length}</p>
                        </div>
                        <Server className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Readiness Items</p>
                          <p className="text-3xl font-bold">{productionReadiness.length}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Active Alerts</p>
                          <p className="text-3xl font-bold">{systemAlerts.filter(a => a.status === 'active').length}</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Optimization Metrics</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={optimizationMetrics.map(metric => ({
                          name: metric.name,
                          value: metric.value,
                          target: metric.target
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8b5cf6" />
                          <Bar dataKey="target" fill="#e5e7eb" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Deployment Success Rate</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Successful', value: 94.5 },
                              { name: 'Failed', value: 5.5 }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#ef4444" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'metrics' && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {optimizationMetrics.map((metric) => (
                    <div key={metric.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Target className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{metric.name}</h3>
                            <p className="text-sm text-gray-600">{metric.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(metric.status)}`}>
                            {metric.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getCategoryColor(metric.category)}`}>
                            {metric.category}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Current Value</span>
                          <p className="font-semibold">{metric.value} {metric.unit}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Target</span>
                          <p className="font-semibold">{metric.target} {metric.unit}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Trend</span>
                          <p className="font-semibold">{metric.trend}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Last Updated</span>
                          <p className="font-semibold text-sm">
                            {new Date(metric.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Recommendations:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {metric.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleOptimizeMetric(metric.id)}
                          disabled={isOptimizing}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
                        >
                          {isOptimizing ? 'Optimizing...' : 'Optimize'}
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'deployments' && (
                <motion.div
                  key="deployments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Production Deployments</h3>
                    <button
                      onClick={handleDeployToProduction}
                      disabled={isDeploying}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      {isDeploying ? 'Deploying...' : 'Deploy to Production'}
                    </button>
                  </div>
                  {productionDeployments.map((deployment) => (
                    <div key={deployment.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Server className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{deployment.name}</h3>
                            <p className="text-sm text-gray-600">Version {deployment.version}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(deployment.status)}`}>
                            {deployment.status}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                            {deployment.environment}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Duration</span>
                          <p className="font-semibold">{deployment.duration}s</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Bundle Size</span>
                          <p className="font-semibold">{deployment.metrics.bundleSize} MB</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Performance Score</span>
                          <p className="font-semibold">{deployment.metrics.performanceScore}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Deployed</span>
                          <p className="font-semibold text-sm">
                            {new Date(deployment.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Health Checks:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {deployment.healthChecks.map((check) => (
                            <div key={check.name} className="p-2 bg-gray-50 rounded">
                              <div className="flex justify-between text-sm">
                                <span>{check.name}</span>
                                <span className={`font-medium ${
                                  check.status === 'pass' ? 'text-green-600' :
                                  check.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {check.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{check.details}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        {deployment.rollbackAvailable && (
                          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                            Rollback
                          </button>
                        )}
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'readiness' && (
                <motion.div
                  key="readiness"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {productionReadiness.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.item}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            item.priority === 'critical' ? 'bg-red-100 text-red-800' :
                            item.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.priority}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Assigned To</span>
                          <p className="font-semibold">{item.assignedTo}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Due Date</span>
                          <p className="font-semibold text-sm">
                            {new Date(item.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Evidence</span>
                          <p className="font-semibold">{item.evidence.length} files</p>
                        </div>
                      </div>
                      {item.evidence.length > 0 && (
                        <div className="space-y-2 mb-4">
                          <h4 className="font-medium">Evidence:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.evidence.map((file, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                {file}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'alerts' && (
                <motion.div
                  key="alerts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{alert.title}</h3>
                            <p className="text-sm text-gray-600">{alert.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getCategoryColor(alert.category)}`}>
                            {alert.category}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Component</span>
                          <p className="font-semibold">{alert.component}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Timestamp</span>
                          <p className="font-semibold text-sm">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Actions</span>
                          <p className="font-semibold">{alert.actions.length} sent</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Actions Taken:</h4>
                        <div className="space-y-1">
                          {alert.actions.map((action) => (
                            <div key={action.type} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">{action.type} to {action.recipient}</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                action.status === 'sent' ? 'bg-green-100 text-green-800' :
                                action.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {action.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Acknowledge
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'pipelines' && (
                <motion.div
                  key="pipelines"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {deploymentPipelines.map((pipeline) => (
                    <div key={pipeline.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <Workflow className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{pipeline.name}</h3>
                            <p className="text-sm text-gray-600">{pipeline.environment} environment</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(pipeline.status)}`}>
                            {pipeline.status}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                            {pipeline.successRate}% success
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Last Run</span>
                          <p className="font-semibold text-sm">
                            {new Date(pipeline.lastRun).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Average Duration</span>
                          <p className="font-semibold">{pipeline.averageDuration}s</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Success Rate</span>
                          <p className="font-semibold">{pipeline.successRate}%</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium">Pipeline Stages:</h4>
                        {pipeline.stages.map((stage) => (
                          <div key={stage.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{stage.name}</span>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(stage.status)}`}>
                                  {stage.status}
                                </span>
                                <span className="text-sm text-gray-500">{stage.duration}s</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {stage.logs.slice(-2).map((log, index) => (
                                <div key={index}>• {log}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end mt-4">
                        <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                          Run Pipeline
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FinalPlatformOptimization;