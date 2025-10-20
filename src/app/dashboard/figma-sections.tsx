'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Clock, 
  MapPin, 
  Cloud, 
  Sun, 
  Droplets, 
  Wind,
  CheckCircle,
  Circle,
  ChevronRight,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { AnimatedAvatar } from './figma-dashboard';

// AI Focus Section Component
function AIFocusSection() {
  return (
    <div className="h-full flex flex-col pb-4">
      <h2 className="text-white mb-4">AI & FOCUS</h2>
      <div className="flex flex-col gap-4 flex-1">
        {/* What Should I Be Doing Right Now? */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            What Should I Be Doing Right Now?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-[#2a2d35] rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white">Review Q4 budget proposal</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#2a2d35] rounded-lg">
              <Circle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">Prepare team meeting agenda</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#2a2d35] rounded-lg">
              <Circle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">Update project timeline</span>
            </div>
          </div>
        </div>

        {/* Energy Adaptive Agent */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Energy Adaptive Agent
          </h3>
          <div className="flex items-center space-x-4">
            <AnimatedAvatar
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop"
              fallback="AI"
              progress={75}
              animationType="glow"
              className="w-16 h-16"
              size={64}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Current Energy</span>
                <span className="text-teal-400 font-bold">75%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">Optimal for focused work</p>
            </div>
          </div>
        </div>

        {/* Weather & Route Intelligence */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-white mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Weather & Route Intelligence
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sun className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Sunny, 72°F</span>
              </div>
              <span className="text-gray-400 text-sm">San Francisco</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-white">15 min to office</span>
              </div>
              <span className="text-gray-400 text-sm">Traffic: Light</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-gray-400" />
                <span className="text-white">5 mph winds</span>
              </div>
              <span className="text-gray-400 text-sm">Perfect for walking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Today Section Component
function TodaySection() {
  return (
    <div className="h-full flex flex-col pb-4">
      <h2 className="text-white mb-4">TODAY'S ORCHESTRATION</h2>
      <div className="flex flex-col gap-4 flex-1">
        {/* My Day */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800 flex-1">
          <h3 className="text-white mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            My Day
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-[#2a2d35] rounded-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Team Standup</p>
                <p className="text-gray-400 text-sm">9:00 AM - 9:30 AM</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#2a2d35] rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Budget Review</p>
                <p className="text-gray-400 text-sm">10:00 AM - 11:00 AM</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#2a2d35] rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Client Meeting</p>
                <p className="text-gray-400 text-sm">2:00 PM - 3:00 PM</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Financial Conflict Alert */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-red-500/50">
          <div className="flex items-center space-x-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-red-400 font-medium">Financial Conflict Alert</h3>
          </div>
          <p className="text-gray-300 text-sm mb-3">
            Budget variance detected in Q4 projections. Immediate attention required.
          </p>
          <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-500/30 transition-colors">
            Review Details
          </button>
        </div>

        {/* My Calendar */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-white mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            My Calendar
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Today</span>
              <span className="text-teal-400 text-sm">3 meetings</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Tomorrow</span>
              <span className="text-gray-400 text-sm">2 meetings</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">This Week</span>
              <span className="text-gray-400 text-sm">12 meetings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Resource Hub Section Component
function ResourceHubSection() {
  return (
    <div className="h-full flex flex-col pb-4">
      <h2 className="text-white mb-4">RESOURCE HUB</h2>
      <div className="flex flex-col gap-4 flex-1">
        {/* Team Activity */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800 flex-1">
          <h3 className="text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Team Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <AnimatedAvatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                fallback="JD"
                progress={80}
                animationType="wiggle"
                className="w-8 h-8"
                size={32}
              />
              <div>
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm text-gray-400">Completed 3 tasks</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AnimatedAvatar
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop"
                fallback="AS"
                progress={60}
                animationType="pulse"
                className="w-8 h-8"
                size={32}
              />
              <div>
                <p className="font-medium text-white">Alice Smith</p>
                <p className="text-sm text-gray-400">Working on dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AnimatedAvatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                fallback="MJ"
                progress={90}
                animationType="heartbeat"
                className="w-8 h-8"
                size={32}
              />
              <div>
                <p className="font-medium text-white">Mike Johnson</p>
                <p className="text-sm text-gray-400">Deployed new feature</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Quick Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-400">24</p>
              <p className="text-gray-400 text-sm">Tasks Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">87%</p>
              <p className="text-gray-400 text-sm">Team Efficiency</p>
            </div>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-white mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Recent Documents
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">Q4 Budget Report.pdf</span>
              <span className="text-gray-400 text-xs">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">Project Timeline.xlsx</span>
              <span className="text-gray-400 text-xs">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">Team Meeting Notes.docx</span>
              <span className="text-gray-400 text-xs">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AIFocusSection, TodaySection, ResourceHubSection };
