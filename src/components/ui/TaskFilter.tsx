import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface TaskFilterProps {
  projects: Project[];
  selectedProjectId: string | null;
  onFilterChange: (projectId: string | null) => void;
  taskCounts: {
    all: number;
    noProject: number;
    byProject: { [key: string]: number };
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  projects,
  selectedProjectId,
  onFilterChange,
  taskCounts
}) => {
  return (
    <div className="task-filter">
      <div className="filter-label">
        <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
        <span>Filter Tasks</span>
      </div>
      
      <div className="filter-options">
        {/* All Tasks */}
        <motion.button
          className={`filter-option ${selectedProjectId === null ? 'active' : ''}`}
          onClick={() => onFilterChange(null)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="filter-option-content">
            <svg className="option-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span className="option-label">All Tasks</span>
          </div>
          <span className="option-count">{taskCounts.all}</span>
        </motion.button>

        {/* No Project */}
        <motion.button
          className={`filter-option ${selectedProjectId === 'none' ? 'active' : ''}`}
          onClick={() => onFilterChange('none')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="filter-option-content">
            <svg className="option-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18"/>
            </svg>
            <span className="option-label">No Project</span>
          </div>
          <span className="option-count">{taskCounts.noProject}</span>
        </motion.button>

        {/* Divider */}
        {projects.length > 0 && <div className="filter-divider"></div>}

        {/* Project Filters */}
        {projects.map((project) => (
          <motion.button
            key={project.id}
            className={`filter-option ${selectedProjectId === project.id ? 'active' : ''}`}
            onClick={() => onFilterChange(project.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="filter-option-content">
              <div 
                className="project-color-dot"
                style={{ background: project.color }}
              ></div>
              <span className="option-label">{project.name}</span>
            </div>
            <span className="option-count">{taskCounts.byProject[project.id] || 0}</span>
          </motion.button>
        ))}
      </div>

      {/* Clear Filter */}
      {selectedProjectId && (
        <motion.button
          className="clear-filter-btn"
          onClick={() => onFilterChange(null)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Clear Filter
        </motion.button>
      )}
    </div>
  );
};

export default TaskFilter;

