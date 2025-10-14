/**
 * Subscription Management System Component
 * 
 * Comprehensive subscription lifecycle management with billing cycles,
 * plan changes, usage tracking, and automated renewals
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  memberLimit: number;
  features: string[];
  usageLimits: {
    projects: number;
    tasks: number;
    storage: number; // in GB
    apiCalls: number;
    integrations: number;
  };
  metadata: Record<string, any>;
}

interface Subscription {
  id: string;
  teamId: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing' | 'paused';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialStart?: string;
  trialEnd?: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  quantity: number;
  usage: {
    members: number;
    projects: number;
    tasks: number;
    storage: number;
    apiCalls: number;
    integrations: number;
  };
  billingHistory: BillingEvent[];
  createdAt: string;
  updatedAt: string;
}

interface BillingEvent {
  id: string;
  type: 'subscription_created' | 'subscription_updated' | 'subscription_canceled' | 'payment_succeeded' | 'payment_failed' | 'invoice_created' | 'usage_alert';
  description: string;
  amount?: number;
  currency?: string;
  timestamp: string;
  metadata: Record<string, any>;
}

interface UsageAlert {
  id: string;
  type: 'warning' | 'limit_reached' | 'overage';
  resource: string;
  currentUsage: number;
  limit: number;
  message: string;
  timestamp: string;
  resolved: boolean;
}

interface SubscriptionManagementProps {
  teamId: string;
  onClose: () => void;
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams getting started',
    price: 8,
    currency: 'usd',
    interval: 'month',
    memberLimit: 10,
    features: [
      'Up to 10 team members',
      'Unlimited projects and tasks',
      'Basic collaboration tools',
      'Email support',
      'Standard integrations',
      'Basic analytics'
    ],
    usageLimits: {
      projects: 50,
      tasks: 1000,
      storage: 10,
      apiCalls: 10000,
      integrations: 5
    },
    metadata: {
      color: 'from-blue-500 to-cyan-500',
      popular: false
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Advanced features for growing teams',
    price: 15,
    currency: 'usd',
    interval: 'month',
    memberLimit: 50,
    features: [
      'Up to 50 team members',
      'Advanced project management',
      'Team analytics and insights',
      'Priority support',
      'Advanced integrations',
      'Custom workflows',
      'API access',
      'Advanced security'
    ],
    usageLimits: {
      projects: 200,
      tasks: 5000,
      storage: 100,
      apiCalls: 100000,
      integrations: 20
    },
    metadata: {
      color: 'from-purple-500 to-pink-500',
      popular: true
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Full-featured solution for large organizations',
    price: 25,
    currency: 'usd',
    interval: 'month',
    memberLimit: -1, // Unlimited
    features: [
      'Unlimited team members',
      'Enterprise SSO integration',
      'Advanced security and compliance',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'Advanced reporting',
      'SLA guarantee'
    ],
    usageLimits: {
      projects: -1, // Unlimited
      tasks: -1, // Unlimited
      storage: 1000,
      apiCalls: 1000000,
      integrations: -1 // Unlimited
    },
    metadata: {
      color: 'from-indigo-500 to-purple-500',
      popular: false
    }
  }
];

const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({ teamId, onClose }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usageAlerts, setUsageAlerts] = useState<UsageAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'usage' | 'billing' | 'plans'>('overview');
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [selectedNewPlan, setSelectedNewPlan] = useState<string>('');

  useEffect(() => {
    loadSubscriptionData();
  }, [teamId]);

  const loadSubscriptionData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock subscription data
      const mockSubscription: Subscription = {
        id: 'sub_mock123',
        teamId,
        planId: 'professional',
        status: 'active',
        currentPeriodStart: '2024-03-01T00:00:00Z',
        currentPeriodEnd: '2024-04-01T00:00:00Z',
        cancelAtPeriodEnd: false,
        price: 1500, // $15.00 in cents
        currency: 'usd',
        interval: 'month',
        quantity: 1,
        usage: {
          members: 12,
          projects: 8,
          tasks: 156,
          storage: 2.3,
          apiCalls: 15420,
          integrations: 3
        },
        billingHistory: [
          {
            id: 'event-1',
            type: 'subscription_created',
            description: 'Professional plan subscription created',
            amount: 1500,
            currency: 'usd',
            timestamp: '2024-01-15T00:00:00Z',
            metadata: { planId: 'professional' }
          },
          {
            id: 'event-2',
            type: 'payment_succeeded',
            description: 'Payment processed successfully',
            amount: 1500,
            currency: 'usd',
            timestamp: '2024-03-01T00:00:00Z',
            metadata: { invoiceId: 'in_123' }
          },
          {
            id: 'event-3',
            type: 'usage_alert',
            description: 'API calls approaching limit',
            timestamp: '2024-03-15T00:00:00Z',
            metadata: { resource: 'apiCalls', usage: 8500, limit: 100000 }
          }
        ],
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: new Date().toISOString()
      };

      // Mock usage alerts
      const mockAlerts: UsageAlert[] = [
        {
          id: 'alert-1',
          type: 'warning',
          resource: 'apiCalls',
          currentUsage: 8500,
          limit: 100000,
          message: 'API calls are approaching your monthly limit',
          timestamp: '2024-03-15T00:00:00Z',
          resolved: false
        },
        {
          id: 'alert-2',
          type: 'warning',
          resource: 'storage',
          currentUsage: 2.3,
          limit: 100,
          message: 'Storage usage is growing rapidly',
          timestamp: '2024-03-10T00:00:00Z',
          resolved: false
        }
      ];

      setSubscription(mockSubscription);
      setUsageAlerts(mockAlerts);
    } catch (error) {
      console.error('Failed to load subscription data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePlan = async (newPlanId: string) => {
    setIsChangingPlan(true);
    setSelectedNewPlan(newPlanId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPlan = SUBSCRIPTION_PLANS.find(p => p.id === newPlanId);
      if (!newPlan || !subscription) return;

      setSubscription(prev => prev ? {
        ...prev,
        planId: newPlanId,
        price: newPlan.price * 100,
        usage: {
          ...prev.usage,
          // Reset usage limits based on new plan
          projects: Math.min(prev.usage.projects, newPlan.usageLimits.projects === -1 ? Infinity : newPlan.usageLimits.projects),
          tasks: Math.min(prev.usage.tasks, newPlan.usageLimits.tasks === -1 ? Infinity : newPlan.usageLimits.tasks),
          storage: Math.min(prev.usage.storage, newPlan.usageLimits.storage),
          apiCalls: Math.min(prev.usage.apiCalls, newPlan.usageLimits.apiCalls),
          integrations: Math.min(prev.usage.integrations, newPlan.usageLimits.integrations === -1 ? Infinity : newPlan.usageLimits.integrations)
        },
        updatedAt: new Date().toISOString()
      } : null);
      
      console.log('✅ Plan changed successfully');
    } catch (error) {
      console.error('Failed to change plan:', error);
    } finally {
      setIsChangingPlan(false);
      setSelectedNewPlan('');
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubscription(prev => prev ? {
        ...prev,
        cancelAtPeriodEnd: true,
        status: 'canceled' as any,
        updatedAt: new Date().toISOString()
      } : null);
      
      console.log('✅ Subscription canceled successfully');
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  };

  const handleResumeSubscription = async () => {
    if (!subscription) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubscription(prev => prev ? {
        ...prev,
        cancelAtPeriodEnd: false,
        status: 'active' as any,
        updatedAt: new Date().toISOString()
      } : null);
      
      console.log('✅ Subscription resumed successfully');
    } catch (error) {
      console.error('Failed to resume subscription:', error);
    }
  };

  const getCurrentPlan = () => {
    if (!subscription) return null;
    return SUBSCRIPTION_PLANS.find(p => p.id === subscription.planId);
  };

  const getUsagePercentage = (current: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'canceled': return 'text-red-600 bg-red-100';
      case 'past_due': return 'text-yellow-600 bg-yellow-100';
      case 'unpaid': return 'text-red-600 bg-red-100';
      case 'trialing': return 'text-blue-600 bg-blue-100';
      case 'paused': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100);
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading subscription data...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">💳</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Subscription</h2>
            <p className="text-gray-600 mb-6">Choose a plan to get started with SyncScript</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Choose Plan
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentPlan = getCurrentPlan();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Subscription Management</h2>
              <p className="text-blue-100 mt-1">Manage your team's subscription and billing</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Plan:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {currentPlan?.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Status:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {subscription.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Next Billing:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
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
              { id: 'usage', name: 'Usage', icon: '📈' },
              { id: 'billing', name: 'Billing', icon: '💳' },
              { id: 'plans', name: 'Plans', icon: '🎯' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
              {/* Current Subscription */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{currentPlan?.name} Plan</h3>
                    <p className="text-gray-600">{currentPlan?.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(subscription.price, subscription.currency)}
                    </div>
                    <div className="text-sm text-gray-600">per {subscription.interval}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
                      {subscription.status.toUpperCase()}
                    </span>
                    {subscription.cancelAtPeriodEnd && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        CANCELS AT PERIOD END
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {subscription.cancelAtPeriodEnd ? (
                      <button
                        onClick={handleResumeSubscription}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm"
                      >
                        Resume Subscription
                      </button>
                    ) : (
                      <button
                        onClick={handleCancelSubscription}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm"
                      >
                        Cancel Subscription
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Usage Alerts */}
              {usageAlerts.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Alerts</h3>
                  <div className="space-y-3">
                    {usageAlerts.filter(alert => !alert.resolved).map((alert) => (
                      <div key={alert.id} className={`p-4 border rounded-lg ${
                        alert.type === 'limit_reached' ? 'border-red-200 bg-red-50' :
                        alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                        'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{alert.message}</div>
                            <div className="text-sm text-gray-600">
                              {alert.currentUsage} / {alert.limit === -1 ? 'Unlimited' : alert.limit} {alert.resource}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            alert.type === 'limit_reached' ? 'bg-red-100 text-red-800' :
                            alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {alert.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">{subscription.usage.members}</div>
                  <div className="text-green-600 text-sm">Team Members</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">{subscription.usage.projects}</div>
                  <div className="text-blue-600 text-sm">Active Projects</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-900">{subscription.usage.tasks}</div>
                  <div className="text-purple-600 text-sm">Total Tasks</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-900">{subscription.usage.storage}GB</div>
                  <div className="text-orange-600 text-sm">Storage Used</div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'usage' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Usage Tracking</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(subscription.usage).map(([resource, currentUsage]) => {
                  const limit = currentPlan?.usageLimits[resource as keyof typeof currentPlan.usageLimits] || 0;
                  const percentage = getUsagePercentage(currentUsage, limit);
                  
                  return (
                    <div key={resource} className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900 capitalize">
                          {resource.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getUsageColor(percentage)}`}>
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            percentage >= 90 ? 'bg-red-500' :
                            percentage >= 75 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{currentUsage}</span>
                        <span>{limit === -1 ? 'Unlimited' : limit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
              
              <div className="space-y-4">
                {subscription.billingHistory.map((event) => (
                  <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">
                          {event.type === 'subscription_created' ? '🎉' :
                           event.type === 'payment_succeeded' ? '✅' :
                           event.type === 'payment_failed' ? '❌' :
                           event.type === 'usage_alert' ? '⚠️' :
                           '📄'}
                        </span>
                        <span className="font-medium text-gray-900">{event.description}</span>
                      </div>
                      <div className="text-right">
                        {event.amount && (
                          <div className="text-lg font-bold text-gray-900">
                            {formatCurrency(event.amount, event.currency)}
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          {new Date(event.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'plans' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Available Plans</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-6 border-2 rounded-xl transition-all ${
                      subscription.planId === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${plan.metadata.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
                  >
                    {plan.metadata.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.metadata.color} mb-4`}></div>
                    <h4 className="font-semibold text-gray-900 mb-2">{plan.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900">
                        ${plan.price}
                        <span className="text-lg font-normal text-gray-600">/{plan.interval}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {plan.memberLimit === -1 ? 'Unlimited' : `Up to ${plan.memberLimit}`} members
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleChangePlan(plan.id)}
                      disabled={isChangingPlan || subscription.planId === plan.id}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                        subscription.planId === plan.id
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                      }`}
                    >
                      {isChangingPlan && selectedNewPlan === plan.id ? 'Changing...' :
                       subscription.planId === plan.id ? 'Current Plan' : 'Change Plan'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {currentPlan?.name} Plan • {formatCurrency(subscription.price, subscription.currency)}/{subscription.interval}
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
                console.log('Exporting subscription data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionManagement;
