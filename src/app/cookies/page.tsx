"use client";

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Settings, 
  Eye, 
  Lock,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function CookiesPage() {
  const cookieCategories = [
    {
      name: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      required: true,
      cookies: [
        'Authentication tokens',
        'Session management',
        'Security preferences',
        'User preferences'
      ]
    },
    {
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      required: false,
      cookies: [
        'Google Analytics',
        'Usage statistics',
        'Performance metrics',
        'User behavior data'
      ]
    },
    {
      name: 'Marketing Cookies',
      description: 'These cookies are used to deliver relevant advertisements.',
      required: false,
      cookies: [
        'Advertising preferences',
        'Campaign tracking',
        'Conversion tracking',
        'Retargeting data'
      ]
    },
    {
      name: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization.',
      required: false,
      cookies: [
        'Language preferences',
        'Theme settings',
        'Custom features',
        'User interface preferences'
      ]
    }
  ];

  const cookieSettings = {
    essential: true, // Always required
    analytics: false,
    marketing: false,
    functional: false
  };

  const handleCookieToggle = (category: string) => {
    console.log(`Toggle ${category} cookies`);
    // In a real application, this would update cookie preferences
  };

  return (
    <>
      <Head>
        <title>Cookie Policy - SyncScript</title>
        <meta name="description" content="Learn about how SyncScript uses cookies to improve your experience and protect your privacy." />
      </Head>

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Cookie Policy
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Learn about how we use cookies to improve your experience and protect your privacy.
              </p>
            </div>

            {/* Cookie Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-8 mb-12"
            >
              <div className="flex items-center mb-6">
                <Settings className="h-6 w-6 text-gray-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Cookie Preferences
                </h2>
              </div>
              
              <div className="space-y-6">
                {cookieCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    className="bg-white rounded-lg p-6 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {category.description}
                        </p>
                      </div>
                      <div className="ml-6">
                        {category.required ? (
                          <div className="flex items-center text-green-600">
                            <Lock className="h-5 w-5 mr-2" />
                            <span className="text-sm font-medium">Required</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleCookieToggle(category.name.toLowerCase().replace(' ', '_'))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              cookieSettings[category.name.toLowerCase().replace(' ', '_') as keyof typeof cookieSettings]
                                ? 'bg-blue-600'
                                : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                cookieSettings[category.name.toLowerCase().replace(' ', '_') as keyof typeof cookieSettings]
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.cookies.map((cookie, cookieIndex) => (
                        <div key={cookieIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          {cookie}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Save Preferences
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Accept All
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Reject All
                </button>
              </div>
            </motion.div>

            {/* Cookie Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Eye className="h-6 w-6 mr-3" />
                  What Are Cookies?
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    Cookies are small text files that are stored on your device when you visit a website. 
                    They help us provide you with a better experience by remembering your preferences and 
                    understanding how you use our website.
                  </p>
                  <p className="text-gray-600">
                    We use cookies to enhance your browsing experience, analyze site traffic, and 
                    personalize content and advertisements. You can control cookie settings through 
                    your browser or our cookie preference center.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Your Rights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">You Can:</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Control cookie preferences</li>
                      <li>• Delete cookies from your browser</li>
                      <li>• Opt-out of non-essential cookies</li>
                      <li>• Request data deletion</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <XCircle className="h-6 w-6 text-red-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">You Cannot:</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Disable essential cookies</li>
                      <li>• Use some features without cookies</li>
                      <li>• Access certain content</li>
                      <li>• Maintain login sessions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Contact Us
                </h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about our use of cookies or this cookie policy, 
                  please contact us at:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900">
                    <strong>Email:</strong> privacy@syncscript.com
                  </p>
                  <p className="text-gray-900">
                    <strong>Address:</strong> 123 Productivity St, San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
