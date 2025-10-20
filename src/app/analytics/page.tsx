"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation';
import { useRubeAuth } from '../../hooks/useRubeAuth';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Target,
  Users,
  Zap,
  Calendar,
  Award,
  Activity,
  PieChart,
  Loader2,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  productivity: {
    tasksCompleted: number;
    tasksCreated: number;
    completionRate: number;
    averageTimePerTask: string;
    weeklyTrend: 'up' | 'down' | 'stable';
  };
  team: {
    activeMembers: number;
    totalMembers: number;
    collaborationScore: number;
    responseTime: string;
  };
  energy: {
    currentLevel: number;
    averageLevel: number;
    peakHours: string[];
    lowHours: string[];
  };
  projects: {
    active: number;
    completed: number;
    onTime: number;
    overdue: number;
  };
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface TimeSeriesData {
  date: string;
  productivity: number;
  energy: number;
  tasks: number;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useRubeAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week');

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        const mockAnalytics: AnalyticsData = {
          productivity: {
            tasksCompleted: 127,
            tasksCreated: 156,
            completionRate: 81.4,
            averageTimePerTask: '2.3h',
            weeklyTrend: 'up'
          },
          team: {
            activeMembers: 8,
            totalMembers: 12,
            collaborationScore: 87,
            responseTime: '1.2h'
          },
          energy: {
            currentLevel: 85,
            averageLevel: 78,
            peakHours: ['9:00 AM', '2:00 PM', '4:00 PM'],
            lowHours: ['11:00 AM', '3:00 PM']
          },
          projects: {
            active: 5,
            completed: 12,
            onTime: 10,
            overdue: 2
          }
        };

        const mockTimeSeries: TimeSeriesData[] = [
          { date: '2024-01-08', productivity: 85, energy: 78, tasks: 12 },
          { date: '2024-01-09', productivity: 88, energy: 82, tasks: 15 },
          { date: '2024-01-10', productivity: 92, energy: 85, tasks: 18 },
          { date: '2024-01-11', productivity: 87, energy: 79, tasks: 14 },
          { date: '2024-01-12', productivity: 94, energy: 88, tasks: 16 },
          { date: '2024-01-13', productivity: 89, energy: 81, tasks: 13 },
          { date: '2024-01-14', productivity: 91, energy: 84, tasks: 17 }
        ];

        setAnalyticsData(mockAnalytics);
        setTimeSeriesData(mockTimeSeries);
        setIsLoading(false);
      }, 1000);
    }
  }, [user, selectedPeriod]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
  }, [user, authLoading, router]);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analytics & Insights</h1>
              <p className="text-gray-400">
                Track productivity, team performance, and energy patterns
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'quarter')}
                className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Productivity Score</p>
                <p className="text-2xl font-bold text-white">
                  {analyticsData?.productivity.completionRate.toFixed(1)}%
                </p>
                <div className="flex items-center mt-2">
                  {getTrendIcon(analyticsData?.productivity.weeklyTrend || 'stable')}
                  <span className={`text-sm ml-1 ${getTrendColor(analyticsData?.productivity.weeklyTrend || 'stable')}`}>
                    +5.2% from last week
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Tasks Completed</p>
                <p className="text-2xl font-bold text-white">
                  {analyticsData?.productivity.tasksCompleted}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm ml-1 text-green-400">
                    +12 this week
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Team Collaboration</p>
                <p className="text-2xl font-bold text-white">
                  {analyticsData?.team.collaborationScore}%
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm ml-1 text-green-400">
                    +3.1% from last week
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Energy Level</p>
                <p className="text-2xl font-bold text-white">
                  {analyticsData?.energy.currentLevel}%
                </p>
                <div className="flex items-center mt-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm ml-1 text-yellow-400">
                    Peak: 2:00 PM
                  </span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Productivity Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Productivity Trend</h3>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded text-gray-400 hover:text-white">
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button className="p-1 rounded text-gray-400 hover:text-white">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {timeSeriesData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-600 rounded-t transition-all duration-300 hover:bg-blue-500"
                    style={{ height: `${(data.productivity / 100) * 200}px` }}
                    title={`${data.productivity}% productivity on ${data.date}`}
                  ></div>
                  <span className="text-xs text-gray-400 mt-2">
                    {new Date(data.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Energy Pattern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Energy Pattern</h3>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded text-gray-400 hover:text-white">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {timeSeriesData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-yellow-500 rounded-t transition-all duration-300 hover:bg-yellow-400"
                    style={{ height: `${(data.energy / 100) * 200}px` }}
                    title={`${data.energy}% energy on ${data.date}`}
                  ></div>
                  <span className="text-xs text-gray-400 mt-2">
                    {new Date(data.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Task Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Completed</span>
                <span className="text-white font-semibold">{analyticsData?.productivity.tasksCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray- Лист-400">In Progress</span>
                <span className="text-white font-semibold">
                  {analyticsData ? analyticsData.productivity.tasksCreated - analyticsData.productivity.tasksCompleted : 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Average Time</span>
                <span className="text-white font-semibold">{analyticsData?.productivity.averageTimePerTask}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div 
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${analyticsData?.productivity.completionRate}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 text-center">
                {analyticsData?.productivity.completionRate.toFixed(1)}% completion rate
              </p>
            </div>
          </motion.div>

          {/* Team Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Team Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active Members</span>
                <span className="text-white font-semibold">
                  {analyticsData?.team.activeMembers}/{analyticsData?.team.totalMembers}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Collaboration Score</span>
                <span className="text-white font-semibold">{analyticsData?.team.collaborationScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Avg Response Time</span>
                <span className="text-white font-semibold">{analyticsData?.team.responseTime}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div 
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${analyticsData?.team.collaborationScore}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 text-center">
                Excellent collaboration
              </p>
            </div>
          </motion.div>

          {/* Energy Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Energy Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Current Level</span>
                <span className="text-white font-semibold">{analyticsData?.energy.currentLevel}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Average Level</span>
                <span className="text-white font-semibold">{analyticsData?.energy.averageLevel}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Peak Hours</span>
                <span className="text-white font-semibold">
                  {analyticsData?.energy.peakHours.slice(0, 2).join(', ')}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div 
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${analyticsData?.energy.currentLevel}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 text-center">
                High energy - optimal for complex tasks
              </p>
            </div>
          </motion.div>
        </div>

        {/* Project Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Project Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {analyticsData?.projects.active}
              </div>
              <div className="text-sm text-gray-400">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {analyticsData?.projects.completed}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {analyticsData?.projects.onTime}
              </div>
              <div className="text-sm text-gray-400">On Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">
                {analyticsData?.projects.overdue}
              </div>
              <div className="text-sm text-gray-400">Overdue</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
