import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, Globe, Shield, Database, Server, CheckCircle, AlertTriangle, Clock, Settings, Code, BarChart3, Zap, Activity, Monitor, Cloud, Lock, Users, TrendingUp, Target, Award } from 'lucide-react';

interface DeploymentEnvironment {
  id: string;
  name: string;
  type: 'production' | 'staging' | 'development';
  status: 'deployed' | 'deploying' | 'failed' | 'pending';
  url: string;
  version: string;
  healthScore: number;
  uptime: number;
  lastDeployed: Date;
  deploymentTime: number;
  infrastructure: {
    frontend: string;
    backend: string;
    database: string;
    cache: string;
    cdn: string;
    monitoring: string;
  };
  metrics: {
    responseTime: number;
    throughput: number;
    errorRate: number;
    availability: number;
    cpuUsage: number;
    memoryUsage: number;
  };
  sslStatus: 'active' | 'pending' | 'expired' | 'error';
  domainStatus: 'active' | 'pending' | 'error';
}

interface LaunchChecklist {
  id: string;
  category: string;
  items: {
    id: string;
    description: string;
    status: 'completed' | 'pending' | 'failed' | 'in-progress';
    critical: boolean;
    priority: 'high' | 'medium' | 'low';
    assignedTo: string;
    dueDate: Date;
    notes?: string;
  }[];
}

interface MonitoringAlert {
  id: string;
  type: 'performance' | 'security' | 'error' | 'capacity' | 'ssl' | 'domain';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  resolved: boolean;
  component: string;
  actionRequired: boolean;
}

interface LaunchMetrics {
  id: string;
  category: string;
  metrics: {
    totalUsers: number;
    activeUsers: number;
    pageViews: number;
    sessions: number;
    bounceRate: number;
    conversionRate: number;
    revenue: number;
    supportTickets: number;
  };
  trends: {
    userGrowth: number[];
    performanceTrend: number[];
    errorRateTrend: number[];
    revenueTrend: number[];
  };
  goals: {
    targetUsers: number;
    targetRevenue: number;
    targetUptime: number;
    targetPerformance: number;
  };
}

interface LaunchStrategy {
  id: string;
  phase: 'pre-launch' | 'soft-launch' | 'public-launch' | 'scale';
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  status: 'planned' | 'active' | 'completed' | 'paused';
  activities: {
    id: string;
    name: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'high' | 'medium' | 'low';
    assignedTo: string;
  }[];
  metrics: {
    usersTarget: number;
    revenueTarget: number;
    performanceTarget: number;
    actualUsers: number;
    actualRevenue: number;
    actualPerformance: number;
  };
}

