import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, CheckCircle, AlertTriangle, Clock, Calendar, Server, Bell, BarChart3, Target, Users, TrendingUp, Activity, Monitor, Settings, Globe, Database, Cpu, HardDrive, Network, Star, Zap, Crown, Diamond, Gem, Sparkles, DollarSign, Building, UserCheck, Workflow, Shield, FileText, Award, Badge, Flag, Info, HelpCircle, ExternalLink, Edit, Trash2, Save, Copy, Undo, Redo, Play, Pause, RefreshCw, RotateCcw, Maximize, Minimize, Filter, Search, Plus, Minus, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Code, Lock, CheckCircle as CheckIcon, AlertTriangle as AlertIcon, Clock as ClockIcon, Calendar as CalendarIcon, Server as ServerIcon, Cloud as CloudIcon, BarChart3 as AnalyticsIcon, Shield as ComplianceIcon, FileText as AuditIcon, Award as CertificateIcon, Award as BadgeIcon, Flag as FlagIcon, Info as InfoIcon, HelpCircle as HelpIcon, ExternalLink as ExternalIcon, Edit as EditIcon, Trash2 as TrashIcon, Save as SaveIcon, Copy as CopyIcon, Undo as UndoIcon, Redo as RedoIcon, Play as PlayIcon, Pause as PauseIcon, RefreshCw as RefreshIcon, RotateCcw as RotateIcon, Maximize as MaximizeIcon, Minimize as MinimizeIcon, Filter as FilterIcon, Search as SearchIcon, Plus as PlusIcon, Minus as MinusIcon, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, ArrowRight as ArrowRightIcon, ArrowLeft as ArrowLeftIcon, Code as CodeIcon, Database as DatabaseIcon, Cpu as CpuIcon, HardDrive as HardDriveIcon, Network as NetworkIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-hot-toast';

// Production Deployment & Launch interfaces
interface DeploymentEnvironment {
  id: string;
  name: string;
  type: 'development' | 'staging' | 'production' | 'canary';
  status: 'active' | 'inactive' | 'maintenance';
  url: string;
  version: string;
  lastDeployment: string;
  healthStatus: 'healthy' | 'warning' | 'critical';
  metrics: EnvironmentMetrics;
  configuration: EnvironmentConfig;
}

interface EnvironmentMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
}

interface EnvironmentConfig {
  autoScaling: boolean;
  loadBalancing: boolean;
  cdnEnabled: boolean;
  sslEnabled: boolean;
  monitoringEnabled: boolean;
  backupEnabled: boolean;
  securityScanning: boolean;
  performanceTesting: boolean;
}

interface LaunchReadinessItem {
  id: string;
  category: 'technical' | 'business' | 'legal' | 'marketing' | 'operations';
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: string;
  completedDate?: string;
  dependencies: string[];
  evidence: string[];
  notes: string[];
}

interface MonitoringAlert {
  id: string;
  type: 'performance' | 'security' | 'availability' | 'business' | 'system';
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  description: string;
  status: 'active' | 'acknowledged' | 'resolved';
  timestamp: string;
  environment: string;
  metrics: AlertMetrics;
  actions: AlertAction[];
  escalation: EscalationRule[];
}

interface AlertMetrics {
  threshold: number;
  currentValue: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  duration: number;
  frequency: number;
}

interface AlertAction {
  id: string;
  type: 'notification' | 'automation' | 'escalation' | 'rollback';
  description: string;
  executed: boolean;
  executedAt?: string;
  result?: string;
}

interface EscalationRule {
  level: number;
  condition: string;
  action: string;
  timeout: number;
  contacts: string[];
}

interface LaunchMetric {
  id: string;
  name: string;
  category: 'user' | 'performance' | 'business' | 'technical';
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  timestamp: string;
  description: string;
}

interface LaunchStrategy {
  id: string;
  name: string;
  phase: 'pre_launch' | 'launch' | 'post_launch' | 'growth';
  status: 'planned' | 'active' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  objectives: string[];
  tactics: LaunchTactic[];
  budget: number;
  expectedROI: number;
  actualROI?: number;
  metrics: StrategyMetrics;
}

interface LaunchTactic {
  id: string;
  name: string;
  type: 'marketing' | 'sales' | 'partnership' | 'content' | 'event' | 'advertising';
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  budget: number;
  expectedOutcome: string;
  actualOutcome?: string;
  startDate: string;
  endDate?: string;
  responsible: string;
  deliverables: string[];
}

interface StrategyMetrics {
  reach: number;
  engagement: number;
  conversion: number;
  revenue: number;
  cost: number;
  roi: number;
}

