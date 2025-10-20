"use client";

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, Users } from 'lucide-react';

export default function TermsPage() {
  const termsSections = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'User Responsibilities',
      content: 'Users are responsible for maintaining the security of their accounts and using the service appropriately.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Service Availability',
      content: 'We strive to maintain high service availability but cannot guarantee 100% uptime.'
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: 'Intellectual Property',
      content: 'Users retain ownership of their content while granting SyncScript necessary usage rights.'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Privacy & Data',
      content: 'Our privacy policy governs how we collect, use, and protect your personal information.'
    }
  ];

  return (
    <>
      <Head>
        <title>Terms of Service - SyncScript</title>
        <meta name="description" content="Read SyncScript's terms of service and user agreement" />
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: January 15, 2024
            </p>
          </motion.div>

          {/* Terms Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Agreement Overview
            </h2>
            <p className="text-gray-600 mb-6">
              By using SyncScript, you agree to be bound by these Terms of Service. 
              Please read them carefully before using our service.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {termsSections.map((section, index) => (
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

          {/* Detailed Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  By accessing and using SyncScript, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
                <p>
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Use License
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Permission is granted to temporarily download one copy of SyncScript per device 
                  for personal, non-commercial transitory viewing only.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>This is the grant of a license, not a transfer of title</li>
                  <li>You may not modify or copy the materials</li>
                  <li>You may not use the materials for commercial purposes</li>
                  <li>You may not reverse engineer or attempt to extract source code</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                User Accounts
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  When you create an account with us, you must provide information that is 
                  accurate, complete, and current at all times.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are responsible for safeguarding the password</li>
                  <li>You are responsible for all activities under your account</li>
                  <li>You must notify us immediately of any unauthorized use</li>
                  <li>We reserve the right to terminate accounts at our discretion</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Prohibited Uses
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>You may not use our service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations</li>
                  <li>To infringe upon or violate our intellectual property rights</li>
                  <li>To harass, abuse, insult, harm, or discriminate against others</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Termination
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We may terminate or suspend your account immediately, without prior notice 
                  or liability, for any reason whatsoever, including without limitation if 
                  you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the service will cease immediately.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p><strong>Email:</strong> legal@syncscript.com</p>
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
