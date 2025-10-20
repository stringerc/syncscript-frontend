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
  Wind,
  Circle,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  AlertCircle,
  CircleCheckBig,
  CircleX
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
  const circumference = 2 * Math.PI * (size / 2 - 2);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getAnimationProps = () => {
    switch (animationType) {
      case 'glow':
        return {
          animate: { boxShadow: ['0 0 0px #10b981', '0 0 20px #10b981', '0 0 0px #10b981'] },
          transition: { duration: 2, repeat: Infinity }
        };
      case 'heartbeat':
        return {
          animate: { scale: [1, 1.1, 1] },
          transition: { duration: 1, repeat: Infinity }
        };
      case 'shake':
        return {
          animate: { x: [0, -2, 2, -2, 2, 0] },
          transition: { duration: 0.5, repeat: Infinity }
        };
      case 'spin':
        return {
          animate: { rotate: 360 },
          transition: { duration: 2, repeat: Infinity, ease: 'linear' }
        };
      case 'pulse':
        return {
          animate: { scale: [1, 1.05, 1] },
          transition: { duration: 1.5, repeat: Infinity }
        };
      case 'wiggle':
        return {
          animate: { rotate: [0, -5, 5, -5, 5, 0] },
          transition: { duration: 0.8, repeat: Infinity }
        };
      case 'bounce':
        return {
          animate: { y: [0, -10, 0] },
          transition: { duration: 1, repeat: Infinity }
        };
      default:
        return {};
    }
  };

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <motion.div className="relative" {...getAnimationProps()}>
        <svg className="absolute pointer-events-none" width={size + 8} height={size + 8} style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)', zIndex: 10 }}>
          <circle
            cx={(size + 8) / 2}
            cy={(size + 8) / 2}
            r={(size + 8) / 2 - 2}
            fill="none"
            stroke="rgba(75, 85, 99, 0.3)"
            strokeWidth="3"
          />
          <circle
            cx={(size + 8) / 2}
            cy={(size + 8) / 2}
            r={(size + 8) / 2 - 2}
            fill="none"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ stroke: '#10b981' }}
          />
        </svg>
        <div className={`rounded-full overflow-hidden ${className}`} style={{ width: size, height: size }}>
          <img
            src={src}
            alt={fallback}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallbackDiv = target.nextElementSibling as HTMLElement;
              if (fallbackDiv) fallbackDiv.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white font-semibold" style={{ display: 'none' }}>
            {fallback}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Sidebar Component
function Sidebar() {
  return (
    <div className="w-[140px] bg-[#1e2128] border-r border-gray-800 flex flex-col items-center py-6 space-y-8">
      {/* Logo */}
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Bot className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center space-y-6 flex-1">
        <div className="flex flex-col items-center gap-1 text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <span className="text-xs">Dashboard</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <span className="text-xs">Tasks</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-xs">Calendar</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs">AI</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-xs">Energy</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-xs">Team</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-xs">Analytics</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <span className="text-xs">Gaming</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <Link2 className="w-4 h-4" />
          </div>
          <span className="text-xs">Integrations</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="text-xs">Enterprise</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-xs text-center leading-tight">Scripts &<br/>Templates</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <Menu className="w-4 h-4" />
          </div>
          <span className="text-xs text-center leading-tight">All Features<br/>Menu</span>
        </div>
      </nav>

      {/* Settings */}
      <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white cursor-pointer">
        <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
          <Settings className="w-4 h-4" />
        </div>
        <span className="text-xs">Settings</span>
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
    <header className="h-16 bg-[#1e2128] border-b border-gray-800 flex items-center px-6 gap-6 relative z-10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <span className="text-white font-semibold">SyncScript</span>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Universal Search */}
      <div className="relative w-full max-w-2xl">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          id="universal-search"
          placeholder="Universal Search & Command"
          className="w-full bg-[#2a2d35] border border-gray-700 rounded-lg pl-10 pr-10 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-600"
          name="universal-search"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center gap-4 pl-6">
        <div className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer">
          <MessageSquare className="w-5 h-5 text-teal-500" />
          <span className="text-sm">Conversation Extraction</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        
        <button 
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          onClick={onToggleAIInsights}
          aria-label="Toggle AI Insights"
        >
          {isAIInsightsOpen ? (
            <PanelRightClose className="w-5 h-5 text-gray-400 hover:text-white" />
          ) : (
            <PanelRightOpen className="w-5 h-5 text-gray-400 hover:text-white" />
          )}
        </button>

        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <span className="text-sm">Low Energy Mode</span>
        </div>

        <div className="w-10 h-5 bg-gray-700 rounded-full p-0.5 cursor-pointer">
          <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
        </div>

        <AnimatedAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          fallback="JD"
          progress={85}
          animationType="pulse"
          className="w-10 h-10"
          size={40}
        />
      </div>
    </header>
  );
}

