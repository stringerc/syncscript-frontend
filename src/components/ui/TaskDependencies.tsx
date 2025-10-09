import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskDependency, createDependency, getDependencyChain, getBlockingReasons, generateDependencySuggestions, validateDependency } from '../../utils/dependencyUtils';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  project_id?: string;
  tags?: Array<{ label: string }>;
}

interface TaskDependenciesProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  allTasks: Task[];
  dependencies: TaskDependency[];
  onAddDependency: (dependency: TaskDependency) => void;
  onRemoveDependency: (dependencyId: string) => void;
}

const TaskDependencies: React.FC<TaskDependenciesProps> = ({
  isOpen,
  onClose,
  task,
  allTasks,
  dependencies,
  onAddDependency,
  onRemoveDependency
}) => {
  const [activeTab, setActiveTab] = useState<'current' | 'add' | 'suggestions'>('current');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [dependencyType, setDependencyType] = useState<TaskDependency['type']>('blocks');

  const taskChain = getDependencyChain(task.id, dependencies, allTasks);
  const blockingReasons = getBlockingReasons(task.id, dependencies, allTasks);
  const suggestions = generateDependencySuggestions(allTasks, dependencies);

  const availableTasks = allTasks.filter(t => 
    t.id !== task.id && 
    !t.completed &&
    !dependencies.some(dep => dep.taskId === task.id && dep.dependsOnTaskId === t.id)
  );

  const handleAddDependency = () => {
    if (!selectedTaskId) return;

    const validation = validateDependency(task.id, selectedTaskId, dependencies);
    if (!validation.isValid) {
      alert(validation.reason);
      return;
    }

    const newDependency = createDependency(task.id, selectedTaskId, dependencyType);
    onAddDependency(newDependency);
    setSelectedTaskId('');
  };

  const getDependencyTypeColor = (type: TaskDependency['type']) => {
    switch (type) {
      case 'blocks': return '#EF4444';
      case 'requires': return '#F59E0B';
      case 'suggests': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getDependencyTypeIcon = (type: TaskDependency['type']) => {
    switch (type) {
      case 'blocks': return '🚫';
      case 'requires': return '⚡';
      case 'suggests': return '💡';
      default: return '🔗';
    }
  };

  const getDependencyTypeLabel = (type: TaskDependency['type']) => {
    switch (type) {
      case 'blocks': return 'Blocks';
      case 'requires': return 'Requires';
      case 'suggests': return 'Suggests';
      default: return 'Unknown';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="dependency-modal-overlay" onClick={onClose}>
          <motion.div
            className="dependency-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dependency-modal-header">
              <div className="header-content">
                <div className="dependency-icon">🔗</div>
                <div>
                  <h2 className="dependency-title">Task Dependencies</h2>
                  <p className="dependency-subtitle">&ldquo;{task.title}&rdquo;</p>
                </div>
              </div>
              <button className="dependency-close-btn" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="dependency-tabs">
              <button
                className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
                onClick={() => setActiveTab('current')}
              >
                <span className="tab-icon">📋</span>
                <span>Current</span>
                {taskChain.blockedBy.length > 0 && (
                  <span className="tab-badge">{taskChain.blockedBy.length}</span>
                )}
              </button>
              <button
                className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
                onClick={() => setActiveTab('add')}
              >
                <span className="tab-icon">➕</span>
                <span>Add</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
                onClick={() => setActiveTab('suggestions')}
              >
                <span className="tab-icon">💡</span>
                <span>Suggestions</span>
                {suggestions.filter(s => s.taskId === task.id).length > 0 && (
                  <span className="tab-badge">{suggestions.filter(s => s.taskId === task.id).length}</span>
                )}
              </button>
            </div>

            <div className="dependency-modal-content">
              {activeTab === 'current' && (
                <div className="current-dependencies">
                  {/* Blocking Status */}
                  {taskChain.isBlocked && (
                    <div className="blocking-status blocked">
                      <div className="status-icon">🚫</div>
                      <div className="status-content">
                        <h3>Task is Blocked</h3>
                        <p>This task cannot be completed until dependencies are resolved:</p>
                        <ul className="blocking-list">
                          {blockingReasons.map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Dependency Chain Info */}
                  <div className="chain-info">
                    <div className="chain-stat">
                      <span className="stat-label">Chain Length</span>
                      <span className="stat-value">{taskChain.chainLength}</span>
                    </div>
                    <div className="chain-stat">
                      <span className="stat-label">Blocks</span>
                      <span className="stat-value">{taskChain.blocks.length}</span>
                    </div>
                    <div className="chain-stat">
                      <span className="stat-label">Blocked By</span>
                      <span className="stat-value">{taskChain.blockedBy.length}</span>
                    </div>
                  </div>

                  {/* Current Dependencies */}
                  <div className="dependencies-list">
                    <h3>Current Dependencies</h3>
                    {dependencies.filter(dep => dep.taskId === task.id).length === 0 ? (
                      <div className="no-dependencies">
                        <span className="no-deps-icon">🔗</span>
                        <p>No dependencies set for this task</p>
                      </div>
                    ) : (
                      <div className="dependency-items">
                        {dependencies
                          .filter(dep => dep.taskId === task.id)
                          .map(dependency => {
                            const dependsOnTask = allTasks.find(t => t.id === dependency.dependsOnTaskId);
                            return (
                              <div key={dependency.id} className="dependency-item">
                                <div className="dependency-info">
                                  <span 
                                    className="dependency-type-badge"
                                    style={{ backgroundColor: getDependencyTypeColor(dependency.type) }}
                                  >
                                    {getDependencyTypeIcon(dependency.type)} {getDependencyTypeLabel(dependency.type)}
                                  </span>
                                  <span className="dependency-task">
                                    {dependsOnTask ? dependsOnTask.title : 'Unknown Task'}
                                  </span>
                                </div>
                                <button
                                  className="remove-dependency-btn"
                                  onClick={() => onRemoveDependency(dependency.id)}
                                  title="Remove dependency"
                                >
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                  </svg>
                                </button>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'add' && (
                <div className="add-dependency">
                  <h3>Add New Dependency</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Task to depend on:</label>
                    <select
                      className="form-select"
                      value={selectedTaskId}
                      onChange={(e) => setSelectedTaskId(e.target.value)}
                    >
                      <option value="">Select a task...</option>
                      {availableTasks.map(task => (
                        <option key={task.id} value={task.id}>
                          {task.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Dependency Type:</label>
                    <div className="dependency-type-options">
                      <label className="type-option">
                        <input
                          type="radio"
                          name="dependencyType"
                          value="blocks"
                          checked={dependencyType === 'blocks'}
                          onChange={(e) => setDependencyType(e.target.value as TaskDependency['type'])}
                        />
                        <span className="type-badge blocks">🚫 Blocks</span>
                        <span className="type-description">Task cannot be completed until this is done</span>
                      </label>
                      <label className="type-option">
                        <input
                          type="radio"
                          name="dependencyType"
                          value="requires"
                          checked={dependencyType === 'requires'}
                          onChange={(e) => setDependencyType(e.target.value as TaskDependency['type'])}
                        />
                        <span className="type-badge requires">⚡ Requires</span>
                        <span className="type-description">Task should be done after this</span>
                      </label>
                      <label className="type-option">
                        <input
                          type="radio"
                          name="dependencyType"
                          value="suggests"
                          checked={dependencyType === 'suggests'}
                          onChange={(e) => setDependencyType(e.target.value as TaskDependency['type'])}
                        />
                        <span className="type-badge suggests">💡 Suggests</span>
                        <span className="type-description">Recommended order but not required</span>
                      </label>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={handleAddDependency}
                    disabled={!selectedTaskId}
                  >
                    Add Dependency
                  </button>
                </div>
              )}

              {activeTab === 'suggestions' && (
                <div className="dependency-suggestions">
                  <h3>Smart Suggestions</h3>
                  <p className="suggestions-description">
                    AI-powered suggestions based on task context and patterns
                  </p>
                  
                  {suggestions.filter(s => s.taskId === task.id).length === 0 ? (
                    <div className="no-suggestions">
                      <span className="no-suggestions-icon">💡</span>
                      <p>No dependency suggestions available</p>
                    </div>
                  ) : (
                    <div className="suggestions-list">
                      {suggestions
                        .filter(s => s.taskId === task.id)
                        .map((suggestion, index) => {
                          const suggestedTask = allTasks.find(t => t.id === suggestion.suggestedDependency);
                          return (
                            <div key={index} className="suggestion-item">
                              <div className="suggestion-content">
                                <div className="suggestion-header">
                                  <span className="confidence-badge">
                                    {suggestion.confidence}% match
                                  </span>
                                  <span className="suggestion-task">
                                    {suggestedTask?.title || 'Unknown Task'}
                                  </span>
                                </div>
                                <p className="suggestion-reason">{suggestion.reason}</p>
                              </div>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => {
                                  setSelectedTaskId(suggestion.suggestedDependency);
                                  setDependencyType('requires');
                                  setActiveTab('add');
                                }}
                              >
                                Add
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TaskDependencies;
