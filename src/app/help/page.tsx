"use client";

import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I get started with SyncScript?',
      answer: 'Getting started is easy! Simply sign up for an account, complete the onboarding process, and start creating your first tasks. We\'ll guide you through each step.'
    },
    {
      id: 2,
      question: 'Can I integrate with other productivity tools?',
      answer: 'Yes! SyncScript integrates with popular tools like Google Calendar, Slack, Notion, and many more. Check our integrations page for the full list.'
    },
    {
      id: 3,
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade security measures including encryption, secure data centers, and comply with industry standards like SOC 2 and GDPR.'
    },
    {
      id: 4,
      question: 'How does the AI assistant work?',
      answer: 'Our AI assistant helps you break down complex tasks, suggests optimal scheduling, and provides productivity insights based on your work patterns.'
    },
    {
      id: 5,
      question: 'Can I use SyncScript on mobile?',
      answer: 'Yes! SyncScript is fully responsive and works great on mobile devices. We also offer native mobile apps for iOS and Android.'
    }
  ];

  const helpCategories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of SyncScript',
      icon: <BookOpen className="h-6 w-6" />,
      articles: 12
    },
    {
      title: 'Task Management',
      description: 'Master task creation and organization',
      icon: <HelpCircle className="h-6 w-6" />,
      articles: 8
    },
    {
      title: 'Integrations',
      description: 'Connect with your favorite tools',
      icon: <ExternalLink className="h-6 w-6" />,
      articles: 15
    },
    {
      title: 'AI Features',
      description: 'Get the most out of our AI assistant',
      icon: <MessageSquare className="h-6 w-6" />,
      articles: 6
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <>
      <Head>
        <title>Help Center - SyncScript</title>
        <meta name="description" content="Get help with SyncScript features and functionality" />
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
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Find answers to common questions and learn how to make the most of SyncScript.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help articles..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Help Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Browse by Category
              </h2>
              <div className="space-y-4">
                {helpCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {category.articles} articles
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-gray-600">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still need help?
              </h3>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Contact Support
                </Link>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
