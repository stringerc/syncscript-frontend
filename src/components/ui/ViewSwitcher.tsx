import React from 'react';
import { motion } from 'framer-motion';

export type ViewMode = 'list' | 'kanban' | 'calendar' | 'gantt' | 'mind-map' | 'matrix';

interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  taskCount: number;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ 
  currentView, 
  onViewChange,
  taskCount 
}) => {
  const views = [
    { id: 'list' as ViewMode, label: 'List', icon: '📝', shortcut: '1' },
    { id: 'kanban' as ViewMode, label: 'Kanban', icon: '📋', shortcut: '2' },
    { id: 'calendar' as ViewMode, label: 'Calendar', icon: '📅', shortcut: '3' },
    { id: 'gantt' as ViewMode, label: 'Gantt', icon: '📊', shortcut: '4' },
    { id: 'mind-map' as ViewMode, label: 'Mind Map', icon: '🧠', shortcut: '5' },
    { id: 'matrix' as ViewMode, label: 'Matrix', icon: '🎯', shortcut: '6' },
  ];

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if Cmd/Ctrl is held
      if (e.metaKey || e.ctrlKey) {
        const view = views.find(v => v.shortcut === e.key);
        if (view) {
          e.preventDefault();
          onViewChange(view.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onViewChange]);

  return (
    <div className="view-switcher">
      <div className="view-switcher-container">
        {/* View Tabs */}
        <div className="view-tabs">
          {views.map(view => (
            <button
              key={view.id}
              className={`view-tab ${currentView === view.id ? 'active' : ''}`}
              onClick={() => onViewChange(view.id)}
              title={`${view.label} (${navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'}+${view.shortcut})`}
            >
              <span className="view-icon">{view.icon}</span>
              <span className="view-label">{view.label}</span>
              {currentView === view.id && (
                <motion.div
                  className="view-indicator"
                  layoutId="viewIndicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Task Count */}
        <div className="view-info">
          <span className="task-count">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewSwitcher;
