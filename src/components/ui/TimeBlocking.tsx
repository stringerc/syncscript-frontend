import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/TimeBlocking.css';

interface TimeBlock {
  id: string;
  taskId: string;
  taskTitle: string;
  startTime: string;
  endTime: string;
  energyRequirement: number;
  color: string;
}

interface TimeBlockingProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Array<{
    id: string;
    title: string;
    energy_requirement: number;
    estimated_duration?: number;
  }>;
  energyPredictions: Array<{ hour: number; energy: number }>;
}

const TimeBlocking: React.FC<TimeBlockingProps> = ({
  isOpen,
  onClose,
  tasks,
  energyPredictions
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  // Generate time slots (6 AM - 10 PM)
  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 6;
    return {
      hour,
      time: `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`,
      energy: energyPredictions.find(p => p.hour === hour)?.energy || 50
    };
  });

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (hour: number) => {
    if (!draggedTask) return;

    const task = tasks.find(t => t.id === draggedTask);
    if (!task) return;

    const duration = task.estimated_duration || 60;
    const startHour = hour;
    const endHour = hour + Math.ceil(duration / 60);

    const newBlock: TimeBlock = {
      id: `block-${Date.now()}`,
      taskId: task.id,
      taskTitle: task.title,
      startTime: `${startHour}:00`,
      endTime: `${endHour}:00`,
      energyRequirement: task.energy_requirement,
      color: getColorForEnergy(task.energy_requirement)
    };

    setTimeBlocks([...timeBlocks, newBlock]);
    setDraggedTask(null);
    toast.success(`📅 Scheduled: ${task.title}`);
  };

  const handleRemoveBlock = (blockId: string) => {
    setTimeBlocks(timeBlocks.filter(b => b.id !== blockId));
    toast.success('Block removed');
  };

  const getColorForEnergy = (energy: number): string => {
    if (energy <= 1) return '#10B981';
    if (energy <= 2) return '#3B82F6';
    if (energy <= 3) return '#F59E0B';
    if (energy <= 4) return '#EF4444';
    return '#DC2626';
  };

  const getEnergyLabel = (energy: number): string => {
    if (energy < 30) return 'Low Energy';
    if (energy < 60) return 'Medium Energy';
    return 'High Energy';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="time-blocking-overlay" onClick={onClose}>
          <motion.div
            className="time-blocking-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="time-blocking-header">
              <div className="header-content">
                <span className="header-icon">📅</span>
                <div>
                  <h2>Time Blocking</h2>
                  <p>Schedule tasks based on your energy</p>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            {/* Content */}
            <div className="time-blocking-content">
              {/* Date Selector */}
              <div className="date-selector">
                <label>Schedule for:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
              </div>

              <div className="time-blocking-layout">
                {/* Available Tasks */}
                <div className="tasks-sidebar">
                  <h3>Available Tasks</h3>
                  <div className="tasks-list">
                    {tasks.filter(task => !timeBlocks.some(b => b.taskId === task.id)).map(task => (
                      <div
                        key={task.id}
                        className="draggable-task"
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                      >
                        <div className="task-info">
                          <div className="task-title">{task.title}</div>
                          <div className="task-meta">
                            <span className="energy-badge" style={{ background: getColorForEnergy(task.energy_requirement) }}>
                              ⚡ {task.energy_requirement}/5
                            </span>
                            {task.estimated_duration && (
                              <span className="duration-badge">
                                ⏱️ {task.estimated_duration}min
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="drag-handle">⋮⋮</span>
                      </div>
                    ))}
                    {tasks.filter(task => !timeBlocks.some(b => b.taskId === task.id)).length === 0 && (
                      <div className="no-tasks">
                        All tasks scheduled! 🎉
                      </div>
                    )}
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="calendar-grid">
                  {timeSlots.map(slot => {
                    const blocksAtThisTime = timeBlocks.filter(b => 
                      parseInt(b.startTime) === slot.hour
                    );

                    return (
                      <div
                        key={slot.hour}
                        className="time-slot"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(slot.hour)}
                      >
                        <div className="time-label">
                          <span className="time">{slot.time}</span>
                          <span className={`energy-indicator energy-${Math.floor(slot.energy / 20)}`}>
                            {getEnergyLabel(slot.energy)}
                          </span>
                        </div>
                        <div className="time-slot-content">
                          {blocksAtThisTime.map(block => (
                            <div
                              key={block.id}
                              className="time-block"
                              style={{ borderLeft: `4px solid ${block.color}` }}
                            >
                              <div className="block-title">{block.taskTitle}</div>
                              <div className="block-time">
                                {block.startTime} - {block.endTime}
                              </div>
                              <button
                                className="remove-block-btn"
                                onClick={() => handleRemoveBlock(block.id)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          {blocksAtThisTime.length === 0 && (
                            <div className="empty-slot">Drop task here</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="time-blocking-footer">
              <div className="energy-legend">
                <span className="legend-item">
                  <span className="legend-dot energy-high"></span>
                  High Energy
                </span>
                <span className="legend-item">
                  <span className="legend-dot energy-medium"></span>
                  Medium Energy
                </span>
                <span className="legend-item">
                  <span className="legend-dot energy-low"></span>
                  Low Energy
                </span>
              </div>
              <button className="btn btn-primary" onClick={onClose}>
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TimeBlocking;
