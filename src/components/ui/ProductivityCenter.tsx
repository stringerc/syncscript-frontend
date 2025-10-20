"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Target, 
  TrendingUp,
  Coffee,
  Brain,
  Zap
} from 'lucide-react';

export default function ProductivityCenter() {
  const [timeTrackingActive, setTimeTrackingActive] = useState(false);
  const [trackedTime, setTrackedTime] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'work' | 'short-break' | 'long-break'>('work');
  const trackingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleTimeTracking = () => {
    if (!timeTrackingActive) {
      setTimeTrackingActive(true);
      trackingIntervalRef.current = setInterval(() => {
        setTrackedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
      setTimeTrackingActive(false);
      setTrackedTime(0);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const phaseLabels = {
    'work': '🍅 Focus Time',
    'short-break': '☕ Short Break',
    'long-break': '🌴 Long Break'
  };

  const productivityStats = [
    {
      icon: <Clock className="h-6 w-6" />,
      label: 'Time Tracked',
      value: formatTime(trackedTime),
      color: 'bg-blue-500'
    },
    {
      icon: <Target className="h-6 w-6" />,
      label: 'Tasks Completed',
      value: '12',
      color: 'bg-green-500'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      label: 'Focus Score',
      value: '85%',
      color: 'bg-purple-500'
    },
    {
      icon: <Brain className="h-6 w-6" />,
      label: 'Productivity Level',
      value: 'High',
      color: 'bg-orange-500'
    }
  ];

  const quickActions = [
    {
      icon: <Play className="h-5 w-5" />,
      label: 'Start Focus',
      action: () => setCurrentPhase('work'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: <Coffee className="h-5 w-5" />,
      label: 'Take Break',
      action: () => setCurrentPhase('short-break'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: 'Deep Work',
      action: () => setCurrentPhase('work'),
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-4">⚡ Productivity Center</h1>
          <p className="text-xl opacity-90">
            Optimize your focus and maximize your productivity
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Current Phase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Current Session: {phaseLabels[currentPhase]}
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTimeTracking}
                className={`px-6 py-3 rounded-lg font-semibold text-white flex items-center gap-2 transition-colors ${
                  timeTrackingActive 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {timeTrackingActive ? (
                  <>
                    <Pause className="h-5 w-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Start
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setTrackedTime(0);
                  setTimeTrackingActive(false);
                  if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
                }}
                className="px-6 py-3 rounded-lg font-semibold text-white bg-gray-600 hover:bg-gray-700 flex items-center gap-2 transition-colors"
              >
                <Square className="h-5 w-5" />
                Reset
              </button>
            </div>
          </div>

          {/* Timer Display */}
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-gray-900 mb-4">
              {formatTime(trackedTime)}
            </div>
            <p className="text-gray-600">
              {timeTrackingActive ? 'Session Active' : 'Session Paused'}
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {productivityStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg text-white ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition-colors`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}