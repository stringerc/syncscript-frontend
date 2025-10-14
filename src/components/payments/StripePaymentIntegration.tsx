/**
 * Stripe Payment Integration Component
 * 
 * Comprehensive payment processing with Stripe API integration
 * Includes subscription management, billing cycles, and payment security
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StripeCustomer {
  id: string;
  email: string;
  name: string;
  teamId: string;
  subscriptionId?: string;
  paymentMethodId?: string;
  billingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Subscription {
  id: string;
  customerId: string;
  teamId: string;
  planId: string;
  planName: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialStart?: string;
  trialEnd?: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  quantity: number;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

interface PaymentMethod {
  id: string;
  customerId: string;
  type: 'card' | 'bank_account' | 'paypal';
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  bankAccount?: {
    bankName: string;
    last4: string;
    routingNumber: string;
  };
  isDefault: boolean;
  createdAt: string;
}

interface Invoice {
  id: string;
  customerId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  dueDate: string;
  paidAt?: string;
  invoiceUrl: string;
  pdfUrl: string;
  lineItems: InvoiceLineItem[];
  createdAt: string;
}

interface InvoiceLineItem {
  id: string;
  description: string;
  amount: number;
  quantity: number;
  period: {
    start: string;
    end: string;
  };
}

interface StripePaymentIntegrationProps {
  teamId: string;
  onClose: () => void;
}

const SUBSCRIPTION_PLANS = [
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
    color: 'from-blue-500 to-cyan-500',
    popular: false
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
    color: 'from-purple-500 to-pink-500',
    popular: true
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
    color: 'from-indigo-500 to-purple-500',
    popular: false
  }
];

const StripePaymentIntegration: React.FC<StripePaymentIntegrationProps> = ({ teamId, onClose }) => {
  const [customer, setCustomer] = useState<StripeCustomer | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'plans' | 'billing' | 'payment-methods' | 'invoices'>('plans');

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    }
  });

  useEffect(() => {
    loadPaymentData();
  }, [teamId]);

  const loadPaymentData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls to Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock customer data
      const mockCustomer: StripeCustomer = {
        id: 'cus_mock123',
        email: 'admin@team.com',
        name: 'Team Admin',
        teamId,
        subscriptionId: 'sub_mock123',
        paymentMethodId: 'pm_mock123',
        billingAddress: {
          line1: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94105',
          country: 'US'
        },
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: new Date().toISOString()
      };

      // Mock subscription data
      const mockSubscription: Subscription = {
        id: 'sub_mock123',
        customerId: 'cus_mock123',
        teamId,
        planId: 'professional',
        planName: 'Professional',
        status: 'active',
        currentPeriodStart: '2024-03-01T00:00:00Z',
        currentPeriodEnd: '2024-04-01T00:00:00Z',
        cancelAtPeriodEnd: false,
        price: 15,
        currency: 'usd',
        interval: 'month',
        quantity: 1,
        metadata: {
          teamSize: '12',
          features: 'advanced'
        },
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: new Date().toISOString()
      };

      // Mock payment methods
      const mockPaymentMethods: PaymentMethod[] = [
        {
          id: 'pm_mock123',
          customerId: 'cus_mock123',
          type: 'card',
          card: {
            brand: 'visa',
            last4: '4242',
            expMonth: 12,
            expYear: 2025
          },
          isDefault: true,
          createdAt: '2024-01-15T00:00:00Z'
        }
      ];

      // Mock invoices
      const mockInvoices: Invoice[] = [
        {
          id: 'in_mock123',
          customerId: 'cus_mock123',
          subscriptionId: 'sub_mock123',
          amount: 1500, // $15.00 in cents
          currency: 'usd',
          status: 'paid',
          dueDate: '2024-03-01T00:00:00Z',
          paidAt: '2024-03-01T00:00:00Z',
          invoiceUrl: 'https://invoice.stripe.com/i/acct_mock123/in_mock123',
          pdfUrl: 'https://invoice.stripe.com/i/acct_mock123/in_mock123.pdf',
          lineItems: [
            {
              id: 'li_mock123',
              description: 'Professional Plan - March 2024',
              amount: 1500,
              quantity: 1,
              period: {
                start: '2024-03-01T00:00:00Z',
                end: '2024-04-01T00:00:00Z'
              }
            }
          ],
          createdAt: '2024-03-01T00:00:00Z'
        }
      ];

      setCustomer(mockCustomer);
      setSubscription(mockSubscription);
      setPaymentMethods(mockPaymentMethods);
      setInvoices(mockInvoices);
    } catch (error) {
      console.error('Failed to load payment data:', error);
      setPaymentError('Failed to load payment information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSubscription = async () => {
    setIsProcessingPayment(true);
    setPaymentError(null);
    
    try {
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan);
      if (!plan) return;

      // Simulate Stripe API calls
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newSubscription: Subscription = {
        id: `sub_${Date.now()}`,
        customerId: customer?.id || 'cus_new',
        teamId,
        planId: selectedPlan,
        planName: plan.name,
        status: 'active',
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
        price: plan.price * 100, // Convert to cents
        currency: plan.currency,
        interval: plan.interval as 'month' | 'year',
        quantity: 1,
        metadata: {
          teamSize: '1',
          features: plan.id
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setSubscription(newSubscription);
      console.log('✅ Subscription created successfully');
    } catch (error) {
      console.error('Failed to create subscription:', error);
      setPaymentError('Failed to create subscription. Please try again.');
    } finally {
      setIsProcessingPayment(false);
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
      setPaymentError('Failed to cancel subscription. Please try again.');
    }
  };

  const handleUpdatePaymentMethod = async () => {
    setIsProcessingPayment(true);
    setPaymentError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPaymentMethod: PaymentMethod = {
        id: `pm_${Date.now()}`,
        customerId: customer?.id || 'cus_new',
        type: 'card',
        card: {
          brand: 'visa',
          last4: paymentForm.cardNumber.slice(-4),
          expMonth: parseInt(paymentForm.expiryDate.split('/')[0]),
          expYear: parseInt(paymentForm.expiryDate.split('/')[1])
        },
        isDefault: true,
        createdAt: new Date().toISOString()
      };

      setPaymentMethods(prev => [newPaymentMethod, ...prev.filter(pm => !pm.isDefault)]);
      console.log('✅ Payment method updated successfully');
    } catch (error) {
      console.error('Failed to update payment method:', error);
      setPaymentError('Failed to update payment method. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'canceled': return 'text-red-600 bg-red-100';
      case 'past_due': return 'text-yellow-600 bg-yellow-100';
      case 'unpaid': return 'text-red-600 bg-red-100';
      case 'trialing': return 'text-blue-600 bg-blue-100';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading payment data...</span>
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Stripe Payment Integration</h2>
              <p className="text-green-100 mt-1">Secure payment processing and subscription management</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Status:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {subscription ? subscription.status.toUpperCase() : 'NO SUBSCRIPTION'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Plan:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {subscription ? subscription.planName : 'NONE'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Next Billing:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {subscription ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : 'N/A'}
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
              { id: 'plans', name: 'Subscription Plans', icon: '💳' },
              { id: 'billing', name: 'Billing Info', icon: '📊' },
              { id: 'payment-methods', name: 'Payment Methods', icon: '💳' },
              { id: 'invoices', name: 'Invoices', icon: '📄' }
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'plans' && (
            <div className="space-y-8">
              {/* Current Subscription */}
              {subscription && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Current Subscription</h3>
                      <p className="text-gray-600">{subscription.planName} Plan</p>
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
                      <button
                        onClick={handleCancelSubscription}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm"
                      >
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Available Plans */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${plan.popular ? 'ring-2 ring-green-500 ring-opacity-50' : ''}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} mb-4`}></div>
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreateSubscription();
                        }}
                        disabled={isProcessingPayment || subscription?.planId === plan.id}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                          subscription?.planId === plan.id
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                        }`}
                      >
                        {isProcessingPayment ? 'Processing...' : 
                         subscription?.planId === plan.id ? 'Current Plan' : 'Select Plan'}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {paymentError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700">{paymentError}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Billing Information</h3>
              
              {customer && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Customer Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <p className="text-gray-900">{customer.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{customer.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
                      <p className="text-gray-900 font-mono text-sm">{customer.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Team ID</label>
                      <p className="text-gray-900 font-mono text-sm">{customer.teamId}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="font-medium text-gray-900 mb-3">Billing Address</h5>
                    <div className="text-gray-700">
                      <p>{customer.billingAddress.line1}</p>
                      {customer.billingAddress.line2 && <p>{customer.billingAddress.line2}</p>}
                      <p>{customer.billingAddress.city}, {customer.billingAddress.state} {customer.billingAddress.postalCode}</p>
                      <p>{customer.billingAddress.country}</p>
                    </div>
                  </div>
                </div>
              )}

              {subscription && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Subscription Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                      <p className="text-gray-900">{subscription.planName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(subscription.status)}`}>
                        {subscription.status.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Period</label>
                      <p className="text-gray-900">
                        {new Date(subscription.currentPeriodStart).toLocaleDateString()} - {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Next Billing</label>
                      <p className="text-gray-900">{formatCurrency(subscription.price, subscription.currency)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'payment-methods' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                <button
                  onClick={() => setSelectedTab('payment-methods')}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm"
                >
                  Add Payment Method
                </button>
              </div>

              {/* Payment Methods List */}
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {method.card?.brand.charAt(0).toUpperCase() || '💳'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {method.card?.brand.toUpperCase()} •••• {method.card?.last4}
                          </div>
                          <div className="text-sm text-gray-600">
                            Expires {method.card?.expMonth}/{method.card?.expYear}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            DEFAULT
                          </span>
                        )}
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Payment Method Form */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">Add New Payment Method</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentForm.cardNumber}
                      onChange={(e) => setPaymentForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={paymentForm.cardholderName}
                      onChange={(e) => setPaymentForm(prev => ({ ...prev, cardholderName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentForm.expiryDate}
                      onChange={(e) => setPaymentForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={paymentForm.cvv}
                      onChange={(e) => setPaymentForm(prev => ({ ...prev, cvv: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleUpdatePaymentMethod}
                  disabled={isProcessingPayment}
                  className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all"
                >
                  {isProcessingPayment ? 'Adding...' : 'Add Payment Method'}
                </button>
              </div>
            </div>
          )}

          {selectedTab === 'invoices' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Invoice History</h3>
              
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {invoice.status.toUpperCase()}
                        </span>
                        <span className="font-medium text-gray-900">Invoice #{invoice.id}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(invoice.amount, invoice.currency)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Due {new Date(invoice.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {invoice.lineItems.map(item => item.description).join(', ')}
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={invoice.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm"
                        >
                          View Invoice
                        </a>
                        <a
                          href={invoice.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm"
                        >
                          Download PDF
                        </a>
                      </div>
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
            Powered by Stripe • Secure payment processing
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
                console.log('Exporting billing data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Export Billing Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StripePaymentIntegration;
