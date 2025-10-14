/**
 * Revenue Sharing System Component
 * 
 * Monetization for developers
 * Includes revenue tracking, payout management, and analytics
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RevenueData {
  id: string;
  period: string;
  totalRevenue: number;
  developerShare: number;
  platformFee: number;
  currency: string;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  payoutDate?: string;
  transactions: number;
  apps: string[];
}

interface PayoutMethod {
  id: string;
  type: 'bank' | 'paypal' | 'stripe' | 'crypto';
  name: string;
  details: Record<string, any>;
  isDefault: boolean;
  isVerified: boolean;
  lastUsed: string;
}

interface AppRevenue {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  sales: number;
  revenue: number;
  developerShare: number;
  platformFee: number;
  rating: number;
  downloads: number;
  lastSale: string;
}

interface RevenueAnalytics {
  totalRevenue: number;
  totalPayouts: number;
  pendingAmount: number;
  averageMonthlyRevenue: number;
  topPerformingApp: string;
  revenueGrowth: number;
  conversionRate: number;
  refundRate: number;
}

interface RevenueSharingProps {
  onClose: () => void;
}

const RevenueSharing: React.FC<RevenueSharingProps> = ({ onClose }) => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([]);
  const [appRevenue, setAppRevenue] = useState<AppRevenue[]>([]);
  const [revenueAnalytics, setRevenueAnalytics] = useState<RevenueAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'revenue' | 'payouts' | 'analytics'>('overview');
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);

  useEffect(() => {
    loadRevenueData();
  }, []);

  const loadRevenueData = async () => {
    setIsLoading(true);
    
    try {
      // Mock revenue data
      const mockRevenueData: RevenueData[] = [
        {
          id: 'revenue-1',
          period: '2024-01',
          totalRevenue: 2450.00,
          developerShare: 1960.00,
          platformFee: 490.00,
          currency: 'USD',
          status: 'paid',
          payoutDate: new Date(Date.now() - 86400000).toISOString(),
          transactions: 156,
          apps: ['app-1', 'app-2', 'app-3']
        },
        {
          id: 'revenue-2',
          period: '2024-02',
          totalRevenue: 3120.50,
          developerShare: 2496.40,
          platformFee: 624.10,
          currency: 'USD',
          status: 'paid',
          payoutDate: new Date(Date.now() - 172800000).toISOString(),
          transactions: 198,
          apps: ['app-1', 'app-2', 'app-3', 'app-4']
        },
        {
          id: 'revenue-3',
          period: '2024-03',
          totalRevenue: 2890.75,
          developerShare: 2312.60,
          platformFee: 578.15,
          currency: 'USD',
          status: 'processing',
          transactions: 142,
          apps: ['app-1', 'app-2', 'app-3']
        },
        {
          id: 'revenue-4',
          period: '2024-04',
          totalRevenue: 1890.25,
          developerShare: 1512.20,
          platformFee: 378.05,
          currency: 'USD',
          status: 'pending',
          transactions: 89,
          apps: ['app-1', 'app-2']
        }
      ];

      // Mock payout methods
      const mockPayoutMethods: PayoutMethod[] = [
        {
          id: 'payout-1',
          type: 'bank',
          name: 'Chase Bank Account',
          details: {
            'account_number': '****1234',
            'routing_number': '021000021',
            'account_type': 'checking'
          },
          isDefault: true,
          isVerified: true,
          lastUsed: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'payout-2',
          type: 'paypal',
          name: 'PayPal Account',
          details: {
            'email': 'developer@example.com',
            'account_type': 'business'
          },
          isDefault: false,
          isVerified: true,
          lastUsed: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'payout-3',
          type: 'stripe',
          name: 'Stripe Connect',
          details: {
            'account_id': 'acct_1234567890',
            'country': 'US'
          },
          isDefault: false,
          isVerified: false,
          lastUsed: new Date(Date.now() - 259200000).toISOString()
        }
      ];

      // Mock app revenue
      const mockAppRevenue: AppRevenue[] = [
        {
          id: 'app-1',
          name: 'Advanced Task Scheduler',
          category: 'productivity',
          price: 12.99,
          currency: 'USD',
          sales: 89,
          revenue: 1156.11,
          developerShare: 924.89,
          platformFee: 231.22,
          rating: 4.8,
          downloads: 23456,
          lastSale: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'app-2',
          name: 'Team Communication Hub',
          category: 'communication',
          price: 0.00,
          currency: 'USD',
          sales: 0,
          revenue: 0.00,
          developerShare: 0.00,
          platformFee: 0.00,
          rating: 4.6,
          downloads: 45678,
          lastSale: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'app-3',
          name: 'Advanced Analytics Pro',
          category: 'analytics',
          price: 24.99,
          currency: 'USD',
          sales: 45,
          revenue: 1124.55,
          developerShare: 899.64,
          platformFee: 224.91,
          rating: 4.9,
          downloads: 12345,
          lastSale: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 'app-4',
          name: 'Workflow Automation Suite',
          category: 'automation',
          price: 19.99,
          currency: 'USD',
          sales: 67,
          revenue: 1339.33,
          developerShare: 1071.46,
          platformFee: 267.87,
          rating: 4.7,
          downloads: 67890,
          lastSale: new Date(Date.now() - 1800000).toISOString()
        }
      ];

      // Mock revenue analytics
      const mockRevenueAnalytics: RevenueAnalytics = {
        totalRevenue: 10351.50,
        totalPayouts: 6772.00,
        pendingAmount: 1512.20,
        averageMonthlyRevenue: 2587.88,
        topPerformingApp: 'Workflow Automation Suite',
        revenueGrowth: 15.2,
        conversionRate: 3.4,
        refundRate: 2.1
      };

      setRevenueData(mockRevenueData);
      setPayoutMethods(mockPayoutMethods);
      setAppRevenue(mockAppRevenue);
      setRevenueAnalytics(mockRevenueAnalytics);
    } catch (error) {
      console.error('Failed to load revenue data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const processPayout = async (revenueId: string) => {
    setIsProcessingPayout(true);
    
    try {
      // Simulate payout processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setRevenueData(prev => prev.map(revenue => 
        revenue.id === revenueId 
          ? { 
              ...revenue, 
              status: 'processing',
              payoutDate: new Date().toISOString()
            }
          : revenue
      ));
      
      console.log(`Processing payout for: ${revenueId}`);
    } catch (error) {
      console.error('Failed to process payout:', error);
    } finally {
      setIsProcessingPayout(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'paid': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPayoutTypeIcon = (type: string) => {
    switch (type) {
      case 'bank': return '🏦';
      case 'paypal': return '💳';
      case 'stripe': return '💎';
      case 'crypto': return '₿';
      default: return '💰';
    }
  };

  const getPayoutTypeColor = (type: string) => {
    switch (type) {
      case 'bank': return 'text-blue-600 bg-blue-100';
      case 'paypal': return 'text-yellow-600 bg-yellow-100';
      case 'stripe': return 'text-purple-600 bg-purple-100';
      case 'crypto': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading revenue sharing...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Revenue Sharing</h2>
              <p className="text-yellow-100 mt-1">Monetization for developers</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-200 text-sm">Total Revenue:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    ${revenueAnalytics?.totalRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-200 text-sm">Payouts:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    ${revenueAnalytics?.totalPayouts.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-200 text-sm">Pending:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    ${revenueAnalytics?.pendingAmount.toLocaleString()}
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
              { id: 'revenue', name: 'Revenue', icon: '💰' },
              { id: 'payouts', name: 'Payouts', icon: '💳' },
              { id: 'analytics', name: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">💰</span>
                    <div>
                      <h4 className="font-medium text-green-900">Total Revenue</h4>
                      <p className="text-2xl font-bold text-green-700">
                        ${revenueAnalytics?.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">💳</span>
                    <div>
                      <h4 className="font-medium text-blue-900">Total Payouts</h4>
                      <p className="text-2xl font-bold text-blue-700">
                        ${revenueAnalytics?.totalPayouts.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">⏳</span>
                    <div>
                      <h4 className="font-medium text-yellow-900">Pending Amount</h4>
                      <p className="text-2xl font-bold text-yellow-700">
                        ${revenueAnalytics?.pendingAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">📈</span>
                    <div>
                      <h4 className="font-medium text-purple-900">Growth Rate</h4>
                      <p className="text-2xl font-bold text-purple-700">
                        +{revenueAnalytics?.revenueGrowth}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <h4 className="font-medium text-gray-900 mb-3">Top Performing App</h4>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="font-medium text-gray-900">{revenueAnalytics?.topPerformingApp}</p>
                      <p className="text-sm text-gray-600">Highest revenue generator</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Conversion Rate:</span>
                      <span className="text-gray-900">{revenueAnalytics?.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Refund Rate:</span>
                      <span className="text-gray-900">{revenueAnalytics?.refundRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg Monthly Revenue:</span>
                      <span className="text-gray-900">${revenueAnalytics?.averageMonthlyRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {selectedTab === 'revenue' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue History</h3>
              
              <div className="space-y-4">
                {revenueData.map((revenue) => (
                  <motion.div
                    key={revenue.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{revenue.period}</h4>
                        <p className="text-sm text-gray-600">{revenue.transactions} transactions</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(revenue.status)}`}>
                          {revenue.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {revenue.apps.length} apps
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Revenue:</span>
                        <span className="ml-2 text-gray-900 font-medium">
                          ${revenue.totalRevenue.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Developer Share:</span>
                        <span className="ml-2 text-gray-900 font-medium">
                          ${revenue.developerShare.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Platform Fee:</span>
                        <span className="ml-2 text-gray-900 font-medium">
                          ${revenue.platformFee.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    {revenue.payoutDate && (
                      <div className="mt-3 text-sm text-gray-600">
                        Payout Date: {new Date(revenue.payoutDate).toLocaleDateString()}
                      </div>
                    )}
                    
                    <div className="mt-3 flex items-center space-x-2">
                      {revenue.status === 'pending' && (
                        <button
                          onClick={() => processPayout(revenue.id)}
                          disabled={isProcessingPayout}
                          className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200 transition-all disabled:opacity-50"
                        >
                          {isProcessingPayout ? 'Processing...' : 'Process Payout'}
                        </button>
                      )}
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'payouts' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Payout Methods</h3>
              
              <div className="space-y-4">
                {payoutMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getPayoutTypeIcon(method.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{method.type} payout method</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            DEFAULT
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          method.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {method.isVerified ? 'VERIFIED' : 'PENDING'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Details:</div>
                      <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
                        {JSON.stringify(method.details, null, 2)}
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        Last Used: {new Date(method.lastUsed).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Set as Default
                      </button>
                      {!method.isVerified && (
                        <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200 transition-all">
                          Verify
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">App Revenue Analytics</h3>
              
              <div className="space-y-4">
                {appRevenue.map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">📱</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{app.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{app.category} app</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {app.price === 0 ? 'FREE' : `$${app.price}`}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {app.downloads.toLocaleString()} downloads
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Sales:</span>
                          <span className="ml-2 text-gray-900">{app.sales}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Revenue:</span>
                          <span className="ml-2 text-gray-900">${app.revenue.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Developer Share:</span>
                          <span className="ml-2 text-gray-900">${app.developerShare.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Platform Fee:</span>
                          <span className="ml-2 text-gray-900">${app.platformFee.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-gray-900">{app.rating}</span>
                        </div>
                        <div className="text-gray-600">
                          Last Sale: {new Date(app.lastSale).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View Analytics
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Edit App
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Revenue Sharing • ${revenueAnalytics?.totalRevenue.toLocaleString()} total revenue • ${revenueAnalytics?.totalPayouts.toLocaleString()} paid out
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
                console.log('Exporting revenue sharing data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RevenueSharing;
