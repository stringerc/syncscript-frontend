"use client";

import React from 'react';
import Navigation from '../../components/Navigation';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Users, 
  BarChart3,
  Brain,
  Shield,
  Clock,
  Calendar,
  MessageCircle,
  Settings,
  Smartphone,
  Globe
} from 'lucide-react';

export default function FeaturesPage() {
  const featureCategories = [
    {
      title: 'AI-Powered Productivity',
      description: 'Harness the power of artificial intelligence to boost your productivity',
      features: [
        {
          icon: <Brain className="h-6 w-6" />,
          title: 'Smart Task Breakdown',
          description: 'AI automatically breaks down complex tasks into manageable subtasks',
          highlight: true
        },
        {
          icon: <Zap className="h-6 w-6" />,
          title: 'Intelligent Scheduling',
          description: 'AI optimizes your schedule based on your energy levels and priorities',
          highlight: true
        },
        {
          icon: <Target className="h-6 w-6" />,
          title: 'Goal Optimization',
          description: 'AI helps you set and achieve realistic, measurable goals',
          highlight: false
        }
      ]
    },
    {
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team using advanced collaboration tools',
      features: [
        {
          icon: <Users className="h-6 w-6" />,
          title: 'Real-time Collaboration',
          description: 'Work together on tasks and projects in real-time',
          highlight: true
        },
        {
          icon: <MessageCircle className="h-6 w-6" />,
          title: 'Integrated Communication',
          description: 'Built-in chat and video calls for seamless communication',
          highlight: false
        },
        {
          icon: <BarChart3 className="h-6 w-6" />,
          title: 'Team Analytics',
          description: 'Track team performance and productivity metrics',
          highlight: false
        }
      ]
    },
    {
      title: 'Advanced Analytics',
      description: 'Get deep insights into your productivity patterns and performance',
      features: [
        {
          icon: <BarChart3 className="h-6 w-6" />,
          title: 'Productivity Insights',
          description: 'Detailed analytics on your work patterns and efficiency',
          highlight: true
        },
        {
          icon: <Clock className="h-6 w-6" />,
          title: 'Time Tracking',
          description: 'Automatic time tracking with detailed reports',
          highlight: false
        },
        {
          icon: <Target className="h-6 w-6" />,
          title: 'Performance Metrics',
          description: 'Track your progress and identify areas for improvement',
          highlight: false
        }
      ]
    },
    {
      title: 'Security & Privacy',
      description: 'Enterprise-grade security to protect your data and privacy',
      features: [
        {
          icon: <Shield className="h-6 w-6" />,
          title: 'End-to-End Encryption',
          description: 'Your data is protected with military-grade encryption',
          highlight: true
        },
        {
          icon: <Settings className="h-6 w-6" />,
          title: 'Privacy Controls',
          description: 'Granular privacy settings to control your data',
          highlight: false
        },
        {
          icon: <Globe className="h-6 w-6" />,
          title: 'GDPR Compliant',
          description: 'Full compliance with international privacy regulations',
          highlight: false
        }
      ]
    }
  ];

  const integrations = [
    { name: 'Google Calendar', logo: '📅' },
    { name: 'Slack', logo: '💬' },
    { name: 'Microsoft Teams', logo: '🏢' },
    { name: 'Notion', logo: '📝' },
    { name: 'Trello', logo: '📋' },
    { name: 'Asana', logo: '✅' },
    { name: 'Jira', logo: '🎯' },
    { name: 'GitHub', logo: '🐙' }
  ];

  return (
    <>
      <Head>
        <title>Features - SyncScript</title>
        <meta name="description" content="Discover SyncScript's powerful features designed to revolutionize your productivity and team collaboration." />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Powerful Features
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how SyncScript's advanced features can transform your productivity 
                and revolutionize the way you work.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Feature Categories */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {featureCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {category.title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {category.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (featureIndex * 0.1) }}
                        className={`p-6 rounded-lg ${
                          feature.highlight 
                            ? 'bg-blue-50 border-2 border-blue-200' 
                            : 'bg-white border border-gray-200'
                        } hover:shadow-lg transition-shadow`}
                      >
                        <div className="text-blue-600 mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">
                          {feature.description}
                        </p>
                        {feature.highlight && (
                          <div className="mt-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Popular
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Seamless Integrations
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Connect with your favorite tools and services to create a unified workflow.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                  >
                    <div className="text-3xl mb-2">{integration.logo}</div>
                    <div className="text-sm font-medium text-gray-700">
                      {integration.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mobile & Accessibility */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Access Anywhere, Anytime
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  SyncScript works seamlessly across all your devices. Whether you're on your 
                  desktop, tablet, or smartphone, your productivity tools are always at your fingertips.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Smartphone className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="text-gray-700">Native mobile apps for iOS and Android</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="text-gray-700">Responsive web interface</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="text-gray-700">Offline mode for uninterrupted productivity</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-100 rounded-lg p-8 text-center"
              >
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mobile First Design
                </h3>
                <p className="text-gray-600">
                  Optimized for mobile devices with touch-friendly interfaces and 
                  gesture-based navigation.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Experience These Features?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Start your free trial today and discover how SyncScript can transform your productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Free Trial
                </button>
                <button className="border border-blue-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
