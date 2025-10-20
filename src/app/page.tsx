'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Brain,
  Users,
  Target,
  Zap,
  Shield,
  Star,
  CheckCircle,
  Activity
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-Powered Task Breakdown',
      description: 'Break down complex projects into manageable tasks with intelligent energy matching.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team using real-time collaboration tools and shared workspaces.'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Energy-Based Productivity',
      description: 'Match tasks to your energy levels with our AI coach and energy tracking system.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      content: 'SyncScript has transformed how our team manages projects. The AI insights and energy matching are incredible.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'CEO',
      company: 'StartupXYZ',
      content: 'Finally, a productivity tool that actually understands how I work. The energy-based task matching is a game changer.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Designer',
      company: 'CreativeStudio',
      content: 'The collaboration features are seamless and the dark theme is perfect for extended work sessions.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-[#141619] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transform Your
              <span className="text-blue-400"> Productivity</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              AI-powered task management with energy matching, smart scheduling, and seamless team collaboration 
              in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="h-5 w-5" />
                Try Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1e2128]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to stay productive
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to help you and your team achieve more with AI-driven insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-[#141619] p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#141619]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-gray-300">
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
                className="bg-[#1e2128] p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1e2128]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using SyncScript to achieve more with AI-powered insights.
            </p>
            <Link
              href="/dashboard"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}