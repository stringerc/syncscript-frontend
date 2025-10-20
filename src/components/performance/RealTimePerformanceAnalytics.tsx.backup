import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceDataPoint {
  timestamp: Date;
  value: number;
  metric: string;
}

interface PerformanceChart {
  id: string;
  name: string;
  metric: string;
  data: PerformanceDataPoint[];
  color: string;
  unit: string;
  threshold: number;
}

interface PerformanceInsight {
  id: string;
  type: 'optimization' | 'warning' | 'success';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
}

const RealTimePerformanceAnalytics: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [charts, setCharts] = useState<PerformanceChart[]>([]);
  const [insights, setInsights] = useState<PerformanceInsight[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h');
  const [isRealTime, setIsRealTime] = useState(true);
  const [performanceScore, setPerformanceScore] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Initialize charts
  useEffect(() => {
    const initialCharts: PerformanceChart[] = [
      {
        id: 'response-time',
        name: 'Response Time',
        metric: 'responseTime',
        data: [],
        color: '#3b82f6',
        unit: 'ms',
        threshold: 200
      },
      {
        id: 'memory-usage',
        name: 'Memory Usage',
        metric: 'memoryUsage',
        data: [],
        color: '#10b981',
        unit: '%',
        threshold: 80
      },
      {
        id: 'cpu-usage',
        name: 'CPU Usage',
        metric: 'cpuUsage',
        data: [],
        color: '#f59e0b',
        unit: '%',
        threshold: 70
      },
      {
        id: 'error-rate',
        name: 'Error Rate',
        metric: 'errorRate',
        data: [],
        color: '#ef4444',
        unit: '%',
        threshold: 1
      },
      {
        id: 'throughput',
        name: 'Throughput',
        metric: 'throughput',
        data: [],
        color: '#8b5cf6',
        unit: 'req/s',
        threshold: 0
      },
      {
        id: 'cache-hit-rate',
        name: 'Cache Hit Rate',
        metric: 'cacheHitRate',
        data: [],
        color: '#06b6d4',
        unit: '%',
        threshold: 90
      }
    ];

    setCharts(initialCharts);

    // Generate initial insights
    const initialInsights: PerformanceInsight[] = [
      {
        id: '1',
        type: 'optimization',
        title: 'Database Query Optimization',
        description: 'Consider adding indexes to frequently queried tables to reduce response time by 15-20%.',
        impact: 'high',
        actionable: true
      },
      {
        id: '2',
        type: 'warning',
        title: 'Memory Usage Trending Up',
        description: 'Memory usage has increased 12% over the last hour. Monitor for potential memory leaks.',
        impact: 'medium',
        actionable: true
      },
      {
        id: '3',
        type: 'success',
        title: 'Cache Performance Excellent',
        description: 'Cache hit rate is consistently above 95%, providing excellent performance benefits.',
        impact: 'low',
        actionable: false
      }
    ];

    setInsights(initialInsights);
  }, []);

  // Real-time data simulation
  useEffect(() => {
    if (isRealTime) {
      intervalRef.current = setInterval(() => {
        setCharts(prevCharts => 
          prevCharts.map(chart => {
            const newValue = generateMetricValue(chart.metric);
            const newDataPoint: PerformanceDataPoint = {
              timestamp: new Date(),
              value: newValue,
              metric: chart.metric
            };

            // Keep only last 50 data points
            const newData = [...chart.data.slice(-49), newDataPoint];
            
            return {
              ...chart,
              data: newData
            };
          })
        );

        // Update performance score
        const avgResponseTime = getAverageMetricValue('responseTime');
        const avgMemoryUsage = getAverageMetricValue('memoryUsage');
        const avgErrorRate = getAverageMetricValue('errorRate');
        
        let score = 100;
        if (avgResponseTime > 200) score -= 20;
        if (avgMemoryUsage > 80) score -= 15;
        if (avgErrorRate > 1) score -= 25;
        
        setPerformanceScore(Math.max(0, score));
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRealTime]);

  const generateMetricValue = (metric: string): number => {
    switch (metric) {
      case 'responseTime':
        return Math.random() * 300 + 50;
      case 'memoryUsage':
        return Math.random() * 100;
      case 'cpuUsage':
        return Math.random() * 100;
      case 'errorRate':
        return Math.random() * 5;
      case 'throughput':
        return Math.random() * 1000 + 100;
      case 'cacheHitRate':
        return Math.random() * 20 + 80;
      default:
        return Math.random() * 100;
    }
  };

  const getAverageMetricValue = (metric: string): number => {
    const chart = charts.find(c => c.metric === metric);
    if (!chart || chart.data.length === 0) return 0;
    
    const sum = chart.data.reduce((acc, point) => acc + point.value, 0);
    return sum / chart.data.length;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString();
  };

  const formatValue = (value: number, unit: string): string => {
    return `${value.toFixed(1)}${unit}`;
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

  const getInsightIcon = (type: string): string => {
    switch (type) {
      case 'optimization': return '🔧';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      default: return 'ℹ️';
    }
  };

  const getInsightColor = (type: string): string => {
    switch (type) {
      case 'optimization': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
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
              <h2 className="text-2xl font-bold">📊 Real-time Performance Analytics</h2>
              <p className="text-purple-100 mt-1">Live performance monitoring and insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: getPerformanceColor(performanceScore) }}
                >
                  {performanceScore}
                </div>
                <div className="text-sm text-purple-100">
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
          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Time Range:</label>
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="1h">Last Hour</option>
                    <option value="6h">Last 6 Hours</option>
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                  </select>
                </div>

                <button
                  onClick={() => setIsRealTime(!isRealTime)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isRealTime 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {isRealTime ? '⏸️ Pause' : '▶️ Resume'} Real-time
                </button>
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Performance Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {charts.map((chart) => {
              const latestValue = chart.data[chart.data.length - 1]?.value || 0;
              const isAboveThreshold = latestValue > chart.threshold;
              
              return (
                <div key={chart.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{chart.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div 
                        className={`w-3 h-3 rounded-full ${isAboveThreshold ? 'bg-red-500' : 'bg-green-500'}`}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {formatValue(latestValue, chart.unit)}
                      </span>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="h-32 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-4">
                    <div className="h-full flex items-end space-x-1">
                      {chart.data.slice(-20).map((point, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-blue-500 rounded-t"
                          style={{
                            height: `${(point.value / Math.max(...chart.data.map(d => d.value))) * 100}%`,
                            backgroundColor: chart.color
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Current:</span>
                      <div className="font-medium">{formatValue(latestValue, chart.unit)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Threshold:</span>
                      <div className="font-medium">{formatValue(chart.threshold, chart.unit)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Performance Insights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Performance Insights</h3>
            <div className="space-y-4">
              <AnimatePresence>
                {insights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`p-4 rounded-lg border-l-4 ${getInsightColor(insight.type)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getInsightIcon(insight.type)}</span>
                          <h4 className="font-semibold">{insight.title}</h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(insight.impact)}`}>
                            {insight.impact} impact
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{insight.description}</p>
                      </div>
                      {insight.actionable && (
                        <button className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                          Take Action
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Response Time</h3>
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {formatValue(getAverageMetricValue('responseTime'), 'ms')}
              </div>
              <div className="text-sm text-blue-700">
                Average over {selectedTimeRange}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Throughput</h3>
              <div className="text-3xl font-bold text-green-900 mb-2">
                {formatValue(getAverageMetricValue('throughput'), 'req/s')}
              </div>
              <div className="text-sm text-green-700">
                Requests per second
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Cache Hit Rate</h3>
              <div className="text-3xl font-bold text-purple-900 mb-2">
                {formatValue(getAverageMetricValue('cacheHitRate'), '%')}
              </div>
              <div className="text-sm text-purple-700">
                Cache efficiency
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RealTimePerformanceAnalytics;
