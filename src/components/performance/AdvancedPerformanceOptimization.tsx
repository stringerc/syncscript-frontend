import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetric {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'network' | 'memory' | 'cpu';
  current: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: Date;
  description: string;
  recommendations: string[];
  historicalData: {
    timestamp: Date;
    value: number;
  }[];
}

interface BundleAnalysis {
  id: string;
  name: string;
  size: number;
  gzippedSize: number;
  dependencies: string[];
  chunks: {
    name: string;
    size: number;
    modules: number;
  }[];
  optimization: {
    treeShaking: boolean;
    minification: boolean;
    codeSplitting: boolean;
    lazyLoading: boolean;
  };
  recommendations: string[];
}

interface CacheStrategy {
  id: string;
  name: string;
  type: 'memory' | 'disk' | 'cdn' | 'database';
  hitRate: number;
  missRate: number;
  size: number;
  maxSize: number;
  ttl: number;
  lastCleared: Date;
  performance: {
    averageHitTime: number;
    averageMissTime: number;
    totalRequests: number;
  };
}

interface PerformanceAlert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  category: 'performance' | 'memory' | 'network' | 'bundle';
  message: string;
  timestamp: Date;
  resolved: boolean;
  actionRequired: string;
}

interface OptimizationTask {
  id: string;
  title: string;
  category: 'bundle' | 'caching' | 'rendering' | 'network' | 'memory';
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
  results?: {
    before: number;
    after: number;
    improvement: number;
  };
}

