import React from 'react';
import { motion } from 'framer-motion';

interface UserStatsProps {
  points: number;
  level: number;
  tasksCompleted: number;
}

export const UserStats: React.FC<UserStatsProps> = ({
  points,
  level,
  tasksCompleted
}) => {
  // Calculate level progress (assuming 1000 points per level)
  const pointsPerLevel = 1000;
  const currentLevelPoints = points % pointsPerLevel;
  const progressPercent = (currentLevelPoints / pointsPerLevel) * 100;
  const pointsToNextLevel = pointsPerLevel - currentLevelPoints;

  return (
    <div className="user-stats">
      {/* Points Display */}
      <motion.div 
        className="stat-badge stat-points"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <svg className="stat-icon" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <div className="stat-content">
          <span className="stat-value">{points.toLocaleString()}</span>
          <span className="stat-label">Points</span>
        </div>
      </motion.div>

      {/* Level Display with Progress */}
      <motion.div 
        className="stat-badge stat-level"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="level-badge">
          <svg className="stat-icon" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                  stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="level-number">{level}</span>
        </div>
        <div className="stat-content">
          <span className="stat-value">Level {level}</span>
          <div className="progress-bar-wrapper">
            <div 
              className="progress-bar" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="stat-meta">{pointsToNextLevel} to Level {level + 1}</span>
        </div>
      </motion.div>

      {/* Tasks Completed */}
      <motion.div 
        className="stat-badge stat-tasks"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        <svg className="stat-icon" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <div className="stat-content">
          <span className="stat-value">{tasksCompleted}</span>
          <span className="stat-label">Completed</span>
        </div>
      </motion.div>

    </div>
  );
};

export default UserStats;

