"use client";

import React from 'react';
import Navigation from '../../components/Navigation';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Zap, 
  Heart,
  Award,
  Globe
} from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      bio: 'Passionate about productivity and helping teams achieve their goals.',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      bio: 'Full-stack engineer with expertise in AI and machine learning.',
      image: '/team/michael.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      bio: 'Creating beautiful and intuitive user experiences.',
      image: '/team/emily.jpg'
    }
  ];

  const values = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and shared goals.'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Focus',
      description: 'Helping you stay focused on what matters most.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Innovation',
      description: 'Continuously pushing the boundaries of productivity.'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Passion',
      description: 'We love what we do and it shows in our work.'
    }
  ];

  return (
    <>
      <Head>
        <title>About Us - SyncScript</title>
        <meta name="description" content="Learn about SyncScript's mission to revolutionize productivity and help teams achieve their goals." />
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
                About
                <span className="text-blue-600"> SyncScript</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're on a mission to revolutionize productivity and help teams 
                achieve their goals through intelligent task management and collaboration.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  At SyncScript, we believe that productivity shouldn't be complicated. 
                  Our platform combines the power of AI with intuitive design to help 
                  individuals and teams work smarter, not harder.
                </p>
                <p className="text-lg text-gray-600">
                  We're building the future of productivity tools, where artificial 
                  intelligence meets human creativity to unlock unprecedented levels 
                  of efficiency and collaboration.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-100 rounded-lg p-8"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                    <div className="text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
                    <div className="text-gray-600">Tasks Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                    <div className="text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">4.9★</div>
                    <div className="text-gray-600">User Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-lg shadow-sm"
                >
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600">
                The passionate people behind SyncScript
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
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
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Productivity?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already revolutionized their workflow with SyncScript.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started Today
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
