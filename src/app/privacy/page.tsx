"use client";

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPage() {
  const privacySections = [
    {
      icon: <Database className="h-6 w-6" />,
      title: 'Data Collection',
      content: 'We collect only the data necessary to provide our services and improve your experience.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Data Protection',
      content: 'Your data is protected with industry-standard encryption and security measures.'
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Data Usage',
      content: 'We use your data only for the purposes outlined in this privacy policy.'
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Your Rights',
      content: 'You have the right to access, modify, or delete your personal data at any time.'
    }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy - SyncScript</title>
        <meta name="description" content="Learn how SyncScript protects your privacy and data" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: January 15, 2024
            </p>
          </motion.div>

          {/* Privacy Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Our Commitment to Privacy
            </h2>
            <p className="text-gray-600 mb-6">
              At SyncScript, we take your privacy seriously. This policy explains how we collect, 
              use, and protect your information when you use our services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {privacySections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-blue-50 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      {section.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account information (name, email address)</li>
                  <li>Task and project data</li>
                  <li>Usage information and preferences</li>
                  <li>Communication data when you contact us</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Improve our services and develop new features</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Data Security
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Secure data storage with regular backups</li>
                  <li>Access controls and authentication</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p><strong>Email:</strong> privacy@syncscript.com</p>
                  <p><strong>Address:</strong> 123 Productivity St, Suite 100, San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
