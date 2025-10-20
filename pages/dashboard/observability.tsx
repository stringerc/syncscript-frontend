import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Server,
  Database,
  Zap
} from 'lucide-react';

export default function ObservabilityDashboard() {
  const [metrics, setMetrics] = useState({
    uptime: 99.9,
    responseTime: 120,
    errorRate: 0.1,
    activeUsers: 1247,
    throughput: 156,
    memoryUsage: 68
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'High memory usage detected',
      timestamp: '2 minutes ago',
      resolved: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Database backup completed',
      timestamp: '15 minutes ago',
      resolved: true
    },
    {
      id: 3,
      type: 'error',
      message: 'API endpoint timeout',
      timestamp: '1 hour ago',
      resolved: false
    }
  ]);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'info': return <CheckCircle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <>
      <Head>
        <title>Observability Dashboard - SyncScript</title>
        <meta name="description" content="Monitor system performance and health with real-time observability metrics." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Observability Dashboard
              </h1>
              <p className="text-gray-600">
                Real-time monitoring and system health metrics
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Uptime</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.uptime}%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Response Time</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.responseTime}ms</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Error Rate</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.errorRate}%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.activeUsers}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Throughput</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.throughput}/s</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Database className="h-8 w-8 text-indigo-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.memoryUsage}%</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* System Health */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Server className="h-6 w-6 mr-2" />
                  System Health
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">API Server</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Database</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cache Layer</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-yellow-600 font-medium">Warning</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">File Storage</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">Healthy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  Recent Alerts
                </h2>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm opacity-75 mt-1">{alert.timestamp}</p>
                        </div>
                        {!alert.resolved && (
                          <button className="text-sm font-medium opacity-75 hover:opacity-100">
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
