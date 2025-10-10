import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/TemplatesGallery.css';

interface TaskTemplate {
  title: string;
  description?: string;
  priority: number;
  energy_requirement: number;
  estimated_duration?: number;
  tags?: string[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  tasks: TaskTemplate[];
  author: string;
  uses: number;
}

interface TemplatesGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: Template) => void;
}

const TemplatesGallery: React.FC<TemplatesGalleryProps> = ({ isOpen, onClose, onUseTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates: Template[] = [
    {
      id: 'morning-routine',
      name: 'Morning Routine',
      description: 'Start your day productively',
      icon: '🌅',
      category: 'personal',
      author: 'SyncScript',
      uses: 1243,
      tasks: [
        { title: 'Meditation (10 min)', priority: 3, energy_requirement: 2, estimated_duration: 10 },
        { title: 'Exercise', priority: 4, energy_requirement: 4, estimated_duration: 30 },
        { title: 'Healthy Breakfast', priority: 3, energy_requirement: 2, estimated_duration: 20 },
        { title: 'Review Daily Goals', priority: 4, energy_requirement: 3, estimated_duration: 15 }
      ]
    },
    {
      id: 'project-launch',
      name: 'Project Launch Checklist',
      description: 'Complete project deployment',
      icon: '🚀',
      category: 'work',
      author: 'SyncScript',
      uses: 856,
      tasks: [
        { title: 'Final testing & QA', priority: 5, energy_requirement: 5, estimated_duration: 120 },
        { title: 'Deploy to production', priority: 5, energy_requirement: 5, estimated_duration: 30 },
        { title: 'Monitor deployment', priority: 5, energy_requirement: 4, estimated_duration: 60 },
        { title: 'Update documentation', priority: 4, energy_requirement: 3, estimated_duration: 45 },
        { title: 'Announce launch', priority: 4, energy_requirement: 3, estimated_duration: 30 }
      ]
    },
    {
      id: 'weekly-planning',
      name: 'Weekly Planning Session',
      description: 'Plan your week ahead',
      icon: '📋',
      category: 'productivity',
      author: 'SyncScript',
      uses: 2341,
      tasks: [
        { title: 'Review last week', priority: 4, energy_requirement: 3, estimated_duration: 15 },
        { title: 'Set top 3 goals for the week', priority: 5, energy_requirement: 3, estimated_duration: 10 },
        { title: 'Schedule important tasks', priority: 4, energy_requirement: 3, estimated_duration: 20 },
        { title: 'Block focus time', priority: 4, energy_requirement: 2, estimated_duration: 10 }
      ]
    },
    {
      id: 'deep-work',
      name: 'Deep Work Session',
      description: '2-hour focus block',
      icon: '🧠',
      category: 'productivity',
      author: 'SyncScript',
      uses: 1567,
      tasks: [
        { title: 'Eliminate distractions', priority: 5, energy_requirement: 2, estimated_duration: 5 },
        { title: 'Deep work (90 min)', priority: 5, energy_requirement: 5, estimated_duration: 90 },
        { title: 'Document progress', priority: 3, energy_requirement: 2, estimated_duration: 15 },
        { title: 'Plan next session', priority: 3, energy_requirement: 2, estimated_duration: 10 }
      ]
    },
    {
      id: 'workout',
      name: 'Full Workout Routine',
      description: 'Complete fitness session',
      icon: '💪',
      category: 'health',
      author: 'SyncScript',
      uses: 934,
      tasks: [
        { title: 'Warm-up (10 min)', priority: 4, energy_requirement: 3, estimated_duration: 10 },
        { title: 'Strength training (30 min)', priority: 4, energy_requirement: 5, estimated_duration: 30 },
        { title: 'Cardio (20 min)', priority: 3, energy_requirement: 4, estimated_duration: 20 },
        { title: 'Cool-down & stretch', priority: 3, energy_requirement: 2, estimated_duration: 10 }
      ]
    },
    {
      id: 'content-creation',
      name: 'Content Creation Workflow',
      description: 'Create and publish content',
      icon: '✍️',
      category: 'work',
      author: 'SyncScript',
      uses: 723,
      tasks: [
        { title: 'Research topic', priority: 4, energy_requirement: 3, estimated_duration: 30 },
        { title: 'Outline content', priority: 4, energy_requirement: 3, estimated_duration: 20 },
        { title: 'Write draft', priority: 5, energy_requirement: 5, estimated_duration: 90 },
        { title: 'Edit & polish', priority: 4, energy_requirement: 4, estimated_duration: 45 },
        { title: 'Create visuals', priority: 3, energy_requirement: 4, estimated_duration: 30 },
        { title: 'Publish & promote', priority: 4, energy_requirement: 3, estimated_duration: 20 }
      ]
    }
  ];

  const categories = ['all', 'personal', 'work', 'productivity', 'health'];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const handleUseTemplate = (template: Template) => {
    onUseTemplate(template);
    toast.success(`✅ Using template: ${template.name}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="templates-gallery-overlay" onClick={onClose}>
          <motion.div
            className="templates-gallery-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="templates-header">
              <div>
                <h2>📚 Templates Gallery</h2>
                <p>Start faster with pre-built templates</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="templates-content">
              <div className="category-filter">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="templates-grid">
                {filteredTemplates.map(template => (
                  <div key={template.id} className="template-card">
                    <div className="template-icon">{template.icon}</div>
                    <h3 className="template-name">{template.name}</h3>
                    <p className="template-description">{template.description}</p>
                    <div className="template-meta">
                      <span>{template.tasks.length} tasks</span>
                      <span>👥 {template.uses.toLocaleString()} uses</span>
                    </div>
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => handleUseTemplate(template)}
                    >
                      Use Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TemplatesGallery;
