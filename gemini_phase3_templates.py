#!/usr/bin/env python3
"""
🧠 GEMINI PHASE 3: App Pages Template Generator
Mission: Generate clean templates for 16 app directory pages
"""

import os

def generate_app_about_page_tsx():
    """Generate clean src/app/about/page.tsx"""
    return '''import React from 'react';
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
'''

def generate_app_calendar_page_tsx():
    """Generate clean src/app/calendar/page.tsx"""
    return '''import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Plus, 
  Filter, 
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users
} from 'lucide-react';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = [
    {
      id: 1,
      title: 'Team Standup',
      time: '09:00',
      duration: 30,
      type: 'meeting',
      attendees: 8
    },
    {
      id: 2,
      title: 'Project Review',
      time: '14:00',
      duration: 60,
      type: 'meeting',
      attendees: 5
    },
    {
      id: 3,
      title: 'Deep Work Session',
      time: '10:00',
      duration: 120,
      type: 'focus',
      attendees: 1
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'focus': return 'bg-green-100 text-green-800 border-green-200';
      case 'deadline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'focus': return <Clock className="h-4 w-4" />;
      case 'deadline': return <Calendar className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <>
      <Head>
        <title>Calendar - SyncScript</title>
        <meta name="description" content="Manage your schedule and stay organized with SyncScript's intelligent calendar." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Calendar
                </h1>
                <p className="text-gray-600">
                  Manage your schedule and stay organized
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filter
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Event
                </button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setView('month')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    view === 'month' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    view === 'week' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setView('day')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    view === 'day' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Day
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-lg shadow">
              {/* Day Headers */}
              <div className="grid grid-cols-7 border-b border-gray-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-4 text-center font-semibold text-gray-700">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {generateCalendarDays().map((date, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.01 }}
                    className={`min-h-[120px] p-2 border-r border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !isCurrentMonth(date) ? 'bg-gray-50 text-gray-400' : ''
                    } ${isToday(date) ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      isToday(date) ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    {/* Events */}
                    <div className="space-y-1">
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded border ${getEventColor(event.type)} flex items-center`}
                        >
                          <span className="mr-1">{getEventIcon(event.type)}</span>
                          <span className="truncate">{event.title}</span>
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{events.length - 2} more
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected Date Events */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Events for {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <div className="space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border ${getEventColor(event.type)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="mr-2">{getEventIcon(event.type)}</span>
                          <span className="font-medium">{event.title}</span>
                        </div>
                        <div className="text-sm">
                          {event.time} ({event.duration}min)
                        </div>
                      </div>
                      {event.attendees > 1 && (
                        <div className="text-sm mt-1 opacity-75">
                          {event.attendees} attendees
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
'''

def generate_app_changelog_page_tsx():
    """Generate clean src/app/changelog/page.tsx"""
    return '''import React from 'react';
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
'''

def generate_app_contact_page_tsx():
    """Generate clean src/app/contact/page.tsx"""
    return '''import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Clock,
  MessageCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      description: 'Come say hello at our office',
      contact: '123 Productivity St, San Francisco, CA',
      action: 'https://maps.google.com'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      type: 'general'
    });
    
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Head>
        <title>Contact Us - SyncScript</title>
        <meta name="description" content="Get in touch with the SyncScript team. We're here to help with any questions or feedback." />
      </Head>

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Send us a message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="general">General Question</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Inquiry</option>
                        <option value="feature">Feature Request</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="space-y-8">
                  {/* Contact Methods */}
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      Get in touch
                    </h2>
                    <div className="space-y-6">
                      {contactInfo.map((info, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                          className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="text-blue-600 mr-4 mt-1">
                            {info.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {info.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {info.description}
                            </p>
                            <a
                              href={info.action}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              {info.contact}
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Clock className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Business Hours
                      </h3>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM PST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM PST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Link */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <MessageCircle className="h-6 w-6 text-gray-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Need Help?
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Check out our FAQ section for quick answers to common questions.
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Visit FAQ →
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
'''

