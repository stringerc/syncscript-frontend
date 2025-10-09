import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  getTodaysChallenges,
  shouldResetChallenges,
  resetDailyChallenges,
  calculateChallengeProgress,
  DailyChallenge,
  ChallengeProgress
} from '../../utils/dailyChallenges';

interface DailyChallengesProps {
  tasks: Array<{ completed: boolean; completed_at?: string }>;
  energyLogs: Array<{ level: number; timestamp: string }>;
  focusSessions: number;
  currentStreak: number;
  onChallengeComplete?: (challenge: DailyChallenge, points: number) => void;
}

const DailyChallenges: React.FC<DailyChallengesProps> = ({
  tasks,
  energyLogs,
  focusSessions,
  currentStreak,
  onChallengeComplete
}) => {
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [progress, setProgress] = useState<ChallengeProgress[]>([]);
  const [expandedChallengeId, setExpandedChallengeId] = useState<string | null>(null);

  // Initialize challenges
  useEffect(() => {
    // Check if we need to reset for new day
    if (shouldResetChallenges()) {
      resetDailyChallenges();
      // Also reset today's focus sessions
      localStorage.removeItem('todayFocusSessions');
      localStorage.removeItem('focusSessionsDate');
    }

    const todaysChallenges = getTodaysChallenges();
    setChallenges(todaysChallenges);
  }, []);

  // Calculate progress
  useEffect(() => {
    const progressData = challenges.map(challenge =>
      calculateChallengeProgress(challenge, tasks, energyLogs, focusSessions, currentStreak)
    );

    setProgress(progressData);

    // Check for newly completed challenges
    progressData.forEach((p, index) => {
      const prevProgress = progress[index];
      if (p.isCompleted && (!prevProgress || !prevProgress.isCompleted)) {
        // Newly completed!
        if (onChallengeComplete) {
          onChallengeComplete(challenges[index], challenges[index].reward.points);
        }
      }
    });
  }, [tasks, energyLogs, focusSessions, currentStreak, challenges]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🌱';
      case 'medium': return '⚡';
      case 'hard': return '🔥';
      default: return '⭐';
    }
  };

  if (challenges.length === 0) return null;

  const completedCount = progress.filter(p => p.isCompleted).length;
  const totalPoints = progress
    .filter(p => p.isCompleted)
    .reduce((sum, p) => {
      const challenge = challenges.find(c => c.id === p.challengeId);
      return sum + (challenge?.reward.points || 0);
    }, 0);

  return (
    <motion.div
      className="daily-challenges-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="challenges-header">
        <div className="header-left">
          <h3 className="challenges-title">
            <span className="title-icon">🎯</span>
            Today&apos;s Challenges
          </h3>
          <p className="challenges-subtitle">
            {completedCount}/{challenges.length} completed · {totalPoints} bonus points earned
          </p>
        </div>
        <div className="header-right">
          <div className="time-remaining">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
            <span>Resets at midnight</span>
          </div>
        </div>
      </div>

      <div className="challenges-grid">
        {challenges.map((challenge, index) => {
          const challengeProgress = progress.find(p => p.challengeId === challenge.id);
          const isExpanded = expandedChallengeId === challenge.id;
          const isCompleted = challengeProgress?.isCompleted || false;
          const percentage = challengeProgress?.percentage || 0;

          return (
            <motion.div
              key={challenge.id}
              className={`challenge-card ${isCompleted ? 'completed' : ''} difficulty-${challenge.difficulty}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setExpandedChallengeId(isExpanded ? null : challenge.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="challenge-difficulty-badge" style={{ background: getDifficultyColor(challenge.difficulty) }}>
                {getDifficultyIcon(challenge.difficulty)} {challenge.difficulty}
              </div>

              <div className="challenge-content">
                <div className="challenge-icon-wrapper">
                  <div className={`challenge-icon ${isCompleted ? 'completed-icon' : ''}`}>
                    {isCompleted ? '✅' : challenge.icon}
                  </div>
                  {!isCompleted && percentage > 0 && (
                    <svg className="progress-ring-svg" viewBox="0 0 40 40">
                      <circle
                        className="progress-ring-bg"
                        cx="20"
                        cy="20"
                        r="18"
                      />
                      <circle
                        className="progress-ring-circle"
                        cx="20"
                        cy="20"
                        r="18"
                        style={{
                          strokeDasharray: `${percentage * 1.13} 113`,
                          stroke: getDifficultyColor(challenge.difficulty)
                        }}
                      />
                    </svg>
                  )}
                </div>

                <div className="challenge-details">
                  <h4 className="challenge-title">{challenge.title}</h4>
                  <p className="challenge-description">{challenge.description}</p>
                  
                  {!isCompleted && challengeProgress && (
                    <div className="challenge-progress">
                      <span className="progress-text">
                        {challengeProgress.currentValue} / {challengeProgress.goal}
                      </span>
                      <div className="progress-bar-mini">
                        <div 
                          className="progress-fill-mini"
                          style={{ 
                            width: `${percentage}%`,
                            background: getDifficultyColor(challenge.difficulty)
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="challenge-reward">
                    <span className="reward-points">
                      💎 {challenge.reward.points} pts
                    </span>
                    {challenge.reward.bonus && (
                      <span className="reward-bonus">
                        ✨ {challenge.reward.bonus}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {isCompleted && (
                <motion.div
                  className="completion-checkmark"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {completedCount === challenges.length && (
        <motion.div
          className="all-challenges-complete"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="completion-icon">🎉</div>
          <h4>All Challenges Complete!</h4>
          <p>Amazing work! You&apos;ve earned {totalPoints} bonus points today!</p>
          <div className="completion-reward">
            <span className="bonus-badge">🏆 Challenge Master</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DailyChallenges;

