import React from 'react';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  due_date?: string;
  created_at: string;
  estimated_duration?: number;
  priority: number;
  completed: boolean;
}

interface GanttChartProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ isOpen, onClose, tasks }) => {
  if (!isOpen) return null;

  const tasksWithDates = tasks.filter(t => t.due_date && !t.completed);

  if (tasksWithDates.length === 0) {
    return (
      <div className="gantt-overlay" onClick={onClose}>
        <div className="gantt-modal" onClick={(e) => e.stopPropagation()}>
          <div className="gantt-header">
            <h2>📊 Gantt Chart</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          <div className="empty-gantt">
            <span className="empty-icon">📅</span>
            <p>No tasks with due dates to display</p>
            <p className="empty-hint">Add due dates to tasks to see them on the timeline</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate timeline
  const dates = tasksWithDates.map(t => new Date(t.due_date!));
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

  // Add padding
  minDate.setDate(minDate.getDate() - 2);
  maxDate.setDate(maxDate.getDate() + 2);

  const daysDiff = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const timeline = Array.from({ length: daysDiff + 1 }, (_, i) => {
    const date = new Date(minDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  const getPriorityColor = (priority: number): string => {
    if (priority >= 5) return '#EF4444';
    if (priority >= 4) return '#F59E0B';
    if (priority >= 3) return '#3B82F6';
    return '#9CA3AF';
  };

  return (
    <div className="gantt-overlay" onClick={onClose}>
      <motion.div
        className="gantt-modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gantt-header">
          <h2>📊 Gantt Chart</h2>
          <p>Timeline view of your tasks</p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="gantt-container">
          {/* Header */}
          <div className="gantt-grid-header">
            <div className="task-name-column">Task</div>
            <div className="timeline-header">
              {timeline.map(date => (
                <div key={date.toString()} className="date-cell">
                  <div className="date-day">{date.getDate()}</div>
                  <div className="date-month">{date.toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className="gantt-body">
            {tasksWithDates.map(task => {
              const taskDate = new Date(task.due_date!);
              const dayIndex = Math.floor((taskDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
              const duration = task.estimated_duration || 60;
              const durationDays = Math.max(1, Math.ceil(duration / (60 * 8))); // 8 hour workday

              return (
                <div key={task.id} className="gantt-row">
                  <div className="task-name-column">
                    <span className="task-title">{task.title}</span>
                    <span className="task-duration">{duration}min</span>
                  </div>
                  <div className="timeline-row">
                    <div
                      className="gantt-bar"
                      style={{
                        left: `${(dayIndex / timeline.length) * 100}%`,
                        width: `${(durationDays / timeline.length) * 100}%`,
                        background: getPriorityColor(task.priority)
                      }}
                      title={task.title}
                    >
                      <span className="bar-label">{task.title.substring(0, 20)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="gantt-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#EF4444' }}></span>
            <span>Critical (P5)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#F59E0B' }}></span>
            <span>High (P4)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#3B82F6' }}></span>
            <span>Medium (P3)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#9CA3AF' }}></span>
            <span>Low (P1-2)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GanttChart;
