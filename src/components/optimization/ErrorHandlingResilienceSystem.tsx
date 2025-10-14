import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorBoundary {
  id: string;
  name: string;
  component: string;
  status: 'active' | 'inactive' | 'error';
  errorCount: number;
  lastError: Date | null;
  fallbackComponent: string;
  recoveryStrategy: 'retry' | 'fallback' | 'redirect' | 'reload';
  monitoring: boolean;
}

interface ErrorLog {
  id: string;
  timestamp: Date;
  level: 'error' | 'warning' | 'info' | 'debug';
  component: string;
  message: string;
  stack: string;
  userAgent: string;
  userId: string | null;
  sessionId: string;
  context: Record<string, any>;
  resolved: boolean;
  resolution: string | null;
}

interface ResilienceStrategy {
  id: string;
  name: string;
  description: string;
  type: 'circuit-breaker' | 'retry' | 'fallback' | 'timeout' | 'rate-limit';
  status: 'enabled' | 'disabled' | 'testing';
  configuration: Record<string, any>;
  metrics: {
    successRate: number;
    failureRate: number;
    avgResponseTime: number;
    totalRequests: number;
  };
}

interface GracefulDegradation {
  id: string;
  feature: string;
  description: string;
  fallback: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'inactive' | 'testing';
  triggers: string[];
  userImpact: 'none' | 'minimal' | 'moderate' | 'significant';
}