const ProductionDeploymentLaunch: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [environments, setEnvironments] = useState<DeploymentEnvironment[]>([]);
  const [launchChecklist, setLaunchChecklist] = useState<LaunchChecklist[]>([]);
  const [monitoringAlerts, setMonitoringAlerts] = useState<MonitoringAlert[]>([]);
  const [launchMetrics, setLaunchMetrics] = useState<LaunchMetrics[]>([]);
  const [launchStrategy, setLaunchStrategy] = useState<LaunchStrategy[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<DeploymentEnvironment | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<LaunchStrategy | null>(null);

  // Generate deployment data
  useEffect(() => {
    const generateEnvironments = (): DeploymentEnvironment[] => {
      return [
        {
          id: 'prod-1',
          name: 'SyncScript Production',
          type: 'production',
          status: 'deployed',
          url: 'https://syncscript.com',
          version: '4.0.0',
          healthScore: 99,
          uptime: 99.9,
          lastDeployed: new Date(Date.now() - 2 * 60 * 60 * 1000),
          deploymentTime: 180,
          infrastructure: {
            frontend: 'Vercel',
            backend: 'Render',
            database: 'PostgreSQL 14',
            cache: 'Redis 6',
            cdn: 'Cloudflare',
            monitoring: 'DataDog'
          },
          metrics: {
            responseTime: 120,
            throughput: 1500,
            errorRate: 0.01,
            availability: 99.9,
            cpuUsage: 45,
            memoryUsage: 60
          },
          sslStatus: 'active',
          domainStatus: 'active'
        },
        {
          id: 'staging-1',
          name: 'SyncScript Staging',
          type: 'staging',
          status: 'deployed',
          url: 'https://staging.syncscript.com',
          version: '4.0.0-rc.1',
          healthScore: 95,
          uptime: 99.5,
          lastDeployed: new Date(Date.now() - 6 * 60 * 60 * 1000),
          deploymentTime: 120,
          infrastructure: {
            frontend: 'Vercel',
            backend: 'Render',
            database: 'PostgreSQL 14',
            cache: 'Redis 6',
            cdn: 'Cloudflare',
            monitoring: 'DataDog'
          },
          metrics: {
            responseTime: 150,
            throughput: 200,
            errorRate: 0.05,
            availability: 99.5,
            cpuUsage: 30,
            memoryUsage: 45
          },
          sslStatus: 'active',
          domainStatus: 'active'
        }
      ];
    };

    const generateLaunchChecklist = (): LaunchChecklist[] => {
      return [
        {
          id: 'checklist-1',
          category: 'Infrastructure & Deployment',
          items: [
            { id: 'infra-1', description: 'Production environment deployed and tested', status: 'completed', critical: true, priority: 'high', assignedTo: 'DevOps Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
            { id: 'infra-2', description: 'SSL certificates configured and valid', status: 'completed', critical: true, priority: 'high', assignedTo: 'DevOps Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
            { id: 'infra-3', description: 'CDN configured for global performance', status: 'completed', critical: true, priority: 'high', assignedTo: 'DevOps Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
            { id: 'infra-4', description: 'Database backups and recovery tested', status: 'completed', critical: true, priority: 'high', assignedTo: 'DevOps Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
            { id: 'infra-5', description: 'Monitoring and alerting configured', status: 'completed', critical: true, priority: 'high', assignedTo: 'DevOps Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }
          ]
        },
        {
          id: 'checklist-2',
          category: 'Security & Compliance',
          items: [
            { id: 'sec-1', description: 'Security audit completed and vulnerabilities fixed', status: 'completed', critical: true, priority: 'high', assignedTo: 'Security Team', dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
            { id: 'sec-2', description: 'GDPR compliance validation completed', status: 'completed', critical: true, priority: 'high', assignedTo: 'Compliance Team', dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
            { id: 'sec-3', description: 'SOC2 compliance documentation ready', status: 'completed', critical: true, priority: 'high', assignedTo: 'Compliance Team', dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
            { id: 'sec-4', description: 'Penetration testing completed', status: 'completed', critical: true, priority: 'high', assignedTo: 'Security Team', dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
            { id: 'sec-5', description: 'Data encryption and privacy controls active', status: 'completed', critical: true, priority: 'high', assignedTo: 'Security Team', dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }
          ]
        },
        {
          id: 'checklist-3',
          category: 'Performance & Monitoring',
          items: [
            { id: 'perf-1', description: 'Core Web Vitals optimized and tested', status: 'completed', critical: true, priority: 'high', assignedTo: 'Performance Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
            { id: 'perf-2', description: 'Load testing completed with expected traffic', status: 'completed', critical: true, priority: 'high', assignedTo: 'Performance Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
            { id: 'perf-3', description: 'Error tracking and logging configured', status: 'completed', critical: true, priority: 'high', assignedTo: 'DevOps Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
            { id: 'perf-4', description: 'Performance monitoring dashboards active', status: 'completed', critical: false, priority: 'medium', assignedTo: 'DevOps Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
            { id: 'perf-5', description: 'Automated scaling configured', status: 'completed', critical: true, priority: 'high', assignedTo: 'DevOps Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }
          ]
        },
        {
          id: 'checklist-4',
          category: 'Marketing & Launch',
          items: [
            { id: 'mkt-1', description: 'Landing page created and optimized', status: 'in-progress', critical: true, priority: 'high', assignedTo: 'Marketing Team', dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
            { id: 'mkt-2', description: 'User documentation and guides completed', status: 'completed', critical: true, priority: 'high', assignedTo: 'Content Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
            { id: 'mkt-3', description: 'Demo environment prepared', status: 'completed', critical: true, priority: 'high', assignedTo: 'Product Team', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
            { id: 'mkt-4', description: 'Beta user recruitment program launched', status: 'in-progress', critical: true, priority: 'high', assignedTo: 'Marketing Team', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
            { id: 'mkt-5', description: 'Launch announcement prepared', status: 'pending', critical: true, priority: 'high', assignedTo: 'Marketing Team', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
          ]
        }
      ];
    };

    const generateMonitoringAlerts = (): MonitoringAlert[] => {
      return [
        {
          id: 'alert-1',
          type: 'performance',
          severity: 'low',
          title: 'Response Time Slightly Elevated',
          description: 'Average response time increased to 150ms (target: 120ms)',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          resolved: false,
          component: 'API Gateway',
          actionRequired: false
        },
        {
          id: 'alert-2',
          type: 'capacity',
          severity: 'medium',
          title: 'User Registration Spike',
          description: 'User registrations increased 300% in the last hour',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          resolved: false,
          component: 'User Service',
          actionRequired: true
        },
        {
          id: 'alert-3',
          type: 'ssl',
          severity: 'low',
          title: 'SSL Certificate Renewal Reminder',
          description: 'SSL certificate expires in 30 days',
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
          resolved: false,
          component: 'SSL Manager',
          actionRequired: true
        }
      ];
    };

    const generateLaunchMetrics = (): LaunchMetrics[] => {
      return [
        {
          id: 'metrics-1',
          category: 'Launch Performance',
          metrics: {
            totalUsers: 1250,
            activeUsers: 980,
            pageViews: 15420,
            sessions: 8920,
            bounceRate: 25.5,
            conversionRate: 12.8,
            revenue: 15420,
            supportTickets: 23
          },
          trends: {
            userGrowth: [100, 250, 500, 750, 1000, 1250],
            performanceTrend: [95, 96, 97, 98, 99, 99],
            errorRateTrend: [0.5, 0.3, 0.2, 0.1, 0.05, 0.01],
            revenueTrend: [0, 2500, 5000, 7500, 10000, 15420]
          },
          goals: {
            targetUsers: 1000,
            targetRevenue: 10000,
            targetUptime: 99.5,
            targetPerformance: 95
          }
        }
      ];
    };

    const generateLaunchStrategy = (): LaunchStrategy[] => {
      return [
        {
          id: 'strategy-1',
          phase: 'pre-launch',
          name: 'Pre-Launch Preparation',
          description: 'Final testing, security validation, and infrastructure optimization',
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          status: 'completed',
          activities: [
            { id: 'act-1', name: 'Security Audit', description: 'Complete security audit and vulnerability assessment', status: 'completed', priority: 'high', assignedTo: 'Security Team' },
            { id: 'act-2', name: 'Performance Testing', description: 'Load testing and performance optimization', status: 'completed', priority: 'high', assignedTo: 'Performance Team' },
            { id: 'act-3', name: 'Infrastructure Setup', description: 'Production infrastructure deployment', status: 'completed', priority: 'high', assignedTo: 'DevOps Team' }
          ],
          metrics: {
            usersTarget: 0,
            revenueTarget: 0,
            performanceTarget: 95,
            actualUsers: 0,
            actualRevenue: 0,
            actualPerformance: 99
          }
        },
        {
          id: 'strategy-2',
          phase: 'soft-launch',
          name: 'Soft Launch (Beta)',
          description: 'Limited beta release with 100-500 users for feedback and validation',
          startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          status: 'active',
          activities: [
            { id: 'act-4', name: 'Beta User Recruitment', description: 'Recruit and onboard beta users', status: 'in-progress', priority: 'high', assignedTo: 'Marketing Team' },
            { id: 'act-5', name: 'Feedback Collection', description: 'Collect and analyze user feedback', status: 'in-progress', priority: 'high', assignedTo: 'Product Team' },
            { id: 'act-6', name: 'Bug Fixes', description: 'Address critical issues from beta testing', status: 'pending', priority: 'high', assignedTo: 'Dev Team' }
          ],
          metrics: {
            usersTarget: 500,
            revenueTarget: 5000,
            performanceTarget: 98,
            actualUsers: 250,
            actualRevenue: 2500,
            actualPerformance: 99
          }
        },
        {
          id: 'strategy-3',
          phase: 'public-launch',
          name: 'Public Launch',
          description: 'Full public launch with marketing campaign and enterprise outreach',
          startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          status: 'planned',
          activities: [
            { id: 'act-7', name: 'Marketing Campaign', description: 'Launch comprehensive marketing campaign', status: 'pending', priority: 'high', assignedTo: 'Marketing Team' },
            { id: 'act-8', name: 'Enterprise Sales', description: 'Begin enterprise customer outreach', status: 'pending', priority: 'high', assignedTo: 'Sales Team' },
            { id: 'act-9', name: 'Media Coverage', description: 'Secure media coverage and PR', status: 'pending', priority: 'medium', assignedTo: 'PR Team' }
          ],
          metrics: {
            usersTarget: 5000,
            revenueTarget: 50000,
            performanceTarget: 99,
            actualUsers: 0,
            actualRevenue: 0,
            actualPerformance: 0
          }
        },
        {
          id: 'strategy-4',
          phase: 'scale',
          name: 'Scale & Growth',
          description: 'Scale infrastructure and team to support rapid growth',
          startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          endDate: null,
          status: 'planned',
          activities: [
            { id: 'act-10', name: 'Team Expansion', description: 'Hire additional developers and support staff', status: 'pending', priority: 'high', assignedTo: 'HR Team' },
            { id: 'act-11', name: 'Infrastructure Scaling', description: 'Scale infrastructure for increased load', status: 'pending', priority: 'high', assignedTo: 'DevOps Team' },
            { id: 'act-12', name: 'Feature Development', description: 'Develop new features based on user feedback', status: 'pending', priority: 'medium', assignedTo: 'Product Team' }
          ],
          metrics: {
            usersTarget: 25000,
            revenueTarget: 250000,
            performanceTarget: 99.5,
            actualUsers: 0,
            actualRevenue: 0,
            actualPerformance: 0
          }
        }
      ];
    };

    setEnvironments(generateEnvironments());
    setLaunchChecklist(generateLaunchChecklist());
    setMonitoringAlerts(generateMonitoringAlerts());
    setLaunchMetrics(generateLaunchMetrics());
    setLaunchStrategy(generateLaunchStrategy());
  }, []);

  const deployToProduction = async () => {
    setIsDeploying(true);
    
    // Simulate production deployment
    await new Promise(resolve => setTimeout(resolve, 20000));
    
    // Update environment
    setEnvironments(prev => prev.map(env => 
      env.type === 'production' 
        ? { 
            ...env, 
            lastDeployed: new Date(),
            version: '4.0.0-production',
            status: 'deployed' as const,
            healthScore: 100,
            uptime: 99.99
          }
        : env
    ));
    
    setIsDeploying(false);
  };

  const launchPlatform = async () => {
    setIsLaunching(true);
    
    // Simulate platform launch
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Update launch strategy
    setLaunchStrategy(prev => prev.map(strategy => 
      strategy.phase === 'soft-launch' 
        ? { 
            ...strategy, 
            status: 'active' as const,
            metrics: {
              ...strategy.metrics,
              actualUsers: 500,
              actualRevenue: 5000
            }
          }
        : strategy
    ));
    
    setIsLaunching(false);
  };

  const startMonitoring = async () => {
    setIsMonitoring(true);
    
    // Simulate monitoring setup
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    setIsMonitoring(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'deployed': case 'completed': case 'active': case 'success': return 'bg-green-100 text-green-800';
      case 'deploying': case 'in-progress': case 'running': return 'bg-blue-100 text-blue-800';
      case 'pending': case 'planned': return 'bg-yellow-100 text-yellow-800';
      case 'failed': case 'error': return 'bg-red-100 text-red-800';
      case 'paused': case 'expired': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPhaseColor = (phase: string): string => {
    switch (phase) {
      case 'pre-launch': return 'bg-blue-100 text-blue-800';
      case 'soft-launch': return 'bg-green-100 text-green-800';
      case 'public-launch': return 'bg-purple-100 text-purple-800';
      case 'scale': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEnvironments = environments.length;
  const deployedEnvironments = environments.filter(e => e.status === 'deployed').length;
  const completedChecklistItems = launchChecklist.reduce((sum, cat) => 
    sum + cat.items.filter(item => item.status === 'completed').length, 0);
  const totalChecklistItems = launchChecklist.reduce((sum, cat) => sum + cat.items.length, 0);
  const activeAlerts = monitoringAlerts.filter(alert => !alert.resolved).length;
  const currentUsers = launchMetrics[0]?.metrics.totalUsers || 0;
  const targetUsers = launchMetrics[0]?.goals.targetUsers || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🚀 Production Deployment & Launch</h2>
              <p className="text-green-100 mt-1">Deploy SyncScript to production and launch the ultimate productivity platform</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Launch Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Deployment Status</p>
                  <p className="text-2xl font-bold text-green-800">{deployedEnvironments}/{totalEnvironments}</p>
                  <p className="text-xs text-green-600">Environments deployed</p>
                </div>
                <Rocket className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Launch Readiness</p>
                  <p className="text-2xl font-bold text-blue-800">{completedChecklistItems}/{totalChecklistItems}</p>
                  <p className="text-xs text-blue-600">Checklist items</p>
                </div>
                <CheckCircle className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Current Users</p>
                  <p className="text-2xl font-bold text-purple-800">{currentUsers}</p>
                  <p className="text-xs text-purple-600">of {targetUsers} target</p>
                </div>
                <Users className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Active Alerts</p>
                  <p className="text-2xl font-bold text-orange-800">{activeAlerts}</p>
                  <p className="text-xs text-orange-600">Monitoring alerts</p>
                </div>
                <AlertTriangle className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* Launch Actions */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6 border-2 border-green-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-green-700 font-medium">
                🎯 Ready for Production Launch - SyncScript is production-ready and optimized!
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={deployToProduction}
                  disabled={isDeploying}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isDeploying ? '⏳ Deploying...' : '🚀 Deploy to Production'}
                </button>
                <button
                  onClick={launchPlatform}
                  disabled={isLaunching}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isLaunching ? '⏳ Launching...' : '🎉 Launch Platform'}
                </button>
                <button
                  onClick={startMonitoring}
                  disabled={isMonitoring}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isMonitoring ? '⏳ Starting...' : '📊 Start Monitoring'}
                </button>
              </div>
            </div>
          </div>

          {/* Deployment Environments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Globe className="mr-2 text-green-600" />
              Deployment Environments ({environments.length})
            </h3>
            <div className="space-y-4">
              {environments.map((env) => (
                <div key={env.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{env.name}</h4>
                      <p className="text-sm text-gray-600">{env.url}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(env.status)}`}>
                        {env.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        v{env.version}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(env.sslStatus)}`}>
                        SSL: {env.sslStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Health Score:</span>
                      <span className="font-medium text-gray-900 ml-1">{env.healthScore}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Uptime:</span>
                      <span className="font-medium text-gray-900 ml-1">{env.uptime}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Response Time:</span>
                      <span className="font-medium text-gray-900 ml-1">{env.metrics.responseTime}ms</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Last Deployed:</span>
                      <span className="text-gray-500 ml-1">{formatDate(env.lastDeployed)}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Infrastructure:</span> {env.infrastructure.frontend}, {env.infrastructure.backend}, {env.infrastructure.database}, {env.infrastructure.cdn}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Launch Checklist */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="mr-2 text-blue-600" />
              Launch Readiness Checklist
            </h3>
            <div className="space-y-4">
              {launchChecklist.map((category) => (
                <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">{category.category}</h4>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            item.status === 'completed' ? 'bg-green-500' : 
                            item.status === 'in-progress' ? 'bg-blue-500' : 
                            item.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}>
                            {item.status === 'completed' && <CheckCircle className="w-3 h-3 text-white" />}
                            {item.status === 'in-progress' && <Clock className="w-3 h-3 text-white" />}
                            {item.status === 'pending' && <Clock className="w-3 h-3 text-white" />}
                            {item.status === 'failed' && <AlertTriangle className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-sm ${item.critical ? 'font-semibold' : ''}`}>
                            {item.description}
                          </span>
                          {item.critical && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Critical</span>}
                          <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(item.priority)} bg-gray-100`}>
                            {item.priority} priority
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          <span className="text-xs text-gray-500">{item.assignedTo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Launch Strategy */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="mr-2 text-purple-600" />
              Launch Strategy ({launchStrategy.length})
            </h3>
            <div className="space-y-4">
              {launchStrategy.map((strategy) => (
                <div key={strategy.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{strategy.name}</h4>
                      <p className="text-sm text-gray-600">{strategy.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPhaseColor(strategy.phase)}`}>
                        {strategy.phase}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(strategy.status)}`}>
                        {strategy.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Users:</span>
                      <span className="font-medium text-gray-900 ml-1">{strategy.metrics.actualUsers}/{strategy.metrics.usersTarget}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-gray-900 ml-1">${strategy.metrics.actualRevenue.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Performance:</span>
                      <span className="font-medium text-gray-900 ml-1">{strategy.metrics.actualPerformance}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="text-gray-500 ml-1">
                        {strategy.endDate ? 
                          `${Math.ceil((strategy.endDate.getTime() - strategy.startDate.getTime()) / (1000 * 60 * 60 * 24))} days` : 
                          'Ongoing'
                        }
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Activities:</span> {strategy.activities.filter(a => a.status === 'completed').length}/{strategy.activities.length} completed
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Monitor className="mr-2 text-orange-600" />
              Monitoring Alerts ({monitoringAlerts.length})
            </h3>
            <div className="space-y-3">
              {monitoringAlerts.map((alert) => (
                <div key={alert.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.resolved ? 'completed' : 'pending')}`}>
                        {alert.resolved ? 'resolved' : 'active'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Component: {alert.component}</span>
                    <span>{formatDate(alert.timestamp)}</span>
                  </div>
                  
                  {alert.actionRequired && (
                    <div className="mt-2 text-xs text-red-600 font-medium">
                      ⚠️ Action Required
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductionDeploymentLaunch;
