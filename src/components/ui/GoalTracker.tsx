import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/GoalTracker.css';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  category: 'personal' | 'work' | 'health' | 'learning';
  linkedTaskIds: string[];
  progress: number;
  created_at: string;
}

interface GoalTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Array<{ id: string; title: string; completed: boolean }>;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ isOpen, onClose, tasks }) => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Launch SyncScript',
      description: 'Build and launch the best productivity app',
      targetDate: '2025-12-31',
      category: 'work',
      linkedTaskIds: [],
      progress: 75,
      created_at: new Date().toISOString()
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    category: 'personal' as Goal['category']
  });

  const handleAddGoal = () => {
    if (!newGoal.title.trim()) {
      toast.error('Please enter a goal title');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
      linkedTaskIds: [],
      progress: 0,
      created_at: new Date().toISOString()
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', description: '', targetDate: '', category: 'personal' });
    setShowAddGoal(false);
    toast.success(`🎯 Goal "${newGoal.title}" added!`);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      personal: '👤',
      work: '💼',
      health: '❤️',
      learning: '📚'
    };
    return icons[category] || '🎯';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      personal: '#8B5CF6',
      work: '#3B82F6',
      health: '#EF4444',
      learning: '#F59E0B'
    };
    return colors[category] || '#6B7280';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="goal-tracker-overlay" onClick={onClose}>
          <motion.div
            className="goal-tracker-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="goal-tracker-header">
              <div className="header-content">
                <span className="header-icon">🎯</span>
                <div>
                  <h2>Goals</h2>
                  <p>Set and track your big objectives</p>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="goal-tracker-content">
              {/* Goals List */}
              <div className="goals-list">
                {goals.map(goal => {
                  const linkedTasks = tasks.filter(t => goal.linkedTaskIds.includes(t.id));
                  const completedTasks = linkedTasks.filter(t => t.completed).length;
                  const calculatedProgress = linkedTasks.length > 0
                    ? (completedTasks / linkedTasks.length) * 100
                    : goal.progress;

                  const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

                  return (
                    <div key={goal.id} className="goal-card">
                      <div className="goal-header">
                        <div className="goal-info">
                          <span 
                            className="goal-category-icon"
                            style={{ background: getCategoryColor(goal.category) }}
                          >
                            {getCategoryIcon(goal.category)}
                          </span>
                          <div>
                            <h3 className="goal-title">{goal.title}</h3>
                            <p className="goal-description">{goal.description}</p>
                          </div>
                        </div>
                        <div className="goal-meta">
                          <span className="days-left">
                            {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                          </span>
                        </div>
                      </div>

                      <div className="goal-progress">
                        <div className="progress-header">
                          <span>Progress</span>
                          <span className="progress-percentage">{Math.round(calculatedProgress)}%</span>
                        </div>
                        <div className="progress-bar-container">
                          <div 
                            className="progress-bar-fill"
                            style={{ 
                              width: `${calculatedProgress}%`,
                              background: getCategoryColor(goal.category)
                            }}
                          />
                        </div>
                      </div>

                      <div className="goal-footer">
                        <span className="linked-tasks">
                          📋 {linkedTasks.length} tasks linked
                        </span>
                        <button 
                          className="link-task-btn"
                          onClick={() => toast.info('Link tasks feature coming soon!')}
                        >
                          + Link Task
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Goal Form */}
              {showAddGoal ? (
                <motion.div
                  className="add-goal-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="form-field">
                    <label>Goal Title</label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      placeholder="e.g., Run a marathon, Launch my app..."
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label>Description</label>
                    <textarea
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      placeholder="Why is this goal important?"
                      className="form-textarea"
                      rows={3}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Category</label>
                      <select
                        value={newGoal.category}
                        onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as Goal['category'] })}
                        className="form-select"
                      >
                        <option value="personal">👤 Personal</option>
                        <option value="work">💼 Work</option>
                        <option value="health">❤️ Health</option>
                        <option value="learning">📚 Learning</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Target Date</label>
                      <input
                        type="date"
                        value={newGoal.targetDate}
                        onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      className="btn btn-ghost"
                      onClick={() => setShowAddGoal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleAddGoal}
                    >
                      ✅ Add Goal
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button
                  className="add-goal-btn"
                  onClick={() => setShowAddGoal(true)}
                >
                  <span>🎯</span>
                  <span>Add New Goal</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GoalTracker;
