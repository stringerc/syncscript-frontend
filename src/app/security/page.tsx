"use client";

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Key,
  Server,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: <Lock className="h-8 w-8" />,
      title: 'End-to-End Encryption',
      description: 'All your data is encrypted in transit and at rest using industry-standard AES-256 encryption.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'SOC 2 Compliance',
      description: 'We maintain SOC 2 Type II compliance, ensuring the highest security standards.'
    },
    {
      icon: <Key className="h-8 w-8" />,
      title: 'Multi-Factor Authentication',
      description: 'Protect your account with MFA using authenticator apps or SMS verification.'
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: 'Secure Infrastructure',
      description: 'Our infrastructure is hosted on AWS with regular security audits and monitoring.'
    }
  ];

  const securityMeasures = [
    {
      title: 'Data Encryption',
      items: [
        'AES-256 encryption for data at rest',
        'TLS 1.3 for data in transit',
        'End-to-end encryption for sensitive data'
      ]
    },
    {
      title: 'Access Controls',
      items: [
        'Role-based access control (RBAC)',
        'Multi-factor authentication',
        'Regular access reviews and audits'
      ]
    },
    {
      title: 'Monitoring & Compliance',
      items: [
        '24/7 security monitoring',
        'SOC 2 Type II compliance',
        'GDPR and CCPA compliance'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Security - SyncScript</title>
        <meta name="description" content="Learn about SyncScript's security measures and data protection" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Security & Privacy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your data security is our top priority. Learn about the comprehensive 
              security measures we implement to protect your information.
            </p>
          </motion.div>

          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Security Measures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          >
            {securityMeasures.map((measure, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {measure.title}
                </h3>
                <ul className="space-y-4">
                  {measure.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Compliance & Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Compliance & Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  SOC 2 Type II
                </h3>
                <p className="text-gray-600 text-sm">
                  Audited security controls and processes
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  GDPR Compliant
                </h3>
                <p className="text-gray-600 text-sm">
                  European data protection standards
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  CCPA Compliant
                </h3>
                <p className="text-gray-600 text-sm">
                  California consumer privacy rights
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ISO 27001
                </h3>
                <p className="text-gray-600 text-sm">
                  Information security management
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Security Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center"
          >
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Security Concerns?
                </h3>
              </div>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you discover a security vulnerability or have concerns about our security practices, 
                please contact our security team immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:security@syncscript.com"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Report Security Issue
                </a>
                <a
                  href="/contact"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  Contact Security Team
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
