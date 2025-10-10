import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/ReportingDashboard.css';

interface Task {
  completed: boolean;
  created_at: string;
  completed_at?: string;
  [key: string]: unknown;
}

interface EnergyLog {
  energy_level: number;
  created_at: string;
  [key: string]: unknown;
}

interface ReportingDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  energyLogs: EnergyLog[];
}

const ReportingDashboard: React.FC<ReportingDashboardProps> = ({ isOpen, onClose, tasks, energyLogs }) => {
  const [reportType, setReportType] = useState<'overview' | 'tasks' | 'energy' | 'productivity'>('overview');
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter'>('week');

  if (!isOpen) return null;

  // Calculate stats
  const completed = tasks.filter(t => t.completed).length;
  const completionRate = tasks.length > 0 ? (completed / tasks.length * 100).toFixed(1) : 0;
  const avgEnergy = energyLogs.length > 0
    ? Math.round(energyLogs.reduce((sum: number, log: EnergyLog) => sum + log.energy_level, 0) / energyLogs.length)
    : 0;

  // Prepare chart data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      tasks: tasks.filter(t => {
        const taskDate = new Date(t.created_at);
        return taskDate.toDateString() === date.toDateString();
      }).length,
      completed: tasks.filter(t => {
        if (!t.completed_at) return false;
        const completedDate = new Date(t.completed_at);
        return completedDate.toDateString() === date.toDateString();
      }).length,
      energy: energyLogs.filter((log: EnergyLog) => {
        const logDate = new Date(log.created_at);
        return logDate.toDateString() === date.toDateString();
      }).reduce((sum: number, log: EnergyLog) => sum + log.energy_level, 0) / energyLogs.filter((log: EnergyLog) => {
        const logDate = new Date(log.created_at);
        return logDate.toDateString() === date.toDateString();
      }).length || 0
    };
  });

  return (
    <div className="reporting-overlay" onClick={onClose}>
      <motion.div
        className="reporting-modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="reporting-header">
          <h2>📊 Reporting Dashboard</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="reporting-controls">
          <div className="report-type-selector">
            {['overview', 'tasks', 'energy', 'productivity'].map(type => (
              <button
                key={type}
                className={`type-btn ${reportType === type ? 'active' : ''}`}
                onClick={() => setReportType(type as any)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="date-range-select"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 90 Days</option>
          </select>
        </div>

        <div className="reporting-content">
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-value">{completed}</div>
              <div className="card-label">Completed</div>
            </div>
            <div className="summary-card">
              <div className="card-value">{completionRate}%</div>
              <div className="card-label">Success Rate</div>
            </div>
            <div className="summary-card">
              <div className="card-value">{avgEnergy}</div>
              <div className="card-label">Avg Energy</div>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-container">
            <div className="chart-section">
              <h4>Task Completion Trend</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10B981" name="Completed" />
                  <Bar dataKey="tasks" fill="#3B82F6" name="Created" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-section">
              <h4>Energy Levels</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="energy" stroke="#F59E0B" strokeWidth={3} name="Energy" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="reporting-footer">
          <button className="btn btn-outline">📥 Export Report</button>
          <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportingDashboard;
