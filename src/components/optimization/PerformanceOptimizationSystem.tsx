import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  description: string;
  recommendations: string[];
}

interface BundleAnalysis {
  name: string;
  size: number;
  gzippedSize: number;
  dependencies: number;
  chunks: number;
  loadTime: number;
  optimization: {
    treeShaking: boolean;
    codeSplitting: boolean;
    lazyLoading: boolean;
    compression: boolean;
  };
}

interface PerformanceOptimization {
  id: string;
  name: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  estimatedSavings: {
    bundleSize: number;
    loadTime: number;
    runtime: number;
  };
  implementation: string[];
}

const PerformanceOptimizationSystem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [bundleAnalysis, setBundleAnalysis] = useState<BundleAnalysis[]>([]);
  const [optimizations, setOptimizations] = useState<PerformanceOptimization[]>([]);
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Generate performance data
  useEffect(() => {
    const generateMetrics = (): PerformanceMetric[] => {
      return [
        {
          id: 'bundle-size',
          name: 'Bundle Size',
          value: 644,
          unit: 'KB',
          target: 500,
          status: 'warning',
          trend: 'down',
          description: 'Total JavaScript bundle size',
          recommendations: [
            'Implement code splitting for large components',
            'Remove unused dependencies',
            'Optimize third-party libraries'
          ]
        },
        {
          id: 'first-load',
          name: 'First Load JS',
          value: 644,
          unit: 'KB',
          target: 400,
          status: 'warning',
          trend: 'down',
          description: 'Initial JavaScript payload',
          recommendations: [
            'Enable lazy loading for non-critical components',
            'Implement route-based code splitting',
            'Optimize critical rendering path'
          ]
        },
        {
          id: 'load-time',
          name: 'Load Time',
          value: 2.3,
          unit: 's',
          target: 2.0,
          status: 'good',
          trend: 'down',
          description: 'Time to interactive',
          recommendations: [
            'Preload critical resources',
            'Optimize images and assets',
            'Implement service worker caching'
          ]
        },
        {
          id: 'runtime-performance',
          name: 'Runtime Performance',
          value: 85,
          unit: '%',
          target: 90,
          status: 'good',
          trend: 'up',
          description: 'Core Web Vitals score',
          recommendations: [
            'Optimize component re-renders',
            'Implement React.memo for expensive components',
            'Use useMemo and useCallback strategically'
          ]
        },
        {
          id: 'memory-usage',
          name: 'Memory Usage',
          value: 45,
          unit: 'MB',
          target: 50,
          status: 'excellent',
          trend: 'stable',
          description: 'Peak memory consumption',
          recommendations: [
            'Implement proper cleanup in useEffect',
            'Avoid memory leaks in event listeners',
            'Optimize large data structures'
          ]
        },
        {
          id: 'cache-hit-rate',
          name: 'Cache Hit Rate',
          value: 78,
          unit: '%',
          target: 80,
          status: 'excellent',
          trend: 'up',
          description: 'Browser cache effectiveness',
          recommendations: [
            'Implement aggressive caching strategies',
            'Use CDN for static assets',
            'Optimize cache headers'
          ]
        }
      ];
    };

    const generateBundleAnalysis = (): BundleAnalysis[] => {
      return [
        {
          name: 'Main Bundle',
          size: 247000,
          gzippedSize: 85000,
          dependencies: 45,
          chunks: 8,
          loadTime: 1200,
          optimization: {
            treeShaking: true,
            codeSplitting: true,
            lazyLoading: false,
            compression: true
          }
        },
        {
          name: 'Dashboard Bundle',
          size: 483000,
          gzippedSize: 165000,
          dependencies: 78,
          chunks: 12,
          loadTime: 2100,
          optimization: {
            treeShaking: true,
            codeSplitting: false,
            lazyLoading: false,
            compression: true
          }
        },
        {
          name: 'Vendor Bundle',
          size: 201000,
          gzippedSize: 72000,
          dependencies: 156,
          chunks: 4,
          loadTime: 800,
          optimization: {
            treeShaking: true,
            codeSplitting: true,
            lazyLoading: true,
            compression: true
          }
        },
        {
          name: 'Analytics Bundle',
          size: 174000,
          gzippedSize: 62000,
          dependencies: 23,
          chunks: 3,
          loadTime: 900,
          optimization: {
            treeShaking: true,
            codeSplitting: true,
            lazyLoading: true,
            compression: true
          }
        }
      ];
    };

    const generateOptimizations = (): PerformanceOptimization[] => {
      return [
        {
          id: 'code-splitting',
          name: 'Implement Route-Based Code Splitting',
          description: 'Split code by routes to reduce initial bundle size',
          impact: 'high',
          effort: 'medium',
          status: 'pending',
          estimatedSavings: {
            bundleSize: 150000,
            loadTime: 800,
            runtime: 15
          },
          implementation: [
            'Convert pages to dynamic imports',
            'Implement React.lazy for components',
            'Add Suspense boundaries',
            'Optimize loading states'
          ]
        },
        {
          id: 'lazy-loading',
          name: 'Enable Component Lazy Loading',
          description: 'Load non-critical components on demand',
          impact: 'high',
          effort: 'low',
          status: 'pending',
          estimatedSavings: {
            bundleSize: 200000,
            loadTime: 1200,
            runtime: 20
          },
          implementation: [
            'Identify non-critical components',
            'Convert to lazy-loaded components',
            'Implement loading skeletons',
            'Add error boundaries'
          ]
        },
        {
          id: 'bundle-optimization',
          name: 'Optimize Bundle Dependencies',
          description: 'Remove unused dependencies and optimize imports',
          impact: 'medium',
          effort: 'low',
          status: 'pending',
          estimatedSavings: {
            bundleSize: 50000,
            loadTime: 300,
            runtime: 8
          },
          implementation: [
            'Audit package dependencies',
            'Remove unused imports',
            'Optimize third-party libraries',
            'Implement tree shaking'
          ]
        },
        {
          id: 'image-optimization',
          name: 'Optimize Images and Assets',
          description: 'Compress and optimize static assets',
          impact: 'medium',
          effort: 'medium',
          status: 'pending',
          estimatedSavings: {
            bundleSize: 30000,
            loadTime: 500,
            runtime: 10
          },
          implementation: [
            'Convert images to WebP format',
            'Implement responsive images',
            'Add image compression',
            'Use CDN for assets'
          ]
        },
        {
          id: 'caching-strategy',
          name: 'Implement Advanced Caching',
          description: 'Improve caching strategies for better performance',
          impact: 'high',
          effort: 'medium',
          status: 'pending',
          estimatedSavings: {
            bundleSize: 0,
            loadTime: 1000,
            runtime: 25
          },
          implementation: [
            'Implement service worker',
            'Add aggressive caching headers',
            'Optimize cache invalidation',
            'Use CDN caching'
          ]
        },
        {
          id: 'runtime-optimization',
          name: 'Optimize Runtime Performance',
          description: 'Improve component rendering and state management',
          impact: 'medium',
          effort: 'high',
          status: 'pending',
          estimatedSavings: {
            bundleSize: 0,
            loadTime: 200,
            runtime: 30
          },
          implementation: [
            'Implement React.memo for components',
            'Optimize useCallback and useMemo',
            'Reduce unnecessary re-renders',
            'Implement virtual scrolling'
          ]
        }
      ];
    };

    setMetrics(generateMetrics());
    setBundleAnalysis(generateBundleAnalysis());
    setOptimizations(generateOptimizations());
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffortColor = (effort: string): string => {
    switch (effort) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOptimizationStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
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

  const getTrendColor = (trend: string): string => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const runPerformanceAnalysis = async () => {
    setIsRunningAnalysis(true);
    
    // Simulate performance analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update metrics with simulated improvements
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.value * (0.95 + Math.random() * 0.1), // 5-15% improvement
      trend: Math.random() > 0.5 ? 'up' : 'down',
      status: metric.value < metric.target ? 'excellent' : metric.status
    })));
    
    setIsRunningAnalysis(false);
  };

  const applyOptimization = async (optimizationId: string) => {
    setIsOptimizing(true);
    
    // Simulate optimization application
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOptimizations(prev => prev.map(opt => 
      opt.id === optimizationId 
        ? { ...opt, status: 'completed' as const }
        : opt
    ));
    
    setIsOptimizing(false);
  };

  const totalBundleSize = bundleAnalysis.reduce((sum, bundle) => sum + bundle.size, 0);
  const totalGzippedSize = bundleAnalysis.reduce((sum, bundle) => sum + bundle.gzippedSize, 0);
  const totalLoadTime = bundleAnalysis.reduce((sum, bundle) => sum + bundle.loadTime, 0);

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
              <h2 className="text-2xl font-bold">⚡ Performance Optimization System</h2>
              <p className="text-purple-100 mt-1">Bundle optimization, performance monitoring, and speed improvements</p>
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
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Bundle</p>
                  <p className="text-2xl font-bold text-blue-800">{formatBytes(totalBundleSize)}</p>
                </div>
                <div className="text-3xl">📦</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Gzipped Size</p>
                  <p className="text-2xl font-bold text-green-800">{formatBytes(totalGzippedSize)}</p>
                </div>
                <div className="text-3xl">🗜️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Load Time</p>
                  <p className="text-2xl font-bold text-purple-800">{(totalLoadTime / 1000).toFixed(1)}s</p>
                </div>
                <div className="text-3xl">⏱️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Optimizations</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {optimizations.filter(o => o.status === 'completed').length}/{optimizations.length}
                  </p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Last analysis: {new Date().toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={runPerformanceAnalysis}
                  disabled={isRunningAnalysis}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningAnalysis ? '⏳ Analyzing...' : '🔍 Run Analysis'}
                </button>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                      <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium text-gray-900">{metric.value} {metric.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium text-blue-600">{metric.target} {metric.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Trend:</span>
                      <span className={`font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.trend}
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.value < metric.target ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min(100, (metric.value / metric.target) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {((metric.value / metric.target) * 100).toFixed(0)}% of target
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Recommendations:</div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {metric.recommendations.map((rec, index) => (
                          <li key={index}>• {rec}</li>
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
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Bundle Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bundle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gzipped</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dependencies</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Load Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimizations</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bundleAnalysis.map((bundle) => (
                    <tr key={bundle.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{bundle.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatBytes(bundle.size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatBytes(bundle.gzippedSize)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {bundle.dependencies}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(bundle.loadTime / 1000).toFixed(1)}s
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex space-x-1">
                          {Object.entries(bundle.optimization).map(([key, value]) => (
                            <span
                              key={key}
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {key}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Optimization Recommendations */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Optimization Recommendations</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effort</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {optimizations.map((optimization) => (
                    <tr key={optimization.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{optimization.name}</div>
                          <div className="text-sm text-gray-500">{optimization.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(optimization.impact)}`}>
                          {optimization.impact}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEffortColor(optimization.effort)}`}>
                          {optimization.effort}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>Bundle: {formatBytes(optimization.estimatedSavings.bundleSize)}</div>
                          <div>Load: {(optimization.estimatedSavings.loadTime / 1000).toFixed(1)}s</div>
                          <div>Runtime: {optimization.estimatedSavings.runtime}%</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOptimizationStatusColor(optimization.status)}`}>
                          {optimization.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => applyOptimization(optimization.id)}
                          disabled={isOptimizing || optimization.status === 'completed'}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                        >
                          {isOptimizing ? 'Optimizing...' : 'Apply'}
                        </button>
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

export default PerformanceOptimizationSystem;
