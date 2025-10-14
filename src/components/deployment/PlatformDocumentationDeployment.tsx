import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Download, Upload, CheckCircle, AlertTriangle, Clock, Settings, Code, Database, Server, Globe, Shield, Zap } from 'lucide-react';

interface DocumentationSection {
  id: string;
  title: string;
  category: 'getting-started' | 'api' | 'deployment' | 'configuration' | 'troubleshooting' | 'advanced';
  content: string;
  codeExamples: string[];
  lastUpdated: Date;
  version: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface DeploymentEnvironment {
  id: string;
  name: string;
  type: 'production' | 'staging' | 'development' | 'testing';
  status: 'active' | 'inactive' | 'deploying' | 'error';
  url: string;
  version: string;
  lastDeployed: Date;
  healthStatus: 'healthy' | 'warning' | 'critical';
  metrics: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
  configuration: {
    environment: string;
    database: string;
    cache: string;
    cdn: string;
    monitoring: string;
  };
}

interface DeploymentScript {
  id: string;
  name: string;
  type: 'build' | 'deploy' | 'migrate' | 'backup' | 'restore' | 'monitor';
  platform: 'vercel' | 'aws' | 'docker' | 'kubernetes' | 'azure' | 'gcp';
  script: string;
  parameters: { name: string; type: string; required: boolean; description: string }[];
  lastRun: Date | null;
  status: 'success' | 'failure' | 'running' | 'pending';
  duration: number | null;
  logs: string[];
}

interface ProductionChecklist {
  id: string;
  category: string;
  items: {
    id: string;
    description: string;
    status: 'completed' | 'pending' | 'failed' | 'skipped';
    critical: boolean;
    notes?: string;
  }[];
}

interface SystemHealth {
  id: string;
  component: string;
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  lastCheck: Date;
  alerts: string[];
}

const PlatformDocumentationDeployment: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [documentation, setDocumentation] = useState<DocumentationSection[]>([]);
  const [deploymentEnvs, setDeploymentEnvs] = useState<DeploymentEnvironment[]>([]);
  const [deploymentScripts, setDeploymentScripts] = useState<DeploymentScript[]>([]);
  const [productionChecklist, setProductionChecklist] = useState<ProductionChecklist[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([]);
  const [isGeneratingDocs, setIsGeneratingDocs] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isRunningScript, setIsRunningScript] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentationSection | null>(null);
  const [selectedEnv, setSelectedEnv] = useState<DeploymentEnvironment | null>(null);

