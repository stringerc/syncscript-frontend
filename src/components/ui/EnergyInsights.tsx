import React from 'react';
import { motion } from 'framer-motion';

interface EnergyLog {
  level: number;
  timestamp: string;
}

interface EnergyInsightsProps {
  energyLogs: EnergyLog[];
  currentEnergy: number;
}

export const EnergyInsights: React.FC<EnergyInsightsProps> = ({
  energyLogs,
  currentEnergy
}) => {
  // Calculate stats
  const average = energyLogs.length > 0
    ? (energyLogs.reduce((sum, log) => sum + log.level, 0) / energyLogs.length).toFixed(1)
    : currentEnergy;

  const highest = energyLogs.length > 0
    ? Math.max(...energyLogs.map(log => log.level))
    : currentEnergy;

  const lowest = energyLogs.length > 0
    ? Math.min(...energyLogs.map(log => log.level))
    : currentEnergy;

  // Group by hour to find peak time
  const hourlyEnergy: { [hour: number]: number[] } = {};
  energyLogs.forEach(log => {
    const hour = new Date(log.timestamp).getHours();
    if (!hourlyEnergy[hour]) {
      hourlyEnergy[hour] = [];
    }
    hourlyEnergy[hour].push(log.level);
  });

  // Find peak hour
  let peakHour = 12; // Default to noon
  let peakAvg = 0;
  Object.entries(hourlyEnergy).forEach(([hour, levels]) => {
    const avg = levels.reduce((sum, level) => sum + level, 0) / levels.length;
    if (avg > peakAvg) {
      peakAvg = avg;
      peakHour = parseInt(hour);
    }
  });

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  // Get last 7 days of data
  const last7Days = energyLogs.slice(-7 * 24); // Assuming multiple logs per day

  const energyLabels = ['', 'Low', 'Medium-Low', 'Medium', 'High', 'Peak'];
  const energyColors = [
    '',
    'var(--syncscript-blue-500)',
    'var(--syncscript-blue-400)',
    'var(--syncscript-green-500)',
    'var(--syncscript-orange-400)',
    'var(--syncscript-orange-500)'
  ];

  return (
    <div className="energy-insights">
      {/* Stats Grid */}
      <div className="insights-grid">
        {/* Current Energy */}
        <motion.div
          className="insight-card card card-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="insight-icon" style={{ background: energyColors[currentEnergy] }}>
            <svg className="neural-icon" viewBox="0 0 24 24">
              <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="insight-content">
            <span className="insight-label">Current</span>
            <span className="insight-value">{energyLabels[currentEnergy]}</span>
            <span className="insight-number">{currentEnergy}/5</span>
          </div>
        </motion.div>

        {/* Average Energy */}
        <motion.div
          className="insight-card card card-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="insight-icon" style={{ background: 'var(--syncscript-green-500)' }}>
            <svg className="neural-icon" viewBox="0 0 24 24">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="insight-content">
            <span className="insight-label">Average</span>
            <span className="insight-value">{average}/5</span>
            <span className="insight-meta">{energyLogs.length} logs</span>
          </div>
        </motion.div>

        {/* Peak Time */}
        <motion.div
          className="insight-card card card-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="insight-icon" style={{ background: 'var(--syncscript-orange-500)' }}>
            <svg className="neural-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="insight-content">
            <span className="insight-label">Peak Time</span>
            <span className="insight-value">{formatHour(peakHour)}</span>
            <span className="insight-meta">Best energy</span>
          </div>
        </motion.div>

        {/* Range */}
        <motion.div
          className="insight-card card card-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="insight-icon" style={{ background: 'var(--syncscript-blue-400)' }}>
            <svg className="neural-icon" viewBox="0 0 24 24">
              <path d="M3 12h18" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="insight-content">
            <span className="insight-label">Range</span>
            <span className="insight-value">{lowest} - {highest}</span>
            <span className="insight-meta">Energy spread</span>
          </div>
        </motion.div>
      </div>

      {/* Simple Visualization */}
      {last7Days.length > 0 && (
        <motion.div
          className="energy-timeline card card-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h3 className="timeline-title">Recent Energy Levels</h3>
          <div className="timeline-bars">
            {last7Days.slice(-7).map((log, index) => {
              const date = new Date(log.timestamp);
              const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
              
              return (
                <div key={index} className="timeline-bar-wrapper">
                  <div 
                    className="timeline-bar"
                    style={{
                      height: `${(log.level / 5) * 100}%`,
                      background: energyColors[log.level]
                    }}
                  >
                    <span className="timeline-value">{log.level}</span>
                  </div>
                  <span className="timeline-label">{dayLabel}</span>
                </div>
              );
            })}
          </div>
          <div className="timeline-legend">
            <span className="legend-item">
              <span className="legend-dot" style={{ background: energyColors[1] }}></span>
              Low
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: energyColors[3] }}></span>
              Medium
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: energyColors[5] }}></span>
              Peak
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EnergyInsights;

