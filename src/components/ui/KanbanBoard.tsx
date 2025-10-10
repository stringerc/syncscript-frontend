import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: number;
  energy_requirement: number;
}

interface KanbanBoardProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ isOpen, onClose, tasks, onUpdateTask }) => {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const columns = {
    todo: { title: '📋 To Do', tasks: tasks.filter(t => t.status === 'todo') },
    in_progress: { title: '🔄 In Progress', tasks: tasks.filter(t => t.status === 'in_progress') },
    done: { title: '✅ Done', tasks: tasks.filter(t => t.status === 'done') }
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (newStatus: 'todo' | 'in_progress' | 'done') => {
    if (!draggedTask) return;
    
    onUpdateTask(draggedTask, { status: newStatus });
    setDraggedTask(null);
    toast.success('Task moved!');
  };

  if (!isOpen) return null;

  return (
    <div className="kanban-overlay" onClick={onClose}>
      <motion.div
        className="kanban-modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="kanban-header">
          <h2>📋 Kanban Board</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="kanban-columns">
          {Object.entries(columns).map(([status, column]) => (
            <div
              key={status}
              className={`kanban-column ${status}`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(status as Task['status'])}
            >
              <div className="column-header">
                <h3>{column.title}</h3>
                <span className="task-count">{column.tasks.length}</span>
              </div>

              <div className="column-tasks">
                {column.tasks.map(task => (
                  <div
                    key={task.id}
                    className="kanban-task-card"
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                  >
                    <div className="task-title">{task.title}</div>
                    <div className="task-badges">
                      <span className="priority-badge">P{task.priority}</span>
                      <span className="energy-badge">⚡{task.energy_requirement}</span>
                    </div>
                  </div>
                ))}
                {column.tasks.length === 0 && (
                  <div className="empty-column">Drop tasks here</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default KanbanBoard;
