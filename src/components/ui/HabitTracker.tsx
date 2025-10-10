import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/HabitTracker.css';

interface Habit {
  id: string;
  name: string;
  icon: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetDays?: number[];
  streak: number;
  longestStreak: number;
  completedDates: string[];
  color: string;
}

interface HabitTrackerProps {
  isOpen: boolean;
  onClose: () => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ isOpen, onClose }) => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Exercise',
      icon: '🏃',
      frequency: 'daily',
      streak: 5,
      longestStreak: 12,
      completedDates: [],
      color: '#10B981'
    },
    {
      id: '2',
      name: 'Read 30 Minutes',
      icon: '📚',
      frequency: 'daily',
      streak: 3,
      longestStreak: 8,
      completedDates: [],
      color: '#3B82F6'
    },
    {
      id: '3',
      name: 'Meditation',
      icon: '🧘',
      frequency: 'daily',
      streak: 7,
      longestStreak: 15,
      completedDates: [],
      color: '#8B5CF6'
    }
  ]);

  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('✅');
  const [newHabitFrequency, setNewHabitFrequency] = useState<'daily' | 'weekly'>('daily');

  const today = new Date().toISOString().split('T')[0];

  // Get last 7 days for calendar view
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const handleToggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id !== habitId) return habit;

      const isCompletedToday = habit.completedDates.includes(today);
      
      if (isCompletedToday) {
        // Uncomplete
        return {
          ...habit,
          completedDates: habit.completedDates.filter(d => d !== today),
          streak: Math.max(0, habit.streak - 1)
        };
      } else {
        // Complete
        const newStreak = habit.streak + 1;
        toast.success(`🎉 ${habit.name} completed! Streak: ${newStreak} days`);
        
        return {
          ...habit,
          completedDates: [...habit.completedDates, today],
          streak: newStreak,
          longestStreak: Math.max(habit.longestStreak, newStreak)
        };
      }
    }));
  };

  const handleAddHabit = () => {
    if (!newHabitName.trim()) {
      toast.error('Please enter a habit name');
      return;
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      icon: newHabitIcon,
      frequency: newHabitFrequency,
      streak: 0,
      longestStreak: 0,
      completedDates: [],
      color: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)]
    };

    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setNewHabitIcon('✅');
    setShowAddHabit(false);
    toast.success(`✅ Habit "${newHabitName}" added!`);
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits(habits.filter(h => h.id !== habitId));
    toast.success('Habit removed');
  };

  const commonIcons = ['🏃', '📚', '🧘', '💪', '🍎', '💤', '💧', '🎯', '✍️', '🎨'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="habit-tracker-overlay" onClick={onClose}>
          <motion.div
            className="habit-tracker-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="habit-tracker-header">
              <div className="header-content">
                <span className="header-icon">🎯</span>
                <div>
                  <h2>Habit Tracker</h2>
                  <p>Build consistency, one day at a time</p>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            {/* Content */}
            <div className="habit-tracker-content">
              {/* Habits List */}
              <div className="habits-list">
                {habits.map(habit => {
                  const isCompletedToday = habit.completedDates.includes(today);
                  const completionRate = habit.completedDates.length > 0
                    ? ((habit.completedDates.length / 30) * 100).toFixed(0)
                    : 0;

                  return (
                    <div key={habit.id} className="habit-card">
                      <div className="habit-header">
                        <div className="habit-info">
                          <span className="habit-icon">{habit.icon}</span>
                          <div>
                            <div className="habit-name">{habit.name}</div>
                            <div className="habit-stats">
                              <span className="stat">🔥 {habit.streak} day streak</span>
                              <span className="stat">⭐ Best: {habit.longestStreak} days</span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="delete-habit-btn"
                          onClick={() => handleDeleteHabit(habit.id)}
                          title="Delete habit"
                        >
                          🗑️
                        </button>
                      </div>

                      {/* Calendar View */}
                      <div className="habit-calendar">
                        {last7Days.map(date => {
                          const isCompleted = habit.completedDates.includes(date);
                          const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
                          const isToday = date === today;

                          return (
                            <div
                              key={date}
                              className={`calendar-day ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}`}
                              style={{ borderColor: habit.color }}
                            >
                              <div className="day-name">{dayName}</div>
                              <div className="day-indicator">
                                {isCompleted && '✓'}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Actions */}
                      <div className="habit-actions">
                        <button
                          className={`complete-btn ${isCompletedToday ? 'completed' : ''}`}
                          style={{
                            background: isCompletedToday ? habit.color : 'transparent',
                            borderColor: habit.color,
                            color: isCompletedToday ? 'white' : habit.color
                          }}
                          onClick={() => handleToggleHabit(habit.id)}
                        >
                          {isCompletedToday ? '✓ Completed Today' : 'Mark Complete'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Habit */}
              {showAddHabit ? (
                <motion.div
                  className="add-habit-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="form-field">
                    <label>Habit Name</label>
                    <input
                      type="text"
                      value={newHabitName}
                      onChange={(e) => setNewHabitName(e.target.value)}
                      placeholder="e.g., Morning jog, Read before bed..."
                      className="form-input"
                      autoFocus
                    />
                  </div>

                  <div className="form-field">
                    <label>Icon</label>
                    <div className="icon-picker">
                      {commonIcons.map(icon => (
                        <button
                          key={icon}
                          className={`icon-btn ${newHabitIcon === icon ? 'selected' : ''}`}
                          onClick={() => setNewHabitIcon(icon)}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Frequency</label>
                    <select
                      value={newHabitFrequency}
                      onChange={(e) => setNewHabitFrequency(e.target.value as 'daily' | 'weekly')}
                      className="form-select"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button
                      className="btn btn-ghost"
                      onClick={() => setShowAddHabit(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleAddHabit}
                    >
                      ✅ Add Habit
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button
                  className="add-habit-btn"
                  onClick={() => setShowAddHabit(true)}
                >
                  <span>➕</span>
                  <span>Add New Habit</span>
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="habit-tracker-footer">
              <div className="footer-stats">
                <div className="footer-stat">
                  <span className="stat-value">{habits.length}</span>
                  <span className="stat-label">Active Habits</span>
                </div>
                <div className="footer-stat">
                  <span className="stat-value">
                    {Math.max(...habits.map(h => h.streak), 0)}
                  </span>
                  <span className="stat-label">Longest Streak</span>
                </div>
                <div className="footer-stat">
                  <span className="stat-value">
                    {habits.filter(h => h.completedDates.includes(today)).length}
                  </span>
                  <span className="stat-label">Completed Today</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HabitTracker;
