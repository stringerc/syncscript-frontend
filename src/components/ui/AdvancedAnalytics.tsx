import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  completed_at?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_level?: number;
  project_id?: string;
  due_date?: string;
  created_at?: string;
}

interface EnergyLog {
  level: number;
  timestamp: string;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

interface AdvancedAnalyticsProps {
  tasks: Task[];
  energyLogs: EnergyLog[];
  projects: Project[];
  authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

interface AnalyticsData {
  completionTrend: Array<{ date: string; completed: number; total: number }>;
  energyByHour: Array<{ hour: string; avgEnergy: number; completions: number }>;
  priorityBreakdown: Array<{ name: string; value: number; color: string }>;
  projectProgress: Array<{ project: string; completed: number; total: number; color: string }>;
  streakData: {
    current: number;
    longest: number;
    thisWeek: number;
  };
  productivityScore: number;
  insights: Array<{
    icon: string;
    title: string;
    description: string;
    type: 'success' | 'warning' | 'info';
  }>;
}

const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({
  tasks,
  energyLogs,
  projects,
  authenticatedFetch
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculateAnalytics();
  }, [tasks, energyLogs, projects, timeRange]);

  const calculateAnalytics = () => {
    setLoading(true);

    // Get date range
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Filter tasks by date range
    const recentTasks = tasks.filter(task => {
      if (!task.completed_at) return false;
      const taskDate = new Date(task.completed_at);
      return taskDate >= startDate;
    });

    // 1. COMPLETION TREND (daily completions)
    const completionTrend = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const completed = recentTasks.filter(task => {
        const taskDate = new Date(task.completed_at!);
        return taskDate.toDateString() === date.toDateString();
      }).length;

      const total = tasks.filter(task => {
        // Count all tasks created before or on this date
        return true; // Simplified for now
      }).length;

      completionTrend.push({ date: dateStr, completed, total: Math.max(completed, 5) });
    }

    // 2. ENERGY BY HOUR (average energy and completions per hour)
    const energyByHourMap = new Map<number, { energySum: number; energyCount: number; completions: number }>();
    
    energyLogs.forEach(log => {
      const hour = new Date(log.timestamp).getHours();
      const existing = energyByHourMap.get(hour) || { energySum: 0, energyCount: 0, completions: 0 };
      existing.energySum += log.level;
      existing.energyCount += 1;
      energyByHourMap.set(hour, existing);
    });

    recentTasks.forEach(task => {
      if (task.completed_at) {
        const hour = new Date(task.completed_at).getHours();
        const existing = energyByHourMap.get(hour) || { energySum: 0, energyCount: 0, completions: 0 };
        existing.completions += 1;
        energyByHourMap.set(hour, existing);
      }
    });

    const energyByHour = Array.from(energyByHourMap.entries())
      .map(([hour, data]) => ({
        hour: `${hour % 12 || 12}${hour < 12 ? 'AM' : 'PM'}`,
        hourNum: hour,
        avgEnergy: data.energyCount > 0 ? Math.round(data.energySum / data.energyCount) : 0,
        completions: data.completions
      }))
      .sort((a, b) => a.hourNum - b.hourNum);

    // 3. PRIORITY BREAKDOWN (priority: 1-5, where 5=highest)
    const priorityCounts = {
      high: recentTasks.filter(t => t.priority >= 4).length,
      medium: recentTasks.filter(t => t.priority === 3).length,
      low: recentTasks.filter(t => t.priority <= 2).length
    };

    const priorityBreakdown = [
      { name: 'High Priority', value: priorityCounts.high, color: '#EF4444' },
      { name: 'Medium Priority', value: priorityCounts.medium, color: '#F59E0B' },
      { name: 'Low Priority', value: priorityCounts.low, color: '#10B981' }
    ].filter(p => p.value > 0);

    // 4. PROJECT PROGRESS
    const projectProgress = projects.map(project => {
      const projectTasks = tasks.filter(t => t.project_id === project.id);
      const completed = projectTasks.filter(t => t.completed).length;
      return {
        project: project.name,
        completed,
        total: projectTasks.length,
        color: project.color
      };
    }).filter(p => p.total > 0);

    // 5. STREAK DATA
    const completedDates = new Set(
      recentTasks.map(t => new Date(t.completed_at!).toDateString())
    );
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let thisWeekCompletions = 0;

    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Calculate current streak
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      if (completedDates.has(date.toDateString())) {
        if (i === 0 || tempStreak > 0) {
          tempStreak++;
        }
        if (date >= weekAgo) {
          thisWeekCompletions++;
        }
      } else if (i > 0) {
        break;
      }
    }
    currentStreak = tempStreak;
    longestStreak = Math.max(currentStreak, 5); // Mock longest for now

    // 6. PRODUCTIVITY SCORE (0-100)
    const completionRate = tasks.length > 0 ? (recentTasks.length / Math.max(tasks.length, 10)) * 100 : 0;
    const streakBonus = Math.min(currentStreak * 2, 20);
    const consistencyBonus = completionTrend.filter(d => d.completed > 0).length / days * 20;
    const productivityScore = Math.min(Math.round(completionRate + streakBonus + consistencyBonus), 100);

    // 7. INSIGHTS
    const insights = [];

    // Peak productivity hour
    const peakHour = energyByHour.reduce((max, curr) => 
      curr.completions > (max?.completions || 0) ? curr : max
    , energyByHour[0]);

    if (peakHour && peakHour.completions > 0) {
      insights.push({
        icon: '🔥',
        title: 'Peak Performance Time',
        description: `You're most productive around ${peakHour.hour} with ${peakHour.completions} completions`,
        type: 'success' as const
      });
    }