  // Generate documentation data
  useEffect(() => {
    const generateDocumentation = (): DocumentationSection[] => {
      return [
        {
          id: 'doc-1',
          title: 'Getting Started with SyncScript',
          category: 'getting-started',
          content: 'SyncScript is a comprehensive productivity platform that helps teams manage tasks, track energy levels, and collaborate effectively. This guide will help you get started with the platform.',
          codeExamples: [
            'npm install syncscript',
            'import { SyncScript } from "syncscript";',
            'const app = new SyncScript({ apiKey: "your-api-key" });'
          ],
          lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          version: '4.0.0',
          difficulty: 'beginner'
        },
        {
          id: 'doc-2',
          title: 'API Reference',
          category: 'api',
          content: 'Complete API reference for SyncScript including authentication, endpoints, and response formats.',
          codeExamples: [
            'GET /api/v1/tasks',
            'POST /api/v1/tasks',
            'PUT /api/v1/tasks/{id}',
            'DELETE /api/v1/tasks/{id}'
          ],
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          version: '4.0.0',
          difficulty: 'intermediate'
        },
        {
          id: 'doc-3',
          title: 'Deployment Guide',
          category: 'deployment',
          content: 'Step-by-step guide for deploying SyncScript to various platforms including Vercel, AWS, Docker, and Kubernetes.',
          codeExamples: [
            'vercel deploy --prod',
            'docker build -t syncscript .',
            'kubectl apply -f k8s-manifests/',
            'aws ecs create-service --cluster syncscript'
          ],
          lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          version: '4.0.0',
          difficulty: 'advanced'
        },
        {
          id: 'doc-4',
          title: 'Configuration Management',
          category: 'configuration',
          content: 'Comprehensive guide for configuring SyncScript including environment variables, database setup, and integrations.',
          codeExamples: [
            'NEXT_PUBLIC_API_URL=https://api.syncscript.com',
            'DATABASE_URL=postgresql://user:pass@localhost:5432/syncscript',
            'REDIS_URL=redis://localhost:6379',
            'AUTH0_DOMAIN=your-domain.auth0.com'
          ],
          lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          version: '4.0.0',
          difficulty: 'intermediate'
        },
        {
          id: 'doc-5',
          title: 'Troubleshooting Guide',
          category: 'troubleshooting',
          content: 'Common issues and solutions for SyncScript deployment and configuration problems.',
          codeExamples: [
            'npm run build:debug',
            'docker logs syncscript-app',
            'kubectl logs -f deployment/syncscript',
            'vercel logs --follow'
          ],
          lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          version: '4.0.0',
          difficulty: 'intermediate'
        },
        {
          id: 'doc-6',
          title: 'Advanced Features',
          category: 'advanced',
          content: 'Advanced features and customization options for SyncScript including enterprise integrations and white-label solutions.',
          codeExamples: [
            'const sso = new SSOProvider({ type: "saml", endpoint: "..." });',
            'const whiteLabel = new WhiteLabelConfig({ organization: "..." });',
            'const analytics = new EnterpriseAnalytics({ metrics: [...] });'
          ],
          lastUpdated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          version: '4.0.0',
          difficulty: 'advanced'
        }
      ];
    };

    const generateDeploymentEnvs = (): DeploymentEnvironment[] => {
      return [
        {
          id: 'env-1',
          name: 'Production',
          type: 'production',
          status: 'active',
          url: 'https://syncscript.com',
          version: '4.0.0',
          lastDeployed: new Date(Date.now() - 2 * 60 * 60 * 1000),
          healthStatus: 'healthy',
          metrics: {
            uptime: 99.9,
            responseTime: 120,
            errorRate: 0.01,
            throughput: 1500
          },
          configuration: {
            environment: 'production',
            database: 'PostgreSQL 14',
            cache: 'Redis 6',
            cdn: 'Cloudflare',
            monitoring: 'DataDog'
          }
        },
        {
          id: 'env-2',
          name: 'Staging',
          type: 'staging',
          status: 'active',
          url: 'https://staging.syncscript.com',
          version: '4.0.0-rc.1',
          lastDeployed: new Date(Date.now() - 6 * 60 * 60 * 1000),
          healthStatus: 'healthy',
          metrics: {
            uptime: 99.5,
            responseTime: 150,
            errorRate: 0.05,
            throughput: 200
          },
          configuration: {
            environment: 'staging',
            database: 'PostgreSQL 14',
            cache: 'Redis 6',
            cdn: 'Cloudflare',
            monitoring: 'DataDog'
          }
        },
        {
          id: 'env-3',
          name: 'Development',
          type: 'development',
          status: 'active',
          url: 'https://dev.syncscript.com',
          version: '4.0.0-dev',
          lastDeployed: new Date(Date.now() - 30 * 60 * 1000),
          healthStatus: 'warning',
          metrics: {
            uptime: 95.0,
            responseTime: 300,
            errorRate: 0.1,
            throughput: 50
          },
          configuration: {
            environment: 'development',
            database: 'PostgreSQL 13',
            cache: 'Redis 6',
            cdn: 'None',
            monitoring: 'Local'
          }
        }
      ];
    };

    const generateDeploymentScripts = (): DeploymentScript[] => {
      return [
        {
          id: 'script-1',
          name: 'Vercel Production Deploy',
          type: 'deploy',
          platform: 'vercel',
          script: `#!/bin/bash
# SyncScript Production Deployment Script
echo "Starting SyncScript production deployment..."

# Build the application
npm run build

# Run tests
npm run test

# Deploy to Vercel
vercel deploy --prod --token $VERCEL_TOKEN

echo "Deployment completed successfully!"`,
          parameters: [
            { name: 'VERCEL_TOKEN', type: 'string', required: true, description: 'Vercel deployment token' },
            { name: 'NODE_ENV', type: 'string', required: false, description: 'Node environment (default: production)' }
          ],
          lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'success',
          duration: 180,
          logs: [
            'Building application...',
            'Running tests...',
            'Deploying to Vercel...',
            'Deployment completed successfully!'
          ]
        },
        {
          id: 'script-2',
          name: 'Docker Build & Push',
          type: 'build',
          platform: 'docker',
          script: `#!/bin/bash
# SyncScript Docker Build Script
echo "Building SyncScript Docker image..."

# Build Docker image
docker build -t syncscript:latest .

# Tag for registry
docker tag syncscript:latest registry.syncscript.com/syncscript:latest

# Push to registry
docker push registry.syncscript.com/syncscript:latest

echo "Docker build and push completed!"`,
          parameters: [
            { name: 'REGISTRY_URL', type: 'string', required: true, description: 'Docker registry URL' },
            { name: 'IMAGE_TAG', type: 'string', required: false, description: 'Image tag (default: latest)' }
          ],
          lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
          status: 'success',
          duration: 240,
          logs: [
            'Building Docker image...',
            'Tagging image...',
            'Pushing to registry...',
            'Build and push completed!'
          ]
        },
        {
          id: 'script-3',
          name: 'Database Migration',
          type: 'migrate',
          platform: 'kubernetes',
          script: `#!/bin/bash
# Database Migration Script
echo "Running database migration..."

# Run migrations
kubectl exec -it deployment/syncscript-db -- psql -U syncscript -d syncscript -f /migrations/latest.sql

# Verify migration
kubectl exec -it deployment/syncscript-db -- psql -U syncscript -d syncscript -c "SELECT version FROM schema_migrations ORDER BY version DESC LIMIT 1;"

echo "Migration completed successfully!"`,
          parameters: [
            { name: 'DB_HOST', type: 'string', required: true, description: 'Database host' },
            { name: 'DB_NAME', type: 'string', required: true, description: 'Database name' }
          ],
          lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
          status: 'success',
          duration: 45,
          logs: [
            'Running database migration...',
            'Verifying migration...',
            'Migration completed successfully!'
          ]
        }
      ];
    };

    const generateProductionChecklist = (): ProductionChecklist[] => {
      return [
        {
          id: 'checklist-1',
          category: 'Security',
          items: [
            { id: 'sec-1', description: 'SSL certificates configured and valid', status: 'completed', critical: true },
            { id: 'sec-2', description: 'Environment variables secured', status: 'completed', critical: true },
            { id: 'sec-3', description: 'API rate limiting configured', status: 'completed', critical: true },
            { id: 'sec-4', description: 'CORS policies configured', status: 'completed', critical: false },
            { id: 'sec-5', description: 'Security headers implemented', status: 'completed', critical: true }
          ]
        },
        {
          id: 'checklist-2',
          category: 'Performance',
          items: [
            { id: 'perf-1', description: 'CDN configured for static assets', status: 'completed', critical: true },
            { id: 'perf-2', description: 'Database indexes optimized', status: 'completed', critical: true },
            { id: 'perf-3', description: 'Caching strategy implemented', status: 'completed', critical: true },
            { id: 'perf-4', description: 'Bundle size optimized', status: 'completed', critical: false },
            { id: 'perf-5', description: 'Image optimization enabled', status: 'completed', critical: false }
          ]
        },
        {
          id: 'checklist-3',
          category: 'Monitoring',
          items: [
            { id: 'mon-1', description: 'Application monitoring configured', status: 'completed', critical: true },
            { id: 'mon-2', description: 'Error tracking enabled', status: 'completed', critical: true },
            { id: 'mon-3', description: 'Performance monitoring active', status: 'completed', critical: true },
            { id: 'mon-4', description: 'Log aggregation configured', status: 'completed', critical: false },
            { id: 'mon-5', description: 'Alerting rules configured', status: 'completed', critical: true }
          ]
        },
        {
          id: 'checklist-4',
          category: 'Backup & Recovery',
          items: [
            { id: 'backup-1', description: 'Database backup strategy implemented', status: 'completed', critical: true },
            { id: 'backup-2', description: 'File storage backup configured', status: 'completed', critical: true },
            { id: 'backup-3', description: 'Disaster recovery plan documented', status: 'completed', critical: true },
            { id: 'backup-4', description: 'Backup restoration tested', status: 'pending', critical: true },
            { id: 'backup-5', description: 'Recovery time objectives defined', status: 'completed', critical: false }
          ]
        }
      ];
    };

    const generateSystemHealth = (): SystemHealth[] => {
      return [
        {
          id: 'health-1',
          component: 'Frontend (Vercel)',
          status: 'healthy',
          metrics: { cpu: 25, memory: 45, disk: 60, network: 80 },
          lastCheck: new Date(Date.now() - 2 * 60 * 1000),
          alerts: []
        },
        {
          id: 'health-2',
          component: 'Backend (Render)',
          status: 'warning',
          metrics: { cpu: 75, memory: 85, disk: 45, network: 90 },
          lastCheck: new Date(Date.now() - 1 * 60 * 1000),
          alerts: ['High memory usage detected']
        },
        {
          id: 'health-3',
          component: 'Database (PostgreSQL)',
          status: 'healthy',
          metrics: { cpu: 30, memory: 50, disk: 70, network: 60 },
          lastCheck: new Date(Date.now() - 30 * 1000),
          alerts: []
        },
        {
          id: 'health-4',
          component: 'Cache (Redis)',
          status: 'healthy',
          metrics: { cpu: 20, memory: 35, disk: 40, network: 95 },
          lastCheck: new Date(Date.now() - 45 * 1000),
          alerts: []
        },
        {
          id: 'health-5',
          component: 'CDN (Cloudflare)',
          status: 'healthy',
          metrics: { cpu: 10, memory: 15, disk: 25, network: 98 },
          lastCheck: new Date(Date.now() - 1 * 60 * 1000),
          alerts: []
        }
      ];
    };

    setDocumentation(generateDocumentation());
    setDeploymentEnvs(generateDeploymentEnvs());
    setDeploymentScripts(generateDeploymentScripts());
    setProductionChecklist(generateProductionChecklist());
    setSystemHealth(generateSystemHealth());
  }, []);

