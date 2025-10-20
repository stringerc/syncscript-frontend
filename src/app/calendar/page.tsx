"use client";

import React, { useState } from 'react';
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
