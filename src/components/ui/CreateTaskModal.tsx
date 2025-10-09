import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, parseTags } from '../../utils/tagUtils';
import { RecurrenceConfig, RecurrenceFrequency, createDefaultRecurrence } from '../../utils/recurrenceUtils';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: NewTaskData) => Promise<void>;
  currentEnergy?: number;
  projects?: Project[];
}

export interface NewTaskData {
  title: string;
  description?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_requirement: 1 | 2 | 3 | 4 | 5;
  due_date?: string;
  estimated_duration?: number;
  project_id?: string;
  tags?: Tag[];
  recurrence?: RecurrenceConfig;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onCreateTask,
  currentEnergy = 3,
  projects = []
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [energyRequirement, setEnergyRequirement] = useState<1 | 2 | 3 | 4 | 5>(currentEnergy as 1 | 2 | 3 | 4 | 5);
  const [dueDate, setDueDate] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');
  const [projectId, setProjectId] = useState<string>('');
  const [tagInput, setTagInput] = useState('');
  const [recurrenceFreq, setRecurrenceFreq] = useState<RecurrenceFrequency>('none');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const tags = parseTags(tagInput);
      
      // Build recurrence config if set
      const recurrence: RecurrenceConfig | undefined = recurrenceFreq !== 'none' ? {
        frequency: recurrenceFreq,
        interval: recurrenceInterval,
        is_active: true
      } : undefined;
      
      const taskData: NewTaskData = {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        energy_requirement: energyRequirement,
        due_date: dueDate ? new Date(dueDate).toISOString() : undefined,
        estimated_duration: estimatedDuration ? parseInt(estimatedDuration) : undefined,
        project_id: projectId || undefined,
        tags: tags.length > 0 ? tags : undefined,
        recurrence,
      };

      await onCreateTask(taskData);
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority(3);
      setEnergyRequirement(currentEnergy as 1 | 2 | 3 | 4 | 5);
      setDueDate('');
      setEstimatedDuration('');
      setProjectId('');
      setTagInput('');
      setRecurrenceFreq('none');
      setRecurrenceInterval(1);
      
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content card card-lg"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <h2 className="modal-title">Create New Task</h2>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-sm"
              aria-label="Close"
            >
              <svg className="neural-icon" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="task-title" className="form-label">
                Task Title <span className="text-error">*</span>
              </label>
              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="form-input"
                maxLength={500}
                required
                autoFocus
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="task-description" className="form-label">
                Description
              </label>
              <textarea
                id="task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details (optional)"
                className="form-textarea"
                rows={3}
                maxLength={2000}
              />
            </div>

            {/* Priority and Energy in a grid */}
            <div className="form-grid">
              {/* Priority */}
              <div className="form-group">
                <label htmlFor="task-priority" className="form-label">
                  Priority
                </label>
                <select
                  id="task-priority"
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5)}
                  className="form-select"
                >
                  <option value="1">1 - Low</option>
                  <option value="2">2 - Medium-Low</option>
                  <option value="3">3 - Medium</option>
                  <option value="4">4 - High</option>
                  <option value="5">5 - Critical</option>
                </select>
              </div>

              {/* Energy Requirement */}
              <div className="form-group">
                <label htmlFor="task-energy" className="form-label">
                  Energy Required
                </label>
                <select
                  id="task-energy"
                  value={energyRequirement}
                  onChange={(e) => setEnergyRequirement(parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5)}
                  className="form-select"
                >
                  <option value="1">1 - Low Energy</option>
                  <option value="2">2 - Medium-Low</option>
                  <option value="3">3 - Medium</option>
                  <option value="4">4 - High Energy</option>
                  <option value="5">5 - Peak Energy</option>
                </select>
              </div>
            </div>

            {/* Project Selection */}
            <div className="form-group">
              <label htmlFor="task-project" className="form-label">
                Project (Optional)
              </label>
              <select
                id="task-project"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="form-select"
              >
                <option value="">No Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date and Duration in a grid */}
            <div className="form-grid">
              {/* Due Date */}
              <div className="form-group">
                <label htmlFor="task-due-date" className="form-label">
                  Due Date
                </label>
                <input
                  id="task-due-date"
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Estimated Duration */}
              <div className="form-group">
                <label htmlFor="task-duration" className="form-label">
                  Duration (minutes)
                </label>
                <input
                  id="task-duration"
                  type="number"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(e.target.value)}
                  placeholder="30"
                  min="1"
                  className="form-input"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="form-group">
              <label htmlFor="task-tags" className="form-label">
                Tags (Optional)
              </label>
              <input
                id="task-tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="work, urgent, quick (comma-separated)"
                className="form-input"
              />
              <p className="form-hint">
                Add tags like: work, personal, urgent, quick
              </p>
            </div>

            {/* Recurrence */}
            <div className="form-group">
              <label htmlFor="task-recurrence" className="form-label">
                Repeat Task (Optional)
              </label>
              <div className="recurrence-controls">
                <select
                  id="task-recurrence"
                  value={recurrenceFreq}
                  onChange={(e) => setRecurrenceFreq(e.target.value as RecurrenceFrequency)}
                  className="form-select"
                >
                  <option value="none">Does not repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                
                {recurrenceFreq !== 'none' && (
                  <div className="interval-control">
                    <label htmlFor="recurrence-interval" className="interval-label">
                      Every
                    </label>
                    <input
                      id="recurrence-interval"
                      type="number"
                      value={recurrenceInterval}
                      onChange={(e) => setRecurrenceInterval(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max="30"
                      className="form-input interval-input"
                    />
                    <span className="interval-unit">
                      {recurrenceFreq === 'daily' ? 'day(s)' : 
                       recurrenceFreq === 'weekly' ? 'week(s)' : 'month(s)'}
                    </span>
                  </div>
                )}
              </div>
              <p className="form-hint">
                Task will auto-create when completed {recurrenceFreq !== 'none' && '🔄'}
              </p>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !title.trim()}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner-sm"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="neural-icon" viewBox="0 0 24 24">
                      <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    Create Task
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateTaskModal;

