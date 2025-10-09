import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnalyticsData {
  weeklyCompletions: number[];
  weeklyLabels: string[];
  energyPatterns: { level: number; count: number }[];
  focusStats: {
    totalSessions: number;
    totalMinutes: number;
    averageSessionLength: number;
  };
  productivityScore: number;
  insights: {
    icon: string;
    title: string;
    description: string;
    color: string;
  }[];
}

interface AnalyticsDashboardProps {
  userId: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userId }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Mock data for now - will be replaced with API call
  useEffect(() => {
    const mockData: AnalyticsData = {
      weeklyCompletions: [3, 5, 4, 7, 6, 8, 5],
      weeklyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      energyPatterns: [
        { level: 1, count: 2 },
        { level: 2, count: 5 },
        { level: 3, count: 12 },
        { level: 4, count: 8 },
        { level: 5, count: 4 }
      ],
      focusStats: {
        totalSessions: 15,
        totalMinutes: 375,
        averageSessionLength: 25
      },
      productivityScore: 87,
      insights: [
        {
          icon: '🔥',
          title: 'Peak Performance',
          description: 'You complete most tasks between 2-4 PM',
          color: 'var(--syncscript-orange-500)'
        },
        {
          icon: '⚡',
          title: 'Energy Sweet Spot',
          description: 'Level 3 energy yields highest completion rate',
          color: 'var(--syncscript-blue-500)'
        },
        {
          icon: '🎯',
          title: 'Focus Master',
          description: '15 Pomodoro sessions this week - up 25%!',
          color: 'var(--syncscript-green-500)'
        }
      ]
    };

    setTimeout(() => {
      setAnalytics(mockData);
      setIsLoading(false);
    }, 500);
  }, [userId, timeRange]);

  if (isLoading) {
    return (
      <div className="analytics-loading">
        <div className="spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) return null;

  const maxCompletions = Math.max(...analytics.weeklyCompletions);

  return (
    <motion.div
      className="analytics-dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="analytics-header">
        <h2 className="analytics-title">📊 Your Analytics</h2>
        <div className="time-range-selector">
          <button
            className={`time-btn ${timeRange === '7d' ? 'active' : ''}`}
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </button>
          <button
            className={`time-btn ${timeRange === '30d' ? 'active' : ''}`}
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </button>
          <button
            className={`time-btn ${timeRange === '90d' ? 'active' : ''}`}
            onClick={() => setTimeRange('90d')}
          >
            90 Days
          </button>
        </div>
      </div>

      {/* Productivity Score */}
      <motion.div
        className="productivity-score-card"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="score-icon">🏆</div>
        <div className="score-content">
          <h3>Productivity Score</h3>
          <div className="score-value">{analytics.productivityScore}</div>
          <div className="score-bar">
            <div
              className="score-fill"
              style={{ width: `${analytics.productivityScore}%` }}
            />
          </div>
          <p className="score-label">
            {analytics.productivityScore >= 80 ? 'Excellent!' : 
             analytics.productivityScore >= 60 ? 'Good Progress' : 
             'Keep Going!'}
          </p>
        </div>
      </motion.div>

      {/* Weekly Completions Chart */}
      <div className="chart-card">
        <h3 className="chart-title">📈 Weekly Task Completions</h3>
        <div className="bar-chart">
          {analytics.weeklyCompletions.map((count, index) => (
            <div key={index} className="bar-container">
              <motion.div
                className="bar"
                initial={{ height: 0 }}
                animate={{ height: `${(count / maxCompletions) * 100}%` }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
              >
                <span className="bar-value">{count}</span>
              </motion.div>
              <span className="bar-label">{analytics.weeklyLabels[index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Energy Patterns */}
      <div className="chart-card">
        <h3 className="chart-title">⚡ Energy Patterns</h3>
        <div className="energy-chart">
          {analytics.energyPatterns.map((pattern) => (
            <div key={pattern.level} className="energy-bar-row">
              <span className="energy-level">Level {pattern.level}</span>
              <div className="energy-bar-container">
                <motion.div
                  className="energy-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${(pattern.count / 12) * 100}%` }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  style={{
                    background: `hsl(${120 + pattern.level * 40}, 70%, 50%)`
                  }}
                />
              </div>
              <span className="energy-count">{pattern.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Stats */}
      <div className="stats-grid">
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{analytics.focusStats.totalSessions}</div>
          <div className="stat-label">Focus Sessions</div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{analytics.focusStats.totalMinutes}m</div>
          <div className="stat-label">Total Focus Time</div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">📊</div>
          <div className="stat-value">{analytics.focusStats.averageSessionLength}m</div>
          <div className="stat-label">Avg Session</div>
        </motion.div>
      </div>

      {/* Insights */}
      <div className="insights-section">
        <h3 className="insights-title">💡 Insights & Recommendations</h3>
        <div className="insights-grid">
          {analytics.insights.map((insight, index) => (
            <motion.div
              key={index}
              className="insight-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              style={{ borderLeftColor: insight.color }}
            >
              <div className="insight-icon">{insight.icon}</div>
              <div className="insight-content">
                <h4 className="insight-title">{insight.title}</h4>
                <p className="insight-description">{insight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsDashboard;

