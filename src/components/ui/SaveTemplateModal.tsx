import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { saveTemplate, templateNameExists } from '../../utils/templateUtils';
import { Tag } from '../../utils/tagUtils';

interface SaveTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskData: {
    title: string;
    description?: string;
    priority: 1 | 2 | 3 | 4 | 5;
    energy_requirement: 1 | 2 | 3 | 4 | 5;
    estimated_duration?: number;
    project_id?: string;
    tags?: Tag[];
  } | null;
}

const SaveTemplateModal: React.FC<SaveTemplateModalProps> = ({
  isOpen,
  onClose,
  taskData
}) => {
  const [templateName, setTemplateName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!templateName.trim()) {
      toast.error('Template name is required');
      return;
    }

    if (!taskData) {
      toast.error('No task data available');
      return;
    }

    if (templateNameExists(templateName.trim())) {
      toast.error('A template with this name already exists');
      return;
    }

    setIsSubmitting(true);

    try {
      saveTemplate({
        name: templateName.trim(),
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        energy_requirement: taskData.energy_requirement,
        estimated_duration: taskData.estimated_duration,
        project_id: taskData.project_id,
        tags: taskData.tags
      });

      toast.success(`Template "${templateName.trim()}" saved! 📋`, {
        duration: 3000,
        icon: '✅',
      });

      setTemplateName('');
      onClose();
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTemplateName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="modal task-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2 className="modal-title">Save as Template</h2>
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

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="template-name" className="form-label">
                  Template Name *
                </label>
                <input
                  id="template-name"
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., Weekly Report, Client Check-in"
                  className="form-input"
                  autoFocus
                  disabled={isSubmitting}
                />
                <p className="form-hint">
                  Give this template a memorable name for quick access
                </p>
              </div>

              {taskData && (
                <div className="template-preview">
                  <p className="preview-label">Template Preview:</p>
                  <div className="preview-content">
                    <p><strong>Title:</strong> {taskData.title}</p>
                    {taskData.description && <p><strong>Description:</strong> {taskData.description}</p>}
                    <p><strong>Priority:</strong> {taskData.priority}/5</p>
                    <p><strong>Energy:</strong> {taskData.energy_requirement}/5</p>
                    {taskData.tags && taskData.tags.length > 0 && (
                      <p><strong>Tags:</strong> {taskData.tags.map(t => `#${t.label}`).join(', ')}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
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
                disabled={isSubmitting || !templateName.trim()}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-sm"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="neural-icon" viewBox="0 0 24 24">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    Save Template
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

export default SaveTemplateModal;

