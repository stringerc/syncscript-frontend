import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskTemplate, getTemplates, deleteTemplate } from '../../utils/templateUtils';
import toast from 'react-hot-toast';

interface TemplateLibraryProps {
  onUseTemplate: (template: TaskTemplate) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onUseTemplate }) => {
  const [templates, setTemplates] = React.useState<TaskTemplate[]>([]);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const savedTemplates = getTemplates();
    setTemplates(savedTemplates);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete template "${name}"?`)) {
      const success = deleteTemplate(id);
      if (success) {
        toast.success(`Template "${name}" deleted`);
        loadTemplates();
      }
    }
  };

  const handleUse = (template: TaskTemplate) => {
    onUseTemplate(template);
    toast.success(`Creating task from "${template.name}" template! 📋`, {
      duration: 2000,
    });
  };

  if (templates.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="template-library"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="template-library-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <svg className="template-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        <span className="template-count">{templates.length}</span>
        <span className="template-label">Template{templates.length !== 1 ? 's' : ''}</span>
        <svg 
          className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="template-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {templates.map((template) => (
              <motion.div
                key={template.id}
                className="template-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="template-info">
                  <h4 className="template-name">{template.name}</h4>
                  <div className="template-details">
                    <span className="template-detail">
                      <span className="detail-icon">⚡</span>
                      {template.energy_requirement}/5
                    </span>
                    <span className="template-detail">
                      <span className="detail-icon">🎯</span>
                      {template.priority}/5
                    </span>
                    {template.tags && template.tags.length > 0 && (
                      <span className="template-detail">
                        <span className="detail-icon">🏷️</span>
                        {template.tags.length}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="template-actions">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleUse(template)}
                    title="Create task from template"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Use
                  </button>
                  
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => handleDelete(template.id, template.name)}
                    title="Delete template"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TemplateLibrary;

