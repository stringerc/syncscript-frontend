import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  cpuUsage: number;
  networkLatency: number;
  errorRate: number;
  userInteractions: number;
  renderTime: number;
}

interface PerformanceAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

const PerformanceMonitoring: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: 0,
    apiResponseTime: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    networkLatency: 0,
    errorRate: 0,
    userInteractions: 0,
    renderTime: 0
  });

  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [performanceScore, setPerformanceScore] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState<string>('overview');
  const intervalRef = useRef<NodeJS.Timeout>();

  // Simulate real-time performance monitoring
  useEffect(() => {
    if (isMonitoring) {
      intervalRef.current = setInterval(() => {
        // Simulate performance metrics
        const newMetrics: PerformanceMetrics = {
          pageLoadTime: Math.random() * 2000 + 500,
          apiResponseTime: Math.random() * 100 + 50,
          memoryUsage: Math.random() * 100,
          cpuUsage: Math.random() * 100,
          networkLatency: Math.random() * 200 + 50,
          errorRate: Math.random() * 5,
          userInteractions: Math.floor(Math.random() * 100),
          renderTime: Math.random() * 50 + 10
        };

        setMetrics(newMetrics);

        // Calculate performance score
        const score = calculatePerformanceScore(newMetrics);
        setPerformanceScore(score);

        // Generate alerts for poor performance
        if (newMetrics.pageLoadTime > 3000) {
          addAlert('error', 'Page load time exceeds 3 seconds');
        }
        if (newMetrics.apiResponseTime > 150) {
          addAlert('warning', 'API response time is slow');
        }
        if (newMetrics.memoryUsage > 80) {
          addAlert('warning', 'High memory usage detected');
        }
        if (newMetrics.errorRate > 2) {
          addAlert('error', 'High error rate detected');
        }
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMonitoring]);

  const calculatePerformanceScore = (metrics: PerformanceMetrics): number => {
    let score = 100;
    
    // Deduct points for poor performance
    if (metrics.pageLoadTime > 2000) score -= 20;
    if (metrics.apiResponseTime > 100) score -= 15;
    if (metrics.memoryUsage > 70) score -= 10;
    if (metrics.cpuUsage > 80) score -= 10;
    if (metrics.networkLatency > 150) score -= 10;
    if (metrics.errorRate > 1) score -= 15;
    if (metrics.renderTime > 30) score -= 10;

    return Math.max(0, score);
  };

  const addAlert = (type: 'warning' | 'error' | 'info', message: string) => {
    const alert: PerformanceAlert = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      resolved: false
    };

    setAlerts(prev => [alert, ...prev.slice(0, 9)]); // Keep only last 10 alerts
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getPerformanceColor = (score: number): string => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getPerformanceStatus = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  const formatMetric = (value: number, unit: string): string => {
    return `${value.toFixed(1)}${unit}`;
  };

  const metricsData = [
    { key: 'pageLoadTime', label: 'Page Load Time', value: metrics.pageLoadTime, unit: 'ms', threshold: 2000 },
    { key: 'apiResponseTime', label: 'API Response Time', value: metrics.apiResponseTime, unit: 'ms', threshold: 100 },
    { key: 'memoryUsage', label: 'Memory Usage', value: metrics.memoryUsage, unit: '%', threshold: 70 },
    { key: 'cpuUsage', label: 'CPU Usage', value: metrics.cpuUsage, unit: '%', threshold: 80 },
    { key: 'networkLatency', label: 'Network Latency', value: metrics.networkLatency, unit: 'ms', threshold: 150 },
    { key: 'errorRate', label: 'Error Rate', value: metrics.errorRate, unit: '%', threshold: 1 },
    { key: 'userInteractions', label: 'User Interactions', value: metrics.userInteractions, unit: '', threshold: 0 },
    { key: 'renderTime', label: 'Render Time', value: metrics.renderTime, unit: 'ms', threshold: 30 }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🚀 Performance Monitoring</h2>
              <p className="text-blue-100 mt-1">Real-time performance tracking and optimization</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: getPerformanceColor(performanceScore) }}
                >
                  {performanceScore}
                </div>
                <div className="text-sm text-blue-100">
                  {getPerformanceStatus(performanceScore)}
                </div>
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
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Control Panel */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsMonitoring(!isMonitoring)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isMonitoring 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {isMonitoring ? '⏸️ Pause Monitoring' : '▶️ Start Monitoring'}
                </button>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-600">
                    {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Performance Score */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Score</h3>
              <div className="text-center">
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: getPerformanceColor(performanceScore) }}
                >
                  {performanceScore}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {getPerformanceStatus(performanceScore)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${performanceScore}%`,
                      backgroundColor: getPerformanceColor(performanceScore)
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Page Load</span>
                  <span className="font-medium">{formatMetric(metrics.pageLoadTime, 'ms')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">API Response</span>
                  <span className="font-medium">{formatMetric(metrics.apiResponseTime, 'ms')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Memory</span>
                  <span className="font-medium">{formatMetric(metrics.memoryUsage, '%')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">CPU</span>
                  <span className="font-medium">{formatMetric(metrics.cpuUsage, '%')}</span>
                </div>
              </div>
            </div>

            {/* Active Alerts */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Alerts</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">
                  {alerts.filter(alert => !alert.resolved).length}
                </div>
                <div className="text-sm text-gray-600">
                  {alerts.filter(alert => !alert.resolved).length === 0 ? 'No active alerts' : 'Alerts requiring attention'}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Detailed Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metricsData.map((metric) => (
                <div key={metric.key} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      metric.value > metric.threshold 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {metric.value > metric.threshold ? '⚠️' : '✅'}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {formatMetric(metric.value, metric.unit)}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                    <div 
                      className={`h-1 rounded-full transition-all duration-500 ${
                        metric.value > metric.threshold ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(100, (metric.value / metric.threshold) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Performance Alerts</h3>
            <AnimatePresence>
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">🎉</div>
                  <p>No performance alerts - everything is running smoothly!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'error' ? 'border-red-500 bg-red-50' :
                        alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                        'border-blue-500 bg-blue-50'
                      } ${alert.resolved ? 'opacity-50' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`text-sm font-medium ${
                              alert.type === 'error' ? 'text-red-700' :
                              alert.type === 'warning' ? 'text-yellow-700' :
                              'text-blue-700'
                            }`}>
                              {alert.type === 'error' ? '🚨 Error' :
                               alert.type === 'warning' ? '⚠️ Warning' :
                               'ℹ️ Info'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {alert.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className={`text-sm ${
                            alert.type === 'error' ? 'text-red-600' :
                            alert.type === 'warning' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`}>
                            {alert.message}
                          </p>
                        </div>
                        {!alert.resolved && (
                          <button
                            onClick={() => resolveAlert(alert.id)}
                            className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceMonitoring;
