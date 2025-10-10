import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface WeeklyReviewProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Array<{ id: string; title: string; completed: boolean; created_at: string; completed_at?: string }>;
  energyLogs: Array<{ energy_level: number; created_at: string }>;
}

const WeeklyReview: React.FC<WeeklyReviewProps> = ({ isOpen, onClose, tasks, energyLogs }) => {
  const [nextWeekPlan, setNextWeekPlan] = useState('');

  // Get this week's data
  const getThisWeekData = () => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    weekStart.setHours(0, 0, 0, 0);

    const thisWeekTasks = tasks.filter(t => new Date(t.created_at) >= weekStart);
    const completedTasks = thisWeekTasks.filter(t => t.completed);
    const thisWeekEnergy = energyLogs.filter(log => new Date(log.created_at) >= weekStart);

    const avgEnergy = thisWeekEnergy.length > 0
      ? Math.round(thisWeekEnergy.reduce((sum, log) => sum + log.energy_level, 0) / thisWeekEnergy.length)
      : 0;

    const completionRate = thisWeekTasks.length > 0
      ? Math.round((completedTasks.length / thisWeekTasks.length) * 100)
      : 0;

    return {
      totalTasks: thisWeekTasks.length,
      completedTasks: completedTasks.length,
      completionRate,
      avgEnergy,
      wins: completedTasks.slice(0, 10)
    };
  };

  const data = getThisWeekData();

  const handleSavePlan = () => {
    localStorage.setItem('nextWeekPlan', nextWeekPlan);
    localStorage.setItem('lastWeeklyReview', new Date().toISOString());
    toast.success('📅 Plan saved for next week!');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="weekly-review-overlay" onClick={onClose}>
          <motion.div
            className="weekly-review-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="weekly-review-header">
              <h2>📅 Weekly Review</h2>
              <p>Reflect on your week and plan ahead</p>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="weekly-review-content">
              {/* Stats */}
              <div className="review-stats">
                <div className="stat-card">
                  <div className="stat-value">{data.completedTasks}</div>
                  <div className="stat-label">Tasks Completed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{data.completionRate}%</div>
                  <div className="stat-label">Completion Rate</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{data.avgEnergy}</div>
                  <div className="stat-label">Avg Energy</div>
                </div>
              </div>

              {/* Wins */}
              <div className="wins-section">
                <h3>✅ This Week&apos;s Wins</h3>
                <div className="wins-list">
                  {data.wins.length > 0 ? (
                    data.wins.map(task => (
                      <div key={task.id} className="win-item">
                        <span className="win-check">✓</span>
                        <span className="win-title">{task.title}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-wins">No completed tasks this week. Keep going! 💪</p>
                  )}
                </div>
              </div>

              {/* Next Week Planning */}
              <div className="planning-section">
                <h3>🎯 Plan for Next Week</h3>
                <textarea
                  value={nextWeekPlan}
                  onChange={(e) => setNextWeekPlan(e.target.value)}
                  placeholder="What are your top 3 priorities for next week?&#10;&#10;1. &#10;2. &#10;3. "
                  rows={6}
                  className="planning-textarea"
                />
              </div>

              {/* Insights */}
              <div className="insights-section">
                <h4>💡 Insights</h4>
                <div className="insight-item">
                  {data.completionRate >= 80 ? (
                    <p>🎉 Excellent completion rate! You&apos;re crushing it!</p>
                  ) : data.completionRate >= 50 ? (
                    <p>👍 Good progress! Try to complete a few more tasks next week.</p>
                  ) : (
                    <p>💪 Focus on completing tasks. Start with small wins!</p>
                  )}
                </div>
                <div className="insight-item">
                  {data.avgEnergy >= 70 ? (
                    <p>⚡ High energy levels! Keep up the great work!</p>
                  ) : data.avgEnergy >= 50 ? (
                    <p>😊 Moderate energy. Consider more breaks and self-care.</p>
                  ) : (
                    <p>😴 Low energy detected. Prioritize rest and recovery.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="weekly-review-footer">
              <button className="btn btn-ghost" onClick={onClose}>
                Skip
              </button>
              <button className="btn btn-primary" onClick={handleSavePlan}>
                💾 Save & Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WeeklyReview;