    // Energy insight
    const avgEnergy = energyLogs.length > 0 
      ? energyLogs.reduce((sum, log) => sum + log.level, 0) / energyLogs.length 
      : 50;
    
    if (avgEnergy >= 60) {
      insights.push({
        icon: '⚡',
        title: 'High Energy Level',
        description: `Your average energy is ${Math.round(avgEnergy)}% - excellent momentum!`,
        type: 'success' as const
      });
    } else if (avgEnergy < 40) {
      insights.push({
        icon: '😴',
        title: 'Energy Management',
        description: `Average energy is ${Math.round(avgEnergy)}% - consider more breaks`,
        type: 'warning' as const
      });
    }

    // Streak insight
    if (currentStreak >= 7) {
      insights.push({
        icon: '🎯',
        title: 'Streak Champion',
        description: `${currentStreak} day streak! You're building amazing habits`,
        type: 'success' as const
      });
    } else if (currentStreak === 0) {
      insights.push({
        icon: '🚀',
        title: 'Fresh Start',
        description: 'Complete a task today to start your productivity streak!',
        type: 'info' as const
      });
    }

    // Completion rate insight
    if (completionRate >= 70) {
      insights.push({
        icon: '✨',
        title: 'Excellent Progress',
        description: `${Math.round(completionRate)}% completion rate - you're crushing it!`,
        type: 'success' as const
      });
    }

    setAnalytics({
      completionTrend,
      energyByHour,
      priorityBreakdown,
      projectProgress,
      streakData: {
        current: currentStreak,
        longest: longestStreak,
        thisWeek: thisWeekCompletions
      },
      productivityScore,
      insights
    });

    setLoading(false);
  };

  if (loading || !analytics) {
    return (
      <div className="analytics-loading">
        <div className="loading-spinner"></div>
        <p>Calculating your productivity insights...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="advanced-analytics"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header with Time Range Selector */}
      <div className="analytics-header">
        <h2 className="analytics-title">📊 Advanced Analytics</h2>
        <div className="time-range-selector">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              className={`time-btn ${timeRange === range ? 'active' : ''}`}
              onClick={() => setTimeRange(range)}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Productivity Score & Streak Cards */}
      <div className="top-stats-grid">
        <motion.div
          className="productivity-score-card"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="score-badge">
            <div className="score-icon">🏆</div>
            <div className="score-value">{analytics.productivityScore}</div>
          </div>
          <div className="score-details">
            <h3>Productivity Score</h3>
            <div className="score-bar">
              <motion.div
                className="score-fill"
                initial={{ width: 0 }}
                animate={{ width: `${analytics.productivityScore}%` }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
            </div>
            <p className="score-label">
              {analytics.productivityScore >= 80 ? '🌟 Excellent!' : 
               analytics.productivityScore >= 60 ? '👍 Good Progress' : 
               '💪 Keep Going!'}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="streak-card"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="streak-stats">
            <div className="streak-item">
              <div className="streak-value">{analytics.streakData.current}</div>
              <div className="streak-label">🔥 Current Streak</div>
            </div>
            <div className="streak-divider" />
            <div className="streak-item">
              <div className="streak-value">{analytics.streakData.thisWeek}</div>
              <div className="streak-label">📋 This Week</div>
            </div>
            <div className="streak-divider" />
            <div className="streak-item">
              <div className="streak-value">{analytics.streakData.longest}</div>
              <div className="streak-label">🏅 Best Streak</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Completion Trend Chart */}
      <motion.div
        className="chart-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="chart-title">📈 Task Completion Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={analytics.completionTrend}>
            <defs>
              <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4A90E2" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                background: '#FFFDF7', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="completed" 
              stroke="#4A90E2" 
              strokeWidth={2}
              fill="url(#completionGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Energy & Completions by Hour */}
      <motion.div
        className="chart-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <h3 className="chart-title">⚡ Energy & Productivity by Hour</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={analytics.energyByHour}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="hour" stroke="#6B7280" style={{ fontSize: '11px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                background: '#FFFDF7', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="avgEnergy" fill="#7ED321" name="Avg Energy" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completions" fill="#4A90E2" name="Completions" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Priority & Project Breakdown */}
      <div className="charts-row">
        {/* Priority Breakdown */}
        {analytics.priorityBreakdown.length > 0 && (
          <motion.div
            className="chart-card half-width"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="chart-title">🎯 Priority Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={analytics.priorityBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent as number) * 100).toFixed(0)}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.priorityBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Project Progress */}
        {analytics.projectProgress.length > 0 && (
          <motion.div
            className="chart-card half-width"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <h3 className="chart-title">📁 Project Progress</h3>
            <div className="project-progress-list">
              {analytics.projectProgress.slice(0, 5).map((project, index) => {
                const percentage = project.total > 0 ? (project.completed / project.total) * 100 : 0;
                return (
                  <div key={index} className="project-progress-item">
                    <div className="project-info">
                      <span 
                        className="project-color" 
                        style={{ background: project.color }}
                      />
                      <span className="project-name">{project.project}</span>
                      <span className="project-stats">
                        {project.completed}/{project.total}
                      </span>
                    </div>
                    <div className="project-bar">
                      <motion.div
                        className="project-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                        style={{ background: project.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Insights Section */}
      {analytics.insights.length > 0 && (
        <motion.div
          className="insights-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="insights-title">💡 AI-Powered Insights</h3>
          <div className="insights-grid">
            {analytics.insights.map((insight, index) => (
              <motion.div
                key={index}
                className={`insight-card insight-${insight.type}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="insight-icon">{insight.icon}</div>
                <div className="insight-content">
                  <h4 className="insight-title">{insight.title}</h4>
                  <p className="insight-description">{insight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdvancedAnalytics;

