import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  energy_level: number;
  due_date?: string;
  project_name?: string;
  project_color?: string;
}

interface Suggestion {
  task: Task;
  reason: string;
  confidence: number;
  energyMatch: number;
}

interface Insights {
  currentEnergy: number;
  expectedEnergy: number;
  trend: 'above' | 'below' | 'normal';
  peakHours: Array<{ hour: number; energy: number }>;
}

interface SmartSuggestionsProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptSuggestion: (taskId: string) => void;
  authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ isOpen, onClose, onAcceptSuggestion, authenticatedFetch }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
    }
  }, [isOpen]);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authenticatedFetch('/api/suggestions');

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      setSuggestions(data.data.suggestions || []);
      setInsights(data.data.insights || null);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError(err instanceof Error ? err.message : 'Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (taskId: string) => {
    try {
      onAcceptSuggestion(taskId);
      // Remove suggestion from list
      setSuggestions(prev => prev.filter(s => s.task.id !== taskId));
    } catch (err) {
      console.error('Error accepting suggestion:', err);
    }
  };

  const getEnergyColor = (level: number) => {
    if (level >= 70) return '#7ED321';
    if (level >= 40) return '#F5A623';
    return '#D0021B';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'above') return '⬆️';
    if (trend === 'below') return '⬇️';
    return '➡️';
  };

  const formatHour = (hour: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}${ampm}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="suggestions-overlay">
          <motion.div
            className="suggestions-overlay-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="suggestions-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="suggestions-header">
              <div className="suggestions-title">
                <span className="suggestions-icon">🤖</span>
                <h2>Smart Suggestions</h2>
              </div>
              <button className="suggestions-close" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="suggestions-content">
              {loading && (
                <div className="suggestions-loading">
                  <div className="loading-spinner"></div>
                  <p>Analyzing your energy patterns...</p>
                </div>
              )}

              {error && (
                <div className="suggestions-error">
                  <span>⚠️</span>
                  <p>{error}</p>
                  <button className="btn btn-primary" onClick={fetchSuggestions}>
                    Try Again
                  </button>
                </div>
              )}

              {!loading && !error && insights && (
                <>
                  {/* Energy Insights */}
                  <div className="energy-insights">
                    <h3>Your Energy Right Now</h3>
                    <div className="insights-grid">
                      <div className="insight-card">
                        <div className="insight-icon" style={{ color: getEnergyColor(insights.currentEnergy) }}>
                          ⚡
                        </div>
                        <div className="insight-content">
                          <div className="insight-value">{insights.currentEnergy}</div>
                          <div className="insight-label">Current Energy</div>
                        </div>
                      </div>
                      
                      <div className="insight-card">
                        <div className="insight-icon">
                          {getTrendIcon(insights.trend)}
                        </div>
                        <div className="insight-content">
                          <div className="insight-value">{insights.expectedEnergy}</div>
                          <div className="insight-label">Expected</div>
                        </div>
                      </div>
                    </div>

                    {insights.peakHours.length > 0 && (
                      <div className="peak-hours">
                        <span className="peak-hours-label">Your peak hours:</span>
                        {insights.peakHours.map((peak, idx) => (
                          <span key={idx} className="peak-hour-badge">
                            {formatHour(peak.hour)} ({peak.energy})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Suggestions List */}
                  <div className="suggestions-list">
                    <h3>
                      {suggestions.length > 0 ? 'Recommended Tasks' : 'No Suggestions'}
                    </h3>
                    
                    {suggestions.length === 0 && (
                      <div className="no-suggestions">
                        <span className="no-suggestions-icon">🎯</span>
                        <p>All set! No task suggestions at the moment.</p>
                        <p className="no-suggestions-hint">
                          Complete more tasks to help us learn your patterns better.
                        </p>
                      </div>
                    )}

                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={suggestion.task.id}
                        className="suggestion-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="suggestion-header">
                          <div className="suggestion-info">
                            {suggestion.task.project_name && (
                              <span 
                                className="suggestion-project"
                                style={{ 
                                  background: suggestion.task.project_color || '#ccc',
                                  color: 'white'
                                }}
                              >
                                {suggestion.task.project_name}
                              </span>
                            )}
                            <div className="suggestion-confidence">
                              {suggestion.confidence}% match
                            </div>
                          </div>
                        </div>

                        <h4 className="suggestion-task-title">{suggestion.task.title}</h4>
                        {suggestion.task.description && (
                          <p className="suggestion-task-description">
                            {suggestion.task.description}
                          </p>
                        )}

                        <div className="suggestion-reason">
                          <span className="reason-icon">💡</span>
                          <span>{suggestion.reason}</span>
                        </div>

                        <div className="suggestion-meta">
                          <span className="energy-badge" style={{ background: getEnergyColor(suggestion.task.energy_level) }}>
                            {suggestion.task.energy_level} Energy
                          </span>
                          {suggestion.task.priority && (
                            <span className={`priority-badge priority-${suggestion.task.priority}`}>
                              {suggestion.task.priority}
                            </span>
                          )}
                          {suggestion.task.due_date && (
                            <span className="due-badge">
                              Due: {new Date(suggestion.task.due_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        <button 
                          className="btn btn-primary suggestion-accept-btn"
                          onClick={() => handleAccept(suggestion.task.id)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"/>
                          </svg>
                          Start This Task
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SmartSuggestions;