const ProductionDeploymentLaunch: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [deploymentEnvironments, setDeploymentEnvironments] = useState<DeploymentEnvironment[]>([]);
  const [launchReadiness, setLaunchReadiness] = useState<LaunchReadinessItem[]>([]);
  const [monitoringAlerts, setMonitoringAlerts] = useState<MonitoringAlert[]>([]);
  const [launchMetrics, setLaunchMetrics] = useState<LaunchMetric[]>([]);
  const [launchStrategies, setLaunchStrategies] = useState<LaunchStrategy[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);

  // SSR-safe data loading
  useEffect(() => {
    const loadProductionData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call with SSR-safe delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock deployment environments data
        const mockEnvironments: DeploymentEnvironment[] = [
          {
            id: 'env-production',
            name: 'Production',
            type: 'production',
            status: 'active',
            url: 'https://syncscript.com',
            version: '3.0.0',
            lastDeployment: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            healthStatus: 'healthy',
            metrics: {
              uptime: 99.9,
              responseTime: 245,
              errorRate: 0.1,
              throughput: 1250,
              cpuUsage: 65,
              memoryUsage: 78,
              diskUsage: 45,
              networkLatency: 12
            },
            configuration: {
              autoScaling: true,
              loadBalancing: true,
              cdnEnabled: true,
              sslEnabled: true,
              monitoringEnabled: true,
              backupEnabled: true,
              securityScanning: true,
              performanceTesting: true
            }
          },
          {
            id: 'env-staging',
            name: 'Staging',
            type: 'staging',
            status: 'active',
            url: 'https://staging.syncscript.com',
            version: '3.1.0-beta',
            lastDeployment: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            healthStatus: 'healthy',
            metrics: {
              uptime: 99.5,
              responseTime: 180,
              errorRate: 0.2,
              throughput: 450,
              cpuUsage: 45,
              memoryUsage: 62,
              diskUsage: 38,
              networkLatency: 8
            },
            configuration: {
              autoScaling: true,
              loadBalancing: true,
              cdnEnabled: true,
              sslEnabled: true,
              monitoringEnabled: true,
              backupEnabled: true,
              securityScanning: true,
              performanceTesting: true
            }
          }
        ];

        // Mock launch readiness data
        const mockReadiness: LaunchReadinessItem[] = [
          {
            id: 'readiness-1',
            category: 'technical',
            title: 'Production Environment Setup',
            description: 'Ensure production environment is properly configured and tested',
            status: 'completed',
            priority: 'critical',
            assignedTo: 'DevOps Team',
            dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            dependencies: [],
            evidence: ['Environment health check passed', 'Load testing completed', 'Security scan passed'],
            notes: ['All systems green', 'Ready for production traffic']
          },
          {
            id: 'readiness-2',
            category: 'business',
            title: 'Legal Compliance Review',
            description: 'Complete legal compliance review for data protection and privacy',
            status: 'completed',
            priority: 'critical',
            assignedTo: 'Legal Team',
            dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            completedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            dependencies: [],
            evidence: ['GDPR compliance verified', 'Privacy policy updated', 'Terms of service reviewed'],
            notes: ['All legal requirements met', 'Ready for EU market']
          },
          {
            id: 'readiness-3',
            category: 'marketing',
            title: 'Launch Campaign Preparation',
            description: 'Prepare and schedule launch marketing campaigns',
            status: 'in_progress',
            priority: 'high',
            assignedTo: 'Marketing Team',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            dependencies: ['readiness-1', 'readiness-2'],
            evidence: ['Campaign assets created', 'Social media scheduled', 'Press release drafted'],
            notes: ['Final review pending', 'Launch date confirmed']
          },
          {
            id: 'readiness-4',
            category: 'operations',
            title: 'Support Team Training',
            description: 'Train support team on new features and common issues',
            status: 'in_progress',
            priority: 'medium',
            assignedTo: 'Support Team',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            dependencies: [],
            evidence: ['Training materials prepared', 'Knowledge base updated'],
            notes: ['Training sessions scheduled', 'Documentation review in progress']
          }
        ];

        // Mock monitoring alerts data
        const mockAlerts: MonitoringAlert[] = [
          {
            id: 'alert-1',
            type: 'performance',
            severity: 'warning',
            title: 'High Response Time',
            description: 'Average response time has increased by 15% in the last hour',
            status: 'active',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            environment: 'production',
            metrics: {
              threshold: 500,
              currentValue: 575,
              trend: 'increasing',
              duration: 30,
              frequency: 5
            },
            actions: [
              {
                id: 'action-1',
                type: 'notification',
                description: 'Alert sent to DevOps team',
                executed: true,
                executedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
                result: 'Notification delivered'
              }
            ],
            escalation: [
              {
                level: 1,
                condition: 'Response time > 500ms for 5 minutes',
                action: 'Scale up instances',
                timeout: 10,
                contacts: ['devops@syncscript.com']
              }
            ]
          }
        ];

        // Mock launch metrics data
        const mockMetrics: LaunchMetric[] = [
          {
            id: 'metric-1',
            name: 'User Registrations',
            category: 'user',
            value: 1250,
            target: 1000,
            unit: 'users',
            trend: 'up',
            change: 25,
            timestamp: new Date().toISOString(),
            description: 'Total user registrations since launch'
          },
          {
            id: 'metric-2',
            name: 'Page Load Time',
            category: 'performance',
            value: 245,
            target: 300,
            unit: 'ms',
            trend: 'down',
            change: -18,
            timestamp: new Date().toISOString(),
            description: 'Average page load time'
          },
          {
            id: 'metric-3',
            name: 'Revenue',
            category: 'business',
            value: 45000,
            target: 50000,
            unit: '$',
            trend: 'up',
            change: 12.5,
            timestamp: new Date().toISOString(),
            description: 'Total revenue generated'
          }
        ];

        // Mock launch strategies data
        const mockStrategies: LaunchStrategy[] = [
          {
            id: 'strategy-1',
            name: 'Product Hunt Launch',
            phase: 'launch',
            status: 'active',
            startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            objectives: ['Generate initial user base', 'Create buzz around product', 'Drive early adoption'],
            tactics: [
              {
                id: 'tactic-1',
                name: 'Product Hunt Campaign',
                type: 'marketing',
                status: 'active',
                budget: 5000,
                expectedOutcome: 'Top 5 product of the day',
                startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
                responsible: 'Marketing Team',
                deliverables: ['Product Hunt listing', 'Launch day activities', 'Community engagement']
              }
            ],
            budget: 15000,
            expectedROI: 300,
            metrics: {
              reach: 50000,
              engagement: 15,
              conversion: 8,
              revenue: 25000,
              cost: 15000,
              roi: 167
            }
          }
        ];

        setDeploymentEnvironments(mockEnvironments);
        setLaunchReadiness(mockReadiness);
        setMonitoringAlerts(mockAlerts);
        setLaunchMetrics(mockMetrics);
        setLaunchStrategies(mockStrategies);

        toast.success('Production deployment and launch data loaded successfully!');
      } catch (error) {
        console.error('Failed to load production data:', error);
        toast.error('Failed to load production deployment data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProductionData();
  }, []);

  const handleDeploy = useCallback(async (environmentId: string) => {
    setIsDeploying(true);
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success(`🚀 Successfully deployed to ${environmentId}!`);
    } catch (error) {
      console.error('Failed to deploy:', error);
      toast.error('Failed to deploy');
    } finally {
      setIsDeploying(false);
    }
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Rocket },
    { id: 'environments', label: 'Environments', icon: Server },
    { id: 'readiness', label: 'Readiness', icon: CheckCircle },
    { id: 'monitoring', label: 'Monitoring', icon: Bell },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'strategy', label: 'Strategy', icon: Target }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'blocked': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
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
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Production Deployment & Launch</h2>
                <p className="text-blue-100">Go-to-market execution</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm">Live</span>
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
                      : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Environments</p>
                          <p className="text-3xl font-bold">{deploymentEnvironments.length}</p>
                        </div>
                        <Server className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Readiness Items</p>
                          <p className="text-3xl font-bold">{launchReadiness.length}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Active Alerts</p>
                          <p className="text-3xl font-bold">{monitoringAlerts.filter(a => a.status === 'active').length}</p>
                        </div>
                        <Bell className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Launch Metrics</p>
                          <p className="text-3xl font-bold">{launchMetrics.length}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Environment Health</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={deploymentEnvironments.map(env => ({
                          name: env.name,
                          uptime: env.metrics.uptime
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="uptime" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Readiness Progress</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Completed', value: launchReadiness.filter(r => r.status === 'completed').length },
                              { name: 'In Progress', value: launchReadiness.filter(r => r.status === 'in_progress').length },
                              { name: 'Pending', value: launchReadiness.filter(r => r.status === 'pending').length }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#f59e0b" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'environments' && (
                <motion.div
                  key="environments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {deploymentEnvironments.map((environment) => (
                    <div key={environment.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Server className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{environment.name}</h3>
                            <p className="text-sm text-gray-600">{environment.url}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(environment.status)}`}>
                            {environment.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(environment.healthStatus)}`}>
                            {environment.healthStatus}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            v{environment.version}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Uptime</span>
                          <p className="font-semibold">{environment.metrics.uptime}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Response Time</span>
                          <p className="font-semibold">{environment.metrics.responseTime}ms</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Error Rate</span>
                          <p className="font-semibold">{environment.metrics.errorRate}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Last Deployment</span>
                          <p className="font-semibold text-sm">
                            {new Date(environment.lastDeployment).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Configuration:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {Object.entries(environment.configuration).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleDeploy(environment.id)}
                          disabled={isDeploying}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                        >
                          {isDeploying ? 'Deploying...' : '🚀 Deploy'}
                        </button>
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
                  {launchReadiness.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            item.category === 'technical' ? 'bg-blue-100 text-blue-800' :
                            item.category === 'business' ? 'bg-green-100 text-green-800' :
                            item.category === 'legal' ? 'bg-purple-100 text-purple-800' :
                            item.category === 'marketing' ? 'bg-pink-100 text-pink-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {item.category}
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
                          <span className="text-sm text-gray-500">Completed</span>
                          <p className="font-semibold text-sm">
                            {item.completedDate ? new Date(item.completedDate).toLocaleDateString() : 'Not completed'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Evidence:</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.evidence.map((evidence, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              ✓ {evidence}
                            </span>
                          ))}
                        </div>
                      </div>
                      {item.notes.length > 0 && (
                        <div className="space-y-2 mb-4">
                          <h4 className="font-medium">Notes:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {item.notes.map((note, index) => (
                              <li key={index}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'monitoring' && (
                <motion.div
                  key="monitoring"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {monitoringAlerts.map((alert) => (
                    <div key={alert.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <Bell className="w-5 h-5 text-red-600" />
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
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {alert.environment}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Current Value</span>
                          <p className="font-semibold">{alert.metrics.currentValue}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Threshold</span>
                          <p className="font-semibold">{alert.metrics.threshold}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Trend</span>
                          <p className="font-semibold capitalize">{alert.metrics.trend}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Duration</span>
                          <p className="font-semibold">{alert.metrics.duration} min</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Actions Taken:</h4>
                        <div className="space-y-2">
                          {alert.actions.map((action) => (
                            <div key={action.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">{action.description}</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                action.executed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {action.executed ? 'Executed' : 'Pending'}
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

              {activeTab === 'metrics' && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {launchMetrics.map((metric) => (
                      <div key={metric.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">{metric.name}</h3>
                            <p className="text-sm text-gray-600">{metric.description}</p>
                          </div>
                          <div className={`p-2 rounded-lg ${
                            metric.trend === 'up' ? 'bg-green-100' :
                            metric.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                          }`}>
                            {metric.trend === 'up' ? (
                              <ArrowUp className="w-5 h-5 text-green-600" />
                            ) : metric.trend === 'down' ? (
                              <ArrowDown className="w-5 h-5 text-red-600" />
                            ) : (
                              <Minus className="w-5 h-5 text-gray-600" />
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Current</span>
                            <span className="font-semibold">{metric.value.toLocaleString()} {metric.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Target</span>
                            <span className="font-semibold">{metric.target.toLocaleString()} {metric.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Change</span>
                            <span className={`font-semibold ${
                              metric.change > 0 ? 'text-green-600' : metric.change < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {metric.change > 0 ? '+' : ''}{metric.change}%
                            </span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                metric.value >= metric.target ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'strategy' && (
                <motion.div
                  key="strategy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {launchStrategies.map((strategy) => (
                    <div key={strategy.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Target className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{strategy.name}</h3>
                            <p className="text-sm text-gray-600">{strategy.phase} phase</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(strategy.status)}`}>
                            {strategy.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            ROI: {strategy.actualROI || strategy.expectedROI}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Budget</span>
                          <p className="font-semibold">${strategy.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Expected ROI</span>
                          <p className="font-semibold">{strategy.expectedROI}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Start Date</span>
                          <p className="font-semibold text-sm">
                            {new Date(strategy.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">End Date</span>
                          <p className="font-semibold text-sm">
                            {strategy.endDate ? new Date(strategy.endDate).toLocaleDateString() : 'TBD'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Objectives:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {strategy.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Tactics:</h4>
                        <div className="space-y-2">
                          {strategy.tactics.map((tactic) => (
                            <div key={tactic.id} className="p-3 bg-gray-50 rounded">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium">{tactic.name}</h5>
                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(tactic.status)}`}>
                                  {tactic.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{tactic.expectedOutcome}</p>
                              <div className="flex justify-between text-sm">
                                <span>Budget: ${tactic.budget.toLocaleString()}</span>
                                <span>Responsible: {tactic.responsible}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Metrics:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Reach</span>
                            <p className="font-semibold">{strategy.metrics.reach.toLocaleString()}</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Engagement</span>
                            <p className="font-semibold">{strategy.metrics.engagement}%</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Conversion</span>
                            <p className="font-semibold">{strategy.metrics.conversion}%</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Revenue</span>
                            <p className="font-semibold">${strategy.metrics.revenue.toLocaleString()}</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">Cost</span>
                            <p className="font-semibold">${strategy.metrics.cost.toLocaleString()}</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-500">ROI</span>
                            <p className="font-semibold">{strategy.metrics.roi}%</p>
                          </div>
                        </div>
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

export default ProductionDeploymentLaunch;