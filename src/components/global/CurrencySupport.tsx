/**
 * Currency Support System Component
 * 
 * Multi-currency budget tracking and financial management
 * Includes currency conversion, exchange rates, and financial reporting
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  flag: string;
  exchangeRate: number;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  currency: string;
  spent: number;
  remaining: number;
  period: 'monthly' | 'yearly' | 'quarterly';
  color: string;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  type: 'income' | 'expense' | 'transfer';
  status: 'completed' | 'pending' | 'cancelled';
}

interface FinancialReport {
  id: string;
  period: string;
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  currency: string;
  categories: Record<string, number>;
  generatedAt: string;
}

interface CurrencySupportProps {
  onClose: () => void;
}

const CurrencySupport: React.FC<CurrencySupportProps> = ({ onClose }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [financialReports, setFinancialReports] = useState<FinancialReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'currencies' | 'budget' | 'transactions' | 'reports'>('currencies');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    loadCurrencyData();
  }, []);

  const loadCurrencyData = async () => {
    setIsLoading(true);
    
    try {
      // Mock currencies
      const mockCurrencies: Currency[] = [
        {
          id: 'usd',
          code: 'USD',
          name: 'US Dollar',
          symbol: '$',
          flag: '🇺🇸',
          exchangeRate: 1.0,
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          trend: 'stable',
          changePercent: 0.0
        },
        {
          id: 'eur',
          code: 'EUR',
          name: 'Euro',
          symbol: '€',
          flag: '🇪🇺',
          exchangeRate: 0.85,
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          trend: 'up',
          changePercent: 0.5
        },
        {
          id: 'gbp',
          code: 'GBP',
          name: 'British Pound',
          symbol: '£',
          flag: '🇬🇧',
          exchangeRate: 0.73,
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          trend: 'down',
          changePercent: -0.3
        },
        {
          id: 'jpy',
          code: 'JPY',
          name: 'Japanese Yen',
          symbol: '¥',
          flag: '🇯🇵',
          exchangeRate: 110.0,
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          trend: 'up',
          changePercent: 0.8
        },
        {
          id: 'cad',
          code: 'CAD',
          name: 'Canadian Dollar',
          symbol: 'C$',
          flag: '🇨🇦',
          exchangeRate: 1.25,
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          trend: 'stable',
          changePercent: 0.1
        },
        {
          id: 'aud',
          code: 'AUD',
          name: 'Australian Dollar',
          symbol: 'A$',
          flag: '🇦🇺',
          exchangeRate: 1.35,
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          trend: 'down',
          changePercent: -0.4
        },
        {
          id: 'chf',
          code: 'CHF',
          name: 'Swiss Franc',
          symbol: 'CHF',
          flag: '🇨🇭',
          exchangeRate: 0.92,
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          trend: 'up',
          changePercent: 0.2
        },
        {
          id: 'cny',
          code: 'CNY',
          name: 'Chinese Yuan',
          symbol: '¥',
          flag: '🇨🇳',
          exchangeRate: 6.45,
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          trend: 'stable',
          changePercent: 0.0
        }
      ];

      // Mock budget categories
      const mockBudgetCategories: BudgetCategory[] = [
        {
          id: 'cat-1',
          name: 'Office Supplies',
          amount: 2000,
          currency: 'USD',
          spent: 1200,
          remaining: 800,
          period: 'monthly',
          color: 'blue'
        },
        {
          id: 'cat-2',
          name: 'Software Licenses',
          amount: 5000,
          currency: 'USD',
          spent: 3200,
          remaining: 1800,
          period: 'yearly',
          color: 'green'
        },
        {
          id: 'cat-3',
          name: 'Marketing',
          amount: 15000,
          currency: 'USD',
          spent: 8500,
          remaining: 6500,
          period: 'quarterly',
          color: 'purple'
        },
        {
          id: 'cat-4',
          name: 'Travel',
          amount: 3000,
          currency: 'EUR',
          spent: 1800,
          remaining: 1200,
          period: 'monthly',
          color: 'orange'
        }
      ];

      // Mock transactions
      const mockTransactions: Transaction[] = [
        {
          id: 'trans-1',
          description: 'Office Supplies Purchase',
          amount: 150,
          currency: 'USD',
          category: 'Office Supplies',
          date: new Date(Date.now() - 86400000).toISOString(),
          type: 'expense',
          status: 'completed'
        },
        {
          id: 'trans-2',
          description: 'Client Payment',
          amount: 5000,
          currency: 'EUR',
          category: 'Income',
          date: new Date(Date.now() - 172800000).toISOString(),
          type: 'income',
          status: 'completed'
        },
        {
          id: 'trans-3',
          description: 'Software License Renewal',
          amount: 1200,
          currency: 'USD',
          category: 'Software Licenses',
          date: new Date(Date.now() - 259200000).toISOString(),
          type: 'expense',
          status: 'pending'
        },
        {
          id: 'trans-4',
          description: 'Marketing Campaign',
          amount: 2500,
          currency: 'USD',
          category: 'Marketing',
          date: new Date(Date.now() - 345600000).toISOString(),
          type: 'expense',
          status: 'completed'
        }
      ];

      // Mock financial reports
      const mockFinancialReports: FinancialReport[] = [
        {
          id: 'report-1',
          period: 'Q4 2024',
          totalIncome: 125000,
          totalExpenses: 85000,
          netIncome: 40000,
          currency: 'USD',
          categories: {
            'Office Supplies': 5000,
            'Software Licenses': 15000,
            'Marketing': 25000,
            'Travel': 8000,
            'Other': 32000
          },
          generatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'report-2',
          period: 'November 2024',
          totalIncome: 45000,
          totalExpenses: 28000,
          netIncome: 17000,
          currency: 'USD',
          categories: {
            'Office Supplies': 2000,
            'Software Licenses': 5000,
            'Marketing': 12000,
            'Travel': 3000,
            'Other': 6000
          },
          generatedAt: new Date(Date.now() - 172800000).toISOString()
        }
      ];

      setCurrencies(mockCurrencies);
      setBudgetCategories(mockBudgetCategories);
      setTransactions(mockTransactions);
      setFinancialReports(mockFinancialReports);
    } catch (error) {
      console.error('Failed to load currency data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertCurrency = async (amount: number, fromCurrency: string, toCurrency: string) => {
    setIsConverting(true);
    
    try {
      // Simulate currency conversion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fromRate = currencies.find(c => c.code === fromCurrency)?.exchangeRate || 1;
      const toRate = currencies.find(c => c.code === toCurrency)?.exchangeRate || 1;
      
      const convertedAmount = (amount / fromRate) * toRate;
      
      console.log(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
    } catch (error) {
      console.error('Failed to convert currency:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'income': return 'text-green-600 bg-green-100';
      case 'expense': return 'text-red-600 bg-red-100';
      case 'transfer': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
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
            <span className="text-lg font-medium text-gray-700">Loading currency support...</span>
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
              <h2 className="text-2xl font-bold">Currency Support</h2>
              <p className="text-yellow-100 mt-1">Multi-currency budget tracking and financial management</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-200 text-sm">Currencies:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {currencies.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-200 text-sm">Categories:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {budgetCategories.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-200 text-sm">Base Currency:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {baseCurrency}
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
              { id: 'currencies', name: 'Currencies', icon: '💱' },
              { id: 'budget', name: 'Budget', icon: '💰' },
              { id: 'transactions', name: 'Transactions', icon: '📊' },
              { id: 'reports', name: 'Reports', icon: '📈' }
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
          {selectedTab === 'currencies' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Supported Currencies</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currencies.map((currency) => (
                  <motion.div
                    key={currency.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{currency.flag}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{currency.name}</h4>
                        <p className="text-sm text-gray-600">{currency.code} • {currency.symbol}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`text-lg ${getTrendColor(currency.trend)}`}>
                          {getTrendIcon(currency.trend)}
                        </span>
                        <span className={`text-sm font-medium ${getTrendColor(currency.trend)}`}>
                          {currency.changePercent > 0 ? '+' : ''}{currency.changePercent}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Exchange Rate:</span>
                        <span className="text-sm font-medium text-gray-900">
                          1 {baseCurrency} = {currency.exchangeRate} {currency.code}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Updated:</span>
                        <span className="text-sm text-gray-900">
                          {new Date(currency.lastUpdated).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => convertCurrency(100, baseCurrency, currency.code)}
                        disabled={isConverting}
                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200 transition-all disabled:opacity-50"
                      >
                        {isConverting ? 'Converting...' : 'Convert'}
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Set Base
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'budget' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Budget Categories</h3>
              
              <div className="space-y-4">
                {budgetCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{category.period} Budget</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {category.remaining.toLocaleString()} {category.currency} remaining
                        </div>
                        <div className="text-xs text-gray-500">
                          {category.spent.toLocaleString()} / {category.amount.toLocaleString()} {category.currency}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          category.remaining > category.amount * 0.3 ? 'bg-green-500' : 
                          category.remaining > category.amount * 0.1 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(category.spent / category.amount) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Budget:</span>
                        <span className="ml-2 text-gray-900">{category.amount.toLocaleString()} {category.currency}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Spent:</span>
                        <span className="ml-2 text-gray-900">{category.spent.toLocaleString()} {category.currency}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Remaining:</span>
                        <span className="ml-2 text-gray-900">{category.remaining.toLocaleString()} {category.currency}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'transactions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                        <p className="text-sm text-gray-600">{transaction.category}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(transaction.type)}`}>
                          {transaction.type.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className={`text-lg font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} {transaction.currency}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Financial Reports</h3>
              
              <div className="space-y-4">
                {financialReports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{report.period}</h4>
                        <p className="text-sm text-gray-600">Generated: {new Date(report.generatedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-medium ${
                          report.netIncome > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {report.netIncome > 0 ? '+' : ''}{report.netIncome.toLocaleString()} {report.currency}
                        </div>
                        <div className="text-xs text-gray-500">Net Income</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Total Income:</span>
                        <span className="ml-2 text-green-600 font-medium">
                          {report.totalIncome.toLocaleString()} {report.currency}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Expenses:</span>
                        <span className="ml-2 text-red-600 font-medium">
                          {report.totalExpenses.toLocaleString()} {report.currency}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Expense Breakdown:</div>
                      {Object.entries(report.categories).map(([category, amount]) => (
                        <div key={category} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{category}:</span>
                          <span className="text-gray-900">{amount.toLocaleString()} {report.currency}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        View Details
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Export PDF
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
            Currency Support • {currencies.length} currencies • {budgetCategories.length} categories • {transactions.length} transactions
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
                console.log('Exporting currency data...');
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

export default CurrencySupport;
