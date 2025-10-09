import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuthenticatedFetch } from '../../hooks/useAuthenticatedFetch';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editProject?: {
    id: string;
    name: string;
    description?: string;
    color: string;
    created_at: string;
    updated_at: string;
    archived: boolean;
  } | null;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editProject = null
}) => {
  const [formData, setFormData] = useState({
    name: editProject?.name || '',
    description: editProject?.description || '',
    color: editProject?.color || '#3B82F6'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authenticatedFetch = useAuthenticatedFetch();

  const colorOptions = [
    { value: '#3B82F6', label: 'Blue', class: 'from-blue-500 to-blue-600' },
    { value: '#10B981', label: 'Green', class: 'from-green-500 to-green-600' },
    { value: '#F59E0B', label: 'Orange', class: 'from-orange-500 to-orange-600' },
    { value: '#8B5CF6', label: 'Purple', class: 'from-purple-500 to-purple-600' },
    { value: '#EC4899', label: 'Pink', class: 'from-pink-500 to-pink-600' },
    { value: '#14B8A6', label: 'Teal', class: 'from-teal-500 to-teal-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Project name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const url = editProject ? `/api/projects/${editProject.id}` : '/api/projects';
      const method = editProject ? 'PUT' : 'POST';

      const requestData: { name: string; description?: string; color: string } = {
        name: formData.name.trim(),
        color: formData.color
      };

      // Only include description if it's not empty
      if (formData.description.trim()) {
        requestData.description = formData.description.trim();
      }

      console.log('Sending project data:', requestData);

      const response = await authenticatedFetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const action = editProject ? 'updated' : 'created';
        toast.success(`Project ${action} successfully! 🎯`, {
          duration: 3000,
          icon: '📁',
        });
        
        setFormData({ name: '', description: '', color: '#3B82F6' });
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to save project' }));
        console.error('Project creation error response:', errorData);
        console.error('Full error details:', JSON.stringify(errorData, null, 2));
        throw new Error(errorData.message || errorData.error || `HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      const action = editProject ? 'updating' : 'creating';
      toast.error(`Failed to ${action} project. Please try again.`, {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: '', description: '', color: '#3B82F6' });
      onClose();
    }
  };

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
            className="modal-content project-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">
                {editProject ? 'Edit Project' : 'Create New Project'}
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

            <form onSubmit={handleSubmit} className="project-form">
              <div className="form-group">
                <label htmlFor="project-name" className="form-label">
                  Project Name *
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter project name..."
                  className="form-input"
                  disabled={isSubmitting}
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="project-description" className="form-label">
                  Description
                </label>
                <textarea
                  id="project-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your project..."
                  className="form-textarea"
                  disabled={isSubmitting}
                  rows={3}
                  maxLength={500}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Color</label>
                <div className="color-picker">
                  {colorOptions.map((color) => (
                    <label key={color.value} className="color-option">
                      <input
                        type="radio"
                        name="color"
                        value={color.value}
                        checked={formData.color === color.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                        className="color-input"
                        disabled={isSubmitting}
                      />
                      <div 
                        className="color-preview"
                        style={{ background: color.value }}
                      >
                        {formData.color === color.value && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"/>
                          </svg>
                        )}
                      </div>
                      <span className="color-label">{color.label}</span>
                    </label>
                  ))}
                </div>
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
                  disabled={isSubmitting || !formData.name.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner-small"></div>
                      {editProject ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                      {editProject ? 'Update Project' : 'Create Project'}
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

export default CreateProjectModal;
