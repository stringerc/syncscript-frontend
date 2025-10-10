import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoachingData {
  greeting: string;
  todaysFocus: string;
  strengths: string[];
  improvements: string[];
  actionableSteps: string[];
  motivationalQuote: string;
  coachingScore: number;
}

interface AICoachProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: Record<string, unknown>;
  recentActivity: Array<Record<string, unknown>>;
  goals: Array<Record<string, unknown>>;
}

const AICoach: React.FC<AICoachProps> = ({ isOpen, onClose, userStats, recentActivity, goals }) => {
  const [coaching, setCoaching] = useState<CoachingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !coaching) {
      fetchCoaching();
    }
  }, [isOpen]);

  const fetchCoaching = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userStats, recentActivity, goals })
      });

      if (response.ok) {
        const data = await response.json();
        setCoaching(data.coaching);
      }
    } catch (error) {
      console.error('Coaching error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="ai-coach-overlay" onClick={onClose}>
          <motion.div
            className="ai-coach-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ai-coach-header">
              <div>
                <h2>🤖 Your AI Coach</h2>
                <p>Personalized productivity guidance</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="ai-coach-content">
              {isLoading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Your AI coach is analyzing your productivity...</p>
                </div>
              ) : coaching ? (
                <>
                  <div className="coaching-greeting">
                    <h3>{coaching.greeting}</h3>
                  </div>

                  <div className="todays-focus">
                    <h4>🎯 Today&apos;s Focus</h4>
                    <p>{coaching.todaysFocus}</p>
                  </div>

                  <div className="strengths-section">
                    <h4>💪 Your Strengths</h4>
                    <ul>
                      {coaching.strengths.map((strength, idx) => (
                        <li key={idx}>
                          <span className="check">✓</span> {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="improvements-section">
                    <h4>📈 Areas to Improve</h4>
                    <ul>
                      {coaching.improvements.map((improvement, idx) => (
                        <li key={idx}>
                          <span className="arrow">→</span> {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="action-steps">
                    <h4>🚀 Action Steps</h4>
                    <ol>
                      {coaching.actionableSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="motivational-quote">
                    <blockquote>&ldquo;{coaching.motivationalQuote}&rdquo;</blockquote>
                  </div>

                  <div className="coaching-score">
                    <div className="score-label">Productivity Score</div>
                    <div className="score-value">{coaching.coachingScore}/100</div>
                    <div className="score-bar">
                      <div
                        className="score-fill"
                        style={{ width: `${coaching.coachingScore}%` }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <p>No coaching data available</p>
                </div>
              )}
            </div>

            <div className="ai-coach-footer">
              <button className="btn btn-ghost" onClick={fetchCoaching}>
                🔄 Refresh Coaching
              </button>
              <button className="btn btn-primary" onClick={onClose}>
                Got It!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AICoach;
