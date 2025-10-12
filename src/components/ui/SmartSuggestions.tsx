import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplanationModal from './ExplanationModal';
import { generateExplanation, TaskExplanation } from '../../utils/aiExplainability';
import { analytics } from '../../lib/analytics';
import { 
  calculateRecommendationBudgetFit, 
  hasBudgetPreferences,
  trackBudgetFitInteraction,
  BudgetFitResult
} from '../../utils/budgetFitScoring';
import { 
  calculateSavingsImpact,
  getActiveGoal
} from '../../utils/savingsGoals';

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
  estimatedCost?: number; // WP-FIN-02: Budget awareness
  categoryId?: string; // WP-FIN-02: Budget category
  budgetFit?: BudgetFitResult; // WP-FIN-02: Budget fit score
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
  
  // WP-PERS-01: Explainability state
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState<TaskExplanation | null>(null);
  const [explainingSuggestion, setExplainingSuggestion] = useState<Suggestion | null>(null);
  
  // WP-FIN-02: Budget preferences
  const [budgetEnabled, setBudgetEnabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
      // WP-FIN-02: Check if user has budget preferences
      setBudgetEnabled(hasBudgetPreferences());
    }
  }, [isOpen]);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch from backend API
      const response = await authenticatedFetch('/api/suggestions');

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      let fetchedSuggestions = data.data.suggestions || [];
      
      // WP-FIN-02: Add budget fit if available
      if (hasBudgetPreferences()) {
        fetchedSuggestions = fetchedSuggestions.map((s: Suggestion) => {
          if (s.estimatedCost && s.categoryId) {
            const budgetFit = calculateRecommendationBudgetFit(s.estimatedCost, s.categoryId);
            return { ...s, budgetFit };
          }
          return s;
        });
      }
      
      setSuggestions(fetchedSuggestions);
      setInsights(data.data.insights || null);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      
      // Fallback: Show mock suggestions if backend is unavailable
      console.log('Using fallback suggestions due to backend error');
      setSuggestions([]);
      setInsights({
        currentEnergy: 75,
        expectedEnergy: 70,
        trend: 'above',
        peakHours: [
          { hour: 9, energy: 85 },
          { hour: 14, energy: 90 },
          { hour: 16, energy: 88 }
        ]
      });
      setError(null); // Clear error for fallback mode
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (taskId: string) => {
    try {
      // Find the suggestion being accepted
      const suggestion = suggestions.find(s => s.task.id === taskId);
      
      // Track AI suggestion acceptance
      if (typeof window !== 'undefined' && suggestion) {
        const userId = localStorage.getItem('userId') || 'anonymous';
        analytics.aiSuggestionAccepted(userId, taskId, {
          confidence: suggestion.confidence,
          energyMatch: suggestion.energyMatch,
          viewedExplanation: showExplanation,
          hasBudgetFit: suggestion.budgetFit !== undefined
        });
      }
      
      onAcceptSuggestion(taskId);
      // Remove suggestion from list
      setSuggestions(prev => prev.filter(s => s.task.id !== taskId));
      
      // Close explanation modal if open
      setShowExplanation(false);
      setCurrentExplanation(null);
      setExplainingSuggestion(null);
    } catch (err) {
      console.error('Error accepting suggestion:', err);
    }
  };
  
  // WP-PERS-01: Show explanation
  const handleShowExplanation = (suggestion: Suggestion) => {
    // Convert suggestion task to proper Task type
    const task = {
      id: suggestion.task.id,
      title: suggestion.task.title,
      description: suggestion.task.description,
      priority: (suggestion.task.priority === 'high' ? 4 :
                suggestion.task.priority === 'medium' ? 3 : 2) as (1 | 2 | 3 | 4 | 5),
      energy_requirement: suggestion.task.energy_level as (1 | 2 | 3 | 4 | 5),
      due_date: suggestion.task.due_date,
      estimated_duration: 45, // Default estimate
      project_id: suggestion.task.project_name ? 'project-1' : undefined
    };
    
    // Generate explanation
    const explanation = generateExplanation(task, {
      currentEnergy: insights?.currentEnergy || 70,
      currentTime: new Date(),
      availableTime: 120, // Assume 2 hours available
      habits: {
        'review': { bestTime: 'Tuesday afternoons', frequency: 3 },
        'email': { bestTime: 'morning', frequency: 5 },
        'meeting': { bestTime: 'afternoon', frequency: 2 }
      }
    });
    
    setCurrentExplanation(explanation);
    setExplainingSuggestion(suggestion);
    setShowExplanation(true);
    
    // Track analytics
    console.log('💡 AI Explanation Shown:', {
      taskId: suggestion.task.id,
      confidence: explanation.confidence,
      reasons_count: explanation.reasons.length,
      timestamp: new Date().toISOString()
    });
  };
  
  // WP-PERS-01: Handle dismiss (not interested)
  const handleDismissExplanation = () => {
    console.log('❌ Suggestion dismissed after viewing explanation:', {
      taskId: currentExplanation?.taskId,
      viewed_reasons: true
    });
    
    setShowExplanation(false);
    setCurrentExplanation(null);
    setExplainingSuggestion(null);
  };
  
  // WP-PERS-01: Handle accept from explanation modal
  const handleAcceptFromExplanation = () => {
    if (explainingSuggestion) {
      console.log('✅ Suggestion accepted after viewing explanation:', {
        taskId: explainingSuggestion.task.id,
        viewed_reasons: true,
        confidence: currentExplanation?.confidence
      });
      
      handleAccept(explainingSuggestion.task.id);
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

                        {/* WP-FIN-02: Budget Fit Badge */}
                        {suggestion.budgetFit && budgetEnabled && (
                          <div style={{
                            marginTop: '12px',
                            padding: '12px',
                            background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
                            borderRadius: '8px',
                            border: `2px solid ${suggestion.budgetFit.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <span style={{ fontSize: '24px' }}>{suggestion.budgetFit.icon}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ 
                                fontSize: '14px', 
                                fontWeight: '700', 
                                color: suggestion.budgetFit.color,
                                marginBottom: '4px'
                              }}>
                                {suggestion.budgetFit.stars} {suggestion.budgetFit.rating.toUpperCase()} FIT
                              </div>
                              <div style={{ fontSize: '13px', color: '#6B7280' }}>
                                ${suggestion.estimatedCost} · {suggestion.budgetFit.categoryName}
                              </div>
                              <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                                {suggestion.budgetFit.message}
                              </div>
                              
                              {/* WP-FIN-03: Savings Impact (for over-budget items) */}
                              {!suggestion.budgetFit.withinBudget && (() => {
                                const activeGoal = getActiveGoal();
                                if (!activeGoal) return null;
                                const impact = calculateSavingsImpact(suggestion.estimatedCost || 0);
                                if (!impact) return null;
                                return (
                                  <div style={{
                                    marginTop: '8px',
                                    padding: '8px 12px',
                                    background: 'linear-gradient(135deg, #EC489920 0%, #8B5CF620 100%)',
                                    borderRadius: '6px',
                                    border: '1px solid #EC489940'
                                  }}>
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#EC4899', marginBottom: '2px' }}>
                                      💡 Skip this for your goal:
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#6B7280' }}>
                                      {impact.message}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#8B5CF6', marginTop: '2px', fontStyle: 'italic' }}>
                                      {impact.motivationalText}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                          <button 
                            className="btn btn-ghost"
                            onClick={() => handleShowExplanation(suggestion)}
                            style={{
                              flex: '0 0 auto',
                              padding: '10px 16px',
                              fontSize: '14px',
                              background: '#F3F4F6',
                              color: '#4B5563',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontWeight: '600',
                              transition: 'all 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span style={{ fontSize: '16px' }}>💡</span>
                            Why this?
                          </button>
                          
                          <button 
                            className="btn btn-primary suggestion-accept-btn"
                            onClick={() => handleAccept(suggestion.task.id)}
                            style={{ flex: 1 }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20,6 9,17 4,12"/>
                            </svg>
                            Start This Task
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
      
      {/* WP-PERS-01: Explanation Modal */}
      <ExplanationModal
        explanation={currentExplanation}
        isOpen={showExplanation}
        onClose={() => setShowExplanation(false)}
        onAccept={handleAcceptFromExplanation}
        onDismiss={handleDismissExplanation}
      />
    </AnimatePresence>
  );
};

export default SmartSuggestions;