// AI Focus Section Component
function AIFocusSection() {
  return (
    <div className="h-full flex flex-col pb-4">
      <h2 className="text-white mb-4">AI & FOCUS</h2>
      <div className="flex flex-col gap-4 flex-1">
        {/* What Should I Be Doing Right Now? */}
        <div className="bg-gradient-to-br from-teal-900/40 to-blue-900/40 rounded-2xl p-6 border border-teal-800/30 flex-[1.4] flex flex-col justify-between">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-white text-4xl">What Should I Be Doing Right Now?</h3>
            <HelpCircle className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="mb-6">
            <p className="text-gray-300 text-xl mb-1">Prioritize <span className="text-teal-400">"Q4 Budget Allocation (Financial Agent)"</span></p>
          </div>
          
          <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 mb-4">
            <AnimatedAvatar
              src="https://images.unsplash.com/photo-1656313826909-1f89d1702a81?w=100&h=100&fit=crop"
              fallback="AI"
              progress={65}
              animationType="glow"
              className="w-20 h-20"
              size={80}
            />
            <div className="flex-1">
              <p className="text-white">"Q4 Budget Allocation</p>
              <p className="text-gray-400 text-sm">before your 1PM team sync for maximum cashback.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4">
            <AnimatedAvatar
              src="https://images.unsplash.com/photo-1549614614-dfc31601c389?w=100&h=100&fit=crop"
              fallback="AI"
              progress={35}
              animationType="pulse"
              className="w-20 h-20"
              size={80}
            />
            <div className="flex-1">
              <p className="text-white">Review Project Proposal</p>
              <p className="text-gray-400 text-sm">Due in 2 hours - High priority from stakeholder meeting.</p>
            </div>
          </div>
        </div>

        {/* Energy Adaptive Agent */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800 flex-1 flex flex-col">
          <h3 className="text-white mb-6 text-center">Energy Adaptive Agent</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="#2a2d35" strokeWidth="12" fill="none"></circle>
                <circle cx="80" cy="80" r="70" stroke="#10b981" strokeWidth="12" fill="none" strokeDasharray="439.82" strokeDashoffset="65.97" strokeLinecap="round"></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl">85%</span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-center text-sm mb-4">4 hrs left. Optimize load?</p>
          <button className="w-full bg-[#2a2d35] hover:bg-[#32353d] text-gray-300 rounded-lg py-3 flex items-center justify-center gap-2">
            <Mic className="w-4 h-4" />
            Voice-to-Task
          </button>
        </div>

        {/* Weather & Route Intelligence */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800 flex-[0.7] flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-white text-2xl">Weather & Route Intelligence</h3>
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <AnimatedAvatar
              src="https://images.unsplash.com/photo-1758599543154-76ec1c4257df?w=100&h=100&fit=crop"
              fallback="W"
              progress={75}
              animationType="wiggle"
              className="w-20 h-20"
              size={80}
            />
            <div className="flex-1">
              <p className="text-white">Heavy rain 5 PM. Reassemble</p>
              <p className="text-gray-400 text-sm">Outdoor Run or pack gear</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <AnimatedAvatar
              src="https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100&h=100&fit=crop"
              fallback="W"
              progress={45}
              animationType="shake"
              className="w-20 h-20"
              size={80}
            />
            <div className="flex-1">
              <p className="text-white">Traffic delay on Route 101</p>
              <p className="text-gray-400 text-sm">Leave 15 min early for evening appointment</p>
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
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800 flex-1 flex flex-col">
          <p className="text-gray-400 mb-4">My Day: Tuesday, Nov 28, 2023</p>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">Prioritized Tasks</h3>
            <span className="text-gray-400 text-sm">Hometon fog</span>
          </div>
          
          <div className="space-y-3 flex-1 overflow-y-auto">
            <div className="flex items-center gap-3 bg-[#2a2d35] rounded-lg p-3">
              <AnimatedAvatar
                src="https://images.unsplash.com/photo-1758518727984-17b37f2f0562?w=100&h=100&fit=crop"
                fallback="T"
                progress={35}
                animationType="spin"
                className="w-8 h-8"
                size={32}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm">Time</p>
                <p className="text-gray-400 text-xs truncate">Ask Togglises llm"</p>
              </div>
              <span className="text-gray-400 text-sm">7&10</span>
            </div>
            
            <div className="flex items-center gap-3 bg-[#2a2d35] rounded-lg p-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm">Themess law</p>
                <p className="text-gray-400 text-xs truncate">Ask Togglises llme!</p>
              </div>
              <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded">Party Sumcrn!</span>
              <span className="text-gray-400 text-sm">7&10</span>
            </div>
            
            <div className="flex items-center gap-3 bg-[#2a2d35] rounded-lg p-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm">Money Smth by</p>
                <p className="text-gray-400 text-xs truncate">Ask Togglises ller morp"</p>
              </div>
              <span className="text-gray-400 text-sm">7&10</span>
            </div>
          </div>
        </div>

        {/* Financial Conflict Alert */}
        <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-2xl p-6 border border-red-800/30 flex-[0.6]">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="text-white text-xl font-semibold">Financial Conflict Alert</h3>
          </div>
          <p className="text-gray-300 mb-4">Budget allocation conflict detected between Q4 projections and current spending patterns.</p>
          <div className="flex items-center justify-between">
            <span className="text-red-400 text-sm font-medium">Action Required</span>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
              Resolve Now
            </button>
          </div>
        </div>

        {/* My Calendar */}
        <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800 flex-[0.8]">
          <h3 className="text-white mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            My Calendar
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#2a2d35] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-white text-sm font-medium">Team Sync</p>
                  <p className="text-gray-400 text-xs">1:00 PM - 2:00 PM</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#2a2d35] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-white text-sm font-medium">Budget Review</p>
                  <p className="text-gray-400 text-xs">3:00 PM - 4:00 PM</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          {/* Mini Calendar */}
          <div className="mt-6">
            <div className="grid grid-cols-7 gap-1 mb-2">
              <div className="text-center text-gray-500 text-xs py-0.5">Su</div>
              <div className="text-center text-gray-500 text-xs py-0.5">Mo</div>
              <div className="text-center text-gray-500 text-xs py-0.5">Tu</div>
              <div className="text-center text-gray-500 text-xs py-0.5">We</div>
              <div className="text-center text-gray-500 text-xs py-0.5">Th</div>
              <div className="text-center text-gray-500 text-xs py-0.5">Fr</div>
              <div className="text-center text-gray-500 text-xs py-0.5">Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              <div className="aspect-square"></div>
              <div className="aspect-square"></div>
              <div className="aspect-square"></div>
              <div className="aspect-square"></div>
              <div className="aspect-square"></div>
              <div className="aspect-square"></div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">1</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">2</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">3</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">4</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">5</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">6</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">7</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">8</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">9</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">10</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">11</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">12</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">13</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">14</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">15</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">16</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">17</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">18</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">19</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">20</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">21</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">22</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">23</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">24</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">25</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">26</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-500 hover:bg-gray-800">27</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer bg-blue-500 text-white">28</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-400 hover:bg-gray-800">29</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-400 hover:bg-gray-800">30</div>
              <div className="aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer text-gray-400 hover:bg-gray-800">31</div>
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
          </div>
        </div>

        {/* Security Dashboard */}
        <div className="flex-1">
          <div className="bg-[#1e2128] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-semibold flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-400" />
                Security Dashboard
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-white font-semibold">85/100</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#141619] p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Secure</span>
                </div>
                <p className="text-white font-semibold">47</p>
                <p className="text-gray-400 text-xs">Threats Blocked</p>
              </div>
              <div className="bg-[#141619] p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">Warning</span>
                </div>
                <p className="text-white font-semibold">2</p>
                <p className="text-gray-400 text-xs">Vulnerabilities</p>
              </div>
              <div className="bg-[#141619] p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 text-sm font-medium">Monitoring</span>
                </div>
                <p className="text-white font-semibold">24/7</p>
                <p className="text-gray-400 text-xs">Active</p>
              </div>
              <div className="bg-[#141619] p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Settings className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium">Updated</span>
                </div>
                <p className="text-white font-semibold">2 hours ago</p>
                <p className="text-gray-400 text-xs">Last Scan</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-4">Security Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="w-12 h-6 rounded-full p-1 transition-colors bg-gray-600">
                    <div className="w-4 h-4 bg-white rounded-full transition-transform translate-x-0"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Biometric Authentication</p>
                      <p className="text-gray-400 text-sm">Use fingerprint or face ID</p>
                    </div>
                  </div>
                  <button className="w-12 h-6 rounded-full p-1 transition-colors bg-gray-600">
                    <div className="w-4 h-4 bg-white rounded-full transition-transform translate-x-0"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Data Encryption</p>
                      <p className="text-gray-400 text-sm">End-to-end encryption enabled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheckBig className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Recent Security Activity</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <CircleCheckBig className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Login from new device</p>
                      <p className="text-gray-400 text-sm">San Francisco, CA</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <CircleCheckBig className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Password changed</p>
                      <p className="text-gray-400 text-sm">Current session</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">1 hour ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <CircleX className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-white font-medium">Failed login attempt</p>
                      <p className="text-gray-400 text-sm">Unknown</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">3 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#141619] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <CircleCheckBig className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">2FA enabled</p>
                      <p className="text-gray-400 text-sm">Current session</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// AI Insights Section Component
function AIInsightsSection() {
  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">AI Insights</h2>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {/* Performance Overview */}
        <div className="bg-[#2a2d35] rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">Performance Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Productivity Score</span>
              <span className="text-green-400 font-semibold">92%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Focus Time</span>
              <span className="text-blue-400 font-semibold">4.2h</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#2a2d35] rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">Optimize Schedule</span>
              </div>
            </button>
            <button className="w-full text-left p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">Generate Report</span>
              </div>
            </button>
            <button className="w-full text-left p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm">Energy Boost</span>
              </div>
            </button>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-[#2a2d35] rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">Today's Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">Peak Performance</span>
              </div>
              <p className="text-white text-xs">You're most productive between 9-11 AM</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Lightbulb className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-medium">Suggestion</span>
              </div>
              <p className="text-white text-xs">Consider scheduling important tasks during peak hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [isAIInsightsOpen, setIsAIInsightsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#141619] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <DashboardHeader 
          isAIInsightsOpen={isAIInsightsOpen}
          onToggleAIInsights={() => setIsAIInsightsOpen(!isAIInsightsOpen)}
        />

        {/* Dashboard Content */}
        <main className={`flex-1 overflow-hidden p-6 transition-all duration-300 ${
          isAIInsightsOpen ? 'mr-80' : 'mr-0'
        }`}>
          <div className="flex gap-6 max-w-[1600px] mx-auto h-full">
            {/* Left Column - AI & FOCUS */}
            <div className="flex-1 h-full overflow-y-auto hide-scrollbar">
              <AIFocusSection />
            </div>

            {/* Middle Column - TODAY'S ORCHESTRATION */}
            <div className="flex-1 h-full overflow-y-auto hide-scrollbar">
              <TodaySection />
            </div>

            {/* Right Column - RESOURCE HUB */}
            <div className="flex-1 h-full overflow-y-auto hide-scrollbar">
              <ResourceHubSection />
            </div>
          </div>
        </main>

        {/* AI Insights Sidebar */}
        <div className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-[#1e2128] border-l border-gray-800 transition-transform duration-300 transform ${
          isAIInsightsOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto hide-scrollbar`}>
          <AIInsightsSection />
        </div>
      </div>
    </div>
  );
}