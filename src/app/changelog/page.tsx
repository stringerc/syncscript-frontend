"use client";

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Plus, 
  Bug, 
  Zap,
  Settings,
  Users
} from 'lucide-react';

export default function ChangelogPage() {
  const changelog = [
    {
      version: '2.1.0',
      date: '2024-01-15',
      type: 'major',
      changes: [
        {
          type: 'feature',
          title: 'AI-Powered Task Suggestions',
          description: 'Get intelligent task recommendations based on your productivity patterns.',
          icon: <Zap className="h-5 w-5" />
        },
        {
          type: 'feature',
          title: 'Enhanced Team Collaboration',
          description: 'New real-time collaboration features for better team coordination.',
          icon: <Users className="h-5 w-5" />
        },
        {
          type: 'improvement',
          title: 'Improved Performance',
          description: 'Faster loading times and optimized resource usage.',
          icon: <Settings className="h-5 w-5" />
        }
      ]
    },
    {
      version: '2.0.5',
      date: '2024-01-08',
      type: 'patch',
      changes: [
        {
          type: 'bugfix',
          title: 'Fixed Calendar Sync Issue',
          description: 'Resolved issue with calendar synchronization on mobile devices.',
          icon: <Bug className="h-5 w-5" />
        },
        {
          type: 'improvement',
          title: 'Enhanced Mobile Experience',
          description: 'Improved mobile interface and touch interactions.',
          icon: <Settings className="h-5 w-5" />
        }
      ]
    },
    {
      version: '2.0.0',
      date: '2024-01-01',
      type: 'major',
      changes: [
        {
          type: 'feature',
          title: 'Complete UI Redesign',
          description: 'Beautiful new interface with improved usability and accessibility.',
          icon: <Plus className="h-5 w-5" />
        },
        {
          type: 'feature',
          title: 'Advanced Analytics',
          description: 'Comprehensive productivity insights and reporting.',
          icon: <Zap className="h-5 w-5" />
        },
        {
          type: 'feature',
          title: 'Smart Scheduling',
          description: 'AI-powered scheduling that optimizes your time automatically.',
          icon: <Calendar className="h-5 w-5" />
        }
      ]
    }
  ];

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-green-100 text-green-800 border-green-200';
      case 'improvement': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'bugfix': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'feature': return <Plus className="h-4 w-4" />;
      case 'improvement': return <Settings className="h-4 w-4" />;
      case 'bugfix': return <Bug className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getVersionTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'minor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'patch': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <>
      <Head>
        <title>Changelog - SyncScript</title>
        <meta name="description" content="Stay updated with the latest SyncScript features, improvements, and bug fixes." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Changelog
              </h1>
              <p className="text-xl text-gray-600">
                Stay updated with the latest SyncScript features and improvements
              </p>
            </div>

            {/* Changelog */}
            <div className="space-y-8">
              {changelog.map((release, releaseIndex) => (
                <motion.div
                  key={release.version}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: releaseIndex * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  {/* Release Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        v{release.version}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getVersionTypeColor(release.type)}`}>
                        {release.type}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{new Date(release.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>

                  {/* Changes */}
                  <div className="space-y-4">
                    {release.changes.map((change, changeIndex) => (
                      <motion.div
                        key={changeIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (releaseIndex * 0.1) + (changeIndex * 0.05) }}
                        className={`p-4 rounded-lg border ${getChangeTypeColor(change.type)}`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            {change.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">
                              {change.title}
                            </h3>
                            <p className="text-sm opacity-90">
                              {change.description}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getChangeTypeColor(change.type)}`}>
                              {change.type}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Subscribe to Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 bg-blue-600 rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-blue-100 mb-6">
                Get notified about new features and updates as soon as they're released.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
                />
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
