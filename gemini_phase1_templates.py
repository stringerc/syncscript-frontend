#!/usr/bin/env python3
"""
🧠 GEMINI PHASE 1: Critical Pages Template Generator
Mission: Generate clean templates for 8 critical page components
"""

import os

def generate_dashboard_tsx():
    """Generate clean pages/dashboard.tsx"""
    return '''import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Target, 
  Zap, 
  Users,
  BarChart3,
  Settings
} from 'lucide-react';

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    productivityScore: 0,
    energyLevel: 0,
    streakDays: 0
  });

  useEffect(() => {
    // Load user stats
    if (user) {
      setStats({
        tasksCompleted: 12,
        productivityScore: 85,
        energyLevel: 78,
        streakDays: 7
      });
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <>
      <Head>
        <title>Dashboard - SyncScript</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Welcome back, {user.name?.split(' ')[0]}!
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tasks Completed</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.tasksCompleted}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Productivity Score</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.productivityScore}%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Energy Level</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.energyLevel}%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Streak Days</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.streakDays}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Clock className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-gray-900 dark:text-white">Start Focus Session</span>
                  </button>
                  <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Calendar className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-900 dark:text-white">Schedule Task</span>
                  </button>
                  <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <BarChart3 className="h-5 w-5 text-purple-500 mr-3" />
                    <span className="text-gray-900 dark:text-white">View Analytics</span>
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Completed "Review project proposal"
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Started focus session (25 min)
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    Energy level: 78%
                  </div>
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

def generate_landing_tsx():
    """Generate clean pages/landing.tsx"""
    return '''import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Target, 
  Users, 
  BarChart3,
  Star,
  Play
} from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Task Management",
      description: "Intelligent task breakdown and prioritization using advanced AI algorithms."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Goal Tracking",
      description: "Set and achieve your goals with personalized insights and recommendations."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your team using advanced collaboration tools."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics & Insights",
      description: "Get detailed insights into your productivity patterns and performance."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content: "SyncScript has revolutionized how I manage my tasks and collaborate with my team.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "The AI-powered insights have helped me optimize my productivity by 40%.",
      rating: 5
    }
  ];

  return (
    <>
      <Head>
        <title>SyncScript - Ultimate Productivity Platform</title>
        <meta name="description" content="Transform your productivity with SyncScript's AI-powered task management, team collaboration, and advanced analytics." />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transform Your
                <span className="text-blue-600"> Productivity</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                SyncScript is the ultimate productivity platform that combines AI-powered task management, 
                team collaboration, and advanced analytics to help you achieve more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to boost your productivity and achieve your goals.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Loved by Thousands
              </h2>
              <p className="text-xl text-gray-600">
                See what our users have to say about SyncScript.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-lg shadow-sm"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.role}</p>
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Productivity?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already revolutionized their workflow with SyncScript.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
'''

def generate_landing_v2_tsx():
    """Generate clean pages/landing-v2.tsx"""
    return '''import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Target, 
  Users, 
  BarChart3,
  Star,
  Play,
  Shield,
  Clock,
  Brain
} from 'lucide-react';

export default function LandingV2() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Intelligence",
      description: "Advanced AI that learns your patterns and optimizes your workflow automatically."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 compliance and end-to-end encryption."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time Optimization",
      description: "Smart scheduling that maximizes your productivity and minimizes wasted time."
    }
  ];

  return (
    <>
      <Head>
        <title>SyncScript v2 - Next-Gen Productivity</title>
        <meta name="description" content="Experience the future of productivity with SyncScript v2's revolutionary AI-powered features." />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-50 to-pink-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4 mr-2" />
                SyncScript v2 - Now Available
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                The Future of
                <span className="text-purple-600"> Productivity</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Experience revolutionary AI-powered productivity with SyncScript v2. 
                Smarter, faster, and more intuitive than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center">
                  Try v2 Beta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Revolutionary Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover what makes SyncScript v2 the most advanced productivity platform.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-purple-600 mb-6 flex justify-center">
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

        {/* CTA Section */}
        <section className="py-20 bg-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready for the Future?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Be among the first to experience SyncScript v2's revolutionary features.
              </p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto">
                Join Beta Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
'''

def generate_beta_tsx():
    """Generate clean pages/beta.tsx"""
    return '''import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Star,
  Users,
  Zap,
  Gift
} from 'lucide-react';

