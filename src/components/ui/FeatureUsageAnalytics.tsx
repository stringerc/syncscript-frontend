import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FeatureUsage {
  featureId: string;
  featureName: string;
  icon: string;
  usageCount: number;
  lastUsed: string;
  category: string;
}

interface FeatureUsageAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeatureUsageAnalytics: React.FC<FeatureUsageAnalyticsProps> = ({ isOpen, onClose }) => {
  const [usageData, setUsageData] = useState<FeatureUsage[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    if (isOpen) {
      // Load usage data from localStorage
      const stored = localStorage.getItem('feature_usage_analytics');
      if (stored) {
        setUsageData(JSON.parse(stored));
      } else {
        // Demo data
        setUsageData([
          { featureId: 'tasks', featureName: 'Task Management', icon: '✅', usageCount: 245, lastUsed: new Date().toISOString(), category: 'core' },
          { featureId: 'energy', featureName: 'Energy Tracking', icon: '⚡', usageCount: 127, lastUsed: new Date().toISOString(), category: 'core' },
          { featureId: 'analytics', featureName: 'Analytics', icon: '📊', usageCount: 89, lastUsed: new Date().toISOString(), category: 'analytics' },
          { featureId: 'focus', featureName: 'Focus Mode', icon: '🎯', usageCount: 64, lastUsed: new Date().toISOString(), category: 'focus' },
          { featureId: 'kanban', featureName: 'Kanban Board', icon: '📋', usageCount: 45, lastUsed: new Date().toISOString(), category: 'views' },
          { featureId: 'ai-coach', featureName: 'AI Coach', icon: '🤖', usageCount: 32, lastUsed: new Date().toISOString(), category: 'ai' },
          { featureId: 'team', featureName: 'Team Collaboration', icon: '👥', usageCount: 28, lastUsed: new Date().toISOString(), category: 'team' },
          { featureId: 'calendar', featureName: 'Calendar', icon: '📅', usageCount: 19, lastUsed: new Date().toISOString(), category: 'views' },
        ]);
      }
    }
  }, [isOpen]);

  const topFeatures = [...usageData]
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 10);

  const chartData = topFeatures.map(f => ({
    name: f.featureName,
    usage: f.usageCount,
    icon: f.icon
  }));

  const totalUsage = usageData.reduce((sum, f) => sum + f.usageCount, 0);
  const featuresUsed = usageData.filter(f => f.usageCount > 0).length;
  const avgUsagePerFeature = featuresUsed > 0 ? Math.round(totalUsage / featuresUsed) : 0;

  if (!isOpen) return null;

  return (
    <div className="feature-usage-overlay" onClick={onClose}>
      <motion.div
        className="feature-usage-modal"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="feature-usage-header">
          <div>
            <h2>📊 Feature Usage Analytics</h2>
            <p>Understand how you use SyncScript</p>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="feature-usage-content">
          {/* Stats Cards */}
          <div className="usage-stats-grid">
            <div className="usage-stat-card">
              <div className="stat-value">{totalUsage.toLocaleString()}</div>
              <div className="stat-label">Total Interactions</div>
            </div>
            <div className="usage-stat-card">
              <div className="stat-value">{featuresUsed}</div>
              <div className="stat-label">Features Used</div>
            </div>
            <div className="usage-stat-card">
              <div className="stat-value">{avgUsagePerFeature}</div>
              <div className="stat-label">Avg per Feature</div>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="time-range-selector">
            <button
              className={`range-btn ${timeRange === 'week' ? 'active' : ''}`}
              onClick={() => setTimeRange('week')}
            >
              Last 7 Days
            </button>
            <button
              className={`range-btn ${timeRange === 'month' ? 'active' : ''}`}
              onClick={() => setTimeRange('month')}
            >
              Last 30 Days
            </button>
            <button
              className={`range-btn ${timeRange === 'all' ? 'active' : ''}`}
              onClick={() => setTimeRange('all')}
            >
              All Time
            </button>
          </div>

          {/* Chart */}
          <div className="usage-chart">
            <h3>Top 10 Most Used Features</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar 
                  dataKey="usage" 
                  fill="url(#colorGradient)" 
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A90E2" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendations */}
          <div className="usage-recommendations">
            <h3>💡 Recommendations</h3>
            <div className="recommendations-list">
              <div className="recommendation-item">
                <span className="rec-icon">🎯</span>
                <div>
                  <strong>Try Eisenhower Matrix</strong>
                  <p>You haven&apos;t used this yet! Perfect for prioritizing tasks.</p>
                </div>
              </div>
              <div className="recommendation-item">
                <span className="rec-icon">🧠</span>
                <div>
                  <strong>Explore Mind Map</strong>
                  <p>Visual thinker? Mind Map helps you see task relationships.</p>
                </div>
              </div>
              <div className="recommendation-item">
                <span className="rec-icon">🎓</span>
                <div>
                  <strong>Check Learning Center</strong>
                  <p>Level up with productivity courses and certifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureUsageAnalytics;
