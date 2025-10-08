import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
  archived: boolean;
}

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  onSelect?: (project: Project) => void;
  isSelected?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onSelect,
  isSelected = false
}) => {
  const getProjectColor = (color?: string) => {
    // If color is a hex value, create a gradient from it
    if (color && color.startsWith('#')) {
      return `from-[${color}] to-[${color}]`;
    }
    
    // Fallback to named colors
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      purple: 'from-purple-500 to-purple-600',
      pink: 'from-pink-500 to-pink-600',
      teal: 'from-teal-500 to-teal-600'
    };
    
    if (color && colors[color as keyof typeof colors]) {
      return colors[color as keyof typeof colors];
    }
    
    // Default gradient based on project name hash
    const hash = project.name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const colorKeys = Object.keys(colors);
    const defaultColor = colorKeys[Math.abs(hash) % colorKeys.length];
    return colors[defaultColor as keyof typeof colors];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`project-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect?.(project)}
    >
      <div className={`project-header bg-gradient-to-r ${getProjectColor(project.color)}`}>
        <div className="project-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z"/>
            <path d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V5z"/>
          </svg>
        </div>
        
        {onEdit && (
          <button
            className="project-edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
            title="Edit project"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        )}
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.name}</h3>
        
        {project.description && (
          <p className="project-description">{project.description}</p>
        )}
        
        <div className="project-meta">
          <span className="project-date">
            Created {formatDate(project.created_at)}
          </span>
        </div>
      </div>

      {onDelete && (
        <button
          className="project-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
          title="Delete project"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        </button>
      )}

      {isSelected && (
        <div className="project-selected-indicator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
