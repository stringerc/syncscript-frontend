import React from 'react';
import { motion } from 'framer-motion';
import { Tag, getAllTags } from '../../utils/tagUtils';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface Task {
  tags?: Tag[];
  project_id?: string;
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
  tasks: Task[];
  selectedTag: string | null;
  onTagFilterChange: (tagLabel: string | null) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  projects,
  selectedProjectId,
  onFilterChange,
  taskCounts,
  tasks,
  selectedTag,
  onTagFilterChange
}) => {
  // Get all unique tags from tasks
  const allTags = React.useMemo(() => getAllTags(tasks), [tasks]);
  
  // Calculate tag counts
  const tagCounts = React.useMemo(() => {
    const counts: { [key: string]: number } = {};
    tasks.forEach(task => {
      task.tags?.forEach(tag => {
        counts[tag.label] = (counts[tag.label] || 0) + 1;
      });
    });
    return counts;
  }, [tasks]);
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
        
        {/* Tags Section */}
        {allTags.length > 0 && (
          <>
            <div className="filter-divider"></div>
            <div className="filter-section-label">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              <span>Filter by Tag</span>
            </div>
            {allTags.map((tag) => (
              <motion.button
                key={tag.id}
                className={`filter-option tag-filter ${selectedTag === tag.label ? 'active' : ''}`}
                onClick={() => onTagFilterChange(selectedTag === tag.label ? null : tag.label)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="filter-option-content">
                  <div 
                    className="tag-color-dot"
                    style={{ background: tag.color }}
                  ></div>
                  <span className="option-label">#{tag.label}</span>
                </div>
                <span className="option-count">{tagCounts[tag.label] || 0}</span>
              </motion.button>
            ))}
          </>
        )}
      </div>

      {/* Clear Filter */}
      {(selectedProjectId || selectedTag) && (
        <motion.button
          className="clear-filter-btn"
          onClick={() => {
            onFilterChange(null);
            onTagFilterChange(null);
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Clear Filters
        </motion.button>
      )}
    </div>
  );
};

export default TaskFilter;

