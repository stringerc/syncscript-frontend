'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AnimatedAvatar } from './figma-dashboard';

// AI Insights Section Component
function AIInsightsSection() {
  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">AI Insights</h2>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {/* Performance Overview */}
        <div className="bg-[#2a2d35] rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-medium mb-3 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Performance Overview
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Productivity Score</span>
              <span className="text-green-400 font-bold">87%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Focus Time</span>
              <span className="text-blue-400 font-bold">4.2h</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="bg-[#2a2d35] rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-medium mb-3 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2" />
            Smart Recommendations
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-[#1e2128] rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium">Schedule deep work</p>
                <p className="text-gray-400 text-xs">Your energy is optimal for focused tasks</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-[#1e2128] rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium">Take a break</p>
                <p className="text-gray-400 text-xs">You've been working for 2 hours straight</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-[#1e2128] rounded-lg">
              <Target className="w-4 h-4 text-blue-400 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium">Review priorities</p>
                <p className="text-gray-400 text-xs">3 high-priority tasks are pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Insights */}
        <div className="bg-[#2a2d35] rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-medium mb-3 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Team Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <AnimatedAvatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                fallback="JD"
                progress={85}
                animationType="pulse"
                className="w-8 h-8"
                size={32}
              />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">John Doe</p>
                <p className="text-gray-400 text-xs">Most productive today</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-3">
              <AnimatedAvatar
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop"
                fallback="AS"
                progress={70}
                animationType="wiggle"
                className="w-8 h-8"
                size={32}
              />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Alice Smith</p>
                <p className="text-gray-400 text-xs">Needs support</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-[#2a2d35] rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-medium mb-3 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Activity Timeline
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">Completed budget review</p>
                <p className="text-gray-400 text-xs">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">Started team meeting</p>
                <p className="text-gray-400 text-xs">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">Updated project timeline</p>
                <p className="text-gray-400 text-xs">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#2a2d35] rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-medium mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              className="bg-teal-500/20 text-teal-400 p-2 rounded-lg text-xs hover:bg-teal-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Report
            </motion.button>
            <motion.button
              className="bg-blue-500/20 text-blue-400 p-2 rounded-lg text-xs hover:bg-blue-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Meeting
            </motion.button>
            <motion.button
              className="bg-purple-500/20 text-purple-400 p-2 rounded-lg text-xs hover:bg-purple-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Analyze Data
            </motion.button>
            <motion.button
              className="bg-pink-500/20 text-pink-400 p-2 rounded-lg text-xs hover:bg-pink-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Optimize Workflow
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AIInsightsSection };
