import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorLog {
  id: string;
  timestamp: Date;
  level: 'error' | 'warning' | 'info' | 'debug';
  message: string;
  stack?: string;
  component?: string;
  userId?: string;
  sessionId?: string;
  resolved: boolean;
  autoResolved: boolean;
}

interface ErrorPattern {
  id: string;
  pattern: string;
  count: number;
  lastOccurrence: Date;
  severity: 'critical' | 'high' | 'medium' | 'low';
  suggestedFix: string;
}

interface RecoveryAction {
  id: string;
  name: string;
  description: string;
  type: 'automatic' | 'manual' | 'scheduled';
  successRate: number;
  lastRun?: Date;
  status: 'available' | 'running' | 'completed' | 'failed';
}

const AdvancedErrorHandling: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [errorPatterns, setErrorPatterns] = useState<ErrorPattern[]>([]);
  const [recoveryActions, setRecoveryActions] = useState<RecoveryAction[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [isAutoRecovery, setIsAutoRecovery] = useState(true);
  const [errorStats, setErrorStats] = useState({
    totalErrors: 0,
    resolvedErrors: 0,
    criticalErrors: 0,
    autoResolved: 0
  });

  // Generate sample error data
  useEffect(() => {
    const generateErrorLogs = (): ErrorLog[] => {
      const levels: ('error' | 'warning' | 'info' | 'debug')[] = ['error', 'warning', 'info', 'debug'];
      const components = ['Dashboard', 'TaskManager', 'EnergySelector', 'Analytics', 'Auth', 'API'];
      const messages = [
        'Failed to load user data',
        'API request timeout',
        'Invalid authentication token',
        'Database connection lost',
        'Memory allocation failed',
        'Network request failed',
        'Component render error',
        'State update failed'
      ];

      const logs: ErrorLog[] = [];
      for (let i = 0; i < 100; i++) {
        const level = levels[Math.floor(Math.random() * levels.length)];
        const component = components[Math.floor(Math.random() * components.length)];
        const message = messages[Math.floor(Math.random() * messages.length)];
        const resolved = Math.random() > 0.3;
        const autoResolved = resolved && Math.random() > 0.5;

        logs.push({
          id: `error-${i}`,
          timestamp: new Date(Date.now() - Math.random() * 86400000),
          level,
          message: `${message} in ${component}`,
          stack: level === 'error' ? `Error: ${message}\n    at ${component}.render (component.tsx:123:45)\n    at ReactDOM.render (react-dom.js:1234:56)` : undefined,
          component,
          userId: `user-${Math.floor(Math.random() * 1000)}`,
          sessionId: `session-${Math.floor(Math.random() * 10000)}`,
          resolved,
          autoResolved
        });
      }

      return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    const generateErrorPatterns = (): ErrorPattern[] => {
      return [
        {
          id: 'pattern-1',
          pattern: 'API timeout errors',
          count: 23,
          lastOccurrence: new Date(Date.now() - 3600000),
          severity: 'high',
          suggestedFix: 'Increase API timeout settings and implement retry logic'
        },
        {
          id: 'pattern-2',
          pattern: 'Authentication token expiration',
          count: 15,
          lastOccurrence: new Date(Date.now() - 7200000),
          severity: 'medium',
          suggestedFix: 'Implement automatic token refresh mechanism'
        },
        {
          id: 'pattern-3',
          pattern: 'Memory allocation failures',
          count: 8,
          lastOccurrence: new Date(Date.now() - 1800000),
          severity: 'critical',
          suggestedFix: 'Optimize memory usage and implement garbage collection'
        },
        {
          id: 'pattern-4',
          pattern: 'Database connection issues',
          count: 12,
          lastOccurrence: new Date(Date.now() - 5400000),
          severity: 'high',
          suggestedFix: 'Implement connection pooling and failover mechanisms'
        }
      ];
    };

    const generateRecoveryActions = (): RecoveryAction[] => {
      return [
        {
          id: 'recovery-1',
          name: 'Auto-retry Failed Requests',
          description: 'Automatically retry failed API requests with exponential backoff',
          type: 'automatic',
          successRate: 85,
          lastRun: new Date(Date.now() - 300000),
          status: 'available'
        },
        {
          id: 'recovery-2',
          name: 'Clear Cache and Reload',
          description: 'Clear application cache and reload critical components',
          type: 'automatic',
          successRate: 92,
          lastRun: new Date(Date.now() - 600000),
          status: 'available'
        },
        {
          id: 'recovery-3',
          name: 'Restart Service Workers',
          description: 'Restart background service workers to resolve memory issues',
          type: 'manual',
          successRate: 78,
          status: 'available'
        },
        {
          id: 'recovery-4',
          name: 'Database Connection Reset',
          description: 'Reset database connections and clear connection pool',
          type: 'scheduled',
          successRate: 95,
          lastRun: new Date(Date.now() - 1800000),
          status: 'completed'
        }
      ];
    };

    const logs = generateErrorLogs();
    const patterns = generateErrorPatterns();
    const actions = generateRecoveryActions();

    setErrorLogs(logs);
    setErrorPatterns(patterns);
    setRecoveryActions(actions);

    // Calculate stats
    const totalErrors = logs.length;
    const resolvedErrors = logs.filter(log => log.resolved).length;
    const criticalErrors = logs.filter(log => log.level === 'error').length;
    const autoResolved = logs.filter(log => log.autoResolved).length;

    setErrorStats({
      totalErrors,
      resolvedErrors,
      criticalErrors,
      autoResolved
    });
  }, []);

  const filteredLogs = errorLogs.filter(log => 
    selectedLevel === 'all' || log.level === selectedLevel
  );

  const filteredPatterns = errorPatterns.filter(pattern =>
    selectedPattern === 'all' || pattern.severity === selectedPattern
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'debug': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const resolveError = (errorId: string) => {
    setErrorLogs(prev => prev.map(log => 
      log.id === errorId ? { ...log, resolved: true } : log
    ));
  };

  const runRecoveryAction = (actionId: string) => {
    setRecoveryActions(prev => prev.map(action => 
      action.id === actionId ? { ...action, status: 'running' } : action
    ));

    // Simulate recovery action
    setTimeout(() => {
      setRecoveryActions(prev => prev.map(action => 
        action.id === actionId ? { 
          ...action, 
          status: 'completed',
          lastRun: new Date()
        } : action
      ));
    }, 3000);
  };

  const autoResolveErrors = () => {
    setErrorLogs(prev => prev.map(log => 
      log.level === 'warning' || log.level === 'info' 
        ? { ...log, resolved: true, autoResolved: true }
        : log
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🛡️ Advanced Error Handling & Recovery</h2>
              <p className="text-red-100 mt-1">Comprehensive error management and automatic recovery</p>
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
          {/* Error Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Total Errors</p>
                  <p className="text-2xl font-bold text-red-800">{errorStats.totalErrors}</p>
                </div>
                <div className="text-3xl">🚨</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Resolved</p>
                  <p className="text-2xl font-bold text-green-800">{errorStats.resolvedErrors}</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Critical</p>
                  <p className="text-2xl font-bold text-orange-800">{errorStats.criticalErrors}</p>
                </div>
                <div className="text-3xl">⚠️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Auto-Resolved</p>
                  <p className="text-2xl font-bold text-blue-800">{errorStats.autoResolved}</p>
                </div>
                <div className="text-3xl">🤖</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Level:</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Levels</option>
                    <option value="error">Errors</option>
                    <option value="warning">Warnings</option>
                    <option value="info">Info</option>
                    <option value="debug">Debug</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Pattern:</label>
                  <select
                    value={selectedPattern}
                    onChange={(e) => setSelectedPattern(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Patterns</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="autoRecovery"
                    checked={isAutoRecovery}
                    onChange={(e) => setIsAutoRecovery(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="autoRecovery" className="text-sm text-gray-700">
                    Auto-Recovery
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={autoResolveErrors}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  🤖 Auto-Resolve Minor Errors
                </button>
              </div>
            </div>
          </div>

          {/* Error Patterns */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Error Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPatterns.map((pattern) => (
                <div key={pattern.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{pattern.pattern}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(pattern.severity)}`}>
                      {pattern.severity}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Occurrences: {pattern.count} | Last: {formatDate(pattern.lastOccurrence)}
                  </div>
                  <p className="text-sm text-gray-700">{pattern.suggestedFix}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recovery Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recovery Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recoveryActions.map((action) => (
                <div key={action.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{action.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(action.status)}`}>
                      {action.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Success Rate: {action.successRate}%
                    </div>
                    {action.status === 'available' && (
                      <button
                        onClick={() => runRecoveryAction(action.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      >
                        Run Action
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error Logs */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Error Logs ({filteredLogs.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${log.resolved ? 'opacity-60' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(log.level)}`}>
                            {log.level}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(log.timestamp)}
                          </span>
                          {log.component && (
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {log.component}
                            </span>
                          )}
                          {log.autoResolved && (
                            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                              Auto-resolved
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-800 mb-2">{log.message}</p>
                        {log.stack && (
                          <details className="text-xs text-gray-600">
                            <summary className="cursor-pointer hover:text-gray-800">Stack Trace</summary>
                            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                              {log.stack}
                            </pre>
                          </details>
                        )}
                      </div>
                      {!log.resolved && (
                        <button
                          onClick={() => resolveError(log.id)}
                          className="ml-4 px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedErrorHandling;