export default function Beta() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interests: []
  });

  const interests = [
    'AI Features',
    'Team Collaboration',
    'Analytics & Reporting',
    'Mobile App',
    'API Integration',
    'Custom Workflows'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle beta signup
    console.log('Beta signup:', formData);
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <>
      <Head>
        <title>Join SyncScript Beta - Early Access</title>
        <meta name="description" content="Get early access to SyncScript's latest features and help shape the future of productivity." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Beta Program
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join the
              <span className="text-blue-600"> Beta Program</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get early access to SyncScript's revolutionary features and help us shape 
              the future of productivity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Beta Benefits</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Early Access</h3>
                    <p className="text-gray-600">Be the first to try new features before public release</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Direct Feedback</h3>
                    <p className="text-gray-600">Share your thoughts directly with our development team</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Premium Support</h3>
                    <p className="text-gray-600">Get priority support and dedicated beta community access</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Exclusive Perks</h3>
                    <p className="text-gray-600">Receive special rewards and recognition for your participation</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <Gift className="h-6 w-6 text-yellow-500 mr-2" />
                  <h3 className="font-semibold text-gray-900">Beta Exclusive</h3>
                </div>
                <p className="text-gray-600">
                  Beta users get 6 months of premium features free when we launch publicly!
                </p>
              </div>
            </motion.div>

            {/* Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Join Beta Program</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your company (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your role</option>
                      <option value="product-manager">Product Manager</option>
                      <option value="developer">Developer</option>
                      <option value="designer">Designer</option>
                      <option value="marketer">Marketer</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Areas of Interest
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {interests.map((interest) => (
                        <label key={interest} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => toggleInterest(interest)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Join Beta Program
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </form>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  We'll notify you when beta access is available. No spam, we promise!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
'''

def generate_compare_tsx():
    """Generate clean pages/compare.tsx"""
    return '''import React from 'react';
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
'''

def generate_smart_schedule_tsx():
    """Generate clean pages/smart-schedule.tsx"""
    return '''import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Zap, 
  Target, 
  Brain,
  ArrowRight,
  Plus
} from 'lucide-react';

export default function SmartSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, time: '09:00', task: 'Morning Standup', duration: 30, type: 'meeting' },
    { id: 2, time: '10:00', task: 'Deep Work - Project Alpha', duration: 120, type: 'focus' },
    { id: 3, time: '14:00', task: 'Client Review', duration: 60, type: 'meeting' },
    { id: 4, time: '16:00', task: 'Email & Admin', duration: 45, type: 'admin' }
  ]);

  const scheduleTask = (timeSlot: any) => {
    console.log('Scheduling task:', timeSlot);
    // Handle task scheduling
  };

  const addNewTask = () => {
    const newTask = {
      id: Date.now(),
      time: '09:00',
      task: 'New Task',
      duration: 60,
      type: 'general'
    };
    setTimeSlots([...timeSlots, newTask]);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'focus': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head>
        <title>Smart Schedule - SyncScript</title>
        <meta name="description" content="AI-powered smart scheduling to optimize your productivity and time management." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Smart Schedule
                </h1>
                <p className="text-gray-600">
                  AI-powered scheduling to optimize your productivity
                </p>
              </div>
              <button
                onClick={addNewTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Task
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Calendar Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Calendar
                  </h2>
                  <div className="space-y-2">
                    {Array.from({ length: 7 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isSelected = date.toDateString() === selectedDate.toDateString();
                      
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(date)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            isSelected 
                              ? 'bg-blue-100 text-blue-900' 
                              : isToday 
                                ? 'bg-gray-100 text-gray-900' 
                                : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-sm font-medium">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-lg font-semibold">
                            {date.getDate()}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-white rounded-lg shadow p-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Peak Energy:</strong> 10:00 AM - 12:00 PM
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Recommendation:</strong> Schedule deep work in morning
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Warning:</strong> Too many meetings today
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {timeSlots.map((slot) => (
                        <motion.div
                          key={slot.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center mr-4">
                            <Clock className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="font-mono text-sm text-gray-600">
                              {slot.time}
                            </span>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {slot.task}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(slot.type)}`}>
                                {slot.type}
                              </span>
                              <span className="ml-2 text-sm text-gray-500">
                                {slot.duration} min
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => scheduleTask(slot)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center"
                          >
                            <ArrowRight className="h-4 w-4 mr-1" />
                            Schedule
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {timeSlots.length === 0 && (
                      <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No tasks scheduled
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Add tasks to get started with smart scheduling
                        </p>
                        <button
                          onClick={addNewTask}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add Your First Task
                        </button>
                      </div>
                    )}
                  </div>
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

def generate_dashboard_observability_tsx():
    """Generate clean pages/dashboard/observability.tsx"""
    return '''import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Server,
  Database,
  Zap
} from 'lucide-react';

export default function ObservabilityDashboard() {
  const [metrics, setMetrics] = useState({
    uptime: 99.9,
    responseTime: 120,
    errorRate: 0.1,
    activeUsers: 1247,
    throughput: 156,
    memoryUsage: 68
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'High memory usage detected',
      timestamp: '2 minutes ago',
      resolved: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Database backup completed',
      timestamp: '15 minutes ago',
      resolved: true
    },
    {
      id: 3,
      type: 'error',
      message: 'API endpoint timeout',
      timestamp: '1 hour ago',
      resolved: false
    }
  ]);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'info': return <CheckCircle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <>
      <Head>
        <title>Observability Dashboard - SyncScript</title>
        <meta name="description" content="Monitor system performance and health with real-time observability metrics." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Observability Dashboard
              </h1>
              <p className="text-gray-600">
                Real-time monitoring and system health metrics
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Uptime</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.uptime}%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Response Time</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.responseTime}ms</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Error Rate</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.errorRate}%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.activeUsers}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Throughput</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.throughput}/s</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Database className="h-8 w-8 text-indigo-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.memoryUsage}%</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* System Health */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Server className="h-6 w-6 mr-2" />
                  System Health
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">API Server</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Database</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cache Layer</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-yellow-600 font-medium">Warning</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">File Storage</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">Healthy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  Recent Alerts
                </h2>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm opacity-75 mt-1">{alert.timestamp}</p>
                        </div>
                        {!alert.resolved && (
                          <button className="text-sm font-medium opacity-75 hover:opacity-100">
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
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

def generate_dashboard_quality_tsx():
    """Generate clean pages/dashboard/quality.tsx"""
    return '''import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Award, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Star,
  Users,
  Zap
} from 'lucide-react';

export default function QualityDashboard() {
  const [qualityMetrics, setQualityMetrics] = useState({
    overallScore: 87,
    codeQuality: 92,
    testCoverage: 78,
    performanceScore: 85,
    securityScore: 94,
    userSatisfaction: 4.2,
    bugCount: 3,
    technicalDebt: 15
  });

  const [recentImprovements, setRecentImprovements] = useState([
    {
      id: 1,
      area: 'Code Quality',
      improvement: 'Improved error handling',
      impact: '+5%',
      date: '2 days ago'
    },
    {
      id: 2,
      area: 'Performance',
      improvement: 'Optimized database queries',
      impact: '+12%',
      date: '1 week ago'
    },
    {
      id: 3,
      area: 'Security',
      improvement: 'Updated authentication',
      impact: '+3%',
      date: '2 weeks ago'
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <>
      <Head>
        <title>Quality Dashboard - SyncScript</title>
        <meta name="description" content="Monitor code quality, performance, and user satisfaction metrics." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quality Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor code quality, performance, and user satisfaction
              </p>
            </div>

            {/* Overall Score */}
            <div className="bg-white rounded-lg shadow p-8 mb-8">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBgColor(qualityMetrics.overallScore)} mb-4`}
                >
                  <span className={`text-4xl font-bold ${getScoreColor(qualityMetrics.overallScore)}`}>
                    {qualityMetrics.overallScore}
                  </span>
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Overall Quality Score
                </h2>
                <p className="text-gray-600">
                  Based on code quality, performance, security, and user satisfaction
                </p>
              </div>
            </div>

            {/* Quality Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Code Quality</p>
                    <p className={`text-2xl font-semibold ${getScoreColor(qualityMetrics.codeQuality)}`}>
                      {qualityMetrics.codeQuality}%
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Test Coverage</p>
                    <p className={`text-2xl font-semibold ${getScoreColor(qualityMetrics.testCoverage)}`}>
                      {qualityMetrics.testCoverage}%
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Performance</p>
                    <p className={`text-2xl font-semibold ${getScoreColor(qualityMetrics.performanceScore)}`}>
                      {qualityMetrics.performanceScore}%
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Security</p>
                    <p className={`text-2xl font-semibold ${getScoreColor(qualityMetrics.securityScore)}`}>
                      {qualityMetrics.securityScore}%
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Satisfaction */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  User Satisfaction
                </h2>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-8 w-8 ${
                          i < Math.floor(qualityMetrics.userSatisfaction)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">
                    {qualityMetrics.userSatisfaction}/5.0
                  </p>
                  <p className="text-gray-600">Based on 1,247 reviews</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Excellent (5★)</span>
                    <span className="text-gray-900 font-medium">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Good (4★)</span>
                    <span className="text-gray-900 font-medium">22%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Average (3★)</span>
                    <span className="text-gray-900 font-medium">8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Poor (2★)</span>
                    <span className="text-gray-900 font-medium">2%</span>
                  </div>
                </div>
              </div>

              {/* Recent Improvements */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  Recent Improvements
                </h2>
                <div className="space-y-4">
                  {recentImprovements.map((improvement) => (
                    <div key={improvement.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">
                          {improvement.area}
                        </h3>
                        <span className="text-green-600 font-semibold">
                          {improvement.impact}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {improvement.improvement}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {improvement.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Issues & Technical Debt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  Active Issues
                </h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600 mb-2">
                    {qualityMetrics.bugCount}
                  </p>
                  <p className="text-gray-600">Open bugs requiring attention</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-yellow-500" />
                  Technical Debt
                </h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-600 mb-2">
                    {qualityMetrics.technicalDebt}
                  </p>
                  <p className="text-gray-600">Story points of technical debt</p>
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
    """Generate all Phase 1 templates"""
    print("🧠 GENERATING PHASE 1 TEMPLATES...")
    
    templates = {
        'pages/dashboard.tsx': generate_dashboard_tsx(),
        'pages/landing.tsx': generate_landing_tsx(),
        'pages/landing-v2.tsx': generate_landing_v2_tsx(),
        'pages/beta.tsx': generate_beta_tsx(),
        'pages/compare.tsx': generate_compare_tsx(),
        'pages/smart-schedule.tsx': generate_smart_schedule_tsx(),
        'pages/dashboard/observability.tsx': generate_dashboard_observability_tsx(),
        'pages/dashboard/quality.tsx': generate_dashboard_quality_tsx()
    }
    
    for file_path, content in templates.items():
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Generated: {file_path}")
    
    print("🎉 PHASE 1 TEMPLATES GENERATED!")
    print("📁 Files created: 8")
    print("⚡ Ready for Aider to process!")

if __name__ == "__main__":
    main()