const ErrorHandlingResilienceSystem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [errorBoundaries, setErrorBoundaries] = useState<ErrorBoundary[]>([]);
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [resilienceStrategies, setResilienceStrategies] = useState<ResilienceStrategy[]>([]);
  const [gracefulDegradations, setGracefulDegradations] = useState<GracefulDegradation[]>([]);
  const [isMonitoringErrors, setIsMonitoringErrors] = useState(false);
  const [isTestingResilience, setIsTestingResilience] = useState(false);

  // Generate error handling data
  useEffect(() => {
    const generateErrorBoundaries = (): ErrorBoundary[] => {
      return [
        {
          id: 'boundary-1',
          name: 'Dashboard Error Boundary',
          component: 'Dashboard',
          status: 'active',
          errorCount: 0,
          lastError: null,
          fallbackComponent: 'ErrorFallback',
          recoveryStrategy: 'fallback',
          monitoring: true
        },
        {
          id: 'boundary-2',
          name: 'Analytics Error Boundary',
          component: 'Analytics',
          status: 'active',
          errorCount: 2,
          lastError: new Date(Date.now() - 2 * 60 * 60 * 1000),
          fallbackComponent: 'AnalyticsFallback',
          recoveryStrategy: 'retry',
          monitoring: true
        },
        {
          id: 'boundary-3',
          name: 'Calendar Error Boundary',
          component: 'Calendar',
          status: 'active',
          errorCount: 1,
          lastError: new Date(Date.now() - 5 * 60 * 60 * 1000),
          fallbackComponent: 'CalendarFallback',
          recoveryStrategy: 'redirect',
          monitoring: true
        },
        {
          id: 'boundary-4',
          name: 'Team Error Boundary',
          component: 'Team',
          status: 'inactive',
          errorCount: 0,
          lastError: null,
          fallbackComponent: 'TeamFallback',
          recoveryStrategy: 'fallback',
          monitoring: false
        }
      ];
    };

    const generateErrorLogs = (): ErrorLog[] => {
      const logs: ErrorLog[] = [];
      const components = ['Dashboard', 'Analytics', 'Calendar', 'Team', 'Settings'];
      const messages = [
        'Failed to load user data',
        'Network request timeout',
        'Component render error',
        'API authentication failed',
        'Invalid data format received',
        'Memory allocation error',
        'Database connection lost',
        'Third-party service unavailable'
      ];

      for (let i = 0; i < 25; i++) {
        const levels: ErrorLog['level'][] = ['error', 'warning', 'info', 'debug'];
        const level = levels[Math.floor(Math.random() * levels.length)];
        const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        const component = components[Math.floor(Math.random() * components.length)];
        const message = messages[Math.floor(Math.random() * messages.length)];

        logs.push({
          id: `log-${i}`,
          timestamp,
          level,
          component,
          message,
          stack: `Error: ${message}\n    at ${component}.render (component.tsx:123:45)\n    at ReactDOM.render (react-dom.js:456:78)`,
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          userId: Math.random() > 0.3 ? `user-${Math.floor(Math.random() * 1000)}` : null,
          sessionId: `session-${Math.floor(Math.random() * 10000)}`,
          context: {
            route: '/dashboard',
            action: 'load-data',
            timestamp: timestamp.toISOString()
          },
          resolved: Math.random() > 0.4,
          resolution: Math.random() > 0.4 ? 'Automatic retry successful' : null
        });
      }

      return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    const generateResilienceStrategies = (): ResilienceStrategy[] => {
      return [
        {
          id: 'strategy-1',
          name: 'API Circuit Breaker',
          description: 'Prevents cascading failures by breaking the circuit when API calls fail',
          type: 'circuit-breaker',
          status: 'enabled',
          configuration: {
            failureThreshold: 5,
            timeout: 30000,
            resetTimeout: 60000
          },
          metrics: {
            successRate: 94.5,
            failureRate: 5.5,
            avgResponseTime: 250,
            totalRequests: 15420
          }
        },
        {
          id: 'strategy-2',
          name: 'Retry with Exponential Backoff',
          description: 'Automatically retries failed requests with increasing delays',
          type: 'retry',
          status: 'enabled',
          configuration: {
            maxRetries: 3,
            baseDelay: 1000,
            maxDelay: 10000,
            backoffMultiplier: 2
          },
          metrics: {
            successRate: 98.2,
            failureRate: 1.8,
            avgResponseTime: 450,
            totalRequests: 8930
          }
        },
        {
          id: 'strategy-3',
          name: 'Fallback Data Sources',
          description: 'Uses alternative data sources when primary sources fail',
          type: 'fallback',
          status: 'enabled',
          configuration: {
            primarySource: 'api.syncscript.com',
            fallbackSource: 'backup.syncscript.com',
            cacheTimeout: 300000
          },
          metrics: {
            successRate: 99.1,
            failureRate: 0.9,
            avgResponseTime: 180,
            totalRequests: 12340
          }
        },
        {
          id: 'strategy-4',
          name: 'Request Timeout',
          description: 'Sets timeouts for all external requests',
          type: 'timeout',
          status: 'enabled',
          configuration: {
            defaultTimeout: 10000,
            criticalTimeout: 5000,
            backgroundTimeout: 30000
          },
          metrics: {
            successRate: 96.8,
            failureRate: 3.2,
            avgResponseTime: 320,
            totalRequests: 18750
          }
        },
        {
          id: 'strategy-5',
          name: 'Rate Limiting',
          description: 'Prevents API abuse and ensures fair usage',
          type: 'rate-limit',
          status: 'enabled',
          configuration: {
            requestsPerMinute: 100,
            burstLimit: 200,
            windowSize: 60000
          },
          metrics: {
            successRate: 99.5,
            failureRate: 0.5,
            avgResponseTime: 150,
            totalRequests: 25600
          }
        }
      ];
    };

    const generateGracefulDegradations = (): GracefulDegradation[] => {
      return [
        {
          id: 'degradation-1',
          feature: 'Real-time Updates',
          description: 'WebSocket connection for live updates',
          fallback: 'Polling every 30 seconds',
          priority: 'high',
          status: 'active',
          triggers: ['websocket-failure', 'network-timeout'],
          userImpact: 'minimal'
        },
        {
          id: 'degradation-2',
          feature: 'Advanced Analytics',
          description: 'Complex data visualization and charts',
          fallback: 'Basic table view with summary data',
          priority: 'medium',
          status: 'active',
          triggers: ['chart-library-error', 'data-processing-timeout'],
          userImpact: 'moderate'
        },
        {
          id: 'degradation-3',
          feature: 'File Upload',
          description: 'Drag-and-drop file upload functionality',
          fallback: 'Traditional file input with progress bar',
          priority: 'medium',
          status: 'active',
          triggers: ['drag-drop-error', 'file-size-limit'],
          userImpact: 'minimal'
        },
        {
          id: 'degradation-4',
          feature: 'Voice Commands',
          description: 'Speech recognition for voice input',
          fallback: 'Manual text input with suggestions',
          priority: 'low',
          status: 'active',
          triggers: ['speech-api-error', 'microphone-permission'],
          userImpact: 'moderate'
        },
        {
          id: 'degradation-5',
          feature: 'Offline Mode',
          description: 'Full offline functionality with sync',
          fallback: 'Read-only mode with limited features',
          priority: 'critical',
          status: 'active',
          triggers: ['network-disconnect', 'service-worker-error'],
          userImpact: 'significant'
        },
        {
          id: 'degradation-6',
          feature: 'Third-party Integrations',
          description: 'External service integrations',
          fallback: 'Manual data entry with import options',
          priority: 'medium',
          status: 'active',
          triggers: ['api-rate-limit', 'service-unavailable'],
          userImpact: 'moderate'
        }
      ];
    };

    setErrorBoundaries(generateErrorBoundaries());
    setErrorLogs(generateErrorLogs());
    setResilienceStrategies(generateResilienceStrategies());
    setGracefulDegradations(generateGracefulDegradations());
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'enabled': return 'bg-green-100 text-green-800';
      case 'disabled': return 'bg-gray-100 text-gray-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'debug': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'circuit-breaker': return 'bg-red-100 text-red-800';
      case 'retry': return 'bg-blue-100 text-blue-800';
      case 'fallback': return 'bg-green-100 text-green-800';
      case 'timeout': return 'bg-yellow-100 text-yellow-800';
      case 'rate-limit': return 'bg-purple-100 text-purple-800';
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

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'none': return 'bg-green-100 text-green-800';
      case 'minimal': return 'bg-blue-100 text-blue-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'significant': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecoveryStrategyColor = (strategy: string): string => {
    switch (strategy) {
      case 'retry': return 'bg-blue-100 text-blue-800';
      case 'fallback': return 'bg-green-100 text-green-800';
      case 'redirect': return 'bg-yellow-100 text-yellow-800';
      case 'reload': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startErrorMonitoring = async () => {
    setIsMonitoringErrors(true);
    
    // Simulate error monitoring
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsMonitoringErrors(false);
  };

  const testResilience = async (strategyId: string) => {
    setIsTestingResilience(true);
    
    // Simulate resilience testing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsTestingResilience(false);
  };

  const totalErrors = errorLogs.filter(log => log.level === 'error').length;
  const unresolvedErrors = errorLogs.filter(log => log.level === 'error' && !log.resolved).length;
  const activeStrategies = resilienceStrategies.filter(s => s.status === 'enabled').length;
  const activeDegradations = gracefulDegradations.filter(d => d.status === 'active').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🛡️ Error Handling & Resilience System</h2>
              <p className="text-red-100 mt-1">Comprehensive error management, recovery strategies, and graceful degradation</p>
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
          {/* Error Handling Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Total Errors</p>
                  <p className="text-2xl font-bold text-red-800">{totalErrors}</p>
                </div>
                <div className="text-3xl">🚨</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Unresolved</p>
                  <p className="text-2xl font-bold text-orange-800">{unresolvedErrors}</p>
                </div>
                <div className="text-3xl">⚠️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Error Boundaries</p>
                  <p className="text-2xl font-bold text-blue-800">{errorBoundaries.length}</p>
                </div>
                <div className="text-3xl">🛡️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Resilience Strategies</p>
                  <p className="text-2xl font-bold text-green-800">{activeStrategies}</p>
                </div>
                <div className="text-3xl">🔄</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Graceful Degradations</p>
                  <p className="text-2xl font-bold text-purple-800">{activeDegradations}</p>
                </div>
                <div className="text-3xl">📉</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Last monitoring: {new Date().toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={startErrorMonitoring}
                  disabled={isMonitoringErrors}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  {isMonitoringErrors ? '⏳ Monitoring...' : '🔍 Start Monitoring'}
                </button>
              </div>
            </div>
          </div>

          {/* Error Boundaries */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Error Boundaries ({errorBoundaries.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {errorBoundaries.map((boundary) => (
                <div key={boundary.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{boundary.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(boundary.status)}`}>
                      {boundary.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Component:</span>
                      <span className="font-medium text-blue-600">{boundary.component}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Error Count:</span>
                      <span className={`font-medium ${boundary.errorCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {boundary.errorCount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Recovery:</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRecoveryStrategyColor(boundary.recoveryStrategy)}`}>
                        {boundary.recoveryStrategy}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fallback:</span>
                      <span className="font-medium text-gray-900">{boundary.fallbackComponent}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Monitoring:</span>
                      <span className={`font-medium ${boundary.monitoring ? 'text-green-600' : 'text-gray-600'}`}>
                        {boundary.monitoring ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {boundary.lastError && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Last Error:</span>
                        <span className="text-gray-500">{formatDate(boundary.lastError)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Error Logs */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Error Logs ({errorLogs.length})</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {errorLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{log.message}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(log.level)}`}>
                        {log.level}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        log.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {log.resolved ? 'Resolved' : 'Unresolved'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Component:</span>
                      <span className="font-medium text-blue-600">{log.component}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Time:</span>
                      <span className="text-gray-500">{formatDate(log.timestamp)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">User:</span>
                      <span className="font-medium text-gray-900">{log.userId || 'Anonymous'}</span>
                    </div>
                    
                    {log.resolution && (
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-700 mb-1">Resolution:</div>
                        <div className="text-sm text-gray-600 bg-green-50 p-2 rounded">
                          {log.resolution}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resilience Strategies */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Resilience Strategies ({resilienceStrategies.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strategy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Response</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resilienceStrategies.map((strategy) => (
                    <tr key={strategy.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{strategy.name}</div>
                          <div className="text-sm text-gray-500">{strategy.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(strategy.type)}`}>
                          {strategy.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(strategy.status)}`}>
                          {strategy.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${strategy.metrics.successRate}%` }}
                            ></div>
                          </div>
                          <span>{strategy.metrics.successRate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {strategy.metrics.avgResponseTime}ms
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => testResilience(strategy.id)}
                          disabled={isTestingResilience}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                        >
                          {isTestingResilience ? 'Testing...' : 'Test'}
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

export default ErrorHandlingResilienceSystem;
