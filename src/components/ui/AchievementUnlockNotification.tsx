import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Achievement, TIER_GRADIENTS } from '../../utils/achievementSystem';

interface AchievementUnlockNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const AchievementUnlockNotification: React.FC<AchievementUnlockNotificationProps> = ({
  achievement,
  onClose
}) => {
  useEffect(() => {
    if (achievement) {
      // Trigger confetti animation
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 20000 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Fire confetti from multiple positions
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      // Auto close after 5 seconds
      const timeout = setTimeout(() => {
        onClose();
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="achievement-unlock-notification"
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 100 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 25 
          }}
          style={{
            background: TIER_GRADIENTS[achievement.tier]
          }}
        >
          <button 
            className="notification-close"
            onClick={onClose}
            aria-label="Close notification"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="notification-content">
            <motion.div
              className="notification-badge"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ 
                delay: 0.2,
                type: 'spring',
                stiffness: 200,
                damping: 10
              }}
            >
              🏆
            </motion.div>

            <motion.div
              className="notification-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="notification-title">Achievement Unlocked!</h3>
              <div className="notification-achievement">
                <span className="achievement-icon-notif">{achievement.icon}</span>
                <span className="achievement-name-notif">{achievement.name}</span>
              </div>
              <p className="notification-description">{achievement.description}</p>
              <div className="notification-reward">
                <span className="reward-badge">+{achievement.reward.points} points</span>
                {achievement.reward.title && (
                  <span className="title-badge">🏅 {achievement.reward.title}</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sparkle effects */}
          <div className="sparkles">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="sparkle"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos((i / 12) * 2 * Math.PI) * 100,
                  y: Math.sin((i / 12) * 2 * Math.PI) * 100
                }}
                transition={{
                  delay: 0.4 + (i * 0.05),
                  duration: 1.5,
                  ease: "easeOut"
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementUnlockNotification;