const AdvancedPerformanceOptimization: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [bundleAnalysis, setBundleAnalysis] = useState<BundleAnalysis[]>([]);
  const [cacheStrategies, setCacheStrategies] = useState<CacheStrategy[]>([]);
  const [performanceAlerts, setPerformanceAlerts] = useState<PerformanceAlert[]>([]);
  const [optimizationTasks, setOptimizationTasks] = useState<OptimizationTask[]>([]);
  const [isAnalyzingPerformance, setIsAnalyzingPerformance] = useState(false);
  const [isOptimizingBundle, setIsOptimizingBundle] = useState(false);
  const [isRunningCacheOptimization, setIsRunningCacheOptimization] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<PerformanceMetric | null>(null);
  const [realTimeMetrics, setRealTimeMetrics] = useState(true);

  // Generate performance data
  useEffect(() => {
    const generatePerformanceMetrics = (): PerformanceMetric[] => {
      return [
        {
          id: 'perf-1',
          name: 'First Contentful Paint (FCP)',
          category: 'frontend',
          current: 1.2,
          target: 1.8,
          unit: 'seconds',
          status: 'excellent',
          trend: 'improving',
          lastUpdated: new Date(),
          description: 'Time to first contentful paint',
          recommendations: [
            'Optimize critical CSS',
            'Implement resource hints',
            'Use preload for critical resources'
          ],
          historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
            value: 1.2 + Math.random() * 0.4
          }))
        },
        {
          id: 'perf-2',
          name: 'Largest Contentful Paint (LCP)',
          category: 'frontend',
          current: 2.1,
          target: 2.5,
          unit: 'seconds',
          status: 'excellent',
          trend: 'stable',
          lastUpdated: new Date(),
          description: 'Time to largest contentful paint',
          recommendations: [
            'Optimize images with WebP format',
            'Implement lazy loading',
            'Use CDN for static assets'
          ],
          historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
            value: 2.1 + Math.random() * 0.3
          }))
        },
        {
          id: 'perf-3',
          name: 'Cumulative Layout Shift (CLS)',
          category: 'frontend',
          current: 0.05,
          target: 0.1,
          unit: 'score',
          status: 'excellent',
          trend: 'improving',
          lastUpdated: new Date(),
          description: 'Visual stability metric',
          recommendations: [
            'Reserve space for dynamic content',
            'Avoid inserting content above existing content',
            'Use transform animations instead of layout changes'
          ],
          historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
            value: 0.05 + Math.random() * 0.02
          }))
        },
        {
          id: 'perf-4',
          name: 'First Input Delay (FID)',
          category: 'frontend',
          current: 45,
          target: 100,
          unit: 'ms',
          status: 'excellent',
          trend: 'stable',
          lastUpdated: new Date(),
          description: 'Time to first user interaction',
          recommendations: [
            'Reduce JavaScript execution time',
            'Break up long tasks',
            'Use web workers for heavy computations'
          ],
          historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
            value: 45 + Math.random() * 20
          }))
        },
        {
          id: 'perf-5',
          name: 'Time to Interactive (TTI)',
          category: 'frontend',
          current: 2.8,
          target: 3.8,
          unit: 'seconds',
          status: 'good',
          trend: 'improving',
          lastUpdated: new Date(),
          description: 'Time until page is fully interactive',
          recommendations: [
            'Implement code splitting',
            'Use lazy loading for non-critical components',
            'Optimize third-party scripts'
          ],
          historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
            value: 2.8 + Math.random() * 0.5
          }))
        },
        {
          id: 'perf-6',
          name: 'Memory Usage',
          category: 'memory',
          current: 85,
          target: 100,
          unit: 'MB',
          status: 'warning',
          trend: 'declining',
          lastUpdated: new Date(),
          description: 'Browser memory consumption',
          recommendations: [
            'Implement memory leak detection',
            'Optimize React component re-renders',
            'Add memory monitoring alerts'
          ],
          historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
            value: 85 + Math.random() * 10
          }))
        },
        {
          id: 'perf-7',
          name: 'Bundle Size',
          category: 'frontend',
          current: 2.1,
          target: 3.0,
          unit: 'MB',
          status: 'good',
          trend: 'stable',
          lastUpdated: new Date(),
          description: 'Total JavaScript bundle size',
          recommendations: [
            'Remove unused dependencies',
            'Implement tree shaking',
            'Split vendor and application bundles'
          ],
          historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
            value: 2.1 + Math.random() * 0.3
          }))
        },
        {
          id: 'perf-8',
          name: 'API Response Time',
          category: 'network',
          current: 180,
          target: 500,
          unit: 'ms',
          status: 'excellent',
          trend: 'stable',
          lastUpdated: new Date(),
          description: 'Average API response time',
          recommendations: [
            'Implement Redis caching',
            'Optimize database queries',
            'Add response compression'
          ],
          historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
            value: 180 + Math.random() * 50
          }))
        }
      ];
    };

    const generateBundleAnalysis = (): BundleAnalysis[] => {
      return [
        {
          id: 'bundle-1',
          name: 'Main Application Bundle',
          size: 2100000,
          gzippedSize: 650000,
          dependencies: ['react', 'next', 'framer-motion', 'tailwindcss'],
          chunks: [
            { name: 'main', size: 1200000, modules: 45 },
            { name: 'vendor', size: 800000, modules: 12 },
            { name: 'common', size: 100000, modules: 8 }
          ],
          optimization: {
            treeShaking: true,
            minification: true,
            codeSplitting: true,
            lazyLoading: true
          },
          recommendations: [
            'Split large components into smaller chunks',
            'Implement dynamic imports for heavy libraries',
            'Optimize image loading with next/image'
          ]
        },
        {
          id: 'bundle-2',
          name: 'Dashboard Bundle',
          size: 1800000,
          gzippedSize: 520000,
          dependencies: ['react', 'framer-motion', 'lucide-react'],
          chunks: [
            { name: 'dashboard', size: 1000000, modules: 35 },
            { name: 'components', size: 600000, modules: 20 },
            { name: 'utils', size: 200000, modules: 15 }
          ],
          optimization: {
            treeShaking: true,
            minification: true,
            codeSplitting: true,
            lazyLoading: false
          },
          recommendations: [
            'Enable lazy loading for dashboard components',
            'Split feature-specific bundles',
            'Optimize component imports'
          ]
        }
      ];
    };

    const generateCacheStrategies = (): CacheStrategy[] => {
      return [
        {
          id: 'cache-1',
          name: 'Browser Cache',
          type: 'memory',
          hitRate: 0.85,
          missRate: 0.15,
          size: 50,
          maxSize: 100,
          ttl: 3600,
          lastCleared: new Date(Date.now() - 2 * 60 * 60 * 1000),
          performance: {
            averageHitTime: 5,
            averageMissTime: 150,
            totalRequests: 15420
          }
        },
        {
          id: 'cache-2',
          name: 'API Response Cache',
          type: 'memory',
          hitRate: 0.72,
          missRate: 0.28,
          size: 25,
          maxSize: 50,
          ttl: 1800,
          lastCleared: new Date(Date.now() - 1 * 60 * 60 * 1000),
          performance: {
            averageHitTime: 8,
            averageMissTime: 180,
            totalRequests: 8920
          }
        },
        {
          id: 'cache-3',
          name: 'Static Asset Cache',
          type: 'cdn',
          hitRate: 0.95,
          missRate: 0.05,
          size: 200,
          maxSize: 500,
          ttl: 86400,
          lastCleared: new Date(Date.now() - 24 * 60 * 60 * 1000),
          performance: {
            averageHitTime: 12,
            averageMissTime: 300,
            totalRequests: 45680
          }
        }
      ];
    };

    const generatePerformanceAlerts = (): PerformanceAlert[] => {
      return [
        {
          id: 'alert-1',
          severity: 'warning',
          category: 'memory',
          message: 'Memory usage is approaching threshold (85MB/100MB)',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          resolved: false,
          actionRequired: 'Consider implementing memory optimization strategies'
        },
        {
          id: 'alert-2',
          severity: 'info',
          category: 'performance',
          message: 'Bundle size has increased by 5% in the last deployment',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          resolved: true,
          actionRequired: 'Monitor bundle size trends'
        },
        {
          id: 'alert-3',
          severity: 'error',
          category: 'network',
          message: 'API response time exceeded 500ms threshold',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          resolved: false,
          actionRequired: 'Investigate backend performance issues'
        }
      ];
    };

    const generateOptimizationTasks = (): OptimizationTask[] => {
      return [
        {
          id: 'opt-1',
          title: 'Implement Service Worker Caching',
          category: 'caching',
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
          title: 'Optimize Bundle Splitting',
          category: 'bundle',
          priority: 'medium',
          impact: 'medium',
          effort: 'high',
          description: 'Implement advanced code splitting and lazy loading',
          benefits: [
            'Faster initial load',
            'Better caching',
            'Reduced memory usage',
            'Improved performance'
          ],
          implementation: [
            'Analyze current bundle structure',
            'Implement dynamic imports',
            'Split vendor and app bundles',
            'Add lazy loading for routes'
          ],
          estimatedTime: '1-2 weeks',
          status: 'in_progress',
          assignedTo: 'Frontend Team',
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'opt-3',
          title: 'Memory Leak Detection',
          category: 'memory',
          priority: 'critical',
          impact: 'high',
          effort: 'low',
          description: 'Implement automated memory leak detection and monitoring',
          benefits: [
            'Prevent memory leaks',
            'Better performance stability',
            'Reduced crashes',
            'Improved user experience'
          ],
          implementation: [
            'Add memory monitoring',
            'Implement leak detection',
            'Create alerting system',
            'Add cleanup mechanisms'
          ],
          estimatedTime: '1 day',
          status: 'completed',
          results: {
            before: 95,
            after: 85,
            improvement: 10.5
          }
        },
        {
          id: 'opt-4',
          title: 'Image Optimization',
          category: 'rendering',
          priority: 'medium',
          impact: 'medium',
          effort: 'medium',
          description: 'Implement advanced image optimization and lazy loading',
          benefits: [
            'Faster image loading',
            'Reduced bandwidth usage',
            'Better LCP scores',
            'Improved user experience'
          ],
          implementation: [
            'Convert images to WebP format',
            'Implement lazy loading',
            'Add responsive images',
            'Optimize image compression'
          ],
          estimatedTime: '3-5 days',
          status: 'pending'
        }
      ];
    };

    setPerformanceMetrics(generatePerformanceMetrics());
    setBundleAnalysis(generateBundleAnalysis());
    setCacheStrategies(generateCacheStrategies());
    setPerformanceAlerts(generatePerformanceAlerts());
    setOptimizationTasks(generateOptimizationTasks());
  }, []);

  // Real-time metrics simulation
  useEffect(() => {
    if (!realTimeMetrics) return;

    const interval = setInterval(() => {
      setPerformanceMetrics(prev => prev.map(metric => ({
        ...metric,
        current: metric.current * (0.95 + Math.random() * 0.1), // Simulate small variations
        lastUpdated: new Date(),
        historicalData: [
          ...metric.historicalData.slice(1),
          { timestamp: new Date(), value: metric.current }
        ]
      })));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [realTimeMetrics]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
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
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Update performance metrics with improvements
    setPerformanceMetrics(prev => prev.map(metric => ({
      ...metric,
      current: metric.current * 0.95, // Simulate 5% improvement
      lastUpdated: new Date(),
      trend: 'improving' as const
    })));
    
    setIsAnalyzingPerformance(false);
  };

  const optimizeBundle = async () => {
    setIsOptimizingBundle(true);
    
    // Simulate bundle optimization
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update bundle analysis
    setBundleAnalysis(prev => prev.map(bundle => ({
      ...bundle,
      size: bundle.size * 0.9, // Simulate 10% size reduction
      gzippedSize: bundle.gzippedSize * 0.9
    })));
    
    setIsOptimizingBundle(false);
  };

  const runCacheOptimization = async () => {
    setIsRunningCacheOptimization(true);
    
    // Simulate cache optimization
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    // Update cache strategies
    setCacheStrategies(prev => prev.map(cache => ({
      ...cache,
      hitRate: Math.min(0.95, cache.hitRate + 0.05), // Improve hit rate
      missRate: Math.max(0.05, cache.missRate - 0.05)
    })));
    
    setIsRunningCacheOptimization(false);
  };

  const totalMetrics = performanceMetrics.length;
  const excellentMetrics = performanceMetrics.filter(m => m.status === 'excellent').length;
  const warningMetrics = performanceMetrics.filter(m => m.status === 'warning').length;
  const criticalMetrics = performanceMetrics.filter(m => m.status === 'critical').length;
  const avgPerformance = performanceMetrics.reduce((sum, m) => sum + (m.current / m.target), 0) / totalMetrics;
  const totalBundleSize = bundleAnalysis.reduce((sum, b) => sum + b.size, 0);
  const totalCacheHitRate = cacheStrategies.reduce((sum, c) => sum + c.hitRate, 0) / cacheStrategies.length;
  const pendingOptimizations = optimizationTasks.filter(o => o.status === 'pending').length;
  const activeAlerts = performanceAlerts.filter(a => !a.resolved).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">⚡ Advanced Performance Optimization</h2>
              <p className="text-blue-100 mt-1">Real-time performance monitoring, bundle optimization, and caching strategies</p>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={realTimeMetrics}
                  onChange={(e) => setRealTimeMetrics(e.target.checked)}
                  className="rounded"
                />
                <span>Real-time Metrics</span>
              </label>
              <button
                onClick={onClose}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Performance Score</p>
                  <p className="text-2xl font-bold text-green-800">{(avgPerformance * 100).toFixed(0)}%</p>
                  <p className="text-xs text-green-600">Average vs targets</p>
                </div>
                <div className="text-3xl">⚡</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Bundle Size</p>
                  <p className="text-2xl font-bold text-blue-800">{formatBytes(totalBundleSize)}</p>
                  <p className="text-xs text-blue-600">Total size</p>
                </div>
                <div className="text-3xl">📦</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Cache Hit Rate</p>
                  <p className="text-2xl font-bold text-purple-800">{(totalCacheHitRate * 100).toFixed(0)}%</p>
                  <p className="text-xs text-purple-600">Average hit rate</p>
                </div>
                <div className="text-3xl">💾</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Active Alerts</p>
                  <p className="text-2xl font-bold text-orange-800">{activeAlerts}</p>
                  <p className="text-xs text-orange-600">Performance issues</p>
                </div>
                <div className="text-3xl">🚨</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Performance optimization and monitoring tools
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={analyzePerformance}
                  disabled={isAnalyzingPerformance}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isAnalyzingPerformance ? '⏳ Analyzing...' : '🔍 Analyze Performance'}
                </button>
                <button
                  onClick={optimizeBundle}
                  disabled={isOptimizingBundle}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isOptimizingBundle ? '⏳ Optimizing...' : '📦 Optimize Bundle'}
                </button>
                <button
                  onClick={runCacheOptimization}
                  disabled={isRunningCacheOptimization}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningCacheOptimization ? '⏳ Optimizing...' : '💾 Optimize Cache'}
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

          {/* Bundle Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Bundle Analysis ({bundleAnalysis.length})</h3>
            <div className="space-y-4">
              {bundleAnalysis.map((bundle) => (
                <div key={bundle.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{bundle.name}</h4>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {formatBytes(bundle.size)}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {formatBytes(bundle.gzippedSize)} gzipped
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Dependencies:</span>
                        <span className="font-medium text-gray-900 ml-1">{bundle.dependencies.length}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Chunks:</span>
                        <span className="font-medium text-gray-900 ml-1">{bundle.chunks.length}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Modules:</span>
                        <span className="font-medium text-gray-900 ml-1">
                          {bundle.chunks.reduce((sum, chunk) => sum + chunk.modules, 0)}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Compression:</span>
                        <span className="font-medium text-gray-900 ml-1">
                          {((1 - bundle.gzippedSize / bundle.size) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Optimization Status:</div>
                      <div className="flex space-x-2">
                        {Object.entries(bundle.optimization).map(([key, value]) => (
                          <span
                            key={key}
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {key}: {value ? '✅' : '❌'}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Recommendations:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {bundle.recommendations.map((rec, index) => (
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

          {/* Optimization Tasks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Optimization Tasks ({optimizationTasks.length})</h3>
            <div className="space-y-4">
              {optimizationTasks.map((task) => (
                <div key={task.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{task.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {task.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{task.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Impact:</span>
                        <span className="font-medium text-gray-900 ml-1">{task.impact}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Effort:</span>
                        <span className="font-medium text-gray-900 ml-1">{task.effort}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium text-gray-900 ml-1">{task.estimatedTime}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Assigned:</span>
                        <span className="font-medium text-gray-900 ml-1">{task.assignedTo || 'Unassigned'}</span>
                      </div>
                    </div>
                    
                    {task.results && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                        <div className="text-sm font-medium text-green-800 mb-1">Results:</div>
                        <div className="text-sm text-green-700">
                          Before: {task.results.before} → After: {task.results.after} 
                          ({task.results.improvement > 0 ? '+' : ''}{task.results.improvement}% improvement)
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Benefits:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {task.benefits.map((benefit, index) => (
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
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedPerformanceOptimization;
