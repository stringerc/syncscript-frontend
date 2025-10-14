import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetric {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'network' | 'security';
  current: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: Date;
  description: string;
  recommendations: string[];
}

interface CodeQualityMetric {
  id: string;
  name: string;
  category: 'maintainability' | 'reliability' | 'security' | 'performance';
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  issues: {
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    file: string;
    line: number;
    rule: string;
  }[];
  lastAnalyzed: Date;
}

interface DocumentationSection {
  id: string;
  title: string;
  category: 'api' | 'user_guide' | 'developer_guide' | 'architecture' | 'deployment' | 'troubleshooting';
  status: 'complete' | 'in_progress' | 'outdated' | 'missing';
  lastUpdated: Date;
  content: string;
  sections: {
    id: string;
    title: string;
    content: string;
    lastUpdated: Date;
  }[];
  contributors: string[];
  reviewStatus: 'approved' | 'pending' | 'needs_revision';
}

interface OptimizationRecommendation {
  id: string;
  title: string;
  category: 'performance' | 'security' | 'accessibility' | 'seo' | 'code_quality';
  priority: 'low' | 'medium' | 'high' | 'critical';
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  description: string;
  benefits: string[];
  implementation: string[];
  estimatedTime: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  dueDate?: Date;
}

interface SystemHealth {
  overall: 'excellent' | 'good' | 'warning' | 'critical';
  components: {
    name: string;
    status: 'healthy' | 'degraded' | 'down' | 'unknown';
    uptime: number;
    responseTime: number;
    errorRate: number;
    lastCheck: Date;
  }[];
  alerts: {
    id: string;
    severity: 'info' | 'warning' | 'error' | 'critical';
    message: string;
    component: string;
    timestamp: Date;
    resolved: boolean;
  }[];
  metrics: {
    totalRequests: number;
    averageResponseTime: number;
    errorRate: number;
    uptime: number;
    activeUsers: number;
  };
}

