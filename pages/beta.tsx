/**
 * Beta Program Landing Page
 * 
 * Beautiful, conversion-optimized landing page for beta user recruitment
 * Includes value proposition, feature highlights, and registration form
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

interface BetaRegistrationForm {
  email: string;
  name: string;
  tier: 'early-adopter' | 'power-user' | 'casual-user';
  motivation: string;
  testingFocus: string[];
}

const TIER_BENEFITS = {
  'early-adopter': {
    title: 'Early Adopter',
    description: 'You love being first to try new features and provide detailed feedback',
    icon: '🚀',
    color: 'from-purple-500 to-pink-500',
    benefits: [
      'First access to cutting-edge features',
      'Direct line to development team',
      'Exclusive beta badges and recognition',
      'Influence product roadmap decisions'
    ]
  },
  'power-user': {
    title: 'Power User',
    description: 'You use productivity tools extensively and provide expert insights',
    icon: '⚡',
    color: 'from-blue-500 to-cyan-500',
    benefits: [
      'Advanced feature testing opportunities',
      'Performance optimization feedback',
      'Workflow integration insights',
      'Expert user community access'
    ]
  },
  'casual-user': {
    title: 'Casual User',
    description: 'You provide fresh perspective and user-friendly feedback',
    icon: '🌟',
    color: 'from-green-500 to-emerald-500',
    benefits: [
      'User-friendly feedback opportunities',
      'Onboarding experience insights',
      'Accessibility testing participation',
      'Fresh perspective on features'
    ]
  }
};

const FEATURE_HIGHLIGHTS = [
  {
    title: 'AI-Powered Insights',
    description: 'Get personalized productivity recommendations powered by advanced AI',
    icon: '🤖',
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Energy-Based Task Management',
    description: 'Match tasks to your energy levels for optimal productivity',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Budget Intelligence',
    description: 'Track expenses and savings goals with smart financial insights',
    icon: '💰',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Advanced Analytics',
    description: 'Deep insights into your productivity patterns and trends',
    icon: '📊',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Smart Briefings',
    description: 'AI-generated morning and evening briefs for better planning',
    icon: '📋',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    title: 'Gamification',
    description: 'Achievement system and rewards to keep you motivated',
    icon: '🏆',
    color: 'from-red-500 to-pink-500'
  }
];

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'Tech Startup',
    content: 'SyncScript has transformed how I manage my daily tasks. The energy-based approach is revolutionary!',
    avatar: '👩‍💼'
  },
  {
    name: 'Marcus Johnson',
    role: 'Entrepreneur',
    company: 'Digital Agency',
    content: 'The AI insights help me optimize my productivity in ways I never thought possible.',
    avatar: '👨‍💻'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Consultant',
    company: 'Freelance',
    content: 'The budget intelligence features help me stay on track with my financial goals.',
    avatar: '👩‍🎓'
  }
];

export default function BetaPage() {
  const { user } = useUser();
  const [form, setForm] = useState<BetaRegistrationForm>({
    email: user?.email || '',
    name: user?.name || '',
    tier: 'early-adopter',
    motivation: '',
    testingFocus: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof BetaRegistrationForm, value: string | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleTestingFocusToggle = (focus: string) => {
    setForm(prev => ({
      ...prev,
      testingFocus: prev.testingFocus.includes(focus)
        ? prev.testingFocus.filter(f => f !== focus)
        : [...prev.testingFocus, focus]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name || form.testingFocus.length === 0) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call - in real implementation, this would call the backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store in localStorage for demo purposes
      const betaUsers = JSON.parse(localStorage.getItem('beta_users') || '[]');
      const newUser = {
        id: `beta_${Date.now()}`,
        ...form,
        submittedAt: new Date().toISOString()
      };
      betaUsers.push(newUser);
      localStorage.setItem('beta_users', JSON.stringify(betaUsers));
      
      setSubmitted(true);
    } catch (error) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Head>
          <title>Welcome to SyncScript Beta! 🚀</title>
          <meta name="description" content="You're now part of the SyncScript Beta Program!" />
        </Head>
        
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to the Beta Program!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Thank you for joining SyncScript's exclusive beta program. You're now among the first to experience the future of productivity.
            </p>
            
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <span>Check your email for beta program details</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚀</span>
                  <span>Access exclusive beta features in your dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💬</span>
                  <span>Join our beta user community for updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <span>Start testing features and providing feedback</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="inline-block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Go to Dashboard
              </Link>
              
              <button
                onClick={() => setSubmitted(false)}
                className="inline-block w-full bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Join SyncScript Beta Program 🚀</title>
        <meta name="description" content="Be among the first to experience the future of productivity. Join SyncScript's exclusive beta program and help shape the development of cutting-edge features." />
        <meta property="og:title" content="Join SyncScript Beta Program 🚀" />
        <meta property="og:description" content="Be among the first to experience the future of productivity. Join SyncScript's exclusive beta program." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Join SyncScript
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Beta Program
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Be among the first to experience the future of productivity. Help shape the development of cutting-edge features while enjoying exclusive benefits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-xl text-lg"
                >
                  🚀 100 Exclusive Spots Available
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm text-white font-medium py-4 px-8 rounded-xl text-lg border border-white/30"
                >
                  ⏰ Limited Time Offer
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Experience the Future of Productivity
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Get early access to revolutionary features that will transform how you work and manage your time.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURE_HIGHLIGHTS.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Join the Beta Program
                </h2>
                <p className="text-gray-600">
                  Help us build the most advanced productivity platform ever created
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                {/* Beta Tier Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Choose Your Beta Tier *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(TIER_BENEFITS).map(([tierKey, tier]) => (
                      <motion.div
                        key={tierKey}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          form.tier === tierKey
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('tier', tierKey as any)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tier.color} flex items-center justify-center text-2xl`}>
                            {tier.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{tier.title}</h4>
                            <p className="text-gray-600 text-sm mt-1">{tier.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What motivates you to join our beta program?
                  </label>
                  <textarea
                    value={form.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                    placeholder="Tell us what excites you about SyncScript..."
                  />
                </div>

                {/* Testing Focus */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    What features would you like to help test? *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['AI Insights', 'Energy Management', 'Budget Intelligence', 'Analytics Dashboard', 'Smart Briefings', 'Gamification'].map((focus) => (
                      <motion.button
                        key={focus}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTestingFocusToggle(focus)}
                        className={`p-3 border-2 rounded-lg text-left transition-all ${
                          form.testingFocus.includes(focus)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{focus}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <p className="text-red-600 text-sm">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Join Beta Program 🚀'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-blue-100">
                Join thousands of users who have transformed their productivity
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-blue-100 text-sm">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-blue-100 italic">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-12 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-blue-100 mb-4">
              Ready to transform your productivity? Join the beta program today!
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/dashboard" className="text-blue-200 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/features" className="text-blue-200 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-blue-200 hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