  const generateDocumentation = async () => {
    setIsGeneratingDocs(true);
    
    // Simulate documentation generation
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    setIsGeneratingDocs(false);
  };

  const deployToEnvironment = async (envId: string) => {
    setIsDeploying(true);
    
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Update environment
    setDeploymentEnvs(prev => prev.map(env => 
      env.id === envId 
        ? { 
            ...env, 
            lastDeployed: new Date(), 
            status: 'active' as const,
            version: '4.0.1'
          }
        : env
    ));
    
    setIsDeploying(false);
  };

  const runDeploymentScript = async (scriptId: string) => {
    setIsRunningScript(true);
    
    // Simulate script execution
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    // Update script status
    setDeploymentScripts(prev => prev.map(script => 
      script.id === scriptId 
        ? { 
            ...script, 
            lastRun: new Date(), 
            status: 'success' as const,
            duration: Math.floor(Math.random() * 300) + 60
          }
        : script
    ));
    
    setIsRunningScript(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'healthy': case 'active': case 'completed': case 'success': return 'bg-green-100 text-green-800';
      case 'warning': case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'critical': case 'failed': case 'error': return 'bg-red-100 text-red-800';
      case 'running': case 'deploying': return 'bg-blue-100 text-blue-800';
      case 'inactive': case 'skipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDocs = documentation.length;
  const completedChecklistItems = productionChecklist.reduce((sum, cat) => 
    sum + cat.items.filter(item => item.status === 'completed').length, 0);
  const totalChecklistItems = productionChecklist.reduce((sum, cat) => sum + cat.items.length, 0);
  const healthyComponents = systemHealth.filter(comp => comp.status === 'healthy').length;
  const totalComponents = systemHealth.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">📚 Platform Documentation & Deployment</h2>
              <p className="text-blue-100 mt-1">Complete documentation system, deployment automation, and production readiness</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Documentation</p>
                  <p className="text-2xl font-bold text-blue-800">{totalDocs}</p>
                  <p className="text-xs text-blue-600">Sections available</p>
                </div>
                <BookOpen className="text-3xl text-blue-600" />
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

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">System Health</p>
                  <p className="text-2xl font-bold text-purple-800">{healthyComponents}/{totalComponents}</p>
                  <p className="text-xs text-purple-600">Healthy components</p>
                </div>
                <Shield className="text-3xl text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Deployment Scripts</p>
                  <p className="text-2xl font-bold text-orange-800">{deploymentScripts.length}</p>
                  <p className="text-xs text-orange-600">Available scripts</p>
                </div>
                <Code className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Platform management and deployment tools
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={generateDocumentation}
                  disabled={isGeneratingDocs}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingDocs ? '⏳ Generating...' : '📚 Generate Docs'}
                </button>
                <button
                  onClick={() => deployToEnvironment('env-1')}
                  disabled={isDeploying}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isDeploying ? '⏳ Deploying...' : '🚀 Deploy to Prod'}
                </button>
                <button
                  onClick={() => runDeploymentScript('script-1')}
                  disabled={isRunningScript}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningScript ? '⏳ Running...' : '⚡ Run Script'}
                </button>
              </div>
            </div>
          </div>

          {/* Documentation Sections */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Documentation ({documentation.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentation.map((doc) => (
                <div key={doc.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{doc.title}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(doc.difficulty)}`}>
                      {doc.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{doc.content}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>v{doc.version}</span>
                    <span>{formatDate(doc.lastUpdated)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Environments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Deployment Environments ({deploymentEnvs.length})</h3>
            <div className="space-y-4">
              {deploymentEnvs.map((env) => (
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
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(env.healthStatus)}`}>
                        {env.healthStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Version:</span>
                      <span className="font-medium text-gray-900 ml-1">{env.version}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Uptime:</span>
                      <span className="font-medium text-gray-900 ml-1">{env.metrics.uptime}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Response:</span>
                      <span className="font-medium text-gray-900 ml-1">{env.metrics.responseTime}ms</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Last Deployed:</span>
                      <span className="text-gray-500 ml-1">{formatDate(env.lastDeployed)}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Configuration:</span> {env.configuration.database}, {env.configuration.cache}, {env.configuration.cdn}
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

          {/* System Health */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">System Health ({systemHealth.length})</h3>
            <div className="space-y-3">
              {systemHealth.map((component) => (
                <div key={component.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-800">{component.component}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(component.status)}`}>
                      {component.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-2">
                    <div className="text-sm">
                      <span className="text-gray-600">CPU:</span>
                      <span className="font-medium text-gray-900 ml-1">{component.metrics.cpu}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Memory:</span>
                      <span className="font-medium text-gray-900 ml-1">{component.metrics.memory}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Disk:</span>
                      <span className="font-medium text-gray-900 ml-1">{component.metrics.disk}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Network:</span>
                      <span className="font-medium text-gray-900 ml-1">{component.metrics.network}%</span>
                    </div>
                  </div>

                  {component.alerts.length > 0 && (
                    <div className="text-sm text-red-600">
                      <span className="font-medium">Alerts:</span> {component.alerts.join(', ')}
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

export default PlatformDocumentationDeployment;
