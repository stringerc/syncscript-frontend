/**
 * Budget Intelligence Component
 * 
 * Provides financial productivity features and budget management
 * Includes expense tracking, savings goals, and financial insights
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BudgetData {
  totalBudget: number;
  spent: number;
  remaining: number;
  categories: Array<{
    name: string;
    budget: number;
    spent: number;
    percentage: number;
    color: string;
  }>;
  savingsGoals: Array<{
    id: string;
    name: string;
    target: number;
    current: number;
    deadline: string;
    priority: 'low' | 'medium' | 'high';
  }>;
  insights: Array<{
    type: 'saving' | 'warning' | 'achievement' | 'suggestion';
    title: string;
    description: string;
    amount?: number;
  }>;
  trends: {
    monthlySpending: Array<{ month: string; amount: number }>;
    categoryTrends: Array<{ category: string; trend: 'up' | 'down' | 'stable'; percentage: number }>;
  };
}

interface BudgetIntelligenceProps {
  userId: string;
  onClose: () => void;
}

const BudgetIntelligence: React.FC<BudgetIntelligenceProps> = ({ userId, onClose }) => {
  const [data, setData] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'goals' | 'insights'>('overview');

  useEffect(() => {
    loadBudgetData();
  }, []);

  const loadBudgetData = async () => {
    setLoading(true);
    try {
      // Simulate API call - in real implementation, this would fetch from backend
      const mockData: BudgetData = {
        totalBudget: 5000,
        spent: 3200,
        remaining: 1800,
        categories: [
          { name: 'Food & Dining', budget: 800, spent: 650, percentage: 81, color: 'from-red-400 to-pink-500' },
          { name: 'Transportation', budget: 600, spent: 420, percentage: 70, color: 'from-blue-400 to-cyan-500' },
          { name: 'Entertainment', budget: 400, spent: 280, percentage: 70, color: 'from-purple-400 to-indigo-500' },
          { name: 'Shopping', budget: 500, spent: 450, percentage: 90, color: 'from-green-400 to-emerald-500' },
          { name: 'Utilities', budget: 300, spent: 250, percentage: 83, color: 'from-yellow-400 to-orange-500' },
          { name: 'Healthcare', budget: 200, spent: 150, percentage: 75, color: 'from-teal-400 to-blue-500' }
        ],
        savingsGoals: [
          {
            id: '1',
            name: 'Emergency Fund',
            target: 10000,
            current: 7500,
            deadline: '2024-12-31',
            priority: 'high'
          },
          {
            id: '2',
            name: 'Vacation Fund',
            target: 3000,
            current: 1200,
            deadline: '2024-08-15',
            priority: 'medium'
          },
          {
            id: '3',
            name: 'New Laptop',
            target: 2000,
            current: 800,
            deadline: '2024-06-30',
            priority: 'low'
          }
        ],
        insights: [
          {
            type: 'saving',
            title: 'Great Savings Rate!',
            description: 'You\'re saving 36% of your budget this month',
            amount: 1800
          },
          {
            type: 'warning',
            title: 'Shopping Category Alert',
            description: 'You\'ve spent 90% of your shopping budget',
            amount: 450
          },
          {
            type: 'achievement',
            title: 'Emergency Fund Progress',
            description: 'You\'re 75% towards your emergency fund goal',
            amount: 7500
          },
          {
            type: 'suggestion',
            title: 'Optimize Transportation',
            description: 'Consider carpooling to save on transportation costs',
            amount: 50
          }
        ],
        trends: {
          monthlySpending: [
            { month: 'Jan', amount: 2800 },
            { month: 'Feb', amount: 3100 },
            { month: 'Mar', amount: 3200 }
          ],
          categoryTrends: [
            { category: 'Food & Dining', trend: 'up', percentage: 5 },
            { category: 'Transportation', trend: 'down', percentage: 10 },
            { category: 'Entertainment', trend: 'stable', percentage: 0 }
          ]
        }
      };

      setData(mockData);
    } catch (error) {
      console.error('Failed to load budget data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'saving': return '💰';
      case 'warning': return '⚠️';
      case 'achievement': return '🏆';
      case 'suggestion': return '💡';
      default: return '📊';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'saving': return 'from-green-400 to-emerald-500';
      case 'warning': return 'from-red-400 to-pink-500';
      case 'achievement': return 'from-yellow-400 to-orange-500';
      case 'suggestion': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading Budget Intelligence...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Budget Data</h3>
            <p className="text-gray-600 mb-4">Set up your budget to start tracking expenses</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Close
            </button>
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
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Budget Intelligence</h2>
              <p className="text-green-100 mt-1">Smart financial productivity insights</p>
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
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'categories', label: 'Categories', icon: '📂' },
              { id: 'goals', label: 'Savings Goals', icon: '🎯' },
              { id: 'insights', label: 'Insights', icon: '💡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Budget Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Budget</p>
                      <p className="text-3xl font-bold">{formatCurrency(data.totalBudget)}</p>
                    </div>
                    <div className="text-4xl">💰</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm">Spent</p>
                      <p className="text-3xl font-bold">{formatCurrency(data.spent)}</p>
                    </div>
                    <div className="text-4xl">💸</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Remaining</p>
                      <p className="text-3xl font-bold">{formatCurrency(data.remaining)}</p>
                    </div>
                    <div className="text-4xl">💚</div>
                  </div>
                </motion.div>
              </div>

              {/* Budget Progress */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Progress</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Budget Usage</span>
                    <span className="text-sm font-medium">{Math.round((data.spent / data.totalBudget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.spent / data.totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.categories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        category.percentage > 90 ? 'text-red-600 bg-red-50' :
                        category.percentage > 75 ? 'text-yellow-600 bg-yellow-50' :
                        'text-green-600 bg-green-50'
                      }`}>
                        {category.percentage}%
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Spent: {formatCurrency(category.spent)}</span>
                        <span>Budget: {formatCurrency(category.budget)}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Remaining: {formatCurrency(category.budget - category.spent)}</span>
                        <span>{category.percentage > 90 ? '⚠️ Over Budget' : '✅ On Track'}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.savingsGoals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Current: {formatCurrency(goal.current)}</span>
                        <span>Target: {formatCurrency(goal.target)}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${getProgressPercentage(goal.current, goal.target)}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress: {Math.round(getProgressPercentage(goal.current, goal.target))}%</span>
                        <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="text-center">
                        <span className="text-sm text-gray-600">
                          Need: {formatCurrency(goal.target - goal.current)} more
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-4">
              {data.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-r ${getInsightColor(insight.type)} text-white p-6 rounded-xl`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{getInsightIcon(insight.type)}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">{insight.title}</h4>
                      <p className="text-sm opacity-90 mb-3">{insight.description}</p>
                      {insight.amount && (
                        <div className="text-2xl font-bold">
                          {formatCurrency(insight.amount)}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BudgetIntelligence;
