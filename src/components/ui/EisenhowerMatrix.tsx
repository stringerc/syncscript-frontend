import React from 'react';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  priority: number;
  due_date?: string;
  completed: boolean;
  energy_requirement: number;
}

interface EisenhowerMatrixProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

const EisenhowerMatrix: React.FC<EisenhowerMatrixProps> = ({ isOpen, onClose, tasks, onUpdateTask }) => {
  if (!isOpen) return null;

  // Determine if task is urgent (due within 2 days)
  const isUrgent = (task: Task): boolean => {
    if (!task.due_date) return false;
    const dueDate = new Date(task.due_date);
    const now = new Date();
    const diffDays = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 2 && diffDays >= 0;
  };

  // Determine if task is important (priority >= 4)
  const isImportant = (task: Task): boolean => task.priority >= 4;

  // Filter into quadrants
  const urgentImportant = tasks.filter(t => !t.completed && isUrgent(t) && isImportant(t));
  const notUrgentImportant = tasks.filter(t => !t.completed && !isUrgent(t) && isImportant(t));
  const urgentNotImportant = tasks.filter(t => !t.completed && isUrgent(t) && !isImportant(t));
  const notUrgentNotImportant = tasks.filter(t => !t.completed && !isUrgent(t) && !isImportant(t));

  const renderTaskCard = (task: Task) => (
    <div key={task.id} className="eisenhower-task-card">
      <div className="task-title">{task.title}</div>
      <div className="task-meta">
        <span className="priority-badge">P{task.priority}</span>
        <span className="energy-badge">⚡{task.energy_requirement}</span>
      </div>
    </div>
  );

  return (
    <div className="eisenhower-overlay" onClick={onClose}>
      <motion.div
        className="eisenhower-modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="eisenhower-header">
          <h2>📊 Eisenhower Matrix</h2>
          <p>Prioritize by Urgency & Importance</p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="eisenhower-grid">
          {/* Quadrant 1: Urgent & Important */}
          <div className="quadrant q1-urgent-important">
            <div className="quadrant-header">
              <h3>🔴 DO FIRST</h3>
              <p>Urgent & Important</p>
              <span className="count">{urgentImportant.length}</span>
            </div>
            <div className="quadrant-tasks">
              {urgentImportant.map(renderTaskCard)}
              {urgentImportant.length === 0 && (
                <div className="empty-state">No urgent important tasks! 🎉</div>
              )}
            </div>
          </div>

          {/* Quadrant 2: Not Urgent but Important */}
          <div className="quadrant q2-not-urgent-important">
            <div className="quadrant-header">
              <h3>🟡 SCHEDULE</h3>
              <p>Not Urgent but Important</p>
              <span className="count">{notUrgentImportant.length}</span>
            </div>
            <div className="quadrant-tasks">
              {notUrgentImportant.map(renderTaskCard)}
              {notUrgentImportant.length === 0 && (
                <div className="empty-state">No tasks to schedule</div>
              )}
            </div>
          </div>

          {/* Quadrant 3: Urgent but Not Important */}
          <div className="quadrant q3-urgent-not-important">
            <div className="quadrant-header">
              <h3>🟠 DELEGATE</h3>
              <p>Urgent but Not Important</p>
              <span className="count">{urgentNotImportant.length}</span>
            </div>
            <div className="quadrant-tasks">
              {urgentNotImportant.map(renderTaskCard)}
              {urgentNotImportant.length === 0 && (
                <div className="empty-state">Nothing to delegate</div>
              )}
            </div>
          </div>

          {/* Quadrant 4: Not Urgent & Not Important */}
          <div className="quadrant q4-not-urgent-not-important">
            <div className="quadrant-header">
              <h3>⚪ ELIMINATE</h3>
              <p>Not Urgent & Not Important</p>
              <span className="count">{notUrgentNotImportant.length}</span>
            </div>
            <div className="quadrant-tasks">
              {notUrgentNotImportant.map(renderTaskCard)}
              {notUrgentNotImportant.length === 0 && (
                <div className="empty-state">Nothing to eliminate</div>
              )}
            </div>
          </div>
        </div>

        <div className="eisenhower-footer">
          <div className="matrix-legend">
            <div className="legend-item">
              <span className="legend-dot red"></span>
              <span>Do First (Urgent + Important)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot yellow"></span>
              <span>Schedule (Important)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot orange"></span>
              <span>Delegate (Urgent)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot gray"></span>
              <span>Eliminate (Neither)</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EisenhowerMatrix;
