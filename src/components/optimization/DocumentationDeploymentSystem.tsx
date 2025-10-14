import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Documentation {
  id: string;
  title: string;
  description: string;
  type: 'api' | 'user-guide' | 'developer' | 'deployment' | 'troubleshooting';
  status: 'published' | 'draft' | 'review' | 'archived';
  lastUpdated: Date;
  version: string;
  author: string;
  views: number;
  rating: number;
  tags: string[];
}

interface Deployment {
  id: string;
  name: string;
  environment: 'production' | 'staging' | 'development';
  status: 'success' | 'failed' | 'running' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  version: string;
  commit: string;
  branch: string;
  author: string;
  changes: string[];
  rollbackAvailable: boolean;
}

interface Monitoring {
  id: string;
  name: string;
  type: 'uptime' | 'performance' | 'error' | 'security';
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  value: number;
  threshold: number;
  unit: string;
  lastChecked: Date;
  trend: 'up' | 'down' | 'stable';
}

interface ProductionReadiness {
  id: string;
  category: string;
  status: 'ready' | 'warning' | 'blocked';
  checks: {
    name: string;
    status: 'pass' | 'fail' | 'warning';
    description: string;
  }[];
  score: number;
}

const DocumentationDeploymentSystem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [documentation, setDocumentation] = useState<Documentation[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [monitoring, setMonitoring] = useState<Monitoring[]>([]);
  const [productionReadiness, setProductionReadiness] = useState<ProductionReadiness[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isGeneratingDocs, setIsGeneratingDocs] = useState(false);

  // Generate documentation and deployment data
  useEffect(() => {
    const generateDocumentation = (): Documentation[] => {
      return [
        {
          id: 'doc-1',
          title: 'API Reference',
          description: 'Complete API documentation with endpoints, parameters, and examples',
          type: 'api',
          status: 'published',
          lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          version: '2.1.0',
          author: 'Dev Team',
          views: 15420,
          rating: 4.8,
          tags: ['api', 'reference', 'endpoints']
        },
        {
          id: 'doc-2',
          title: 'User Guide',
          description: 'Comprehensive guide for end users',
          type: 'user-guide',
          status: 'published',
          lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          version: '2.1.0',
          author: 'Product Team',
          views: 8930,
          rating: 4.6,
          tags: ['user', 'guide', 'tutorial']
        },
        {
          id: 'doc-3',
          title: 'Developer Setup',
          description: 'Development environment setup and configuration',
          type: 'developer',
          status: 'published',
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          version: '2.1.0',
          author: 'Dev Team',
          views: 4560,
          rating: 4.9,
          tags: ['development', 'setup', 'configuration']
        },
        {
          id: 'doc-4',
          title: 'Deployment Guide',
          description: 'Production deployment procedures and best practices',
          type: 'deployment',
          status: 'published',
          lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          version: '2.1.0',
          author: 'DevOps Team',
          views: 2340,
          rating: 4.7,
          tags: ['deployment', 'production', 'devops']
        },
        {
          id: 'doc-5',
          title: 'Troubleshooting',
          description: 'Common issues and solutions',
          type: 'troubleshooting',
          status: 'published',
          lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          version: '2.1.0',
          author: 'Support Team',
          views: 6780,
          rating: 4.5,
          tags: ['troubleshooting', 'issues', 'solutions']
        },
        {
          id: 'doc-6',
          title: 'Security Best Practices',
          description: 'Security guidelines and recommendations',
          type: 'developer',
          status: 'draft',
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          version: '2.1.0',
          author: 'Security Team',
          views: 0,
          rating: 0,
          tags: ['security', 'best-practices', 'guidelines']
        }
      ];
    };

    const generateDeployments = (): Deployment[] => {
      return [
        {
          id: 'deploy-1',
          name: 'Production Release v2.1.0',
          environment: 'production',
          status: 'success',
          startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
          endTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
          duration: 3600,
          version: '2.1.0',
          commit: 'abc123def456',
          branch: 'main',
          author: 'Dev Team',
          changes: [
            'Added new dashboard features',
            'Fixed authentication bug',
            'Improved performance',
            'Updated dependencies'
          ],
          rollbackAvailable: true
        },
        {
          id: 'deploy-2',
          name: 'Staging Test Build',
          environment: 'staging',
          status: 'running',
          startTime: new Date(Date.now() - 30 * 60 * 1000),
          version: '2.1.1',
          commit: 'def456ghi789',
          branch: 'feature/new-features',
          author: 'Dev Team',
          changes: [
            'Added experimental features',
            'Updated UI components',
            'Enhanced error handling'
          ],
          rollbackAvailable: false
        },
        {
          id: 'deploy-3',
          name: 'Hotfix v2.0.1',
          environment: 'production',
          status: 'success',
          startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1800 * 1000),
          duration: 1800,
          version: '2.0.1',
          commit: 'ghi789jkl012',
          branch: 'hotfix/critical-bug',
          author: 'Dev Team',
          changes: [
            'Fixed critical security vulnerability',
            'Resolved data corruption issue'
          ],
          rollbackAvailable: true
        },
        {
          id: 'deploy-4',
          name: 'Development Build',
          environment: 'development',
          status: 'failed',
          startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
          endTime: new Date(Date.now() - 4 * 60 * 60 * 1000 + 900 * 1000),
          duration: 900,
          version: '2.1.2',
          commit: 'jkl012mno345',
          branch: 'feature/experimental',
          author: 'Dev Team',
          changes: [
            'Added experimental AI features',
            'Updated database schema',
            'Implemented new API endpoints'
          ],
          rollbackAvailable: false
        }
      ];
    };

    const generateMonitoring = (): Monitoring[] => {
      return [
        {
          id: 'monitor-1',
          name: 'API Response Time',
          type: 'performance',
          status: 'healthy',
          value: 245,
          threshold: 500,
          unit: 'ms',
          lastChecked: new Date(Date.now() - 5 * 60 * 1000),
          trend: 'stable'
        },
        {
          id: 'monitor-2',
          name: 'Error Rate',
          type: 'error',
          status: 'warning',
          value: 2.3,
          threshold: 1.0,
          unit: '%',
          lastChecked: new Date(Date.now() - 2 * 60 * 1000),
          trend: 'up'
        },
        {
          id: 'monitor-3',
          name: 'Uptime',
          type: 'uptime',
          status: 'healthy',
          value: 99.9,
          threshold: 99.5,
          unit: '%',
          lastChecked: new Date(Date.now() - 1 * 60 * 1000),
          trend: 'stable'
        },
        {
          id: 'monitor-4',
          name: 'CPU Usage',
          type: 'performance',
          status: 'warning',
          value: 78,
          threshold: 80,
          unit: '%',
          lastChecked: new Date(Date.now() - 3 * 60 * 1000),
          trend: 'up'
        },
        {
          id: 'monitor-5',
          name: 'Memory Usage',
          type: 'performance',
          status: 'healthy',
          value: 65,
          threshold: 85,
          unit: '%',
          lastChecked: new Date(Date.now() - 2 * 60 * 1000),
          trend: 'stable'
        },
        {
          id: 'monitor-6',
          name: 'Security Alerts',
          type: 'security',
          status: 'healthy',
          value: 0,
          threshold: 1,
          unit: 'alerts',
          lastChecked: new Date(Date.now() - 10 * 60 * 1000),
          trend: 'stable'
        }
      ];
    };

    const generateProductionReadiness = (): ProductionReadiness[] => {
      return [
        {
          id: 'readiness-1',
          category: 'Code Quality',
          status: 'ready',
          score: 95,
          checks: [
            {
              name: 'Unit Test Coverage',
              status: 'pass',
              description: 'Coverage above 90%'
            },
            {
              name: 'Code Review',
              status: 'pass',
              description: 'All changes reviewed'
            },
            {
              name: 'Linting',
              status: 'pass',
              description: 'No linting errors'
            },
            {
              name: 'Type Safety',
              status: 'pass',
              description: 'TypeScript strict mode enabled'
            }
          ]
        },
        {
          id: 'readiness-2',
          category: 'Security',
          status: 'ready',
          score: 92,
          checks: [
            {
              name: 'Security Scan',
              status: 'pass',
              description: 'No critical vulnerabilities'
            },
            {
              name: 'Dependency Audit',
              status: 'pass',
              description: 'All dependencies up to date'
            },
            {
              name: 'Authentication',
              status: 'pass',
              description: 'Multi-factor authentication enabled'
            },
            {
              name: 'Data Encryption',
              status: 'warning',
              description: 'Some data not encrypted at rest'
            }
          ]
        },
        {
          id: 'readiness-3',
          category: 'Performance',
          status: 'ready',
          score: 88,
          checks: [
            {
              name: 'Load Testing',
              status: 'pass',
              description: 'Passed load tests'
            },
            {
              name: 'Bundle Size',
              status: 'pass',
              description: 'Bundle size within limits'
            },
            {
              name: 'Response Time',
              status: 'warning',
              description: 'Some endpoints slow'
            },
            {
              name: 'Caching',
              status: 'pass',
              description: 'Caching strategy implemented'
            }
          ]
        },
        {
          id: 'readiness-4',
          category: 'Monitoring',
          status: 'ready',
          score: 90,
          checks: [
            {
              name: 'Error Tracking',
              status: 'pass',
              description: 'Error tracking configured'
            },
            {
              name: 'Performance Monitoring',
              status: 'pass',
              description: 'Performance metrics collected'
            },
            {
              name: 'Logging',
              status: 'pass',
              description: 'Comprehensive logging enabled'
            },
            {
              name: 'Alerting',
              status: 'pass',
              description: 'Alerting rules configured'
            }
          ]
        }
      ];
    };

    setDocumentation(generateDocumentation());
    setDeployments(generateDeployments());
    setMonitoring(generateMonitoring());
    setProductionReadiness(generateProductionReadiness());
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'unknown': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'api': return 'bg-blue-100 text-blue-800';
      case 'user-guide': return 'bg-green-100 text-green-800';
      case 'developer': return 'bg-purple-100 text-purple-800';
      case 'deployment': return 'bg-orange-100 text-orange-800';
      case 'troubleshooting': return 'bg-red-100 text-red-800';
      case 'uptime': return 'bg-green-100 text-green-800';
      case 'performance': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'security': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEnvironmentColor = (env: string): string => {
    switch (env) {
      case 'production': return 'bg-red-100 text-red-800';
      case 'staging': return 'bg-yellow-100 text-yellow-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCheckStatusColor = (status: string): string => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800';
      case 'fail': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string): string => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const deployToProduction = async () => {
    setIsDeploying(true);
    
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setIsDeploying(false);
  };

  const generateDocumentation = async () => {
    setIsGeneratingDocs(true);
    
    // Simulate documentation generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGeneratingDocs(false);
  };

  const totalDocs = documentation.length;
  const publishedDocs = documentation.filter(doc => doc.status === 'published').length;
  const totalViews = documentation.reduce((sum, doc) => sum + doc.views, 0);
  const avgRating = documentation.reduce((sum, doc) => sum + doc.rating, 0) / documentation.length;
  const successfulDeployments = deployments.filter(dep => dep.status === 'success').length;
  const failedDeployments = deployments.filter(dep => dep.status === 'failed').length;
  const healthyMonitors = monitoring.filter(mon => mon.status === 'healthy').length;
  const warningMonitors = monitoring.filter(mon => mon.status === 'warning').length;
  const criticalMonitors = monitoring.filter(mon => mon.status === 'critical').length;
  const readyCategories = productionReadiness.filter(cat => cat.status === 'ready').length;
  const avgReadinessScore = productionReadiness.reduce((sum, cat) => sum + cat.score, 0) / productionReadiness.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">📚 Documentation & Deployment System</h2>
              <p className="text-indigo-100 mt-1">Comprehensive documentation, deployment management, and production readiness</p>
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
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Documentation</p>
                  <p className="text-2xl font-bold text-blue-800">{totalDocs}</p>
                  <p className="text-xs text-blue-600">{publishedDocs} published</p>
                </div>
                <div className="text-3xl">📚</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Deployments</p>
                  <p className="text-2xl font-bold text-green-800">{successfulDeployments}</p>
                  <p className="text-xs text-green-600">{failedDeployments} failed</p>
                </div>
                <div className="text-3xl">🚀</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Monitoring</p>
                  <p className="text-2xl font-bold text-purple-800">{healthyMonitors}</p>
                  <p className="text-xs text-purple-600">{warningMonitors} warnings</p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Readiness</p>
                  <p className="text-2xl font-bold text-orange-800">{avgReadinessScore.toFixed(0)}%</p>
                  <p className="text-xs text-orange-600">{readyCategories} categories ready</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Last deployment: {new Date().toLocaleString()}
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
                  onClick={deployToProduction}
                  disabled={isDeploying}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isDeploying ? '⏳ Deploying...' : '🚀 Deploy to Production'}
                </button>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Documentation ({documentation.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentation.map((doc) => (
                <div key={doc.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{doc.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(doc.type)}`}>
                        {doc.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Version:</span>
                      <span className="font-medium text-gray-900">{doc.version}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Author:</span>
                      <span className="font-medium text-gray-900">{doc.author}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium text-blue-600">{doc.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium text-yellow-600">{doc.rating}/5.0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Updated:</span>
                      <span className="text-gray-500">{formatDate(doc.lastUpdated)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Deployments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Deployments ({deployments.length})</h3>
            <div className="space-y-4">
              {deployments.map((deployment) => (
                <div key={deployment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{deployment.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deployment.status)}`}>
                        {deployment.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEnvironmentColor(deployment.environment)}`}>
                        {deployment.environment}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Version:</span>
                      <span className="font-medium text-gray-900 ml-1">{deployment.version}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Branch:</span>
                      <span className="font-medium text-gray-900 ml-1">{deployment.branch}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Commit:</span>
                      <span className="font-medium text-gray-900 ml-1">{deployment.commit}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Author:</span>
                      <span className="font-medium text-gray-900 ml-1">{deployment.author}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-sm font-medium text-gray-700 mb-1">Changes:</div>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {deployment.changes.map((change, index) => (
                        <li key={index}>{change}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Production Readiness */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Production Readiness ({productionReadiness.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productionReadiness.map((category) => (
                <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{category.category}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(category.status)}`}>
                        {category.status}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{category.score}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {category.checks.map((check, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{check.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCheckStatusColor(check.status)}`}>
                            {check.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">System Monitoring ({monitoring.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Checked</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monitoring.map((monitor) => (
                    <tr key={monitor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {monitor.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(monitor.type)}`}>
                          {monitor.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(monitor.status)}`}>
                          {monitor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {monitor.value} {monitor.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {monitor.threshold} {monitor.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getTrendIcon(monitor.trend)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(monitor.lastChecked)}
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

export default DocumentationDeploymentSystem;
