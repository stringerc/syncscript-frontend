#!/usr/bin/env python3
"""
🧠 GEMINI PHASE 6B: App Pages Template Generator
Mission: Generate clean templates for 9 app pages
"""

import os

def generate_contact_page_tsx():
    """Generate clean src/app/contact/page.tsx"""
    return '''"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Clock,
  MessageSquare
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'hello@syncscript.com',
      action: 'mailto:hello@syncscript.com'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Call Us',
      description: 'Speak directly with our support team',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Visit Us',
      description: 'Come see us at our office',
      contact: '123 Productivity St, Suite 100, San Francisco, CA 94105',
      action: 'https://maps.google.com'
    }
  ];

  return (
    <>
      <Head>
        <title>Contact Us - SyncScript</title>
        <meta name="description" content="Get in touch with the SyncScript team" />
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
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What can we help you with?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in touch
                </h2>
                <p className="text-gray-600 mb-8">
                  We\'re here to help and answer any question you might have. 
                  We look forward to hearing from you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {info.description}
                        </p>
                        <a
                          href={info.action}
                          className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                        >
                          {info.contact}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-blue-50 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Response Time
                  </h3>
                </div>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours. 
                  For urgent matters, please call us directly.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
'''

def generate_help_page_tsx():
    """Generate clean src/app/help/page.tsx"""
    return '''"use client";

import React, { useState } from 'react';
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
                Can\'t find what you\'re looking for? Our support team is here to help.
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
'''

def generate_icon_tsx():
    """Generate clean src/app/icon.tsx"""
    return '''import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}
'''

def generate_layout_tsx():
    """Generate clean src/app/layout.tsx"""
    return '''import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SyncScript - AI-Powered Productivity Platform',
  description: 'Transform your productivity with AI-driven task management, smart scheduling, and seamless team collaboration.',
  keywords: 'productivity, AI, task management, team collaboration, scheduling',
  authors: [{ name: 'SyncScript Team' }],
  creator: 'SyncScript',
  publisher: 'SyncScript',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://syncscript.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SyncScript - AI-Powered Productivity Platform',
    description: 'Transform your productivity with AI-driven task management, smart scheduling, and seamless team collaboration.',
    url: 'https://syncscript.com',
    siteName: 'SyncScript',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SyncScript - AI-Powered Productivity Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SyncScript - AI-Powered Productivity Platform',
    description: 'Transform your productivity with AI-driven task management, smart scheduling, and seamless team collaboration.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
'''

def generate_loading_tsx():
    """Generate clean src/app/loading.tsx"""
    return '''import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
'''

def generate_login_page_tsx():
    """Generate clean src/app/login/page.tsx"""
    return '''"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  Github,
  Chrome
} from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Login attempt:', formData);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login - SyncScript</title>
        <meta name="description" content="Sign in to your SyncScript account" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your SyncScript account
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <Github className="h-5 w-5" />
                  <span className="ml-2">GitHub</span>
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <Chrome className="h-5 w-5" />
                  <span className="ml-2">Google</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don\'t have an account?{' '}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
'''

def generate_main_page_tsx():
    """Generate clean src/app/page.tsx"""
    return '''"use client";

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Play, 
  CheckCircle,
  Users,
  Zap,
  Shield,
  Star
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'AI-Powered Task Breakdown',
      description: 'Break down complex projects into manageable tasks with intelligent suggestions.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team using real-time collaboration tools.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Enterprise Security',
      description: 'Your data is protected with enterprise-grade security measures.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      content: 'SyncScript has transformed how our team manages projects. The AI insights are incredible.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'CEO',
      company: 'StartupXYZ',
      content: 'Finally, a productivity tool that actually understands how I work. Game changer.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Designer',
      company: 'CreativeStudio',
      content: 'The collaboration features are seamless. Our team productivity has increased by 40%.',
      rating: 5
    }
  ];

  return (
    <>
      <Head>
        <title>SyncScript - AI-Powered Productivity Platform</title>
        <meta name="description" content="Transform your productivity with AI-driven task management, smart scheduling, and seamless team collaboration." />
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Transform Your
                <span className="text-blue-600"> Productivity</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                AI-powered task management, smart scheduling, and seamless team collaboration 
                in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything you need to stay productive
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to help you and your team achieve more.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
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
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Loved by teams worldwide
              </h2>
              <p className="text-xl text-gray-600">
                See what our users are saying about SyncScript.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to transform your productivity?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of teams already using SyncScript to achieve more.
              </p>
              <Link
                href="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
'''

def generate_privacy_page_tsx():
    """Generate clean src/app/privacy/page.tsx"""
    return '''"use client";

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
'''

def generate_register_page_tsx():
    """Generate clean src/app/register/page.tsx"""
    return '''"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Mail, 
  Lock, 
  User,
  Eye, 
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  Check
} from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Registration attempt:', formData);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Sign Up - SyncScript</title>
        <meta name="description" content="Create your SyncScript account and start being more productive" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Start your productivity journey today
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create a password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <Github className="h-5 w-5" />
                  <span className="ml-2">GitHub</span>
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <Chrome className="h-5 w-5" />
                  <span className="ml-2">Google</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
'''

def generate_security_page_tsx():
    """Generate clean src/app/security/page.tsx"""
    return '''"use client";

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
'''

def generate_terms_page_tsx():
    """Generate clean src/app/terms/page.tsx"""
    return '''"use client";

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
'''

def main():
    """Generate all Phase 6B templates"""
    print("🧠 GENERATING PHASE 6B TEMPLATES...")
    
    templates = {
        'src/app/contact/page.tsx': generate_contact_page_tsx(),
        'src/app/help/page.tsx': generate_help_page_tsx(),
        'src/app/icon.tsx': generate_icon_tsx(),
        'src/app/layout.tsx': generate_layout_tsx(),
        'src/app/loading.tsx': generate_loading_tsx(),
        'src/app/login/page.tsx': generate_login_page_tsx(),
        'src/app/page.tsx': generate_main_page_tsx(),
        'src/app/privacy/page.tsx': generate_privacy_page_tsx(),
        'src/app/register/page.tsx': generate_register_page_tsx(),
        'src/app/security/page.tsx': generate_security_page_tsx(),
        'src/app/terms/page.tsx': generate_terms_page_tsx()
    }
    
    for file_path, content in templates.items():
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Generated: {file_path}")
    
    print("🎉 PHASE 6B TEMPLATES GENERATED!")
    print("📁 Files created: 11")
    print("⚡ Ready for Phase 6C!")

if __name__ == "__main__":
    main()
