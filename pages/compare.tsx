import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Compare() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 5 projects',
        'Basic task management',
        'Mobile app access',
        'Email support',
        'Basic analytics'
      ],
      limitations: [
        'No team collaboration',
        'Limited AI features',
        'No custom integrations'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$12',
      period: '/month',
      description: 'For professionals who need more power',
      features: [
        'Unlimited projects',
        'Advanced task management',
        'AI-powered insights',
        'Team collaboration (up to 5 members)',
        'Priority support',
        'Custom workflows',
        'Advanced analytics',
        'API access'
      ],
      limitations: [],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large teams and organizations',
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'Advanced security features',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Custom training',
        'On-premise deployment'
      ],
      limitations: [],
      popular: false
    }
  ];

  return (
    <>
      <Head>
        <title>Compare Plans - SyncScript</title>
        <meta name="description" content="Compare SyncScript plans and choose the perfect one for your productivity needs." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your
              <span className="text-blue-600"> Perfect Plan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the plan that fits your productivity needs and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-lg shadow-lg p-8 ${
                  plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-3" />
                      <span className="text-gray-500 line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              All plans include
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-gray-700">30-day free trial</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-gray-700">No setup fees</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-gray-700">Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
