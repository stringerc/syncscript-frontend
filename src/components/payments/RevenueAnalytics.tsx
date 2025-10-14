/**
 * Revenue Analytics Dashboard Component
 * 
 * Comprehensive revenue tracking, business insights, and financial forecasting
 * Includes MRR, churn analysis, customer lifetime value, and growth metrics
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RevenueMetrics {
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
  totalRevenue: number;
  averageRevenuePerUser: number;
  customerLifetimeValue: number;
  churnRate: number;
  growthRate: number;
  conversionRate: number;
}

interface RevenueData {
  period: string;
  revenue: number;
  subscriptions: number;
  churn: number;
  newCustomers: number;
  upgrades: number;
  downgrades: number;
}

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  customerCount: number;
  revenue: number;
  averageRevenue: number;
  churnRate: number;
  growthRate: number;
  color: string;
}

interface RevenueForecast {
  period: string;
  predictedRevenue: number;
  confidence: number;
  factors: string[];
}

interface RevenueAnalyticsProps {
  teamId: string;
  onClose: () => void;
}

const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ teamId, onClose }) => {
  const [metrics, setMetrics] = useState<RevenueMetrics | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([]);
  const [forecast, setForecast] = useState<RevenueForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'trends' | 'segments' | 'forecast'>('overview');

  useEffect(() => {
    loadRevenueData();
  }, [teamId, selectedTimeRange]);

  const loadRevenueData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock revenue metrics
      const mockMetrics: RevenueMetrics = {
        mrr: 12500, // $12,500
        arr: 150000, // $150,000
        totalRevenue: 45000, // $45,000
        averageRevenuePerUser: 125, // $125
        customerLifetimeValue: 2500, // $2,500
        churnRate: 3.2, // 3.2%
        growthRate: 15.8, // 15.8%
        conversionRate: 12.5 // 12.5%
      };

      // Mock revenue data
      const mockRevenueData: RevenueData[] = [
        {
          period: '2024-01',
          revenue: 8500,
          subscriptions: 45,
          churn: 2,
          newCustomers: 12,
          upgrades: 3,
          downgrades: 1
        },
        {
          period: '2024-02',
          revenue: 9200,
          subscriptions: 52,
          churn: 1,
          newCustomers: 15,
          upgrades: 5,
          downgrades: 2
        },
        {
          period: '2024-03',
          revenue: 10800,
          subscriptions: 58,
          churn: 3,
          newCustomers: 18,
          upgrades: 7,
          downgrades: 1
        },
        {
          period: '2024-04',
          revenue: 12500,
          subscriptions: 65,
          churn: 2,
          newCustomers: 22,
          upgrades: 8,
          downgrades: 3
        }
      ];

      // Mock customer segments
      const mockSegments: CustomerSegment[] = [
        {
          id: 'starter',
          name: 'Starter',
          description: 'Small teams and individual users',
          customerCount: 35,
          revenue: 2800,
          averageRevenue: 80,
          churnRate: 4.2,
          growthRate: 18.5,
          color: 'from-blue-500 to-cyan-500'
        },
        {
          id: 'professional',
          name: 'Professional',
          description: 'Growing teams and mid-size companies',
          customerCount: 25,
          revenue: 7500,
          averageRevenue: 300,
          churnRate: 2.8,
          growthRate: 22.1,
          color: 'from-purple-500 to-pink-500'
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'Large organizations and enterprises',
          customerCount: 5,
          revenue: 2200,
          averageRevenue: 440,
          churnRate: 1.2,
          growthRate: 35.0,
          color: 'from-indigo-500 to-purple-500'
        }
      ];

      // Mock forecast data
      const mockForecast: RevenueForecast[] = [
        {
          period: '2024-05',
          predictedRevenue: 14200,
          confidence: 85,
          factors: ['Seasonal growth', 'New feature adoption', 'Marketing campaign']
        },
        {
          period: '2024-06',
          predictedRevenue: 16100,
          confidence: 78,
          factors: ['Product improvements', 'Customer expansion', 'Reduced churn']
        },
        {
          period: '2024-07',
          predictedRevenue: 18300,
          confidence: 72,
          factors: ['Market expansion', 'Partnership growth', 'Feature releases']
        }
      ];

      setMetrics(mockMetrics);
      setRevenueData(mockRevenueData);
      setCustomerSegments(mockSegments);
      setForecast(mockForecast);
    } catch (error) {
      console.error('Failed to load revenue data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 20) return 'text-green-600';
    if (growth > 10) return 'text-blue-600';
    if (growth > 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getChurnColor = (churn: number) => {
    if (churn < 2) return 'text-green-600';
    if (churn < 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading revenue analytics...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Revenue Analytics Dashboard</h2>
              <p className="text-green-100 mt-1">Comprehensive revenue tracking and business insights</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">MRR:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {formatCurrency(metrics.mrr)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">ARR:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {formatCurrency(metrics.arr)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Growth:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {formatPercentage(metrics.growthRate)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'trends', name: 'Trends', icon: '📈' },
              { id: 'segments', name: 'Segments', icon: '👥' },
              { id: 'forecast', name: 'Forecast', icon: '🔮' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Time Range Selector */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Time Range:</span>
            <div className="flex space-x-2">
              {[
                { id: '7d', name: 'Last 7 Days' },
                { id: '30d', name: 'Last 30 Days' },
                { id: '90d', name: 'Last 90 Days' },
                { id: '1y', name: 'Last Year' }
              ].map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedTimeRange(range.id as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedTimeRange === range.id
                      ? 'bg-white shadow-sm border border-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {range.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Revenue Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">💰</span>
                      <span className={`text-lg ${getGrowthColor(metrics.growthRate)}`}>
                        📈 {formatPercentage(metrics.growthRate)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">{formatCurrency(metrics.mrr)}</div>
                    <div className="text-green-600 text-sm">Monthly Recurring Revenue</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">📊</span>
                      <span className={`text-lg ${getChurnColor(metrics.churnRate)}`}>
                        📉 {formatPercentage(metrics.churnRate)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{formatCurrency(metrics.arr)}</div>
                    <div className="text-blue-600 text-sm">Annual Recurring Revenue</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">👤</span>
                      <span className="text-lg text-purple-600">
                        💎 {formatCurrency(metrics.averageRevenuePerUser)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">{formatCurrency(metrics.customerLifetimeValue)}</div>
                    <div className="text-purple-600 text-sm">Customer Lifetime Value</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">🎯</span>
                      <span className="text-lg text-orange-600">
                        🔄 {formatPercentage(metrics.conversionRate)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900">{formatCurrency(metrics.totalRevenue)}</div>
                    <div className="text-orange-600 text-sm">Total Revenue</div>
                  </div>
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Revenue Sources</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Subscription Revenue</span>
                        <span className="font-medium text-gray-900">{formatCurrency(metrics.mrr * 0.85)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">One-time Payments</span>
                        <span className="font-medium text-gray-900">{formatCurrency(metrics.mrr * 0.10)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Add-ons & Upgrades</span>
                        <span className="font-medium text-gray-900">{formatCurrency(metrics.mrr * 0.05)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Customer Health</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Churn Rate</span>
                        <span className={`font-medium ${getChurnColor(metrics.churnRate)}`}>
                          {formatPercentage(metrics.churnRate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Growth Rate</span>
                        <span className={`font-medium ${getGrowthColor(metrics.growthRate)}`}>
                          {formatPercentage(metrics.growthRate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Conversion Rate</span>
                        <span className="font-medium text-gray-900">{formatPercentage(metrics.conversionRate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'trends' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
              
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={data.period} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{data.period}</h4>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{formatCurrency(data.revenue)}</div>
                        <div className="text-sm text-gray-500">{data.subscriptions} subscriptions</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-green-600">{data.newCustomers}</div>
                        <div className="text-gray-600">New Customers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-red-600">{data.churn}</div>
                        <div className="text-gray-600">Churned</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-blue-600">{data.upgrades}</div>
                        <div className="text-gray-600">Upgrades</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-yellow-600">{data.downgrades}</div>
                        <div className="text-gray-600">Downgrades</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'segments' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Customer Segments</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {customerSegments.map((segment) => (
                  <div key={segment.id} className="p-6 border border-gray-200 rounded-lg">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${segment.color} mb-4`}></div>
                    <h4 className="font-semibold text-gray-900 mb-2">{segment.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{segment.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Customers</span>
                        <span className="font-medium text-gray-900">{segment.customerCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Revenue</span>
                        <span className="font-medium text-gray-900">{formatCurrency(segment.revenue)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Avg Revenue</span>
                        <span className="font-medium text-gray-900">{formatCurrency(segment.averageRevenue)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Churn Rate</span>
                        <span className={`font-medium ${getChurnColor(segment.churnRate)}`}>
                          {formatPercentage(segment.churnRate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Growth Rate</span>
                        <span className={`font-medium ${getGrowthColor(segment.growthRate)}`}>
                          {formatPercentage(segment.growthRate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'forecast' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Forecast</h3>
              
              <div className="space-y-4">
                {forecast.map((prediction) => (
                  <div key={prediction.period} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{prediction.period}</h4>
                        <div className="text-sm text-gray-600">Predicted Revenue</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(prediction.predictedRevenue)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {prediction.confidence}% confidence
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Key Factors:</div>
                      <div className="flex flex-wrap gap-2">
                        {prediction.factors.map((factor, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Revenue Analytics • {selectedTimeRange} • Last updated {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                console.log('Exporting revenue data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Export Report
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RevenueAnalytics;
