import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuthenticatedFetch } from '../../hooks/useAuthenticatedFetch';
import { Tag, parseTags, tagsToString } from '../../utils/tagUtils';
import { Subtask, createSubtask, toggleSubtask, deleteSubtask } from '../../utils/subtaskUtils';
import { TaskNote, createNote, deleteNote, formatNoteTime } from '../../utils/noteUtils';
import { RecurrenceConfig, RecurrenceFrequency, createDefaultRecurrence } from '../../utils/recurrenceUtils';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_requirement: 1 | 2 | 3 | 4 | 5;
  completed: boolean;
  points: number;
  created_at: string;
  due_date?: string;
  project_id?: string;
  tags?: Tag[];
  subtasks?: Subtask[];
  notes?: TaskNote[];
  recurrence?: RecurrenceConfig;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  task: Task | null;
  projects?: Project[];
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  task,
  projects = []
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 3 as 1 | 2 | 3 | 4 | 5,
    energy_requirement: 3 as 1 | 2 | 3 | 4 | 5,
    due_date: '',
    project_id: '',
    tagInput: ''
  });
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [notes, setNotes] = useState<TaskNote[]>([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [recurrenceFreq, setRecurrenceFreq] = useState<RecurrenceFrequency>('none');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authenticatedFetch = useAuthenticatedFetch();

  // Update form data when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        energy_requirement: task.energy_requirement,
        due_date: task.due_date ? task.due_date.split('T')[0] : '',
        project_id: task.project_id || '',
        tagInput: task.tags ? tagsToString(task.tags) : ''
      });
      setSubtasks(task.subtasks || []);
      setNotes(task.notes || []);
      setRecurrenceFreq(task.recurrence?.frequency || 'none');
      setRecurrenceInterval(task.recurrence?.interval || 1);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    if (!task) {
      toast.error('No task selected');
      return;
    }

    setIsSubmitting(true);

    try {
      const tags = parseTags(formData.tagInput);
      
      const requestData: {
        title: string;
        description?: string;
        priority: number;
        energy_requirement: number;
        due_date?: string;
        project_id?: string;
        tags?: Tag[];
        subtasks?: Subtask[];
        notes?: TaskNote[];
        recurrence?: RecurrenceConfig;
      } = {
        title: formData.title.trim(),
        priority: formData.priority,
        energy_requirement: formData.energy_requirement
      };

      // Only include optional fields if they have values
      if (formData.description.trim()) {
        requestData.description = formData.description.trim();
      }

      if (formData.due_date) {
        requestData.due_date = new Date(formData.due_date).toISOString();
      }

      if (formData.project_id) {
        requestData.project_id = formData.project_id;
      }

      if (tags.length > 0) {
        requestData.tags = tags;
      }

      if (subtasks.length > 0) {
        requestData.subtasks = subtasks;
      }

      if (notes.length > 0) {
        requestData.notes = notes;
      }

      // Build recurrence config
      if (recurrenceFreq !== 'none') {
        requestData.recurrence = {
          frequency: recurrenceFreq,
          interval: recurrenceInterval,
          is_active: true
        };
      } else {
        requestData.recurrence = undefined;
      }

      const response = await authenticatedFetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast.success('Task updated successfully! 🎯', {
          duration: 3000,
          icon: '✅',
        });
        
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update task' }));
        throw new Error(errorData.message || errorData.error || `HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.', {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const getPriorityLabel = (priority: number) => {
    const labels = ['', 'Very Low', 'Low', 'Medium', 'High', 'Critical'];
    return labels[priority];
  };

  const getEnergyLabel = (energy: number) => {
    const labels = ['', 'Low', 'Medium-Low', 'Medium', 'High', 'Peak'];
    return labels[energy];
  };

  if (!task) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="modal-content task-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">
                Edit Task
              </h2>
              <button
                className="modal-close-btn"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="task-form">
              <div className="form-group">
                <label htmlFor="task-title" className="form-label">
                  Task Title *
                </label>
                <input
                  id="task-title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter task title..."
                  className="form-input"
                  disabled={isSubmitting}
                  maxLength={200}
                />
              </div>

              <div className="form-group">
                <label htmlFor="task-description" className="form-label">
                  Description
                </label>
                <textarea
                  id="task-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your task..."
                  className="form-textarea"
                  disabled={isSubmitting}
                  rows={3}
                  maxLength={1000}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="task-priority" className="form-label">
                    Priority
                  </label>
                  <select
                    id="task-priority"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 }))}
                    className="form-select"
                    disabled={isSubmitting}
                  >
                    <option value={1}>1 - Very Low</option>
                    <option value={2}>2 - Low</option>
                    <option value={3}>3 - Medium</option>
                    <option value={4}>4 - High</option>
                    <option value={5}>5 - Critical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="task-energy" className="form-label">
                    Energy Required
                  </label>
                  <select
                    id="task-energy"
                    value={formData.energy_requirement}
                    onChange={(e) => setFormData(prev => ({ ...prev, energy_requirement: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 }))}
                    className="form-select"
                    disabled={isSubmitting}
                  >
                    <option value={1}>1 - Low</option>
                    <option value={2}>2 - Medium-Low</option>
                    <option value={3}>3 - Medium</option>
                    <option value={4}>4 - High</option>
                    <option value={5}>5 - Peak</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="task-project" className="form-label">
                  Project (Optional)
                </label>
                <select
                  id="task-project"
                  value={formData.project_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_id: e.target.value }))}
                  className="form-select"
                  disabled={isSubmitting}
                >
                  <option value="">No Project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="task-due-date" className="form-label">
                  Due Date
                </label>
                <input
                  id="task-due-date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                  className="form-input"
                  disabled={isSubmitting}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Tags */}
              <div className="form-group">
                <label htmlFor="task-tags" className="form-label">
                  Tags (Optional)
                </label>
                <input
                  id="task-tags"
                  type="text"
                  value={formData.tagInput}
                  onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
                  placeholder="work, urgent, quick (comma-separated)"
                  className="form-input"
                  disabled={isSubmitting}
                />
                <p className="form-hint">
                  Add tags like: work, personal, urgent, quick
                </p>
              </div>

              {/* Subtasks / Checklist */}
              <div className="form-group">
                <label className="form-label">
                  Subtasks / Checklist (Optional)
                </label>
                
                {/* Subtask List */}
                {subtasks.length > 0 && (
                  <div className="subtask-list">
                    {subtasks.map((subtask) => (
                      <div key={subtask.id} className="subtask-item">
                        <input
                          id={`subtask-${subtask.id}`}
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={() => setSubtasks(toggleSubtask(subtasks, subtask.id))}
                          className="subtask-checkbox"
                        />
                        <label htmlFor={`subtask-${subtask.id}`} className="subtask-text">
                          {subtask.text}
                        </label>
                        <button
                          type="button"
                          onClick={() => setSubtasks(deleteSubtask(subtasks, subtask.id))}
                          className="subtask-delete"
                          title="Delete subtask"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Subtask */}
                <div className="subtask-add">
                  <input
                    type="text"
                    value={newSubtaskText}
                    onChange={(e) => setNewSubtaskText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newSubtaskText.trim()) {
                          setSubtasks([...subtasks, createSubtask(newSubtaskText)]);
                          setNewSubtaskText('');
                        }
                      }
                    }}
                    placeholder="Add a subtask... (press Enter)"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSubtaskText.trim()) {
                        setSubtasks([...subtasks, createSubtask(newSubtaskText)]);
                        setNewSubtaskText('');
                      }
                    }}
                    className="btn btn-sm btn-secondary"
                    disabled={!newSubtaskText.trim() || isSubmitting}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add
                  </button>
                </div>
                <p className="form-hint">
                  Break down your task into smaller steps
                </p>
              </div>

              {/* Notes / Comments */}
              <div className="form-group">
                <label className="form-label">
                  Notes / Comments (Optional)
                </label>
                
                {/* Notes List */}
                {notes.length > 0 && (
                  <div className="notes-list">
                    {notes.map((note) => (
                      <div key={note.id} className="note-item">
                        <div className="note-header">
                          <span className="note-timestamp">{formatNoteTime(note.created_at)}</span>
                          <button
                            type="button"
                            onClick={() => setNotes(deleteNote(notes, note.id))}
                            className="note-delete"
                            title="Delete note"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"/>
                              <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                        <p className="note-text">{note.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Note */}
                <div className="note-add">
                  <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (newNoteText.trim()) {
                          setNotes([...notes, createNote(newNoteText)]);
                          setNewNoteText('');
                        }
                      }
                    }}
                    placeholder="Add a note... (Enter to save, Shift+Enter for new line)"
                    className="form-textarea"
                    rows={2}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newNoteText.trim()) {
                        setNotes([...notes, createNote(newNoteText)]);
                        setNewNoteText('');
                      }
                    }}
                    className="btn btn-sm btn-secondary"
                    disabled={!newNoteText.trim() || isSubmitting}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14m-7-7h14"/>
                    </svg>
                    Add Note
                  </button>
                </div>
                <p className="form-hint">
                  Track progress, thoughts, and important details
                </p>
              </div>

              {/* Recurrence */}
              <div className="form-group">
                <label htmlFor="task-recurrence-edit" className="form-label">
                  Repeat Task (Optional)
                </label>
                <div className="recurrence-controls">
                  <select
                    id="task-recurrence-edit"
                    value={recurrenceFreq}
                    onChange={(e) => setRecurrenceFreq(e.target.value as RecurrenceFrequency)}
                    className="form-select"
                    disabled={isSubmitting}
                  >
                    <option value="none">Does not repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  
                  {recurrenceFreq !== 'none' && (
                    <div className="interval-control">
                      <label htmlFor="recurrence-interval-edit" className="interval-label">
                        Every
                      </label>
                      <input
                        id="recurrence-interval-edit"
                        type="number"
                        value={recurrenceInterval}
                        onChange={(e) => setRecurrenceInterval(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="30"
                        className="form-input interval-input"
                        disabled={isSubmitting}
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

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-ghost"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || !formData.title.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner-small"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Update Task
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditTaskModal;
