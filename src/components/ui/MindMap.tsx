import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  project_id?: string;
  priority: number;
  completed: boolean;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

interface MindMapProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  projects: Project[];
}

const MindMap: React.FC<MindMapProps> = ({ isOpen, onClose, tasks, projects }) => {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set(projects.map(p => p.id)));

  if (!isOpen) return null;

  const unassignedTasks = tasks.filter(t => !t.project_id && !t.completed);

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  return (
    <div className="mindmap-overlay" onClick={onClose}>
      <motion.div
        className="mindmap-modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mindmap-header">
          <h2>🧠 Mind Map</h2>
          <p>Visual overview of your tasks and projects</p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="mindmap-content">
          {/* Root Node */}
          <div className="mind-map-root">
            <div className="root-node">
              <span className="root-icon">🎯</span>
              <span className="root-label">My Tasks</span>
            </div>

            {/* Project Branches */}
            <div className="branches">
              {projects.map(project => {
                const projectTasks = tasks.filter(t => t.project_id === project.id && !t.completed);
                const isExpanded = expandedProjects.has(project.id);

                return (
                  <div key={project.id} className="branch">
                    <div
                      className="project-node"
                      style={{ borderColor: project.color }}
                      onClick={() => toggleProject(project.id)}
                    >
                      <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                      <span className="project-name">{project.name}</span>
                      <span className="task-count">{projectTasks.length}</span>
                    </div>

                    {isExpanded && (
                      <motion.div
                        className="task-nodes"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        {projectTasks.map(task => (
                          <div
                            key={task.id}
                            className="task-node"
                            style={{ borderLeftColor: project.color }}
                          >
                            <span className="task-icon">
                              {task.priority >= 4 ? '🔴' : task.priority >= 3 ? '🟡' : '🟢'}
                            </span>
                            <span className="task-label">{task.title}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}

              {/* Unassigned Tasks */}
              {unassignedTasks.length > 0 && (
                <div className="branch">
                  <div className="project-node unassigned">
                    <span className="expand-icon">📌</span>
                    <span className="project-name">Unassigned</span>
                    <span className="task-count">{unassignedTasks.length}</span>
                  </div>
                  <div className="task-nodes">
                    {unassignedTasks.map(task => (
                      <div key={task.id} className="task-node">
                        <span className="task-icon">
                          {task.priority >= 4 ? '🔴' : task.priority >= 3 ? '🟡' : '🟢'}
                        </span>
                        <span className="task-label">{task.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MindMap;