def generate_app_cookies_page_tsx():
    """Generate clean src/app/cookies/page.tsx"""
    return '''import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Settings, 
  Eye, 
  Lock,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function CookiesPage() {
  const cookieCategories = [
    {
      name: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      required: true,
      cookies: [
        'Authentication tokens',
        'Session management',
        'Security preferences',
        'User preferences'
      ]
    },
    {
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      required: false,
      cookies: [
        'Google Analytics',
        'Usage statistics',
        'Performance metrics',
        'User behavior data'
      ]
    },
    {
      name: 'Marketing Cookies',
      description: 'These cookies are used to deliver relevant advertisements.',
      required: false,
      cookies: [
        'Advertising preferences',
        'Campaign tracking',
        'Conversion tracking',
        'Retargeting data'
      ]
    },
    {
      name: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization.',
      required: false,
      cookies: [
        'Language preferences',
        'Theme settings',
        'Custom features',
        'User interface preferences'
      ]
    }
  ];

  const cookieSettings = {
    essential: true, // Always required
    analytics: false,
    marketing: false,
    functional: false
  };

  const handleCookieToggle = (category: string) => {
    console.log(`Toggle ${category} cookies`);
    // In a real application, this would update cookie preferences
  };

  return (
    <>
      <Head>
        <title>Cookie Policy - SyncScript</title>
        <meta name="description" content="Learn about how SyncScript uses cookies to improve your experience and protect your privacy." />
      </Head>

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Cookie Policy
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Learn about how we use cookies to improve your experience and protect your privacy.
              </p>
            </div>

            {/* Cookie Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-8 mb-12"
            >
              <div className="flex items-center mb-6">
                <Settings className="h-6 w-6 text-gray-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Cookie Preferences
                </h2>
              </div>
              
              <div className="space-y-6">
                {cookieCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    className="bg-white rounded-lg p-6 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {category.description}
                        </p>
                      </div>
                      <div className="ml-6">
                        {category.required ? (
                          <div className="flex items-center text-green-600">
                            <Lock className="h-5 w-5 mr-2" />
                            <span className="text-sm font-medium">Required</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleCookieToggle(category.name.toLowerCase().replace(' ', '_'))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              cookieSettings[category.name.toLowerCase().replace(' ', '_') as keyof typeof cookieSettings]
                                ? 'bg-blue-600'
                                : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                cookieSettings[category.name.toLowerCase().replace(' ', '_') as keyof typeof cookieSettings]
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.cookies.map((cookie, cookieIndex) => (
                        <div key={cookieIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          {cookie}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Save Preferences
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Accept All
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Reject All
                </button>
              </div>
            </motion.div>

            {/* Cookie Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Eye className="h-6 w-6 mr-3" />
                  What Are Cookies?
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    Cookies are small text files that are stored on your device when you visit a website. 
                    They help us provide you with a better experience by remembering your preferences and 
                    understanding how you use our website.
                  </p>
                  <p className="text-gray-600">
                    We use cookies to enhance your browsing experience, analyze site traffic, and 
                    personalize content and advertisements. You can control cookie settings through 
                    your browser or our cookie preference center.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Your Rights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">You Can:</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Control cookie preferences</li>
                      <li>• Delete cookies from your browser</li>
                      <li>• Opt-out of non-essential cookies</li>
                      <li>• Request data deletion</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <XCircle className="h-6 w-6 text-red-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">You Cannot:</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Disable essential cookies</li>
                      <li>• Use some features without cookies</li>
                      <li>• Access certain content</li>
                      <li>• Maintain login sessions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Contact Us
                </h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about our use of cookies or this cookie policy, 
                  please contact us at:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900">
                    <strong>Email:</strong> privacy@syncscript.com
                  </p>
                  <p className="text-gray-900">
                    <strong>Address:</strong> 123 Productivity St, San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
'''

def generate_app_error_tsx():
    """Generate clean src/app/error.tsx"""
    return '''import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home,
  Bug
} from 'lucide-react';

interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleReload = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-8"
        >
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            We're sorry, but something unexpected happened. Don't worry, 
            our team has been notified and we're working to fix it.
          </p>
        </motion.div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left"
          >
            <div className="flex items-center mb-2">
              <Bug className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-800">Error Details:</h3>
            </div>
            <pre className="text-sm text-red-700 whitespace-pre-wrap">
              {error.message}
            </pre>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-sm text-red-600 cursor-pointer">
                  Show Stack Trace
                </summary>
                <pre className="text-xs text-red-600 mt-2 whitespace-pre-wrap">
                  {error.stack}
                </pre>
              </details>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleReload}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
            <button
              onClick={handleGoHome}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </button>
          </div>

          {/* Additional Help */}
          <div className="text-sm text-gray-500">
            <p className="mb-2">
              If this problem persists, please contact our support team.
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Support
            </button>
          </div>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">You might also find these helpful:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="/help" className="text-blue-600 hover:text-blue-700">
              Help Center
            </a>
            <a href="/contact" className="text-blue-600 hover:text-blue-700">
              Contact Us
            </a>
            <a href="/status" className="text-blue-600 hover:text-blue-700">
              System Status
            </a>
            <a href="/faq" className="text-blue-600 hover:text-blue-700">
              FAQ
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
'''

def generate_app_features_page_tsx():
    """Generate clean src/app/features/page.tsx"""
    return '''import React from 'react';
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
'''

def main():
    """Generate all Phase 3 templates"""
    print("🧠 GENERATING PHASE 3 TEMPLATES...")
    
    templates = {
        'src/app/about/page.tsx': generate_app_about_page_tsx(),
        'src/app/calendar/page.tsx': generate_app_calendar_page_tsx(),
        'src/app/changelog/page.tsx': generate_app_changelog_page_tsx(),
        'src/app/contact/page.tsx': generate_app_contact_page_tsx(),
        'src/app/cookies/page.tsx': generate_app_cookies_page_tsx(),
        'src/app/error.tsx': generate_app_error_tsx(),
        'src/app/features/page.tsx': generate_app_features_page_tsx()
    }
    
    for file_path, content in templates.items():
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Generated: {file_path}")
    
    print("🎉 PHASE 3 TEMPLATES GENERATED!")
    print("📁 Files created: 7")
    print("⚡ Ready for Aider to process!")

if __name__ == "__main__":
    main()
