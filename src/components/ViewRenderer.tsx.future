/**
 * ViewRenderer - Conditional rendering based on current view
 * BLOCKER #5: View Switching Implementation
 */

import React from 'react';
import { ViewMode } from './ui/ViewSwitcher';
import KanbanBoard from './ui/KanbanBoard';
import GanttChart from './ui/GanttChart';
import MindMap from './ui/MindMap';
import EisenhowerMatrix from './ui/EisenhowerMatrix';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Task = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Project = any;

interface ViewRendererProps {
  currentView: ViewMode;
  tasks: Task[];
  projects: Project[];
  onTaskUpdate: (taskId: string) => void;
  renderListView: () => React.ReactNode;
}

export default function ViewRenderer({
  currentView,
  tasks,
  projects,
  onTaskUpdate,
  renderListView
}: ViewRendererProps) {
  
  const handleClose = () => {
    // View is embedded, no close needed
  };

  // Render based on current view
  switch (currentView) {
    case 'list':
      return <>{renderListView()}</>;
      
    case 'kanban':
      return (
        <div style={{ padding: 'var(--space-4)' }}>
          <KanbanBoard
            isOpen={true}
            onClose={handleClose}
            tasks={tasks.map(t => ({ ...t, status: t.completed ? 'done' : ('todo' as const) }))}
            onUpdateTask={(_taskId: string) => onTaskUpdate(_taskId)}
          />
        </div>
      );
      
    case 'calendar':
      return (
        <div style={{ padding: 'var(--space-4)' }}>
          {/* Calendar view would go here */}
          <div className="view-placeholder">
            <h2>📅 Calendar View</h2>
            <p>Timeline view of your tasks and events</p>
          </div>
        </div>
      );
      
    case 'gantt':
      return (
        <div style={{ padding: 'var(--space-4)' }}>
          <GanttChart
            isOpen={true}
            onClose={handleClose}
            tasks={tasks}
          />
        </div>
      );
      
    case 'mind-map':
      return (
        <div style={{ padding: 'var(--space-4)' }}>
          <MindMap
            isOpen={true}
            onClose={handleClose}
            tasks={tasks}
            projects={projects}
          />
        </div>
      );
      
    case 'matrix':
      return (
        <div style={{ padding: 'var(--space-4)' }}>
          <EisenhowerMatrix
            isOpen={true}
            onClose={handleClose}
            tasks={tasks}
            onUpdateTask={(_taskId: string) => onTaskUpdate(_taskId)}
          />
        </div>
      );
      
    default:
      return <>{renderListView()}</>;
  }
}

