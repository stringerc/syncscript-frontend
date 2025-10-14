import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Globe, Shield, Database, Server, CheckCircle, AlertTriangle, Clock, Settings, Code, BarChart3, Rocket, Cpu, HardDrive, Wifi, Activity } from 'lucide-react';

interface OptimizationMetric {
  id: string;
  name: string;
  category: 'performance' | 'security' | 'reliability' | 'scalability' | 'monitoring';
  currentValue: number;
  targetValue: number;
  unit: string;
  status: 'optimal' | 'warning' | 'critical' | 'improving';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
  description: string;
}

interface ProductionDeployment {
  id: string;
  name: string;
  environment: 'production' | 'staging' | 'development';
  status: 'deployed' | 'deploying' | 'failed' | 'pending';
  version: string;
  url: string;
  lastDeployed: Date;
  deploymentTime: number;
  healthScore: number;
  metrics: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    throughput: number;
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
  };
  infrastructure: {
    frontend: string;
    backend: string;
    database: string;
    cache: string;
    cdn: string;
    monitoring: string;
  };
}

interface ProductionChecklist {
  id: string;
  category: string;
  items: {
    id: string;
    description: string;
    status: 'completed' | 'pending' | 'failed' | 'skipped';
    critical: boolean;
    impact: 'high' | 'medium' | 'low';
    lastChecked: Date;
    notes?: string;
  }[];
}

interface SystemAlert {
  id: string;
  type: 'performance' | 'security' | 'error' | 'capacity' | 'maintenance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  resolved: boolean;
  component: string;
  metrics: Record<string, any>;
}

interface DeploymentPipeline {
  id: string;
  name: string;
  stages: {
    id: string;
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    duration: number;
    logs: string[];
    artifacts: string[];
  }[];
  status: 'running' | 'completed' | 'failed' | 'pending';
  startTime: Date;
  endTime: Date | null;
  triggeredBy: string;
  environment: string;
}

