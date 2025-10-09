import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiExplosion from 'react-confetti-explosion';
import { getTaskUrgency, getUrgencyColor, getUrgencyIcon } from '../../utils/dateUtils';
import { Tag } from '../../utils/tagUtils';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energyRequirement: 1 | 2 | 3 | 4 | 5;
  energy_requirement: 1 | 2 | 3 | 4 | 5;
  completed: boolean;
  points: number;
  createdAt: string;
  created_at: string;
  dueDate?: string;
  estimatedDuration?: number;
  estimated_duration?: number;
  project_id?: string;
  project?: {
    id: string;
    name: string;
    color: string;
  };
  tags?: Tag[];
}

interface TaskCardProps {
  task: Task;
  currentEnergy: number;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onSaveAsTemplate?: (task: Task) => void;
  isSelected?: boolean;
  onToggleSelect?: (taskId: string) => void;
  className?: string;
}

const PRIORITY_LABELS = {
  1: 'Low',
  2: 'Medium-Low', 
  3: 'Medium',
  4: 'High',
  5: 'Critical'
};

const ENERGY_LABELS = {
  1: 'Low',
  2: 'Medium-Low',
  3: 'Medium', 
  4: 'High',
  5: 'Peak'
};

const PRIORITY_COLORS = {
  1: 'var(--syncscript-blue-500)',
  2: 'var(--syncscript-blue-400)',
  3: 'var(--syncscript-green-500)',
  4: 'var(--syncscript-orange-500)',
  5: 'var(--gradient-ribbon)'
};

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  currentEnergy, 
  onComplete, 
  onDelete, 
  onEdit,
  onSaveAsTemplate,
  isSelected = false,
  onToggleSelect,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const urgency = getTaskUrgency(task.dueDate);

  const energyMatch = Math.abs(task.energyRequirement - currentEnergy);
  const isPerfectMatch = energyMatch === 0;
  const isGoodMatch = energyMatch <= 1;
  const matchScore = isPerfectMatch ? 100 : isGoodMatch ? 50 : 0;

  const getMatchColor = () => {
    if (isPerfectMatch) return 'var(--syncscript-green-500)';
    if (isGoodMatch) return 'var(--syncscript-orange-500)';
    return 'var(--syncscript-charcoal-400)';
  };

  const getMatchIcon = () => {
    if (isPerfectMatch) return '⚡';
    if (isGoodMatch) return '🔋';
    return '🔌';
  };

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      onComplete(task.id);
    }, 500);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleEdit = () => {
    onEdit(task.id);
  };

  return (
    <motion.div
      className={`task-card ${className} task-priority-${task.priority} ${task.completed ? 'completed' : ''} ${urgency.isUrgent ? 'urgent' : ''} ${urgency.level === 'overdue' ? 'overdue' : ''} ${isSelected ? 'selected' : ''}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Selection Checkbox */}
      {onToggleSelect && !task.completed && (
        <div className="task-checkbox">
          <input
            id={`task-select-${task.id}`}
            name={`task-select-${task.id}`}
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(task.id)}
            onClick={(e) => e.stopPropagation()}
            className="checkbox-input"
            aria-label={`Select task: ${task.title}`}
          />
          <label htmlFor={`task-select-${task.id}`} className="checkbox-custom">
            {isSelected && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            )}
          </label>
        </div>
      )}

      {/* Confetti Celebration */}
      {showConfetti && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <ConfettiExplosion
            force={0.6}
            duration={2500}
            particleCount={task.points > 100 ? 100 : 50}
            width={1200}
            colors={['#4A90E2', '#7ED321', '#F5A623', '#EC4899', '#8B5CF6']}
          />
        </div>
      )}
      
      {/* Task Header */}
      <div className="task-header">
        <div className="task-title-section">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="task-tags">
              {task.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="task-tag"
                  style={{ background: tag.color }}
                >
                  #{tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Energy Match Indicator */}
        <div 
          className="energy-match-indicator"
          style={{ color: getMatchColor() }}
        >
          <span className="match-icon">{getMatchIcon()}</span>
          <span className="match-score">{matchScore}%</span>
        </div>
      </div>

      {/* Task Details */}
      <div className="task-details">
        <div className="task-meta">
          {task.project && (
            <div 
              className="project-badge"
              style={{
                background: task.project.color,
                boxShadow: `0 2px 8px ${task.project.color}40`
              }}
            >
              <svg className="project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z"/>
                <path d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V5z"/>
              </svg>
              <span className="project-name">{task.project.name}</span>
            </div>
          )}
          
          <div className="priority-badge">
            <span className="priority-label">Priority {task.priority}</span>
            <span className="priority-text">{PRIORITY_LABELS[task.priority]}</span>
          </div>
          
          <div className="energy-requirement">
            <span className="energy-label">Energy Level</span>
            <span className="energy-value">{ENERGY_LABELS[task.energyRequirement]}</span>
          </div>
          
          <div className="points-indicator">
            <span className="points-label">Points</span>
            <span className="points-value">{task.points}</span>
          </div>

          {urgency.level !== 'none' && (
            <div 
              className={`urgency-badge urgency-${urgency.level}`}
              style={{ color: getUrgencyColor(urgency.level) }}
            >
              <span className="urgency-icon">{getUrgencyIcon(urgency.level)}</span>
              <span className="urgency-label">{urgency.label}</span>
            </div>
          )}
        </div>

        {/* Neural Circuit Pattern */}
        <div className="neural-pattern">
          <svg className="neural-circuit" viewBox="0 0 100 20">
            <defs>
              <linearGradient id={`gradient-${task.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={PRIORITY_COLORS[task.priority]} />
                <stop offset="100%" stopColor={getMatchColor()} />
              </linearGradient>
            </defs>
            <circle cx="10" cy="10" r="2" fill="currentColor" />
            <path d="M10 10 L30 10" stroke="url(#gradient-${task.id})" strokeWidth="1" />
            <circle cx="30" cy="10" r="2" fill="currentColor" />
            <path d="M30 10 L50 10" stroke="url(#gradient-${task.id})" strokeWidth="1" />
            <circle cx="50" cy="10" r="2" fill="currentColor" />
            <path d="M50 10 L70 10" stroke="url(#gradient-${task.id})" strokeWidth="1" />
            <circle cx="70" cy="10" r="2" fill="currentColor" />
            <path d="M70 10 L90 10" stroke="url(#gradient-${task.id})" strokeWidth="1" />
            <circle cx="90" cy="10" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Action Buttons */}
      <AnimatePresence>
        {isHovered && !task.completed && (
          <motion.div
            className="task-actions"
            initial={{ opacity: 0, y: 8, scaleY: 0.8 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 8, scaleY: 0.8 }}
            transition={{ 
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
              opacity: { duration: 0.25, ease: "easeInOut" },
              y: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
              scaleY: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
            }}
            style={{ originY: 0 }}
          >
            <motion.button
              className="btn btn-sm btn-primary"
              onClick={handleComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="neural-icon" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              Complete
            </motion.button>
            
            <motion.button
              className="btn btn-sm btn-secondary"
              onClick={handleEdit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="neural-icon" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              Edit
            </motion.button>
            
            {onSaveAsTemplate && (
              <motion.button
                className="btn btn-sm btn-ghost"
                onClick={() => onSaveAsTemplate(task)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Save as template"
              >
                <svg className="neural-icon" viewBox="0 0 24 24">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <polyline points="17 21 17 13 7 13 7 21" stroke="currentColor" strokeWidth="2" fill="none" />
                  <polyline points="7 3 7 8 15 8" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Template
              </motion.button>
            )}
            
            <motion.button
              className="btn btn-sm btn-ghost"
              onClick={handleDelete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="neural-icon" viewBox="0 0 24 24">
                <path d="M3 6h18" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              Delete
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Animation */}
      <AnimatePresence>
        {task.completed && (
          <motion.div
            className="completion-overlay"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="completion-check">
              <svg viewBox="0 0 24 24" className="check-icon">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <div className="completion-text">
              <span className="completion-label">Completed!</span>
              <span className="completion-points">+{task.points} points</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ribbon Effect */}
      <div className="ribbon-effect">
        <div 
          className="ribbon-line"
          style={{ 
            background: `linear-gradient(90deg, ${PRIORITY_COLORS[task.priority]} 0%, ${getMatchColor()} 100%)`
          }}
        />
      </div>
    </motion.div>
  );
};

export default TaskCard;
