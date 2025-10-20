'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Target, 
  Calendar, 
  Bot, 
  Zap, 
  Users, 
  TrendingUp, 
  Gamepad2, 
  Link2, 
  Building2, 
  FileText, 
  Menu, 
  Settings,
  Search, 
  Lock, 
  MessageSquare, 
  Bell, 
  PanelRightOpen, 
  PanelRightClose,
  HelpCircle, 
  Mic, 
  MoreHorizontal,
  ChevronRight,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Key,
  Eye,
  Smartphone,
  Globe,
  Clock,
  MapPin,
  Cloud,
  Sun,
  Droplets,
  Wind
} from 'lucide-react';

// AnimatedAvatar Component
function AnimatedAvatar({ 
  src, 
  fallback, 
  progress, 
  animationType, 
  className = '',
  size = 36 
}: {
  src: string;
  fallback: string;
  progress: number;
  animationType: 'glow' | 'heartbeat' | 'shake' | 'spin' | 'pulse' | 'wiggle' | 'bounce';
  className?: string;
  size?: number;
}) {
  const animations = {
    glow: { boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' },
    heartbeat: { scale: [1, 1.1, 1] },
    shake: { x: [0, -2, 2, -2, 2, 0] },
    spin: { rotate: 360 },
    pulse: { scale: [1, 1.05, 1] },
    wiggle: { rotate: [0, -3, 3, -3, 3, 0] },
    bounce: { y: [0, -4, 0] }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      animate={animations[animationType]}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="relative">
        <img
          src={src}
          alt={fallback}
          className="w-full h-full rounded-full object-cover"
          style={{ width: size, height: size }}
        />
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          style={{ width: size, height: size }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 4) / 2}
            fill="none"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="2"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 4) / 2}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * (size - 4) / 2}`}
            strokeDashoffset={`${2 * Math.PI * (size - 4) / 2 * (1 - progress / 100)}`}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}

// Sidebar Component
function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Target, label: 'Goals', active: false },
    { icon: Calendar, label: 'Calendar', active: false },
    { icon: Bot, label: 'AI Assistant', active: false },
    { icon: Zap, label: 'Automation', active: false },
    { icon: Users, label: 'Team', active: false },
    { icon: TrendingUp, label: 'Analytics', active: false },
    { icon: Gamepad2, label: 'Gaming', active: false },
    { icon: Link2, label: 'Integrations', active: false },
    { icon: Building2, label: 'Enterprise', active: false },
    { icon: FileText, label: 'Documents', active: false },
    { icon: Settings, label: 'Settings', active: false }
  ];

  return (
    <div className="w-[140px] bg-[#1e2128] border-r border-gray-800 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col space-y-2 w-full px-3">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
              item.active 
                ? 'bg-teal-500/20 text-teal-400' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Dashboard Header Component
function DashboardHeader({ 
  isAIInsightsOpen, 
  onToggleAIInsights 
}: { 
  isAIInsightsOpen: boolean; 
  onToggleAIInsights: () => void; 
}) {
  return (
    <header className="bg-[#1e2128] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="text-xl font-bold text-white">SyncScript</h1>
          </div>

          {/* Universal Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Universal Search..."
              className="bg-[#2a2d35] text-white placeholder-gray-400 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-80 focus:outline-none focus:border-teal-500"
              id="universal-search"
              name="universal-search"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Conversation Extraction */}
          <motion.button
            className="flex items-center space-x-2 bg-[#2a2d35] text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">Extract</span>
          </motion.button>

          {/* Notifications */}
          <motion.button
            className="relative p-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* AI Insights Toggle */}
          <motion.button
            onClick={onToggleAIInsights}
            className="flex items-center space-x-2 bg-teal-500/20 text-teal-400 px-3 py-2 rounded-lg hover:bg-teal-500/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAIInsightsOpen ? (
              <PanelRightClose className="w-4 h-4" />
            ) : (
              <PanelRightOpen className="w-4 h-4" />
            )}
            <span className="text-sm">AI Insights</span>
          </motion.button>

          {/* Low Energy Mode */}
          <div className="flex items-center space-x-2 text-yellow-400">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Low Energy</span>
          </div>

          {/* User Avatar */}
          <AnimatedAvatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            fallback="JD"
            progress={85}
            animationType="pulse"
            className="w-10 h-10"
            size={40}
          />
        </div>
      </div>
    </header>
  );
}

export { Sidebar, DashboardHeader, AnimatedAvatar };

