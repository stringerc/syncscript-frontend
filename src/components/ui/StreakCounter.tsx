import React from 'react';
import { motion } from 'framer-motion';
import { getStreakMilestone } from '../../utils/streakUtils';

interface StreakCounterProps {
  loginStreak: number;
  completionStreak: number;
  longestLoginStreak: number;
  longestCompletionStreak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({
  loginStreak,
  completionStreak,
  longestLoginStreak,
  longestCompletionStreak
}) => {
  const loginMilestone = getStreakMilestone(loginStreak);
  const completionMilestone = getStreakMilestone(completionStreak);

  return (
    <div className="streak-counter">
      {/* Login Streak */}
      <motion.div 
        className="streak-badge login-streak"
        whileHover={{ scale: 1.05 }}
        title={`Longest: ${longestLoginStreak} days`}
      >
        <div className="streak-icon-wrapper">
          <motion.div
            className="streak-flame"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🔥
          </motion.div>
          {loginMilestone && (
            <span className="streak-milestone-badge" style={{ background: loginMilestone.color }}>
              {loginMilestone.emoji}
            </span>
          )}
        </div>
        <div className="streak-info">
          <div className="streak-number">{loginStreak}</div>
          <div className="streak-label">day streak</div>
        </div>
      </motion.div>

      {/* Completion Streak */}
      {completionStreak > 0 && (
        <motion.div 
          className="streak-badge completion-streak"
          whileHover={{ scale: 1.05 }}
          title={`Longest: ${longestCompletionStreak} days`}
        >
          <div className="streak-icon-wrapper">
            <motion.div
              className="streak-checkmark"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✅
            </motion.div>
            {completionMilestone && (
              <span className="streak-milestone-badge" style={{ background: completionMilestone.color }}>
                {completionMilestone.emoji}
              </span>
            )}
          </div>
          <div className="streak-info">
            <div className="streak-number">{completionStreak}</div>
            <div className="streak-label">tasks daily</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StreakCounter;

