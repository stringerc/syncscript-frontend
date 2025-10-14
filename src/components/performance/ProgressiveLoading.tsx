import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BundleInfo {
  id: string;
  name: string;
  size: number;
  type: 'main' | 'vendor' | 'chunk' | 'lazy';
  loaded: boolean;
  loadingTime: number;
  dependencies: string[];
  priority: 'high' | 'medium' | 'low';
}

interface LoadingStrategy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  bundles: string[];
  conditions: string[];
}

interface PerformanceMetric {
  metric: string;
  value: number;
  target: number;
  improvement: number;
}

const ProgressiveLoading: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [bundles, setBundles] = useState<BundleInfo[]>([]);
  const [strategies, setStrategies] = useState<LoadingStrategy[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<string>('all');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Generate bundle data
  useEffect(() => {
    const generateBundles = (): BundleInfo[] => {
      const bundleTypes: ('main' | 'vendor' | 'chunk' | 'lazy')[] = ['main', 'vendor', 'chunk', 'lazy'];
      const bundleNames = [
        'main.js', 'vendor.js', 'dashboard.js', 'analytics.js', 'auth.js',
        'task-manager.js', 'energy-selector.js', 'gamification.js', 'settings.js',
        'team-collaboration.js', 'mobile-components.js', 'ai-features.js'
      ];

      return bundleNames.map((name, index) => {
        const type = bundleTypes[Math.floor(Math.random() * bundleTypes.length)];
        const size = Math.random() * 500 + 50; // 50KB to 550KB
        const loaded = Math.random() > 0.3;
        const loadingTime = Math.random() * 2000 + 100; // 100ms to 2100ms
        
        return {
          id: `bundle-${index}`,
          name,
          size,
          type,
          loaded,
          loadingTime,
          dependencies: bundleNames.slice(0, Math.floor(Math.random() * 3)),
          priority: index < 3 ? 'high' : index < 6 ? 'medium' : 'low'
        };
      });
    };

    const generateStrategies = (): LoadingStrategy[] => {
      return [
        {
          id: 'lazy-loading',
          name: 'Lazy Loading',
          description: 'Load components only when needed',
          enabled: true,
          bundles: ['dashboard.js', 'analytics.js', 'settings.js'],
          conditions: ['Route change', 'User interaction', 'Scroll position']
        },
        {
          id: 'code-splitting',
          name: 'Code Splitting',
          description: 'Split code into smaller, manageable chunks',
          enabled: true,
          bundles: ['task-manager.js', 'energy-selector.js', 'gamification.js'],
          conditions: ['Feature usage', 'User role', 'Device type']
        },
        {
          id: 'preloading',
          name: 'Preloading',
          description: 'Preload critical resources',
          enabled: true,
          bundles: ['main.js', 'vendor.js'],
          conditions: ['Idle time', 'Network speed', 'User behavior']
        },
        {
          id: 'tree-shaking',
          name: 'Tree Shaking',
          description: 'Remove unused code from bundles',
          enabled: true,
          bundles: ['vendor.js', 'ai-features.js'],
          conditions: ['Build time', 'Import analysis', 'Dead code detection']
        }
      ];
    };

    const generateMetrics = (): PerformanceMetric[] => {
      return [
        {
          metric: 'Initial Load Time',
          value: 1.2,
          target: 2.0,
          improvement: 40
        },
        {
          metric: 'Time to Interactive',
          value: 1.8,
          target: 3.0,
          improvement: 40
        },
        {
          metric: 'Bundle Size Reduction',
          value: 35,
          target: 30,
          improvement: 17
        },
        {
          metric: 'Cache Hit Rate',
          value: 85,
          target: 80,
          improvement: 6
        },
        {
          metric: 'Lazy Load Success Rate',
          value: 92,
          target: 90,
          improvement: 2
        }
      ];
    };

    setBundles(generateBundles());
    setStrategies(generateStrategies());
    setMetrics(generateMetrics());
  }, []);

  const filteredBundles = bundles.filter(bundle => 
    selectedBundle === 'all' || bundle.type === selectedBundle
  );

  const formatBytes = (bytes: number): string => {
    return `${bytes.toFixed(1)}KB`;
  };

  const formatTime = (ms: number): string => {
    return `${ms.toFixed(0)}ms`;
  };

  const getBundleTypeColor = (type: string): string => {
    switch (type) {
      case 'main': return 'bg-blue-100 text-blue-800';
      case 'vendor': return 'bg-green-100 text-green-800';
      case 'chunk': return 'bg-purple-100 text-purple-800';
      case 'lazy': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const optimizeBundles = async () => {
    setIsOptimizing(true);
    setLoadingProgress(0);

    // Simulate optimization process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setLoadingProgress(i);
    }

    // Update bundles with optimized sizes
    setBundles(prev => prev.map(bundle => ({
      ...bundle,
      size: bundle.size * 0.8, // 20% reduction
      loadingTime: bundle.loadingTime * 0.7 // 30% faster loading
    })));

    setIsOptimizing(false);
    setLoadingProgress(0);
  };

  const toggleStrategy = (strategyId: string) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === strategyId ? { ...strategy, enabled: !strategy.enabled } : strategy
    ));
  };

  const totalBundleSize = bundles.reduce((sum, bundle) => sum + bundle.size, 0);
  const loadedBundles = bundles.filter(bundle => bundle.loaded).length;
  const averageLoadingTime = bundles.reduce((sum, bundle) => sum + bundle.loadingTime, 0) / bundles.length;

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
              <h2 className="text-2xl font-bold">⚡ Progressive Loading & Code Splitting</h2>
              <p className="text-indigo-100 mt-1">Advanced bundle optimization and loading strategies</p>
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
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Size</p>
                  <p className="text-2xl font-bold text-blue-800">{formatBytes(totalBundleSize)}</p>
                </div>
                <div className="text-3xl">📦</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Loaded Bundles</p>
                  <p className="text-2xl font-bold text-green-800">{loadedBundles}/{bundles.length}</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Avg Load Time</p>
                  <p className="text-2xl font-bold text-purple-800">{formatTime(averageLoadingTime)}</p>
                </div>
                <div className="text-3xl">⏱️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Optimization</p>
                  <p className="text-2xl font-bold text-orange-800">35%</p>
                </div>
                <div className="text-3xl">🚀</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Cache Hit</p>
                  <p className="text-2xl font-bold text-red-800">85%</p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Bundle Type:</label>
                  <select
                    value={selectedBundle}
                    onChange={(e) => setSelectedBundle(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="main">Main</option>
                    <option value="vendor">Vendor</option>
                    <option value="chunk">Chunk</option>
                    <option value="lazy">Lazy</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={optimizeBundles}
                  disabled={isOptimizing}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isOptimizing ? '⏳ Optimizing...' : '🔧 Optimize Bundles'}
                </button>
              </div>
            </div>

            {/* Optimization Progress */}
            {isOptimizing && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Optimizing bundles...</span>
                  <span>{loadingProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Loading Strategies */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Loading Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategies.map((strategy) => (
                <div key={strategy.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{strategy.name}</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={strategy.enabled}
                        onChange={() => toggleStrategy(strategy.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                  <div className="text-xs text-gray-500">
                    <div className="mb-1">Bundles: {strategy.bundles.join(', ')}</div>
                    <div>Conditions: {strategy.conditions.join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div key={metric.metric} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{metric.metric}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="text-sm text-gray-500">Target: {metric.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(metric.value / metric.target) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-green-600 mt-1">
                    {metric.improvement}% improvement
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bundle Details */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Bundle Details ({filteredBundles.length})</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bundle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Load Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dependencies</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredBundles.map((bundle) => (
                      <motion.tr
                        key={bundle.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{bundle.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBundleTypeColor(bundle.type)}`}>
                            {bundle.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatBytes(bundle.size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatTime(bundle.loadingTime)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(bundle.priority)}`}>
                            {bundle.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            bundle.loaded ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {bundle.loaded ? 'Loaded' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bundle.dependencies.length > 0 ? (
                            <div className="max-w-xs truncate">
                              {bundle.dependencies.join(', ')}
                            </div>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressiveLoading;