const FinalPlatformOptimization: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [optimizationMetrics, setOptimizationMetrics] = useState<OptimizationMetric[]>([]);
  const [productionDeployments, setProductionDeployments] = useState<ProductionDeployment[]>([]);
  const [productionChecklist, setProductionChecklist] = useState<ProductionChecklist[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [deploymentPipelines, setDeploymentPipelines] = useState<DeploymentPipeline[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<OptimizationMetric | null>(null);
  const [selectedDeployment, setSelectedDeployment] = useState<ProductionDeployment | null>(null);

  // Generate optimization data
  useEffect(() => {
    const generateOptimizationMetrics = (): OptimizationMetric[] => {
      return [
        {
          id: 'perf-1',
          name: 'Core Web Vitals',
          category: 'performance',
          currentValue: 95,
          targetValue: 90,
          unit: 'score',
          status: 'optimal',
          trend: 'up',
          lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
          description: 'Google Core Web Vitals performance score'
        },
        {
          id: 'perf-2',
          name: 'Bundle Size',
          category: 'performance',
          currentValue: 1.2,
          targetValue: 1.5,
          unit: 'MB',
          status: 'optimal',
          trend: 'down',
          lastUpdated: new Date(Date.now() - 10 * 60 * 1000),
          description: 'JavaScript bundle size after optimization'
        },
        {
          id: 'perf-3',
          name: 'API Response Time',
          category: 'performance',
          currentValue: 120,
          targetValue: 200,
          unit: 'ms',
          status: 'optimal',
          trend: 'down',
          lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
          description: 'Average API response time'
        },
        {
          id: 'sec-1',
          name: 'Security Score',
          category: 'security',
          currentValue: 98,
          targetValue: 95,
          unit: 'score',
          status: 'optimal',
          trend: 'up',
          lastUpdated: new Date(Date.now() - 15 * 60 * 1000),
          description: 'Overall security assessment score'
        },
        {
          id: 'sec-2',
          name: 'Vulnerability Count',
          category: 'security',
          currentValue: 0,
          targetValue: 0,
          unit: 'count',
          status: 'optimal',
          trend: 'stable',
          lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
          description: 'Number of known security vulnerabilities'
        },
        {
          id: 'rel-1',
          name: 'Uptime',
          category: 'reliability',
          currentValue: 99.9,
          targetValue: 99.5,
          unit: '%',
          status: 'optimal',
          trend: 'up',
          lastUpdated: new Date(Date.now() - 1 * 60 * 1000),
          description: 'System uptime percentage'
        },
        {
          id: 'rel-2',
          name: 'Error Rate',
          category: 'reliability',
          currentValue: 0.01,
          targetValue: 0.1,
          unit: '%',
          status: 'optimal',
          trend: 'down',
          lastUpdated: new Date(Date.now() - 3 * 60 * 1000),
          description: 'Application error rate'
        },
        {
          id: 'scale-1',
          name: 'Concurrent Users',
          category: 'scalability',
          currentValue: 5000,
          targetValue: 10000,
          unit: 'users',
          status: 'warning',
          trend: 'up',
          lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
          description: 'Maximum concurrent users supported'
        },
        {
          id: 'mon-1',
          name: 'Monitoring Coverage',
          category: 'monitoring',
          currentValue: 100,
          targetValue: 95,
          unit: '%',
          status: 'optimal',
          trend: 'stable',
          lastUpdated: new Date(Date.now() - 10 * 60 * 1000),
          description: 'Percentage of system components monitored'
        }
      ];
    };

    const generateProductionDeployments = (): ProductionDeployment[] => {
      return [
        {
          id: 'prod-1',
          name: 'SyncScript Production',
          environment: 'production',
          status: 'deployed',
          version: '4.0.0',
          url: 'https://syncscript.com',
          lastDeployed: new Date(Date.now() - 2 * 60 * 60 * 1000),
          deploymentTime: 180,
          healthScore: 98,
          metrics: {
            uptime: 99.9,
            responseTime: 120,
            errorRate: 0.01,
            throughput: 1500,
            cpuUsage: 45,
            memoryUsage: 60,
            diskUsage: 35
          },
          infrastructure: {
            frontend: 'Vercel',
            backend: 'Render',
            database: 'PostgreSQL 14',
            cache: 'Redis 6',
            cdn: 'Cloudflare',
            monitoring: 'DataDog'
          }
        },
        {
          id: 'staging-1',
          name: 'SyncScript Staging',
          environment: 'staging',
          status: 'deployed',
          version: '4.0.0-rc.1',
          url: 'https://staging.syncscript.com',
          lastDeployed: new Date(Date.now() - 6 * 60 * 60 * 1000),
          deploymentTime: 120,
          healthScore: 95,
          metrics: {
            uptime: 99.5,
            responseTime: 150,
            errorRate: 0.05,
            throughput: 200,
            cpuUsage: 30,
            memoryUsage: 45,
            diskUsage: 25
          },
          infrastructure: {
            frontend: 'Vercel',
            backend: 'Render',
            database: 'PostgreSQL 14',
            cache: 'Redis 6',
            cdn: 'Cloudflare',
            monitoring: 'DataDog'
          }
        }
      ];
    };

    const generateProductionChecklist = (): ProductionChecklist[] => {
      return [
        {
          id: 'checklist-1',
          category: 'Performance Optimization',
          items: [
            { id: 'perf-1', description: 'Core Web Vitals optimized (LCP, FID, CLS)', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 1 * 60 * 60 * 1000) },
            { id: 'perf-2', description: 'Bundle size optimized and code-split', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 2 * 60 * 60 * 1000) },
            { id: 'perf-3', description: 'Image optimization and lazy loading', status: 'completed', critical: false, impact: 'medium', lastChecked: new Date(Date.now() - 3 * 60 * 60 * 1000) },
            { id: 'perf-4', description: 'CDN configured for static assets', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 4 * 60 * 60 * 1000) },
            { id: 'perf-5', description: 'Database queries optimized', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 5 * 60 * 60 * 1000) }
          ]
        },
        {
          id: 'checklist-2',
          category: 'Security & Compliance',
          items: [
            { id: 'sec-1', description: 'SSL certificates valid and configured', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 1 * 60 * 60 * 1000) },
            { id: 'sec-2', description: 'Security headers implemented (CSP, HSTS)', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 2 * 60 * 60 * 1000) },
            { id: 'sec-3', description: 'API rate limiting configured', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 3 * 60 * 60 * 1000) },
            { id: 'sec-4', description: 'Vulnerability scanning completed', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 4 * 60 * 60 * 1000) },
            { id: 'sec-5', description: 'Compliance frameworks validated', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 5 * 60 * 60 * 1000) }
          ]
        },
        {
          id: 'checklist-3',
          category: 'Monitoring & Observability',
          items: [
            { id: 'mon-1', description: 'Application monitoring configured', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 1 * 60 * 60 * 1000) },
            { id: 'mon-2', description: 'Error tracking and alerting setup', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 2 * 60 * 60 * 1000) },
            { id: 'mon-3', description: 'Performance monitoring active', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 3 * 60 * 60 * 1000) },
            { id: 'mon-4', description: 'Log aggregation configured', status: 'completed', critical: false, impact: 'medium', lastChecked: new Date(Date.now() - 4 * 60 * 60 * 1000) },
            { id: 'mon-5', description: 'Health checks and uptime monitoring', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 5 * 60 * 60 * 1000) }
          ]
        },
        {
          id: 'checklist-4',
          category: 'Deployment & Infrastructure',
          items: [
            { id: 'deploy-1', description: 'Production deployment pipeline tested', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 1 * 60 * 60 * 1000) },
            { id: 'deploy-2', description: 'Database migrations validated', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 2 * 60 * 60 * 1000) },
            { id: 'deploy-3', description: 'Backup and recovery procedures tested', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 3 * 60 * 60 * 1000) },
            { id: 'deploy-4', description: 'Load balancing and auto-scaling configured', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 4 * 60 * 60 * 1000) },
            { id: 'deploy-5', description: 'Disaster recovery plan documented', status: 'completed', critical: true, impact: 'high', lastChecked: new Date(Date.now() - 5 * 60 * 60 * 1000) }
          ]
        }
      ];
    };

    const generateSystemAlerts = (): SystemAlert[] => {
      return [
        {
          id: 'alert-1',
          type: 'performance',
          severity: 'low',
          title: 'High Memory Usage Detected',
          description: 'Memory usage on staging environment is above 80%',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          resolved: false,
          component: 'Backend Server',
          metrics: { memoryUsage: 85, cpuUsage: 45 }
        },
        {
          id: 'alert-2',
          type: 'capacity',
          severity: 'medium',
          title: 'Approaching User Limit',
          description: 'Concurrent users approaching 80% of capacity',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          resolved: false,
          component: 'Load Balancer',
          metrics: { concurrentUsers: 4000, maxCapacity: 5000 }
        },
        {
          id: 'alert-3',
          type: 'error',
          severity: 'high',
          title: 'API Error Rate Spike',
          description: 'Error rate increased to 0.5% in the last 10 minutes',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          resolved: true,
          component: 'API Gateway',
          metrics: { errorRate: 0.5, requestCount: 1000 }
        }
      ];
    };

    const generateDeploymentPipelines = (): DeploymentPipeline[] => {
      return [
        {
          id: 'pipeline-1',
          name: 'Production Deployment Pipeline',
          stages: [
            {
              id: 'stage-1',
              name: 'Build',
              status: 'completed',
              duration: 120,
              logs: ['Installing dependencies...', 'Building application...', 'Running tests...', 'Build completed successfully'],
              artifacts: ['syncscript-frontend.tar.gz', 'syncscript-backend.tar.gz']
            },
            {
              id: 'stage-2',
              name: 'Test',
              status: 'completed',
              duration: 180,
              logs: ['Running unit tests...', 'Running integration tests...', 'Running E2E tests...', 'All tests passed'],
              artifacts: ['test-results.xml', 'coverage-report.html']
            },
            {
              id: 'stage-3',
              name: 'Security Scan',
              status: 'completed',
              duration: 90,
              logs: ['Running vulnerability scan...', 'Checking dependencies...', 'Security scan completed'],
              artifacts: ['security-report.json']
            },
            {
              id: 'stage-4',
              name: 'Deploy',
              status: 'completed',
              duration: 240,
              logs: ['Deploying to production...', 'Running migrations...', 'Health checks passed', 'Deployment successful'],
              artifacts: ['deployment-log.txt']
            }
          ],
          status: 'completed',
          startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
          endTime: new Date(Date.now() - 2 * 60 * 60 * 1000 + 630 * 1000),
          triggeredBy: 'admin@syncscript.com',
          environment: 'production'
        }
      ];
    };

    setOptimizationMetrics(generateOptimizationMetrics());
    setProductionDeployments(generateProductionDeployments());
    setProductionChecklist(generateProductionChecklist());
    setSystemAlerts(generateSystemAlerts());
    setDeploymentPipelines(generateDeploymentPipelines());
  }, []);

  const runOptimization = async () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    // Update metrics
    setOptimizationMetrics(prev => prev.map(metric => ({
      ...metric,
      currentValue: Math.min(metric.currentValue + Math.random() * 5, metric.targetValue + 10),
      status: 'optimal' as const,
      lastUpdated: new Date()
    })));
    
    setIsOptimizing(false);
  };

  const deployToProduction = async () => {
    setIsDeploying(true);
    
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Update deployment
    setProductionDeployments(prev => prev.map(deployment => 
      deployment.environment === 'production' 
        ? { 
            ...deployment, 
            lastDeployed: new Date(), 
            version: '4.0.1',
            status: 'deployed' as const,
            healthScore: 99
          }
        : deployment
    ));
    
    setIsDeploying(false);
  };

  const runDeploymentPipeline = async () => {
    setIsRunningPipeline(true);
    
    // Simulate pipeline execution
    await new Promise(resolve => setTimeout(resolve, 20000));
    
    // Update pipeline
    const newPipeline: DeploymentPipeline = {
      id: `pipeline-${Date.now()}`,
      name: 'Production Deployment Pipeline',
      stages: [
        { id: 'stage-1', name: 'Build', status: 'completed', duration: 120, logs: ['Build completed'], artifacts: [] },
        { id: 'stage-2', name: 'Test', status: 'completed', duration: 180, logs: ['Tests passed'], artifacts: [] },
        { id: 'stage-3', name: 'Security Scan', status: 'completed', duration: 90, logs: ['Security scan passed'], artifacts: [] },
        { id: 'stage-4', name: 'Deploy', status: 'completed', duration: 240, logs: ['Deployment successful'], artifacts: [] }
      ],
      status: 'completed',
      startTime: new Date(Date.now() - 20 * 60 * 1000),
      endTime: new Date(),
      triggeredBy: 'system',
      environment: 'production'
    };
    
    setDeploymentPipelines(prev => [newPipeline, ...prev]);
    setIsRunningPipeline(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'optimal': case 'completed': case 'deployed': case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': case 'pending': case 'running': return 'bg-yellow-100 text-yellow-800';
      case 'critical': case 'failed': case 'error': return 'bg-red-100 text-red-800';
      case 'improving': case 'deploying': return 'bg-blue-100 text-blue-800';
      case 'skipped': case 'inactive': return 'bg-gray-100 text-gray-800';
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

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const totalMetrics = optimizationMetrics.length;
  const optimalMetrics = optimizationMetrics.filter(m => m.status === 'optimal').length;
  const completedChecklistItems = productionChecklist.reduce((sum, cat) => 
    sum + cat.items.filter(item => item.status === 'completed').length, 0);
  const totalChecklistItems = productionChecklist.reduce((sum, cat) => sum + cat.items.length, 0);
  const activeAlerts = systemAlerts.filter(alert => !alert.resolved).length;
  const completedPipelines = deploymentPipelines.filter(pipe => pipe.status === 'completed').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🚀 Final Platform Optimization & Production Deployment</h2>
              <p className="text-purple-100 mt-1">Ultimate platform optimization, production deployment, and final platform completion</p>
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
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Optimization</p>
                  <p className="text-2xl font-bold text-purple-800">{optimalMetrics}/{totalMetrics}</p>
                  <p className="text-xs text-purple-600">Optimal metrics</p>
                </div>
                <Zap className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Production Ready</p>
                  <p className="text-2xl font-bold text-green-800">{completedChecklistItems}/{totalChecklistItems}</p>
                  <p className="text-xs text-green-600">Checklist items</p>
                </div>
                <CheckCircle className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Deployments</p>
                  <p className="text-2xl font-bold text-blue-800">{completedPipelines}</p>
                  <p className="text-xs text-blue-600">Successful pipelines</p>
                </div>
                <Rocket className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">System Alerts</p>
                  <p className="text-2xl font-bold text-orange-800">{activeAlerts}</p>
                  <p className="text-xs text-orange-600">Active alerts</p>
                </div>
                <AlertTriangle className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Final platform optimization and production deployment tools
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={runOptimization}
                  disabled={isOptimizing}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isOptimizing ? '⏳ Optimizing...' : '⚡ Run Optimization'}
                </button>
                <button
                  onClick={deployToProduction}
                  disabled={isDeploying}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isDeploying ? '⏳ Deploying...' : '🚀 Deploy to Production'}
                </button>
                <button
                  onClick={runDeploymentPipeline}
                  disabled={isRunningPipeline}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningPipeline ? '⏳ Running...' : '🔄 Run Pipeline'}
                </button>
              </div>
            </div>
          </div>

          {/* Optimization Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Optimization Metrics ({optimizationMetrics.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {optimizationMetrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(metric.status)}`}>
                      {metric.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current:</span>
                      <span className="font-medium text-gray-900">{metric.currentValue} {metric.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Target:</span>
                      <span className="font-medium text-gray-900">{metric.targetValue} {metric.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Trend:</span>
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} {metric.trend}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Production Deployments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Production Deployments ({productionDeployments.length})</h3>
            <div className="space-y-4">
              {productionDeployments.map((deployment) => (
                <div key={deployment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{deployment.name}</h4>
                      <p className="text-sm text-gray-600">{deployment.url}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deployment.status)}`}>
                        {deployment.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        v{deployment.version}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Health Score:</span>
                      <span className="font-medium text-gray-900 ml-1">{deployment.healthScore}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Uptime:</span>
                      <span className="font-medium text-gray-900 ml-1">{deployment.metrics.uptime}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Response Time:</span>
                      <span className="font-medium text-gray-900 ml-1">{deployment.metrics.responseTime}ms</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Last Deployed:</span>
                      <span className="text-gray-500 ml-1">{formatDate(deployment.lastDeployed)}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Infrastructure:</span> {deployment.infrastructure.frontend}, {deployment.infrastructure.backend}, {deployment.infrastructure.database}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Production Checklist */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Production Readiness Checklist</h3>
            <div className="space-y-4">
              {productionChecklist.map((category) => (
                <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">{category.category}</h4>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            item.status === 'completed' ? 'bg-green-500' : 
                            item.status === 'pending' ? 'bg-yellow-500' : 
                            item.status === 'failed' ? 'bg-red-500' : 'bg-gray-400'
                          }`}>
                            {item.status === 'completed' && <CheckCircle className="w-3 h-3 text-white" />}
                            {item.status === 'pending' && <Clock className="w-3 h-3 text-white" />}
                            {item.status === 'failed' && <AlertTriangle className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-sm ${item.critical ? 'font-semibold' : ''}`}>
                            {item.description}
                          </span>
                          {item.critical && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Critical</span>}
                          <span className={`text-xs px-2 py-1 rounded ${getImpactColor(item.impact)} bg-gray-100`}>
                            {item.impact} impact
                          </span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">System Alerts ({systemAlerts.length})</h3>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FinalPlatformOptimization;