const PlatformOptimizationDocumentation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [codeQualityMetrics, setCodeQualityMetrics] = useState<CodeQualityMetric[]>([]);
  const [documentationSections, setDocumentationSections] = useState<DocumentationSection[]>([]);
  const [optimizationRecommendations, setOptimizationRecommendations] = useState<OptimizationRecommendation[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [isAnalyzingPerformance, setIsAnalyzingPerformance] = useState(false);
  const [isGeneratingDocs, setIsGeneratingDocs] = useState(false);
  const [isRunningOptimization, setIsRunningOptimization] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<PerformanceMetric | null>(null);

  // Generate optimization data
  useEffect(() => {
    const generatePerformanceMetrics = (): PerformanceMetric[] => {
      return [
        {
          id: 'perf-1',
          name: 'Page Load Time',
          category: 'frontend',
          current: 1.2,
          target: 2.0,
          unit: 'seconds',
          status: 'excellent',
          trend: 'improving',
          lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
          description: 'Time to load the main dashboard page',
          recommendations: [
            'Implement code splitting for better initial load',
            'Optimize image loading with lazy loading',
            'Enable service worker caching'
          ]
        },
        {
          id: 'perf-2',
          name: 'API Response Time',
          category: 'backend',
          current: 180,
          target: 500,
          unit: 'ms',
          status: 'excellent',
          trend: 'stable',
          lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
          description: 'Average response time for API endpoints',
          recommendations: [
            'Implement Redis caching for frequently accessed data',
            'Optimize database queries',
            'Add response compression'
          ]
        },
        {
          id: 'perf-3',
          name: 'Database Query Time',
          category: 'database',
          current: 45,
          target: 100,
          unit: 'ms',
          status: 'excellent',
          trend: 'improving',
          lastUpdated: new Date(Date.now() - 10 * 60 * 1000),
          description: 'Average time for database queries',
          recommendations: [
            'Add database indexes for frequently queried fields',
            'Implement query result caching',
            'Optimize complex joins'
          ]
        },
        {
          id: 'perf-4',
          name: 'Bundle Size',
          category: 'frontend',
          current: 2.1,
          target: 3.0,
          unit: 'MB',
          status: 'good',
          trend: 'stable',
          lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
          description: 'Total JavaScript bundle size',
          recommendations: [
            'Remove unused dependencies',
            'Implement tree shaking',
            'Split vendor and application bundles'
          ]
        },
        {
          id: 'perf-5',
          name: 'Memory Usage',
          category: 'frontend',
          current: 85,
          target: 90,
          unit: 'MB',
          status: 'warning',
          trend: 'declining',
          lastUpdated: new Date(Date.now() - 1 * 60 * 1000),
          description: 'Browser memory usage during normal operation',
          recommendations: [
            'Implement memory leak detection',
            'Optimize React component re-renders',
            'Add memory monitoring alerts'
          ]
        }
      ];
    };

    const generateCodeQualityMetrics = (): CodeQualityMetric[] => {
      return [
        {
          id: 'quality-1',
          name: 'TypeScript Coverage',
          category: 'maintainability',
          score: 95,
          maxScore: 100,
          status: 'excellent',
          issues: [],
          lastAnalyzed: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: 'quality-2',
          name: 'Test Coverage',
          category: 'reliability',
          score: 87,
          maxScore: 100,
          status: 'good',
          issues: [
            {
              id: 'issue-1',
              severity: 'medium',
              description: 'Missing tests for error handling components',
              file: 'src/components/ErrorBoundary.tsx',
              line: 45,
              rule: 'test-coverage'
            }
          ],
          lastAnalyzed: new Date(Date.now() - 1 * 60 * 60 * 1000)
        },
        {
          id: 'quality-3',
          name: 'Security Scan',
          category: 'security',
          score: 92,
          maxScore: 100,
          status: 'excellent',
          issues: [
            {
              id: 'issue-2',
              severity: 'low',
              description: 'Potential XSS vulnerability in user input',
              file: 'src/components/forms/UserInput.tsx',
              line: 23,
              rule: 'security-xss'
            }
          ],
          lastAnalyzed: new Date(Date.now() - 4 * 60 * 60 * 1000)
        },
        {
          id: 'quality-4',
          name: 'Performance Score',
          category: 'performance',
          score: 78,
          maxScore: 100,
          status: 'good',
          issues: [
            {
              id: 'issue-3',
              severity: 'medium',
              description: 'Large bundle size affecting load time',
              file: 'webpack.config.js',
              line: 12,
              rule: 'performance-bundle'
            }
          ],
          lastAnalyzed: new Date(Date.now() - 3 * 60 * 60 * 1000)
        }
      ];
    };

    const generateDocumentationSections = (): DocumentationSection[] => {
      return [
        {
          id: 'doc-1',
          title: 'API Documentation',
          category: 'api',
          status: 'complete',
          lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          content: 'Comprehensive API documentation with examples and schemas',
          sections: [
            {
              id: 'api-auth',
              title: 'Authentication',
              content: 'OAuth 2.0 and JWT token authentication',
              lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            },
            {
              id: 'api-endpoints',
              title: 'Endpoints',
              content: 'Complete list of API endpoints with parameters and responses',
              lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            }
          ],
          contributors: ['Dev Team', 'API Team'],
          reviewStatus: 'approved'
        },
        {
          id: 'doc-2',
          title: 'User Guide',
          category: 'user_guide',
          status: 'in_progress',
          lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          content: 'Step-by-step guide for end users',
          sections: [
            {
              id: 'user-getting-started',
              title: 'Getting Started',
              content: 'How to create account and basic setup',
              lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            },
            {
              id: 'user-features',
              title: 'Features',
              content: 'Overview of all available features',
              lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            }
          ],
          contributors: ['UX Team', 'Product Team'],
          reviewStatus: 'pending'
        },
        {
          id: 'doc-3',
          title: 'Developer Guide',
          category: 'developer_guide',
          status: 'complete',
          lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          content: 'Technical documentation for developers',
          sections: [
            {
              id: 'dev-setup',
              title: 'Development Setup',
              content: 'How to set up the development environment',
              lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
            },
            {
              id: 'dev-architecture',
              title: 'Architecture',
              content: 'System architecture and design patterns',
              lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
            }
          ],
          contributors: ['Dev Team', 'Architecture Team'],
          reviewStatus: 'approved'
        },
        {
          id: 'doc-4',
          title: 'Deployment Guide',
          category: 'deployment',
          status: 'outdated',
          lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          content: 'Instructions for deploying the application',
          sections: [
            {
              id: 'deploy-production',
              title: 'Production Deployment',
              content: 'Steps for production deployment',
              lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          ],
          contributors: ['DevOps Team'],
          reviewStatus: 'needs_revision'
        }
      ];
    };

    const generateOptimizationRecommendations = (): OptimizationRecommendation[] => {
      return [
        {
          id: 'opt-1',
          title: 'Implement Service Worker Caching',
          category: 'performance',
          priority: 'high',
          impact: 'high',
          effort: 'medium',
          description: 'Add service worker to cache static assets and improve offline experience',
          benefits: [
            'Faster page load times',
            'Offline functionality',
            'Reduced server load',
            'Better user experience'
          ],
          implementation: [
            'Create service worker file',
            'Register service worker in main app',
            'Implement caching strategies',
            'Add offline fallback pages'
          ],
          estimatedTime: '2-3 days',
          status: 'pending'
        },
        {
          id: 'opt-2',
          title: 'Add Database Query Optimization',
          category: 'performance',
          priority: 'medium',
          impact: 'medium',
          effort: 'high',
          description: 'Optimize database queries and add proper indexing',
          benefits: [
            'Faster query execution',
            'Reduced database load',
            'Better scalability',
            'Improved response times'
          ],
          implementation: [
            'Analyze slow queries',
            'Add database indexes',
            'Optimize query structure',
            'Implement query caching'
          ],
          estimatedTime: '1-2 weeks',
          status: 'in_progress',
          assignedTo: 'Backend Team',
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'opt-3',
          title: 'Enhance Security Headers',
          category: 'security',
          priority: 'critical',
          impact: 'high',
          effort: 'low',
          description: 'Add comprehensive security headers to prevent common attacks',
          benefits: [
            'Protection against XSS attacks',
            'Prevention of clickjacking',
            'Enhanced HTTPS security',
            'Better compliance'
          ],
          implementation: [
            'Add Content Security Policy',
            'Implement HSTS headers',
            'Add X-Frame-Options',
            'Configure CORS properly'
          ],
          estimatedTime: '1 day',
          status: 'completed'
        },
        {
          id: 'opt-4',
          title: 'Improve Accessibility Compliance',
          category: 'accessibility',
          priority: 'medium',
          impact: 'medium',
          effort: 'medium',
          description: 'Enhance accessibility features to meet WCAG 2.1 AA standards',
          benefits: [
            'Better user experience for disabled users',
            'Legal compliance',
            'Improved SEO',
            'Broader user base'
          ],
          implementation: [
            'Add ARIA labels',
            'Improve keyboard navigation',
            'Enhance color contrast',
            'Add screen reader support'
          ],
          estimatedTime: '1 week',
          status: 'pending'
        }
      ];
    };

    const generateSystemHealth = (): SystemHealth => {
      return {
        overall: 'good',
        components: [
          {
            name: 'Frontend (Vercel)',
            status: 'healthy',
            uptime: 99.9,
            responseTime: 150,
            errorRate: 0.1,
            lastCheck: new Date(Date.now() - 1 * 60 * 1000)
          },
          {
            name: 'Backend API',
            status: 'healthy',
            uptime: 99.5,
            responseTime: 180,
            errorRate: 0.2,
            lastCheck: new Date(Date.now() - 2 * 60 * 1000)
          },
          {
            name: 'Database',
            status: 'healthy',
            uptime: 99.8,
            responseTime: 45,
            errorRate: 0.05,
            lastCheck: new Date(Date.now() - 5 * 60 * 1000)
          },
          {
            name: 'Auth0',
            status: 'degraded',
            uptime: 98.5,
            responseTime: 300,
            errorRate: 1.2,
            lastCheck: new Date(Date.now() - 3 * 60 * 1000)
          }
        ],
        alerts: [
          {
            id: 'alert-1',
            severity: 'warning',
            message: 'Auth0 response time is higher than usual',
            component: 'Auth0',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            resolved: false
          },
          {
            id: 'alert-2',
            severity: 'info',
            message: 'Scheduled maintenance completed successfully',
            component: 'Database',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            resolved: true
          }
        ],
        metrics: {
          totalRequests: 15420,
          averageResponseTime: 185,
          errorRate: 0.3,
          uptime: 99.7,
          activeUsers: 1247
        }
      };
    };

    setPerformanceMetrics(generatePerformanceMetrics());
    setCodeQualityMetrics(generateCodeQualityMetrics());
    setDocumentationSections(generateDocumentationSections());
    setOptimizationRecommendations(generateOptimizationRecommendations());
    setSystemHealth(generateSystemHealth());
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'complete': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'outdated': return 'bg-orange-100 text-orange-800';
      case 'missing': return 'bg-red-100 text-red-800';
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      case 'down': return 'bg-red-100 text-red-800';
      case 'unknown': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'needs_revision': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string): string => {
    switch (trend) {
      case 'improving': return '📈';
      case 'stable': return '➡️';
      case 'declining': return '📉';
      default: return '❓';
    }
  };

  const analyzePerformance = async () => {
    setIsAnalyzingPerformance(true);
    
    // Simulate performance analysis
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Update performance metrics
    setPerformanceMetrics(prev => prev.map(metric => ({
      ...metric,
      current: metric.current * (0.9 + Math.random() * 0.2), // Simulate improvement
      lastUpdated: new Date()
    })));
    
    setIsAnalyzingPerformance(false);
  };

  const generateDocumentation = async () => {
    setIsGeneratingDocs(true);
    
    // Simulate documentation generation
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    const newDoc: DocumentationSection = {
      id: `doc-${Date.now()}`,
      title: 'Auto-Generated API Documentation',
      category: 'api',
      status: 'complete',
      lastUpdated: new Date(),
      content: 'Automatically generated comprehensive API documentation',
      sections: [
        {
          id: `section-${Date.now()}`,
          title: 'New Endpoints',
          content: 'Documentation for recently added API endpoints',
          lastUpdated: new Date()
        }
      ],
      contributors: ['AI Documentation Generator'],
      reviewStatus: 'pending'
    };
    
    setDocumentationSections(prev => [newDoc, ...prev]);
    setIsGeneratingDocs(false);
  };

  const runOptimization = async () => {
    setIsRunningOptimization(true);
    
    // Simulate optimization execution
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update optimization recommendations
    setOptimizationRecommendations(prev => prev.map(rec => 
      rec.status === 'pending' && rec.priority === 'critical' 
        ? { ...rec, status: 'completed' as const }
        : rec
    ));
    
    setIsRunningOptimization(false);
  };

  const totalMetrics = performanceMetrics.length;
  const excellentMetrics = performanceMetrics.filter(m => m.status === 'excellent').length;
  const warningMetrics = performanceMetrics.filter(m => m.status === 'warning').length;
  const avgCodeQuality = codeQualityMetrics.reduce((sum, m) => sum + m.score, 0) / codeQualityMetrics.length;
  const completeDocs = documentationSections.filter(d => d.status === 'complete').length;
  const pendingOptimizations = optimizationRecommendations.filter(o => o.status === 'pending').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-600 to-gray-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">📚 Platform Optimization & Documentation</h2>
              <p className="text-slate-100 mt-1">Performance monitoring, code quality, and comprehensive documentation</p>
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
          {/* Optimization Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Performance</p>
                  <p className="text-2xl font-bold text-green-800">{excellentMetrics}/{totalMetrics}</p>
                  <p className="text-xs text-green-600">Excellent metrics</p>
                </div>
                <div className="text-3xl">⚡</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Code Quality</p>
                  <p className="text-2xl font-bold text-blue-800">{avgCodeQuality.toFixed(0)}%</p>
                  <p className="text-xs text-blue-600">Average score</p>
                </div>
                <div className="text-3xl">🔍</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Documentation</p>
                  <p className="text-2xl font-bold text-purple-800">{completeDocs}</p>
                  <p className="text-xs text-purple-600">Complete sections</p>
                </div>
                <div className="text-3xl">📖</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Optimizations</p>
                  <p className="text-2xl font-bold text-orange-800">{pendingOptimizations}</p>
                  <p className="text-xs text-orange-600">Pending</p>
                </div>
                <div className="text-3xl">🚀</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">System Health</p>
                  <p className="text-2xl font-bold text-red-800">{systemHealth?.overall || 'unknown'}</p>
                  <p className="text-xs text-red-600">Overall status</p>
                </div>
                <div className="text-3xl">🏥</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Platform optimization and documentation management
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={analyzePerformance}
                  disabled={isAnalyzingPerformance}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isAnalyzingPerformance ? '⏳ Analyzing...' : '⚡ Analyze Performance'}
                </button>
                <button
                  onClick={generateDocumentation}
                  disabled={isGeneratingDocs}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingDocs ? '⏳ Generating...' : '📚 Generate Docs'}
                </button>
                <button
                  onClick={runOptimization}
                  disabled={isRunningOptimization}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningOptimization ? '⏳ Optimizing...' : '🚀 Run Optimization'}
                </button>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Metrics ({performanceMetrics.length})</h3>
            <div className="space-y-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {metric.category}
                      </span>
                      <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{metric.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Current:</span>
                        <span className="font-medium text-gray-900 ml-1">{metric.current}{metric.unit}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Target:</span>
                        <span className="font-medium text-gray-900 ml-1">{metric.target}{metric.unit}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Trend:</span>
                        <span className="font-medium text-gray-900 ml-1">{metric.trend}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Updated:</span>
                        <span className="text-gray-500 ml-1">{formatDate(metric.lastUpdated)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Recommendations:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {metric.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optimization Recommendations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Optimization Recommendations ({optimizationRecommendations.length})</h3>
            <div className="space-y-4">
              {optimizationRecommendations.map((rec) => (
                <div key={rec.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rec.status)}`}>
                        {rec.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {rec.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{rec.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Impact:</span>
                        <span className="font-medium text-gray-900 ml-1">{rec.impact}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Effort:</span>
                        <span className="font-medium text-gray-900 ml-1">{rec.effort}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium text-gray-900 ml-1">{rec.estimatedTime}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Assigned:</span>
                        <span className="font-medium text-gray-900 ml-1">{rec.assignedTo || 'Unassigned'}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Benefits:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {rec.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation Sections */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Documentation Sections ({documentationSections.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documentationSections.map((section) => (
                    <tr key={section.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{section.title}</div>
                          <div className="text-sm text-gray-500">{section.sections.length} subsections</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {section.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(section.status)}`}>
                          {section.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(section.reviewStatus)}`}>
                          {section.reviewStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(section.lastUpdated)}
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

export default PlatformOptimizationDocumentation;
